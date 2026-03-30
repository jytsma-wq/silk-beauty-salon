'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import type { ChatMessage } from '@/types/types';

const translations: Record<string, {
  suggested: string[];
  advisor: string;
  online: string;
  greeting: string;
  placeholder: string;
  error: string;
}> = {
  en: {
    suggested: [
      'What lip filler techniques do you offer?',
      'How much does Botox cost?',
      'Tell me about Russian Volume lashes',
      'How do I book an appointment?',
    ],
    advisor: 'Silk Beauty Advisor',
    online: 'Online now',
    greeting: "Hi! I'm your Silk Beauty Advisor. How can I help you today? ✨",
    placeholder: 'Ask about treatments…',
    error: "Sorry, I'm having trouble connecting. Please call us at +995 599 123 456!",
  },
  ru: {
    suggested: [
      'Какие техники увеличения губ вы предлагаете?',
      'Сколько стоит ботокс?',
      'Расскажите о русском объеме ресниц',
      'Как записаться на прием?',
    ],
    advisor: 'Beauty-советник Silk',
    online: 'На связи',
    greeting: 'Привет! Я ваш Beauty-советник Silk. Чем могу помочь? ✨',
    placeholder: 'Спросите о процедурах…',
    error: 'Извините, проблемы со связью. Позвоните нам: +995 599 123 456!',
  },
  ka: {
    suggested: [
      'რა ტექნიკას იყენებთ ტუჩების შესავსებად?',
      'რამდენი ღირს ბოტოქსი?',
      'მითხარით რუსული მოცულობის წამწამების შესახებ',
      'როგორ დავჯავშნო ვიზიტი?',
    ],
    advisor: 'Silk Beauty მრჩეველი',
    online: 'ხელმისაწვდომია',
    greeting: 'გამარჯობა! მე თქვენი Silk Beauty მრჩეველი ვარ. როგორ შემიძლია დაგეხმაროთ? ✨',
    placeholder: 'იკითხეთ პროცედურების შესახებ…',
    error: 'უკაცრავად, კავშირის პრობლემა. დაგვირეკეთ: +995 599 123 456!',
  },
  he: {
    suggested: [
      'אילו טכניקות למילוי שפתיים יש לכם?',
      'כמה עולה בוטוקס?',
      'ספרו לי על ריסים נפח רוסי',
      'איך אני מזמינה תור?',
    ],
    advisor: 'יועצת Silk Beauty',
    online: 'זמינה עכשיו',
    greeting: 'היי! אני יועצת ה-Silk Beauty שלך. איך אוכל לעזור? ✨',
    placeholder: 'שאלי על טיפולים…',
    error: 'מצטערת, יש בעיית חיבור. אנא התקשרי: +995 599 123 456!',
  },
  ar: {
    suggested: [
      'ما هي تقنيات حشو الشفاه التي تقدمونها؟',
      'كم تكلفة البوتوكس؟',
      'أخبروني عن الرموش الروسية',
      'كيف أحجز موعد؟',
    ],
    advisor: 'مستشارة Silk Beauty',
    online: 'متاحة الآن',
    greeting: 'مرحباً! أنا مستشارة Silk Beauty. كيف يمكنني مساعدتك؟ ✨',
    placeholder: 'اسألي عن العلاجات…',
    error: 'عذراً، هناك مشكلة في الاتصال. اتصلي بنا: +995 599 123 456!',
  },
  tr: {
    suggested: [
      'Hangi dudak dolgusu tekniklerini sunuyorsunuz?',
      'Botoks ne kadar?',
      'Rus hacim kirpiklerinden bahsedin',
      'Nasıl randevu alırım?',
    ],
    advisor: 'Silk Beauty Danışmanı',
    online: 'Şimdi çevrimiçi',
    greeting: 'Merhaba! Ben Silk Beauty Danışmanınızım. Size nasıl yardımcı olabilirim? ✨',
    placeholder: 'Tedaviler hakkında sorun…',
    error: 'Üzgünüm, bağlantı sorunu. Bizi arayın: +995 599 123 456!',
  },
};

const SUGGESTED = [
  'What lip filler techniques do you offer?',
  'How much does Botox cost?',
  'Tell me about Russian Volume lashes',
  'How do I book an appointment?',
];

export default function AIChatModal({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const t = translations[locale] || translations.en;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function send(text: string) {
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg], locale }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: t.error },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
        style={{ background: 'linear-gradient(135deg, #C9A96E, #a07840)' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ boxShadow: ['0 0 20px rgba(201,169,110,0.2)', '0 0 40px rgba(201,169,110,0.5)', '0 0 20px rgba(201,169,110,0.2)'] }}
        transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
      >
        <MessageCircle size={22} className="text-stone-900" />
      </motion.button>

      {/* Chat modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl overflow-hidden shadow-2xl border border-stone-800"
            style={{ background: '#111009' }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 flex items-center justify-between"
              style={{ background: 'linear-gradient(135deg, rgba(201,169,110,0.15), rgba(160,120,64,0.1))' }}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C9A96E, #a07840)' }}>
                  <Sparkles size={13} className="text-stone-900" />
                </div>
                <div>
                  <p className="text-stone-100 text-sm font-semibold">{t.advisor}</p>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <p className="text-stone-500 text-xs">{t.online}</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-stone-500 hover:text-stone-300 transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto px-4 py-4 space-y-3">
              {messages.length === 0 && (
                <div>
                  <div className="flex gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C9A96E, #a07840)' }}>
                      <Sparkles size={11} className="text-stone-900" />
                    </div>
                    <div className="bg-stone-800/60 rounded-xl rounded-tl-none px-3 py-2 text-stone-300 text-sm max-w-[85%]">
                      {t.greeting}
                    </div>
                  </div>
                  <div className="space-y-2 ml-8">
                    {t.suggested.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="block w-full text-left px-3 py-1.5 rounded-lg border border-stone-700 text-stone-400 text-xs hover:border-amber-400/40 hover:text-amber-300 transition-all"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {m.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C9A96E, #a07840)' }}>
                      <Sparkles size={11} className="text-stone-900" />
                    </div>
                  )}
                  <div
                    className={`px-3 py-2 rounded-xl text-sm max-w-[85%] ${
                      m.role === 'user'
                        ? 'text-stone-900 rounded-tr-none'
                        : 'bg-stone-800/60 text-stone-300 rounded-tl-none'
                    }`}
                    style={m.role === 'user' ? { background: 'linear-gradient(135deg, #C9A96E, #a07840)' } : {}}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C9A96E, #a07840)' }}>
                    <Sparkles size={11} className="text-stone-900" />
                  </div>
                  <div className="bg-stone-800/60 rounded-xl rounded-tl-none px-3 py-2">
                    <Loader2 size={14} className="text-stone-400 animate-spin" />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-stone-800 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send(input)}
                placeholder={t.placeholder}
                className="flex-1 bg-stone-800/60 border border-stone-700 rounded-xl px-3 py-2 text-stone-200 text-sm outline-none focus:border-amber-400/50 transition-colors placeholder:text-stone-600"
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg, #C9A96E, #a07840)' }}
              >
                <Send size={14} className="text-stone-900" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
