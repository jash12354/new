'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { SERVICES_LIST } from '@/data/brandData';

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-cream-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mehndi-100 border border-gold-400/40 text-mehndi-800 text-xs uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Our Offerings</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-mehndi-950">
            Artistry Tailored For Every <span className="text-gold-gradient italic">Celebration</span>
          </h2>
          <p className="text-sm sm:text-base text-mehndi-800/80 leading-relaxed font-light">
            From regal bridal henna to high-volume event services, professional academy training, and organic henna products.
          </p>
          <p className="text-xs text-gold-600 font-medium italic">
            * All listed prices are starting estimates and vary based on design complexity, location, and headcount.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className="rounded-3xl bg-white border border-gold-400/25 shadow-lg overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-mehndi-950/80 backdrop-blur-md text-gold-300 text-[11px] font-semibold tracking-wider uppercase border border-gold-400/30">
                    {service.category}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 flex items-baseline justify-between text-white">
                    <span className="text-xs uppercase tracking-wider text-cream-200">Starting from</span>
                    <span className="font-serif text-xl font-bold text-gold-300">
                      {service.startingPrice} {service.unit && <span className="text-xs font-normal text-cream-100">/{service.unit}</span>}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-mehndi-950">{service.title}</h3>
                  <p className="text-xs text-mehndi-800/80 leading-relaxed">{service.description}</p>

                  <ul className="space-y-2 pt-2 border-t border-cream-200">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-mehndi-900">
                        <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={service.id === 'mehndi-academy' ? '#academy' : '#booking'}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-mehndi-900 hover:bg-gold-500 text-cream-100 hover:text-mehndi-950 font-bold uppercase tracking-wider text-xs transition-colors duration-300 shadow-md"
                >
                  <span>{service.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
