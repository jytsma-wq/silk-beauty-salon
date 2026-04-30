import { type NextRequest, type NextResponse } from 'next/server';

/**
 * API Error Response Format
 * Standardized structure for all API error responses
 */
export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
    requestId: string;
    timestamp: string;
  };
}

/**
 * API Error Codes
 */
export const ErrorCodes = {
  // 400 Bad Request
  BAD_REQUEST: 'BAD_REQUEST',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_JSON: 'INVALID_JSON',
  MISSING_FIELD: 'MISSING_FIELD',
  
  // 401 Unauthorized
  UNAUTHORIZED: 'UNAUTHORIZED',
  INVALID_TOKEN: 'INVALID_TOKEN',
  EXPIRED_TOKEN: 'EXPIRED_TOKEN',
  
  // 403 Forbidden
  FORBIDDEN: 'FORBIDDEN',
  CSRF_INVALID: 'CSRF_INVALID',
  RATE_LIMITED: 'RATE_LIMITED',
  
  // 404 Not Found
  NOT_FOUND: 'NOT_FOUND',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  
  // 409 Conflict
  CONFLICT: 'CONFLICT',
  DUPLICATE_ENTRY: 'DUPLICATE_ENTRY',
  
  // 422 Unprocessable Entity
  UNPROCESSABLE: 'UNPROCESSABLE',
  
  // 500 Internal Server Error
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  EXTERNAL_API_ERROR: 'EXTERNAL_API_ERROR',
  
  // 503 Service Unavailable
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
} as const;

export type ErrorCode = keyof typeof ErrorCodes;

/**
 * HTTP Status Code Mapping
 */
const STATUS_CODE_MAP: Record<ErrorCode, number> = {
  BAD_REQUEST: 400,
  VALIDATION_ERROR: 400,
  INVALID_JSON: 400,
  MISSING_FIELD: 400,
  UNAUTHORIZED: 401,
  INVALID_TOKEN: 401,
  EXPIRED_TOKEN: 401,
  FORBIDDEN: 403,
  CSRF_INVALID: 403,
  RATE_LIMITED: 429,
  NOT_FOUND: 404,
  RESOURCE_NOT_FOUND: 404,
  CONFLICT: 409,
  DUPLICATE_ENTRY: 409,
  UNPROCESSABLE: 422,
  INTERNAL_ERROR: 500,
  DATABASE_ERROR: 500,
  EXTERNAL_API_ERROR: 502,
  SERVICE_UNAVAILABLE: 503,
};

/**
 * API Error Class
 * Custom error class for API routes with structured data
 */
export class ApiError extends Error {
  code: ErrorCode;
  statusCode: number;
  details?: Record<string, string[]>;
  requestId: string;
  timestamp: string;

  constructor(
    code: ErrorCode,
    message: string,
    details?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.statusCode = STATUS_CODE_MAP[code] || 500;
    this.details = details;
    this.requestId = generateRequestId();
    this.timestamp = new Date().toISOString();
  }

  toJSON(): ApiErrorResponse {
    return {
      success: false,
      error: {
        code: this.code,
        message: this.message,
        details: this.details,
        requestId: this.requestId,
        timestamp: this.timestamp,
      },
    };
  }
}

/**
 * Generate unique request ID
 */
export function generateRequestId(): string {
  return `req_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}`;
}

/**
 * Create API error response
 */
export function createErrorResponse(
  error: ApiError | Error,
  requestId?: string
): Response {
  if (error instanceof ApiError) {
    return Response.json(error.toJSON(), {
      status: error.statusCode,
      headers: {
        'X-Request-Id': error.requestId,
        'Content-Type': 'application/json',
      },
    });
  }

  // Handle unexpected errors
  const genericError = new ApiError(
    'INTERNAL_ERROR',
    'An unexpected error occurred. Please try again later.'
  );
  genericError.requestId = requestId || generateRequestId();

  return Response.json(genericError.toJSON(), {
    status: 500,
    headers: {
      'X-Request-Id': genericError.requestId,
      'Content-Type': 'application/json',
    },
  });
}

/**
 * Async handler wrapper for API routes
 * Catches errors and formats them consistently
 */
export function withErrorHandler(
  handler: (request: NextRequest) => Promise<NextResponse | Response>
) {
  return async (request: NextRequest): Promise<NextResponse | Response> => {
    const requestId = generateRequestId();
    
    try {
      return await handler(request);
    } catch (error) {
      // Log error with context
      logError(error, request, requestId);
      
      if (error instanceof ApiError) {
        error.requestId = requestId;
        return createErrorResponse(error);
      }

      // Convert unknown errors to ApiError
      const apiError = new ApiError(
        'INTERNAL_ERROR',
        error instanceof Error ? error.message : 'Internal server error'
      );
      apiError.requestId = requestId;
      
      return createErrorResponse(apiError);
    }
  };
}

/**
 * Log error with structured context
 */
function logError(
  error: unknown,
  request: NextRequest,
  requestId: string
): void {
  const timestamp = new Date().toISOString();
  const url = request.url;
  const method = request.method;
  const userAgent = request.headers.get('user-agent') || 'unknown';

  const logEntry = {
    timestamp,
    level: 'ERROR',
    type: 'API_ERROR',
    requestId,
    method,
    url,
    userAgent,
    error: error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    } : String(error),
  };

  // Use structured logging
  if (process.env.NODE_ENV === 'production') {
    // In production, use proper logging service
    console.error(JSON.stringify(logEntry));
  } else {
    console.error('API Error:', logEntry);
  }
}

/**
 * Retry configuration
 */
interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  retryableStatuses: number[];
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  retryableStatuses: [408, 429, 500, 502, 503, 504],
};

/**
 * Exponential backoff delay calculator
 */
function getRetryDelay(attempt: number, config: RetryConfig): number {
  const exponentialDelay = config.baseDelay * Math.pow(2, attempt);
  const jitter = Math.random() * 1000;
  return Math.min(exponentialDelay + jitter, config.maxDelay);
}

/**
 * Retry wrapper for async operations
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  config: Partial<RetryConfig> = {}
): Promise<T> {
  const fullConfig = { ...DEFAULT_RETRY_CONFIG, ...config };
  let lastError: Error | undefined;

  for (let attempt = 0; attempt < fullConfig.maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // Check if error is retryable
      const isRetryable = fullConfig.retryableStatuses.some(status =>
        error instanceof ApiError && error.statusCode === status
      );
      
      if (!isRetryable || attempt === fullConfig.maxRetries - 1) {
        throw error;
      }

      // Wait before retry
      const delay = getRetryDelay(attempt, fullConfig);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

/**
 * Circuit breaker pattern for external APIs
 */
export class CircuitBreaker {
  private failures = 0;
  private lastFailureTime: number | null = null;
  private state: 'closed' | 'open' | 'half-open' = 'closed';

  constructor(
    private readonly threshold = 5,
    private readonly timeout = 60000,
    private readonly resetTimeout = 30000
  ) {}

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - (this.lastFailureTime || 0) > this.resetTimeout) {
        this.state = 'half-open';
      } else {
        throw new ApiError(
          'SERVICE_UNAVAILABLE',
          'Service temporarily unavailable. Please try again later.'
        );
      }
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failures = 0;
    this.state = 'closed';
  }

  private onFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();
    
    if (this.failures >= this.threshold) {
      this.state = 'open';
    }
  }
}

/**
 * Validation error helper
 */
export function createValidationError(
  field: string,
  message: string
): ApiError {
  return new ApiError(
    'VALIDATION_ERROR',
    'Validation failed',
    { [field]: [message] }
  );
}
