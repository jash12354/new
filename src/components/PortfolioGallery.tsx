'use client';

import React, { useState } from 'react';
import { Sparkles, Maximize2, X } from 'lucide-react';
import { PORTFOLIO_ITEMS, PortfolioItem } from '@/data/brandData';

const categories = ['All', 'Bridal', 'Wedding', 'Arabic', 'Indian', 'Events', 'Academy'] as const;

export default function PortfolioGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  const filteredItems = selectedCategory === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="portfolio" className="py-20 bg-cream-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-mehndi-100 border border-gold-400/30 text-mehndi-800 text-xs uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>Masterpiece Gallery</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-mehndi-950">
            Portfolio of <span className="text-gold-gradient italic">Intricate Designs</span>
          </h2>
          <p className="text-sm sm:text-base text-mehndi-800/80 leading-relaxed font-light">
            Explore our curated collection across bridal, wedding celebrations, Arabic, traditional Indian motifs, and academy training.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-mehndi-950 text-gold-300 border border-gold-400 shadow-md scale-105'
                  : 'bg-white text-mehndi-900 border border-gold-400/20 hover:border-gold-400 hover:bg-cream-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative rounded-2xl overflow-hidden bg-white border border-gold-400/20 shadow-md cursor-pointer hover:shadow-2xl transition-all duration-500 aspect-[4/5]"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mehndi-950/90 via-mehndi-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-gold-300 text-[10px] uppercase tracking-wider font-semibold border border-gold-400/30">
                {item.tag}
              </span>

              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gold-400/20 backdrop-blur-md border border-gold-400/40 flex items-center justify-center text-gold-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-cream-50 space-y-1">
                <h3 className="font-serif text-xl font-bold text-cream-50 group-hover:text-gold-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-cream-200/80 line-clamp-2 font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeItem && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveItem(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-mehndi-950 border border-gold-400/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 border border-gold-400/40 text-cream-100 flex items-center justify-center hover:bg-gold-400 hover:text-mehndi-950 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-1/2 max-h-[70vh] md:max-h-none overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6 text-cream-50">
                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-gold-400/20 text-gold-300 text-xs uppercase tracking-widest font-semibold border border-gold-400/30">
                    {activeItem.category} • {activeItem.tag}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream-50">{activeItem.title}</h3>
                  <p className="text-xs sm:text-sm text-cream-200/90 leading-relaxed font-light">
                    {activeItem.description}
                  </p>
                  <p className="text-xs text-gold-300/80 italic">
                    Crafted with 100% natural organic Sojat henna cones and essential oil stain development.
                  </p>
                </div>

                <div className="pt-4 border-t border-gold-400/20 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href="#booking"
                    onClick={() => setActiveItem(null)}
                    className="w-full text-center py-3 rounded-xl bg-gold-400 hover:bg-gold-300 text-mehndi-950 font-bold uppercase tracking-wider text-xs shadow-md transition-colors"
                  >
                    Request Similar Design
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
