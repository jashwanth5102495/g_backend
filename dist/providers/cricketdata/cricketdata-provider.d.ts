import type { CricketProvider, DateRange } from '../types.js';
import type { Match, MatchState, Scorecard, Commentary, MatchStatus } from '../../types/models.js';
import { CricketDataMatchItem } from './schemas.js';
export interface CricketDataOrgOptions {
    apiKey?: string;
    apiKeys?: string[];
    baseUrl?: string;
    dailyBudget?: number;
    useOfflineFixturesOnly?: boolean;
    onCallLogged?: (info: {
        endpoint: string;
        statusCode: number;
        durationMs: number;
        success: boolean;
    }) => Promise<void> | void;
}
/**
 * CricketData.org (api.cricapi.com) provider adapter with Dynamic Multi-Key Failover Pool.
 * Automatically rotates to the next API key when daily hit limit or rate limit is reached.
 */
export declare class CricketDataOrgProvider implements CricketProvider {
    readonly name = "cricketdata";
    private readonly apiKeys;
    private currentKeyIndex;
    private readonly baseUrl;
    private readonly circuitBreaker;
    private readonly quotaGuard;
    private readonly onCallLogged?;
    private readonly useOfflineFixturesOnly;
    private static exhaustedKeys;
    private static isBlockedUntilTomorrow;
    private static blockedDate;
    private static failedEndpoints;
    constructor(options?: CricketDataOrgOptions);
    private getActiveKey;
    private markKeyExhausted;
    private fetchApi;
    private getFixtureData;
    getQuotaStats(): {
        providerName: string;
        dailyBudget: number;
        callsToday: number;
        remainingCallsToday: number;
        callsLastMinute: number;
        date: string;
    };
    /**
     * Fetches all current matches (ONE call returns live, today's upcoming, and today's finished).
     */
    getCurrentMatches(): Promise<Match[]>;
    /**
     * Returns only live matches from currentMatches.
     */
    getLiveMatches(): Promise<Match[]>;
    /**
     * Upcoming fixtures list.
     */
    getFixtures(range?: DateRange): Promise<Match[]>;
    /**
     * Match info single item.
     */
    getMatchInfo(matchId: string): Promise<Match>;
    /**
     * Full match scorecard.
     */
    getScorecard(matchId: string): Promise<Scorecard>;
    /**
     * Match snapshot for realtime state SSE stream.
     */
    getMatchSnapshot(matchId: string): Promise<MatchState>;
    /**
     * Commentary. Free tier provides basic over summaries.
     */
    getCommentary(matchId: string, cursor?: string): Promise<Commentary[]>;
    /**
     * Series list.
     */
    getSeriesList(): Promise<any[]>;
    /**
     * Series info with match list.
     */
    getSeriesInfo(seriesId: string): Promise<any>;
    /**
     * Robust status derivation.
     * Derives: 'upcoming' | 'live' | 'completed' | 'abandoned'
     */
    deriveMatchStatus(raw: CricketDataMatchItem): MatchStatus;
    /**
     * Parses format e.g. "t20" -> "T20", "odi" -> "ODI", "test" -> "TEST"
     */
    private deriveMatchFormat;
    /**
     * Parses match stage/number label e.g. "4th T20I", "Final", "Match 14", "1st ODI"
     */
    private extractMatchNumber;
    /**
     * Normalizes innings scores into team summaries.
     */
    private computeTeamScoreSummaries;
    /**
     * Normalizes a raw CricketData match into LiveCricket Match model.
     */
    normalizeMatch(raw: CricketDataMatchItem): Match;
    /**
     * Normalizes innings array from match_scorecard.
     */
    private normalizeInningsList;
    /**
     * Builds MatchState from scorecard.
     */
    private normalizeMatchState;
}
