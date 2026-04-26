import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

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
    const body = await request.json();
    const { name, email, phone, service, date, timeSlot, message } = body;

    // Validate required fields
    if (!name || !email || !service || !date || !timeSlot) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, service, date, timeSlot" },
        { status: 400 }
      );
    }

    // Check for time slot conflicts
    const existingBooking = await db.booking.findFirst({
      where: {
        date: date,
        timeSlot: timeSlot,
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
        name,
        email,
        phone,
        service,
        date,
        timeSlot,
        message,
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
