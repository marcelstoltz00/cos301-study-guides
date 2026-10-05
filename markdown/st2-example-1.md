# ST2 Example 1

Scope: L17–L33 and L35, including SOA and Microservices. Total: 51 marks.

Original practice paper based on the reference assessment style. Not an official paper or prediction. No official duration was available in the supplied export.

Each correct selection earns the question marks divided by the number of correct options. Each incorrect selection deducts the same amount. Omitted options earn zero. Each question is floored at zero. This explicit practice rule is not asserted to be the original marking formula.

Written answers are self-assessed using the rubric. Suggested word limits carry no automatic penalty.

[Interactive and printable paper](../st2-example-1.html)

## Question paper

### Question 1 — 10 marks

Scenario: You are the architect for CampusCart, a university marketplace. Students buy equipment, staff resolve disputes, and an external provider processes payments. Orders may remain pending during a short worker outage. A student must not read another student’s order. During a defined 30-minute peak test at 150 checkout requests/s, the team wants at most 500 ms p95 latency and less than 1% failed requests. Provide a clear, numbered answer addressing every subpart. Suggested maximum: 250 words.

1. Identify the quality concern addressed by the latency/error requirement, and name two measurement conditions that must be recorded. (3 marks)

2. State one authentication rule and one object-authorisation rule for order access; explain why one does not replace the other. (4 marks)

3. Propose three verification activities, each linked to a different requirement in the scenario. (3 marks)

### Question 2 — 10 marks

A library lends equipment kits. Each kit has a persistent asset number and can be loaned to only one borrower at a time. A borrower may have multiple historical loans. Each loan identifies exactly one kit and one borrower, and records checkout and due dates. A kit can contain several replaceable accessories; an accessory can exist in stock without belonging to a kit. Staff members inspect returned kits. Separate your answers with blank lines.

1. Identify six plausible domain classes. (3 marks)

2. For any four classes, give two suitable attributes each. (2 marks)

3. Describe three associations and their business meaning. (3 marks)

4. State multiplicities for two associations and distinguish historical loans from the active-loan constraint. (2 marks)

### Question 3 — 4 marks

Match each UI architecture role to its principal responsibility in the stated pattern.

Answer bank: Exposes presentation state and commands for the View to bind to · Coordinates presentation logic and explicitly updates the View · Renders the response presentation from supplied data · Receives input and coordinates the next action

1. MVC Controller
2. MVVM ViewModel
3. MVP Presenter
4. Django-style MVT Template

### Question 4 — 6 marks

For each scenario, choose the most suitable test type from load, stress, soak, or none of the above. In one sentence, justify the choice by naming the distinguishing property. Marks: one for the selection and one for the scenario-specific justification.

1. A portal is exercised for 30 minutes at its documented expected peak of 200 requests/s to check its latency and error targets. (2 marks)

2. A service is run continuously at a stable, ordinary workload for 12 hours because memory use appears to accumulate slowly. (2 marks)

3. The team sends another student’s record ID using a valid student session to determine whether the server blocks unauthorised access. (2 marks)

### Question 5 — 4 marks

Match each quality/delivery artifact to its purpose.

Answer bank: Records decision context, alternatives and consequences · Defines agreed operations, data and behaviour at an interface · Checks agreed conditions on submitted changes before progression · A named reusable design decision consumed by interface implementations

1. Design token
2. Architectural decision record
3. API service contract
4. CI quality gate

### Question 6 — 5 marks

Which statements are defensible engineering claims? Select all that apply. Negative marking applies using the explicit practice rule on this paper.

- A. A shared contract can enable frontend development with mocks while the provider is implemented.
- B. Matching a response schema proves that the returned data belongs to the authorised user.
- C. A design system can carry reusable design decisions into code.
- D. A context-free code-coverage percentage proves tests contain meaningful assertions.
- E. A deployment diagram should identify the environment and relevant failure domains.
- F. A technical presentation should distinguish tested conditions from planned functionality.
- G. A no-code workflow still needs ownership, permission checks and failure testing.
- H. An automated vulnerability scan is equivalent to an authorised red-team exercise that also evaluates detection and response.
- I. Source formatting alone establishes runtime availability.

### Question 7 — 2 marks

For each scenario below, write only the most specific testing term. Base the answer on the purpose explicitly stated.

1. 1. After modifying the cache, the team reruns existing response-time tests to detect a loss of previously achieved performance.
2. 2. The database is populated with ten times as many records, while arrival rate stays fixed, to assess the effect of data size.

### Question 8 — 5 marks

Match each term in Column A with the most precise description in Column B.

Answer bank: Observed incorrect or unexpected runtime behaviour · Target maximum acceptable data-loss interval · Target maximum acceptable service-restoration time · Only the permissions needed for the relevant task · A static defect that can cause incorrect runtime behaviour

1. Fault
2. Failure
3. RPO
4. RTO
5. Least privilege

### Question 9 — 5 marks

A four-person team is building a departmental booking application with moderate, predictable traffic. It has several related capabilities, one release cadence, and no requirement to deploy or scale those capabilities independently. The team needs clear boundaries and maintainable code but has little capacity for distributed operations.

1. Recommend the most suitable architectural starting point and state its defining property. (2 marks)

2. Give three reasons tied to this scenario. (3 marks)

---

## Model answers and marking guide

### Question 1 — 10 marks

Part 1 (3 marks): Performance efficiency/capacity under a stated workload. Record the environment/configuration and representative request mix or dataset; duration and arrival model are also relevant. The existing 150 requests/s and 30-minute window are part of the acceptance context.

- 1: relevant performance quality concern.
- 1 each: two distinct measurement conditions relevant to interpreting the result.

Part 2 (4 marks): Verify a caller’s session or credentials before protected access. Then check whether that caller owns the requested order or has the applicable staff permission. Authentication establishes identity; the object rule limits that identity’s actions and resource scope.

- 1: verified identity rule.
- 1: resource/role-scoped authorisation rule.
- 2: explains the separate purpose of each with the scenario.

Part 3 (3 marks): Run the defined peak workload and compare latency/errors; send direct order requests as owner and non-owner; interrupt a payment worker and verify pending orders later complete without duplicate payment effects.

- 1 each: three relevant activities linked to performance, access scope and outage/retry behaviour.

### Question 2 — 10 marks

Part 1 (3 marks): Borrower, Kit, Loan, Accessory, StaffMember and Inspection are suitable. Other coherent business classes can receive credit when grounded in the scenario.

- 0.5 each: six plausible domain concepts, not UI widgets or database infrastructure.

Part 2 (2 marks): Kit: assetNumber, condition. Loan: checkoutDate, dueDate. Borrower: borrowerId, name. Inspection: inspectedAt, findings.

- 0.5 per class with two suitable attributes, for four classes.

Part 3 (3 marks): A Borrower participates in Loans; a Loan records use of one Kit; an Inspection is performed by a StaffMember. A Kit–Accessory association can also be described as a grouping of replaceable items, without claiming mandatory shared lifetime.

- 1 each: three meaningful associations explained in the domain.

Part 4 (2 marks): Borrower 1 to Loan 0..*, with each loan belonging to exactly one borrower. Kit 1 to Loan 0..* over history, with an additional invariant of at most one active loan per kit.

- 1: a correct first multiplicity in both directions.
- 1: correct Kit–Loan history multiplicity plus the separate active-loan constraint.

### Question 3 — 4 marks

1. **Receives input and coordinates the next action** — MVC Controller: Receives input and coordinates the next action.
2. **Exposes presentation state and commands for the View to bind to** — MVVM ViewModel: Exposes presentation state and commands for the View to bind to.
3. **Coordinates presentation logic and explicitly updates the View** — MVP Presenter: Coordinates presentation logic and explicitly updates the View.
4. **Renders the response presentation from supplied data** — Django-style MVT Template: Renders the response presentation from supplied data.

### Question 4 — 6 marks

Part 1 (2 marks): Load testing: the demand represents a defined expected operating workload rather than an intentional push beyond capacity.

- 1: load.
- 1: expected/peak workload tied to acceptance targets.

Part 2 (2 marks): Soak testing: sustained operation is intended to expose time-dependent leakage or degradation.

- 1: soak/endurance.
- 1: duration and accumulation mechanism.

Part 3 (2 marks): None of the above: this is a targeted security/object-authorisation test, not a workload-shape test.

- 1: none of the above.
- 1: explains permission enforcement as the property under test.

### Question 5 — 4 marks

1. **A named reusable design decision consumed by interface implementations** — Design token: A named reusable design decision consumed by interface implementations.
2. **Records decision context, alternatives and consequences** — Architectural decision record: Records decision context, alternatives and consequences.
3. **Defines agreed operations, data and behaviour at an interface** — API service contract: Defines agreed operations, data and behaviour at an interface.
4. **Checks agreed conditions on submitted changes before progression** — CI quality gate: Checks agreed conditions on submitted changes before progression.

### Question 6 — 5 marks

Correct: A, C, E, F, G.

Contracts, implemented design decisions, explicit topology, honest presentation scope and maintained workflows supply bounded evidence. Schemas do not prove permissions, coverage does not prove meaningful assertions, and automated scanning does not reproduce the scope of an authorised adversary exercise.

### Question 7 — 2 marks

1. **non-functional regression testing / performance regression testing / regression testing / regression** — The purpose is checking for an unintended quality regression after change.
2. **volume testing / volume** — The changed dimension is dataset size rather than arrival-rate overload.

### Question 8 — 5 marks

1. **A static defect that can cause incorrect runtime behaviour** — Fault: A static defect that can cause incorrect runtime behaviour.
2. **Observed incorrect or unexpected runtime behaviour** — Failure: Observed incorrect or unexpected runtime behaviour.
3. **Target maximum acceptable data-loss interval** — RPO: Target maximum acceptable data-loss interval.
4. **Target maximum acceptable service-restoration time** — RTO: Target maximum acceptable service-restoration time.
5. **Only the permissions needed for the relevant task** — Least privilege: Only the permissions needed for the relevant task.

### Question 9 — 5 marks

Part 1 (2 marks): A modular monolith: one deployable application with intentionally separated internal modules and interfaces.

- 1: modular monolith or equivalently justified single-deployment modular design.
- 1: clear internal boundaries within one deployment.

Part 2 (3 marks): It fits the shared release cadence; avoids unnecessary network/partial-failure and operational overhead for a small team; preserves internal separation and testability without requiring independent deployments.

- 1 each: three distinct scenario-linked reasons. Accept defensible alternatives only when their additional costs are addressed.

