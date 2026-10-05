# ST2 Example 2

Scope: L17–L33 and L35, including SOA and Microservices. Total: 36 marks.

Original practice paper based on the reference assessment style. Not an official paper or prediction. No official duration was available in the supplied export.

Each correct selection earns the question marks divided by the number of correct options. Each incorrect selection deducts the same amount. Omitted options earn zero. Each question is floored at zero. This explicit practice rule is not asserted to be the original marking formula.

Written answers are self-assessed using the rubric. Suggested word limits carry no automatic penalty.

[Interactive and printable paper](../st2-example-2.html)

## Question paper

### Question 1 — 10 marks

An exhibition platform manages Exhibitions, Bookings and Visitors. Each booking belongs to exactly one visitor and one exhibition. A visitor can hold multiple historical bookings. An exhibition has a capacity and cannot accept more active bookings than that capacity. A visitor’s address may change without changing their identity. Each booking contains a quoted Money value consisting of amount and currency. Curators manage exhibitions. Separate your answers with blank lines.

1. Identify six plausible domain concepts, including at least one value object. (3 marks)

2. For any four concepts, give two suitable attributes each. (2 marks)

3. Explain two associations and distinguish Visitor identity from Money equality. (3 marks)

4. State two multiplicities and express the active-capacity constraint separately. (2 marks)

### Question 2 — 4 marks

Match each architectural concept to the distinction it captures.

Answer bank: Other services use the owning service boundary rather than querying its tables directly · A business action that counteracts a completed local step where possible · Separate processes or deployments that remain tightly coupled in change or operation · Consumers depend on an agreed interface rather than provider internals

1. Service contract
2. Database ownership per service
3. Saga compensation
4. Distributed monolith

### Question 3 — 6 marks

For each scenario, choose the most suitable primary mechanism from cross-domain replica, historical backup/restore, idempotent processing, or none of the above. Give one sentence explaining the distinguishing property needed. Marks: one for the choice and one for the justification.

1. A mistaken deletion has already propagated to all live database replicas; valid records from before the deletion are needed. (2 marks)

2. A payment message is delivered again after the worker recorded success but lost its queue acknowledgement. (2 marks)

3. A user with a valid session can read records belonging to another tenant. (2 marks)

### Question 4 — 4 marks

Match each practice or concept to its direct purpose.

Answer bank: The user’s understanding of how the task and system work · Security activities and learning throughout delivery and operation · Manage changes that would otherwise break existing consumers · Reusable implemented interface decisions and components

1. Design system
2. User mental model
3. DevSecOps feedback
4. Contract versioning/migration

### Question 5 — 5 marks

Which statements about software quality, testing and measurement are valid? Select all that apply. Negative marking applies.

- A. A static fault can exist without an observed failure on the inputs tested.
- B. SQA consists only of the final system test.
- C. Reducing mean repair time can improve availability without increasing mean operating time.
- D. Replacing the integration boundary with a mock proves that real boundary works.
- E. A predictor metric needs contextual interpretation rather than being treated as proof.
- F. Regression testing can include performance and security checks.
- G. A requirement stated as “errors below 1%” is satisfied by exactly 1% errors.
- H. A long-running soak test can reveal resource accumulation missed by a short test.
- I. A red-team exercise can ignore agreed authorisation and scope because realistic attacks are its goal.

### Question 6 — 2 marks

For each scenario, write only the most specific testing term. Use the explicitly stated purpose.

1. 1. Demand jumps abruptly from 20 requests/s to 800 requests/s and then drops, to observe the response to sudden change.
2. 2. Testers keep increasing demand beyond the known sustainable capacity to inspect overload failure and subsequent recovery.

### Question 7 — 5 marks

A university operates a large media-processing platform. Upload validation, transcoding and catalogue browsing have different scaling demands. Separate experienced teams own the capabilities, need independent releases and can support distributed operations. Long-running transcoding should not block acceptance of valid uploads. The system must expose an accurate processing status to users.

1. Recommend an architectural approach and name the communication style suitable for the long-running work. (2 marks)

2. Give three scenario-specific reasons, including one limitation or cost the team must handle. (3 marks)

---

## Model answers and marking guide

### Question 1 — 10 marks

Part 1 (3 marks): Exhibition, Booking, Visitor, Curator, Money and Address are plausible. Money or Address can be modelled as a value object when identity is defined by its constituent values.

- 0.5 each: six grounded concepts, with at least one defensible value object.

Part 2 (2 marks): Exhibition: exhibitionId, capacity. Booking: bookingId, status. Visitor: visitorId, name. Money: amount, currency.

- 0.5 per concept with two suitable attributes, for four concepts.

Part 3 (3 marks): Each Booking refers to one Visitor and one Exhibition; each may have many historical Bookings. Visitor identity persists after its address changes. Two Money values are equal by amount and currency under the chosen representation.

- 1 each: two correct associations.
- 1: identity versus value distinction using the scenario.

Part 4 (2 marks): Visitor 1 to Booking 0..*; Exhibition 1 to Booking 0..* over history. Active bookings for an exhibition must not exceed its capacity; a fixed history multiplicity is not a substitute for that invariant.

- 1: both multiplicities correct.
- 1: active capacity expressed as a business invariant rather than an incorrect fixed history count.

### Question 2 — 4 marks

1. **Consumers depend on an agreed interface rather than provider internals** — Service contract: Consumers depend on an agreed interface rather than provider internals.
2. **Other services use the owning service boundary rather than querying its tables directly** — Database ownership per service: Other services use the owning service boundary rather than querying its tables directly.
3. **A business action that counteracts a completed local step where possible** — Saga compensation: A business action that counteracts a completed local step where possible.
4. **Separate processes or deployments that remain tightly coupled in change or operation** — Distributed monolith: Separate processes or deployments that remain tightly coupled in change or operation.

### Question 3 — 6 marks

Part 1 (2 marks): Historical backup/restore: an earlier recoverable state is needed because current replicas contain the same deletion.

- 1: historical backup/restore or point-in-time recovery.
- 1: explains why current replicas do not preserve the required history.

Part 2 (2 marks): Idempotent processing: stable operation identity and duplicate handling prevent repetition of the completed business effect.

- 1: idempotent processing.
- 1: links repeated delivery/uncertain acknowledgement to one intended effect.

Part 3 (2 marks): None of the above: the primary missing control is server-side object/tenant authorisation.

- 1: none of the above.
- 1: explains the resource-scope access rule rather than availability or duplicate handling.

### Question 4 — 4 marks

1. **Reusable implemented interface decisions and components** — Design system: Reusable implemented interface decisions and components.
2. **The user’s understanding of how the task and system work** — User mental model: The user’s understanding of how the task and system work.
3. **Security activities and learning throughout delivery and operation** — DevSecOps feedback: Security activities and learning throughout delivery and operation.
4. **Manage changes that would otherwise break existing consumers** — Contract versioning/migration: Manage changes that would otherwise break existing consumers.

### Question 5 — 5 marks

Correct: A, C, E, F, H.

These distinctions separate defects from observations, process assurance from testing, and useful metrics from overclaims. Strict thresholds, real integration and assertion quality need explicit attention. Security exercises still need agreed authorisation and scope.

### Question 6 — 2 marks

1. **spike testing / spike** — The distinguishing feature is the abrupt load change.
2. **stress testing / stress** — The explicit purpose is behaviour beyond capacity, not merely an expected large workload.

### Question 7 — 5 marks

Part 1 (2 marks): Services aligned with independently owned capabilities, with asynchronous queued/event-driven transcoding. A well-justified microservices approach fits independent release and scaling requirements.

- 1: suitable independently deployable service approach.
- 1: asynchronous queued/event-driven long-running processing.

Part 2 (3 marks): Separate transcoding capacity can scale without duplicating the whole platform. Service boundaries support the teams’ independent release cadence. Asynchronous work requires pending/completed states, duplicate handling, monitoring and recovery rather than assuming immediate success.

- 1: independent capacity linked to workload differences.
- 1: independent release/ownership linked to teams.
- 1: relevant async/distributed cost and its consequence; accept other well-supported trade-offs.

