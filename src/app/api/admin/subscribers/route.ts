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
    const subscribers = await db.newsletterSubscriber.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(subscribers);
  } catch (error) {
    console.error("Error fetching newsletter subscribers:", error);
    return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 });
  }
}
