import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/rate-limit', () => ({
  apiRateLimit: vi.fn().mockResolvedValue({
    allowed: true,
    limit: 30,
    remaining: 29,
    resetTime: Date.now() + 60000,
  }),
}));

import { POST } from '../chat/route';
import { apiRateLimit } from '@/lib/rate-limit';

function request(body: unknown, headers: Record<string, string> = {}): Request {
  return new Request('http://localhost/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

describe('Chat API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns a deterministic salon reply', async () => {
    const response = await POST(request({ message: 'How do I book?' }) as never);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.reply).toContain('internal booking system');
    expect(data.links).toContainEqual({ label: 'Open booking page', href: '/book' });
  });

  it('validates message input', async () => {
    const response = await POST(request({ message: '' }) as never);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid message');
  });

  it('rate limits chat requests by client IP', async () => {
    vi.mocked(apiRateLimit).mockResolvedValueOnce({
      allowed: false,
      limit: 30,
      remaining: 0,
      resetTime: Date.now() + 30000,
    });

    const response = await POST(request({ message: 'prices' }, { 'X-Forwarded-For': '1.2.3.4' }) as never);
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(data.error).toBe('Too many chat requests. Please try again shortly.');
    expect(response.headers.get('Retry-After')).toBeDefined();
    expect(apiRateLimit).toHaveBeenCalledWith('1.2.3.4');
  });
});
