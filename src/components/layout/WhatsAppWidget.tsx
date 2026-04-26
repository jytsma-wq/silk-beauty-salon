'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { useTranslations } from 'next-intl';
import { trackContactClick } from '@/lib/analytics';
import { useConsent } from '@/components/providers/ConsentProvider';
import { cn } from '@/lib/utils';

export function WhatsAppWidget() {
  const t = useTranslations('whatsapp');
  const { showBanner } = useConsent();
  const phoneNumber = siteConfig.contact.phone.replace(/\s/g, '').replace('+', '');
  const [isOpen, setIsOpen] = useState(false);

  const quickMessages = [
    t('bookAppointment'),
    t('serviceQuestion'),
    t('pricingInfo'),
    t('otherInquiry')
  ];

  const handleQuickMessage = (message: string) => {
    trackContactClick('whatsapp');
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    setIsOpen(false);
  };

  // Close popup on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div 
      className={cn(
        "fixed right-6 z-40 transition-all duration-300",
        showBanner ? "bottom-32" : "bottom-6"
      )}
    >
      {/* Chat Popup */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 bg-background rounded-sm shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Header */}
          <div className="bg-[#25D366] p-4 flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white">Silk Beauty Salon</p>
              <p className="text-xs text-white/80">{t('typicalReply')}</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 rounded p-1"
              aria-label={t('close')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Welcome Message */}
          <div className="p-4 bg-[#f8f9fa]">
            <p className="text-sm text-gray-700 mb-4">
              {t('greeting')}
            </p>
            
            {/* Quick Reply Buttons */}
            <div className="space-y-2">
              {quickMessages.map((msg) => (
                <button
                  key={msg}
                  onClick={() => handleQuickMessage(msg)}
                  className="w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-sm text-sm text-gray-700 hover:bg-gray-50 hover:border-[#25D366] focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20 transition-colors flex items-center justify-between group outline-none"
                >
                  {msg}
                  <Send className="w-4 h-4 text-gray-400 group-hover:text-[#25D366]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        type="button"
        className="bg-[#25D366] hover:bg-[#20BD5A] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 group"
        aria-label={t('chatOnWhatsApp')}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <>
            <MessageCircle className="w-7 h-7" />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {t('chatOnWhatsApp')}
            </span>
          </>
        )}
      </button>
    </div>
  );
}
