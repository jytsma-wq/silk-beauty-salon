'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { siteConfig } from '@/data/site-config';
import { motion, AnimatePresence } from 'framer-motion';
import { baseTreatmentCategories } from '@/data/treatments';
import { baseConditions } from '@/data/conditions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function GaldermaHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const t = useTranslations('nav');
  const locale = useLocale();

  // Scroll behavior - hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/hide based on scroll direction
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
      {/* ── Top Bar (Darker White/Warm Beige) ── */}
      <motion.div
        className={`fixed top-0 left-0 right-0 z-50 bg-[#f7f4f0] border-b border-[#e8e4df] transition-all duration-300 ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        }`}
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-2 flex items-center justify-between text-xs">
          {/* Left: Top Navigation (About & Contact) */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href={`/${locale}/about`}
              className="uppercase tracking-[0.15em] text-stone-600 hover:text-[#b5453a] transition-colors"
            >
              {t('about', { defaultValue: 'About' })}
            </Link>
            <Link
              href={`/${locale}/contact-us`}
              className="uppercase tracking-[0.15em] text-stone-600 hover:text-[#b5453a] transition-colors"
            >
              {t('contact', { defaultValue: 'Contact Us' })}
            </Link>
          </nav>

          {/* Mobile: Just phone */}
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="md:hidden flex items-center gap-2 text-stone-600 hover:text-[#b5453a] transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{siteConfig.contact.phone}</span>
          </a>

          {/* Right: Language Switcher */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
          </div>
        </div>
      </motion.div>

      {/* ── Main Header (White) ── */}
      <motion.header
        className={`fixed left-0 right-0 z-40 bg-white border-b border-[#e8e4df] transition-all duration-300 ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        }`}
        style={{ top: '40px' }}
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -140 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          {/* Logo - Centered */}
          <div className="flex justify-center mb-4">
            <Link
              href={`/${locale}`}
              className="font-serif text-2xl tracking-tight text-[#1c1c1c] hover:text-[#b5453a] transition-colors"
            >
              {siteConfig.name}
            </Link>
          </div>

          {/* Main Navigation - Under Logo with Book button on right */}
          <div className="hidden md:flex items-center justify-between">
            {/* Left spacer for balance */}
            <div className="w-24" />

            {/* Center Navigation */}
            <nav
              aria-label={t('mainNavigation', { defaultValue: 'Main navigation' })}
              className="flex items-center justify-center gap-10"
            >
              {/* Treatments Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-stone-700 hover:text-[#b5453a] transition-colors outline-none">
                  {t('treatments', { defaultValue: 'Treatments' })}
                  <ChevronDown className="w-3 h-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href={`/${locale}/treatments`} className="cursor-pointer font-medium">
                      {t('allTreatments', { defaultValue: 'All Treatments' })}
                    </Link>
                  </DropdownMenuItem>
                  <div className="h-px bg-stone-200 my-1" />
                  {baseTreatmentCategories.map((category: { slug: string; name: string }) => (
                    <DropdownMenuItem key={category.slug} asChild>
                      <Link
                        href={`/${locale}/treatments#${category.slug}`}
                        className="cursor-pointer text-sm"
                      >
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Conditions Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-stone-700 hover:text-[#b5453a] transition-colors outline-none">
                  {t('conditions', { defaultValue: 'Skin Conditions' })}
                  <ChevronDown className="w-3 h-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href={`/${locale}/conditions`} className="cursor-pointer font-medium">
                      {t('allConditions', { defaultValue: 'All Conditions' })}
                    </Link>
                  </DropdownMenuItem>
                  <div className="h-px bg-stone-200 my-1" />
                  {baseConditions.slice(0, 6).map((condition: { slug: string; name: string }) => (
                    <DropdownMenuItem key={condition.slug} asChild>
                      <Link
                        href={`/${locale}/conditions/${condition.slug}`}
                        className="cursor-pointer text-sm"
                      >
                        {condition.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href={`/${locale}/pricelist`}
                className="text-xs uppercase tracking-[0.2em] text-stone-700 hover:text-[#b5453a] transition-colors"
              >
                {t('pricelist', { defaultValue: 'Pricelist' })}
              </Link>
              <Link
                href={`/${locale}/offers`}
                className="text-xs uppercase tracking-[0.2em] text-stone-700 hover:text-[#b5453a] transition-colors"
              >
                {t('offers', { defaultValue: 'Offers' })}
              </Link>
              <Link
                href={`/${locale}/international-clients`}
                className="text-xs uppercase tracking-[0.2em] text-stone-700 hover:text-[#b5453a] transition-colors"
              >
                {t('international', { defaultValue: 'International Clients' })}
              </Link>
            </nav>

            {/* Right: Book Button */}
            <Link
              href={`/${locale}/book`}
              className="w-24 px-4 py-2 bg-[#b5453a] text-white text-xs uppercase tracking-[0.15em] text-center hover:bg-[#8e3229] transition-colors"
            >
              {t('book', { defaultValue: 'Book' })}
            </Link>
          </div>

          {/* Mobile: Logo + Menu Button Row */}
          <div className="flex md:hidden items-center justify-between">
            <Link
              href={`/${locale}`}
              className="font-serif text-xl tracking-tight text-[#1c1c1c]"
            >
              {siteConfig.name}
            </Link>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 text-[#1c1c1c]"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" strokeWidth={1} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Full-Screen Menu Overlay ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-[#f7f4f0] z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 text-4xl font-light text-stone-900 hover:text-stone-600 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-8 h-8" strokeWidth={1} />
            </button>

            {/* Menu content - updated structure */}
            <div className="max-w-5xl w-full px-8">
              {/* Logo in mobile menu */}
              <div className="text-center mb-12">
                <Link
                  href={`/${locale}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-serif text-3xl tracking-tight text-[#1c1c1c]"
                >
                  {siteConfig.name}
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                {/* Left column - main nav (5 items under logo) */}
                <nav className="space-y-6">
                  <span className="text-xs uppercase tracking-[0.4em] text-stone-400 mb-6 block">
                    Menu
                  </span>

                  <Link
                    href={`/${locale}/treatments`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-3xl font-serif font-light text-stone-900 hover:text-[#b5453a] transition-colors"
                  >
                    {t('treatments', { defaultValue: 'Treatments' })}
                  </Link>

                  <Link
                    href={`/${locale}/conditions`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-3xl font-serif font-light text-stone-900 hover:text-[#b5453a] transition-colors"
                  >
                    {t('conditions', { defaultValue: 'Skin Conditions' })}
                  </Link>

                  <Link
                    href={`/${locale}/pricelist`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-3xl font-serif font-light text-stone-900 hover:text-[#b5453a] transition-colors"
                  >
                    {t('pricelist', { defaultValue: 'Pricelist' })}
                  </Link>

                  <Link
                    href={`/${locale}/offers`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-3xl font-serif font-light text-stone-900 hover:text-[#b5453a] transition-colors"
                  >
                    {t('offers', { defaultValue: 'Offers' })}
                  </Link>

                  <Link
                    href={`/${locale}/international-clients`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-3xl font-serif font-light text-stone-900 hover:text-[#b5453a] transition-colors"
                  >
                    {t('international', { defaultValue: 'International Clients' })}
                  </Link>
                </nav>

                {/* Right column - top bar items + quick links */}
                <div>
                  <span className="text-xs uppercase tracking-[0.4em] text-stone-400 mb-6 block">
                    More
                  </span>

                  <nav className="space-y-4 mb-8">
                    <Link
                      href={`/${locale}/about`}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg text-stone-700 hover:text-[#b5453a] transition-colors"
                    >
                      {t('about', { defaultValue: 'About' })}
                    </Link>
                    <Link
                      href={`/${locale}/contact-us`}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg text-stone-700 hover:text-[#b5453a] transition-colors"
                    >
                      {t('contact', { defaultValue: 'Contact Us' })}
                    </Link>
                    <Link
                      href={`/${locale}/faq`}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg text-stone-700 hover:text-[#b5453a] transition-colors"
                    >
                      {t('faq', { defaultValue: 'FAQ' })}
                    </Link>
                    <Link
                      href={`/${locale}/blog`}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg text-stone-700 hover:text-[#b5453a] transition-colors"
                    >
                      {t('blog', { defaultValue: 'Journal' })}
                    </Link>
                  </nav>

                  {/* Contact info */}
                  <div className="mt-16">
                    <span className="text-xs uppercase tracking-[0.4em] text-stone-400 mb-4 block">
                      {t('visitUs', { defaultValue: 'Visit Us' })}
                    </span>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {siteConfig.contact.address}<br />
                      {siteConfig.contact.city}, {siteConfig.contact.country} {siteConfig.contact.postcode}
                    </p>
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="block mt-4 text-sm text-stone-900 hover:underline"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/${locale}/book`}
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-12 block w-full py-5 bg-stone-900 text-stone-50 text-center text-sm uppercase tracking-widest hover:bg-stone-800 transition-colors"
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
