import { z } from 'zod'
import { config } from 'dotenv'

config();

const envSchema = z.object({
    PORT: z.string().default('3000'),
    LOG_LEVEL: z.string().default('info'),
    NODE_ENV: z.enum(['development', 'production', 'staging', 'test']).default('development'),

    JWT_SECRET: z.string(),
    JWT_REFRESH_SECRET: z.string().optional(),

    RESEND_API_KEY: z.string(),
    EMAIL_FROM: z.string(),
    FRONTEND_URL: z.string().optional(),
    MONGO_URI: z.string(),

    OPENROUTER_API_URL: z.string().default('https://openrouter.ai/api/v1/chat/completions'),
    OPENROUTER_API_KEY: z.string().optional(),
    OPENROUTER_MODEL: z.string().default('openai/gpt-4o-mini'),
})

const { data: env, error } = envSchema.safeParse(process.env);

if (error) {
    console.error("❌ Invalid env:");
    console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
    process.exit(1);
}

export default env!;
