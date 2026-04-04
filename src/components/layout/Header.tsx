'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, useRouter, usePathname } from '@/i18n/routing';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { siteConfig } from '@/data/site-config';
import { treatmentCategories } from '@/data/treatments';
import { conditions } from '@/data/conditions';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const t = useTranslations('nav');
  const tHeader = useTranslations('header');
  const tCommon = useTranslations('common');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <div className="grid grid-cols-3 gap-8 p-6 min-w-[800px]">
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
        <div className="grid grid-cols-2 gap-6 p-6 min-w-[500px]">
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
        <div className="p-6 min-w-[250px]">
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
                href="/media-press"
                className="block p-2 rounded hover:bg-secondary transition-colors hover:text-gold"
              >
                {t('press')}
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
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 text-center text-sm hidden md:block">
        <div className="container-custom">
          <span className="text-gold">★</span> {tHeader('announcement')}
          <span className="text-gold">★</span>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          isScrolled
            ? 'bg-white shadow-md py-2'
            : 'bg-white py-4'
        )}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="font-serif text-xl md:text-2xl font-semibold text-primary tracking-tight">
                Silk Beauty
              </span>
              <span className="text-xs md:text-sm text-gold tracking-[0.2em] uppercase font-medium">
                Salon
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
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
                    'flex items-center gap-1 px-4 py-2 text-sm font-medium text-primary hover:text-gold transition-colors',
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
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 animate-fadeIn">
                    <div className="bg-white shadow-xl rounded-lg border border-border overflow-hidden">
                      {item.dropdownContent}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Phone Number - Desktop Only */}
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
              className="hidden xl:flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
            >
              <Phone className="w-4 h-4" />
              {siteConfig.contact.phone}
            </a>

            {/* Book Appointment Button */}
            <Button
              asChild
              className="btn-gold hidden md:inline-flex"
            >
              <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
                {t('bookAppointment')}
              </a>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <MobileNav onClose={() => setMobileMenuOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}

function MobileNav({ onClose }: { onClose: () => void }) {
  const t = useTranslations('nav');
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
