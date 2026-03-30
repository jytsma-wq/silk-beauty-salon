'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Cookie, X, Settings, Check } from 'lucide-react';

interface CookieConsentProps {
  locale: string;
}

const COOKIE_CONSENT_KEY = 'silk-beauty-cookie-consent';

// Translations
const translations: Record<string, {
  title: string;
  description: string;
  acceptAll: string;
  acceptNecessary: string;
  settings: string;
  learnMore: string;
  necessary: string;
  necessaryDesc: string;
  analytics: string;
  analyticsDesc: string;
  marketing: string;
  marketingDesc: string;
  save: string;
}> = {
  en: {
    title: 'Cookie Preferences',
    description: 'We use cookies to enhance your experience, analyze site traffic, and personalize content. By clicking "Accept All", you consent to our use of cookies.',
    acceptAll: 'Accept All',
    acceptNecessary: 'Necessary Only',
    settings: 'Settings',
    learnMore: 'Learn more',
    necessary: 'Necessary Cookies',
    necessaryDesc: 'Essential for the website to function. Cannot be disabled.',
    analytics: 'Analytics Cookies',
    analyticsDesc: 'Help us understand how visitors interact with our website.',
    marketing: 'Marketing Cookies',
    marketingDesc: 'Used to deliver relevant ads and measure their effectiveness.',
    save: 'Save Preferences',
  },
  ru: {
    title: 'Настройки файлов cookie',
    description: 'Мы используем файлы cookie для улучшения вашего опыта, анализа трафика и персонализации контента. Нажимая "Принять все", вы соглашаетесь на использование файлов cookie.',
    acceptAll: 'Принять все',
    acceptNecessary: 'Только необходимые',
    settings: 'Настройки',
    learnMore: 'Подробнее',
    necessary: 'Необходимые файлы cookie',
    necessaryDesc: 'Необходимы для работы сайта. Не могут быть отключены.',
    analytics: 'Аналитические файлы cookie',
    analyticsDesc: 'Помогают нам понять, как посетители взаимодействуют с сайтом.',
    marketing: 'Маркетинговые файлы cookie',
    marketingDesc: 'Используются для показа релевантной рекламы.',
    save: 'Сохранить настройки',
  },
  ka: {
    title: 'Cookie-ის პარამეტრები',
    description: 'ჩვენ ვიყენებთ cookies-ს თქვენი გამოცდილების გასაუმჯობესებლად, ტრაფიკის ანალიზისთვის და კონტენტის პერსონალიზაციისთვის.',
    acceptAll: 'ყველას მიღება',
    acceptNecessary: 'მხოლოდ აუცილებელი',
    settings: 'პარამეტრები',
    learnMore: 'გაიგე მეტი',
    necessary: 'აუცილებელი Cookies',
    necessaryDesc: 'აუცილებელია საიტის ფუნქციონირებისთვის. ვერ გამოირთვება.',
    analytics: 'ანალიტიკური Cookies',
    analyticsDesc: 'გვეხმარება გავიგოთ როგორ ურთიერთობენ ვიზიტორები საიტთან.',
    marketing: 'მარკეტინგული Cookies',
    marketingDesc: 'გამოიყენება შესაბამისი რეკლამების საჩვენებლად.',
    save: 'შენახვა',
  },
  he: {
    title: 'העדפות עוגיות',
    description: 'אנו משתמשים בעוגיות כדי לשפר את החוויה שלך, לנתח תנועה ולהתאים אישית תוכן.',
    acceptAll: 'קבל הכל',
    acceptNecessary: 'רק הכרחיות',
    settings: 'הגדרות',
    learnMore: 'למד עוד',
    necessary: 'עוגיות הכרחיות',
    necessaryDesc: 'חיוניות לתפקוד האתר. לא ניתן לבטל.',
    analytics: 'עוגיות אנליטיות',
    analyticsDesc: 'עוזרות לנו להבין איך מבקרים מתקשרים עם האתר.',
    marketing: 'עוגיות שיווקיות',
    marketingDesc: 'משמשות להצגת פרסומות רלוונטיות.',
    save: 'שמור העדפות',
  },
  ar: {
    title: 'تفضيلات ملفات تعريف الارتباط',
    description: 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل حركة المرور وتخصيص المحتوى.',
    acceptAll: 'قبول الكل',
    acceptNecessary: 'الضرورية فقط',
    settings: 'الإعدادات',
    learnMore: 'اعرف المزيد',
    necessary: 'ملفات تعريف الارتباط الضرورية',
    necessaryDesc: 'ضرورية لعمل الموقع. لا يمكن تعطيلها.',
    analytics: 'ملفات تعريف الارتباط التحليلية',
    analyticsDesc: 'تساعدنا على فهم كيفية تفاعل الزوار مع الموقع.',
    marketing: 'ملفات تعريف الارتباط التسويقية',
    marketingDesc: 'تُستخدم لعرض إعلانات ذات صلة.',
    save: 'حفظ التفضيلات',
  },
  tr: {
    title: 'Çerez Tercihleri',
    description: 'Deneyiminizi geliştirmek, trafiği analiz etmek ve içeriği kişiselleştirmek için çerezleri kullanıyoruz.',
    acceptAll: 'Tümünü Kabul Et',
    acceptNecessary: 'Sadece Gerekli',
    settings: 'Ayarlar',
    learnMore: 'Daha fazla bilgi',
    necessary: 'Gerekli Çerezler',
    necessaryDesc: 'Sitenin çalışması için gereklidir. Devre dışı bırakılamaz.',
    analytics: 'Analitik Çerezler',
    analyticsDesc: 'Ziyaretçilerin siteyle nasıl etkileşim kurduğunu anlamamıza yardımcı olur.',
    marketing: 'Pazarlama Çerezleri',
    marketingDesc: 'İlgili reklamları göstermek için kullanılır.',
    save: 'Tercihleri Kaydet',
  },
};

export default function CookieConsent({ locale }: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  const t = translations[locale] || translations.en;

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  const saveConsent = (prefs: typeof preferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  };

  const handleAcceptNecessary = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed bottom-0 inset-x-0 z-[60] p-4"
      >
        <div 
          className="max-w-4xl mx-auto rounded-2xl border shadow-2xl overflow-hidden"
          style={{ 
            background: 'linear-gradient(180deg, rgba(26,18,14,0.98) 0%, rgba(13,10,8,0.98) 100%)',
            borderColor: 'rgba(201,169,110,0.2)'
          }}
        >
          {!showSettings ? (
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #C9A96E, #a07840)' }}
                >
                  <Cookie size={20} className="text-stone-900" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-base mb-2">{t.title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed mb-4">
                    {t.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleAcceptAll}
                      className="px-5 py-2.5 rounded-full text-sm font-semibold text-stone-900 transition-all hover:scale-105"
                      style={{ 
                        background: 'linear-gradient(135deg, #C9A96E, #a07840)'
                      }}
                    >
                      {t.acceptAll}
                    </button>
                    <button
                      onClick={handleAcceptNecessary}
                      className="px-5 py-2.5 rounded-full text-sm font-medium text-stone-300 border border-stone-700 hover:border-stone-500 transition-colors"
                    >
                      {t.acceptNecessary}
                    </button>
                    <button
                      onClick={() => setShowSettings(true)}
                      className="px-5 py-2.5 rounded-full text-sm font-medium text-stone-400 hover:text-stone-200 transition-colors flex items-center gap-2"
                    >
                      <Settings size={14} />
                      {t.settings}
                    </button>
                    <Link
                      href={`/${locale}/legal/cookies`}
                      className="text-amber-400 hover:text-amber-300 text-sm transition-colors"
                    >
                      {t.learnMore}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold text-base">{t.title}</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-400 hover:text-stone-200 transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                {/* Necessary */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-stone-900/50 border border-stone-800">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-medium text-sm">{t.necessary}</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-400 text-xs">Always on</span>
                    </div>
                    <p className="text-stone-500 text-xs">{t.necessaryDesc}</p>
                  </div>
                  <div className="w-10 h-6 rounded-full bg-amber-400/20 flex items-center justify-end px-0.5">
                    <Check size={14} className="text-amber-400" />
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-stone-900/50 border border-stone-800">
                  <div className="flex-1">
                    <span className="text-white font-medium text-sm block mb-1">{t.analytics}</span>
                    <p className="text-stone-500 text-xs">{t.analyticsDesc}</p>
                  </div>
                  <button
                    onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                    className={`w-10 h-6 rounded-full transition-all ${
                      preferences.analytics 
                        ? 'bg-amber-400/30' 
                        : 'bg-stone-700'
                    } flex items-center px-0.5`}
                    style={{ justifyContent: preferences.analytics ? 'flex-end' : 'flex-start' }}
                  >
                    <div 
                      className={`w-5 h-5 rounded-full transition-all ${
                        preferences.analytics ? 'bg-amber-400' : 'bg-stone-400'
                      }`}
                    />
                  </button>
                </div>

                {/* Marketing */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-stone-900/50 border border-stone-800">
                  <div className="flex-1">
                    <span className="text-white font-medium text-sm block mb-1">{t.marketing}</span>
                    <p className="text-stone-500 text-xs">{t.marketingDesc}</p>
                  </div>
                  <button
                    onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                    className={`w-10 h-6 rounded-full transition-all ${
                      preferences.marketing 
                        ? 'bg-amber-400/30' 
                        : 'bg-stone-700'
                    } flex items-center px-0.5`}
                    style={{ justifyContent: preferences.marketing ? 'flex-end' : 'flex-start' }}
                  >
                    <div 
                      className={`w-5 h-5 rounded-full transition-all ${
                        preferences.marketing ? 'bg-amber-400' : 'bg-stone-400'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-5 py-2.5 rounded-full text-sm font-medium text-stone-400 hover:text-stone-200 transition-colors"
                >
                  {locale === 'ru' ? 'Отмена' : locale === 'ka' ? 'გაუქმება' : 'Cancel'}
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold text-stone-900 transition-all hover:scale-105"
                  style={{ 
                    background: 'linear-gradient(135deg, #C9A96E, #a07840)'
                  }}
                >
                  {t.save}
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}