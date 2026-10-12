# ST2 Example 6 — CT4 Style & Calculations — Memorandum

Total: 100 marks. Original 100-mark practice paper, including 44 calculation marks. Use Auto-mark answers for fixed results; drawings and open-ended reasoning have separate rubric marks. Suggested practice time: 150 minutes. Enter numeric answers without units (units are on each label). Percentages: two decimal places, accepted within 0.005 percentage points; MTTR target hours: four decimals, within 0.00005 h. Preserve full precision while working. Keep drawings on paper or in draw.io; this page does not upload images.

Select-all practice rule: +1 for each correct selection and −1 for each incorrect selection; omitted options earn zero, and the question score is floored at zero. This is an authored practice rule, not a claim about CT4 marking.

[Question paper](../st2-example-6.html)

## Model answers and marking guide

### Question 1 — 8 marks

Part 1 (5 marks): One valid MVC sketch: User interacts with View; input is routed to Controller; Controller invokes Model operations; View renders Model state using the chosen MVC variant. Label the Controller’s selection/update of the View where applicable. MVC implementations differ in observation/rendering direction; award a coherent variant with separated responsibilities.

- 3: correctly labelled components. 2: coherent labelled input/control/state/rendering interactions.


Part 2 (3 marks): View displays laboratory availability and booking outcomes. Controller interprets reserve/cancel input and coordinates the operation. Model/domain service maintains booking state and enforces the no-overlap rule atomically on the server.

- 1 each: three scenario-grounded responsibilities, with invariant enforcement in the model/domain.


### Question 2 — 4 marks

1. **Number of independent control-flow paths** — Each decision adds another independent control-flow route. This metric concerns paths through code; it does not count dependencies or establish correctness.
2. **Relatedness of responsibilities within a module** — Responsibilities that contribute to one purpose belong together. Cohesion describes relationships inside a module, whereas coupling describes dependencies between modules.
3. **Dependencies between modules** — A change to one module may affect another through their dependencies. Coupling therefore describes relationships across boundaries, rather than the focus of one module.
4. **Composite indicator of module maintainability** — This combines several measures into a maintainability indicator. It is neither a raw defect count nor proof that a module is easy to change.

### Question 3 — 24 marks

Part 1 (3 marks): Web throughput = 720 requests/s. Each student produces 1/6 requests/s. Active students = 720 × 6 = 4,320. This is only a web-tier upper bound.

- Automatic result marks: 3. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **Combined web rate (requests/s): 720** (1 automatic marks). Multiply instance count by each instance’s sustainable request rate.
- **Web-only active students: 4320** (2 automatic marks). Each student emits one request every 6 seconds, so multiply web requests/s by 6.

Part 2 (3 marks): Usable connections = 150 − 30 = 120. Maximum pods = floor(120 / 15) = 8; the ninth would reserve 135 > 120.

- Automatic result marks: 3. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **Usable primary connections: 120** (1 automatic marks). Subtract reserved administrative connections from the primary connection limit.
- **Maximum total API pods: 8** (2 automatic marks). Divide usable connections by the full reserved per-pod pool and floor to a whole pod.

Part 3 (3 marks): API slots = 240 / 0.600 = 400 bookings/s. Primary connections = 120 / 0.120 = 1000 transactions/s. Eligibility checks = 30 / 0.300 = 100/s. Confirms = 250/s. Web = 720/s. Minimum = 100 bookings/s, limited by eligibility checks. Database-only transaction capacity is not end-to-end capacity.

- Automatic result marks: 3. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **API write throughput (requests/s): 400** (0.5 automatic marks). Divide all API request slots by total write-request occupancy in seconds.
- **Primary transaction throughput (transactions/s): 1000** (0.5 automatic marks). Divide usable primary connections by transaction hold time in seconds.
- **External check throughput (checks/s): 100** (0.5 automatic marks). Divide check-service concurrency by one check’s duration in seconds.
- **Broker-confirm throughput (messages/s): 250** (0.5 automatic marks). The diagram gives this aggregate confirmation limit directly.
- **Maximum completed write requests/s: 100** (0.5 automatic marks). Take the smallest end-to-end bound, including the web tier.
- **Write-only bottleneck: Eligibility service** (0.5 automatic marks). The external check bound is lower than the API, primary, web and confirmation bounds.

Part 4 (3 marks): 40 / 0.080 = 500 reads/s. Because reads are 80% of requests, total request bound = 500 / 0.80 = 625 requests/s.

- Automatic result marks: 3. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **Replica read throughput (reads/s): 500** (1.5 automatic marks). Use replica connection hold time, not the complete read duration.
- **Replica-implied total request rate (requests/s): 625.0** (1.5 automatic marks). Divide the read rate by the read fraction because only that fraction of total traffic uses this path.

Part 5 (3 marks): Mean API occupancy = 0.8 × 0.1 + 0.2 × 0.6 = 0.2 s/request; API bound = 240 / 0.2 = 1200.00 total requests/s. Other total-request bounds: web 720; replica 625; primary 5000; eligibility 500; broker confirms 1250. Minimum = 500 requests/s. Active students = 500 × 6 = 3,000. Eligibility is the bottleneck; bookings occur at 100/s.

- Automatic result marks: 3. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **Weighted API occupancy (seconds/request): 0.2** (0.5 automatic marks). Weight each full request duration by its share of traffic.
- **API total rate bound (requests/s): 1200.0** (0.5 automatic marks). Divide all API slots by weighted occupancy; two decimal places are sufficient.
- **Complete-path active students: 3000** (0.5 automatic marks). The smallest mix-adjusted total bound is 500 requests/s; multiply by the 6-second cadence.
- **Complete-path bottleneck: Eligibility service** (1.5 automatic marks). Compare every limit in total requests/s, rather than comparing a read rate directly with a write rate.

Part 6 (3 marks): Arrival rate = 500 × 0.2 = 100 messages/s. Net queue growth = 100 − 70 = 30 messages/s. Elapsed time = 15 × 60 = 900 seconds. Waiting messages = max(0, 30 × 900) = 27,000. Consumer throughput is distinct from broker-confirm throughput.

- Automatic result marks: 3. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **Email publication rate (messages/s): 100.0** (1 automatic marks). Multiply completed total requests/s by the write fraction; each write emits one message.
- **Waiting email messages: 27000** (2 automatic marks). Subtract 70 consumer messages/s, then multiply net growth by 900 seconds.

Part 7 (3 marks): For a bounded queue in this deterministic model, message arrival must be ≤ 70/s. Total request bound = 70 / 0.2 = 350/s. Other bounds are higher. Active students ≤ 350 × 6 = 2,100. Equality is the theoretical limit; real variable workloads need spare capacity.

- Automatic result marks: 3. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **Maximum queue-stable publication rate (messages/s): 70** (1 automatic marks). For a bounded queue, sustained arrivals cannot exceed sustained consumer processing.
- **Maximum queue-stable total rate (requests/s): 350.0** (1 automatic marks). Divide the publication/consumer rate by the write fraction.
- **Maximum queue-stable active students: 2100** (1 automatic marks). Multiply queue-stable total rate by cadence and verify that other resource bounds are higher.

Part 8 (3 marks): Eligibility capacity becomes 60 / 0.300 = 200 bookings/s, permitting 1,000 total requests/s. Reads remain capped at 40 / 0.080 = 500/s, permitting 500 / 0.80 = 625 total requests/s. Web permits 720/s and API slots permit 240 / 0.20 = 1,200 total requests/s. New capacity = 625 × 6 = 3,750 active students, limited by read-replica connections.

- Automatic result marks: 3. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **Active students after the proposed change: 3750** (1.5 automatic marks). Recompute the changed resource and take the minimum of all unchanged and changed bounds.
- **New bottleneck: Read replica** (1.5 automatic marks). After the change, the replica allows only 625 total requests/s.

### Question 4 — 4 marks

1. **Hardware providing processor, memory and devices** — The host is the actual machine supplying CPU, memory and devices. Virtual machines and containers consume these resources through software layers.
2. **Layer creating and managing virtual machines** — A hypervisor provides virtual hardware and manages guest virtual machines. It differs from container isolation, which normally shares the host kernel.
3. **Process isolation and resource controls using the host kernel** — Namespaces, resource controls and related restrictions isolate processes while they use the host kernel. A container does not normally contain a separate booted guest kernel.
4. **Execution flow within a process sharing its address space** — Threads are execution flows within a process and share that process’s address space. They are not independent machines or container runtimes.

### Question 5 — 8 marks

Part 1 (2 marks): 25 × (4 × 3)² = 25 × 144 = 3,600. Square the product of fan-in and fan-out.

- Automatic result marks: 2. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **Original information-flow complexity: 3600** (2 automatic marks). Multiply length by the square of fan-in × fan-out; do not square length.

Part 2 (2 marks): New score = 25 × (4 × 1)² = 400. Reduction = (3600 − 400) / 3600 × 100% = 88.89%. This predictor alone does not prove correctness or maintainability; functional checks and contextual review remain necessary.

- Automatic result marks: 1.5. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.
- Self-assessed reasoning: 0.5 marks. Explain why the metric does not prove correctness/maintainability.

- **New information-flow complexity: 400** (0.5 automatic marks). Keep length and fan-in unchanged; substitute the new fan-out.
- **Reduction (%): 88.88888888888889** (1 automatic marks). Use (old − new) / old × 100; round to two decimals.

Part 3 (2 marks): 24 / 8 = 3 defects/KLOC. The KLOC denominator is already in thousands of lines; do not divide the result by another thousand.

- Automatic result marks: 2. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **Defect density (defects/KLOC): 3.0** (2 automatic marks). Divide defect count by size already expressed in KLOC; do not divide again by 1,000.

Part 4 (2 marks): 4 + 1 = 5. It counts linearly independent control-flow paths under the stated simplified binary-decision model; it is different from information-flow complexity.

- Automatic result marks: 1. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.
- Self-assessed reasoning: 1 marks. Explain that cyclomatic complexity counts independent control-flow paths.

- **Cyclomatic complexity: 5** (1 automatic marks). Under the stated binary-decision model, add one to the decision count.

### Question 6 — 2 marks

Correct: A.

The defining feature is an abrupt burst and drop. Stress testing instead emphasises exceeding sustainable limits and overload/recovery.

- A. Correct: The abrupt rise and fall identifies spike testing.
- B. Incorrect: Soak testing maintains load for a long period to expose accumulation.
- C. Incorrect: A unit test targets an isolated unit and is not defined by a sudden traffic burst.
- D. Incorrect: Code review is inspection, rather than executing a workload change.

### Question 7 — 4 marks

1. **Number of other components calling a component** — Count incoming component dependencies: how many other components call this one. High fan-in can indicate reuse and also a large impact if this component changes.
2. **Number of other components called by a component** — Count outgoing component dependencies: how many other components this one calls. Many outgoing dependencies can increase coordination and change complexity.
3. **Repeated execution has the same intended effect as one execution** — Repeating an operation preserves the intended business effect of executing it once. This helps handle retries and duplicate delivery; it does not require that the operation run only once.
4. **Verifies the interface behaviour that a consumer depends on** — The check captures the response/interface behaviour that a consumer actually needs. It can detect incompatible provider changes that unit tests inside either service miss.

### Question 8 — 4 marks

Correct: A, C, E, F.

Parameter binding separates data from SQL structure. Least privilege, authorised tests and code review address exposure and regression. Client validation is bypassable; logs should be designed to limit sensitive content rather than universally disabled.

- A. Correct: Parameter binding treats the search term as data instead of concatenated SQL structure.
- B. Incorrect: Client validation can be bypassed; server-side controls remain necessary.
- C. Correct: Restricting database privileges limits damage if an injection or other compromise occurs.
- D. Incorrect: Disabling all logs removes evidence; design safe useful logs without recording sensitive search data unnecessarily.
- E. Correct: Controlled authorised injection tests verify how the real boundary handles malicious inputs.
- F. Correct: Generated code may recreate unsafe string concatenation and remains the team’s review responsibility.

### Question 9 — 6 marks

Part 1 (6 marks): 1. Unsupported availability claim confuses a demonstration with sustained evidence: present an observed failure/repair record and clearly stated measurement window. 2. An unexplained admin-only screen hides user intent and role behaviour: introduce a student task and demonstrate representative role permissions. 3. Repeated refreshes consume evidence time and obscure dependency failure handling: time-box recovery, show honest pending/error state, and use a disclosed fallback or recording with its limitations.

- 2 each for three distinct triples: 0.5 problem, 0.5 effect, 1 concrete correction.


### Question 10 — 3 marks

1. **Mean operating time before failure** — Sum operating intervals and divide by observed failures. Repair intervals are excluded from the operating-time numerator.
2. **Mean restoration time after failure** — Sum restoration intervals and divide by completed restorations. It measures recovery duration, rather than time spent operating successfully.
3. **Mean operating-plus-repair cycle time** — For this course, MTBF includes the mean operating interval and mean repair interval: MTTF + MTTR. Do not substitute it directly for uptime in the availability numerator.

### Question 11 — 12 marks

Part 1 (4 marks): 7.5 days × 24 = 180 h; 2 weeks × 7 × 24 = 336 h. Total operating time = 180 + 336 + 204 = 720 h; MTTF = 720 / 3 = 240 h. Repair time = 3 + 9 + 6 = 18 h; MTTR = 18 / 3 = 6 h.

- Automatic result marks: 4. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **MTTF (hours): 240** (2 automatic marks). Convert operating intervals to hours, sum them and divide by three failures.
- **MTTR (hours): 6** (2 automatic marks). Sum restoration durations only and divide by three restorations.

Part 2 (3 marks): MTBF = 240 + 6 = 246 h. Availability = 240 / 246 × 100% = 97.56%. This agrees with total uptime / total observed cycle time.

- Automatic result marks: 3. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **MTBF (hours): 246** (1 automatic marks). Use the stated course convention: MTTF + MTTR.
- **Original availability (%): 97.5609756097561** (2 automatic marks). Divide mean uptime by mean uptime plus mean repair time, then multiply by 100; two decimal places.

Part 3 (3 marks): Availability = 240 / (240 + 1.5) × 100% = 99.38%. Fewer failures have not been demonstrated: mean operating time is unchanged; restoration is faster. Availability improves through reduced downtime.

- Automatic result marks: 2. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.
- Self-assessed reasoning: 1 marks. Explain that faster restoration improves availability without demonstrating fewer failures.

- **Availability after recovery automation (%): 99.37888198757764** (2 automatic marks). Keep MTTF at 240 h; substitute the faster MTTR in the denominator; two decimal places.

Part 4 (2 marks): 240 / (240 + r) ≥ 0.999; hence r ≤ 240 × (1 / 0.999 − 1) = 0.2402 h ≈ 14.41 minutes. The exact unrounded expression is the limit; a rounded-up repair target could narrowly fail it.

- Automatic result marks: 2. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **Maximum target MTTR (hours): 0.24024024024026147** (1 automatic marks). Rearrange A = 240 / (240 + r): r ≤ 240 × (1/A − 1). Enter four decimal places.
- **Maximum target MTTR (approximate minutes): 14.414414414415688** (1 automatic marks). Multiply the unrounded hour limit by 60; two decimal places.

### Question 12 — 4 marks

1. **Communicates the purpose of variables and operations** — A useful name reveals intent and reduces the amount of surrounding code a reader must inspect. It helps comprehension but does not replace tests.
2. **Keeps a component focused on one reason to change** — Responsibilities that change for different reasons are separated. This limits unrelated change impact and makes focused testing and maintenance easier.
3. **Checks and handles unexpected conditions** — Validate assumptions and handle unexpected inputs or states deliberately so they do not become uncontrolled failures. Silently ignoring every error is not defensive behaviour.
4. **Records non-obvious reasons for design decisions** — Code often shows what happens, but not why a trade-off was chosen. A rationale comment records the reason rather than repeating an obvious statement.

### Question 13 — 8 marks

Part 1 (2 marks): Yes. It shows artifacts located in execution environments on device nodes and labelled communication paths between deployed nodes. Naming a technology alone would not establish the deployment placement.

- Automatic result marks: 1. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.
- Self-assessed reasoning: 1 marks. Justify deployment validity from artifact placement and communication paths.

- **Coherent deployment model?: Yes** (1 automatic marks). The model places artifacts inside execution environments on devices and labels communication paths.

Part 2 (2 marks): Backend: Python. Main schema: Bookings. PostgreSQL is the database engine, not the schema name.

- Automatic result marks: 2. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **Backend technology: Python** (1 automatic marks). Read the backend runtime/technology label on the API host.
- **Database schema: Bookings** (1 automatic marks). The named schema is separate from PostgreSQL, which is the database engine.

Part 3 (2 marks): booking.py is a deployed artifact hosted in the Python runtime on the API host.

- Automatic result marks: 2. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **Classification of the backend file: Artifact** (1 automatic marks). The file is deployed executable/software content, rather than a physical machine or runtime.
- **Hosting execution environment: Python runtime** (1 automatic marks). The deployed file sits in the named runtime within the API host.

Part 4 (2 marks): PostgreSQL wire protocol over TCP port 5432. A class diagram shows software types and relationships; a deployment diagram additionally locates runtime artifacts on execution environments/devices and shows communication paths.

- Automatic result marks: 1. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.
- Self-assessed reasoning: 1 marks. Distinguish runtime deployment placement/communication from class structure.

- **Database protocol: PostgreSQL wire protocol** (0.5 automatic marks). The connection to the database is explicitly labelled PostgreSQL wire protocol.
- **Database TCP port: 5432** (0.5 automatic marks). Read the database communication-path label; 5432 is the port shown.

### Question 14 — 9 marks

Part 1 (2 marks): Use a shared accessible booking/status component with consistent interaction and validation rules. Show accepted/pending until completion is known, then confirmed/failed with recovery guidance; this makes the displayed state truthful and reduces blind retries.

- 1: shared design-system practice with benefit. 1: truthful state/feedback change with benefit.


Part 2 (3 marks): Add a consumer contract compatibility check for the status field, an integration/fault-injection test for timeout/retry using a stable booking ID, and security/dependency/static checks plus manual review of the generated adapter and platform permissions. Evaluate the real boundary, not only a mocked success.

- 1 each: three distinct scenario-linked checks with purpose.


Part 3 (2 marks): Direct cross-service table access couples schema changes and bypasses ownership/invariants, undermining independent releases. Let the booking owner enforce its data rules through a versioned API/event contract; other services call that boundary. This introduces network/consistency costs that need explicit handling.

- 1: causal coupling/ownership cost. 1: appropriate owner boundary and contract.


Part 4 (2 marks): Invariant: a resource/time slot must not have overlapping successful bookings; enforce uniqueness/transactions and preserve a stable idempotency key for repeated requests. Review and test workflow permissions, timeout/retry and exported/generated code; assign ownership and retain a rollback/migration path for platform constraints.

- 1: grounded invariant with enforcement. 1: concrete platform/generated-code risk mitigation.


