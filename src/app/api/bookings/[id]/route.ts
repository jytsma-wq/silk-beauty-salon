import React from "react";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { db } from "@/lib/db";
import { BookingConfirmationEmail } from "@/emails/booking-confirmation";
import { emailConfig, senderAddress } from "@/lib/email-config";
import { renderEmail } from "@/lib/render-email";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const statusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "NO_SHOW", "COMPLETED"]),
});

function hasAdminAccess(request: NextRequest) {
  const expected = process.env.API_SECRET_KEY;
  return Boolean(expected && request.headers.get("x-api-key") === expected);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!hasAdminAccess(request)) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 400 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = statusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid status", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const existing = await db.booking.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const booking = await db.booking.update({
      where: { id },
      data: { status: parsed.data.status },
    });

    if (resend && parsed.data.status === "CONFIRMED" && existing.status !== "CONFIRMED") {
      const html = await renderEmail(
        React.createElement(BookingConfirmationEmail, {
          patientName: booking.name,
          service: booking.service,
          date: booking.date.toISOString().slice(0, 10),
          time: booking.timeSlot,
        })
      );

      await resend.emails.send({
        from: senderAddress(),
        to: [booking.email],
        subject: "Your Appointment Is Confirmed - Silk Beauty Salon",
        html,
      });
    }

    if (resend && parsed.data.status === "CANCELLED" && existing.status !== "CANCELLED") {
      await resend.emails.send({
        from: senderAddress(),
        to: [booking.email],
        subject: "Your Appointment Has Been Cancelled - Silk Beauty Salon",
        html: `<p>Dear ${booking.name},</p><p>Your ${booking.service} appointment on ${booking.date
          .toISOString()
          .slice(0, 10)} at ${booking.timeSlot} has been cancelled. Please contact ${
          emailConfig.adminTo
        } if you have questions.</p>`,
      });
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}
