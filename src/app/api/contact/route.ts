import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import React from 'react';
import { db } from '@/lib/db';
import { contactRateLimit } from '@/lib/rate-limit';
import { logSecurityEvent } from '@/lib/security-logger';
import { verifyCsrfToken } from '@/lib/csrf';
import { AdminNotificationEmail } from '@/emails/admin-notification';
import { emailConfig, senderAddress } from '@/lib/email-config';
import { renderEmail } from '@/lib/render-email';

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  locale: z.string().default('en'),
});

export async function POST(request: Request) {
  try {
    // Extract client IP
    const headers = request.headers;
    const forwarded = headers.get('x-forwarded-for');
    const realIp = headers.get('x-real-ip');
    const ip = forwarded?.split(',')[0].trim() || realIp || 'unknown';

    // Verify CSRF token
    const csrfValid = await verifyCsrfToken(request as unknown as import('next/server').NextRequest);
    if (!csrfValid) {
      await logSecurityEvent({
        type: 'csrf_fail',
        ip,
        path: '/api/contact',
        userAgent: headers.get('user-agent') || undefined,
        details: { reason: 'CSRF token invalid or missing' },
      });
      return NextResponse.json(
        { error: 'Invalid or missing CSRF token' },
        { status: 403 }
      );
    }

    // Check rate limit (5 requests per minute per IP)
    const rateLimitResult = await contactRateLimit(ip);
    if (!rateLimitResult.allowed) {
      await logSecurityEvent({
        type: 'rate_limit',
        ip,
        path: '/api/contact',
        userAgent: headers.get('user-agent') || undefined,
        details: { reason: 'Contact form rate limit exceeded' },
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

    const body = await request.json();
    
    // Validate input
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, message } = result.data;

    // Sanitize input
    const sanitized = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || null,
      message: message.trim(),
    };

    // Send email to admin (if Resend is configured)
    if (resend) {
      const adminHtml = await renderEmail(
        React.createElement(AdminNotificationEmail, {
          type: 'contact',
          fields: {
            Name: sanitized.name,
            Email: sanitized.email,
            Phone: sanitized.phone ?? 'Not provided',
            Message: sanitized.message,
          },
        })
      );

      await resend.emails.send({
        from: senderAddress(),
        to: [emailConfig.adminTo],
        replyTo: sanitized.email,
        subject: `New enquiry from ${sanitized.name}`,
        html: adminHtml,
      });
    } else {
      console.warn('Contact form submission (Resend not configured):', sanitized);
    }

    // Save to database
    await db.contactSubmission.create({
      data: {
        name: sanitized.name,
        email: sanitized.email,
        phone: sanitized.phone,
        message: sanitized.message,
      },
    });

    return NextResponse.json(
      { success: true, message: 'Thank you for your message. We will get back to you shortly.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
