import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  rateLimit,
  strictRateLimit,
  apiRateLimit,
  contactRateLimit,
  bookRateLimit,
  bookingsApiRateLimit,
  newsletterRateLimit,
  csrfRateLimit,
  getRedisClient,
} from '../rate-limit';

// Mock Redis
const mockRedis = {
  zremrangebyscore: vi.fn(),
  zcard: vi.fn(),
  zrange: vi.fn(),
  zadd: vi.fn(),
  expire: vi.fn(),
};

vi.mock('ioredis', () => ({
  Redis: vi.fn(() => mockRedis),
}));

describe('rate-limit', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.REDIS_URL;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getRedisClient', () => {
    it('returns null on client-side', () => {
      const originalWindow = global.window;
      // @ts-expect-error - mocking window
      global.window = {};
      expect(getRedisClient()).toBeNull();
      global.window = originalWindow;
    });

    it('returns null when REDIS_URL is not set', () => {
      expect(getRedisClient()).toBeNull();
    });

    it('creates Redis client when REDIS_URL is set', () => {
      process.env.REDIS_URL = 'redis://localhost:6379';
      const client = getRedisClient();
      expect(client).toBeDefined();
    });
  });

  describe('rateLimit with in-memory fallback', () => {
    it('allows requests under the limit', async () => {
      const result = await rateLimit('test-ip', {
        windowMs: 60000,
        maxRequests: 5,
      });

      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(4);
      expect(result.limit).toBe(5);
    });

    it('blocks requests over the limit', async () => {
      const config = { windowMs: 60000, maxRequests: 2 };

      // Make 2 requests
      await rateLimit('test-ip-2', config);
      await rateLimit('test-ip-2', config);

      // Third request should be blocked
      const result = await rateLimit('test-ip-2', config);
      expect(result.allowed).toBe(false);
      expect(result.remaining).toBe(0);
    });

    it('resets after window expires', async () => {
      const config = { windowMs: 100, maxRequests: 1 };

      // Use up the limit
      await rateLimit('test-ip-3', config);

      // Wait for window to expire
      await new Promise(resolve => setTimeout(resolve, 150));

      // Should be allowed again
      const result = await rateLimit('test-ip-3', config);
      expect(result.allowed).toBe(true);
    });

    it('tracks different keys separately', async () => {
      const config = { windowMs: 60000, maxRequests: 1 };

      await rateLimit('key-a', config);

      // Different key should still have quota
      const result = await rateLimit('key-b', config);
      expect(result.allowed).toBe(true);
    });

    it('returns reset time in the future', async () => {
      const before = Date.now();
      const result = await rateLimit('test-ip-4', {
        windowMs: 60000,
        maxRequests: 5,
      });
      const after = Date.now();

      expect(result.resetTime).toBeGreaterThanOrEqual(before + 60000);
      expect(result.resetTime).toBeLessThanOrEqual(after + 60000);
    });
  });

  describe('rateLimit with Redis', () => {
    beforeEach(() => {
      process.env.REDIS_URL = 'redis://localhost:6379';
    });

    it('uses Redis when available', async () => {
      mockRedis.zremrangebyscore.mockResolvedValue(0);
      mockRedis.zcard.mockResolvedValue(0);
      mockRedis.zadd.mockResolvedValue(1);
      mockRedis.expire.mockResolvedValue(1);

      const result = await rateLimit('redis-test', {
        windowMs: 60000,
        maxRequests: 5,
      });

      expect(result.allowed).toBe(true);
      expect(mockRedis.zadd).toHaveBeenCalled();
    });

    it('blocks when Redis count exceeds limit', async () => {
      mockRedis.zremrangebyscore.mockResolvedValue(0);
      mockRedis.zcard.mockResolvedValue(5);
      mockRedis.zrange.mockResolvedValue(['1000']);

      const result = await rateLimit('redis-test-2', {
        windowMs: 60000,
        maxRequests: 5,
      });

      expect(result.allowed).toBe(false);
      expect(mockRedis.zadd).not.toHaveBeenCalled();
    });

    it('falls back to memory when Redis errors', async () => {
      mockRedis.zremrangebyscore.mockRejectedValue(new Error('Redis error'));

      const result = await rateLimit('fallback-test', {
        windowMs: 60000,
        maxRequests: 5,
      });

      expect(result.allowed).toBe(true);
    });
  });

  describe('preconfigured rate limiters', () => {
    it('strictRateLimit: 5 requests per 15 minutes', async () => {
      const ip = 'strict-test';

      // Make 5 requests
      for (let i = 0; i < 5; i++) {
        const result = await strictRateLimit(ip);
        expect(result.allowed).toBe(true);
      }

      // 6th should be blocked
      const blocked = await strictRateLimit(ip);
      expect(blocked.allowed).toBe(false);
    });

    it('apiRateLimit: 30 requests per minute', async () => {
      const result = await apiRateLimit('api-test');
      expect(result.allowed).toBe(true);
      expect(result.limit).toBe(30);
    });

    it('contactRateLimit: 5 requests per minute', async () => {
      const ip = 'contact-test';

      for (let i = 0; i < 5; i++) {
        const result = await contactRateLimit(ip);
        expect(result.allowed).toBe(true);
      }

      const blocked = await contactRateLimit(ip);
      expect(blocked.allowed).toBe(false);
      expect(blocked.limit).toBe(5);
    });

    it('bookRateLimit: 5 requests per minute', async () => {
      const ip = 'book-test';

      for (let i = 0; i < 5; i++) {
        const result = await bookRateLimit(ip);
        expect(result.allowed).toBe(true);
      }

      const blocked = await bookRateLimit(ip);
      expect(blocked.allowed).toBe(false);
    });

    it('bookingsApiRateLimit: 10 requests per minute', async () => {
      const result = await bookingsApiRateLimit('bookings-test');
      expect(result.allowed).toBe(true);
      expect(result.limit).toBe(10);
    });

    it('newsletterRateLimit: 3 requests per minute', async () => {
      const ip = 'newsletter-test';

      for (let i = 0; i < 3; i++) {
        const result = await newsletterRateLimit(ip);
        expect(result.allowed).toBe(true);
      }

      const blocked = await newsletterRateLimit(ip);
      expect(blocked.allowed).toBe(false);
      expect(blocked.limit).toBe(3);
    });

    it('csrfRateLimit: 20 requests per minute', async () => {
      const result = await csrfRateLimit('csrf-test');
      expect(result.allowed).toBe(true);
      expect(result.limit).toBe(20);
    });
  });

  describe('key prefixing', () => {
    it('uses different prefixes for different limiters', async () => {
      const ip = 'prefix-test';

      // Use up contact limit
      for (let i = 0; i < 5; i++) {
        await contactRateLimit(ip);
      }

      // Newsletter should still work
      const newsletter = await newsletterRateLimit(ip);
      expect(newsletter.allowed).toBe(true);
    });
  });
});
