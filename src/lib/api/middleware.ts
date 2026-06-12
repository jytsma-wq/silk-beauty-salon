/**
 * API Middleware
 * Validation, rate limiting, CORS, and response formatting
 */

import { type NextRequest, NextResponse } from 'next/server';
import { type ZodSchema, type ZodError } from 'zod';
import {
  createErrorResponse,
  createJsonResponse,
  ApiErrorCodes,
  ErrorStatusCodes,
  getRequestId,
  type ApiError,
} from './types';

// ==========================================
// Request Validation Middleware
// ==========================================

interface ValidationOptions {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

interface ValidationResult {
  body?: unknown;
  query?: Record<string, string>;
  params?: Record<string, string>;
  errors?: ApiError[];
}

/**
 * Validate request against Zod schemas
 */
export async function validateRequest(
  request: NextRequest,
  options: ValidationOptions
): Promise<ValidationResult> {
  const errors: ApiError[] = [];
  const result: ValidationResult = {};

  // Validate body
  if (options.body) {
    try {
      const body = await request.json();
      result.body = options.body.parse(body);
    } catch (error) {
      const zodError = error as ZodError;
      errors.push({
        code: ApiErrorCodes.VALIDATION_ERROR,
        message: 'Invalid request body',
        details: { errors: zodError.issues },
      });
    }
  }

  // Validate query parameters
  if (options.query) {
    try {
      const query: Record<string, string> = {};
      const searchParams = new URL(request.url).searchParams;
      searchParams.forEach((value, key) => {
        query[key] = value;
      });
      result.query = options.query.parse(query) as Record<string, string>;
    } catch (error) {
      const zodError = error as ZodError;
      errors.push({
        code: ApiErrorCodes.VALIDATION_ERROR,
        message: 'Invalid query parameters',
        details: { errors: zodError.issues },
      });
    }
  }

  // Validate path parameters (if any extracted)
  if (options.params) {
    try {
      // Path params are typically extracted before middleware
      const params = extractPathParams(request);
      result.params = options.params.parse(params) as Record<string, string>;
    } catch (error) {
      const zodError = error as ZodError;
      errors.push({
        code: ApiErrorCodes.VALIDATION_ERROR,
        message: 'Invalid path parameters',
        details: { errors: zodError.issues },
      });
    }
  }

  if (errors.length > 0) {
    return { errors };
  }

  return result;
}

/**
 * Extract path parameters from request URL
 * Note: In Next.js App Router, params are passed directly to route handlers
 */
function extractPathParams(request: NextRequest): Record<string, string> {
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/');
  const params: Record<string, string> = {};

  // Simple extraction - assumes [param] syntax
  pathParts.forEach((part, index) => {
    if (part.startsWith('[') && part.endsWith(']')) {
      const paramName = part.slice(1, -1);
      params[paramName] = pathParts[index] ?? '';
    }
  });

  return params;
}

// ==========================================
// Rate Limiting Middleware
// ==========================================

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  keyPrefix?: string;
}

interface RateLimitInfo {
  limit: number;
  remaining: number;
  resetAt: Date;
  retryAfter?: number;
}

// In-memory store for route-level API throttling.
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

/**
 * Rate limiting middleware
 */
export function rateLimit(
  request: NextRequest,
  config: RateLimitConfig
): { allowed: boolean; info: RateLimitInfo } {
  const key = getRateLimitKey(request, config.keyPrefix);
  const now = Date.now();
  const windowStart = now - config.windowMs;

  // Clean old entries periodically (simple cleanup)
  if (Math.random() < 0.01) {
    cleanupOldEntries(windowStart);
  }

  // Get or create rate limit entry
  let entry = rateLimitStore.get(key);
  if (!entry || entry.resetAt < now) {
    entry = { count: 0, resetAt: now + config.windowMs };
    rateLimitStore.set(key, entry);
  }

  // Increment count
  entry.count++;

  const remaining = Math.max(0, config.maxRequests - entry.count);
  const allowed = entry.count <= config.maxRequests;

  const info: RateLimitInfo = {
    limit: config.maxRequests,
    remaining,
    resetAt: new Date(entry.resetAt),
    retryAfter: allowed ? undefined : Math.ceil((entry.resetAt - now) / 1000),
  };

  return { allowed, info };
}

/**
 * Get rate limit key from request
 */
function getRateLimitKey(request: NextRequest, prefix?: string): string {
  // Use IP address or API key as identifier
  const identifier =
    request.headers.get('x-api-key') ??
    request.headers.get('x-forwarded-for') ??
    request.headers.get('x-real-ip') ??
    'anonymous';
  return `${prefix ?? 'api'}:${identifier}`;
}

/**
 * Clean up old rate limit entries
 */
function cleanupOldEntries(before: number): void {
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < before) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Create rate limit headers
 */
export function createRateLimitHeaders(info: RateLimitInfo): Record<string, string> {
  return {
    'X-RateLimit-Limit': info.limit.toString(),
    'X-RateLimit-Remaining': info.remaining.toString(),
    'X-RateLimit-Reset': Math.floor(info.resetAt.getTime() / 1000).toString(),
    ...(info.retryAfter && { 'Retry-After': info.retryAfter.toString() }),
  };
}

// ==========================================
// CORS Middleware
// ==========================================

interface CorsOptions {
  origin?: string | string[] | ((origin: string) => boolean);
  methods?: string[];
  allowedHeaders?: string[];
  exposedHeaders?: string[];
  credentials?: boolean;
  maxAge?: number;
}

const defaultCorsOptions: CorsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') ?? '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-API-Key',
    'X-Request-ID',
  ],
  exposedHeaders: ['X-Request-ID', 'X-RateLimit-Limit', 'X-RateLimit-Remaining'],
  credentials: false,
  maxAge: 86400, // 24 hours
};

/**
 * Check if origin is allowed
 */
function isOriginAllowed(origin: string, options: CorsOptions): boolean {
  if (!options.origin || options.origin === '*') {
    return true;
  }

  if (typeof options.origin === 'string') {
    return origin === options.origin;
  }

  if (Array.isArray(options.origin)) {
    return options.origin.includes(origin);
  }

  if (typeof options.origin === 'function') {
    return options.origin(origin);
  }

  return false;
}

/**
 * Handle CORS preflight and add headers
 */
export function handleCors(
  request: NextRequest,
  options: CorsOptions = defaultCorsOptions
): NextResponse | null {
  const origin = request.headers.get('origin') ?? '';
  const isAllowed = isOriginAllowed(origin, options);

  // Handle preflight request
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 });

    if (isAllowed) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set(
        'Access-Control-Allow-Methods',
        options.methods?.join(', ') ?? defaultCorsOptions.methods!.join(', ')
      );
      response.headers.set(
        'Access-Control-Allow-Headers',
        options.allowedHeaders?.join(', ') ??
          defaultCorsOptions.allowedHeaders!.join(', ')
      );
      response.headers.set(
        'Access-Control-Max-Age',
        (options.maxAge ?? defaultCorsOptions.maxAge ?? 86400).toString()
      );

      if (options.credentials) {
        response.headers.set('Access-Control-Allow-Credentials', 'true');
      }
    }

    return response;
  }

  // For actual requests, return null and add headers to main response
  return null;
}

/**
 * Add CORS headers to response
 */
export function addCorsHeaders(
  response: NextResponse,
  request: NextRequest,
  options: CorsOptions = defaultCorsOptions
): NextResponse {
  const origin = request.headers.get('origin') ?? '';

  if (isOriginAllowed(origin, options)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Vary', 'Origin');

    if (options.credentials) {
      response.headers.set('Access-Control-Allow-Credentials', 'true');
    }

    if (options.exposedHeaders) {
      response.headers.set('Access-Control-Expose-Headers', options.exposedHeaders.join(', '));
    }
  }

  return response;
}

// ==========================================
// API Key Authentication Middleware
// ==========================================

interface ApiKeyConfig {
  keys: string[];
  headerName?: string;
}

/**
 * Validate API key
 */
export function validateApiKey(
  request: NextRequest,
  config: ApiKeyConfig
): { valid: boolean; key?: string } {
  const headerName = config.headerName ?? 'x-api-key';
  const apiKey = request.headers.get(headerName);

  if (!apiKey) {
    return { valid: false };
  }

  const valid = config.keys.includes(apiKey);
  return { valid, key: apiKey };
}

// ==========================================
// Error Handling Middleware
// ==========================================

/**
 * Handle API errors with standard response format
 */
export function handleApiError(
  error: Error,
  request: NextRequest,
  statusCode: number = 500
): Response {
  const requestId = getRequestId(request);

  // Log error (in production, use proper logging service)
  console.error('API Error:', {
    error: error.message,
    stack: error.stack,
    requestId,
    url: request.url,
  });

  // Determine error code from status code
  let code: string = ApiErrorCodes.INTERNAL_ERROR;
  for (const [key, value] of Object.entries(ErrorStatusCodes)) {
    if (value === statusCode) {
      code = key;
      break;
    }
  }

  const response = createErrorResponse(
    code,
    process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred'
      : error.message,
    process.env.NODE_ENV === 'production' ? undefined : { stack: error.stack ?? 'No stack trace' },
    { requestId }
  );

  return createJsonResponse(response, statusCode);
}

// ==========================================
// Request Logging Middleware
// ==========================================

/**
 * Log API request/response
 */
export function logApiRequest(
  request: NextRequest,
  response: Response,
  duration: number
): void {
  const requestId = response.headers.get('x-request-id') ?? 'unknown';

  console.warn(JSON.stringify({
    level: 'info',
    timestamp: new Date().toISOString(),
    requestId,
    method: request.method,
    url: request.url,
    status: response.status,
    duration,
    userAgent: request.headers.get('user-agent'),
  }));
}
