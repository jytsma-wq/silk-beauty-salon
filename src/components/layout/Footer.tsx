'use client';

import { useTranslations } from 'next-intl';
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { treatmentCategories } from '@/data/treatments';
import { Link } from '@/i18n/routing';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Logo and About */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-semibold text-white tracking-tight">
                  Silk Beauty
                </span>
                <span className="text-sm text-gold tracking-[0.2em] uppercase font-medium">
                  Salon
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              {t('description')}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-gold mb-6">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  {tNav('faq')}
                </Link>
              </li>
              <li>
                <Link
                  href="/pricelist"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  {tNav('pricelist')}
                </Link>
              </li>
              <li>
                <Link
                  href="/offers"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  {tNav('offers')}
                </Link>
              </li>
              <li>
                <Link
                  href="/media-press"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  {tNav('press')}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  {tNav('blog')}
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Treatments */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-gold mb-6">
              {t('treatments')}
            </h3>
            <ul className="space-y-3">
              {treatmentCategories.slice(0, 6).map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/treatments#${category.slug}`}
                    className="text-sm text-gray-300 hover:text-gold transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/treatments"
                  className="text-sm text-gold hover:underline transition-colors"
                >
                  {tNav('treatments')} →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-gold mb-6">
              {t('contact')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-gray-300">
                    {t('address')}
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  {t('phone')}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-sm text-gray-300 hover:text-gold transition-colors"
                >
                  {t('email')}
                </a>
              </li>
            </ul>

            {/* Opening Hours */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gold mb-3">
                {t('openingHours')}
              </h4>
              <ul className="space-y-1 text-xs text-gray-300">
                <li>{t('hours.monFri')}</li>
                <li>{t('hours.satSun')}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              {t('copyright')}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy-policy"
                className="text-sm text-gray-400 hover:text-gold transition-colors"
              >
                {t('privacy')}
              </Link>
              <Link
                href="/terms-conditions"
                className="text-sm text-gray-400 hover:text-gold transition-colors"
              >
                {t('terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
