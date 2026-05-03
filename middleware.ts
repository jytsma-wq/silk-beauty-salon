import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { routing } from './src/i18n/routing';
import { locales } from './src/i18n';

// Generate cryptographically secure nonce using Web Crypto API (Edge Runtime compatible)
function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}

// Path check result type
interface PathCheckResult {
  blocked: boolean;
  suspicious: boolean;
}

// Generate CSRF token using Web Crypto API
function generateCsrfToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Build Content Security Policy header with nonce
// Note: Other security headers are handled by reverse proxy (Caddyfile)
// Note: 'unsafe-inline' is removed from script-src because nonce makes it redundant and weaker
function buildCSPHeader(nonce: string): string {
  const directives = [
    "default-src 'self'",
    "script-src 'self' 'nonce-" + nonce + "' 'strict-dynamic' https://www.google-analytics.com https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "media-src 'self' https://cdn.coverr.co https://storage.googleapis.com blob:",
    "font-src 'self'",
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

// Upstash Redis rate limiting configuration
const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

// Validate environment variables at startup
if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) {
  throw new Error(
    'Missing Upstash Redis credentials. Please set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN environment variables.'
  );
}

// Create singleton Ratelimit client with sliding window (100 requests per 60 seconds)
const ratelimit = new Ratelimit({
  redis: new Redis({
    url: UPSTASH_REDIS_REST_URL,
    token: UPSTASH_REDIS_REST_TOKEN,
  }),
  limiter: Ratelimit.slidingWindow(100, '60 s'),
  analytics: true,
});

// Always allow these search engine bots
const ALWAYS_ALLOW_UA = [/googlebot/i, /bingbot/i, /twitterbot/i, /facebookexternalhit/i];

// Bad user agents - only known malicious security scanners
const BLOCKED_USER_AGENTS = [
  /masscan/i,
  /nikto/i,
  /sqlmap/i,
  /nmap/i,
  /zgrab/i,
  /dirbuster/i,
  /havij/i,
  /acunetix/i,
  /nuclei/i,
  /hydra/i,
];

const BLOCKED_PATTERNS = [
  /\.\./,  // Directory traversal
  /\/wp-admin/i,
  /\/wp-login/i,
  /\/phpinfo/i,
  /\.env$/,
  /\.git\//,
  /\?exec\=/i,
  /\?cmd\=/i,
  /\?shell\=/i,
  /\?ping\=/i,
  /base64_decode/i,
  /eval\(/i,
  /union.*select/i,
  /concat\(/i,
];

// Suspicious patterns to log
const SUSPICIOUS_PATTERNS = [
  /\.php/i,
  /\.asp/i,
  /\.exe/i,
  /\.pl/i,
  /\.cgi/i,
  /\?.*\.(js|php|asp|exe)/i,
  /select.*from/i,
  /insert.*into/i,
  /delete.*from/i,
  /drop.*table/i,
];

function getClientIp(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() 
    || request.headers.get('x-real-ip') 
    || 'unknown';
}


function checkUserAgent(userAgent: string | null): boolean {
  if (!userAgent) return true; // Block if no user agent
  
  // First check allowlist - always permit search engine bots
  for (const pattern of ALWAYS_ALLOW_UA) {
    if (pattern.test(userAgent)) {
      return false;
    }
  }
  
  // Then check blocklist - only block known malicious scanners
  for (const pattern of BLOCKED_USER_AGENTS) {
    if (pattern.test(userAgent)) {
      return true;
    }
  }
  return false;
}

function checkPath(pathname: string): PathCheckResult {
  const lowerPath = pathname.toLowerCase();
  
  // Check blocked patterns
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(lowerPath)) {
      return { blocked: true, suspicious: true };
    }
  }
  
  // Check suspicious patterns (log only, don't block)
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(lowerPath)) {
      return { blocked: false, suspicious: true };
    }
  }
  
  return { blocked: false, suspicious: false };
}

function logSuspicious(request: NextRequest, reason: string) {
  const timestamp = new Date().toISOString();
  const ip = getClientIp(request);
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const path = request.nextUrl.pathname;

  // Structured security logging
  const logEntry = {
    timestamp,
    level: 'WARN',
    type: 'SECURITY',
    reason,
    ip,
    path,
    userAgent: userAgent.substring(0, 100),
  };

  console.warn(JSON.stringify(logEntry));
}

// Supported locales for matching
const SUPPORTED_LOCALES = locales as unknown as string[];

/**
 * Parse Accept-Language header and extract language tags with quality values.
 * Returns sorted array of { tag, quality } objects (highest quality first).
 * Example: "en-US,en;q=0.9,ka;q=0.8" -> [{tag: "en-US", quality: 1}, {tag: "en", quality: 0.9}, {tag: "ka", quality: 0.8}]
 */
function parseAcceptLanguage(header: string | null): Array<{ tag: string; quality: number }> {
  if (!header) return [];
  
  return header
    .split(',')
    .map((part) => {
      const [tag, ...qParts] = part.trim().split(';');
      let quality = 1;
      
      if (qParts.length > 0) {
        const qMatch = qParts.join(';').match(/q=([0-9.]+)/);
        if (qMatch) {
          quality = parseFloat(qMatch[1]) || 0;
        }
      }
      
      return { tag: tag.trim().toLowerCase(), quality };
    })
    .sort((a, b) => b.quality - a.quality);
}

/**
 * Map a BCP 47 language tag to one of our supported locales.
 * Handles primary language matching (e.g., "ar-AE" -> "ar").
 * Returns null if no match found.
 */
function mapToSupportedLocale(tag: string): string | null {
  const normalizedTag = tag.toLowerCase();
  
  // Exact match
  if (SUPPORTED_LOCALES.includes(normalizedTag)) {
    return normalizedTag;
  }
  
  // Try primary language subtag (e.g., "ar-AE" -> "ar")
  const primaryTag = normalizedTag.split('-')[0];
  if (SUPPORTED_LOCALES.includes(primaryTag)) {
    return primaryTag;
  }
  
  return null;
}

/**
 * Detect locale from Accept-Language header or cookie.
 * Falls back to 'en' if no match found.
 */
function detectLocale(request: NextRequest): string {
  // Check for existing locale cookie first
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  if (localeCookie && SUPPORTED_LOCALES.includes(localeCookie)) {
    return localeCookie;
  }
  
  // Parse Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  const parsedLanguages = parseAcceptLanguage(acceptLanguage);
  
  // Find first matching supported locale
  for (const { tag } of parsedLanguages) {
    const matchedLocale = mapToSupportedLocale(tag);
    if (matchedLocale) {
      return matchedLocale;
    }
  }
  
  // Fall back to default locale
  return 'en';
}

// Create the i18n middleware
const i18nMiddleware = createMiddleware(routing);

/**
 * Add performance-related caching headers
 * @param response - NextResponse object
 * @param pathname - Request pathname
 */
function addPerformanceHeaders(response: NextResponse, pathname: string): void {
  // Static assets - long cache
  if (pathname.startsWith('/_next/static') || pathname.match(/\.(js|css|woff2?|png|jpg|jpeg|gif|svg|webp|avif)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    return;
  }

  // API routes - no cache for dynamic content
  if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    return;
  }

  // HTML pages - revalidate with stale-while-revalidate
  if (pathname.endsWith('/') || pathname.endsWith('.html')) {
    response.headers.set('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400');
    return;
  }

  // Default - moderate caching
  response.headers.set('Cache-Control', 'public, max-age=300, stale-while-revalidate=3600');

  // Add performance hints
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Accept-CH', 'DPR, Width, Viewport-Width');
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = getClientIp(request);
  const userAgent = request.headers.get('user-agent') || null;

  // 0. Redirect root to detected locale (307 Temporary Redirect)
  if (pathname === '/') {
    const detectedLocale = detectLocale(request);
    const response = NextResponse.redirect(new URL(`/${detectedLocale}`, request.url), 307);
    
    // Set NEXT_LOCALE cookie for subsequent requests (same settings as CSRF cookie)
    response.cookies.set('NEXT_LOCALE', detectedLocale, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });
    
    return response;
  }

  // 1. Check for blocked user agents
  if (checkUserAgent(userAgent)) {
    logSuspicious(request, 'BLOCKED_UA');
    return new NextResponse('Forbidden', { status: 403 });
  }

  // 2. Check path for blocked/suspicious patterns
  const pathCheck = checkPath(pathname);
  if (pathCheck.blocked) {
    logSuspicious(request, 'BLOCKED_PATH');
    return new NextResponse('Forbidden', { status: 403 });
  }
  if (pathCheck.suspicious) {
    logSuspicious(request, 'SUSPICIOUS_PATH');
  }

  // 3. Rate limiting (skip for static files and health checks)
  if (!pathname.startsWith('/_next') && !pathname.includes('.') && pathname !== '/health') {
    const rateLimitKey = `rl:${ip}`;
    const { success, reset } = await ratelimit.limit(rateLimitKey);
    
    if (!success) {
      logSuspicious(request, 'RATE_LIMITED');
      return new NextResponse('Too Many Requests', { 
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)),
          'X-RateLimit-Limit': '100',
          'X-RateLimit-Remaining': '0',
        }
      });
    }
  }

  // 4. Pass to i18n middleware and add security headers
  const response = i18nMiddleware(request);

  // Generate nonce for CSP
  const nonce = generateNonce();

  // Check if CSRF token exists, set if not (only in cookie, not header)
  const existingCsrfToken = request.cookies.get('csrf-token')?.value;
  if (!existingCsrfToken) {
    const csrfToken = generateCsrfToken();
    response.cookies.set('csrf-token', csrfToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });
    // Note: CSRF token is NOT exposed in headers - only in httpOnly cookie and meta tag in layout
  }

  // Add CSP header with nonce (other security headers handled by Caddyfile)
  response.headers.set('Content-Security-Policy', buildCSPHeader(nonce));

  // Forward nonce to React Server Components via header
  response.headers.set('x-nonce', nonce);

  // Add pathname header for root layout to determine locale
  response.headers.set('x-pathname', pathname);

  // Add performance headers
  addPerformanceHeaders(response, pathname);

  return response;
}

export const config = {
  matcher: [
    '/',
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};
