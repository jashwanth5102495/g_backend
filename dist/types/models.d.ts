export type MatchFormat = 'T20' | 'ODI' | 'TEST' | '100BALL';
export type MatchStatus = 'upcoming' | 'live' | 'completed' | 'abandoned';
export type TossDecision = 'bat' | 'bowl';
export type ExtrasType = 'wide' | 'noBall' | 'bye' | 'legBye' | 'penalty';
export type WicketType = 'bowled' | 'caught' | 'lbw' | 'run out' | 'stumped' | 'hit wicket' | 'retired hurt' | 'obstructing field' | 'timed out' | 'handled ball';
export interface Team {
    id: string;
    name: string;
    shortName: string;
    code: string;
    logoUrl?: string;
    primaryColor?: string;
}
export interface Player {
    id: string;
    name: string;
    shortName: string;
    role: 'batter' | 'bowler' | 'allRounder' | 'wicketKeeper';
    avatarUrl?: string;
}
export interface BatterStats {
    id: string;
    name: string;
    runs: number;
    balls: number;
    fours: number;
    sixes: number;
    strikeRate: number;
    isOut: boolean;
    dismissal?: {
        type: WicketType;
        bowlerId?: string;
        bowlerName?: string;
        fielderId?: string;
        fielderName?: string;
        text: string;
    };
}
export interface BowlerStats {
    id: string;
    name: string;
    overs: number;
    maidens: number;
    runs: number;
    wickets: number;
    economy: number;
    wides: number;
    noBalls: number;
    dots: number;
}
export interface ExtrasBreakdown {
    wides: number;
    noBalls: number;
    byes: number;
    legByes: number;
    penalty: number;
    total: number;
}
export interface FallOfWicket {
    wicketNumber: number;
    runs: number;
    overs: number;
    playerDismissedId: string;
    playerDismissedName: string;
}
export interface Partnership {
    runs: number;
    balls: number;
    batter1Id: string;
    batter1Name: string;
    batter1Runs: number;
    batter1Balls: number;
    batter2Id: string;
    batter2Name: string;
    batter2Runs: number;
    batter2Balls: number;
}
export interface BallEvent {
    sequence: number;
    ballId: string;
    matchId: string;
    inningsId: string;
    over: number;
    ballInOver: number;
    legalBallNumber: number;
    displayOver: string;
    strikerId: string;
    strikerName: string;
    nonStrikerId: string;
    nonStrikerName: string;
    bowlerId: string;
    bowlerName: string;
    runsBat: number;
    extrasType?: ExtrasType | null;
    extrasRuns: number;
    totalRuns: number;
    isBoundary: boolean;
    isFour: boolean;
    isSix: boolean;
    isWicket: boolean;
    wicketType?: WicketType;
    dismissedPlayerId?: string;
    dismissedPlayerName?: string;
    commentary: string;
    timestamp: number;
}
export interface OverSummary {
    overNumber: number;
    bowlerId: string;
    bowlerName: string;
    runs: number;
    wickets: number;
    balls: BallEvent[];
}
export interface Innings {
    id: string;
    matchId: string;
    inningsNumber: number;
    battingTeamId: string;
    bowlingTeamId: string;
    runs: number;
    wickets: number;
    overs: number;
    balls: number;
    runRate: number;
    targetRuns?: number;
    requiredRunRate?: number;
    extras: ExtrasBreakdown;
    batters: BatterStats[];
    bowlers: BowlerStats[];
    fallOfWickets: FallOfWicket[];
    isCompleted: boolean;
}
export interface WinProbabilityResult {
    teamAId: string;
    teamAName: string;
    teamAProb: number;
    teamBId: string;
    teamBName: string;
    teamBProb: number;
    confidence: number;
    projectedScore?: number;
    factors?: {
        ballsRemaining: number;
        wicketsInHand: number;
        requiredRunRate?: number;
        currentRunRate: number;
        parScore: number;
    };
}
export interface ScoreSummary {
    r: number;
    w: number;
    o: number;
    inning: string;
}
export interface TeamScoreSummary {
    runs: number;
    wickets: number;
    overs: number;
    display: string;
}
export interface Match {
    id: string;
    slug: string;
    title: string;
    seriesId: string;
    seriesName: string;
    format: MatchFormat;
    status: MatchStatus;
    statusText: string;
    venue: string;
    city: string;
    startTime: string;
    teamA: Team;
    teamB: Team;
    matchNumber?: string;
    teamAScore?: TeamScoreSummary;
    teamBScore?: TeamScoreSummary;
    scores?: ScoreSummary[];
    toss?: {
        winnerId: string;
        decision: TossDecision;
        text: string;
    };
    winnerId?: string;
    resultText?: string;
    currentInningsNumber: number;
    hasSquad?: boolean;
    fantasyEnabled?: boolean;
    bbbEnabled?: boolean;
}
export interface MatchState {
    match: Match;
    currentInnings: Innings;
    innings: Innings[];
    currentBatters: [BatterStats, BatterStats];
    currentBowler: BowlerStats;
    currentPartnership: Partnership;
    thisOver: BallEvent[];
    lastOvers: OverSummary[];
    recentBalls: BallEvent[];
    analytics: {
        currentRunRate: number;
        requiredRunRate?: number;
        projectedScore?: number;
        dotBallPercentage: number;
        boundaryPercentage: number;
        winProbability: WinProbabilityResult;
    };
    sequence: number;
    stateHash: string;
    lastUpdated: number;
}
export interface MatchDeltaEvent {
    sequence: number;
    matchId: string;
    timestamp: number;
    type: 'ball' | 'wicket' | 'boundary' | 'innings_break' | 'match_end' | 'state_sync';
    ball?: BallEvent;
    scoreChange?: {
        runs: number;
        wickets: number;
        overs: number;
        currentRunRate: number;
        requiredRunRate?: number;
    };
    winProbability?: WinProbabilityResult;
    message?: string;
}
export interface Scorecard {
    match: Match;
    innings: Innings[];
}
export interface Commentary {
    id: string;
    matchId: string;
    sequence: number;
    over: number;
    ball: number;
    displayOver: string;
    text: string;
    runs: number;
    isBoundary: boolean;
    isWicket: boolean;
    timestamp: number;
}
