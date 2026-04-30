# Error Handling & Monitoring Guide

This document outlines the comprehensive error handling, logging, and monitoring system implemented in Silk Beauty Salon.

## Table of Contents

- [Overview](#overview)
- [Error Boundaries](#error-boundaries)
- [API Error Handling](#api-error-handling)
- [Logging](#logging)
- [Error Tracking](#error-tracking)
- [Health Checks](#health-checks)
- [Monitoring & Alerting](#monitoring--alerting)
- [Graceful Degradation](#graceful-degradation)

## Overview

The application implements a multi-layered error handling strategy:

1. **Frontend Protection**: React Error Boundaries catch UI errors
2. **API Standardization**: Consistent error responses across all endpoints
3. **Structured Logging**: PII-redacted logs with multiple log levels
4. **Error Tracking**: Sentry integration for production monitoring
5. **Health Monitoring**: Comprehensive health check endpoints

## Error Boundaries

### Global Error Boundary

Located at `src/components/error-boundary.tsx`, the global error boundary catches JavaScript errors anywhere in the component tree.

```tsx
import { ErrorBoundary } from '@/components/error-boundary';

export default function RootLayout({ children }) {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
}
```

### Features

- User-friendly error messages in all 6 languages
- Error reference IDs for support tickets
- Retry and navigation options
- Integration with Sentry for error tracking

### Usage with Custom Fallback

```tsx
<ErrorBoundary fallback={<CustomErrorUI />}>
  <MyComponent />
</ErrorBoundary>
```

## API Error Handling

### Standardized Error Format

All API errors follow a consistent structure:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Some fields contain errors. Please correct them.",
    "details": {
      "email": ["Invalid email format"]
    },
    "requestId": "req_abc123",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `BAD_REQUEST` | 400 | Invalid request format |
| `VALIDATION_ERROR` | 400 | Field validation failed |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Permission denied |
| `NOT_FOUND` | 404 | Resource not found |
| `INTERNAL_ERROR` | 500 | Server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily down |
| `RATE_LIMITED` | 429 | Too many requests |

### Using the Error Handler

```ts
import { ApiError, withErrorHandler } from '@/lib/api-error-handler';

// Throw API errors
throw new ApiError('VALIDATION_ERROR', 'Invalid input', {
  email: ['Invalid email format']
});

// Wrap route handlers
export const GET = withErrorHandler(async (request) => {
  // Your handler code
});
```

### Retry Logic

```ts
import { withRetry } from '@/lib/api-error-handler';

const result = await withRetry(
  () => fetchData(),
  { maxRetries: 3, baseDelay: 1000 }
);
```

### Circuit Breaker

```ts
import { CircuitBreaker } from '@/lib/api-error-handler';

const breaker = new CircuitBreaker(5, 60000);

const result = await breaker.execute(() => externalApiCall());
```

## Logging

### Logger Types

- **logger**: General application logging
- **securityLogger**: Security events (auth failures, suspicious activity)
- **performanceLogger**: Performance metrics and slow queries
- **requestLogger**: HTTP request/response logging

### Usage

```ts
import { logger, securityLogger, performanceLogger } from '@/lib/logger';

// Basic logging
logger.info('User logged in', { userId: '123' });
logger.error('Database connection failed', error);

// Security events
securityLogger.logSecurityEvent('SUSPICIOUS_LOGIN_ATTEMPT', {
  ip: '192.168.1.1',
  userAgent: '...',
  severity: 'high'
});

// Performance metrics
performanceLogger.logMetric('query_time', 150, 'ms');
performanceLogger.logSlowQuery('SELECT * FROM users', 2000);
```

### PII Redaction

The logger automatically redacts:
- Email addresses
- Credit card numbers
- Social Security numbers
- Phone numbers
- Passwords and tokens
- API keys

### Log Levels

- `debug`: Detailed debugging information
- `info`: General informational messages
- `warn`: Warning conditions
- `error`: Error conditions

## Error Tracking

### Sentry Integration

Sentry is configured at `src/lib/sentry.ts`. To enable:

1. Install Sentry:
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

2. Set environment variables:
```env
NEXT_PUBLIC_SENTRY_DSN=your_dsn_here
NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE=0.1
```

### Manual Error Capture

```ts
import { captureException, setUser, addBreadcrumb } from '@/lib/sentry';

// Set user context
setUser({ id: '123', email: 'user@example.com' });

// Add breadcrumb
addBreadcrumb({
  message: 'User started checkout',
  category: 'checkout',
  level: 'info'
});

// Capture exception
try {
  riskyOperation();
} catch (error) {
  captureException(error, {
    tags: { component: 'checkout' },
    extra: { cartValue: 100 }
  });
}
```

## Health Checks

### Database Health Endpoint

`GET /api/health/db`

Returns comprehensive database health status:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "checks": {
    "database": {
      "status": "healthy",
      "responseTime": 50,
      "details": {
        "connectionPoolSize": 100,
        "activeConnections": 5,
        "idleConnections": 10
      }
    },
    "tables": {
      "status": "healthy",
      "counts": {
        "bookings": 150,
        "contactSubmissions": 45
      }
    },
    "performance": {
      "status": "healthy",
      "avgQueryTime": 25,
      "slowQueries": 0
    }
  }
}
```

### Load Balancer Health Check

`HEAD /api/health/db`

Returns 200 for healthy, 503 for unhealthy with minimal overhead.

## Monitoring & Alerting

### Recommended Tools

1. **Sentry**: Real-time error tracking and alerting
2. **UptimeRobot/Uptime.com**: External uptime monitoring
3. **Vercel Analytics**: Performance monitoring
4. **Status Page**: Public status page for incidents

### Alert Configuration

Set up alerts in Sentry for:
- Error rate spikes (>10% increase)
- New error types
- Performance degradation (p95 latency >500ms)
- Critical errors (500 status codes)

### Slack Integration

Configure Sentry to send critical errors to Slack:

1. Create incoming webhook in Slack
2. Add webhook URL to Sentry integration settings
3. Configure alert rules for critical issues

## Graceful Degradation

### Fallback Strategies

```tsx
import { withRetry } from '@/lib/api-error-handler';

function TreatmentList() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    withRetry(() => fetchTreatments(), { maxRetries: 2 })
      .then(setData)
      .catch((err) => {
        // Show cached data or placeholder
        setData(cachedTreatments);
        setError(err);
      });
  }, []);

  if (error && data.length === 0) {
    return <ErrorState retry={() => setError(null)} />;
  }

  return <TreatmentGrid data={data} />;
}
```

### Offline Support

The service worker in `public/service-worker.js` provides:
- Cache fallback for static assets
- Offline page display
- Background sync for form submissions

### Error Recovery UI

Use the error boundary's retry mechanism:

```tsx
<ErrorBoundary onError={(error, info) => {
  // Log to analytics
  analytics.track('error_boundary_triggered', {
    error: error.message,
    componentStack: info.componentStack
  });
}}>
  <FeatureComponent />
</ErrorBoundary>
```

## Best Practices

1. **Always use typed errors**: Use `ApiError` for API routes
2. **Include request IDs**: Every error response includes a request ID
3. **Log context**: Include relevant context with log messages
4. **Handle async errors**: Use `withErrorHandler` for route handlers
5. **Retry wisely**: Use exponential backoff with `withRetry`
6. **Circuit breaker**: Protect external API calls with circuit breaker
7. **Never leak sensitive data**: Logs automatically redact PII
8. **Translate errors**: User-facing errors must be translated

## Troubleshooting

### Common Issues

**Sentry not capturing errors**
- Check `NEXT_PUBLIC_SENTRY_DSN` is set
- Verify Sentry initialization in browser console
- Check Sentry ignore rules aren't filtering errors

**Health check failing**
- Check database connection string
- Verify PostgreSQL is running
- Check connection pool settings

**Logs not appearing**
- Check `NODE_ENV` - logs may be filtered by level
- Verify PII redaction isn't removing relevant data
- Check log output destination (console vs file)

## Environment Variables

```env
# Sentry
NEXT_PUBLIC_SENTRY_DSN=
NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE=0.1
NEXT_PUBLIC_SENTRY_REPLAYS_SESSION_SAMPLE_RATE=0
NEXT_PUBLIC_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE=0.1

# Logging (production)
LOG_LEVEL=info
LOG_FORMAT=json

# Health checks
HEALTH_CHECK_TIMEOUT=5000
```

## Additional Resources

- [Sentry Documentation](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Next.js Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
