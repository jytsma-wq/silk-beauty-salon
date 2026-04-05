'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Root error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <h1 className="text-4xl font-serif font-semibold text-primary mb-4">
          Something Went Wrong
        </h1>
        <p className="text-muted-foreground mb-8">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>
        {error.message && (
          <p className="text-sm text-red-500 mb-6 bg-red-50 p-3 rounded">
            {error.message}
          </p>
        )}
        <Button 
          onClick={reset}
          className="btn-gold"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
