import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  checks: {
    database: {
      status: 'healthy' | 'unhealthy';
      responseTime: number;
      message?: string;
      details?: {
        connectionPoolSize: number;
        activeConnections: number;
        idleConnections: number;
      };
    };
    tables?: {
      status: 'healthy' | 'degraded' | 'unhealthy';
      counts: Record<string, number>;
      message?: string;
    };
    performance?: {
      status: 'healthy' | 'degraded' | 'unhealthy';
      avgQueryTime: number;
      slowQueries: number;
      message?: string;
    };
  };
}

interface DatabaseMetrics {
  connectionPoolSize: number;
  activeConnections: number;
  idleConnections: number;
  totalQueries: number;
  slowQueries: number;
}

// Health check configuration
const HEALTH_CHECK_TIMEOUT = 5000; // 5 seconds
const SLOW_QUERY_THRESHOLD = 1000; // 1 second

/**
 * Get database connection metrics
 */
async function getConnectionMetrics(): Promise<DatabaseMetrics> {
  const result = await db.$queryRaw`
    SELECT
      current_setting('max_connections')::int as connection_pool_size,
      count(*) filter (where state = 'active') as active_connections,
      count(*) filter (where state = 'idle') as idle_connections
    FROM pg_stat_activity
    WHERE backend_type = 'client backend'
  `;

  const row = Array.isArray(result) && result[0] ? result[0] : null;

  return {
    connectionPoolSize: row?.connection_pool_size || 100,
    activeConnections: row?.active_connections || 0,
    idleConnections: row?.idle_connections || 0,
    totalQueries: 0,
    slowQueries: 0,
  };
}

/**
 * Check database connectivity
 */
async function checkDatabase(): Promise<HealthCheckResult['checks']['database']> {
  const startTime = Date.now();

  try {
    // Test connection with timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Database health check timeout')), HEALTH_CHECK_TIMEOUT);
    });

    const healthCheckPromise = db.$queryRaw`SELECT 1 as health`;

    await Promise.race([healthCheckPromise, timeoutPromise]);
    const responseTime = Date.now() - startTime;

    // Get connection metrics
    const metrics = await getConnectionMetrics();

    return {
      status: 'healthy',
      responseTime,
      details: {
        connectionPoolSize: metrics.connectionPoolSize,
        activeConnections: metrics.activeConnections,
        idleConnections: metrics.idleConnections,
      },
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;
    return {
      status: 'unhealthy',
      responseTime,
      message: error instanceof Error ? error.message : 'Unknown database error',
    };
  }
}

/**
 * Check table health and counts
 */
async function checkTables(): Promise<HealthCheckResult['checks']['tables']> {
  try {
    const [contactSubmissions, bookingRequests, newsletterSubscribers, blogPosts, bookings] =
      await Promise.all([
        db.contactSubmission.count(),
        db.bookingRequest.count(),
        db.newsletterSubscriber.count(),
        db.blogPost.count(),
        db.booking.count(),
      ]);

    const counts = {
      contactSubmissions,
      bookingRequests,
      newsletterSubscribers,
      blogPosts,
      bookings,
    };

    return {
      status: 'healthy',
      counts,
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      counts: {},
      message: error instanceof Error ? error.message : 'Failed to check table health',
    };
  }
}

/**
 * Check database performance metrics
 */
async function checkPerformance(): Promise<HealthCheckResult['checks']['performance']> {
  const queryTimes: number[] = [];

  try {
    // Run a simple query multiple times to measure average response time
    for (let i = 0; i < 3; i++) {
      const start = Date.now();
      await db.$queryRaw`SELECT pg_sleep(0.001)`; // 1ms sleep
      queryTimes.push(Date.now() - start);
    }

    const avgQueryTime = queryTimes.reduce((a, b) => a + b, 0) / queryTimes.length;
    const slowQueries = queryTimes.filter((t) => t > SLOW_QUERY_THRESHOLD).length;

    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    let message: string | undefined;

    if (avgQueryTime > 500) {
      status = 'degraded';
      message = 'Average query time is elevated';
    }
    if (avgQueryTime > 2000) {
      status = 'unhealthy';
      message = 'Database performance is critically slow';
    }

    return {
      status,
      avgQueryTime: Math.round(avgQueryTime),
      slowQueries,
      message,
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      avgQueryTime: 0,
      slowQueries: 0,
      message: error instanceof Error ? error.message : 'Failed to check performance',
    };
  }
}

/**
 * Calculate overall health status
 */
function calculateOverallStatus(checks: HealthCheckResult['checks']): HealthCheckResult['status'] {
  const statuses = [
    checks.database.status,
    checks.tables?.status,
    checks.performance?.status,
  ].filter(Boolean);

  if (statuses.some((s) => s === 'unhealthy')) {
    return 'unhealthy';
  }
  if (statuses.some((s) => s === 'degraded')) {
    return 'degraded';
  }
  return 'healthy';
}

/**
 * GET /api/health/db
 * Database health check endpoint
 */
export async function GET(): Promise<Response> {
  const startTime = Date.now();

  try {
    const [databaseHealth, tableHealth, performanceHealth] = await Promise.all([
      checkDatabase(),
      checkTables(),
      checkPerformance(),
    ]);

    const healthCheck: HealthCheckResult = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      checks: {
        database: databaseHealth,
        tables: tableHealth,
        performance: performanceHealth,
      },
    };

    healthCheck.status = calculateOverallStatus(healthCheck.checks);

    // Determine HTTP status code
    let statusCode = 200;
    if (healthCheck.status === 'degraded') {
      statusCode = 200; // Still return 200 but indicate degraded state
    } else if (healthCheck.status === 'unhealthy') {
      statusCode = 503; // Service Unavailable
    }

    const totalResponseTime = Date.now() - startTime;

    return NextResponse.json(healthCheck, {
      status: statusCode,
      headers: {
        'X-Health-Check-Response-Time': `${totalResponseTime}ms`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    const errorCheck: HealthCheckResult = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      checks: {
        database: {
          status: 'unhealthy',
          responseTime: Date.now() - startTime,
          message: error instanceof Error ? error.message : 'Health check failed',
        },
      },
    };

    return NextResponse.json(errorCheck, {
      status: 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  }
}

/**
 * HEAD /api/health/db
 * Lightweight health check for load balancers
 */
export async function HEAD(): Promise<Response> {
  try {
    await db.$queryRaw`SELECT 1`;

    return new Response(null, {
      status: 200,
      headers: {
        'X-Health-Status': 'healthy',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch {
    return new Response(null, {
      status: 503,
      headers: {
        'X-Health-Status': 'unhealthy',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  }
}

