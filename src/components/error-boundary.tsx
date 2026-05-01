'use client';

import { Component, type ReactNode, type ErrorInfo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * Global Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to monitoring service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Call optional error handler
    this.props.onError?.(error, errorInfo);
    
    // Send to error tracking service (Sentry)
    if (typeof window !== 'undefined' && window.__SENTRY__) {
      window.__SENTRY__.captureException(error, {
        extra: { componentStack: errorInfo.componentStack }
      });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return <ErrorFallback error={this.state.error} onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

/**
 * Error Fallback UI Component
 * Displays user-friendly error message with retry and home options
 */
function ErrorFallback({ 
  error, 
  onRetry 
}: { 
  error?: Error;
  onRetry: () => void;
}) {
  const t = useTranslations('errors');
  const locale = useLocale();

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="rounded-full bg-red-100 p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <AlertTriangle className="w-10 h-10 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {t('title')}
        </h1>
        
        <p className="text-gray-600 mb-4">
          {t('description')}
        </p>
        
        {error && process.env.NODE_ENV === 'development' && (
          <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left overflow-auto">
            <p className="text-xs font-mono text-red-600 mb-1">{error.name}:</p>
            <p className="text-xs font-mono text-gray-700">{error.message}</p>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={onRetry}
            className="flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            {t('retry')}
          </Button>
          
          <Button 
            variant="outline"
            asChild
          >
            <Link href={`/${locale}`} className="flex items-center justify-center gap-2">
              <Home className="w-4 h-4" />
              {t('goHome')}
            </Link>
          </Button>
        </div>
        
        <p className="mt-6 text-sm text-gray-500">
          {t('referenceId')}: {generateReferenceId()}
        </p>
      </div>
    </div>
  );
}

/**
 * Generate a unique reference ID for error reports
 */
function generateReferenceId(): string {
  return `ERR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
}

// Extend Window interface for Sentry
declare global {
  interface Window {
    __SENTRY__?: {
      captureException: (error: Error, context?: unknown) => void;
    };
  }
}

export default ErrorBoundary;
