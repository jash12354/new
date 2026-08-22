'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Calendar, Check, ChevronRight, ChevronLeft, MessageCircle, AlertCircle } from 'lucide-react';
import { BRAND_INFO } from '@/data/brandData';

export default function BookingSystem() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');

  const [formData, setFormData] = useState({
    fullName: '',
    whatsappNumber: '',
    email: '',
    service: 'Bridal Mehndi',
    eventDate: '',
    preferredTime: 'Morning (9 AM - 12 PM)',
    eventLocation: '',
    city: 'Surat',
    state: 'Gujarat',
    numberOfPeople: 1,
    designPreference: 'Traditional Indian',
    bridalPackagePreference: 'Full Hand & Arm + Feet',
    artistsRequired: '1 Main Artist',
    travelRequirement: 'No travel needed (Surat)',
    additionalMessage: '',
  });

  const updateField = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    setErrorMsg('');
    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      if (!formData.whatsappNumber.trim()) {
        setErrorMsg('Please enter a valid WhatsApp number.');
        return;
      }
    }
    if (currentStep === 3) {
      if (!formData.eventDate) {
        setErrorMsg('Please select your event date.');
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePrevStep = () => {
    setErrorMsg('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit booking request');
      }

      const text = `*New Booking Request - Hasti Henna*
👤 *Name:* ${formData.fullName}
📱 *WhatsApp:* ${formData.whatsappNumber}
📧 *Email:* ${formData.email || 'N/A'}
🎨 *Service:* ${formData.service}
📅 *Event Date:* ${formData.eventDate}
⏰ *Time:* ${formData.preferredTime}
📍 *Location:* ${formData.eventLocation || 'N/A'}, ${formData.city}, ${formData.state}
👥 *People:* ${formData.numberOfPeople}
🖌️ *Design:* ${formData.designPreference}
👑 *Bridal Package:* ${formData.bridalPackagePreference}
👨‍🎨 *Artists:* ${formData.artistsRequired}
🚗 *Travel:* ${formData.travelRequirement}
💬 *Notes:* ${formData.additionalMessage || 'None'}`;

      const waLink = `https://wa.me/${BRAND_INFO.whatsappRaw}?text=${encodeURIComponent(text)}`;
      setWhatsappUrl(waLink);

      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-20 bg-henna-dark text-cream-50 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs uppercase tracking-widest font-semibold">
            <Calendar className="w-3.5 h-3.5 text-gold-400" />
            <span>Online Booking Request</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold">
            Reserve Your <span className="text-gold-gradient italic">Henna Experience</span>
          </h2>
          <p className="text-xs sm:text-sm text-cream-200/80 max-w-xl mx-auto font-light leading-relaxed">
            Submit your event details below. Hasti Henna will review availability and message you directly on WhatsApp with confirmed details and final custom quotes.
          </p>
        </div>

        <div className="bg-mehndi-950/90 border border-gold-400/30 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">

          {submitted ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-3xl font-bold text-gold-300">Booking Request Received!</h3>
                <p className="text-sm text-cream-200 max-w-lg mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-gold-300">{formData.fullName}</span>! Your booking request for <span className="font-bold text-gold-300">{formData.service}</span> on <span className="font-bold text-gold-300">{formData.eventDate}</span> has been received.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-gold-400/20 text-xs text-cream-300 max-w-md mx-auto space-y-1">
                <p className="font-semibold text-gold-400">Important Note:</p>
                <p>This request is pending final WhatsApp confirmation by Hasti Henna. Click below to chat directly with your details pre-filled.</p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-wider text-xs shadow-xl transition-all border border-gold-400/40"
                >
                  <MessageCircle className="w-4 h-4" />
                  Confirm Instantly On WhatsApp
                </a>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setCurrentStep(1);
                  }}
                  className="text-xs text-gold-300 underline hover:text-gold-200"
                >
                  Submit Another Booking
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
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

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-gold-300 border-b border-gold-400/20 pb-2">
                    Step 1: Your Contact Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="block text-cream-200 font-medium">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        placeholder="e.g. Ananya Patel"
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
                        placeholder="e.g. 9876543210"
                        className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="block text-cream-200 font-medium">Email Address (Optional)</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="e.g. ananya@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-gold-300 border-b border-gold-400/20 pb-2">
                    Step 2: Select Required Service
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {[
                      { id: 'Bridal Mehndi', desc: 'Starting from ₹10,000' },
                      { id: 'Wedding/Event Mehndi', desc: 'Starting from ₹600/person' },
                      { id: 'Home Service', desc: 'Doorstep service applicable packages' },
                      { id: 'Customized Mehndi', desc: 'Personalized motifs & Arabic fusion' },
                      { id: 'Academy Course', desc: 'Basic ₹6,000 / Advanced ₹14,000' },
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

              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-gold-300 border-b border-gold-400/20 pb-2">
                    Step 3: Event Date & Location
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
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
                      <label className="block text-cream-200 font-medium">Preferred Time Slot</label>
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
                      <label className="block text-cream-200 font-medium">Event Venue / Address</label>
                      <input
                        type="text"
                        value={formData.eventLocation}
                        onChange={(e) => updateField('eventLocation', e.target.value)}
                        placeholder="e.g. Royal Palace Banquet, Piplod, Surat"
                        className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="block text-cream-200 font-medium">Estimated Number of People Getting Henna</label>
                      <input
                        type="number"
                        min="1"
                        max="500"
                        value={formData.numberOfPeople}
                        onChange={(e) => updateField('numberOfPeople', Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-gold-300 border-b border-gold-400/20 pb-2">
                    Step 4: Design & Event Requirements
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="block text-cream-200 font-medium">Design Style Preference</label>
                      <select
                        value={formData.designPreference}
                        onChange={(e) => updateField('designPreference', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                      >
                        <option>Traditional Indian Intricate</option>
                        <option>Arabic Floral & Flowing</option>
                        <option>Minimalist Contemporary</option>
                        <option>Custom Story Motifs & Couple Portraits</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-cream-200 font-medium">Bridal Coverage Preference</label>
                      <select
                        value={formData.bridalPackagePreference}
                        onChange={(e) => updateField('bridalPackagePreference', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                      >
                        <option>Full Hand & Arm + Heavy Feet</option>
                        <option>Elbow Length Hands + Feet</option>
                        <option>Wrist Length Minimalist</option>
                        <option>Not Applicable (Non-Bridal)</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-cream-200 font-medium">Artists Required</label>
                      <select
                        value={formData.artistsRequired}
                        onChange={(e) => updateField('artistsRequired', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                      >
                        <option>1 Main Lead Artist</option>
                        <option>Team of 2-3 Artists</option>
                        <option>Large Team (4+ Artists for 50+ Guests)</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-cream-200 font-medium">Travel Requirement</label>
                      <select
                        value={formData.travelRequirement}
                        onChange={(e) => updateField('travelRequirement', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                      >
                        <option>No travel needed (Local Surat)</option>
                        <option>Gujarat Travel Required</option>
                        <option>Outstation / Pan-India Travel Required</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="block text-cream-200 font-medium">Additional Message / Special Requests</label>
                      <textarea
                        rows={3}
                        value={formData.additionalMessage}
                        onChange={(e) => updateField('additionalMessage', e.target.value)}
                        placeholder="Mention any custom story elements, initials, or special requests..."
                        className="w-full px-4 py-3 rounded-xl bg-mehndi-900/80 border border-gold-400/30 text-cream-50 focus:border-gold-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-gold-300 border-b border-gold-400/20 pb-2">
                    Step 5: Review & Submit Booking Request
                  </h3>
                  <div className="p-4 rounded-2xl bg-black/40 border border-gold-400/20 space-y-3 text-xs text-cream-200">
                    <div className="grid grid-cols-2 gap-2">
                      <div><span className="text-gold-400 font-semibold">Name:</span> {formData.fullName}</div>
                      <div><span className="text-gold-400 font-semibold">WhatsApp:</span> {formData.whatsappNumber}</div>
                      <div><span className="text-gold-400 font-semibold">Service:</span> {formData.service}</div>
                      <div><span className="text-gold-400 font-semibold">Date:</span> {formData.eventDate} ({formData.preferredTime})</div>
                      <div><span className="text-gold-400 font-semibold">Location:</span> {formData.city}, {formData.state}</div>
                      <div><span className="text-gold-400 font-semibold">People:</span> {formData.numberOfPeople}</div>
                      <div><span className="text-gold-400 font-semibold">Design:</span> {formData.designPreference}</div>
                      <div><span className="text-gold-400 font-semibold">Travel:</span> {formData.travelRequirement}</div>
                    </div>
                    {formData.additionalMessage && (
                      <div className="pt-2 border-t border-gold-400/10">
                        <span className="text-gold-400 font-semibold">Notes:</span> {formData.additionalMessage}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gold-400/20">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-gold-400/30 text-xs text-cream-200 hover:border-gold-400 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
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
                    className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 text-mehndi-950 font-bold uppercase tracking-wider text-xs shadow-xl hover:scale-105 transition-all disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Submit Booking Request'}
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
