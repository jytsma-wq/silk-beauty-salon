import { describe, expect, it } from 'vitest';
import {
  apiRateLimit,
  bookRateLimit,
  bookingsApiRateLimit,
  contactRateLimit,
  csrfRateLimit,
  newsletterRateLimit,
  rateLimit,
  strictRateLimit,
} from '../rate-limit';

function uniqueIdentifier(name: string): string {
  return `test-${name}-${Date.now()}-${Math.random()}`;
}

describe('in-process rate limiters', () => {
  it('allows contact requests until the configured limit and blocks the next one', () => {
    const ip = uniqueIdentifier('contact');
    const results = Array.from({ length: 6 }, () => contactRateLimit(ip));

    expect(results[0]).toMatchObject({ allowed: true, limit: 5, remaining: 4 });
    expect(results[4]).toMatchObject({ allowed: true, limit: 5, remaining: 0 });
    expect(results[5]).toMatchObject({ allowed: false, limit: 5, remaining: 0 });
    expect(results[5].resetTime).toBeGreaterThan(Date.now());
  });

  it('uses the same strict limit for booking form submissions', () => {
    const ip = uniqueIdentifier('book');
    const results = Array.from({ length: 6 }, () => bookRateLimit(ip));

    expect(results[4]).toMatchObject({ allowed: true, limit: 5, remaining: 0 });
    expect(results[5]).toMatchObject({ allowed: false, limit: 5, remaining: 0 });
  });

  it('limits newsletter signups to three requests', () => {
    const ip = uniqueIdentifier('newsletter');
    const results = Array.from({ length: 4 }, () => newsletterRateLimit(ip));

    expect(results[2]).toMatchObject({ allowed: true, limit: 3, remaining: 0 });
    expect(results[3]).toMatchObject({ allowed: false, limit: 3, remaining: 0 });
  });

  it('limits CSRF token requests to twenty per minute', () => {
    const ip = uniqueIdentifier('csrf');
    const results = Array.from({ length: 21 }, () => csrfRateLimit(ip));

    expect(results[19]).toMatchObject({ allowed: true, limit: 20, remaining: 0 });
    expect(results[20]).toMatchObject({ allowed: false, limit: 20, remaining: 0 });
  });

  it('limits general API requests to thirty per minute', () => {
    const ip = uniqueIdentifier('api');
    const results = Array.from({ length: 31 }, () => apiRateLimit(ip));

    expect(results[29]).toMatchObject({ allowed: true, limit: 30, remaining: 0 });
    expect(results[30]).toMatchObject({ allowed: false, limit: 30, remaining: 0 });
  });

  it('limits booking API requests to ten per minute', () => {
    const ip = uniqueIdentifier('bookings-api');
    const results = Array.from({ length: 11 }, () => bookingsApiRateLimit(ip));

    expect(results[9]).toMatchObject({ allowed: true, limit: 10, remaining: 0 });
    expect(results[10]).toMatchObject({ allowed: false, limit: 10, remaining: 0 });
  });

  it('keeps the strict limiter isolated from other limiters', () => {
    const ip = uniqueIdentifier('strict');

    expect(strictRateLimit(ip)).toMatchObject({ allowed: true, limit: 5, remaining: 4 });
    expect(apiRateLimit(ip)).toMatchObject({ allowed: true, limit: 30, remaining: 29 });
  });

  it('supports the generic compatibility wrapper', async () => {
    const identifier = uniqueIdentifier('generic');
    const config = {
      windowMs: 60 * 1000,
      maxRequests: 2,
      keyPrefix: 'test-generic',
    };

    await expect(rateLimit(identifier, config)).resolves.toMatchObject({
      allowed: true,
      limit: 2,
      remaining: 1,
    });
    await expect(rateLimit(identifier, config)).resolves.toMatchObject({
      allowed: true,
      limit: 2,
      remaining: 0,
    });
    await expect(rateLimit(identifier, config)).resolves.toMatchObject({
      allowed: false,
      limit: 2,
      remaining: 0,
    });
  });
});
