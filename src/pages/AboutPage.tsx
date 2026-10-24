import React, { useEffect, useRef } from 'react';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BUSINESS_INFO } from '../types.ts';
import { ImageWithFallback } from '../components/ImageWithFallback.tsx';
import { FinalCtaSection } from '../components/FinalCtaSection.tsx';

gsap.registerPlugin(ScrollTrigger);

export const AboutPage: React.FC = () => {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (heroTextRef.current) {
        gsap.fromTo(
          heroTextRef.current.children,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out' }
        );
      }

      if (principlesRef.current) {
        gsap.fromTo(
          principlesRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.14,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: principlesRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-[#FAF9F5] text-[#141518]">
      {/* 1. Page Header Hero */}
      <section className="relative w-full h-[70vh] min-h-[460px] flex items-center justify-center overflow-hidden bg-[#141518] text-[#FAF9F5]">
        <div className="absolute inset-0 w-full h-full">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2400&q=85"
            alt="Minimalist architectural space with warm ambient light"
            loading="eager"
            overlay={true}
            overlayClass="bg-gradient-to-t from-[#141518] via-[#141518]/70 to-black/40"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-16">
          <div ref={heroTextRef} className="max-w-3xl">
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#D0D4DC] font-sans font-medium mb-4">
              About SPR Realty · Chennai
            </p>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light leading-[1.1] text-[#FAF9F5] mb-6">
              Building lasting relationships in{' '}
              <span className="text-[#2DD4BF] italic font-normal">Chennai</span>.
            </h1>

            <div className="flex flex-row flex-wrap items-center gap-4 mt-6">
              <a
                href={BUSINESS_INFO.phoneTel}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-medium tracking-wider uppercase text-white bg-[#105652] hover:bg-[#0A3D3A] transition-colors border border-[#105652] shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2DD4BF]"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>Call now</span>
              </a>

              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-medium tracking-wider uppercase text-[#FAF9F5] bg-white/10 hover:bg-white/15 border border-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2DD4BF]"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
                <span>WhatsApp us</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Editorial Foundation Section */}
      <section className="py-20 sm:py-28 lg:py-36 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.25em] text-[#105652] font-semibold mb-3 block">
              Our Ethos
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#141518] leading-tight">
              Real estate guided by <span className="text-[#105652] italic font-normal">conviction</span>
            </h2>

            <div className="mt-8 pt-8 border-t border-[#E4E2DC]">
              <span className="font-mono text-xs uppercase tracking-widest text-[#737682] block mb-1">
                Headquarters
              </span>
              <p className="text-sm text-[#141518] font-medium">
                {BUSINESS_INFO.location}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6 text-base sm:text-lg text-[#40434C] font-normal leading-relaxed">
            <p>
              At SPR Realty, we believe real estate is fundamentally about people,
              family security, and lasting value. Chennai is a vibrant metropolis
              with distinct neighbourhoods, historic enclaves, and fast-growing
              corridors.
            </p>
            <p>
              Navigating these choices requires honest advisory rather than
              transactional haste. We assist Chennai families and investors in
              identifying the right property through clear information, patient
              counsel, and deep attention to detail.
            </p>
            <p>
              Every consultation is treated as the start of an enduring
              partnership, ensuring your decisions are grounded in trust today and
              confidence for years to come.
            </p>

            <div className="pt-6">
              <Link
                to="/approach"
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#105652] hover:text-[#0C4340] transition-colors"
              >
                <span>Read about our approach</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Principles */}
      <section className="py-20 sm:py-28 bg-[#F5F4EE] border-t border-[#E4E2DC] px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#105652] font-semibold mb-3 block">
              Guiding Principles
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#141518]">
              The commitments that shape every dialogue
            </h3>
          </div>

          <div
            ref={principlesRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          >
            {/* Principle 1 */}
            <div className="bg-[#FAF9F5] p-8 sm:p-10 border border-[#E0DCD2] flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#105652] block mb-4">
                  01 · Integrity
                </span>
                <h4 className="font-serif text-2xl font-light text-[#141518] mb-4">
                  Honest Guidance
                </h4>
                <p className="text-sm sm:text-base text-[#565963] leading-relaxed">
                  We offer transparent clarity on property choices, presenting
                  factual insights so you can make informed decisions with peace
                  of mind.
                </p>
              </div>
            </div>

            {/* Principle 2 */}
            <div className="bg-[#FAF9F5] p-8 sm:p-10 border border-[#E0DCD2] flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#105652] block mb-4">
                  02 · Patience
                </span>
                <h4 className="font-serif text-2xl font-light text-[#141518] mb-4">
                  Patient Counsel
                </h4>
                <p className="text-sm sm:text-base text-[#565963] leading-relaxed">
                  Real estate choices take careful thought. We provide unhurried,
                  supportive advice focused on long-term compatibility and enduring
                  value.
                </p>
              </div>
            </div>

            {/* Principle 3 */}
            <div className="bg-[#FAF9F5] p-8 sm:p-10 border border-[#E0DCD2] flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#105652] block mb-4">
                  03 · Focus
                </span>
                <h4 className="font-serif text-2xl font-light text-[#141518] mb-4">
                  Chennai Grounding
                </h4>
                <p className="text-sm sm:text-base text-[#565963] leading-relaxed">
                  Dedicated specifically to Chennai&apos;s dynamic real estate
                  landscape, helping clients find locations that match their lifestyle
                  and plans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Full-Bleed Architectural Visual Anchor */}
      <section className="relative w-full h-[50vh] min-h-[340px] overflow-hidden bg-[#141518]">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85"
          alt="Modern architectural residence reflecting clarity and permanence"
          loading="lazy"
          overlay={true}
          overlayClass="bg-gradient-to-r from-black/80 via-black/40 to-transparent"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="max-w-xl text-white">
            <span className="font-mono text-xs uppercase tracking-widest text-[#2DD4BF] block mb-2">
              Our Tagline
            </span>
            <p className="font-serif text-2xl sm:text-4xl font-light italic">
              &ldquo;{BUSINESS_INFO.tagline}&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* 5. Final CTA & Footer */}
      <FinalCtaSection />
    </div>
  );
};
