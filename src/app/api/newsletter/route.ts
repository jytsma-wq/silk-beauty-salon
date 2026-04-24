import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const schema = z.object({ email: z.string().email() });

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const { email } = schema.parse(await request.json());
    
    // If Resend is not configured, just log and return success
    if (!resend || !process.env.RESEND_AUDIENCE_ID) {
      console.log('Newsletter signup (Resend not configured):', email);
      return NextResponse.json({ success: true, message: 'Resend not configured' });
    }
    
    // Add to audience (create an audience in Resend dashboard first)
    await resend.contacts.create({
      email,
      audienceId: process.env.RESEND_AUDIENCE_ID,
      unsubscribed: false,
    });
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
}
