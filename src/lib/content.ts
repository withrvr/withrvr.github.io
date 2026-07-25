// Typed access to the JSON content. Components read from here, never from raw
// JSON, so a shape change is caught in one place.
import siteData from "@/data/site.json";
import profileData from "@/data/profile.json";
import skillsData from "@/data/skills.json";
import experienceData from "@/data/experience.json";
import projectsData from "@/data/projects.json";
import achievementsData from "@/data/achievements.json";
import educationData from "@/data/education.json";

import type {
  SiteMeta,
  Profile,
  SkillsContent,
  ExperienceContent,
  ProjectsContent,
  AchievementsContent,
  EducationContent,
} from "./types";

export const site = siteData as unknown as SiteMeta;
export const profile = profileData as unknown as Profile;
export const skills = skillsData as unknown as SkillsContent;
export const experience = experienceData as unknown as ExperienceContent;
export const projects = projectsData as unknown as ProjectsContent;
export const achievements = achievementsData as unknown as AchievementsContent;
export const education = educationData as unknown as EducationContent;
