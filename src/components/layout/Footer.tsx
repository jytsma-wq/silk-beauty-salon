'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { getLocalizedTreatmentCategories, type TreatmentCategory } from '@/data/treatments';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { trackNewsletterSubscription } from '@/lib/analytics';
import { TikTokIcon } from '@/components/icons';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tNewsletter = useTranslations('newsletter');
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [treatmentCategories, setTreatmentCategories] = useState<TreatmentCategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getLocalizedTreatmentCategories(locale);
      setTreatmentCategories(categories);
    };
    fetchData();
  }, [locale]);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
      trackNewsletterSubscription('footer');
    } catch {
      // show error state
    }
  };

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer Content */}
      <div className="container-custom py-16">
        {/* Row 1: Treatment Category Columns - HSI style categorized */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-8 mb-16">
          {treatmentCategories.slice(0, 6).map((category) => (
            <div key={category.slug}>
              <h3 className="text-xs font-semibold text-gold uppercase tracking-wider mb-3">
                {category.name}
              </h3>
              <ul className="space-y-1.5">
                {category.treatments?.slice(0, 5).map((treatment: { name: string; slug: string }) => (
                  <li key={treatment.slug}>
                    <Link
                      href={`/treatments/${treatment.slug}`}
                      className="text-xs text-gray-300 hover:text-gold transition-colors"
                    >
                      {treatment.name}
                    </Link>
                  </li>
                )) ?? (
                  <li>
                    <Link
                      href={`/treatments#${category.slug}`}
                      className="text-xs text-gray-300 hover:text-gold transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* Row 2: FAQ / Clinic / Team / Press cards - HSI style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <Link href="/faq" className="group bg-white/5 rounded-lg p-5 border border-white/10 hover:border-gold transition-colors">
            <h3 className="text-sm font-semibold text-white mb-2">{tNav('faq')}</h3>
            <p className="text-xs text-gray-400">{t('faqDesc')}</p>
          </Link>
          <Link href="/about" className="group bg-white/5 rounded-lg p-5 border border-white/10 hover:border-gold transition-colors">
            <h3 className="text-sm font-semibold text-white mb-2">{t('clinicTitle')}</h3>
            <p className="text-xs text-gray-400">{t('clinicDesc')}</p>
          </Link>
          <Link href="/about#team" className="group bg-white/5 rounded-lg p-5 border border-white/10 hover:border-gold transition-colors">
            <h3 className="text-sm font-semibold text-white mb-2">{t('teamTitle')}</h3>
            <p className="text-xs text-gray-400">{t('teamDesc')}</p>
          </Link>
          <Link href="/media-press" className="group bg-white/5 rounded-lg p-5 border border-white/10 hover:border-gold transition-colors">
            <h3 className="text-sm font-semibold text-white mb-2">{t('pressTitle')}</h3>
            <p className="text-xs text-gray-400">{t('pressDesc')}</p>
          </Link>
        </div>

        {/* Row 3: Newsletter + Contact + Social */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-gold mb-3">
              {tNewsletter('title')}
            </h3>
            <p className="text-xs text-gray-400 mb-4">{tNewsletter('privacy')}</p>
            {submitted ? (
              <p className="text-sm text-green-400">{tNewsletter('success')}</p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder={tNewsletter('placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-sm"
                />
                <Button type="submit" className="btn-gold whitespace-nowrap px-4 py-2 text-sm">
                  {tNewsletter('subscribe')}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-gold mb-3">
              {t('contact')}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold mt-0.5 shrink-0" />
                <p className="text-xs text-gray-300">{t('address')}</p>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                  className="text-xs text-gray-300 hover:text-gold transition-colors"
                >
                  {t('phone')}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-xs text-gray-300 hover:text-gold transition-colors"
                >
                  {t('email')}
                </a>
              </li>
            </ul>
            <div className="mt-3">
              <h4 className="text-xs font-semibold text-gold mb-1">{t('openingHours')}</h4>
              <p className="text-xs text-gray-300">{t('hours.monFri')}</p>
              <p className="text-xs text-gray-300">{t('hours.satSun')}</p>
            </div>
          </div>

          {/* Social + Logo */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <div className="flex flex-col">
                <span className="font-serif text-xl font-semibold text-white tracking-tight">Silk Beauty</span>
                <span className="text-xs text-gold tracking-[0.2em] uppercase font-medium">Salon</span>
              </div>
            </Link>
            <p className="text-xs text-gray-400 mb-4">{t('description')}</p>
            <div className="flex items-center gap-3">
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-[#E4405F] hover:opacity-80 transition-opacity" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:opacity-80 transition-opacity" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.tiktok.com/@silkbeautybatumi" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition-opacity" aria-label="TikTok">
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-400">
              {t('copyright')}
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="text-xs text-gray-400 hover:text-gold transition-colors">
                {t('privacy')}
              </Link>
              <Link href="/terms-conditions" className="text-xs text-gray-400 hover:text-gold transition-colors">
                {t('terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
