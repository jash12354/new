'use client';

import React, { useState } from 'react';
import { Sparkles, Droplet, Clock, ShieldCheck } from 'lucide-react';
import { STAIN_TRANSFORMATIONS } from '@/data/brandData';

export default function BeforeAfterStain() {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const transformation = STAIN_TRANSFORMATIONS[0];

  return (
    <section className="py-20 bg-cream-50 border-t border-gold-400/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-mehndi-100 border border-gold-400/30 text-mehndi-800 text-xs uppercase tracking-widest font-semibold">
            <Droplet className="w-3.5 h-3.5 text-gold-600" />
            <span>Organic Stain Transformation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-mehndi-950">
            Fresh Henna Paste → <span className="text-gold-gradient italic">Rich Dark Stain</span>
          </h2>
          <p className="text-sm sm:text-base text-mehndi-800/80 leading-relaxed font-light">
            Slide across to compare the fresh wet application paste against the mature peak 48-hour mahogany stain achieved using our 100% chemical-free organic cones.
          </p>
        </div>

        {/* Interactive Comparison Slider */}
        <div className="max-w-3xl mx-auto">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-gold-400/40 shadow-2xl select-none">

            {/* Background Image: Deep Stain (Right Side) */}
            <img
              src={transformation.stainImage}
              alt="Deep Mahogany Mature Stain"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-mehndi-950/80 backdrop-blur-md text-gold-300 text-xs font-bold border border-gold-400/30 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold-400" />
              <span>48-Hour Peak Dark Stain</span>
            </div>

            {/* Overlay Image: Fresh Green Henna (Left Side) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={transformation.freshImage}
                alt="Fresh Applied Natural Paste"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: '100%', height: '100%' }}
              />
              <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-cream-100 text-xs font-bold border border-gold-400/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Fresh Organic Application</span>
              </div>
            </div>

            {/* Drag Handle Divider Line */}
            <div
              className="absolute inset-y-0 w-1 bg-gold-400 cursor-ew-resize z-20 shadow-2xl"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-gold-400 text-mehndi-950 flex items-center justify-center font-bold text-xs shadow-xl border-2 border-white">
                ↔
              </div>
            </div>

            {/* Native range slider overlay */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              aria-label="Comparison slider"
            />
          </div>

          <p className="mt-4 text-center text-xs text-mehndi-800/70 italic flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 inline" />
            <span>Actual results achieved with natural Eucalyptus & Tea Tree essential oil aftercare.</span>
          </p>
        </div>

      </div>
    </section>
  );
}
