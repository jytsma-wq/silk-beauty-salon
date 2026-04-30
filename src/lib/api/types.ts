/**
 * API Types and Response Wrappers
 * Standardized API response format for all endpoints
 */

import { type NextRequest } from 'next/server';

/**
 * API Version
 */
export const API_VERSION = 'v1';
export const API_BASE_PATH = `/api/${API_VERSION}`;

/**
 * API Error structure
 */
export interface ApiError {
  /** Error code for programmatic handling */
  code: string;
  /** Human-readable error message */
  message: string;
  /** Additional error details */
  details?: Record<string, unknown>;
}

/**
 * API Response metadata
 */
export interface ApiMeta {
  /** Unique request ID for tracing */
  requestId: string;
  /** ISO 8601 timestamp */
  timestamp: string;
  /** API version */
  version: string;
  /** Pagination info (for list endpoints) */
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  /** Rate limiting info */
  rateLimit?: {
    limit: number;
    remaining: number;
    resetAt: string;
  };
}

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T = unknown> {
  /** Request success status */
  success: boolean;
  /** Response data (if successful) */
  data?: T;
  /** Error information (if failed) */
  error?: ApiError;
  /** Response metadata */
  meta: ApiMeta;
}

/**
 * Generate a unique request ID
 */
export function generateRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Create successful API response
 */
export function createSuccessResponse<T>(
  data: T,
  meta?: Partial<ApiMeta>
): ApiResponse<T> {
  return {
    success: true,
    data,
    meta: {
      requestId: meta?.requestId ?? generateRequestId(),
      timestamp: new Date().toISOString(),
      version: API_VERSION,
      ...meta,
    },
  };
}

/**
 * Create error API response
 */
export function createErrorResponse(
  code: string,
  message: string,
  details?: Record<string, unknown>,
  meta?: Partial<ApiMeta>
): ApiResponse<never> {
  return {
    success: false,
    error: {
      code,
      message,
      details,
    },
    meta: {
      requestId: meta?.requestId ?? generateRequestId(),
      timestamp: new Date().toISOString(),
      version: API_VERSION,
      ...meta,
    },
  };
}

/**
 * API Error codes
 */
export const ApiErrorCodes = {
  // 400 - Bad Request
  BAD_REQUEST: 'BAD_REQUEST',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_JSON: 'INVALID_JSON',
  MISSING_FIELD: 'MISSING_FIELD',
  INVALID_FORMAT: 'INVALID_FORMAT',

  // 401 - Unauthorized
  UNAUTHORIZED: 'UNAUTHORIZED',
  INVALID_API_KEY: 'INVALID_API_KEY',
  MISSING_API_KEY: 'MISSING_API_KEY',

  // 403 - Forbidden
  FORBIDDEN: 'FORBIDDEN',
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',

  // 404 - Not Found
  NOT_FOUND: 'NOT_FOUND',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',

  // 409 - Conflict
  CONFLICT: 'CONFLICT',
  DUPLICATE_ENTRY: 'DUPLICATE_ENTRY',

  // 429 - Too Many Requests
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',

  // 500 - Internal Server Error
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',

  // 503 - Service Unavailable
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  MAINTENANCE_MODE: 'MAINTENANCE_MODE',
} as const;

export type ApiErrorCode = (typeof ApiErrorCodes)[keyof typeof ApiErrorCodes];

/**
 * HTTP Status codes mapping
 */
export const ErrorStatusCodes: Record<ApiErrorCode, number> = {
  [ApiErrorCodes.BAD_REQUEST]: 400,
  [ApiErrorCodes.VALIDATION_ERROR]: 400,
  [ApiErrorCodes.INVALID_JSON]: 400,
  [ApiErrorCodes.MISSING_FIELD]: 400,
  [ApiErrorCodes.INVALID_FORMAT]: 400,
  [ApiErrorCodes.UNAUTHORIZED]: 401,
  [ApiErrorCodes.INVALID_API_KEY]: 401,
  [ApiErrorCodes.MISSING_API_KEY]: 401,
  [ApiErrorCodes.FORBIDDEN]: 403,
  [ApiErrorCodes.INSUFFICIENT_PERMISSIONS]: 403,
  [ApiErrorCodes.NOT_FOUND]: 404,
  [ApiErrorCodes.RESOURCE_NOT_FOUND]: 404,
  [ApiErrorCodes.CONFLICT]: 409,
  [ApiErrorCodes.DUPLICATE_ENTRY]: 409,
  [ApiErrorCodes.RATE_LIMIT_EXCEEDED]: 429,
  [ApiErrorCodes.INTERNAL_ERROR]: 500,
  [ApiErrorCodes.DATABASE_ERROR]: 500,
  [ApiErrorCodes.EXTERNAL_SERVICE_ERROR]: 500,
  [ApiErrorCodes.SERVICE_UNAVAILABLE]: 503,
  [ApiErrorCodes.MAINTENANCE_MODE]: 503,
};

/**
 * API Endpoint types
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiEndpoint {
  path: string;
  method: HttpMethod;
  description: string;
  tags?: string[];
  deprecated?: boolean;
}

/**
 * Extract request ID from headers or generate new one
 */
export function getRequestId(request: NextRequest): string {
  return request.headers.get('x-request-id') ?? generateRequestId();
}

/**
 * Create JSON Response with standard headers
 */
export function createJsonResponse<T>(
  response: ApiResponse<T>,
  statusCode: number = 200,
  headers?: Record<string, string>
): Response {
  const responseHeaders = new Headers({
    'Content-Type': 'application/json',
    'X-Request-ID': response.meta.requestId,
    'X-API-Version': response.meta.version,
    ...headers,
  });

  return new Response(JSON.stringify(response), {
    status: statusCode,
    headers: responseHeaders,
  });
}
