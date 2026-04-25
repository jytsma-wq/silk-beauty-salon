import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { apiRateLimit } from '@/lib/rate-limit';
import { logSecurityEvent } from '@/lib/security-logger';

const schema = z.object({ email: z.string().email() });

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  // Extract client IP
  const headers = request.headers;
  const forwarded = headers.get('x-forwarded-for');
  const realIp = headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0].trim() || realIp || 'unknown';

  // Check rate limit
  const rateLimitResult = await apiRateLimit(ip);
  if (!rateLimitResult.allowed) {
    await logSecurityEvent({
      type: 'rate_limit',
      ip,
      path: '/api/newsletter',
      userAgent: headers.get('user-agent') || undefined,
      details: { reason: 'Newsletter signup rate limit exceeded' },
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

  // Parse request body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // Validate email using safeParse
  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const { email } = result.data;

  // If Resend is not configured, just log and return success
  if (!resend || !process.env.RESEND_AUDIENCE_ID) {
    console.log('Newsletter signup (Resend not configured):', email);
    return NextResponse.json({ success: true, message: 'Resend not configured' });
  }

  // Add to audience (create an audience in Resend dashboard first)
  try {
    await resend.contacts.create({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID,
      unsubscribed: false,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resend API error:', error);
    return NextResponse.json({ error: 'Failed to subscribe. Please try again later.' }, { status: 500 });
  }
}
