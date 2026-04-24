import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './src/i18n/routing';

// Rate limiting - in-memory store (resets on function cold start)
// For production with multiple instances, use Redis or Upstash
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60; // seconds
const RATE_LIMIT_MAX = 100; // requests per window

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

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(key);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW * 1000 });
    return false;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }
  
  record.count++;
  return false;
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

function checkPath(pathname: string): { blocked: boolean; suspicious: boolean } {
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
  
  // In production, send to logging service (Datadog, etc.)
  console.log(`[SECURITY] ${timestamp} | ${reason} | IP: ${ip} | Path: ${request.nextUrl.pathname} | UA: ${userAgent.substring(0, 100)}`);
}

// Create the i18n middleware
const i18nMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = getClientIp(request);
  const userAgent = request.headers.get('user-agent') || null;

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
    if (isRateLimited(rateLimitKey)) {
      logSuspicious(request, 'RATE_LIMITED');
      return new NextResponse('Too Many Requests', { 
        status: 429,
        headers: {
          'Retry-After': '60',
          'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
          'X-RateLimit-Remaining': '0',
        }
      });
    }
  }

  // 4. Pass to i18n middleware
  return i18nMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - api routes (we handle them in the middleware)
    // - _next/static files
    // - _next/image files
    // - favicon.ico
    // - public folder files
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
