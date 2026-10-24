import React, { useEffect, useRef } from 'react';
import { Phone, MessageCircle, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { BUSINESS_INFO } from '../types.ts';
import { ImageWithFallback } from './ImageWithFallback.tsx';

interface HeroProps {
  preloaderFinished: boolean;
}

export const Hero: React.FC<HeroProps> = ({ preloaderFinished }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!preloaderFinished) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      if (bgImageRef.current) gsap.set(bgImageRef.current, { scale: 1 });
      if (headlineLine1Ref.current) gsap.set(headlineLine1Ref.current, { y: 0, opacity: 1 });
      if (headlineLine2Ref.current) gsap.set(headlineLine2Ref.current, { y: 0, opacity: 1 });
      if (sublineRef.current) gsap.set(sublineRef.current, { y: 0, opacity: 1 });
      if (ctaRef.current) gsap.set(ctaRef.current, { y: 0, opacity: 1 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Slow scale down of background image
    if (bgImageRef.current) {
      gsap.fromTo(
        bgImageRef.current,
        { scale: 1.14 },
        { scale: 1, duration: 2.2, ease: 'power2.out' }
      );
    }

    // Staggered reveal of hero text
    tl.fromTo(
      [headlineLine1Ref.current, headlineLine2Ref.current],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.14, ease: 'power3.out' }
    )
      .fromTo(
        sublineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.4'
      )
      .fromTo(
        ctaRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.4'
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.2'
      );

    // Bobbing scroll indicator
    const bobTween = gsap.to(scrollIndicatorRef.current, {
      y: 8,
      duration: 1.4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 1,
    });

    return () => {
      tl.kill();
      bobTween.kill();
    };
  }, [preloaderFinished]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[580px] flex flex-col justify-between overflow-hidden bg-[#141518] text-[#FAF9F5]"
    >
      {/* Background full-bleed photography with dark architectural grading overlay */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85"
          alt="Modern luxury architectural residential facade in warm sunlight"
          loading="eager"
          overlay={true}
          overlayClass="bg-gradient-to-t from-[#141518] via-[#141518]/60 to-black/35"
          className="w-full h-full"
        />
      </div>

      {/* Empty top spacer to balance layout with navbar */}
      <div className="pt-20 sm:pt-24 shrink-0" aria-hidden="true" />

      {/* Center content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full my-auto py-4">
        <div className="max-w-3xl">
          {/* Subline */}
          <p
            ref={sublineRef}
            style={{ opacity: 0 }}
            className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#D0D4DC] font-sans font-medium mb-3 sm:mb-4"
          >
            Real estate in Chennai
          </p>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.08] tracking-tight text-[#FAF9F5] mb-5 sm:mb-6">
            <span
              ref={headlineLine1Ref}
              style={{ opacity: 0 }}
              className="block"
            >
              Building <em className="italic text-[#2DD4BF] font-normal not-italic-font">trust</em>,
            </span>
            <span
              ref={headlineLine2Ref}
              style={{ opacity: 0 }}
              className="block"
            >
              creating future.
            </span>
          </h1>

          {/* CTA Buttons: visible without scrolling on mobile */}
          <div
            ref={ctaRef}
            style={{ opacity: 0 }}
            className="flex flex-row flex-wrap items-center gap-3 sm:gap-4 mt-2 sm:mt-4"
          >
            <a
              href={BUSINESS_INFO.phoneTel}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 text-xs sm:text-sm font-medium tracking-wider uppercase text-white bg-[#105652] hover:bg-[#0A3D3A] transition-all duration-200 border border-[#105652] shadow-lg hover:shadow-[#105652]/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2DD4BF]"
            >
              <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Call now</span>
            </a>

            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 text-xs sm:text-sm font-medium tracking-wider uppercase text-[#FAF9F5] bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2DD4BF]"
            >
              <MessageCircle className="w-4 h-4 shrink-0 text-[#25D366]" aria-hidden="true" />
              <span>WhatsApp us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar with bobbing scroll indicator */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-6 sm:pb-8 flex items-center justify-between text-xs tracking-wider text-[#A0A4AE] shrink-0">
        <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-widest text-[#8C909A]">
          Chennai · 600032
        </span>

        <a
          ref={scrollIndicatorRef}
          href="#intro"
          style={{ opacity: 0 }}
          aria-label="Scroll down to overview"
          className="mx-auto sm:mr-0 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D2D3D8] hover:text-white transition-colors cursor-pointer py-2 px-3"
        >
          <span>Scroll</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#2DD4BF]" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};
