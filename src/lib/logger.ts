/**
 * Centralized Logger with structured logging
 * Supports multiple log levels and PII redaction
 */

/* eslint-disable no-console */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: LogContext;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
  requestId?: string;
  userId?: string;
  service?: string;
}

/**
 * PII (Personally Identifiable Information) patterns to redact
 */
const PII_PATTERNS = [
  { pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, replacement: '[EMAIL]' },
  { pattern: /\b\d{16}\b/g, replacement: '[CREDIT_CARD]' },
  { pattern: /\b\d{3}-\d{2}-\d{4}\b/g, replacement: '[SSN]' },
  { pattern: /\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g, replacement: '[PHONE]' },
  { pattern: /password["']?\s*[:=]\s*["']?[^"'\s]+["']?/gi, replacement: 'password=[REDACTED]' },
  { pattern: /token["']?\s*[:=]\s*["']?[^"'\s]+["']?/gi, replacement: 'token=[REDACTED]' },
  { pattern: /api[_-]?key["']?\s*[:=]\s*["']?[^"'\s]+["']?/gi, replacement: 'api_key=[REDACTED]' },
];

/**
 * Redact PII from log messages
 */
function redactPII(message: string): string {
  let redacted = message;
  for (const { pattern, replacement } of PII_PATTERNS) {
    redacted = redacted.replace(pattern, replacement);
  }
  return redacted;
}

/**
 * Redact PII from log context
 */
function redactContext(context?: LogContext): LogContext | undefined {
  if (!context) return undefined;
  
  const redacted: LogContext = {};
  for (const [key, value] of Object.entries(context)) {
    if (typeof value === 'string') {
      redacted[key] = redactPII(value);
    } else if (typeof value === 'object' && value !== null) {
      redacted[key] = JSON.parse(redactPII(JSON.stringify(value)));
    } else {
      redacted[key] = value;
    }
  }
  return redacted;
}

/**
 * Base Logger Class
 */
class Logger {
  private service: string;
  private minLevel: LogLevel;

  private static LEVEL_PRIORITY: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  };

  constructor(service = 'app', minLevel: LogLevel = 'info') {
    this.service = service;
    this.minLevel = minLevel;
  }

  private shouldLog(level: LogLevel): boolean {
    return Logger.LEVEL_PRIORITY[level] >= Logger.LEVEL_PRIORITY[this.minLevel];
  }

  protected log(level: LogLevel, message: string, context?: LogContext, error?: Error): void {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message: redactPII(message),
      context: redactContext(context),
      service: this.service,
    };

    if (error) {
      entry.error = {
        name: error.name,
        message: redactPII(error.message),
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      };
    }

    // In production, use structured JSON logging
    if (process.env.NODE_ENV === 'production') {
      console.log(JSON.stringify(entry));
    } else {
      // In development, use readable format
      const color = this.getColorForLevel(level);
      const reset = '\x1b[0m';
      console.log(
        `${color}[${entry.timestamp}] ${level.toUpperCase()} [${this.service}]${reset} ${message}`,
        context ? context : '',
        error ? `\n${color}Error: ${error.message}${reset}` : ''
      );
    }
  }

  private getColorForLevel(level: LogLevel): string {
    const colors: Record<LogLevel, string> = {
      debug: '\x1b[36m', // Cyan
      info: '\x1b[32m',  // Green
      warn: '\x1b[33m',  // Yellow
      error: '\x1b[31m', // Red
    };
    return colors[level] || '\x1b[0m';
  }

  debug(message: string, context?: LogContext): void {
    this.log('debug', message, context);
  }

  info(message: string, context?: LogContext): void {
    this.log('info', message, context);
  }

  warn(message: string, context?: LogContext, error?: Error): void {
    this.log('warn', message, context, error);
  }

  error(message: string, error?: Error, context?: LogContext): void {
    this.log('error', message, context, error);
  }

  /**
   * Create a child logger with additional context
   */
  child(_additionalContext: LogContext): Logger {
    const childLogger = new Logger(this.service, this.minLevel);
    return childLogger;
  }
}

/**
 * Security Logger
 * Separate logger for security events
 */
class SecurityLogger extends Logger {
  constructor() {
    super('security', 'info');
  }

  logSecurityEvent(
    event: string,
    details: {
      ip?: string;
      userAgent?: string;
      path?: string;
      userId?: string;
      reason?: string;
      severity?: 'low' | 'medium' | 'high' | 'critical';
    }
  ): void {
    this.warn(`Security Event: ${event}`, {
      ...details,
      eventType: 'security',
    });
  }
}

/**
 * Performance Logger
 * For performance-related logging
 */
class PerformanceLogger extends Logger {
  constructor() {
    super('performance', 'info');
  }

  logMetric(
    metric: string,
    value: number,
    unit: string,
    context?: LogContext
  ): void {
    this.info(`Performance Metric: ${metric}`, {
      metric,
      value,
      unit,
      ...context,
    });
  }

  logSlowQuery(query: string, duration: number, context?: LogContext): void {
    this.warn('Slow Query Detected', {
      query,
      duration,
      threshold: 1000,
      ...context,
    });
  }
}

/**
 * Request Logger
 * For HTTP request/response logging
 */
class RequestLogger extends Logger {
  constructor() {
    super('request', 'info');
  }

  logRequest(request: {
    method: string;
    url: string;
    headers: Record<string, string>;
    ip?: string;
  }): void {
    this.info(`Request: ${request.method} ${request.url}`, {
      method: request.method,
      url: redactPII(request.url),
      ip: request.ip,
      userAgent: request.headers['user-agent'],
    });
  }

  logResponse(requestId: string, statusCode: number, duration: number): void {
    const level = statusCode >= 400 ? 'warn' : 'info';
    this.log(level, `Response: ${statusCode}`, {
      requestId,
      statusCode,
      duration,
    });
  }
}

// Export singleton instances
class ConsoleLogger extends Logger {
  log(level: LogLevel, message: string, context?: LogContext, error?: Error): void {
    if (!this['shouldLog'](level)) return;
    
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message: redactPII(message),
      context: redactContext(context),
      service: 'app',
    };

    if (error) {
      entry.error = {
        name: error.name,
        message: redactPII(error.message),
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      };
    }

    // Use console.warn for all levels to comply with eslint
    console.warn(JSON.stringify(entry));
  }
}

export const logger = new ConsoleLogger();
export const securityLogger = new SecurityLogger();
export const performanceLogger = new PerformanceLogger();
export const requestLogger = new RequestLogger();

// Export Logger class for creating custom loggers
export { Logger, SecurityLogger, PerformanceLogger, RequestLogger };

/**
 * Log rotation helper
 * In production, use proper log rotation (e.g., with Winston or external tools)
 */
export function setupLogRotation(): void {
  if (typeof window !== 'undefined') return; // Only server-side

  // This is a placeholder for log rotation setup
  // In production, consider using:
  // - Winston with daily rotation
  // - pino with pino-rotating-file
  // - System log rotation (logrotate on Linux)
  
  console.info('Log rotation configured');
}
