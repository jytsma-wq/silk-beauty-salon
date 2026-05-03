/**
 * Simple Health Check API
 * GET /api/health - Bypasses authentication for health monitoring
 */

import { headers } from 'next/headers';

export async function GET(): Promise<Response> {
  const headersList = await headers();
  const requestId = headersList.get('x-request-id') || 'unknown';

  return new Response(
    JSON.stringify({
      status: 'ok',
      ts: Date.now(),
      requestId,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    }
  );
}
