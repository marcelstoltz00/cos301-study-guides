/* Guided diagrams and local experiments; no network calls or quiz-state writes. */
(function () {
  'use strict';
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const format = (value, digits = 2) => value.toLocaleString('en', { maximumFractionDigits: digits });
  const button = (text, action) => {
    const b = el('button', 'btn', text); b.type = 'button'; b.addEventListener('click', action); return b;
  };
  function paragraph(parent, text, className) { const p = el('p', className || '', text); parent.append(p); return p; }
  function result(panel, title, ...notes) {
    panel.replaceChildren(el('strong', '', title)); notes.forEach(note => paragraph(panel, note));
  }
  let fieldId = 0;
  function select(form, label, options, initial) {
    const field = el('div', 'learning-field'); const caption = el('label', '', label);
    const input = el('select'); input.id = `learning-control-${fieldId++}`; caption.htmlFor = input.id; field.append(caption);
    options.forEach(([value, text]) => { const o = el('option', '', text); o.value = value; input.append(o); });
    if (initial !== undefined) input.value = initial;
    field.append(input); form.append(field); return input;
  }
  function number(form, label, initial, min, max, step = 1) {
    const field = el('div', 'learning-field'); const caption = el('label', '', label);
    const input = el('input'); Object.assign(input, { type: 'number', value: String(initial), min: String(min), max: String(max), step: String(step) });
    input.id = `learning-control-${fieldId++}`; caption.htmlFor = input.id; field.append(caption);
    field.append(input); form.append(field); return input;
  }
  function toggle(form, label, checked = false) {
    const field = el('label', 'learning-check-label'); const input = el('input'); input.type = 'checkbox'; input.checked = checked;
    field.append(input, el('span', '', label)); form.append(field); return input;
  }
  function values(inputs, output, viz) {
    if (inputs.some(input => input.value.trim() === '' || !input.validity.valid || !Number.isFinite(input.valueAsNumber))) {
      result(output, 'Enter a valid value in every field.', 'Use the displayed units and the allowed range; the previous calculation has been cleared.');
      output.classList.add('learning-error'); if (viz) viz.replaceChildren(); return null;
    }
    output.classList.remove('learning-error'); return inputs.map(input => input.valueAsNumber);
  }
  function bind(form, draw) { form.addEventListener('input', draw); form.addEventListener('change', draw); draw(); }
  function meter(parent, fraction, label) {
    const bar = el('div', 'learning-meter'); bar.setAttribute('role', 'img'); bar.setAttribute('aria-label', label);
    const fill = el('span'); fill.style.width = `${Math.min(100, Math.max(0, fraction * 100))}%`; bar.append(fill); parent.append(bar);
  }
  function component(parent, label, alive, detail) {
    const box = el('div', `learning-component${alive ? '' : ' offline'}`, `${alive ? 'Available' : 'Unavailable'} · ${label}`);
    box.append(el('small', '', detail)); parent.append(box);
  }
  function deployment(form, output, viz) {
    const placement = select(form, 'Replica placement', [['single', 'One host in Zone A'], ['hosts', 'Two hosts in Zone A'], ['zones', 'Hosts in two zones']], 'single');
    const failure = select(form, 'Failure to simulate', [['none', 'No failure'], ['host', 'Host A fails'], ['zone', 'Zone A fails'], ['region', 'Whole region fails']], 'host');
    bind(form, () => {
      const spread = placement.value !== 'single'; const crossZone = placement.value === 'zones';
      const a = failure.value === 'none';
      const b = failure.value === 'none' || (spread && failure.value === 'host') || (crossZone && failure.value === 'zone');
      const apiCount = Number(a) + Number(b); const state = a || (spread && b);
      viz.replaceChildren(); viz.className = 'learning-viz learning-domains';
      const left = el('div', 'learning-domain'); left.append(el('h4', '', 'Region R / Zone A / Host A'));
      component(left, 'API 1', a, 'One running instance'); component(left, 'Primary DB', a, 'Primary before the failure');
      viz.append(left);
      if (spread) {
        const right = el('div', 'learning-domain'); right.append(el('h4', '', `Region R / Zone ${crossZone ? 'B' : 'A'} / Host B`));
        component(right, 'API 2', b, 'Different host from API 1');
        component(right, 'DB standby', b, 'Promotion must be configured and tested'); viz.append(right);
      } else {
        left.style.gridColumn = '1 / -1';
        component(left, 'API 2', b, 'Shares Host A with API 1 and the primary DB');
        paragraph(left, 'No standby in this placement. All three components share this one host boundary.');
      }
      result(output, `${apiCount} API instance${apiCount === 1 ? '' : 's'} survives; ${state ? 'a database copy survives' : 'no database copy survives'}.`,
        apiCount && state ? (a ? 'The model retains a request path to the primary.' : 'The model has potential service capacity after standby promotion and client reconnection. It does not predict the time to restore service.') : 'This model has no complete surviving application-and-state path. Adding only API instances cannot fix a missing state dependency.',
        'Assumptions: both hosts share Region R; each spread placement includes a standby. Entry points, network failures, replication lag and backup restoration are outside this model.');
    });
  }
  function access(form, output, viz) {
    const caller = select(form, 'Caller', [['anonymous', 'No verified session'], ['owner', 'Student: record owner'], ['other', 'Student: another person'], ['tutor', 'Tutor assigned to this module'], ['unassigned', 'Tutor not assigned to this module']], 'owner');
    const action = select(form, 'Requested action', [['read', 'Read the result'], ['write', 'Amend the result']]);
    const policy = select(form, 'Permission service', [['up', 'Available'], ['down', 'Unavailable']]);
    bind(form, () => {
      const identified = caller.value !== 'anonymous';
      const allowed = identified && policy.value === 'up' && (caller.value === 'tutor' || (caller.value === 'owner' && action.value === 'read'));
      viz.replaceChildren();
      component(viz, 'Authentication', identified, identified ? 'A verified identity exists.' : 'No verified identity; protected access stops here.');
      component(viz, 'Authorisation', allowed, !identified ? 'Not evaluated for protected access without identity.' : policy.value === 'down' ? 'Required decision is unavailable: fail closed.' : allowed ? 'The scenario policy permits this action and resource.' : 'The identity exists, but this action or resource is outside its permitted scope.');
      result(output, allowed ? 'Allow under this scenario policy.' : 'Deny the protected operation.',
        allowed ? 'Continue with validation and safe implementation; passing authorisation does not prove the submitted data or query is safe.' : 'A hidden UI control, encrypted connection or well-formed record ID would not change this permission result.',
        'This is an illustrative policy, not a rule inferred for every university system.');
    });
  }
  function reliability(form, output, viz) {
    const uptime = number(form, 'MTTF — hours operating (1–100,000)', 200, 1, 100000, .1);
    const repair = number(form, 'MTTR — hours repairing (0–10,000)', 4, 0, 10000, .1);
    bind(form, () => {
      const nums = values([uptime, repair], output, viz); if (!nums) return;
      const [u, r] = nums; const cycle = u + r; const ratio = u / cycle;
      viz.replaceChildren(); meter(viz, ratio, `${format(ratio * 100, 4)}% of the modelled cycle is operating time`);
      paragraph(viz, `Operating ${format(ratio * 100, 4)}% · repairing ${format((1 - ratio) * 100, 4)}%`);
      result(output, `Availability ≈ ${format(ratio * 100, 4)}%`,
        `MTBF = ${format(u)} + ${format(r)} = ${format(cycle)} h. Availability = ${format(u)} / ${format(cycle)} × 100.`,
        `At this ratio, a 30-day (720-hour) interval corresponds to about ${format(720 * (1 - ratio), 3)} h unavailable. This is a model projection, not an observed outage count or a service guarantee.`,
        'Try MTTF 200 and MTTR 1: availability improves through faster recovery even though mean operating time has not changed. Zero repair time is an idealised mathematical boundary.');
    });
  }
  function presentation(form, output, viz) {
    const fields = [number(form, 'Problem + requirements — minutes', 2, 0, 20, .5), number(form, 'Design + demo — minutes', 5, 0, 20, .5), number(form, 'Evidence + limitations — minutes', 2, 0, 20, .5), number(form, 'Conclusion + next step — minutes', 1, 0, 20, .5)];
    bind(form, () => {
      const nums = values(fields, output, viz); if (!nums) return;
      const total = nums.reduce((a, b) => a + b, 0); viz.replaceChildren();
      meter(viz, total / 10, `${format(total)} of 10 minutes allocated`);
      const gaps = [];
      if (nums[0] === 0) gaps.push('Without the problem or requirements, the design has no stated purpose.');
      if (nums[1] === 0) gaps.push('Make time to explain how the solution works and show relevant behaviour.');
      if (nums[2] === 0) gaps.push('A demo alone is weak support for broad claims: reserve time for measurements and limitations.');
      if (nums[3] === 0) gaps.push('Protect a brief conclusion and a clear next step.');
      result(output, total > 10 ? `${format(total - 10)} min over the ten-minute budget.` : `${format(10 - total)} min unallocated.`,
        `Allocated: ${format(total)} min. Include transitions and setup in rehearsal; this allocation does not predict actual speaking time.`,
        ...(gaps.length ? gaps : ['All four parts have time allocated. Rehearse aloud to verify that the argument is coherent and fits.']),
        total > 10 ? 'Cut optional implementation detail or move it to an appendix; avoid removing all evidence or the conclusion.' : 'Check whether questions belong inside the actual course time limit before using spare time.');
    });
  }
  function latency(form, output, viz) {
    const count = number(form, 'Slow requests out of 20 (0–20)', 1, 0, 20);
    const delay = number(form, 'Slow-request latency — ms (100–5,000)', 2000, 100, 5000, 100);
    bind(form, () => {
      const nums = values([count, delay], output, viz); if (!nums) return;
      const [n, slow] = nums; const samples = Array.from({length: 20}, (_, i) => i < 20 - n ? 100 : slow);
      const mean = samples.reduce((a, b) => a + b, 0) / 20; const p95 = samples[Math.ceil(.95 * samples.length) - 1];
      viz.replaceChildren(); const bars = el('div', 'learning-bars'); bars.setAttribute('role', 'img'); bars.setAttribute('aria-label', `${20 - n} requests at 100 ms and ${n} requests at ${slow} ms, sorted by latency. Fixed scale from 0 to 5000 ms.`);
      samples.forEach(value => { const bar = el('span', `learning-bar${value > 100 ? ' slow' : ''}`); bar.style.height = `${value / 5000 * 100}%`; bar.title = `${value} ms`; bars.append(bar); }); viz.append(bars);
      paragraph(viz, 'Sorted requests: each bar is one observation. Fixed vertical scale: 0–5,000 ms. Blue = 100 ms; amber = slower.');
      result(output, `Mean ${format(mean)} ms · p95 ${format(p95)} ms · maximum ${format(Math.max(...samples))} ms`,
        `Nearest-rank p95 is sorted observation ceil(0.95 × 20) = 19. With one slow observation it can remain 100 ms; with two slow observations it rises to the slow value.`,
        'These 20 observations are deliberately small and all successful. A real test also needs enough samples, workload and environment context, error accounting and throughput.');
    });
  }
  function approach(form, output, viz) {
    form.className = '';
    const standard = toggle(form, 'The workflow fits supported forms, approvals and connectors.', true);
    const custom = toggle(form, 'The critical behaviour needs specialised logic or tight runtime control.');
    const exportable = toggle(form, 'Runnable behaviour must be portable to another platform.');
    const critical = toggle(form, 'The app handles sensitive data or important business effects.', true);
    bind(form, () => {
      viz.replaceChildren();
      const title = custom.checked ? 'Investigate a custom extension or custom implementation.' : standard.checked ? 'A visual implementation is a candidate to evaluate.' : 'Establish workflow fit before selecting the approach.';
      result(output, title,
        custom.checked ? 'Identify the exact behaviour outside the supported model. A prototype or benchmark should test whether an extension can satisfy it; do not assume platform abstractions expose every needed control.' : standard.checked ? 'Supported building blocks may reduce implementation effort, but test the workflow’s exceptions and the real integration boundary.' : 'List the required operations and exceptions, then verify that the platform can express them.',
        exportable.checked ? 'Portability constraint: test export of executable workflows, permissions and dependencies, not only records. Include migration effort in the decision.' : 'Even without a strict portability requirement, document ownership and an acceptable data-recovery/exit path.',
        critical.checked ? 'Sensitive or consequential workflow: independently verify access scope, connector privileges, retries and recovery before release.' : 'Even a low-impact prototype needs accurate scope and an owner before becoming a maintained dependency.',
        'An AI assistant can help create either kind of implementation. Tool origin does not remove the need to inspect, understand and verify it.');
    });
  }
  function buffer(form, output, viz) {
    const rate = number(form, 'Event rate — events/s (0–100,000)', 50, 0, 100000);
    const size = number(form, 'Payload per event — bytes (1–1,000,000)', 200, 1, 1000000);
    const duration = number(form, 'Offline duration — minutes (0–10,080)', 60, 0, 10080);
    const overhead = number(form, 'Assumed storage overhead — % (0–500)', 25, 0, 500);
    const capacity = number(form, 'Available buffer — decimal MB (1–100,000)', 64, 1, 100000);
    bind(form, () => {
      const nums = values([rate, size, duration, overhead, capacity], output, viz); if (!nums) return;
      const [r, s, d, o, c] = nums; const raw = r * s * d * 60; const adjusted = raw * (1 + o / 100); const mb = adjusted / 1e6;
      const perSecond = r * s * (1 + o / 100); const fullMinutes = perSecond ? c * 1e6 / perSecond / 60 : null;
      viz.replaceChildren(); meter(viz, mb / c, `${format(mb)} MB needed for ${format(c)} MB capacity`);
      paragraph(viz, `${format(mb / c * 100)}% of capacity required (bar capped at 100%).`);
      result(output, mb > c ? `Does not fit: ${format(mb - c)} MB over capacity.` : `Fits this estimate: ${format(c - mb)} MB remaining.`,
        `Raw payload = ${format(r)} × ${format(s)} × ${format(d * 60)} = ${format(raw, 0)} bytes (${format(raw / 1e6)} MB). With ${format(o)}% assumed overhead: ${format(mb)} MB.`,
        fullMinutes === null ? 'At zero event rate this model does not fill the buffer.' : `Starting empty at a constant rate, the estimated buffer fills after ${format(fullMinutes)} minutes.`,
        'Assumptions: no events drain while offline, fixed event size and a chosen overhead. Real storage metadata, retries and safety margin need measurement. Define backpressure or a justified overflow policy.');
    });
  }
  const revisionCases = [
    {label: 'Recovery after a zone failure', choices: ['A diagram showing two API replicas, with no state details.', 'A controlled zone-failure test measuring usable-service recovery and preserved writes.', 'A screenshot of both instances running before the failure.'], correct: 1, explanations: ['The placement may help, but state dependencies and actual recovery remain unverified.', 'This supplies relevant observations for RTO, RPO and integrity under the tested scenario. Compare them with targets and record remaining dependencies.', 'Pre-failure health is not evidence of recovery after a failure.']},
    {label: 'A student cannot read another student’s result', choices: ['The result ID is a long random string.', 'The admin button is hidden.', 'Direct requests under several identities exercise server-side object permissions.'], correct: 2, explanations: ['Unpredictable IDs do not enforce permission.', 'UI visibility does not establish server-side access control.', 'Positive and negative object-access tests support this specific claim. Include role, tenant and failure cases rather than only an administrator account.']},
    {label: 'The checkout meets a performance target', choices: ['A documented workload meets latency and error criteria in a stated environment.', 'The application is hosted in the cloud.', 'A single local request returned quickly.'], correct: 0, explanations: ['This connects conditions and observations to the acceptance rules. Its conclusion is still bounded by the workload and environment tested.', 'Cloud placement is not a measured capacity result.', 'One request does not establish expected-load behaviour or tail latency.']}
  ];
  function revision(form, output, viz) {
    const claim = select(form, 'Claim to evaluate', revisionCases.map((c, i) => [String(i), c.label]));
    const choices = el('div'); form.after(choices);
    const draw = () => {
      const c = revisionCases[Number(claim.value)]; choices.replaceChildren(); viz.replaceChildren();
      result(output, 'Choose the evidence before reading the explanation.', 'A mechanism, a diagram and a measured result support different kinds of claims.');
      c.choices.forEach((text, i) => { const b = button(text, () => {
        choices.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', 'false')); b.setAttribute('aria-pressed', 'true');
        result(output, i === c.correct ? 'Appropriate evidence for this claim.' : 'This evidence is insufficient.', c.explanations[i]);
      }); b.classList.add('learning-node'); b.style.marginBottom = '10px'; b.setAttribute('aria-pressed', 'false'); choices.append(b); });
    };
    bind(form, draw);
  }
  const labs = {deployment, access, reliability, presentation, latency, approach, buffer, revision};
  function walkthrough(parent, lesson) {
    const flow = el('ol', 'learning-flow'); flow.setAttribute('aria-label', 'Select a stage in the diagram');
    const detail = el('div', 'learning-step'); detail.setAttribute('aria-live', 'polite');
    let current = 0; const nodes = [];
    const controls = el('div', 'learning-controls');
    const previous = button('Previous step', () => show(current - 1));
    const next = button('Next step', () => show(current + 1));
    const position = el('span', 'learning-position'); controls.append(previous, position, next);
    function show(index) {
      current = Math.max(0, Math.min(lesson.steps.length - 1, index));
      const s = lesson.steps[current]; nodes.forEach((node, i) => node.setAttribute('aria-pressed', String(i === current)));
      detail.replaceChildren(el('h3', '', s.title)); paragraph(detail, s.explanation);
      paragraph(detail, `Example: ${s.example}`); paragraph(detail, `Common trap: ${s.trap}`, 'learning-trap');
      previous.disabled = current === 0; next.disabled = current === lesson.steps.length - 1;
      position.textContent = `Step ${current + 1} of ${lesson.steps.length}`;
    }
    lesson.steps.forEach((s, i) => {
      const item = el('li'); const node = button('', () => show(i)); node.className = 'learning-node';
      node.append(el('span', '', String(i + 1).padStart(2, '0')), el('span', '', s.label)); nodes.push(node); item.append(node); flow.append(item);
    });
    parent.append(flow, detail, controls); show(0);
    const all = el('details'); all.append(el('summary', '', 'Read the whole walkthrough'));
    lesson.steps.forEach(s => { all.append(el('h3', '', s.title)); paragraph(all, s.explanation); paragraph(all, `Example: ${s.example}`); paragraph(all, `Common trap: ${s.trap}`); });
    parent.append(all);
  }
  function checks(parent, lesson, id) {
    lesson.checks.forEach((c, i) => {
      const box = el('div', 'learning-check'); const fieldset = el('fieldset'); fieldset.append(el('legend', '', `Predict ${i + 1}: ${c.prompt}`));
      let selected = null; const feedback = el('div', 'learning-feedback'); feedback.hidden = true; feedback.setAttribute('aria-live', 'polite');
      const submit = button('Check reasoning', () => {
        if (selected === null) return;
        feedback.hidden = false; feedback.textContent = `${selected === c.correct ? 'Correct. ' : 'Try again. '}${c.feedback[selected].replace(/^Correct\.\s*/, '')}`;
      }); submit.disabled = true;
      c.options.forEach((text, index) => {
        const label = el('label', 'learning-choice'); const radio = el('input'); radio.type = 'radio'; radio.name = `${id}-predict-${i}`;
        radio.addEventListener('change', () => { selected = index; submit.disabled = false; feedback.hidden = true; });
        label.append(radio, el('span', '', text)); fieldset.append(label);
      });
      box.append(fieldset, submit, feedback); parent.append(box);
    });
  }
  document.addEventListener('DOMContentLoaded', () => {
    const dataNode = document.getElementById('lecture-data'); if (!dataNode) return;
    const data = JSON.parse(dataNode.textContent); const lesson = data.learning; if (!lesson || !labs[lesson.lab]) return;
    const content = document.getElementById('content-body');
    const section = el('section', 'learning'); section.id = 'guided-learning'; section.setAttribute('aria-labelledby', 'learning-title');
    section.append(el('div', 'learning-kicker', 'Explore · predict · explain'));
    const title = el('h2', '', lesson.title); title.id = 'learning-title'; section.append(title); paragraph(section, lesson.intro, 'learning-intro');
    walkthrough(section, lesson);
    section.append(el('h3', '', lesson.labTitle)); paragraph(section, lesson.labIntro, 'learning-intro');
    const form = el('div', 'learning-form'); const viz = el('div', 'learning-viz'); const output = el('div', 'learning-result'); output.setAttribute('aria-live', 'polite'); output.setAttribute('aria-atomic', 'true');
    section.append(form, viz, output); labs[lesson.lab](form, output, viz);
    const defaults = [...form.querySelectorAll('input, select')].map(input => ({input, value: input.value, checked: input.checked}));
    const reset = button('Reset experiment', () => {
      defaults.forEach(({input, value, checked}) => { input.value = value; if (input.type === 'checkbox') input.checked = checked; });
      form.dispatchEvent(new Event('input', {bubbles: true}));
    });
    section.append(reset); checks(section, lesson, data.id);
    const heading = [...content.querySelectorAll('h2')].find(h => h.textContent === lesson.before);
    if (heading) heading.before(section); else content.append(section);
    const jump = el('a', 'learning-jump', `Explore this topic: guided diagram, ${lesson.labTitle.toLowerCase()}, and two reasoning checks →`); jump.href = '#guided-learning'; content.prepend(jump);
  });
})();
