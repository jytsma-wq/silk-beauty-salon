import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import React from "react";
import { db } from "@/lib/db";
import { verifyCsrfToken } from "@/lib/csrf";
import { bookingsApiRateLimit } from "@/lib/rate-limit";
import { logSecurityEvent } from "@/lib/security-logger";
import { sanitizeText, sanitizeEmail, sanitizeName } from "@/lib/sanitize";
import { AdminNotificationEmail } from "@/emails/admin-notification";
import { BookingConfirmationEmail } from "@/emails/booking-confirmation";
import { senderAddress, emailConfig } from "@/lib/email-config";
import { renderEmail } from "@/lib/render-email";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Zod schema for booking validation
const bookingSchema = z.object({
  name: z.string().min(1, "Name is required").max(200, "Name too long"),
  email: z.string().email("Invalid email format"),
  phone: z.string().optional(),
  service: z.string().min(1, "Service is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  timeSlot: z.string().regex(/^\d{2}:\d{2}\s*-\s*\d{2}:\d{2}$/, "Invalid time format (HH:MM - HH:MM)"),
  message: z.string().max(5000).optional(),
});

const dateOnlySchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

function getBookingDateRange(date: string) {
  const start = new Date(`${date}T00:00:00.000Z`);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);
  return { start, end };
}

// GET handler - returns booked slots for a date or all bookings
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (date) {
      const dateResult = dateOnlySchema.safeParse(date);
      if (!dateResult.success) {
        return NextResponse.json(
          { error: "Invalid date format (YYYY-MM-DD)" },
          { status: 400 }
        );
      }

      const { start, end } = getBookingDateRange(dateResult.data);

      // Return booked time slots for the specified date
      const bookings = await db.booking.findMany({
        where: {
          date: {
            gte: start,
            lt: end,
          },
          status: {
            not: "CANCELLED",
          },
        },
        select: {
          timeSlot: true,
        },
      });

      const bookedSlots = bookings.map((booking) => booking.timeSlot);
      return NextResponse.json({ bookedSlots });
    }

    const apiKey = request.headers.get("x-api-key");
    if (apiKey !== process.env.API_SECRET_KEY) {
      return NextResponse.json(
        { error: "Date parameter or API key required" },
        { status: 400 }
      );
    }

    // Return all bookings ordered by createdAt desc
    const bookings = await db.booking.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

// POST handler - creates a new booking
export async function POST(request: NextRequest) {
  try {
    // CSRF validation
    const csrfValid = await verifyCsrfToken(request);
    if (!csrfValid) {
      return NextResponse.json(
        { error: "Invalid or missing CSRF token" },
        { status: 403 }
      );
    }

    // Rate limiting (10 requests per minute per IP)
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwarded?.split(',')[0].trim() || realIp || 'unknown';
    const rateLimitResult = await bookingsApiRateLimit(ip);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)),
          },
        }
      );
    }

    const body = await request.json();

    // Validate with Zod
    const parseResult = bookingSchema.safeParse(body);
    if (!parseResult.success) {
      await logSecurityEvent({
        type: 'validation_fail',
        ip,
        path: '/api/bookings',
        userAgent: request.headers.get('user-agent') || undefined,
        details: { reason: 'Zod validation failed', errors: parseResult.error.flatten() },
      });
      return NextResponse.json(
        { error: "Invalid input", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, service, date, timeSlot, message } = parseResult.data;

    // Sanitize input
    const sanitized = {
      name: sanitizeName(name),
      email: sanitizeEmail(email) || email.toLowerCase().trim(),
      phone: phone ? sanitizeText(phone) : null,
      service: sanitizeText(service),
      date: sanitizeText(date),
      timeSlot: sanitizeText(timeSlot),
      message: message ? sanitizeText(message) : null,
    };
    const bookingDateRange = getBookingDateRange(sanitized.date);

    // Check for time slot conflicts
    const existingBooking = await db.booking.findFirst({
      where: {
        date: {
          gte: bookingDateRange.start,
          lt: bookingDateRange.end,
        },
        timeSlot: sanitized.timeSlot,
        status: {
          not: "CANCELLED",
        },
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: "This time slot is already booked" },
        { status: 409 }
      );
    }

    // Create the booking
    const booking = await db.booking.create({
      data: {
        name: sanitized.name,
        email: sanitized.email,
        phone: sanitized.phone,
        service: sanitized.service,
        date: bookingDateRange.start,
        timeSlot: sanitized.timeSlot,
        message: sanitized.message,
        status: "PENDING",
      },
    });

    if (resend) {
      const patientHtml = await renderEmail(
        React.createElement(BookingConfirmationEmail, {
          patientName: sanitized.name,
          service: sanitized.service,
          date: sanitized.date,
          time: sanitized.timeSlot,
        })
      );

      await resend.emails.send({
        from: senderAddress(),
        to: [sanitized.email],
        subject: "Your Booking Confirmation - Silk Beauty Salon",
        html: patientHtml,
      });

      const adminHtml = await renderEmail(
        React.createElement(AdminNotificationEmail, {
          type: "booking",
          fields: {
            Name: sanitized.name,
            Email: sanitized.email,
            Phone: sanitized.phone ?? "Not provided",
            Service: sanitized.service,
            Date: sanitized.date,
            Time: sanitized.timeSlot,
            Message: sanitized.message ?? "None",
          },
        })
      );

      await resend.emails.send({
        from: senderAddress(),
        to: [emailConfig.adminTo],
        replyTo: sanitized.email,
        subject: `New Booking Request from ${sanitized.name}`,
        html: adminHtml,
      });
    }

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
