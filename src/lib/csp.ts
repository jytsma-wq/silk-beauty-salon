/**
 * Content Security Policy (CSP) Generation
 *
 * This module generates nonce-based CSP headers for per-request security.
 * The CSP is intentionally strict and omits 'unsafe-inline' and 'unsafe-eval'.
 *
 * ⚠️ CRITICAL: Do NOT add a static CSP in next.config.ts headers() —
 * it would shadow this nonce-based CSP and re-enable 'unsafe-inline',
 * completely defeating XSS protection.
 */

/**
 * Build Content Security Policy header with nonce
 * Note: Other security headers are handled by reverse proxy (Caddyfile)
 * Note: 'unsafe-inline' is removed from script-src because nonce makes it redundant and weaker
 */
export function buildCSPHeader(nonce: string): string {
  const directives = [
    "default-src 'self'",
    "script-src 'self' 'nonce-" + nonce + "' 'strict-dynamic' https://www.google-analytics.com https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "media-src 'self' https://cdn.coverr.co https://storage.googleapis.com blob:",
    "font-src 'self' https://www.galdermaaesthetics.com",
    "connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com https://cdn.coverr.co",
    "frame-src 'self' https://cal.com https://*.cal.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ];
  return directives.join('; ');
}

/**
 * Generate cryptographically secure nonce using Web Crypto API
 * Edge Runtime compatible (uses crypto.getRandomValues)
 */
export function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}
