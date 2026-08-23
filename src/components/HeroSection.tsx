'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, MessageCircle, Sparkles, Award } from 'lucide-react';
import { BRAND_INFO } from '@/data/brandData';
import ThreeHennaParticles from './ThreeHennaParticles';

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 500], [0, -100]);
  const subY = useTransform(scrollY, [0, 500], [0, -60]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0.3]);
  const imageScale = useTransform(scrollY, [0, 500], [1, 0.93]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 16;
      const y = (clientY / window.innerHeight - 0.5) * 16;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const whatsappUrl = `https://wa.me/${BRAND_INFO.whatsappRaw}?text=Hello%20Hasti%20Henna!%20I%20would%20like%20to%20enquire%20about%20booking%20bridal%20or%20event%20mehndi.`;

  return (
    <section id="hero" className="relative min-h-screen bg-henna-dark text-cream-50 flex items-center pt-24 pb-16 overflow-hidden">
      <ThreeHennaParticles />

      {/* Dynamic Lighting Ornaments */}
      <div
        className="absolute top-1/4 left-10 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: !isMobile ? `translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px)` : 'none',
        }}
      />
      <div
        className="absolute bottom-10 right-10 w-96 h-96 bg-mehndi-600/20 rounded-full blur-3xl pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: !isMobile ? `translate(${-mousePos.x * 1.5}px, ${-mousePos.y * 1.5}px)` : 'none',
        }}
      />

      <motion.div
        style={{ opacity: heroOpacity }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs uppercase tracking-widest font-semibold backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Surat, Gujarat • Pan-India Booking</span>
            </motion.div>

            {/* Title */}
            <motion.div style={{ y: titleY }}>
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight"
              >
                HASTI HENNA
                <span className="block text-2xl sm:text-3xl lg:text-4xl text-gold-gradient italic font-normal mt-2">
                  Where Tradition Meets Artistry
                </span>
              </motion.h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div style={{ y: subY }}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-base sm:text-lg text-cream-200/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
              >
                {BRAND_INFO.subheading}
              </motion.p>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-medium text-gold-200/80"
            >
              <span className="px-3 py-1 rounded-md bg-mehndi-900/80 border border-gold-400/20">Bridal</span>
              <span>•</span>
              <span className="px-3 py-1 rounded-md bg-mehndi-900/80 border border-gold-400/20">Weddings</span>
              <span>•</span>
              <span className="px-3 py-1 rounded-md bg-mehndi-900/80 border border-gold-400/20">Events</span>
              <span>•</span>
              <span className="px-3 py-1 rounded-md bg-mehndi-900/80 border border-gold-400/20">Academy</span>
              <span>•</span>
              <span className="px-3 py-1 rounded-md bg-mehndi-900/80 border border-gold-400/20">Natural Products</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link
                href="#booking"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-mehndi-950 font-bold uppercase tracking-wider text-xs shadow-xl hover:shadow-gold-500/30 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Calendar className="w-4 h-4 text-mehndi-950" />
                Book Your Mehndi
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-gold-400/50 bg-mehndi-900/50 hover:bg-gold-400/10 text-cream-50 font-semibold uppercase tracking-wider text-xs backdrop-blur-md transition-all duration-300 hover:border-gold-400"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                Chat on WhatsApp
              </a>
            </motion.div>

            {/* Guarantees */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.75 }}
              className="pt-6 border-t border-gold-400/15 grid grid-cols-3 gap-2 text-center lg:text-left text-xs text-cream-300/80"
            >
              <div className="space-y-1">
                <span className="block font-bold text-gold-300">100% Organic</span>
                <span className="text-[11px]">Dark Natural Stain</span>
              </div>
              <div className="space-y-1">
                <span className="block font-bold text-gold-300">Customized</span>
                <span className="text-[11px]">Bespoke Story Motifs</span>
              </div>
              <div className="space-y-1">
                <span className="block font-bold text-gold-300">All India</span>
                <span className="text-[11px]">On-Location Service</span>
              </div>
            </motion.div>

          </div>

          {/* Right Image Display with Scale 1.08 -> 1 entrance & exit parallax */}
          <motion.div
            style={{ scale: imageScale }}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="lg:col-span-5 relative flex justify-center perspective-1000"
          >
            <div
              className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border-2 border-gold-400/40 shadow-2xl group transition-transform duration-300 ease-out"
              style={{
                transform: !isMobile
                  ? `rotateY(${mousePos.x * 0.8}deg) rotateX(${-mousePos.y * 0.8}deg)`
                  : 'none',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=1200"
                alt="Hasti Henna Bridal Mehndi Showcase"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mehndi-950 via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-gold-400/30 text-cream-100 space-y-1">
                <div className="flex items-center justify-between text-xs text-gold-300 font-semibold">
                  <span>Bridal Signature Work</span>
                  <Award className="w-4 h-4 text-gold-400" />
                </div>
                <p className="text-sm font-serif font-bold text-cream-50">Hasti Henna Custom Bridal Design</p>
                <p className="text-[11px] text-cream-300">Surat & Pan-India Event Bookings</p>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
