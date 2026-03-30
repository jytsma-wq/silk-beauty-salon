'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MoveHorizontal } from 'lucide-react';

// Before/After data organized by treatment category
const beforeAfterData = {
  injectables: [
    {
      id: 'lip-filler-1',
      treatment: 'Lip Filler – Russian Technique',
      before: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80',
      after: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
      description: 'Natural volume enhancement using Russian technique for heart-shaped results',
      client: 'Client A, 28',
    },
    {
      id: 'botox-1',
      treatment: 'Botox – Forehead & Crow\'s Feet',
      before: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
      after: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80',
      description: 'Smooth forehead lines and softened crow\'s feet',
      client: 'Client B, 35',
    },
    {
      id: 'cheek-filler-1',
      treatment: 'Cheek Filler',
      before: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80',
      after: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80',
      description: 'Restored facial volume with enhanced cheekbone definition',
      client: 'Client C, 42',
    },
    {
      id: 'undereye-1',
      treatment: 'Under-eye Filler',
      before: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80',
      after: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
      description: 'Tear trough correction for refreshed appearance',
      client: 'Client D, 38',
    },
  ],
  skin: [
    {
      id: 'hydrafacial-1',
      treatment: 'HydraFacial',
      before: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
      after: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80',
      description: 'Deep cleansing and hydration for glowing skin',
      client: 'Client E, 30',
    },
    {
      id: 'chemical-peel-1',
      treatment: 'Chemical Peel',
      before: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80',
      after: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
      description: 'Improved skin tone and texture after treatment',
      client: 'Client F, 45',
    },
    {
      id: 'microneedling-1',
      treatment: 'Microneedling',
      before: 'https://images.unsplash.com/photo-1612817288484-8f67c1d82618?w=600&q=80',
      after: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80',
      description: 'Reduced acne scarring and improved skin firmness',
      client: 'Client G, 33',
    },
    {
      id: 'skin-booster-1',
      treatment: 'Skin Boosters',
      before: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
      after: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80',
      description: 'Deep hydration and natural glow',
      client: 'Client H, 40',
    },
  ],
  lashes: [
    {
      id: 'russian-volume-1',
      treatment: 'Russian Volume Lashes',
      before: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=600&q=80',
      after: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80',
      description: 'Dramatic yet natural mega-volume fans (6D-10D)',
      client: 'Client I, 26',
    },
    {
      id: 'lash-lift-1',
      treatment: 'Lash Lift & Tint',
      before: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
      after: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80',
      description: 'Natural lashes lifted and darkened',
      client: 'Client J, 29',
    },
    {
      id: 'brow-lamination-1',
      treatment: 'Brow Lamination',
      before: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
      after: 'https://images.unsplash.com/photo-1629425703571-61e5f2952beb?w=600&q=80',
      description: 'Fuller, defined brows lasting 6-8 weeks',
      client: 'Client K, 31',
    },
    {
      id: 'hybrid-lashes-1',
      treatment: 'Hybrid Lash Set',
      before: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80',
      after: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=600&q=80',
      description: 'Perfect blend of classic and volume',
      client: 'Client L, 27',
    },
  ],
  pmu: [
    {
      id: 'microblading-1',
      treatment: 'Microblading',
      before: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80',
      after: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
      description: 'Ultra-realistic hair-stroke brows',
      client: 'Client M, 36',
    },
    {
      id: 'lip-blush-1',
      treatment: 'Lip Blush',
      before: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80',
      after: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80',
      description: 'Soft, natural lip color lasting 2-3 years',
      client: 'Client N, 39',
    },
    {
      id: 'ombre-brows-1',
      treatment: 'Ombre Powder Brows',
      before: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
      after: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
      description: 'Soft, powdered brow effect',
      client: 'Client O, 44',
    },
    {
      id: 'combo-brows-1',
      treatment: 'Combo Brows',
      before: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80',
      after: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80',
      description: 'Microblading + shading for dimension',
      client: 'Client P, 32',
    },
  ],
};

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  treatment: string;
  description: string;
  client: string;
}

function BeforeAfterSlider({ before, after, treatment, description, client }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(percentage, 0), 100));
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX, e.currentTarget.getBoundingClientRect());
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    handleMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 hover:border-teal-300 transition-all duration-300 shadow-sm">
      {/* Treatment Label */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h4 className="text-gray-900 font-medium text-sm">{treatment}</h4>
        <p className="text-gray-500 text-xs">{client}</p>
      </div>

      {/* Slider Container */}
      <div
        className="relative aspect-[4/3] cursor-ew-resize select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Background) */}
        <img
          src={after}
          alt="After treatment"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={before}
            alt="Before treatment"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white/90 shadow-lg"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
            <MoveHorizontal size={18} className="text-stone-700" />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 px-2 py-1 rounded bg-teal-600/80 text-white text-xs font-medium">
          Before
        </div>
        <div className="absolute top-3 right-3 px-2 py-1 rounded bg-amber-400/90 text-gray-900 text-xs font-medium">
          After
        </div>
      </div>

      {/* Description */}
      <div className="px-4 py-3 bg-gray-50">
        <p className="text-gray-600 text-xs">{description}</p>
      </div>
    </div>
  );
}

interface BeforeAfterGalleryProps {
  locale: string;
}

const categoryLabels = {
  en: {
    injectables: 'Injectables',
    skin: 'Skin Treatments',
    lashes: 'Lashes & Brows',
    pmu: 'Permanent Makeup',
    title: 'Real Results',
    subtitle: 'Slide to reveal the transformation',
    disclaimer: 'Individual results may vary. Photos are for illustrative purposes.',
  },
  ru: {
    injectables: 'Инъекции',
    skin: 'Уход за кожей',
    lashes: 'Ресницы и брови',
    pmu: 'Перманентный макияж',
    title: 'Реальные результаты',
    subtitle: 'Двигайте ползунок, чтобы увидеть преображение',
    disclaimer: 'Индивидуальные результаты могут отличаться.',
  },
  ka: {
    injectables: 'ინექციები',
    skin: 'კანის მოვლა',
    lashes: 'წამწამები და წვეროები',
    pmu: 'მუდმივი მაკიაჟი',
    title: 'რეალური შედეგები',
    subtitle: 'გადაადგილეთ სლაიდერი ტრანსფორმაციის სანახავად',
    disclaimer: 'ინდივიდუალური შედეგები შეიძლება განსხვავდებოდეს.',
  },
  he: {
    injectables: 'זריקות',
    skin: 'טיפולי עור',
    lashes: 'ריסים וגבות',
    pmu: 'איפור קבוע',
    title: 'תוצאות אמיתיות',
    subtitle: 'גלו את השינוי',
    disclaimer: 'התוצאות עשויות להשתנות.',
  },
  ar: {
    injectables: 'الحقن',
    skin: 'العناية بالبشرة',
    lashes: 'الرموش والحواجب',
    pmu: 'المكياج الدائم',
    title: 'نتائج حقيقية',
    subtitle: 'اسحب لمشاهدة التحول',
    disclaimer: 'قد تختلف النتائج الفردية.',
  },
  tr: {
    injectables: 'Enjeksiyonlar',
    skin: 'Cilt Tedavileri',
    lashes: 'Kirpik ve Kaş',
    pmu: 'Kalıcı Makyaj',
    title: 'Gerçek Sonuçlar',
    subtitle: 'Dönüşümü görmek için kaydırın',
    disclaimer: 'Bireysel sonuçlar değişebilir.',
  },
};

export default function BeforeAfterGallery({ locale }: BeforeAfterGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<keyof typeof beforeAfterData>('injectables');
  
  const labels = categoryLabels[locale as keyof typeof categoryLabels] || categoryLabels.en;
  const items = beforeAfterData[activeCategory] || beforeAfterData.injectables;

  const categories = [
    { id: 'injectables' as const, label: labels.injectables },
    { id: 'skin' as const, label: labels.skin },
    { id: 'lashes' as const, label: labels.lashes },
    { id: 'pmu' as const, label: labels.pmu },
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-teal-500 text-xs tracking-[0.3em] uppercase mb-4">
            {locale === 'en' ? 'Portfolio' : locale === 'ru' ? 'Портфолио' : locale === 'ka' ? 'პორტფოლიო' : locale === 'he' ? 'תיק עבודות' : locale === 'ar' ? 'معرض الأعمال' : 'Portfolyo'}
          </p>
          <h2 className="font-display font-bold mb-4 text-gray-900" style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          }}>
            {labels.title}
          </h2>
          <p className="text-gray-500 flex items-center justify-center gap-2">
            <MoveHorizontal size={16} className="text-teal-400" />
            {labels.subtitle}
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'text-white'
                  : 'border border-gray-300 text-gray-600 hover:border-teal-400 hover:text-teal-600'
              }`}
              style={activeCategory === cat.id ? { background: 'linear-gradient(135deg, #14b8a6, #0d9488)' } : {}}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <BeforeAfterSlider
                  before={item.before}
                  after={item.after}
                  treatment={item.treatment}
                  description={item.description}
                  client={item.client}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Disclaimer */}
        <p className="text-gray-400 text-xs text-center mt-8">
          {labels.disclaimer}
        </p>
      </div>
    </section>
  );
}
