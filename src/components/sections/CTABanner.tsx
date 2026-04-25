import Image from 'next/image'
import Link from 'next/link'

interface CTABannerProps {
  imageSrc: string
  imageAlt: string
  heading: string
  description?: string
  ctaText: string
  ctaHref: string
}

export default function CTABanner({ imageSrc, imageAlt, heading, description, ctaText, ctaHref }: CTABannerProps) {
  return (
    <section className="relative w-full py-24 md:py-32 flex items-center justify-center">
      <Image src={imageSrc} alt={imageAlt} fill className="object-cover" unoptimized />
      <div className="absolute inset-0 bg-black/50" />
      <div className="container-brand relative z-10 text-center">
        <h2 className="text-white text-3xl md:text-4xl font-body font-bold mb-4">{heading}</h2>
        {description && <p className="text-white/80 text-base mb-8 max-w-xl mx-auto">{description}</p>}
        <Link href={ctaHref} className="cta-outline-on-dark inline-block">{ctaText}</Link>
      </div>
    </section>
  )
}
