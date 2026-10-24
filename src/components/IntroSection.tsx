import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ImageWithFallback } from './ImageWithFallback.tsx';

gsap.registerPlugin(ScrollTrigger);

export const IntroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const imageContainer1Ref = useRef<HTMLDivElement>(null);
  const imageContainer2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Reveal animation on text elements
      if (textContentRef.current) {
        gsap.fromTo(
          textContentRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textContentRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Parallax on image 1 (max 15% travel)
      if (imageContainer1Ref.current) {
        gsap.to(imageContainer1Ref.current, {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Parallax on image 2 at different speed (max 15% travel)
      if (imageContainer2Ref.current) {
        gsap.to(imageContainer2Ref.current, {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-24 lg:py-32 bg-[#FAF9F5] text-[#141518] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text Content */}
          <div
            ref={textContentRef}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[#105652] font-semibold mb-4">
              Our Commitment
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light leading-[1.12] text-[#141518] mb-6 text-balance">
              Real estate built on <span className="text-[#105652] italic font-normal">trust</span>
            </h2>

            <p className="text-base sm:text-lg text-[#40434C] font-normal leading-relaxed mb-6 max-w-xl">
              We help Chennai families and investors navigate property decisions
              with clarity, diligence, and genuine guidance. In a growing city
              full of possibilities, we provide honest counsel so every step you
              take is made with lasting confidence.
            </p>

            <div className="pt-6 border-t border-[#E4E2DC] flex items-center gap-3 text-xs tracking-wider text-[#737682] uppercase">
              <span>Ekkattuthangal</span>
              <span aria-hidden="true">·</span>
              <span>Chennai 600032</span>
            </div>
          </div>

          {/* Right Column: Two Asymmetric Parallax Images */}
          <div className="lg:col-span-6 relative flex flex-col sm:flex-row gap-6 sm:gap-8 items-center lg:items-start pt-4 lg:pt-0">
            {/* Image 1: Tall modern architectural facade */}
            <div
              ref={imageContainer1Ref}
              className="w-full sm:w-3/5 will-change-transform shadow-lg"
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-[#E4E2DC]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern architectural residential facade in Chennai sunlight"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Image 2: Contemporary light-filled interior space, offset */}
            <div
              ref={imageContainer2Ref}
              className="w-full sm:w-2/5 sm:mt-16 will-change-transform shadow-md"
            >
              <div className="aspect-[4/5] w-full overflow-hidden bg-[#E4E2DC]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
                  alt="Bright and serene architectural living space"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
