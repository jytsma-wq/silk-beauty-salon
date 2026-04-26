import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { db } from '@/lib/db';
import { strictRateLimit } from '@/lib/rate-limit';
import { logSecurityEvent } from '@/lib/security-logger';

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'info@silkbeauty.ge';

const bookingFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(5, 'Please enter a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().max(1000).optional(),
  locale: z.string().default('en'),
});

export async function POST(request: Request) {
  try {
    // Extract client IP
    const headers = request.headers;
    const forwarded = headers.get('x-forwarded-for');
    const realIp = headers.get('x-real-ip');
    const ip = forwarded?.split(',')[0].trim() || realIp || 'unknown';

    // Check rate limit
    const rateLimitResult = await strictRateLimit(ip);
    if (!rateLimitResult.allowed) {
      await logSecurityEvent({
        type: 'rate_limit',
        ip,
        path: '/api/book',
        userAgent: headers.get('user-agent') || undefined,
        details: { reason: 'Booking form rate limit exceeded' },
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
    const result = bookingFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, service, preferredDate, preferredTime, message } = result.data;

    // Sanitize input
    const sanitized = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      service: service.trim(),
      preferredDate: preferredDate || null,
      preferredTime: preferredTime || null,
      message: message?.trim() || null,
    };

    // Send email to admin (if Resend is configured)
    if (resend) {
      await resend.emails.send({
        from: 'Silk Beauty Salon <noreply@silkbeauty.ge>',
        to: [CONTACT_EMAIL],
        subject: `New Booking Request from ${sanitized.name}`,
        html: `<h2>New Booking Request</h2>
               <p><b>Name:</b> ${sanitized.name}</p>
               <p><b>Email:</b> ${sanitized.email}</p>
               <p><b>Phone:</b> ${sanitized.phone}</p>
               <p><b>Service:</b> ${sanitized.service}</p>
               <p><b>Preferred Date:</b> ${sanitized.preferredDate ?? 'Not specified'}</p>
               <p><b>Preferred Time:</b> ${sanitized.preferredTime ?? 'Not specified'}</p>
               <p><b>Message:</b> ${sanitized.message ?? 'None'}</p>`,
      });
    } else {
      console.log('Booking form submission (Resend not configured):', sanitized);
    }

    // Save to database
    await db.bookingRequest.create({
      data: {
        name: sanitized.name,
        email: sanitized.email,
        phone: sanitized.phone,
        service: sanitized.service,
        preferredDate: sanitized.preferredDate,
        preferredTime: sanitized.preferredTime,
        message: sanitized.message,
        status: 'pending',
      },
    });

    return NextResponse.json(
      { success: true, message: 'Thank you for your booking request. We will contact you shortly to confirm your appointment.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Booking form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
