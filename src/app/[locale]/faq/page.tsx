import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: 'FAQ | Harley Street Injectables',
  description: 'Find answers to frequently asked questions about our treatments, booking, and clinic.',
};

export default function FAQPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="container-custom text-center">
          <h1 
            className="text-4xl md:text-5xl font-serif font-semibold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Frequently Asked Questions
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about our clinic, treatments, and booking process
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-gold">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-primary font-medium">FAQ</span>
          </nav>
        </div>
      </div>

      {/* FAQ Content */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {siteConfig.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                  <AccordionTrigger className="text-left py-6 hover:text-gold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Additional Questions */}
            <div className="mt-12 bg-secondary rounded-lg p-8 text-center">
              <h2 
                className="text-xl font-serif font-semibold text-primary mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Still Have Questions?
              </h2>
              <p className="text-muted-foreground mb-6">
                Can't find the answer you're looking for? Please reach out to our friendly team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="btn-gold">
                  <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
                    Book a Consultation
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact-us">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
