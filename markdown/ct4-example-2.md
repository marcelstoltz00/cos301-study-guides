# CT4 Example 2

Scope: L28–L35 (L35 revises L28–L34 only). Total: 30 marks.

Original practice paper based on the reference assessment style. Not an official paper or prediction. No official duration was available in the supplied export.

Each correct selection earns the question marks divided by the number of correct options. Each incorrect selection deducts the same amount. Omitted options earn zero. Each question is floored at zero. This explicit practice rule is not asserted to be the original marking formula.

Written answers are self-assessed using the rubric. Suggested word limits carry no automatic penalty.

[Interactive and printable paper](../ct4-example-2.html)

## Question paper

### Question 1 — 0.5 marks

A Kubernetes namespace alone guarantees network isolation and a separate host kernel.

- A. True
- B. False

### Question 2 — 0.5 marks

Client-side validation can replace server-side validation because all users must use the supplied interface.

- A. True
- B. False

### Question 3 — 6 marks

Analyse the FieldSense diagram. For each question, write only the letter of the best answer. Use decimal MB and the assumptions shown.

Diagram labels (use the HTML paper for spatial relationships):

```text
FieldSense / field site and cloud — event delivery
Device → local gateway
Gateway G applies approved local policy
Durable buffer: 64 MB decimal
50 events/s; 200 bytes/event
Cloud ingestion
Receives stable event IDs
Deduplicates repeated deliveries
Stores central history
Outage behaviour
Network may be down for 60 minutes
No draining while disconnected
Storage estimate adds 25% overhead
Fleet configuration
Per-device identity
Verified, versioned updates
Roll out to a small group first
events
offline
config
Arrows denote logical data/configuration paths, not guarantees of immediate delivery.
Gateway events are resent with the same ID after an uncertain acknowledgement.
```

1. 1. What storage estimate follows for a 60-minute outage, including 25% overhead? A: 36 MB. B: 45 MB. C: 64 MB. D: 450 MB.
2. 2. The cloud accepts an event but its acknowledgement is lost. What should a retry do? A: Generate a new event ID. B: Treat the previous attempt as definitely unsuccessful. C: Reuse the event ID so the receiver can deduplicate. D: Bypass authentication.
3. 3. The outage lasts longer than predicted and storage becomes full. Which assessment is correct? A: Store-and-forward guarantees infinite storage. B: Cloud elasticity automatically expands an offline device. C: Clock synchronisation removes the need for buffering. D: The design needs explicit backpressure or a justified overflow policy.

### Question 4 — 2 marks

With reference to FieldSense, select all statements that correctly describe the design’s limitations or controls.

- A. Per-device identity reduces the scope of one credential compromise.
- B. Clock timestamps alone guarantee global event ordering.
- C. Local processing can reduce reliance on a wide-area round trip for selected decisions.
- D. Staged updates supply feedback before exposing the entire fleet.
- E. A 64 MB buffer guarantees operation through every outage duration.
- F. An offline policy must specify how stale permissions or configuration are handled.

### Question 5 — 0.5 marks

Parameterised queries separate bound values from query syntax, but they do not decide whether the caller may access the returned rows.

- A. True
- B. False

### Question 6 — 4 marks

Match each concept to the description that best distinguishes it.

Answer bank: Exercises a running application to observe externally visible behaviour · Examines dependencies and associated component risks · Provides an inventory of software components · Examines source or a related code representation without running the application

1. SAST
2. DAST
3. SCA
4. SBOM

### Question 7 — 0.5 marks

A latent fault must cause an observed failure every time the program runs.

- A. True
- B. False

### Question 8 — 0.5 marks

L4 connection balancing necessarily distributes each stream inside one long-lived HTTP/2 connection to a different backend.

- A. True
- B. False

### Question 9 — 2 marks

Complete the statement using the word bank. Use each term at most once: fault; failure; operating; repair; formatting; encryption. “A static defect is a [1]; observed incorrect runtime behaviour is a [2]. MTTF measures mean [3] time until failure, whereas MTTR measures mean [4] time.”

1. Blank 1
2. Blank 2
3. Blank 3
4. Blank 4

### Question 10 — 0.5 marks

A good performance report may omit errors if its p95 latency is below the required threshold.

- A. True
- B. False

### Question 11 — 0.5 marks

Using AI assistance while inspecting and verifying the generated implementation is different from the narrow “vibe coding” workflow used in the guide.

- A. True
- B. False

### Question 12 — 3 marks

Which of the following practices support a defensible technical presentation? Select all that apply.

- A. Connect a design mechanism to its requirement and trade-off.
- B. Describe planned features as already tested to keep the story simple.
- C. Report observations with their tested conditions and limitations.
- D. Rehearse a meaningful demo and clearly identify fallback material.
- E. Use a framework’s popularity as proof of system quality.

### Question 13 — 0.5 marks

Exporting all application records proves that proprietary workflow logic and permissions can be migrated without additional work.

- A. True
- B. False

### Question 14 — 4 marks

Match each test situation to the most specific testing purpose.

Answer bank: Volume testing · Integration testing · Usability testing · Non-functional regression testing

1. Existing response-time checks are rerun after a feature change
2. Storage and queries are evaluated with a much larger dataset
3. Real API and database components exchange data in a test environment
4. Selected users complete tasks while obstacles are observed

### Question 15 — 1 marks

Match the measure to the property it reports.

Answer bank: A distribution position rather than the maximum latency · Completed work per unit time

1. Throughput
2. p95 latency

### Question 16 — 4 marks

Relate each symptom to the most relevant corrective practice.

Answer bank: Automate shared checks and review actual compliance · Use operation identity, idempotency and reconciliation · Establish durable ownership and managed credentials · Revoke or rotate exposed credentials and investigate use

1. Secrets remain valid after being deleted from the latest commit
2. Style rules exist only in a document
3. A generated workflow repeats a reservation after a timeout
4. A critical application depends on one person’s account

---

## Model answers and marking guide

### Question 1 — 0.5 marks

Correct: B.

A namespace is not, by itself, either of those isolation boundaries.

### Question 2 — 0.5 marks

Correct: B.

Requests can bypass the client; the server must enforce its own constraints.

### Question 3 — 6 marks

1. **B** — Raw payload is 50 × 200 × 3,600 = 36,000,000 bytes; multiplying by 1.25 gives 45 MB.
2. **C** — An uncertain acknowledgement does not prove that the side effect failed. Stable identity supports deduplication.
3. **D** — The local buffer is finite. Its full condition needs defined behaviour, even if the original capacity calculation was correct.

### Question 4 — 2 marks

Correct: A, C, D, F.

Identity, local placement, staged updates and explicit offline rules address different concerns. Finite storage and disagreeing clocks remain limitations.

### Question 5 — 0.5 marks

Correct: A.

Injection prevention and object authorisation are separate responsibilities.

### Question 6 — 4 marks

1. **Examines source or a related code representation without running the application** — SAST: Examines source or a related code representation without running the application.
2. **Exercises a running application to observe externally visible behaviour** — DAST: Exercises a running application to observe externally visible behaviour.
3. **Examines dependencies and associated component risks** — SCA: Examines dependencies and associated component risks.
4. **Provides an inventory of software components** — SBOM: Provides an inventory of software components.

### Question 7 — 0.5 marks

Correct: B.

Specific inputs, states or conditions may be required to activate a defect.

### Question 8 — 0.5 marks

Correct: B.

Multiplexed streams may remain pinned to the backend selected for that connection.

### Question 9 — 2 marks

1. **fault** — A fault is a static defect.
2. **failure** — A failure is observed erroneous runtime behaviour.
3. **operating** — Use the stated measurement scope for mean operating time.
4. **repair / restoration** — MTTR concerns repair/restoration under the chosen convention.

### Question 10 — 0.5 marks

Correct: B.

Every mandatory acceptance criterion matters, and fast failures can distort latency summaries.

### Question 11 — 0.5 marks

Correct: A.

The narrower definition concerns largely accepting generated behaviour without inspecting its code; the tool alone does not determine the workflow.

### Question 12 — 3 marks

Correct: A, C, D.

Rationale, bounded evidence and rehearsed honest demonstrations help an audience assess the work. Popularity and misrepresented status do not.

### Question 13 — 0.5 marks

Correct: B.

Record export and portability of runnable behaviour are distinct concerns.

### Question 14 — 4 marks

1. **Non-functional regression testing** — Existing response-time checks are rerun after a feature change: Non-functional regression testing.
2. **Volume testing** — Storage and queries are evaluated with a much larger dataset: Volume testing.
3. **Integration testing** — Real API and database components exchange data in a test environment: Integration testing.
4. **Usability testing** — Selected users complete tasks while obstacles are observed: Usability testing.

### Question 15 — 1 marks

1. **Completed work per unit time** — Throughput: Completed work per unit time.
2. **A distribution position rather than the maximum latency** — p95 latency: A distribution position rather than the maximum latency.

### Question 16 — 4 marks

1. **Revoke or rotate exposed credentials and investigate use** — Secrets remain valid after being deleted from the latest commit: Revoke or rotate exposed credentials and investigate use.
2. **Automate shared checks and review actual compliance** — Style rules exist only in a document: Automate shared checks and review actual compliance.
3. **Use operation identity, idempotency and reconciliation** — A generated workflow repeats a reservation after a timeout: Use operation identity, idempotency and reconciliation.
4. **Establish durable ownership and managed credentials** — A critical application depends on one person’s account: Establish durable ownership and managed credentials.

