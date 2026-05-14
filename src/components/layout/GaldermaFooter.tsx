'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Facebook, Instagram } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { siteConfig } from '@/data/site-config';
import { useAnnouncer } from '@/components/ui/announcer';

export function GaldermaFooter() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tNewsletter = useTranslations('newsletter');
  const tErrors = useTranslations('errors');
  const tCommon = useTranslations('common');
  const { announceError, announceSuccess } = useAnnouncer();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const csrfToken =
        document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          typeof data?.error === 'string'
            ? data.error
            : tErrors('form.submitError', {
                defaultValue: 'Failed to submit form. Please try again.',
              })
        );
      }

      const successMessage = tNewsletter('success', {
        defaultValue: 'Thank you for subscribing!',
      });
      setEmail('');
      setStatusMessage(successMessage);
      announceSuccess(successMessage);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : tErrors('form.submitError', {
              defaultValue: 'Failed to submit form. Please try again.',
            });
      setStatusMessage(message);
      announceError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer role="contentinfo" className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-7xl px-8 py-24 md:py-32">
        <div className="mb-20 max-w-3xl md:mb-32">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px w-12 bg-stone-300" />
            <span className="text-xs uppercase tracking-[0.3em] text-stone-600">
              {t('stayConnected', { defaultValue: 'Stay Connected' })}
            </span>
          </div>

          <h2 className="mb-6 font-serif text-4xl font-normal text-stone-900 md:text-5xl lg:text-6xl">
            {t('newsletterTitle', { defaultValue: 'Join Our World' })}
          </h2>

          <p className="mb-10 max-w-xl text-lg leading-relaxed text-stone-600">
            {t('socialDescription', {
              defaultValue:
                'Receive updates on new treatments, exclusive offers, and beauty insights delivered to your inbox.',
            })}
          </p>

          <form className="flex max-w-lg flex-col gap-4 sm:flex-row" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t('emailPlaceholder', { defaultValue: 'Your email address' })}
              aria-label={t('emailPlaceholder', { defaultValue: 'Your email address' })}
              required
              className="flex-1 border-b-2 border-stone-300 bg-transparent px-0 py-4 text-base outline-none transition-colors placeholder:text-stone-400 focus:border-[#8d6f58]"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-stone-900 px-8 py-4 text-sm uppercase tracking-wide text-stone-50 transition-colors hover:bg-[#8d6f58] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? tCommon('submitting', { defaultValue: 'Submitting...' })
                : t('subscribe', { defaultValue: 'Subscribe' })}
            </button>
          </form>
          {statusMessage ? <p className="mt-4 text-sm text-stone-600">{statusMessage}</p> : null}
        </div>

        <div className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12 lg:grid-cols-6">
          <div className="col-span-2">
            <h3 className="mb-6 text-xs uppercase tracking-[0.3em] text-stone-600">
              {t('about', { defaultValue: 'About' })}
            </h3>
            <p className="max-w-xs text-sm leading-relaxed text-stone-600">{siteConfig.description}</p>

            <div className="mt-8 flex gap-6">
              <a
                href={siteConfig.social?.instagram ?? 'https://instagram.com/silkbeauty'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-600 transition-colors hover:text-[#76563f]"
                aria-label={t('instagram')}
              >
                <Instagram className="h-[26px] w-[26px]" strokeWidth={1.8} />
              </a>
              <a
                href={siteConfig.social?.facebook ?? 'https://facebook.com/silkbeauty'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-600 transition-colors hover:text-[#76563f]"
                aria-label={t('facebook')}
              >
                <Facebook className="h-[26px] w-[26px]" strokeWidth={1.8} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-xs uppercase tracking-[0.3em] text-stone-600">
              {t('treatments', { defaultValue: 'Treatments' })}
            </h3>
            <nav className="space-y-3">
              <Link href="/treatments/anti-wrinkle" className="block text-sm text-stone-600 transition-colors hover:text-stone-900">
                {tNav('treatments')}
              </Link>
              <Link href="/conditions" className="block text-sm text-stone-600 transition-colors hover:text-stone-900">
                {tNav('conditions')}
              </Link>
              <Link href="/pricelist" className="block text-sm text-stone-600 transition-colors hover:text-stone-900">
                {tNav('pricelist')}
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="mb-6 text-xs uppercase tracking-[0.3em] text-stone-600">
              {t('information', { defaultValue: 'Information' })}
            </h3>
            <nav className="space-y-3">
              <Link href="/about" className="block text-sm text-stone-600 transition-colors hover:text-stone-900">
                {tNav('about')}
              </Link>
              <Link href="/faq" className="block text-sm text-stone-600 transition-colors hover:text-stone-900">
                {tNav('faq')}
              </Link>
              <Link href="/blog" className="block text-sm text-stone-600 transition-colors hover:text-stone-900">
                {tNav('blog')}
              </Link>
            </nav>
          </div>

          <div className="col-span-2">
            <h3 className="mb-6 text-xs uppercase tracking-[0.3em] text-stone-600">
              {t('visitUs', { defaultValue: 'Visit Us' })}
            </h3>
            <address className="not-italic text-sm leading-relaxed text-stone-600">
              <p className="mb-3">
                {siteConfig.contact.address}
                <br />
                {siteConfig.contact.city}, {siteConfig.contact.country} {siteConfig.contact.postcode}
              </p>
              <p className="mb-3">
                <a href={`tel:${siteConfig.contact.phone}`} className="transition-colors hover:text-[#8d6f58]">
                  {siteConfig.contact.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${siteConfig.contact.email}`} className="transition-colors hover:text-[#8d6f58]">
                  {siteConfig.contact.email}
                </a>
              </p>
            </address>

            <div className="mt-6 border-t border-stone-100 pt-6">
              <dl className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <dt className="text-stone-500">Mon - Fri</dt>
                  <dd className="text-stone-900">{siteConfig.businessHours.monday}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone-500">{t('hours.sat')}</dt>
                  <dd className="text-stone-900">{siteConfig.businessHours.saturday}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-stone-500">{t('hours.sun')}</dt>
                  <dd className="text-stone-900">{siteConfig.businessHours.sunday}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-200 pt-8">
          <div className="flex flex-col gap-6 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-stone-500 lg:flex-row lg:items-center lg:justify-between">
            <span>
              &copy; {currentYear} Black Sea Digital Solutions
            </span>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <Link href="/terms-conditions" className="transition-colors hover:text-[#241f1b]">
                {t('terms', { defaultValue: 'Terms of Use' })}
              </Link>
              <Link href="/privacy-policy" className="transition-colors hover:text-[#241f1b]">
                {t('privacy', { defaultValue: 'Privacy' })}
              </Link>
              <Link href="/terms-conditions" className="transition-colors hover:text-[#241f1b]">
                {t('cookieNotice', { defaultValue: 'Cookie Notice' })}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Image
        aria-hidden="true"
        src="/footer-pattern-preview.svg"
        alt=""
        width={1200}
        height={1}
        className="block w-full border-t border-stone-200"
      />
    </footer>
  );
}
