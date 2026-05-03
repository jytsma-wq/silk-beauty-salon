/**
 * Simple Health Check API
 * GET /api/health - Bypasses authentication for health monitoring
 */

export async function GET(): Promise<Response> {
  return new Response(
    JSON.stringify({
      status: 'ok',
      ts: Date.now(),
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
