import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  generateCsrfToken,
  setCsrfToken,
  getCsrfToken,
  verifyCsrfToken,
  csrfMiddleware,
  useCsrfToken,
  setCsrfTokenInResponse,
} from '../csrf';

// Mock cookies
interface MockCookieStore {
  get: ReturnType<typeof vi.fn>;
  set: ReturnType<typeof vi.fn>;
}

const mockCookieStore: MockCookieStore = {
  get: vi.fn(),
  set: vi.fn(),
};

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => Promise.resolve(mockCookieStore)),
}));

describe('csrf', () => {
  beforeEach((): void => {
    vi.clearAllMocks();
  });

  describe('generateCsrfToken', () => {
    it('generates a token of correct length', () => {
      const token = generateCsrfToken();
      // Base64 of 32 bytes is ~43 chars, minus padding
      expect(token.length).toBeGreaterThanOrEqual(40);
      expect(token.length).toBeLessThanOrEqual(50);
    });

    it('generates unique tokens', () => {
      const token1 = generateCsrfToken();
      const token2 = generateCsrfToken();
      expect(token1).not.toBe(token2);
    });

    it('uses URL-safe base64', () => {
      const token = generateCsrfToken();
      expect(token).not.toContain('+');
      expect(token).not.toContain('/');
      expect(token).not.toContain('=');
    });

    it('uses crypto.getRandomValues', () => {
      const randomValuesSpy = vi.spyOn(crypto, 'getRandomValues');
      generateCsrfToken();
      expect(randomValuesSpy).toHaveBeenCalled();
    });
  });

  describe('setCsrfToken', () => {
    it('sets cookie with secure options', async () => {
      await setCsrfToken();

      expect(mockCookieStore.set).toHaveBeenCalledWith(
        'csrf-token',
        expect.any(String),
        expect.objectContaining({
          httpOnly: true,
          sameSite: 'strict',
          path: '/',
          maxAge: 60 * 60 * 24,
        })
      );
    });

    it('returns the generated token', async () => {
      const token = await setCsrfToken();
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });

    it('sets secure flag in production', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      await setCsrfToken();

      expect(mockCookieStore.set).toHaveBeenCalledWith(
        'csrf-token',
        expect.any(String),
        expect.objectContaining({
          secure: true,
        })
      );

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('getCsrfToken', () => {
    it('returns token from cookie', async () => {
      const testToken = 'test-csrf-token';
      mockCookieStore.get.mockReturnValue({ value: testToken });

      const token = await getCsrfToken();
      expect(token).toBe(testToken);
    });

    it('returns undefined when cookie not found', async () => {
      mockCookieStore.get.mockReturnValue(undefined);

      const token = await getCsrfToken();
      expect(token).toBeUndefined();
    });
  });

  describe('verifyCsrfToken', () => {
    it('returns false when no cookie token exists', async () => {
      mockCookieStore.get.mockReturnValue(undefined);

      const request = new Request('http://localhost', {
        headers: { 'x-csrf-token': 'token' },
      }) as unknown as import('next/server').NextRequest;

      const result = await verifyCsrfToken(request);
      expect(result).toBe(false);
    });

    it('validates token from header', async () => {
      const token = generateCsrfToken();
      mockCookieStore.get.mockReturnValue({ value: token });

      const request = new Request('http://localhost', {
        headers: { 'x-csrf-token': token },
      }) as unknown as import('next/server').NextRequest;

      const result = await verifyCsrfToken(request);
      expect(result).toBe(true);
    });

    it('rejects invalid header token', async () => {
      mockCookieStore.get.mockReturnValue({ value: 'valid-token' });

      const request = new Request('http://localhost', {
        headers: { 'x-csrf-token': 'invalid-token' },
      }) as unknown as import('next/server').NextRequest;

      const result = await verifyCsrfToken(request);
      expect(result).toBe(false);
    });

    it('validates token from form data in POST requests', async () => {
      const token = generateCsrfToken();
      mockCookieStore.get.mockReturnValue({ value: token });

      const formData = new FormData();
      formData.append('_csrf', token);

      const request = new Request('http://localhost', {
        method: 'POST',
        body: formData,
      }) as unknown as import('next/server').NextRequest;

      const result = await verifyCsrfToken(request);
      expect(result).toBe(true);
    });

    it('validates token from JSON body in POST requests', async () => {
      const token = generateCsrfToken();
      mockCookieStore.get.mockReturnValue({ value: token });

      const request = new Request('http://localhost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _csrf: token }),
      }) as unknown as import('next/server').NextRequest;

      const result = await verifyCsrfToken(request);
      expect(result).toBe(true);
    });

    it('returns false for non-POST requests without header', async () => {
      mockCookieStore.get.mockReturnValue({ value: 'token' });

      const request = new Request('http://localhost', {
        method: 'GET',
      }) as unknown as import('next/server').NextRequest;

      const result = await verifyCsrfToken(request);
      expect(result).toBe(false);
    });
  });

  describe('csrfMiddleware', () => {
    it('allows GET requests without token', async () => {
      mockCookieStore.get.mockReturnValue(undefined);

      const request = new Request('http://localhost', {
        method: 'GET',
      }) as unknown as import('next/server').NextRequest;

      const handler = vi.fn(() => Promise.resolve(new Response('OK'))) as unknown as () => Promise<import('next/server').NextResponse>;
      const response = await csrfMiddleware(request, handler);

      expect(handler).toHaveBeenCalled();
      expect(response.status).toBe(200);
    });

    it('blocks POST without valid token', async () => {
      mockCookieStore.get.mockReturnValue({ value: 'valid' });

      const request = new Request('http://localhost', {
        method: 'POST',
        headers: { 'x-csrf-token': 'invalid' },
      }) as unknown as import('next/server').NextRequest;

      const handler = vi.fn();
      const response = await csrfMiddleware(request, handler);

      expect(handler).not.toHaveBeenCalled();
      expect(response.status).toBe(403);
    });

    it('allows POST with valid token', async () => {
      const token = generateCsrfToken();
      mockCookieStore.get.mockReturnValue({ value: token });

      const request = new Request('http://localhost', {
        method: 'POST',
        headers: { 'x-csrf-token': token },
      }) as unknown as import('next/server').NextRequest;

      const handler = vi.fn(() => Promise.resolve(new Response('OK'))) as unknown as () => Promise<import('next/server').NextResponse>;
      const response = await csrfMiddleware(request, handler);

      expect(handler).toHaveBeenCalled();
      expect(response.status).toBe(200);
    });

    it('validates PUT, PATCH, DELETE methods', async () => {
      mockCookieStore.get.mockReturnValue({ value: 'valid' });

      for (const method of ['PUT', 'PATCH', 'DELETE']) {
        const request = new Request('http://localhost', {
          method,
          headers: { 'x-csrf-token': 'invalid' },
        }) as unknown as import('next/server').NextRequest;

        const handler = vi.fn();
        const response = await csrfMiddleware(request, handler);

        expect(response.status).toBe(403);
      }
    });
  });

  describe('setCsrfTokenInResponse', () => {
    it('sets cookie in NextResponse', () => {
      const response = {
        cookies: {
          set: vi.fn(),
        },
      } as unknown as import('next/server').NextResponse;

      const token = 'test-token';
      setCsrfTokenInResponse(response, token);

      expect(response.cookies.set).toHaveBeenCalledWith(
        'csrf-token',
        token,
        expect.objectContaining({
          httpOnly: true,
          sameSite: 'strict',
          path: '/',
        })
      );
    });
  });

  describe('useCsrfToken', () => {
    it('returns null on server-side', () => {
      expect(useCsrfToken()).toBeNull();
    });

    it('returns token from meta tag on client-side', () => {
      // Mock document
      const meta = document.createElement('meta');
      meta.name = 'csrf-token';
      meta.content = 'meta-token';
      document.head.appendChild(meta);

      // @ts-expect-error - mocking window
      global.window = {};

      const token = useCsrfToken();
      expect(token).toBe('meta-token');

      // Cleanup
      document.head.removeChild(meta);
    });

    it('returns null when no meta tag exists', () => {
      // @ts-expect-error - mocking window
      global.window = {};

      const token = useCsrfToken();
      expect(token).toBeNull();
    });
  });
});
