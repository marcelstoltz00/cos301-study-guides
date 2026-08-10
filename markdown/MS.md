## Microservices Deep Dive (Bonus Synthesis Guide)

> **What this guide is:** microservices concepts are scattered across several lectures — L18 (architecture styles), L21 (a real microservices-shaped banking demo), L22 (the Eight Fallacies, Conway's Law, the modular monolith default), and L23 (two microservices-shaped case studies). This guide pulls all of those threads into one place and fills in the standard industry patterns (service discovery, API gateways, sagas, service mesh) that the individual lectures touch on but don't fully spell out. Where a concept was covered elsewhere, it's cross-referenced rather than re-explained from scratch.

### 1. What Are Microservices? (Recap)

Per L18: an architecture style with **decentralized control** — small, autonomous services communicating over lightweight protocols (REST/gRPC), each with **independent deployment** — its own lifecycle, letting teams ship updates without touching the rest of the system.

Two defining properties worth stating precisely:
- **Independently deployable:** you can ship a change to one service without redeploying any other service.
- **Independently scalable:** you can run more instances of one service (e.g. the checkout service during a sale) without scaling every other service alongside it.

A service that requires being deployed *in lockstep* with others, or that can't be scaled on its own, isn't really functioning as an independent microservice yet, regardless of how it's packaged.

### 2. Core Principle: Decentralized Data Management (Database per Service)

Each service owns its own data store, and **no other service is allowed to reach into that database directly** — every access goes through the owning service's API. This is the same "restrict what may call what" tactic from L22's tactic table, applied specifically to data.

**Why this matters:** a shared database between services is one of the most common ways a system becomes a **distributed monolith** (L22) — services that are *deployed* separately but remain *coupled* through a shared schema, so a change to one service's table can silently break another service that happens to query it directly. If you can't change one service's database schema without coordinating with another team, you don't actually have independent services — you have one database with several separately-deployed front doors.

**The cost this creates:** without a shared database, there's no free, built-in way to run a single ACID transaction across two services' data (e.g. "deduct from Account A and credit Account B" when the two accounts live in two different services' databases). This is the direct motivation for the Saga pattern (§6 below).

### 3. Communication Patterns: Synchronous vs. Asynchronous

| | Synchronous (e.g. REST, gRPC) | Asynchronous (e.g. message queue, event bus) |
|---|---|---|
| Shape | Caller waits for an immediate response | Caller publishes a message and moves on; a consumer processes it independently, later |
| Coupling | Caller needs the callee to be up and responsive *right now* | Caller and consumer are decoupled in time — the consumer can be temporarily down without blocking the caller |
| Example from the lectures | L23 Case Study 2's API Gateway → Domain Service calls | L23 Case Study 1's Enterprise Message Bus; L18's event-driven architecture section |

**Why async communication is common between microservices specifically:** per L18's event-driven architecture material, producers don't need to know who's listening, new consumers can be added without touching the producer, and buffers absorb traffic spikes — all directly useful properties when services are independently owned and evolve on their own schedules. The trade-off, per the same material, is **eventual consistency by default** — there's no "after this, that" guarantee the way a synchronous call gives you.

### 4. Service Discovery and the API Gateway Pattern

**Service discovery:** in a system with many service instances that scale up/down and get redeployed constantly, hardcoding "call `10.0.0.5:8080`" doesn't work — a service discovery mechanism (a registry that tracks which instances of which service are currently healthy and where) lets one service find a current, healthy instance of another without hardcoded addresses.

**API Gateway (seen directly in L23's Case Study 2):** a single entry point that client applications talk to, which then routes requests to the appropriate backend domain service. Concretely useful for:
- **Centralizing cross-cutting concerns** — L23's example routes every request through the gateway to a shared **Identity** service, so authentication/authorization is enforced once, consistently, rather than reimplemented per service.
- **Hiding internal structure from clients** — clients don't need to know how many services exist or which one owns what; they talk to one gateway, which can route requests differently over time as the internal architecture evolves, without clients needing to change.
- **Request/response shaping** — a gateway can aggregate multiple backend calls into one client-facing response (comparable to L23 Case Study 1's Request Processing → parallel queries → combined Response Processing pattern), sparing the client from making several separate calls itself.

### 5. Distributed Transactions: The Saga Pattern

Because each service owns its own database (§2), a single ACID transaction spanning two services isn't available the way it would be in a monolith with one shared database. The **Saga pattern** solves this by breaking a cross-service business transaction into a sequence of local transactions, each committed independently within its own service, with **compensating actions** to undo prior steps if a later step fails.

**Two implementation styles:**
- **Choreography** — each service publishes an event when its local step completes; the next service(s) in the sequence listen for that event and react, with no central coordinator. Matches the decoupled, event-driven style from §3.
- **Orchestration** — a central coordinator service explicitly calls each participating service in sequence and is responsible for triggering compensating actions if a step fails.

**Concrete example (echoing L22's Exercise A payment-gateway scenario):** an order-placement saga might be: (1) Order service creates the order in a "pending" state; (2) Payment service attempts to charge the customer; (3) if the charge fails, a compensating action fires — the Order service moves the order to "cancelled" rather than leaving it stuck in "pending" forever. This is the same *fault tolerance* tactic L22 covers (isolate the failing dependency, defer/compensate rather than silently losing the operation), applied specifically to a multi-service data-consistency problem.

```svg
<svg viewBox="0 0 640 220" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Segoe UI,sans-serif">
  <defs>
    <marker id="saga-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#626d7a"/>
    </marker>
  </defs>
  <text x="150" y="20" text-anchor="middle" fill="#22c55e" font-size="12" font-weight="700">Choreography — no coordinator</text>
  <rect x="30" y="40" width="80" height="40" rx="6" fill="#1a1f26" stroke="#22c55e"/>
  <text x="70" y="64" text-anchor="middle" fill="#e8ecf1" font-size="10">Order</text>
  <rect x="140" y="40" width="80" height="40" rx="6" fill="#1a1f26" stroke="#22c55e"/>
  <text x="180" y="64" text-anchor="middle" fill="#e8ecf1" font-size="10">Payment</text>
  <rect x="90" y="110" width="80" height="40" rx="6" fill="#1a1f26" stroke="#f56363"/>
  <text x="130" y="134" text-anchor="middle" fill="#e8ecf1" font-size="10">Car (fails)</text>
  <line x1="110" y1="60" x2="138" y2="60" stroke="#626d7a" stroke-width="1.5" marker-end="url(#saga-arrow)"/>
  <text x="125" y="52" text-anchor="middle" fill="#626d7a" font-size="8">event</text>
  <path d="M 175 82 Q 155 96 135 108" fill="none" stroke="#f56363" stroke-width="1.5" marker-end="url(#saga-arrow)"/>
  <text x="240" y="140" fill="#9aa4b2" font-size="9">each service reacts to</text>
  <text x="240" y="152" fill="#9aa4b2" font-size="9">events independently</text>

  <text x="480" y="20" text-anchor="middle" fill="#4a90f8" font-size="12" font-weight="700">Orchestration — central coordinator</text>
  <rect x="440" y="40" width="90" height="40" rx="6" fill="#12161b" stroke="#4a90f8" stroke-width="2"/>
  <text x="485" y="64" text-anchor="middle" fill="#4a90f8" font-size="10" font-weight="700">Orchestrator</text>
  <rect x="370" y="120" width="70" height="36" rx="6" fill="#1a1f26" stroke="#262d37"/>
  <text x="405" y="142" text-anchor="middle" fill="#e8ecf1" font-size="9">Order</text>
  <rect x="450" y="120" width="70" height="36" rx="6" fill="#1a1f26" stroke="#262d37"/>
  <text x="485" y="142" text-anchor="middle" fill="#e8ecf1" font-size="9">Payment</text>
  <rect x="530" y="120" width="70" height="36" rx="6" fill="#1a1f26" stroke="#f56363"/>
  <text x="565" y="142" text-anchor="middle" fill="#e8ecf1" font-size="9">Car (fails)</text>
  <line x1="460" y1="82" x2="410" y2="118" stroke="#4a90f8" stroke-width="1.5" marker-end="url(#saga-arrow)"/>
  <line x1="485" y1="82" x2="485" y2="118" stroke="#4a90f8" stroke-width="1.5" marker-end="url(#saga-arrow)"/>
  <line x1="500" y1="82" x2="555" y2="118" stroke="#4a90f8" stroke-width="1.5" marker-end="url(#saga-arrow)"/>
  <text x="485" y="195" text-anchor="middle" fill="#9aa4b2" font-size="9">one service explicitly calls each step, in order</text>
</svg>
<div class="diagram-caption">Choreography: services react to each other's events with no central brain. Orchestration: one coordinator explicitly drives every step (and every compensation).</div>
```

### 6. Resilience Patterns (Cross-Reference: L22's Tactics)

These patterns exist specifically because of the **Eight Fallacies of Distributed Computing** (L22) — most directly fallacy #1, "the network is reliable," which is false, and a remote call to another microservice can fail, hang, or return slowly at any time.

| Pattern | What it does | Where you've seen it |
|---|---|---|
| **Timeout** | Give up waiting on a slow call after a bounded time, rather than waiting indefinitely | L22's Exercise A: "2 second timeout" on the payment gateway call |
| **Retry (with backoff)** | Re-attempt a failed call, with increasing delay between attempts, rather than hammering a struggling dependency | L22's fallacy-to-tactic table; L23 Case Study 2's resilience section |
| **Circuit Breaker** | Stop calling a dependency entirely, for a cooldown period, once it's clearly failing — preventing wasted calls and resource exhaustion | L22's Netflix case study (Hystrix, now resilience4j) |
| **Bulkhead** | Isolate resources (e.g. thread pools) per dependency, so one failing dependency can't exhaust resources needed to serve calls to a healthy one | L22's Exercise A and Netflix case study |
| **Fallback** | Return a degraded-but-useful response when the primary path fails, instead of failing the whole request | L22's Netflix case study: "the page still renders, degraded" |

**The connecting idea:** in a monolith, a function call either returns or the whole process crashes — there's no in-between. In microservices, a remote call has an entire spectrum of partial-failure modes (slow, down, flaky, returning garbage) that these patterns exist specifically to handle gracefully, rather than letting one failing service cascade into failing every service that depends on it (the "distributed monolith" risk from a different angle — cascading failure instead of coupled deployment).

> **Gap-fill — the Circuit Breaker's three states:** a circuit breaker isn't just "on/off" — it's a small state machine, commonly tested as a diagram-labelling question. **Closed** = calls pass through normally; failures are counted. **Open** = too many failures tripped the breaker; calls fail immediately (fast-fail) without even attempting the network call, for a cooldown period. **Half-Open** = after the cooldown, a limited number of trial calls are let through to test whether the dependency has recovered — success closes the breaker again, failure re-opens it.

```svg
<svg viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Segoe UI,sans-serif">
  <defs>
    <marker id="cb-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#9aa4b2"/>
    </marker>
  </defs>
  <circle cx="90" cy="100" r="60" fill="#12161b" stroke="#22c55e" stroke-width="2.5"/>
  <text x="90" y="95" text-anchor="middle" fill="#22c55e" font-size="14" font-weight="700">Closed</text>
  <text x="90" y="113" text-anchor="middle" fill="#9aa4b2" font-size="9">calls pass through</text>

  <circle cx="470" cy="100" r="60" fill="#12161b" stroke="#f56363" stroke-width="2.5"/>
  <text x="470" y="95" text-anchor="middle" fill="#f56363" font-size="14" font-weight="700">Open</text>
  <text x="470" y="113" text-anchor="middle" fill="#9aa4b2" font-size="9">fail fast, no call made</text>

  <circle cx="280" cy="30" r="45" fill="#12161b" stroke="#f59e0b" stroke-width="2.5"/>
  <text x="280" y="26" text-anchor="middle" fill="#f59e0b" font-size="12" font-weight="700">Half-Open</text>
  <text x="280" y="42" text-anchor="middle" fill="#9aa4b2" font-size="8">trial calls only</text>

  <path d="M 145 90 Q 280 60 425 90" fill="none" stroke="#f56363" stroke-width="1.5" marker-end="url(#cb-arrow)"/>
  <text x="280" y="70" text-anchor="middle" fill="#f56363" font-size="9">failure threshold hit</text>

  <path d="M 250 65 Q 150 130 100 158" fill="none" stroke="#22c55e" stroke-width="1.5" marker-end="url(#cb-arrow)"/>
  <text x="150" y="150" text-anchor="middle" fill="#22c55e" font-size="9">trial succeeds</text>

  <path d="M 315 62 Q 400 130 445 158" fill="none" stroke="#f56363" stroke-width="1.5" marker-end="url(#cb-arrow)"/>
  <text x="410" y="150" text-anchor="middle" fill="#f56363" font-size="9">trial fails</text>

  <path d="M 425 130 Q 350 175 280 75" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#cb-arrow)"/>
  <text x="330" y="180" text-anchor="middle" fill="#f59e0b" font-size="9">cooldown elapses</text>
</svg>
<div class="diagram-caption">The circuit breaker state machine — Closed → Open on repeated failure, Open → Half-Open after a cooldown, then back to Closed or Open based on the trial call</div>
```

### 7. Observability in a Microservices System

A single user-facing request in a microservices system often touches multiple services — which breaks the simplest debugging approach ("read the one process's log"), exactly as covered in the DevOps lecture's Monitor step (L21).

- **Distributed tracing** (e.g. Jaeger, per L21) — propagates a shared trace ID across every service boundary a request crosses, letting you reconstruct the full path and timing of one logical request across N services.
- **Correlation IDs** — the same underlying idea shown in L23 Case Study 1's Request Processing: a unique identifier attached to a request so that its related messages/results, even when processed by different services or instances, can be tied back together.
- **Centralized logging** — since each service's logs live on its own instances, aggregating them into one searchable place (conceptually similar to what a SIEM does for security events, per the security testing material) is necessary just to answer "what happened for this one request," rather than SSHing into N different services' hosts individually.

### 8. Conway's Law and Team Structure (Cross-Reference: L22)

Per L22: team boundaries become service boundaries, whether intended or not — "team assignments are the first draft of the architecture" (Nygard). This has a direct, practical consequence for how microservices should be split: **service boundaries should be drawn around what a single team can own end-to-end**, not around a theoretically "clean" technical decomposition that no single team can actually operate.

The **Inverse Conway Manoeuvre** (Team Topologies, per L22) takes this further — deliberately restructuring teams *first*, to produce the microservices architecture you actually want, rather than just accepting whatever shape falls out of the existing org chart.

### 9. Service Mesh (a Pattern Not Otherwise Covered)

As the number of services grows, cross-cutting concerns like service-to-service authentication (mTLS), retries, timeouts, and traffic-level observability start getting reimplemented, inconsistently, inside every single service's code. A **service mesh** (e.g. Istio, Linkerd) moves this logic out of the application code entirely, into a **sidecar proxy** deployed alongside each service instance — every network call in and out of a service actually passes through its sidecar, which uniformly applies retries, timeouts, mTLS, and collects tracing/metrics data, without any of that logic living in the service's own codebase.

**Why this matters conceptually:** it's the same "restrict what may call what" / "isolate the volatile part" tactic family from L22, applied at the *infrastructure* layer instead of the *code* layer — cross-cutting resilience and security concerns become a platform capability every service gets "for free," rather than something every team has to correctly reimplement themselves.

### 10. Anti-Patterns (What Goes Wrong)

Directly from L22's material, restated as a checklist:

- **The distributed monolith** — separately deployed, but tightly coupled (often via a shared database, §2), so nothing can actually change or fail independently. All of microservices' operational cost, none of the benefit.
- **Premature distribution** — splitting into services before the domain is well-understood; you "cannot distribute what you haven't modularised" (Fowler). Splitting early just spreads the same unresolved domain-modelling problems across a network.
- **The operational tax** — the cost (infrastructure, tooling, coordination) scales with *service count*, not user count, and is heaviest when the team is smallest — a 3-service, 3-person team can easily spend more time operating Kubernetes than building features.
- **Chatty services** — services that need to call each other many times to complete one logical operation, multiplying network latency and exposing every one of the Eight Fallacies repeatedly per request. Often a sign the service boundaries were drawn in the wrong place (splitting something that should have stayed together).
- **Nanoservices** — splitting so finely that the coordination overhead of managing many tiny services outweighs any benefit gained from splitting at all.

### 11. When NOT to Use Microservices (The Default)

Per L22's explicit guidance: the **pragmatic default is a modular monolith** — clean internal boundaries, one deployable — until scale or Conway's Law forces otherwise. Microservices are justified by *organizational* pressure (multiple teams needing independent deployability) or a *proven, specific* scaling need for one component — not by "it's the modern way to build software." A well-modularized monolith, with the internal boundaries a future service-split would need already in place, is both a legitimate end state for many systems and a much easier starting point to actually split later, once (if) the justification for doing so becomes real and specific.
