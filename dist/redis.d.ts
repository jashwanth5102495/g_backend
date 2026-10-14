import { Redis } from 'ioredis';
export declare function createRedisClient(label?: string): Redis;
export declare const redis: Redis;
export declare const redisPublisher: Redis;
export declare const redisSubscriber: Redis;
export declare const RedisKeys: {
    matchState: (matchId: string) => string;
    matchEvents: (matchId: string) => string;
    matchStream: (matchId: string) => string;
    liveMatchesList: () => string;
    todayMatches: () => string;
    todayMatchesMeta: () => string;
    providerCalls: (dateStr: string) => string;
    providerCache: (endpoint: string) => string;
};
