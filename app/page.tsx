import { notFound } from 'next/navigation';
import { getEntryByUrl } from '@/lib/contentstack-api';
import { HomePageData } from '@/lib/types';
import RenderComponents from '@/components/RenderComponents';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const entryRes = await getEntryByUrl({
      entryUrl: '/',
      contentTypeUid: 'home_page',
    });
    const data = entryRes as HomePageData | null;
    return {
      title: data?.meta_title || 'Parth Wattamwar | React/Next.js Developer',
      description: data?.meta_description || 'React/Next.js Developer based in Pune, India',
    };
  } catch {
    return {
      title: 'Parth Wattamwar | React/Next.js Developer',
      description: 'React/Next.js Developer based in Pune, India',
    };
  }
}

export default async function HomePage() {
  try {
    const entryRes = await getEntryByUrl({
      entryUrl: '/',
      contentTypeUid: 'home_page',
      referenceFieldPath: [
        'page_sections.career_history_section.timeline_entries',
        'page_sections.expertise_icons_section.skill_badges',
        'page_sections.projects_grid_section.project_cards',
        'page_sections.publications_list_section.publications',
      ],
      jsonRtePath: ['page_sections.bio_split_section.bio_content'],
    });

    if (!entryRes) return notFound();

    const data = entryRes as HomePageData;

    return (
      <div>
        <RenderComponents pageSections={data?.page_sections || []} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching home page:', error);
    return notFound();
  }
}