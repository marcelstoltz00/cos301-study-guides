/* CT4 practice test: exact-set multi-select grading and isolated local progress. */
(function () {
  "use strict";
  const data = JSON.parse(document.getElementById("test-data").textContent);
  const questions = data.questions;
  const lectureOrder = data.lectures.map((lecture) => lecture.id);
  const lectureTitles = Object.fromEntries(data.lectures.map((lecture) => [lecture.id, lecture.title]));
  const storageKey = data.storageKey;
  const root = document.getElementById("quiz-root");
  const statAnswered = document.getElementById("stat-answered");
  const statCorrect = document.getElementById("stat-correct");
  const statMulti = document.getElementById("stat-multi");
  const showAllBtn = document.getElementById("show-all");
  const hideAllBtn = document.getElementById("hide-all");
  const resetAllBtn = document.getElementById("reset-all");

  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(storageKey);
      const parsed = raw ? JSON.parse(raw) : {};
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
      const clean = {};
      questions.forEach((question) => {
        const saved = parsed[question.id];
        if (!saved || !Array.isArray(saved.selected)) return;
        const selected = [...new Set(saved.selected.filter((index) =>
          Number.isInteger(index) && index >= 0 && index < question.options.length))];
        if (question.type === "single" && selected.length > 1) return;
        const submitted = saved.submitted === true && selected.length > 0;
        clean[question.id] = {
          selected, submitted,
          correct: submitted && isExactMatch(question, selected),
          revealed: saved.revealed === true
        };
      });
      return clean;
    } catch (error) {
      return {};
    }
  }

  function saveState() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch (error) {
      // Ignore private-mode or quota errors.
    }
  }

  function getQuestionState(id) {
    return state[id] || { selected: [], submitted: false, correct: false, revealed: false };
  }

  function setQuestionState(id, next) {
    state[id] = next;
    saveState();
  }

  function isExactMatch(question, selected) {
    const correct = question.correct.slice().sort((a, b) => a - b).join(",");
    const chosen = selected.slice().sort((a, b) => a - b).join(",");
    return correct === chosen;
  }

  function updateStats() {
    const answered = questions.filter((q) => getQuestionState(q.id).submitted).length;
    const correct = questions.filter((q) => getQuestionState(q.id).submitted && getQuestionState(q.id).correct).length;
    const multi = questions.filter((q) => q.type === "multi").length;
    statAnswered.textContent = `${answered} / ${questions.length} answered`;
    statCorrect.textContent = `${correct} / ${questions.length} correct (${Math.round(correct / questions.length * 100)}% of test)`;
    statMulti.textContent = `${multi} multi-select questions`;
  }

  function renderQuestion(question) {
    const card = document.createElement("article");
    card.className = "question-card";
    card.id = question.id;

    const header = document.createElement("header");
    header.innerHTML = `
      <span class="lecture-badge">${question.lecture}</span>
      <span class="type-badge">${question.type === "multi" ? "Multiple Select" : "Multiple Choice"}</span>
    `;
    card.appendChild(header);

    const title = document.createElement("h3");
    title.textContent = `Question ${questions.indexOf(question) + 1}`;
    card.appendChild(title);

    const prompt = document.createElement("p");
    prompt.className = "prompt";
    prompt.textContent = question.prompt;
    card.appendChild(prompt);

    const options = document.createElement("div");
    options.className = "options";

    const buttons = question.options.map((text, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "option-btn";
      button.setAttribute("aria-pressed", "false");
      const letter = document.createElement("span");
      letter.className = "letter";
      letter.textContent = String.fromCharCode(65 + index);
      const label = document.createElement("span");
      label.textContent = text;
      button.append(letter, label);

      button.addEventListener("click", () => {
        const latest = getQuestionState(question.id);
        if (latest.submitted) {
          return;
        }

        let selected = latest.selected.slice();
        if (question.type === "single") {
          selected = [index];
        } else if (selected.includes(index)) {
          selected = selected.filter((item) => item !== index);
        } else {
          selected.push(index);
        }

        setQuestionState(question.id, { ...latest, selected });
        updateQuestion(question.id);
      });

      options.appendChild(button);
      return button;
    });

    card.appendChild(options);

    const actions = document.createElement("div");
    actions.className = "question-actions";

    const submit = document.createElement("button");
    submit.type = "button";
    submit.className = "btn";
    submit.textContent = "Check answer";

    const reset = document.createElement("button");
    reset.type = "button";
    reset.className = "btn";
    reset.textContent = "Reset question";

    const reveal = document.createElement("button");
    reveal.type = "button";
    reveal.className = "btn solution-toggle";
    reveal.textContent = "Show solution";

    actions.appendChild(submit);
    actions.appendChild(reset);
    actions.appendChild(reveal);
    card.appendChild(actions);

    const feedback = document.createElement("div");
    feedback.className = "feedback";
    feedback.setAttribute("aria-live", "polite");
    card.appendChild(feedback);

    function updateButtonStyles() {
      const latest = getQuestionState(question.id);
      buttons.forEach((button, index) => {
        button.classList.remove("selected", "correct", "incorrect", "reveal-correct");
        const selected = latest.selected.includes(index);
        const correct = question.correct.includes(index);

        if (selected) {
          button.classList.add("selected");
        }

        if (latest.submitted) {
          button.disabled = true;
          if (selected && correct) {
            button.classList.add("correct");
          } else if (selected && !correct) {
            button.classList.add("incorrect");
          } else if (correct) {
            button.classList.add("reveal-correct");
          }
        } else {
          button.disabled = false;
        }

        button.setAttribute("aria-pressed", selected ? "true" : "false");
      });

      const solutionVisible = latest.revealed;
      submit.disabled = latest.submitted || latest.selected.length === 0;
      feedback.classList.toggle("visible", latest.submitted || solutionVisible);
      reveal.textContent = solutionVisible ? "Hide solution" : "Show solution";
      reveal.setAttribute("aria-expanded", String(solutionVisible));
      feedback.replaceChildren();
      if (latest.submitted) {
        const result = document.createElement("strong");
        result.textContent = latest.correct ? "Correct. " : "Incorrect. ";
        feedback.appendChild(result);
      }
      if (solutionVisible) {
        const correctLabels = question.correct.map((index) => String.fromCharCode(65 + index)).join(", ");
        const modeLabel = question.type === "multi" ? "Correct options" : "Correct answer";
        feedback.appendChild(document.createTextNode(`${modeLabel}: ${correctLabels}. ${question.explanation}`));
      } else if (latest.submitted) {
        feedback.appendChild(document.createTextNode("Your attempt is recorded. Show the solution to review the explanation, or reset this question to retry."));
      }
    }

    function updateQuestion() {
      updateButtonStyles();
    }

    submit.addEventListener("click", () => {
      const latest = getQuestionState(question.id);
      if (latest.submitted || latest.selected.length === 0) return;
      const correct = isExactMatch(question, latest.selected);
      setQuestionState(question.id, { ...latest, submitted: true, correct, revealed: true });
      updateQuestion();
      updateStats();
    });

    reset.addEventListener("click", () => {
      setQuestionState(question.id, { selected: [], submitted: false, correct: false, revealed: false });
      updateQuestion();
      updateStats();
    });

    reveal.addEventListener("click", () => {
      const latest = getQuestionState(question.id);
      const shouldReveal = !latest.revealed;
      setQuestionState(question.id, { ...latest, revealed: shouldReveal });
      updateQuestion();
    });

    card._update = updateQuestion;
    updateQuestion();
    return card;
  }

  function renderSections() {
    root.innerHTML = "";

    lectureOrder.forEach((lecture) => {
      const section = document.createElement("section");
      section.className = "lecture-section";
      section.id = lecture.toLowerCase();

      const header = document.createElement("header");
      const title = document.createElement("h2");
      const guideLink = document.createElement("a");
      guideLink.href = `${lecture}.html`;
      guideLink.textContent = `${lecture} · ${lectureTitles[lecture]}`;
      title.appendChild(guideLink);
      const subtitle = document.createElement("p");
      const lectureQuestions = questions.filter((question) => question.lecture === lecture);
      const multiCount = lectureQuestions.filter((question) => question.type === "multi").length;
      subtitle.textContent = `${lectureQuestions.length} questions · ${multiCount} multi-select · heading opens study guide`;
      header.appendChild(title);
      header.appendChild(subtitle);

      const grid = document.createElement("div");
      grid.className = "test-grid";

      questions.filter((question) => question.lecture === lecture).forEach((question) => {
        grid.appendChild(renderQuestion(question));
      });

      section.appendChild(header);
      section.appendChild(grid);
      root.appendChild(section);
    });
  }

  function refreshAll() {
    document.querySelectorAll(".question-card").forEach((card) => {
      if (typeof card._update === "function") {
        card._update();
      }
    });
    updateStats();
  }

  showAllBtn.addEventListener("click", () => {
    questions.forEach((question) => {
      state[question.id] = { ...getQuestionState(question.id), revealed: true };
    });
    saveState();
    refreshAll();
  });

  hideAllBtn.addEventListener("click", () => {
    questions.forEach((question) => {
      state[question.id] = { ...getQuestionState(question.id), revealed: false };
    });
    saveState();
    refreshAll();
  });

  resetAllBtn.addEventListener("click", () => {
    state = {};
    saveState();
    renderSections();
    updateStats();
  });

  renderSections();
  updateStats();
})();
