# withrvr.github.io

Personal portfolio of **Raghav Vikram Rathi** — Backend Software Engineer.

Built with Vite, React, and Tailwind CSS. All personal content lives in a single
file, [`src/data/portfolio.json`](src/data/portfolio.json) — editing that file is
the only thing needed to change any text, link, or asset path on the site.

- Media assets are served from `public/media/`.
- The resume served for download is `public/raghav_rathi_backend_engineer_jul_2026.pdf`.
- `public/404.html` redirects every unmatched URL back to the homepage on GitHub Pages.

```bash
npm install
npm run dev      # local development
npm run build    # production build in dist/
```

Deployment is automatic: every push to `main` triggers the GitHub Actions
workflow in `.github/workflows/deploy.yml`, which builds the site and publishes
`dist/` to GitHub Pages at https://withrvr.github.io/.
