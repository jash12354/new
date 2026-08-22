'use client';

import React from 'react';
import Link from 'next/link';
import { Crown, Heart, CheckCircle2, Calendar } from 'lucide-react';

export default function BridalSection() {
  const customElements = [
    "Bride & Groom's personal preferences",
    "Wedding theme & wardrobe harmonization",
    "Traditional Indian motifs & royal figures",
    "Modern Arabic floral flow & negative space",
    "Personalized names, initials & special dates",
    "Custom couple story portraits (Dulha Dulhan)",
    "Sacred symbols, mantras & proposal skylines",
    "Matching bride's family & bridesmaids packages",
  ];

  return (
    <section id="bridal" className="py-20 bg-henna-dark text-cream-50 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs uppercase tracking-widest font-semibold">
              <Crown className="w-3.5 h-3.5 text-gold-400" />
              <span>Bespoke Bridal Couture</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Your Big Day Deserves <span className="text-gold-gradient italic">Extraordinary</span> Mehndi
            </h2>

            <p className="text-sm sm:text-base text-cream-200/90 leading-relaxed font-light">
              Bridal henna is not just a ritual—it is a cherished piece of wearable art celebrating your love story. Every Hasti Henna bridal design is handcrafted with fine detail, deep passion, and customized to reflect your vision.
            </p>

            <div className="pt-2">
              <h3 className="text-xs uppercase tracking-widest font-bold text-gold-400 mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-gold-400 inline" />
                Customized According To:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {customElements.map((elem, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-mehndi-900/60 border border-gold-400/20 text-xs text-cream-100">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                    <span>{elem}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="#booking"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 text-mehndi-950 font-bold uppercase tracking-wider text-xs shadow-xl hover:scale-105 transition-all"
              >
                <Calendar className="w-4 h-4 text-mehndi-950" />
                Book Your Bridal Mehndi
              </Link>
              <span className="text-xs text-gold-300/80 italic text-center sm:text-left">
                Starting from ₹10,000 • Pan-India Travel Available
              </span>
            </div>

          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md aspect-[3/4] rounded-3xl overflow-hidden border-2 border-gold-400/40 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=1000"
                alt="Bridal Henna Artistry Hasti Henna"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mehndi-950 via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-gold-400/30 text-center">
                <p className="font-serif text-lg font-bold text-gold-300">Intricate Royal Coverage</p>
                <p className="text-xs text-cream-200">100% Chemical-free Organic Stain Guarantee</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
