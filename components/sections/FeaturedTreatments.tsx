import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';

const featured = [
  {
    name: 'Lip Filler – Russian Technique',
    category: 'Injectables',
    price: 350,
    duration: 45,
    badge: 'Most Popular',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
  },
  {
    name: 'Russian Volume Lashes',
    category: 'Lashes',
    price: 180,
    duration: 150,
    badge: 'Signature',
    image: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=600&q=80',
  },
  {
    name: 'HydraFacial',
    category: 'Skin',
    price: 180,
    duration: 60,
    badge: 'No Downtime',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80',
  },
  {
    name: 'Balayage',
    category: 'Hair',
    price: 220,
    duration: 180,
    badge: null,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
  },
];

export default function FeaturedTreatments({ locale }: { locale: string }) {
  return (
    <section
      className="px-6 py-24 bg-champagne"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
          <div>
            <p className="text-amber-400/60 text-xs tracking-[0.3em] uppercase mb-3">Spotlight</p>
            <h2
              className="font-display font-bold"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                background: 'linear-gradient(135deg, #f5e6d0, #C9A96E)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Featured Treatments
            </h2>
          </div>
          <Link
            href={`/${locale}/treatments`}
            className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-amber-400 transition-colors"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((t) => (
            <div
              key={t.name}
              className="group relative rounded-2xl overflow-hidden border border-stone-800 hover:border-amber-400/30 transition-all duration-500"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              {/* Image */}
              <div className="h-52 overflow-hidden">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                />
              </div>

              {/* Badge */}
              {t.badge && (
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  {t.badge}
                </span>
              )}

              <div className="p-5">
                <p className="text-amber-400/50 text-xs tracking-widest uppercase mb-1.5">{t.category}</p>
                <h3 className="text-white font-display font-bold mb-4 text-base leading-tight">{t.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-stone-600 text-xs">
                    <Clock size={11} />
                    {t.duration} min
                  </div>
                  <span className="text-amber-400 font-bold text-sm">{t.price} GEL</span>
                </div>
                <Link
                  href={`/${locale}/contact?service=${encodeURIComponent(t.name)}`}
                  className="mt-4 block w-full text-center py-2 rounded-full text-xs font-semibold tracking-widest uppercase border border-stone-700 text-stone-500 hover:border-amber-400/50 hover:text-amber-400 transition-all"
                >
                  Book
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
