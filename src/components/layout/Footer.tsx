'use client';

import { useTranslations } from 'next-intl';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { treatmentCategories } from '@/data/treatments';
import { Link } from '@/i18n/routing';

// TikTok Icon Component
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );
}

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
                className="text-[#E4405F] hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1877F2] hover:opacity-80 transition-opacity"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.tiktok.com/@silkbeautybatumi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:opacity-80 transition-opacity"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-6 h-6" />
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
