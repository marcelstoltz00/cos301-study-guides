#!/usr/bin/env python3
"""Generates standalone lecture HTML files + index.html from JSON data files.
Run from anywhere: python3 assets/build.py
All output files embed identical CSS/JS so every lecture shares the exact same
theme and interactive components.
"""
import json
import html
import pathlib
import xml.etree.ElementTree as ET

ROOT = pathlib.Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"
DATA_DIR = ROOT / "data"
OUT_DIR = ROOT
MOCK_PAPERS = ["ct4-example-1", "ct4-example-2", "st2-example-1", "st2-example-2", "st2-example-3", "st2-example-4"]

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
    {"id": "SOA", "nav": "SOA · Service-Oriented Architecture"},
    {"id": "MS", "nav": "MS · Microservices Deep Dive"},
    {"id": "L28", "nav": "L28 · Deployment Diagrams"},
    {"id": "L29", "nav": "L29 · Secure Software Development"},
    {"id": "L30", "nav": "L30 · Quality Assurance & Coding Standards"},
    {"id": "L31", "nav": "L31 · Presentation Skills"},
    {"id": "L32", "nav": "L32 · Non-Functional Testing"},
    {"id": "L33", "nav": "L33 · Low Code, No Code & Vibe Code"},
    {"id": "L35", "nav": "L35 · ST2 Revision"},
]

CSS = (ASSETS / "theme.css").read_text()
JS = (ASSETS / "app.js").read_text()


def nav_html(current_id):
    links = ['<a href="index.html" class="%s">Home</a>' % ("active" if current_id is None else "")]
    links.append('<a href="ct4-practice-test.html">CT4 Practice Test</a>')
    links.append('<a href="slide-explainer.html">Slides Explained</a>')
    links.append('<a href="architecture-atlas.html">Architecture Diagrams</a>')
    links.append('<a href="index.html#practice-papers">Example Papers</a>')
    for lec in LECTURES:
        cls = "active" if lec["id"] == current_id else ""
        links.append(f'<a href="{lec["id"]}.html" class="{cls}">{html.escape(lec["nav"])}</a>')
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
<title>{title} — ST2 Study Guide</title>
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
    <button class="section-tab" data-target="panel-mcq">MCQs ({mcq_count})</button>
    <button class="section-tab" data-target="panel-tech">Technical Questions ({tech_count})</button>
  </div>

  <section id="panel-content" class="section-panel active">
    <div id="tldr-box" class="tldr-box"></div>
    <div id="content-body" class="content"></div>
{sources}
{extra_content}
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
<title>COS301 Software Engineering — ST2 Study Guides (L17–L35)</title>
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
.special-grid {{ display: grid; grid-template-columns: 1fr; gap: var(--space-4); margin-top: var(--space-4); }}
.special-card {{
  background: linear-gradient(180deg, rgba(26, 31, 38, 0.96), rgba(18, 22, 27, 0.96)); border: 1px solid var(--card-border); border-radius: var(--radius-lg);
  padding: var(--space-6); text-decoration: none; display: block; transition: border-color 150ms, transform 150ms;
}}
.special-card:hover {{ border-color: var(--accent); transform: translateY(-1px); }}
.special-card .id {{ font-family: var(--font-mono); color: var(--accent); font-size: 13px; margin-bottom: var(--space-2); }}
.special-card h3 {{ margin: 0 0 var(--space-2); color: var(--text); font-size: 17px; }}
.special-card p {{ margin: 0 0 var(--space-3); color: var(--text-dim); font-size: 13.5px; }}
.special-card .tag {{ display: inline-flex; align-items: center; padding: 4px 8px; border-radius: 999px; background: rgba(74, 144, 248, 0.12); color: #a9c8fb; border: 1px solid rgba(74, 144, 248, 0.25); font-family: var(--font-mono); font-size: 11px; margin-bottom: var(--space-3); }}
.overall-progress {{
  background: var(--surface); border: 1px solid var(--card-border); border-radius: var(--radius-lg);
  padding: var(--space-4) var(--space-6); margin-bottom: var(--space-6); display: flex; align-items: center; gap: var(--space-4);
}}
.overall-progress .progress-bar {{ flex: 1; }}
.overall-progress .quiz-score {{ white-space: nowrap; }}
@media (max-width: 640px) {{
  .lecture-grid {{ grid-template-columns: 1fr; }}
  .overall-progress {{ display: block; }}
  .overall-progress .progress-bar {{ margin-bottom: var(--space-2); }}
  .overall-progress .quiz-score {{ white-space: normal; }}
}}
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
    <h1>ST2 Study Guides — L17 to L35</h1>
    <p>Content summaries, flashcards, 20 shuffled MCQs, and 12 in-depth technical questions per lecture. Progress is saved locally in your browser.</p>
    <p>SOA and Microservices cover the existing L26–L27 material. L28 and L30 follow supplied lecture notes; L29 and L31–L33 are general topic guides. L35 brings the material together for revision.</p>
  </header>

  <div class="overall-progress">
    <div class="progress-bar"><div id="overall-progress-fill" class="progress-bar-fill" style="width:0%"></div></div>
    <div id="overall-progress-label" class="quiz-score">Loading progress…</div>
  </div>

  <div class="lecture-grid">
    {cards}
  </div>

  <section id="practice-papers" class="special-grid" aria-label="Additional practice material">
    {special_cards}
  </section>
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
    var quizTotal = card.getAttribute("data-mcq-total") | 0;
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
        css=CSS + ((ASSETS / "learning.css").read_text() if data.get("learning") else ""),
        nav=nav_html(lec["id"]),
        lecture_id=lec["id"],
        subtitle=html.escape(data["subtitle"]),
        mcq_count=len(data["mcqs"]),
        tech_count=len(data["techQuestions"]),
        flash_count=len(data.get("flashcards", [])),
        prev_link=prev_link,
        next_link=next_link,
        data_json=data_json,
        js=JS + ("\n" + (ASSETS / "learning.js").read_text() if data.get("learning") else ""),
        sources=sources_html(data),
        extra_content=(ASSETS / f"{lec['id']}-extra.html").read_text()
        if (ASSETS / f"{lec['id']}-extra.html").exists() else "",
    )
    (OUT_DIR / f"{lec['id']}.html").write_text(out)
    print(
        f"built {lec['id']}.html  ({len(data['mcqs'])} mcqs, {len(data['techQuestions'])} tech qs, "
        f"{len(data.get('flashcards', []))} flashcards)"
    )


def sources_html(data):
    sources = data.get("sources", [])
    if not sources:
        return ""
    links = "\n".join(
        f'<li><a href="{html.escape(source["url"], quote=True)}">'
        f'{html.escape(source["title"])}</a></li>'
        for source in sources
    )
    return f'<aside class="content" aria-label="Sources and further reading"><h2>Sources and further reading</h2><ul>{links}</ul></aside>'


def build_index():
    cards = []
    for lec in LECTURES:
        data_path = DATA_DIR / f"{lec['id']}.json"
        if not data_path.exists():
            continue
        data = json.loads(data_path.read_text())
        tech_total = len(data.get("techQuestions", []))
        flash_total = len(data.get("flashcards", []))
        mcq_total = len(data["mcqs"])
        cards.append(
            f'<a class="lecture-card" href="{lec["id"]}.html" data-id="{lec["id"]}" '
            f'data-mcq-total="{mcq_total}" data-tech-total="{tech_total}" data-flash-total="{flash_total}">'
            f'<div class="id">{lec["id"]}</div>'
            f'<h3>{html.escape(data["title"])}</h3>'
            f'<p>{html.escape(data["subtitle"])}</p>'
            f'<div class="card-progress-bar"><div class="card-progress-fill"></div></div>'
            f'<div class="card-progress-label">Not started</div>'
            f"</a>"
        )
    special_cards = [
      '<a class="special-card" href="architecture-atlas.html">'
      '<div class="id">ST2 · Draw in draw.io</div>'
      '<div class="tag">20 editable diagrams</div>'
      '<h3>Architecture Drawing Revision</h3>'
      '<p>Learn each diagram with a memory cue, drawing steps, use case and trade-off. Hide diagrams to practise, then download editable draw.io pages.</p>'
      '</a>',
      '<a class="special-card" href="slide-explainer.html">'
      '<div class="id">Every root PDF · Original slides + easy explanations</div>'
      '<div class="tag">358 slides · 12 PDFs</div>'
      '<h3>Every Slide, Explained</h3>'
      '<p>See each original slide beside its plain-language point, explanation and example. Search all lectures, enlarge diagrams and save understood markers.</p>'
      '</a>',
      '<a class="special-card" href="ct4-practice-test.html">'
      '<div class="id">Class Test 4 · L28–L33 + L35</div>'
      '<div class="tag">42 questions</div>'
      '<h3>CT4 Comprehensive Practice Test</h3>'
      '<p>Six questions per lecture, including calculations, scenarios and multi-select. L35 revises L28–L33 only. Separate saved progress and explained answers.</p>'
      '</a>',
      '<a class="special-card" href="comprehensive-test.html">'
      '<div class="id">Practice</div>'
      '<div class="tag">Standalone</div>'
      '<h3>Comprehensive Practice Test</h3>'
      '<p>Interactive review covering L17 to L25, MS, and SOA with working multi-select questions.</p>'
      '</a>'
    ]
    mock_cards = []
    for paper_id in MOCK_PAPERS:
        paper = json.loads((DATA_DIR / f"{paper_id}.json").read_text())
        mock_cards.append(
            f'<a class="special-card" href="{paper_id}.html">'
            f'<div class="id">{html.escape(paper["scope"])}</div>'
            f'<div class="tag">{len(paper["questions"])} questions · {paper["totalMarks"]} marks</div>'
            f'<h3>{html.escape(paper["title"])}</h3>'
            f'<p>{html.escape(paper.get("description", "Original paper in the reference assessment style, with diagrams, matching, marking guides and blank-paper printing."))}</p></a>'
        )
    special_cards = mock_cards + special_cards
    out = INDEX_TEMPLATE.format(css=CSS, nav=nav_html(None), cards="\n".join(cards), special_cards="\n".join(special_cards))
    (OUT_DIR / "index.html").write_text(out)
    print(f"built index.html ({len(cards)} lecture cards, {len(special_cards)} special cards)")


def build_ct4_test():
    data = json.loads((DATA_DIR / "CT4.json").read_text())
    template = (ASSETS / "practice-test.html").read_text()
    replacements = {
        "<!-- GUIDE_LINKS -->": "\n".join(
            f'<a href="{lecture["id"]}.html">{lecture["id"]}</a>'
            for lecture in data["lectures"]
        ),
        "<!-- SECTION_LINKS -->": "\n".join(
            f'<a href="#{lecture["id"].lower()}">{lecture["id"]}</a>'
            for lecture in data["lectures"]
        ),
        "<!-- QUESTION_COUNT -->": str(len(data["questions"])),
        "<!-- MULTI_COUNT -->": str(sum(q["type"] == "multi" for q in data["questions"])),
        "<!-- TEST_DATA -->": json.dumps(data).replace("</", "<\\/"),
        "<!-- TEST_JS -->": (ASSETS / "practice-test.js").read_text(),
    }
    for marker, value in replacements.items():
        template = template.replace(marker, value)
    (OUT_DIR / "ct4-practice-test.html").write_text(template)
    print(f'built ct4-practice-test.html ({len(data["questions"])} questions)')


def build_mock_papers():
    template = (ASSETS / "mock-exam.html").read_text()
    style = (ASSETS / "mock-exam.css").read_text()
    script = (ASSETS / "mock-exam.js").read_text()
    for paper_id in MOCK_PAPERS:
        paper = json.loads((DATA_DIR / f"{paper_id}.json").read_text())
        assert sum(q["marks"] for q in paper["questions"]) == paper["totalMarks"]
        links = "\n".join(
            f'<a href="{other}.html"'
            + (' class="active" aria-current="page"' if other == paper_id else '')
            + f'>{other.replace("-", " ").upper()}</a>'
            for other in MOCK_PAPERS
        )
        replacements = {
            "<!-- TITLE -->": html.escape(paper["title"]),
            "<!-- PAPER_ID -->": paper_id,
            "<!-- PAPER_LINKS -->": links,
            "<!-- THEME -->": CSS,
            "<!-- STYLE -->": style,
            "<!-- DATA -->": json.dumps(paper).replace("</", "<\\/"),
            "<!-- SCRIPT -->": script,
        }
        out = template
        for marker, value in replacements.items():
            out = out.replace(marker, value)
        (OUT_DIR / f"{paper_id}.html").write_text(out)
        build_mock_markdown(paper)
        print(f'built {paper_id}.html ({paper["totalMarks"]} marks)')


def build_mock_markdown(paper):
    lines = [f'# {paper["title"]}', '', f'Scope: {paper["scope"]}. Total: {paper["totalMarks"]} marks.', '',
             paper["notes"], '', paper["multiRule"], '',
             'Written answers are self-assessed using the rubric. Suggested word limits carry no automatic penalty.', '',
             f'[Interactive and printable paper](../{paper["id"]}.html)', '', '## Question paper', '']
    for q in paper["questions"]:
        lines += [f'### Question {q["number"]} — {q["marks"]} marks', '', q["prompt"], '']
        if q.get("diagram"):
            labels = [n.text for n in ET.fromstring(q["diagram"]).iter() if n.tag.endswith('}text') and n.text]
            lines += ['Diagram labels (use the HTML paper for spatial relationships):', '', '```text', *labels, '```', '']
        if q["type"] in ("single", "multi"):
            lines += [f'- {chr(65+i)}. {option}' for i, option in enumerate(q["options"])] + ['']
        elif q["type"] == "essay":
            lines += [part["prompt"] + '\n' for part in q["parts"]]
        else:
            if q["type"] == "matching":
                lines += ['Answer bank: ' + ' · '.join(q["options"]), '']
            lines += [f'{i+1}. {item["prompt"]}' for i, item in enumerate(q["items"])] + ['']
    lines += ['---', '', '## Model answers and marking guide', '']
    for q in paper["questions"]:
        lines += [f'### Question {q["number"]} — {q["marks"]} marks', '']
        if q["type"] in ("single", "multi"):
            lines += ['Correct: ' + ', '.join(chr(65+i) for i in q["correct"]) + '.', '', q["explanation"], '']
        elif q["type"] == "essay":
            for i, part in enumerate(q["parts"]):
                lines += [f'Part {i+1} ({part["marks"]} marks): {part["answer"]}', '']
                lines += ['- ' + line for line in part["rubric"]] + ['']
        else:
            for i, item in enumerate(q["items"]):
                answer = item["answer"] if q["type"] == "matching" else ' / '.join(item["answers"])
                lines += [f'{i+1}. **{answer}** — {item["explanation"]}']
            lines += ['']
    (ROOT / "markdown" / f'{paper["id"]}.md').write_text('\n'.join(lines) + '\n')


if __name__ == "__main__":
    for lec in LECTURES:
        if (DATA_DIR / f"{lec['id']}.json").exists():
            build_lecture(lec)
    build_ct4_test()
    build_mock_papers()
    build_index()
    if (ROOT / 'slide-explainer' / 'extracted.json').exists():
        from build_slide_explainer import build as build_slides
        build_slides()
