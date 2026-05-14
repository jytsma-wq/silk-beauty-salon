'use client';

import { useSyncExternalStore } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/providers/theme-provider';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

function subscribeToHydration(callback: () => void) {
  callback();
  return () => {};
}

export function ThemeToggle() {
  const t = useTranslations('accessibility');
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const { theme, setTheme } = useTheme();

  // Don't render interactive button until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full opacity-0"
        aria-label={t('loadingThemeToggle')}
        disabled
      >
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="h-8 w-8 rounded-full"
      aria-label={theme === 'light' ? t('toggleFullscreen') : t('toggleFullscreen')}
    >
      {theme === 'light' ? (
        <Sun className="h-4 w-4 text-stone-600" />
      ) : (
        <Moon className="h-4 w-4 text-stone-400" />
      )}
    </Button>
  );
}
