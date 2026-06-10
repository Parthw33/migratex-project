import Image from 'next/image';
import Link from 'next/link';
import { BioSplitSection as BioSplitSectionType } from '@/lib/types';

interface BioSplitSectionProps {
  data: BioSplitSectionType;
}

export default function BioSplitSection({ data }: BioSplitSectionProps) {
  if (!data) return null;

  const { section_label, bio_content, bio_photo, social_tab_links } = data;

  return (
    <section className="bg-card-bg py-16 px-6">
      <div className="max-w-container mx-auto">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Text Content */}
          <div className="flex-1">
            {section_label && (
              <p className="text-[11px] font-bold text-primary uppercase tracking-[2px] mb-3">
                {typeof section_label === 'string' ? section_label : ''}
              </p>
            )}

            {bio_content && (
              <div
                className="text-[12px] text-text-muted leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: typeof bio_content === 'string' ? bio_content : '',
                }}
              />
            )}

            {/* Social Tab Links */}
            {Array.isArray(social_tab_links) && social_tab_links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {social_tab_links?.map?.((tab, i) => (
                  <Link
                    key={i}
                    href={tab?.tab_url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-element-bg border border-white/[0.08] rounded px-3 py-1 text-[11px] text-text-secondary hover:text-primary hover:border-primary transition-all duration-200"
                  >
                    {typeof tab?.tab_label === 'string' ? tab.tab_label : ''}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Bio Photo */}
          {bio_photo?.url && (
            <div className="flex-shrink-0">
              <div className="relative w-[110px] h-[130px] rounded-lg overflow-hidden border border-white/10">
                <Image
                  src={bio_photo.url}
                  alt={bio_photo?.title || 'Bio photo'}
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}