'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { locales, localeNames, type Locale } from '@/i18n';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 px-2">
          <Image
            src={localeNames[locale]?.flag || 'https://flagcdn.com/w40/gb.png'}
            alt={localeNames[locale]?.name || locale}
            width={24}
            height={16}
            style={{ width: 'auto', height: 'auto' }}
            className="rounded-sm"
          />
          <span className="hidden sm:inline">{localeNames[locale]?.nativeName || locale.toUpperCase()}</span>
          <span className="sm:hidden">
            <Image
              src={localeNames[locale]?.flag || 'https://flagcdn.com/w40/gb.png'}
              alt={localeNames[locale]?.name || locale}
              width={24}
              height={16}
              style={{ width: 'auto', height: 'auto' }}
              className="rounded-sm"
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
                  alt={localeNames[loc]?.name || loc}
                  width={24}
                  height={16}
                  className="rounded-sm"
                />
                <span>{localeNames[loc]?.nativeName}</span>
              </span>
              {locale === loc && (
                <span className="text-gold text-xs">✓</span>
              )}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
