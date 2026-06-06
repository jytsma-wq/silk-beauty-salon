'use client';

import { useEffect, useState } from 'react';

let cachedToken: string | null = null;
let tokenPromise: Promise<string | null> | null = null;

function fetchCsrfToken(): Promise<string | null> {
  if (cachedToken) return Promise.resolve(cachedToken);
  if (tokenPromise) return tokenPromise;

  tokenPromise = fetch('/api/csrf')
    .then((response) => (response.ok ? response.json() : null))
    .then((data: { token?: string } | null) => {
      cachedToken = data?.token ?? null;
      return cachedToken;
    })
    .finally(() => {
      tokenPromise = null;
    });

  return tokenPromise;
}

/**
 * Hook for client-side CSRF token retrieval.
 * The token endpoint sets the HttpOnly CSRF cookie and returns the matching
 * token value that must be echoed in state-changing requests.
 */
export function useClientCsrfToken(): string | null {
  const [token, setToken] = useState<string | null>(cachedToken);

  useEffect(() => {
    if (token) return;

    let active = true;

    fetchCsrfToken()
      .then((nextToken) => {
        if (active && nextToken) {
          setToken(nextToken);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch CSRF token:', error);
      });

    return () => {
      active = false;
    };
  }, [token]);

  return token;
}
