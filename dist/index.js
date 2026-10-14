import Fastify from 'fastify';
import cors from '@fastify/cors';
import { config } from './config.js';
import { redis } from './redis.js';
import { casinoRoutes } from './routes/casino.js';
import { matchRoutes } from './routes/matches.js';
import { MatchIngestionWorker } from './worker/match-ingestion.js';
const server = Fastify({
    logger: {
        level: config.NODE_ENV === 'production' ? 'info' : 'debug',
    },
});
// Configure CORS for Vercel Frontend and local dev
await server.register(cors, {
    origin: true, // Allow requests from Vercel deployment, localhost, or any configured frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
});
// Health check endpoint for Railway and monitoring
server.get('/health', async () => {
    let redisStatus = 'disconnected';
    try {
        const ping = await redis.ping();
        if (ping === 'PONG')
            redisStatus = 'healthy';
    }
    catch (err) {
        redisStatus = `error: ${err.message}`;
    }
    return {
        status: 'ok',
        service: 'cricket-backend-railway',
        environment: config.NODE_ENV,
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        redis: redisStatus,
    };
});
server.get('/healthz', async () => ({ status: 'ok' }));
// Register routes
await server.register(casinoRoutes);
await server.register(matchRoutes);
// Initialize match ingestion worker in background
try {
    const ingestionWorker = new MatchIngestionWorker();
    console.log('🏏 [Backend] Match ingestion worker initialized.');
}
catch (e) {
    console.warn('⚠️ [Backend] Ingestion worker notice:', e.message);
}
// Start Server
const start = async () => {
    try {
        const port = Number(process.env.PORT) || config.PORT || 4001;
        const host = config.HOST || '0.0.0.0';
        await server.listen({ port, host });
        console.log(`🚀 [Railway Backend] Server running on http://${host}:${port}`);
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};
start();
