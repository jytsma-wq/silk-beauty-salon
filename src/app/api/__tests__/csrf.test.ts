import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock modules before importing route
vi.mock('@/lib/csrf', () => ({
  setCsrfToken: vi.fn().mockResolvedValue('test-csrf-token'),
}));

vi.mock('@/lib/rate-limit', () => ({
  csrfRateLimit: vi.fn().mockResolvedValue({
    allowed: true,
    limit: 20,
    remaining: 19,
    resetTime: Date.now() + 60000,
  }),
}));

vi.mock('@/lib/security-logger', () => ({
  logSecurityEvent: vi.fn().mockResolvedValue(undefined),
}));

// Import after mocks
import { GET } from '../csrf/route';
import { csrfRateLimit } from '@/lib/rate-limit';

describe('CSRF API', () => {
  const mockRateLimit = csrfRateLimit as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/csrf', () => {
    it('returns a CSRF token', async () => {
      const request = new Request('http://localhost/api/csrf', {
        method: 'GET',
      });

      const response = await GET(request as unknown as import('next/server').NextRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.token).toBe('test-csrf-token');
    });

    it('returns rate limit headers', async () => {
      const request = new Request('http://localhost/api/csrf', {
        method: 'GET',
      });

      const response = await GET(request as unknown as import('next/server').NextRequest);

      expect(response.headers.get('X-RateLimit-Limit')).toBe('20');
      expect(response.headers.get('X-RateLimit-Remaining')).toBe('19');
    });

    it('returns 429 when rate limit exceeded', async () => {
      mockRateLimit.mockResolvedValueOnce({
        allowed: false,
        limit: 20,
        remaining: 0,
        resetTime: Date.now() + 30000,
      });

      const request = new Request('http://localhost/api/csrf', {
        method: 'GET',
        headers: {
          'X-Forwarded-For': '192.168.1.1',
        },
      });

      const response = await GET(request as unknown as import('next/server').NextRequest);
      const data = await response.json();

      expect(response.status).toBe(429);
      expect(data.error).toBe('Too many requests. Please try again later.');
      expect(response.headers.get('Retry-After')).toBeDefined();
    });

    it('handles IP extraction from headers', async () => {
      const request = new Request('http://localhost/api/csrf', {
        method: 'GET',
        headers: {
          'X-Forwarded-For': '10.0.0.1, 192.168.1.1',
        },
      });

      await GET(request as unknown as import('next/server').NextRequest);

      expect(mockRateLimit).toHaveBeenCalledWith('10.0.0.1');
    });

    it('falls back to x-real-ip header', async () => {
      const request = new Request('http://localhost/api/csrf', {
        method: 'GET',
        headers: {
          'X-Real-Ip': '192.168.1.100',
        },
      });

      await GET(request as unknown as import('next/server').NextRequest);

      expect(mockRateLimit).toHaveBeenCalledWith('192.168.1.100');
    });

    it('uses "unknown" when no IP headers present', async () => {
      const request = new Request('http://localhost/api/csrf', {
        method: 'GET',
      });

      await GET(request as unknown as import('next/server').NextRequest);

      expect(mockRateLimit).toHaveBeenCalledWith('unknown');
    });
  });
});
