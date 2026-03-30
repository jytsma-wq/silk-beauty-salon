import { Shield, Award, Globe, Clock } from 'lucide-react';

const signals = [
  {
    icon: Shield,
    title: 'Medical Grade',
    desc: 'EU-approved products only. All injectable treatments by licensed doctors.',
  },
  {
    icon: Award,
    title: 'Certified Specialists',
    desc: 'Internationally trained in Paris, Milan, Istanbul & Tel Aviv.',
  },
  {
    icon: Globe,
    title: '6 Languages',
    desc: 'Georgian, Russian, English, Hebrew, Arabic, and Turkish spoken.',
  },
  {
    icon: Clock,
    title: 'Open 7 Days',
    desc: 'Mon–Sat from 10:00, Sunday from 11:00. Late Fri & Sat until 21:00.',
  },
];

export default function TrustSignals() {
  return (
    <section
      className="px-6 py-16 border-y"
      style={{
        background: 'rgba(201,169,110,0.03)',
        borderColor: 'rgba(201,169,110,0.1)',
      }}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {signals.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="flex flex-col items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(201,169,110,0.1)' }}
                >
                  <Icon size={18} className="text-amber-400" />
                </div>
                <div>
                  <h3 className="text-stone-200 text-sm font-semibold mb-1">{s.title}</h3>
                  <p className="text-stone-600 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
