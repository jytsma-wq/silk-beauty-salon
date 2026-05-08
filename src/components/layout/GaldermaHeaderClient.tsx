'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { siteConfig } from '@/data/site-config';
import { motion, AnimatePresence } from 'framer-motion';

type MegaMenuItem = {
  title: string;
  href: string;
  description: string;
};

function MegaMenuPanel({
  eyebrow,
  title,
  overviewHref,
  overviewLabel,
  description,
  image,
  items,
}: {
  eyebrow: string;
  title: string;
  overviewHref: string;
  overviewLabel: string;
  description: string;
  image: string;
  items: MegaMenuItem[];
}) {
  return (
    <div className="absolute left-1/2 top-full z-50 w-[min(1120px,calc(100vw-3rem))] -translate-x-1/2 pt-4">
      <div className="overflow-hidden rounded-xl border border-[#e8e4df] bg-[#fbf8f4] shadow-[0_24px_70px_rgba(36,31,27,0.12)]">
        <div className="grid lg:grid-cols-[320px_1fr]">
          <div className="border-r border-[#e8e4df] bg-white">
            <div className="relative aspect-4/5 overflow-hidden">
              <Image src={image} alt="" fill className="object-cover" sizes="320px" />
            </div>
            <div className="p-8">
              <p className="mb-3 text-[0.68rem] uppercase tracking-[0.24em] text-[#8d6f58]">
                {eyebrow}
              </p>
              <h3 className="font-sans text-4xl font-light leading-[1.02] text-[#241f1b]">
                {title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-stone-600">{description}</p>
              <Link
                href={overviewHref}
                className="mt-8 inline-flex h-11 items-center rounded-md border border-[#d9cec1] bg-[#f7f2eb] px-6 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#241f1b] transition-colors hover:bg-[#241f1b] hover:text-white"
              >
                {overviewLabel}
              </Link>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <div className="grid gap-x-8 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => (
                <Link
                  key={`${item.title}-${item.href}`}
                  href={item.href}
                  className="group rounded-[6px] border border-transparent bg-white/70 p-5 transition-colors hover:border-[#e8e4df] hover:bg-white"
                >
                  <h4 className="text-sm font-medium uppercase tracking-[0.16em] text-[#241f1b]">
                    {item.title}
                  </h4>
                  <p className="mt-3 text-sm leading-6 text-stone-600">{item.description}</p>
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
        className={`fixed top-0 left-0 right-0 z-50 border-b border-[#e8e4df] bg-[#f7f4f0] transition-all duration-300 ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        }`}
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs lg:px-8">
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/about"
              className="uppercase tracking-[0.15em] text-stone-600 transition-colors hover:text-[#8d6f58]"
            >
              {t('about', { defaultValue: 'About' })}
            </Link>
            <Link
              href="/contact-us"
              className="uppercase tracking-[0.15em] text-stone-600 transition-colors hover:text-[#8d6f58]"
            >
              {t('contact', { defaultValue: 'Contact Us' })}
            </Link>
          </nav>

          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="flex items-center gap-2 text-stone-600 transition-colors hover:text-[#8d6f58] md:hidden"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>{siteConfig.contact.phone}</span>
          </a>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </motion.div>

      <motion.header
        className={`fixed left-0 right-0 z-40 border-b border-[#e8e4df] bg-white transition-all duration-300 ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        }`}
        style={{ top: '40px' }}
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -140 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="mb-4 flex justify-center">
            <Link href="/" className="font-serif text-2xl tracking-tight text-[#1c1c1c] transition-colors hover:text-[#8d6f58]">
              {siteConfig.name}
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
                  className="flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-stone-700 transition-colors hover:text-[#8d6f58] outline-none"
                  aria-expanded={activeMegaMenu === 'treatments'}
                >
                  {t('treatments', { defaultValue: 'Treatments' })}
                  <ChevronDown className="h-3 w-3" />
                </button>
              </div>

              <div onMouseEnter={() => setActiveMegaMenu('conditions')}>
                <button
                  type="button"
                  className="flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-stone-700 transition-colors hover:text-[#8d6f58] outline-none"
                  aria-expanded={activeMegaMenu === 'conditions'}
                >
                  {t('conditions', { defaultValue: 'Skin Conditions' })}
                  <ChevronDown className="h-3 w-3" />
                </button>
              </div>

              <Link href="/pricelist" className="text-xs uppercase tracking-[0.2em] text-stone-700 transition-colors hover:text-[#8d6f58]">
                {t('pricelist', { defaultValue: 'Pricelist' })}
              </Link>
              <Link href="/offers" className="text-xs uppercase tracking-[0.2em] text-stone-700 transition-colors hover:text-[#8d6f58]">
                {t('offers', { defaultValue: 'Offers' })}
              </Link>
              <Link href="/international-clients" className="text-xs uppercase tracking-[0.2em] text-stone-700 transition-colors hover:text-[#8d6f58]">
                {t('international', { defaultValue: 'International Clients' })}
              </Link>

              {activeMegaMenu === 'treatments' ? (
                <MegaMenuPanel
                  eyebrow={t('treatments')}
                  title={t('treatmentPortfolio')}
                  overviewHref="/treatments"
                  overviewLabel={t('allTreatments')}
                  description={t('treatmentPortfolioDescription')}
                  image="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1000&q=80"
                  items={treatmentMegaMenuItems}
                />
              ) : null}

              {activeMegaMenu === 'conditions' ? (
                <MegaMenuPanel
                  eyebrow={t('skinConcerns')}
                  title={t('skinConditions')}
                  overviewHref="/conditions"
                  overviewLabel={t('allConditions')}
                  description={t('conditionsDescription')}
                  image="https://images.unsplash.com/photo-1570172619644-dfd40ed531fb?w=1000&q=80"
                  items={skinConditionMegaMenuItems}
                />
              ) : null}
            </nav>

            <Link
              href="/book"
              className="w-24 rounded-md border border-[#d9cec1] bg-[#f7f2eb] px-4 py-2 text-center text-xs uppercase tracking-[0.15em] text-[#241f1b] transition-colors hover:bg-[#241f1b] hover:text-white"
            >
              {t('book', { defaultValue: 'Book' })}
            </Link>
          </div>

          <div className="flex items-center justify-between md:hidden">
            <Link href="/" className="font-serif text-xl tracking-tight text-[#1c1c1c]">
              {siteConfig.name}
            </Link>
            <button onClick={() => setIsMenuOpen(true)} className="p-2 text-[#1c1c1c]" aria-label={t('openMenu')}>
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
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="font-serif text-3xl tracking-tight text-[#1c1c1c]">
                  {siteConfig.name}
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
                <nav className="space-y-6">
                  <span className="mb-6 block text-xs uppercase tracking-[0.4em] text-stone-400">{t('menu')}</span>
                  <Link href="/treatments" onClick={() => setIsMenuOpen(false)} className="block text-3xl font-serif font-light text-stone-900 transition-colors hover:text-[#8d6f58]">
                    {t('treatments', { defaultValue: 'Treatments' })}
                  </Link>
                  <Link href="/conditions" onClick={() => setIsMenuOpen(false)} className="block text-3xl font-serif font-light text-stone-900 transition-colors hover:text-[#8d6f58]">
                    {t('conditions', { defaultValue: 'Skin Conditions' })}
                  </Link>
                  <Link href="/pricelist" onClick={() => setIsMenuOpen(false)} className="block text-3xl font-serif font-light text-stone-900 transition-colors hover:text-[#8d6f58]">
                    {t('pricelist', { defaultValue: 'Pricelist' })}
                  </Link>
                  <Link href="/offers" onClick={() => setIsMenuOpen(false)} className="block text-3xl font-serif font-light text-stone-900 transition-colors hover:text-[#8d6f58]">
                    {t('offers', { defaultValue: 'Offers' })}
                  </Link>
                  <Link href="/international-clients" onClick={() => setIsMenuOpen(false)} className="block text-3xl font-serif font-light text-stone-900 transition-colors hover:text-[#8d6f58]">
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
