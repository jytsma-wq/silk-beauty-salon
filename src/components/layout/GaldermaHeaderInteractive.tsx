'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { getLocalizedTreatmentCategories } from '@/data/treatments';
import { getLocalizedConditions } from '@/data/conditions';

export function GaldermaHeaderInteractive() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const t = useTranslations('nav');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

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
              href="/about"
              className="uppercase tracking-[0.15em] text-stone-600 hover:text-[#b5453a] transition-colors"
            >
              {t('about', { defaultValue: 'About' })}
            </Link>
            <Link
              href="/contact-us"
              className="uppercase tracking-[0.15em] text-stone-600 hover:text-[#b5453a] transition-colors"
            >
              {t('contact', { defaultValue: 'Contact Us' })}
            </Link>
          </nav>

          {/* Right: Language & Theme */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        {/* ── Main Navigation Bar ── */}
        <div className="border-t border-[#e8e4df] bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#b5453a] rounded-full flex items-center justify-center">
                    <span className="text-white font-serif text-lg">S</span>
                  </div>
                  <span className="font-serif text-xl text-[#241f1b]">Silk Beauty</span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-8">
                {/* Treatments Mega Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Link
                      href="/treatments"
                      className="text-sm font-medium uppercase tracking-[0.15em] text-[#241f1b] hover:text-[#b5453a] transition-colors"
                    >
                      {t('treatments', { defaultValue: 'Treatments' })}
                    </Link>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {getLocalizedTreatmentCategories(locale).then((categories) =>
                      categories.map((category) => (
                        <DropdownMenuSub key={category.slug}>
                          <DropdownMenuSubTrigger asChild>
                            <Link
                              href={`/treatments/${category.slug}`}
                              className="text-sm font-medium uppercase tracking-[0.15em] text-[#241f1b] hover:text-[#b5453a] transition-colors"
                            >
                              {category.name}
                            </Link>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            {category.treatments.slice(0, 6).map((treatment) => (
                              <DropdownMenuItem key={treatment.slug} asChild>
                                <Link
                                  href={`/treatments/${treatment.slug}`}
                                  className="block px-4 py-2 text-sm text-[#241f1b] hover:text-[#b5453a] transition-colors"
                                >
                                  {treatment.name}
                                </Link>
                              </DropdownMenuItem>
                            ))}
                            {category.treatments.length > 6 && (
                              <DropdownMenuItem asChild>
                                <Link
                                  href={`/treatments/${category.slug}`}
                                  className="block px-4 py-2 text-sm text-[#241f1b] hover:text-[#b5453a] transition-colors"
                                >
                                  View all {category.name}
                                </Link>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                      ))}
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Conditions Mega Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Link
                      href="/conditions"
                      className="text-sm font-medium uppercase tracking-[0.15em] text-[#241f1b] hover:text-[#b5453a] transition-colors"
                    >
                      {t('conditions', { defaultValue: 'Conditions' })}
                    </Link>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {getLocalizedConditions(locale).then((conditions) =>
                      conditions.slice(0, 6).map((condition) => (
                        <DropdownMenuItem key={condition.slug} asChild>
                          <Link
                            href={`/conditions/${condition.slug}`}
                            className="block px-4 py-2 text-sm text-[#241f1b] hover:text-[#b5453a] transition-colors"
                          >
                            {condition.name}
                          </Link>
                        </DropdownMenuItem>
                      ))
                    )}
                    {getLocalizedConditions(locale).then((conditions) =>
                      conditions.length > 6 && (
                        <DropdownMenuItem asChild>
                          <Link
                            href="/conditions"
                            className="block px-4 py-2 text-sm text-[#241f1b] hover:text-[#b5453a] transition-colors"
                          >
                            View all conditions
                          </Link>
                        </DropdownMenuItem>
                      )
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link
                  href="/offers"
                  className="text-sm font-medium uppercase tracking-[0.15em] text-[#241f1b] hover:text-[#b5453a] transition-colors"
                >
                  {t('offers', { defaultValue: 'Offers' })}
                </Link>

                <Link
                  href="/international-clients"
                  className="text-sm font-medium uppercase tracking-[0.15em] text-[#241f1b] hover:text-[#b5453a] transition-colors"
                >
                  {t('internationalClients', { defaultValue: 'International Clients' })}
                </Link>
              </nav>

                <Link
                  href="/booking"
                  className="inline-flex h-10 items-center rounded-md border border-[#b5453a] px-6 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#b5453a] transition-colors hover:bg-[#b5453a] hover:text-white"
                >
                  {t('bookConsultation', { defaultValue: 'Book Consultation' })}
                </Link>
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-md text-[#241f1b] hover:bg-[#f7f4f0] transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Navigation - Simple Sheet */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#b5453a] rounded-full flex items-center justify-center">
                  <span className="text-white font-serif text-lg">S</span>
                </div>
                <span className="font-serif text-xl text-[#241f1b]">Silk Beauty</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-md text-[#241f1b] hover:bg-[#f7f4f0] transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="p-4 space-y-4">
              {/* Treatments Mobile Menu */}
              <div className="space-y-2">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full text-left px-4 py-2 text-sm font-medium uppercase tracking-[0.15em] text-[#241f1b] hover:text-[#b5453a] transition-colors"
                >
                  {t('treatments', { defaultValue: 'Treatments' })}
                  <ChevronDown className="ml-auto h-4 w-4 inline" />
                </button>
                <div className="pl-4 space-y-2">
                  {getLocalizedTreatmentCategories(locale).then((categories) =>
                    categories.slice(0, 6).map((category) => (
                      <Link
                        key={category.slug}
                        href={`/treatments/${category.slug}`}
                        className="block px-4 py-2 text-sm text-[#241f1b] hover:text-[#b5453a] transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))
                  )}
                  <Link
                    href="/treatments"
                    className="block px-4 py-2 text-sm text-[#241f1b] hover:text-[#b5453a] transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    View all treatments
                  </Link>
                </div>
              </div>

              {/* Conditions Mobile Menu */}
              <Link
                href="/"
                className="block text-lg font-medium text-[#241f1b] hover:text-[#b5453a] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('home', { defaultValue: 'Home' })}
              </Link>
              <Link
                href="/treatments"
                className="block text-lg font-medium text-[#241f1b] hover:text-[#b5453a] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('treatments', { defaultValue: 'Treatments' })}
              </Link>
              <Link
                href="/conditions"
                className="block text-lg font-medium text-[#241f1b] hover:text-[#b5453a] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('conditions', { defaultValue: 'Conditions' })}
              </Link>
              <Link
                href="/about"
                className="block text-lg font-medium text-[#241f1b] hover:text-[#b5453a] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('about', { defaultValue: 'About' })}
              </Link>
              <Link
                href="/contact-us"
                className="block text-lg font-medium text-[#241f1b] hover:text-[#b5453a] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('contact', { defaultValue: 'Contact Us' })}
              </Link>
              <div className="pt-4 border-t">
                <Link
                  href="/booking"
                  className="block w-full text-center h-12 items-center rounded-md bg-[#b5453a] px-6 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#a03d34]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('bookConsultation', { defaultValue: 'Book Consultation' })}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
