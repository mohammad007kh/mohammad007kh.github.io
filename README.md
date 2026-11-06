# mohammad007kh.github.io

Personal site of Mohammad Khoddami.

Pure HTML / CSS / JavaScript. No build step, no framework, no dependencies.
Served directly by GitHub Pages from this repository (the `.nojekyll` file
disables Jekyll processing so files are served as-is).

## Local development

Just open `index.html` in a browser, or serve the folder over HTTP:

```bash
python -m http.server 8000
# or
npx serve .
```

Serve it over HTTP rather than opening the file directly if you need to check
the YouTube embeds: they reject `file://` origins with "Error 153".

## Structure

- `index.html`: single-page site
- `styles.css`: all styles, including the self-hosted `@font-face` rules
- `script.js`: all behavior (theme toggle, reveal-on-scroll,
  contribution-graph fallback)
- `404.html`: error page
- `fonts/`: Instrument Serif, self-hosted. See `fonts/OFL-NOTICE.txt`
- `og.png`: 1200x630 social card
- `robots.txt`, `sitemap.xml`, `llms.txt`: discovery
- `.nojekyll`: tells GitHub Pages to skip Jekyll
- `google*.html`: Search Console verification

## Notes for future edits

- **Dark is the default theme.** Light is opt-in via `[data-theme="light"]`,
  set by the inline script in `<head>` before first paint.
- **Instrument Serif is vendored, Inter is not.** The display headings set one
  word in italic serif; waiting on a third-party request to re-wrap them cost
  measurable CLS, so that font is served same-origin and preloaded.
- **Hover states animate `opacity` and `transform` only.** Animating `padding`
  reflows text every frame and visibly stutters.
- **The sitemap is hand-written.** This is not a Jekyll site, so no plugin
  generates one. Adding a page means editing `sitemap.xml` by hand.
- **The contribution graph is third-party** (`ghchart.rshah.org`). It removes
  itself from the DOM if the service is unreachable, so it cannot break the
  layout.

Live at: <https://mohammad007kh.github.io>
