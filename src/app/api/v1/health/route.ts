/**
 * Health Check API
 * GET /api/v1/health
 */

import {
  createSuccessResponse,
  createJsonResponse,
  generateRequestId,
} from '@/lib/api/types';
import { db } from '@/lib/db';
import { publicEnv } from '@/lib/env';

/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the health status of the API and its dependencies
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       enum: [healthy, degraded, unhealthy]
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                     version:
 *                       type: string
 *                     checks:
 *                       type: object
 *                       properties:
 *                         database:
 *                           type: string
 *                           enum: [ok, error]
 *       503:
 *         description: Service is unhealthy
 */
export async function GET(): Promise<Response> {
  const checks: { database: 'ok' | 'error'; dbLatencyMs?: number } = { database: 'error' };
  let status: 'healthy' | 'degraded' | 'unhealthy' = 'unhealthy';

  try {
    // Check database connection with latency measurement
    const dbStart = Date.now();
    await db.$queryRaw`SELECT 1`;
    checks.dbLatencyMs = Date.now() - dbStart;
    checks.database = 'ok';
    status = 'healthy';
  } catch (error) {
    console.error('Health check - Database error:', error);
    status = 'unhealthy';
  }

  const response = createSuccessResponse(
    {
      status,
      timestamp: new Date().toISOString(),
      version: publicEnv.NEXT_PUBLIC_APP_VERSION
        ?? process.env.npm_package_version
        ?? '0.2.0',
      checks,
    },
    { requestId: generateRequestId() }
  );

  const statusCode = status === 'unhealthy' ? 503 : 200;

  return createJsonResponse(response, statusCode, {
    'Cache-Control': 'no-store, no-cache, must-revalidate',
  });
}
