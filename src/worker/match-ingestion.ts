import { prisma } from '../db.js';
import { getProvider } from '../providers/factory.js';
import type { CricketProvider } from '../providers/types.js';
import { MockProvider } from '../providers/mock/mock-provider.js';
import { CricketDataOrgProvider } from '../providers/cricketdata/cricketdata-provider.js';
import type { Match, MatchState, MatchDeltaEvent } from '../types/models.js';
import { redis, redisPublisher, RedisKeys } from '../redis.js';
import { config } from '../config.js';

export interface IngestionWorkerOptions {
  providerName?: string;
  dailyBudget?: number;
  safetyMargin?: number;
  pollIntervalLiveMs?: number;
}

export interface IngestionStatus {
  provider: string;
  dailyBudget: number;
  safetyMargin: number;
  usableBudget: number;
  callsUsedToday: number;
  budgetRemaining: number;
  lastSuccessfulFetch: string | null;
  lastError: string | null;
  nextScheduledPoll: string | null;
  pollIntervalMs: number;
  hasLiveMatches: boolean;
  matchesCount: {
    total: number;
    live: number;
    upcoming: number;
    finished: number;
  };
}

export class MatchIngestionWorker {
  private provider: CricketProvider;
  private isRunning: boolean = false;
  private dailyBudget: number;
  private safetyMargin: number;
  private usableBudget: number;
  private pollIntervalLiveMs: number;

  private pollTimer: NodeJS.Timeout | null = null;
  private liveMatchTimers: Map<string, NodeJS.Timeout> = new Map();
  private lastStateHashes: Map<string, string> = new Map();

  private lastSuccessfulFetch: string | null = null;
  private lastError: string | null = null;
  private nextScheduledPoll: string | null = null;
  private currentIntervalMs: number = 60_000;
  private currentMatchesCache: Match[] = [];

  constructor(options: IngestionWorkerOptions = {}) {
    this.dailyBudget = options.dailyBudget ?? config.PROVIDER_DAILY_BUDGET;
    this.safetyMargin = options.safetyMargin ?? config.PROVIDER_SAFETY_MARGIN;
    this.usableBudget = Math.floor(this.dailyBudget * this.safetyMargin);
    this.pollIntervalLiveMs = options.pollIntervalLiveMs ?? config.POLL_INTERVAL_LIVE_MS;

    const providerName = options.providerName ?? config.CRICKET_PROVIDER;
    if (providerName === 'cricketdata') {
      const keys = config.CRICKET_API_KEYS
        ? config.CRICKET_API_KEYS.split(',').map((k) => k.trim()).filter(Boolean)
        : [];
      if (config.CRICKET_API_KEY) keys.push(config.CRICKET_API_KEY.trim());

      this.provider = new CricketDataOrgProvider({
        apiKey: config.CRICKET_API_KEY || config.CRICKET_DATA_API_KEY,
        apiKeys: keys.length > 0 ? keys : undefined,
        dailyBudget: this.dailyBudget,
        onCallLogged: async (info) => {
          await this.recordCall(info.endpoint, info.statusCode, info.durationMs, info.success);
        },
      });
    } else {
      this.provider = getProvider(providerName);
    }
  }

  public async start(): Promise<void> {
    if (this.isRunning) return;
    this.isRunning = true;
    console.log(
      `[IngestionWorker] Started worker with provider [${this.provider.name}]. Daily budget: ${this.dailyBudget} (usable: ${this.usableBudget})`
    );

    // Initial immediate fetch
    await this.pollCycle();
  }

  public stop(): void {
    this.isRunning = false;
    if (this.pollTimer) {
      clearTimeout(this.pollTimer);
      this.pollTimer = null;
    }
    for (const [matchId, timer] of this.liveMatchTimers.entries()) {
      clearTimeout(timer);
    }
    this.liveMatchTimers.clear();
    console.log('[IngestionWorker] Ingestion worker stopped.');
  }

  private getTodayKey(): string {
    return new Date().toISOString().slice(0, 10);
  }

  /**
   * Tracks daily calls in Redis key: provider:calls:YYYY-MM-DD
   */
  public async getCallsToday(): Promise<number> {
    try {
      const today = this.getTodayKey();
      const val = await redis.get(RedisKeys.providerCalls(today));
      return val ? parseInt(val, 10) : 0;
    } catch (err: any) {
      console.warn('[IngestionWorker] Redis read error for calls count:', err.message);
      return 0;
    }
  }

  private async canMakeCall(): Promise<boolean> {
    if (this.provider instanceof MockProvider) return true;
    const callsToday = await this.getCallsToday();
    return callsToday < this.usableBudget;
  }

  /**
   * Increments Redis call counter and logs to Postgres ProviderCallLog.
   */
  public async recordCall(
    endpoint: string,
    statusCode: number,
    durationMs: number,
    success: boolean
  ): Promise<void> {
    const today = this.getTodayKey();
    const key = RedisKeys.providerCalls(today);

    try {
      // 1. Increment in Redis with 48h TTL
      const newCount = await redis.incr(key);
      if (newCount === 1) {
        await redis.expire(key, 172800); // 48 hours
      }

      // 2. Persist to Postgres ProviderCallLog table
      await prisma.providerCallLog.create({
        data: {
          providerName: this.provider.name,
          endpoint,
          statusCode,
          durationMs,
          success,
          calledAt: new Date(),
        },
      });

      console.log(
        `📊 [Quota Log] Call to ${endpoint} (${durationMs}ms, ${statusCode}). Used today: ${newCount}/${this.usableBudget}`
      );
    } catch (err: any) {
      console.error('[IngestionWorker] Failed to record call log:', err.message);
    }
  }

  /**
   * Computes polling interval dynamically based on remaining budget and live match status.
   */
  public computeNextInterval(hasLiveMatches: boolean, callsToday: number): number {
    const remainingUsable = Math.max(1, this.usableBudget - callsToday);

    if (hasLiveMatches) {
      // Concentrate 70% of usable budget into an 8-hour live window
      const liveAllocation = Math.max(1, Math.floor(remainingUsable * 0.7));
      const liveWindowMs = 8 * 3600 * 1000;
      const computedMs = Math.floor(liveWindowMs / liveAllocation);

      // Clamp to min configured live interval
      return Math.max(this.pollIntervalLiveMs, computedMs);
    } else {
      // Idle schedule: 30% of budget over remaining 16 hours
      const idleAllocation = Math.max(1, Math.floor(remainingUsable * 0.3));
      const idleWindowMs = 16 * 3600 * 1000;
      const computedMs = Math.floor(idleWindowMs / idleAllocation);

      // Clamp between 5 minutes and 40 minutes for responsiveness
      return Math.min(Math.max(computedMs, 300_000), 2_400_000);
    }
  }

  /**
   * Main polling cycle for currentMatches.
   */
  private async pollCycle(): Promise<void> {
    if (!this.isRunning) return;

    try {
      const allowed = await this.canMakeCall();
      const callsToday = await this.getCallsToday();
      const allExhausted = !!(this.provider as any)?.isAllKeysExhausted;

      if (!allowed || allExhausted) {
        console.warn(
          `⚠️ [IngestionWorker] All keys exhausted or quota limit reached for today (${callsToday}/${this.usableBudget}). Pausing external calls.`
        );
        this.lastError = 'out of limit for today';
        await this.updateMetaInRedis(true);
      } else {
        await this.fetchAndStoreMatches();
        this.lastError = null;
      }
    } catch (err: any) {
      if (err.message?.includes('out of limit') || (this.provider as any)?.isAllKeysExhausted) {
        this.lastError = 'out of limit for today';
      } else {
        this.lastError = err.message;
      }
      console.error('[IngestionWorker] Poll cycle error:', err.message);
      await this.updateMetaInRedis(true);
    }

    // Schedule next poll
    if (this.isRunning) {
      const callsToday = await this.getCallsToday();
      const hasLiveMatches = this.currentMatchesCache.some((m) => m.status === 'live');
      this.currentIntervalMs = this.computeNextInterval(hasLiveMatches, callsToday);

      const nextPollDate = new Date(Date.now() + this.currentIntervalMs);
      this.nextScheduledPoll = nextPollDate.toISOString();

      await this.updateMetaInRedis(!this.canMakeCall());

      console.log(
        `⏱️ [IngestionWorker] Next poll in ${Math.round(this.currentIntervalMs / 1000)}s (${this.nextScheduledPoll}). HasLive: ${hasLiveMatches}`
      );

      this.pollTimer = setTimeout(() => this.pollCycle(), this.currentIntervalMs);
    }
  }

  private async fetchAndStoreMatches(): Promise<void> {
    let matches: Match[] = [];

    if (this.provider instanceof CricketDataOrgProvider) {
      matches = await (this.provider as CricketDataOrgProvider).getCurrentMatches();
    } else {
      matches = await this.provider.getLiveMatches();
    }

    this.currentMatchesCache = matches;
    this.lastSuccessfulFetch = new Date().toISOString();

    const liveMatches = matches.filter((m) => m.status === 'live');
    console.log(
      `[IngestionWorker] Fetched ${matches.length} matches (${liveMatches.length} live, ${
        matches.filter((m) => m.status === 'upcoming').length
      } upcoming, ${matches.filter((m) => m.status === 'completed' || m.status === 'abandoned').length} finished).`
    );

    // 1. Store full current matches list in Redis (key: matches:today) with 2-hour TTL
    await redis.set(RedisKeys.todayMatches(), JSON.stringify(matches), 'EX', 7200);

    // 2. Store live matches list in Redis for fast access
    await redis.set(RedisKeys.liveMatchesList(), JSON.stringify(liveMatches), 'EX', 7200);

    // 3. Persist matches to Postgres DB (background upsert without blocking)
    this.persistMatchesToPostgres(matches).catch((dbErr) => {
      console.warn('[IngestionWorker] Postgres match persist warning:', dbErr.message);
    });

    // 4. Update individual live match pollers
    this.syncLiveMatchPollers(liveMatches);
  }

  private async updateMetaInRedis(isBudgetExhausted: boolean): Promise<void> {
    try {
      const callsToday = await this.getCallsToday();
      const meta = {
        provider: this.provider.name,
        dailyBudget: this.dailyBudget,
        usableBudget: this.usableBudget,
        callsToday,
        remainingBudget: Math.max(0, this.usableBudget - callsToday),
        lastSuccessfulFetch: this.lastSuccessfulFetch,
        lastError:
          (this.provider as any)?.isAllKeysExhausted || isBudgetExhausted || this.lastError?.includes('out of limit')
            ? 'out of limit for today'
            : this.lastError,
        nextScheduledPoll: this.nextScheduledPoll,
        pollIntervalMs: this.currentIntervalMs,
        isBudgetExhausted,
        isAllKeysExhausted: !!(this.provider as any)?.isAllKeysExhausted || isBudgetExhausted,
        totalMatches: this.currentMatchesCache.length,
        liveMatches: this.currentMatchesCache.filter((m) => m.status === 'live').length,
        upcomingMatches: this.currentMatchesCache.filter((m) => m.status === 'upcoming').length,
        finishedMatches: this.currentMatchesCache.filter((m) => m.status === 'completed' || m.status === 'abandoned').length,
        updatedAt: new Date().toISOString(),
      };

      await redis.set(RedisKeys.todayMatchesMeta(), JSON.stringify(meta), 'EX', 86400);
    } catch (err: any) {
      console.warn('[IngestionWorker] Error saving meta to Redis:', err.message);
    }
  }

  private syncLiveMatchPollers(liveMatches: Match[]): void {
    const liveMatchIds = new Set(liveMatches.map((m) => m.id));

    // Clear pollers for matches that ended
    for (const [matchId, timer] of this.liveMatchTimers.entries()) {
      if (!liveMatchIds.has(matchId)) {
        clearTimeout(timer);
        this.liveMatchTimers.delete(matchId);
        console.log(`[IngestionWorker] Removed poller for finished match: ${matchId}`);
      }
    }

    // Spawn poller for new live matches
    for (const m of liveMatches) {
      if (!this.liveMatchTimers.has(m.id)) {
        this.startMatchDetailPoller(m.id);
      }
    }
  }

  private startMatchDetailPoller(matchId: string): void {
    // For CricketDataOrg on free tier, never poll match_scorecard in a loop.
    // Live scores are already continuously updated in currentMatches without wasting calls.
    if (this.provider instanceof CricketDataOrgProvider) {
      console.log(
        `[IngestionWorker] Detailed scorecard polling disabled for ${matchId} (CricketData free tier: live score tracked via currentMatches)`
      );
      return;
    }

    const pollLoop = async () => {
      if (!this.isRunning) return;

      const allowed = await this.canMakeCall();
      if (!allowed) {
        console.warn(`[IngestionWorker] Quota reached. Stopping live detail poller for ${matchId}`);
        this.liveMatchTimers.delete(matchId);
        return;
      }

      try {
        let deltaEvent: MatchDeltaEvent | null = null;

        if (this.provider instanceof MockProvider) {
          const { delta } = (this.provider as MockProvider).advanceBall();
          deltaEvent = delta;
        }

        const state: MatchState = await this.provider.getMatchSnapshot(matchId);
        const lastHash = this.lastStateHashes.get(matchId);

        if (lastHash !== state.stateHash || deltaEvent) {
          this.lastStateHashes.set(matchId, state.stateHash);

          // Store snapshot in Redis
          await redis.set(RedisKeys.matchState(matchId), JSON.stringify(state));

          if (!deltaEvent) {
            deltaEvent = {
              sequence: state.sequence,
              matchId: state.match.id,
              timestamp: Date.now(),
              type: 'state_sync',
              scoreChange: {
                runs: state.currentInnings.runs,
                wickets: state.currentInnings.wickets,
                overs: state.currentInnings.overs,
                currentRunRate: state.analytics.currentRunRate,
                requiredRunRate: state.analytics.requiredRunRate,
              },
              winProbability: state.analytics.winProbability,
            };
          }

          const deltaStr = JSON.stringify(deltaEvent);
          await redisPublisher.publish(RedisKeys.matchEvents(matchId), deltaStr);

          // Append to Redis stream for replay
          try {
            await redis.xadd(
              RedisKeys.matchStream(matchId),
              'MAXLEN',
              '~',
              500,
              '*',
              'sequence',
              String(deltaEvent.sequence),
              'payload',
              deltaStr
            );
          } catch (streamErr: any) {
            console.warn('[IngestionWorker] Stream write warning:', streamErr.message);
          }
        }
      } catch (err: any) {
        console.warn(`[IngestionWorker] Error polling live match snapshot ${matchId}: ${err.message}. Removing poller.`);
        this.liveMatchTimers.delete(matchId);
        return;
      }

      if (this.isRunning && this.liveMatchTimers.has(matchId)) {
        const timer = setTimeout(pollLoop, this.pollIntervalLiveMs);
        this.liveMatchTimers.set(matchId, timer);
      }
    };

    const initialTimer = setTimeout(pollLoop, 1000);
    this.liveMatchTimers.set(matchId, initialTimer);
  }

  private async persistMatchesToPostgres(matches: Match[]): Promise<void> {
    for (const m of matches) {
      try {
        // Upsert Team A
        await prisma.team.upsert({
          where: { code: m.teamA.code },
          update: { name: m.teamA.name, shortName: m.teamA.shortName, logoUrl: m.teamA.logoUrl },
          create: {
            code: m.teamA.code,
            name: m.teamA.name,
            shortName: m.teamA.shortName,
            logoUrl: m.teamA.logoUrl,
          },
        });

        // Upsert Team B
        await prisma.team.upsert({
          where: { code: m.teamB.code },
          update: { name: m.teamB.name, shortName: m.teamB.shortName, logoUrl: m.teamB.logoUrl },
          create: {
            code: m.teamB.code,
            name: m.teamB.name,
            shortName: m.teamB.shortName,
            logoUrl: m.teamB.logoUrl,
          },
        });

        // Upsert Series
        await prisma.series.upsert({
          where: { id: m.seriesId },
          update: { name: m.seriesName },
          create: {
            id: m.seriesId,
            name: m.seriesName,
            format: m.format === '100BALL' ? 'T20' : m.format,
            season: '2026',
            startDate: new Date(),
          },
        });

        const statusMap: Record<string, any> = {
          upcoming: 'UPCOMING',
          live: 'LIVE',
          completed: 'COMPLETED',
          abandoned: 'ABANDONED',
        };

        const dbTeamA = await prisma.team.findUnique({ where: { code: m.teamA.code } });
        const dbTeamB = await prisma.team.findUnique({ where: { code: m.teamB.code } });

        if (dbTeamA && dbTeamB) {
          await prisma.match.upsert({
            where: { id: m.id },
            update: {
              status: statusMap[m.status] || 'UPCOMING',
              statusText: m.statusText,
              venue: m.venue,
              city: m.city,
              currentInningsNumber: m.currentInningsNumber,
              resultText: m.resultText,
            },
            create: {
              id: m.id,
              slug: m.slug,
              title: m.title,
              seriesId: m.seriesId,
              format: m.format === '100BALL' ? 'T20' : m.format,
              status: statusMap[m.status] || 'UPCOMING',
              statusText: m.statusText,
              venue: m.venue,
              city: m.city,
              startTime: new Date(m.startTime),
              teamAId: dbTeamA.id,
              teamBId: dbTeamB.id,
              currentInningsNumber: m.currentInningsNumber,
              resultText: m.resultText,
            },
          });
        }
      } catch (err: any) {
        // Log without crashing
      }
    }
  }

  public async getStatus(): Promise<IngestionStatus> {
    const callsToday = await this.getCallsToday();
    const liveMatches = this.currentMatchesCache.filter((m) => m.status === 'live');
    const upcomingMatches = this.currentMatchesCache.filter((m) => m.status === 'upcoming');
    const finishedMatches = this.currentMatchesCache.filter((m) => m.status === 'completed' || m.status === 'abandoned');

    return {
      provider: this.provider.name,
      dailyBudget: this.dailyBudget,
      safetyMargin: this.safetyMargin,
      usableBudget: this.usableBudget,
      callsUsedToday: callsToday,
      budgetRemaining: Math.max(0, this.usableBudget - callsToday),
      lastSuccessfulFetch: this.lastSuccessfulFetch,
      lastError: this.lastError,
      nextScheduledPoll: this.nextScheduledPoll,
      pollIntervalMs: this.currentIntervalMs,
      hasLiveMatches: liveMatches.length > 0,
      matchesCount: {
        total: this.currentMatchesCache.length,
        live: liveMatches.length,
        upcoming: upcomingMatches.length,
        finished: finishedMatches.length,
      },
    };
  }
}
