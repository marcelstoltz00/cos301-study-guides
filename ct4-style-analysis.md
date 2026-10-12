# Actual CT4: question styles and calculation analysis

The supplied file is a saved assessment/submission HTML fragment. Its text contains 14 numbered questions: **40 ordinary marks plus a 1-mark bonus drawing exercise**. Marks below are the visible maximum allocations, not the student's earned marks. Saved responses and selected options are not an authoritative memorandum.

| Questions | Observed style | Marks | What to practise |
|---|---|---:|---|
| Q1 | Bonus: draw an MVVM architecture and attach a PNG | 1 bonus | Component responsibilities and labelled interaction directions; the prompt explicitly says semester-test diagrams will be drawn |
| Q2, Q4, Q5, Q7, Q10, Q12 | Six matching questions | 20.5 | Quality metrics, isolation layers, protocol labels, reliability definitions and code practices |
| Q3 | Deployment/load-profile scenario with five numeric blanks | 2.5 | Web capacity, primary connection reservations, throughput, workload mix and broker backlog |
| Q6, Q14 | Two single-answer questions | 2 | Recognise non-functional testing and diagnose presentation assumptions |
| Q8, Q9 | Two select-all presentation scenarios | 7 | Explain effects on evaluation and distinguish an engineering demo from unexplained navigation |
| Q11 | Failure/repair timeline with three numeric blanks | 3 | MTTF, MTTR, availability, time conversion and rounding |
| Q13 | Deployment diagram with five short identification blanks | 5 | Model validity, backend, database, schema and artifact classification |

The ordinary marks total 40. Matching accounts for just over half of those marks. The two numerical questions are only 5.5 marks together, but the capacity question requires much more reasoning than its mark allocation suggests. It chains answers: an early connection-limit error can affect throughput, supported students and queue growth.

## Capacity: the skills behind Q3

The original text states one request per active student every five seconds; 75% reads and 25% enrolments. A read takes 60 ms overall and holds a replica connection for 50 ms. An enrolment takes 400 ms overall: a 250 ms fee check, a 100 ms primary transaction and 50 ms other work. Each completed enrolment publishes one email message and waits for broker confirmation.

The diagram itself was referenced as an external LMS image, with no local image bytes. Consequently, the web-instance limits, API-pod limits, database connection counts and consumer rates cannot be recovered from the pasted text. **The five displayed student responses cannot be used to reconstruct a correct capacity answer.** The new papers supply their own complete diagrams and assumptions.

Use this sequence:

1. **Translate students into demand.** With cadence `T` seconds and `S` students, total request rate is `S / T`. For total rate `λ`, reads arrive at `read_fraction × λ` and writes at `write_fraction × λ`.
2. **Compute the web-only upper bound.** Aggregate web rate is instances × per-instance requests/second; student bound is aggregate rate × cadence. This is one tier's bound, not the whole system's capacity.
3. **Bound the total pod count.** If each pod reserves a full primary pool, maximum pods = `floor((primary connection limit − reserved connections) / per-pod pool)`. Include existing pods in the total. This reservation model must be stated; an external pooler would change it.
4. **Compute each resource's throughput.** Under the papers' fluid approximation, throughput = concurrency / seconds held. A connection held for 100 ms uses `0.100 s`, not `100 s`. API request slots use total request occupancy; database connections use database hold time. Compare external checks and broker confirms as well as the database.
5. **Compare bounds using one common unit.** A write bound of `W` writes/s allows at most `W / write_fraction` total requests/s; a read bound of `R` reads/s allows `R / read_fraction`. For shared API slots, mean occupancy is `read_fraction × read_duration + write_fraction × write_duration`. The smallest total-request bound governs. Multiply it by cadence to obtain active students.
6. **Calculate waiting messages.** For an initially empty queue with constant rates, backlog = `max(0, publication_rate − consumer_rate) × elapsed_seconds`. Publication confirmations and consumer processing are different capacities. Multiply by 60 when converting minutes.
7. **Distinguish finite-window capacity from a bounded queue.** A request path can keep completing requests while email accumulates. To prevent indefinite backlog growth, message arrivals must also be no greater than sustained consumer throughput. Real variable traffic needs headroom below theoretical saturation.

The new papers deliberately assess both synchronous-path capacity and queue-stable load. Each also changes one resource and asks which bottleneck appears next, testing whether the method transfers beyond copied arithmetic.

## Reliability: the skills behind Q11

For the course convention used in the supplied QA notes:

```text
MTTF = total operating time / number of failures
MTTR = total restoration time / number of restorations
MTBF = MTTF + MTTR
Availability (%) = MTTF / (MTTF + MTTR) × 100
```

The CT4 timeline can be verified independently from its text: operating time = `210.5 + 336 + 188.5 = 735 h`; repair time = `11.5 + 8 + 4.5 = 24 h`. There are three completed cycles. MTTF = `245 h`; MTTR = `8 h`; MTBF = `253 h`; availability = `245 / 253 × 100 = 96.84%`. These calculations support the displayed Q11 values; that does not make all saved answers elsewhere authoritative.

Practise converting weeks/days to hours, keeping uptime separate from downtime, and rounding only the final percentage. Faster restoration can improve availability without demonstrating fewer failures. The new papers also ask you to rearrange the formula to find the maximum MTTR satisfying a target availability.

## How the new semester tests use this evidence

- [ST2 Example 5 — SeatLink](st2-example-5.html): web-limited peak load, fee-service limit after scaling, email backlog, MVVM drawing and reliability calculations.
- [ST2 Example 6 — LabReserve](st2-example-6.html): eligibility-limited peak load, replica limit after scaling, email backlog, MVC drawing and reliability calculations with mixed time units.

Each has 14 questions and **100 authored practice marks**, including **44 calculation marks**: capacity/queue calculations (24), quality-metric calculations (8), and reliability (12). Information-flow complexity and defect density extend the metric-matching style using the supplied QA material; CT4 itself did not contain those metric calculations. MVC in the second paper provides broader architecture-drawing practice; the actual CT4 bonus specifically named MVVM.

Matching, single-answer, select-all and presentation questions preserve the observed command styles. Longer written subparts and broader integration questions adapt them to semester-test practice across the available L17–L33 and L35 scope, rather than implying CT4 assessed the whole semester. Each paper assesses every listed lecture, including SOA/L26 and Microservices/L27, through the topics attached to its questions. No L34 material was supplied.

The suggested duration, allocations and select-all scoring are authored practice choices. The original select-all scoring rule was not visible. The updated papers automatically mark **72.5 marks each** across objective questions, numerical result fields, bottleneck selections and deployment labels. Numerical fields receive their disclosed result marks; working is saved for review rather than being automatically judged. The remaining **27.5 drawing/reasoning marks** use explicit rubrics and are counted separately to avoid double-counting. Percentages accept two-decimal rounding within 0.005 percentage points; target MTTR hours accept four-decimal rounding within 0.00005 h. Drawings are retained separately on paper or in draw.io. Each page supports saved drafts, blank printing and marking-guide printing without personal drafts. Separate [Test 5 memorandum](markdown/st2-example-5-memo.md) and [Test 6 memorandum](markdown/st2-example-6-memo.md) explain every answer and every multiple-choice option.

Sources: the user's pasted CT4 text, [scope](scope.md), [QA guide](markdown/L30.md), supplied [QA notes](markdown/L29%20-%20Software%20Quality%20Assurance.md), [deployment guide](markdown/L28.md), and the existing lecture guides. L29 and L31–L33 remain general topic coverage where lecture slides were unavailable. No missing LMS diagram was treated as inspected, and neither practice paper is an official paper or prediction.
