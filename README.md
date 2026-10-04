# COS301 ST2 Study Guides — L17 to L35

Interactive study guides for the Software Engineering (COS301) semester test: content summaries, flashcards, 20 shuffled multiple-choice questions per guide with instant feedback, and 12 technical questions with hidden model answers. Progress is saved locally in your browser (localStorage) — nothing is sent to a server.

L17–L25 and the existing SOA/Microservices guides cover the earlier material (the latter cover L26–L27). L28–L34 add the remaining topics; L35 is a synthesised revision guide with integrated practice. Existing SOA/MS filenames and browser progress keys are preserved.

## Content sources

- **L28:** based on `markdown/L28 - Deployment Diagrams.md`.
- **L30:** based on `markdown/L29 - Software Quality Assurance.md`, mapped to L30 by the updated `scope.md`. The source filename is intentional.
- **L29 and L31–L34:** general topic guides because lecture slides were not supplied. They are labelled accordingly and are not claims about exact lecture or exam coverage.
- **L35:** newly authored revision across the available material; L35 was a revision session.

New guides include original practice questions and worked examples. Relevant external references and supplied source files are linked from the study-content panel. Study content and interactions work offline; external reference pages require internet access.

The existing L18 UI-pattern appendix is preserved in `assets/L18-extra.html` and included by the builder. Its original Mermaid diagrams use an external renderer, with readable diagram source when offline. L22's canonical JSON now matches its previously published study content, so rebuilding preserves that version.

**Live site:** enable GitHub Pages on this repo (Settings → Pages → Deploy from branch `main`, folder `/`) to get a shareable URL, or just open `index.html` directly in a browser.

## Structure

- `index.html` — landing page linking every lecture guide
- `comprehensive-test.html` — standalone cumulative practice test covering L17 to SOA with interactive single-answer and multi-select questions
- `L17.html` – `L25.html`, `SOA.html`, `MS.html`, `L28.html` – `L35.html` — self-contained guides embedding the same shared theme/CSS/JS
- `markdown/` — existing source notes and study summaries; `L28.md`–`L35.md` mirror the new guides' study content, with references
- `data/*.json` — the actual content: page title, markdown body, MCQs, and technical questions per lecture
- `assets/theme.css`, `assets/app.js` — the shared dark-academic theme and interactive engine (markdown renderer, MCQ quiz engine, technical-question reveal engine), identical across every generated page
- `assets/build.py` — regenerates every `L*.html` / `MS.html` / `index.html` from `data/*.json` + the shared theme. Run `python3 assets/build.py` after editing any data file or the theme/JS.

## Editing content

Edit the relevant `data/L##.json` file (or `data/MS.json`), then run:

```bash
python3 assets/build.py
```

This regenerates every HTML file so all lectures stay in sync on theme/behaviour — never hand-edit the generated `.html` files directly, since a rebuild will overwrite them.

JSON remains the canonical guide content. If changing a new guide's `contentMarkdown` or `sources`, update its corresponding Markdown study summary too. The supplied source-note files remain separate from those summaries.

`comprehensive-test.html` is maintained separately and retains its original L17–L25, SOA and MS coverage. Use `L35.html` for integrated revision including L28–L34.
