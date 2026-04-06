'use client';

import { Instagram, Facebook } from 'lucide-react';
import { Link } from '@/i18n/routing';

// Diamond Pattern Component
function DiamondPattern() {
  return (
    <div className="w-full h-16 overflow-hidden" style={{
      backgroundImage: `
        repeating-linear-gradient(45deg, transparent, transparent 30px, currentColor 30px, currentColor 31px),
        repeating-linear-gradient(-45deg, transparent, transparent 30px, currentColor 30px, currentColor 31px)
      `,
      opacity: 0.6
    }} />
  );
}

export function Footer() {
  return (
    <footer className="bg-white text-primary">
      {/* Main Footer Content */}
      <div className="container-custom py-12 md:py-16">
        {/* Stay Connected Section */}
        <div className="text-center mb-12">
          <h3 className="font-serif text-2xl md:text-3xl font-semibold text-primary mb-4 tracking-wide">
            STAY CONNECTED
          </h3>
          <p className="text-muted-foreground text-sm md:text-base mb-6 max-w-md mx-auto">
            Follow us on Social Media for<br className="md:hidden" /> current news and patients stories
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://facebook.com/silkbeautybatumi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-gold transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-8 h-8" strokeWidth={1.5} />
            </a>
            <a
              href="https://instagram.com/silkbeautybatumi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-gold transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-8 h-8" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-12">
          <Link
            href="/find-specialist"
            className="text-xs tracking-[0.15em] uppercase text-primary hover:text-gold transition-colors"
          >
            FIND A SPECIALIST
          </Link>
          <Link
            href="/terms"
            className="text-xs tracking-[0.15em] uppercase text-primary hover:text-gold transition-colors"
          >
            TERMS OF USE
          </Link>
          <Link
            href="/privacy"
            className="text-xs tracking-[0.15em] uppercase text-primary hover:text-gold transition-colors"
          >
            PRIVACY
          </Link>
          <Link
            href="/cookies"
            className="text-xs tracking-[0.15em] uppercase text-primary hover:text-gold transition-colors"
          >
            COOKIE NOTICE
          </Link>
        </div>
      </div>

      {/* Diamond Pattern */}
      <div className="text-primary">
        <DiamondPattern />
      </div>
    </footer>
  );
}
