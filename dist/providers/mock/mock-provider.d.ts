import type { CricketProvider, DateRange } from '../types.js';
import type { Match, MatchState, Scorecard, Commentary, BallEvent, MatchDeltaEvent } from '../../types/models.js';
export interface MockProviderOptions {
    fixturePath?: string;
    autoLoop?: boolean;
}
export declare class MockProvider implements CricketProvider {
    readonly name = "mock";
    private allBalls;
    private currentBallIndex;
    private sequence;
    private match;
    private firstInnings;
    private autoLoop;
    constructor(options?: MockProviderOptions);
    private loadFixture;
    reset(): void;
    setBallIndex(index: number): void;
    getCurrentBallIndex(): number;
    getTotalBalls(): number;
    /**
     * Advance by one ball and return the new ball event and delta
     */
    advanceBall(): {
        ball: BallEvent | null;
        delta: MatchDeltaEvent;
    };
    private buildCurrentState;
    getLiveMatches(): Promise<Match[]>;
    getMatchSnapshot(matchId: string): Promise<MatchState>;
    getFixtures(range?: DateRange): Promise<Match[]>;
    getScorecard(matchId: string): Promise<Scorecard>;
    getCommentary(matchId: string, cursor?: string): Promise<Commentary[]>;
}
