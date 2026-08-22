'use client';

import React from 'react';
import Link from 'next/link';
import { Users, Calendar, Clock, ShieldCheck } from 'lucide-react';
import { BRAND_INFO } from '@/data/brandData';

export default function WeddingEventSection() {
  return (
    <section className="py-20 bg-cream-100 border-y border-gold-400/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-mehndi-950 via-mehndi-900 to-mehndi-950 rounded-3xl p-8 sm:p-12 text-cream-50 border border-gold-400/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs uppercase tracking-widest font-semibold">
                <Users className="w-3.5 h-3.5 text-gold-400" />
                <span>Large Event Capacity</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                Weddings & Large-Scale <span className="text-gold-gradient italic">Event Services</span>
              </h2>

              <div className="p-4 rounded-2xl bg-black/30 border border-gold-400/20 text-cream-200 text-sm space-y-2">
                <p className="font-medium text-gold-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  Professional Multi-Artist Team Execution
                </p>
                <p className="text-xs sm:text-sm text-cream-200/90 leading-relaxed">
                  &ldquo;{BRAND_INFO.maxEventCapacity}&rdquo;
                </p>
              </div>

              <p className="text-xs sm:text-sm text-cream-300/80 leading-relaxed">
                Whether hosting an intimate family Mehendi night or a grand Sangeet celebration with hundreds of guests, our highly trained team of artists ensures prompt application, graceful designs, and an enjoyable guest experience.
              </p>

              <p className="text-[11px] text-gold-400/80 italic">
                * Note: Event booking requests are subject to artist scheduling and team availability. We recommend booking well in advance.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-4 text-center border-t lg:border-t-0 lg:border-l border-gold-400/20 pt-6 lg:pt-0 lg:pl-8">
              <div className="text-gold-300 font-serif text-3xl font-bold">
                Starting from ₹600
                <span className="block text-xs font-sans text-cream-200 font-normal">per guest</span>
              </div>

              <Link
                href="#booking"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-gold-400 hover:bg-gold-300 text-mehndi-950 font-bold uppercase tracking-wider text-xs shadow-xl transition-all"
              >
                <Calendar className="w-4 h-4 text-mehndi-950" />
                Book Event Service
              </Link>

              <a
                href={`https://wa.me/${BRAND_INFO.whatsappRaw}?text=Hello%20Hasti%20Henna!%20I%20would%20like%20to%20enquire%20about%20booking%20event%20mehndi%20for%20a%20large%20group.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gold-300 hover:underline flex items-center gap-1"
              >
                <Clock className="w-3.5 h-3.5 text-gold-400" />
                Check Date Availability on WhatsApp
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
