'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { locales, localeNames, type Locale } from '@/i18n';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { trackLanguageChange } from '@/lib/analytics';

export function LanguageSwitcher() {
  const t = useTranslations('common');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === locale) return;
    trackLanguageChange(locale, newLocale);
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 px-2" data-testid="language-switcher">
          <Image
            src={localeNames[locale]?.flag || '/flags/en.svg'}
            alt={t('currentLanguageFlag', { language: localeNames[locale]?.name || locale })}
            width={24}
            height={16}
            loading="eager"
            className="h-4 w-6 rounded-sm"
          />
          <span className="hidden sm:inline">{localeNames[locale]?.nativeName || locale.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className={`cursor-pointer ${locale === loc ? 'bg-accent' : ''}`}
          >
            <span className="flex w-full items-center justify-between">
              <span className="flex items-center gap-2">
                <Image
                  src={localeNames[loc]?.flag}
                  alt={t('languageFlag', { language: localeNames[loc]?.name || loc })}
                  width={24}
                  height={16}
                  className="h-4 w-6 rounded-sm"
                />
                <span>{localeNames[loc]?.nativeName}</span>
              </span>
              {locale === loc ? <span className="text-xs text-[#b5453a]">✓</span> : null}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
