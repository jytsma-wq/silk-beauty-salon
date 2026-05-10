import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const statusSchema = z.object({
  status: z.enum(["NEW", "IN_PROGRESS", "COMPLETED", "ARCHIVED"]),
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

    const contact = await db.contactSubmission.update({
      where: { id },
      data: { status: parsed.data.status },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error("Error updating contact submission:", error);
    return NextResponse.json({ error: "Failed to update contact" }, { status: 500 });
  }
}
