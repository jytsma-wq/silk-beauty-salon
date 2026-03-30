'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import EditorialSection from '@/components/layout/EditorialSection';
import { treatments, treatmentCategories } from '@/lib/treatments';

interface TreatmentsClientProps {
  locale: string;
}

export function TreatmentsClient({ locale }: TreatmentsClientProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? treatments
    : treatments.filter((t) => t.category === activeCategory);

  const headerTitle = locale === 'en' ? 'Treatments' : locale === 'ru' ? 'Процедуры' : locale === 'ka' ? 'პროცედურები' : locale === 'he' ? 'טיפולים' : locale === 'ar' ? 'العلاجات' : 'Tedaviler';
  
  const headerSub = locale === 'en' 
    ? 'Every service performed by internationally certified specialists with medical-grade products.' 
    : locale === 'ru' 
    ? 'Каждая услуга выполняется сертифицированными специалистами.' 
    : locale === 'ka' 
    ? 'ყოველი მომსახურება სრულდება სერტიფიცირებული სპეციალისტების მიერ.' 
    : locale === 'he' 
    ? 'כל שירות מבוצע על ידי מומחים מוסמכים בינלאומיים.' 
    : locale === 'ar' 
    ? 'كل خدمة يؤديها متخصصون معتمدون دولياً.' 
    : 'Her hizmet uluslararası sertifikalı uzmanlar tarafından sunulur.';
  
  const bookNowLabel = locale === 'en' ? 'Book Now' : locale === 'ru' ? 'Записаться' : locale === 'ka' ? 'დაჯავშნა' : locale === 'he' ? 'הזמן עכשיו' : locale === 'ar' ? 'احجز الآن' : 'Randevu Al';

  const catLabels = treatmentCategories.map(c => ({
    id: c.id,
    label: c.label[locale as keyof typeof c.label] || c.label.en,
  }));

  const allCategories = [
    { id: 'all', label: locale === 'en' ? 'All' : locale === 'ru' ? 'Все' : locale === 'ka' ? 'ყველა' : locale === 'he' ? 'הכל' : locale === 'ar' ? 'الكل' : 'Tümü' },
    ...catLabels,
  ];

  return (
    <div className="bg-surface-0 min-h-screen">
      {/* Hero Section */}
      <EditorialSection variant="hero" background="white" animate={true}>
        <div className="max-w-4xl">
          <h1 className="font-display text-hero-md text-surface-900 tracking-tight">
            {headerTitle}
          </h1>
          <p className="font-sans text-body-lg text-surface-600 mt-6 max-w-2xl">
            {headerSub}
          </p>
        </div>
      </EditorialSection>

      {/* Main Content - Two Column Layout */}
      <EditorialSection variant="compact" background="white" animate={true} delay={0.1}>
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Left: Sticky Filter Categories */}
          <aside className="lg:w-64 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-32">
              <h2 className="font-accent text-label uppercase tracking-widest text-surface-900 mb-6">
                {locale === 'en' ? 'Categories' : locale === 'ru' ? 'Категории' : locale === 'ka' ? 'კატეგორიები' : locale === 'he' ? 'קטגוריות' : locale === 'ar' ? 'الفئات' : 'Kategoriler'}
              </h2>
              
              <nav className="space-y-3">
                {allCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`block text-left text-label uppercase tracking-widest transition-colors duration-300 ${
                      activeCategory === cat.id
                        ? 'text-gold-500'
                        : 'text-surface-600 hover:text-gold-500'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Right: Treatment Cards Grid */}
          <div className="flex-1">
            <motion.div 
              layout 
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((t, index) => (
                  <motion.div
                    key={t.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.05,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="group relative border border-surface-200 bg-surface-0 overflow-hidden hover:border-gold-300 transition-all duration-500"
                  >
                    {/* Card Content */}
                    <div className="p-8">
                      {/* Category Label */}
                      <p className="font-accent text-caption uppercase tracking-widest text-gold-500 mb-3">
                        {t.category}
                      </p>
                      
                      {/* Title */}
                      <h3 className="font-display text-display-2 text-surface-900 mb-3 group-hover:text-gold-600 transition-colors duration-300">
                        {t.name[locale as keyof typeof t.name] || t.name.en}
                      </h3>
                      
                      {/* Description */}
                      <p className="font-sans text-body-sm text-surface-600 leading-relaxed mb-6 line-clamp-2">
                        {t.description[locale as keyof typeof t.description] || t.description.en}
                      </p>

                      {/* Meta Row */}
                      <div className="flex items-center justify-between pt-4 border-t border-surface-100">
                        <div className="flex items-center gap-2 text-surface-500">
                          <Clock size={14} strokeWidth={1.5} />
                          <span className="text-caption">{t.duration} min</span>
                        </div>
                        <span className="font-display text-body-lg text-gold-600">
                          {t.price} GEL
                        </span>
                      </div>
                    </div>

                    {/* Hover Reveal - Subtle zoom effect on image or overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gold-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Book Button - Appears on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <Link
                        href={`/${locale}/contact?service=${t.id}`}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-gold-500 text-white font-sans text-button uppercase tracking-widest hover:bg-gold-600 transition-colors duration-300"
                      >
                        {bookNowLabel}
                        <ArrowRight size={14} strokeWidth={1.5} />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="font-sans text-body-md text-surface-500">
                  {locale === 'en' 
                    ? 'No treatments found in this category.' 
                    : locale === 'ru' 
                    ? 'В этой категории нет процедур.' 
                    : locale === 'ka' 
                    ? 'ამ კატეგორიაში პროცედურები არ მოიძებნა.' 
                    : locale === 'he' 
                    ? 'לא נמצאו טיפולים בקטגוריה זו.' 
                    : locale === 'ar' 
                    ? 'لم يتم العثور على علاجات في هذه الفئة.' 
                    : 'Bu kategoride tedavi bulunamadı.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </EditorialSection>
    </div>
  );
}
