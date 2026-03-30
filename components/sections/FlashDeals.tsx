'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Flame, Percent, ChevronRight, Zap } from 'lucide-react';

interface FlashDealsProps {
  locale: string;
}

const translations = {
  en: {
    title: 'Flash Deals',
    subtitle: 'Limited time offers - Book now!',
    endsIn: 'Ends in',
    bookNow: 'Book Now',
    save: 'Save',
    limitedSpots: 'Limited spots',
    today: 'Today\'s Deal',
  },
  ru: {
    title: 'Горячие предложения',
    subtitle: 'Ограниченные предложения - бронируйте!',
    endsIn: 'Осталось',
    bookNow: 'Забронировать',
    save: 'Скидка',
    limitedSpots: 'Мест ограничено',
    today: 'Сегодняшнее предложение',
  },
  ka: {
    title: 'ფლეშ შეთავაზებები',
    subtitle: 'შეზღუდული დროით - დაჯავშნეთ!',
    endsIn: 'დარჩენილია',
    bookNow: 'დაჯავშნა',
    save: 'დაზოგვა',
    limitedSpots: 'ადგილები შეზღუდულია',
    today: 'დღევანდელი შეთავაზება',
  },
  he: {
    title: 'עסקאות בזק',
    subtitle: 'הצעות לזמן מוגבל - הזמינו עכשיו!',
    endsIn: 'מסתיים בעוד',
    bookNow: 'הזמן עכשיו',
    save: 'חסכו',
    limitedSpots: 'מקומות מוגבלים',
    today: 'העסקה של היום',
  },
  ar: {
    title: 'عروض فلاش',
    subtitle: 'عروض لوقت محدود - احجزي الآن!',
    endsIn: 'ينتهي في',
    bookNow: 'احجزي الآن',
    save: 'وفرّي',
    limitedSpots: 'أماكن محدودة',
    today: 'صفقة اليوم',
  },
  tr: {
    title: 'Flaş Fırsatlar',
    subtitle: 'Sınırlı süre teklifler - Hemen rezervasyon yapın!',
    endsIn: 'Kalan süre',
    bookNow: 'Rezervasyon Yap',
    save: 'Tasarruf',
    limitedSpots: 'Sınırlı kontenjan',
    today: 'Günün Fırsatı',
  },
};

// Flash deals data
const deals = [
  {
    id: 1,
    treatment: 'Lip Filler + Botox Combo',
    originalPrice: 750,
    salePrice: 499,
    discount: 33,
    spotsLeft: 3,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&q=80',
    popular: true,
  },
  {
    id: 2,
    treatment: 'HydraFacial + Chemical Peel',
    originalPrice: 350,
    salePrice: 249,
    discount: 29,
    spotsLeft: 5,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80',
    popular: false,
  },
  {
    id: 3,
    treatment: 'Russian Volume Lashes + Brow Lamination',
    originalPrice: 220,
    salePrice: 149,
    discount: 32,
    spotsLeft: 4,
    image: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=400&q=80',
    popular: false,
  },
];

export default function FlashDeals({ locale }: FlashDealsProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 45,
    seconds: 30,
  });

  const t = translations[locale as keyof typeof translations] || translations.en;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #111009 0%, #0d0a08 100%)' }}>
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 mb-6">
            <Flame size={14} className="text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">{t.today}</span>
          </div>
          
          <h2 className="font-display font-bold mb-4" style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            background: 'linear-gradient(135deg, #f5e6d0, #C9A96E)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {t.title}
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto mb-6">{t.subtitle}</p>

          {/* Countdown Timer */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-stone-500">
              <Clock size={16} className="text-amber-400" />
              <span className="text-sm">{t.endsIn}:</span>
            </div>
            <div className="flex gap-2">
              {[
                { value: timeLeft.hours, label: locale === 'ru' ? 'ч' : locale === 'ka' ? 'სთ' : locale === 'he' ? 'ש' : locale === 'ar' ? 'س' : locale === 'tr' ? 's' : 'h' },
                { value: timeLeft.minutes, label: locale === 'ru' ? 'м' : locale === 'ka' ? 'წთ' : locale === 'he' ? 'ד' : locale === 'ar' ? 'د' : locale === 'tr' ? 'd' : 'm' },
                { value: timeLeft.seconds, label: locale === 'ru' ? 'с' : locale === 'ka' ? 'წმ' : locale === 'he' ? 'שנ' : locale === 'ar' ? 'ث' : locale === 'tr' ? 'sn' : 's' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1">
                  <motion.div
                    key={`${item.value}-${i}`}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className="w-12 h-12 rounded-lg bg-stone-800/50 border border-amber-500/20 shadow-sm flex items-center justify-center"
                  >
                    <span className="text-amber-400 font-bold text-lg">
                      {String(item.value).padStart(2, '0')}
                    </span>
                  </motion.div>
                  <span className="text-stone-500 text-xs">{item.label}</span>
                  {i < 2 && <span className="text-stone-400 mx-1">:</span>}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((deal, i) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden border border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col"
              style={{ background: '#111009' }}
            >
              {/* Popular Badge */}
              {deal.popular && (
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-amber-500 text-stone-900 text-xs font-bold flex items-center gap-1">
                  <Zap size={10} />
                  HOT
                </div>
              )}

              {/* Discount Badge */}
              <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-amber-500 text-stone-900 text-xs font-bold">
                -{deal.discount}%
              </div>

              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.treatment}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h4 className="text-stone-200 font-semibold mb-2">{deal.treatment}</h4>
                
                {/* Prices */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-stone-500 line-through text-sm">{deal.originalPrice} GEL</span>
                  <span className="text-amber-400 font-bold text-2xl">{deal.salePrice} GEL</span>
                </div>

                {/* Savings */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-400 text-xs">
                    {t.save} {deal.originalPrice - deal.salePrice} GEL
                  </span>
                  <span className="text-stone-500 text-xs">
                    {deal.spotsLeft} {t.limitedSpots}
                  </span>
                </div>

                {/* Spacer to push button to bottom */}
                <div className="flex-1" />

                {/* CTA */}
                <motion.button
                  onClick={() => window.open(`https://wa.me/995599123456?text=${encodeURIComponent(`${t.bookNow}: ${deal.treatment} - ${deal.salePrice} GEL`)}`, '_blank')}
                  className="w-full py-3 rounded-xl text-stone-900 font-medium flex items-center justify-center gap-2 transition-all"
                  style={{ background: 'linear-gradient(135deg, #C9A96E, #a07840)' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t.bookNow}
                  <ChevronRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
