'use client';

/**
 * Hook for client-side CSRF token retrieval from meta tag
 * The token is set by the server in the layout.tsx meta tag
 */
export function useCsrfToken(): string | null {
  if (typeof window === 'undefined') return null;
  const metaToken = document.querySelector('meta[name="csrf-token"]');
  return metaToken?.getAttribute('content') || null;
}
