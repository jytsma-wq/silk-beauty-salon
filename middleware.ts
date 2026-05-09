import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { routing } from './src/i18n/routing';
import { locales } from './src/i18n';
import { structuredLog } from './src/lib/logger';
import { isIpBlocked } from './src/lib/security-logger';

// Path check result type
interface PathCheckResult {
  blocked: boolean;
  suspicious: boolean;
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

// Blocked patterns for public pages (includes WordPress/PHP scanners)
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

function logSuspicious(request: NextRequest, reason: string, requestId: string) {
  const ip = getClientIp(request);
  const userAgent = request.headers.get('user-agent') || 'unknown';
  const path = request.nextUrl.pathname;

  // Structured security logging with request ID
  structuredLog({
    timestamp: new Date().toISOString(),
    level: 'WARN',
    type: 'SECURITY',
    requestId,
    reason,
    ip,
    path,
    method: request.method,
    userAgent: userAgent.substring(0, 100),
  });
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

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = getClientIp(request);
  const userAgent = request.headers.get('user-agent') || null;

  // Generate request ID for tracing
  const requestId = crypto.randomUUID();

  // Check if IP is on the security block list
  const blocked = await isIpBlocked(ip);
  if (blocked) {
    logSuspicious(request, 'IP_BLOCKED', requestId);
    return new NextResponse('Forbidden', {
      status: 403,
      headers: {
        'x-request-id': requestId,
        'Content-Type': 'text/plain',
      },
    });
  }

  // Redirect root to detected locale
  if (pathname === '/') {
    const detectedLocale = detectLocale(request);
    const response = NextResponse.redirect(new URL(`/${detectedLocale}`, request.url), 307);

    // Set NEXT_LOCALE cookie for subsequent requests
    response.cookies.set('NEXT_LOCALE', detectedLocale, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    response.headers.set('x-request-id', requestId);
    return response;
  }

  // Check for blocked user agents
  if (checkUserAgent(userAgent)) {
    logSuspicious(request, 'BLOCKED_UA', requestId);
    const response = new NextResponse('Forbidden', { status: 403 });
    response.headers.set('x-request-id', requestId);
    return response;
  }

  // Check path for blocked/suspicious patterns
  const pathCheck = checkPath(pathname);
  if (pathCheck.blocked) {
    logSuspicious(request, 'BLOCKED_PATH', requestId);
    const response = new NextResponse('Forbidden', { status: 403 });
    response.headers.set('x-request-id', requestId);
    return response;
  }
  if (pathCheck.suspicious) {
    logSuspicious(request, 'SUSPICIOUS_PATH', requestId);
  }

  // Apply rate limiting to non-static requests
  if (!pathname.startsWith('/_next') && !pathname.includes('.')) {
    const rateLimitKey = `rl:${ip}`;
    const { success, reset } = await ratelimit.limit(rateLimitKey);

    if (!success) {
      logSuspicious(request, 'RATE_LIMITED', requestId);
      const response = new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)),
          'X-RateLimit-Limit': '100',
          'X-RateLimit-Remaining': '0',
          'x-request-id': requestId,
        }
      });
      return response;
    }
  }

  // Pass to i18n middleware for locale routing
  const response = i18nMiddleware(request);

  // Add essential headers
  response.headers.set('x-request-id', requestId);
  response.headers.set('x-pathname', pathname);

  return response;
}

export const config = {
  matcher: [
    '/',
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};
