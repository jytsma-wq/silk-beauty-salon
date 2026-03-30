import Link from 'next/link';

const categories = [
  {
    id: 'injectables',
    label: 'Injectables',
    sub: 'Botox · Fillers · Contouring',
    icon: '💉',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=80',
  },
  {
    id: 'skin',
    label: 'Skin Treatments',
    sub: 'HydraFacial · Peels · Needling',
    icon: '✨',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=500&q=80',
  },
  {
    id: 'lashes',
    label: 'Lashes & Brows',
    sub: 'Russian Volume · Lamination · PMU',
    icon: '👁',
    image: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=500&q=80',
  },
  {
    id: 'hair',
    label: 'Hair',
    sub: 'Balayage · Keratin · Extensions',
    icon: '💇',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=80',
  },
  {
    id: 'nails',
    label: 'Nails',
    sub: 'Gel · Acrylic · Nail Art',
    icon: '💅',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&q=80',
  },
  {
    id: 'pmu',
    label: 'Permanent Makeup',
    sub: 'Microblading · Lip Blush',
    icon: '🖌️',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&q=80',
  },
];

export default function CategoriesGrid({ locale }: { locale: string }) {
  return (
    <section className="px-6 py-24 bg-champagne">
      <div className="container mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-amber-400/60 text-xs tracking-[0.3em] uppercase mb-4">Services</p>
          <h2
            className="font-display font-bold"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              background: 'linear-gradient(135deg, #f5e6d0, #C9A96E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Every Treatment,
            <br />
            World-Class
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${locale}/treatments?cat=${cat.id}`}
              className="group relative h-52 rounded-2xl overflow-hidden border border-stone-800 hover:border-amber-400/30 transition-all duration-500"
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.label}
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-55 group-hover:scale-105 transition-all duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="text-xl mb-2 block">{cat.icon}</span>
                <h3 className="text-white font-display font-bold text-lg leading-tight">{cat.label}</h3>
                <p className="text-stone-400 text-xs mt-1 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  {cat.sub}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
