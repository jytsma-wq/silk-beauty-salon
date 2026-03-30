'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Clock, MapPin, Star, Send, ChevronRight } from 'lucide-react';

interface WhatsAppButtonProps {
  locale: string;
}

// WhatsApp number
const WHATSAPP_NUMBER = '+995599123456';

// Translations
const translations: Record<string, {
  title: string;
  subtitle: string;
  quickMessage: string;
  send: string;
  popular: string[];
  responseTime: string;
  available: string;
  tooltip: string;
}> = {
  en: {
    title: 'Chat on WhatsApp',
    subtitle: 'Fast response guaranteed',
    quickMessage: 'Quick message',
    send: 'Send Message',
    popular: [
      'Hi! I would like to book an appointment',
      'What are your prices for lip fillers?',
      'Do you have availability today?',
      'I need information about Botox treatment',
    ],
    responseTime: 'We typically respond within 15 minutes',
    available: 'Available now',
    tooltip: 'Please contact us',
  },
  ru: {
    title: 'Чат в WhatsApp',
    subtitle: 'Быстрый ответ гарантирован',
    quickMessage: 'Быстрое сообщение',
    send: 'Отправить',
    popular: [
      'Привет! Хочу записаться на прием',
      'Какие цены на увеличение губ?',
      'Есть ли свободное время сегодня?',
      'Мне нужна информация о ботоксе',
    ],
    responseTime: 'Обычно отвечаем в течение 15 минут',
    available: 'Сейчас на связи',
    tooltip: 'Пожалуйста, свяжитесь с нами',
  },
  ka: {
    title: 'WhatsApp-ზე ჩატი',
    subtitle: 'სწრაფი პასუხი',
    quickMessage: 'სწრაფი შეტყობინება',
    send: 'გაგზავნა',
    popular: [
      'გამარჯობა! მინდა დავჯავშნო',
      'რა ღირს ტუჩების შევსება?',
      'გაქვთ თავისუფალი დრო?',
      'მჭირდება ინფორმაცია ბოტოქსის შესახებ',
    ],
    responseTime: 'ვპასუხობთ 15 წუთში',
    available: 'ახლა ხელმისაწვდომია',
    tooltip: 'გთხოვთ, დაგვიკავშირდეთ',
  },
  he: {
    title: "צ'אט ב-WhatsApp",
    subtitle: 'תגובה מהירה מובטחת',
    quickMessage: 'הודעה מהירה',
    send: 'שלח',
    popular: [
      'היי! אני רוצה לקבוע תור',
      'מה המחירים למילוי שפתיים?',
      'יש לכם זמינות היום?',
      'אני צריכה מידע על בוטוקס',
    ],
    responseTime: 'נענה תוך 15 דקות',
    available: 'זמינים עכשיו',
    tooltip: 'אנא צור איתנו קשר',
  },
  ar: {
    title: 'محادثة واتساب',
    subtitle: 'رد سريع مضمون',
    quickMessage: 'رسالة سريعة',
    send: 'إرسال',
    popular: [
      'مرحباً! أريد حجز موعد',
      'ما أسعار حشو الشفاه؟',
      'هل لديكم موعد متاح اليوم؟',
      'أحتاج معلومات عن البوتوكس',
    ],
    responseTime: 'نرد خلال 15 دقيقة',
    available: 'متاح الآن',
    tooltip: 'يرجى الاتصال بنا',
  },
  tr: {
    title: "WhatsApp'ta Sohbet",
    subtitle: 'Hızlı yanıt garantisi',
    quickMessage: 'Hızlı mesaj',
    send: 'Gönder',
    popular: [
      'Merhaba! Randevu almak istiyorum',
      'Dudak dolgusu fiyatları nedir?',
      'Bugün müsait misiniz?',
      'Botox hakkında bilgi istiyorum',
    ],
    responseTime: '15 dakika içinde yanıt veriyoruz',
    available: 'Şimdi müsait',
    tooltip: 'Lütfen bizimle iletişime geçin',
  },
};

export default function WhatsAppButton({ locale }: WhatsAppButtonProps) {
  const [open, setOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const t = translations[locale] || translations.en;

  const handleWhatsAppClick = (message?: string) => {
    const encodedMessage = encodeURIComponent(message || customMessage || t.popular[0]);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Floating WhatsApp Button with Tooltip - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !open && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              className="absolute bottom-full right-0 mb-3 whitespace-nowrap"
            >
              <div 
                className="px-4 py-3 rounded-2xl shadow-xl border"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(37,211,102,0.95), rgba(18,140,126,0.95))',
                  borderColor: 'rgba(255,255,255,0.1)'
                }}
              >
                <p className="text-white text-sm font-medium">{t.tooltip}</p>
                {/* Arrow */}
                <div 
                  className="absolute bottom-0 right-6 w-3 h-3 rotate-45 translate-y-1.5"
                  style={{ background: 'rgb(18,140,126)' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Button */}
        <motion.button
          onClick={() => setOpen(true)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => !open && setTimeout(() => setShowTooltip(false), 2000)}
          className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
          style={{ 
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
          }}
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            boxShadow: [
              '0 0 20px rgba(37, 211, 102, 0.3)', 
              '0 0 40px rgba(37, 211, 102, 0.6)', 
              '0 0 20px rgba(37, 211, 102, 0.3)'
            ] 
          }}
          transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
        >
          {/* WhatsApp Icon */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          
          {/* Notification Badge */}
          {!open && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
            >
              <span className="text-white text-xs font-bold">1</span>
            </motion.span>
          )}
        </motion.button>
      </div>

      {/* WhatsApp Popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20, x: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] rounded-3xl overflow-hidden shadow-2xl border"
            style={{ background: 'white', borderColor: 'rgba(37, 211, 102, 0.2)' }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{ background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.1), rgba(18, 140, 126, 0.05))' }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
                  />
                </div>
                <div>
                  <p className="text-gray-900 text-base font-bold">{t.title}</p>
                  <div className="flex items-center gap-1.5">
                    <Clock size={10} className="text-green-500" />
                    <p className="text-green-600/70 text-xs">{t.available}</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setOpen(false)} 
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 bg-gray-50">
              {/* Response Time */}
              <div className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-white border border-gray-200">
                <Star size={14} className="text-green-500" />
                <p className="text-gray-600 text-xs">{t.responseTime}</p>
              </div>

              {/* Quick Messages */}
              <div className="mb-4">
                <p className="text-green-600 text-xs mb-2 flex items-center gap-1">
                  <MessageCircle size={10} />
                  {t.quickMessage}
                </p>
                <div className="space-y-2">
                  {t.popular.map((msg, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleWhatsAppClick(msg)}
                      className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm bg-white hover:border-green-400 hover:text-green-700 transition-all flex items-center justify-between group"
                    >
                      <span className="line-clamp-1">{msg}</span>
                      <ChevronRight size={14} className="text-gray-300 group-hover:text-green-500 transition-colors" />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Custom Message */}
              <div className="space-y-2">
                <p className="text-gray-400 text-xs">— {locale === 'ru' ? 'или' : locale === 'ka' ? 'ან' : 'or'} —</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder={locale === 'ru' ? 'Введите сообщение...' : locale === 'ka' ? 'შეიყვანეთ შეტყობინება...' : 'Type your message...'}
                    className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-700 text-sm outline-none focus:border-green-400 transition-colors placeholder:text-gray-400"
                  />
                  <motion.button
                    onClick={() => customMessage && handleWhatsAppClick(customMessage)}
                    disabled={!customMessage}
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all disabled:opacity-40"
                    style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send size={16} className="text-white" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Footer Info */}
            <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-center gap-4 bg-white">
              <a 
                href="tel:+995599123456" 
                className="flex items-center gap-1.5 text-gray-500 hover:text-green-600 text-xs transition-colors"
              >
                <Phone size={12} />
                +995 599 123 456
              </a>
              <span className="text-gray-200">|</span>
              <a 
                href="https://maps.google.com/?q=28+Rustaveli+Avenue+Batumi+Georgia" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-gray-500 hover:text-green-600 text-xs transition-colors"
              >
                <MapPin size={12} />
                Batumi, Georgia
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}