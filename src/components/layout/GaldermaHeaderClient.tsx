'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link, usePathname } from '@/i18n/routing';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { siteConfig } from '@/data/site-config';
import { motion, AnimatePresence } from 'framer-motion';

type MegaMenuItem = {
  title: string;
  href: string;
  description: string;
};

function MegaMenuPanel({
  eyebrow,
  overviewHref,
  overviewLabel,
  image,
  items,
  compact = false,
}: {
  eyebrow: string;
  overviewHref?: string;
  overviewLabel?: string;
  image?: string;
  items: MegaMenuItem[];
  compact?: boolean;
}) {
  const columnCount = compact ? 6 : items.length > 14 ? 5 : 4;

  return (
    <div
      className="absolute left-1/2 top-full z-50 w-screen -translate-x-1/2 pt-8"
      style={{ maxWidth: '100vw' }}
    >
      <div className="bg-white shadow-[0_18px_45px_rgba(36,31,27,0.08)]">
        <div
          className={`mx-auto grid max-w-7xl gap-8 px-6 lg:px-8 ${
            compact ? 'py-7' : 'py-8 lg:grid-cols-[340px_1fr]'
          }`}
        >
          {!compact && image && overviewHref && overviewLabel ? (
            <div>
              <div className="relative aspect-[1.65/1] overflow-hidden bg-stone-100">
                <Image src={image} alt="" fill className="object-cover" sizes="340px" />
              </div>
              <Link
                href={overviewHref}
                className="mt-4 inline-flex items-center gap-3 font-serif text-xl font-normal leading-tight text-[#241f1b] transition-colors hover:text-[#76563f]"
              >
                {overviewLabel}
                <span aria-hidden="true" className="font-sans text-lg leading-none">&rsaquo;</span>
              </Link>
            </div>
          ) : null}

          <div>
            <p className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#76563f]">
              {eyebrow}
            </p>
            <div
              className="grid gap-x-10 gap-y-5"
              style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
            >
              {items.map((item) => (
                <Link
                  key={`${item.title}-${item.href}`}
                  href={item.href}
                  className={`group block leading-snug text-[#241f1b] transition-colors hover:text-[#76563f] ${
                    compact ? 'text-[0.82rem]' : 'text-[0.94rem]'
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GaldermaHeaderClient({
  treatmentMegaMenuItems,
  skinConditionMegaMenuItems,
}: {
  treatmentMegaMenuItems: MegaMenuItem[];
  skinConditionMegaMenuItems: MegaMenuItem[];
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'treatments' | 'conditions' | null>(null);
  const t = useTranslations('nav');
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '';
  const isTransparent = isHome && lastScrollY < 48 && !activeMegaMenu && !isMenuOpen;

  const utilityLinkClass = `uppercase tracking-[0.15em] transition-colors ${
    isTransparent ? 'text-white/70 hover:text-white' : 'text-stone-600 hover:text-[#8d6f58]'
  }`;
  const navLinkClass = `text-xs uppercase tracking-[0.2em] transition-colors ${
    isTransparent ? 'text-white/75 hover:text-white' : 'text-stone-700 hover:text-[#8d6f58]'
  }`;
  const logoClass = `font-sans text-[1.55rem] font-normal uppercase tracking-[0.34em] transition-colors ${
    isTransparent ? 'text-white hover:text-white/80' : 'text-[#1c1c1c] hover:text-[#8d6f58]'
  }`;
  const bookClass = `w-24 border px-4 py-2 text-center text-xs uppercase tracking-[0.15em] transition-colors ${
    isTransparent
      ? 'border-white/45 bg-white/5 text-white hover:bg-white hover:text-[#241f1b]'
      : 'border-[#d9cec1] bg-[#f7f2eb] text-[#241f1b] hover:bg-[#241f1b] hover:text-white'
  }`;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        } ${isTransparent ? 'border-transparent bg-transparent' : 'border-[#e8e4df] bg-[#f7f4f0]'}`}
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs lg:px-8">
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/about"
              className={utilityLinkClass}
            >
              {t('about', { defaultValue: 'About' })}
            </Link>
            <Link
              href="/contact-us"
              className={utilityLinkClass}
            >
              {t('contact', { defaultValue: 'Contact Us' })}
            </Link>
          </nav>

          <a
            href={`tel:${siteConfig.contact.phone}`}
            className={`flex items-center gap-2 transition-colors md:hidden ${
              isTransparent ? 'text-white/75 hover:text-white' : 'text-stone-600 hover:text-[#8d6f58]'
            }`}
          >
            <Phone className="h-3.5 w-3.5" />
            <span>{siteConfig.contact.phone}</span>
          </a>

          <div
            className={`flex items-center gap-2 ${
              isTransparent
                ? '[&_button]:text-white [&_button:hover]:bg-white/10 [&_button:hover]:text-white'
                : ''
            }`}
          >
            <LanguageSwitcher />
          </div>
        </div>
      </motion.div>

      <motion.header
        className={`fixed left-0 right-0 z-40 border-b transition-all duration-300 ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        } ${isTransparent ? 'border-transparent bg-transparent' : 'border-[#e8e4df] bg-white'}`}
        style={{ top: '40px' }}
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -140 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="mb-4 hidden justify-center md:flex">
            <Link href="/" className={logoClass}>
              {siteConfig.name.replace(/\s+/g, ' ')}
            </Link>
          </div>

          <div className="hidden items-center justify-between md:flex">
            <div className="w-24" />

            <nav
              aria-label={t('mainNavigation', { defaultValue: 'Main navigation' })}
              className="relative flex items-center justify-center gap-10"
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <div onMouseEnter={() => setActiveMegaMenu('treatments')}>
                <button
                  type="button"
                  className={`flex items-center gap-1 outline-none ${navLinkClass}`}
                  aria-expanded={activeMegaMenu === 'treatments'}
                >
                  {t('treatments', { defaultValue: 'Treatments' })}
                  <ChevronDown className="h-3 w-3" />
                </button>
              </div>

              <div onMouseEnter={() => setActiveMegaMenu('conditions')}>
                <button
                  type="button"
                  className={`flex items-center gap-1 outline-none ${navLinkClass}`}
                  aria-expanded={activeMegaMenu === 'conditions'}
                >
                  {t('conditions', { defaultValue: 'Skin Conditions' })}
                  <ChevronDown className="h-3 w-3" />
                </button>
              </div>

              <Link href="/pricelist" className={navLinkClass}>
                {t('pricelist', { defaultValue: 'Pricelist' })}
              </Link>
              <Link href="/offers" className={navLinkClass}>
                {t('offers', { defaultValue: 'Offers' })}
              </Link>
              <Link href="/international-clients" className={navLinkClass}>
                {t('international', { defaultValue: 'International Clients' })}
              </Link>

              {activeMegaMenu === 'treatments' ? (
                <MegaMenuPanel
                  eyebrow={t('treatments')}
                  items={treatmentMegaMenuItems}
                  compact
                />
              ) : null}

              {activeMegaMenu === 'conditions' ? (
                <MegaMenuPanel
                  eyebrow={t('skinConcerns')}
                  overviewHref="/conditions"
                  overviewLabel={t('allConditions')}
                  image="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1000&q=80"
                  items={skinConditionMegaMenuItems}
                />
              ) : null}
            </nav>

            <Link
              href="/book"
              className={bookClass}
            >
              {t('book', { defaultValue: 'Book' })}
            </Link>
          </div>

          <div className="flex items-center justify-between md:hidden">
            <Link href="/" className={`font-sans text-base uppercase tracking-[0.24em] ${isTransparent ? 'text-white' : 'text-[#1c1c1c]'}`}>
              {siteConfig.name}
            </Link>
            <button
              onClick={() => setIsMenuOpen(true)}
              className={`p-2 ${isTransparent ? 'text-white' : 'text-[#1c1c1c]'}`}
              aria-label={t('openMenu')}
            >
              <Menu className="h-6 w-6" strokeWidth={1} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#f7f4f0]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 text-4xl font-light text-stone-900 transition-colors hover:text-stone-600"
              aria-label={t('closeMenu')}
            >
              <X className="h-8 w-8" strokeWidth={1} />
            </button>

            <div className="w-full max-w-5xl px-8">
              <div className="mb-12 text-center">
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="font-sans text-xl uppercase tracking-[0.28em] text-[#1c1c1c]">
                  {siteConfig.name}
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
                <nav className="space-y-6">
                  <span className="mb-6 block text-xs uppercase tracking-[0.4em] text-stone-400">{t('menu')}</span>
                  <Link href="/treatments/anti-wrinkle" onClick={() => setIsMenuOpen(false)} className="block text-3xl font-serif font-normal text-stone-900 transition-colors hover:text-[#8d6f58]">
                    {t('treatments', { defaultValue: 'Treatments' })}
                  </Link>
                  <Link href="/conditions" onClick={() => setIsMenuOpen(false)} className="block text-3xl font-serif font-normal text-stone-900 transition-colors hover:text-[#8d6f58]">
                    {t('conditions', { defaultValue: 'Skin Conditions' })}
                  </Link>
                  <Link href="/pricelist" onClick={() => setIsMenuOpen(false)} className="block text-3xl font-serif font-normal text-stone-900 transition-colors hover:text-[#8d6f58]">
                    {t('pricelist', { defaultValue: 'Pricelist' })}
                  </Link>
                  <Link href="/offers" onClick={() => setIsMenuOpen(false)} className="block text-3xl font-serif font-normal text-stone-900 transition-colors hover:text-[#8d6f58]">
                    {t('offers', { defaultValue: 'Offers' })}
                  </Link>
                  <Link href="/international-clients" onClick={() => setIsMenuOpen(false)} className="block text-3xl font-serif font-normal text-stone-900 transition-colors hover:text-[#8d6f58]">
                    {t('international', { defaultValue: 'International Clients' })}
                  </Link>
                </nav>

                <div>
                  <span className="mb-6 block text-xs uppercase tracking-[0.4em] text-stone-400">{t('more')}</span>
                  <nav className="mb-8 space-y-4">
                    <Link href="/about" onClick={() => setIsMenuOpen(false)} className="block text-lg text-stone-700 transition-colors hover:text-[#8d6f58]">
                      {t('about', { defaultValue: 'About' })}
                    </Link>
                    <Link href="/contact-us" onClick={() => setIsMenuOpen(false)} className="block text-lg text-stone-700 transition-colors hover:text-[#8d6f58]">
                      {t('contact', { defaultValue: 'Contact Us' })}
                    </Link>
                    <Link href="/faq" onClick={() => setIsMenuOpen(false)} className="block text-lg text-stone-700 transition-colors hover:text-[#8d6f58]">
                      {t('faq', { defaultValue: 'FAQ' })}
                    </Link>
                    <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="block text-lg text-stone-700 transition-colors hover:text-[#8d6f58]">
                      {t('blog', { defaultValue: 'Journal' })}
                    </Link>
                  </nav>

                  <div className="mt-16">
                    <span className="mb-4 block text-xs uppercase tracking-[0.4em] text-stone-400">
                      {t('visitUs', { defaultValue: 'Visit Us' })}
                    </span>
                    <p className="text-sm leading-relaxed text-stone-600">
                      {siteConfig.contact.address}
                      <br />
                      {siteConfig.contact.city}, {siteConfig.contact.country} {siteConfig.contact.postcode}
                    </p>
                    <a href={`tel:${siteConfig.contact.phone}`} className="mt-4 block text-sm text-stone-900 hover:underline">
                      {siteConfig.contact.phone}
                    </a>
                  </div>

                  <Link
                    href="/book"
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-12 block w-full rounded-md border border-[#d9cec1] bg-[#f3ece3] py-5 text-center text-sm uppercase tracking-widest text-[#241f1b] transition-colors hover:bg-[#241f1b] hover:text-white"
                  >
                    {t('bookConsultation', { defaultValue: 'Book Consultation' })}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
