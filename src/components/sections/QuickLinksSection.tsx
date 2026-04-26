'use client';

import { useTranslations } from 'next-intl';
import { HelpCircle, MapPin, Users, Newspaper, ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

export function QuickLinksSection() {
  const t = useTranslations('quickLinks');
  const tCommon = useTranslations('common');

  const quickLinks = [
    {
      title: t('faq.title'),
      description: t('faq.description'),
      icon: HelpCircle,
      href: '/faq',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: t('contact.title'),
      description: t('contact.description'),
      icon: MapPin,
      href: '/contact-us',
      color: 'bg-green-50 text-green-600',
    },
    {
      title: t('team.title'),
      description: t('team.description'),
      icon: Users,
      href: '/about#team',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: t('press.title'),
      description: t('press.description'),
      icon: Newspaper,
      href: '/media-press',
      color: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <section className="section-spacing section-warm">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-serif text-primary tracking-tight mb-4"
          >
            {t('title')}
          </h2>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="group p-6 transition-colors hover:bg-stone-50"
            >
              <div className={`w-12 h-12 ${link.color} flex items-center justify-center mb-4`}>
                <link.icon className="w-6 h-6" />
              </div>
              <h3
                className="text-lg font-serif text-primary tracking-tight mb-2"
              >
                {link.title}
              </h3>
              <p className="font-sans text-muted-foreground leading-relaxed text-sm mb-4">
                {link.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-[#b5453a] group-hover:gap-2 transition-all">
                {tCommon('learnMore')}
                <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
