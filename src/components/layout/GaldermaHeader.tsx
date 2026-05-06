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
import { baseConditions } from '@/data/conditions';

type MegaMenuItem = {
  title: string;
  href: string;
  description: string;
};

const treatmentMegaMenuItems: MegaMenuItem[] = [
  {
    title: 'Botox',
    href: '/treatments/category/botox',
    description: 'Anti-wrinkle injections and targeted medical Botox treatments.',
  },
  {
    title: 'Dermal fillers',
    href: '/treatments/category/dermal-fillers',
    description: 'Lip, cheek, chin, jawline, and facial balancing treatments.',
  },
  {
    title: 'Skin treatments',
    href: '/treatments/category/skin-treatments',
    description: 'Clinical facials, peels, hydration, and skin-quality protocols.',
  },
  {
    title: 'Laser treatments',
    href: '/treatments/category/laser-treatments',
    description: 'Laser-led resurfacing, pigmentation, and collagen-renewal care.',
  },
  {
    title: 'Hair and hair extensions',
    href: '/treatments/category/hair-and-hair-extensions',
    description: 'Hair restoration consultations and tailored scalp treatment plans.',
  },
  {
    title: 'Nails',
    href: '/treatments/category/nails',
    description: 'Book a salon consultation for manicure, pedicure, and nail services.',
  },
  {
    title: 'Lashes',
    href: '/treatments/category/lashes',
    description: 'Book lash appointments for lifts, styling, and beauty finishing services.',
  },
];

const skinConditionMegaMenuItems: MegaMenuItem[] = [
  {
    title: 'All',
    href: '/conditions',
    description: 'See the full condition library and recommended treatment pathways.',
  },
  ...baseConditions.map((condition) => ({
    title: condition.name,
    href: `/conditions/${condition.slug}`,
    description: condition.shortDescription,
  })),
];

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
      <div className="overflow-hidden rounded-[8px] border border-[#e8e4df] bg-[#fbf8f4] shadow-[0_24px_70px_rgba(36,31,27,0.12)]">
        <div className="grid lg:grid-cols-[320px_1fr]">
          <div className="border-r border-[#e8e4df] bg-white">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={image}
                alt=""
                fill
                className="object-cover"
                sizes="320px"
              />
            </div>
            <div className="p-8">
              <p className="mb-3 text-[0.68rem] uppercase tracking-[0.24em] text-[#8d6f58]">
                {eyebrow}
              </p>
              <h3 className="font-sans text-4xl font-light leading-[1.02] text-[#241f1b]">
                {title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-stone-600">
                {description}
              </p>
              <Link
                href={overviewHref}
                className="mt-8 inline-flex h-11 items-center rounded-md border border-[#241f1b] px-6 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#241f1b] transition-colors hover:bg-[#241f1b] hover:text-white"
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
                  <p className="mt-3 text-sm leading-6 text-stone-600">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GaldermaHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'treatments' | 'conditions' | null>(null);
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

          {/* Mobile: Just phone */}
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="md:hidden flex items-center gap-2 text-stone-600 hover:text-[#b5453a] transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{siteConfig.contact.phone}</span>
          </a>

          {/* Right: Language Switcher & Theme Toggle */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
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
              href="/"
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
              className="relative flex items-center justify-center gap-10"
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <div
                onMouseEnter={() => setActiveMegaMenu('treatments')}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-stone-700 transition-colors hover:text-[#b5453a] outline-none"
                  aria-expanded={activeMegaMenu === 'treatments'}
                >
                  {t('treatments', { defaultValue: 'Treatments' })}
                  <ChevronDown className="h-3 w-3" />
                </button>
              </div>

              <div
                onMouseEnter={() => setActiveMegaMenu('conditions')}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 text-xs uppercase tracking-[0.2em] text-stone-700 transition-colors hover:text-[#b5453a] outline-none"
                  aria-expanded={activeMegaMenu === 'conditions'}
                >
                  {t('conditions', { defaultValue: 'Skin Conditions' })}
                  <ChevronDown className="h-3 w-3" />
                </button>
              </div>

              <Link
                href="/pricelist"
                className="text-xs uppercase tracking-[0.2em] text-stone-700 hover:text-[#b5453a] transition-colors"
              >
                {t('pricelist', { defaultValue: 'Pricelist' })}
              </Link>
              <Link
                href="/offers"
                className="text-xs uppercase tracking-[0.2em] text-stone-700 hover:text-[#b5453a] transition-colors"
              >
                {t('offers', { defaultValue: 'Offers' })}
              </Link>
              <Link
                href="/international-clients"
                className="text-xs uppercase tracking-[0.2em] text-stone-700 hover:text-[#b5453a] transition-colors"
              >
                {t('international', { defaultValue: 'International Clients' })}
              </Link>

              {activeMegaMenu === 'treatments' ? (
                <MegaMenuPanel
                  eyebrow="Treatments"
                  title="Aesthetic treatments"
                  overviewHref="/treatments"
                  overviewLabel="Treatments overview"
                  description="A wide treatment portfolio with a Galderma-style editorial layout: clear categories, clinical framing, and direct pathways into consultation."
                  image="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1000&q=80"
                  items={treatmentMegaMenuItems}
                />
              ) : null}

              {activeMegaMenu === 'conditions' ? (
                <MegaMenuPanel
                  eyebrow="Skin concerns"
                  title="Skin conditions"
                  overviewHref="/conditions"
                  overviewLabel="Skin concerns overview"
                  description="Explore the main conditions treated at the clinic, then move directly into the most relevant aesthetic pathway."
                  image="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1000&q=80"
                  items={skinConditionMegaMenuItems}
                />
              ) : null}
            </nav>

            {/* Right: Book Button */}
            <Link
              href="/book"
              className="w-24 rounded-md border border-[#d8cbbb] bg-[#f3ece3] px-4 py-2 text-[#241f1b] text-xs uppercase tracking-[0.15em] text-center transition-colors hover:bg-[#e7ddd1]"
            >
              {t('book', { defaultValue: 'Book' })}
            </Link>
          </div>

          {/* Mobile: Logo + Menu Button Row */}
          <div className="flex md:hidden items-center justify-between">
            <Link
              href="/"
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
                  href="/"
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
                    href="/treatments"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-3xl font-serif font-light text-stone-900 hover:text-[#b5453a] transition-colors"
                  >
                    {t('treatments', { defaultValue: 'Treatments' })}
                  </Link>

                  <Link
                    href="/conditions"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-3xl font-serif font-light text-stone-900 hover:text-[#b5453a] transition-colors"
                  >
                    {t('conditions', { defaultValue: 'Skin Conditions' })}
                  </Link>

                  <Link
                    href="/pricelist"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-3xl font-serif font-light text-stone-900 hover:text-[#b5453a] transition-colors"
                  >
                    {t('pricelist', { defaultValue: 'Pricelist' })}
                  </Link>

                  <Link
                    href="/offers"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-3xl font-serif font-light text-stone-900 hover:text-[#b5453a] transition-colors"
                  >
                    {t('offers', { defaultValue: 'Offers' })}
                  </Link>

                  <Link
                    href="/international-clients"
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
                      href="/about"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg text-stone-700 hover:text-[#b5453a] transition-colors"
                    >
                      {t('about', { defaultValue: 'About' })}
                    </Link>
                    <Link
                      href="/contact-us"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg text-stone-700 hover:text-[#b5453a] transition-colors"
                    >
                      {t('contact', { defaultValue: 'Contact Us' })}
                    </Link>
                    <Link
                      href="/faq"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-lg text-stone-700 hover:text-[#b5453a] transition-colors"
                    >
                      {t('faq', { defaultValue: 'FAQ' })}
                    </Link>
                    <Link
                      href="/blog"
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
                    href="/book"
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-12 block w-full rounded-md border border-[#d8cbbb] bg-[#f3ece3] py-5 text-center text-sm uppercase tracking-widest text-[#241f1b] transition-colors hover:bg-[#e7ddd1]"
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
