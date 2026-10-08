# ST2 Example 4 — Scenario Questions

Scope: L17–L33 and L35 revision, including SOA (L26) and Microservices (L27). Total: 110 marks.

Original authored 110-mark practice paper in the style of the supplied extended scenarios: diagnose, explain, propose and evaluate trade-offs. Every lecture in the available ST2 scope is assessed in each paper. L35 integrates earlier topics; no separate L34 topic is listed in the supplied scope. L29 and L31–L33 follow the existing general-topic guides, not unavailable lecture slides. Marks are practice allocations; no official duration is inferred. Defensible alternatives earn credit when justified against the scenario.

This paper contains written scenario questions only. Use the model answers and rubrics for self-assessment; no automatic written-answer grading or negative marking applies.

Written answers are self-assessed using the rubric. Suggested word limits carry no automatic penalty.

[Interactive and printable paper](../st2-example-4.html)

## Question paper

### Question 1 — 15 marks

A polished demonstration with missing evidence

Ravi has fifteen minutes to present RouteReady, a delivery-management system, to an evaluator unfamiliar with courier work. He starts with eight minutes of slides containing tiny UML diagrams and paragraphs he reads aloud. His teammate then repeats the project introduction. Ravi opens a map already populated with successful deliveries and declares that the route optimiser is “the fastest on the market”. He never explains dispatch, driver acceptance or failed delivery states. He demonstrates only his administrator account. The evaluator asks to see an offline driver reconnect; Ravi has not prepared this and repeatedly retries a failing public mapping service. With one minute left, he rushes past proof of delivery and omits his conclusion and questions.

1. Identify five poor presentation or demonstration practices. For each, explain why it limits assessment and how the team could avoid it in a re-demo. (15 marks)

### Question 2 — 15 marks

Retry until the parcel arrives twice

A nationwide sale causes 60,000 RouteReady dispatch requests. Each request synchronously waits for a carrier API, which now takes three minutes. The web pool fills and login stops responding. A timeout means the application cannot tell whether the carrier created a shipment, so it retries with a fresh request ID. Some parcels now have two shipments and customers are billed twice. Managers suggest changing all calls to fire-and-forget messages and reporting “shipment confirmed” as soon as a message is sent.

1. Explain the outage and duplicate shipments, name the affected NFRs, and evaluate the proposed immediate confirmation. (5 marks)

2. Propose specific architectural tactics/patterns for responsive dispatch and duplicate-safe recovery. (7 marks)

3. Identify one introduced trade-off and mitigate it. Explain why a distributed-system assumption was unsafe. (3 marks)

### Question 3 — 10 marks

A parcel changes address without becoming another parcel

RouteReady tracks Customers, Parcels, DeliveryAttempts and Drivers. A parcel has a persistent tracking number. Each delivery attempt concerns exactly one parcel and one driver; a parcel can have many historical attempts. A parcel owns proof-of-delivery entries that are meaningful only within its delivery record. A depot can store parcels that later move elsewhere. A destination address consists of street, city and postcode. The mobile UI directly performs SQL updates, and an engineer claims that moving those statements into a “Controller” automatically creates MVC, MVVM and CQRS simultaneously.

1. Identify five domain concepts, give an entity/value-object distinction, and explain two associations with multiplicities. (4 marks)

2. Justify relationships for proof-of-delivery and depot storage, and propose logical layer responsibilities separately from deployment tiers. (3 marks)

3. Distinguish MVC, MVVM and CQRS, and explain why renaming a folder does not establish these patterns. (3 marks)

### Question 4 — 8 marks

Drivers cannot tell whether a delivery was saved

RouteReady drivers work outdoors on small phones. The completion screen uses tiny pale-grey text, tightly packed controls and a subtle green dot as the only success signal. “Cancel”, “Complete” and “Delete” look identical. An accidental tap immediately deletes a delivery record. Dispatchers use a different font, spacing scale and status vocabulary. The team copies logo colours into each stylesheet and says that consistent branding is enough to make the system usable.

1. Propose four usability/accessibility changes linked to the observed problems. (4 marks)

2. Explain how brand foundations, semantic design tokens and component states can create a consistent design system, and name a suitable validation activity. (4 marks)

### Question 5 — 10 marks

The security scanner approves an untested image

RouteReady developers commit a mapping API key. CI scans source code and reports a vulnerable dependency, but the warning is ignored because the application works. Tests are allowed to pass with no discovered cases. A staging image is tested, then production is rebuilt with newer dependencies. The production image includes compilers and runs as root. No deployment health signal or rollback plan exists. A week later an error spike is noticed only when customers complain.

1. Identify five delivery weaknesses and provide a specific correction for each. (5 marks)

2. Explain where SAST, DAST and dependency scanning fit, and how monitoring should feed back into DevSecOps. (3 marks)

3. Distinguish unit, integration and end-to-end evidence for dispatch, and explain why a green empty suite supplies no evidence. (2 marks)

### Question 6 — 10 marks

Reliable, unavailable, or both?

In a simplified repeated repairable-service model, RouteReady has mean up-time between repairs of 99 hours and mean repair time of 1 hour. A proposed runbook reduces mean repair time to 15 minutes without changing failures. A dashboard says “99% available means every parcel is delivered correctly”. The team measures latency using only successful requests and quotes an average instead of a p99 target. Engineers suppress exceptions to satisfy a formatting checker and claim that final acceptance testing is the whole quality-assurance process.

1. Calculate availability before and after the runbook change using the stated model, and distinguish availability from reliability and delivery correctness. (4 marks)

2. Design three different non-functional tests for abrupt bursts, prolonged resource growth and recovery, specifying useful measurements and conditions. (3 marks)

3. Explain the QA/QC distinction, recommend a coding standard and contextual metric, and connect a regression check to the exception problem. (3 marks)

### Question 7 — 10 marks

A dashboard built on trust

A dispatcher signs into RouteReady and changes a depotId query parameter to view another depot’s customer addresses. A generated HTML report renders driver-supplied notes without safe output handling. A webhook is accepted without validating its sender or guarding against replay. The team stores both webhook secrets and logs containing full credentials in the same broadly accessible bucket. A scoped security exercise probes these paths, but operations cannot correlate an alert to a delivery and dismisses red-team reports as “someone else’s problem”.

1. Identify three attack paths, the endangered assets and matching implementation controls. Distinguish authentication from object authorisation. (4 marks)

2. Propose three secure-development practices covering secrets/logging, early design and verification. (3 marks)

3. Explain how red, blue and purple collaboration can improve detection and response while respecting exercise scope. (3 marks)

### Question 8 — 8 marks

A shared database masquerading as services

RouteReady connects three regional carriers and a legacy billing system through an integration bus. Shipment, Billing and Tracking are now separate deployments, but all read and write each other’s tables and must release together. A carrier changes an error response from 409 to a successful 200 with an embedded error field, breaking retry logic. A new workflow charges a customer, requests collection and publishes tracking updates. A developer wants a separate read projection for fast tracking queries and says it can never be stale.

1. Assess the SOA/bus choice and the alleged microservices. Include a suitable boundary improvement and one trade-off. (3 marks)

2. Explain contract-first development and a safe migration of the carrier error behaviour, including relevant contract contents/tooling. (3 marks)

3. Describe a saga with compensation, contrast orchestration/choreography, and explain the read-projection consistency trade-off. (2 marks)

### Question 9 — 8 marks

A beautiful deployment diagram that hides the outage

RouteReady’s diagram shows an API gateway, discovery service, three service boxes, a broker and a database, all without node boundaries or protocols. In production, the gateway and discovery service are single instances on one host; service replicas span two zones but the broker and database remain in one zone. Engineers say a service mesh guarantees availability and that database replication replaces backups. A zone outage loses broker access and dispatch stalls. No one has measured whether the 10-minute RTO and 1-minute RPO can be achieved.

1. Describe four diagram corrections and identify two concentrated failure dependencies. (4 marks)

2. Distinguish gateway, discovery and mesh responsibilities; propose resilience and observable recovery verification with a cost. (4 marks)

### Question 10 — 6 marks

Prototype speed becomes a production promise

A regional office builds a no-code parcel-exception tracker in two days. A low-code extension connects it to billing; an AI-generated script exports customer data. The script is accepted because it runs once, and nobody understands its permission checks. Platform editors can change production flows without review. Per-user licence costs rise as drivers are added, and workflow export loses proprietary connectors. The office wants to replace the maintained RouteReady workflow immediately without measuring concurrency, access control or failure handling.

1. Distinguish the three development approaches in this scenario and recommend a bounded adoption decision with two risks. (3 marks)

2. Give a requirement-to-evidence plan with ownership and a migration/rollback strategy. (3 marks)

### Question 11 — 10 marks

The architecture changes every time the slide changes

RouteReady must allow a new carrier adapter in no more than three developer-days with no edits to the delivery domain. Its architect alternates between a modular monolith and twenty services according to which diagram looks more impressive. Regional teams have different release needs, but nobody has mapped ownership. The migration plan removes the legacy integration bus overnight. The ADR says only “modern and flexible”. The frontend team separately claims that a Presenter and a Django Template perform the same job because both “display data”.

1. Turn the carrier-change target into a complete quality-attribute scenario and link it to a tactic, pattern and automated evidence. (4 marks)

2. What should the ADR record? Recommend an ownership-aware architectural choice and an incremental migration, with one trade-off/sensitivity point. (4 marks)

3. Distinguish an MVP Presenter from a Django-style MVT Template and explain why responsibility matters more than names. (2 marks)

---

## Model answers and marking guide

### Question 1 — 15 marks

Part 1 (15 marks): 1. Dense unreadable slides and reading aloud hide the main reasoning: use legible visuals with one purpose and speak to their meaning. 2. Overlong/repeated introductions waste the fixed slot: coordinate speaker roles and rehearse a timed agenda. 3. Unexplained domain states prevent judgement of correctness: introduce dispatch, acceptance, failure and completion with a concrete task. 4. Prepopulated administrator-only success and unsupported speed claims omit representative evidence: prepare driver/dispatcher accounts, live task transitions and a stated benchmark with conditions. 5. No offline/dependency contingency leads to repeated retries and rushed core evidence: seed an offline/reconnect scenario, use a disclosed controlled service or labelled recording when necessary, time-box recovery and reserve time for core proof, conclusion and questions.

- 3 each for five distinct practice/effect/correction triples. Accept other distinct scenario-supported answers; do not award duplicate timing complaints separately.

### Question 2 — 15 marks

Part 1 (5 marks): Slow synchronous calls hold finite worker resources, harming availability, performance and resilience. A timeout is an uncertain outcome, not proof of failure; a fresh ID defeats deduplication and can repeat business effects, compromising correctness, integrity and reliability. Sending a message neither proves durable acceptance nor carrier completion; immediate confirmation misrepresents state and can conceal lost work.

- 2: resource exhaustion with quality attributes. 2: uncertain timeout/fresh-ID duplication with integrity or reliability. 1: truthful acknowledgement versus completion.

Part 2 (7 marks): Commit a pending dispatch plus outbox atomically, then deliver durable queued work. Return accepted/pending with a tracking ID. Limit queues/in-flight work, use dependency timeouts, bulkheads and circuit breakers, and back off bounded retries with jitter. Preserve one idempotency key across retries and obtain provider support for deduplication/status queries; local deduplication alone cannot guarantee a remote effect occurred only once. If the provider cannot support this, reconcile ambiguous results before repeating the shipment. Record state transitions and expose final success/failure through polling/events, with correlation IDs and queue-age/error monitoring.

- 2: durable asynchronous acceptance and atomic publication. 2: bounded failure/overload tactics. 2: stable identity plus remote uncertainty/reconciliation. 1: state and observability.

Part 3 (3 marks): Queued processing creates eventual completion and possible backlog: show honest status, alert on oldest-message age and apply admission limits. Assuming the network is reliable or latency negligible made blocking/unbounded retry unsafe; design explicitly for partial failure and uncertain outcomes. Other introduced risks with matching mitigations are acceptable.

- 1: introduced cost. 1: mitigation. 1: applicable distributed-computing fallacy explained.

### Question 3 — 10 marks

Part 1 (4 marks): Customer, Parcel, DeliveryAttempt, Driver and Address are suitable; Depot and ProofOfDelivery are also valid. Parcel identity is its tracking number despite changed details; Address equality depends on its fields under a defined normalisation policy. Parcel 1—DeliveryAttempt 0..* and Driver 1—DeliveryAttempt 0..*, each attempt referring to exactly one of each.

- 1: five concepts. 1: identity/value distinction. 1 each: two correct bidirectional multiplicities.

Part 2 (3 marks): Parcel-owned proof entries can use composition under the stated dependent lifetime; depot–parcel storage is an association because parcels survive moves. Put presentation/input at the UI boundary, delivery rules in the domain/application layer and SQL behind persistence interfaces. Those logical responsibilities can share a runtime deployment; tiers concern deployed runtime separation.

- 1: composition versus independent association. 1: appropriate responsibilities/dependencies. 1: layer/tier distinction.

Part 3 (3 marks): MVC separates model, view and input coordination by a controller. MVVM exposes presentation state/commands through a view model for view binding. CQRS separates command/write responsibilities from query/read responsibilities and need not use separate databases. Actual responsibilities, data flows and dependencies establish a pattern; a Controller folder name does not.

- 1 each: three pattern distinctions with a coherent rejection of name-only evidence.

### Question 4 — 8 marks

Part 1 (4 marks): Use legible size/contrast for outdoor use; increase touch target spacing and apply a clear visual hierarchy; label success/pending/error with meaningful text and accessible feedback; constrain destructive actions through confirmation or an appropriate reversible action and distinguish them from completion. Accept consistent status language and clear grouping as additional grounded changes.

- 1 each: four distinct problem–correction pairs, with user context.

Part 2 (4 marks): Brand foundations express audience, tone and identity; semantic tokens map these decisions to reusable typography, spacing and status/action roles rather than arbitrary copied swatches. Shared buttons/forms/status components define enabled, pending, disabled, success, error and focus behaviour. Validate with representative drivers and keyboard/screen-reader/contrast checks; a logo palette alone cannot establish usability.

- 1: brand intent. 1: tokens. 1: implemented states/components. 1: representative usability/accessibility evidence.

### Question 5 — 10 marks

Part 1 (5 marks): Remove/revoke/rotate the committed key and prevent recurrence with secret scanning; triage and remediate vulnerable dependencies with enforced gates; fail unexpected zero-test discovery and test failures; pin dependencies and promote one immutable tested image; use a minimal multi-stage non-root runtime. Other valid pairs include monitored readiness/liveness appropriate to their purpose or rehearsed rollback.

- 1 each: five distinct supported weakness–correction pairs.

Part 2 (3 marks): SAST analyses source/build artifacts without exercising the deployed app; DAST probes a running application; dependency scanning checks third-party components against known issues. Plan checks across code/build/test and release, then use latency/error and security alerts, incident learning and remediation verification to update the backlog and controls.

- 1: SAST/DAST distinction. 1: dependency check. 1: monitored operational feedback.

Part 3 (2 marks): Unit tests isolate dispatch rules; integration tests exercise real relevant boundaries such as persistence or a controlled carrier adapter; end-to-end tests exercise the deployed user-to-result flow across the included boundaries. An empty suite has executed no assertions, so success means only that the command did not fail.

- 1: levels and boundaries. 1: zero-test limitation.

### Question 6 — 10 marks

Part 1 (4 marks): Availability = mean up-time/(mean up-time + mean repair time). Before: 99/100 = 99%. After: 99/99.25 ≈ 99.748%. Faster repair improves availability without reducing the underlying failure frequency. Reliability concerns failure-free operation under stated conditions over time; delivery correctness is a functional outcome that the uptime percentage cannot establish.

- 1: correct baseline. 1: correct revised calculation with hours converted. 1: availability/reliability distinction. 1: rejects correctness inference.

Part 2 (3 marks): Use spike testing for abrupt arrival-rate changes and measure latency/error/in-flight response; soak testing under representative sustained load for memory/resource growth; recovery/failover testing with a controlled dependency/node interruption and measured restoration, backlog completion and duplicate/lost effects. Record environment, data mix, duration, dependency configuration and latency percentiles, timeouts and all error outcomes rather than successful-only averages.

- 1 each: correct test, scenario purpose and useful measure/condition for three activities.

Part 3 (3 marks): QA is process assurance through review/standards/gates; QC evaluates artifacts through inspections/tests. Require explicit typed error handling and observable failure paths rather than silent catch-all success. Track escaped defects or meaningful test coverage with context, not as proof of quality. Add a regression case where the carrier fails and assert the correct pending/failed state and observability; a static fault may remain unobserved until that path executes.

- 1: QA/QC distinction. 1: justified standard and contextual metric. 1: regression check tied to hidden fault/failure.

### Question 7 — 10 marks

Part 1 (4 marks): Depot-ID manipulation can disclose address data: enforce server-side depot/object scope on every access; a login alone establishes identity, not resource permission. Untrusted notes can create stored script injection: apply context-appropriate output encoding and sanitise deliberately allowed markup. Forged/replayed webhooks can corrupt delivery status: verify sender signatures over the required payload, validate freshness and deduplicate event IDs. These protect confidentiality and state integrity.

- 1 each: three grounded attack–asset–control chains. 1: identity versus resource permission.

Part 2 (3 marks): Use narrowly scoped secret storage and rotation, redact credentials and restrict audit/log access. Threat-model trust boundaries and webhook/depot assets before implementation. Combine code/SAST/dependency review with dynamic/manual tenant-scope, encoding and replay tests, then verify remediation. Use least privilege and layered controls rather than trusting one bucket or one scan.

- 1 each: three practices matched to the specified concerns.

Part 3 (3 marks): Red tests authorised attack paths and reports evidence; blue correlates delivery/request IDs, monitors suspicious access and executes containment/recovery; purple collaboration replays agreed cases to refine alerts, controls and response procedures. Agree systems, permitted techniques and stop conditions, then retest the improvements within scope.

- 1: red role/scope. 1: blue detection and response. 1: collaborative feedback/retest.

### Question 8 — 8 marks

Part 1 (3 marks): SOA and a bus can mediate heterogeneous carrier/billing protocols and orchestrate enterprise integration, but central routing/transformation adds operational concentration and coupling. Separate deployments sharing writable tables and a coordinated release resemble a distributed monolith. Establish capability-owned data and versioned interfaces/events; this enables independence but introduces remote-call/consistency/operational costs, which may favour a modular monolith for a smaller team.

- 1: SOA/bus benefit and cost. 1: distributed-monolith diagnosis. 1: ownership/boundary improvement and cost.

Part 2 (3 marks): Define paths/operations, schemas, status/error meanings, authentication and retry/idempotency rules before client/provider work. OpenAPI describes HTTP contracts and Swagger tools can produce documentation/mocks; SOAP services commonly use WSDL. Preserve old semantics/version or introduce a translating adapter, run consumer/provider contract and real integration tests, and coordinate a documented transition instead of silently reinterpreting 200.

- 1: substantive agreed contract. 1: tooling distinctions and mocks/parallel work. 1: compatible migration with verification.

Part 3 (2 marks): A coordinator can command charge/collect/update steps (or services can react through choreography events). If collection fails after charging, compensate through a refund and appropriate cancellation with idempotent recovery; compensation is not global transaction rollback. A CQRS read projection updated from events can lag the authoritative write state, so expose pending status/version and monitor lag rather than promising immediate freshness.

- 1: saga and coordination distinction with sensible compensation. 1: CQRS eventual consistency and user/monitoring response.

### Question 9 — 8 marks

Part 1 (4 marks): Declare environment/scope and include relevant clients/providers; nest artifacts within nodes/runtime environments and zones; label protocols, directions and sync/async links; mark trust boundaries, state ownership, replication/backup paths and common failure domains. The single-host gateway/discovery and single-zone broker/database are concentrated dependencies despite service replicas.

- 2: four useful diagram corrections (0.5 each). 2: two grounded concentrated dependency groups.

Part 2 (4 marks): A gateway mediates external entry/routing and cross-cutting policies; discovery resolves service instances; a mesh provides service-to-service traffic/security/telemetry mechanisms. None alone removes failure domains or guarantees business recovery. Redundantly place critical dependencies, retain independent historical backups and verify recovery by controlled zone failure and actual restores. Measure service-restoration time against RTO and recoverable data loss against RPO, queue age and completion/duplicates with correlated logs/traces/metrics. Extra nodes, replication, mesh and failover drills add cost and operational complexity.

- 1: three role distinctions. 1: failure-domain/state/backup improvement. 1: measured RTO/RPO and workflow recovery evidence. 1: cost and rejects automatic guarantee.

### Question 10 — 6 marks

Part 1 (3 marks): The visual tracker is no-code; the connector extension uses low-code/custom code; accepting generated code by trial alone reflects vibe coding rather than reviewed AI-assisted engineering. Retain a bounded low-risk exception triage pilot until production requirements are verified. Risks include data exposure from generated permissions, uncontrolled changes, licensing growth and connector lock-in; relate two to the rollout decision.

- 1: approach distinctions. 1: bounded decision justified by missing evidence. 1: two scenario-specific risks.

Part 2 (3 marks): Name an accountable maintainer, version/review workflow changes and minimise roles/data. Turn access isolation, exception correctness and recovery into explicit scenarios; inspect generated code/dependencies and test cross-user access, concurrent changes and connector failure/retry. Measure acceptance criteria and preserve audit history. Pilot alongside the current system, reconcile records and test export/restore before phased migration, with a rehearsed rollback path and licence/capacity budget.

- 1: governance/ownership and review. 1: requirements linked to meaningful evidence. 1: phased migration/export/rollback with operational constraints.

### Question 11 — 10 marks

Part 1 (4 marks): Source: integration developer/team; stimulus: adding a defined new carrier; environment: normal development against a representative stub/contract; artifact: carrier integration boundary; response: implement/register an adapter without changing the delivery domain; measure: at most three developer-days and zero domain edits. Isolate volatile details via an abstraction (tactic), implement Adapter/Strategy (pattern), and enforce dependency/import checks plus carrier contract tests. Time estimates need a defined provider scope, not an arbitrary API.

- 2: six scenario elements with stated measurable conditions. 1: tactic/pattern chain. 1: evidence that enforces the target.

Part 2 (4 marks): Record context, quality targets/constraints, alternatives, decision, status and consequences. Map region/capability ownership and actual independent release/scaling needs before choosing services; use a modular monolith where one team shares operations and release, or justified independently deployable services where teams can own them. Conway’s law warns that communication boundaries influence architecture. Use a strangler façade/adapter to migrate bus integrations slice by slice, reconcile data and retain rollback. The degree of separation trades release independence against remote latency, consistency and operational cost; timeout/concurrency values are sensitivity points.

- 1: substantive ADR. 1: scenario-linked team/boundary choice with Conway reasoning. 1: incremental migration and reconciliation. 1: real trade-off or sensitivity point.

Part 3 (2 marks): An MVP Presenter coordinates presentation logic and updates the View through its interface. An MVT Template renders the presentation from supplied data; the Django View commonly handles request logic and supplies that context. Both influence what is displayed, but that broad statement does not make their responsibilities equivalent. Assess actual collaboration and dependencies rather than labels.

- 1: Presenter coordination. 1: Template rendering and distinction.

