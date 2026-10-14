import { Redis } from 'ioredis';
import { config } from './config.js';
export function createRedisClient(label = 'default') {
    const client = new Redis(config.REDIS_URL, {
        maxRetriesPerRequest: 3,
        lazyConnect: true,
        retryStrategy(times) {
            const delay = Math.min(times * 100, 3000);
            return delay;
        },
        reconnectOnError() {
            return true;
        },
    });
    client.on('error', (err) => {
        console.warn(`[Redis:${label}] Note:`, err.message);
    });
    client.on('connect', () => {
        console.log(`[Redis:${label}] Connected successfully to Redis`);
    });
    return client;
}
export const redis = createRedisClient('main');
export const redisPublisher = createRedisClient('publisher');
export const redisSubscriber = createRedisClient('subscriber');
export const RedisKeys = {
    matchState: (matchId) => `match:${matchId}:state`,
    matchEvents: (matchId) => `match:${matchId}:events`,
    matchStream: (matchId) => `match:${matchId}:stream`,
    liveMatchesList: () => `matches:live:list`,
    todayMatches: () => `matches:today`,
    todayMatchesMeta: () => `matches:today:meta`,
    providerCalls: (dateStr) => `provider:calls:${dateStr}`,
    providerCache: (endpoint) => `provider:cache:${endpoint}`,
};
