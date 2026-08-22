import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, Sparkles, Heart } from 'lucide-react';
import { BRAND_INFO } from '@/data/brandData';

export default function Footer() {
  return (
    <footer className="bg-mehndi-950 text-cream-200 border-t border-gold-400/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gold-400 flex items-center justify-center text-mehndi-950 font-bold">
                <Sparkles className="w-5 h-5 text-mehndi-950" />
              </div>
              <span className="font-serif text-2xl font-bold text-cream-50">{BRAND_INFO.name}</span>
            </div>
            <p className="text-xs text-cream-300 leading-relaxed">
              Premium Mehndi Artistry across India. Crafting unforgettable bridal, wedding & custom henna artwork with dark natural stain.
            </p>
            <div className="flex items-center gap-2 text-xs text-gold-300">
              <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
              <span>{BRAND_INFO.location}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-gold-400 border-b border-gold-400/20 pb-2">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/#hero" className="hover:text-gold-300 transition-colors">Home</Link></li>
              <li><Link href="/#services" className="hover:text-gold-300 transition-colors">Services & Pricing</Link></li>
              <li><Link href="/#bridal" className="hover:text-gold-300 transition-colors">Bridal Collection</Link></li>
              <li><Link href="/#portfolio" className="hover:text-gold-300 transition-colors">Art Gallery</Link></li>
              <li><Link href="/#academy" className="hover:text-gold-300 transition-colors">Mehndi Academy</Link></li>
              <li><Link href="/#booking" className="hover:text-gold-300 transition-colors">Book Online</Link></li>
              <li><Link href="/admin/login" className="hover:text-gold-300 transition-colors opacity-70">Admin Login</Link></li>
            </ul>
          </div>

          {/* Services Offered */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-gold-400 border-b border-gold-400/20 pb-2">Our Services</h4>
            <ul className="space-y-2 text-xs text-cream-300">
              <li>Bridal Mehndi Packages</li>
              <li>Wedding & Sangeet Group Services</li>
              <li>Arabic & Modern Fusion Designs</li>
              <li>Doorstep Home Service</li>
              <li>Basic & Professional Henna Courses</li>
              <li>100% Natural Organic Mehndi Cones</li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold text-gold-400 border-b border-gold-400/20 pb-2">Connect With Us</h4>
            <div className="space-y-3 text-xs">
              <a
                href={`https://wa.me/${BRAND_INFO.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-mehndi-900/60 border border-gold-400/30 hover:border-gold-400 text-cream-100 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: {BRAND_INFO.whatsappDisplay}</span>
              </a>
              <a
                href={BRAND_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-mehndi-900/60 border border-gold-400/30 hover:border-gold-400 text-cream-100 transition-colors"
              >
                <svg className="w-4 h-4 text-pink-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram: {BRAND_INFO.instagramHandle}</span>
              </a>
            </div>
            <p className="text-[11px] text-gold-300/80 italic">
              Serving Surat, Ahmedabad, Vadodara, Mumbai, Delhi, Jaipur & nationwide destinations across India.
            </p>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="mt-12 pt-8 border-t border-gold-400/10 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-300/70 gap-4">
          <p>© {new Date().getFullYear()} {BRAND_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>for timeless celebrations</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
