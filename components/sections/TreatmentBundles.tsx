'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Sparkles, ChevronRight, Check, Percent, Clock, Star } from 'lucide-react';

interface TreatmentBundlesProps {
  locale: string;
}

const translations = {
  en: {
    title: 'Treatment Packages',
    subtitle: 'Save more with our curated treatment bundles',
    save: 'Save',
    bookBundle: 'Book Bundle',
    includes: 'Includes',
    mostPopular: 'Most Popular',
    bestValue: 'Best Value',
    limited: 'Limited availability',
    treatments: 'treatments',
    totalValue: 'Total Value:',
    bundlePrice: 'Bundle Price:',
  },
  ru: {
    title: 'Пакеты процедур',
    subtitle: 'Экономьте больше с нашими пакетами',
    save: 'Скидка',
    bookBundle: 'Забронировать пакет',
    includes: 'Включает',
    mostPopular: 'Популярный',
    bestValue: 'Лучшая цена',
    limited: 'Ограниченное предложение',
    treatments: 'процедур',
    totalValue: 'Общая стоимость:',
    bundlePrice: 'Цена пакета:',
  },
  ka: {
    title: 'სამკურნალო პაკეტები',
    subtitle: 'დაზოგეთ ჩვენი პაკეტებით',
    save: 'დაზოგვა',
    bookBundle: 'დაჯავშნა',
    includes: 'მოიცავს',
    mostPopular: 'პოპულარული',
    bestValue: 'საუკეთესო ფასი',
    limited: 'შეზღუდულია',
    treatments: 'პროცედურა',
    totalValue: 'სრული ღირებულება:',
    bundlePrice: 'პაკეტის ფასი:',
  },
  he: {
    title: 'חבילות טיפול',
    subtitle: 'חסכי יותר עם חבילות הטיפול שלנו',
    save: 'חסכון',
    bookBundle: 'הזמן חבילה',
    includes: 'כולל',
    mostPopular: 'הכי פופולרי',
    bestValue: 'הערך הטוב ביותר',
    limited: 'זמינות מוגבלת',
    treatments: 'טיפולים',
    totalValue: 'ערך כולל:',
    bundlePrice: 'מחיר החבילה:',
  },
  ar: {
    title: 'حزم العلاج',
    subtitle: 'وفري أكثر مع حزم العلاج المختارة',
    save: 'توفير',
    bookBundle: 'احجزي الحزمة',
    includes: 'تشمل',
    mostPopular: 'الأكثر شعبية',
    bestValue: 'أفضل قيمة',
    limited: 'توفر محدود',
    treatments: 'علاجات',
    totalValue: 'القيمة الإجمالية:',
    bundlePrice: 'سعر الحزمة:',
  },
  tr: {
    title: 'Tedavi Paketleri',
    subtitle: 'Seçilen tedavi paketleriyle daha fazla tasarruf edin',
    save: 'Tasarruf',
    bookBundle: 'Paket Rezervasyonu',
    includes: 'Dahil',
    mostPopular: 'En Popüler',
    bestValue: 'En İyi Değer',
    limited: 'Sınırlı kullanılabilirlik',
    treatments: 'tedavi',
    totalValue: 'Toplam Değer:',
    bundlePrice: 'Paket Fiyatı:',
  },
};

const bundles = [
  {
    id: 1,
    name: 'Glow Up Package',
    treatments: ['HydraFacial', 'Chemical Peel', 'LED Therapy'],
    originalPrice: 450,
    bundlePrice: 349,
    duration: '2 hours',
    popular: false,
    color: '#ec4899',
    icon: '✨',
  },
  {
    id: 2,
    name: 'Anti-Aging Complete',
    treatments: ['Botox (3 areas)', 'Cheek Filler (1ml)', 'Under-eye Filler', 'Skin Boosters'],
    originalPrice: 1800,
    bundlePrice: 1299,
    duration: '3 hours',
    popular: true,
    color: '#C9A96E',
    icon: '👑',
  },
  {
    id: 3,
    name: 'Bridal Beauty',
    treatments: ['HydraFacial', 'Lash Lift & Tint', 'Brow Lamination', 'Gel Manicure + Pedicure', 'Blowout'],
    originalPrice: 380,
    bundlePrice: 299,
    duration: '4 hours',
    popular: false,
    color: '#f472b6',
    icon: '💍',
  },
  {
    id: 4,
    name: 'Lash & Brow Perfection',
    treatments: ['Russian Volume Lashes', 'Brow Lamination', 'Brow Tint', 'Lash Lift'],
    originalPrice: 300,
    bundlePrice: 219,
    duration: '2.5 hours',
    popular: false,
    color: '#8b5cf6',
    icon: '👁️',
  },
];

export default function TreatmentBundles({ locale }: TreatmentBundlesProps) {
  const [selectedBundle, setSelectedBundle] = useState(bundles[1]);
  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <section className="py-24 px-6 bg-cream">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <Package size={14} className="text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">{t.bestValue}</span>
          </div>
          
          <h2 className="font-display font-bold mb-4" style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            background: 'linear-gradient(135deg, #f5e6d0, #C9A96E)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {t.title}
          </h2>
          <p className="text-stone-500 max-w-xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bundle List */}
          <div className="space-y-4">
            {bundles.map((bundle, i) => (
              <motion.button
                key={bundle.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedBundle(bundle)}
                className={`w-full p-5 rounded-2xl border text-left transition-all ${
                  selectedBundle.id === bundle.id
                    ? 'border-amber-500/50 bg-amber-500/5'
                    : 'border-stone-800 hover:border-amber-400/30'
                }`}
                style={{ background: selectedBundle.id === bundle.id ? 'rgba(201, 169, 110, 0.05)' : 'rgba(255,255,255,0.02)' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{bundle.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-white font-semibold">{bundle.name}</h4>
                        {bundle.popular && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs">
                            {t.mostPopular}
                          </span>
                        )}
                      </div>
                      <p className="text-stone-500 text-sm">{bundle.treatments.length} {t.treatments}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-amber-400 font-bold text-lg">{bundle.bundlePrice} GEL</p>
                    <p className="text-stone-500 text-sm line-through">{bundle.originalPrice} GEL</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Selected Bundle Details */}
          <motion.div
            key={selectedBundle.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-amber-400/20 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(201, 169, 110, 0.1), rgba(160, 120, 64, 0.05))' }}
          >
            <div className="p-6 border-b border-amber-400/10" style={{ background: `linear-gradient(135deg, ${selectedBundle.color}15, ${selectedBundle.color}05)` }}>
              <div className="flex items-center gap-4">
                <span className="text-4xl">{selectedBundle.icon}</span>
                <div>
                  <h3 className="text-white text-xl font-bold">{selectedBundle.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-stone-500 text-sm">
                      <Clock size={12} />
                      {selectedBundle.duration}
                    </span>
                    <span className="flex items-center gap-1 text-green-400 text-sm">
                      <Percent size={12} />
                      {t.save} {selectedBundle.originalPrice - selectedBundle.bundlePrice} GEL
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h4 className="text-stone-400 text-sm uppercase tracking-wider mb-4">{t.includes}:</h4>
              <div className="space-y-3 mb-6">
                {selectedBundle.treatments.map((treatment, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-stone-800/20 border border-stone-700/30"
                  >
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <Check size={12} className="text-amber-400" />
                    </div>
                    <span className="text-stone-300">{treatment}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-stone-800/30 mb-6">
                <div>
                  <p className="text-stone-500 text-sm">{t.totalValue}</p>
                  <p className="text-stone-400 line-through">{selectedBundle.originalPrice} GEL</p>
                </div>
                <div className="text-right">
                  <p className="text-stone-500 text-sm">{t.bundlePrice}</p>
                  <p className="text-amber-400 text-2xl font-bold">{selectedBundle.bundlePrice} GEL</p>
                </div>
              </div>

              <motion.button
                onClick={() => window.open(`https://wa.me/995599123456?text=${encodeURIComponent(`${t.bookBundle}: ${selectedBundle.name} - ${selectedBundle.bundlePrice} GEL`)}`, '_blank')}
                className="w-full py-4 rounded-xl text-stone-900 font-semibold flex items-center justify-center gap-2"
                style={{ background: 'linear-gradient(135deg, #C9A96E, #a07840)' }}
                whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(201, 169, 110, 0.3)' }}
                whileTap={{ scale: 0.98 }}
              >
                {t.bookBundle}
                <ChevronRight size={16} />
              </motion.button>

              <p className="text-stone-600 text-xs text-center mt-4 flex items-center justify-center gap-1">
                <Star size={10} className="text-amber-400/50" />
                {t.limited}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
