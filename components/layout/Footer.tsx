'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Sparkles, Clock } from 'lucide-react';
import { SALON_INFO } from '@/lib/constants';
import { useTranslations } from 'next-intl';

// Colored Social Media Icons as SVG components
const FacebookIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="instagramGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFDC80"/>
        <stop offset="25%" stopColor="#F77737"/>
        <stop offset="50%" stopColor="#F56040"/>
        <stop offset="75%" stopColor="#C13584"/>
        <stop offset="100%" stopColor="#833AB4"/>
      </linearGradient>
    </defs>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="url(#instagramGradient)"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" fill="#000"/>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" fill="#25F4EE"/>
    <path d="M5.54 9.23c1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07" fill="#FE2C55"/>
  </svg>
);

const footerLinks = [
  {
    title: 'Services',
    links: [
      { label: 'Injectables',     href: '/treatments?cat=injectables' },
      { label: 'Skin Treatments', href: '/treatments?cat=skin' },
      { label: 'Lashes & Brows',  href: '/treatments?cat=lashes' },
      { label: 'Hair',            href: '/treatments?cat=hair' },
      { label: 'Nails',           href: '/treatments?cat=nails' },
      { label: 'Permanent Makeup',href: '/treatments?cat=pmu' },
    ],
  },
  {
    title: 'Salon',
    links: [
      { label: 'About Us',      href: '/about' },
      { label: 'Specialists',   href: '/specialists' },
      { label: 'Book Now',      href: '/contact' },
    ],
  },
];

export default function Footer({ locale = 'en' }: { locale?: string }) {
  const t = useTranslations('footer');
  
  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Main Footer Content */}
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)' }}
              >
                <Sparkles size={14} className="text-white" />
              </div>
              <span className="font-accent font-semibold tracking-wider text-sm uppercase text-gray-900">
                Silk Beauty
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-sm">
              {t('tagline')}
            </p>
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              <a
                href={SALON_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href={SALON_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={SALON_INFO.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                aria-label="TikTok"
              >
                <TikTokIcon />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-gray-900 text-xs font-semibold tracking-wider uppercase mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-gray-500 text-sm hover:text-teal-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact bar */}
        <div className="flex flex-wrap gap-6 py-6 border-t border-b border-gray-100">
          {[
            { icon: MapPin, text: SALON_INFO.address },
            { icon: Phone,  text: SALON_INFO.phone },
            { icon: Mail,   text: SALON_INFO.email },
            { icon: Clock,  text: 'Mon-Sat: 10:00 - 21:00' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-gray-500 text-sm">
              <Icon size={14} className="text-teal-500 flex-shrink-0" />
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Galderma-Style Bottom Bar */}
      <div className="bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Find a Specialist - Prominent CTA */}
            <Link
              href={`/${locale}/specialists`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105 shadow-md"
              style={{
                background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
              }}
            >
              <Sparkles size={16} />
              {t('findSpecialist')}
            </Link>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <Link
                href={`/${locale}/legal/terms`}
                className="text-gray-500 hover:text-teal-600 transition-colors"
              >
                {t('termsOfUse')}
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href={`/${locale}/legal/privacy`}
                className="text-gray-500 hover:text-teal-600 transition-colors"
              >
                {t('privacy')}
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href={`/${locale}/legal/cookies`}
                className="text-gray-500 hover:text-teal-600 transition-colors"
              >
                {t('cookieNotice')}
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Silk Beauty. {t('rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
