# COS301 Study Guides — L17 to L25 + SOA

Interactive study guides for the Software Engineering (COS301) class test: lecture content summaries, 20 shuffled multiple-choice questions per lecture with instant feedback, and 12 in-depth technical questions with hidden model answers. Progress is saved locally in your browser (localStorage) — nothing is sent to a server.

**Live site:** enable GitHub Pages on this repo (Settings → Pages → Deploy from branch `main`, folder `/`) to get a shareable URL, or just open `index.html` directly in a browser.

## Structure

- `index.html` — landing page linking every lecture guide
- `comprehensive-test.html` — standalone cumulative practice test covering L17 to SOA with interactive single-answer and multi-select questions
- `L17.html` – `L25.html`, `SOA.html`, `MS.html` — one self-contained HTML file per lecture (+ a service-oriented architecture extra page and a bonus microservices synthesis guide), each embedding the same shared theme/CSS/JS
- `markdown/` — cleaned, intermediate markdown per lecture (source PDFs' company/marketing content removed, technical content kept)
- `data/*.json` — the actual content: page title, markdown body, MCQs, and technical questions per lecture
- `assets/theme.css`, `assets/app.js` — the shared dark-academic theme and interactive engine (markdown renderer, MCQ quiz engine, technical-question reveal engine), identical across every generated page
- `assets/build.py` — regenerates every `L*.html` / `MS.html` / `index.html` from `data/*.json` + the shared theme. Run `python3 assets/build.py` after editing any data file or the theme/JS.

## Editing content

Edit the relevant `data/L##.json` file (or `data/MS.json`), then run:

```bash
python3 assets/build.py
```

This regenerates every HTML file so all lectures stay in sync on theme/behaviour — never hand-edit the generated `.html` files directly, since a rebuild will overwrite them.

`comprehensive-test.html` is maintained separately as a standalone test page, so it can evolve independently from the generated lecture guides.
