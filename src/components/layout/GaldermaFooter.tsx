'use client';

import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { siteConfig } from '@/data/site-config';
import { Facebook, Instagram } from 'lucide-react';

export function GaldermaFooter() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();

  return (
    <footer
      role="contentinfo"
      className="border-t border-stone-200 bg-white"
    >
      {/* ── Magazine Colophon Layout ── */}
      <div className="max-w-7xl mx-auto px-8 py-24 md:py-32">
        
        {/* Top Section - Newsletter / Stay Connected */}
        <div className="mb-20 md:mb-32 max-w-3xl">
          {/* Chapter marker */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-stone-300" />
            <span className="text-xs tracking-[0.3em] uppercase text-stone-400">
              {t('stayConnected', { defaultValue: 'Stay Connected' })}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-stone-900 mb-6">
            {t('newsletterTitle', { defaultValue: 'Join Our World' })}
          </h2>
          
          <p className="text-lg text-stone-600 mb-10 max-w-xl leading-relaxed">
            {t('socialDescription', { defaultValue: 'Receive updates on new treatments, exclusive offers, and beauty insights delivered to your inbox.' })}
          </p>
          
          {/* Newsletter form - elegant underline style */}
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email"
              placeholder={t('emailPlaceholder', { defaultValue: 'Your email address' })}
              className="flex-1 px-0 py-4 border-b-2 border-stone-300 focus:border-[#b5453a] bg-transparent text-base outline-none transition-colors placeholder:text-stone-400"
            />
            <button 
              type="submit"
              className="px-8 py-4 bg-stone-900 text-stone-50 text-sm uppercase tracking-wide hover:bg-[#b5453a] transition-colors"
            >
              {t('subscribe', { defaultValue: 'Subscribe' })}
            </button>
          </form>
        </div>

        {/* Main Footer Grid - Magazine Credits Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12 mb-16">
          
          {/* Column 1 - About */}
          <div className="col-span-2">
            <h3 className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-6">
              {t('about', { defaultValue: 'About' })}
            </h3>
            <p className="text-sm leading-relaxed text-stone-600 max-w-xs">
              {siteConfig.description}
            </p>
            
            {/* Social - minimal */}
            <div className="mt-8 flex gap-6">
              <a 
                href={siteConfig.social?.instagram ?? 'https://instagram.com/silkbeauty'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-[#b5453a] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a 
                href={siteConfig.social?.facebook ?? 'https://facebook.com/silkbeauty'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-[#b5453a] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Treatments */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-6">
              {t('treatments', { defaultValue: 'Treatments' })}
            </h3>
            <nav className="space-y-3">
              <Link href={`/${locale}/treatments`} className="block text-sm text-stone-600 hover:text-stone-900 transition-colors">
                {tNav('treatments')}
              </Link>
              <Link href={`/${locale}/conditions`} className="block text-sm text-stone-600 hover:text-stone-900 transition-colors">
                {tNav('conditions')}
              </Link>
              <Link href={`/${locale}/pricelist`} className="block text-sm text-stone-600 hover:text-stone-900 transition-colors">
                {tNav('pricelist')}
              </Link>
            </nav>
          </div>
          
          {/* Column 3 - Information */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-6">
              {t('information', { defaultValue: 'Information' })}
            </h3>
            <nav className="space-y-3">
              <Link href={`/${locale}/about`} className="block text-sm text-stone-600 hover:text-stone-900 transition-colors">
                {tNav('about')}
              </Link>
              <Link href={`/${locale}/faq`} className="block text-sm text-stone-600 hover:text-stone-900 transition-colors">
                {tNav('faq')}
              </Link>
              <Link href={`/${locale}/blog`} className="block text-sm text-stone-600 hover:text-stone-900 transition-colors">
                {tNav('blog')}
              </Link>
            </nav>
          </div>
          
          {/* Column 4 - Visit Us */}
          <div className="col-span-2">
            <h3 className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-6">
              {t('visitUs', { defaultValue: 'Visit Us' })}
            </h3>
            <address className="not-italic text-sm text-stone-600 leading-relaxed">
              <p className="mb-3">
                {siteConfig.contact.address}
                <br />
                {siteConfig.contact.city}, {siteConfig.contact.country} {siteConfig.contact.postcode}
              </p>
              <p className="mb-3">
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-[#b5453a] transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#b5453a] transition-colors">
                  {siteConfig.contact.email}
                </a>
              </p>
            </address>
            
            {/* Hours */}
            <div className="mt-6 pt-6 border-t border-stone-100">
              <dl className="text-sm space-y-1">
                <div className="flex justify-between">
                  <dt className="text-stone-500">Mon – Fri</dt>
                  <dd className="text-stone-900">{siteConfig.businessHours.monday}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone-500">Sat</dt>
                  <dd className="text-stone-900">{siteConfig.businessHours.saturday}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone-500">Sun</dt>
                  <dd className="text-stone-900">{siteConfig.businessHours.sunday}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        
        {/* Bottom Credits - Editorial Style */}
        <div className="pt-8 border-t border-stone-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="uppercase tracking-wider">
                © {currentYear} {siteConfig.name}
              </span>
              <Link href={`/${locale}/privacy-policy`} className="hover:text-stone-900 transition-colors uppercase tracking-wider">
                {t('privacy')}
              </Link>
              <Link href={`/${locale}/terms-conditions`} className="hover:text-stone-900 transition-colors uppercase tracking-wider">
                {t('terms')}
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="uppercase tracking-wider text-stone-400">
                {t('designedIn', { defaultValue: 'Designed in Batumi' })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Decorative hairline separator ── */}
      <div className="h-1 bg-linear-to-r from-transparent via-stone-200 to-transparent" aria-hidden="true" />
    </footer>
  );
}
