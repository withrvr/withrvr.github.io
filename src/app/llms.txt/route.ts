import { site, profile, skills, experience, projects, achievements, education } from "@/lib/content";
import { resumeUrl } from "@/lib/mail";

export const dynamic = "force-static";

// llms.txt: a plain-markdown mirror of the page for AI agents and bots, per
// the emerging llms.txt convention (https://llmstxt.org). Built from the same
// src/data/*.json the page itself renders, so it can never drift out of sync.
// This is a single-page site, so one file covers everything; there is no
// separate llms-full.txt because nothing here is large enough to need
// summarizing down.
function buildContent(): string {
  const lines: string[] = [];

  lines.push(`# ${site.fullName}`);
  lines.push("");
  lines.push(`> ${site.meta.ogDescription}`);
  lines.push("");
  lines.push(`- Role: ${site.title}`);
  lines.push(`- Location: ${site.location}`);
  lines.push(`- Email: ${site.email}`);
  lines.push(`- Site: ${site.meta.url}`);
  lines.push(`- Resume: ${resumeUrl}`);
  for (const s of site.socials) lines.push(`- ${s.label}: ${s.href}`);

  lines.push("", "## About", "");
  lines.push(profile.about.bio);
  for (const p of profile.about.paragraphs) lines.push("", p);

  lines.push("", "## Skills");
  for (const cat of skills.categories) {
    lines.push("", `### ${cat.label}`, cat.skills.join(", "));
  }

  lines.push("", "## Experience");
  for (const role of experience.roles) {
    lines.push("", `### ${role.role}, ${role.company} (${role.period})`);
    lines.push(`${role.location}. ${role.subtitle}`);
    for (const b of role.bullets) lines.push(`- ${b}`);
  }

  lines.push("", "## Projects");
  for (const p of projects.projects) {
    lines.push("", `### ${p.name}, ${p.tagline} (${p.statusLabel})`);
    lines.push(p.summary);
    for (const l of p.links) lines.push(`- ${l.label}: ${l.href}`);
  }

  lines.push("", "## Achievements");
  for (const a of achievements.items) {
    lines.push(`- ${a.title} (${a.year}): ${a.description}`);
  }

  lines.push("", "## Education");
  for (const e of education.items) {
    lines.push(`- ${e.degree}, ${e.institution} (${e.period}), ${e.location}`);
  }

  return lines.join("\n") + "\n";
}

export function GET() {
  return new Response(buildContent(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
