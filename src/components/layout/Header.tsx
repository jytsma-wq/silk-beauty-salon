'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV_ITEMS = [
  { label: 'Treatments', href: '/treatments' },
  { label: 'Consultation', href: '/consultation' },
  { label: 'Skin Concerns', href: '/skin-concerns' },
  { label: 'Results', href: '/results' },
  { label: 'About', href: '/about' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      {/* Utility bar */}
      <div className="container-brand flex items-center justify-between py-2 border-b border-black/5">
        <span className="text-[0.625rem] tracking-[0.09375rem] uppercase text-brand-text-nav">About Us</span>
        <div className="flex items-center gap-6">
          <Link href="/find-specialist" className="text-[0.625rem] tracking-[0.09375rem] uppercase text-brand-text-nav hover:text-brand-accent transition-colors">Find a Specialist</Link>
        </div>
      </div>
      {/* Main nav */}
      <nav className="container-brand flex items-center justify-between py-4">
        <Link href="/" className="font-heading text-2xl text-brand-text-nav tracking-tight">Beauty Aesthetics</Link>
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="text-[0.9375rem] tracking-[0.009375rem] text-brand-text-nav hover:text-brand-accent transition-colors">{item.label}</Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
