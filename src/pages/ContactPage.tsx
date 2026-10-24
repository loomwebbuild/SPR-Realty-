import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Send } from 'lucide-react';
import { BUSINESS_INFO } from '../types.ts';
import { ImageWithFallback } from '../components/ImageWithFallback.tsx';
import { FinalCtaSection } from '../components/FinalCtaSection.tsx';

export const ContactPage: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState('General Property Guidance');
  const [customNote, setCustomNote] = useState('');

  const topics = [
    'General Property Guidance',
    'Residential Property in Chennai',
    'Long-Term Investment Advisory',
  ];

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const message = customNote.trim()
      ? `Hello SPR Realty, I am reaching out regarding ${selectedTopic}. Note: ${customNote}`
      : `Hello SPR Realty, I am reaching out regarding ${selectedTopic} in Chennai.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919790701449?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full bg-[#FAF9F5] text-[#141518]">
      {/* 1. Page Header Hero */}
      <section className="relative w-full h-[60vh] min-h-[420px] flex items-center justify-center overflow-hidden bg-[#141518] text-[#FAF9F5]">
        <div className="absolute inset-0 w-full h-full">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=80"
            alt="Warm architectural interior with serene natural sunlight"
            loading="eager"
            overlay={true}
            overlayClass="bg-gradient-to-t from-[#141518] via-[#141518]/70 to-black/40"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-16">
          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#D0D4DC] font-sans font-medium mb-4">
              Get in Touch · SPR Realty
            </p>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light leading-[1.1] text-[#FAF9F5] mb-4">
              Connect with <span className="text-[#2DD4BF] italic font-normal">SPR Realty</span>.
            </h1>

            <p className="text-sm sm:text-base text-[#D0D4DC] font-light max-w-xl">
              We look forward to assisting you with thoughtful counsel and honest
              guidance across Chennai.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Contact Details & Direct WhatsApp Message Creator */}
      <section className="py-20 sm:py-28 lg:py-36 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#105652] font-semibold mb-3 block">
                Direct Channels
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#141518] mb-6">
                Start a direct conversation
              </h2>
              <p className="text-sm sm:text-base text-[#565963] leading-relaxed">
                Connect directly with our team in Chennai. Whether you prefer a
                direct phone call or a quick WhatsApp message, we are here to
                listen and guide.
              </p>
            </div>

            {/* Direct Cards */}
            <div className="space-y-4">
              {/* Phone Card */}
              <a
                href={BUSINESS_INFO.phoneTel}
                className="group p-6 bg-[#F5F4EE] hover:bg-[#EAE8E0] border border-[#E0DCD2] transition-all flex items-start gap-4 block"
              >
                <div className="w-10 h-10 rounded-full bg-[#105652] text-white flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#737682] block mb-1">
                    Call Directly
                  </span>
                  <span className="font-mono text-lg text-[#141518] group-hover:text-[#105652] transition-colors font-medium">
                    {BUSINESS_INFO.phone}
                  </span>
                </div>
              </a>

              {/* WhatsApp Card */}
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 bg-[#F5F4EE] hover:bg-[#EAE8E0] border border-[#E0DCD2] transition-all flex items-start gap-4 block"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#737682] block mb-1">
                    WhatsApp Message
                  </span>
                  <span className="font-mono text-lg text-[#141518] group-hover:text-[#105652] transition-colors font-medium">
                    {BUSINESS_INFO.phone}
                  </span>
                </div>
              </a>

              {/* Location Card */}
              <div className="p-6 bg-[#F5F4EE] border border-[#E0DCD2] flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#141518] text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#737682] block mb-1">
                    Location
                  </span>
                  <p className="text-sm font-medium text-[#141518]">
                    {BUSINESS_INFO.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct WhatsApp Consultation Form */}
          <div className="lg:col-span-7 bg-[#F5F4EE] border border-[#E0DCD2] p-8 sm:p-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#105652] font-semibold mb-3 block">
              Quick Inquiry
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#141518] mb-4">
              Send a message via WhatsApp
            </h3>
            <p className="text-sm text-[#565963] mb-8 leading-relaxed">
              Select your area of interest and open a pre-filled direct WhatsApp
              chat with SPR Realty.
            </p>

            <form onSubmit={handleWhatsAppSend} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-mono text-[#737682] mb-3">
                  Consultation Topic
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {topics.map((topic) => (
                    <button
                      type="button"
                      key={topic}
                      onClick={() => setSelectedTopic(topic)}
                      className={`px-4 py-3 text-xs tracking-wider uppercase font-medium text-left transition-all border ${
                        selectedTopic === topic
                          ? 'bg-[#105652] text-white border-[#105652]'
                          : 'bg-[#FAF9F5] text-[#40434C] border-[#D5D2C7] hover:border-[#105652]'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="custom-note"
                  className="block text-xs uppercase tracking-wider font-mono text-[#737682] mb-2"
                >
                  Optional Note
                </label>
                <textarea
                  id="custom-note"
                  rows={4}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Tell us what you are looking for..."
                  className="w-full bg-[#FAF9F5] border border-[#D5D2C7] px-4 py-3 text-sm text-[#141518] placeholder-[#9EA3AF] focus:outline-none focus:border-[#105652] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-medium tracking-wider uppercase text-white bg-[#105652] hover:bg-[#0A3D3A] transition-colors border border-[#105652] shadow-sm cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Open in WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 3. Final CTA & Footer */}
      <FinalCtaSection />
    </div>
  );
};
