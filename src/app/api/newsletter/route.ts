import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const schema = z.object({ email: z.string().email() });
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = schema.parse(await request.json());
    
    // Add to audience (create an audience in Resend dashboard first)
    await resend.contacts.create({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID!,
      unsubscribed: false,
    });
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
}
