import { config } from '../config.js';
import { redis, redisSubscriber, RedisKeys } from '../redis.js';
import { prisma } from '../db.js';
import { getTeamForm, getHeadToHead, getTeamComparison, getVenueStats, getPaceSpin, getRecentAtVenue, } from '../stats/index.js';
export const matchRoutes = async (fastify) => {
    // 1. Get Today Matches from Redis Cache
    fastify.get('/api/matches/today', async (request, reply) => {
        try {
            const [matchesRaw, metaRaw] = await Promise.all([
                redis.get(RedisKeys.todayMatches()),
                redis.get(RedisKeys.todayMatchesMeta()),
            ]);
            const matches = matchesRaw ? JSON.parse(matchesRaw) : [];
            const meta = metaRaw ? JSON.parse(metaRaw) : null;
            reply.header('Cache-Control', 'public, max-age=5, stale-while-revalidate=15');
            return {
                matches,
                meta: meta || {
                    provider: config.CRICKET_PROVIDER,
                    lastUpdated: new Date().toISOString(),
                    isStale: false,
                },
            };
        }
        catch (err) {
            return reply.status(500).send({ error: 'Failed to retrieve today matches', details: err.message });
        }
    });
    // 2. Get Live Matches from Redis Cache
    fastify.get('/api/matches/live', async (request, reply) => {
        try {
            const data = await redis.get(RedisKeys.liveMatchesList());
            if (!data)
                return [];
            reply.header('Cache-Control', 'public, max-age=2, stale-while-revalidate=5');
            return JSON.parse(data);
        }
        catch (err) {
            return reply.status(500).send({ error: 'Failed to retrieve live matches' });
        }
    });
    // 3. Match Snapshot
    fastify.get('/api/matches/:id/snapshot', async (request, reply) => {
        const { id } = request.params;
        try {
            const data = await redis.get(RedisKeys.matchState(id));
            if (!data) {
                return reply.status(404).send({ error: `Match snapshot for ${id} not found` });
            }
            reply.header('Cache-Control', 'public, max-age=1, stale-while-revalidate=2');
            return JSON.parse(data);
        }
        catch (err) {
            return reply.status(500).send({ error: 'Failed to retrieve match snapshot' });
        }
    });
    // 4. Match Historical Stats (Cricsheet Computed Analytics)
    fastify.get('/api/matches/:id/stats', async (request, reply) => {
        const { id } = request.params;
        const { teamAId, teamBId, venueId } = request.query;
        try {
            const ctx = { prisma, redis, statsVersion: 1 };
            const [teamAForm, teamBForm, h2h, teamComparison, venueStats, paceSpin, recentVenue] = await Promise.all([
                teamAId ? getTeamForm(teamAId, 5, ctx) : null,
                teamBId ? getTeamForm(teamBId, 5, ctx) : null,
                teamAId && teamBId ? getHeadToHead(teamAId, teamBId, 10, { ...ctx, venueId }) : null,
                teamAId && teamBId ? getTeamComparison(teamAId, teamBId, ctx, { venueId }) : null,
                venueId ? getVenueStats(venueId, ctx) : null,
                venueId ? getPaceSpin(venueId, 10, ctx) : null,
                venueId ? getRecentAtVenue(venueId, 3, ctx) : null,
            ]);
            return {
                matchId: id,
                source: 'Cricsheet (ODC-By v1.0)',
                attribution: 'Historical data: Cricsheet',
                teamAForm,
                teamBForm,
                h2h,
                teamComparison,
                venueStats,
                paceSpin,
                recentVenue,
            };
        }
        catch (err) {
            return reply.status(500).send({ error: 'Failed to compute match statistics', details: err.message });
        }
    });
    // 5. SSE Live Event Stream
    fastify.get('/api/matches/:id/events', async (request, reply) => {
        const { id } = request.params;
        reply.raw.setHeader('Content-Type', 'text/event-stream');
        reply.raw.setHeader('Cache-Control', 'no-cache, no-transform');
        reply.raw.setHeader('Connection', 'keep-alive');
        reply.raw.setHeader('Access-Control-Allow-Origin', '*');
        // Send initial snapshot
        const snapshotRaw = await redis.get(RedisKeys.matchState(id));
        if (snapshotRaw) {
            reply.raw.write(`event: snapshot\ndata: ${snapshotRaw}\n\n`);
        }
        const channel = RedisKeys.matchStream(id);
        const subClient = redisSubscriber;
        const messageHandler = (ch, message) => {
            if (ch === channel) {
                reply.raw.write(`event: update\ndata: ${message}\n\n`);
            }
        };
        await subClient.subscribe(channel);
        subClient.on('message', messageHandler);
        // Heartbeat
        const heartbeat = setInterval(() => {
            reply.raw.write(': heartbeat\n\n');
        }, 15000);
        request.raw.on('close', async () => {
            clearInterval(heartbeat);
            subClient.off('message', messageHandler);
            await subClient.unsubscribe(channel);
        });
    });
};
