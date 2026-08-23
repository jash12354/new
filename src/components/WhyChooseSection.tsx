'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Droplet, Users, Palette, Crown, MapPin, GraduationCap, PackageCheck } from 'lucide-react';
import { WHY_CHOOSE_US } from '@/data/brandData';

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Droplet,
  Users,
  Palette,
  Crown,
  MapPin,
  GraduationCap,
  PackageCheck,
};

export default function WhyChooseSection() {
  return (
    <section className="py-20 bg-cream-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-mehndi-100 border border-gold-400/30 text-mehndi-800 text-xs uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            <span>The Hasti Henna Advantage</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-mehndi-950">
            Why Brides & Families <span className="text-gold-gradient italic">Trust Us</span>
          </h2>
          <p className="text-sm sm:text-base text-mehndi-800/80 leading-relaxed font-light">
            We blend ancient Indian heritage with modern elegance, pristine organic safety, and professional execution.
          </p>
        </motion.div>

        {/* Progressive Story Reveal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => {
            const IconComp = iconMap[item.icon] || Sparkles;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-6 rounded-2xl bg-white border border-gold-400/20 shadow-md hover:shadow-xl transition-all duration-300 space-y-3 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400/20 to-mehndi-100 border border-gold-400/30 flex items-center justify-center text-mehndi-800 group-hover:bg-gold-400 group-hover:text-mehndi-950 transition-colors">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-mehndi-950">{item.title}</h3>
                <p className="text-xs text-mehndi-800/80 leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
