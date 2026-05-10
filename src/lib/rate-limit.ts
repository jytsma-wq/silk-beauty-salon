/**
 * Unified Rate Limiting with Upstash Redis
 *
 * This module consolidates all rate limiting onto Upstash Redis,
 * using the same Redis instance as middleware.ts for consistency.
 * The previous ioredis-based implementation has been removed.
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const upstashUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

// Upstash Redis client (same as middleware.ts)
const redis = new Redis({
  url: upstashUrl || 'https://example.com',
  token: upstashToken || 'placeholder_redis_token_for_local_dev',
});

const shouldBypassRateLimit =
  process.env.PLAYWRIGHT === '1' ||
  (process.env.NODE_ENV !== 'test' &&
    (process.env.SKIP_ENV_VALIDATION === '1' || !upstashUrl || upstashUrl.includes('example.')));

// Contact form: 5 requests per 15 minutes per IP
const contactLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, '15 m'),
  analytics: true,
  prefix: 'contact-rl',
});

// Booking form: 5 requests per 15 minutes per IP
const bookLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, '15 m'),
  analytics: true,
  prefix: 'book-rl',
});

// Newsletter: 3 requests per 15 minutes per IP
const newsletterLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(3, '15 m'),
  analytics: true,
  prefix: 'newsletter-rl',
});

// CSRF endpoint: 20 requests per minute per IP
const csrfLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '60 s'),
  analytics: true,
  prefix: 'csrf-rl',
});

// Bookings API: 10 requests per minute per IP
const bookingsApiLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '60 s'),
  analytics: true,
  prefix: 'bookings-rl',
});

// Generic API limiter: 30 requests per minute per IP
const apiLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, '60 s'),
  analytics: true,
  prefix: 'api-rl',
});

// Strict limiter: 5 requests per 15 minutes per IP
const strictLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, '15 m'),
  analytics: true,
  prefix: 'strict-rl',
});

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
}

async function applyLimit(limiter: Ratelimit, ip: string): Promise<RateLimitResult> {
  if (shouldBypassRateLimit) {
    return { allowed: true, limit: 1_000, remaining: 999, resetTime: Date.now() + 60_000 };
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
