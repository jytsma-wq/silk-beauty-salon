import { describe, it, expect } from 'vitest';
import { generateSecurityHeaders } from '@/lib/security/headers';

// Helper to extract specific directive from CSP string
function getDirectiveFromCSP(cspValue: string, directive: string): string | null {
  const regex = new RegExp(`${directive} ([^;]+)`);
  const match = cspValue.match(regex);
  return match?.[1] || null;
}

describe('generateSecurityHeaders', () => {
  it('does not include unsafe-inline in script-src', () => {
    const headers = generateSecurityHeaders();
    const csp = headers.find(h => h.key === 'Content-Security-Policy');
    const scriptSrc = getDirectiveFromCSP(csp?.value || '', 'script-src');
    expect(scriptSrc).not.toContain("'unsafe-inline'");
  });

  it('does not include unsafe-eval in script-src', () => {
    const headers = generateSecurityHeaders();
    const csp = headers.find(h => h.key === 'Content-Security-Policy');
    const scriptSrc = getDirectiveFromCSP(csp?.value || '', 'script-src');
    expect(scriptSrc).not.toContain("'unsafe-eval'");
  });

  it('includes strict-dynamic in script-src for nonce compatibility', () => {
    const headers = generateSecurityHeaders();
    const csp = headers.find(h => h.key === 'Content-Security-Policy');
    expect(csp?.value).toContain("'strict-dynamic'");
  });

  it('does not include Expect-CT (deprecated)', () => {
    const headers = generateSecurityHeaders();
    expect(headers.find(h => h.key === 'Expect-CT')).toBeUndefined();
  });

  it('does not include X-XSS-Protection (deprecated)', () => {
    const headers = generateSecurityHeaders();
    expect(headers.find(h => h.key === 'X-XSS-Protection')).toBeUndefined();
  });

  it('does not include Timing-Allow-Origin (security risk)', () => {
    const headers = generateSecurityHeaders();
    expect(headers.find(h => h.key === 'Timing-Allow-Origin')).toBeUndefined();
  });

  it('uses unsafe-none for Cross-Origin-Embedder-Policy (CDN compatibility)', () => {
    const headers = generateSecurityHeaders();
    const coep = headers.find(h => h.key === 'Cross-Origin-Embedder-Policy');
    expect(coep?.value).toBe('unsafe-none');
  });

  it('includes style-src with unsafe-inline (acceptable for CSS)', () => {
    const headers = generateSecurityHeaders();
    const csp = headers.find(h => h.key === 'Content-Security-Policy');
    // style-src should allow unsafe-inline for CSS (low risk, common need)
    expect(csp?.value).toContain("style-src");
    expect(csp?.value).toContain("'unsafe-inline'");
  });

  it('includes essential security headers', () => {
    const headers = generateSecurityHeaders();
    const keys = headers.map(h => h.key);

    expect(keys).toContain('Strict-Transport-Security');
    expect(keys).toContain('Content-Security-Policy');
    expect(keys).toContain('X-Frame-Options');
    expect(keys).toContain('X-Content-Type-Options');
    expect(keys).toContain('Referrer-Policy');
    expect(keys).toContain('Permissions-Policy');
  });
});
