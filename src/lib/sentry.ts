/**
 * Sentry Configuration Stub
 * 
 * This is a stub implementation. To enable Sentry:
 * 1. npm install @sentry/nextjs
 * 2. Run: npx @sentry/wizard@latest -i nextjs
 * 3. Replace this file with actual Sentry configuration
 */

type SeverityLevel = 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug';

/**
 * Initialize Sentry (Client-side) - Stub
 */
export function initSentryClient(): void {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN && typeof window !== 'undefined') {
    console.warn('[Sentry Stub] Client Sentry would initialize here. Install @sentry/nextjs to enable.');
  }
}

/**
 * Initialize Sentry (Server-side) - Stub
 */
export function initSentryServer(): void {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN && typeof window === 'undefined') {
    console.warn('[Sentry Stub] Server Sentry would initialize here. Install @sentry/nextjs to enable.');
  }
}

/**
 * Capture exception - Stub
 */
export function captureException(
  error: Error,
  _context?: {
    tags?: Record<string, string>;
    extra?: Record<string, unknown>;
    user?: { id?: string; email?: string; username?: string };
  }
): void {
  console.error('[Sentry Stub] Exception:', error.message);
}

/**
 * Capture message - Stub
 */
export function captureMessage(
  message: string,
  _level?: SeverityLevel
): void {
  console.warn('[Sentry Stub] Message:', message);
}

/**
 * Set user context - Stub
 */
export function setUser(_user: { id?: string; email?: string; username?: string; ip_address?: string }): void {
  // Stub implementation
}

/**
 * Clear user context - Stub
 */
export function clearUser(): void {
  // Stub implementation
}

/**
 * Add breadcrumb - Stub
 */
export function addBreadcrumb(_breadcrumb: { message: string; category?: string; level?: SeverityLevel; data?: Record<string, unknown> }): void {
  // Stub implementation
}

/**
 * Start performance transaction - Stub
 */
export function startTransaction(_name: string, _op: string): null {
  return null;
}

/**
 * Configure scope - Stub
 */
export function configureScope(_callback: (scope: unknown) => void): void {
  // Stub implementation
}

/**
 * Wrap function with Sentry error tracking - Stub
 */
export function withSentry<T extends (...args: unknown[]) => unknown>(
  fn: T,
  _options?: { name?: string; tags?: Record<string, string> }
): T {
  return ((...args: unknown[]) => {
    try {
      const result = fn(...args);
      if (result instanceof Promise) {
        return result.catch((error) => {
          captureException(error instanceof Error ? error : new Error(String(error)));
          throw error;
        });
      }
      return result;
    } catch (error) {
      captureException(error instanceof Error ? error : new Error(String(error)));
      throw error;
    }
  }) as T;
}
