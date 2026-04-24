import { Redis } from 'ioredis';
import { getRedisClient } from './rate-limit';

interface SecurityEvent {
  type: 'rate_limit' | 'csrf_fail' | 'auth_fail' | 'xss_attempt' | 'sql_injection' | 'nosql_injection';
  ip: string;
  path: string;
  userAgent?: string;
  details?: Record<string, unknown>;
  timestamp: number;
}

interface SecurityMetrics {
  totalEvents: number;
  byType: Record<string, number>;
  byIp: Record<string, number>;
  topPaths: Record<string, number>;
}

const SECURITY_EVENTS_KEY = 'security:events';
const SECURITY_ALERTS_KEY = 'security:alerts';
const EVENT_RETENTION_DAYS = 30;

/**
 * Log security event for analysis
 */
export async function logSecurityEvent(event: Omit<SecurityEvent, 'timestamp'>): Promise<void> {
  const fullEvent: SecurityEvent = {
    ...event,
    timestamp: Date.now(),
  };

  // Log to console for immediate visibility
  console.warn('[SECURITY]', event.type, event.ip, event.path, event.details);

  const redis = getRedisClient();
  if (redis) {
    try {
      // Store event in Redis sorted set with timestamp as score
      await redis.zadd(
        SECURITY_EVENTS_KEY,
        fullEvent.timestamp,
        JSON.stringify(fullEvent)
      );

      // Set expiration on the key
      await redis.expire(SECURITY_EVENTS_KEY, EVENT_RETENTION_DAYS * 24 * 60 * 60);

      // Check if we need to alert (e.g., high volume from single IP)
      await checkForAlerts(redis, event);
    } catch (error) {
      console.error('Failed to log security event to Redis:', error);
    }
  }
}

/**
 * Check if security alert should be triggered
 */
async function checkForAlerts(redis: Redis, event: Omit<SecurityEvent, 'timestamp'>): Promise<void> {
  const windowStart = Date.now() - 5 * 60 * 1000; // 5 minute window
  const ipKey = `security:ip:${event.ip}`;

  // Count events from this IP in last 5 minutes
  const count = await redis.zcount(ipKey, windowStart, '+inf');

  if (count > 10) {
    // High volume from single IP - create alert
    const alert = {
      type: 'high_volume',
      ip: event.ip,
      count,
      timestamp: Date.now(),
    };
    await redis.lpush(SECURITY_ALERTS_KEY, JSON.stringify(alert));
    await redis.expire(SECURITY_ALERTS_KEY, 7 * 24 * 60 * 60); // 7 days

    // Also add IP to potential block list
    await redis.setex(`security:block:${event.ip}`, 60 * 60, 'true'); // 1 hour block
  }

  // Add event to IP-specific list
  await redis.zadd(ipKey, Date.now(), JSON.stringify(event));
  await redis.expire(ipKey, 60 * 60); // 1 hour retention
}

/**
 * Get security metrics for dashboard
 */
export async function getSecurityMetrics(timeWindowHours: number = 24): Promise<SecurityMetrics> {
  const redis = getRedisClient();
  if (!redis) {
    return {
      totalEvents: 0,
      byType: {},
      byIp: {},
      topPaths: {},
    };
  }

  const since = Date.now() - timeWindowHours * 60 * 60 * 1000;

  try {
    // Get events in time window
    const events = await redis.zrangebyscore(SECURITY_EVENTS_KEY, since, '+inf');

    const metrics: SecurityMetrics = {
      totalEvents: events.length,
      byType: {},
      byIp: {},
      topPaths: {},
    };

    for (const eventStr of events) {
      try {
        const event: SecurityEvent = JSON.parse(eventStr);
        metrics.byType[event.type] = (metrics.byType[event.type] || 0) + 1;
        metrics.byIp[event.ip] = (metrics.byIp[event.ip] || 0) + 1;
        metrics.topPaths[event.path] = (metrics.topPaths[event.path] || 0) + 1;
      } catch {
        // Skip invalid events
      }
    }

    return metrics;
  } catch (error) {
    console.error('Failed to get security metrics:', error);
    return {
      totalEvents: 0,
      byType: {},
      byIp: {},
      topPaths: {},
    };
  }
}

/**
 * Check if IP is blocked due to suspicious activity
 */
export async function isIpBlocked(ip: string): Promise<boolean> {
  const redis = getRedisClient();
  if (!redis) return false;

  try {
    const blocked = await redis.get(`security:block:${ip}`);
    return blocked === 'true';
  } catch {
    return false;
  }
}

/**
 * Get active security alerts
 */
export async function getActiveAlerts(limit: number = 50): Promise<Array<{ type: string; ip: string; count: number; timestamp: number }>> {
  const redis = getRedisClient();
  if (!redis) return [];

  try {
    const alerts = await redis.lrange(SECURITY_ALERTS_KEY, 0, limit - 1);
    return alerts.map(a => JSON.parse(a));
  } catch {
    return [];
  }
}

/**
 * Middleware to check if request should be blocked
 * Use in API routes to check blocked IPs
 */
export async function securityCheck(ip: string, path: string): Promise<{ blocked: boolean; reason?: string }> {
  // Check if IP is blocked
  if (await isIpBlocked(ip)) {
    return { blocked: true, reason: 'IP temporarily blocked due to suspicious activity' };
  }

  return { blocked: false };
}
