import { describe, it, expect } from "vitest";
import {
  site,
  profile,
  skills,
  experience,
  projects,
  achievements,
  education,
} from "@/lib/content";
import type { IconName, ProjectStatus } from "@/lib/types";

const ICON_NAMES: IconName[] = ["github", "linkedin", "leetcode", "code360", "external", "crates"];
const STATUSES: ProjectStatus[] = [
  "complete",
  "complete-learning",
  "active-learning",
  "in-development",
  "cancelled",
];

const EXPECTED_PROJECT_IDS = [
  "1link",
  "typerush",
  "portfolio-v1",
  "prompt-navigator",
  "mute-ads",
  "url-shortener",
  "github-api",
  "chatgpt-gmail-bot",
  "chess-training-games",
  "hulu-clone",
  "four-equals-ten",
  "twitter-tweepy-api",
];

function allHrefs(): string[] {
  const hrefs: string[] = [];
  site.socials.forEach((s) => hrefs.push(s.href));
  projects.projects.forEach((p) => p.links.forEach((l) => hrefs.push(l.href)));
  achievements.items.forEach((a) => {
    if (a.link) hrefs.push(a.link.href);
  });
  return hrefs;
}

describe("site content", () => {
  it("has the core identity fields", () => {
    expect(site.shortName).toBe("RVR");
    expect(site.fullName).toBe("Raghav Rathi");
    expect(site.fullName).not.toContain("Vikram");
    expect(site.email).toContain("@");
  });

  it("lists socials with valid, non-Twitter icons", () => {
    expect(site.socials.length).toBeGreaterThan(0);
    site.socials.forEach((s) => {
      expect(ICON_NAMES).toContain(s.icon);
      expect(s.icon).not.toBe("twitter");
      expect(s.href).toMatch(/^https?:\/\//);
    });
  });
});

describe("navigation and socials", () => {
  it("has exactly the five nav sections with home-anchored hrefs", () => {
    expect(site.nav.map((n) => n.label)).toEqual([
      "About",
      "Experience",
      "Projects",
      "Education",
      "Contact",
    ]);
    site.nav.forEach((n) => expect(n.href.startsWith("/#")).toBe(true));
  });

  it("lists linkedin, github, and leetcode only (Coding Ninjas lives in Achievements)", () => {
    expect(site.socials.map((s) => s.icon)).toEqual(["linkedin", "github", "leetcode"]);
  });
});

describe("no Twitter or X presence", () => {
  it("has no link to twitter.com or x.com anywhere", () => {
    for (const href of allHrefs()) {
      expect(href.toLowerCase()).not.toContain("twitter.com");
      expect(href.toLowerCase()).not.toContain("x.com");
      expect(href.toLowerCase()).not.toContain("codewithrvr");
    }
  });
});

describe("no em dash anywhere in content", () => {
  it("keeps every JSON payload free of the em dash character", () => {
    const blob = JSON.stringify([site, profile, skills, experience, projects, achievements, education]);
    expect(blob).not.toContain("—");
  });
});

describe("projects", () => {
  it("contains all twelve projects in the expected set", () => {
    expect(projects.projects).toHaveLength(12);
    const ids = projects.projects.map((p) => p.id);
    expect(ids).toEqual(EXPECTED_PROJECT_IDS);
  });

  it("gives every project an honest, valid status and complete metadata", () => {
    projects.projects.forEach((p) => {
      expect(STATUSES).toContain(p.status);
      expect(p.statusLabel.length).toBeGreaterThan(0);
      expect(p.summary.length).toBeGreaterThan(0);
      expect(p.bullets.length).toBeGreaterThan(0);
      expect(p.techTags.length).toBeGreaterThan(0);
      expect(p.links.length).toBeGreaterThan(0);
      p.links.forEach((l) => {
        expect(ICON_NAMES).toContain(l.icon);
        expect(l.href).toMatch(/^https?:\/\//);
      });
    });
  });

  it("keeps the honest in-progress and cancelled labels", () => {
    const byId = Object.fromEntries(projects.projects.map((p) => [p.id, p]));
    expect(byId["prompt-navigator"].status).toBe("in-development");
    expect(byId["mute-ads"].status).toBe("cancelled");
    expect(byId["url-shortener"].status).toBe("active-learning");
  });
});

describe("experience, achievements, education", () => {
  it("has three roles, each with bullets", () => {
    expect(experience.roles).toHaveLength(3);
    experience.roles.forEach((r) => expect(r.bullets.length).toBeGreaterThan(0));
  });

  it("has three achievements", () => {
    expect(achievements.items).toHaveLength(3);
  });

  it("keeps both education entries, each with coursework", () => {
    expect(education.items).toHaveLength(2);
    const institutions = education.items.map((e) => e.institution);
    expect(institutions).toContain("Thadomal Shahani Engineering College");
    expect(institutions).toContain("Government Polytechnic Amravati");
    education.items.forEach((e) => expect(e.coursework.length).toBeGreaterThan(0));
  });
});

describe("skills and about", () => {
  it("has five skill categories, backend first, Django included", () => {
    expect(skills.categories).toHaveLength(5);
    expect(skills.categories[0].label).toBe("Backend");
    expect(skills.categories[0].skills).toContain("Django");
  });

  it("draws four numeric, honest stats", () => {
    expect(profile.about.stats).toHaveLength(4);
    profile.about.stats.forEach((s) => expect(typeof s.value).toBe("number"));
  });
});
