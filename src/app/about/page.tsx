import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Award, Heart, Shield, Sparkles } from 'lucide-react';
import { siteConfig } from '@/data/site-config';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'About Us | Harley Street Injectables',
  description: 'Learn about our award-winning aesthetic clinic and meet our team of expert practitioners.',
};

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Patient-First Care',
      description: 'Your comfort, safety, and satisfaction are our top priorities.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We use only premium products and the latest techniques for optimal results.',
    },
    {
      icon: Shield,
      title: 'Safety',
      description: 'All treatments are performed by qualified medical professionals.',
    },
    {
      icon: Sparkles,
      title: 'Natural Results',
      description: 'We enhance your natural beauty with subtle, refined treatments.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="container-custom text-center">
          <h1 
            className="text-4xl md:text-5xl font-serif font-semibold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            About Us
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            London's leading non-surgical aesthetic clinic, bringing together world-class practitioners and cutting-edge treatments
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
            <span className="text-primary font-medium">About Us</span>
          </nav>
        </div>
      </div>

      {/* Our Story */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 
                className="text-3xl font-serif font-semibold text-primary mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Our Story
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Harley Street Injectables was founded with a simple vision: to provide the highest quality aesthetic treatments in a luxurious, welcoming environment. Located on the prestigious Harley Street, our clinic brings together some of London's most talented aesthetic practitioners.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We believe that everyone deserves to feel confident and beautiful. Our approach focuses on enhancing your natural features rather than changing who you are. We take pride in our subtle, refined results that help you look like the best version of yourself.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From the moment you step into our clinic, you'll experience the difference. Our commitment to excellence extends beyond our treatments to every aspect of your visit, from our luxurious clinic space to our warm, attentive team.
              </p>
            </div>
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80"
                alt="Harley Street Injectables Clinic"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-spacing bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl font-serif font-semibold text-primary mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-lg p-6 text-center card-hover">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-serif font-semibold text-primary mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="section-spacing" id="team">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl font-serif font-semibold text-primary mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Meet Our Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our expert practitioners bring years of experience and a passion for excellence
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {siteConfig.team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-serif font-semibold text-primary text-lg">{member.name}</h3>
                <p className="text-gold text-sm mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="section-spacing bg-primary">
        <div className="container-custom text-center">
          <h2 
            className="text-3xl font-serif font-semibold text-white mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Awards & Recognition
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {siteConfig.awards.map((award, index) => (
              <div key={index} className="bg-white/10 rounded-lg px-6 py-3">
                <span className="text-white">{award}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-300 text-sm">
            Featured in Vogue, Grazia, Vanity Fair, and Tatler
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing">
        <div className="container-custom text-center">
          <h2 
            className="text-3xl font-serif font-semibold text-primary mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to Start Your Journey?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Book a consultation with one of our expert practitioners today
          </p>
          <Button asChild className="btn-gold">
            <a href={siteConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
              Book a Consultation
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
