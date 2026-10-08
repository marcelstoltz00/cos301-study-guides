# Assessment-style review: CT3 and ST1

## What was reviewed

The question text, question types, visible mark allocations and displayed options in the supplied `CT3.html` and `ST1.html` exports were reviewed. These are saved assessment/submission fragments, not standalone teaching pages. Displayed student responses and previously selected answers are **not an authoritative answer key** and were not copied into the new memoranda.

Some reference diagrams are external LMS image URLs rather than embedded image data. Their surrounding questions and descriptions were available, but the image contents were not included locally. The new papers therefore use original, self-contained diagrams with explicit assumptions. No login or remote LMS access is needed to use them.

## CT3 → CT4 examples

CT3 contains **16 numbered questions totalling 30 marks**:

| Position | Observed form | Marks |
|---|---|---|
| Q1, Q2, Q5, Q7, Q8, Q10, Q11, Q13 | Eight concise true/false claims, often testing a reversed definition or overstatement | 0.5 each; 4 total |
| Q3 | One architectural diagram with three letter-answer scenario subquestions | 6 |
| Q4 | Image-based “select all that apply” | 2 |
| Q6 | Four-row matching | 4 |
| Q9 | Sentence item labelled “Jumbled sentence” in the export | 2 |
| Q12 | Select valid elements from plausible alternatives | 3 |
| Q14 | Four-row matching of concepts and pitfalls | 4 |
| Q15 | Two-row matching | 1 |
| Q16 | Four-row matching of concepts and practices | 4 |

The export renders Q9 as completed text; it does not preserve enough of the original controls to reconstruct its exact interaction. The new examples use a four-blank sentence with a word bank, preserving the terminology-completion purpose without claiming an exact UI replica.

Both CT4 examples follow the observed question style with content from **L28–L33 plus L35 revision**. Diagram-based questions replace the older UI image with relevant deployment or quality-evidence diagrams. The new distractors test plausible confusions, rather than relying on ambiguous wording or the exported student's answers.

## ST1 → ST2 examples

ST1 contains **11 numbered questions**, in this order:

1. Extended scenario with numbered subparts, named mark allocations and a word limit.
2. Scenario-based domain reasoning with explicit counts of requested items and associations.
3. Matching.
4. Three constrained-choice scenarios, each requiring both a selection and a distinguishing justification; “none of the above” can be meaningful.
5. Evidence/diagram interpretation: identify what happened, cite what proves it, and explain a corrective or recovery procedure.
6. Matching.
7. Select-all question with negative marking explicitly mentioned.
8. Two short scenario-to-term answers.
9. Matching.
10. Longer failure scenario followed by select-all statements about consequences and their reasons, with negative marking.
11. Recommend an architectural approach and provide three scenario-linked reasons.

The visible written subparts account for 36 marks, but the export does **not** display all objective-question mark allocations or an overall total. Each new ST2 example is therefore explicitly an **authored 60-mark practice paper**, not a claim that ST1 had that total. The practice allocations are Q1 10, Q2 10, Q3 4, Q4 6, Q5 5, Q6 4, Q7 5, Q8 2, Q9 5, Q10 4 and Q11 5.

The new papers reuse this assessment structure and command style, not ST1's old topic scope or scenarios. Their questions are drawn from **L17–L35**, including the existing SOA and Microservices guides. Concepts also present in ST1 appear only where they independently belong to these current guides. The two variants sample different situations across that scope; neither is a prediction of the actual test.

## Marking and presentation decisions

- Each objective item has an original explanation. Matching and short-answer subparts split their parent question's marks equally.
- The original negative-marking formula was not visible. The new papers state their own rule: each correct selection earns `question marks / number of correct options`; each incorrect selection deducts the same amount; each question is floored at zero. This rule also makes the CT4 multi-select practice explicit rather than implying an undocumented original scheme.
- Written answers use per-subpart model responses and rubrics. They are **self-assessed**, never automatically declared correct through keyword matching. Credit is available for defensible alternatives under the stated rubric.
- ST1's word-limit instruction included a penalty. The new papers instead use a clearly labelled suggested maximum and a live word count, with no hidden or automatic word-count penalty.
- No official duration was visible, so the new papers do not invent one.
- All four papers support saved local responses, blank-paper printing and separate marking-guide printing. Blank printing suppresses saved responses and model answers. Printing a guide includes the questions and memorandum, without private written drafts.
- The papers retain source limitations: L28/L30 follow supplied notes; L29/L31–L33 use the existing general topic guides. No unavailable lecture-specific detail is presented as established exam coverage.

## New papers

- [CT4 Example 1](ct4-example-1.html): ParcelDesk deployment, failure domains, security, testing, QA and presentation principles.
- [CT4 Example 2](ct4-example-2.html): secure-development techniques, measurement and development approaches.
- [ST2 Example 1](st2-example-1.html): CampusCart quality/access requirements, domain modelling, test selection, queue evidence, contracts and architecture choice.
- [ST2 Example 2](st2-example-2.html): identity/value modelling, recovery controls, topology evidence and generated-workflow review.

## User-supplied extended scenarios → ST2 Examples 3 and 4

The later supplied examples use a flawed demonstration narrative and an architectural failure narrative. Their prompts require specific mistakes with effects/corrections, causal explanations with named NFRs, proposed tactics/patterns and an introduced-cost mitigation. Examples 3 and 4 follow that written reasoning style throughout rather than the earlier ST1 mixed-question format.

Each is an authored 110-mark paper with 11 extended scenarios. Both independently assess every lecture in the available ST2 scope. [The coverage map](st2-scenario-coverage.md) identifies questions, assessed concepts and source limitations. Marks are practice allocations. Answers allow scenario-justified alternatives; written work uses explicit self-assessment rubrics.

- [ST2 Example 3](st2-example-3.html): LabLink — equipment lending, contention, eligibility outages and engineering evidence.
- [ST2 Example 4](st2-example-4.html): RouteReady — dispatch uncertainty, delivery workflows, legacy integration and engineering evidence.
