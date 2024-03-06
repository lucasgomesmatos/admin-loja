import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('Invalid environment variables', env.error.format());
  throw new Error('Invalid environment variables.');
}

export const environment = env.data;
