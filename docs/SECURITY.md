# Security Documentation

This document outlines the security measures implemented in the Silk Beauty Salon application.

## Overview

The application implements defense in depth with multiple layers of security controls:

1. **Content Security Policy (CSP)** - Nonce-based CSP via middleware
2. **Rate Limiting** - Redis-backed rate limiting with in-memory fallback
3. **CSRF Protection** - Double-submit cookie pattern
4. **Input Sanitization** - XSS and injection attack prevention
5. **Security Monitoring** - Event logging and alerting

## Security Headers

The following security headers are set via `middleware.ts`:

| Header | Value | Purpose |
|--------|-------|---------|
| `Content-Security-Policy` | Nonce-based | Prevents XSS and data injection |
| `X-DNS-Prefetch-Control` | `on` | Improves performance |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Enforces HTTPS |
| `X-Frame-Options` | `DENY` | Prevents clickjacking |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limits referrer info |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Restricts browser features |

## Content Security Policy

CSP is configured dynamically via middleware with a unique nonce for each request:

```
default-src 'self';
script-src 'self' 'nonce-{random}' 'strict-dynamic' https://www.google-analytics.com https://www.googletagmanager.com;
style-src 'self' 'unsafe-inline';
img-src 'self' data: https: blob:;
font-src 'self';
connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com;
frame-src 'self';
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
upgrade-insecure-requests;
```

**Nonce Usage**: The nonce is generated per-request and passed to the client via `X-Nonce` header. Client-side scripts must use this nonce to be executed.

## Rate Limiting

### Configuration

- **API Rate Limit**: 30 requests per minute per IP
- **Strict Rate Limit** (forms): 5 requests per 15 minutes per IP
- **Storage**: Redis (with in-memory fallback)

### Implementation

```typescript
import { rateLimit, strictRateLimit, apiRateLimit } from '@/lib/rate-limit';

// Generic rate limiting
const result = await rateLimit(ip, {
  windowMs: 60 * 1000,      // 1 minute
  maxRequests: 30,         // 30 requests
});

// Pre-configured rate limits
const apiResult = await apiRateLimit(ip);     // 30/min
const strictResult = await strictRateLimit(ip); // 5/15min
```

### Response

When rate limited, API returns:
```json
{
  "error": "Rate limit exceeded",
  "retryAfter": 45
}
```

## CSRF Protection

### Pattern

Double-submit cookie pattern with:
- `csrf-token` cookie (HttpOnly, Secure, SameSite=Strict)
- `X-CSRF-Token` header or `_csrf` form field

### Usage

**Server-side (API routes):**
```typescript
import { csrfMiddleware } from '@/lib/csrf';

export async function POST(request: NextRequest) {
  return csrfMiddleware(request, async () => {
    // Handle request
    return NextResponse.json({ success: true });
  });
}
```

**Client-side:**
```typescript
const token = document.querySelector('meta[name="csrf-token"]')?.content;

fetch('/api/submit', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': token,
  },
  body: formData,
});
```

## Input Sanitization

### XSS Prevention

All user input is sanitized using DOMPurify:

```typescript
import { 
  sanitizeHtml,     // Strips all HTML
  sanitizeRichText, // Allows basic formatting
  sanitizeText,     // Plain text only
  sanitizeEmail,    // Email validation
  sanitizePhone,    // Phone sanitization
} from '@/lib/sanitize';
```

### Injection Prevention

SQL and NoSQL injection patterns are detected and blocked:

```typescript
import { containsSqlInjection, containsNoSqlInjection } from '@/lib/sanitize';

if (containsSqlInjection(input) || containsNoSqlInjection(input)) {
  // Block request
  return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
}
```

### Validation API

```typescript
import { validateInput } from '@/lib/sanitize';

const email = validateInput(userInput, 'email');  // Returns string | null
const name = validateInput(userInput, 'name');    // Validates name format
const text = validateInput(userInput, 'text');    // Plain text sanitization
```

## Security Monitoring

### Event Logging

Security events are logged to Redis (when available):

```typescript
import { logSecurityEvent } from '@/lib/security-logger';

await logSecurityEvent({
  type: 'rate_limit',
  ip: request.ip,
  path: request.url,
  userAgent: request.headers.get('user-agent'),
});
```

### Event Types

- `rate_limit` - Rate limit exceeded
- `csrf_fail` - CSRF validation failed
- `auth_fail` - Authentication failed
- `xss_attempt` - XSS pattern detected
- `sql_injection` - SQL injection attempt
- `nosql_injection` - NoSQL injection attempt

### Auto-Blocking

IPs with >10 events in 5 minutes are automatically blocked for 1 hour.

### Metrics

```typescript
import { getSecurityMetrics, getActiveAlerts } from '@/lib/security-logger';

const metrics = await getSecurityMetrics(24); // Last 24 hours
const alerts = await getActiveAlerts(50);     // Top 50 alerts
```

## Security Audit

Run the security audit script to check configuration:

```bash
npm run security:audit
```

This checks:
- Environment variables
- Security headers in next.config.ts
- Required dependencies
- File existence (rate-limit.ts, csrf.ts, sanitize.ts)

## Deployment Checklist

### Production Requirements

- [ ] `NODE_ENV=production`
- [ ] `REDIS_URL` configured (Upstash recommended)
- [ ] `API_SECRET_KEY` set to random string
- [ ] `RESEND_API_KEY` and `RESEND_AUDIENCE_ID` set
- [ ] All security modules in place

### Security Headers Verification

```bash
# Check headers
curl -I https://yourdomain.com

# Verify CSP nonce
curl -I https://yourdomain.com | grep -i content-security-policy
```

### Rate Limiting Test

```bash
# Test API rate limit (should fail after 30 requests)
for i in {1..35}; do curl -s https://yourdomain.com/api/contact; done
```

## Incident Response

1. **Check logs**: Review Vercel logs or `security:events` in Redis
2. **Block IP**: Add IP to manual block list if needed
3. **Review alerts**: Check `getActiveAlerts()` for patterns
4. **Update rules**: Add new patterns to SQL/NoSQL detection

## References

- [OWASP CSP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
- [OWASP Rate Limiting](https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service_Cheat_Sheet.html)
- [OWASP CSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)
