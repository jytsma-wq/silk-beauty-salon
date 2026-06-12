import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import React from 'react';
import { db } from '@/lib/db';
import { verifyCsrfToken } from '@/lib/csrf';
import { newsletterRateLimit } from '@/lib/rate-limit';
import { logSecurityEvent } from '@/lib/security-logger';
import { sanitizeEmail } from '@/lib/sanitize';
import { renderEmail } from '@/lib/render-email';
import { NewsletterWelcomeEmail } from '@/emails/newsletter-welcome';
import { sendMail } from '@/lib/mailer';

export const runtime = 'nodejs';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  locale: z.string().default('en'),
});

export async function POST(request: NextRequest) {
  try {
    const headers = request.headers;
    const ip =
      headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      headers.get('x-real-ip') ||
      'unknown';

    const csrfValid = await verifyCsrfToken(request);
    if (!csrfValid) {
      await logSecurityEvent({
        type: 'csrf_fail',
        ip,
        path: '/api/newsletter',
        userAgent: headers.get('user-agent') || undefined,
        details: { reason: 'CSRF token invalid or missing' },
      });
      return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
    }

    const rateResult = await newsletterRateLimit(ip);
    if (!rateResult.allowed) {
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
            'Retry-After': String(Math.ceil((rateResult.resetTime - Date.now()) / 1000)),
          },
        }
      );
    }

    const body = await request.json();
    const result = newsletterSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid email', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { email, locale } = result.data;
    const sanitizedEmail = sanitizeEmail(email) || email.toLowerCase().trim();

    try {
      await db.newsletterSubscriber.upsert({
        where: { email: sanitizedEmail },
        create: { email: sanitizedEmail, locale, status: 'ACTIVE' },
        update: { status: 'ACTIVE', locale },
      });
    } catch (dbError) {
      console.error('Newsletter database error:', dbError);
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }

    try {
      const welcomeHtml = await renderEmail(
        React.createElement(NewsletterWelcomeEmail, {
          email: sanitizedEmail,
          locale,
        })
      );

      await sendMail({
        to: [sanitizedEmail],
        subject: 'Welcome to Silk Beauty Salon',
        html: welcomeHtml,
      });
    } catch (emailError) {
      console.error('Hostinger newsletter email error:', emailError);
    }

    return NextResponse.json(
      { success: true, message: 'Subscribed successfully!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('unsubscribe');

  if (!email) {
    return NextResponse.json({ error: 'Missing email parameter' }, { status: 400 });
  }

  try {
    await db.newsletterSubscriber.update({
      where: { email: email.toLowerCase().trim() },
      data: { status: 'UNSUBSCRIBED' },
    });

    return NextResponse.redirect(new URL('/newsletter/unsubscribed', request.url));
  } catch {
    return NextResponse.json({ error: 'Email not found' }, { status: 404 });
  }
}
