import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Hero } from '../components/Hero.tsx';
import { IntroSection } from '../components/IntroSection.tsx';
import { ApproachSection } from '../components/ApproachSection.tsx';
import { PinnedAboutSection } from '../components/PinnedAboutSection.tsx';
import { FinalCtaSection } from '../components/FinalCtaSection.tsx';

interface HomePageProps {
  preloaderFinished: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ preloaderFinished }) => {
  return (
    <>
      {/* 1. Hero */}
      <Hero preloaderFinished={preloaderFinished} />

      {/* 2. Intro Section */}
      <IntroSection />

      {/* Link to Full About Page */}
      <div className="bg-[#FAF9F5] pb-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex justify-start">
          <Link
            to="/about"
            className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-medium text-[#105652] hover:text-[#0C4340] border-b border-[#105652]/30 hover:border-[#105652] pb-1 transition-all"
          >
            <span>Learn more about our foundation</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* 3. Our Approach */}
      <ApproachSection />

      {/* Link to Full Approach Page */}
      <div className="bg-[#F5F4EE] pb-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex justify-start">
          <Link
            to="/approach"
            className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-medium text-[#105652] hover:text-[#0C4340] border-b border-[#105652]/30 hover:border-[#105652] pb-1 transition-all"
          >
            <span>Explore our full methodology</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* 4. Pinned About Section */}
      <PinnedAboutSection />

      {/* 5. Final CTA & Footer */}
      <FinalCtaSection />
    </>
  );
};
