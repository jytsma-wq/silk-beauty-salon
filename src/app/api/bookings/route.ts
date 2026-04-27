import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { verifyCsrfToken } from "@/lib/csrf";
import { bookingsApiRateLimit } from "@/lib/rate-limit";
import { logSecurityEvent } from "@/lib/security-logger";
import { sanitizeText, sanitizeEmail, sanitizeName } from "@/lib/sanitize";

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

// GET handler - returns booked slots for a date or all bookings
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (date) {
      // Return booked time slots for the specified date
      const bookings = await db.booking.findMany({
        where: {
          date: date,
          status: {
            not: "cancelled",
          },
        },
        select: {
          timeSlot: true,
        },
      });

      const bookedSlots = bookings.map((booking: { timeSlot: string }) => booking.timeSlot);
      return NextResponse.json({ bookedSlots });
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

    // Check for time slot conflicts
    const existingBooking = await db.booking.findFirst({
      where: {
        date: sanitized.date,
        timeSlot: sanitized.timeSlot,
        status: {
          not: "cancelled",
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
        date: sanitized.date,
        timeSlot: sanitized.timeSlot,
        message: sanitized.message,
        status: "pending",
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
