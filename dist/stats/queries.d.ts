import { HistFormat } from '../db.js';
import { StatsContext, TeamFormResult, HeadToHeadResult, TeamComparisonResult, VenueStatsResult, PaceSpinResult, RecentAtVenueResult } from './types.js';
/**
 * 1. getTeamForm: Last n finished matches for a team
 */
export declare function getTeamForm(teamId: string, n: number | undefined, ctx: StatsContext): Promise<TeamFormResult>;
/**
 * 2. getHeadToHead: Head-to-Head statistics between two teams
 */
export declare function getHeadToHead(teamAId: string, teamBId: string, n: number | undefined, ctx: StatsContext & {
    venueId?: string;
}): Promise<HeadToHeadResult | null>;
/**
 * 3. getTeamComparison: Compare win rates, batting 1st vs 2nd, highest/lowest scores
 */
export declare function getTeamComparison(teamAId: string, teamBId: string, ctx: StatsContext, opts?: {
    venueId?: string;
}): Promise<TeamComparisonResult>;
/**
 * 4. getVenueStats: Venue trends, batting first vs second, scores, toss impact
 */
export declare function getVenueStats(venueId: string, ctx: StatsContext & {
    format?: HistFormat;
}): Promise<VenueStatsResult | null>;
/**
 * 5. getPaceSpin: Breakdown of pace vs spin at venue over last n matches
 */
export declare function getPaceSpin(venueId: string, n: number | undefined, ctx: StatsContext): Promise<PaceSpinResult>;
/**
 * 6. getRecentAtVenue: Scorecards and results of last n matches at venue
 */
export declare function getRecentAtVenue(venueId: string, n: number | undefined, ctx: StatsContext): Promise<RecentAtVenueResult>;
