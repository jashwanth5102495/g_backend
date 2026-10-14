export class QuotaExceededError extends Error {
    constructor(message) {
        super(message);
        this.name = 'QuotaExceededError';
    }
}
export class QuotaGuard {
    providerName;
    dailyBudget;
    maxCallsPerMinute;
    dailyCalls = 0;
    currentDay = '';
    callTimestamps = [];
    constructor(options) {
        this.providerName = options.providerName;
        this.dailyBudget = options.dailyBudget ?? 100;
        this.maxCallsPerMinute = options.maxCallsPerMinute ?? 30;
        this.currentDay = this.getTodayUtc();
    }
    getTodayUtc() {
        return new Date().toISOString().slice(0, 10);
    }
    checkDayReset() {
        const today = this.getTodayUtc();
        if (this.currentDay !== today) {
            this.currentDay = today;
            this.dailyCalls = 0;
            this.callTimestamps = [];
        }
    }
    checkQuota() {
        this.checkDayReset();
        if (this.dailyCalls >= this.dailyBudget) {
            throw new QuotaExceededError(`Daily API quota budget of ${this.dailyBudget} calls exceeded for provider [${this.providerName}]. Calls made today: ${this.dailyCalls}`);
        }
        const now = Date.now();
        const oneMinuteAgo = now - 60_000;
        this.callTimestamps = this.callTimestamps.filter((ts) => ts > oneMinuteAgo);
        if (this.callTimestamps.length >= this.maxCallsPerMinute) {
            throw new QuotaExceededError(`Rate limit exceeded for provider [${this.providerName}]: max ${this.maxCallsPerMinute} calls per minute.`);
        }
    }
    recordCall() {
        this.checkDayReset();
        this.dailyCalls++;
        this.callTimestamps.push(Date.now());
    }
    getStats() {
        this.checkDayReset();
        const now = Date.now();
        const oneMinuteAgo = now - 60_000;
        const callsLastMinute = this.callTimestamps.filter((ts) => ts > oneMinuteAgo).length;
        return {
            providerName: this.providerName,
            dailyBudget: this.dailyBudget,
            callsToday: this.dailyCalls,
            remainingCallsToday: Math.max(0, this.dailyBudget - this.dailyCalls),
            callsLastMinute,
            date: this.currentDay,
        };
    }
    reset() {
        this.dailyCalls = 0;
        this.callTimestamps = [];
        this.currentDay = this.getTodayUtc();
    }
}
