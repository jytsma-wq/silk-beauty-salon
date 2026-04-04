'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { siteConfig } from '@/data/site-config';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="container-custom text-center">
          <h1 
            className="text-4xl md:text-5xl font-serif font-semibold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Contact Us
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Get in touch with our team to book a consultation or ask any questions
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
            <span className="text-primary font-medium">Contact Us</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 
                className="text-2xl font-serif font-semibold text-primary mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Send Us a Message
              </h2>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <h3 className="text-xl font-semibold text-green-700 mb-2">Thank You!</h3>
                  <p className="text-green-600">
                    Your message has been sent successfully. We'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Enter your phone"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      placeholder="How can we help you?"
                      rows={5}
                    />
                  </div>
                  <Button type="submit" className="btn-gold w-full sm:w-auto">
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 
                className="text-2xl font-serif font-semibold text-primary mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Get in Touch
              </h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Address</h3>
                    <p className="text-muted-foreground">
                      {siteConfig.contact.address}<br />
                      {siteConfig.contact.city}, {siteConfig.contact.postcode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Phone</h3>
                    <a
                      href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
                      className="text-muted-foreground hover:text-gold transition-colors"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Email</h3>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-muted-foreground hover:text-gold transition-colors"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="bg-secondary rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-gold" />
                  <h3 className="font-semibold text-primary">Opening Hours</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Tuesday</span>
                    <span>{siteConfig.businessHours.monday}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Wednesday - Thursday</span>
                    <span>{siteConfig.businessHours.wednesday}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Friday</span>
                    <span>{siteConfig.businessHours.friday}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Saturday - Sunday</span>
                    <span>{siteConfig.businessHours.saturday}</span>
                  </li>
                </ul>
              </div>

              {/* Book CTA */}
              <div className="mt-8 p-6 bg-primary rounded-lg text-center">
                <h3 className="text-white font-serif text-xl mb-2">Ready to Book?</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Book your appointment online through our booking system
                </p>
                <Button asChild className="btn-gold">
                  <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
                    Book Appointment
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] bg-secondary">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gold mx-auto mb-4" />
            <h3 className="font-serif text-xl text-primary mb-2">106 Harley Street</h3>
            <p className="text-muted-foreground">London, W1G 7JE</p>
            <a
              href="https://maps.google.com/?q=106+Harley+Street+London+W1G+7JE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-gold hover:underline"
            >
              View on Google Maps →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
