import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { apiPost, apiGet, ApiError, API_ENDPOINTS } from '@/lib/api-client';

describe('api-client', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('apiPost', () => {
    it('resolves with response body on 201 success', async () => {
      const mockResponse = { success: true, id: '123' };
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: () => Promise.resolve(mockResponse),
      } as Response);

      const result = await apiPost(API_ENDPOINTS.contact, { name: 'Test' });
      expect(result).toEqual(mockResponse);
    });

    it('resolves with response body on 200 success', async () => {
      const mockResponse = { success: true };
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResponse),
      } as Response);

      const result = await apiPost(API_ENDPOINTS.bookings, { name: 'Test' });
      expect(result).toEqual(mockResponse);
    });

    it('throws ApiError with status 429 on rate limit', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        status: 429,
        json: () => Promise.resolve({ error: 'Rate limit exceeded' }),
      } as Response);

      await expect(apiPost(API_ENDPOINTS.contact, {})).rejects.toThrow(ApiError);
      await expect(apiPost(API_ENDPOINTS.contact, {})).rejects.toMatchObject({
        status: 429,
        message: 'Rate limit exceeded',
      });
    });

    it('throws ApiError with status 403 on forbidden', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        status: 403,
        json: () => Promise.resolve({ error: 'Forbidden' }),
      } as Response);

      await expect(apiPost(API_ENDPOINTS.contact, {})).rejects.toThrow(ApiError);
      await expect(apiPost(API_ENDPOINTS.contact, {})).rejects.toMatchObject({
        status: 403,
        message: 'Forbidden',
      });
    });

    it('throws ApiError with status 401 on unauthorized', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ error: 'Unauthorized' }),
      } as Response);

      await expect(apiPost(API_ENDPOINTS.contact, {})).rejects.toThrow(ApiError);
      await expect(apiPost(API_ENDPOINTS.contact, {})).rejects.toMatchObject({
        status: 401,
      });
    });

    it('includes CSRF token in headers when provided', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ success: true }),
      } as Response);

      await apiPost(API_ENDPOINTS.contact, { name: 'Test' }, { csrfToken: 'test-token' });

      expect(fetch).toHaveBeenCalledWith(
        API_ENDPOINTS.contact,
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
            'x-csrf-token': 'test-token',
          },
        })
      );
    });

    it('does not include CSRF header when token is null', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ success: true }),
      } as Response);

      await apiPost(API_ENDPOINTS.contact, { name: 'Test' }, { csrfToken: null });

      expect(fetch).toHaveBeenCalledWith(
        API_ENDPOINTS.contact,
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );
    });

    it('throws generic error message when response JSON fails', async () => {
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.reject(new Error('Parse error')),
      } as Response);

      await expect(apiPost(API_ENDPOINTS.contact, {})).rejects.toThrow(ApiError);
      await expect(apiPost(API_ENDPOINTS.contact, {})).rejects.toMatchObject({
        status: 500,
        message: 'Unknown error',
      });
    });

    it('passes abort signal to fetch', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ success: true }),
      } as Response);

      const controller = new AbortController();
      await apiPost(API_ENDPOINTS.contact, {}, { signal: controller.signal });

      expect(fetch).toHaveBeenCalledWith(
        API_ENDPOINTS.contact,
        expect.objectContaining({
          signal: controller.signal,
        })
      );
    });
  });

  describe('apiGet', () => {
    it('resolves with response body on success', async () => {
      const mockResponse = { data: [1, 2, 3] };
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResponse),
      } as Response);

      const result = await apiGet('/api/test');
      expect(result).toEqual(mockResponse);
    });

    it('throws ApiError on failure', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ error: 'Not found' }),
      } as Response);

      await expect(apiGet('/api/test')).rejects.toThrow(ApiError);
    });
  });

  describe('ApiError', () => {
    it('isRateLimit returns true for 429 status', () => {
      const error = new ApiError(429, 'Rate limit');
      expect(error.isRateLimit()).toBe(true);
    });

    it('isRateLimit returns false for other statuses', () => {
      const error = new ApiError(403, 'Forbidden');
      expect(error.isRateLimit()).toBe(false);
    });

    it('isAuthError returns true for 401', () => {
      const error = new ApiError(401, 'Unauthorized');
      expect(error.isAuthError()).toBe(true);
    });

    it('isAuthError returns true for 403', () => {
      const error = new ApiError(403, 'Forbidden');
      expect(error.isAuthError()).toBe(true);
    });

    it('isAuthError returns false for other statuses', () => {
      const error = new ApiError(500, 'Server error');
      expect(error.isAuthError()).toBe(false);
    });

    it('stores error data', () => {
      const data = { field: 'email', issue: 'invalid' };
      const error = new ApiError(400, 'Bad request', data);
      expect(error.data).toEqual(data);
    });

    it('has correct name property', () => {
      const error = new ApiError(500, 'Error');
      expect(error.name).toBe('ApiError');
    });
  });

  describe('API_ENDPOINTS', () => {
    it('has correct contact endpoint', () => {
      expect(API_ENDPOINTS.contact).toBe('/api/contact');
    });

    it('has correct bookings endpoint', () => {
      expect(API_ENDPOINTS.bookings).toBe('/api/bookings');
    });

    it('has correct newsletter endpoint', () => {
      expect(API_ENDPOINTS.newsletter).toBe('/api/newsletter');
    });
  });
});
