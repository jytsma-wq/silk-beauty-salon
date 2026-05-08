'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
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
    // Navigate to same page with new locale
    const newPath = pathname.replace(/^\/[a-z]{2}/, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 px-2">
          <Image
            src={localeNames[locale]?.flag || 'https://flagcdn.com/w40/gb.png'}
            alt={t('currentLanguageFlag', { language: localeNames[locale]?.name || locale })}
            width={24}
            height={16}
            className="rounded-sm w-6 h-4"
          />
          <span className="hidden sm:inline">{localeNames[locale]?.nativeName || locale.toUpperCase()}</span>
          <span className="sm:hidden">
            <Image
              src={localeNames[locale]?.flag || 'https://flagcdn.com/w40/gb.png'}
              alt={t('currentLanguageFlag', { language: localeNames[locale]?.name || locale })}
              width={24}
              height={16}
              className="rounded-sm w-6 h-4"
            />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className={`cursor-pointer ${locale === loc ? 'bg-accent' : ''}`}
          >
            <span className="flex items-center justify-between w-full">
              <span className="flex items-center gap-2">
                <Image
                  src={localeNames[loc]?.flag}
                  alt={t('languageFlag', { language: localeNames[loc]?.name || loc })}
                  width={24}
                  height={16}
                  className="rounded-sm w-6 h-4"
                />
                <span>{localeNames[loc]?.nativeName}</span>
              </span>
              {locale === loc && (
                <span className="text-[#b5453a] text-xs">✓</span>
              )}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
