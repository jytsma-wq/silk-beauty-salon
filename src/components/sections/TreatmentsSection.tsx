import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ChevronRight } from 'lucide-react';
import { getTreatmentCategoriesByLocale } from '@/lib/treatments-db';
import { Link } from '@/i18n/routing';

interface TreatmentsSectionProps {
  locale: string;
}

export async function TreatmentsSection({ locale }: TreatmentsSectionProps) {
  const t = await getTranslations({ locale, namespace: 'treatments' });
  const treatmentCategories = await getTreatmentCategoriesByLocale(locale);

  return (
    <section className="section-spacing section-warm" id="treatments">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary tracking-tight mb-4"
          >
            {t('title')}
          </h2>
          <p className="font-sans text-muted-foreground leading-relaxed max-w-2xl mx-auto mt-8">
            {t('subtitle')}
          </p>
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatmentCategories.slice(0, 6).map((category, index: number) => (
            <div
              key={category.slug}
              className="group relative overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-3/4 w-full overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={index < 3 ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3
                    className="text-xl font-serif text-white tracking-tight"
                  >
                    {category.name}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="font-sans text-muted-foreground leading-relaxed text-sm mb-4 line-clamp-2">
                  {category.description}
                </p>
                <ul className="space-y-2 mb-4">
                  {category.treatments.slice(0, 3).map((treatment) => (
                    <li key={treatment.slug} className="text-sm">
                      <Link
                        href={`/treatments/${treatment.slug}`}
                        className="text-foreground hover:text-[#b5453a] transition-colors flex items-center gap-1"
                      >
                        <ChevronRight className="w-3 h-3 text-[#b5453a]" />
                        {treatment.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/treatments#${category.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#b5453a] hover:underline"
                >
                  {t('learnMore')}
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <div className="w-0 group-hover:w-full h-[2px] bg-stone-400 transition-all duration-300 mt-4" />
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/treatments"
            className="btn-outline inline-flex items-center gap-2"
          >
            {t('viewAll')}
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
