'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BRAND_INFO } from '@/data/brandData';

export default function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${BRAND_INFO.whatsappRaw}?text=Hello%20Hasti%20Henna!%20I%20would%20like%20to%20enquire%20about%20booking%20mehndi%20services.`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 group flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-gold-400"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 animate-pulse text-white" />
      <span className="hidden sm:inline-block font-semibold text-xs uppercase tracking-wider">
        Chat on WhatsApp
      </span>
      <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
      </span>
    </a>
  );
}
