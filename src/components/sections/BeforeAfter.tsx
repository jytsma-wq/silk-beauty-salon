import Image from 'next/image'
import Link from 'next/link'

interface BeforeAfterProps {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  ctaText: string
  ctaHref: string
}

export default function BeforeAfter({ beforeSrc, afterSrc, beforeAlt, afterAlt, ctaText, ctaHref }: BeforeAfterProps) {
  return (
    <section className="py-20 md:py-30 bg-brand-bg">
      <div className="container-brand">
        <div className="grid grid-cols-2 gap-0">
          <div className="relative aspect-square">
            <Image src={beforeSrc} alt={beforeAlt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
            <span className="absolute bottom-4 left-4 text-xs uppercase tracking-widest text-white/80 bg-black/40 px-3 py-1">Before</span>
          </div>
          <div className="relative aspect-square">
            <Image src={afterSrc} alt={afterAlt} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
            <span className="absolute bottom-4 left-4 text-xs uppercase tracking-widest text-white/80 bg-black/40 px-3 py-1">After</span>
          </div>
        </div>
        <div className="mt-8">
          <Link href={ctaHref} className="cta-solid inline-block">{ctaText}</Link>
        </div>
      </div>
    </section>
  )
}
