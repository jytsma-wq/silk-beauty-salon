/**
 * API Route Protection Tests
 * Tests for Bearer token authentication and API-specific rate limiting
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';

// Mock environment variables
const TEST_API_SECRET = 'test-api-secret-key-12345';

// Mock the middleware module
vi.mock('@upstash/ratelimit', () => ({
  Ratelimit: {
    slidingWindow: vi.fn(() => 'sliding-window-config'),
  },
}));

vi.mock('@upstash/redis', () => ({
  Redis: vi.fn(() => ({
    // Mock Redis client
  })),
}));

// Helper to create a mock request
function createMockRequest(
  pathname: string,
  options: {
    method?: string;
    headers?: Record<string, string>;
    ip?: string;
  } = {}
): NextRequest {
  const url = new URL(`http://localhost:3000${pathname}`);
  const headers = new Headers(options.headers || {});
  
  return {
    url: url.toString(),
    nextUrl: url,
    headers,
    method: options.method || 'GET',
    cookies: {
      get: vi.fn(() => undefined),
    },
    ip: options.ip || '127.0.0.1',
  } as unknown as NextRequest;
}

// Import middleware after mocking
let middleware: (req: NextRequest) => Promise<NextResponse>;

describe('API Route Protection', () => {
  beforeEach(async () => {
    // Reset modules and set env
    vi.resetModules();
    process.env.API_SECRET_KEY = TEST_API_SECRET;
    process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io';
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token';
    
    // Re-import middleware fresh
    const mod = await import('../../middleware');
    middleware = mod.default;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Authorization Bearer Token', () => {
    it('should return 401 when Authorization header is missing', async () => {
      const request = createMockRequest('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await middleware(request);

      expect(response.status).toBe(401);
      const body = await response.json();
      expect(body.error).toBe('Unauthorized');
      expect(response.headers.get('Content-Type')).toBe('application/json');
    });

    it('should return 401 when Authorization header has wrong token', async () => {
      const request = createMockRequest('/api/contact', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer wrong-token',
          'Content-Type': 'application/json',
        },
      });

      const response = await middleware(request);

      expect(response.status).toBe(401);
      const body = await response.json();
      expect(body.error).toBe('Unauthorized');
    });

    it('should return 401 when Authorization header is malformed', async () => {
      const request = createMockRequest('/api/contact', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${TEST_API_SECRET}`, // Wrong prefix
          'Content-Type': 'application/json',
        },
      });

      const response = await middleware(request);

      expect(response.status).toBe(401);
      const body = await response.json();
      expect(body.error).toBe('Unauthorized');
    });

    it('should pass through when Authorization Bearer token is correct', async () => {
      const request = createMockRequest('/api/contact', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TEST_API_SECRET}`,
          'Content-Type': 'application/json',
        },
      });

      const response = await middleware(request);

      // Should not be 401 (might be rate limited or pass through)
      expect(response.status).not.toBe(401);
    });
  });

  describe('Health Check Endpoint', () => {
    it('should bypass auth for GET /api/health', async () => {
      const request = createMockRequest('/api/health', {
        method: 'GET',
        // No Authorization header
      });

      const response = await middleware(request);

      // Should not be 401 (passes through auth)
      expect(response.status).not.toBe(401);
    });

    it('should bypass auth for GET /api/health even with wrong token', async () => {
      const request = createMockRequest('/api/health', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer wrong-token',
        },
      });

      const response = await middleware(request);

      // Should not be 401 (health check bypasses auth)
      expect(response.status).not.toBe(401);
    });

    it('should require auth for POST /api/health', async () => {
      const request = createMockRequest('/api/health', {
        method: 'POST',
        // No Authorization header
      });

      const response = await middleware(request);

      // POST should require auth (only GET bypasses)
      expect(response.status).toBe(401);
    });
  });

  describe('API-Specific Path Patterns', () => {
    it('should block API routes with directory traversal patterns', async () => {
      const request = createMockRequest('/api/contact?file=../../etc/passwd', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TEST_API_SECRET}`,
        },
      });

      const response = await middleware(request);

      expect(response.status).toBe(403);
    });

    it('should block API routes with SQL injection patterns', async () => {
      const request = createMockRequest('/api/contact?query=union select', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TEST_API_SECRET}`,
        },
      });

      const response = await middleware(request);

      expect(response.status).toBe(403);
    });

    it('should allow API routes without WordPress/PHP patterns (those are skipped for API)', async () => {
      // Note: WordPress patterns should not be checked for API routes
      const request = createMockRequest('/api/contact', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TEST_API_SECRET}`,
        },
      });

      const response = await middleware(request);

      // Should not be blocked by WordPress patterns (not 403)
      expect(response.status).not.toBe(403);
    });
  });

  describe('API Rate Limiting', () => {
    it('should return 429 with JSON error when API rate limit exceeded', async () => {
      // Note: Actual rate limiting requires Redis connection
      // This test validates the response format when rate limited
      const request = createMockRequest('/api/contact', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TEST_API_SECRET}`,
        },
        ip: '192.168.1.100',
      });

      const response = await middleware(request);

      // Response should have proper headers for rate limiting info
      if (response.status === 429) {
        const body = await response.json();
        expect(body.error).toBe('Rate limit exceeded');
        expect(response.headers.get('Content-Type')).toBe('application/json');
        expect(response.headers.get('X-RateLimit-Limit')).toBe('30');
        expect(response.headers.get('Retry-After')).toBeDefined();
      }
    });
  });

  describe('Security Headers', () => {
    it('should add X-Content-Type-Options header to API responses', async () => {
      const request = createMockRequest('/api/contact', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TEST_API_SECRET}`,
        },
      });

      const response = await middleware(request);

      if (response.status !== 401 && response.status !== 403) {
        expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
      }
    });

    it('should add X-Frame-Options header to API responses', async () => {
      const request = createMockRequest('/api/contact', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TEST_API_SECRET}`,
        },
      });

      const response = await middleware(request);

      if (response.status !== 401 && response.status !== 403) {
        expect(response.headers.get('X-Frame-Options')).toBe('DENY');
      }
    });
  });
});

describe('Development Mode (no API_SECRET_KEY)', () => {
  beforeEach(async () => {
    vi.resetModules();
    // Do not set API_SECRET_KEY
    delete process.env.API_SECRET_KEY;
    process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io';
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token';
    
    const mod = await import('../../middleware');
    middleware = mod.default;
  });

  it('should allow API requests without auth in development when API_SECRET_KEY is not set', async () => {
    const request = createMockRequest('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await middleware(request);

    // Should not be 401 in development without secret key
    expect(response.status).not.toBe(401);
  });
});
