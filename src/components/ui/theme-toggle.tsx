'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/providers/theme-provider';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export function ThemeToggle() {
  const t = useTranslations('accessibility');
  // Handle case where ThemeProvider context might not be available during SSR
  let theme = 'light' as 'light' | 'dark';
  let setTheme = (_theme: 'light' | 'dark') => {};
  let mounted = false;

  try {
    const context = useTheme();
    theme = context.theme;
    setTheme = context.setTheme;
    mounted = true;
  } catch {
    // Context not available during SSR, use defaults
    mounted = false;
  }

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
