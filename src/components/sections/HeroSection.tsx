import Image from 'next/image'
import Link from 'next/link'

interface HeroProps {
  imageSrc: string
  imageAlt: string
  heading: string
  ctaText?: string
  ctaHref?: string
}

export default function HeroSection({ imageSrc, imageAlt, heading, ctaText, ctaHref }: HeroProps) {
  return (
    <section className="relative w-full h-[70vh] min-h-125 flex items-end">
      <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority />
      <div className="hero-gradient absolute inset-0" />
      <div className="container-brand relative z-10 pb-16 md:pb-20">
        <h1 className="max-w-2xl animate-fade-in">{heading}</h1>
        {ctaText && ctaHref && (
          <Link href={ctaHref} className="cta-outline-on-dark inline-block mt-8 animate-slide-up">{ctaText}</Link>
        )}
      </div>
    </section>
  )
}
