import { CareerHistorySection as CareerHistorySectionType } from '@/lib/types';

interface CareerHistorySectionProps {
  data: CareerHistorySectionType;
}

const CompanyIcon = ({ iconName }: { iconName?: string }) => {
  return (
    <div className="w-7 h-7 rounded-full bg-[#1e3a5f] border-2 border-primary flex items-center justify-center">
      <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
      </svg>
    </div>
  );
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
};

export default function CareerHistorySection({ data }: CareerHistorySectionProps) {
  if (!data) return null;

  const { section_heading, timeline_entries } = data;
  const entries = Array.isArray(timeline_entries) ? timeline_entries : [];

  return (
    <section className="bg-site-bg py-16 px-6">
      <div className="max-w-container mx-auto">
        {section_heading && (
          <h2 className="text-[22px] font-bold text-text-primary text-center mb-10">
            {typeof section_heading === 'string' ? section_heading : ''}
          </h2>
        )}

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[13px] top-0 bottom-0 w-0.5 bg-primary/30" />

          <div className="space-y-6">
            {entries?.map?.((entry, i) => (
              <div key={entry?.uid || i} className="relative flex gap-5 pl-1">
                {/* Node */}
                <div className="flex-shrink-0 relative z-10">
                  <CompanyIcon iconName={entry?.company_icon_name} />
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <div>
                      <h3 className="text-[13px] font-semibold text-text-primary leading-tight">
                        {typeof entry?.role_title === 'string' ? entry.role_title : ''}
                      </h3>
                      <p className="text-[12px] text-primary font-medium">
                        {typeof entry?.company_name === 'string' ? entry.company_name : ''}
                      </p>
                    </div>
                    <div className="text-[11px] text-text-dimmed text-right flex-shrink-0">
                      {formatDate(entry?.start_date)} –{' '}
                      {entry?.current_role ? (
                        <span className="text-primary font-medium">Present</span>
                      ) : (
                        formatDate(entry?.end_date)
                      )}
                    </div>
                  </div>
                  {entry?.description && (
                    <p className="text-[11px] text-text-muted leading-relaxed mt-1">
                      {typeof entry.description === 'string' ? entry.description : ''}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}