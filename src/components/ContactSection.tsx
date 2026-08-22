'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, MessageCircle, Calendar, Sparkles } from 'lucide-react';
import { BRAND_INFO } from '@/data/brandData';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-cream-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-gold-400/30 p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-mehndi-100 text-mehndi-800 border border-gold-400/30 text-xs uppercase tracking-widest font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-gold-600" />
              <span>Get In Touch</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-mehndi-950">
              Contact <span className="text-gold-gradient italic">Hasti Henna</span>
            </h2>

            <p className="text-sm text-mehndi-800/80 leading-relaxed font-light">
              Have questions about customized bridal packages, course enrolments, or natural organic henna products? Reach out directly via WhatsApp or Instagram.
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-mehndi-950">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-cream-100 border border-gold-400/20">
                <MapPin className="w-5 h-5 text-gold-600 shrink-0" />
                <div>
                  <span className="font-bold block text-mehndi-950">Primary Studio Location:</span>
                  <span className="text-mehndi-800">{BRAND_INFO.location} • Services Available Across India 🇮🇳</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-cream-100 border border-gold-400/20">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold block text-mehndi-950">WhatsApp & Direct Line:</span>
                  <span className="text-mehndi-800">{BRAND_INFO.whatsappDisplay}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${BRAND_INFO.whatsappRaw}?text=Hello%20Hasti%20Henna!%20I%20would%20like%20to%20enquire%20about%20booking%20mehndi%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-wider text-xs shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
              <a
                href={BRAND_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-gold-400/60 bg-cream-100 text-mehndi-950 font-bold uppercase tracking-wider text-xs hover:bg-gold-400/20 transition-colors"
              >
                <svg className="w-4 h-4 text-pink-600 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram {BRAND_INFO.instagramHandle}
              </a>
              <Link
                href="#booking"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-mehndi-950 hover:bg-gold-500 text-cream-100 hover:text-mehndi-950 font-bold uppercase tracking-wider text-xs transition-colors shadow-md"
              >
                <Calendar className="w-4 h-4" />
                Book A Service
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-gold-400/30 bg-mehndi-900 p-6 text-cream-100 space-y-4">
            <h3 className="font-serif text-xl font-bold text-gold-300">Quick Contact Guarantee</h3>
            <p className="text-xs text-cream-200 leading-relaxed font-light">
              We respond to all online booking requests and WhatsApp queries within a few hours. For urgent bridal date checks, messaging directly on WhatsApp is recommended.
            </p>
            <div className="pt-2 text-xs font-semibold text-gold-400 border-t border-gold-400/20">
              Hours: Mon - Sun (9:00 AM - 9:00 PM IST)
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
