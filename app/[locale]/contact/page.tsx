'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { buildWhatsAppBookingLink } from '@/lib/whatsapp';
import { SALON_INFO } from '@/lib/constants';
import PageHero from '@/components/shared/PageHero';

// Colored Social Media Icons as SVG components
const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" fill="#000"/>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" fill="#25F4EE"/>
    <path d="M5.54 9.23c1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07" fill="#FE2C55"/>
  </svg>
);

const CONTACT_IMAGES = [
  'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1920&q=90',
  'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1920&q=90',
  'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=1920&q=90',
  'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=1920&q=90',
];

const services = {
  en: [
    'Lip Filler – Russian Technique',
    'Botox – Full Face',
    'Cheek Filler',
    'Russian Volume Lashes',
    'Lash Lift & Tint',
    'Brow Lamination',
    'Microblading',
    'HydraFacial',
    'Balayage',
    'Gel Manicure',
    'Other / Consultation',
  ],
  ru: [
    'Увеличение губ – Русская техника',
    'Ботокс – Всё лицо',
    'Скуловой филлер',
    'Русский объём ресниц',
    'Ламинирование ресниц',
    'Ламинирование бровей',
    'Микроблейдинг',
    'Гидрафишл',
    'Балаяж',
    'Гель-маникюр',
    'Другое / Консультация',
  ],
  ka: [
    'ტუჩების შევსება – რუსული ტექნიკა',
    'ბოტოქსი – მთლიანად სახეზე',
    'ლოყების შევსება',
    'რუსული მოცულობითი წამწამები',
    'წამწამების აწევა და დაჭრა',
    'წვეროების ლამინაცია',
    'მიკრობლეიდინგი',
    'ჰიდრაფეიშალი',
    'ბალაიაჟი',
    'გელ მანიკური',
    'სხვა / კონსულტაცია',
  ],
  he: [
    'מילוי שפתיים – טכניקה רוסית',
    'בוטוקס – כל הפנים',
    'מילוי לחיים',
    'ריסים נפח רוסי',
    'הרמת וצביעת ריסים',
    'למינציית גבות',
    'מיקרובליידינג',
    'הידרה-פיישל',
    'בלאיאז\'',
    'מניקור ג\'ל',
    'אחר / ייעוץ',
  ],
  ar: [
    'حشو الشفاه – التقنية الروسية',
    'البوتوكس – الوجه كاملاً',
    'حشو الخدود',
    'رموش الحجم الروسي',
    'رفع وصبغ الرموش',
    'فرد الحواجب',
    'المايكروبلايدنج',
    'هايدروفاشيال',
    'بالاياژ',
    'مانيكير جل',
    'أخرى / استشارة',
  ],
  tr: [
    'Dudak Dolgusu – Rus Tekniği',
    'Botox – Yüz Genel',
    'Elmacık Kemiği Dolgusu',
    'Rus Hacim Kirpikler',
    'Kirpik Kıvırma ve Boyama',
    'Kaş Laminasyonu',
    'Microblading',
    'HydraFacial',
    'Balayage',
    'Jel Manikür',
    'Diğer / Danışmanlık',
  ],
};

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export default function ContactPage({ params }: ContactPageProps) {
  // For client components, we need to use the locale from params
  // This is a workaround since we can't easily use async params in client components
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', date: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [locale, setLocale] = useState<string>('en');

  // Get locale from params
  params.then((p) => setLocale(p.locale));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const link = buildWhatsAppBookingLink({
      service: form.service,
      name: form.name,
      date: form.date,
    });
    await new Promise((r) => setTimeout(r, 800));
    window.open(link, '_blank');
    setStatus('success');
  };

  // Translations
  const translations = {
    en: {
      title: 'Book Your Appointment',
      fullName: 'Full Name',
      phone: 'Phone / WhatsApp',
      email: 'Email',
      treatment: 'Treatment',
      date: 'Preferred Date',
      message: 'Message',
      submit: 'Confirm Booking Request',
      success: 'Request Sent!',
      successSub: "We've opened WhatsApp for you. We'll confirm your appointment within 1 hour.",
      selectTreatment: 'Select a treatment',
      address: 'Address',
      phoneLabel: 'Phone & WhatsApp',
      emailLabel: 'Email',
      hours: 'Hours',
      loading: 'Loading...',
      followUs: 'Follow Us',
      placeholder: {
        name: 'Your name',
        phone: '+995 599 ...',
        email: 'your@email.com',
        message: 'Any questions or specific requests...',
      },
    },
    ru: {
      title: 'Запись на приём',
      fullName: 'Имя и фамилия',
      phone: 'Телефон / WhatsApp',
      email: 'Email',
      treatment: 'Услуга',
      date: 'Предпочтительная дата',
      message: 'Сообщение',
      submit: 'Подтвердить запись',
      success: 'Запрос отправлен!',
      successSub: 'Мы подтвердим запись через WhatsApp в течение 1 часа.',
      selectTreatment: 'Выберите услугу',
      address: 'Адрес',
      phoneLabel: 'Телефон и WhatsApp',
      emailLabel: 'Email',
      hours: 'Часы работы',
      loading: 'Загрузка...',
      followUs: 'Подписывайтесь',
      placeholder: {
        name: 'Ваше имя',
        phone: '+995 599 ...',
        email: 'ваш@email.com',
        message: 'Любые вопросы или особые пожелания...',
      },
    },
    ka: {
      title: 'ვიზიტის დაჯავშნა',
      fullName: 'სახელი და გვარი',
      phone: 'ტელეფონი / WhatsApp',
      email: 'ელ-ფოსტა',
      treatment: 'მომსახურება',
      date: 'სასურველი თარიღი',
      message: 'შეტყობინება',
      submit: 'დაჯავშნის მოთხოვნა',
      success: 'მოთხოვნა გაიგზავნა!',
      successSub: 'ჩვენ დავადასტურებთ ვიზიტს WhatsApp-ით 1 საათის განმავლობაში.',
      selectTreatment: 'აირჩიეთ მომსახურება',
      address: 'მისამართი',
      phoneLabel: 'ტელეფონი და WhatsApp',
      emailLabel: 'ელ-ფოსტა',
      hours: 'სამუშაო საათები',
      loading: 'იტვირთება...',
      followUs: 'გამოგვყევით',
      placeholder: {
        name: 'თქვენი სახელი',
        phone: '+995 599 ...',
        email: 'თქვენი@ელფოსტა.com',
        message: 'ნებისმიერი კითხვა ან სპეციფიკური მოთხოვნა...',
      },
    },
    he: {
      title: 'הזמנת תור',
      fullName: 'שם מלא',
      phone: 'טלפון / WhatsApp',
      email: 'אימייל',
      treatment: 'טיפול',
      date: 'תאריך מועדף',
      message: 'הודעה',
      submit: 'אשר הזמנה',
      success: 'הבקשה נשלחה!',
      successSub: 'נאשר את התור שלך ב-WhatsApp תוך שעה.',
      selectTreatment: 'בחר טיפול',
      address: 'כתובת',
      phoneLabel: 'טלפון ו-WhatsApp',
      emailLabel: 'אימייל',
      hours: 'שעות',
      loading: 'טוען...',
      followUs: 'עקבו אחרינו',
      placeholder: {
        name: 'השם שלך',
        phone: '+995 599 ...',
        email: 'your@email.com',
        message: 'שאלות או בקשות מיוחדות...',
      },
    },
    ar: {
      title: 'احجز موعدك',
      fullName: 'الاسم الكامل',
      phone: 'الهاتف / واتساب',
      email: 'البريد الإلكتروني',
      treatment: 'العلاج',
      date: 'التاريخ المفضل',
      message: 'رسالة',
      submit: 'تأكيد الحجز',
      success: 'تم إرسال الطلب!',
      successSub: 'سنؤكد موعدك عبر واتساب خلال ساعة.',
      selectTreatment: 'اختر علاجاً',
      address: 'العنوان',
      phoneLabel: 'الهاتف وواتساب',
      emailLabel: 'البريد الإلكتروني',
      hours: 'ساعات العمل',
      loading: 'جارٍ التحميل...',
      followUs: 'تابعونا',
      placeholder: {
        name: 'اسمك',
        phone: '+995 599 ...',
        email: 'your@email.com',
        message: 'أي أسئلة أو طلبات محددة...',
      },
    },
    tr: {
      title: 'Randevunuzu Alın',
      fullName: 'Ad Soyad',
      phone: 'Telefon / WhatsApp',
      email: 'E-posta',
      treatment: 'Tedavi',
      date: 'Tercih Edilen Tarih',
      message: 'Mesaj',
      submit: 'Randevu Talebini Onayla',
      success: 'Talep Gönderildi!',
      successSub: 'Randevunuzu 1 saat içinde WhatsApp ile onaylayacağız.',
      selectTreatment: 'Bir tedavi seçin',
      address: 'Adres',
      phoneLabel: 'Telefon ve WhatsApp',
      emailLabel: 'E-posta',
      hours: 'Çalışma Saatleri',
      loading: 'Yükleniyor...',
      followUs: 'Bizi Takip Edin',
      placeholder: {
        name: 'Adınız',
        phone: '+995 599 ...',
        email: 'your@email.com',
        message: 'Herhangi bir soru veya özel istek...',
      },
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;
  const serviceList = services[locale as keyof typeof services] || services.en;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Page Hero Slider */}
      <PageHero pageKey="contact" images={CONTACT_IMAGES} />

      <div className="container mx-auto max-w-6xl px-6 pt-8 pb-20">
        {/* Header */}
        <div className="text-center mb-16 -mt-10 relative z-10">
          <h1
            className="font-display font-bold text-gray-900"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
            }}
          >
            {t.title}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form — 3 cols */}
          <div className="lg:col-span-3">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 rounded-3xl border border-teal-200 bg-white shadow-sm"
              >
                <CheckCircle2 size={48} className="text-teal-500 mx-auto mb-5" />
                <h3 className="text-gray-900 font-display text-2xl font-bold mb-3">{t.success}</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  {t.successSub}
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 p-8 rounded-3xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-500 text-xs tracking-wide uppercase block mb-2">{t.fullName} *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm outline-none focus:border-teal-400 transition-colors placeholder:text-gray-400"
                      placeholder={t.placeholder.name}
                    />
                  </div>
                  <div>
                    <label className="text-gray-500 text-xs tracking-wide uppercase block mb-2">{t.phone} *</label>
                    <input
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm outline-none focus:border-teal-400 transition-colors placeholder:text-gray-400"
                      placeholder={t.placeholder.phone}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-500 text-xs tracking-wide uppercase block mb-2">{t.email}</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm outline-none focus:border-teal-400 transition-colors placeholder:text-gray-400"
                    placeholder={t.placeholder.email}
                  />
                </div>

                <div>
                  <label className="text-gray-500 text-xs tracking-wide uppercase block mb-2">{t.treatment} *</label>
                  <select
                    required
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm outline-none focus:border-teal-400 transition-colors"
                  >
                    <option value="" disabled>{t.selectTreatment}</option>
                    {serviceList.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-gray-500 text-xs tracking-wide uppercase block mb-2">{t.date}</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm outline-none focus:border-teal-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-gray-500 text-xs tracking-wide uppercase block mb-2">{t.message}</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={3}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm outline-none focus:border-teal-400 transition-colors resize-none placeholder:text-gray-400"
                    placeholder={t.placeholder.message}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 rounded-xl text-white font-semibold tracking-wide text-sm transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)' }}
                >
                  {status === 'loading'
                    ? <><Loader2 size={16} className="animate-spin" /> {t.loading}</>
                    : t.submit}
                </button>
              </form>
            )}
          </div>

          {/* Contact info — 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: MapPin, label: t.address, value: SALON_INFO.address },
              { icon: Phone, label: t.phoneLabel, value: SALON_INFO.phone },
              { icon: Mail, label: t.emailLabel, value: SALON_INFO.email },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex gap-4 p-5 rounded-2xl border border-gray-200 bg-white shadow-sm">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-teal-50">
                    <Icon size={16} className="text-teal-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1 uppercase tracking-wide">{item.label}</p>
                    <p className="text-gray-700 text-sm whitespace-pre-line">{item.value}</p>
                  </div>
                </div>
              );
            })}

            {/* Hours */}
            <div className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={14} className="text-teal-500" />
                <span className="text-gray-400 text-xs uppercase tracking-wide">{t.hours}</span>
              </div>
              {SALON_INFO.hours.map((h) => (
                <div key={h.day} className="flex justify-between text-sm py-1.5 border-b border-gray-100 last:border-0">
                  <span className="text-gray-500">{h.day}</span>
                  <span className="text-gray-700">{h.hours}</span>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm">
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-4">{t.followUs}</p>
              <div className="flex items-center gap-4">
                <a
                  href={SALON_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
                <a
                  href={SALON_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href={SALON_INFO.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label="TikTok"
                >
                  <TikTokIcon />
                </a>
              </div>
            </div>

            {/* Map embed */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 h-52">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.3!2d${SALON_INFO.coordinates.lng}!3d${SALON_INFO.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDFCsDM4JzQ4LjUiTiA0McKwMzgnMTIuMSJF!5e0!3m2!1sen!2sge!4v1`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}