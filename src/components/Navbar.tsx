'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Calendar, Sparkles } from 'lucide-react';
import { BRAND_INFO } from '@/data/brandData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/#hero' },
    { name: 'Services', href: '/#services' },
    { name: 'Bridal', href: '/#bridal' },
    { name: 'Portfolio', href: '/#portfolio' },
    { name: 'Academy', href: '/#academy' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream-100/90 backdrop-blur-md shadow-md py-3 border-b border-gold-400/20'
          : 'bg-gradient-to-b from-black/40 via-black/20 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-mehndi-700 flex items-center justify-center text-cream-100 shadow-md group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-gold-100" />
          </div>
          <div className="flex flex-col">
            <span className={`font-serif text-2xl font-bold tracking-wide transition-colors ${scrolled ? 'text-mehndi-950' : 'text-cream-50'}`}>
              {BRAND_INFO.name}
            </span>
            <span className={`text-[10px] tracking-widest uppercase transition-colors ${scrolled ? 'text-mehndi-700' : 'text-gold-200'}`}>
              Surat • All India
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-gold-500 ${
                scrolled ? 'text-mehndi-900' : 'text-cream-100'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`https://wa.me/${BRAND_INFO.whatsappRaw}?text=Hello%20Hasti%20Henna!%20I%20would%20like%20to%20enquire%20about%20booking%20mehndi%20services.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-full border border-gold-400/60 text-gold-500 hover:bg-gold-400/10 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            WhatsApp
          </a>
          <Link
            href="/#booking"
            className="flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-full bg-gradient-to-r from-mehndi-800 to-mehndi-600 text-cream-100 hover:from-mehndi-700 hover:to-mehndi-500 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 border border-gold-400/30"
          >
            <Calendar className="w-3.5 h-3.5 text-gold-300" />
            Book Now
          </Link>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? 'text-mehndi-950 hover:bg-cream-200' : 'text-cream-100 hover:bg-white/10'
          }`}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-mehndi-950 border-b border-gold-400/20 px-4 pt-4 pb-6 space-y-4 shadow-2xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-cream-100 hover:text-gold-400 py-1 transition-colors border-b border-mehndi-800/50"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <Link
              href="/#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-mehndi-950 font-bold uppercase tracking-wider text-xs shadow-md"
            >
              Book Your Mehndi
            </Link>
            <a
              href={`https://wa.me/${BRAND_INFO.whatsappRaw}?text=Hello%20Hasti%20Henna!%20I%20would%20like%20to%20enquire%20about%20booking%20mehndi%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl border border-gold-400/40 text-cream-100 font-semibold uppercase tracking-wider text-xs"
            >
              Chat on WhatsApp ({BRAND_INFO.whatsappDisplay})
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
