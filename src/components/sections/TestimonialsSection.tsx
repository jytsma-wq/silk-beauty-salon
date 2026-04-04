'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { testimonials } from '@/data/testimonials';

export function TestimonialsSection() {
  const t = useTranslations('testimonials');
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-spacing bg-primary">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-white mb-4 heading-underline"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t('title')}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mt-8">
            {t('subtitle')}
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Quote Icon */}
            <Quote className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 text-gold opacity-30" />

            {/* Testimonial Content */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
              <div className="text-center">
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-gold fill-gold"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl text-white leading-relaxed mb-8">
                  "{testimonials[currentIndex].quote}"
                </blockquote>

                {/* Author */}
                <div className="mb-8">
                  <p className="font-semibold text-gold">{testimonials[currentIndex].author}</p>
                  <p className="text-sm text-gray-400">{testimonials[currentIndex].role}</p>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevTestimonial}
                    className="border-white/20 text-white hover:bg-white/10 hover:text-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>

                  {/* Dots */}
                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentIndex ? 'w-8 bg-gold' : 'bg-white/30 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextTestimonial}
                    className="border-white/20 text-white hover:bg-white/10 hover:text-white"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
