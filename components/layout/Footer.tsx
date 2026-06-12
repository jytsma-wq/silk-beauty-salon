'use client';

import Link from 'next/link';
import { useLocale } from '@/hooks/useLocale';
import { Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  const { locale } = useLocale();

  const footerLinks = [
    { href: '/legal/terms', label: 'TERMS OF USE' },
    { href: '/legal/privacy', label: 'PRIVACY' },
    { href: '/legal/cookies', label: 'COOKIE NOTICE' },
    { href: '/download', label: 'DOWNLOAD APP' },
  ];

  return (
    <footer className="relative bg-gray-50 overflow-hidden">
      {/* Top Content: Copyright, Links, Stay Connected */}
      <div className="relative z-10 container mx-auto max-w-7xl px-6 lg:px-12 py-12">
        {/* Stay Connected Section - Centered */}
        <div className="text-center mb-10">
          <h3 className="font-display text-lg text-gray-900 mb-2">Stay connected</h3>
          <p className="text-sm text-gray-500 mb-6">
            Follow us on Social Media for current news and patients stories
          </p>
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://facebook.com/silkbeauty"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 transition-transform hover:scale-110"
            >
              <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-gold-400 group-hover:bg-gold-50 transition-colors">
                <Facebook size={20} className="text-gray-600 group-hover:text-gold-500" />
              </div>
              <span className="text-xs text-gray-500 group-hover:text-gold-500 transition-colors">facebook</span>
            </a>
            <a
              href="https://instagram.com/silkbeauty"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 transition-transform hover:scale-110"
            >
              <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-gold-400 group-hover:bg-gold-50 transition-colors">
                <Instagram size={20} className="text-gray-600 group-hover:text-gold-500" />
              </div>
              <span className="text-xs text-gray-500 group-hover:text-gold-500 transition-colors">instagram</span>
            </a>
            <a
              href="https://tiktok.com/@silkbeauty"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 transition-transform hover:scale-110"
            >
              <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-gold-400 group-hover:bg-gold-50 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-600 group-hover:text-gold-500">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </div>
              <span className="text-xs text-gray-500 group-hover:text-gold-500 transition-colors">tiktok</span>
            </a>
          </div>
        </div>

        {/* Copyright and Links - Above the pattern */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-200">
          {/* Left: Copyright */}
          <p className="text-caption font-medium text-gray-600">
            © Black Sea Digital 2026
          </p>

          {/* Right: Navigation Links */}
          <nav>
            <ul className="flex flex-wrap items-center justify-center md:justify-end gap-x-8 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-label uppercase tracking-widest text-gray-600 font-medium transition-colors duration-500 hover:text-gold-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Diamond Pattern - Lines don't touch, bigger size */}
      <div 
        className="relative w-full h-40 overflow-hidden"
        aria-hidden="true"
      >
        <svg 
          className="w-full h-full" 
          xmlns="http://www.w3.org/2000/svg" 
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern 
              id="dashedDiamond" 
              width="48" 
              height="48" 
              patternUnits="userSpaceOnUse"
            >
              {/* Diagonal dash 1 - top left */}
              <line x1="6" y1="6" x2="20" y2="20" stroke="#374151" strokeWidth="1.2" />
              {/* Diagonal dash 2 - bottom right */}
              <line x1="28" y1="28" x2="42" y2="42" stroke="#374151" strokeWidth="1.2" />
              
              {/* Diagonal dash 3 - top right */}
              <line x1="42" y1="6" x2="28" y2="20" stroke="#374151" strokeWidth="1.2" />
              {/* Diagonal dash 4 - bottom left */}
              <line x1="20" y1="28" x2="6" y2="42" stroke="#374151" strokeWidth="1.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dashedDiamond)" opacity="0.6" />
        </svg>
      </div>
    </footer>
  );
}
