'use client';

import { useTranslations } from 'next-intl';
import { Camera } from 'lucide-react';

interface BeforeAfterGalleryProps {
  locale: string;
}

export function BeforeAfterGallery({ locale: _locale }: BeforeAfterGalleryProps) {
  const t = useTranslations('beforeAfterPage');

  // Placeholder gallery items - in production, these would come from a CMS or database
  const galleryItems = [
    {
      id: 1,
      treatment: 'Botox Forehead Lines',
      beforeImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&q=80',
      afterImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
      description: 'Results after 2 weeks',
    },
    {
      id: 2,
      treatment: 'Lip Enhancement',
      beforeImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
      afterImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
      description: 'Natural-looking volume',
    },
    {
      id: 3,
      treatment: 'Skin Rejuvenation',
      beforeImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&q=80',
      afterImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
      description: 'After 3 sessions',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
        <p>{t('disclaimer', { defaultValue: 'Individual results may vary. Photos are of actual clients with their consent.' })}</p>
      </div>

      {/* Gallery Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow"
          >
            {/* Treatment Label */}
            <div className="bg-primary text-white px-4 py-2">
              <h3 className="font-serif font-semibold">{item.treatment}</h3>
            </div>

            {/* Before/After Images */}
            <div className="grid grid-cols-2 gap-1 p-4">
              <div className="space-y-2">
                <div className="aspect-square rounded-lg overflow-hidden bg-secondary relative">
                  <img
                    src={item.beforeImage}
                    alt={`Before ${item.treatment}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    {t('before', { defaultValue: 'Before' })}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="aspect-square rounded-lg overflow-hidden bg-secondary relative">
                  <img
                    src={item.afterImage}
                    alt={`After ${item.treatment}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-gold/90 text-primary text-xs px-2 py-1 rounded font-medium">
                    {t('after', { defaultValue: 'After' })}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="px-4 pb-4">
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State / Coming Soon */}
      {galleryItems.length === 0 && (
        <div className="text-center py-16">
          <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="font-serif text-xl text-primary mb-2">
            {t('comingSoon', { defaultValue: 'Gallery Coming Soon' })}
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            {t('galleryDescription', { defaultValue: 'We are preparing our before and after gallery. Check back soon to see real results from our treatments.' })}
          </p>
        </div>
      )}
    </div>
  );
}
