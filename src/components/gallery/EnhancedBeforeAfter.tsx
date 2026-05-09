'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BeforeAfterSlider } from '@/components/gallery/BeforeAfterSlider';

interface BeforeAfterItem {
  id: string;
  patientName: string;
  age?: number;
  treatment: string;
  treatmentDetails: string;
  beforeImage: string;
  afterImage: string;
  duration?: string;
  sessions?: number;
  concerns: string[];
  results: string[];
  span?: string;
}

// Magazine-style gallery data with varied grid spans
const galleryData: BeforeAfterItem[] = [
  {
    id: '1',
    patientName: 'Mirjam',
    age: 45,
    treatment: 'Cheek Fillers',
    treatmentDetails: 'Restylane® Lyft™ 1.2ml per side',
    beforeImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80',
    duration: '6 months',
    sessions: 1,
    concerns: ['Loss of volume', 'Sagging cheeks'],
    results: ['Restored cheek volume', 'Lifted appearance'],
    span: 'col-span-2 row-span-2'
  },
  {
    id: '2',
    patientName: 'Carmela',
    age: 52,
    treatment: 'Skinboosters',
    treatmentDetails: 'Restylane® Skinboosters VITAL™ 1ml × 2 sessions',
    beforeImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80',
    duration: '8 months',
    sessions: 2,
    concerns: ['Dehydrated skin', 'Fine lines'],
    results: ['Improved hydration', 'Smoother skin texture'],
    span: 'col-span-1 row-span-1'
  },
  {
    id: '3',
    patientName: 'Chloe',
    age: 38,
    treatment: 'Biostimulator',
    treatmentDetails: 'Sculptra® 16ml Session 1, 8ml Session 2',
    beforeImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=600&q=80',
    duration: '12+ months',
    sessions: 2,
    concerns: ['Volume loss', 'Skin laxity'],
    results: ['Gradual volume restoration', 'Natural collagen stimulation'],
    span: 'col-span-1 row-span-2'
  },
  {
    id: '4',
    patientName: 'Lewis',
    age: 35,
    treatment: 'Jawline Contouring',
    treatmentDetails: 'Restylane® Lyft™ 2.4ml / jawline',
    beforeImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    duration: '9 months',
    sessions: 1,
    concerns: ['Weak jawline', 'Facial imbalance'],
    results: ['Defined jawline', 'Improved facial contour'],
    span: 'col-span-2 row-span-1'
  },
  {
    id: '5',
    patientName: 'Georgia',
    age: 41,
    treatment: 'Lip Enhancement',
    treatmentDetails: 'Restylane® Kysse™ 1ml',
    beforeImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&q=80',
    duration: '9 months',
    sessions: 1,
    concerns: ['Thin lips', 'Asymmetry'],
    results: ['Fuller lips', 'Natural proportion'],
    span: 'col-span-1 row-span-1'
  },
  {
    id: '6',
    patientName: 'Anna',
    age: 48,
    treatment: 'Anti-Wrinkle Botox',
    treatmentDetails: 'Botulinum toxin 20 units forehead',
    beforeImage: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1553514029-1318c9127859?w=600&q=80',
    duration: '4 months',
    sessions: 1,
    concerns: ['Forehead lines', 'Frown lines'],
    results: ['Smooth forehead', 'Refreshed look'],
    span: 'col-span-1 row-span-1'
  },
  {
    id: '7',
    patientName: 'Natalie',
    age: 44,
    treatment: 'Skin Rejuvenation',
    treatmentDetails: 'PRP Therapy 3 sessions',
    beforeImage: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=600&q=80',
    duration: '6 months',
    sessions: 3,
    concerns: ['Dull skin', 'Uneven texture'],
    results: ['Radiant skin', 'Even tone'],
    span: 'col-span-2 row-span-2'
  },
  {
    id: '8',
    patientName: 'Elena',
    age: 37,
    treatment: 'Frown Lines',
    treatmentDetails: 'Botulinum toxin 15 units glabella',
    beforeImage: 'https://images.unsplash.com/photo-1496440543078-eff95d7b8e25?w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=600&q=80',
    duration: '4 months',
    sessions: 1,
    concerns: ['Deep frown lines', 'Angry resting expression'],
    results: ['Smooth glabella', 'Relaxed appearance'],
    span: 'col-span-1 row-span-1'
  }
];

const CATEGORIES = ['All', 'Botox', 'Dermal Fillers', 'Skin Boosters', 'Jawline', 'Skin'];

interface EnhancedBeforeAfterProps {
  locale?: string;
  showFilters?: boolean;
  maxItems?: number;
}

export function EnhancedBeforeAfter({ 
  locale: _locale, 
  showFilters = true,
  maxItems = 8 
}: EnhancedBeforeAfterProps) {
  const t = useTranslations('beforeAfterPage');
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxItem, setLightboxItem] = useState<BeforeAfterItem | null>(null);
  const [lightboxTab, setLightboxTab] = useState<'before' | 'after'>('after');

  const filteredItems = activeFilter === 'All'
    ? galleryData.slice(0, maxItems)
    : galleryData.filter(item =>
        item.treatment.toLowerCase().includes(activeFilter.toLowerCase()) ||
        (activeFilter === 'Botox' && (item.treatment.includes('Botox') || item.treatment.includes('Frown') || item.treatment.includes('Anti-Wrinkle'))) ||
        (activeFilter === 'Dermal Fillers' && (item.treatment.includes('Fillers') || item.treatment.includes('Lip') || item.treatment.includes('Jaw'))) ||
        (activeFilter === 'Skin Boosters' && item.treatment.includes('Skinbooster')) ||
        (activeFilter === 'Skin' && (item.treatment.includes('Skin') || item.treatment.includes('PRP')))
      ).slice(0, maxItems);

  const nextLightbox = () => {
    if (!lightboxItem) return;
    const currentIdx = filteredItems.findIndex(i => i.id === lightboxItem.id);
    const nextIdx = (currentIdx + 1) % filteredItems.length;
    setLightboxItem(filteredItems[nextIdx]);
  };

  const prevLightbox = () => {
    if (!lightboxItem) return;
    const currentIdx = filteredItems.findIndex(i => i.id === lightboxItem.id);
    const prevIdx = (currentIdx - 1 + filteredItems.length) % filteredItems.length;
    setLightboxItem(filteredItems[prevIdx]);
  };

  // Magazine-style grid layout
  const getGridPosition = (index: number) => {
    const positions = [
      'col-span-2 row-span-2', // Large
      'col-span-1 row-span-1', // Small
      'col-span-1 row-span-2',   // Tall
      'col-span-2 row-span-1', // Wide
      'col-span-1 row-span-1', // Small
      'col-span-1 row-span-1', // Small
      'col-span-2 row-span-2', // Large
      'col-span-1 row-span-1', // Small
    ];
    return positions[index % positions.length];
  };

  return (
    <div className="space-y-12">
      {/* Magazine Filter Navigation */}
      {showFilters && (
        <nav className="flex items-center justify-between border-b border-stone-200 pb-8">
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={cn(
                  'px-6 py-3 text-sm tracking-wide uppercase border transition-all duration-300',
                  activeFilter === cat
                    ? 'bg-stone-900 text-stone-50 border-stone-900'
                    : 'bg-transparent text-stone-600 border-stone-300 hover:border-stone-900'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <span className="text-sm text-stone-500 hidden md:block">
            {filteredItems.length} {t('results', { defaultValue: 'results' })}
          </span>
        </nav>
      )}

      {/* Photo Essay Masonry Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[250px] gap-4 md:gap-6">
        <AnimatePresence>
          {filteredItems.map((item, index) => (
            <motion.figure
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                'relative group cursor-pointer overflow-hidden',
                item.span || getGridPosition(index)
              )}
              onClick={() => { setLightboxItem(item); setLightboxTab('after'); }}
            >
              {/* Drag-to-reveal Before/After slider */}
              <div className="relative w-full h-full">
                <BeforeAfterSlider
                  beforeSrc={item.beforeImage}
                  afterSrc={item.afterImage}
                  beforeAlt={t('beforeImageAlt', { patientName: item.patientName, treatment: item.treatment })}
                  afterAlt={t('afterImageAlt', { patientName: item.patientName, treatment: item.treatment })}
                  initialPosition={55}
                />

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-linear-to-t from-stone-900/90 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Caption appears on hover */}
                <figcaption className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                  <p className="text-sm italic text-stone-50 mb-2">
                    {item.treatment}
                  </p>
                  <p className="text-xs text-stone-300 uppercase tracking-wider">
                    {item.patientName}, {item.age} • {item.duration}
                  </p>
                </figcaption>

                {/* Before/After indicator */}
                <div className="absolute top-4 right-4 bg-stone-900/80 text-white px-3 py-1 text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  {t('viewComparison', { defaultValue: 'View' })}
                </div>
              </div>
            </motion.figure>
          ))}
        </AnimatePresence>
      </div>

      {/* Editorial Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-50 z-50"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] h-full">
              {/* Image Side */}
              <div className="relative flex items-center justify-center p-8 lg:p-12 bg-stone-100">
                {/* Tab Switcher */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 flex bg-white rounded-none shadow-sm">
                  <button
                    onClick={() => setLightboxTab('before')}
                    className={cn(
                      'px-6 py-3 text-sm uppercase tracking-wide transition-colors',
                      lightboxTab === 'before' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-50'
                    )}
                  >
                    {t('before', { defaultValue: 'Before' })}
                  </button>
                  <button
                    onClick={() => setLightboxTab('after')}
                    className={cn(
                      'px-6 py-3 text-sm uppercase tracking-wide transition-colors',
                      lightboxTab === 'after' ? 'bg-[#b5453a] text-white' : 'text-stone-600 hover:bg-stone-50'
                    )}
                  >
                    {t('after', { defaultValue: 'After' })}
                  </button>
                </div>

                {/* Main Image */}
                <div className="relative w-full h-full max-w-3xl max-h-[80vh]">
                  <Image
                    src={lightboxTab === 'before' ? lightboxItem.beforeImage : lightboxItem.afterImage}
                    alt={t('lightboxImageAlt', { patientName: lightboxItem.patientName, tab: lightboxTab })}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevLightbox}
                  className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-stone-700" />
                </button>
                <button
                  onClick={nextLightbox}
                  className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-stone-700" />
                </button>
              </div>

              {/* Details Panel */}
              <aside className="bg-white p-8 lg:p-12 overflow-y-auto border-l border-stone-200">
                {/* Close Button */}
                <button
                  onClick={() => setLightboxItem(null)}
                  className="absolute top-6 right-6 p-2 hover:bg-stone-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-stone-500" />
                </button>

                {/* Treatment Title */}
                <div className="mb-8">
                  <p className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-3">
                    {lightboxItem.treatment}
                  </p>
                  <h3 className="text-3xl lg:text-4xl font-serif font-light text-stone-900">
                    {lightboxItem.patientName}
                  </h3>
                  <p className="text-stone-500 mt-2">{lightboxItem.treatmentDetails}</p>
                </div>

                {/* Details Grid */}
                <dl className="space-y-6 border-t border-stone-200 pt-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <dt className="text-xs uppercase tracking-widest text-stone-400 mb-1">
                        {t('duration', { defaultValue: 'Results Duration' })}
                      </dt>
                      <dd className="text-lg font-serif text-stone-900">{lightboxItem.duration}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-widest text-stone-400 mb-1">
                        {t('sessions', { defaultValue: 'Sessions' })}
                      </dt>
                      <dd className="text-lg font-serif text-stone-900">{lightboxItem.sessions}</dd>
                    </div>
                  </div>

                  {/* Concerns */}
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-stone-400 mb-3">
                      {t('concerns', { defaultValue: 'Concerns Addressed' })}
                    </dt>
                    <dd className="flex flex-wrap gap-2">
                      {lightboxItem.concerns.map((concern, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-stone-100 text-stone-600 text-sm"
                        >
                          {concern}
                        </span>
                      ))}
                    </dd>
                  </div>

                  {/* Results */}
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-stone-400 mb-3">
                      {t('results', { defaultValue: 'Results Achieved' })}
                    </dt>
                    <dd className="space-y-2">
                      {lightboxItem.results.map((result, idx) => (
                        <p key={idx} className="text-stone-700 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-[#b5453a] rounded-full mt-2 shrink-0" />
                          {result}
                        </p>
                      ))}
                    </dd>
                  </div>
                </dl>

                {/* Testimonial */}
                <div className="mt-10 pt-8 border-t border-stone-200">
                  <blockquote className="text-lg font-serif italic text-stone-700 leading-relaxed">
                    &ldquo;The results exceeded my expectations. Natural, subtle, and exactly what I was hoping for.&rdquo;
                  </blockquote>
                  <p className="mt-4 text-sm text-stone-500">
                    — {lightboxItem.patientName}, {lightboxItem.age}
                  </p>
                </div>

                {/* CTA */}
                <button className="mt-10 w-full py-4 bg-stone-900 text-stone-50 text-sm uppercase tracking-wide hover:bg-stone-800 transition-colors">
                  {t('bookNow', { defaultValue: 'Book Similar Treatment' })}
                </button>
              </aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
