/**
 * Security Event Logging
 *
 * Uses Upstash Redis for persistence. Events are stored in sorted sets
 * for time-based queries and lists for recent events.
 */

import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

interface SecurityEvent {
  type: 'rate_limit' | 'csrf_fail' | 'auth_fail' | 'xss_attempt' | 'sql_injection' | 'nosql_injection' | 'validation_fail';
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

// In-memory store for recent events (last 1000)
const recentEvents: SecurityEvent[] = [];
const MAX_MEMORY_EVENTS = 1000;

/**
 * Log security event for analysis
 * Logs to console and persists to Redis.
 */
export async function logSecurityEvent(event: Omit<SecurityEvent, 'timestamp'>): Promise<void> {
  const fullEvent: SecurityEvent = {
    ...event,
    timestamp: Date.now(),
  };

  // Log to console for immediate visibility
  console.warn('[SECURITY]', event.type, event.ip, event.path, event.details);

  // Store in memory (limited size)
  recentEvents.push(fullEvent);
  if (recentEvents.length > MAX_MEMORY_EVENTS) {
    recentEvents.shift();
  }

  // Persist to Redis
  try {
    const key = `security:events:${event.ip}`;
    const score = Date.now();
    const member = JSON.stringify(fullEvent);

    // Add to sorted set for time-based queries
    await redis.zadd(key, { score, member });

    // Expire after 7 days
    await redis.expire(key, 7 * 24 * 60 * 60);

    // Add to recent events list
    await redis.lpush('security:recent', member);
    await redis.expire('security:recent', 7 * 24 * 60 * 60);

    // Check for alerts
    await checkForAlerts(event.ip, event.type);
  } catch (err) {
    console.error('[SECURITY] Failed to persist to Redis:', err);
  }
}

/**
 * Get security metrics for dashboard
 * Returns metrics from Redis (with in-memory fallback).
 */
export async function getSecurityMetrics(timeWindowHours: number = 24): Promise<SecurityMetrics> {
  const since = Date.now() - timeWindowHours * 60 * 60 * 1000;

  // Try Redis first
  try {
    const metrics: SecurityMetrics = {
      totalEvents: 0,
      byType: {},
      byIp: {},
      topPaths: {},
    };

    // Scan for all security event keys
    const pattern = 'security:events:*';
    // Note: Upstash doesn't support scan, use limited approach
    // Get recent events from list
    const recent = await redis.lrange('security:recent', 0, 999);

    for (const member of recent) {
      const event = JSON.parse(member as string) as SecurityEvent;
      if (event.timestamp > since) {
        metrics.totalEvents++;
        metrics.byType[event.type] = (metrics.byType[event.type] || 0) + 1;
        metrics.byIp[event.ip] = (metrics.byIp[event.ip] || 0) + 1;
        metrics.topPaths[event.path] = (metrics.topPaths[event.path] || 0) + 1;
      }
    }

    return metrics;
  } catch {
    // Fallback to in-memory
    const events = recentEvents.filter(e => e.timestamp > since);

    const metrics: SecurityMetrics = {
      totalEvents: events.length,
      byType: {},
      byIp: {},
      topPaths: {},
    };

    for (const event of events) {
      metrics.byType[event.type] = (metrics.byType[event.type] || 0) + 1;
      metrics.byIp[event.ip] = (metrics.byIp[event.ip] || 0) + 1;
      metrics.topPaths[event.path] = (metrics.topPaths[event.path] || 0) + 1;
    }

    return metrics;
  }
}

/**
 * Check if IP is blocked due to suspicious activity
 */
export async function isIpBlocked(ip: string): Promise<boolean> {
  try {
    const blocked = await redis.get(`security:block:${ip}`);
    return blocked === 'true';
  } catch {
    return false; // Fail open — never block on Redis errors
  }
}

/**
 * Check if IP should trigger an alert due to high event volume
 */
async function checkForAlerts(ip: string, type: string): Promise<void> {
  try {
    const key = `security:events:${ip}`;
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;

    // Count events in last 5 minutes
    const count = await redis.zcount(key, fiveMinutesAgo, Date.now());

    // If more than 10 events in 5 minutes, block the IP
    if (count > 10) {
      await redis.set(`security:block:${ip}`, 'true', { ex: 60 * 60 }); // Block for 1 hour
      console.warn(`[SECURITY] IP ${ip} blocked due to ${count} events in 5 minutes`);
    }
  } catch (err) {
    console.error('[SECURITY] Failed to check alerts:', err);
  }
}

/**
 * Get active security alerts
 */
export async function getActiveAlerts(limit: number = 50): Promise<Array<{ type: string; ip: string; count: number; timestamp: number }>> {
  try {
    const members = await redis.lrange('security:recent', 0, limit - 1);
    return members.map((member: string) => {
      const event = JSON.parse(member) as SecurityEvent;
      return {
        type: event.type,
        ip: event.ip,
        count: 1,
        timestamp: event.timestamp,
      };
    });
  } catch {
    return [];
  }
}

/**
 * Middleware to check if request should be blocked
 * Use in API routes to check blocked IPs
 */
export async function securityCheck(ip: string, _path: string): Promise<{ blocked: boolean; reason?: string }> {
  // Check if IP is blocked (currently always false)
  if (await isIpBlocked(ip)) {
    return { blocked: true, reason: 'IP temporarily blocked due to suspicious activity' };
  }

  return { blocked: false };
}
