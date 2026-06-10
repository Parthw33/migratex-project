export interface NavigationItem {
  label?: string;
  link_url?: string;
}

export interface CTAButton {
  button_text?: string;
  button_url?: string;
  button_style?: string;
}

export interface HeaderData {
  title?: string;
  site_name?: string;
  navigation_items?: NavigationItem[];
  primary_cta?: CTAButton;
  secondary_cta?: CTAButton;
}

export interface SocialLink {
  platform?: string;
  profile_url?: string;
  icon_name?: string;
}

export interface FooterData {
  title?: string;
  copyright_text?: string;
  social_links?: SocialLink[];
}

export interface SpecialtyBadge {
  badge_label?: string;
  badge_style?: string;
}

export interface HeroSection {
  headline?: string;
  highlighted_text?: string;
  subheadline?: string;
  portrait_photo?: Asset;
  specialty_badges?: SpecialtyBadge[];
  primary_cta?: CTAButton;
  secondary_cta?: CTAButton;
}

export interface SocialTabLink {
  tab_label?: string;
  tab_url?: string;
}

export interface BioSplitSection {
  section_label?: string;
  bio_content?: string;
  bio_photo?: Asset;
  social_tab_links?: SocialTabLink[];
}

export interface CareerTimelineEntry {
  uid?: string;
  title?: string;
  role_title?: string;
  company_name?: string;
  start_date?: string;
  end_date?: string;
  current_role?: boolean;
  description?: string;
  company_icon_name?: string;
}

export interface CareerHistorySection {
  section_heading?: string;
  timeline_entries?: CareerTimelineEntry[];
}

export interface SkillBadge {
  uid?: string;
  title?: string;
  skill_label?: string;
  icon_name?: string;
  icon_color?: string;
}

export interface ExpertiseIconsSection {
  section_heading?: string;
  skill_badges?: SkillBadge[];
}

export interface CertificationSlide {
  certification_title?: string;
  issuing_organization?: string;
  issue_date?: string;
  credential_url?: string;
}

export interface CertificationSlides {
  certification_slide_1?: CertificationSlide;
  certification_slide_2?: CertificationSlide;
  certification_slide_3?: CertificationSlide;
  certification_slide_4?: CertificationSlide;
}

export interface CertificationsCarouselSection {
  section_heading?: string;
  certification_slides?: CertificationSlides[];
  view_more_cta?: CTAButton;
}

export interface Asset {
  url?: string;
  title?: string;
  filename?: string;
  description?: string;
}

export interface TechnologyTag {
  tag_label?: string;
}

export interface ProjectCard {
  uid?: string;
  title?: string;
  project_title?: string;
  description?: string;
  project_screenshot?: Asset;
  project_url?: string;
  technology_tags?: TechnologyTag[];
}

export interface ProjectsGridSection {
  section_heading?: string;
  project_cards?: ProjectCard[];
  show_more_cta?: CTAButton;
}

export interface TagItem {
  tag_label?: string;
}

export interface Publication {
  uid?: string;
  title?: string;
  publication_title?: string;
  publisher?: string;
  published_date?: string;
  meta_info?: string;
  body?: string;
  publication_url?: string;
  tag_list?: TagItem[];
}

export interface PublicationsListSection {
  section_heading?: string;
  publications?: Publication[];
}

export interface PageSection {
  hero_section?: HeroSection;
  bio_split_section?: BioSplitSection;
  career_history_section?: CareerHistorySection;
  expertise_icons_section?: ExpertiseIconsSection;
  certifications_carousel_section?: CertificationsCarouselSection;
  projects_grid_section?: ProjectsGridSection;
  publications_list_section?: PublicationsListSection;
}

export interface HomePageData {
  title?: string;
  url?: string;
  page_sections?: PageSection[];
  meta_title?: string;
  meta_description?: string;
  og_image?: Asset;
  canonical_url?: string;
}