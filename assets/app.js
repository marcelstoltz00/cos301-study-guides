/* ============================================================
   CT3 Study Guides — shared app engine
   Identical across every lecture file. Reads window.LECTURE_DATA.
   ============================================================ */

(function () {
  "use strict";

  /* ---------------- tiny markdown renderer ---------------- */
  /* Supports: ## / ### headers, **bold**, `code`, ```fenced code```,
     GFM pipe tables, "- " unordered lists, "---" hr, paragraphs. */

  function escapeHtml(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function inline(s) {
    let out = escapeHtml(s);
    out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
    out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    return out;
  }

  function renderTable(rows) {
    const header = rows[0];
    const body = rows.slice(2);
    const cell = (r) =>
      r
        .trim()
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((c) => c.trim());
    let html = "<table><thead><tr>";
    cell(header).forEach((c) => (html += `<th>${inline(c)}</th>`));
    html += "</tr></thead><tbody>";
    body.forEach((r) => {
      html += "<tr>";
      cell(r).forEach((c) => (html += `<td>${inline(c)}</td>`));
      html += "</tr>";
    });
    html += "</tbody></table>";
    return html;
  }

  function renderMarkdown(md) {
    const lines = md.replace(/\r\n/g, "\n").split("\n");
    let html = "";
    let i = 0;
    let para = [];

    function flushPara() {
      if (para.length) {
        html += `<p>${inline(para.join(" "))}</p>`;
        para = [];
      }
    }

    while (i < lines.length) {
      const line = lines[i];

      if (/^```/.test(line)) {
        flushPara();
        const lang = line.replace(/^```/, "").trim();
        const code = [];
        i++;
        while (i < lines.length && !/^```/.test(lines[i])) {
          code.push(lines[i]);
          i++;
        }
        html += `<pre><code class="lang-${escapeHtml(lang || "text")}">${escapeHtml(
          code.join("\n")
        )}</code></pre>`;
        i++;
        continue;
      }

      if (/^\s*\|/.test(line) && i + 1 < lines.length && /^\s*\|?\s*-+\s*(\|\s*-+\s*)*\|?\s*$/.test(lines[i + 1])) {
        flushPara();
        const rows = [];
        while (i < lines.length && /^\s*\|/.test(lines[i])) {
          rows.push(lines[i]);
          i++;
        }
        html += renderTable(rows);
        continue;
      }

      if (/^###\s+/.test(line)) {
        flushPara();
        html += `<h3>${inline(line.replace(/^###\s+/, ""))}</h3>`;
        i++;
        continue;
      }

      if (/^##\s+/.test(line)) {
        flushPara();
        html += `<h2>${inline(line.replace(/^##\s+/, ""))}</h2>`;
        i++;
        continue;
      }

      if (/^-\s+/.test(line)) {
        flushPara();
        const items = [];
        while (i < lines.length && /^-\s+/.test(lines[i])) {
          items.push(lines[i].replace(/^-\s+/, ""));
          i++;
        }
        html += "<ul>" + items.map((it) => `<li>${inline(it)}</li>`).join("") + "</ul>";
        continue;
      }

      if (/^---+\s*$/.test(line)) {
        flushPara();
        html += "<hr>";
        i++;
        continue;
      }

      if (line.trim() === "") {
        flushPara();
        i++;
        continue;
      }

      para.push(line.trim());
      i++;
    }
    flushPara();
    return html;
  }

  /* ---------------- utils ---------------- */

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function storageGet(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function storageSet(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      /* ignore quota / private-mode errors */
    }
  }

  /* ---------------- tabs ---------------- */

  function initTabs() {
    const tabs = document.querySelectorAll(".section-tab");
    const panels = document.querySelectorAll(".section-panel");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        panels.forEach((p) => p.classList.remove("active"));
        tab.classList.add("active");
        document.getElementById(tab.dataset.target).classList.add("active");
        window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
      });
    });
  }

  /* ---------------- content ---------------- */

  function renderContent(data) {
    const el = document.getElementById("content-body");
    if (el) el.innerHTML = renderMarkdown(data.contentMarkdown);
  }

  /* ---------------- MCQ engine ---------------- */

  function mcqStorageKey(id) {
    return `ct3-quiz-${id}`;
  }

  function newMcqState(data) {
    const ids = data.mcqs.map((q) => q.id);
    const order = shuffle(ids);
    const optionOrder = {};
    data.mcqs.forEach((q) => {
      optionOrder[q.id] = shuffle(q.options.map((_, idx) => idx));
    });
    return { order, optionOrder, answers: {} };
  }

  function initQuiz(data) {
    const key = mcqStorageKey(data.id);
    let state = storageGet(key);
    if (!state || !state.order || state.order.length !== data.mcqs.length) {
      state = newMcqState(data);
      storageSet(key, state);
    }

    const byId = {};
    data.mcqs.forEach((q) => (byId[q.id] = q));

    const list = document.getElementById("mcq-list");
    const scoreEl = document.getElementById("quiz-score");
    const barEl = document.getElementById("quiz-progress-fill");
    const total = data.mcqs.length;

    function updateScore() {
      const answeredIds = Object.keys(state.answers);
      const correctCount = answeredIds.filter((id) => state.answers[id].correct).length;
      scoreEl.innerHTML = `<b>${correctCount}</b> / ${answeredIds.length} correct &nbsp;·&nbsp; ${answeredIds.length} / ${total} answered`;
      barEl.style.width = `${(answeredIds.length / total) * 100}%`;
    }

    function renderQuestion(qid, displayIndex) {
      const q = byId[qid];
      const wrap = document.createElement("div");
      wrap.className = "mcq-card";
      const already = state.answers[qid];

      const qEl = document.createElement("p");
      qEl.className = "mcq-q";
      qEl.innerHTML = `<span class="mcq-index">${displayIndex + 1}.</span><span>${inline(q.q)}</span>`;
      wrap.appendChild(qEl);

      const optsWrap = document.createElement("div");
      optsWrap.className = "mcq-options";

      const order = state.optionOrder[qid];
      order.forEach((origIdx) => {
        const btn = document.createElement("button");
        btn.className = "mcq-option";
        btn.innerHTML = inline(q.options[origIdx]);
        btn.disabled = !!already;

        if (already) {
          if (origIdx === q.correct) btn.classList.add("correct");
          else if (origIdx === already.chosen) btn.classList.add("incorrect");
        }

        btn.addEventListener("click", () => {
          if (state.answers[qid]) return;
          const correct = origIdx === q.correct;
          state.answers[qid] = { chosen: origIdx, correct };
          storageSet(mcqStorageKey(data.id), state);

          Array.from(optsWrap.children).forEach((b) => (b.disabled = true));
          if (correct) {
            btn.classList.add("correct");
          } else {
            btn.classList.add("incorrect");
            Array.from(optsWrap.children)[order.indexOf(q.correct)].classList.add("reveal-correct");
          }
          expl.classList.add("show");
          updateScore();
        });

        optsWrap.appendChild(btn);
      });

      wrap.appendChild(optsWrap);

      const expl = document.createElement("div");
      expl.className = "mcq-explanation" + (already ? " show" : "");
      expl.innerHTML = `<b>Why:</b> ${inline(q.explanation)}`;
      wrap.appendChild(expl);

      return wrap;
    }

    function render() {
      list.innerHTML = "";
      state.order.forEach((qid, idx) => list.appendChild(renderQuestion(qid, idx)));
      updateScore();
    }

    document.getElementById("quiz-reset").addEventListener("click", () => {
      state = newMcqState(data);
      storageSet(key, state);
      render();
      document.getElementById("mcq-panel-top").scrollIntoView({ behavior: "smooth" });
    });

    render();
  }

  /* ---------------- technical questions engine ---------------- */

  function techStorageKey(id) {
    return `ct3-tech-${id}`;
  }

  function initTech(data) {
    const key = techStorageKey(data.id);
    let state = storageGet(key) || { reviewed: {} };

    const list = document.getElementById("tech-list");
    const counterEl = document.getElementById("tech-counter");
    const total = data.techQuestions.length;

    function updateCounter() {
      const n = Object.keys(state.reviewed).filter((k) => state.reviewed[k]).length;
      counterEl.innerHTML = `<b>${n}</b> / ${total} marked reviewed`;
    }

    data.techQuestions.forEach((tq, idx) => {
      const wrap = document.createElement("div");
      wrap.className = "tech-card";

      const row = document.createElement("div");
      row.className = "tech-q-row";

      const qEl = document.createElement("p");
      qEl.className = "tech-q";
      qEl.innerHTML = `<span class="mcq-index">${idx + 1}.</span><span>${inline(tq.q)}</span>`;
      row.appendChild(qEl);

      const label = document.createElement("label");
      label.className = "tech-reviewed-label";
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = !!state.reviewed[tq.id];
      cb.addEventListener("change", () => {
        state.reviewed[tq.id] = cb.checked;
        storageSet(key, state);
        updateCounter();
      });
      label.appendChild(cb);
      label.appendChild(document.createTextNode("reviewed"));
      row.appendChild(label);

      wrap.appendChild(row);

      const revealBtn = document.createElement("button");
      revealBtn.className = "btn reveal-btn";
      revealBtn.textContent = "Reveal model answer";

      const answerEl = document.createElement("div");
      answerEl.className = "tech-answer";
      answerEl.innerHTML = renderMarkdown(tq.answer);

      revealBtn.addEventListener("click", () => {
        const showing = answerEl.classList.toggle("show");
        revealBtn.textContent = showing ? "Hide model answer" : "Reveal model answer";
      });

      wrap.appendChild(revealBtn);
      wrap.appendChild(answerEl);
      list.appendChild(wrap);
    });

    updateCounter();
  }

  /* ---------------- boot ---------------- */

  document.addEventListener("DOMContentLoaded", () => {
    const dataEl = document.getElementById("lecture-data");
    if (!dataEl) return;
    const data = JSON.parse(dataEl.textContent);
    initTabs();
    renderContent(data);
    initQuiz(data);
    initTech(data);
  });
})();
