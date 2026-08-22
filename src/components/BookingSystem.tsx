'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Calendar, Check, ChevronRight, MessageCircle, AlertCircle, Info, ArrowLeft, RefreshCw } from 'lucide-react';
import { BRAND_INFO } from '@/data/brandData';

export default function BookingSystem() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');

  const [formData, setFormData] = useState({
    // Common Customer Details
    fullName: '',
    whatsappNumber: '',
    email: '',
    service: 'Bridal Mehndi',

    // Event & Location Details
    eventDate: '',
    preferredTime: 'Morning (9 AM - 12 PM)',
    eventLocation: '',
    city: 'Surat',
    state: 'Gujarat',
    numberOfPeople: 1,

    // Bridal Specific Details
    brideName: '',
    bridalPackage: 'Full Hand & Arm + Feet',
    bridalDesignStyle: 'Traditional Indian + Arabic Fusion',
    handsCount: 'Both Hands',
    feetMehndiRequired: 'Yes',
    customizedElements: 'Names/Initials, Couple Figures & Mandalas',

    // Wedding/Event Specific Details
    eventType: 'Sangeet / Mehendi Party',
    guestCount: 50,
    artistsRequired: 'Team of 2-3 Artists',
    serviceDuration: 'Half Day (4 Hours)',

    // Academy Specific Details
    courseSelected: 'Basic Mehndi Course (₹6,000)',
    studentName: '',
    studentAge: '',
    preferredBatchDate: '',
    priorExperience: 'Beginner (No prior experience)',

    // Product Specific Details
    productType: 'Natural Sojat Organic Cones (Pack of 12)',
    coneQuantity: '1 Pack',
    deliveryCity: 'Surat',

    // General Notes
    additionalMessage: '',
  });

  const updateField = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateCurrentStep = () => {
    setErrorMsg('');
    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        setErrorMsg('Please enter your full name.');
        return false;
      }
      if (!formData.whatsappNumber.trim()) {
        setErrorMsg('Please enter a valid WhatsApp phone number.');
        return false;
      }
      // Simple phone length check
      if (formData.whatsappNumber.replace(/[^0-9]/g, '').length < 8) {
        setErrorMsg('Please enter a valid WhatsApp number (at least 8-10 digits).');
        return false;
      }
    }

    if (currentStep === 3) {
      if (formData.service === 'Mehndi Course') {
        if (!formData.studentName.trim()) {
          setErrorMsg('Please enter the student name.');
          return false;
        }
      } else if (formData.service === 'Mehndi Products') {
        if (!formData.deliveryCity.trim()) {
          setErrorMsg('Please enter your delivery city.');
          return false;
        }
      } else {
        if (!formData.eventDate) {
          setErrorMsg('Please select your event date.');
          return false;
        }
      }
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handlePrevStep = () => {
    setErrorMsg('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const formatWhatsAppMessage = () => {
    const lines: string[] = [
      '━━━━━━━━━━━━━━━━━━━━',
      '🌿 *HASTI HENNA — BOOKING REQUEST*',
      '━━━━━━━━━━━━━━━━━━━━',
      '',
      '👤 *CUSTOMER DETAILS*',
      `Name: ${formData.fullName}`,
      `WhatsApp: ${formData.whatsappNumber}`,
      formData.email ? `Email: ${formData.email}` : '',
      '',
      '🎨 *SERVICE DETAILS*',
      `Service: ${formData.service}`,
    ].filter(Boolean);

    // Dynamic fields based on selected service
    if (formData.service === 'Bridal Mehndi') {
      lines.push(
        `Package: ${formData.bridalPackage}`,
        `Design Style: ${formData.bridalDesignStyle}`,
        '',
        '📅 *EVENT DETAILS*',
        `Date: ${formData.eventDate}`,
        `Time: ${formData.preferredTime}`,
        `Location: ${formData.eventLocation || 'N/A'}, ${formData.city}, ${formData.state}`,
        '',
        '💍 *BRIDAL REQUIREMENTS*',
        `Bride Name: ${formData.brideName || formData.fullName}`,
        `Hands: ${formData.handsCount}`,
        `Feet Mehndi: ${formData.feetMehndiRequired}`,
        `Custom Motifs: ${formData.customizedElements}`
      );
    } else if (formData.service === 'Wedding/Event Mehndi') {
      lines.push(
        `Event Type: ${formData.eventType}`,
        `Guests Count: ${formData.guestCount}`,
        `Artists Required: ${formData.artistsRequired}`,
        `Expected Duration: ${formData.serviceDuration}`,
        '',
        '📅 *EVENT DETAILS*',
        `Date: ${formData.eventDate}`,
        `Time: ${formData.preferredTime}`,
        `Venue: ${formData.eventLocation || 'N/A'}, ${formData.city}, ${formData.state}`
      );
    } else if (formData.service === 'Mehndi Course') {
      lines.push(
        `Course: ${formData.courseSelected}`,
        `Student Name: ${formData.studentName || formData.fullName}`,
        formData.studentAge ? `Student Age: ${formData.studentAge}` : '',
        `Prior Experience: ${formData.priorExperience}`,
        formData.preferredBatchDate ? `Preferred Batch Date: ${formData.preferredBatchDate}` : ''
      );
    } else if (formData.service === 'Mehndi Products') {
      lines.push(
        `Product: ${formData.productType}`,
        `Quantity: ${formData.coneQuantity}`,
        `Delivery City: ${formData.deliveryCity}`
      );
    } else {
      // Arabic, Indian, Customized, Home Service
      lines.push(
        `Design Preference: ${formData.bridalDesignStyle}`,
        '📅 *EVENT DETAILS*',
        `Date: ${formData.eventDate}`,
        `Time: ${formData.preferredTime}`,
        `Location: ${formData.eventLocation || 'N/A'}, ${formData.city}, ${formData.state}`,
        `Number of People: ${formData.numberOfPeople}`
      );
    }

    if (formData.additionalMessage.trim()) {
      lines.push('', '📝 *SPECIAL REQUIREMENTS*', formData.additionalMessage.trim());
    }

    // Price Information & Disclaimer
    let startingPriceText = '₹10,000';
    if (formData.service === 'Wedding/Event Mehndi') startingPriceText = '₹600 / person';
    else if (formData.service === 'Mehndi Course') startingPriceText = formData.courseSelected.includes('14,000') ? '₹14,000' : '₹6,000';
    else if (formData.service === 'Mehndi Products') startingPriceText = '₹150 / cone pack';
    else if (formData.service === 'Customized Mehndi' || formData.service === 'Arabic Mehndi' || formData.service === 'Indian Mehndi') startingPriceText = '₹1,500';

    lines.push(
      '',
      '💰 *PRICE INFORMATION*',
      `Website Listed Starting Price: ${startingPriceText}`,
      '⚠️ *Final price and date availability to be confirmed by Hasti Henna.*',
      '',
      '━━━━━━━━━━━━━━━━━━━━',
      '📩 *Please confirm availability and quotation.*',
      '━━━━━━━━━━━━━━━━━━━━'
    );

    return lines.filter((line) => line !== '').join('\n');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const formattedMessage = formatWhatsAppMessage();
      const waLink = `https://wa.me/${BRAND_INFO.whatsappRaw}?text=${encodeURIComponent(formattedMessage)}`;
      setWhatsappUrl(waLink);

      // Save request to database
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          whatsappNumber: formData.whatsappNumber,
          email: formData.email,
          service: formData.service,
          eventDate: formData.eventDate || new Date().toISOString().slice(0, 10),
          preferredTime: formData.preferredTime,
          eventLocation: formData.eventLocation,
          city: formData.city,
          state: formData.state,
          numberOfPeople: formData.numberOfPeople,
          designPreference: formData.bridalDesignStyle,
          bridalPackagePreference: formData.bridalPackage,
          artistsRequired: formData.artistsRequired,
          travelRequirement: formData.city !== 'Surat' ? 'Outstation' : 'Local Surat',
          additionalMessage: formData.additionalMessage,
        }),
      });

      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Automatically open WhatsApp link
      window.open(waLink, '_blank');
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'Something went wrong while submitting.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-20 bg-henna-dark text-cream-50 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs uppercase tracking-widest font-semibold">
            <Calendar className="w-3.5 h-3.5 text-gold-400" />
            <span>Online Booking Request</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold">
            Reserve Your <span className="text-gold-gradient italic">Henna Experience</span>
          </h2>
          <p className="text-xs sm:text-sm text-cream-200/80 max-w-xl mx-auto font-light leading-relaxed">
            Fill in your details to instantly format your booking request for WhatsApp. Hasti Henna will review availability and confirm your final custom quote.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-mehndi-950/90 border border-gold-400/30 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">

          {submitted ? (
            /* Confirmation View */
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-3xl font-bold text-gold-300">Your booking details are ready! 💚</h3>
                <p className="text-sm text-cream-200 max-w-lg mx-auto leading-relaxed">
                  We&apos;ve prepared your complete booking request in WhatsApp. Send the message to Hasti Henna to continue your enquiry.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-gold-400/20 text-xs text-gold-300/90 max-w-md mx-auto space-y-1">
                <p className="font-semibold text-gold-400 flex items-center justify-center gap-1.5">
                  <Info className="w-4 h-4 text-gold-400" />
                  Availability Notice
                </p>
                <p className="text-cream-200">Your booking is not confirmed until Hasti Henna confirms availability and final quote on WhatsApp.</p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-wider text-xs shadow-xl transition-all border border-gold-400/40 hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4" />
                  Open WhatsApp Again
                </a>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setCurrentStep(1);
                  }}
                  className="text-xs text-gold-300 underline hover:text-gold-200 flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Submit Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            /* Multi-step Form */
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Progress Indicator Bar */}
              <div className="grid grid-cols-5 gap-2 text-center text-[10px] uppercase tracking-wider">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="space-y-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        step <= currentStep ? 'bg-gold-400 shadow-sm' : 'bg-mehndi-900'
                      }`}
                    />
                    <span className={step <= currentStep ? 'text-gold-300 font-bold' : 'text-cream-300/40'}>
                      Step {step}
                    </span>
                  </div>
                ))}
              </div>

              {/* Error Banner */}
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Step 1: Customer Details */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-gold-300 border-b border-gold-400/20 pb-2">
                    Step 1: Your Contact Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="block text-cream-200 font-medium">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        placeholder="e.g. Rahul Patel"
                        className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-cream-200 font-medium">WhatsApp Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.whatsappNumber}
                        onChange={(e) => updateField('whatsappNumber', e.target.value)}
                        placeholder="e.g. +91 7573927521"
                        className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="block text-cream-200 font-medium">Email Address (Optional)</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="e.g. rahul@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Service Selection */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-gold-300 border-b border-gold-400/20 pb-2">
                    Step 2: Select Service
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {[
                      { id: 'Bridal Mehndi', desc: 'Starting from ₹10,000' },
                      { id: 'Wedding/Event Mehndi', desc: 'Starting from ₹600/person' },
                      { id: 'Home Service', desc: 'Doorstep service applicable packages' },
                      { id: 'Arabic Mehndi', desc: 'Starting from ₹1,500' },
                      { id: 'Indian Mehndi', desc: 'Starting from ₹1,500' },
                      { id: 'Customized Mehndi', desc: 'Bespoke designs & couple motifs' },
                      { id: 'Mehndi Course', desc: 'Basic ₹6,000 / Advanced ₹14,000' },
                      { id: 'Mehndi Products', desc: '100% Organic Henna Cones' },
                    ].map((s) => (
                      <div
                        key={s.id}
                        onClick={() => updateField('service', s.id)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          formData.service === s.id
                            ? 'bg-gold-400/20 border-gold-400 text-gold-200 shadow-md'
                            : 'bg-mehndi-900/50 border-gold-400/20 text-cream-200 hover:border-gold-400/50'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-sm">
                          <span>{s.id}</span>
                          {formData.service === s.id && <Check className="w-4 h-4 text-gold-400" />}
                        </div>
                        <span className="text-[11px] text-cream-300/70">{s.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Conditional Details */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-gold-300 border-b border-gold-400/20 pb-2">
                    Step 3: {formData.service} Details
                  </h3>

                  {/* Bridal Specific */}
                  {formData.service === 'Bridal Mehndi' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1.5">
                        <label className="block text-cream-200 font-medium">Bride&apos;s Full Name</label>
                        <input
                          type="text"
                          value={formData.brideName}
                          onChange={(e) => updateField('brideName', e.target.value)}
                          placeholder="e.g. Ananya Patel"
                          className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-cream-200 font-medium">Bridal Package</label>
                        <select
                          value={formData.bridalPackage}
                          onChange={(e) => updateField('bridalPackage', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                        >
                          <option>Full Hand & Arm + Heavy Feet</option>
                          <option>Elbow Length Hands + Heavy Feet</option>
                          <option>Wrist Length Minimalist Bridal</option>
                          <option>Custom Bridal Coverage</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-cream-200 font-medium">Number of Hands</label>
                        <select
                          value={formData.handsCount}
                          onChange={(e) => updateField('handsCount', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                        >
                          <option>Both Hands (Front & Back)</option>
                          <option>Both Palms Only</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-cream-200 font-medium">Feet Mehndi Required?</label>
                        <select
                          value={formData.feetMehndiRequired}
                          onChange={(e) => updateField('feetMehndiRequired', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                        >
                          <option>Yes (Heavy Bridal Feet)</option>
                          <option>Yes (Light Anklet/Foot Cuffs)</option>
                          <option>No (Hands Only)</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="block text-cream-200 font-medium">Custom Motifs / Elements</label>
                        <input
                          type="text"
                          value={formData.customizedElements}
                          onChange={(e) => updateField('customizedElements', e.target.value)}
                          placeholder="e.g. Names/Initials, Proposal skylines, Dulha Dulhan portraits"
                          className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Event Specific */}
                  {formData.service === 'Wedding/Event Mehndi' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1.5">
                        <label className="block text-cream-200 font-medium">Event Type</label>
                        <select
                          value={formData.eventType}
                          onChange={(e) => updateField('eventType', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                        >
                          <option>Sangeet / Mehendi Night</option>
                          <option>Wedding Reception Guest Area</option>
                          <option>Corporate Festival Celebration</option>
                          <option>Private Family Party</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-cream-200 font-medium">Estimated Guests Count</label>
                        <input
                          type="number"
                          value={formData.guestCount}
                          onChange={(e) => updateField('guestCount', Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-cream-200 font-medium">Artists Required</label>
                        <select
                          value={formData.artistsRequired}
                          onChange={(e) => updateField('artistsRequired', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                        >
                          <option>1 Lead Artist</option>
                          <option>Team of 2-3 Artists</option>
                          <option>Large Team (4-8 Artists for 100+ Guests)</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-cream-200 font-medium">Expected Service Duration</label>
                        <select
                          value={formData.serviceDuration}
                          onChange={(e) => updateField('serviceDuration', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                        >
                          <option>Half Day (3-4 Hours)</option>
                          <option>Full Day (6-8 Hours)</option>
                          <option>Multi-Day Event</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Course Specific */}
                  {formData.service === 'Mehndi Course' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1.5">
                        <label className="block text-cream-200 font-medium">Select Course *</label>
                        <select
                          value={formData.courseSelected}
                          onChange={(e) => updateField('courseSelected', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                        >
                          <option>Basic Mehndi Course (₹6,000)</option>
                          <option>Advanced / Professional Course (₹14,000)</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-cream-200 font-medium">Student Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.studentName}
                          onChange={(e) => updateField('studentName', e.target.value)}
                          placeholder="e.g. Priya Sharma"
                          className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-cream-200 font-medium">Age</label>
                        <input
                          type="text"
                          value={formData.studentAge}
                          onChange={(e) => updateField('studentAge', e.target.value)}
                          placeholder="e.g. 22"
                          className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-cream-200 font-medium">Prior Experience</label>
                        <select
                          value={formData.priorExperience}
                          onChange={(e) => updateField('priorExperience', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                        >
                          <option>Beginner (No prior experience)</option>
                          <option>Basic knowledge (Self-taught / Hobbies)</option>
                          <option>Intermediate (Looking for professional bridal speed & figure work)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Product Specific */}
                  {formData.service === 'Mehndi Products' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1.5">
                        <label className="block text-cream-200 font-medium">Product Selection</label>
                        <select
                          value={formData.productType}
                          onChange={(e) => updateField('productType', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                        >
                          <option>Natural Sojat Organic Cones (Pack of 12)</option>
                          <option>Bridal Master Stain Essential Oil (10ml)</option>
                          <option>Triple-Sifted Henna Powder (250g)</option>
                          <option>Complete Artist DIY Kit</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-cream-200 font-medium">Quantity Required</label>
                        <select
                          value={formData.coneQuantity}
                          onChange={(e) => updateField('coneQuantity', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                        >
                          <option>1 Pack</option>
                          <option>2 Packs</option>
                          <option>5 Packs (Bulk Order)</option>
                          <option>10+ Packs (Wholesale/Salon)</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="block text-cream-200 font-medium">Delivery City *</label>
                        <input
                          type="text"
                          required
                          value={formData.deliveryCity}
                          onChange={(e) => updateField('deliveryCity', e.target.value)}
                          placeholder="e.g. Surat, Ahmedabad, Mumbai..."
                          className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Event Location for standard services */}
                  {formData.service !== 'Mehndi Course' && formData.service !== 'Mehndi Products' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-4 border-t border-gold-400/10">
                      <div className="space-y-1.5">
                        <label className="block text-cream-200 font-medium">Event Date *</label>
                        <input
                          type="date"
                          required
                          value={formData.eventDate}
                          onChange={(e) => updateField('eventDate', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-cream-200 font-medium">Preferred Time</label>
                        <select
                          value={formData.preferredTime}
                          onChange={(e) => updateField('preferredTime', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                        >
                          <option>Morning (9 AM - 12 PM)</option>
                          <option>Afternoon (12 PM - 4 PM)</option>
                          <option>Evening (4 PM - 8 PM)</option>
                          <option>Night (8 PM Onwards)</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-cream-200 font-medium">City</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => updateField('city', e.target.value)}
                          placeholder="e.g. Surat"
                          className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-cream-200 font-medium">State</label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={(e) => updateField('state', e.target.value)}
                          placeholder="e.g. Gujarat"
                          className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="block text-cream-200 font-medium">Venue / Address</label>
                        <input
                          type="text"
                          value={formData.eventLocation}
                          onChange={(e) => updateField('eventLocation', e.target.value)}
                          placeholder="e.g. Royal Palace Banquet, Piplod, Surat"
                          className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* Step 4: Special Requirements */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-gold-300 border-b border-gold-400/20 pb-2">
                    Step 4: Special Requirements & Customizations
                  </h3>
                  <div className="space-y-1.5 text-xs">
                    <label className="block text-cream-200 font-medium">Additional Message or Special Requests</label>
                    <textarea
                      rows={4}
                      value={formData.additionalMessage}
                      onChange={(e) => updateField('additionalMessage', e.target.value)}
                      placeholder="Mention any specific design motifs, travel arrangements, or special custom elements..."
                      className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                    />
                  </div>

                  {/* Pricing Notice Box */}
                  <div className="p-4 rounded-2xl bg-black/40 border border-gold-400/20 text-xs text-gold-300/90 space-y-1">
                    <p className="font-semibold text-gold-400">Pricing Note:</p>
                    <p className="text-cream-200">
                      Final pricing will be confirmed by Hasti Henna after reviewing your location, headcount, design complexity, and schedule requirements.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 5: Booking Summary */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-gold-300 border-b border-gold-400/20 pb-2">
                    Step 5: Booking Request Summary
                  </h3>

                  <div className="p-5 rounded-2xl bg-black/40 border border-gold-400/30 space-y-3 text-xs text-cream-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div><span className="text-gold-400 font-bold">Name:</span> {formData.fullName}</div>
                      <div><span className="text-gold-400 font-bold">WhatsApp:</span> {formData.whatsappNumber}</div>
                      <div><span className="text-gold-400 font-bold">Service:</span> {formData.service}</div>

                      {formData.service === 'Bridal Mehndi' && (
                        <>
                          <div><span className="text-gold-400 font-bold">Package:</span> {formData.bridalPackage}</div>
                          <div><span className="text-gold-400 font-bold">Bride:</span> {formData.brideName || formData.fullName}</div>
                          <div><span className="text-gold-400 font-bold">Feet Mehndi:</span> {formData.feetMehndiRequired}</div>
                        </>
                      )}

                      {formData.service === 'Wedding/Event Mehndi' && (
                        <>
                          <div><span className="text-gold-400 font-bold">Event Type:</span> {formData.eventType}</div>
                          <div><span className="text-gold-400 font-bold">Guests:</span> {formData.guestCount}</div>
                        </>
                      )}

                      {formData.service === 'Mehndi Course' && (
                        <>
                          <div><span className="text-gold-400 font-bold">Course:</span> {formData.courseSelected}</div>
                          <div><span className="text-gold-400 font-bold">Student:</span> {formData.studentName}</div>
                        </>
                      )}

                      {formData.service === 'Mehndi Products' && (
                        <>
                          <div><span className="text-gold-400 font-bold">Product:</span> {formData.productType}</div>
                          <div><span className="text-gold-400 font-bold">Quantity:</span> {formData.coneQuantity}</div>
                          <div><span className="text-gold-400 font-bold">City:</span> {formData.deliveryCity}</div>
                        </>
                      )}

                      {formData.service !== 'Mehndi Course' && formData.service !== 'Mehndi Products' && (
                        <>
                          <div><span className="text-gold-400 font-bold">Date:</span> {formData.eventDate}</div>
                          <div><span className="text-gold-400 font-bold">Time:</span> {formData.preferredTime}</div>
                          <div><span className="text-gold-400 font-bold">Location:</span> {formData.city}, {formData.state}</div>
                        </>
                      )}
                    </div>

                    {formData.additionalMessage && (
                      <div className="pt-2 border-t border-gold-400/10">
                        <span className="text-gold-400 font-bold">Special Requests:</span> {formData.additionalMessage}
                      </div>
                    )}
                  </div>

                  <p className="text-[11px] text-cream-300/80 italic text-center">
                    Clicking below will format this request into WhatsApp and connect you directly with Hasti Henna.
                  </p>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-gold-400/20">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-gold-400/30 text-xs text-cream-200 hover:border-gold-400 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Edit Details
                  </button>
                ) : <div />}

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-gold-400 text-mehndi-950 font-bold uppercase tracking-wider text-xs shadow-md hover:bg-gold-300 transition-colors"
                  >
                    Next Step
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-wider text-xs shadow-xl hover:scale-105 transition-all disabled:opacity-50 border border-gold-400/40"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {loading ? 'Formatting Request...' : 'Send Booking Request on WhatsApp →'}
                  </button>
                )}
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
