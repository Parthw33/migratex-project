import Image from 'next/image';
import Link from 'next/link';
import { ProjectsGridSection as ProjectsGridSectionType } from '@/lib/types';

interface ProjectsGridSectionProps {
  data: ProjectsGridSectionType;
}

export default function ProjectsGridSection({ data }: ProjectsGridSectionProps) {
  if (!data) return null;

  const { section_heading, project_cards, show_more_cta } = data;
  const cards = Array.isArray(project_cards) ? project_cards : [];

  return (
    <section className="bg-site-bg py-16 px-6">
      <div className="max-w-container mx-auto">
        {section_heading && (
          <h2 className="text-[22px] font-bold text-text-primary text-center mb-10">
            {typeof section_heading === 'string' ? section_heading : ''}
          </h2>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards?.map?.((card, i) => (
            <div
              key={card?.uid || i}
              className="bg-card-bg border border-white/[0.08] rounded-[10px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:border-primary/30 transition-all duration-200"
            >
              {/* Project Screenshot */}
              {card?.project_screenshot?.url ? (
                <div className="relative h-[100px] w-full overflow-hidden">
                  <Image
                    src={card.project_screenshot.url}
                    alt={card.project_screenshot?.title || card?.project_title || 'Project screenshot'}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              ) : (
                <div className="h-[100px] bg-element-bg flex items-center justify-center">
                  <svg className="w-8 h-8 text-text-dimmed" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                  </svg>
                </div>
              )}

              {/* Card Content */}
              <div className="px-3.5 py-3">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="text-[13px] font-semibold text-text-primary leading-tight">
                    {typeof card?.project_title === 'string' ? card.project_title : ''}
                  </h3>
                  {card?.project_url && (
                    <Link
                      href={card.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-dimmed hover:text-primary transition-colors flex-shrink-0"
                      aria-label="View project"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  )}
                </div>

                {card?.description && (
                  <p className="text-[11px] text-text-muted leading-relaxed">
                    {typeof card.description === 'string' ? card.description : ''}
                  </p>
                )}

                {/* Technology Tags */}
                {Array.isArray(card?.technology_tags) && card.technology_tags.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {card.technology_tags?.map?.((tag, j) => (
                      <span
                        key={j}
                        className="bg-element-bg border border-white/[0.08] rounded-full px-2.5 py-0.5 text-[10px] text-text-secondary"
                      >
                        {typeof tag?.tag_label === 'string' ? tag.tag_label : ''}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Show More CTA */}
        {show_more_cta?.button_text && (
          <div className="text-center mt-8">
            <Link
              href={show_more_cta?.button_url || '#'}
              className="inline-flex items-center gap-2 text-primary border border-primary rounded-md px-5 py-2 text-[13px] font-medium hover:bg-primary hover:text-white transition-all duration-200"
            >
              {show_more_cta.button_text}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}