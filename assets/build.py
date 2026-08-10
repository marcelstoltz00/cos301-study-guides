#!/usr/bin/env python3
"""Generates standalone lecture HTML files + index.html from JSON data files.
Run from anywhere: python3 assets/build.py
All output files embed identical CSS/JS so every lecture shares the exact same
theme and interactive components.
"""
import json
import html
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"
DATA_DIR = ROOT / "data"
OUT_DIR = ROOT

LECTURES = [
    {"id": "L17", "nav": "L17 · Design Systems & CI"},
    {"id": "L18", "nav": "L18 · Domain Modelling & Architectures"},
    {"id": "L19", "nav": "L19 · Software Testing in Practice"},
    {"id": "L20", "nav": "L20 · Designed for Humans"},
    {"id": "L21", "nav": "L21 · DevOps & DevSecOps"},
    {"id": "L22", "nav": "L22 · Practical Architectural Design"},
    {"id": "L23", "nav": "L23 · Architecture in Practice"},
    {"id": "L24", "nav": "L24 · Security Testing"},
    {"id": "L25", "nav": "L25 · Service Contracts"},
    {"id": "MS", "nav": "Bonus · Microservices Deep Dive"},
]

CSS = (ASSETS / "theme.css").read_text()
JS = (ASSETS / "app.js").read_text()


def nav_html(current_id):
    links = ['<a href="index.html" class="%s">Home</a>' % ("active" if current_id is None else "")]
    for lec in LECTURES:
        cls = "active" if lec["id"] == current_id else ""
        links.append(f'<a href="{lec["id"]}.html" class="{cls}">{lec["nav"]}</a>')
    return "\n".join(links)


def prev_next(current_id):
    ids = [l["id"] for l in LECTURES]
    idx = ids.index(current_id)
    prev_link = f'<a href="{ids[idx-1]}.html">&larr; {ids[idx-1]}</a>' if idx > 0 else '<a href="index.html">&larr; Home</a>'
    next_link = f'<a href="{ids[idx+1]}.html">{ids[idx+1]} &rarr;</a>' if idx < len(ids) - 1 else '<a href="index.html">Home &rarr;</a>'
    return prev_link, next_link


PAGE_TEMPLATE = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} — CT3 Study Guide</title>
<style>
{css}
</style>
</head>
<body>
<nav class="topnav">
  <div class="topnav-inner">
    <a href="index.html" class="topnav-brand">COS301 <span>Study Guides</span></a>
    <div class="topnav-links">
      {nav}
    </div>
  </div>
</nav>

<main class="page">
  <header class="hero">
    <div class="hero-eyebrow">{lecture_id} &middot; Software Engineering</div>
    <h1>{title}</h1>
    <p>{subtitle}</p>
  </header>

  <div class="section-tabs">
    <button class="section-tab active" data-target="panel-content">Study Content</button>
    <button class="section-tab" data-target="panel-flash">Flashcards ({flash_count})</button>
    <button class="section-tab" data-target="panel-mcq">MCQs (20)</button>
    <button class="section-tab" data-target="panel-tech">Technical Questions ({tech_count})</button>
  </div>

  <section id="panel-content" class="section-panel active">
    <div id="tldr-box" class="tldr-box"></div>
    <div id="content-body" class="content"></div>
  </section>

  <section id="panel-flash" class="section-panel">
    <div class="quiz-header">
      <div id="flash-counter" class="quiz-score">0 / {flash_count} marked known</div>
      <button id="flash-shuffle" class="btn">Shuffle</button>
      <button id="flash-reset" class="btn">Reset progress</button>
    </div>
    <div id="flash-grid" class="flash-grid"></div>
  </section>

  <section id="panel-mcq" class="section-panel">
    <div id="mcq-panel-top" class="quiz-header">
      <div class="progress-bar"><div id="quiz-progress-fill" class="progress-bar-fill" style="width:0%"></div></div>
      <div id="quiz-score" class="quiz-score">0 / 0 correct</div>
      <button id="quiz-reset" class="btn">Shuffle &amp; reset quiz</button>
    </div>
    <div id="mcq-list"></div>
  </section>

  <section id="panel-tech" class="section-panel">
    <div class="quiz-header">
      <div id="tech-counter" class="quiz-score">0 / {tech_count} marked reviewed</div>
    </div>
    <div id="tech-list"></div>
  </section>

  <footer class="page-footer">
    {prev_link}
    {next_link}
  </footer>
</main>

<script id="lecture-data" type="application/json">{data_json}</script>
<script>
{js}
</script>
</body>
</html>
"""

INDEX_TEMPLATE = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>COS301 Software Engineering — Study Guides (L17-L25)</title>
<style>
{css}
.lecture-grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); margin-top: var(--space-6); }}
.lecture-card {{
  background: var(--surface); border: 1px solid var(--card-border); border-radius: var(--radius-lg);
  padding: var(--space-6); text-decoration: none; display: block; transition: border-color 150ms;
}}
.lecture-card:hover {{ border-color: var(--accent); }}
.lecture-card .id {{ font-family: var(--font-mono); color: var(--accent); font-size: 13px; margin-bottom: var(--space-2); }}
.lecture-card h3 {{ margin: 0 0 var(--space-2); color: var(--text); font-size: 17px; }}
.lecture-card p {{ margin: 0 0 var(--space-3); color: var(--text-dim); font-size: 13.5px; }}
.lecture-card .card-progress-bar {{ height: 5px; background: var(--card); border-radius: 999px; overflow: hidden; }}
.lecture-card .card-progress-fill {{ height: 100%; background: var(--accent); border-radius: 999px; width: 0%; transition: width 300ms; }}
.lecture-card .card-progress-label {{ margin-top: 6px; font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); }}
.overall-progress {{
  background: var(--surface); border: 1px solid var(--card-border); border-radius: var(--radius-lg);
  padding: var(--space-4) var(--space-6); margin-bottom: var(--space-6); display: flex; align-items: center; gap: var(--space-4);
}}
.overall-progress .progress-bar {{ flex: 1; }}
.overall-progress .quiz-score {{ white-space: nowrap; }}
@media (max-width: 640px) {{ .lecture-grid {{ grid-template-columns: 1fr; }} }}
</style>
</head>
<body>
<nav class="topnav">
  <div class="topnav-inner">
    <a href="index.html" class="topnav-brand">COS301 <span>Study Guides</span></a>
    <div class="topnav-links">
      {nav}
    </div>
  </div>
</nav>

<main class="page">
  <header class="hero">
    <div class="hero-eyebrow">COS301 &middot; Software Engineering</div>
    <h1>Class Test Study Guides — L17 to L25</h1>
    <p>Content summaries, flashcards, 20 shuffled MCQs, and 12 in-depth technical questions per lecture. Progress is saved locally in your browser.</p>
  </header>

  <div class="overall-progress">
    <div class="progress-bar"><div id="overall-progress-fill" class="progress-bar-fill" style="width:0%"></div></div>
    <div id="overall-progress-label" class="quiz-score">Loading progress…</div>
  </div>

  <div class="lecture-grid">
    {cards}
  </div>
</main>

<script>
(function () {{
  function get(key) {{
    try {{ const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : null; }} catch (e) {{ return null; }}
  }}
  var cards = document.querySelectorAll(".lecture-card[data-id]");
  var totalPct = 0;
  cards.forEach(function (card) {{
    var id = card.getAttribute("data-id");
    var quiz = get("ct3-quiz-" + id);
    var tech = get("ct3-tech-" + id);
    var flash = get("ct3-flash-" + id);
    var quizAnswered = quiz ? Object.keys(quiz.answers || {{}}).length : 0;
    var quizTotal = quiz ? (quiz.order || []).length : 0;
    var techReviewed = tech ? Object.keys(tech.reviewed || {{}}).filter(function (k) {{ return tech.reviewed[k]; }}).length : 0;
    var techTotal = card.getAttribute("data-tech-total") | 0;
    var flashKnown = flash ? Object.keys(flash.known || {{}}).filter(function (k) {{ return flash.known[k]; }}).length : 0;
    var flashTotal = card.getAttribute("data-flash-total") | 0;
    var doneParts = quizAnswered + techReviewed + flashKnown;
    var totalParts = quizTotal + techTotal + flashTotal;
    var pct = totalParts ? Math.round((doneParts / totalParts) * 100) : 0;
    totalPct += pct;
    var fill = card.querySelector(".card-progress-fill");
    var label = card.querySelector(".card-progress-label");
    if (fill) fill.style.width = pct + "%";
    if (label) label.textContent = pct === 0 ? "Not started" : pct === 100 ? "Complete" : pct + "% complete";
  }});
  var overallFill = document.getElementById("overall-progress-fill");
  var overallLabel = document.getElementById("overall-progress-label");
  var avg = cards.length ? Math.round(totalPct / cards.length) : 0;
  if (overallFill) overallFill.style.width = avg + "%";
  if (overallLabel) overallLabel.innerHTML = "<b>" + avg + "%</b> average progress across all guides";
}})();
</script>
</body>
</html>
"""


def build_lecture(lec):
    data_path = DATA_DIR / f"{lec['id']}.json"
    data = json.loads(data_path.read_text())
    assert data["id"] == lec["id"]

    data_json = json.dumps(data).replace("</", "<\\/")

    prev_link, next_link = prev_next(lec["id"])

    out = PAGE_TEMPLATE.format(
        title=html.escape(data["title"]),
        css=CSS,
        nav=nav_html(lec["id"]),
        lecture_id=lec["id"],
        subtitle=html.escape(data["subtitle"]),
        tech_count=len(data["techQuestions"]),
        flash_count=len(data.get("flashcards", [])),
        prev_link=prev_link,
        next_link=next_link,
        data_json=data_json,
        js=JS,
    )
    (OUT_DIR / f"{lec['id']}.html").write_text(out)
    print(
        f"built {lec['id']}.html  ({len(data['mcqs'])} mcqs, {len(data['techQuestions'])} tech qs, "
        f"{len(data.get('flashcards', []))} flashcards)"
    )


def build_index():
    cards = []
    for lec in LECTURES:
        data_path = DATA_DIR / f"{lec['id']}.json"
        if not data_path.exists():
            continue
        data = json.loads(data_path.read_text())
        tech_total = len(data.get("techQuestions", []))
        flash_total = len(data.get("flashcards", []))
        cards.append(
            f'<a class="lecture-card" href="{lec["id"]}.html" data-id="{lec["id"]}" '
            f'data-tech-total="{tech_total}" data-flash-total="{flash_total}">'
            f'<div class="id">{lec["id"]}</div>'
            f'<h3>{html.escape(data["title"])}</h3>'
            f'<p>{html.escape(data["subtitle"])}</p>'
            f'<div class="card-progress-bar"><div class="card-progress-fill"></div></div>'
            f'<div class="card-progress-label">Not started</div>'
            f"</a>"
        )
    out = INDEX_TEMPLATE.format(css=CSS, nav=nav_html(None), cards="\n".join(cards))
    (OUT_DIR / "index.html").write_text(out)
    print(f"built index.html ({len(cards)} lecture cards)")


if __name__ == "__main__":
    for lec in LECTURES:
        if (DATA_DIR / f"{lec['id']}.json").exists():
            build_lecture(lec)
    build_index()
