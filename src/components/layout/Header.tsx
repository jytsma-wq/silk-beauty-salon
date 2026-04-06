'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/routing';
import { Menu, X, ChevronDown, Phone, ExternalLink, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/data/site-config';
import { getLocalizedTreatmentCategories } from '@/data/treatments';
import { getLocalizedConditions } from '@/data/conditions';
import type { TreatmentCategory, Treatment } from '@/data/treatments';
import type { Condition } from '@/data/conditions';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';

// Lazy load Sheet component (heavy Radix UI) - only loads on mobile viewports
const Sheet = lazy(() => import('@/components/ui/sheet').then(mod => ({ default: mod.Sheet })))
const SheetContent = lazy(() => import('@/components/ui/sheet').then(mod => ({ default: mod.SheetContent })))
const SheetTrigger = lazy(() => import('@/components/ui/sheet').then(mod => ({ default: mod.SheetTrigger })))

// Social Media Icon Components with brand colors
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );
}

export function Header() {
  const t = useTranslations('nav');
  const tHeader = useTranslations('header');
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingDropdownOpen, setBookingDropdownOpen] = useState(false);
  const [treatmentCategories, setTreatmentCategories] = useState<TreatmentCategory[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const categories = await getLocalizedTreatmentCategories(locale);
      const conds = await getLocalizedConditions(locale);
      setTreatmentCategories(categories);
      setConditions(conds);
      setIsLoading(false);
    };
    fetchData();
  }, [locale]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      name: t('treatments'),
      href: '/treatments',
      hasDropdown: true,
      dropdownContent: (
        <div className="grid grid-cols-3 gap-8 p-6 min-w-200">
          {treatmentCategories.map((category) => (
            <div key={category.slug}>
              <h3 className="font-serif text-lg font-semibold mb-3 text-primary">
                {category.name}
              </h3>
              <ul className="space-y-2">
                {category.treatments.slice(0, 5).map((treatment) => (
                  <li key={treatment.slug}>
                    <Link
                      href={`/treatments/${treatment.slug}`}
                      className="text-sm text-muted-foreground hover:text-gold transition-colors"
                    >
                      {treatment.name}
                    </Link>
                  </li>
                ))}
                {category.treatments.length > 5 && (
                  <li>
                    <Link
                      href={`/treatments#${category.slug}`}
                      className="text-sm font-medium text-gold hover:underline"
                    >
                      {tCommon('viewAll')} →
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      ),
    },
    {
      name: t('conditions'),
      href: '/conditions',
      hasDropdown: true,
      dropdownContent: (
        <div className="grid grid-cols-2 gap-6 p-6 min-w-125">
          {conditions.map((condition) => (
            <Link
              key={condition.slug}
              href={`/conditions/${condition.slug}`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-gold font-serif text-lg">
                  {condition.name.charAt(0)}
                </span>
              </div>
              <div>
                <span className="font-medium group-hover:text-gold transition-colors">
                  {condition.name}
                </span>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {condition.shortDescription}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ),
    },
    {
      name: t('about'),
      href: '/about',
      hasDropdown: true,
      dropdownContent: (
        <div className="p-6 min-w-62.5">
          <ul className="space-y-2">
            <li>
              <Link
                href="/about"
                className="block p-2 rounded hover:bg-secondary transition-colors hover:text-gold"
              >
                {t('team')}
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="block p-2 rounded hover:bg-secondary transition-colors hover:text-gold"
              >
                {t('blog')}
              </Link>
            </li>
          </ul>
        </div>
      ),
    },
    { name: t('pricelist'), href: '/pricelist', hasDropdown: false },
    { name: t('offers'), href: '/offers', hasDropdown: false },
    { name: t('beforeAfter'), href: '/before-after', hasDropdown: false },
    { name: t('contact'), href: '/contact-us', hasDropdown: false },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 text-sm hidden md:block">
        <div className="container-custom flex items-center justify-between">
          {/* Phone Number */}
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-2 text-white hover:text-gold transition-colors"
          >
            <Phone className="w-4 h-4" />
            {siteConfig.contact.phone}
          </a>
          {/* Social Media Icons */}
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 text-[#E4405F] hover:opacity-80 transition-opacity"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-6 h-6" />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 text-[#1877F2] hover:opacity-80 transition-opacity"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-6 h-6" />
            </a>
            <a
              href="https://www.tiktok.com/@silkbeautybatumi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 text-white hover:opacity-80 transition-opacity"
              aria-label="TikTok"
            >
              <TikTokIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Header - Logo Centered */}
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          isScrolled
            ? 'bg-white shadow-md py-2'
            : 'bg-white py-4'
        )}
      >
        <div className="container-custom">
          {/* Top Row: Language Left, Logo Center, Booking Right */}
          <div className="flex items-center justify-between mb-6 -ml-4">
            {/* Language Switcher - Left - styled like booking button - LARGER */}
            <div className="flex items-center">
              <div className="bg-gold hover:bg-gold/90 text-white rounded-md text-lg px-3 py-2">
                <LanguageSwitcher />
              </div>
            </div>

            {/* Logo - Centered - LARGER */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <span className="font-serif text-3xl md:text-4xl font-semibold text-primary tracking-tight">
                  Silk Beauty
                </span>
                <span className="text-sm md:text-base text-gold tracking-[0.2em] uppercase font-medium">
                  Salon
                </span>
              </div>
            </Link>

            {/* Book Appointment Button - Right - LARGER */}
            <div className="relative hidden md:block -mr-2">
              <a
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold flex items-center gap-2 text-lg px-6 py-3"
              >
                {t('bookAppointment')}
              </a>
            </div>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center justify-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1 px-5 py-3 text-lg font-medium text-primary hover:text-gold transition-colors',
                    item.hasDropdown && 'cursor-default'
                  )}
                >
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 transition-transform',
                        activeDropdown === item.name && 'rotate-180'
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2 animate-fadeIn">
                    <div className="bg-white shadow-xl rounded-lg border border-border overflow-hidden">
                      {item.dropdownContent}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu */}
          <div className="lg:hidden flex justify-end">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-75 sm:w-100 p-0">
                <MobileNav 
                  onClose={() => setMobileMenuOpen(false)} 
                  treatmentCategories={treatmentCategories}
                  conditions={conditions}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}

function MobileNav({ onClose, treatmentCategories, conditions }: { 
  onClose: () => void; 
  treatmentCategories: TreatmentCategory[];
  conditions: Condition[];
}) {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex flex-col">
          <span className="font-serif text-xl font-semibold text-primary">
            Silk Beauty
          </span>
          <span className="text-xs text-gold tracking-[0.2em] uppercase">
            Salon
          </span>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Navigation Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Treatments Section */}
        <div className="border-b">
          <button
            onClick={() => setExpandedCategory(expandedCategory === 'treatments' ? null : 'treatments')}
            className="w-full flex items-center justify-between p-4 font-medium hover:bg-secondary transition-colors"
          >
            {t('treatments')}
            <ChevronDown
              className={cn(
                'w-5 h-5 transition-transform',
                expandedCategory === 'treatments' && 'rotate-180'
              )}
            />
          </button>
          {expandedCategory === 'treatments' && (
            <div className="pb-4 px-4">
              {treatmentCategories.map((category) => (
                <div key={category.slug} className="mb-4">
                  <h4 className="font-serif text-sm font-semibold text-gold mb-2">
                    {category.name}
                  </h4>
                  <ul className="space-y-1">
                    {category.treatments.map((treatment) => (
                      <li key={treatment.slug}>
                        <Link
                          href={`/treatments/${treatment.slug}`}
                          onClick={onClose}
                          className="block py-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {treatment.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Conditions Section */}
        <div className="border-b">
          <button
            onClick={() => setExpandedCategory(expandedCategory === 'conditions' ? null : 'conditions')}
            className="w-full flex items-center justify-between p-4 font-medium hover:bg-secondary transition-colors"
          >
            {t('conditions')}
            <ChevronDown
              className={cn(
                'w-5 h-5 transition-transform',
                expandedCategory === 'conditions' && 'rotate-180'
              )}
            />
          </button>
          {expandedCategory === 'conditions' && (
            <div className="pb-4 px-4">
              <ul className="space-y-1">
                {conditions.map((condition) => (
                  <li key={condition.slug}>
                    <Link
                      href={`/conditions/${condition.slug}`}
                      onClick={onClose}
                      className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {condition.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Simple Links */}
        <Link
          href="/pricelist"
          onClick={onClose}
          className="block p-4 font-medium hover:bg-secondary transition-colors border-b"
        >
          {t('pricelist')}
        </Link>
        <Link
          href="/offers"
          onClick={onClose}
          className="block p-4 font-medium hover:bg-secondary transition-colors border-b"
        >
          {t('offers')}
        </Link>
        <Link
          href="/contact-us"
          onClick={onClose}
          className="block p-4 font-medium hover:bg-secondary transition-colors border-b"
        >
          {t('contact')}
        </Link>
        <Link
          href="/faq"
          onClick={onClose}
          className="block p-4 font-medium hover:bg-secondary transition-colors border-b"
        >
          {t('faq')}
        </Link>
      </div>

      {/* Footer */}
      <div className="p-4 border-t bg-secondary">
        <Button
          asChild
          className="w-full btn-gold"
        >
          <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
            {t('bookAppointment')}
          </a>
        </Button>
        <div className="mt-4 text-center">
          <a
            href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
            className="text-sm text-muted-foreground hover:text-gold transition-colors"
          >
            {siteConfig.contact.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
