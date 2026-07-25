// Client-only contact. No backend. Every path opens a Gmail web compose window
// addressed to Raghav, prefilled from JSON defaults and any form input. Gmail
// compose is used (not a bare mailto) so it always lands somewhere visible even
// on machines with no mail app configured.
import { site } from "./content";

// Public link to the current resume, read from the environment so the resume can
// be swapped without a code change. Falls back to the default link in site.json
// if the environment variable isn't set (e.g. a build that skipped the env var),
// so the resume link never silently disappears.
export const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL || site.resumeFallbackUrl;

function gmailCompose(to: string, subject: string, body: string): string {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to,
    su: subject,
    body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export interface ContactFields {
  name: string;
  email: string;
  message: string;
}

export function buildContactCompose({ name, email, message }: ContactFields): string {
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  return gmailCompose(site.email, site.mail.contactSubject, body);
}

export function buildScheduleCompose(): string {
  return gmailCompose(site.email, site.mail.scheduleSubject, site.mail.scheduleBody);
}
