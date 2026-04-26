'use client';

import { useState, useEffect, useRef, lazy, Suspense } from 'react';
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
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load mobile menu sheet component (heavy Radix UI) - only loads on mobile
const MobileMenuSheet = lazy(() => import('./MobileMenuSheet'))

export function Header() {
  const t = useTranslations('nav');
  useTranslations('header');
  const tCommon = useTranslations('common');
  const tInternational = useTranslations('internationalNav');
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingDropdownOpen, setBookingDropdownOpen] = useState(false);
  const [treatmentCategories, setTreatmentCategories] = useState<TreatmentCategory[]>([]);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [, setIsLoading] = useState(true);
  const lastScrollY = useRef(0);

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
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      
      // Set scrolled state for transparent/frosted glass transition
      setIsScrolled(currentScrollY > 100);
      
      // Smart hide/show on scroll
      if (currentScrollY > 200) {
        // Only hide after scrolling down significantly (delta > 5)
        if (delta > 5) {
          setIsHidden(true);
        } else if (delta < -2) {
          // Show when scrolling up (any upward movement)
          setIsHidden(false);
        }
      } else {
        // Always show when near top
        setIsHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
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
      name: t('treatments'),
      href: '/treatments',
      hasDropdown: true,
      dropdownContent: (
        <div className="grid grid-cols-3 gap-8 p-6 min-w-200">
          {treatmentCategories.map((category) => (
            <div key={category.slug}>
              <h3 className="font-heading text-lg font-semibold mb-3 text-primary">
                {category.name}
              </h3>
              <ul className="space-y-2">
                {category.treatments.slice(0, 5).map((treatment) => (
                  <li key={treatment.slug}>
                    <Link
                      href={`/treatments/${treatment.slug}`}
                      className="text-sm text-muted-foreground hover:text-[#b5453a] transition-colors"
                    >
                      {treatment.name}
                    </Link>
                  </li>
                ))}
                {category.treatments.length > 5 && (
                  <li>
                    <Link
                      href={`/treatments#${category.slug}`}
                      className="text-sm font-medium text-[#b5453a] hover:underline"
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
                <span className="text-[#b5453a] font-heading text-lg">
                  {condition.name.charAt(0)}
                </span>
              </div>
              <div>
                <span className="font-medium group-hover:text-[#b5453a] transition-colors">
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
      name: tInternational('main'),
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
                <div className="w-10 h-10 rounded-full bg-[#b5453a]/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-[#b5453a]" />
                </div>
                <div>
                  <span className="font-medium group-hover:text-[#b5453a] transition-colors">
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
                <div className="w-10 h-10 rounded-full bg-[#b5453a]/10 flex items-center justify-center">
                  <Gift className="w-5 h-5 text-[#b5453a]" />
                </div>
                <div>
                  <span className="font-medium group-hover:text-[#b5453a] transition-colors">
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
                <div className="w-10 h-10 rounded-full bg-[#b5453a]/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-[#b5453a]" />
                </div>
                <div>
                  <span className="font-medium group-hover:text-[#b5453a] transition-colors">
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
                <div className="w-10 h-10 rounded-full bg-[#b5453a]/10 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-[#b5453a]" />
                </div>
                <div>
                  <span className="font-medium group-hover:text-[#b5453a] transition-colors">
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
      name: t('about'),
      href: '/about',
      hasDropdown: true,
      dropdownContent: (
        <div className="p-6 min-w-62.5">
          <ul className="space-y-2">
            <li>
              <Link
                href="/about"
                className="block p-2 rounded hover:bg-secondary transition-colors hover:text-[#b5453a]"
              >
                {t('team')}
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="block p-2 rounded hover:bg-secondary transition-colors hover:text-[#b5453a]"
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
      {/* Main Header */}
      <header
        role="banner"
        className={cn(
          'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-out',
          // Transform for hide/show
          isHidden ? '-translate-y-full' : 'translate-y-0',
          // Transparent over hero
          !isScrolled
            ? 'bg-transparent py-4'
            : 'bg-white/80 backdrop-blur-xl py-2 shadow-[0_1px_0_rgba(0,0,0,0.05)]'
        )}
      >
        <div className="container-custom">
          {/* Top Row: Language Left, Logo Center, Booking Right */}
          <div className="flex items-center justify-between">
            {/* Language Switcher - Left - with room for dropdown */}
            <div className="flex items-center min-w-30">
              <div className={cn(
                'border rounded-none px-3 py-1.5 transition-all duration-500 ease-out text-xs',
                isScrolled
                  ? 'border-[#b5453a] text-[#b5453a] hover:bg-[#b5453a] hover:text-white'
                  : 'border-white text-white hover:bg-white/10'
              )}>
                <LanguageSwitcher />
              </div>
            </div>

            {/* Logo - Centered */}
            <Link href="/" className="flex items-center gap-2" aria-label="Silk Beauty Salon - Home">
              <div className="flex flex-col items-center">
                <span className={cn(
                  'font-heading text-2xl md:text-3xl font-semibold tracking-tight transition-colors duration-500 ease-out',
                  isScrolled ? 'text-stone-900' : 'text-white'
                )}>
                  Silk Beauty
                </span>
                <span className={cn(
                  'text-xs md:text-sm tracking-[0.2em] uppercase font-medium transition-colors duration-500 ease-out',
                  isScrolled ? 'text-[#b5453a]' : 'text-white/90'
                )}>
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
                className={cn(
                  'flex items-center gap-2 px-6 py-2.5 text-sm tracking-widest uppercase transition-all duration-500 ease-out rounded-none border',
                  isScrolled
                    ? 'bg-[#b5453a] hover:bg-[#8e3229] text-white border-transparent'
                    : 'bg-transparent hover:bg-white/10 text-white border-white'
                )}
              >
                {t('bookAppointment')}
                <ChevronDown className={cn('w-4 h-4 transition-transform', bookingDropdownOpen && 'rotate-180')} />
              </Button>
              
              <AnimatePresence>
                {bookingDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="absolute top-full right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-sm shadow-xl border-t border-[#e8e4df] overflow-hidden z-50"
                  >
                    <a
                      href={siteConfig.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-stone-50 transition-colors"
                      onClick={() => setBookingDropdownOpen(false)}
                    >
                      <ExternalLink className="w-5 h-5 text-[#b5453a]" />
                      <div>
                        <p className="font-medium text-sm text-stone-900">{tCommon('bookOnline')}</p>
                        <p className="text-xs text-stone-500">{tCommon('scheduleAppointment')}</p>
                      </div>
                    </a>
                    <div className="border-t border-[#e8e4df]" />
                    <a
                      href={`https://wa.me/${siteConfig.contact.phone.replace(/\s/g, '').replace('+', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-stone-50 transition-colors"
                      onClick={() => setBookingDropdownOpen(false)}
                    >
                      <MessageCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium text-sm text-stone-900">{tCommon('whatsapp')}</p>
                        <p className="text-xs text-stone-500">{tCommon('bookViaWhatsApp')}</p>
                      </div>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Suspense fallback={<Button variant="ghost" size="icon"><Menu className="w-6 h-6" /></Button>}>
                <MobileMenuSheet 
                  open={mobileMenuOpen} 
                  onOpenChange={setMobileMenuOpen}
                  treatmentCategories={treatmentCategories}
                  conditions={conditions}
                  isScrolled={isScrolled}
                />
              </Suspense>
            </div>
          </div>

          {/* Desktop Navigation - Centered with folder-style mega menus */}
          <nav aria-label={t('mainNavigation')} className="hidden lg:flex items-center justify-center gap-1 mt-2">
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
                    'flex items-center gap-1 px-4 py-2 text-sm tracking-wide font-medium transition-all duration-500 ease-out focus-visible:ring-2 focus-visible:ring-[#b5453a] focus-visible:outline-none',
                    item.hasDropdown && 'cursor-default',
                    isScrolled
                      ? 'text-stone-700 hover:text-[#b5453a]'
                      : 'text-white/90 hover:text-white'
                  )}
                  aria-haspopup={item.hasDropdown ? 'true' : undefined}
                  aria-expanded={item.hasDropdown ? activeDropdown === item.name : undefined}
                >
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 transition-transform duration-300',
                        activeDropdown === item.name && 'rotate-180'
                      )}
                      aria-hidden="true"
                    />
                  )}
                </Link>

                {/* Dropdown Menu - with fade-in slide-down animation */}
                <AnimatePresence>
                  {item.hasDropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
                      role="menu"
                      aria-label={item.name}
                    >
                      <div className="bg-white/95 backdrop-blur-xl shadow-xl rounded-sm border-t border-[#e8e4df] overflow-hidden">
                        {item.dropdownContent}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
