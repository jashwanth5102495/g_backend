import dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config();
const envSchema = z.object({
    PORT: z.coerce.number().default(4001),
    HOST: z.string().default('0.0.0.0'),
    REDIS_URL: z.string().default('redis://localhost:6379'),
    DATABASE_URL: z
        .string()
        .default('postgresql://cricket:cricket_secret@localhost:5433/livecricket?schema=public'),
    WEB_ORIGIN: z.string().default('http://localhost:3001'),
    FRONTEND_URL: z.string().optional().default(''),
    CRICKET_PROVIDER: z.enum(['mock', 'cricketdata', 'roanuz', 'sportradar']).default('cricketdata'),
    CRICKET_API_KEY: z.string().optional().default(''),
    CRICKET_API_KEYS: z.string().optional().default(''),
    CRICKET_DATA_API_KEY: z.string().optional().default(''),
    PROVIDER_DAILY_BUDGET: z.coerce.number().default(300),
    PROVIDER_SAFETY_MARGIN: z.coerce.number().default(0.8),
    POLL_INTERVAL_LIVE_MS: z.coerce.number().default(2000),
    POLL_INTERVAL_MS: z.coerce.number().default(2000),
    ADMIN_TOKEN: z.string().default('livecricket-admin-secret-2026'),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error('❌ Invalid backend environment variables:', parsed.error.format());
    process.exit(1);
}
export const config = parsed.data;
