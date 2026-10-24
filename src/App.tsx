import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Preloader } from './components/Preloader.tsx';
import { Navbar } from './components/Navbar.tsx';
import { ScrollToTop } from './components/ScrollToTop.tsx';
import { MobileStickyBar } from './components/MobileStickyBar.tsx';

import { HomePage } from './pages/HomePage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ApproachPage } from './pages/ApproachPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [preloaderFinished, setPreloaderFinished] = useState(() => {
    // Check if preloader has already run in current session
    return sessionStorage.getItem('spr_preloader_seen') === 'true';
  });

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('spr_preloader_seen', 'true');
    setPreloaderFinished(true);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    // Initialize Lenis smooth scroll synced to GSAP ScrollTrigger
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#FAF9F5] text-[#141518] selection:bg-[#105652] selection:text-white flex flex-col justify-between">
        {/* Scroll restoration helper */}
        <ScrollToTop />

        {/* 1. Preloader (Initial site visit only) */}
        {!preloaderFinished && <Preloader onComplete={handlePreloaderComplete} />}

        {/* Multi-page Top Navigation */}
        <Navbar />

        {/* Main Routed Page Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage preloaderFinished={preloaderFinished} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/approach" element={<ApproachPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Mobile-only sticky bottom quick action bar */}
        <MobileStickyBar />
      </div>
    </BrowserRouter>
  );
}
