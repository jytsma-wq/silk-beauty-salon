'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { Menu, X } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { siteConfig } from '@/data/site-config';
import { motion, AnimatePresence } from 'framer-motion';

export function GaldermaHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

      // Track if scrolled for styling
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* ── Floating Minimal Header ── */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'backdrop-blur-md bg-stone-50/90'
            : 'bg-transparent'
        }`}
        initial={{ y: 0 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <nav aria-label={t('mainNavigation', { defaultValue: 'Main navigation' })} className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex items-center justify-between">
          {/* Left: Minimal Logo */}
          <Link href={`/${locale}`} className="font-serif text-xl tracking-tight text-stone-900">
            {siteConfig.name}
          </Link>

          {/* Center: Main nav (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-12">
            <Link
              href={`/${locale}/treatments`}
              className="text-sm uppercase tracking-[0.2em] text-stone-700 hover:text-stone-900 transition-colors"
            >
              {t('treatments', { defaultValue: 'Treatments' })}
            </Link>
            <Link
              href={`/${locale}/gallery`}
              className="text-sm uppercase tracking-[0.2em] text-stone-700 hover:text-stone-900 transition-colors"
            >
              {t('gallery', { defaultValue: 'Gallery' })}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="text-sm uppercase tracking-[0.2em] text-stone-700 hover:text-stone-900 transition-colors"
            >
              {t('about', { defaultValue: 'About' })}
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-6">
            {/* Language selector - minimal */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* Book CTA - minimal */}
            <Link
              href={`/${locale}/book`}
              className="hidden sm:block px-6 py-3 border border-stone-900 text-xs uppercase tracking-[0.2em] text-stone-900 hover:bg-stone-900 hover:text-stone-50 transition-all duration-300"
            >
              {t('book', { defaultValue: 'Book' })}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 text-stone-900"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" strokeWidth={1} />
            </button>
          </div>
        </nav>
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

            {/* Menu content - magazine contents style */}
            <div className="max-w-5xl w-full px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                {/* Left column - main nav */}
                <nav className="space-y-8">
                  <div>
                    <span className="text-xs uppercase tracking-[0.4em] text-stone-400 mb-6 block">
                      Explore
                    </span>

                    <Link
                      href={`/${locale}/treatments`}
                      onClick={() => setIsMenuOpen(false)}
                      className="block group"
                    >
                      <h2 className="text-5xl md:text-6xl font-serif font-light text-stone-900 group-hover:text-stone-600 transition-colors mb-2">
                        {t('treatments', { defaultValue: 'Treatments' })}
                      </h2>
                      <p className="text-sm text-stone-500">
                        {t('treatmentsDescription', { defaultValue: 'Browse our premium aesthetic services' })}
                      </p>
                    </Link>
                  </div>

                  <Link
                    href={`/${locale}/gallery`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block group"
                  >
                    <h2 className="text-5xl md:text-6xl font-serif font-light text-stone-900 group-hover:text-stone-600 transition-colors mb-2">
                      {t('gallery', { defaultValue: 'Gallery' })}
                    </h2>
                    <p className="text-sm text-stone-500">
                      {t('galleryDescription', { defaultValue: 'View real patient results' })}
                    </p>
                  </Link>

                  <Link
                    href={`/${locale}/about`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block group"
                  >
                    <h2 className="text-5xl md:text-6xl font-serif font-light text-stone-900 group-hover:text-stone-600 transition-colors mb-2">
                      {t('about', { defaultValue: 'About' })}
                    </h2>
                    <p className="text-sm text-stone-500">
                      {t('aboutDescription', { defaultValue: 'Meet our expert team' })}
                    </p>
                  </Link>
                </nav>

                {/* Right column - secondary */}
                <div>
                  <span className="text-xs uppercase tracking-[0.4em] text-stone-400 mb-6 block">
                    Quick Links
                  </span>

                  <nav className="space-y-4">
                    <Link
                      href={`/${locale}/contact-us`}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg text-stone-700 hover:text-stone-900"
                    >
                      {t('contact', { defaultValue: 'Contact' })}
                    </Link>
                    <Link
                      href={`/${locale}/faq`}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg text-stone-700 hover:text-stone-900"
                    >
                      {t('faq', { defaultValue: 'FAQ' })}
                    </Link>
                    <Link
                      href={`/${locale}/blog`}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg text-stone-700 hover:text-stone-900"
                    >
                      {t('blog', { defaultValue: 'Journal' })}
                    </Link>
                    <Link
                      href={`/${locale}/pricelist`}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg text-stone-700 hover:text-stone-900"
                    >
                      {t('pricelist', { defaultValue: 'Prices' })}
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
