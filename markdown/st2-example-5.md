# ST2 Example 5 — CT4 Style & Calculations

Scope: L17–L33 and L35 revision, including SOA (L26) and Microservices (L27). Total: 100 marks.

Original 100-mark practice paper, including 44 calculation marks. Use Auto-mark answers for fixed results; drawings and open-ended reasoning have separate rubric marks. Suggested practice time: 150 minutes. Enter numeric answers without units (units are on each label). Percentages: two decimal places, accepted within 0.005 percentage points; MTTR target hours: four decimals, within 0.00005 h. Preserve full precision while working. Keep drawings on paper or in draw.io; this page does not upload images.

Select-all practice rule: +1 for each correct selection and −1 for each incorrect selection; omitted options earn zero, and the question score is floored at zero. This is an authored practice rule, not a claim about CT4 marking.

Fixed result fields are automatically marked where provided. Drawings and open-ended reasoning use separate self-assessed rubric marks. Working is retained for review, not automatically judged. Suggested word limits carry no automatic penalty.

[Interactive and printable paper](../st2-example-5.html)

## Question paper

### Question 1 — 8 marks

SeatLink has a registration screen, registration state/commands and a domain/service layer. Draw its Model–View–ViewModel architecture on paper or in draw.io. Keep the drawing for self-assessment; the text box can hold a description. Then explain the responsibilities and interactions.

1. Draw and label Model, View and ViewModel, with labelled interaction directions. (5 marks)


2. Explain each responsibility using the scenario, including where the enrolment-capacity rule belongs. (3 marks)


### Question 2 — 4 marks

Match each software-quality metric with what it measures. Use each answer once.

Answer bank: Composite indicator of module maintainability · Dependencies between modules · Relatedness of responsibilities within a module · Number of independent control-flow paths

1. Cyclomatic complexity
2. Cohesion
3. Coupling
4. Maintainability index

### Question 3 — 24 marks

SeatLink is preparing for peak registration. Use the original deployment/capacity diagram below. A student is active when they generate requests at the stated fixed cadence; they may have overlapping requests. All capacities are aggregate hard limits with perfect load balancing. Use the fluid steady-state approximation: resource throughput = concurrent slots / seconds held. One API slot is occupied for the entire request duration. Every API pod eagerly reserves its full primary pool; there is no external pooler. All non-primary pools are shared aggregate limits as shown. The enrol/booking duration already includes broker-confirm waiting. No other bottlenecks, retries or failures occur. The broker starts empty, has enough storage and applies no backpressure; consumers sustain their stated rate. The queue is not required to stay bounded until part 7. Calculate theoretical upper bounds, not operational targets with safety headroom. Show formulas, substitutions and units.

Diagram labels (use the HTML paper for spatial relationships):

```text
HTTPS
HTTP
DB
DB
HTTP
publish + confirm
Students: 1 request / 5 s
75% reads; 25% enrolments
All requests traverse web tier
Web tier: 2 instances
Each handles 300 requests/s
Combined limit: 600 requests/s
reg-api: starts at 4 pods
40 concurrent request slots/pod
Primary pool: 12 connections/pod
Autoscaling permitted
Primary database: 140 connections
20 reserved for administration
Enrol holds connection for 100 ms
Read replica: 60 connections
Read holds connection for 50 ms
Fee service: 40 concurrent checks
Each check takes 250 ms
Each enrol needs one fee check
Broker confirms: 500 messages/s
One message per completed enrol
Email consumers: 100 messages/s
Read total time: 60 ms
Enrol total time: 400 ms
Enrol: fee 250 + DB 100 + other 50
```

1. Counting only the web tier, how many active students can be served? (3 marks)

- Combined web rate (requests/s) (1 automatic marks)
- Web-only active students (2 automatic marks)

2. What is the largest total API pod count allowed by primary connection reservations? (3 marks)

- Usable primary connections (1 automatic marks)
- Maximum total API pods (2 automatic marks)

3. At that pod count, what is the maximum enrol throughput? Compare API slots, primary transactions, fee checks and broker confirms. Reads are absent for this part. (3 marks)

- API write throughput (requests/s) (0.5 automatic marks)
- Primary transaction throughput (transactions/s) (0.5 automatic marks)
- External check throughput (checks/s) (0.5 automatic marks)
- Broker-confirm throughput (messages/s) (0.5 automatic marks)
- Maximum completed write requests/s (0.5 automatic marks)
- Write-only bottleneck (0.5 automatic marks): Web tier · API request slots · Primary database · Read replica · Fee service · Broker confirmations · Email consumers

4. What is the replica read throughput bound, and the corresponding total request bound under the stated read/write mix? (3 marks)

- Replica read throughput (reads/s) (1.5 automatic marks)
- Replica-implied total request rate (requests/s) (1.5 automatic marks)

5. Across the complete synchronous request path at the part-2 pod count, how many active students can be supported? Compare the web, API, read, write/check and confirm limits. (3 marks)

- Weighted API occupancy (seconds/request) (0.5 automatic marks)
- API total rate bound (requests/s) (0.5 automatic marks)
- Complete-path active students (0.5 automatic marks)
- Complete-path bottleneck (1.5 automatic marks): Web tier · API request slots · Primary database · Read replica · Fee service · Broker confirmations · Email consumers

6. At the part-5 load, how many email messages are waiting after 10 minutes? Start with an empty broker. (3 marks)

- Email publication rate (messages/s) (1 automatic marks)
- Waiting email messages (2 automatic marks)

7. What is the largest active-student load for which the email queue does not grow indefinitely? (3 marks)

- Maximum queue-stable publication rate (messages/s) (1 automatic marks)
- Maximum queue-stable total rate (requests/s) (1 automatic marks)
- Maximum queue-stable active students (1 automatic marks)

8. Double the number of web instances while retaining every other limit. Calculate the new supported student count and identify the new limiting resource. (3 marks)

- Active students after the proposed change (1.5 automatic marks)
- New bottleneck (1.5 automatic marks): Web tier · API request slots · Primary database · Read replica · Fee service · Broker confirmations · Email consumers

### Question 4 — 4 marks

Match each isolation-stack element with its defining role. Use each answer once.

Answer bank: Execution flow within a process sharing its address space · Process isolation and resource controls using the host kernel · Layer creating and managing virtual machines · Hardware providing processor, memory and devices

1. Physical host
2. Hypervisor
3. Container
4. Thread

### Question 5 — 8 marks

A module has length 40, fan-in 3 and fan-out 4. Its application contains 18 confirmed defects in 9 KLOC. A separate single-entry, single-exit function has three binary decisions: one loop and two if-statements (no compound Boolean predicates). Use information-flow complexity = length × (fan-in × fan-out)^2; defect density = defects / KLOC; cyclomatic complexity = binary decisions + 1.

1. Calculate original information-flow complexity. (2 marks)

- Original information-flow complexity (2 automatic marks)

2. Fan-out is reduced to 2, with length and fan-in unchanged. Calculate the new score and percentage reduction. Explain one limit of this result. (2 marks)

- New information-flow complexity (0.5 automatic marks)
- Reduction (%) (1 automatic marks)

3. Calculate defect density and give the unit. (2 marks)

- Defect density (defects/KLOC) (2 automatic marks)

4. Calculate cyclomatic complexity and state what it counts. (2 marks)

- Cyclomatic complexity (1 automatic marks)

### Question 6 — 2 marks

A test team holds expected traffic for 48 hours to detect increasing memory use and resource leaks. What is the most specific testing category?

- A. Unit testing
- B. Spike testing
- C. Soak/endurance testing
- D. Code review

### Question 7 — 4 marks

Match each term with its precise meaning. Use each answer once.

Answer bank: Capabilities exposed through agreed service boundaries · Managing message/interface changes across versions · Provider guarantee after successful completion · Caller obligation before invoking an operation

1. Contract precondition
2. Contract postcondition
3. Schema evolution
4. Service-oriented architecture

### Question 8 — 4 marks

A signed-in student can alter a registration ID in the URL and read another student’s record. Select all statements supported by this scenario. The stated practice negative-marking rule applies.

- A. Authentication alone does not enforce per-record authorisation.
- B. Hiding the ID field in the browser is a sufficient fix.
- C. The server must check access to the requested record.
- D. An automated two-account access test can check this regression.
- E. Using HTTPS by itself prevents this access flaw.
- F. A least-privilege review should include record ownership rules.

### Question 9 — 6 marks

During a SeatLink demo, the presenter speaks toward the monitor, silently waits for a 40-second job, then rapidly clicks through pages without explaining why a student needs them. Identify three distinct problems. For each, explain its effect on assessment and give one concrete correction.

Give three problem/effect/correction triples. (6 marks)


### Question 10 — 3 marks

Match each reliability term to the course definition. Use each answer once.

Answer bank: Mean operating-plus-repair cycle time · Mean restoration time after failure · Mean operating time before failure

1. MTTF
2. MTTR
3. MTBF under the course convention

### Question 11 — 12 marks

An HPC service completes three operating/failure/repair cycles. It runs for 180 hours, then takes 6 hours to restore; runs for 240 hours, then takes 10 hours to restore; and runs for 300 hours, then takes 8 hours to restore. Observation stops when the third restoration completes. All downtime is counted in the repair intervals. Use the course convention MTBF = MTTF + MTTR and Availability = MTTF / (MTTF + MTTR) × 100%. Show working. Round percentages to two decimal places; keep full precision in intermediate calculations.

1. Calculate MTTF and MTTR in hours. (4 marks)

- MTTF (hours) (2 automatic marks)
- MTTR (hours) (2 automatic marks)

2. Calculate MTBF and availability. (3 marks)

- MTBF (hours) (1 automatic marks)
- Original availability (%) (2 automatic marks)

3. Recovery automation changes MTTR to 2 hours while MTTF stays unchanged. Calculate availability and state whether fewer failures have been demonstrated. (3 marks)

- Availability after recovery automation (%) (2 automatic marks)

4. With the original MTTF, what is the maximum MTTR meeting availability ≥ 99.5%? Give hours to four decimal places and approximate minutes. Treat the unrounded value as the acceptance limit. (2 marks)

- Maximum target MTTR (hours) (1 automatic marks)
- Maximum target MTTR (approximate minutes) (1 automatic marks)

### Question 12 — 4 marks

Match each code-quality practice with its most direct outcome. Use each answer once.

Answer bank: Records non-obvious reasons for design decisions · Checks and handles unexpected conditions · Keeps a component focused on one reason to change · Communicates the purpose of variables and operations

1. Expressive naming
2. Single Responsibility Principle
3. Defensive programming
4. Comments explaining rationale

### Question 13 — 8 marks

Read this self-contained UML deployment model. Boxes show device nodes, contained execution environments and deployed artifacts; connecting lines are communication paths. In text, the browser communicates with the API host over HTTPS/TLS 1.3, and the API host communicates with the database host over PostgreSQL wire protocol/TCP 5432. Answer from the labels rather than guessing a technology.

Diagram labels (use the HTML paper for spatial relationships):

```text
HTTPS / TLS 1.3
PostgreSQL wire / TCP 5432
«device» Student laptop
«executionEnvironment» Browser
«artifact» client bundle
Vue.js user interface
«device» API host
«executionEnvironment» Node.js runtime
«artifact» registration.js
Node.js backend
«device» Database host
«executionEnvironment» PostgreSQL
Schema: Registration
«artifact» schema.sql
```

1. Is this a coherent deployment model? Give one diagram-based reason. (2 marks)

- Coherent deployment model? (1 automatic marks): Yes · No

2. Identify the backend technology and database schema. (2 marks)

- Backend technology (1 automatic marks)
- Database schema (1 automatic marks)

3. Classify registration.js and identify the environment hosting it. (2 marks)

- Classification of the backend file (1 automatic marks): Device · Execution environment · Artifact · Communication path
- Hosting execution environment (1 automatic marks)

4. Name the database communication protocol/port, and explain why drawing only the software classes would not answer a deployment question. (2 marks)

- Database protocol (0.5 automatic marks)
- Database TCP port (0.5 automatic marks)

### Question 14 — 9 marks

A team develops SeatLink with generated code and copied interface widgets. It changes a service response from numeric courseId to an incompatible nested object without telling consumers. Students sometimes submit twice because the UI gives no pending state. The deployment pipeline runs only lint checks, and the team proposes splitting every module into a separately deployed service next week to “make it scalable”.

1. Give one design-system practice and one user-feedback improvement, explaining the benefit of each. (2 marks)


2. Propose three CI/DevSecOps checks tied to the faults in this scenario. (3 marks)


3. Evaluate the proposed microservices split; give one alternative and a trade-off. (2 marks)


4. State one domain invariant and one review obligation for generated code. (2 marks)


---

## Model answers and marking guide

### Question 1 — 8 marks

Part 1 (5 marks): One valid sketch: View —user commands→ ViewModel; ViewModel —bindable state/change notifications→ View; ViewModel —service/domain operations→ Model; Model —results/state→ ViewModel. The ViewModel exposes presentation state and commands; the Model holds domain data/rules and service access. Allow platform-appropriate data-binding notation.

- 3: three clearly labelled components. 2: correct labelled interactions including View/ViewModel binding and ViewModel/Model interaction.


Part 2 (3 marks): View renders the registration screen and user interaction. ViewModel exposes selected course, pending/error states and the enrol command. Model/domain service enforces course capacity and maintains registration data; server enforcement remains necessary.

- 1 each: three scenario-grounded responsibilities; capacity rule in domain/model, with ViewModel coordinating rather than replacing it.


### Question 2 — 4 marks

1. **Number of independent control-flow paths** — Each decision adds another independent control-flow route. This metric concerns paths through code; it does not count dependencies or establish correctness.
2. **Relatedness of responsibilities within a module** — Responsibilities that contribute to one purpose belong together. Cohesion describes relationships inside a module, whereas coupling describes dependencies between modules.
3. **Dependencies between modules** — A change to one module may affect another through their dependencies. Coupling therefore describes relationships across boundaries, rather than the focus of one module.
4. **Composite indicator of module maintainability** — This combines several measures into a maintainability indicator. It is neither a raw defect count nor proof that a module is easy to change.

### Question 3 — 24 marks

Part 1 (3 marks): Web throughput = 600 requests/s. Each student produces 1/5 requests/s. Active students = 600 × 5 = 3,000. This is only a web-tier upper bound.

- Automatic result marks: 3. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **Combined web rate (requests/s): 600** (1 automatic marks). Multiply instance count by each instance’s sustainable request rate.
- **Web-only active students: 3000** (2 automatic marks). Each student emits one request every 5 seconds, so multiply web requests/s by 5.

Part 2 (3 marks): Usable connections = 140 − 20 = 120. Maximum pods = floor(120 / 12) = 10; the eleventh would reserve 132 > 120.

- Automatic result marks: 3. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **Usable primary connections: 120** (1 automatic marks). Subtract reserved administrative connections from the primary connection limit.
- **Maximum total API pods: 10** (2 automatic marks). Divide usable connections by the full reserved per-pod pool and floor to a whole pod.

Part 3 (3 marks): API slots = 400 / 0.400 = 1000 enrols/s. Primary connections = 120 / 0.100 = 1200 transactions/s. Fee checks = 40 / 0.250 = 160/s. Confirms = 500/s. Web = 600/s. Minimum = 160 enrols/s, limited by fee checks. Database-only transaction capacity is not end-to-end capacity.

- Automatic result marks: 3. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **API write throughput (requests/s): 1000** (0.5 automatic marks). Divide all API request slots by total write-request occupancy in seconds.
- **Primary transaction throughput (transactions/s): 1200** (0.5 automatic marks). Divide usable primary connections by transaction hold time in seconds.
- **External check throughput (checks/s): 160** (0.5 automatic marks). Divide check-service concurrency by one check’s duration in seconds.
- **Broker-confirm throughput (messages/s): 500** (0.5 automatic marks). The diagram gives this aggregate confirmation limit directly.
- **Maximum completed write requests/s: 160** (0.5 automatic marks). Take the smallest end-to-end bound, including the web tier.
- **Write-only bottleneck: Fee service** (0.5 automatic marks). The external check bound is lower than the API, primary, web and confirmation bounds.

Part 4 (3 marks): 60 / 0.050 = 1,200 reads/s. Because reads are 75% of requests, total request bound = 1,200 / 0.75 = 1,600 requests/s.

- Automatic result marks: 3. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **Replica read throughput (reads/s): 1200** (1.5 automatic marks). Use replica connection hold time, not the complete read duration.
- **Replica-implied total request rate (requests/s): 1600.0** (1.5 automatic marks). Divide the read rate by the read fraction because only that fraction of total traffic uses this path.

Part 5 (3 marks): Mean API occupancy = 0.75 × 0.06 + 0.25 × 0.4 = 0.145 s/request; API bound = 400 / 0.145 = 2758.62 total requests/s. Other total-request bounds: web 600; replica 1600; primary 4800; fee 640; broker confirms 2000. Minimum = 600 requests/s. Active students = 600 × 5 = 3,000. Web is the bottleneck; enrolments occur at 150/s.

- Automatic result marks: 3. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **Weighted API occupancy (seconds/request): 0.145** (0.5 automatic marks). Weight each full request duration by its share of traffic.
- **API total rate bound (requests/s): 2758.6206896551726** (0.5 automatic marks). Divide all API slots by weighted occupancy; two decimal places are sufficient.
- **Complete-path active students: 3000** (0.5 automatic marks). The smallest mix-adjusted total bound is 600 requests/s; multiply by the 5-second cadence.
- **Complete-path bottleneck: Web tier** (1.5 automatic marks). Compare every limit in total requests/s, rather than comparing a read rate directly with a write rate.

Part 6 (3 marks): Arrival rate = 600 × 0.25 = 150 messages/s. Net queue growth = 150 − 100 = 50 messages/s. Elapsed time = 10 × 60 = 600 seconds. Waiting messages = max(0, 50 × 600) = 30,000. Consumer throughput is distinct from broker-confirm throughput.

- Automatic result marks: 3. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **Email publication rate (messages/s): 150.0** (1 automatic marks). Multiply completed total requests/s by the write fraction; each write emits one message.
- **Waiting email messages: 30000** (2 automatic marks). Subtract 100 consumer messages/s, then multiply net growth by 600 seconds.

Part 7 (3 marks): For a bounded queue in this deterministic model, message arrival must be ≤ 100/s. Total request bound = 100 / 0.25 = 400/s. Other bounds are higher. Active students ≤ 400 × 5 = 2,000. Equality is the theoretical limit; real variable workloads need spare capacity.

- Automatic result marks: 3. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **Maximum queue-stable publication rate (messages/s): 100** (1 automatic marks). For a bounded queue, sustained arrivals cannot exceed sustained consumer processing.
- **Maximum queue-stable total rate (requests/s): 400.0** (1 automatic marks). Divide the publication/consumer rate by the write fraction.
- **Maximum queue-stable active students: 2000** (1 automatic marks). Multiply queue-stable total rate by cadence and verify that other resource bounds are higher.

Part 8 (3 marks): The web limit becomes 1,200 requests/s. Fee checks still cap enrolments at 160/s, hence total traffic at 160 / 0.25 = 640 requests/s. Replica permits 1,600 total requests/s; API slots permit 400 / 0.145 ≈ 2,758.62 total requests/s. New capacity = 640 × 5 = 3,200 active students, limited by the fee service. Extra web instances do not remove that dependency limit.

- Automatic result marks: 3. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **Active students after the proposed change: 3200** (1.5 automatic marks). Recompute the changed resource and take the minimum of all unchanged and changed bounds.
- **New bottleneck: Fee service** (1.5 automatic marks). After the change, fee throughput allows only 640 total requests/s.

### Question 4 — 4 marks

1. **Hardware providing processor, memory and devices** — The host is the actual machine supplying CPU, memory and devices. Virtual machines and containers consume these resources through software layers.
2. **Layer creating and managing virtual machines** — A hypervisor provides virtual hardware and manages guest virtual machines. It differs from container isolation, which normally shares the host kernel.
3. **Process isolation and resource controls using the host kernel** — Namespaces, resource controls and related restrictions isolate processes while they use the host kernel. A container does not normally contain a separate booted guest kernel.
4. **Execution flow within a process sharing its address space** — Threads are execution flows within a process and share that process’s address space. They are not independent machines or container runtimes.

### Question 5 — 8 marks

Part 1 (2 marks): 40 × (3 × 4)² = 40 × 144 = 5,760. Square the product of fan-in and fan-out.

- Automatic result marks: 2. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **Original information-flow complexity: 5760** (2 automatic marks). Multiply length by the square of fan-in × fan-out; do not square length.

Part 2 (2 marks): New score = 40 × (3 × 2)² = 1440. Reduction = (5760 − 1440) / 5760 × 100% = 75.00%. This predictor alone does not prove correctness or maintainability; functional checks and contextual review remain necessary.

- Automatic result marks: 1.5. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.
- Self-assessed reasoning: 0.5 marks. Explain why the metric does not prove correctness/maintainability.

- **New information-flow complexity: 1440** (0.5 automatic marks). Keep length and fan-in unchanged; substitute the new fan-out.
- **Reduction (%): 75.0** (1 automatic marks). Use (old − new) / old × 100; round to two decimals.

Part 3 (2 marks): 18 / 9 = 2 defects/KLOC. The KLOC denominator is already in thousands of lines; do not divide the result by another thousand.

- Automatic result marks: 2. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **Defect density (defects/KLOC): 2.0** (2 automatic marks). Divide defect count by size already expressed in KLOC; do not divide again by 1,000.

Part 4 (2 marks): 3 + 1 = 4. It counts linearly independent control-flow paths under the stated simplified binary-decision model; it is different from information-flow complexity.

- Automatic result marks: 1. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.
- Self-assessed reasoning: 1 marks. Explain that cyclomatic complexity counts independent control-flow paths.

- **Cyclomatic complexity: 4** (1 automatic marks). Under the stated binary-decision model, add one to the decision count.

### Question 6 — 2 marks

Correct: C.

The long duration is intended to expose accumulation; a spike concerns an abrupt change in load.

- A. Incorrect: Unit tests check a small isolated unit; the scenario describes sustained whole-service traffic.
- B. Incorrect: Spike testing observes abrupt changes, not accumulation over 48 hours.
- C. Correct: Soak testing sustains load long enough for memory/resource accumulation to appear.
- D. Incorrect: Code review inspects an implementation; it does not execute a long-running workload.

### Question 7 — 4 marks

1. **Caller obligation before invoking an operation** — A precondition must hold before the provider is obliged to perform the operation. For example, the caller may need to supply a valid booking identifier.
2. **Provider guarantee after successful completion** — A postcondition states the result or invariant guaranteed after successful completion when preconditions hold. It is a provider obligation, not a prerequisite.
3. **Managing message/interface changes across versions** — Changing fields, types or meaning can break consumers. Versioning, compatibility rules and migration allow interfaces/messages to change deliberately.
4. **Capabilities exposed through agreed service boundaries** — Business capabilities are accessed through agreed service contracts. The concept is about capability boundaries and interfaces, not simply putting every class in a separate process.

### Question 8 — 4 marks

Correct: A, C, D, F.

The failure is object-level authorisation. B and E do not enforce who may access a record; A, C, D and F address the evidenced defect.

- A. Correct: A valid login establishes identity but does not establish permission to view every record.
- B. Incorrect: A user can bypass the interface and send a modified request directly.
- C. Correct: Access must be checked on the server against the particular record and requesting user.
- D. Correct: Use two separate users and verify that one cannot access the other’s private record.
- E. Incorrect: HTTPS protects traffic in transit; it does not decide which authenticated user owns a record.
- F. Correct: Least privilege should restrict access to the appropriate owned or authorised records.

### Question 9 — 6 marks

Part 1 (6 marks): 1. Speaking to the monitor makes the explanation hard to hear and weakens engagement: face the panel, project clearly and keep the display visible. 2. Silent waiting obscures engineering: explain worker execution, processing state and an implementation trade-off, or demonstrate another feature while the job runs. 3. Uncontextualised clicking forces the panel to infer intent: introduce the student’s goal, explain each meaningful state transition and show its outcome.

- 2 each for three distinct triples: 0.5 problem, 0.5 effect, 1 concrete correction.


### Question 10 — 3 marks

1. **Mean operating time before failure** — Sum operating intervals and divide by observed failures. Repair intervals are excluded from the operating-time numerator.
2. **Mean restoration time after failure** — Sum restoration intervals and divide by completed restorations. It measures recovery duration, rather than time spent operating successfully.
3. **Mean operating-plus-repair cycle time** — For this course, MTBF includes the mean operating interval and mean repair interval: MTTF + MTTR. Do not substitute it directly for uptime in the availability numerator.

### Question 11 — 12 marks

Part 1 (4 marks): Total operating time = 180 + 240 + 300 = 720 h; three failures, so MTTF = 720 / 3 = 240 h. Total repair time = 6 + 10 + 8 = 24 h; MTTR = 24 / 3 = 8 h.

- Automatic result marks: 4. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **MTTF (hours): 240** (2 automatic marks). Convert operating intervals to hours, sum them and divide by three failures.
- **MTTR (hours): 8** (2 automatic marks). Sum restoration durations only and divide by three restorations.

Part 2 (3 marks): MTBF = 240 + 8 = 248 h. Availability = 240 / 248 × 100% = 96.77%. This agrees with total uptime / total observed cycle time.

- Automatic result marks: 3. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **MTBF (hours): 248** (1 automatic marks). Use the stated course convention: MTTF + MTTR.
- **Original availability (%): 96.7741935483871** (2 automatic marks). Divide mean uptime by mean uptime plus mean repair time, then multiply by 100; two decimal places.

Part 3 (3 marks): Availability = 240 / (240 + 2) × 100% = 99.17%. Fewer failures have not been demonstrated: mean operating time is unchanged; restoration is faster. Availability improves through reduced downtime.

- Automatic result marks: 2. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.
- Self-assessed reasoning: 1 marks. Explain that faster restoration improves availability without demonstrating fewer failures.

- **Availability after recovery automation (%): 99.17355371900827** (2 automatic marks). Keep MTTF at 240 h; substitute the faster MTTR in the denominator; two decimal places.

Part 4 (2 marks): 240 / (240 + r) ≥ 0.995; hence r ≤ 240 × (1 / 0.995 − 1) = 1.2060 h ≈ 72.36 minutes. The exact unrounded expression is the limit; a rounded-up repair target could narrowly fail it.

- Automatic result marks: 2. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **Maximum target MTTR (hours): 1.2060301507537474** (1 automatic marks). Rearrange A = 240 / (240 + r): r ≤ 240 × (1/A − 1). Enter four decimal places.
- **Maximum target MTTR (approximate minutes): 72.36180904522485** (1 automatic marks). Multiply the unrounded hour limit by 60; two decimal places.

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

Part 2 (2 marks): Backend: Node.js. Main schema: Registration. PostgreSQL is the database engine, not the schema name.

- Automatic result marks: 2. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **Backend technology: Node.js** (1 automatic marks). Read the backend runtime/technology label on the API host.
- **Database schema: Registration** (1 automatic marks). The named schema is separate from PostgreSQL, which is the database engine.

Part 3 (2 marks): registration.js is a deployed artifact hosted in the Node.js runtime on the API host.

- Automatic result marks: 2. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.

- **Classification of the backend file: Artifact** (1 automatic marks). The file is deployed executable/software content, rather than a physical machine or runtime.
- **Hosting execution environment: Node.js runtime** (1 automatic marks). The deployed file sits in the named runtime within the API host.

Part 4 (2 marks): PostgreSQL wire protocol over TCP port 5432. A class diagram shows software types and relationships; a deployment diagram additionally locates runtime artifacts on execution environments/devices and shows communication paths.

- Automatic result marks: 1. Each field is marked independently using the disclosed values/tolerances; method in the working box is retained for review and does not receive automatic credit.
- Self-assessed reasoning: 1 marks. Distinguish runtime deployment placement/communication from class structure.

- **Database protocol: PostgreSQL wire protocol** (0.5 automatic marks). The connection to the database is explicitly labelled PostgreSQL wire protocol.
- **Database TCP port: 5432** (0.5 automatic marks). Read the database communication-path label; 5432 is the port shown.

### Question 14 — 9 marks

Part 1 (2 marks): Adopt documented reusable form/validation components and common interaction rules to reduce inconsistent interfaces. Disable or safely handle repeat submission while showing pending/success/failure state, so students understand progress; server idempotency is still needed for retries.

- 1: reusable design-system practice with benefit. 1: specific feedback improvement with benefit.


Part 2 (3 marks): Add consumer/provider contract compatibility tests for the changed response; an integration test verifying duplicate-safe enrolment and real boundary behaviour; and security/static/dependency checks plus review of generated code before release. Fail the pipeline on stated violations and retain evidence.

- 1 each: three distinct scenario-linked checks. Accept accessibility/UI regression checks if well justified; lint alone does not prove these behaviours.


Part 3 (2 marks): Splitting every module introduces distributed communication, data and release costs without demonstrating a measured bottleneck or cohesive service boundaries. A modular monolith with targeted worker/service extraction can preserve simpler transactions while scaling measured hotspots; independent deployment is limited until extraction. Accept a selective microservices proposal with ownership and operations support.

- 1: causal critique. 1: suitable alternative and relevant trade-off.


Part 4 (2 marks): Invariant: successful active enrolments must not exceed course capacity, enforced atomically on the server. Generated code must be understood and checked against requirements, security and tests by the owning team; plausible output is not evidence of correctness.

- 1: grounded domain invariant. 1: concrete generated-code review responsibility.


