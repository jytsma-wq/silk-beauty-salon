import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import ContentSection from '@/components/sections/ContentSection'
import CategoryGrid from '@/components/sections/CategoryGrid'
import CTABanner from '@/components/sections/CTABanner'
import StatsSection from '@/components/sections/StatsSection'
import BeforeAfter from '@/components/sections/BeforeAfter'

const categories = [
  { title: 'Dermal Fillers', description: 'Restore volume and contour with premium hyaluronic acid treatments.', imageSrc: 'https://picsum.photos/seed/fillers/1152/864', imageAlt: 'Dermal fillers treatment', href: '/treatments/fillers' },
  { title: 'Skinboosters', description: 'Deep hydration and radiance for revitalized, glowing skin.', imageSrc: 'https://picsum.photos/seed/skinboosters/1152/864', imageAlt: 'Skinboosters treatment', href: '/treatments/skinboosters' },
  { title: 'Biostimulators', description: 'Stimulate your skin\'s natural collagen production for lasting results.', imageSrc: 'https://picsum.photos/seed/biostimulators/1152/864', imageAlt: 'Biostimulators treatment', href: '/treatments/biostimulators' },
  { title: 'Other Treatments', description: 'Expression line treatments and additional aesthetic solutions.', imageSrc: 'https://picsum.photos/seed/other/1152/864', imageAlt: 'Other aesthetic treatments', href: '/treatments/other' },
]

const stats = [
  { value: '67', suffix: '%', description: 'Patients with a desire to feel happier and more confident or improve quality of life.' },
  { value: '61', suffix: '%', description: 'Patients who wanted to treat themselves or celebrate a milestone.' },
]

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection
          imageSrc="https://picsum.photos/seed/hero/1344/768"
          imageAlt="Beauty aesthetics confidence"
          heading="Confidence in your skin is our main concern"
          ctaText="Find out how"
          ctaHref="/consultation"
        />
        <ContentSection
          heading="Aesthetic possibilities shaped together"
          body="There are many types of fine lines and wrinkles, and a name for almost every type we may experience on our face. Our portfolio of treatments offers a holistic approach to achieving natural-looking results that celebrate your individuality."
        />
        <CategoryGrid categories={categories} />
        <ContentSection
          heading="Combat the side effects of time"
          body="As we age, changes to the underlying structure of our skin can result in expression lines that alter our appearance. By temporarily relaxing the muscles of the face, we can reduce the appearance of these expression lines and feel our best."
          imageSrc="https://picsum.photos/seed/combat/1344/768"
          imageAlt="Combat side effects of time"
        />
        <StatsSection stats={stats} />
        <CTABanner
          imageSrc="https://picsum.photos/seed/specialist/1344/768"
          imageAlt="Find a specialist"
          heading="Find a specialist"
          description="Ready to explore your options? Connect with a qualified specialist near you."
          ctaText="Get started"
          ctaHref="/find-specialist"
        />
        <BeforeAfter
          beforeSrc="https://picsum.photos/seed/before/800/800"
          afterSrc="https://picsum.photos/seed/after/800/800"
          beforeAlt="Before treatment"
          afterAlt="After treatment"
          ctaText="See their results"
          ctaHref="/results"
        />
      </main>
      <Footer />
    </>
  )
}
