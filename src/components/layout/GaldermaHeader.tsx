'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { motion, AnimatePresence } from 'framer-motion';

export function GaldermaHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const t = useTranslations('nav');

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
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex items-center justify-between">
          {/* Left: Minimal Logo */}
          <Link href="/" className="font-serif text-xl tracking-tight text-stone-900">
            Silk
          </Link>

          {/* Center: Main nav (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-12">
            <Link
              href="/treatments"
              className="text-sm uppercase tracking-[0.2em] text-stone-700 hover:text-stone-900 transition-colors"
            >
              {t('treatments', { defaultValue: 'Treatments' })}
            </Link>
            <Link
              href="/gallery"
              className="text-sm uppercase tracking-[0.2em] text-stone-700 hover:text-stone-900 transition-colors"
            >
              Gallery
            </Link>
            <Link
              href="/about"
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
              href="/book"
              className="hidden sm:block px-6 py-3 border border-stone-900 text-xs uppercase tracking-[0.2em] text-stone-900 hover:bg-stone-900 hover:text-stone-50 transition-all duration-300"
            >
              Book
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
                      href="/treatments"
                      onClick={() => setIsMenuOpen(false)}
                      className="block group"
                    >
                      <h2 className="text-5xl md:text-6xl font-serif font-light text-stone-900 group-hover:text-stone-600 transition-colors mb-2">
                        {t('treatments', { defaultValue: 'Treatments' })}
                      </h2>
                      <p className="text-sm text-stone-500">
                        Browse our premium aesthetic services
                      </p>
                    </Link>
                  </div>

                  <Link
                    href="/gallery"
                    onClick={() => setIsMenuOpen(false)}
                    className="block group"
                  >
                    <h2 className="text-5xl md:text-6xl font-serif font-light text-stone-900 group-hover:text-stone-600 transition-colors mb-2">
                      Gallery
                    </h2>
                    <p className="text-sm text-stone-500">
                      View real patient results
                    </p>
                  </Link>

                  <Link
                    href="/about"
                    onClick={() => setIsMenuOpen(false)}
                    className="block group"
                  >
                    <h2 className="text-5xl md:text-6xl font-serif font-light text-stone-900 group-hover:text-stone-600 transition-colors mb-2">
                      {t('about', { defaultValue: 'About' })}
                    </h2>
                    <p className="text-sm text-stone-500">
                      Meet our expert team
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
                      href="/contact-us"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg text-stone-700 hover:text-stone-900"
                    >
                      {t('contact', { defaultValue: 'Contact' })}
                    </Link>
                    <Link
                      href="/faq"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg text-stone-700 hover:text-stone-900"
                    >
                      FAQ
                    </Link>
                    <Link
                      href="/blog"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg text-stone-700 hover:text-stone-900"
                    >
                      Journal
                    </Link>
                    <Link
                      href="/pricelist"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg text-stone-700 hover:text-stone-900"
                    >
                      {t('pricelist', { defaultValue: 'Prices' })}
                    </Link>
                  </nav>

                  {/* Contact info */}
                  <div className="mt-16">
                    <span className="text-xs uppercase tracking-[0.4em] text-stone-400 mb-4 block">
                      Visit Us
                    </span>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      123 Rustaveli Avenue<br />
                      Batumi, Georgia 6010
                    </p>
                    <a
                      href="tel:+995555123456"
                      className="block mt-4 text-sm text-stone-900 hover:underline"
                    >
                      +995 555 123 456
                    </a>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/book"
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-12 block w-full py-5 bg-stone-900 text-stone-50 text-center text-sm uppercase tracking-widest hover:bg-stone-800 transition-colors"
                  >
                    Book Consultation
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
