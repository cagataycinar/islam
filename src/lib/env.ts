import { z } from 'zod';

const envSchema = z.object({
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required').default('mongodb://localhost:27017/islam'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters').default('your-super-secret-jwt-key-here-change-this-in-production'),
  APP_URL: z.string().url('APP_URL must be a valid URL').default('http://localhost:3000'),
  EXPO_PUSH_URL: z.string().url('EXPO_PUSH_URL must be a valid URL').default('https://exp.host/--/api/v2/push/send'),
  DEFAULT_LOCALE: z.enum(['en', 'tr']).default('en'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export const env = envSchema.parse(process.env);
