import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { BUSINESS_INFO } from '../types.ts';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? 'bg-[#141518]/95 backdrop-blur-md border-b border-white/10 py-3.5 shadow-sm text-[#FAF9F5]'
            : 'bg-transparent py-5 text-[#FAF9F5]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Wordmark */}
          <Link
            to="/"
            className="font-serif text-xl sm:text-2xl font-light tracking-wider uppercase text-[#FAF9F5] hover:text-[#2DD4BF] transition-colors whitespace-nowrap shrink-0"
          >
            SPR Realty
          </Link>

          {/* Zone 2: Multi-page Nav links (small-caps editorial style) */}
          <nav
            className="hidden md:flex items-center gap-8 text-xs font-medium tracking-[0.2em] uppercase text-[#D2D3D8]"
            aria-label="Main Navigation"
          >
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `transition-colors relative py-1 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-white font-semibold after:w-full'
                    : 'hover:text-white after:w-0'
                } after:content-[''] after:absolute after:-bottom-0.5 after:left-0 hover:after:w-full after:h-[1px] after:bg-[#2DD4BF] after:transition-all`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `transition-colors relative py-1 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-white font-semibold after:w-full'
                    : 'hover:text-white after:w-0'
                } after:content-[''] after:absolute after:-bottom-0.5 after:left-0 hover:after:w-full after:h-[1px] after:bg-[#2DD4BF] after:transition-all`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/approach"
              className={({ isActive }) =>
                `transition-colors relative py-1 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-white font-semibold after:w-full'
                    : 'hover:text-white after:w-0'
                } after:content-[''] after:absolute after:-bottom-0.5 after:left-0 hover:after:w-full after:h-[1px] after:bg-[#2DD4BF] after:transition-all`
              }
            >
              Our Approach
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `transition-colors relative py-1 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-white font-semibold after:w-full'
                    : 'hover:text-white after:w-0'
                } after:content-[''] after:absolute after:-bottom-0.5 after:left-0 hover:after:w-full after:h-[1px] after:bg-[#2DD4BF] after:transition-all`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={BUSINESS_INFO.phoneTel}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wider uppercase text-white bg-[#105652] hover:bg-[#0C4340] border border-[#105652] hover:border-[#0C4340] transition-colors shadow-sm whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2DD4BF]"
            >
              <Phone className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Call now</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#FAF9F5] hover:text-[#2DD4BF] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2DD4BF]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] z-30 bg-[#141518]/98 backdrop-blur-xl md:hidden flex flex-col justify-between p-8 text-[#FAF9F5] animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-6 pt-4 text-sm font-medium tracking-[0.2em] uppercase">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `py-2 border-b border-white/10 ${
                  isActive ? 'text-[#2DD4BF]' : 'text-[#FAF9F5]'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `py-2 border-b border-white/10 ${
                  isActive ? 'text-[#2DD4BF]' : 'text-[#FAF9F5]'
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/approach"
              className={({ isActive }) =>
                `py-2 border-b border-white/10 ${
                  isActive ? 'text-[#2DD4BF]' : 'text-[#FAF9F5]'
                }`
              }
            >
              Our Approach
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `py-2 border-b border-white/10 ${
                  isActive ? 'text-[#2DD4BF]' : 'text-[#FAF9F5]'
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-3 text-xs">
            <span className="font-mono text-[#8C909A] uppercase tracking-wider">
              {BUSINESS_INFO.location}
            </span>
            <span className="text-[#2DD4BF] font-mono">{BUSINESS_INFO.phone}</span>
          </div>
        </div>
      )}
    </>
  );
};
