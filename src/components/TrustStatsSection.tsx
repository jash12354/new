import React from 'react';
import { MapPin, Users, Crown, GraduationCap, Sparkles } from 'lucide-react';

export default function TrustStatsSection() {
  const trustHighlights = [
    {
      icon: MapPin,
      title: 'Nationwide Service',
      description: 'Based in Surat, Gujarat. Serving weddings and events across India.',
    },
    {
      icon: Users,
      title: 'Professional Artists',
      description: 'Experienced team handling large bridal parties & multi-guest celebrations.',
    },
    {
      icon: Crown,
      title: 'Bridal & Event Expertise',
      description: 'Customized intricate storytelling motifs, couple figures, and royal patterns.',
    },
    {
      icon: GraduationCap,
      title: 'Academy & Certification',
      description: 'Structured basic and advanced henna courses for professional learning.',
    },
    {
      icon: Sparkles,
      title: 'Natural Mehndi Cones',
      description: 'Chemical-free 100% organic Sojat henna cones with rich mahogany stain.',
    },
  ];

  return (
    <section className="bg-cream-100 py-12 border-y border-gold-400/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {trustHighlights.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-gold-400/20 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center space-y-2 group"
              >
                <div className="w-12 h-12 rounded-full bg-mehndi-50 border border-gold-400/30 flex items-center justify-center text-mehndi-700 group-hover:scale-110 group-hover:bg-gold-400 group-hover:text-mehndi-950 transition-all">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-base font-bold text-mehndi-950">{item.title}</h3>
                <p className="text-xs text-mehndi-800/80 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
