import { Redis } from 'ioredis';

// Redis client singleton
let redis: Redis | null = null;

export function getRedisClient(): Redis | null {
  if (typeof window !== 'undefined') return null;
  
  if (!redis && process.env.REDIS_URL) {
    redis = new Redis(process.env.REDIS_URL, {
      retryStrategy: (times) => Math.min(times * 50, 2000),
      maxRetriesPerRequest: 3,
    });
  }
  return redis;
}

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  keyPrefix?: string;
}

interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
}

/**
 * Rate limit using Redis with sliding window
 * Falls back to in-memory if Redis unavailable
 */
export async function rateLimit(
  identifier: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const { windowMs, maxRequests, keyPrefix = 'ratelimit' } = config;
  const key = `${keyPrefix}:${identifier}`;
  const now = Date.now();
  const windowStart = now - windowMs;
  
  const client = getRedisClient();
  
  if (client) {
    try {
      // Remove old entries outside window
      await client.zremrangebyscore(key, 0, windowStart);
      
      // Count current requests in window
      const currentCount = await client.zcard(key);
      
      if (currentCount >= maxRequests) {
        // Get oldest request to calculate reset time
        const oldest = await client.zrange(key, 0, 0, 'WITHSCORES');
        const resetTime = parseInt(oldest[1]) + windowMs;
        
        return {
          allowed: false,
          limit: maxRequests,
          remaining: 0,
          resetTime,
        };
      }
      
      // Add current request
      await client.zadd(key, now, `${now}-${Math.random()}`);
      await client.expire(key, Math.ceil(windowMs / 1000));
      
      return {
        allowed: true,
        limit: maxRequests,
        remaining: maxRequests - currentCount - 1,
        resetTime: now + windowMs,
      };
    } catch (error) {
      console.error('Redis rate limit error:', error);
      // Fall through to in-memory fallback
    }
  }
  
  // In-memory fallback
  return inMemoryRateLimit(key, config);
}

// In-memory fallback store
const memoryStore = new Map<string, number[]>();

function inMemoryRateLimit(
  key: string,
  config: RateLimitConfig
): RateLimitResult {
  const { windowMs, maxRequests } = config;
  const now = Date.now();
  const windowStart = now - windowMs;
  
  // Get and clean old requests
  let requests = memoryStore.get(key) || [];
  requests = requests.filter(timestamp => timestamp > windowStart);
  
  if (requests.length >= maxRequests) {
    const resetTime = requests[0] + windowMs;
    return {
      allowed: false,
      limit: maxRequests,
      remaining: 0,
      resetTime,
    };
  }
  
  // Add current request
  requests.push(now);
  memoryStore.set(key, requests);
  
  return {
    allowed: true,
    limit: maxRequests,
    remaining: maxRequests - requests.length,
    resetTime: now + windowMs,
  };
}

/**
 * Stricter rate limiting for form submissions
 * Use this for contact forms, booking requests, etc.
 */
export async function strictRateLimit(identifier: string): Promise<RateLimitResult> {
  return rateLimit(identifier, {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 requests per 15 min
    keyPrefix: 'strict',
  });
}

/**
 * General API rate limiting
 * Use this for API endpoints
 */
export async function apiRateLimit(identifier: string): Promise<RateLimitResult> {
  return rateLimit(identifier, {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 30, // 30 requests per minute
    keyPrefix: 'api',
  });
}

/**
 * Per-route rate limiting for specific API endpoints
 * As per security requirements
 */

// Contact form: 5 requests per minute per IP
export async function contactRateLimit(identifier: string): Promise<RateLimitResult> {
  return rateLimit(identifier, {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 5,
    keyPrefix: 'contact',
  });
}

// Booking form: 5 requests per minute per IP
export async function bookRateLimit(identifier: string): Promise<RateLimitResult> {
  return rateLimit(identifier, {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 5,
    keyPrefix: 'book',
  });
}

// Bookings API: 10 requests per minute per IP
export async function bookingsApiRateLimit(identifier: string): Promise<RateLimitResult> {
  return rateLimit(identifier, {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10,
    keyPrefix: 'bookings',
  });
}

// Newsletter: 3 requests per minute per IP
export async function newsletterRateLimit(identifier: string): Promise<RateLimitResult> {
  return rateLimit(identifier, {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 3,
    keyPrefix: 'newsletter',
  });
}

// CSRF token: 20 requests per minute per IP
export async function csrfRateLimit(identifier: string): Promise<RateLimitResult> {
  return rateLimit(identifier, {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 20,
    keyPrefix: 'csrf',
  });
}
