'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HeaderData } from '@/lib/types';

interface HeaderProps {
  data: HeaderData | null;
}

export default function Header({ data }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const siteName = data?.site_name || 'Parth';
  const navItems = Array.isArray(data?.navigation_items) ? data.navigation_items : [];
  const primaryCta = data?.primary_cta;
  const secondaryCta = data?.secondary_cta;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#050a18]/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-container mx-auto px-6 py-3">
        <div className="flex items-center justify-between h-[52px]">
          {/* Logo */}
          <Link href="/" className="text-text-primary font-bold text-base hover:text-primary transition-colors">
            {siteName}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems?.map?.((item, i) => (
              <Link
                key={i}
                href={item?.link_url || '#'}
                className="text-text-secondary hover:text-text-primary text-sm font-normal transition-colors"
              >
                {item?.label || item?.link_url || 'Link'}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {secondaryCta?.button_text && (
              <Link
                href={secondaryCta?.button_url || '#'}
                className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition-all duration-200"
              >
                {secondaryCta.button_text}
              </Link>
            )}
            {primaryCta?.button_text && (
              <Link
                href={primaryCta?.button_url || '#'}
                className="px-4 py-2 text-sm font-medium text-white bg-primary border border-primary rounded-md hover:bg-primary-dark transition-all duration-200"
              >
                {primaryCta.button_text}
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0d1425] border-t border-white/[0.08] px-6 py-4">
          <nav className="flex flex-col gap-4 mb-4">
            {navItems?.map?.((item, i) => (
              <Link
                key={i}
                href={item?.link_url || '#'}
                className="text-text-secondary hover:text-text-primary text-sm transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item?.label || item?.link_url || 'Link'}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            {secondaryCta?.button_text && (
              <Link
                href={secondaryCta?.button_url || '#'}
                className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md text-center hover:bg-primary hover:text-white transition-all duration-200"
              >
                {secondaryCta.button_text}
              </Link>
            )}
            {primaryCta?.button_text && (
              <Link
                href={primaryCta?.button_url || '#'}
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md text-center hover:bg-primary-dark transition-all duration-200"
              >
                {primaryCta.button_text}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}