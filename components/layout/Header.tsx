'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X, Sparkles, Globe } from 'lucide-react';
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
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const navLinks = [
    { href: '/treatments', label: t('treatments') },
    { href: '/specialists', label: t('specialists') },
    { href: '/about', label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  // International link with special styling
  const internationalLink = { href: '/international', label: t('international') };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 shadow-sm backdrop-blur-md border-b border-gray-100' 
          : 'bg-white border-b border-transparent'
      }`}
    >
      <div className="container mx-auto max-w-7xl px-6">
        {/* Top bar - Galderma style */}
        <div className="hidden md:flex items-center justify-between py-2 text-xs text-gray-500 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <span>Batumi, Georgia</span>
            <span>•</span>
            <span>+995 599 123 456</span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Main navigation */}
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-105"
              style={{ 
                background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                boxShadow: '0 2px 8px rgba(20, 184, 166, 0.3)'
              }}
            >
              <Sparkles size={18} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-accent font-semibold tracking-wider text-sm uppercase text-gray-900">
                Silk Beauty
              </span>
              <span className="text-[10px] text-gray-500 tracking-wider uppercase hidden sm:block">
                Aesthetic Clinic
              </span>
            </div>
          </Link>

          {/* Desktop nav - Galderma style */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const href = `/${locale}${link.href}`;
              const active = pathname === href;
              return (
                <Link
                  key={link.href}
                  href={href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
                    active
                      ? 'text-teal-600 bg-teal-50'
                      : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            
            {/* International Clients */}
            <Link
              href={`/${locale}${internationalLink.href}`}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-all rounded-md ${
                pathname === `/${locale}${internationalLink.href}`
                  ? 'text-teal-600 bg-teal-50'
                  : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
              }`}
            >
              <Globe size={14} />
              {internationalLink.label}
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Mobile language switcher */}
            <div className="md:hidden">
              <LanguageSwitcher />
            </div>
            
            {/* Book Now CTA - Teal button */}
            <Link
              href={`/${locale}/contact`}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
              style={{ 
                background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                boxShadow: '0 2px 12px rgba(20, 184, 166, 0.3)'
              }}
            >
              {t('bookNow')}
            </Link>
            
            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-teal-600 hover:bg-gray-50 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="container mx-auto max-w-7xl px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === `/${locale}${link.href}`
                    ? 'text-teal-600 bg-teal-50'
                    : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* International link in mobile */}
            <Link
              href={`/${locale}${internationalLink.href}`}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === `/${locale}${internationalLink.href}`
                  ? 'text-teal-600 bg-teal-50'
                  : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
              }`}
            >
              <Globe size={16} />
              {internationalLink.label}
            </Link>
            
            <div className="pt-4 mt-4 border-t border-gray-100">
              <Link
                href={`/${locale}/contact`}
                className="block w-full text-center py-3 rounded-full text-sm font-semibold text-white"
                style={{ 
                  background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                }}
              >
                {t('bookNow')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
