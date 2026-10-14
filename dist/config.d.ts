export declare const config: {
    PORT: number;
    HOST: string;
    REDIS_URL: string;
    DATABASE_URL: string;
    WEB_ORIGIN: string;
    FRONTEND_URL: string;
    CRICKET_PROVIDER: "mock" | "cricketdata" | "roanuz" | "sportradar";
    CRICKET_API_KEY: string;
    CRICKET_API_KEYS: string;
    CRICKET_DATA_API_KEY: string;
    PROVIDER_DAILY_BUDGET: number;
    PROVIDER_SAFETY_MARGIN: number;
    POLL_INTERVAL_LIVE_MS: number;
    POLL_INTERVAL_MS: number;
    ADMIN_TOKEN: string;
    NODE_ENV: "development" | "production" | "test";
};
