# CT4 Example 1

Scope: L28–L33 plus L35 revision. Total: 25.5 marks.

Original practice paper based on the reference assessment style. Not an official paper or prediction. No official duration was available in the supplied export.

Each correct selection earns the question marks divided by the number of correct options. Each incorrect selection deducts the same amount. Omitted options earn zero. Each question is floored at zero. This explicit practice rule is not asserted to be the original marking formula.

Written answers are self-assessed using the rubric. Suggested word limits carry no automatic penalty.

[Interactive and printable paper](../ct4-example-1.html)

## Question paper

### Question 1 — 0.5 marks

A deployment diagram showing three application replicas is sufficient evidence that the application survives a host failure.

- A. True
- B. False

### Question 2 — 0.5 marks

Once a caller has been authenticated, object-level authorisation can be omitted for internal API requests.

- A. True
- B. False

### Question 3 — 6 marks

Analyse the ParcelDesk deployment diagram. For each question, write only the letter of the best answer. All assumptions needed for the questions appear in the diagram or question text.

Diagram labels (use the HTML paper for spatial relationships):

```text
ParcelDesk / production — placement and data paths
Host A · Zone East
API v3: two instances
Database primary: one instance
All three share Host A
Host B · Zone West
Database standby
Asynchronous replication from A
Last observed lag: 40 seconds
Queue Q → payment worker
Durable accepted-order queue
At-least-once delivery
Poison-message dead-letter route
Backup store
Historical backups retained separately
Last successful restore: yesterday
RPO target: 60 s; RTO target: 10 min
replicate
publish
backup
Links show labelled logical paths; physical arrows end at dots. Both zones are in Region R.
Host A loss removes both APIs and the primary. Standby promotion/reconnection require a runbook.
```

1. 1. Host A is lost. Which assessment is correct? A: Both API instances survive. B: The standby automatically proves ten-minute recovery. C: The database copy may survive, but no API instance remains. D: Separate backups make request handling uninterrupted.
2. 2. The worker receives the same order message twice. Which mechanism most directly prevents a second charge? A: A longer request timeout. B: A stable business-operation identity with idempotent processing. C: An extra API process. D: A different ID on every retry.
3. 3. The diagram reports 40 seconds of lag and an RPO target of 60 seconds. Which statement is justified? A: The target is guaranteed for every future incident. B: RTO must also be 40 seconds. C: Replication replaces backups. D: The observation is within the target, but lag and recovery need continued measurement.

### Question 4 — 2 marks

With reference to the diagram, select all statements that are supported by the information shown.

- A. Both API instances share the same host-level failure domain.
- B. Putting the standby in another zone removes every regional dependency.
- C. The queue eliminates the need to handle duplicate messages.
- D. Asynchronous replication can leave acknowledged writes absent from the standby.
- E. Retained historical backups address a different recovery problem from live replicas.
- F. A dead-letter route provides a place to isolate messages that repeatedly fail processing.

### Question 5 — 0.5 marks

An SBOM identifies software components, but it does not certify that the application has no vulnerabilities.

- A. True
- B. False

### Question 6 — 4 marks

Match each non-functional test to the purpose that most clearly distinguishes it.

Answer bank: Spike testing · Stress testing · Load testing · Soak testing

1. Sustained activity intended to expose a memory leak over several hours
2. A sudden increase from ordinary demand to a large burst
3. Demand deliberately raised beyond the expected capacity to observe failure and recovery
4. Evaluation under a specified normal and planned peak workload

### Question 7 — 0.5 marks

Software quality assurance includes checking whether agreed review and development procedures are actually followed.

- A. True
- B. False

### Question 8 — 0.5 marks

In a project presentation, a successful live demonstration proves the system meets every non-functional requirement.

- A. True
- B. False

### Question 9 — 2 marks

Complete the statement using the word bank. Use each term at most once: data loss; restoration time; replication; backups; throughput; source formatting. “RPO concerns acceptable [1], whereas RTO concerns acceptable [2]. Live [3] supports continuity; historical [4] can recover earlier states.”

1. Blank 1
2. Blank 2
3. Blank 3
4. Blank 4

### Question 10 — 0.5 marks

No-code development removes the need to test permissions and connector failure cases.

- A. True
- B. False

### Question 11 — 0.5 marks

MTTR can decrease while the underlying fault frequency remains unchanged, improving the modelled availability ratio.

- A. True
- B. False

### Question 12 — 3 marks

Which of the following are necessary pieces of context for assessing a performance claim? Select all that apply.

- A. A representative workload and request mix.
- B. The measurement environment and observation duration.
- C. Only the technology vendor’s name.
- D. Latency and failure criteria, including how errors are counted.
- E. A screenshot of the login page alone.

### Question 13 — 4 marks

Match each development choice or artifact to the misconception it most directly corrects.

Answer bank: Data export alone proves application portability · Hiding a field is sufficient access control · A working prototype is automatically maintainable in production · Generated tests can repeat the implementation’s mistaken assumptions

1. Independent tests derived from actual requirements
2. Export of executable workflows and permissions, not just records
3. Server-side object-permission checks
4. A named owner and release/recovery procedure

### Question 14 — 1 marks

Match the security check to the question it answers.

Answer bank: May this caller perform this action on this resource? · Who is the caller?

1. Authentication
2. Authorisation

---

## Model answers and marking guide

### Question 1 — 0.5 marks

Correct: B.

Replica count alone says nothing about shared host placement or state dependencies.

### Question 2 — 0.5 marks

Correct: B.

Identity does not grant permission for every operation or record; internal reachability is not permission.

### Question 3 — 6 marks

1. **C** — Both API instances share Host A. A surviving standby does not replace missing API capacity or establish measured RTO.
2. **B** — At-least-once delivery can repeat messages. Reuse the intended operation identity and enforce one business effect.
3. **D** — An observed lag within a target is bounded evidence. Asynchronous lag can grow, and recovery of committed business data must be verified.

### Question 4 — 2 marks

Correct: A, D, E, F.

The four supported statements concern shared placement, replication lag, history and poison-message handling. A shared region still matters, and the delivery model permits duplicates.

### Question 5 — 0.5 marks

Correct: A.

An inventory supports investigation; security still needs appropriate review, testing and response.

### Question 6 — 4 marks

1. **Soak testing** — Sustained activity intended to expose a memory leak over several hours: Soak testing.
2. **Spike testing** — A sudden increase from ordinary demand to a large burst: Spike testing.
3. **Stress testing** — Demand deliberately raised beyond the expected capacity to observe failure and recovery: Stress testing.
4. **Load testing** — Evaluation under a specified normal and planned peak workload: Load testing.

### Question 7 — 0.5 marks

Correct: A.

An unused process document is weak assurance; demonstrated compliance and process improvement matter.

### Question 8 — 0.5 marks

Correct: B.

A demo provides limited evidence for selected conditions. Other quality claims need suitable measurements or checks.

### Question 9 — 2 marks

1. **data loss** — RPO is a target for acceptable loss of data, commonly expressed as an interval.
2. **restoration time** — RTO limits acceptable restoration duration.
3. **replication** — Replication maintains other copies of current state.
4. **backups** — Historical recovery can be necessary after deletion is propagated to replicas.

### Question 10 — 0.5 marks

Correct: B.

The implementation mechanism changes; accountability for permissions and failures remains.

### Question 11 — 0.5 marks

Correct: A.

Faster recovery reduces time unavailable without necessarily increasing MTTF.

### Question 12 — 3 marks

Correct: A, B, D.

Performance claims need conditions, measurement scope and acceptance rules. A vendor label or screenshot supplies none of those by itself.

### Question 13 — 4 marks

1. **Generated tests can repeat the implementation’s mistaken assumptions** — Independent tests derived from actual requirements: Generated tests can repeat the implementation’s mistaken assumptions.
2. **Data export alone proves application portability** — Export of executable workflows and permissions, not just records: Data export alone proves application portability.
3. **Hiding a field is sufficient access control** — Server-side object-permission checks: Hiding a field is sufficient access control.
4. **A working prototype is automatically maintainable in production** — A named owner and release/recovery procedure: A working prototype is automatically maintainable in production.

### Question 14 — 1 marks

1. **Who is the caller?** — Authentication: Who is the caller?.
2. **May this caller perform this action on this resource?** — Authorisation: May this caller perform this action on this resource?.

