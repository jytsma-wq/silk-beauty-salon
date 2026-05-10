'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import { useConsent } from '@/components/providers/ConsentProvider';
import { baseTreatmentCategories } from '@/data/treatments';
import { siteConfig } from '@/data/site-config';
import { trackContactClick } from '@/lib/analytics';
import { cn } from '@/lib/utils';

const HOLD_DELAY_MS = 500;

export function WhatsAppWidget() {
  const t = useTranslations('whatsapp');
  const pathname = usePathname();
  const { showBanner } = useConsent();
  const phoneNumber = siteConfig.contact.phone.replace(/\s/g, '').replace('+', '');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const holdTimer = useRef<number | null>(null);
  const longPressTriggered = useRef(false);
  const lastActivationAt = useRef(0);

  const serviceName = useMemo(() => {
    const treatmentMatch = pathname.match(/\/treatments\/([^/]+)/);
    const slug = treatmentMatch?.[1];
    if (!slug) return null;

    for (const category of baseTreatmentCategories) {
      const treatment = category.treatments.find((item) => item.slug === slug);
      if (treatment) return treatment.name;
    }

    return slug
      .split('-')
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }, [pathname]);

  const bookingMessage = serviceName
    ? t('prefillWithService', { service: serviceName })
    : t('prefillBooking');

  const openWhatsApp = (message: string) => {
    trackContactClick('whatsapp');
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    setIsMenuOpen(false);
  };

  const clearHoldTimer = () => {
    if (holdTimer.current) {
      window.clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  const activatePrimary = () => {
    if (longPressTriggered.current) {
      longPressTriggered.current = false;
      return;
    }

    const now = Date.now();
    if (now - lastActivationAt.current < 300) return;
    lastActivationAt.current = now;
    openWhatsApp(bookingMessage);
  };

  const handlePointerDown = () => {
    longPressTriggered.current = false;
    clearHoldTimer();
    holdTimer.current = window.setTimeout(() => {
      longPressTriggered.current = true;
      setIsMenuOpen(true);
    }, HOLD_DELAY_MS);
  };

  const handlePointerUp = () => {
    clearHoldTimer();
    activatePrimary();
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    clearHoldTimer();
    longPressTriggered.current = true;
    setIsMenuOpen(true);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      clearHoldTimer();
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const secondaryMessages = [
    t('serviceQuestion'),
    t('pricingInfo'),
    t('otherInquiry'),
  ];

  return (
    <div
      className={cn(
        'fixed right-6 z-[60] transition-all duration-300',
        showBanner ? 'bottom-52 sm:bottom-32' : 'bottom-6'
      )}
    >
      {isMenuOpen && (
        <div className="absolute bottom-20 right-0 w-72 rounded-sm border border-gray-200 bg-white p-2 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          {secondaryMessages.map((message) => (
            <button
              key={message}
              type="button"
              onClick={() => openWhatsApp(message)}
              className="flex w-full items-center justify-between rounded-sm px-3 py-3 text-left text-sm text-gray-700 outline-none transition-colors hover:bg-gray-50 focus:bg-gray-50 focus:ring-2 focus:ring-[#25D366]/30"
            >
              <span>{message}</span>
              <Send className="h-4 w-4 text-[#25D366]" />
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        className="group relative rounded-full bg-[#25D366] p-4 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#20BD5A] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
        aria-label={t('chatOnWhatsApp')}
        aria-expanded={isMenuOpen}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={clearHoldTimer}
        onPointerLeave={clearHoldTimer}
        onContextMenu={handleContextMenu}
        onMouseUp={(event) => {
          if (event.button === 0) activatePrimary();
        }}
        onClick={activatePrimary}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openWhatsApp(bookingMessage);
          }
        }}
      >
        <MessageCircle className="h-7 w-7" />
        <span className="absolute right-0 top-0 h-3 w-3 rounded-full bg-white">
          <span className="absolute inset-0 rounded-full bg-white/80 animate-ping" />
        </span>
        <span className="absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
          {t('chatOnWhatsApp')}
        </span>
      </button>
    </div>
  );
}
