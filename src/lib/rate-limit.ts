/**
 * In-process rate limiting.
 *
 * This keeps public forms protected without requiring an external service.
 * Limits are best-effort per running Node.js process.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RateLimitConfig {
  limit: number;
  windowMs: number;
  prefix: string;
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

function cleanupExpiredEntries(now: number): void {
  for (const [key, entry] of store.entries()) {
    if (entry.resetTime <= now) {
      store.delete(key);
    }
  }
}

function applyLimit(ip: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now();
  const key = `${config.prefix}:${ip}`;

  cleanupExpiredEntries(now);

  let entry = store.get(key);
  if (!entry || entry.resetTime <= now) {
    entry = {
      count: 0,
      resetTime: now + config.windowMs,
    };
  }

  entry.count += 1;
  store.set(key, entry);

  const remaining = Math.max(config.limit - entry.count, 0);

  return {
    allowed: entry.count <= config.limit,
    limit: config.limit,
    remaining,
    resetTime: entry.resetTime,
  };
}

export const contactRateLimit = (ip: string) => applyLimit(ip, {
  limit: 5,
  windowMs: 15 * 60 * 1000,
  prefix: 'contact',
});

export const bookRateLimit = (ip: string) => applyLimit(ip, {
  limit: 5,
  windowMs: 15 * 60 * 1000,
  prefix: 'book',
});

export const newsletterRateLimit = (ip: string) => applyLimit(ip, {
  limit: 3,
  windowMs: 15 * 60 * 1000,
  prefix: 'newsletter',
});

export const csrfRateLimit = (ip: string) => applyLimit(ip, {
  limit: 20,
  windowMs: 60 * 1000,
  prefix: 'csrf',
});

export const strictRateLimit = (ip: string) => applyLimit(ip, {
  limit: 5,
  windowMs: 15 * 60 * 1000,
  prefix: 'strict',
});

export const apiRateLimit = (ip: string) => applyLimit(ip, {
  limit: 30,
  windowMs: 60 * 1000,
  prefix: 'api',
});

export const bookingsApiRateLimit = (ip: string) => applyLimit(ip, {
  limit: 10,
  windowMs: 60 * 1000,
  prefix: 'bookings',
});

/** @deprecated Use specific limiters like contactRateLimit(), apiRateLimit(), etc. */
export async function rateLimit(
  identifier: string,
  config: { windowMs: number; maxRequests: number; keyPrefix?: string }
): Promise<RateLimitResult> {
  return applyLimit(identifier, {
    limit: config.maxRequests,
    windowMs: config.windowMs,
    prefix: config.keyPrefix || 'generic',
  });
}
