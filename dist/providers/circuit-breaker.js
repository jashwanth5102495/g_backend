export class CircuitBreakerError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CircuitBreakerError';
    }
}
export class CircuitBreaker {
    state = 'CLOSED';
    failureCount = 0;
    successCount = 0;
    lastFailureTime = 0;
    failureThreshold;
    recoveryTimeMs;
    successThreshold;
    timeoutMs;
    constructor(options = {}) {
        this.failureThreshold = options.failureThreshold ?? 5;
        this.recoveryTimeMs = options.recoveryTimeMs ?? 30000;
        this.successThreshold = options.successThreshold ?? 2;
        this.timeoutMs = options.timeoutMs ?? 8000;
    }
    getState() {
        if (this.state === 'OPEN') {
            const now = Date.now();
            if (now - this.lastFailureTime > this.recoveryTimeMs) {
                this.state = 'HALF_OPEN';
                this.successCount = 0;
            }
        }
        return this.state;
    }
    async execute(fn) {
        const currentState = this.getState();
        if (currentState === 'OPEN') {
            throw new CircuitBreakerError(`Circuit breaker is OPEN. Fast failing to prevent upstream provider overload. Cool-off expires in ${Math.round((this.recoveryTimeMs - (Date.now() - this.lastFailureTime)) / 1000)}s`);
        }
        try {
            // Execute with timeout
            const result = await Promise.race([
                fn(),
                new Promise((_, reject) => setTimeout(() => reject(new Error(`Operation timed out after ${this.timeoutMs}ms`)), this.timeoutMs)),
            ]);
            this.onSuccess();
            return result;
        }
        catch (err) {
            this.onFailure();
            throw err;
        }
    }
    onSuccess() {
        if (this.state === 'HALF_OPEN') {
            this.successCount++;
            if (this.successCount >= this.successThreshold) {
                this.state = 'CLOSED';
                this.failureCount = 0;
            }
        }
        else {
            this.failureCount = 0;
        }
    }
    onFailure() {
        this.lastFailureTime = Date.now();
        if (this.state === 'HALF_OPEN') {
            this.state = 'OPEN';
        }
        else {
            this.failureCount++;
            if (this.failureCount >= this.failureThreshold) {
                this.state = 'OPEN';
            }
        }
    }
    reset() {
        this.state = 'CLOSED';
        this.failureCount = 0;
        this.successCount = 0;
        this.lastFailureTime = 0;
    }
}
export async function withExponentialBackoff(operation, maxRetries = 3, initialDelayMs = 500, factor = 2) {
    let delay = initialDelayMs;
    let lastError;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await operation();
        }
        catch (err) {
            lastError = err;
            if (attempt === maxRetries)
                break;
            await new Promise((res) => setTimeout(res, delay));
            delay *= factor;
        }
    }
    throw lastError;
}
