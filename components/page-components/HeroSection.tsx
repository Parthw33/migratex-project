import Link from 'next/link';
import Image from 'next/image';
import { HeroSection as HeroSectionType } from '@/lib/types';

interface HeroSectionProps {
  data: HeroSectionType;
}

export default function HeroSection({ data }: HeroSectionProps) {
  if (!data) return null;

  const {
    headline,
    highlighted_text,
    subheadline,
    portrait_photo,
    specialty_badges,
    primary_cta,
    secondary_cta,
  } = data;

  const renderHeadline = () => {
    if (!headline) return null;
    if (highlighted_text && headline.includes(highlighted_text)) {
      const parts = headline.split(highlighted_text);
      return (
        <h1 className="text-[34px] font-bold text-text-primary leading-tight tracking-tight">
          {parts[0]}
          <span className="bg-primary text-white px-1.5 py-0.5 rounded-[4px] mx-1">
            {highlighted_text}
          </span>
          {parts[1]}
        </h1>
      );
    }
    return (
      <h1 className="text-[34px] font-bold text-text-primary leading-tight tracking-tight">
        {headline}
      </h1>
    );
  };

  return (
    <section className="relative pt-32 pb-16 px-6">
      <div className="max-w-container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Content */}
          <div className="flex-1 text-center md:text-left max-w-[580px]">
            {renderHeadline()}

            {subheadline && (
              <p className="mt-4 text-[15px] text-text-secondary font-normal">
                {typeof subheadline === 'string' ? subheadline : ''}
              </p>
            )}

            {/* Specialty Badges */}
            {Array.isArray(specialty_badges) && specialty_badges.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                {specialty_badges?.map?.((badge, i) => (
                  <span
                    key={i}
                    className={`text-[12px] font-medium px-3 py-1 rounded-full ${
                      badge?.badge_style === 'filled' || badge?.badge_style === 'accent'
                        ? 'bg-primary text-white'
                        : 'bg-element-bg border border-primary text-primary'
                    }`}
                  >
                    {typeof badge?.badge_label === 'string' ? badge.badge_label : ''}
                  </span>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
              {primary_cta?.button_text && (
                <Link
                  href={primary_cta?.button_url || '#'}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-primary rounded-md hover:bg-primary-dark transition-all duration-200"
                >
                  {primary_cta.button_text}
                </Link>
              )}
              {secondary_cta?.button_text && (
                <Link
                  href={secondary_cta?.button_url || '#'}
                  className="px-5 py-2.5 text-sm font-semibold text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition-all duration-200"
                >
                  {secondary_cta.button_text}
                </Link>
              )}
            </div>
          </div>

          {/* Portrait Photo */}
          {portrait_photo?.url && (
            <div className="flex-shrink-0">
              <div className="relative w-[100px] h-[120px] md:w-[120px] md:h-[145px] rounded-lg overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                <Image
                  src={portrait_photo.url}
                  alt={portrait_photo?.title || 'Portrait'}
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}