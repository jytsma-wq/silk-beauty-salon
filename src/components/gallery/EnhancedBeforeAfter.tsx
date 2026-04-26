'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ChevronLeft, ChevronRight, ZoomIn, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

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
}

// Enhanced gallery data matching Galderma's style
const galleryData: BeforeAfterItem[] = [
  {
    id: '1',
    patientName: 'Mirjam',
    age: 45,
    treatment: 'Cheek Fillers',
    treatmentDetails: 'Restylane® Lyft™ 1.2ml per side',
    beforeImage: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80',
    duration: '6 months',
    sessions: 1,
    concerns: ['Loss of volume', 'Sagging cheeks'],
    results: ['Restored cheek volume', 'Lifted appearance']
  },
  {
    id: '2',
    patientName: 'Carmela',
    age: 52,
    treatment: 'Skinboosters',
    treatmentDetails: 'Restylane® Skinboosters VITAL™ 1ml per side in 2 sessions',
    beforeImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80',
    duration: '8 months',
    sessions: 2,
    concerns: ['Dehydrated skin', 'Fine lines'],
    results: ['Improved hydration', 'Smoother skin texture']
  },
  {
    id: '3',
    patientName: 'Chloe',
    age: 38,
    treatment: 'Biostimulator',
    treatmentDetails: 'Sculptra® 16ml Session 1, 8ml Session 2',
    beforeImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80',
    duration: '12+ months',
    sessions: 2,
    concerns: ['Volume loss', 'Skin laxity'],
    results: ['Gradual volume restoration', 'Natural collagen stimulation']
  },
  {
    id: '4',
    patientName: 'Lewis',
    age: 35,
    treatment: 'Jawline Contouring',
    treatmentDetails: 'Restylane® Lyft™ 2.4ml / jawline, Restylane® Defyne™ 4ml / jawline',
    beforeImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    duration: '9 months',
    sessions: 1,
    concerns: ['Weak jawline', 'Facial imbalance'],
    results: ['Defined jawline', 'Improved facial contour']
  },
  {
    id: '5',
    patientName: 'Georgia',
    age: 28,
    treatment: 'Lip Enhancement',
    treatmentDetails: 'Restylane® Kysse™ 0.8ml per lip',
    beforeImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80',
    duration: '10 months',
    sessions: 1,
    concerns: ['Thin lips', 'Loss of definition'],
    results: ['Natural volume', 'Enhanced lip contour']
  },
  {
    id: '6',
    patientName: 'Aaron',
    age: 42,
    treatment: 'Frown Lines',
    treatmentDetails: 'Anti-wrinkle injections',
    beforeImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80',
    duration: '4 months',
    sessions: 1,
    concerns: ['Deep frown lines', 'Forehead wrinkles'],
    results: ['Smoother forehead', 'Refreshed appearance']
  }
];

interface EnhancedBeforeAfterProps {
  locale: string;
  showFilters?: boolean;
  maxItems?: number;
}

export function EnhancedBeforeAfter({ 
  locale: _locale, 
  showFilters = true,
  maxItems = 6 
}: EnhancedBeforeAfterProps) {
  const t = useTranslations('gallery');
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const filteredItems = selectedTreatment
    ? galleryData.filter(item => item.treatment === selectedTreatment)
    : galleryData;

  const displayItems = filteredItems.slice(0, maxItems);
  const currentItem = displayItems[activeIndex];

  const treatments = Array.from(new Set(galleryData.map(item => item.treatment)));

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % displayItems.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + displayItems.length) % displayItems.length);
  };

  if (!currentItem) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">{t('noResults', { defaultValue: 'No gallery items found.' })}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Disclaimer Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-sm p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-800">
            {t('disclaimer', { 
              defaultValue: 'Individual results may vary. Photos are of actual clients with their consent. Results achieved after specified number of sessions.' 
            })}
          </p>
        </div>
      </div>

      {/* Treatment Filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setSelectedTreatment(null);
              setActiveIndex(0);
            }}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              selectedTreatment === null
                ? 'bg-[#b5453a] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {t('allTreatments', { defaultValue: 'All Treatments' })}
          </button>
          {treatments.map((treatment) => (
            <button
              key={treatment}
              onClick={() => {
                setSelectedTreatment(treatment);
                setActiveIndex(0);
              }}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                selectedTreatment === treatment
                  ? 'bg-[#b5453a] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {treatment}
            </button>
          ))}
        </div>
      )}

      {/* Main Gallery Display */}
      <div className="bg-white rounded-sm shadow-lg border border-border overflow-hidden">
        {/* Treatment Label Header */}
        <div className="bg-primary text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="font-heading text-xl">{currentItem.treatment}</h3>
            <p className="text-sm text-white/80">{currentItem.treatmentDetails}</p>
          </div>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>

        {/* Before/After Images */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-1">
            {/* Before Image */}
            <div className="relative aspect-3/4 bg-gray-100">
              <Image
                src={currentItem.beforeImage}
                alt={`${currentItem.patientName} - Before ${currentItem.treatment}`}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-sm text-sm font-medium">
                {t('before', { defaultValue: 'Before' })}
              </div>
              <div className="absolute top-4 right-4">
                <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                  <ZoomIn className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            </div>

            {/* After Image */}
            <div className="relative aspect-3/4 bg-gray-100">
              <Image
                src={currentItem.afterImage}
                alt={`${currentItem.patientName} - After ${currentItem.treatment}`}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-[#b5453a] text-white px-3 py-1.5 rounded-sm text-sm font-medium">
                {t('after', { defaultValue: 'After' })}
              </div>
              <div className="absolute top-4 right-4">
                <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                  <ZoomIn className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Patient Info Panel */}
        {showInfo && (
          <div className="border-t bg-gray-50 p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-heading text-lg text-primary mb-3">
                  {currentItem.patientName}, {currentItem.age}
                </h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">{t('treatment', { defaultValue: 'Treatment' })}:</span>{' '}
                    {currentItem.treatmentDetails}
                  </p>
                  <p>
                    <span className="font-medium">{t('duration', { defaultValue: 'Results duration' })}:</span>{' '}
                    {currentItem.duration}
                  </p>
                  <p>
                    <span className="font-medium">{t('sessions', { defaultValue: 'Sessions' })}:</span>{' '}
                    {currentItem.sessions}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-sm text-gray-700 mb-2">
                    {t('concerns', { defaultValue: 'Concerns' })}
                  </h5>
                  <ul className="space-y-1">
                    {currentItem.concerns.map((concern, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-1">
                        <span className="w-1 h-1 bg-gray-400 rounded-full" />
                        {concern}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-sm text-gray-700 mb-2">
                    {t('results', { defaultValue: 'Results' })}
                  </h5>
                  <ul className="space-y-1">
                    {currentItem.results.map((result, idx) => (
                      <li key={idx} className="text-sm text-[#b5453a] flex items-center gap-1">
                        <span className="w-1 h-1 bg-[#b5453a] rounded-full" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Slide Indicators */}
        <div className="border-t px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {displayItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-colors',
                    idx === activeIndex ? 'bg-[#b5453a]' : 'bg-gray-300 hover:bg-gray-400'
                  )}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {activeIndex + 1} / {displayItems.length}
            </p>
          </div>
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {displayItems.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => setActiveIndex(idx)}
            className={cn(
              'relative aspect-square rounded-sm overflow-hidden border-2 transition-colors',
              idx === activeIndex ? 'border-[#b5453a]' : 'border-transparent hover:border-gray-300'
            )}
          >
            <Image
              src={item.afterImage}
              alt={item.patientName}
              fill
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-2">
              <p className="text-white text-xs font-medium">{item.treatment}</p>
            </div>
          </button>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-[#b5453a] hover:underline font-medium"
        >
          {t('seeMoreResults', { defaultValue: 'See more results' })}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
