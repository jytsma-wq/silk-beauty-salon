/**
 * Security Event Logging
 *
 * Note: Redis persistence for security events has been temporarily disabled
 * during migration from ioredis to Upstash. Events are logged to console only.
 * To re-enable Redis persistence, this module would need to use Upstash Redis
 * with different data structures (hashes/lists instead of sorted sets).
 */

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
 * Currently logs to console and in-memory store only.
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
}

/**
 * Get security metrics for dashboard
 * Returns metrics from in-memory store only.
 */
export async function getSecurityMetrics(timeWindowHours: number = 24): Promise<SecurityMetrics> {
  const since = Date.now() - timeWindowHours * 60 * 60 * 1000;

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

/**
 * Check if IP is blocked due to suspicious activity
 * Currently always returns false (no Redis persistence).
 */
export async function isIpBlocked(_ip: string): Promise<boolean> {
  // IP blocking temporarily disabled - would need Upstash Redis implementation
  return false;
}

/**
 * Get active security alerts
 * Currently returns empty (no Redis persistence).
 */
export async function getActiveAlerts(_limit: number = 50): Promise<Array<{ type: string; ip: string; count: number; timestamp: number }>> {
  // Alerts temporarily disabled - would need Upstash Redis implementation
  return [];
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
