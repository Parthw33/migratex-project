import { ExpertiseIconsSection as ExpertiseIconsSectionType } from '@/lib/types';

interface ExpertiseIconsSectionProps {
  data: ExpertiseIconsSectionType;
}

const TechIcon = ({ iconName, iconColor }: { iconName?: string; iconColor?: string }) => {
  const color = iconColor || '#3b82f6';
  const name = iconName?.toLowerCase() || '';

  if (name.includes('react')) {
    return (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill={color}>
        <path d="M12 13.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM12 4.5C8.41 4.5 5.25 5.55 3.13 7.24 1 8.93 0 11.32 0 12s1 3.07 3.13 4.76C5.25 18.45 8.41 19.5 12 19.5s6.75-1.05 8.87-2.74C23 15.07 24 12.68 24 12s-1-3.07-3.13-4.76C18.75 5.55 15.59 4.5 12 4.5zm0 13.5c-3.17 0-6.02-.93-7.95-2.43C2.19 14.11 1.5 13.06 1.5 12s.69-2.11 2.55-3.57C5.98 6.93 8.83 6 12 6s6.02.93 7.95 2.43C21.81 9.89 22.5 10.94 22.5 12s-.69 2.11-2.55 3.57C17.98 17.07 15.17 18 12 18z" />
      </svg>
    );
  }

  return (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill={color}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
};

export default function ExpertiseIconsSection({ data }: ExpertiseIconsSectionProps) {
  if (!data) return null;

  const { section_heading, skill_badges } = data;
  const badges = Array.isArray(skill_badges) ? skill_badges : [];

  return (
    <section className="bg-site-bg py-16 px-6">
      <div className="max-w-container mx-auto">
        {section_heading && (
          <h2 className="text-[22px] font-bold text-text-primary text-center mb-10">
            {typeof section_heading === 'string' ? section_heading : ''}
          </h2>
        )}

        <div className="flex flex-wrap justify-center gap-6">
          {badges?.map?.((badge, i) => (
            <div key={badge?.uid || i} className="flex flex-col items-center gap-2">
              <div
                className="w-14 h-14 rounded-full bg-element-bg border border-white/10 flex items-center justify-center"
                title={typeof badge?.skill_label === 'string' ? badge.skill_label : ''}
              >
                <TechIcon
                  iconName={badge?.icon_name}
                  iconColor={badge?.icon_color}
                />
              </div>
              <span className="text-[11px] text-text-secondary text-center max-w-[60px]">
                {typeof badge?.skill_label === 'string' ? badge.skill_label : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}