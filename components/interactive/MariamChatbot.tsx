'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, Sparkles, Phone, MapPin, Clock, Star } from 'lucide-react';
import type { ChatMessage } from '@/types/types';
import { sendMessage } from '@/app/actions/chat';

// Suggested questions in multiple languages
const SUGGESTED_QUESTIONS: Record<string, string[]> = {
  en: [
    'What treatments do you offer?',
    'How much does lip filler cost?',
    'Tell me about Botox treatments',
    'How do I book an appointment?',
    'What are your opening hours?',
    'Do you offer Russian Volume lashes?',
  ],
  ru: [
    'Какие процедуры вы предлагаете?',
    'Сколько стоит увеличение губ?',
    'Расскажите о ботоксе',
    'Как записаться на прием?',
    'Часы работы салона?',
    'У вас есть русские объемные ресницы?',
  ],
  ka: [
    'რა პროცედურები გაქვთ?',
    'რამდენი ღირს ტუჩების შევსება?',
    'მომიყევით ბოტოქსის შესახებ',
    'როგორ დავჯავშნო?',
    'სამუშაო საათები?',
    'გაქვთ რუსული მოცულობითი წამწამები?',
  ],
  he: [
    'אילו טיפולים אתם מציעים?',
    'כמה עולה מילוי שפתיים?',
    'ספרי לי על בוטוקס',
    'איך לקבוע תור?',
    'שעות פתיחה?',
    'יש לכם ריסים נפח רוסי?',
  ],
  ar: [
    'ما العلاجات التي تقدمونها؟',
    'كم تكلفة حشو الشفاه؟',
    'أخبريني عن البوتوكس',
    'كيف أحجز موعد؟',
    'ساعات العمل؟',
    'هل لديكم رموش الحجم الروسي؟',
  ],
  tr: [
    'Hangi tedavileri sunuyorsunuz?',
    'Dudak dolgusu ne kadar?',
    'Botox hakkında bilgi verin',
    'Nasıl randevu alırım?',
    'Çalışma saatleri?',
    'Rus hacim kirpikleriniz var mı?',
  ],
};

// Greeting messages
const GREETINGS: Record<string, string> = {
  en: "Hello! I'm Mariam, your personal beauty consultant at Silk Beauty Salon. How can I help you today? ✨",
  ru: "Привет! Я Мариам, ваш личный консультант по красоте в Silk Beauty Salon. Чем могу помочь? ✨",
  ka: "გამარჯობა! მე მარიამი ვარ, თქვენი პერსონალური სილამაზის კონსულტანტი Silk Beauty Salon-ში. როგორ შემიძლია დაგეხმაროთ? ✨",
  he: "שלום! אני מרים, היועצת האישית שלך בסילק ביוטי. איך אוכל לעזור? ✨",
  ar: "مرحباً! أنا مريم، مستشارة الجمال الشخصية لديك في سيلك بيوتي. كيف يمكنني مساعدتك؟ ✨",
  tr: "Merhaba! Ben Mariam, Silk Beauty'deki kişisel güzellik danışmanınızım. Size nasıl yardımcı olabilirim? ✨",
};

// Tooltip translations
const TOOLTIPS: Record<string, string> = {
  en: "Hello, my name is Mariam. Can I help you?",
  ru: "Привет, меня зовут Мариам. Могу я вам помочь?",
  ka: "გამარჯობა, მე მარიამი ვარ. შემიძლია დაგეხმაროთ?",
  he: "שלום, קוראים לי מרים. איך אוכל לעזור?",
  ar: "مرحباً، اسمي مريم. هل يمكنني مساعدتك؟",
  tr: "Merhaba, benim adım Mariam. Size yardımcı olabilir miyim?",
};

interface MariamChatbotProps {
  locale: string;
}

export default function MariamChatbot({ locale }: MariamChatbotProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const suggested = SUGGESTED_QUESTIONS[locale] || SUGGESTED_QUESTIONS.en;
  const greeting = GREETINGS[locale] || GREETINGS.en;
  const tooltip = TOOLTIPS[locale] || TOOLTIPS.en;

  // Hide tooltip after first interaction
  useEffect(() => {
    if (open) {
      setShowTooltip(false);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function send(text: string) {
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setShowQuickActions(false);

    try {
      const result = await sendMessage(text, locale);
      console.log('Server action result:', result);
      if (result.success && result.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: result.reply }]);
      } else {
        throw new Error(result.reply || 'Empty response');
      }
    } catch (err) {
      console.error('Chat error:', err);
      const whatsappMessages: Record<string, string> = {
        en: "I'm having trouble connecting right now. Please message us on WhatsApp at +995 599 123 456 for immediate assistance! 💬",
        ru: "У меня проблемы с соединением. Пожалуйста, напишите нам в WhatsApp: +995 599 123 456! 💬",
        ka: "კავშირის პრობლემა. მოგვწერეთ WhatsApp-ზე: +995 599 123 456! 💬",
        he: "יש לי בעיית חיבור. אנא שלחו לנו הודעה ב-WhatsApp: +995 599 123 456! 💬",
        ar: "لدي مشكلة في الاتصال. رجاءً أرسلوا لنا رسالة على واتساب: +995 599 123 456! 💬",
        tr: "Bağlantı sorunu yaşıyorum. Lütfen WhatsApp'tan mesaj gönderin: +995 599 123 456! 💬",
      };
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: whatsappMessages[locale] || whatsappMessages.en },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const quickActions = [
    { icon: Phone, label: locale === 'ru' ? 'Позвонить' : locale === 'ka' ? 'დარეკვა' : locale === 'he' ? 'להתקשר' : locale === 'ar' ? 'اتصل' : locale === 'tr' ? 'Ara' : 'Call', action: 'tel:+995599123456' },
    { icon: MapPin, label: locale === 'ru' ? 'Локация' : locale === 'ka' ? 'მდებარეობა' : locale === 'he' ? 'מיקום' : locale === 'ar' ? 'الموقع' : locale === 'tr' ? 'Konum' : 'Location', action: 'https://maps.google.com/?q=28+Rustaveli+Avenue+Batumi+Georgia' },
    { icon: Clock, label: locale === 'ru' ? 'Часы' : locale === 'ka' ? 'საათები' : locale === 'he' ? 'שעות' : locale === 'ar' ? 'الساعات' : locale === 'tr' ? 'Saatler' : 'Hours', action: null },
  ];

  return (
    <>
      {/* Floating button - Bottom Left with Profile Photo & Tooltip */}
      <div className="fixed bottom-6 left-6 z-40">
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !open && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-0 mb-3 w-64 p-4 rounded-2xl shadow-2xl border"
              style={{ 
                background: 'white',
                borderColor: 'rgba(20, 184, 166, 0.2)'
              }}
            >
              {/* Arrow */}
              <div 
                className="absolute -bottom-2 left-6 w-4 h-4 rotate-45 border-r border-b"
                style={{ 
                  background: 'white',
                  borderColor: 'rgba(20, 184, 166, 0.2)'
                }}
              />
              <div className="flex items-start gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden ring-2 ring-teal-400/30"
                  style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)' }}
                >
                  {/* Mariam Profile Photo Placeholder */}
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                    alt="Mariam"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-gray-800 text-sm font-medium mb-1">{tooltip}</p>
                  <p className="text-teal-600/70 text-xs">{locale === 'ru' ? 'ИИ-консультант красоты' : locale === 'ka' ? 'AI სილამაზის კონსულტანტი' : locale === 'he' ? 'יועצת יופי AI' : locale === 'ar' ? 'مستشارة الجمال AI' : locale === 'tr' ? 'AI Güzellik Danışmanı' : 'AI Beauty Consultant'}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Button with Profile Photo */}
        <motion.button
          onClick={() => setOpen(true)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="relative w-16 h-16 rounded-full shadow-2xl border-2 border-teal-400/30 overflow-hidden group"
          style={{ 
            background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            boxShadow: [
              '0 0 20px rgba(20, 184, 166, 0.3)', 
              '0 0 40px rgba(20, 184, 166, 0.5)', 
              '0 0 20px rgba(20, 184, 166, 0.3)'
            ] 
          }}
          transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
        >
          {/* Mariam Profile Photo */}
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
            alt="Mariam - AI Beauty Consultant"
            className="w-full h-full object-cover transition-transform group-hover:scale-110"
          />
          
          {/* Online Indicator */}
          {!open && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
            />
          )}
        </motion.button>
      </div>

      {/* Chat Modal - Bottom Left */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20, x: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20, x: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 left-6 z-50 w-[360px] sm:w-[400px] max-h-[520px] rounded-3xl overflow-hidden shadow-2xl border"
            style={{ background: 'white', borderColor: 'rgba(20, 184, 166, 0.15)' }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{ background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(13, 148, 136, 0.05))' }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  {/* Profile Photo in Header */}
                  <div 
                    className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-teal-400/30"
                    style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)' }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                      alt="Mariam"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
                  />
                </div>
                <div>
                  <p className="text-gray-900 text-base font-bold">Mariam</p>
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={10} className="text-teal-500" />
                    <p className="text-teal-600/70 text-xs">{locale === 'ru' ? 'ИИ-консультант красоты' : locale === 'ka' ? 'AI სილამაზის კონსულტანტი' : locale === 'he' ? 'יועצת יופי AI' : locale === 'ar' ? 'مستشارة الجمال AI' : locale === 'tr' ? 'AI Güzellik Danışmanı' : 'AI Beauty Consultant'}</p>
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

            {/* Quick Actions Bar */}
            {showQuickActions && messages.length === 0 && (
              <div className="px-4 py-2 border-b border-gray-100 flex gap-2 overflow-x-auto">
                {quickActions.map((action, i) => (
                  action.action ? (
                    <a
                      key={i}
                      href={action.action}
                      target={action.action.startsWith('http') ? '_blank' : undefined}
                      rel={action.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 text-xs whitespace-nowrap hover:bg-teal-100 transition-colors"
                    >
                      <action.icon size={12} />
                      {action.label}
                    </a>
                  ) : (
                    <button
                      key={i}
                      onClick={() => send(locale === 'ru' ? 'Какие у вас часы работы?' : locale === 'ka' ? 'რა საათები მუშაობთ?' : 'What are your opening hours?')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 text-xs whitespace-nowrap hover:bg-teal-100 transition-colors"
                    >
                      <action.icon size={12} />
                      {action.label}
                    </button>
                  )
                ))}
              </div>
            )}

            {/* Messages Area */}
            <div className="h-64 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
              {messages.length === 0 && (
                <div>
                  {/* Mariam's Greeting */}
                  <div className="flex gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden ring-1 ring-teal-400/30">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                        alt="Mariam"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-3 text-gray-700 text-sm max-w-[85%] shadow-sm">
                      {greeting}
                    </div>
                  </div>

                  {/* Suggested Questions */}
                  <div className="space-y-2 ml-10">
                    <p className="text-teal-600 text-xs mb-2 flex items-center gap-1">
                      <Star size={10} />
                      {locale === 'ru' ? 'Частые вопросы:' : locale === 'ka' ? 'ხშირი კითხვები:' : locale === 'he' ? 'שאלות נפוצות:' : locale === 'ar' ? 'أسئلة شائعة:' : locale === 'tr' ? 'Sık sorulan sorular:' : 'Suggested questions:'}
                    </p>
                    {suggested.slice(0, 4).map((s, i) => (
                      <motion.button
                        key={s}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => send(s)}
                        className="block w-full text-left px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm bg-white hover:bg-teal-50 hover:border-teal-300 transition-all"
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Messages */}
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {m.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden ring-1 ring-teal-400/30">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                        alt="Mariam"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm max-w-[85%] ${
                      m.role === 'user'
                        ? 'text-white rounded-tr-none'
                        : 'bg-white border border-gray-200 text-gray-700 rounded-tl-none'
                    }`}
                    style={m.role === 'user' ? { background: 'linear-gradient(135deg, #14b8a6, #0d9488)' } : {}}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {/* Loading Indicator */}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden ring-1 ring-teal-400/30">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
                      alt="Mariam"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                    <Loader2 size={14} className="text-teal-500 animate-spin" />
                    <span className="text-gray-400 text-sm">
                      {locale === 'ru' ? 'Печатаю...' : locale === 'ka' ? 'ვწერ...' : locale === 'he' ? 'מקלידה...' : locale === 'ar' ? 'أكتب...' : locale === 'tr' ? 'Yazıyor...' : 'Typing...'}
                    </span>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div className="px-4 py-4 border-t border-gray-100 flex gap-2 bg-white">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send(input)}
                placeholder={locale === 'ru' ? 'Спросите меня о чем-нибудь...' : locale === 'ka' ? 'რაიმეს შესახებ მკითხეთ...' : locale === 'he' ? 'תשאלו אותי משהו...' : locale === 'ar' ? 'اسألني أي شيء...' : locale === 'tr' ? 'Bana bir şey sor...' : 'Ask me anything...'}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 text-sm outline-none focus:border-teal-400 transition-colors placeholder:text-gray-400"
              />
              <motion.button
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-all disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg, #14b8a6, #0d9488)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={16} className="text-white" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
