// Content types. Every JSON file in src/data validates against these shapes.

export type IconName =
  | "github"
  | "linkedin"
  | "leetcode"
  | "code360"
  | "external"
  | "crates";

export interface Social {
  label: string;
  href: string;
  icon: IconName;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteMeta {
  shortName: string;
  fullName: string;
  title: string;
  pageTitle: string;
  location: string;
  email: string;
  phone: string;
  resumeFallbackUrl: string;
  meta: {
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    url: string;
    repoUrl: string;
  };
  socials: Social[];
  nav: NavLink[];
  mail: {
    contactSubject: string;
    scheduleSubject: string;
    scheduleBody: string;
  };
}

export interface Cta {
  text: string;
  href: string;
}

export interface HeroContent {
  greeting: string;
  headline: string;
  subheadline: string;
  tagline: string;
  poster: string;
  video: string;
  ctaPrimary: Cta;
  ctaSecondary: Cta;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface AboutContent {
  heading: string;
  photo: string;
  bio: string;
  paragraphs: string[];
  highlights: string[];
  stats: Stat[];
}

export interface Profile {
  hero: HeroContent;
  about: AboutContent;
}

export interface SkillCategory {
  label: string;
  skills: string[];
}

export interface SkillsContent {
  badge: string;
  heading: string;
  description: string;
  categories: SkillCategory[];
}

export interface ExperienceRole {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  subtitle: string;
  bullets: string[];
  tags: string[];
}

export interface ExperienceContent {
  heading: string;
  description: string;
  roles: ExperienceRole[];
}

export type ProjectStatus =
  | "complete"
  | "complete-learning"
  | "active-learning"
  | "in-development"
  | "cancelled";

export type ProjectImageLayout = "wide" | "phones" | "none";

export interface ProjectLink {
  label: string;
  href: string;
  icon: IconName;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  status: ProjectStatus;
  statusLabel: string;
  summary: string;
  bullets: string[];
  techTags: string[];
  images: string[];
  imageLayout: ProjectImageLayout;
  links: ProjectLink[];
  featured: boolean;
}

export interface ProjectsContent {
  badge: string;
  heading: string;
  description: string;
  projects: Project[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: string;
  link?: { label: string; href: string };
}

export interface AchievementsContent {
  badge: string;
  heading: string;
  description: string;
  items: Achievement[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  location: string;
  coursework: string[];
}

export interface EducationContent {
  heading: string;
  items: EducationItem[];
}
