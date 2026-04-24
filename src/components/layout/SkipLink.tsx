'use client';

import { useTranslations } from 'next-intl';

interface SkipLinkTarget {
  href: string;
  label: string;
}

export function SkipLink() {
  const t = useTranslations('accessibility');
  const tNav = useTranslations('nav');

  const skipTargets: SkipLinkTarget[] = [
    { href: '#main-content', label: t('skipToMain') },
    { href: '#treatments', label: t('skipToTreatments') || tNav('treatments') },
    { href: '#booking', label: t('skipToBooking') || tNav('bookAppointment') },
  ];

  return (
    <nav
      aria-label={t('skipNavigation')}
      className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-0 focus-within:left-0 focus-within:z-50 focus-within:w-full focus-within:bg-primary focus-within:p-4"
    >
      <ul className="flex flex-wrap gap-4 justify-start">
        {skipTargets.map((target) => (
          <li key={target.href}>
            <a
              href={target.href}
              className="inline-block px-4 py-2 text-white bg-gold rounded-lg hover:bg-gold/90 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none transition-colors"
            >
              {target.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
