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
  contentSecurityPolicy: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    'style-src': ["'self'", "'unsafe-inline'"],
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
  crossOriginEmbedderPolicy: 'require-corp',
  crossOriginOpenerPolicy: 'same-origin',
  crossOriginResourcePolicy: 'same-origin',
  
  // Frame Options
  frameOptions: 'DENY',
  
  // Content Type Options
  contentTypeOptions: 'nosniff',
  
  // XSS Protection
  xssProtection: '1; mode=block',
  
  // Referrer Policy
  referrerPolicy: 'strict-origin-when-cross-origin',
  
  // Document Policy
  documentPolicy: {
    'force-load-at-top': '?0',
  },
  
  // Timing Allow Origin
  timingAllowOrigin: '*',
  
  // Expect CT
  expectCT: {
    maxAge: 86400,
    enforce: true,
  },
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
 * Security headers for Next.js config
 * Usage in next.config.js:
 * 
 * async headers() {
 *   return [
 *     {
 *       source: '/:path*',
 *       headers: securityHeaders,
 *     },
 *   ];
 * },
 */
export const securityHeaders = generateSecurityHeaders();
