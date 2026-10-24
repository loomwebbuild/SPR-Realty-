import React, { useEffect, useRef } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BUSINESS_INFO } from '../types.ts';
import { ImageWithFallback } from '../components/ImageWithFallback.tsx';
import { FinalCtaSection } from '../components/FinalCtaSection.tsx';

gsap.registerPlugin(ScrollTrigger);

interface PillarDetail {
  number: string;
  title: string;
  summary: string;
  details: string[];
  image: string;
  imageAlt: string;
}

const PILLARS: PillarDetail[] = [
  {
    number: '01',
    title: 'Trust',
    summary:
      'Every conversation is grounded in transparent communication and honest property guidance.',
    details: [
      'We prioritize clarity over sales pitches, ensuring you understand every factor affecting your property choices.',
      'Honest perspectives tailored to your needs, whether you are selecting a family residence or building an investment portfolio.',
      'Unwavering integrity in every interaction, building partnerships that last far beyond any single conversation.',
    ],
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Modern minimalist architectural interior with clean daylight',
  },
  {
    number: '02',
    title: 'Future',
    summary:
      'Helping you secure lasting value with thoughtful real estate decisions.',
    details: [
      'Property decisions define generational stability; we evaluate choices with a disciplined long-term outlook.',
      'Focusing on structural quality, location potential, and enduring livability rather than fleeting short-term hype.',
      'Empowering families and investors to step forward with certainty and lasting security.',
    ],
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Contemporary sustainable architecture surrounded by greenery',
  },
  {
    number: '03',
    title: 'Chennai',
    summary:
      "Dedicated to Chennai's dynamic urban landscape and thriving neighbourhoods.",
    details: [
      'Deep appreciation for the cultural roots, connectivity, and evolving infrastructure across Chennai.',
      'From Ekkattuthangal to surrounding growth corridors, we keep our fingers on the pulse of the city.',
      'Helping you find the right place in the city you love, suited to your personal rhythm and vision.',
    ],
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'Chennai residential coastal architecture and serene skyline',
  },
];

export const ApproachPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.children,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out' }
        );
      }

      if (rowsRef.current) {
        const pillarBlocks = rowsRef.current.children;
        Array.from(pillarBlocks).forEach((block) => {
          gsap.fromTo(
            block,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: block,
                start: 'top 80%',
              },
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-[#FAF9F5] text-[#141518]">
      {/* 1. Hero */}
      <section className="relative w-full h-[70vh] min-h-[460px] flex items-center justify-center overflow-hidden bg-[#141518] text-[#FAF9F5]">
        <div className="absolute inset-0 w-full h-full">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2400&q=80"
            alt="Modern residential building facade with geometric balconies"
            loading="eager"
            overlay={true}
            overlayClass="bg-gradient-to-t from-[#141518] via-[#141518]/70 to-black/40"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-16">
          <div ref={heroRef} className="max-w-3xl">
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#D0D4DC] font-sans font-medium mb-4">
              Our Methodology · SPR Realty
            </p>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light leading-[1.1] text-[#FAF9F5] mb-6">
              Thoughtful guidance. Lasting{' '}
              <span className="text-[#2DD4BF] italic font-normal">future</span>.
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

      {/* 2. Three Pillars Detailed Breakdown */}
      <section className="py-20 sm:py-28 lg:py-36 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16 lg:mb-24">
          <span className="text-xs uppercase tracking-[0.25em] text-[#105652] font-semibold mb-3 block">
            The Three Pillars
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#141518] leading-tight">
            How we approach real estate in <span className="text-[#105652] italic font-normal">Chennai</span>
          </h2>
        </div>

        <div ref={rowsRef} className="space-y-24 sm:space-y-32">
          {PILLARS.map((pillar, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={pillar.number}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual Image Column */}
                <div
                  className={`lg:col-span-6 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#E2DFD6] shadow-lg border border-[#E0DCD2]">
                    <ImageWithFallback
                      src={pillar.image}
                      alt={pillar.imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content Column */}
                <div
                  className={`lg:col-span-6 flex flex-col justify-center ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <span className="font-mono text-sm sm:text-base text-[#105652] tabular-nums tracking-widest block mb-2">
                    {pillar.number}
                  </span>

                  <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#141518] mb-4">
                    {pillar.title}
                  </h3>

                  <p className="text-base sm:text-lg text-[#141518] font-normal leading-relaxed mb-6 font-serif italic text-balance">
                    &ldquo;{pillar.summary}&rdquo;
                  </p>

                  <ul className="space-y-3 pt-4 border-t border-[#E4E2DC]">
                    {pillar.details.map((detail, dIdx) => (
                      <li
                        key={dIdx}
                        className="text-sm sm:text-base text-[#565963] leading-relaxed flex items-start gap-3"
                      >
                        <span className="text-[#105652] mt-1 shrink-0">·</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Final CTA & Footer */}
      <FinalCtaSection />
    </div>
  );
};
