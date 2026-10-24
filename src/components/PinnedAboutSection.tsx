import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BUSINESS_INFO } from '../types.ts';
import { ImageWithFallback } from './ImageWithFallback.tsx';

gsap.registerPlugin(ScrollTrigger);

export const PinnedAboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (cardRef.current && containerRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 80, opacity: 0.2 },
          {
            y: -40,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top center',
              end: 'bottom center',
              scrub: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full min-h-[140vh] sm:min-h-[160vh] bg-[#141518] text-[#FAF9F5]"
    >
      {/* Pinned / Sticky Background Image with Dark Gradient Overlay */}
      <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2400&q=85"
          alt="Serene architectural interior with filtered natural light"
          loading="lazy"
          overlay={true}
          overlayClass="bg-gradient-to-t from-[#141518] via-[#141518]/75 to-[#141518]/60"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Scrolling Text Content Layer */}
      <div className="relative z-10 -mt-[85svh] pb-32 sm:pb-48 px-6 lg:px-12 flex items-center justify-center pointer-events-none">
        <div
          ref={cardRef}
          className="pointer-events-auto max-w-2xl bg-[#141518]/85 backdrop-blur-md border border-white/10 p-8 sm:p-12 lg:p-16 shadow-2xl"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#2DD4BF] font-semibold mb-4 block">
            Our Foundation
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#FAF9F5] leading-tight mb-6">
            Building lasting relationships in <span className="text-[#2DD4BF] italic font-normal">Chennai</span>
          </h2>

          <p className="text-base sm:text-lg text-[#C8CBD3] font-normal leading-relaxed mb-8">
            At SPR Realty, our foundation rests on long-term relationships.
            In Chennai&apos;s fast-evolving property landscape, we bring steady
            clarity, patient counsel, and genuine care to every partnership—helping
            you make choices you can depend on today and in the future.
          </p>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono uppercase tracking-widest text-[#9EA3AF]">
            <span>{BUSINESS_INFO.location}</span>
            <span className="text-[#2DD4BF]">{BUSINESS_INFO.phone}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
