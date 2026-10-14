export interface QuotaGuardOptions {
    providerName: string;
    dailyBudget?: number;
    maxCallsPerMinute?: number;
}
export declare class QuotaExceededError extends Error {
    constructor(message: string);
}
export declare class QuotaGuard {
    private readonly providerName;
    private readonly dailyBudget;
    private readonly maxCallsPerMinute;
    private dailyCalls;
    private currentDay;
    private callTimestamps;
    constructor(options: QuotaGuardOptions);
    private getTodayUtc;
    private checkDayReset;
    checkQuota(): void;
    recordCall(): void;
    getStats(): {
        providerName: string;
        dailyBudget: number;
        callsToday: number;
        remainingCallsToday: number;
        callsLastMinute: number;
        date: string;
    };
    reset(): void;
}
