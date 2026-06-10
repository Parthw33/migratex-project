import { PageSection } from '@/lib/types';
import HeroSection from './page-components/HeroSection';
import BioSplitSection from './page-components/BioSplitSection';
import CareerHistorySection from './page-components/CareerHistorySection';
import ExpertiseIconsSection from './page-components/ExpertiseIconsSection';
import CertificationsCarouselSection from './page-components/CertificationsCarouselSection';
import ProjectsGridSection from './page-components/ProjectsGridSection';
import PublicationsListSection from './page-components/PublicationsListSection';

interface RenderComponentsProps {
  pageSections: PageSection[];
}

export default function RenderComponents({ pageSections }: RenderComponentsProps) {
  if (!pageSections || !Array.isArray(pageSections) || pageSections.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-muted text-sm">No content available</p>
      </div>
    );
  }

  return (
    <>
      {pageSections?.map?.((section, index) => {
        if (!section || typeof section !== 'object') return null;

        const sectionKeys = Object.keys(section);

        return sectionKeys?.map?.((key) => {
          const sectionData = (section as any)[key];
          if (!sectionData) return null;

          switch (key) {
            case 'hero_section':
              return <HeroSection key={`${key}-${index}`} data={sectionData} />;
            case 'bio_split_section':
              return <BioSplitSection key={`${key}-${index}`} data={sectionData} />;
            case 'career_history_section':
              return <CareerHistorySection key={`${key}-${index}`} data={sectionData} />;
            case 'expertise_icons_section':
              return <ExpertiseIconsSection key={`${key}-${index}`} data={sectionData} />;
            case 'certifications_carousel_section':
              return <CertificationsCarouselSection key={`${key}-${index}`} data={sectionData} />;
            case 'projects_grid_section':
              return <ProjectsGridSection key={`${key}-${index}`} data={sectionData} />;
            case 'publications_list_section':
              return <PublicationsListSection key={`${key}-${index}`} data={sectionData} />;
            default:
              return null;
          }
        });
      })}
    </>
  );
}