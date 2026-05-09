import { z } from 'zod';

/**
 * Comprehensive Environment Variable Validation
 * Parses all env vars at module load time and throws on any invalid/missing
 */

// ============================================================================
// SERVER-SIDE ENVIRONMENT VARIABLES (never exposed to client)
// ============================================================================
const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL'),

  RESEND_API_KEY: z.string().min(20, 'RESEND_API_KEY must be at least 20 characters'),

  RESEND_AUDIENCE_ID: z.string().uuid('RESEND_AUDIENCE_ID must be a valid UUID'),

  CONTACT_EMAIL: z.string().email('CONTACT_EMAIL must be a valid email address'),

  API_SECRET_KEY: z.string().min(32, 'API_SECRET_KEY must be at least 32 characters (use: openssl rand -hex 32)'),

  UPSTASH_REDIS_REST_URL: z.string().url('UPSTASH_REDIS_REST_URL must be a valid URL'),

  UPSTASH_REDIS_REST_TOKEN: z.string().min(20, 'UPSTASH_REDIS_REST_TOKEN must be at least 20 characters'),

  BUILD_TIMESTAMP: z.string().datetime().optional(),

  SENTRY_DSN: z.string().url().optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),
});

// ============================================================================
// PUBLIC ENVIRONMENT VARIABLES (safe for client bundle)
// ============================================================================
const publicEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional().default('https://silkbeautysalon.online'),

  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().regex(/^G-[A-Z0-9]{10,}$/).optional(),

  NEXT_PUBLIC_GTM_ID: z.string().regex(/^GTM-[A-Z0-9]{7,}$/).optional(),

  NEXT_PUBLIC_FB_PIXEL_ID: z.string().regex(/^\d+$/).optional(),

  NEXT_PUBLIC_CALCOM_USERNAME: z.string().min(1).optional(),

  NEXT_PUBLIC_APP_VERSION: z
    .string()
    .regex(/^\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?$/, 'Must be a semver string like 1.2.3')
    .optional(),

  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
});

// ============================================================================
// COMBINED SCHEMA FOR FULL VALIDATION
// ============================================================================
const fullEnvSchema = serverEnvSchema.merge(publicEnvSchema);

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================
export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type PublicEnv = z.infer<typeof publicEnvSchema>;
export type FullEnv = z.infer<typeof fullEnvSchema>;

// ============================================================================
// CLIENT-SIDE ACCESS GUARD
// ============================================================================
// Only throw in actual browser environment, not in test/jsdom
if (typeof window !== 'undefined' && !process.env.VITEST && !process.env.NODE_ENV?.includes('test')) {
  throw new Error(
    '❌ Server environment variables were accessed on the client side. ' +
    'This is a security risk. Use only NEXT_PUBLIC_* variables in client code.'
  );
}

// ============================================================================
// VALIDATION FUNCTION - Throws with ALL errors, not just first one
// ============================================================================
function validateEnv(): FullEnv {
  const result = fullEnvSchema.safeParse(process.env);

  if (!result.success) {
    const issues = result.error.issues;
    const formattedErrors = issues.map((issue) => {
      const path = issue.path.join('.');
      return `  - ${path}: ${issue.message}`;
    }).join('\n');

    const errorMessage = `\n❌ Environment validation failed with ${issues.length} error(s):\n${formattedErrors}\n\nPlease check your .env file and ensure all required variables are set.`;

    throw new Error(errorMessage);
  }

  return result.data;
}

const shouldSkipEnvValidation =
  process.env.SKIP_ENV_VALIDATION === '1' ||
  process.env.NEXT_PHASE === 'phase-production-build';

const buildFallbackEnv: FullEnv = {
  NODE_ENV: (process.env.NODE_ENV as FullEnv['NODE_ENV']) || 'production',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://build:build@localhost:5432/build',
  RESEND_API_KEY: process.env.RESEND_API_KEY || 'build_placeholder_resend_key',
  RESEND_AUDIENCE_ID: process.env.RESEND_AUDIENCE_ID || '00000000-0000-4000-8000-000000000000',
  CONTACT_EMAIL: process.env.CONTACT_EMAIL || 'info@silkbeauty.ge',
  API_SECRET_KEY: process.env.API_SECRET_KEY || 'build_placeholder_secret_key_32_chars',
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL || 'https://example.com',
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN || 'build_placeholder_redis_token',
  BUILD_TIMESTAMP: process.env.BUILD_TIMESTAMP,
  SENTRY_DSN: process.env.SENTRY_DSN,
  SENTRY_ORG: process.env.SENTRY_ORG,
  SENTRY_PROJECT: process.env.SENTRY_PROJECT,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://silkbeauty.ge',
  NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
  NEXT_PUBLIC_FB_PIXEL_ID: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
  NEXT_PUBLIC_CALCOM_USERNAME: process.env.NEXT_PUBLIC_CALCOM_USERNAME,
  NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
};

// ============================================================================
// EXPORT TYPED ENV OBJECTS
// ============================================================================
// Only auto-validate in non-test environments
const env = process.env.VITEST || process.env.NODE_ENV === 'test'
  ? {} as FullEnv  // Empty object for tests (schemas used directly)
  : shouldSkipEnvValidation
    ? buildFallbackEnv
    : validateEnv();

export { env };

// Export server-only env subset (only in non-test)
export const serverEnv: ServerEnv = process.env.VITEST || process.env.NODE_ENV === 'test'
  ? {} as ServerEnv
  : {
      NODE_ENV: env.NODE_ENV,
      DATABASE_URL: env.DATABASE_URL,
      RESEND_API_KEY: env.RESEND_API_KEY,
      RESEND_AUDIENCE_ID: env.RESEND_AUDIENCE_ID,
      CONTACT_EMAIL: env.CONTACT_EMAIL,
      API_SECRET_KEY: env.API_SECRET_KEY,
      UPSTASH_REDIS_REST_URL: env.UPSTASH_REDIS_REST_URL,
      UPSTASH_REDIS_REST_TOKEN: env.UPSTASH_REDIS_REST_TOKEN,
    };

// Export public env subset (only in non-test)
export const publicEnv: PublicEnv = process.env.VITEST || process.env.NODE_ENV === 'test'
  ? {} as PublicEnv
  : {
      NEXT_PUBLIC_SITE_URL: env.NEXT_PUBLIC_SITE_URL,
      NEXT_PUBLIC_GA_MEASUREMENT_ID: env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
      NEXT_PUBLIC_GTM_ID: env.NEXT_PUBLIC_GTM_ID,
      NEXT_PUBLIC_FB_PIXEL_ID: env.NEXT_PUBLIC_FB_PIXEL_ID,
      NEXT_PUBLIC_CALCOM_USERNAME: env.NEXT_PUBLIC_CALCOM_USERNAME,
      NEXT_PUBLIC_APP_VERSION: env.NEXT_PUBLIC_APP_VERSION,
      NEXT_PUBLIC_SENTRY_DSN: env.NEXT_PUBLIC_SENTRY_DSN,
    };

// Export validation function for tests
export { validateEnv };

// Re-export schemas for testing
export { serverEnvSchema, publicEnvSchema, fullEnvSchema };
