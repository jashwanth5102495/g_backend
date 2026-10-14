import type { CricketProvider, DateRange } from '../types.js';
import type { Match, MatchState, Scorecard, Commentary } from '../../types/models.js';
/**
 * STUB: Roanuz Cricket API Provider
 * Docs: https://www.cricketapi.com/documentation/
 *
 * TODO: Implement when a Roanuz API license key is available.
 * Required steps:
 * 1. Implement Roanuz OAuth token exchange (POST to /v5/core/{app_id}/auth/).
 * 2. Connect to Roanuz WebSocket endpoint for ultra-low latency ball-by-ball push.
 * 3. Map Roanuz match summary schema to internal Match model.
 * 4. Map Roanuz ball-by-ball payload into internal BallEvent model.
 */
export declare class RoanuzCricketProvider implements CricketProvider {
    readonly name = "roanuz";
    getLiveMatches(): Promise<Match[]>;
    getMatchSnapshot(matchId: string): Promise<MatchState>;
    getFixtures(range?: DateRange): Promise<Match[]>;
    getScorecard(matchId: string): Promise<Scorecard>;
    getCommentary(matchId: string, cursor?: string): Promise<Commentary[]>;
}
/**
 * STUB: Sportradar Cricket API Provider
 * Docs: https://developer.sportradar.com/docs/read/cricket/Cricket_v2
 *
 * TODO: Implement when Sportradar Cricket v2 API access is provisioned.
 * Required steps:
 * 1. Provision Sportradar API Key with trial or production subscription.
 * 2. Call /cricket-t2/en/tournaments/live_summaries.json for live polling.
 * 3. Map Sportradar match timelines, probabilities, and player statistics.
 */
export declare class SportradarCricketProvider implements CricketProvider {
    readonly name = "sportradar";
    getLiveMatches(): Promise<Match[]>;
    getMatchSnapshot(matchId: string): Promise<MatchState>;
    getFixtures(range?: DateRange): Promise<Match[]>;
    getScorecard(matchId: string): Promise<Scorecard>;
    getCommentary(matchId: string, cursor?: string): Promise<Commentary[]>;
}
