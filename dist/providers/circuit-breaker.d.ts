export type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';
export interface CircuitBreakerOptions {
    failureThreshold?: number;
    recoveryTimeMs?: number;
    successThreshold?: number;
    timeoutMs?: number;
}
export declare class CircuitBreakerError extends Error {
    constructor(message: string);
}
export declare class CircuitBreaker {
    private state;
    private failureCount;
    private successCount;
    private lastFailureTime;
    private readonly failureThreshold;
    private readonly recoveryTimeMs;
    private readonly successThreshold;
    private readonly timeoutMs;
    constructor(options?: CircuitBreakerOptions);
    getState(): CircuitState;
    execute<T>(fn: () => Promise<T>): Promise<T>;
    private onSuccess;
    private onFailure;
    reset(): void;
}
export declare function withExponentialBackoff<T>(operation: () => Promise<T>, maxRetries?: number, initialDelayMs?: number, factor?: number): Promise<T>;
