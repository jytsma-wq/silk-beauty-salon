import Image from 'next/image'

interface ContentSectionProps {
  heading: string
  body: string
  imageSrc?: string
  imageAlt?: string
  reversed?: boolean
}

export default function ContentSection({ heading, body: bodyText, imageSrc, imageAlt, reversed }: ContentSectionProps) {
  return (
    <section className="py-20 md:py-30 bg-brand-bg">
      <div className="container-brand">
        {imageSrc ? (
          <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-0`}>
            <div className="w-full md:w-1/2">
              <div className="relative aspect-4/3 md:aspect-auto md:h-full min-h-100">
                <Image src={imageSrc} alt={imageAlt || ''} fill className="object-cover" />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex items-center py-12 md:py-16 px-0 md:px-16">
              <div className="max-w-lg">
                <h2 className="mb-6">{heading}</h2>
                <p className="text-base leading-6.5 text-brand-text">{bodyText}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6">{heading}</h2>
            <p className="text-base leading-6.5 text-brand-text">{bodyText}</p>
          </div>
        )}
      </div>
    </section>
  )
}
