'use client';

import { useTranslations } from 'next-intl';

export function TechnologiesSection() {
  const t = useTranslations('technologies');

  const technologies = [
    { name: 'Cutera', description: 'Advanced Laser Systems' },
    { name: 'Allergan', description: 'Premium Injectables' },
    { name: 'Obagi', description: 'Medical Skincare' },
    { name: 'iS Clinical', description: 'Clinical Skincare' },
    { name: 'Mesoestetic', description: 'Professional Peels' },
    { name: 'Galderma', description: 'Dermal Fillers' },
  ];

  return (
    <section className="py-20 bg-white border-y border-border">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            className="text-2xl md:text-3xl font-serif font-semibold text-primary mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('title')}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Technologies Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-secondary transition-colors"
            >
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
                <span className="font-serif text-2xl text-gold font-semibold">
                  {tech.name.charAt(0)}
                </span>
              </div>
              <h3 className="font-semibold text-primary">{tech.name}</h3>
              <p className="text-xs text-muted-foreground">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
