/**
 * Comprehensive Team Code Lookup Table and Helper.
 * Maps team names to standard 3-letter codes.
 * Falls back gracefully to shortname hints or first 3 uppercase letters.
 */
export declare const TEAM_CODE_MAP: Record<string, string>;
/**
 * Returns a standardized 3-letter (or 2-4 letter) uppercase team code.
 */
export declare function getTeamCode(teamName: string, shortnameHint?: string): string;
