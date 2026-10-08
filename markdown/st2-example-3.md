# ST2 Example 3 — Scenario Questions

Scope: L17–L33 and L35 revision, including SOA (L26) and Microservices (L27). Total: 110 marks.

Original authored 110-mark practice paper in the style of the supplied extended scenarios: diagnose, explain, propose and evaluate trade-offs. Every lecture in the available ST2 scope is assessed in each paper. L35 integrates earlier topics; no separate L34 topic is listed in the supplied scope. L29 and L31–L33 follow the existing general-topic guides, not unavailable lecture slides. Marks are practice allocations; no official duration is inferred. Defensible alternatives earn credit when justified against the scenario.

This paper contains written scenario questions only. Use the model answers and rubrics for self-assessment; no automatic written-answer grading or negative marking applies.

Written answers are self-assessed using the rubric. Suggested word limits carry no automatic penalty.

[Interactive and printable paper](../st2-example-3.html)

## Question paper

### Question 1 — 15 marks

A demonstration that proves very little

Naledi is demonstrating LabLink, an equipment-loan application, to an evaluator who has never worked in a laboratory. She spends six of her twelve minutes describing why her team deserves the highest mark, then opens the database tables and reads column names aloud. She starts borrowing equipment without explaining who may borrow it, how approval works, or when an item becomes overdue. She clicks rapidly through a successful loan using her own familiar account. When asked what happens if two students request the last microscope, she says the code handles it but has no prepared accounts or data to show this. With two minutes left, she skips the return workflow and spends the remaining time generating a decorative AI dashboard. She calls the application “fully accessible and production-ready” without presenting supporting evidence.

1. Identify five poor demonstration practices. For each, explain its effect on assessment and how Naledi should change her next demonstration. (15 marks)

### Question 2 — 15 marks

The last microscope is promised twice

At 08:00, 9,000 students request scarce equipment. LabLink keeps each web worker occupied while it synchronously calls a university eligibility service. The service slows from 100 ms to 90 seconds; all 120 workers become occupied and even the return page stops responding. An item reservation expires after 45 seconds. A second student reserves an expired item. The first eligibility response then arrives and the application creates a confirmed loan without checking the current reservation owner. The team proposes “adding more servers” as the entire solution.

1. Explain both failures and explicitly name the compromised NFRs. Explain why adding servers alone is insufficient. (5 marks)

2. Propose a design that remains responsive and prevents duplicate confirmed loans. Name specific tactics or patterns. (7 marks)

3. Identify one new cost or risk in your solution and explain a concrete mitigation. (3 marks)

### Question 3 — 10 marks

A model confused with its implementation

LabLink tracks Students, EquipmentItems and Loans. Each item has an asset number that persists when its location changes. Each loan belongs to one student and one item; students and items can have many historical loans, but an item may have only one active loan. A loan owns a return checklist whose entries have no meaning outside that loan. A replaceable accessory can exist in stock without belonging to an item. A quoted deposit consists of amount and currency. A developer instead draws DatabaseConnection and BorrowButton as the main domain classes and says that three code folders prove the application runs on three tiers.

1. Identify five suitable domain concepts, distinguish an entity from a value object, and correct the domain-modelling mistake. (4 marks)

2. State two associations with multiplicities, explain the active-loan constraint, and justify composition versus ordinary association for the checklist and accessory. (4 marks)

3. Distinguish logical layers from deployment tiers and explain why folders do not establish tier separation. (2 marks)

### Question 4 — 8 marks

One product, three different interfaces

The student, technician and administrator screens use different colours and button styles. A clickable red label sometimes means “delete” and sometimes “available”. Loan errors appear only as colour changes. A screen-reader user cannot identify icon-only controls, and keyboard focus disappears inside a modal. A borrowing form displays twenty equally prominent actions, uses inconsistent spacing, and gives no feedback after submission. The team has a PDF logo guide and believes this is a complete design system.

1. Explain how a brand style guide differs from an implemented design system. Propose tokens and components that would address this scenario. (4 marks)

2. Identify four distinct usability or accessibility problems and give a specific correction for each. (4 marks)

### Question 5 — 10 marks

Green badges, unsafe releases

LabLink’s CI script runs tests but converts every failing exit code to success. Pull requests can merge without checks. The only “integration tests” replace the database with a mock and assert merely that a response exists. Production is rebuilt separately from staging using floating image tags. The container runs as root, embeds a database password, and has no resource limits or health checks. Developers stop monitoring after deployment because “operations is another team’s job”.

1. Explain four pipeline or deployment weaknesses and give a matching correction for each. (4 marks)

2. Describe a DevSecOps delivery loop with appropriate security checks and operational feedback. Distinguish continuous delivery from continuous deployment. (4 marks)

3. Why do the mock tests not prove database integration, and how could the team check whether an assertion can detect a defect? (2 marks)

### Question 6 — 10 marks

The average looks excellent

A LabLink report claims that all quality targets passed because average response time was 180 ms. The requirement is p95 below 500 ms at 150 requests/s for 30 minutes with errors below 1%. Of 10,000 requests, 100 failed and the slowest 5% took over two seconds. The test excluded eligibility calls and used an almost empty database. A 15-minute run found no leak, but technicians report increasing memory over a full day. The team also claims 100% line coverage proves correctness and postpones coding standards until after acceptance testing.

1. Assess the performance claim and propose four distinct test activities with their purposes. (5 marks)

2. Distinguish SQA from quality control, and faults from failures. Recommend one useful coding standard and explain the limitation of coverage. (3 marks)

3. Explain how TDD and regression testing could help after the leak is fixed. (2 marks)

### Question 7 — 10 marks

A valid login exposes private records

A student changes /loans/42 to /loans/43 and reads another student’s personal details using a valid session. The search endpoint concatenates input into SQL. Passwords are stored using reversible encryption and the decryption key is in the repository. An authorised security exercise finds these weaknesses; operations sees unusual requests but has no alert or response procedure. The manager proposes a penetration test only on the final day and says encrypted HTTPS means stored passwords are safe.

1. Distinguish asset, threat, vulnerability and risk using this scenario; explain authentication versus authorisation. (4 marks)

2. Propose three implementation controls and explain why HTTPS alone does not resolve them. (3 marks)

3. Explain red, blue and purple team responsibilities and propose security verification earlier in development. (3 marks)

### Question 8 — 8 marks

Three systems, three interpretations of approved

LabLink integrates with a legacy finance system, a university identity service and an email provider. Finance exposes SOAP operations described by WSDL. LabLink publishes a JSON API, but frontend developers use screenshots as its specification. A provider changes approved from a Boolean to a string without notice. A finance adapter is imported throughout the loan domain. The team wants to coordinate reserve-item, collect-deposit and confirm-loan steps, even though each system owns its own data and no shared database transaction exists.

1. Specify what an API contract must describe, distinguish OpenAPI from Swagger tooling and SOAP/WSDL, and explain how contract-first mocks and tests help. (4 marks)

2. Propose a compatible change strategy and isolate finance-specific code. Explain one benefit and one cost of SOA/ESB integration here. (2 marks)

3. Distinguish orchestration from choreography and explain how a saga handles a failed final confirmation. (2 marks)

### Question 9 — 8 marks

Two containers, one power failure

LabLink runs two web containers, a queue and its only database on one physical host. Its deployment sketch shows four unlabelled boxes and is called “the whole system”, although it excludes the eligibility provider and the student browser. Every arrow is labelled “API”. A live replica on the same host is described as a backup. A power failure takes everything down. The required RTO is 20 minutes and RPO is 5 minutes; a restore drill takes 40 minutes and the last recoverable backup is 30 minutes older than the failure.

1. Explain the shared failure domain and describe the deployment-diagram information needed to assess this architecture. (3 marks)

2. Calculate whether the recovery drill meets RTO and RPO, and explain why a live replica is not a historical backup. (3 marks)

3. Recommend a deployment/recovery improvement and an evidence-producing drill, with one cost. (2 marks)

### Question 10 — 6 marks

The one-click replacement

A manager wants to replace LabLink with a no-code workflow because a prototype took one afternoon. Another developer suggests generating the entire application by prompting an AI until it “looks right”. The prototype requires a platform-only connector, has no export plan, and gives every workflow editor access to all loan records. The production system needs reliable item exclusivity, approval audit history and maintained integrations. Only four developers support it, traffic is moderate, and all capabilities currently share one release schedule.

1. Compare no-code, low-code and vibe coding for this project, identifying a suitable bounded use and one platform risk. (3 marks)

2. Recommend an architectural starting point and a responsible validation/ownership plan, including one trade-off. (3 marks)

### Question 11 — 10 marks

A decision without a reason

LabLink must add a new eligibility provider without changes outside its integration module and must acknowledge requests within 500 ms at p95 during a 30-minute, 150-request/s peak. The lead draws technology logos and writes “microservices are scalable” as the design rationale. A four-person team would have to support twelve services, and the old application would be replaced in a single weekend. No alternative, accepted cost or automated architectural check is recorded.

1. Write one complete quality-attribute scenario from the requirements, using source, stimulus, environment, artifact, response and response measure. (3 marks)

2. Distinguish a tactic from a pattern. Outline an ADR with a justified alternative, trade-off and an automated fitness check for provider replacement. (4 marks)

3. Explain a safer legacy migration, one sensitivity/trade-off point and the influence of team structure on architecture. (3 marks)

---

## Model answers and marking guide

### Question 1 — 15 marks

Part 1 (15 marks): 1. Self-promotion and an overlong introduction consume evidence time: briefly state the problem, audience and demo objective. 2. Starting with database internals obscures user value: begin with a representative borrowing task and show technical detail only to support a relevant claim. 3. Assuming domain knowledge prevents the evaluator from judging correctness: explain roles, approval, loan states and success criteria before acting. 4. Rapid, happy-path-only clicking with no prepared contested-item data hides transitions and edge cases: rehearse a paced sequence with seeded accounts, a last-item conflict and expected results. 5. Poor prioritisation leaves core returns unshown and unsupported quality claims untested: time-box core workflows first, reserve optional features and questions, and qualify accessibility/readiness claims with evidence and limits.

- 3 each for five distinct practices: 1 identification, 1 scenario-specific assessment effect, 1 practical correction. Accept other distinct supported practices, including unsupported claims or lack of contingency planning. Do not count the same timing failure twice.

### Question 2 — 15 marks

Part 1 (5 marks): Workers remain held by slow outbound calls, exhausting concurrency and causing queued or rejected requests: response-time performance, availability and resilience suffer. Expiry makes the item eligible again; a late completion is trusted without an atomic ownership/state check, violating functional booking correctness and data integrity/consistency and undermining reliability. More servers can postpone exhaustion but cannot bound downstream latency or repair the reservation race.

- 2: worker exhaustion and linked quality attributes. 2: expiry/late-completion race and integrity or reliability. 1: limit of scaling alone. Treat single-loan correctness as a functional invariant as well as its quality impact.

Part 2 (7 marks): Accept a durable pending request and process eligibility asynchronously through a bounded queue. Commit pending state and an outbox record together so a crash cannot lose accepted work between the database and queue. Bound dependency time with timeouts, isolate outbound concurrency with a bulkhead, and open a circuit breaker on repeated failures. Apply backpressure/admission limits rather than accepting unlimited work. Confirm in a database transaction only if the reservation token/version still belongs to that request and is unexpired; enforce at most one active loan per item. A late result must fail confirmation or initiate a new safe attempt, never override a new owner. Use operation IDs for idempotent retries and display pending/failed/confirmed status honestly.

- 2: durable asynchronous acceptance with atomic publication/outbox or an equally sound alternative. 2: bounded dependency work, isolation and overload control. 2: atomic reservation validation and active-loan invariant. 1: duplicate-safe processing and truthful status.

Part 3 (3 marks): At-least-once delivery can repeat eligibility processing or confirmation after a lost acknowledgement. Store a unique operation ID and completion state, enforce the business constraint transactionally, and acknowledge after durable completion. Alternatively discuss stale pending states, queue backlog or operational complexity with monitoring, reconciliation and bounded admission.

- 1: risk introduced by proposed design. 1: explains its mechanism. 1: matching mitigation.

### Question 3 — 10 marks

Part 1 (4 marks): Student, EquipmentItem, Loan, ReturnChecklist and Deposit are suitable; Accessory is another valid concept. EquipmentItem is an entity identified by its persistent asset number despite location changes. Deposit/Money is a value object compared by amount and currency. Database connections and buttons are infrastructure/UI concerns, not the core business model.

- 1: five grounded concepts. 1: entity identity. 1: value equality. 1: business versus implementation distinction.

Part 2 (4 marks): Student 1—Loan 0..* and EquipmentItem 1—Loan 0..*: every loan has exactly one of each. Historical multiplicity does not enforce active exclusivity; separately require at most one active loan per item. The loan-owned checklist can be composition under its stated dependent lifetime. Accessories have independent existence, so ordinary association or justified shared aggregation fits; mandatory composition does not.

- 1: both historical multiplicities in both directions. 1: separate active invariant. 1: checklist composition grounded in lifetime. 1: independent accessory relationship.

Part 3 (2 marks): Layers separate responsibilities and dependencies within software; tiers describe separately deployed runtime parts. Three folders may implement layers in one process. Deployment nodes/processes and communication boundaries are needed to establish three tiers.

- 1: layers versus tiers. 1: applies distinction to folders.

### Question 4 — 8 marks

Part 1 (4 marks): A brand guide defines identity and visual rules; a design system also supplies reusable implemented components, states, behaviour and accessibility guidance. Use semantic colour/spacing/typography tokens and consistent action buttons, status badges and form/modal components. Atomic design can build these from simple controls into composed forms and page structures. A colour name alone must not decide conflicting business meanings.

- 1: distinction. 1: semantic tokens tied to inconsistency. 1: reusable components and states. 1: coherent component composition/atomic design.

Part 2 (4 marks): Colour-only errors need text and programmatic error associations. Icon-only controls need accessible names. The modal needs a visible keyboard focus and deliberate focus management/return. Excess competing actions and unclear grouping need a primary-action hierarchy, meaningful proximity/spacing and a pending/success/error response after submission. Accept inconsistent semantic colour as a separate problem when corrected explicitly.

- 1 each: four distinct problem–correction pairs grounded in the scenario.

### Question 5 — 10 marks

Part 1 (4 marks): Propagate failed test exit status and enforce required protected-branch checks; test real database integration with meaningful assertions; build an immutable pinned artifact once and promote the tested artifact; remove embedded secrets and use controlled runtime injection/rotation. Other valid pairs are a non-root minimal runtime, enforced limits/health probes, dependency pinning and artifact scanning/signing.

- 1 each: four distinct weakness–correction pairs; each correction must address the stated weakness.

Part 2 (4 marks): Plan with threats and quality targets; code/review with standards and secret scanning; build with dependency/SAST and artifact checks; test integrations and a running app with DAST; release/promote the same verified artifact; deploy with controlled rollback; operate and monitor latency, errors, vulnerabilities and incidents to feed planning. Continuous delivery keeps verified changes releasable with a release decision; continuous deployment automatically releases changes passing the defined gates.

- 2: relevant checks across development and running-system stages. 1: operational feedback into planning. 1: delivery/deployment distinction.

Part 3 (2 marks): Mocks cannot expose real schema, transaction or driver mismatches. Exercise a representative real database boundary and deliberately introduce a controlled wrong result or mutation to confirm that the relevant assertion fails.

- 1: real integration limitation. 1: deliberate defect/mutation validates assertion sensitivity.

### Question 6 — 10 marks

Part 1 (5 marks): Exactly 100/10,000 = 1% errors fails a strict below-1% threshold, and the mean cannot establish the p95 target. Saying that the slowest 5% exceed two seconds does not by itself locate the 95th-percentile boundary; inspect the actual percentile measurement rather than assuming p95 fails or passes. The arrival rate, duration, dataset and dependency conditions must match the acceptance scenario; the supplied report does not establish compliance. Run representative load testing for the peak target, stress testing beyond capacity for overload/recovery, soak testing for day-long accumulation, and volume testing for increased database size. Spike testing is another distinct valid choice for sudden bursts.

- 1: correct error calculation/threshold and rejects mean-only evidence. 1 each: four correctly distinguished activities tied to risks.

Part 2 (3 marks): SQA improves development processes through standards, reviews and enforced checks; quality control inspects/tests outputs. A fault is a defect in an artifact; a failure is observed incorrect behaviour when conditions activate it. Require explicit error handling rather than swallowing exceptions. Line coverage shows execution, not meaningful assertions or correctness on untested conditions.

- 1: QA/QC distinction. 1: fault/failure distinction. 1: justified standard and coverage limitation.

Part 3 (2 marks): First write a focused failing test demonstrating the leak/incorrect cleanup, implement the smallest fix to pass, then refactor while preserving the tests. Add the reproducer and relevant long-running/resource checks to regression testing so future changes reveal recurrence.

- 1: red–green–refactor linked to defect. 1: regression evidence for recurrence.

### Question 7 — 10 marks

Part 1 (4 marks): Loan personal data is an asset; an unauthorised student seeking it is a threat; missing object-level access checks is a vulnerability; likely disclosure and its impact constitute the risk. Authentication proves who the session represents, while authorisation checks that identity’s permission for the specific loan on every protected request.

- 2: all four risk terms mapped coherently. 2: identity versus per-object permission and scenario application.

Part 2 (3 marks): Enforce server-side ownership/role checks; use parameterised SQL and appropriate validation; use salted adaptive password hashing rather than reversible password storage, with secrets removed from source and exposed keys rotated. HTTPS protects data in transit; it does not fix access logic, query construction or stored-credential handling.

- 1 each: three appropriate controls with a coherent transport-versus-application/storage distinction.

Part 3 (3 marks): The red team exercises authorised attack paths; the blue team monitors, detects and responds; purple-team collaboration shares evidence to improve prevention and detection. Threat-model the object boundary early, review code, use SAST/dependency/secret checks and targeted dynamic/manual access and injection tests; retest fixes within the agreed scope.

- 1: red and blue roles. 1: purple collaboration and scope. 1: earlier verification matched to weaknesses.

### Question 8 — 8 marks

Part 1 (4 marks): The contract defines methods/paths, request and response schemas, types, statuses/errors, authentication and behavioural semantics such as state and idempotency. OpenAPI is a description specification commonly used for HTTP APIs; Swagger denotes associated tools. SOAP is a message protocol commonly using XML; WSDL describes service operations/messages/bindings. Agree the contract first, use mocks for parallel client work and provider/consumer checks for conformance; mocks still do not prove real integration.

- 1: contract substance. 1: OpenAPI/tooling versus SOAP/WSDL. 1: contract-first parallel workflow. 1: tests and mock limitation.

Part 2 (2 marks): Keep the old field/version during migration, document the new representation and test consumers before retiring it. Place finance translation behind an adapter and stable domain-facing interface. SOA/ESB mediation can bridge legacy protocols and centralise routing/transformation; a central bus also adds coupling, an operational bottleneck or a concentrated failure point.

- 1: compatibility migration and adapter boundary. 1: scenario-linked SOA/ESB benefit and cost.

Part 3 (2 marks): Orchestration uses a coordinator to command steps; choreography lets participants react to events. A saga uses local transactions and compensating business actions, such as refunding a collected deposit and releasing a still-owned reservation after failed confirmation. Compensation is not an automatic ACID rollback and needs idempotency, retry/reconciliation and possibly manual recovery.

- 1: coordination distinction. 1: meaningful compensation and its limits.

### Question 9 — 8 marks

Part 1 (3 marks): Containers isolate processes but all depend on one host/power boundary, so host failure removes both replicas and all state. Declare environment and scope; show browser, external provider, nodes/execution environments and deployed artifacts; label protocol, direction, sync/async nature and trust boundaries. Show state ownership and failure-domain placement rather than relying on product box names.

- 1: common host failure. 1: scope/nodes/artifacts/external actors. 1: useful links/trust/state/failure-domain annotations.

Part 2 (3 marks): Actual restoration is 40 minutes versus a maximum 20, so RTO fails. The recoverable data-loss window is 30 minutes versus 5, so RPO fails. A live replica can copy deletion/corruption and shares this host failure; an independently retained historical backup preserves earlier recoverable states.

- 1: RTO comparison. 1: RPO comparison. 1: replication/backup distinction.

Part 3 (2 marks): Place redundant stateless instances and durable state protection across independent failure domains, retain off-host historical backups or point-in-time logs, and test failover/restore with measured recovery and missing-record windows. The added infrastructure, replication management and drills cost money and operational effort; monitor replication lag and verify backup recovery rather than assuming redundancy meets targets.

- 1: placement and recovery changes matched to failure. 1: measured drill and explicit cost.

### Question 10 — 6 marks

Part 1 (3 marks): No-code uses visual configuration with little/no handwritten code; low-code combines visual tooling with custom extensions; vibe coding relies heavily on prompted generation and feedback, often without systematic understanding. AI-assisted engineering can instead retain review and verification. A bounded internal notification prototype is a plausible visual-tool use, while critical exclusivity must be proven before adoption. The proprietary connector creates lock-in; assess export/migration, permissions, costs and ownership.

- 1: three approaches distinguished. 1: justified bounded use. 1: platform risk and relevant mitigation.

Part 2 (3 marks): A modular monolith fits the small team, shared release cadence and moderate traffic while preserving loan/payment boundaries without distributed operations. Review generated logic and dependencies, enforce object permissions, test concurrent claims and failure/retry paths, maintain audit records, name an owner and document rollback/export. This sacrifices independent deployment/scaling; revisit extraction when real requirements justify it.

- 1: architecture justified by team/workload. 1: concrete verification and accountable ownership. 1: explicit architectural trade-off.

### Question 11 — 10 marks

Part 1 (3 marks): Source: student clients. Stimulus: checkout/loan requests arriving at 150 requests/s. Environment: defined peak configuration for 30 minutes with representative data and dependency behaviour. Artifact: LabLink request-acceptance path. Response: durably accept valid requests into pending state. Measure: acknowledgement latency p95 at or below 500 ms in that window. Record error/admission and backlog outcomes separately so fast rejection cannot masquerade as successful acceptance. The provider-change requirement can also form a modifiability scenario with a defined integration-team change stimulus, adapter artifact and zero outside-module changes.

- 1: source/stimulus/environment. 1: artifact/response. 1: measurable response and meaningful measurement boundary.

Part 2 (4 marks): A tactic targets a quality response, such as isolating volatility; a pattern organises collaborating structures, such as Adapter/Strategy around an eligibility interface. The ADR records context and constraints, a decision to isolate provider SDKs behind adapters, an alternative of direct imports and the consequence of added indirection/interface maintenance. Enforce a static rule forbidding provider-SDK imports outside adapters and add contract tests. A modular monolith is a defensible broader alternative to twelve services given this team.

- 1: tactic/pattern distinction. 1: context and decision. 1: real alternative and accepted cost. 1: enforceable fitness check tied to boundary.

Part 3 (3 marks): Use a strangler façade to replace one capability at a time with reversible routing and reconciled data instead of a big-bang cutover. Queue/concurrency or timeout settings are sensitivity points; increased isolation can trade latency/cost/complexity against resilience. Team communication and ownership tend to shape system boundaries (Conway’s law); choose boundaries this small team can operate, rather than inventing twelve independently owned services.

- 1: incremental strangler migration and data/routing concern. 1: explained sensitivity or trade-off point. 1: Conway/team capacity linked to boundary choice.

