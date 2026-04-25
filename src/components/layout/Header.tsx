'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Menu } from 'lucide-react'
import { LanguageSwitcher } from './LanguageSwitcher'
import MobileMenuSheet from './MobileMenuSheet'
import { baseTreatmentCategories } from '@/data/treatments'
import { baseConditions } from '@/data/conditions'
import { siteConfig } from '@/data/site-config'

export default function Header() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const NAV_ITEMS = [
    { label: t('treatments'), href: `/${locale}/treatments` },
    { label: t('consultation'), href: `/${locale}/consultation` },
    { label: t('skinConcerns'), href: `/${locale}/skin-concerns` },
    { label: t('results'), href: `/${locale}/results` },
    { label: t('about'), href: `/${locale}/about` },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      {/* Utility bar */}
      <div className="container-brand flex items-center justify-between py-2 border-b border-black/5">
        <span className="text-[0.625rem] tracking-[0.09375rem] uppercase text-brand-text-nav">{t('aboutUs')}</span>
        <div className="flex items-center gap-6">
          <Link href={`/${locale}/find-specialist`} className="text-[0.625rem] tracking-[0.09375rem] uppercase text-brand-text-nav hover:text-brand-accent transition-colors">{t('findSpecialist')}</Link>
          <LanguageSwitcher />
        </div>
      </div>
      {/* Main nav */}
      <nav aria-label="Main navigation" className="container-brand flex items-center justify-between py-4">
        <Link href={`/${locale}/`} className="font-heading text-2xl text-brand-text-nav tracking-tight">{siteConfig.name}</Link>
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="text-[0.9375rem] tracking-[0.009375rem] text-brand-text-nav hover:text-brand-accent transition-colors">{item.label}</Link>
          ))}
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-brand-text-nav hover:text-brand-accent transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <MobileMenuSheet
            open={mobileMenuOpen}
            onOpenChange={setMobileMenuOpen}
            treatmentCategories={baseTreatmentCategories}
            conditions={baseConditions}
          />
        </div>
      </nav>
    </header>
  )
}
