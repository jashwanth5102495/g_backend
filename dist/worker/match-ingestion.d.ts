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
export declare class MatchIngestionWorker {
    private provider;
    private isRunning;
    private dailyBudget;
    private safetyMargin;
    private usableBudget;
    private pollIntervalLiveMs;
    private pollTimer;
    private liveMatchTimers;
    private lastStateHashes;
    private lastSuccessfulFetch;
    private lastError;
    private nextScheduledPoll;
    private currentIntervalMs;
    private currentMatchesCache;
    constructor(options?: IngestionWorkerOptions);
    start(): Promise<void>;
    stop(): void;
    private getTodayKey;
    /**
     * Tracks daily calls in Redis key: provider:calls:YYYY-MM-DD
     */
    getCallsToday(): Promise<number>;
    private canMakeCall;
    /**
     * Increments Redis call counter and logs to Postgres ProviderCallLog.
     */
    recordCall(endpoint: string, statusCode: number, durationMs: number, success: boolean): Promise<void>;
    /**
     * Computes polling interval dynamically based on remaining budget and live match status.
     */
    computeNextInterval(hasLiveMatches: boolean, callsToday: number): number;
    /**
     * Main polling cycle for currentMatches.
     */
    private pollCycle;
    private fetchAndStoreMatches;
    private updateMetaInRedis;
    private syncLiveMatchPollers;
    private startMatchDetailPoller;
    private persistMatchesToPostgres;
    getStatus(): Promise<IngestionStatus>;
}
