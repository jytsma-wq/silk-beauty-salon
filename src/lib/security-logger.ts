/**
 * In-process security event logging.
 *
 * Events are retained in memory for lightweight operational visibility. This
 * keeps public pages available even when no external logging service is
 * configured.
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

const recentEvents: SecurityEvent[] = [];
const blockedIps = new Map<string, number>();
const MAX_MEMORY_EVENTS = 1000;
const BLOCK_DURATION_MS = 60 * 60 * 1000;
const ALERT_WINDOW_MS = 5 * 60 * 1000;
const ALERT_THRESHOLD = 10;

function prune(now: number): void {
  while (recentEvents.length > 0 && recentEvents.length > MAX_MEMORY_EVENTS) {
    recentEvents.shift();
  }

  for (const [ip, expiresAt] of blockedIps.entries()) {
    if (expiresAt <= now) {
      blockedIps.delete(ip);
    }
  }
}

/**
 * Log security event for analysis.
 */
export async function logSecurityEvent(event: Omit<SecurityEvent, 'timestamp'>): Promise<void> {
  const fullEvent: SecurityEvent = {
    ...event,
    timestamp: Date.now(),
  };

  console.warn('[SECURITY]', event.type, event.ip, event.path, event.details);

  recentEvents.push(fullEvent);
  prune(fullEvent.timestamp);
  checkForAlerts(event.ip, event.type, fullEvent.timestamp);
}

/**
 * Get security metrics from the in-memory event buffer.
 */
export async function getSecurityMetrics(timeWindowHours: number = 24): Promise<SecurityMetrics> {
  const since = Date.now() - timeWindowHours * 60 * 60 * 1000;
  const events = recentEvents.filter((event) => event.timestamp > since);

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
 * Check if IP is temporarily blocked due to suspicious activity.
 */
export async function isIpBlocked(ip: string): Promise<boolean> {
  const now = Date.now();
  prune(now);
  return (blockedIps.get(ip) || 0) > now;
}

function checkForAlerts(ip: string, _type: string, now: number): void {
  const since = now - ALERT_WINDOW_MS;
  const count = recentEvents.filter((event) => event.ip === ip && event.timestamp >= since).length;

  if (count > ALERT_THRESHOLD) {
    blockedIps.set(ip, now + BLOCK_DURATION_MS);
    console.warn(`[SECURITY] IP ${ip} blocked due to ${count} events in 5 minutes`);
  }
}

/**
 * Get active security alerts.
 */
export async function getActiveAlerts(limit: number = 50): Promise<Array<{ type: string; ip: string; count: number; timestamp: number }>> {
  return recentEvents.slice(-limit).reverse().map((event) => ({
    type: event.type,
    ip: event.ip,
    count: 1,
    timestamp: event.timestamp,
  }));
}

/**
 * Middleware helper for API routes.
 */
export async function securityCheck(ip: string, _path: string): Promise<{ blocked: boolean; reason?: string }> {
  if (await isIpBlocked(ip)) {
    return { blocked: true, reason: 'IP temporarily blocked due to suspicious activity' };
  }

  return { blocked: false };
}
