import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

function hasAdminAccess(request: NextRequest) {
  const expected = process.env.API_SECRET_KEY;
  return Boolean(expected && request.headers.get("x-api-key") === expected);
}

export async function GET(request: NextRequest) {
  if (!hasAdminAccess(request)) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 400 });
  }

  try {
    const contacts = await db.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}
