'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { BookingButton } from '@/components/booking-button';
import { treatmentCategories, skinConcerns, botoxTreatments, laserTreatments } from '@/data/navigation';
import { PressBar } from '@/components/sections/PressBar';

export function GaldermaHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{name: string; href: string; type: string}>>([]);
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      {/* Press Bar - Scrolling credentials ticker */}
      <PressBar />

      {/* Top Bar - Logo, Social, Utility Links */}
      <div className="border-b border-gray-200">
        <div className="container-custom">
          <div className="flex items-center justify-between py-4">
            {/* Left Side - Social Icons + Utility Links */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com/silkbeauty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-gray-600 transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com/silkbeauty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-gray-600 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              </div>

              {/* Utility Links - About, Contact & Blog */}
              <nav className="flex items-center gap-6 text-xs tracking-widest uppercase font-medium text-gray-800">
                <Link href="/about" className="hover:text-gray-600 transition-colors">
                  {t('about')}
                </Link>
                <Link href="/contact-us" className="hover:text-gray-600 transition-colors">
                  {t('contact')}
                </Link>
                <Link href="/blog" className="hover:text-gray-600 transition-colors">
                  {t('blog')}
                </Link>
              </nav>
            </div>

            {/* Center - Logo */}
            <Link href="/" className="flex flex-col items-center">
              <span className="text-2xl md:text-3xl tracking-widest font-light text-gray-900">
                SILK BEAUTY
              </span>
              <span className="text-[10px] tracking-[0.4em] text-gray-500 mt-0.5">
                EST.2024
              </span>
            </Link>

            {/* Right Side - Booking + Language + Search */}
            <div className="hidden lg:flex items-center gap-6">
              <BookingButton />

              <LanguageSwitcher />

              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="text-gray-800 hover:text-gray-600 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-800"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Main Navigation */}
      <div className="border-b border-gray-200 hidden lg:block">
        <div className="container-custom">
          <nav className="flex items-center justify-center gap-8 py-3">
            {/* Treatments Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('treatments')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-xs tracking-widest uppercase font-medium text-gray-800 hover:text-gray-600 transition-colors">
                {t('treatments')}
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'treatments' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'treatments' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                  <div className="bg-white border border-gray-200 shadow-xl rounded-sm w-150">
                    <div className="grid grid-cols-3 gap-4 p-6">
                      {treatmentCategories.slice(1, 6).map((category) => (
                        <div key={category.slug}>
                          <Link
                            href={category.href}
                            className="block text-xs font-semibold uppercase tracking-wider text-gray-900 hover:text-gray-600 mb-2"
                          >
                            {category.name}
                          </Link>
                          <ul className="space-y-1">
                            {category.items.slice(0, 4).map((item) => (
                              <li key={item.slug}>
                                <Link
                                  href={item.href}
                                  className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                            {category.items.length > 4 && (
                              <li className="pt-1">
                                <Link
                                  href={category.href}
                                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                  +{category.items.length - 4} more
                                </Link>
                              </li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 px-6 py-3 bg-gray-50">
                      <Link
                        href="/treatments"
                        className="text-xs tracking-widest uppercase font-medium text-gray-800 hover:text-gray-600"
                      >
                        {t('viewAll')} →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Skin Concerns Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('concerns')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-xs tracking-widest uppercase font-medium text-gray-800 hover:text-gray-600 transition-colors">
                {t('conditions')}
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'concerns' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'concerns' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                  <div className="bg-white border border-gray-200 shadow-xl rounded-sm w-100">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 p-6">
                      {skinConcerns.items.slice(0, 10).map((item) => (
                        <Link
                          key={item.slug}
                          href={item.href}
                          className="block group"
                        >
                          <span className="text-xs font-medium text-gray-900 group-hover:text-gray-600">
                            {item.name}
                          </span>
                          {item.description && (
                            <span className="block text-[10px] text-gray-500">
                              {item.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 px-6 py-3 bg-gray-50">
                      <Link
                        href="/conditions"
                        className="text-xs tracking-widest uppercase font-medium text-gray-800 hover:text-gray-600"
                      >
                        {t('exploreAll')} →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/pricelist"
              className="text-xs tracking-widest uppercase font-medium text-gray-800 hover:text-gray-600 transition-colors"
            >
              {t('pricelist')}
            </Link>
            <Link
              href="/international-clients"
              className="text-xs tracking-widest uppercase font-medium text-gray-800 hover:text-gray-600 transition-colors"
            >
              {t('internationalClients')}
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 lg:hidden">
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <span className="text-lg font-light tracking-widest">MENU</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-800"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-6">
                <BookingButton />
              </div>
              <nav className="flex flex-col gap-6">
                <Link
                  href="/treatments"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm tracking-widest uppercase font-medium text-gray-800"
                >
                  {t('treatments')}
                </Link>
                <Link
                  href="/conditions"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm tracking-widest uppercase font-medium text-gray-800"
                >
                  {t('conditions')}
                </Link>
                <Link
                  href="/pricelist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm tracking-widest uppercase font-medium text-gray-800"
                >
                  {t('pricelist')}
                </Link>
                <Link
                  href="/international-clients"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm tracking-widest uppercase font-medium text-gray-800"
                >
                  {t('internationalClients')}
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm tracking-widest uppercase font-medium text-gray-800"
                >
                  {t('about')}
                </Link>
                <Link
                  href="/contact-us"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm tracking-widest uppercase font-medium text-gray-800"
                >
                  {t('contact')}
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm tracking-widest uppercase font-medium text-gray-800"
                >
                  {t('blog')}
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white z-50">
          <div className="container-custom py-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-light tracking-widest">SEARCH</h2>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 text-gray-800"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="max-w-2xl">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  const query = e.target.value;
                  setSearchQuery(query);
                  if (query.length > 1) {
                    const results: Array<{name: string; href: string; type: string}> = [];
                    const queryLower = query.toLowerCase();
                    // Search all treatment categories
                    const allCategories = [...treatmentCategories, botoxTreatments, laserTreatments];
                    allCategories.forEach(cat => {
                      // If category name matches, add all its items
                      if (cat.name.toLowerCase().includes(queryLower)) {
                        cat.items.forEach(item => {
                          results.push({ name: item.name, href: item.href, type: 'Treatment' });
                        });
                      } else {
                        // Otherwise search individual items
                        cat.items.forEach(item => {
                          if (item.name.toLowerCase().includes(queryLower)) {
                            results.push({ name: item.name, href: item.href, type: 'Treatment' });
                          }
                        });
                      }
                    });
                    // Search conditions
                    skinConcerns.items.forEach(item => {
                      if (item.name.toLowerCase().includes(queryLower)) {
                        results.push({ name: item.name, href: item.href, type: 'Condition' });
                      }
                    });
                    setSearchResults(results.slice(0, 10));
                  } else {
                    setSearchResults([]);
                  }
                }}
                placeholder={tCommon('searchPlaceholder', { defaultValue: 'Search treatments, conditions...' })}
                className="w-full text-xl border-b-2 border-gray-200 py-4 focus:border-gray-800 outline-none bg-transparent"
                autoFocus
              />
              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="mt-8 space-y-2 max-h-[60vh] overflow-y-auto">
                  {searchResults.map((result, idx) => (
                    <Link
                      key={idx}
                      href={result.href}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center justify-between py-4 px-2 border-b border-gray-100 hover:bg-gray-50 transition-colors rounded"
                    >
                      <div>
                        <span className="text-base font-medium text-gray-900">{result.name}</span>
                        <span className="ml-3 text-xs text-gray-500 uppercase tracking-wider">{result.type}</span>
                      </div>
                      <span className="text-gray-400 text-lg">→</span>
                    </Link>
                  ))}
                </div>
              )}
              {searchQuery.length > 1 && searchResults.length === 0 && (
                <p className="mt-8 text-gray-500 text-base">No results found for &quot;{searchQuery}&quot;</p>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
