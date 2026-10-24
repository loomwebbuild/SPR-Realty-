import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      if (containerRef.current) {
        containerRef.current.style.display = 'none';
      }
      onComplete();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
        onComplete();
      },
    });

    // Logo and dots fade in
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
      .to(
        dotsRef.current?.children || [],
        {
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.4,
          ease: 'power2.out',
        },
        '-=0.3'
      )
      .to(
        dotsRef.current?.children || [],
        {
          y: -4,
          repeat: 1,
          yoyo: true,
          stagger: 0.1,
          duration: 0.3,
          ease: 'power1.inOut',
        },
        '+=0.1'
      )
      .to([logoRef.current, dotsRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power2.in',
        delay: 0.2,
      })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut',
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#141518] text-[#FAF9F5]"
      aria-label="Loading SPR Realty"
    >
      <div
        ref={logoRef}
        style={{ opacity: 0, transform: 'translateY(16px)' }}
        className="flex flex-col items-center gap-3 text-center"
      >
        <span className="font-serif text-3xl sm:text-4xl tracking-widest uppercase font-light text-[#FAF9F5]">
          SPR Realty
        </span>
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C909A] font-sans">
          Chennai
        </span>
      </div>

      <div
        ref={dotsRef}
        className="flex items-center gap-2 mt-8"
        aria-hidden="true"
      >
        <span
          style={{ opacity: 0, transform: 'scale(0.6)' }}
          className="w-1.5 h-1.5 rounded-full bg-[#105652]"
        />
        <span
          style={{ opacity: 0, transform: 'scale(0.6)' }}
          className="w-1.5 h-1.5 rounded-full bg-[#FAF9F5]"
        />
        <span
          style={{ opacity: 0, transform: 'scale(0.6)' }}
          className="w-1.5 h-1.5 rounded-full bg-[#105652]"
        />
      </div>
    </div>
  );
};
