'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { useLocale } from '@/hooks/useLocale';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale } = useLocale();
  const pathname = usePathname();
  const t = useTranslations('nav');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { 
    queueMicrotask(() => {
      setMobileOpen(false);
    });
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navLinks = [
    { href: '/treatments', label: t('treatments') },
    { href: '/specialists', label: t('specialists') },
    { href: '/about', label: t('about') },
    { href: '/international', label: t('international') },
    { href: '/download', label: 'Download App' },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-elegant ${
          scrolled 
            ? 'bg-white/80 shadow-soft backdrop-blur-sm' 
            : 'bg-surface-0'
        }`}
      >
        <div className="container mx-auto max-w-7xl px-6 lg:px-12">
          {/* Top Row: Language | Logo | Book CTA */}
          <div className="h-20 lg:h-24 flex items-center justify-between py-6 relative">
            {/* Left: Language Switcher */}
            <div className="hidden lg:flex items-center flex-1">
              <LanguageSwitcher />
            </div>

            {/* Center: Logo - SILK BEAUTY SALON */}
            <Link 
              href={`/${locale}`} 
              className="flex items-center justify-center group absolute left-1/2 -translate-x-1/2"
            >
              <span className="font-display text-2xl lg:text-4xl tracking-[0.05em] text-gray-900 transition-colors group-hover:text-gold-500 whitespace-nowrap">
                SILK BEAUTY SALON
              </span>
            </Link>

            {/* Right: Book CTA */}
            <div className="hidden lg:flex items-center flex-1 justify-end">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center bg-transparent py-3 px-8 border border-gold-400 rounded-sm text-button uppercase tracking-[0.2em] text-gold-600 transition-all duration-500 hover:bg-gold-50 hover:text-gold-700"
              >
                {t('bookNow') || 'Book Consultation'}
              </Link>
            </div>

            {/* Mobile: Menu toggle */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-gold-500 transition-colors duration-300 ml-auto"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>

          {/* Bottom Row: Navigation Menu UNDER the logo */}
          <nav className="hidden lg:flex items-center justify-center gap-10 pb-4">
            {navLinks.map((link) => {
              const href = `/${locale}${link.href}`;
              const active = pathname === href;
              return (
                <Link
                  key={link.href}
                  href={href}
                  className={`group relative text-body-sm font-sans uppercase tracking-[0.15em] transition-all duration-500 ${
                    active
                      ? 'text-gold-500'
                      : 'text-gray-900 hover:text-gold-500'
                  }`}
                >
                  {link.label}
                  {/* Subtle underline on hover */}
                  <span className={`absolute -bottom-1 left-0 h-px bg-gold-400 transition-all duration-500 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-surface-0 transition-all duration-500 ease-elegant lg:hidden ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="container mx-auto max-w-7xl px-6 h-full flex flex-col">
          {/* Mobile menu header */}
          <div className="h-20 lg:h-24 flex items-center justify-between py-6">
            <Link href={`/${locale}`} className="font-display text-2xl tracking-[0.05em] text-gray-900">
              SILK BEAUTY SALON
            </Link>
            <button
              className="p-2 text-gray-600 hover:text-gold-500 transition-colors duration-300"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Mobile navigation links - large display-2 */}
          <nav className="flex-1 flex flex-col justify-center items-center gap-8">
            {navLinks.map((link, index) => {
              const href = `/${locale}${link.href}`;
              const active = pathname === href;
              return (
                <Link
                  key={link.href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`display-2 font-display tracking-[0.05em] transition-all duration-500 ${
                    active
                      ? 'text-gold-500'
                      : 'text-gray-900 hover:text-gold-500'
                  }`}
                  style={{ 
                    transitionDelay: mobileOpen ? `${index * 50}ms` : '0ms'
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile footer with CTA */}
          <div className="py-8 flex flex-col items-center gap-6">
            <LanguageSwitcher />
            <Link
              href={`/${locale}/contact`}
              onClick={() => setMobileOpen(false)}
              className="w-full max-w-xs text-center bg-transparent py-3 px-8 border border-gold-400 rounded-sm text-button uppercase tracking-[0.2em] text-gold-600 transition-all duration-500 hover:bg-gold-50 hover:text-gold-700"
            >
              {t('bookNow') || 'Book Consultation'}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
