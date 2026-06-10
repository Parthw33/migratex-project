'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CertificationsCarouselSection as CertificationsCarouselSectionType, CertificationSlide } from '@/lib/types';

interface CertificationsCarouselSectionProps {
  data: CertificationsCarouselSectionType;
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  } catch {
    return dateStr;
  }
};

export default function CertificationsCarouselSection({ data }: CertificationsCarouselSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  if (!data) return null;

  const { section_heading, certification_slides, view_more_cta } = data;

  // Flatten certification slides
  const allSlides: CertificationSlide[] = [];
  if (Array.isArray(certification_slides)) {
    certification_slides?.forEach?.((slideGroup) => {
      if (slideGroup && typeof slideGroup === 'object') {
        const keys = ['certification_slide_1', 'certification_slide_2', 'certification_slide_3', 'certification_slide_4'];
        keys.forEach((key) => {
          const slide = (slideGroup as any)[key];
          if (slide && slide.certification_title) {
            allSlides.push(slide);
          }
        });
      }
    });
  }

  if (allSlides.length === 0) return null;

  const currentSlide = allSlides[activeSlide] || allSlides[0];

  return (
    <section className="bg-card-bg py-16 px-6">
      <div className="max-w-container mx-auto">
        {section_heading && (
          <h2 className="text-[22px] font-bold text-text-primary text-center mb-10">
            {typeof section_heading === 'string' ? section_heading : ''}
          </h2>
        )}

        {/* Carousel Card */}
        <div className="max-w-[520px] mx-auto">
          <div className="bg-card-bg border border-white/[0.08] rounded-[10px] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[14px] font-semibold text-text-primary leading-tight">
                  {typeof currentSlide?.certification_title === 'string' ? currentSlide.certification_title : ''}
                </h3>
                {currentSlide?.issuing_organization && (
                  <p className="text-[12px] text-primary mt-1 font-medium">
                    {typeof currentSlide.issuing_organization === 'string' ? currentSlide.issuing_organization : ''}
                  </p>
                )}
                {currentSlide?.issue_date && (
                  <p className="text-[11px] text-text-dimmed mt-1">
                    Issued: {formatDate(currentSlide.issue_date)}
                  </p>
                )}
                {currentSlide?.credential_url && (
                  <Link
                    href={currentSlide.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-[11px] text-primary hover:underline"
                  >
                    View Credential →
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Dots */}
          {allSlides.length > 1 && (
            <div className="flex justify-center gap-1.5 mt-5">
              {allSlides?.map?.((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    i === activeSlide ? 'bg-primary' : 'bg-element-bg'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* View More CTA */}
          {view_more_cta?.button_text && (
            <div className="text-center mt-6">
              <Link
                href={view_more_cta?.button_url || '#'}
                className="inline-flex items-center gap-2 bg-element-bg border border-white/10 rounded-md px-4 py-2 text-[12px] text-text-secondary hover:text-primary hover:border-primary transition-all duration-200"
              >
                {view_more_cta.button_text}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}