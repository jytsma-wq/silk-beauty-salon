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
    <footer className="bg-primary text-white" role="contentinfo">
      {/* Main Footer Content */}
      <div className="container-custom py-16">
        {/* Row 1: Treatment Category Columns - HSI style categorized */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-8 mb-16">
          {treatmentCategories.slice(0, 6).map((category) => (
            <div key={category.slug}>
              <h3 className="text-xs tracking-widest uppercase text-white/50 mb-6 font-medium">
                {category.name}
              </h3>
              <ul className="space-y-1.5">
                {category.treatments?.slice(0, 5).map((treatment: { name: string; slug: string }) => (
                  <li key={treatment.slug}>
                    <Link
                      href={`/treatments/${treatment.slug}`}
                      className="text-white/60 hover:text-white text-sm transition-colors leading-relaxed"
                    >
                      {treatment.name}
                    </Link>
                  </li>
                )) ?? (
                  <li>
                    <Link
                      href={`/treatments#${category.slug}`}
                      className="text-white/60 hover:text-white text-sm transition-colors leading-relaxed"
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
          <Link href="/faq" className="group border-t border-white/10 pt-4">
            <h3 className="text-xs tracking-widest uppercase text-white/50 mb-2 font-medium">{tNav('faq')}</h3>
            <p className="text-sm text-white/60 hover:text-white transition-colors">{t('faqDesc')}</p>
          </Link>
          <Link href="/about" className="group border-t border-white/10 pt-4">
            <h3 className="text-xs tracking-widest uppercase text-white/50 mb-2 font-medium">{t('clinicTitle')}</h3>
            <p className="text-sm text-white/60 hover:text-white transition-colors">{t('clinicDesc')}</p>
          </Link>
          <Link href="/about#team" className="group border-t border-white/10 pt-4">
            <h3 className="text-xs tracking-widest uppercase text-white/50 mb-2 font-medium">{t('teamTitle')}</h3>
            <p className="text-sm text-white/60 hover:text-white transition-colors">{t('teamDesc')}</p>
          </Link>
          <Link href="/media-press" className="group border-t border-white/10 pt-4">
            <h3 className="text-xs tracking-widest uppercase text-white/50 mb-2 font-medium">{t('pressTitle')}</h3>
            <p className="text-sm text-white/60 hover:text-white transition-colors">{t('pressDesc')}</p>
          </Link>
        </div>

        {/* Row 3: Newsletter + Contact + Social */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Newsletter */}
          <div>
            <h3 className="text-xs tracking-widest uppercase text-white/50 mb-6 font-medium">
              {tNewsletter('title')}
            </h3>
            <p className="text-xs text-gray-400 mb-4">{tNewsletter('privacy')}</p>
            {submitted ? (
              <p className="text-sm text-green-400">{tNewsletter('success')}</p>
            ) : (
              <form onSubmit={handleNewsletterSubmit}>
                <Input
                  type="email"
                  placeholder={tNewsletter('placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-transparent border-0 border-b border-white/30 focus:border-white/70 rounded-none text-white placeholder:text-white/40 px-0 py-2 text-sm w-full outline-none"
                />
                <Button type="submit" className="bg-transparent border border-white/50 hover:border-white text-white text-xs tracking-widest uppercase px-6 py-3 transition-colors rounded-none mt-3">
                  {tNewsletter('subscribe')}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xs tracking-widest uppercase text-white/50 mb-6 font-medium">
              {t('contact')}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-white/50 mt-0.5 shrink-0" />
                <p className="text-sm text-white/60">{t('address')}</p>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-white/50 shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {t('phone')}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-white/50 shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {t('email')}
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-xs tracking-widest uppercase text-white/50 mb-2 font-medium">{t('openingHours')}</h4>
              <p className="text-sm text-white/60">{t('hours.monFri')}</p>
              <p className="text-sm text-white/60">{t('hours.satSun')}</p>
            </div>
          </div>

          {/* Social + Logo */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <div className="flex flex-col">
                <span className="font-heading text-xl font-semibold text-white tracking-tight">Silk Beauty</span>
                <span className="text-xs text-white/50 tracking-[0.2em] uppercase font-medium">Salon</span>
              </div>
            </Link>
            <p className="text-sm text-white/60 mb-4">{t('description')}</p>
            <div className="flex items-center gap-3">
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 border border-white/30 flex items-center justify-center hover:border-white transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 border border-white/30 flex items-center justify-center hover:border-white transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.tiktok.com/@silkbeautybatumi" target="_blank" rel="noopener noreferrer" className="w-8 h-8 border border-white/30 flex items-center justify-center hover:border-white transition-colors" aria-label="TikTok">
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              {t('copyright')}
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="text-xs text-white/40 hover:text-white transition-colors">
                {t('privacy')}
              </Link>
              <Link href="/terms-conditions" className="text-xs text-white/40 hover:text-white transition-colors">
                {t('terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
