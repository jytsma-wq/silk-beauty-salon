/**
 * Content Security Policy (CSP) Tests
 * Ensures nonce-based CSP is correctly generated and strict
 */

import { describe, it, expect } from 'vitest';
import { buildCSPHeader, generateNonce } from '@/lib/csp';

describe('buildCSPHeader', () => {
  it('contains the nonce in script-src', () => {
    const csp = buildCSPHeader('test-nonce-abc');
    expect(csp).toContain("'nonce-test-nonce-abc'");
  });

  it('does NOT contain unsafe-inline in script-src', () => {
    const csp = buildCSPHeader('x');
    // Extract script-src directive and verify no unsafe-inline there
    const scriptSrcMatch = csp.match(/script-src ([^;]+)/);
    expect(scriptSrcMatch).toBeTruthy();
    const scriptSrc = scriptSrcMatch?.[1] ?? '';
    expect(scriptSrc).not.toContain("'unsafe-inline'");
  });

  it('does NOT contain unsafe-eval', () => {
    expect(buildCSPHeader('x')).not.toContain("'unsafe-eval'");
  });

  it('contains strict-dynamic', () => {
    expect(buildCSPHeader('x')).toContain("'strict-dynamic'");
  });

  it('blocks object-src', () => {
    expect(buildCSPHeader('x')).toContain("object-src 'none'");
  });

  it('includes self as default-src', () => {
    expect(buildCSPHeader('x')).toContain("default-src 'self'");
  });

  it('allows Google Analytics and GTM scripts', () => {
    const csp = buildCSPHeader('x');
    expect(csp).toContain('https://www.google-analytics.com');
    expect(csp).toContain('https://www.googletagmanager.com');
  });

  it('allows inline styles (style-src unsafe-inline)', () => {
    expect(buildCSPHeader('x')).toContain("style-src 'self' 'unsafe-inline'");
  });

  it('blocks framing (frame-ancestors none)', () => {
    expect(buildCSPHeader('x')).toContain("frame-ancestors 'none'");
  });
});

describe('generateNonce', () => {
  it('generates a non-empty string', () => {
    const nonce = generateNonce();
    expect(nonce).toBeTruthy();
    expect(typeof nonce).toBe('string');
    expect(nonce.length).toBeGreaterThan(0);
  });

  it('generates different nonces on each call', () => {
    const nonce1 = generateNonce();
    const nonce2 = generateNonce();
    expect(nonce1).not.toBe(nonce2);
  });

  it('generates base64-encoded values', () => {
    const nonce = generateNonce();
    // Base64 characters: A-Z, a-z, 0-9, +, /, =
    expect(nonce).toMatch(/^[A-Za-z0-9+/=]+$/);
  });
});
