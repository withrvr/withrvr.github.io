# RVR/OS v3.0

Personal portfolio of **Raghav Rathi** ([withrvr](https://github.com/withrvr)) —
a CRT-terminal simulation you drive by typing commands. One static HTML
file, no framework, no server.

**Live:** https://withrvr.github.io &nbsp;·&nbsp; try `help` once it boots.

<!-- screenshot: docs/screenshot.png -->

## How it's built

- `templates/index.template.html` — the whole site: HTML, CSS, and JS in
  one file.
- `info.json` — the few fields that change on their own schedule (resume
  link, contact email, meta description). Edit it and push; CI bakes the
  new values into the deployed page.
- `scripts/build.mjs` — generates `dist/` (`index.html`, `404.html`,
  `resume/index.html`, `llms.txt`) from the two files above.

See [`docs/v3.md`](docs/v3.md) for the full layout and how to preview
locally.

## Credit

Built from **HELIOS/OS v2.3 — Phosphor Terminal**, a template from
[Claude-Opus-5.5-100-HTML-Files](https://github.com/miaai-lab/Claude-Opus-5.5-100-HTML-Files)
by [miaai-lab](https://github.com/miaai-lab), personalized and extended
for this portfolio.

## License

[MIT](LICENSE) © Raghav Rathi
