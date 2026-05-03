# mohammad007kh.github.io

Personal site of Mohammad Khoddami.

Pure HTML / CSS / JavaScript — no build step, no framework, no dependencies.
Served directly by GitHub Pages from this repository (the `.nojekyll` file
disables Jekyll processing so files are served as-is).

## Local development

Just open `index.html` in a browser, or serve the folder over HTTP:

```bash
python -m http.server 8000
# or
npx serve .
```

## Structure

- `index.html` — single-page site
- `styles.css` — all styles
- `script.js` — all behavior (cursor glow, reveal-on-scroll, tagline rotator)
- `404.html` — error page
- `.nojekyll` — tells GitHub Pages to skip Jekyll
- `google*.html` — Search Console verification

Live at: <https://mohammad007kh.github.io>
