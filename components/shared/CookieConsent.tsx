'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, Shield, Settings, Check } from 'lucide-react';

interface CookieConsentProps {
  locale: string;
}

const translations: Record<string, {
  title: string;
  description: string;
  acceptAll: string;
  acceptNecessary: string;
  customize: string;
  save: string;
  privacyPolicy: string;
  cookiePolicy: string;
  categories: {
    necessary: { name: string; description: string };
    analytics: { name: string; description: string };
    marketing: { name: string; description: string };
    preferences: { name: string; description: string };
  };
}> = {
  en: {
    title: 'Cookie Preferences',
    description: 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
    acceptAll: 'Accept All',
    acceptNecessary: 'Accept Necessary Only',
    customize: 'Customize',
    save: 'Save Preferences',
    privacyPolicy: 'Privacy Policy',
    cookiePolicy: 'Cookie Policy',
    categories: {
      necessary: { name: 'Necessary', description: 'Essential for the website to function properly. These cannot be disabled.' },
      analytics: { name: 'Analytics', description: 'Help us understand how visitors interact with our website.' },
      marketing: { name: 'Marketing', description: 'Used to deliver personalized advertisements and content.' },
      preferences: { name: 'Preferences', description: 'Remember your settings and preferences for a better experience.' },
    },
  },
  ru: {
    title: 'Настройки Cookies',
    description: 'Мы используем cookies для улучшения вашего опыта просмотра, персонализации контента и анализа трафика. Нажимая "Принять все", вы соглашаетесь с использованием cookies.',
    acceptAll: 'Принять все',
    acceptNecessary: 'Только необходимые',
    customize: 'Настроить',
    save: 'Сохранить',
    privacyPolicy: 'Политика конфиденциальности',
    cookiePolicy: 'Политика cookies',
    categories: {
      necessary: { name: 'Необходимые', description: 'Необходимы для правильной работы сайта. Не могут быть отключены.' },
      analytics: { name: 'Аналитика', description: 'Помогают нам понять, как посетители взаимодействуют с сайтом.' },
      marketing: { name: 'Маркетинг', description: 'Используются для показа персонализированной рекламы и контента.' },
      preferences: { name: 'Предпочтения', description: 'Запоминают ваши настройки для лучшего опыта.' },
    },
  },
  ka: {
    title: 'Cookie პარამეტრები',
    description: 'ჩვენ ვიყენებთ cookies-ს თქვენი გამოცდილების გასაუმჯობესებლად, კონტენტის პერსონალიზებისთვის და ტრაფიკის ანალიზისთვის. "ყველას მიღება"-ზე დაჭერით ეთანხმებით cookies-ის გამოყენებას.',
    acceptAll: 'ყველას მიღება',
    acceptNecessary: 'მხოლოდ აუცილებელი',
    customize: 'მორგება',
    save: 'შენახვა',
    privacyPolicy: 'კონფიდენციალურობის პოლიტიკა',
    cookiePolicy: 'Cookie-ების პოლიტიკა',
    categories: {
      necessary: { name: 'აუცილებელი', description: 'აუცილებელია საიტის სწორი ფუნქციონირებისთვის. ვერ გაითიშება.' },
      analytics: { name: 'ანალიტიკა', description: 'გვეხმარება გავიგოთ, როგორ ურთიერთობენ ვიზიტორები საიტთან.' },
      marketing: { name: 'მარკეტინგი', description: 'გამოიყენება პერსონალიზებული რეკლამისა და კონტენტისთვის.' },
      preferences: { name: 'პრეფერენციები', description: 'იმახსოვრებს თქვენს პარამეტრებს უკეთესი გამოცდილებისთვის.' },
    },
  },
  he: {
    title: 'העדפות קוקיז',
    description: 'אנו משתמשים בקוקיז כדי לשפר את חווית הגלישה שלך, לספק תוכן מותאם אישית ולנתח את התעבורה שלנו. על ידי לחיצה על "קבל הכל", אתה מסכים לשימוש שלנו בקוקיז.',
    acceptAll: 'קבל הכל',
    acceptNecessary: 'קבל רק הכרחי',
    customize: 'התאמה אישית',
    save: 'שמור העדפות',
    privacyPolicy: 'מדיניות פרטיות',
    cookiePolicy: 'מדיניות קוקיז',
    categories: {
      necessary: { name: 'הכרחי', description: 'חיוני לתפקוד התקין של האתר. לא ניתן לכבות.' },
      analytics: { name: 'אנליטיקה', description: 'עוזר לנו להבין כיצד מבקרים מתקשרים עם האתר.' },
      marketing: { name: 'שיווק', description: 'משמש למסירת פרסומות ותוכן מותאם אישית.' },
      preferences: { name: 'העדפות', description: 'זוכר את ההגדרות וההעדפות שלך לחוויה טובה יותר.' },
    },
  },
  ar: {
    title: 'تفضيلات ملفات تعريف الارتباط',
    description: 'نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح الخاصة بك، وتقديم محتوى مخصص، وتحليل حركة المرور لدينا. بالنقر على "قبول الكل"، فإنك توافق على استخدامنا لملفات تعريف الارتباط.',
    acceptAll: 'قبول الكل',
    acceptNecessary: 'قبول الضروري فقط',
    customize: 'تخصيص',
    save: 'حفظ التفضيلات',
    privacyPolicy: 'سياسة الخصوصية',
    cookiePolicy: 'سياسة ملفات تعريف الارتباط',
    categories: {
      necessary: { name: 'ضروري', description: 'ضروري لعمل الموقع بشكل صحيح. لا يمكن تعطيله.' },
      analytics: { name: 'التحليلات', description: 'تساعدنا على فهم كيفية تفاعل الزوار مع موقعنا.' },
      marketing: { name: 'تسويق', description: 'تُستخدم لتقديم إعلانات ومحتوى مخصص.' },
      preferences: { name: 'التفضيلات', description: 'تتذكر إعداداتك وتفضيلاتك لتجربة أفضل.' },
    },
  },
  tr: {
    title: 'Çerez Tercihleri',
    description: 'Çerezleri tarama deneyiminizi geliştirmek, kişiselleştirilmiş içerik sunmak ve trafiğimizi analiz etmek için kullanıyoruz. "Tümünü Kabul Et"e tıklayarak çerez kullanımımızı kabul etmiş olursunuz.',
    acceptAll: 'Tümünü Kabul Et',
    acceptNecessary: 'Sadece Gerekli Olanları Kabul Et',
    customize: 'Özelleştir',
    save: 'Tercihleri Kaydet',
    privacyPolicy: 'Gizlilik Politikası',
    cookiePolicy: 'Çerez Politikası',
    categories: {
      necessary: { name: 'Gerekli', description: 'Web sitesinin düzgün çalışması için zorunlu. Devre dışı bırakılamaz.' },
      analytics: { name: 'Analitik', description: 'Ziyaretçilerin web sitesiyle nasıl etkileşime girdiğini anlamamıza yardımcı olur.' },
      marketing: { name: 'Pazarlama', description: 'Kişiselleştirilmiş reklam ve içerik sunmak için kullanılır.' },
      preferences: { name: 'Tercihler', description: 'Daha iyi bir deneyim için ayarlarınızı ve tercihlerinizi hatırlar.' },
    },
  },
};

export default function CookieConsent({ locale }: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  const t = translations[locale] || translations.en;

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    } else {
      setPreferences(JSON.parse(consent));
    }
  }, []);

  const saveConsent = (newPreferences: typeof preferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify(newPreferences));
    setPreferences(newPreferences);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    saveConsent(allAccepted);
  };

  const acceptNecessary = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    saveConsent(onlyNecessary);
  };

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === 'necessary') return; // Cannot toggle necessary
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const saveCustom = () => {
    saveConsent(preferences);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Main Banner */}
      <AnimatePresence>
        {!showPreferences && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          >
            <div 
              className="max-w-6xl mx-auto rounded-2xl shadow-2xl border p-6 md:p-8"
              style={{ 
                background: 'white',
                borderColor: 'rgba(20, 184, 166, 0.15)'
              }}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                {/* Icon & Text */}
                <div className="flex items-start gap-4 flex-1">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)' }}
                  >
                    <Cookie size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {t.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <a 
                        href={`/${locale}/legal/privacy`} 
                        className="text-teal-600 hover:text-teal-700 flex items-center gap-1"
                      >
                        <Shield size={14} />
                        {t.privacyPolicy}
                      </a>
                      <a 
                        href={`/${locale}/legal/cookies`} 
                        className="text-teal-600 hover:text-teal-700"
                      >
                        {t.cookiePolicy}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <button
                    onClick={acceptAll}
                    className="px-6 py-3 rounded-full text-white font-medium text-sm transition-all hover:scale-105 whitespace-nowrap"
                    style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)' }}
                  >
                    {t.acceptAll}
                  </button>
                  <button
                    onClick={acceptNecessary}
                    className="px-6 py-3 rounded-full bg-gray-100 text-gray-700 font-medium text-sm hover:bg-gray-200 transition-all whitespace-nowrap"
                  >
                    {t.acceptNecessary}
                  </button>
                  <button
                    onClick={() => setShowPreferences(true)}
                    className="px-6 py-3 rounded-full border border-gray-300 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Settings size={16} />
                    {t.customize}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal */}
      <AnimatePresence>
        {showPreferences && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowPreferences(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg z-50 overflow-auto"
            >
              <div 
                className="bg-white rounded-2xl shadow-2xl border p-6"
                style={{ borderColor: 'rgba(20, 184, 166, 0.15)' }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)' }}
                    >
                      <Settings size={20} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{t.title}</h3>
                  </div>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Cookie Categories */}
                <div className="space-y-4 mb-6">
                  {/* Necessary - Always enabled */}
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Shield size={18} className="text-teal-600" />
                        <span className="font-medium text-gray-900">{t.categories.necessary.name}</span>
                        <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 text-xs">Required</span>
                      </div>
                      <div className="w-5 h-5 rounded bg-teal-500 flex items-center justify-center">
                        <Check size={12} className="text-white" />
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{t.categories.necessary.description}</p>
                  </div>

                  {/* Analytics */}
                  <div 
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      preferences.analytics ? 'bg-teal-50 border-teal-200' : 'bg-gray-50 border-gray-200'
                    }`}
                    onClick={() => togglePreference('analytics')}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{t.categories.analytics.name}</span>
                      <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                        preferences.analytics ? 'bg-teal-500' : 'bg-gray-300'
                      }`}>
                        {preferences.analytics && <Check size={12} className="text-white" />}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{t.categories.analytics.description}</p>
                  </div>

                  {/* Marketing */}
                  <div 
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      preferences.marketing ? 'bg-teal-50 border-teal-200' : 'bg-gray-50 border-gray-200'
                    }`}
                    onClick={() => togglePreference('marketing')}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{t.categories.marketing.name}</span>
                      <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                        preferences.marketing ? 'bg-teal-500' : 'bg-gray-300'
                      }`}>
                        {preferences.marketing && <Check size={12} className="text-white" />}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{t.categories.marketing.description}</p>
                  </div>

                  {/* Preferences */}
                  <div 
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      preferences.preferences ? 'bg-teal-50 border-teal-200' : 'bg-gray-50 border-gray-200'
                    }`}
                    onClick={() => togglePreference('preferences')}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{t.categories.preferences.name}</span>
                      <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                        preferences.preferences ? 'bg-teal-500' : 'bg-gray-300'
                      }`}>
                        {preferences.preferences && <Check size={12} className="text-white" />}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{t.categories.preferences.description}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={saveCustom}
                    className="flex-1 px-6 py-3 rounded-full text-white font-medium text-sm transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)' }}
                  >
                    {t.save}
                  </button>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="px-6 py-3 rounded-full border border-gray-300 text-gray-600 font-medium text-sm hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
