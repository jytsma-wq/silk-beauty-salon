'use client'

import Image from 'next/image'
import { Link } from '@/i18n/routing'

interface Category {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  href: string
}

interface CategoryGridProps {
  categories: Category[]
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-20 md:py-30 bg-[#f7f4f0]">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {categories.map((cat, index) => (
            <Link key={cat.href} href={cat.href} className="group relative block aspect-16/10 overflow-hidden">
              <Image src={cat.imageSrc} alt={cat.imageAlt} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <h3 className="text-white text-2xl font-sans font-bold mb-2">{cat.title}</h3>
                <p className="text-white/70 text-sm max-w-md">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
