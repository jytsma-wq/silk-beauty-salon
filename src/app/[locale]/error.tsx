'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('errorPage');

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Locale error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <h1 className="text-4xl font-serif font-semibold text-primary mb-4">
          {t('somethingWentWrong')}
        </h1>
        <p className="text-muted-foreground mb-8">
          {t('apologyMessage')}
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
          {t('tryAgain')}
        </Button>
      </div>
    </div>
  );
}
