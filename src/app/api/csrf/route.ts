import { NextRequest, NextResponse } from 'next/server';
import { setCsrfToken } from '@/lib/csrf';
import { csrfRateLimit } from '@/lib/rate-limit';
import { logSecurityEvent } from '@/lib/security-logger';

export async function GET(request: NextRequest) {
  // Rate limiting (20 requests per minute per IP)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0].trim() || realIp || 'unknown';

  const rateLimitResult = await csrfRateLimit(ip);
  if (!rateLimitResult.allowed) {
    await logSecurityEvent({
      type: 'rate_limit',
      ip,
      path: '/api/csrf',
      userAgent: request.headers.get('user-agent') || undefined,
      details: { reason: 'CSRF token rate limit exceeded' },
    });
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)),
          'X-RateLimit-Limit': String(rateLimitResult.limit),
          'X-RateLimit-Remaining': String(rateLimitResult.remaining),
        },
      }
    );
  }

  const token = await setCsrfToken();
  return NextResponse.json({ token });
}
