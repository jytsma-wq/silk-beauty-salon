import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createChatbotReply } from '@/lib/chatbot';
import { apiRateLimit } from '@/lib/rate-limit';

const chatRequestSchema = z.object({
  message: z.string().trim().min(1).max(1000),
});

function getClientIp(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rateResult = await apiRateLimit(ip);

  if (!rateResult.allowed) {
    return NextResponse.json(
      { error: 'Too many chat requests. Please try again shortly.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((rateResult.resetTime - Date.now()) / 1000)),
          'X-RateLimit-Limit': String(rateResult.limit),
          'X-RateLimit-Remaining': String(rateResult.remaining),
        },
      }
    );
  }

  const body = await request.json().catch(() => null);
  const result = chatRequestSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
  }

  return NextResponse.json(createChatbotReply(result.data.message));
}
