interface Stat {
  value: string
  suffix?: string
  description: string
}

interface StatsSectionProps {
  stats: Stat[]
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="py-20 md:py-30 bg-brand-bg">
      <div className="container-brand">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex items-baseline gap-1 mb-3">
                <span className="font-heading text-6xl md:text-7xl text-brand-text font-normal">{stat.value}</span>
                {stat.suffix && <span className="font-heading text-4xl text-brand-text font-normal">{stat.suffix}</span>}
              </div>
              <p className="text-base text-brand-text-muted leading-relaxed">{stat.description}</p>
              {i < stats.length - 1 && <div className="mt-8 border-t border-black/10 md:hidden" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
