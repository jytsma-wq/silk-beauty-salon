'use client'

import Image from 'next/image'
import { Link } from '@/i18n/routing'
import ScrollReveal from '@/components/ScrollReveal'

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
      <Image src={imageSrc} alt={imageAlt} fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-black/50" />
      <div className="container-brand relative z-10 text-center">
        <ScrollReveal delay={0}>
          <h2 className="text-white text-3xl md:text-4xl font-body font-bold mb-4">{heading}</h2>
        </ScrollReveal>
        {description && (
          <ScrollReveal delay={0.1}>
            <p className="text-white/80 text-base mb-8 max-w-xl mx-auto">{description}</p>
          </ScrollReveal>
        )}
        <ScrollReveal delay={0.2}>
          <Link href={ctaHref} className="cta-outline-on-dark inline-block">{ctaText}</Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
