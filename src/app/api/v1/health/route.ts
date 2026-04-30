/**
 * Health Check API
 * GET /api/v1/health
 */

import {
  createSuccessResponse,
  createJsonResponse,
  generateRequestId,
} from '@/lib/api/types';
import { PrismaClient } from '@prisma/client';

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
  const checks: { database: 'ok' | 'error' } = { database: 'error' };
  let status: 'healthy' | 'degraded' | 'unhealthy' = 'unhealthy';

  const prisma = new PrismaClient();
  
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    checks.database = 'ok';
    status = 'healthy';
  } catch (error) {
    console.error('Health check - Database error:', error);
    status = 'unhealthy';
  } finally {
    await prisma.$disconnect();
  }

  const response = createSuccessResponse(
    {
      status,
      timestamp: new Date().toISOString(),
      version: process.env.NEXT_PUBLIC_APP_VERSION ?? '0.2.0',
      checks,
    },
    { requestId: generateRequestId() }
  );

  const statusCode = status === 'unhealthy' ? 503 : 200;

  return createJsonResponse(response, statusCode, {
    'Cache-Control': 'no-store, no-cache, must-revalidate',
  });
}
