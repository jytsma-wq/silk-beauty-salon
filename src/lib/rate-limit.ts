/**
 * Unified Rate Limiting with Upstash Redis
 *
 * This module consolidates all rate limiting onto Upstash Redis,
 * using the same Redis instance as middleware.ts for consistency.
 * The previous ioredis-based implementation has been removed.
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const hasRedisConfig = !!UPSTASH_REDIS_REST_URL && !!UPSTASH_REDIS_REST_TOKEN;

if (!hasRedisConfig && process.env.NODE_ENV === 'production' && process.env.SKIP_ENV_VALIDATION !== '1') {
  throw new Error(
    'Missing Upstash Redis credentials. Please set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN environment variables.'
  );
}

// Upstash Redis client (same as middleware.ts)
const redis = hasRedisConfig
  ? new Redis({
      url: UPSTASH_REDIS_REST_URL,
      token: UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

function createLimiter(
  limiter: ReturnType<typeof Ratelimit.fixedWindow> | ReturnType<typeof Ratelimit.slidingWindow>,
  prefix: string
) {
  return redis
    ? new Ratelimit({
        redis,
        limiter,
        analytics: true,
        prefix,
      })
    : null;
}

// Contact form: 5 requests per 15 minutes per IP
const contactLimiter = createLimiter(Ratelimit.fixedWindow(5, '15 m'), 'contact-rl');

// Booking form: 5 requests per 15 minutes per IP
const bookLimiter = createLimiter(Ratelimit.fixedWindow(5, '15 m'), 'book-rl');

// Newsletter: 3 requests per 15 minutes per IP
const newsletterLimiter = createLimiter(Ratelimit.fixedWindow(3, '15 m'), 'newsletter-rl');

// CSRF endpoint: 20 requests per minute per IP
const csrfLimiter = createLimiter(Ratelimit.slidingWindow(20, '60 s'), 'csrf-rl');

// Bookings API: 10 requests per minute per IP
const bookingsApiLimiter = createLimiter(Ratelimit.slidingWindow(10, '60 s'), 'bookings-rl');

// Generic API limiter: 30 requests per minute per IP
const apiLimiter = createLimiter(Ratelimit.slidingWindow(30, '60 s'), 'api-rl');

// Strict limiter: 5 requests per 15 minutes per IP
const strictLimiter = createLimiter(Ratelimit.fixedWindow(5, '15 m'), 'strict-rl');

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
}

async function applyLimit(limiter: Ratelimit | null, ip: string): Promise<RateLimitResult> {
  if (!limiter) {
    return { allowed: true, limit: 0, remaining: 0, resetTime: Date.now() + 60_000 };
  }

  const { success, limit, remaining, reset } = await limiter.limit(ip);
  return { allowed: success, limit, remaining, resetTime: reset };
}

// Export preconfigured rate limiters
export const contactRateLimit = (ip: string) => applyLimit(contactLimiter, ip);
export const bookRateLimit = (ip: string) => applyLimit(bookLimiter, ip);
export const newsletterRateLimit = (ip: string) => applyLimit(newsletterLimiter, ip);
export const csrfRateLimit = (ip: string) => applyLimit(csrfLimiter, ip);
export const strictRateLimit = (ip: string) => applyLimit(strictLimiter, ip);
export const apiRateLimit = (ip: string) => applyLimit(apiLimiter, ip);
export const bookingsApiRateLimit = (ip: string) => applyLimit(bookingsApiLimiter, ip);

// Legacy exports for backward compatibility (deprecated)
/** @deprecated Use limiters directly instead */
export async function rateLimit(
  _identifier: string,
  _config: { windowMs: number; maxRequests: number; keyPrefix?: string }
): Promise<RateLimitResult> {
  throw new Error('rateLimit() is deprecated. Use specific limiters like contactRateLimit(), apiRateLimit(), etc.');
}

/** @deprecated No longer needed with Upstash */
export function getRedisClient(): null {
  return null;
}
