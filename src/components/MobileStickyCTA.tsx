'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Phone } from 'lucide-react';
import { BRAND_INFO } from '@/data/brandData';

export default function MobileStickyCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-mehndi-950/95 backdrop-blur-md border-t border-gold-400/30 p-2.5 flex items-center justify-between gap-2 shadow-2xl">
      <Link
        href="/#booking"
        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-mehndi-950 font-bold uppercase tracking-wider text-xs shadow-lg active:scale-95 transition-transform"
      >
        <Calendar className="w-4 h-4" />
        Book Now
      </Link>
      <a
        href={`https://wa.me/${BRAND_INFO.whatsappRaw}?text=Hello%20Hasti%20Henna!%20I%20would%20like%20to%20enquire%20about%20booking%20mehndi%20services.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 text-white font-bold uppercase tracking-wider text-xs shadow-lg active:scale-95 transition-transform border border-gold-400/30"
      >
        <Phone className="w-4 h-4" />
        WhatsApp
      </a>
    </div>
  );
}
