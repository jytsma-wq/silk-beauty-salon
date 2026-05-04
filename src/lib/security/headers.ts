/**
 * Security Headers Configuration
 * Enterprise-grade security headers for OWASP compliance
 */

export interface SecurityHeadersConfig {
  // Content Security Policy
  contentSecurityPolicy?: string | Record<string, string[]>;
  
  // Permissions Policy (formerly Feature Policy)
  permissionsPolicy?: Record<string, string>;
  
  // Cross-Origin policies
  crossOriginEmbedderPolicy?: 'require-corp' | 'credentialless' | 'unsafe-none';
  crossOriginOpenerPolicy?: 'same-origin' | 'same-origin-allow-popups' | 'unsafe-none';
  crossOriginResourcePolicy?: 'same-origin' | 'same-site' | 'cross-origin';
  
  // Document Policy
  documentPolicy?: Record<string, string>;
  
  // Timing Allow Origin
  timingAllowOrigin?: string;
  
  // Expect CT
  expectCT?: {
    maxAge?: number;
    enforce?: boolean;
    reportUri?: string;
  };
  
  // STS
  strictTransportSecurity?: {
    maxAge: number;
    includeSubDomains?: boolean;
    preload?: boolean;
  };
  
  // Frame Options
  frameOptions?: 'DENY' | 'SAMEORIGIN' | 'ALLOW-FROM';
  
  // Content Type Options
  contentTypeOptions?: 'nosniff';
  
  // XSS Protection
  xssProtection?: '0' | '1' | '1; mode=block';
  
  // Referrer Policy
  referrerPolicy?: 
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url';
}

/**
 * Default security headers configuration
 * Production-ready with strict settings
 */
export const defaultSecurityHeaders: SecurityHeadersConfig = {
  // Strict Transport Security - force HTTPS
  strictTransportSecurity: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
  
  // Content Security Policy
  // NOTE: This is a BASE configuration. For production, use middleware.ts which adds nonces per-request.
  // Do NOT use this static CSP directly in next.config.ts - it would defeat nonce protection.
  contentSecurityPolicy: {
    'default-src': ["'self'"],
    // script-src intentionally has no unsafe values here.
    // The nonce is injected per-request by middleware.ts via buildCSPHeader(nonce).
    // Do NOT add 'unsafe-inline' or 'unsafe-eval' — they defeat nonce protection.
    // Usage: call buildCSPHeader(nonce) from src/lib/csp.ts in middleware instead.
    'script-src': ["'self'", "'strict-dynamic'"],
    // 'unsafe-inline' for styles is acceptable — style injection cannot execute JavaScript
    // and the risk is low for a marketing site. Style nonces add complexity without meaningful security benefit.
    'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
    'img-src': ["'self'", 'data:', 'https:', 'blob:'],
    'font-src': ["'self'", 'data:', 'https:'],
    'connect-src': ["'self'", 'https:'],
    'media-src': ["'self'"],
    'object-src': ["'none'"],
    'frame-ancestors': ["'none'"],
    'frame-src': ["'self'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'upgrade-insecure-requests': [],
  },
  
  // Permissions Policy - restrict browser features
  permissionsPolicy: {
    'accelerometer': '()',
    'camera': '()',
    'geolocation': '()',
    'gyroscope': '()',
    'magnetometer': '()',
    'microphone': '()',
    'payment': '()',
    'usb': '()',
    'fullscreen': '(self)',
    'picture-in-picture': '(self)',
  },
  
  // Cross-Origin policies
  // 'require-corp' blocks Google Fonts, CDN video, and most external resources.
  // Use 'unsafe-none' for sites loading third-party fonts/media.
  // Set to 'require-corp' only if ALL resources are self-hosted.
  crossOriginEmbedderPolicy: 'unsafe-none',
  crossOriginOpenerPolicy: 'same-origin',
  crossOriginResourcePolicy: 'same-origin',
  
  // Frame Options
  frameOptions: 'DENY',
  
  // Content Type Options
  contentTypeOptions: 'nosniff',
  
  // XSS Protection - REMOVED
  // This header was deprecated and removed from Chrome 78+.
  // In older browsers it can actually introduce XSS vulnerabilities.
  // The correct protection is CSP via middleware.ts with nonces.
  // xssProtection: undefined,
  
  // Referrer Policy
  referrerPolicy: 'strict-origin-when-cross-origin',
  
  // Document Policy
  documentPolicy: {
    'force-load-at-top': '?0',
  },
  
  // Timing Allow Origin - DISABLED
  // '*' leaks resource timing data to ANY origin, enabling cross-origin timing side-channel attacks.
  // Only enable if you control the consuming origin and understand the privacy implications.
  // timingAllowOrigin: 'https://your-trusted-domain.com',
  
  // Expect CT - REMOVED (deprecated 2021)
  // This header was deprecated by all major browsers in 2021 and removed from the HTTP spec.
  // Chrome 107+ ignores it. Use Certificate Transparency monitoring instead.
  // expectCT: undefined,
};

/**
 * Build Content-Security-Policy header value
 */
function buildCSP(csp: string | Record<string, string[]>): string {
  if (typeof csp === 'string') return csp;
  
  return Object.entries(csp)
    .map(([directive, values]) => {
      if (values.length === 0) return directive;
      return `${directive} ${values.join(' ')}`;
    })
    .join('; ');
}

/**
 * Build Permissions-Policy header value
 */
function buildPermissionsPolicy(policy: Record<string, string>): string {
  return Object.entries(policy)
    .map(([feature, allowlist]) => `${feature}=${allowlist}`)
    .join(', ');
}

/**
 * Build Document-Policy header value
 */
function buildDocumentPolicy(policy: Record<string, string>): string {
  return Object.entries(policy)
    .map(([directive, value]) => `${directive}=${value}`)
    .join(', ');
}

/**
 * Build Expect-CT header value
 */
function buildExpectCT(config: { maxAge?: number; enforce?: boolean; reportUri?: string }): string {
  const parts: string[] = [];
  if (config.maxAge) parts.push(`max-age=${config.maxAge}`);
  if (config.enforce) parts.push('enforce');
  if (config.reportUri) parts.push(`report-uri="${config.reportUri}"`);
  return parts.join(', ');
}

/**
 * Build Strict-Transport-Security header value
 */
function buildSTS(config: { maxAge: number; includeSubDomains?: boolean; preload?: boolean }): string {
  const parts: string[] = [`max-age=${config.maxAge}`];
  if (config.includeSubDomains) parts.push('includeSubDomains');
  if (config.preload) parts.push('preload');
  return parts.join('; ');
}

/**
 * Generate security headers object for Next.js headers config
 */
export function generateSecurityHeaders(config: Partial<SecurityHeadersConfig> = {}): Array<{
  key: string;
  value: string;
}> {
  const merged = { ...defaultSecurityHeaders, ...config };
  const headers: Array<{ key: string; value: string }> = [];
  
  // Strict-Transport-Security
  if (merged.strictTransportSecurity) {
    headers.push({
      key: 'Strict-Transport-Security',
      value: buildSTS(merged.strictTransportSecurity),
    });
  }
  
  // Content-Security-Policy
  if (merged.contentSecurityPolicy) {
    headers.push({
      key: 'Content-Security-Policy',
      value: buildCSP(merged.contentSecurityPolicy),
    });
  }
  
  // Permissions-Policy
  if (merged.permissionsPolicy) {
    headers.push({
      key: 'Permissions-Policy',
      value: buildPermissionsPolicy(merged.permissionsPolicy),
    });
  }
  
  // Cross-Origin-Embedder-Policy
  if (merged.crossOriginEmbedderPolicy) {
    headers.push({
      key: 'Cross-Origin-Embedder-Policy',
      value: merged.crossOriginEmbedderPolicy,
    });
  }
  
  // Cross-Origin-Opener-Policy
  if (merged.crossOriginOpenerPolicy) {
    headers.push({
      key: 'Cross-Origin-Opener-Policy',
      value: merged.crossOriginOpenerPolicy,
    });
  }
  
  // Cross-Origin-Resource-Policy
  if (merged.crossOriginResourcePolicy) {
    headers.push({
      key: 'Cross-Origin-Resource-Policy',
      value: merged.crossOriginResourcePolicy,
    });
  }
  
  // X-Frame-Options
  if (merged.frameOptions) {
    headers.push({
      key: 'X-Frame-Options',
      value: merged.frameOptions,
    });
  }
  
  // X-Content-Type-Options
  if (merged.contentTypeOptions) {
    headers.push({
      key: 'X-Content-Type-Options',
      value: merged.contentTypeOptions,
    });
  }
  
  // X-XSS-Protection
  if (merged.xssProtection) {
    headers.push({
      key: 'X-XSS-Protection',
      value: merged.xssProtection,
    });
  }
  
  // Referrer-Policy
  if (merged.referrerPolicy) {
    headers.push({
      key: 'Referrer-Policy',
      value: merged.referrerPolicy,
    });
  }
  
  // Document-Policy
  if (merged.documentPolicy) {
    headers.push({
      key: 'Document-Policy',
      value: buildDocumentPolicy(merged.documentPolicy),
    });
  }
  
  // Timing-Allow-Origin
  if (merged.timingAllowOrigin) {
    headers.push({
      key: 'Timing-Allow-Origin',
      value: merged.timingAllowOrigin,
    });
  }
  
  // Expect-CT
  if (merged.expectCT) {
    headers.push({
      key: 'Expect-CT',
      value: buildExpectCT(merged.expectCT),
    });
  }
  
  return headers;
}

/**
 * ⚠️ WARNING: DO NOT USE IN next.config.ts
 * 
 * This export is kept for reference/audit purposes only.
 * Using it in next.config.ts would inject a static CSP that:
 * 1. Lacks nonces (defeating XSS protection)
 * 2. Shadows the nonce-based CSP from middleware.ts
 * 3. Breaks all inline script protections
 * 
 * The correct CSP is injected per-request by middleware.ts using
 * buildCSPHeader(nonce) from src/lib/csp.ts.
 * 
 * If you need custom headers for a specific route, import generateSecurityHeaders()
 * and merge carefully, ensuring you don't override the CSP from middleware.
 */
export const securityHeaders = generateSecurityHeaders();
