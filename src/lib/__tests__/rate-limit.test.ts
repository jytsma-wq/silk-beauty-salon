// Type declarations for global test storage
declare global {
  var __testMockStorage__: {
    limiters: Record<string, { limit: ReturnType<typeof vi.fn> }>;
  };
}

import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock @upstash/ratelimit - completely self-contained factory
vi.mock('@upstash/ratelimit', () => {
  const mockFn = vi.fn;
  // Initialize storage inside the mock factory
  const storage = {
    limiters: {} as Record<string, { limit: ReturnType<typeof vi.fn> }>,
  };
  // Store reference on globalThis for test access
  (globalThis as unknown as { __testMockStorage__: typeof storage }).__testMockStorage__ = storage;

  return {
    Ratelimit: class MockRatelimit {
      prefix: string;
      limit: ReturnType<typeof vi.fn>;
      constructor({ prefix }: { prefix: string }) {
        this.prefix = prefix;
        const limitFn = mockFn();
        storage.limiters[prefix] = { limit: limitFn };
        this.limit = limitFn;
      }
      static fixedWindow = vi.fn((max: number, window: string) => ({ max, window }));
      static slidingWindow = vi.fn((max: number, window: string) => ({ max, window }));
    },
  };
});

// Mock @upstash/redis
vi.mock('@upstash/redis', () => ({
  Redis: class MockRedis {
    constructor() {}
  },
}));

// Import after mocks are defined
import {
  strictRateLimit,
  apiRateLimit,
  contactRateLimit,
  bookRateLimit,
  bookingsApiRateLimit,
  newsletterRateLimit,
  csrfRateLimit,
  getRedisClient,
} from '../rate-limit';

describe('rate-limit with Upstash', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset all mock limit functions
    const storage = globalThis.__testMockStorage__;
    Object.values(storage.limiters).forEach((limiter) => {
      limiter.limit.mockReset();
    });
  });

  describe('Upstash-based rate limiters', () => {
    it('contactRateLimit returns success when allowed', async () => {
      const storage = globalThis.__testMockStorage__;
      const limiter = storage.limiters['contact-rl'];
      limiter.limit.mockResolvedValue({
        success: true,
        limit: 5,
        remaining: 4,
        reset: Date.now() + 900000,
      });

      const result = await contactRateLimit('127.0.0.1');

      expect(result.allowed).toBe(true);
      expect(result.limit).toBe(5);
      expect(result.remaining).toBe(4);
      expect(limiter.limit).toHaveBeenCalledWith('127.0.0.1');
    });

    it('contactRateLimit returns blocked when exceeded', async () => {
      const storage = globalThis.__testMockStorage__;
      const limiter = storage.limiters['contact-rl'];
      limiter.limit.mockResolvedValue({
        success: false,
        limit: 5,
        remaining: 0,
        reset: Date.now() + 900000,
      });

      const result = await contactRateLimit('127.0.0.1');

      expect(result.allowed).toBe(false);
      expect(result.limit).toBe(5);
      expect(result.remaining).toBe(0);
    });

    it('bookRateLimit returns correct limits', async () => {
      const storage = globalThis.__testMockStorage__;
      const limiter = storage.limiters['book-rl'];
      limiter.limit.mockResolvedValue({
        success: true,
        limit: 5,
        remaining: 3,
        reset: Date.now() + 900000,
      });

      const result = await bookRateLimit('192.168.1.1');

      expect(result.allowed).toBe(true);
      expect(result.limit).toBe(5);
    });

    it('newsletterRateLimit returns correct limits', async () => {
      const storage = globalThis.__testMockStorage__;
      const limiter = storage.limiters['newsletter-rl'];
      limiter.limit.mockResolvedValue({
        success: true,
        limit: 3,
        remaining: 2,
        reset: Date.now() + 900000,
      });

      const result = await newsletterRateLimit('10.0.0.1');

      expect(result.allowed).toBe(true);
      expect(result.limit).toBe(3);
    });

    it('csrfRateLimit returns correct limits', async () => {
      const storage = globalThis.__testMockStorage__;
      const limiter = storage.limiters['csrf-rl'];
      limiter.limit.mockResolvedValue({
        success: true,
        limit: 20,
        remaining: 19,
        reset: Date.now() + 60000,
      });

      const result = await csrfRateLimit('172.16.0.1');

      expect(result.allowed).toBe(true);
      expect(result.limit).toBe(20);
    });

    it('bookingsApiRateLimit returns correct limits', async () => {
      const storage = globalThis.__testMockStorage__;
      const limiter = storage.limiters['bookings-rl'];
      limiter.limit.mockResolvedValue({
        success: true,
        limit: 10,
        remaining: 9,
        reset: Date.now() + 60000,
      });

      const result = await bookingsApiRateLimit('192.168.1.100');

      expect(result.allowed).toBe(true);
      expect(result.limit).toBe(10);
    });

    it('apiRateLimit returns correct limits', async () => {
      const storage = globalThis.__testMockStorage__;
      const limiter = storage.limiters['api-rl'];
      limiter.limit.mockResolvedValue({
        success: true,
        limit: 30,
        remaining: 29,
        reset: Date.now() + 60000,
      });

      const result = await apiRateLimit('192.168.1.200');

      expect(result.allowed).toBe(true);
      expect(result.limit).toBe(30);
    });

    it('strictRateLimit returns correct limits', async () => {
      const storage = globalThis.__testMockStorage__;
      const limiter = storage.limiters['strict-rl'];
      limiter.limit.mockResolvedValue({
        success: true,
        limit: 5,
        remaining: 4,
        reset: Date.now() + 900000,
      });

      const result = await strictRateLimit('192.168.1.50');

      expect(result.allowed).toBe(true);
      expect(result.limit).toBe(5);
    });
  });

  describe('getRedisClient legacy export', () => {
    it('returns null (no longer needed with Upstash)', () => {
      expect(getRedisClient()).toBeNull();
    });
  });
});
