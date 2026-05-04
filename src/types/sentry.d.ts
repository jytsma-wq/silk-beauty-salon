declare module '@sentry/nextjs' {
  import type { NextConfig } from 'next';

  export function withSentryConfig(
    config: NextConfig,
    options?: {
      silent?: boolean;
      org?: string;
      project?: string;
      widenClientFileUpload?: boolean;
      disableLogger?: boolean;
      automaticVercelMonitors?: boolean;
    }
  ): NextConfig;

  export function init(options: {
    dsn?: string;
    environment?: string;
    enabled?: boolean;
    tracesSampleRate?: number;
    replaysOnErrorSampleRate?: number;
    replaysSessionSampleRate?: number;
    integrations?: unknown[];
  }): void;

  export function captureException(error: Error): void;

  export function prismaIntegration(): unknown;
}
