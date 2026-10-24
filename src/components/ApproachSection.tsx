import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ImageWithFallback } from './ImageWithFallback.tsx';

gsap.registerPlugin(ScrollTrigger);

interface ApproachItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

const APPROACH_ITEMS: ApproachItem[] = [
  {
    id: 'trust',
    number: '01',
    title: 'Trust',
    description:
      'Every conversation is grounded in transparent communication and honest property guidance.',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Modern residential interior with clean architectural lines',
  },
  {
    id: 'future',
    number: '02',
    title: 'Future',
    description:
      'Helping you secure lasting value with thoughtful real estate decisions.',
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Contemporary villa architecture with sustainable landscape',
  },
  {
    id: 'chennai',
    number: '03',
    title: 'Chennai',
    description:
      "Dedicated to Chennai's dynamic urban landscape and thriving neighbourhoods.",
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Chennai residential coastal architecture and serene skyline',
  },
];

export const ApproachSection: React.FC = () => {
  const [activeHoverIndex, setActiveHoverIndex] = useState<number>(0);
  const [expandedMobileIndex, setExpandedMobileIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const rowsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      if (rowsContainerRef.current) {
        gsap.fromTo(
          rowsContainerRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rowsContainerRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleMobileExpand = (index: number) => {
    setExpandedMobileIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-24 lg:py-32 bg-[#F5F4EE] text-[#141518] border-t border-[#E8E6DF]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div ref={headingRef} className="mb-12 lg:mb-16 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.25em] text-[#105652] font-semibold mb-3 block">
            Our Approach
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#141518] leading-tight">
            How we shape <span className="italic text-[#105652] font-normal">value</span>
          </h2>
        </div>

        {/* Desktop Layout: Split Grid with Interactive Rows on Left, Synchronized Image Preview on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Numbered Rows */}
          <div ref={rowsContainerRef} className="lg:col-span-7 flex flex-col divide-y divide-[#DDD9D0]">
            {APPROACH_ITEMS.map((item, index) => {
              const isHovered = activeHoverIndex === index;
              const isMobileExpanded = expandedMobileIndex === index;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveHoverIndex(index)}
                  className="group py-8 sm:py-10 transition-colors cursor-pointer"
                  onClick={() => toggleMobileExpand(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleMobileExpand(index);
                      setActiveHoverIndex(index);
                    }
                  }}
                  aria-expanded={isMobileExpanded}
                  aria-label={`Approach 0${index + 1}: ${item.title}`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-6 sm:gap-10">
                      {/* Number */}
                      <span className="font-mono text-sm sm:text-base font-normal text-[#105652] tabular-nums tracking-wider shrink-0">
                        {item.number}
                      </span>

                      {/* Title */}
                      <h3
                        className={`font-serif text-2xl sm:text-4xl font-light transition-colors duration-300 ${
                          isHovered
                            ? 'text-[#105652]'
                            : 'text-[#141518] group-hover:text-[#105652]'
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    {/* Desktop arrow indicator / Mobile accordion indicator */}
                    <div className="flex items-center gap-2">
                      <div className="hidden sm:flex w-8 h-8 rounded-full border border-[#D5D2C7] items-center justify-center text-[#737682] group-hover:border-[#105652] group-hover:text-[#105652] transition-colors">
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>

                      <div className="sm:hidden text-[#737682]">
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-300 ${
                            isMobileExpanded ? 'rotate-180 text-[#105652]' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* One-line description */}
                  <p className="mt-4 sm:ml-16 sm:pl-1 text-sm sm:text-base text-[#565963] font-normal leading-relaxed max-w-xl">
                    {item.description}
                  </p>

                  {/* Mobile Tap-to-Expand Image */}
                  <div
                    className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
                      isMobileExpanded ? 'max-h-80 mt-5 opacity-100' : 'max-h-0 mt-0 opacity-0'
                    }`}
                  >
                    <div className="aspect-[16/10] w-full rounded-none overflow-hidden bg-[#E2DFD6] shadow-sm">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.imageAlt}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Synchronized Image Panel (Sticky / Dynamic Hover Preview) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-32">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#1E2024] shadow-xl border border-[#E0DCD2]">
              {APPROACH_ITEMS.map((item, index) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out ${
                    activeHoverIndex === index
                      ? 'opacity-100 scale-100 pointer-events-auto'
                      : 'opacity-0 scale-105 pointer-events-none'
                  }`}
                >
                  <ImageWithFallback
                    src={item.image}
                    alt={item.imageAlt}
                    loading="lazy"
                    overlay={true}
                    overlayClass="bg-gradient-to-t from-black/60 via-transparent to-black/10"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#2DD4BF] block mb-1">
                      Approach {item.number}
                    </span>
                    <h4 className="font-serif text-2xl font-light text-white">
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
