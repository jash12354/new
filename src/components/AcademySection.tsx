'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, CheckCircle2, Clock, Award, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { ACADEMY_COURSES } from '@/data/brandData';

export default function AcademySection() {
  return (
    <section id="academy" className="py-20 bg-cream-100 border-t border-gold-400/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-mehndi-100 border border-gold-400/30 text-mehndi-800 text-xs uppercase tracking-widest font-semibold">
            <GraduationCap className="w-3.5 h-3.5 text-gold-600" />
            <span>Hasti Henna Academy</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-mehndi-950">
            Learn Professional <span className="text-gold-gradient italic">Henna Artistry</span>
          </h2>
          <p className="text-sm sm:text-base text-mehndi-800/80 leading-relaxed font-light">
            Master the ancient craft of mehndi with structured hands-on training, expert cone handling techniques, and complete professional guidance.
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ACADEMY_COURSES.map((course) => (
            <div
              key={course.id}
              className="rounded-3xl bg-white border-2 border-gold-400/30 shadow-xl overflow-hidden p-6 sm:p-8 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 relative group"
            >
              {/* Badge */}
              {course.badge && (
                <span className="absolute top-6 right-6 px-3.5 py-1 rounded-full bg-gold-400 text-mehndi-950 text-[11px] font-bold uppercase tracking-wider shadow-sm">
                  {course.badge}
                </span>
              )}

              <div className="space-y-6">

                {/* Course Title & Price */}
                <div className="space-y-2 pr-12">
                  <span className="text-xs font-semibold text-gold-600 uppercase tracking-widest flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    {course.level} Level
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-mehndi-950">{course.title}</h3>
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="font-serif text-3xl font-bold text-gold-600">{course.price}</span>
                    <span className="text-xs text-mehndi-700">/ person</span>
                    <span className="ml-auto text-xs text-mehndi-800 font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gold-500" />
                      {course.duration}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-mehndi-800/80 leading-relaxed font-light">
                  {course.description}
                </p>

                {/* Curriculum Breakdown */}
                <div className="space-y-3 pt-4 border-t border-cream-200">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-mehndi-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-gold-500" />
                    Course Modules & Curriculum
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-mehndi-900">
                    {course.curriculum.map((currItem, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-500 shrink-0 mt-0.5" />
                        <span>{currItem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What's Included */}
                <div className="p-4 rounded-2xl bg-cream-50 border border-gold-400/20 space-y-2">
                  <h5 className="text-xs font-bold text-mehndi-950 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-gold-500" />
                    Included With Enrolment
                  </h5>
                  <ul className="space-y-1 text-xs text-mehndi-800">
                    {course.included.map((inc, iIdx) => (
                      <li key={iIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-6">
                <Link
                  href="#booking"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-mehndi-950 hover:bg-gold-500 text-cream-100 hover:text-mehndi-950 font-bold uppercase tracking-wider text-xs transition-colors duration-300 shadow-lg"
                >
                  <span>Enroll In {course.title}</span>
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
