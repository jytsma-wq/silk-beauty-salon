'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Menu, ChevronDown, ExternalLink, MessageCircle, Globe, Gift, CreditCard, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/data/site-config';
import { getLocalizedTreatmentCategories } from '@/data/treatments';
import { getLocalizedConditions } from '@/data/conditions';
import type { TreatmentCategory } from '@/data/treatments';
import type { Condition } from '@/data/conditions';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';

// Lazy load mobile menu sheet component (heavy Radix UI) - only loads on mobile
const MobileMenuSheet = lazy(() => import('./MobileMenuSheet'))

export function Header() {
  const t = useTranslations('nav');
  useTranslations('header');
  const tCommon = useTranslations('common');
  const tInternational = useTranslations('internationalNav');
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingDropdownOpen, setBookingDropdownOpen] = useState(false);
  const [treatmentCategories, setTreatmentCategories] = useState<TreatmentCategory[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [, setIsLoading] = useState(true);

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

  // Close dropdowns on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setBookingDropdownOpen(false);
        setActiveDropdown(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    {
      name: `Folder: ${t('treatments')}`,
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
      name: `Folder: ${t('conditions')}`,
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
      name: `Folder: ${tInternational('main')}`,
      href: '/international-clients',
      hasDropdown: true,
      dropdownContent: (
        <div className="p-6 min-w-80">
          <ul className="space-y-3">
            <li>
              <Link
                href="/international-clients"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <span className="font-medium group-hover:text-gold transition-colors">
                    {tInternational('main')}
                  </span>
                  <p className="text-xs text-muted-foreground">
                    {tInternational('mainDesc')}
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/international-clients#packages"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Gift className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <span className="font-medium group-hover:text-gold transition-colors">
                    {tInternational('packages')}
                  </span>
                  <p className="text-xs text-muted-foreground">
                    {tInternational('packagesDesc')}
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/international-clients#pricing"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <span className="font-medium group-hover:text-gold transition-colors">
                    {tInternational('pricing')}
                  </span>
                  <p className="text-xs text-muted-foreground">
                    {tInternational('pricingDesc')}
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/international-clients#faq"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <span className="font-medium group-hover:text-gold transition-colors">
                    {tInternational('faq')}
                  </span>
                  <p className="text-xs text-muted-foreground">
                    {tInternational('faqDesc')}
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      ),
    },
    {
      name: `Folder: ${t('about')}`,
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
    { name: t('contact'), href: '/contact-us', hasDropdown: false },
  ];

  return (
    <>
      {/* Top Bar - HSI style utility links */}
      <div className="bg-primary text-white py-1.5 text-sm hidden md:block">
        <div className="container-custom flex items-center justify-between">
          {/* Utility Links */}
          <div className="flex items-center gap-4">
            <Link href="/pricelist" className="text-white hover:text-gold transition-colors">
              {t('pricelist')}
            </Link>
            <Link href="/offers" className="text-white hover:text-gold transition-colors">
              {t('offers')}
            </Link>
            <Link href="/contact-us" className="text-white hover:text-gold transition-colors">
              {t('contact')}
            </Link>
          </div>
          {/* Book Appointment */}
          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-white transition-colors font-medium"
          >
            {t('bookAppointment')}
          </a>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2'
            : 'bg-white py-3'
        )}
      >
        <div className="container-custom">
          {/* Top Row: Language Left, Logo Center, Booking Right */}
          <div className="flex items-center justify-between">
            {/* Language Switcher - Left - with room for dropdown */}
            <div className="flex items-center min-w-30">
              <div className="bg-gold hover:bg-gold/90 text-white rounded-md px-3 py-1.5">
                <LanguageSwitcher />
              </div>
            </div>

            {/* Logo - Centered */}
            <Link href="/" className="flex items-center gap-2" aria-label="Silk Beauty Salon - Home">
              <div className="flex flex-col items-center">
                <span className="font-serif text-2xl md:text-3xl font-semibold text-primary tracking-tight">
                  Silk Beauty
                </span>
                <span className="text-xs md:text-sm text-gold tracking-[0.2em] uppercase font-medium">
                  Salon
                </span>
              </div>
            </Link>

            {/* Book Appointment Button with Dropdown - Right */}
            <div className="relative hidden md:flex min-w-30 justify-end">
              <Button
                onClick={() => setBookingDropdownOpen(!bookingDropdownOpen)}
                aria-expanded={bookingDropdownOpen}
                aria-haspopup="menu"
                className="btn-gold flex items-center gap-2 px-5 py-2"
              >
                {t('bookAppointment')}
                <ChevronDown className={cn('w-4 h-4 transition-transform', bookingDropdownOpen && 'rotate-180')} />
              </Button>
              
              {bookingDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-border overflow-hidden z-50 animate-fadeIn">
                  <a
                    href={siteConfig.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors"
                    onClick={() => setBookingDropdownOpen(false)}
                  >
                    <ExternalLink className="w-5 h-5 text-gold" />
                    <div>
                      <p className="font-medium text-sm">{tCommon('bookOnline')}</p>
                      <p className="text-xs text-muted-foreground">{tCommon('scheduleAppointment')}</p>
                    </div>
                  </a>
                  <div className="border-t border-border" />
                  <a
                    href={`https://wa.me/${siteConfig.contact.phone.replace(/\s/g, '').replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors"
                    onClick={() => setBookingDropdownOpen(false)}
                  >
                    <MessageCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium text-sm">{tCommon('whatsapp')}</p>
                      <p className="text-xs text-muted-foreground">{tCommon('bookViaWhatsApp')}</p>
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Suspense fallback={<Button variant="ghost" size="icon"><Menu className="w-6 h-6" /></Button>}>
                <MobileMenuSheet 
                  open={mobileMenuOpen} 
                  onOpenChange={setMobileMenuOpen}
                  treatmentCategories={treatmentCategories}
                  conditions={conditions}
                />
              </Suspense>
            </div>
          </div>

          {/* Desktop Navigation - Centered with folder-style mega menus */}
          <nav className="hidden lg:flex items-center justify-center gap-1 mt-2">
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
                    'flex items-center gap-1 px-4 py-2 text-base font-medium text-primary hover:text-gold transition-colors',
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

                {/* Dropdown Menu - absolute positioned within the hover zone */}
                {item.hasDropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 animate-fadeIn z-50">
                    <div className="bg-white shadow-xl rounded-lg border border-border overflow-hidden">
                      {item.dropdownContent}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
