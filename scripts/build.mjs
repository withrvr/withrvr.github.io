#!/usr/bin/env node
// Builds the static site from info.json + templates/index.template.html.
// Output goes to dist/ and is what GitHub Pages actually serves.
// Runs on every push to main via .github/workflows/deploy.yml, so
// editing info.json and pushing is the only step needed to roll out a
// changed resume link, contact email, or meta description.

import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');

const info = JSON.parse(readFileSync(path.join(root, 'info.json'), 'utf8'));
const { wired, reference } = info;

mkdirSync(dist, { recursive: true });
mkdirSync(path.join(dist, 'resume'), { recursive: true });

// 1. index.html: bake wired fields into the tested template.
let html = readFileSync(path.join(root, 'templates/index.template.html'), 'utf8');
html = html
  .replaceAll('__RESUME_URL__', wired.resumeUrl)
  .replaceAll('__CONTACT_EMAIL__', wired.contactEmail)
  .replaceAll('__META_DESCRIPTION__', wired.metaDescription);
writeFileSync(path.join(dist, 'index.html'), html);

// 2. llms.txt: plain-text mirror for AI agents/bots, per llmstxt.org.
const llms = `# ${reference.name} (${reference.handle})

> ${wired.metaDescription}

- Site: ${reference.siteUrl}
- Resume: ${wired.resumeUrl}
- Email: ${wired.contactEmail}
- LinkedIn: ${reference.linkedin}
- GitHub: ${reference.github}
- Location: ${reference.location}
- Stack: ${reference.stack}
- Status: ${reference.status}

This site is a CRT-terminal simulation. Everything a browser sees is also
reachable inside the terminal itself: try \`about\`, \`experience\`,
\`education\`, \`skills\`, \`achievements\`, \`projects\`, \`contact\`,
\`resume\`, or \`help\` for the full command list.
`;
writeFileSync(path.join(dist, 'llms.txt'), llms);

// 3. /resume: static redirect (GitHub Pages has no server, so this is a
// meta-refresh + JS redirect with a plain link as the no-JS fallback).
const resumeHtml = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=${wired.resumeUrl}">
<title>Resume — redirecting…</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${wired.resumeUrl}">
<style>body{background:#031a07;color:#8fffb0;font:16px/1.5 ui-monospace,monospace;display:flex;min-height:100vh;align-items:center;justify-content:center;text-align:center}a{color:#8fffb0}</style>
</head><body>
<p>Redirecting to the resume&hellip;<br><a href="${wired.resumeUrl}">click here if nothing happens</a></p>
<script>location.replace(${JSON.stringify(wired.resumeUrl)});</script>
</body></html>
`;
writeFileSync(path.join(dist, 'resume', 'index.html'), resumeHtml);

// 4. 404: same terminal shell, boots straight into a "file not found" beat
// instead of the normal login sequence, then lets the visitor drive from
// there (help, ls, or any real command all still work).
let notFound = html.replace(
  '<title>RVR/OS v3.0 — Raghav Rathi, Backend Engineer</title>',
  '<title>404 — RVR/OS v3.0</title>'
);
writeFileSync(path.join(dist, '404.html'), notFound);

// 5. Static assets.
for (const f of ['favicon.svg', '.nojekyll']) {
  const from = path.join(root, 'public', f);
  if (existsSync(from)) copyFileSync(from, path.join(dist, f));
}

console.log('Built dist/ from info.json + templates/index.template.html');
