import Link from 'next/link';
import { PublicationsListSection as PublicationsListSectionType } from '@/lib/types';

interface PublicationsListSectionProps {
  data: PublicationsListSectionType;
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  } catch {
    return dateStr;
  }
};

export default function PublicationsListSection({ data }: PublicationsListSectionProps) {
  if (!data) return null;

  const { section_heading, publications } = data;
  const pubs = Array.isArray(publications) ? publications : [];

  return (
    <section className="bg-site-bg py-16 px-6 pb-24">
      <div className="max-w-container mx-auto">
        {section_heading && (
          <h2 className="text-[22px] font-bold text-text-primary text-center mb-10">
            {typeof section_heading === 'string' ? section_heading : ''}
          </h2>
        )}

        <div className="space-y-4">
          {pubs?.map?.((pub, i) => (
            <div
              key={pub?.uid || i}
              className="bg-card-bg border border-white/[0.08] rounded-[10px] px-5 py-4 shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-[14px] font-bold text-text-primary leading-snug">
                    {typeof pub?.publication_title === 'string' ? pub.publication_title : ''}
                  </h3>

                  <div className="flex flex-wrap gap-3 mt-1.5">
                    {pub?.publisher && (
                      <span className="text-[11px] text-text-dimmed">
                        {typeof pub.publisher === 'string' ? pub.publisher : ''}
                      </span>
                    )}
                    {pub?.published_date && (
                      <span className="text-[11px] text-text-dimmed">
                        {formatDate(pub.published_date)}
                      </span>
                    )}
                    {pub?.meta_info && (
                      <span className="text-[11px] text-text-dimmed">
                        {typeof pub.meta_info === 'string' ? pub.meta_info : ''}
                      </span>
                    )}
                  </div>

                  {pub?.body && (
                    <div
                      className="mt-2 text-[12px] text-text-muted leading-relaxed line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: typeof pub.body === 'string' ? pub.body : '',
                      }}
                    />
                  )}

                  {/* Tags */}
                  {Array.isArray(pub?.tag_list) && pub.tag_list.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {pub.tag_list?.map?.((tag, j) => (
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

                {/* Read More Button */}
                {pub?.publication_url && (
                  <div className="flex-shrink-0">
                    <Link
                      href={pub.publication_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-primary text-white rounded-md px-3.5 py-1.5 text-[12px] font-medium hover:bg-primary-dark transition-all duration-200"
                    >
                      Read
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}