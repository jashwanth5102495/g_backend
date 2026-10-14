import type { MatchFormat, WinProbabilityResult } from '../types/models.js';
export interface MatchStateInput {
    format: MatchFormat;
    inningsNumber: number;
    teamAId: string;
    teamAName: string;
    teamBId: string;
    teamBName: string;
    battingTeamId: string;
    runs: number;
    wickets: number;
    balls: number;
    targetRuns?: number;
    totalOvers?: number;
}
export interface WinProbabilityEngine {
    calculate(input: MatchStateInput): WinProbabilityResult;
}
export declare class ResourceBasedWinProbabilityEngine implements WinProbabilityEngine {
    calculate(input: MatchStateInput): WinProbabilityResult;
}
export declare const defaultWinProbabilityEngine: ResourceBasedWinProbabilityEngine;
export declare function calculateWinProbability(input: MatchStateInput): WinProbabilityResult;
