/**
 * Centralized API client for all form submissions.
 * Uses versioned endpoints with CSRF and error handling.
 */

const API_BASE = '/api';

export const API_ENDPOINTS = {
  contact: `${API_BASE}/contact`,
  bookings: `${API_BASE}/bookings`,
  newsletter: `${API_BASE}/newsletter`,
} as const;

interface ApiRequestOptions {
  csrfToken?: string | null;
  signal?: AbortSignal;
}

/**
 * Type-safe API request wrapper with CSRF and error handling
 */
export async function apiPost<T>(
  endpoint: string,
  body: unknown,
  options: ApiRequestOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (options.csrfToken) {
    headers['x-csrf-token'] = options.csrfToken;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    signal: options.signal,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new ApiError(response.status, error.error || 'Request failed', error);
  }

  return response.json() as Promise<T>;
}

/**
 * Type-safe API request wrapper for GET requests
 */
export async function apiGet<T>(
  endpoint: string,
  options: { signal?: AbortSignal } = {}
): Promise<T> {
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    signal: options.signal,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new ApiError(response.status, error.error || 'Request failed', error);
  }

  return response.json() as Promise<T>;
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }

  isRateLimit(): boolean {
    return this.status === 429;
  }

  isAuthError(): boolean {
    return this.status === 401 || this.status === 403;
  }
}
