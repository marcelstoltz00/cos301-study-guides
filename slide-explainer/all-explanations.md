# Every slide, explained

Plain-language explanations of every PDF page in the workspace root. Page numbers refer to PDF order, including introductions and closing slides. Examples are teaching illustrations, not extra content claimed to be on the slides.

## L17 - Design Systems and CI

Source: [L17 - Design Systems and CI.pdf](../../L17%20-%20Design%20Systems%20and%20CI.pdf)

### Slide 1: Brand guides and design systems

**The point:** Make a product feel consistent even when many people build it.

This opening slide introduces the link between a brand's identity, visual choices and reusable code. The lecture will explain how teams agree on decisions so every screen feels like the same product.

**Simple example:** A banking app should use the same meaning for a primary button on registration and payment screens.

### Slide 2: Many hands, one product

**The point:** Shared rules prevent a patchwork interface.

Without a system, each developer invents colours, controls and interactions. A design system gives designers and developers reusable decisions, reducing repeated work and confusion for users. The two columns contrast repeated invention with one shared source.

**Simple example:** Instead of five teams building five date pickers, they use one tested component.

### Slide 3: The golden thread

**The point:** Brand values should survive all the way into working code.

Read the chain from values to voice, visuals, patterns and code. What the organisation believes affects how it speaks, looks and behaves. A break in that chain creates an inconsistent experience. This is a consistency metaphor, not a programming technique.

**Simple example:** A brand promising simplicity should not ship a checkout full of confusing jargon.

### Slide 4: Guide versus system

**The point:** A brand guide describes identity; a design system helps implement it.

The left column covers mission, tone, logos, colours and typography. The right adds tokens, coded components, behaviour, accessibility and maintenance rules. A PDF of logo rules alone does not provide a working button or a process for changing it.

**Simple example:** The guide says which colours fit the brand; the system supplies an accessible button using those colours.

### Slide 5: Brand foundations

**The point:** Decide who you are before choosing pixels.

Purpose explains why the organisation exists. Values guide decisions. Voice is the consistent personality; tone changes to suit the situation. The four boxes show that visual design begins with intent, rather than randomly chosen fonts.

**Simple example:** A friendly app can celebrate warmly but still use a calm, clear tone for a security warning.

### Slide 6: What fonts communicate

**The point:** Typefaces affect both the feeling and readability of text.

The repeated word uses different fonts to show that identical wording can feel formal, loud, technical or editorial. Font shape, weight and spacing also affect information density. These impressions depend on context; they are not universal laws.

**Simple example:** A decorative heading font may fit a poster but make a long error explanation hard to read.

### Slide 7: A shared type scale

**The point:** Text sizes should form a predictable hierarchy.

Display text, headings, body and captions have different jobs. Define their size, weight and line-height together, then reuse them. The 1.25 ratio illustrates a modular scale; the displayed sizes are examples, not compulsory values. Controlled line length also makes paragraphs easier to follow.

**Simple example:** A user can identify the page title, section heading and supporting note without reading every word.

### Slide 8: Colour has a job

**The point:** Choose colours by meaning and check that text is readable.

The swatches distinguish surfaces, actions and success/warning/error states. Semantic names such as action survive a rebrand better than blue. The 60/30/10 suggestion is a composition aid. Contrast ratios describe how distinguishable foreground and background are; colour must not be the only status signal.

**Simple example:** An error needs explanatory text as well as a red border.

### Slide 9: Design tokens

**The point:** Name a design decision once and reuse it across platforms.

The JSON groups colour, spacing, radius and motion values. Code and design tools can consume the same named values. Changing a token updates its consumers and makes themes manageable, provided components actually use those tokens.

**Simple example:** Change color.action once instead of editing the hex code in forty different buttons.

### Slide 10: Atomic design

**The point:** Build large interfaces from small reusable pieces.

Read left to right: atoms are simple controls; molecules combine a few; organisms form larger sections; templates arrange a page; pages add real content. The labels are a way to reason about composition, not strict scientific categories.

**Simple example:** Input plus button becomes a search control; search plus navigation becomes a header.

### Slide 11: A button's contract

**The point:** A component includes behaviour, states and accessibility, not just appearance.

The examples show default, hover, pressed, focus, disabled, loading and visual variants. Its API tells developers how to use it. Keyboard activation, labels and visible focus are part of the promise. Explain unavailable actions rather than merely making everything grey.

**Simple example:** While payment is pending, a loading state prevents accidental repeated clicks and communicates progress.

### Slide 12: Spacing, layout and motion

**The point:** Consistency also applies to distance, screen structure and time.

A spacing scale avoids arbitrary gaps. Grid and breakpoint rules make content adapt to screen sizes. Motion tokens standardise durations and easing, the way movement accelerates and slows. Animation should communicate change and respect users who prefer reduced motion.

**Simple example:** A modal can open with one consistent transition instead of each screen inventing a different animation.

### Slide 13: Accessibility belongs everywhere

**The point:** Everyone must be able to perceive, operate and understand the interface.

POUR means perceivable, operable, understandable and robust. It connects contrast and image descriptions to keyboard access, clear errors and reliable assistive-technology support. Accessibility must be built into shared pieces so each screen inherits useful behaviour.

**Simple example:** A labelled form field with a visible focus ring helps both screen-reader and keyboard users.

### Slide 14: Real design-system examples

**The point:** Existing systems show what reusable rules look like in practice.

The slide lists public systems such as Material, Polaris, Carbon and Primer. Its purpose is to show that systems include documentation, tokens, components and guidance at different organisational scales. You do not need to memorise every vendor to understand the concept.

**Simple example:** Compare how two systems document a button's variants, loading state and keyboard behaviour.

### Slide 15: Design-system takeaway

**The point:** A system is the team's agreement about quality, expressed in documentation and code.

This closing slide condenses the first section. Shared UI pieces matter, but the deeper benefit is a repeatable way to make and maintain design decisions. Governance means deciding who can change the system and how those changes reach users.

**Simple example:** A component update follows review and versioning rather than silently changing every screen overnight.

### Slide 16: CI/CD introduction

**The point:** The lecture now moves from consistent interfaces to reliable delivery.

CI means continuously integrating changes with automated checks. CD covers preparing or deploying verified changes. This title introduces practical delivery mistakes from projects and the practices that make a green build meaningful.

**Simple example:** A good-looking interface still needs a trustworthy path from source code to deployment.

### Slide 17: Observed delivery mistakes

**The point:** Having tools configured is not proof that they work correctly.

The list covers hidden test failures, mocked-away integrations, unsafe runtime settings, exposed secrets and missing deployment. These failures create false confidence: the pipeline exists, but does not check or deliver what the team assumes it does.

**Simple example:** A green badge is misleading if the test command has been told to ignore every failure.

### Slide 18: CI must tell the truth

**The point:** A failing test must be allowed to fail the pipeline.

In the code, '|| true' converts failure to success, continue-on-error permits a failed step, and passWithNoTests can hide missing discovery. Each bypass may have a narrow deliberate use, but applying it to required checks destroys their meaning.

**Simple example:** A broken login test should block a change, not leave the overall workflow green.

### Slide 19: Required branch checks

**The point:** Checks protect the codebase only when merging depends on them.

Branch protection makes build, lint and tests conditions for merging. The example lists required checks and a review. A notification can be ignored; an enforced gate normally cannot. Strict checks against current branch state help catch integration conflicts.

**Simple example:** A pull request with failed database tests stays unmergeable until the issue is fixed.

### Slide 20: Real database integration

**The point:** To test a database boundary, include a real database.

The test-container example starts temporary PostgreSQL, applies migrations, writes a record and reads it back, then cleans up. A mocked client can test calling logic but misses real SQL, schema, transaction and constraint problems. Always state which boundary the test covers.

**Simple example:** A real database test can reveal a unique-constraint violation that a hand-written mock never simulates.

### Slide 21: Real end-to-end tests

**The point:** Exercise the actual user journey across the intended system boundaries.

Replacing every internal API response with invented data checks only the UI against those inventions. The example keeps the application's login real while controlling an external payment dependency. An E2E report must say which external boundaries were stubbed.

**Simple example:** Submit login through the browser and verify that the real backend creates a valid session.

### Slide 22: Meaningful assertions

**The point:** A test must be capable of detecting incorrect behaviour.

A constant assertion and a referenced-but-not-called matcher do not verify the result. CSS-class checks often break on harmless restyling. The better example asserts an observable outcome after an action. Use assertions tied to requirements, not just implementation details.

**Simple example:** After submitting a fault, assert that a real reference appears, not that the button has shadow-xl.

### Slide 23: The testing pyramid

**The point:** Use many cheap focused checks and fewer expensive complete journeys.

The broad base is isolated unit tests, the middle real integration tests, and the top a small number of E2E checks. Higher tests cover more pieces but usually cost more time and maintenance. This is a strategy heuristic, not a fixed numerical ratio.

**Simple example:** Test discount arithmetic many ways in units, then cover one representative checkout journey end to end.

### Slide 24: Multi-stage builds

**The point:** Production should contain what is needed to run, rather than every build tool.

The builder installs development tools and produces dist. The runner copies the output and production dependencies and starts the app. Separating stages usually reduces image size and unnecessary executable tools. The sample is an illustration; supported base-image versions must be selected for a real project.

**Simple example:** A compiled service can run without carrying the compiler used to build it.

### Slide 25: Non-root containers

**The point:** Give a compromised process as little power as possible.

Root has broad privileges. USER node switches the example to a less privileged account. Containers share a host kernel, so isolation has limits. Escape consequences depend on namespaces, mounts and configuration; non-root reduces risk but cannot guarantee containment by itself.

**Simple example:** A process serving HTTP should not need permission to administer the operating system.

### Slide 26: Keep secrets out of source

**The point:** Credentials should be supplied securely, and missing credentials should not trigger weak defaults.

The first configuration falls back to a known password. The second rejects startup if the secret is missing. The application snippet similarly validates a required JWT signing secret. If a real credential was committed, deleting the line alone does not revoke it; rotate it.

**Simple example:** A deployment fails clearly rather than silently starting with the password postgres.

### Slide 27: Pin dependencies

**The point:** Know exactly which external code a build uses.

A floating tag may point to different content tomorrow. Version pins narrow the choice; a digest identifies specific image content. The GitHub Action example uses a commit identifier for the same reason. Pinning supports repeatability, but updates must still be reviewed and applied.

**Simple example:** Staging and production should not accidentally use different base images under the same latest tag.

### Slide 28: Limits and health checks

**The point:** The platform needs both resource boundaries and evidence of service health.

Limits stop one workload consuming all shared memory or CPU. Liveness asks whether the process should be restarted; readiness asks whether it can receive traffic. Starting a container is not proof that its database or migrations are ready. Avoid treating every dependency outage as a reason for endless restarts.

**Simple example:** Remove an unready replica from traffic while it finishes startup.

### Slide 29: Build once, promote

**The point:** Deploy the same artifact that passed the checks.

Rebuilding separately can pull different dependencies or produce different output. Build one identifiable image and move that artifact through staging and production. Scanning, signing and recording its digest help connect deployed software to verified software.

**Simple example:** The payment image tested in staging is the exact image released to production.

### Slide 30: Supply-chain security

**The point:** Your software also inherits risks from its dependencies and build path.

An SBOM lists included components. Signatures establish artifact provenance/integrity under a trusted verification process. Scanning finds known component issues, while lockfiles record resolved versions. These controls complement review; none proves an artifact contains no vulnerabilities. The slide's policy reference is context, not a legal checklist.

**Simple example:** A newly discovered library weakness can be traced to affected images using their component inventory.

### Slide 31: The complete pipeline

**The point:** Delivery stages should form one enforced chain of evidence.

Follow lint/type-check, unit tests, integration/build, scan/sign and deployment promotion. Each stage answers a different question. Slow or flaky checks need repair, not automatic bypass. The timing figures on the slide are practical examples rather than universal limits.

**Simple example:** A change cannot jump directly from untested source to production because integration tests happened to be slow.

### Slide 32: Questions and recap

**The point:** This is the closing discussion slide.

There is no new technical mechanism here. Use it to revisit how enforced tests, real boundaries, secure runtime settings and artifact promotion make delivery trustworthy. A useful question is whether your own pipeline can detect and block a known defect.

**Simple example:** Deliberately break an assertion in a test branch and confirm the required check fails.

## L18 - Domain Modelling and Architectures

Source: [L18 - Domain Modelling and Architectures(1).pdf](../../L18%20-%20Domain%20Modelling%20and%20Architectures(1).pdf)

### Slide 1: Domain and architecture recap

**The point:** First understand the business concepts, then organise the software around them.

This title connects domain modelling with architecture. A domain model describes the things and rules in the problem. Architecture describes the major software responsibilities and how they cooperate.

**Simple example:** Model customers, orders and payments before deciding how many services to create.

### Slide 2: Object-oriented vocabulary

**The point:** Classes describe kinds of things; objects are actual instances.

Attributes hold properties and operations represent behaviour. Encapsulation groups data and behaviour behind controlled access. Polymorphism lets different implementations respond to a shared operation. These concepts help represent business responsibilities clearly.

**Simple example:** Student is a class; the student with ID 123 is an object; borrowing may be an operation.

### Slide 3: UML and domain models

**The point:** A class diagram makes concepts and relationships visible.

A UML class box can show name, attributes and operations. In this lecture's domain-model convention, omit operations to focus on business concepts and relationships. A model is an abstraction, not a screenshot of database tables.

**Simple example:** Loan links Student to EquipmentItem and stores a due date.

### Slide 4: Relationship notation

**The point:** The symbols distinguish 'is a', 'part of' and strong ownership.

A hollow triangle points to the superclass: Manager is an Employee. A hollow diamond marks shared aggregation at the whole. A filled diamond marks composition, where the whole owns the part's lifecycle. Choose relationships from business meaning, not the physical objects alone.

**Simple example:** A room belongs to a building in the example; replacing an independently tracked engine need not destroy the engine record.

### Slide 5: Discover and brainstorm

**The point:** Gather domain information before drawing boxes.

Steps one and two mean reading requirements, talking through business processes and listing important concepts, properties and connections. The goal is a shared business vocabulary rather than an immediate implementation plan.

**Simple example:** Ask what counts as an active loan and who may approve it before designing a Loan class.

### Slide 6: Classify and draw

**The point:** Turn the brainstorm into a coherent model.

Decide which concepts deserve classes, which are merely attributes and how classes relate. Then draw the UML model so others can check it. Revisit assumptions when the diagram conflicts with requirements.

**Simple example:** Customer is a class, email is an attribute, and places connects Customer to Order.

### Slide 7: Bad models cause spreading confusion

**The point:** Repeated code problems can come from a wrong understanding of the business.

The left lists symptoms: changes touch many files, terminology conflicts and recurring defects. The right lists causes such as table-shaped boundaries and scattered rules. A model improves work when its names and constraints match what users actually mean.

**Simple example:** Two teams calling both a shopping basket and a paid purchase 'order' can implement contradictory rules.

### Slide 8: Entity or value object?

**The point:** Identity distinguishes entities; field values distinguish value objects.

A customer remains the same person after an email change. Money is equal when its amount and currency are equal under the chosen representation. The code preserves customer identity and returns a new Money object on addition. Currency compatibility must also be enforced in a complete implementation.

**Simple example:** Two customers called Sam are distinct; two amounts of R100 ZAR can be interchangeable values.

### Slide 9: What architecture means

**The point:** Describe responsibilities and relationships before brand-name technologies.

Architecture is the system's high-level organisation chosen to satisfy requirements. 'No technologies' is the lecture's modelling guidance: start with concepts such as broker or database rather than a vendor logo. Implementation/deployment views can later record concrete choices.

**Simple example:** Say 'durable message broker' before debating which product supplies it.

### Slide 10: What architecture decides

**The point:** Components, communication, quality goals and trade-offs belong together.

The four rows cover the major building blocks, their interactions, desired qualities and costs. Drawing components without explaining why they support availability or maintainability leaves the architectural reasoning incomplete.

**Simple example:** Asynchronous payment processing may improve resilience while introducing pending states and eventual completion.

### Slide 11: How to choose a style

**The point:** Choose from domain maturity, team needs and actual workload patterns.

An unclear domain favours keeping boundaries easy to change. Independent teams may justify services. Very different read/write workloads may justify CQRS. Event sourcing stores history as events when that history is valuable. The team counts are heuristics, not a universal rule.

**Simple example:** A small CRUD application rarely needs independent write and read models merely to look advanced.

### Slide 12: Logical layers

**The point:** Separate software responsibilities into layers.

Presentation handles interaction, business handles rules and data handles persistence. In a strict closed-layer design, a layer calls the adjacent one rather than skipping it. This controls dependencies; it does not require separate machines.

**Simple example:** A form asks a loan service to approve a loan instead of issuing SQL directly.

### Slide 13: Layered architecture trade-offs

**The point:** Familiar layering is useful, but dependencies can become rigid.

The image lists easy onboarding/testing as benefits and leaking boundaries/infrastructure coupling as risks. It suits many straightforward CRUD applications. Read 'use when' as contextual guidance, not proof that complex systems cannot use layers.

**Simple example:** A business rule tied directly to a particular ORM becomes harder to test or migrate.

### Slide 14: Four-layer diagram

**The point:** Follow a request through presentation, business, persistence and database.

The dashed arrows move downward one boundary at a time. 'Closed' means a layer should not be bypassed. Persistence hides storage interaction; the database stores records. These are logical responsibilities and can all live within one deployable application.

**Simple example:** Approving a loan goes through business validation before persistence writes the row.

### Slide 15: Physical tiers

**The point:** A tier describes runtime placement, rather than just a code responsibility.

Different tiers run in separate processes or deployment locations and communicate across those boundaries. Layers and tiers may align, but one tier can contain several layers. The lecture calls this physical separation.

**Simple example:** A browser, application server and database server form three deployment tiers.

### Slide 16: Three-tier diagram

**The point:** The client talks to an application server, which talks to storage.

Read the arrows from presentation through logic to data. The key distinction is that these are separate runtime parts. Network calls add latency and failure possibilities that ordinary in-process layer calls do not have.

**Simple example:** Closing the browser does not shut down the shared application server.

### Slide 17: Microservices basics

**The point:** Split by independently owned business capabilities when independence is useful.

Small services have their own deployment lifecycle and communicate through interfaces. Their independence depends on sensible boundaries and data ownership, not just separate processes. More services add network, consistency and operational work.

**Simple example:** Catalogue can be deployed without forcing checkout to release at the same time.

### Slide 18: Microservices diagram

**The point:** An entry gateway routes clients to separate capability services.

The web and mobile clients enter through an API gateway. Catalogue, cart, discounts and ordering each have their own database symbol. This shows service-owned data and interfaces instead of one application freely editing every table.

**Simple example:** The cart service asks ordering through its contract rather than updating ordering's private database.

### Slide 19: Technology-heavy example

**The point:** Separate architectural ideas from the concrete tools implementing them.

The Netflix-style diagram includes vendors and infrastructure products. The 'No technologies' annotation reminds you that an initial architecture answer should express capabilities and dependencies. This is an illustration of abstraction level, not a claim that technologies are irrelevant during implementation.

**Simple example:** Replace a branded cache box with 'cache for repeated reads' when explaining the conceptual design.

### Slide 20: Event-driven architecture

**The point:** Publish facts and let interested components react asynchronously.

Producers emit events, a broker distributes them, and consumers perform their own work. An event states what happened; it differs from a command asking someone to act. Scalability depends on consumer capacity, ordering and state design, not the label alone.

**Simple example:** OrderPlaced can trigger shipping, email and analytics without the order service calling each one directly.

### Slide 21: Event-driven trade-offs

**The point:** Loose coupling and buffering come with delayed state and harder tracing.

Producers need not know every consumer, so new reactions can be added later. Queues absorb temporary bursts. But consumers may be behind, event formats become shared contracts, and debugging crosses asynchronous boundaries.

**Simple example:** An order appears immediately while its confirmation email arrives seconds later.

### Slide 22: Event-driven diagram

**The point:** One incoming change can feed multiple independent processing paths.

The diagram shows a web/API entry, order/product processing, queue-like channels and separate consumers/stores. Follow publication to the relevant downstream work rather than reading it as one sequential function call. This explains fan-out and buffering, not an automatic guarantee of delivery.

**Simple example:** A product update can refresh a catalogue projection while another consumer processes stock changes.

### Slide 23: SOA basics

**The point:** Integrate business services through agreed interfaces, often across legacy systems.

SOA commonly uses larger business services and middleware to bridge different systems. SOAP is a message protocol and WSDL describes its service interface. An ESB is a common mediation pattern, not a requirement of every SOA implementation.

**Simple example:** A university connects finance, admissions and identity without rewriting all three.

### Slide 24: SOA diagram

**The point:** The bus mediates communication between consumers and business services.

Consumers sit above the ESB; account, book, order and shipping services sit below. The bus supplies routing or message translation between them. The data symbols show persistent state behind providers. Central mediation simplifies some integration but can become a concentrated dependency.

**Simple example:** The bus translates a modern order request into a legacy billing message.

### Slide 25: CQRS basics

**The point:** Separate changing state from reading state.

Commands request updates; queries return information. Distinct models can serve different workload needs. CQRS does not inherently require two databases or event sourcing, although those often appear in examples.

**Simple example:** A command validates a booking while a query returns a prearranged dashboard view.

### Slide 26: When CQRS fits

**The point:** Use extra read/write structure only when it solves a demonstrated problem.

It can help with specialised reports, heavy reading and historical views. It adds complexity and can delay read-side updates. A simple CRUD screen that needs immediately current values may gain little.

**Simple example:** A reporting projection helps when dashboard joins overload the transaction database.

### Slide 27: CQRS diagram

**The point:** The read database can lag behind the write database.

Follow the UI's command arrow to write tables and query arrow to the read store. The middle arrow updates the read representation with eventual consistency. A materialised view is stored query-ready data; it is not necessarily current immediately after a write.

**Simple example:** After changing an address, the reporting view may briefly show the old address.

### Slide 28: MVC roles

**The point:** Separate business state, display and input coordination.

The Model holds domain/data logic, the View renders information, and the Controller handles input and coordinates actions. Exact update flows differ between MVC variants. The point is separated responsibilities, rather than making one file do everything.

**Simple example:** A controller processes a borrow request, the model enforces availability and the view displays the outcome.

### Slide 29: MVVM versus MVT

**The point:** Similar letters can describe different presentation responsibilities.

MVVM exposes view state and commands through a ViewModel, often with binding. Django-style MVT uses a View for request logic and a Template for rendered output. The framework examples are illustrative; using React alone does not establish MVVM.

**Simple example:** A bound button reads a ViewModel's loading flag; a server template renders a supplied list of loans.

### Slide 30: MVC, MVP and MVVM picture

**The point:** Look at who coordinates the screen and how updates travel.

MVC uses a controller for input coordination. MVP uses a presenter that communicates with the view. MVVM uses a view model exposing state/commands, with the view commonly binding to them. These patterns organise presentation; they do not decide database deployment.

**Simple example:** A presenter tells the view to show an error; a view model exposes an error property the view displays.

### Slide 31: A combined architecture example

**The point:** Real systems can combine presentation, security, services and events.

Start at the Unity UI and binding layer, then follow API calls through a gateway/mesh to an event bus and processing services. Side flows show image/track extraction and data preparation; the bottom database holds results. This is a teaching example, not proof that service-owned data is achieved merely because services are drawn.

**Simple example:** Uploading a track can publish processed information that training and optimisation components consume separately.

### Slide 32: Client, server and vault example

**The point:** Separate client presentation, server capabilities and protected storage.

The client has Model, ViewModel, View and an encryption-related store. The server has control, service and data responsibilities, with external data sources and an indexing/search server. The vault has separate authentication/registration and repository parts. Read the dashed links as declared dependencies; do not infer undocumented security guarantees.

**Simple example:** A search service queries an index while identity-sensitive vault access passes through its own interface.

### Slide 33: Presenter and orchestrator example

**The point:** Presentation coordination and backend workflow coordination are different jobs.

The client Presenter updates the View, while the View reports user actions. HTTPS crosses into a server gatekeeper and gateway. A scheduler and broker trigger workflows; archive, disputes and users use persistent storage. Cache and logging have separate roles. Follow one request rather than trying to memorise every box.

**Simple example:** A timed event starts a workflow without a user having to keep the website open.

### Slide 34: Architecture-pattern overview

**The point:** Styles solve different organising problems and can be combined.

The collage compares event-driven, layered, monolithic, microservice, MVC and master/slave-style arrangements. Focus on boundaries and interaction: events distribute reactions, layers separate responsibilities, services separate deployments, and MVC separates UI roles. A picture alone does not justify choosing a pattern.

**Simple example:** One modular monolith can use MVC at its UI and events for background notifications.

## L19 - Software Testing in Practice

Source: [L19 - Software testing in Practice.pdf](../../L19%20-%20Software%20testing%20in%20Practice.pdf)

### Slide 1: Testing in practice

**The point:** Testing helps software keep working as it changes.

This is the talk's title and company introduction. The later slides connect a real project failure to automated checks, testability and a delivery strategy. There is no technical test procedure to learn from the title itself.

**Simple example:** A checkout that works today needs checks to keep working after next week's update.

### Slide 2: Meet the speakers

**The point:** The talk is grounded in practitioners' experience.

Names, roles and experience introduce the presenters. This is context about who is speaking, rather than a testing definition or a requirement to memorise their credentials.

**Simple example:** A CTO may explain testing's operational costs while another speaker discusses delivery practices.

### Slide 3: Company introduction

**The point:** This slide establishes the organisation behind the examples.

The company describes building technology for customers. Its role here is introductory context; it does not claim that a particular testing method is proven merely by the slogan.

**Simple example:** Later project stories provide practical context for the testing lessons.

### Slide 4: What they build

**The point:** Different products have different testing boundaries.

Electronics, custom software, mobile apps and integrations span code, devices, people and external systems. Testing must address the relevant boundary for each product rather than assuming every system is just a website.

**Simple example:** A sensor product needs hardware/firmware interaction checks as well as server API tests.

### Slide 5: Team picture

**The point:** Software delivery is a team activity.

The photo collage introduces the people behind the company. The small ratio annotation is not explained by the slide, so it should not be treated as a testing formula. There is no new technical mechanism on this page.

**Simple example:** A shared test suite helps many developers detect when their changes interfere.

### Slide 6: Company figures

**The point:** Scale explains why repeatable engineering practices matter.

The slide reports project counts, team size, experience and reach as company context. These are presentation claims about the organisation, not measurements of a test suite's effectiveness or numbers to reproduce in an exam answer.

**Simple example:** More projects and users make repeatedly checking important behaviour valuable.

### Slide 7: Section transition

**The point:** The introductory company section is ending.

This logo/tagline page is a transition into the testing discussion. It adds no new test type or technical definition. The next slides supply the concrete reasons to test.

**Simple example:** Move from 'who is speaking' to 'what went wrong in a project'.

### Slide 8: Why bother testing?

**The point:** A failed project can reveal the cost of missing checks.

This divider introduces the horror-story case study. It asks you to understand the problem testing prevents, rather than writing tests only because a lecturer requests them.

**Simple example:** Bugs discovered by users can cost more than bugs found during development.

### Slide 9: HR portal problem

**The point:** A slow, platform-bound development process made errors expensive to find.

The SharePoint portal had custom data/workflows, no effective local environment and slow deployments. That combination turned every experiment or fix into a painful release cycle. The screenshot illustrates the application; the lesson is about feedback and workflow constraints.

**Simple example:** A developer waits for deployment merely to find that one approval rule is wrong.

### Slide 10: Why the portal deteriorated

**The point:** Late discovery and tight coupling reinforce one another.

Errors reached production, rules depended heavily on the platform, and collaboration was hard. Each change became slower and riskier, creating a negative compounding effect. Coupling means a rule cannot easily be changed or tested without the surrounding platform.

**Simple example:** A small business-rule change forces a whole remote workflow deployment and breaks a teammate's work.

### Slide 11: Lessons from the failure

**The point:** Quality must be preserved across changes, not just at first release.

Users judge the software you actually deliver. The difficult part is keeping behaviour correct while features and code evolve. More suitable automated tests would have provided earlier evidence and safer changes.

**Simple example:** An existing payroll test can detect that a new leave feature accidentally changes salary calculations.

### Slide 12: How tests would have helped

**The point:** Fast repeatable feedback can reverse the vicious cycle.

Tests expose mistakes before production, encourage isolating external dependencies and reveal changes that break other work. Well-chosen tests accumulate value because later developers can reuse the earlier checks. Tests help, but also need a usable development environment.

**Simple example:** A local approval-rule test runs in seconds instead of requiring another portal deployment.

### Slide 13: Getting started

**The point:** The talk now changes from motivation to practical technique.

This divider contains no detailed method by itself. It introduces the next sequence on attitude, test levels, implementation, coverage and strategy.

**Simple example:** First decide to make testing part of ordinary development work.

### Slide 14: Testing attitude

**The point:** Useful tests speed up safe development over time.

Treat the suite as a feedback mechanism, not a final administrative task. Tests support refactoring, dependency separation and maintainability. Their value depends on meaningful cases and assertions; adding many weak tests is not automatically helpful.

**Simple example:** You can simplify an implementation confidently while existing behaviour checks remain green.

### Slide 15: Testing types

**The point:** Different tests answer different questions.

Unit tests check a focused piece; integration tests check cooperating parts; functional tests check required behaviour; E2E tests check complete journeys; load tests check behaviour under demand. These categories can overlap: an E2E test can also be functional.

**Simple example:** Discount arithmetic is a unit concern; a user's complete purchase journey is an E2E concern.

### Slide 16: Write understandable tests

**The point:** Test structure and names should explain expected behaviour.

Design separable logic and dependencies so cases are controllable. The contrasting screenshots illustrate vague versus descriptive test output. A failing test name should tell a developer which rule broke, rather than just saying test 17 failed.

**Simple example:** 'Rejects an expired loan renewal' is more useful than 'service test'.

### Slide 17: Code coverage

**The point:** Coverage tells you what executed, not whether it was checked well.

Line coverage records executed lines; branch coverage records alternatives taken. Uncovered code highlights missing exercise, but high coverage can coexist with weak assertions or missing edge cases. Choose coverage goals with risk and context rather than assuming one magic percentage.

**Simple example:** A test can execute a payment function without asserting that the amount is correct.

### Slide 18: Red, green, refactor

**The point:** TDD builds behaviour through a repeated small feedback loop.

Write a test for required behaviour and see it fail, implement enough to pass, then improve structure while it still passes. Red verifies the test can detect absence of the feature. Refactoring changes organisation without changing intended behaviour; TDD does not guarantee performance by itself.

**Simple example:** Write a failing duplicate-order test, add deduplication, then simplify the implementation.

### Slide 19: Testing strategy

**The point:** Automation and human assessment complement one another.

CI reruns checks on changes and can block unsafe merges. User acceptance testing asks whether intended users can achieve their tasks. Humans explore unexpected actions and usability problems that fixed scripted cases may miss.

**Simple example:** Automated calculations pass, but a user notices the submit action is impossible to find.

### Slide 20: Safer release techniques

**The point:** Check deployments and limit exposure to new behaviour.

A smoke test exercises a few critical paths after deployment. A feature switch hides deployed code until enabled. A canary exposes a release to a small group before wider rollout. Deployment means code is present; release means users can access the feature.

**Simple example:** Enable a new search feature for a small group and watch error rates before expanding.

### Slide 21: Testing takeaway

**The point:** Plan, design and repeat testing throughout development.

The boxes connect accumulating automated checks with testable design and a consistent strategy. The lesson is a maintained process, not a once-off testing sprint. Good checks give future changes more protection.

**Simple example:** Every fixed regression adds a useful case to the suite.

### Slide 22: Questions and contact

**The point:** This is the closing discussion/contact slide.

The email and QR code let attendees contact the presenters. There is no new testing concept to memorise. Review which test boundaries and release checks would have prevented the portal case-study problems.

**Simple example:** Explain how a local unit test and a real integration test would each reduce a different risk.

## L20 - Designed for Humans

Source: [L20 - Designed for Humans.pdf](../../L20%20-%20Designed%20for%20Humans.pdf)

### Slide 1: Designed for humans

**The point:** Working software also needs to make sense to its users.

This title introduces UI, the interface people operate, and UX, their overall experience achieving a task. The lecture focuses on usable and visually understandable products, rather than only whether the code runs.

**Simple example:** A correct booking system can still fail users if they cannot find how to book.

### Slide 2: Meet the presenters

**The point:** This slide introduces the people giving the design talk.

Names, photos and engineering roles provide context. There is no design principle or test criterion hidden in their job titles. The practical lessons begin on the next page.

**Simple example:** Treat this as an introduction rather than material to memorise.

### Slide 3: Why developers should care

**The point:** Features are valuable only when people can use them comfortably.

Developers ask whether a system works and is fast. Users experience confusion, confidence or frustration while using it. Good design often goes unnoticed because the task feels straightforward; poor design can make users abandon a technically correct product.

**Simple example:** A fast checkout is unhelpful if users cannot recognise the payment button.

### Slide 4: Useful, usable and desirable

**The point:** A good experience sits where three needs overlap.

Useful means it solves a real problem. Usable means people can accomplish the task. Desirable means the experience and presentation make them want to use it. The overlapping circles show that any one quality alone is insufficient.

**Simple example:** A beautiful app that solves no user problem is desirable but not useful.

### Slide 5: Usability section

**The point:** Reduce unnecessary thinking during ordinary tasks.

'Don't Make Me Think' introduces predictable labels, clear controls and understandable feedback. It does not mean users never need judgement; it means the interface should not create avoidable puzzles.

**Simple example:** A plainly labelled 'Renew loan' action is easier than an unexplained symbol.

### Slide 6: Think from the user's goal

**The point:** Design around what users want to accomplish, not how your code is organised.

The implementation model describes internal machinery. The user's mental model describes their understanding of the task. Your product is a means to their goal, so expose relevant task concepts instead of your database or service structure.

**Simple example:** Users want to return a parcel, not to call the returns microservice.

### Slide 7: Constraints prevent mistakes

**The point:** Guide people toward valid actions before they fail.

Constraints limit unsuitable choices and make valid ones clearer. They reduce avoidable errors and uncertainty. They still need explanation when a legitimate action is unavailable; a disabled control without context can confuse users.

**Simple example:** A booking calendar can prevent selecting dates earlier than today.

### Slide 8: Date-input example

**The point:** A suitable control is kinder than repeatedly rejecting a format.

The left asks users to guess a date representation and then criticises the answer. The right shows a clear format and a date picker. The picker constrains selection and explains what the system expects; text entry should still be usable where appropriate.

**Simple example:** Accept a supported date format clearly rather than displaying 'Ha! Wrong format'.

### Slide 9: Discoverability

**The point:** People should be able to see what they can do and predict the result.

Controls, labels and layout communicate available actions. Hidden or ambiguous actions force guessing and make users afraid of mistakes. Discoverability is about finding the action; it differs from feedback, which happens after acting.

**Simple example:** A visible 'Download report' control makes an export feature discoverable.

### Slide 10: Icons versus labels

**The point:** Familiar words often explain actions better than unexplained pictures.

The top row asks users to infer what icon-only controls do. The bottom adds Add, Edit, Delete and More actions. Icons can help scanning, but require accessible names and must be understandable in the intended context.

**Simple example:** A pencil icon labelled 'Edit' is clearer than a mysterious pencil alone.

### Slide 11: Feedback

**The point:** Show what the system is doing after a user acts.

Loading placeholders, busy indicators and outcome messages make state visible. Users should not have to infer whether a click registered or remember a previous action. Feedback should distinguish pending work from completed work.

**Simple example:** 'Uploading...' followed by 'Upload complete' communicates two different states honestly.

### Slide 12: Task-creation example

**The point:** Immediate acknowledgement prevents uncertainty and repeat clicks.

The top sequence stays unchanged for five seconds, leaving the user wondering. The bottom shows a busy state immediately and a success message when finished. The spinner acknowledges the action; it does not mean success until the final result arrives.

**Simple example:** Disable repeated submission while showing progress, then show the created task or an actionable error.

### Slide 13: Too many choices

**The point:** More visible options can make a task harder to start.

The paradox of choice highlights decision overload. Progressive disclosure keeps common actions visible and reveals less common options when needed. It should not hide essential actions that users must discover.

**Simple example:** Show a clear 'Create' action and put uncommon import options in a labelled menu.

### Slide 14: Progressive-disclosure example

**The point:** Group secondary actions around one understandable main action.

Compare four competing buttons with one Create control and a dropdown. The second presentation reduces clutter while retaining Create list, Import and Discover. The goal is prioritisation, not deleting capabilities.

**Simple example:** A split button can make the default creation path clear while still exposing alternatives.

### Slide 15: Visual-design section

**The point:** Readable visual structure supports the task.

This divider changes from interaction principles to how a screen looks and reads. 'Easy on the eyes' means hierarchy, spacing, type and colour support comprehension rather than distract from it.

**Simple example:** A well-spaced form can feel simpler without removing any required fields.

### Slide 16: Visual hierarchy

**The point:** Emphasis works only when some things are less prominent.

Size, weight, spacing and colour direct attention. If every element is bright, large or bold, none stands out. The sample text demonstrates how readers naturally notice the strongest heading first.

**Simple example:** Make the next required action prominent and supporting explanations quieter.

### Slide 17: Whitespace

**The point:** Empty space helps users distinguish content and controls.

The two authentication forms contain similar information but use different breathing room. Whitespace separates sections, reduces crowding and improves scanning. It is a functional design tool, not necessarily wasted screen area.

**Simple example:** Space between the explanation and phone-number field makes the next task easier to identify.

### Slide 18: Proximity and grouping

**The point:** Put related items closer together than unrelated items.

The example compares ambiguous form spacing with clearer label–input groups. A label should visually belong to its field, not seem attached to the previous one. Consistent group gaps communicate relationships without extra borders.

**Simple example:** Place 'Email' near the email box and leave a larger gap before the next field.

### Slide 19: Font consistency

**The point:** Limit typefaces and use weight deliberately.

The contrasting forms show how mixed fonts and inconsistent treatment create visual noise. One or two compatible fonts plus a small set of weights usually produce clearer hierarchy. Consistency should not come at the expense of readability.

**Simple example:** Use one body font and a clear semibold heading instead of a new font for every label.

### Slide 20: Font-pairing examples

**The point:** Pair fonts by their roles and readability.

The samples show combinations such as serif headings with sans-serif body text. Lorem ipsum is dummy content used to inspect typography, not something to interpret. The examples are inspiration; test the pairing with your real language and screen sizes.

**Simple example:** A characterful heading font can be paired with a restrained readable paragraph font.

### Slide 21: Line height

**The point:** Give text enough vertical space without breaking its grouping.

The three columns compare tightly packed, comfortable and overly spread text. Paragraphs usually need more relative line spacing than short headings. The shown multipliers are examples, not settings that work for every typeface.

**Simple example:** A paragraph with touching lines is hard to track, even when the font size is adequate.

### Slide 22: Line length

**The point:** Very long text lines make it harder to find the next line.

The wider paragraph has roughly 120 characters per line; the narrower one around 80. The comparison explains why a readable content column matters on large screens. The suggested length is a practical guide, not an absolute cap for every content type.

**Simple example:** Keep explanatory prose narrower than a full-width dashboard chart.

### Slide 23: Controlled use of colour

**The point:** Colour should establish meaning and focus, not compete everywhere.

The chat screenshots contrast a strongly coloured interface with a restrained one. A limited palette and shades can separate structure, selected items and errors. Too many equally strong colours make importance difficult to judge.

**Simple example:** Keep ordinary messages neutral while making a connection error noticeable.

### Slide 24: Palette examples

**The point:** A coordinated palette is a starting point, not finished design.

The swatches illustrate related colours and shades that work together visually. A palette still needs semantic assignments and contrast checks when applied to actual controls or text. Attractive swatches do not automatically create an accessible screen.

**Simple example:** Decide which colour means action and which means warning before applying the palette.

### Slide 25: Readable colour combinations

**The point:** Text needs enough difference from its background.

The paired notification examples show low and improved contrast. Pale text on pale backgrounds can disappear even if the colours look appealing separately. Check the actual foreground/background combination rather than judging a colour alone.

**Simple example:** A success message can use dark green text on a light background instead of faint green on green.

### Slide 26: Contrast ratios

**The point:** Use a measured ratio instead of guessing readability.

A ratio compares foreground and background luminance. The slide's examples connect 2:1, 6:1 and 4.5:1 with the displayed normal/large-text thresholds. Larger or heavier qualifying text has a different threshold. Colour contrast checks cover only one part of accessibility.

**Simple example:** A 2:1 combination fails the slide's normal-text AA criterion even if a designer likes it.

### Slide 27: Style guides reduce inconsistency

**The point:** Record visual rules so people do not reinvent each screen.

The listed colours, typography, spacing, icons and illustrations form a shared reference. Limiting arbitrary choices speeds decisions and improves coherence. A guide describes rules; an implemented design system also supplies reusable behaviour and components.

**Simple example:** New screens follow the same heading scale and spacing rules.

### Slide 28: Further reading

**The point:** The books expand different parts of user-centred design.

The Design of Everyday Things covers understandable interaction, Don't Make Me Think focuses on usability, and Thinking with Type covers typography. This is a reading-list slide, not another interface pattern.

**Simple example:** Use the books to explore why an affordance is confusing or a paragraph is difficult to read.

### Slide 29: Recruitment announcement

**The point:** This page advertises a graduate programme, rather than teaching UX.

The PDF contains an application date and qualification criteria from the original talk. Preserve it as lecture context; those details are not software-design concepts and are not independently checked current opportunities.

**Simple example:** No design rule needs to be inferred from the recruitment QR code.

### Slide 30: Questions and contact

**The point:** The design talk closes with contact details.

This is a discussion page with no new technical principle. Review how constraints, discoverability, feedback, hierarchy and accessibility make a user task easier.

**Simple example:** Explain why a busy indicator and a clearly labelled control solve different problems.

## L21 - DevOps and DevSecOps

Source: [L21 - DevOps and DevSecOps.pdf](../../L21%20-%20DevOps%20and%20DevSecOps.pdf)

### Slide 1: DevOps and DevSecOps

**The point:** Development, operations and security should work as a shared delivery process.

DevOps connects building software with running it. DevSecOps includes security throughout that process. This title introduces the relationship; the later diagrams illustrate the repeated plan-to-monitor loop.

**Simple example:** An operational incident should influence the next development change.

### Slide 2: Unavailable Menti page

**The point:** This PDF page contains an export error, not the original teaching material.

The visible page says it could not load the Menti slide. There is no recoverable topic or diagram to explain here. It may have been an interactive presentation page, but its question and intended answer cannot be determined from this PDF.

**Simple example:** Use the visible lecture slides for DevOps concepts; do not infer a missing poll answer.

### Slide 3: DevOps section

**The point:** The first part explains the shared build-and-run workflow.

This section divider introduces DevOps. Its point is collaboration and feedback across development and operations rather than merely buying a deployment tool.

**Simple example:** Developers and operators share responsibility for a service that stays healthy after release.

### Slide 4: Unavailable Menti page

**The point:** The original content is missing from the supplied PDF.

Only a Menti loading-error message is visible. No technical claim can safely be recovered. The adjacent section concerns DevOps, but that does not reveal this individual page's content.

**Simple example:** There is no poll result to memorise from this page.

### Slide 5: Unavailable Menti page

**The point:** The source shows a failed presentation export.

This is another Menti error page, not an intentionally blank technical slide. Keep its place in the slide sequence, but distinguish missing source material from an explanation of a known concept.

**Simple example:** Continue to the following CI/CD diagram for the visible delivery workflow.

### Slide 6: CI/CD loop

**The point:** Software delivery repeats; monitoring feeds the next plan.

Read the infinity-shaped diagram through plan, code, build, test, release, deploy, operate and monitor. CI combines changes and checks them. CD prepares or deploys verified output. The loop connects live-system feedback to future work rather than treating deployment as the end.

**Simple example:** A production error creates a planned fix, which then travels through the same checks.

### Slide 7: Plan

**The point:** Decide the work and its acceptance criteria before implementing it.

The planning-tool screenshot represents organising requirements, priorities and tasks. A useful plan also states how success will be measured and who owns it. Planning is part of delivery, not a separate document nobody revisits.

**Simple example:** A task for password reset includes token expiry and abuse-prevention acceptance cases.

### Slide 8: Code

**The point:** Implement the agreed behaviour in maintainable source code.

The editor screenshots represent programming, with reviews and version control fitting this stage. Writing code is one activity in the loop, not the whole lifecycle. Changes should remain testable and traceable to the requirement.

**Simple example:** A developer adds the reset handler and reviews how expired tokens are rejected.

### Slide 9: Build

**The point:** Turn source and dependencies into a runnable artifact.

The terminal screenshot represents automated compilation or packaging. A build can reveal syntax/type or dependency problems before deployment. It should produce identifiable output so the tested artifact can be released consistently.

**Simple example:** A commit becomes a versioned container image used in later environments.

### Slide 10: Unavailable Menti page

**The point:** No build-stage teaching content is recoverable on this page.

The PDF displays only the Menti loading error. Its position follows Build, but that is not evidence of a specific exercise or answer. The viewer preserves the original page and labels this limitation.

**Simple example:** Do not mistake a missing exercise for an additional build requirement.

### Slide 11: Unavailable Menti page

**The point:** This page's intended material was not exported successfully.

There is no usable diagram, question or explanation besides the error notice. The subsequent Test slide contains the next recoverable step in the loop.

**Simple example:** Move to the visible testing example for actual content.

### Slide 12: Test

**The point:** Check that the artifact behaves as required before wider exposure.

The payment screen and test output connect user-visible functionality with automated checks. Testing can include focused logic, cooperating components and representative user flows. Passing output is meaningful only when the cases and assertions check relevant behaviour.

**Simple example:** Check that invalid payment input is rejected and a valid payment produces the right outcome.

### Slide 13: Release

**The point:** Prepare a verified version and control when it becomes live.

The picture contrasts active old-version pods with new-version pods not yet serving users. It illustrates separating preparation from traffic switching. Teams use release/deploy terminology differently; focus on which artifact exists and which version users receive.

**Simple example:** Version 1.2.4 can be started and checked before traffic moves from 1.2.3.

### Slide 14: Deploy

**The point:** Put the selected artifact into its target environment.

The large button is an illustration of executing a deployment. Real deployment should be repeatable, controlled and observable, with a rollback/recovery plan. A deployment command succeeding does not alone prove the service is ready.

**Simple example:** Install the new image, then check readiness before routing user traffic to it.

### Slide 15: Operate

**The point:** Keep the deployed service working for real users.

The management screenshots illustrate ongoing configuration and administration. Operations covers runtime care such as access, capacity, jobs and incident response. It continues after code has been delivered.

**Simple example:** Investigate a stuck background job and restore its processing safely.

### Slide 16: Monitor

**The point:** Observe behaviour so problems and improvements become visible.

Dashboards and application screenshots represent watching health and outcomes. Metrics show trends, logs record events and traces connect work across boundaries. Monitoring closes the loop by generating actionable feedback.

**Simple example:** Alert on rising error rates and investigate the corresponding request traces.

### Slide 17: Live-demo transition

**The point:** This slide introduces an in-person demonstration.

The meme announces a demo but contains no recording or technical procedure. The demo's exact steps cannot be recovered from this page alone. The relevant takeaway is that the preceding delivery stages can be demonstrated in practice.

**Simple example:** A presenter might show the build pipeline, but the slide does not prove which actions they performed.

### Slide 18: DevSecOps section

**The point:** Security should be integrated into the delivery loop.

This divider changes from DevOps to security-aware delivery. Security belongs in planning, code review, verification, release and operations, rather than only in a last-minute scan.

**Simple example:** A new API includes threat analysis and access-control tests before launch.

### Slide 19: Unavailable Menti page

**The point:** The DevSecOps interactive content is missing.

Only a Menti error notice is present. Its location identifies the broad section, but not the original question, diagram or answer. Do not invent content for this slide.

**Simple example:** Use the later CVE, OWASP and tooling pages as the visible security content.

### Slide 20: Unavailable Menti page

**The point:** This PDF page has no recoverable teaching content.

The presentation export failed to load its Menti page. Keep this limitation explicit rather than substituting a generic security paragraph as if it appeared here.

**Simple example:** No specific security exercise can be reconstructed from the error message.

### Slide 21: CVE

**The point:** Known vulnerabilities need a shared identifier.

CVE means Common Vulnerabilities and Exposures. The graphic shows a shared reference used by different security participants. A CVE identifies a published vulnerability record; it does not itself prove that your particular configuration is exploitable.

**Simple example:** A dependency scanner reports a CVE so a team can identify and investigate the same issue.

### Slide 22: OWASP

**The point:** Community guidance helps teams understand application-security risks.

OWASP stands for Open Worldwide Application Security Project. This logo slide introduces the organisation, commonly associated with risk lists and testing guidance. It is not a scanner or a certification that an application is secure.

**Simple example:** Use application-security guidance to ask whether each record request enforces authorisation.

### Slide 23: Unavailable Menti page

**The point:** The original security content is unavailable in this export.

The page shows the Menti load error rather than the teaching material. There is no reliable way to identify the intended question from neighbouring slides.

**Simple example:** Do not assume this page is a particular OWASP category.

### Slide 24: Unavailable Menti page

**The point:** This is a source-export error page.

Its visible content supplies no technical mechanism or exercise answer. The next page explicitly names DAST and SAST, which can be explained from the actual visible slide.

**Simple example:** Continue to the tooling comparison for recoverable material.

### Slide 25: DAST versus SAST

**The point:** Examine both the code and the running application.

SAST is static application security testing: analyse source or artifacts without operating the application as a user. DAST is dynamic testing: send inputs to a running application and inspect behaviour. They find different classes of problems and complement review and manual testing.

**Simple example:** SAST may flag unsafe SQL construction; DAST may reveal that a live endpoint exposes another user's record.

### Slide 26: Secret scanning

**The point:** Detect credentials accidentally included in source or artifacts.

Secret scanning looks for keys, tokens and passwords that should not be public or broadly accessible. Detection must lead to removal from source and revocation/rotation of exposed credentials. A clean scan is not proof that all secrets are handled correctly.

**Simple example:** Revoke a committed API token rather than merely deleting the current line.

### Slide 27: Company values

**The point:** This page explains the presenting company's approach to work.

The text emphasises understanding clients and crafting software around business needs. This is company context rather than another DevSecOps stage. Its connection to the lecture is that delivery decisions should serve the real business problem.

**Simple example:** Understand why an approval workflow exists before automating it.

### Slide 28: Learning and team culture

**The point:** Continuous learning supports engineering capability.

The slide lists workshops, mentoring, technical groups and clubs. These are examples of company culture, not mandatory CI stages or exam definitions. Training can help a team maintain the skills needed for secure, reliable delivery.

**Simple example:** A testing workshop can improve how the team writes useful checks.

### Slide 29: Thank you and questions

**The point:** The lecture closes with discussion.

No new technical content appears here. Revisit the plan-to-monitor loop and where security checks or incident feedback belong. Missing Menti pages remain unavailable source material.

**Simple example:** Explain why a secret leak needs both a development fix and an operational credential rotation.

## L22 - Practical Architectural Design

Source: [L22_Practical_Architectural_Design.pdf](../../L22_Practical_Architectural_Design.pdf)

### Slide 1: Practical architectural design

**The point:** Architecture is a process of measurable goals, reasoned decisions and enforcement.

The title's chain is quantify, decide, communicate and enforce. This file is named L22 in the workspace, although its internal heading says Lecture 13. The concepts connect requirements to actual design and checks.

**Simple example:** A resilience requirement should lead to an explicit design choice and a test that challenges it.

### Slide 2: Lecture and exercise expectations

**The point:** Practise quality scenarios and decision records.

This page sets participation rules and identifies the two skills: writing a quality-attribute scenario and an ADR. Its assessment statement belongs to the original lecture; it is not a new prediction about a future exam format.

**Simple example:** Practise explaining a chosen timeout with its context and costs.

### Slide 3: Why architecture needs reasoning

**The point:** Every useful design choice comes with costs.

The two principles say trade-offs are unavoidable and the reason matters more than the tool. Architectural work turns vague wishes into targets, records choices, communicates them and prevents drift. Different contexts can justify different answers.

**Simple example:** A queue buys isolation but requires pending states and recovery procedures.

### Slide 4: The seven-step mapping

**The point:** Every design step should trace back to a requirement.

Follow NFR, quality attribute, tactic, pattern, ADR, design and test. A tactic is the design move; a pattern is a reusable arrangement implementing it. The final check should test the original target, closing the chain.

**Simple example:** 'No lost accepted orders' leads to durable acceptance and a failure-injection recovery test.

### Slide 5: Vague scalability

**The point:** A word like scalable does not state a testable target.

The latency jump gives a measurable symptom that a broad adjective cannot supply. State workload, conditions and acceptable outcomes. Without them, two people can claim success while expecting different behaviour.

**Simple example:** Say 'p95 below 500 ms at 150 requests/s for 30 minutes' rather than 'fast under load'.

### Slide 6: Six-part quality scenario

**The point:** Describe who causes what, where it happens and how success is measured.

The six fields are source, stimulus, environment, artifact, response and response measure. In the example, users request seat availability during a flash sale and the service must meet latency/error limits. p99 is a tail-latency percentile, not an average.

**Simple example:** For a server crash, specify the affected API, peak workload, recovery action and maximum restoration time.

### Slide 7: Choose the quality attribute

**The point:** Different goals require different kinds of design moves.

The grid groups qualities such as reliability, security and maintainability. Fast responses and low memory use are distinct concerns even though both affect performance. The slide uses a newer quality-model vocabulary; keep labels consistent with the material and explain the actual measurable behaviour.

**Simple example:** Increasing replicas may help availability but does not fix an object-authorisation flaw.

### Slide 8: Utility tree

**The point:** Refine business priorities into measurable leaves.

Read from overall utility to a quality category, subconcern and concrete scenario. Importance and difficulty help allocate design effort. High importance/high difficulty deserves attention; low value/high effort deserves challenge. The labels are prioritisation aids, not computed guarantees.

**Simple example:** A costly low-priority report may be deferred while checkout fault tolerance receives engineering time.

### Slide 9: Availability exercise

**The point:** Specify the failure before proposing redundancy.

'Stay up if things fail' leaves out which component fails, when and what counts as success. The prompts ask you to choose failure scope, workload and measures. Different failure scopes can require very different budgets.

**Simple example:** Surviving one web process crash is easier than surviving loss of an entire region.

### Slide 10: Availability worked answer

**The point:** Recovery includes detection, rerouting, capacity and correctness.

The scenario chooses one unhealthy app instance during peak load. Healthy replicas receive traffic and retries must not duplicate bookings. Error rate, time to restore capacity and duplicate count are separate measures, so each needs evidence.

**Simple example:** A load balancer that waits four minutes to detect a hung instance can miss a 30-second recovery target.

### Slide 11: Forgotten decisions

**The point:** Decisions kept only in people's memories are easy to lose.

The timeline shows a database decision, departing engineers and the same debate restarting. Record the reasons, rejected options and assumptions while they are known. Documentation should preserve rationale, not merely the selected product name.

**Simple example:** A new developer can understand why transactional constraints mattered to the database choice.

### Slide 12: ADR structure

**The point:** A short record preserves what was chosen and why.

An Architecture Decision Record has title/status, context, decision and consequences. Include alternatives and downsides, and update status when superseded. A useful decision is specific enough to check against the system.

**Simple example:** 'Only payment adapters import provider SDKs' can be checked; 'use modern design' cannot.

### Slide 13: Caching ADR example

**The point:** Cache a carefully chosen read path and accept its consistency costs.

Event/venue reads use cache-aside with a 60-second TTL and edit invalidation. Seat availability is excluded because stale answers threaten correctness. Consequences include stale data, an extra dependency and simultaneous misses; coalescing combines duplicate fetches.

**Simple example:** Several requests for one expired key can share one refresh instead of all hitting the database.

### Slide 14: Weak ADR example

**The point:** A product name plus a claimed benefit is not enough rationale.

The Kafka example lacks boundaries, constraints, alternatives and negative consequences. A useful ADR explains what messaging does here and what latency, duplicate or ordering risks it introduces. You must be able to judge whether the implemented system follows it.

**Simple example:** Name the business event stream and delivery semantics instead of merely saying 'better scalability'.

### Slide 15: Design review

**The point:** Written proposals let others challenge assumptions before implementation.

Read the loop from draft to comments, revision and accepted ADR. Review is valuable because it surfaces overlooked effects and makes trade-offs explicit. The cited companies provide examples, not a requirement to copy their exact process.

**Simple example:** A reviewer asks how queue growth is bounded before the service launches.

### Slide 16: Distributed-computing fallacies

**The point:** Remote communication cannot be treated like a free reliable local call.

The eight unsafe assumptions concern reliability, latency, bandwidth, security, topology, administration, cost and homogeneity. Networks change and failures can be partial or ambiguous. Use the list to challenge happy-path assumptions, not as proof that distribution is always bad.

**Simple example:** A timed-out payment may have succeeded remotely even though the response was lost.

### Slide 17: Fallacies mapped to tactics

**The point:** Each protection answers a specific failure assumption.

Retries need idempotency; breakers and dead-letter queues control failure paths. Caching and coarse requests address latency. Service authentication addresses misplaced trust. Versioned contracts protect independently changed consumers. No tactic fixes every fallacy.

**Simple example:** An internal API still needs authentication rather than trusting every caller on the network.

### Slide 18: Cost of premature distribution

**The point:** Separate deployments are useful only when boundaries are genuinely independent.

A distributed monolith combines tight coupling with network overhead. Premature splitting spreads unclear responsibilities across services. Operational tax includes deployments, monitoring and recovery. The percentage on the slide is an illustrative case, not a universal forecast.

**Simple example:** A small team may get clearer boundaries from a modular monolith before extracting services.

### Slide 19: Tactic versus pattern

**The point:** Separate the desired design effect from the chosen arrangement.

Caching reads is a tactic; cache-aside or read-through are alternative patterns. Isolating volatility can use Adapter/Strategy. The State pattern changes behaviour by internal state; it does not solve cache freshness. Choose a pattern based on context and record its costs.

**Simple example:** 'Tolerate a failed dependency' can become breaker, bulkhead and fallback structures.

### Slide 20: Sensitivity and trade-offs

**The point:** Changing one parameter can help one quality and hurt another.

A sensitivity point materially affects a quality response. A trade-off point affects multiple qualities in conflicting ways. Risks depend on decisions or uncertainty; a non-risk depends on assumptions continuing to hold. TTL, retries and replica counts are examples, not settings with one universally correct value.

**Simple example:** Longer cache TTL reduces database work but can keep outdated data visible longer.

### Slide 21: Caching worked mapping

**The point:** Separate the latency promise from the memory promise.

The example specifies p99 response time with a warm cache and a 1 GB working-set cap. Cache-aside, TTL and invalidation form the design; the ADR accepts stale values and a new dependency. Use separate performance and memory evidence. The numbers are this example's targets.

**Simple example:** A response-time test passing says nothing about whether cache memory exceeds the cap.

### Slide 22: Cache-aside diagram

**The point:** The application checks the cache and fetches from the database on a miss.

Follow check, database fetch and populate steps. Staff edits invalidate keys; sensitive seat reads bypass the cache. The app talks to both stores, distinguishing cache-aside from a cache that fetches transparently on its behalf.

**Simple example:** A cached event description is acceptable while final seat ownership is checked against authoritative state.

### Slide 23: Gateway-failure exercise

**The point:** Keeping the platform up differs from completing every payment immediately.

The prompts ask what accepted work must preserve, how it reaches a final state and how a failed dependency is isolated. Queueing is useful only with durable state and a recovery plan. The exercise follows all seven mapping steps.

**Simple example:** An accepted booking can remain payment-pending while the bank is unavailable.

### Slide 24: Gateway-failure worked answer

**The point:** Isolate slow calls and preserve work for controlled later completion.

A breaker and bulkhead protect worker resources; a queue and idempotency key support deferred processing; backoff avoids hammering the dependency. Pending state and reconciliation are real business/operations costs. Meet a completion deadline through recovery or cancellation; a queue alone cannot guarantee the bank recovers.

**Simple example:** If payment cannot settle within the promised window, a controlled cancellation resolves the booking.

### Slide 25: Gateway-resilience diagram

**The point:** Failure handling adds states, workers and reconciliation to the normal call path.

The caller-side breaker wraps outgoing calls. On failure, work becomes pending and enters the queue; a worker retries and a job reconciles durable state. Follow the database links to see that status must survive process failure. Durable publication and duplicate-safe processing still require careful implementation.

**Simple example:** A lost acknowledgement must not cause the same pending payment to charge twice.

### Slide 26: Payment-data exercise

**The point:** Make 'protected' into explicit data and access requirements.

The exercise asks what must never be stored, who may access retained data and how evidence catches regressions. Avoiding unnecessary sensitive data can reduce exposure more directly than encrypting everything indiscriminately. The legal reference supplies context, not a complete compliance specification.

**Simple example:** Specify that full card numbers must not appear in database rows or logs.

### Slide 27: Payment-data worked answer

**The point:** Keep card data with a specialised provider and minimise what your platform holds.

Tokenisation replaces the card number with a provider reference. Authentication, authorisation, audit and encryption address retained data. The design trades easier provider switching for reduced card-data exposure. The slide's broad retention/compliance wording is not a universal legal rule; actual retention depends on the applicable purpose and requirements.

**Simple example:** Store a provider token to request a refund rather than copying the customer's full card number.

### Slide 28: Tokenisation diagram

**The point:** Trace the sensitive-data path and the trust boundary.

The browser sends card data directly to the provider vault; the platform receives a token. The absence of a card-number arrow into the platform is the key point. Separate key/audit management reduces concentrated access, but needs explicit permissions; merely drawing it outside the app does not prove compliance.

**Simple example:** Logs should record the payment reference without logging the card-entry payload.

### Slide 29: Provider-change exercise

**The point:** Maintainability can be measured by change scope.

'Quickly' is ambiguous. Count affected modules/dependencies and define an implementation context as well as time. The prompts lead toward isolating variable provider details behind a stable boundary.

**Simple example:** Add a provider without changing the booking domain or importing its SDK there.

### Slide 30: Provider-change worked answer

**The point:** Depend on a payment contract and confine provider differences to adapters.

A PaymentProvider interface defines the domain-facing operations. Each adapter handles one provider; a strategy can select which implementation to use. Extra abstraction has a cost when providers differ in refunds or authentication. Static dependency checks make the intended boundary enforceable.

**Simple example:** A new provider's SDK is imported only inside its adapter package.

### Slide 31: Adapter dependency diagram

**The point:** The domain points at the interface, not at a provider SDK.

Follow the allowed dependency from Booking domain to PaymentProvider. Provider adapters implement that interface and use their SDKs. The crossed-out arrow identifies the architectural violation. This diagram explains package dependencies, not runtime server placement.

**Simple example:** A checkout rule should not call Stripe-specific types directly.

### Slide 32: Conway's law

**The point:** Team communication and ownership tend to shape software boundaries.

The parallel rows map teams to services. The inverse manoeuvre means designing team structure to support desired boundaries. Cognitive load is the amount a team must understand and operate. These are organisational influences, not a claim that every team requires its own service.

**Simple example:** A team owning a coherent capability can release it with less cross-team coordination.

### Slide 33: Real constraints

**The point:** A technically elegant design still needs money, time and operating skill.

Cost, reversibility, team knowledge, compliance and legacy systems constrain choices. A tool nobody can diagnose during an incident is an operational risk. Security/privacy requirements need more than one encryption checkbox.

**Simple example:** Prefer a maintainable queue setup the team can recover over a complex stack it cannot support.

### Slide 34: Strangler migration

**The point:** Replace a legacy system gradually behind a routing boundary.

First introduce a façade, then redirect one capability at a time, then retire the old system when no traffic needs it. Data migration and reporting parity are often the difficult parts. Keep each step measurable and reversible where feasible.

**Simple example:** Move search first while the legacy order workflow keeps serving users.

### Slide 35: Fitness functions

**The point:** Automated checks help an architecture remain true as code changes.

A fitness function tests an architectural property, such as dependency direction, contract compatibility or a latency budget. The examples turn decisions into repeatable CI evidence. A document alone cannot stop a later developer accidentally crossing a boundary.

**Simple example:** Fail the build when web code imports a forbidden persistence package.

### Slide 36: Availability case study

**The point:** Contain one downstream failure instead of letting it cascade.

The Netflix example connects availability to caller-side breakers, bulkheads and degraded fallback. A missing recommendation component need not stop playback. Controlled failure experiments test the design. Library and company details are historical slide examples, not current product recommendations.

**Simple example:** Show a basic home page if a personalised recommendation service is temporarily unavailable.

### Slide 37: Modifiability case study

**The point:** A monolith can have enforceable internal boundaries.

The Shopify example uses packages/public APIs and static checks to reduce unwanted cross-domain dependencies. It keeps one deployment while paying for boundary enforcement and cleanup. Privacy checks here mean package encapsulation, not automatically personal-data protection.

**Simple example:** An orders package accesses inventory through its public interface rather than internal classes.

### Slide 38: AI architecture considerations

**The point:** AI output needs bounded behaviour and human-owned rationale.

Model outputs can vary and be wrong, so use validation, timeouts, fallbacks and measurable quality scenarios. AI may draft an implementation or diagram, but requirements and trade-offs still need accountable review. The page is about engineering uncertainty, not assuming every AI call is useful.

**Simple example:** Validate generated structured output before it can alter a booking.

### Slide 39: Practical-design takeaway

**The point:** Connect measurable needs to recorded, communicated and tested decisions.

Styles organise components; tactics shape behaviour under constraints; practical design joins them and keeps them enforceable. Include organisational reality and incremental evolution. The chain is useful because it explains why each structure exists.

**Simple example:** State the failure target, show the queue/breaker design, record its cost and run the failure test.

### Slide 40: Questions

**The point:** This is the closing discussion slide.

No new design pattern appears here. Use it to practise walking a requirement through all seven mapping steps and explaining a consequence honestly.

**Simple example:** Explain what test would reveal that a new provider broke the architectural boundary.

## L23 - Architecture in Practice

Source: [L23 - Architecture in Practice.pdf](../../L23%20-%20Architecture%20in%20Practice.pdf)

### Slide 1: Company opening

**The point:** This slide introduces the organisation behind the case studies.

The tagline concerns building technology that customers own. It sets presentation context, rather than defining an architecture pattern. The subsequent pages explain concrete engineering choices and their reasons.

**Simple example:** A slogan does not establish that a system is reliable; its design and evidence do.

### Slide 2: Architecture in practice

**The point:** The lecture connects architectural choices to real operating needs.

This title introduces 'Built to last'. It is about how quality priorities influence component boundaries, communication and deployment, not just how to draw a polished diagram. The printed date identifies the original talk.

**Simple example:** A plate-lookup system and a financial portal can require different designs.

### Slide 3: Presenter introductions

**The point:** Several engineering and operational perspectives inform the talk.

Names and roles identify the speakers. These are introductory details rather than domain classes or technical concepts. The operational role also signals that architecture includes running the system, not only writing it.

**Simple example:** Recovery and deployment concerns matter alongside implementation concerns.

### Slide 4: Agenda

**The point:** Follow considerations, case studies and communication tools.

The structure first identifies quality concerns, then illustrates performance/scalability and maintainability/availability/resilience, then discusses modelling techniques. Each case should be read as requirements leading to choices.

**Simple example:** Ask which requirement each component in a case-study diagram supports.

### Slide 5: Design considerations

**The point:** Determine quality priorities before choosing products.

Security, maintainability, scale, reliability, extensibility and team structure affect the design. The advice is to identify NFRs early, describe responsibilities first and avoid unnecessary complexity. Teams must be able to implement and operate the resulting boundaries.

**Simple example:** A small team may not benefit from splitting a simple portal into dozens of services.

### Slide 6: Two case studies

**The point:** Different success factors drive different architectural decisions.

Road security stresses quick responses and growing volume. Financial services stress maintainability, availability and resilience. These are emphasis choices, not a claim that the first case can ignore security or the second can ignore performance.

**Simple example:** Optimise the plate-query path without blocking it on unrelated notifications.

### Slide 7: Road-security problem

**The point:** Query several sources quickly and support later sightings notifications.

The system looks up plates and returns vehicle/driver warnings. It must support diverse clients, sub-second targets and asynchronous results. Event-driven processing allows independent queries and reactions, provided timeouts, correlation and data access are handled correctly.

**Simple example:** A plate observation starts lookups and can separately notify an authorised subscriber.

### Slide 8: Road-security overview diagram

**The point:** Trace a request through communication, parallel queries and response assembly.

Clients connect to communication services. The message bus connects request processing, licence queries, response processing and notifications. The slide numbers point to later explanations of each area. Do not read every arrow as a synchronous blocking call.

**Simple example:** One client request can produce several query messages before the combined result returns.

### Slide 9: Client design

**The point:** A shared communication protocol lets different client technologies participate.

WebSockets provide a persistent two-way connection suitable for pushing later results. Clients can choose their own stack if they follow the agreed protocol. A WebSocket does not itself guarantee sub-second performance or permission enforcement.

**Simple example:** A mobile client receives another source's result without repeatedly polling the server.

### Slide 10: Communication services

**The point:** Many live connections require both security and shared connection state.

Authentication identifies callers; authorisation limits their access. Redis is used for state shared by communication-service instances. Persistent connections complicate scaling because later responses must reach the right client even when several server instances cooperate.

**Simple example:** A response processed elsewhere needs the connection mapping to reach the original mobile user.

### Slide 11: Request processing

**The point:** Split independent work and keep a way to match the results.

The service determines which sources to query and whether responses should be combined. It fans out messages and attaches a unique correlation identifier. Correlation links related work; it is different from idempotency, which prevents repeating effects.

**Simple example:** Three query replies carry one request ID so the aggregator knows they belong together.

### Slide 12: Licence queries

**The point:** Parallelise independent slow operations and make new sources pluggable.

External lookups heavily affect latency. Running them concurrently can reduce waiting compared with doing them sequentially. Separate source-query services make extension easier. A slow source still needs a timeout or partial-result policy.

**Simple example:** Two 400 ms sources can overlap instead of forcing an 800 ms sequential wait.

### Slide 13: Response processing

**The point:** Combining asynchronous replies requires temporary shared state.

Reply messages carry enough information for separate or combined delivery. Redis accumulates partial results across instances so processing can scale. The design needs expiry and missing-response rules so incomplete requests do not remain forever.

**Simple example:** Store two received replies while waiting for the third, then finish or return a defined partial result.

### Slide 14: Notifications

**The point:** Optional downstream work should not delay the main query response.

Subscribers can receive plate-hit notifications through independent processing. New notification channels can be added without rewriting existing query services. Parallel/asynchronous handling separates their timing, but delivery, duplicate handling and subscriber permissions still need a policy.

**Simple example:** A slow email provider should not stop the plate warning being returned to the client.

### Slide 15: Financial-services problem

**The point:** Give a large multi-business organisation a coherent, secure portal.

Several subsidiaries and systems share a user experience while retaining domain-specific rules. The chosen emphasis is modular SOA with resilience and availability. It must bridge existing systems without making every UI change affect everything else.

**Simple example:** One login provides access to permitted business services without exposing every subsidiary's records.

### Slide 16: Financial-services overview

**The point:** Shared entry and identity connect separately organised business capabilities.

The top modules/mobile app use an API gateway and identity service. Domain services, cache, policy engines and backend integrations sit below. The diagram shows logical responsibilities and dependencies; it is not sufficient to establish physical redundancy or every authorisation rule.

**Simple example:** The gateway routes a request while a domain-specific policy decides whether that user may act.

### Slide 17: Security and data protection

**The point:** Central identity can simplify login, but permissions still matter per resource.

Identity management controls accounts and authentication. Single sign-on lets an authenticated identity be reused across applications. This does not grant universal access; each business capability must enforce relevant roles/object scope and protect sensitive data.

**Simple example:** A signed-in customer can see their account but not another customer's balance.

### Slide 18: Maintainability

**The point:** Modular boundaries help several teams change parts of one experience.

Modularisation separates business responsibilities. Micro-frontends apply separation to independently managed UI portions. Teams need shared contracts and design rules so the user sees one coherent product. Separation can also add integration and versioning effort.

**Simple example:** One team updates a claims module without rewriting the investment module.

### Slide 19: Resilience

**The point:** Expect slow or failed integrations and bound their effect.

Caching can provide an appropriate stored result; timeouts stop unlimited waiting; retries with backoff reduce repeated pressure. Use retries only where effects are safe or idempotent, and do not present stale data as current when correctness depends on freshness.

**Simple example:** A temporary profile-service failure may use an explicitly permitted cached profile.

### Slide 20: Availability and blue/green

**The point:** Prepare a new environment before switching user traffic.

Blue/green deployment keeps an existing environment while validating another, then switches traffic. It reduces deployment interruption and can support rollback. The slide's 'cannot ever be down' is an aspiration: real systems need measurable targets, and this tactic does not remove database or provider outages.

**Simple example:** Switch traffic back if the new version fails health or acceptance checks.

### Slide 21: Modelling tools

**The point:** Choose a diagram that answers the audience's question.

UML can describe structure or behaviour; sequence diagrams show interaction order; C4 changes abstraction level; infrastructure diagrams show runtime placement. These views help expose risk and inconsistency. One diagram need not show every detail at once.

**Simple example:** Use a sequence diagram for a payment retry and a deployment view for zone failure.

### Slide 22: Contact slide

**The point:** This is the closing company/contact page.

No new architecture mechanism is introduced. Use the case studies to practise explaining a requirement, a corresponding decision and a consequence rather than memorising product names.

**Simple example:** Explain why correlation state exists in the road-security design.

## L24 - Security Testing

Source: [L24 - Security Testing.pdf](../../L24%20-%20Security%20Testing.pdf)

### Slide 1: Security talk introduction

**The point:** This is the security provider's opening slide.

The image introduces Integrity360 and its branding. It contains no substantive testing procedure. The PDF is mostly company context and a live-demo introduction, so it cannot supply a detailed recording of the security exercise.

**Simple example:** Treat the brand page as context rather than a security guarantee.

### Slide 2: Agenda

**The point:** The talk covers the company, services, team, demo and opportunities.

This is a route map through the presentation. It tells you that practical red/blue material is delivered as a live demonstration, rather than documented step-by-step here.

**Simple example:** The agenda does not reveal which vulnerability was used during the demonstration.

### Slide 3: Provider overview

**The point:** Security work includes monitoring and resilience, not only attack testing.

The company describes specialist staff, security operations centres and locations. A SOC is a team/function monitoring and responding to security events. The figures are the original presentation's company claims, not independently verified current statistics.

**Simple example:** A SOC can investigate alerts while a testing team assesses weaknesses.

### Slide 4: Partner ecosystem

**The point:** Security services use many specialised tools and partners.

The logo grid illustrates an ecosystem covering different capabilities. It is not a sequence of attack stages or a ranked list of recommended products. Recognising the purpose of tool categories matters more than memorising every logo.

**Simple example:** Endpoint monitoring and vulnerability management can supply different kinds of evidence.

### Slide 5: Security-service lifecycle

**The point:** Identify, prevent, detect, respond and recover are complementary activities.

The central diagram lists services such as risk assessment, penetration testing, incident response and managed protection. A penetration test probes weaknesses; monitoring watches ongoing events; response/recovery limit damage after an incident. Using one service does not replace the rest.

**Simple example:** A test finds a vulnerable endpoint; defenders improve detection and verify the repaired access control.

### Slide 6: Team and professional development

**The point:** Security needs maintained skills and organisational support.

The slide combines team-size claims with research, challenges, certifications and employee opportunities. It is largely company/recruitment context, not a technical test plan. Learning supports capability but does not by itself prove a system is secure.

**Simple example:** A controlled training exercise can improve investigation skills.

### Slide 7: Red-team/blue-team demo

**The point:** Attack simulation and defence should produce shared learning.

The page introduces presenters for a live exercise but contains no attack transcript, findings or screenshots. As background: red teams simulate authorised adversary behaviour, while blue teams detect, investigate and respond; collaborative learning is often called purple teaming. These definitions explain the labels, not what this undocumented demo actually did.

**Simple example:** An agreed simulation can test whether a known suspicious action triggers an actionable alert.

### Slide 8: Internship announcement

**The point:** This page advertises an opportunity, not a testing concept.

Dates, duration and contacts are details from the original presentation. They are preserved as source context rather than verified current application information. No security mechanism needs to be inferred from the advert.

**Simple example:** This slide does not add another stage to penetration testing.

### Slide 9: Candidate qualities

**The point:** The recruitment message emphasises curiosity and training.

The page describes interest in security, learning and related study as desirable. It also mentions professional and soft-skills training. These are candidate attributes, not requirements for claiming that an application passed a security assessment.

**Simple example:** Clear communication helps a tester explain a weakness to a developer.

### Slide 10: Thank you

**The point:** The PDF closes without documenting the live demonstration.

There is no additional security content on this page. The limits of the source matter: detailed attack lifecycle or test findings would require separate notes or a recording, which are not present in this PDF.

**Simple example:** Review the visible service roles without inventing the demonstration's result.

## L25 - Service Contracts

Source: [L25 - Service Contracts.pdf](../../L25%20-%20Service%20Contracts.pdf)

### Slide 1: API service contracts

**The point:** Agree how components communicate before trying to connect them.

This title introduces a machine-readable interface agreement. A contract describes the inputs, outputs and behaviour consumers can rely on. It lets frontend and backend work against the same expectations.

**Simple example:** Both teams agree that creating a loan returns a loan ID and pending status.

### Slide 2: Integration nightmare

**The point:** Separate teams can build incompatible assumptions without an agreed interface.

The example describes connecting frontend/backend just before a demo and discovering mismatched data or behaviour. Upfront agreement reduces late surprises and arguments. Integration still needs testing, because implementation and environment errors remain possible.

**Simple example:** The frontend expects userId while the backend returns id.

### Slide 3: Contract definition

**The point:** A contract states the rules of communication in a checkable form.

It covers permitted inputs, expected outputs and observable behaviour between components. Machine-readable means tools can parse it for documentation, validation, generation or tests. Merely documenting a schema does not enforce every business or security rule.

**Simple example:** A contract specifies which error appears when a booking cannot be accepted.

### Slide 4: Blueprint and agreement

**The point:** Both provider and consumer must implement the same expectations.

The two columns connect URLs/methods/payloads with a shared commitment. The slide's near-guarantee language is simplified: a consistent contract helps integration but cannot eliminate logic, deployment, permission or runtime failures. Verify the real boundary as well.

**Simple example:** Matching JSON types will not prove that the returned records belong to the authorised user.

### Slide 5: Why contracts help teams

**The point:** They enable parallel work, shared understanding and compatibility checks.

Frontend developers can build against examples/mocks while the backend implements the provider. One versioned agreement reduces divergent interpretations. Contract tests catch shape/behaviour changes within their scope, not every possible system defect.

**Simple example:** A consumer check fails when a required response field disappears.

### Slide 6: OpenAPI versus Swagger

**The point:** Distinguish the specification from the tools using it.

This divider introduces a terminology comparison. OpenAPI defines the document format; Swagger names a family of associated tools. The next page expands that distinction.

**Simple example:** An OpenAPI YAML file can be displayed using Swagger UI.

### Slide 7: Blueprint versus tools

**The point:** OpenAPI describes the API; Swagger tools edit, render or generate from that description.

JSON/YAML are file formats for the specification. Documentation viewers and generators are tools consuming it. The USB analogy separates a common standard from implementations using that standard. You do not 'write Swagger' as a separate communication protocol.

**Simple example:** A documentation tool shows the paths and request fields in your OpenAPI file.

### Slide 8: OpenAPI document parts

**The point:** Operations describe calls; schemas describe data structures.

Paths identify resources and HTTP methods. Parameters/security requirements explain how to call them. Reusable schemas describe fields and types. Declaring these structures supports validation but does not automatically guarantee data integrity unless enforcement and relevant business rules exist.

**Simple example:** A User schema can require an integer id, but ownership still needs a permission check.

### Slide 9: YAML example

**The point:** Read the file from metadata to an endpoint and its response schema.

openapi names the specification version; info names the API/version; servers lists base URLs; paths defines /users GET. A 200 response here contains JSON that is an array of strings. YAML indentation expresses nesting. This example does not show a production-ready security design.

**Simple example:** A sample response fitting this schema is ["Alice", "Bob"], not a single user object.

### Slide 10: Mock servers

**The point:** A simulated provider lets a consumer develop before the real provider exists.

A mock can return predefined responses based on the agreed contract. The process picture suggests iteration around requirements and feedback. Mocks are useful for controlled cases but cannot prove real persistence, authentication or integration works.

**Simple example:** Build loading, success and error screens against mock responses, then test the real API too.

### Slide 11: Contract-first versus code-first

**The point:** Decide whether the interface leads implementation or is derived from it.

Contract-first agrees the API first so teams can work in parallel. Code-first begins with implementation and generates/documents its interface later. The table gives common tendencies, not absolute rules: code-first need not force waiting if teams coordinate appropriately.

**Simple example:** A multi-team project may agree the request schema before either side's code exists.

### Slide 12: Integration workflow

**The point:** Design, mock, implement and then verify the real connection.

Follow the four numbered steps in order. Frontend and backend can proceed in parallel after agreement. The claim of seamless connection assumes conformance; real integration checks are still needed for behaviour, permissions, transport and configuration.

**Simple example:** Replace the mock base URL with the real service and run the agreed acceptance cases.

### Slide 13: Breaking changes

**The point:** A renamed field can break consumers even if the new response looks reasonable.

v1 returns name while v2 returns fullName. A consumer expecting the old field must migrate. Versioning preserves an old contract while a new one is introduced; it does not magically update clients or remove the need for communication/deprecation.

**Simple example:** Keep v1 working until consumers have adopted the v2 field.

### Slide 14: Contract-maintenance habits

**The point:** Treat the API agreement as shared production code.

Agree the design, store it in version control, describe error responses and coordinate changes. Contract-first is the lecture's team recommendation; the larger lesson is maintained agreement and verification. Error schemas should support useful UI handling.

**Simple example:** A 409 conflict has a documented body the frontend can turn into an understandable message.

## L27 - Microservices

Source: [L27 - Microservices.pdf](../../L27%20-%20Microservices.pdf)

### Slide 1: Microservices introduction

**The point:** Microservices divide an application into independently managed capabilities.

This is the talk's title/presenter page. The lecture uses a shopping story and a progressive diagram exercise to explain both the potential benefits and the extra work of distribution.

**Simple example:** Separate ordering and payment only when that boundary brings a useful form of independence.

### Slide 2: Agenda

**The point:** Understand the benefit and cost before choosing microservices.

The sequence starts with an analogy, moves to motivations and a conversion exercise, then asks why not to use the style. The agenda mentions Brand Watch, but this exported deck does not document a separate detailed Brand Watch case.

**Simple example:** A service diagram should answer a need, not just follow a fashionable pattern.

### Slide 3: Alice and Bob's shared pond

**The point:** The story begins by separating two people with different preferences.

The illustration says they cannot share a pond. This is narrative setup for centralised versus distributed shopping, not a literal software design rule. Later slides connect their choices to architecture.

**Simple example:** Different needs can motivate separation, but separation introduces new coordination costs.

### Slide 4: They move

**The point:** Alice gets convenience; Bob gets independence with fewer nearby facilities.

Alice lives near one large store, while Bob's countryside setting lacks a shopping centre. The contrast sets up one location doing everything versus several specialist locations. The pool/lake details are storytelling context.

**Simple example:** One integrated system can be convenient; several independent providers may require extra travel or calls.

### Slide 5: Alice's shopping setup

**The point:** One shop supplies Alice's shopping needs.

The diagram shows a home connected to one store. Its simplicity represents a centralised interaction path. At this stage the slide presents the topology before discussing its convenience or failure.

**Simple example:** A client can talk to one application entry point.

### Slide 6: Alice's convenient journey

**The point:** Centralisation reduces the number of separate interactions.

The arrows between home and store show one convenient round trip. One place manages the different purchases. This prepares the monolith analogy, without implying that every monolith has identical internal structure.

**Simple example:** A single application can handle catalogue, order and payment within one deployment.

### Slide 7: Alice's checkout failure

**The point:** A failure in the shared path can block the whole activity.

The red store/arrow marks a broken checkout. Alice's goods may all depend on that central point. This is an illustration of a single failure dependency, not proof that every monolith must be unavailable when one feature fails.

**Simple example:** A shared checkout process can prevent buying any item if it cannot complete payment.

### Slide 8: Bob's shopping setup

**The point:** Several specialised shops replace one large shared location.

The diagram shows separate food providers. Bob can use each independently, but must manage more interactions. This is the distributed side of the analogy.

**Simple example:** A client uses separately owned capabilities for products, orders and payments.

### Slide 9: Bob's extra travel

**The point:** Independence adds communication and coordination overhead.

The many arrows depict multiple journeys, and the tired remark illustrates their cost. In software those journeys become network requests, deployments and operational tasks rather than physical travel.

**Simple example:** Fetching a page through five service calls can be slower than one in-process operation.

### Slide 10: One of Bob's shops fails

**The point:** A local failure need not make every independent provider fail.

The red middle shop represents one broken payment/checkout path while other shops remain reachable. Resilience depends on those paths really being independent; if every purchase needs the failed one, the advantage disappears.

**Simple example:** A recommendation-service outage need not prevent searching products.

### Slide 11: Bob still has dinner

**The point:** Partial success is possible when failure is contained.

The working outer-shop arrows show that Bob can still obtain some food despite the middle failure. In software, define which core tasks should remain possible and what degraded behaviour users see.

**Simple example:** Show a product page without personalised suggestions when suggestions fail.

### Slide 12: Reveal of the analogy

**The point:** Connect the shopping story to architectural boundaries.

The meme asks what the story has to do with microservices. This is a transition to the explanation, not another technical mechanism. The upcoming comparison maps the one-shop and many-shop structures to application styles.

**Simple example:** Ask which dependency can take all shopping down and which adds extra coordination.

### Slide 13: Alice versus Bob comparison

**The point:** Compare one central journey with several independent journeys.

The diagrams sit side by side so convenience, extra trips and partial failure can be contrasted. The architectures are still expressed through the shopping metaphor. Avoid treating the number of arrows as a measured performance result.

**Simple example:** A simpler interaction path may be easier to operate but more concentrated.

### Slide 14: Monolith versus microservices

**The point:** The shopping topology now becomes a software topology.

The left labels one application server as Monolith. The right labels several service servers as Microservices, with one failure highlighted. The point is the independence trade-off; real monoliths can use redundancy, and real services can still depend on one another.

**Simple example:** Separate capability failures only help when the user's core path can tolerate them.

### Slide 15: Quiz: benefits and costs

**The point:** Identify a pro and con for both arrangements.

Before the answers appear, relate Alice to central management and a shared failure path, and Bob to independent functioning plus extra interaction overhead. This is a reasoning prompt rather than a definition list to memorise blindly.

**Simple example:** Explain why fewer trips and better partial failure are different advantages.

### Slide 16: Quiz: centralised answer

**The point:** Alice's convenience comes with a concentrated dependency.

The slide reveals centralised management and a single point of failure. Bob's entries remain blank for discussion. In a real system, redundancy can reduce a monolith's runtime single point of failure; the story intentionally simplifies the trade-off.

**Simple example:** Several replicas of one application are still possible even when it has one deployable codebase.

### Slide 17: Quiz: distributed answer

**The point:** Bob gets failure containment but pays more overhead.

The completed answers pair resilience with extra work. The lesson is that distribution trades simplicity for potential independent operation. It does not eliminate failures; it changes how they spread and how they must be managed.

**Simple example:** Multiple services need their own deployment, telemetry and incident handling.

### Slide 18: Definition of microservices

**The point:** Services communicate through network interfaces and need modular responsibilities.

Splitting a system creates processes with explicit APIs. Good boundaries align with business capabilities rather than arbitrary files. The trivia date is secondary context, not a prerequisite for understanding the style or independently verified history.

**Simple example:** An order service owns order rules and exposes an agreed interface.

### Slide 19: Why use microservices?

**The point:** The main potential gains are selective scale, maintainability and independent releases.

This motivation slide lists desired outcomes, not automatic properties. Each benefit requires boundaries that can actually scale or change separately and a team able to support the resulting system.

**Simple example:** A transcoding service can scale separately from simple catalogue browsing.

### Slide 20: Selective scaling

**The point:** Add capacity where the bottleneck is instead of replicating everything.

A monolith is typically scaled as a whole deployment. A service boundary can isolate a busy workload so only that capability gains instances. Shared databases or downstream limits can still be bottlenecks, so first measure the actual constraint.

**Simple example:** Add order-processing workers for a sale without multiplying an unrelated reporting service.

### Slide 21: Maintainability through boundaries

**The point:** Controlled interfaces let each service evolve without leaking its internals.

Services should tolerate failed peers and can use different languages where justified. The benefit comes from hiding implementation details, not from language diversity itself. More languages can also increase operating and staffing complexity.

**Simple example:** A consumer uses a payment contract instead of depending on the provider's internal classes.

### Slide 22: Why not modules alone?

**The point:** Network boundaries make some shortcuts harder, but local modules can also be enforced.

The slide argues that developers bypass internal boundaries. Its 'perfect programmer' phrase is rhetorical: a modular monolith can enforce dependency rules through APIs, review and static checks. Microservices do not prevent every shortcut, especially shared-table access.

**Simple example:** A CI rule can forbid one package from importing another package's internal code.

### Slide 23: Independent deployment

**The point:** Release one capability without requiring every other capability to redeploy.

The examples include authentication, recommendations and products. This needs compatible contracts and separately owned state. Zero-downtime releases additionally require suitable traffic switching, readiness and data migration; services alone do not guarantee them.

**Simple example:** Update recommendation logic while the order-service version stays the same.

### Slide 24: Exercise: initial monolith

**The point:** Start with four capabilities in one application and one database.

The user points to a large application containing Customers, Products, Orders and Payment. One database sits below it. This is the baseline to change, not yet proof that the application is poorly designed.

**Simple example:** First identify boundaries before deciding which need independent deployment.

### Slide 25: Exercise: split processes

**The point:** Separating code into services leaves the shared database dependency.

Four service boxes now receive user requests separately but all point to one database. This can create clearer interfaces, yet data coupling remains. Process separation by itself is not full microservice independence.

**Simple example:** An Orders deployment can still break when Payment changes a shared table.

### Slide 26: Exercise: apparent maintainability

**The point:** Some separation is gained, but the design still needs scrutiny.

The green 'Maintainability achieved' annotation highlights the intended improvement from separate capabilities. The shared database remains visible. Treat the annotation as one step in the exercise, not conclusive evidence that changes are independent.

**Simple example:** Service-specific code can be smaller while cross-service schema changes still force coordination.

### Slide 27: Exercise: shared failure point

**The point:** The remaining database can still stop every separated service.

The new warning identifies the single shared database beneath all four boxes. This is why component separation and failure-domain separation are different questions. A replicated database can improve uptime without automatically removing ownership coupling.

**Simple example:** If this database is unavailable, every service's data access can fail together.

### Slide 28: Exercise: separate databases

**The point:** Give each capability its own data boundary, then inspect its interactions.

Customers, Products, Orders and Payment now have separate stores. Orders still calls other services in the picture. Private stores help ownership and selective scaling, but the full request path can remain synchronously coupled.

**Simple example:** Orders cannot freely join another service's private tables anymore.

### Slide 29: Exercise: scaling improvement

**The point:** Independent data/process boundaries create more scaling options.

The green annotation marks scalability as a benefit of the new arrangement. This does not prove capacity targets were tested or that each store is provisioned independently. Compare this frame with the preceding one and focus on the claimed benefit, not a new box.

**Simple example:** Product reads can receive extra capacity without increasing every payment instance.

### Slide 30: Exercise: something still missing

**The point:** Scaling independence is different from availability independence.

The prompt asks you to inspect the remaining arrows. Orders needs replies from other services, so a failure on that path can still affect order completion. The next slide makes the dependency explicit.

**Simple example:** A fast Orders service can still wait indefinitely for a slow product lookup.

### Slide 31: Exercise: Orders depends on peers

**The point:** Synchronous dependencies can propagate failure or force coordinated changes.

The slide explicitly identifies Orders as not independent. Its calls to customer/product-related capabilities create runtime coupling. You must decide which information needs authoritative fresh validation and which can be supplied locally or asynchronously.

**Simple example:** A product-service outage can block checkout if checkout must synchronously fetch every description.

### Slide 32: Exercise: local copies

**The point:** A service may hold a local read representation of data it needs.

The proposal removes some immediate calls by keeping relevant information near the consumer. It should be a bounded projection, not uncontrolled shared ownership. Decide freshness requirements, authoritative source and reconciliation before copying everything.

**Simple example:** Orders can store a product description snapshot while another service owns the catalogue.

### Slide 33: Exercise: notified of changes

**The point:** A local copy needs a way to learn about updates.

The next frame adds the idea of receiving change notifications. This creates eventual consistency: there can be a delay between source updates and local projection updates. Consumers need ordering/duplicate handling and a recovery path.

**Simple example:** ProductUpdated events refresh the order service's product-reference projection.

### Slide 34: Exercise: name the pattern

**The point:** Recognise the publish-and-react relationship behind update notifications.

The prompt asks which pattern distributes changes to interested consumers. Observer is the familiar in-process concept; publish/subscribe is a common distributed messaging counterpart. Their implementations and delivery semantics are not identical.

**Simple example:** A catalogue publishes a fact once and several interested projections react.

### Slide 35: Exercise: Observer/pub-sub answer

**The point:** Producers publish changes without directly coordinating each consumer.

The slide supplies Observer, also calling it pub-sub. Understand the shared idea of notification, while remembering a remote broker adds delivery, retention, retries and security concerns absent from a simple callback list.

**Simple example:** A new reporting consumer subscribes without adding another direct call in the publisher.

### Slide 36: Exercise: add an event queue

**The point:** Introduce infrastructure between publishers and subscribers.

This frame places an Event Queue above the services before drawing the complete message path. The queue/broker can store and distribute work, but durable configuration and acknowledgement behaviour determine what survives failure.

**Simple example:** A consumer can resume later if events are retained while it is offline.

### Slide 37: Exercise: connect Customers to events

**The point:** A producer can publish changes through the queue.

This incremental frame draws the customer-side message path first. Compare it with the empty-queue frame: the key addition is a communication route rather than another database. Use the same event identity through retries to handle repeats safely.

**Simple example:** CustomerChanged can be published when the owning service commits a change.

### Slide 38: Exercise: connect Products to events

**The point:** Another producer joins the same messaging backbone.

The next frame adds a product-related route. Consumers can react to both customer and product facts without making every interaction a direct synchronous call. Topic/routing and schema agreements determine who receives which events.

**Simple example:** Orders subscribes to relevant catalogue changes rather than every unrelated event.

### Slide 39: Exercise: independent deployability

**The point:** Queue-mediated communication can reduce direct availability coupling.

The final annotation highlights independent deployment as the intended outcome. This still needs compatible event schemas, durable publication and duplicate-safe consumers. An offline consumer can catch up only if retention and processing capacity support it.

**Simple example:** Orders can restart while retained product updates wait to be consumed.

### Slide 40: Operational reaction

**The point:** More services mean more things to deploy, observe and recover.

The startled meme is a humorous transition to the cost discussion. It contains no benchmark or measured failure. Its point is that the operational team inherits the complexity introduced by architectural choices.

**Simple example:** Ten services need more deployment and incident coordination than one process.

### Slide 41: Why not microservices?

**The point:** Added setup and maintenance can outweigh independence benefits.

The slide warns about operational complexity and custom management tooling. Its '90%' and company-size trivia are broad presentation claims, not universal statistics to use as proof. Choose the style from requirements and operating capacity.

**Simple example:** A four-person team with one release cadence may prefer a modular monolith.

### Slide 42: Conclusion

**The point:** Use microservices when their benefits improve the actual system and user experience.

A monolith can evolve toward services, but distributed work introduces difficult failure and data problems. 'Here be dragons' means proceed with awareness of those costs. A successful extraction solves a demonstrated need rather than chasing labels.

**Simple example:** Extract a proven bottleneck rather than splitting every module at the start.

### Slide 43: Questions

**The point:** The talk closes with a discussion prompt.

No new service pattern is shown here. Review the story's convenience/resilience trade-off and the exercise's distinction between separate processes, separate data and genuine independence.

**Simple example:** Explain why four services sharing one writable database can remain tightly coupled.

## L28 - Deployment Diagrams

Source: [L28 - Deployment.pdf](../../L28%20-%20Deployment.pdf)

### Slide 1: Deployment diagrams

**The point:** Show where software runs and how runtime parts communicate.

This lecture's title introduces the physical/runtime view. A deployment diagram adds hosts, zones, replicas and connections that a logical component diagram may omit. It helps people reason about failures, trust and operating costs.

**Simple example:** Two app boxes may run on one host or in two zones; that difference matters.

### Slide 2: The hidden database failure

**The point:** A box labelled Database hides the details needed to spot an outage risk.

The incident lost a primary host, had no standby in another failure domain and an old usable backup. Recovery and data protection were inadequate. The diagram should have shown placement, redundancy, recoverable backup history and recovery measures.

**Simple example:** Two database processes on one failed host do not help if the entire host disappears.

### Slide 3: Purpose of the view

**The point:** Include the details needed to answer a particular reader's question.

An operator needs runtime/failure information; a security reviewer needs trust and identity; a cost reviewer needs instance counts/resources. The references provide vocabulary for views/viewpoints. A deployment diagram is selected evidence, not a picture that must contain every possible fact.

**Simple example:** For a zone-outage review, show exactly which resources share each zone.

### Slide 4: Eight review questions

**The point:** A useful deployment view covers scope, placement, isolation, links, trust, state and ownership.

Start by naming the system/environment. Show nested failure domains, runtime copies, boundary strength, connection properties, identity and state recovery. Finally record who verifies it. These questions prevent ambiguous diagrams from creating false confidence.

**Simple example:** 'Production order API, four replicas across two zones' answers more than 'API'.

### Slide 5: Naming section

**The point:** Explain the concept before the vendor label.

This divider introduces naming things without relying on product jargon. Its point is to make the same view understandable to people who know different platforms. Detailed examples follow.

**Simple example:** Use 'layer-7 load balancer' as the role, with a product name in brackets.

### Slide 6: Concept first, product second

**The point:** Names should explain a component's job.

A workload packet filter is the concept; a security group is one implementation. Readers can then assess the policy without already knowing a provider's terminology. Concrete implementation names still matter in an environment-specific deployment view.

**Simple example:** Describe the app-tier database connection before naming the particular cloud network resource.

### Slide 7: Network/compute mapping

**The point:** Different platforms supply related concepts under different names.

The table compares private networks, failure-isolated sites, filters, entry points and compute units. L4 handles transport-level connections; L7 understands application-level traffic. The mappings are approximations, not guarantees of identical isolation or behaviour across products.

**Simple example:** A Kubernetes namespace is not automatically equivalent to a separately administered cloud account.

### Slide 8: Data/identity mapping

**The point:** Identify the required capability instead of assuming every platform offers it the same way.

The rows cover relational/object stores, secrets, workload identity, queues/streams, edge caches and scheduling. Some cells say none because the platform layer does not supply that capability by itself. Products and supported features can change; learn the roles from this table.

**Simple example:** A CronJob schedules work, while a queue stores work for later consumption.

### Slide 9: Ambiguous terminology

**The point:** Words such as container and service need a stated meaning.

A C4-style container is a runnable/deployable unit; an OCI container is a runtime packaging/isolation mechanism. Node, instance and cluster also have different meanings across tools. A legend prevents readers mixing these levels.

**Simple example:** A database may be called a container in a logical view without running in Docker.

### Slide 10: Isolation section

**The point:** Ask what boundary actually separates the runtime boxes.

This divider shifts from naming to containment. Two boxes on paper are not evidence of separate operating systems or security boundaries. The next pages show different levels of isolation.

**Simple example:** Two threads drawn separately still share one process's resources and privilege.

### Slide 11: Isolation stack

**The point:** Nested boundaries provide different kinds of protection.

Read from physical host through hypervisor/VM, container runtime, process and thread. Containers commonly share the host kernel; VMs have guest operating systems mediated by a hypervisor. Consider what a compromise or failure at each parent level can affect.

**Simple example:** A host failure takes down every nested VM/container regardless of their separate application names.

### Slide 12: Strength of isolation

**The point:** A namespace or tenant check is weaker than independently controlled runtime/security boundaries.

The comparison ranks practical boundaries, while actual strength depends on configuration and threat model. Accounts separate credentials/control planes; namespaces need additional network/runtime policy; threads are not separate security domains. A physical network can still have administrative or other access paths.

**Simple example:** A compromised workload may reach peers unless network policy and identity checks restrict it.

### Slide 13: Required-content section

**The point:** Scope, placement, state and maintenance information make the view operationally useful.

This divider points back to questions 1, 2, 3, 7 and 8. It groups the information needed to understand what exists, what fails together and who keeps the picture accurate.

**Simple example:** A production diagram should not silently borrow staging's instance count.

### Slide 14: Scope and failure domains

**The point:** Label the environment and nest resources according to common failure.

Region contains zone, which contains host/runtime/process. Shared parents reveal shared failure exposure. Production and staging may differ in exactly the redundancy and capacity details being reviewed. Nested boxes communicate dependency, not just attractive grouping.

**Simple example:** Two replicas inside one host box are both lost when that host fails.

### Slide 15: Runtime copies and state

**The point:** Record versions, replica counts and how data survives failure.

Synchronous replication waits for an acknowledgement under the chosen policy and can protect committed writes during appropriate failover, at a latency cost. Asynchronous replication can lose updates not copied yet; lag is not automatically bounded. Replicas also copy bad deletes, so historical backups serve a separate purpose.

**Simple example:** RPO states acceptable data loss; observed replication lag helps assess whether it is achievable.

### Slide 16: Ownership and scope control

**The point:** Keep the diagram verifiable and omit unrelated detail.

Record owner, source and verification date/commit. Do not crowd a runtime-placement view with every setting, internal class or delivery step unless the review needs it. Separate views can represent those concerns more clearly.

**Simple example:** Link the production topology to infrastructure code and update it with a topology change.

### Slide 17: Communication section

**The point:** A connection needs more information than a plain arrow.

This divider introduces protocol, authentication, encryption, timing and failure semantics. The following examples explain what reviewers need to know about the line between boxes.

**Simple example:** A database arrow should reveal whether it is an encrypted network connection or a local socket.

### Slide 18: Unlabelled arrows hide risk

**The point:** Explain who connects, by which protocol and with which failure semantics.

The five questions cover initiator, port/protocol, encryption/authentication, blocking/queueing and retry safety. The improved example also states replica count and connection-pool size. An arrow can otherwise hide a weak boundary or resource limit.

**Simple example:** A pool of twenty database connections can constrain an API with many web workers.

### Slide 19: Connection-label anatomy

**The point:** Use consistent labels and a clear direction convention.

The suggested format includes protocol/version, port, TLS, authentication and sync/async. Direction here means who opens the connection, not that data only flows one way. Labels guide firewall rules but do not replace testing the actual network policy.

**Simple example:** 'HTTPS/2 :443, TLS, mTLS, sync' says more than 'API'.

### Slide 20: Protocol and balancing

**The point:** Long-lived multiplexed connections can change how traffic spreads.

L4 balancing chooses a destination per connection. Many HTTP/2 streams on one connection can therefore land on one replica. L7 or client-side balancing can distribute requests differently. HTTP/1.1 also supports keep-alive, so actual connection reuse matters as well as the protocol version.

**Simple example:** Three replicas do little if one client connection pins almost all work to the first.

### Slide 21: Sync versus async failure

**The point:** Waiting on a dependency couples the request to its response time.

A durable queue lets acceptance continue while processing waits, within capacity/admission limits. That adds lag, redelivery, dead-letter handling and the need for idempotency. Asynchronous does not mean a dependency can stay broken forever without backlog or business effects.

**Simple example:** Return payment-pending and process later rather than holding every web worker open.

### Slide 22: Wire protocol versus driver API

**The point:** Label what traverses the network, not just the library you call.

JDBC/ODBC are application APIs; a database-specific protocol and configured port carry the traffic. The listed ports are conventional examples, not immutable settings. Encryption and identity are additional properties to annotate.

**Simple example:** A PostgreSQL driver connection can be labelled PostgreSQL wire over TLS on its configured port.

### Slide 23: Exercise: six connections

**The point:** Assign explicit communication properties and challenge an implausible edge.

Suggested assumptions: 1 browser→web uses HTTPS/session; 2 web→API uses HTTPS with validated identity; 3 API→PostgreSQL uses its wire protocol/TLS/DB identity; 4 API→Redis uses RESP/TLS/ACL; 5 worker→broker opens a connection for asynchronous consumption. Edge 6 is drawn queue→payment provider, but most designs need a worker consuming messages then calling the provider over HTTPS. State assumptions instead of pretending this ambiguous arrow has one fixed answer.

**Simple example:** A broker does not automatically invoke a banking HTTP API; show the worker that performs that call.

### Slide 24: Trust-boundary section

**The point:** Show where identity, validation and security policy change.

This divider introduces question 6. A private-network line and an authenticated application boundary are different facts; the view should make both clear where relevant.

**Simple example:** Being behind an ingress does not remove the need for API permission checks.

### Slide 25: Trust boundary definition

**The point:** Inputs crossing different security assumptions need validation and appropriate identity checks.

A trust boundary separates policy/privilege domains. Threat modelling uses it to locate attack opportunities. Public anonymous content may be deliberately allowed, but protected operations must establish identity and authorisation rather than inherit trust from reachability.

**Simple example:** Validate a webhook's signature and payload before updating delivery status.

### Slide 26: Boundary notation

**The point:** Use one visual convention and explain it in a legend.

The examples show dashed enclosures, dividing lines and stereotyped groups. They can all work if their meaning is unambiguous. A dashed line must not simultaneously mean trust boundary and asynchronous call without a clear distinction.

**Simple example:** Label each side as public client and private service instead of drawing an unexplained red rectangle.

### Slide 27: Types of boundaries

**The point:** Trust changes through networks, processes, tenants, operators and the supply chain.

The list expands security beyond a perimeter firewall. Account/tenant permissions, container/VM isolation, downloaded artifacts and operator paths all matter. Jurisdiction labels identify a review constraint; they do not establish that a particular data transfer is permitted.

**Simple example:** Pulling an image grants trust in its provenance, while operator access adds a separate privilege path.

### Slide 28: Verified identity versus assertion

**The point:** Reachability and forwarded claims are not proof of permission.

The hop diagram contrasts validated sessions, a forwarded JWT and an unchecked internal call. Each protected recipient must verify relevant identity/claims and enforce scope. mTLS authenticates peers under certificate trust; it does not automatically authorise every user action or validate a forwarded token.

**Simple example:** A valid workload certificate does not entitle its caller to every customer's order.

### Slide 29: STRIDE exercise

**The point:** Examine six different threat categories at one boundary.

Spoofing concerns false identity; tampering altered data; repudiation missing attribution; disclosure leaked information; denial of service exhausted resources; elevation increased privilege. Apply each to the actual browser/edge path and match a control, rather than listing names alone.

**Simple example:** Verify tokens, validate requests, preserve appropriate audit evidence, limit abuse and enforce least privilege.

### Slide 30: One system, several views

**The point:** The same logical application can be deployed in different ways.

This divider introduces the UniMarket examples. Keep the software responsibilities conceptually stable while comparing placement, counts, trust and failure domains in each environment.

**Simple example:** One application design can run on a single host or across several zones.

### Slide 31: UniMarket logical baseline

**The point:** Runnable units alone do not tell you resilience or physical cost.

The diagram lists web app, order/search APIs, worker, database, cache and external payments. It omits hosts, counts and failure domains deliberately. The legend distinguishes units, stores, external dependencies and boundaries. The next views add deployment-specific information.

**Simple example:** Two API boxes in this view do not tell you whether two machines exist.

### Slide 32: One-host deployment

**The point:** Everything shares one host failure boundary.

The browser reaches nginx over HTTPS; nginx forwards to a JVM application; PostgreSQL uses a local socket on the same host. Versions and resource details make placement explicit. Separate processes do not remove the shared host/power/kernel exposure.

**Simple example:** Losing this machine removes both the API and its database.

### Slide 33: Three tiers and a DMZ

**The point:** Network separation and extra app instances still leave a single database risk.

Public traffic enters reverse proxies in a DMZ, then an application tier, then a private data tier. The two app servers need balancing/session rules. The single PostgreSQL host and nightly dump remain a recovery bottleneck despite tier separation.

**Simple example:** A database-host failure can stop both app servers at once.

### Slide 34: Two cloud zones

**The point:** Place critical replicas in different failure domains and state their replication policy.

Each zone contains API/worker instances; PostgreSQL has a synchronous standby and Redis an asynchronous replica. The shared region remains a parent failure domain. Synchronous committed-write protection depends on acknowledgement/failover policy; cache replication can lag. Backup and restore evidence are still necessary.

**Simple example:** One zone loss can leave another serving requests, but a regional loss affects both.

### Slide 35: Equivalent on-premises placement

**The point:** Failure isolation is a concept that also applies outside the cloud.

The diagram maps zones to halls with separate power/switches and uses on-premises implementations for edge caching and balancing. The pattern is similar because the failure-domain structure is similar. Verify other common dependencies such as the building/network.

**Simple example:** Two racks sharing one power supply are not equivalent to independently powered halls.

### Slide 36: Asynchronous deployment example

**The point:** The outbox ties accepted database work to later event publication.

Order state and an outbox record are committed together; a relay publishes to the replicated stream; settlement consumers process it. At-least-once delivery requires duplicate-safe handling. After five attempts, failed work goes to a DLQ with no automatic consumer. That demands an owner and recovery procedure.

**Simple example:** A crash after publishing but before marking the outbox sent can cause redelivery rather than lost work.

### Slide 37: Devices and inbound webhooks

**The point:** Clients and external callbacks cross boundaries in both directions.

Mobile versions coexist, so compatibility matters. A gateway validates identity and limits traffic. The payment provider also initiates signed webhooks to a receiver. Webhooks need sender verification, replay/duplicate protection and payload validation, not only HTTPS.

**Simple example:** An old app still receives a compatible response while a signed payment event updates status once.

### Slide 38: Two regions and jurisdiction

**The point:** Availability, replication and data-residency constraints must agree.

Global DNS routes to active/standby regions and asynchronous replication has a stated 400 ms observed lag. That lag is not automatically a guaranteed RPO, and DNS expiry contributes to recovery time. The diagram labels EU-only data and ZA-only data while drawing cross-region replication: clarify what dataset crosses before treating these labels as consistent.

**Simple example:** Review replicated fields and failover behaviour instead of assuming a dashed legal boundary prevents transfer.

### Slide 39: Keeping the diagram true

**The point:** An outdated diagram can mislead the next incident response.

This divider returns to ownership and verification. The following page explains how to maintain the model alongside actual system changes. Accuracy is a continuing responsibility rather than a property of one exported picture.

**Simple example:** A new database standby should appear in the reviewed deployment source.

### Slide 40: Prevent diagram rot

**The point:** Version diagrams and derive related views from one model.

Diagrams-as-code stores editable text with the project and can render it in CI. A shared model reduces contradictory names/counts between views. Generated output still needs reconciliation with deployed reality; automation does not prevent an inaccurate source model.

**Simple example:** Change a replica count in the model and regenerate the relevant production views.

## L30 - Software Quality Assurance

Source: [L30 - Software Quality Assurance.pdf](../../L30%20-%20Software%20Quality%20Assurance.pdf)

### Slide 1: Software quality assurance

**The point:** Quality needs a maintained process, not only a final test.

The title introduces SQA: activities that help a team consistently produce suitable software. The lecture covers quality definitions, reviews, defects, reliability, metrics, testing and coding standards.

**Simple example:** Define review and verification practices before the product is ready for acceptance.

### Slide 2: What quality means

**The point:** Matching a specification is important, but a weak specification is not enough.

Requirements can be missing or ambiguous, and qualities can conflict. A product may implement the written features yet still be unsafe, frustrating or hard to maintain. Clarify expectations and measurable conditions rather than treating compliance with vague text as complete quality.

**Simple example:** An app can 'save orders' as specified while failing whenever demand spikes.

### Slide 3: Quality attributes

**The point:** Quality includes several different kinds of good behaviour.

Safety concerns harm; security protects assets; reliability concerns failure-free operation; resilience handles disruption; robustness handles adverse inputs. Other terms cover understanding, testing, change, reuse, portability, usability and efficiency. Choose the attributes relevant to the system and define measures.

**Simple example:** A payment app needs accurate protected transactions, not merely a neat interface.

### Slide 4: Explicit and implicit expectations

**The point:** Requirements, development standards and professional expectations all inform quality.

Explicit requirements state functions/targets. Standards guide how work is performed. Implicit expectations may include protecting credentials or giving understandable errors even if nobody wrote them down. Make important implicit needs explicit so they can be reviewed and tested.

**Simple example:** A login feature should not store plaintext passwords just because the feature list omitted storage details.

### Slide 5: Organisational SQA

**The point:** Establish shared practices, adapt them to the project and check that they are followed.

The three-prong approach moves from organisation policy to project rules to actual control. Referenced standards can guide assurance plans and audits. A certification/process review is different from proof that every feature or runtime outcome is correct.

**Simple example:** Tailor review depth to project risk while preserving mandatory security checks.

### Slide 6: SQA activities

**The point:** Reviews, tests, standards, change control and measurement reinforce one another.

The columns show assurance across specifications, design, code, maintenance and reporting. Tests inspect outcomes; reviews examine artifacts; change control keeps modifications deliberate; records make problems and actions traceable. SQA coordinates these activities rather than replacing them with one scan.

**Simple example:** Record a recurring integration defect, improve the contract review and check whether recurrence falls.

### Slide 7: Benefits of assurance

**The point:** Finding and preventing defects earlier can reduce later effort.

Fewer latent defects means fewer problems waiting to be activated. Better reliability can improve satisfaction and reduce maintenance/lifecycle cost. These are intended outcomes of effective practices, not guarantees from producing a QA document.

**Simple example:** A design review catches missing recovery before users experience a payment outage.

### Slide 8: Costs of assurance

**The point:** Assurance requires resources and changes to how people work.

Small teams may struggle to fund dedicated roles or heavy procedures. Cultural change and explicit spending can be obstacles. Scale practices to risk and team capacity while retaining meaningful evidence; excessive ceremony is not the goal.

**Simple example:** A small team can use lightweight peer review and enforced checks instead of a large audit department.

### Slide 9: Reviews across the lifecycle

**The point:** Check each major artifact before its mistakes spread into later work.

Follow requirements/specification review, design review, code review, testing/test review and maintenance/customer feedback. The diagram shows several places to find defects early. Iterative teams can repeat these checks in small cycles rather than use a strict one-pass sequence.

**Simple example:** Clarify a contradictory approval requirement before implementing both interpretations.

### Slide 10: Development-lifecycle picture

**The point:** Software work runs from analysis through maintenance with different responsibilities.

The image's six phases are analysis, design, development, testing, deployment and maintenance. Roles under each phase show shared participation, not exclusive ownership. Real delivery can iterate between phases; quality feedback should continue after deployment.

**Simple example:** A maintenance incident can trigger renewed analysis and design rather than just a patch.

### Slide 11: Fault versus failure

**The point:** A defect in an artifact is not the same as an observed incorrect result.

A fault is a static weakness in code/design/specification. A failure occurs at runtime when conditions expose it. A fault can exist without appearing in the tested inputs. This distinction explains why 'we have not seen it fail' is weak evidence of absence.

**Simple example:** A division-by-zero bug remains hidden until an input reaches zero.

### Slide 12: Where defects come from

**The point:** Errors can enter at requirements, communication, design, code, tests and documentation.

The abbreviations group many causes, including inconsistent interfaces and data representation. Do not assume every defect is a typing mistake. Prevention should address the actual source and its propagation.

**Simple example:** A timestamp misunderstanding between teams can cause wrong scheduling despite syntactically correct code.

### Slide 13: Reliability

**The point:** Define failure-free operation over a time window and a realistic usage profile.

The formal definition is measurable under stated conditions. The informal user's perception depends on which services they use and how serious failures are. An operational profile describes representative operations and frequencies. Subjective satisfaction is not identical to formal reliability.

**Simple example:** A rare payroll failure may matter far more than a frequent cosmetic animation glitch.

### Slide 14: Failure and repair measures

**The point:** Distinguish how often failures occur from how quickly service returns.

The lecture defines MTBF = MTTF + MTTR for its repeated up/down-cycle model. Availability uses MTTF divided by MTTF + MTTR, times 100%. Use consistent units and the stated convention: other sources use MTBF terminology differently. Faster repair can improve availability without reducing failure frequency.

**Simple example:** With 99 hours up and one hour repair, modelled availability is 99%.

### Slide 15: Reliability calculation inputs

**The point:** Separate running intervals from repair intervals before averaging.

The example supplies up-times of 180, 220 and 200 hours and repairs of 3, 5 and 4 hours. These are the listed observed cycles, not every hour in the six-month calendar. The next slide calculates their means.

**Simple example:** Add 600 hours of operation separately from 12 hours of repair.

### Slide 16: Reliability worked calculation

**The point:** Average the three up-times and the three repair-times independently.

MTTF = 600/3 = 200 hours; MTTR = 12/3 = 4 hours; the slide's MTBF = 204 hours. Applying the preceding availability formula gives 200/204 × 100 ≈ 98.04%. Do not swap repair time into the numerator.

**Simple example:** Reducing MTTR to two hours would improve availability to about 99.01% under the same model.

### Slide 17: Metric categories

**The point:** Measurements can support process control or indicate likely product qualities.

Control metrics track effort, time or resources for management. Predictor metrics use measurable internal properties to estimate harder-to-observe outcomes. Cyclomatic complexity counts independent control-flow paths and may flag testing/maintenance effort, but does not prove poor quality alone.

**Simple example:** A complex function merits investigation, not an automatic conclusion that it is wrong.

### Slide 18: Internal versus external metrics diagram

**The point:** A measurable code property may relate to several experienced qualities.

The left lists maintainability, reliability, portability and usability; the right lists parameters, complexity, code length, errors and manual length. The arrows indicate possible predictive relationships. They are not mathematical guarantees or substitutes for observing real users and maintenance work.

**Simple example:** Fewer lines can still be harder to maintain if they are highly obscure.

### Slide 19: Maintainable design

**The point:** Keep responsibilities related and unnecessary dependencies low.

Cohesion asks whether one component's work belongs together. Coupling asks how much it depends on other components. Understandability and adaptability concern comprehension and change. These qualities should be assessed with actual change scenarios, not only counts.

**Simple example:** A focused pricing component is easier to change than one mixing billing, rendering and logging rules.

### Slide 20: Structural fan-in and fan-out

**The point:** Count callers and dependencies to identify change impact and coordination.

Fan-in counts incoming callers; fan-out counts components called. High fan-out can make a component harder to reason about. High fan-in means many consumers may be affected by change, but can also show useful stable reuse; it is not automatically a design defect.

**Simple example:** Changing a widely used date utility needs compatibility care even if the utility is simple.

### Slide 21: Informational complexity

**The point:** Data movement and shared state add complexity beyond call counts.

This metric includes parameters/shared structures as well as fan-in/out. The formula multiplies component length by the square of fan-in × fan-out, so dependency growth can increase the score sharply. The cited validation is historical context; use it as a predictor, not a universal effort calculator.

**Simple example:** With length 100 and fan-in 2/fan-out 3, the illustrative score is 100 × 36 = 3,600.

### Slide 22: Historical design-metric standard

**The point:** Subsystem and database structure can be counted for quality analysis.

The slide names IEEE 982.1-1988 and considers subsystem coupling plus attributes/classes. It introduces a measurement approach, not a demand that modern projects use this exact historical standard. Counts need context and cannot by themselves establish maintainability.

**Simple example:** A database with many attributes may be justified by the domain rather than automatically be bad.

### Slide 23: Quality-control activities

**The point:** Different checks inspect different aspects of the product.

The grid introduces unit, integration, regression, non-functional, data-generation, acceptance, configuration and adapter testing. Quality control checks artifacts/outcomes; broader QA establishes the practices making those checks consistent. Later slides define each category.

**Simple example:** One passing unit suite cannot replace compatibility and user-acceptance checks.

### Slide 24: Unit testing

**The point:** Test a focused unit's contract under controlled surrounding conditions.

The lecture allows several granularities but emphasises isolating lower providers. Assert expected postconditions as well as the absence of unexpected exceptions. Mocks make behaviour controllable; they must not be confused with proof that the real dependency works.

**Simple example:** A calculation test checks the exact total, not merely that no error was thrown.

### Slide 25: Integration testing

**The point:** Verify that the real components at a chosen boundary cooperate.

Exercise interactions and data flow with the relevant providers included. The slide says 'do not use mocking' to stress keeping the boundary under test real. Unrelated external dependencies may be controlled, but report that scope explicitly.

**Simple example:** Test a repository against a real temporary database to reveal schema/transaction problems.

### Slide 26: Regression testing

**The point:** Recheck previously working behaviour after a change.

Regression can reuse unit, integration and non-functional checks. Performance, security or recovery can regress even if feature outputs remain correct. Select/rerun checks according to risk and required gates, not just because their names include regression.

**Simple example:** A cache update may pass functional tests while doubling latency.

### Slide 27: Non-functional testing

**The point:** Test quality under stated conditions as well as feature correctness.

Performance asks about time/resources; scaling asks how capacity changes with demand; reliability asks about failures/recovery; security checks access and data protection. Define measurable workload and outcomes for each concern. A large load is not automatically a useful test without acceptance criteria.

**Simple example:** Simulate a failed process at peak demand and measure restoration and lost/duplicate work.

### Slide 28: Generate meaningful test inputs

**The point:** Partitions, boundaries and paths help find cases systematically.

Equivalence partitioning groups inputs expected to behave alike. Boundary analysis targets transitions where mistakes cluster. White-box path analysis follows internal control flow; complete path coverage can be infeasible with loops. Use these methods to complement representative user cases.

**Simple example:** For a permitted quantity of 1–10, test 0, 1, 10 and 11 around the boundaries.

### Slide 29: Acceptance testing

**The point:** Users decide whether required tasks and expectations are satisfied.

Ask whether the system meets user requirements and is acceptable in its intended use. Feedback may reveal mismatched workflows even when technical tests pass. Acceptance is evidence about agreed needs, not a guarantee of every quality under every condition.

**Simple example:** A dispatcher checks whether the workflow supports a real failed-delivery case.

### Slide 30: Configuration testing

**The point:** Different supported configurations need verification.

Browsers, operating systems, feature settings or deployment options can change behaviour. The slide asks you to test what you actually promise to support instead of assuming one successful environment covers all. State the tested matrix and limits.

**Simple example:** Check the enabled and disabled payment-provider configurations separately.

### Slide 31: Adapter testing

**The point:** Verify translations at external-system and user-facing boundaries.

System adapters marshal/serialise messages and satisfy external protocols. The lecture also uses 'human adapters' for GUI/usability interaction. Test both successful and error translation, and include quality requirements where relevant.

**Simple example:** A JSON-to-XML adapter preserves the amount, currency and provider error meaning.

### Slide 32: Why coding standards

**The point:** Consistency reduces unnecessary reading and review effort.

Readability, lower debt, onboarding and fewer mistakes are the intended benefits. The numerical claims on this slide are presentation figures without supporting detail here; they are not guaranteed outcomes. Standards need practical rules and enforcement, not just a persuasive introduction.

**Simple example:** Consistent exception handling lets reviewers recognise failure paths quickly.

### Slide 33: Names and responsibility

**The point:** Make intent obvious and keep responsibilities focused.

Domain-meaningful names explain what data/actions mean. Single responsibility means a component has a coherent reason to change, not that every function must contain exactly one statement. The under-20-lines suggestion is a heuristic. The code contrasts obscure names with intent-revealing ones and separates order operations.

**Simple example:** validateOrder is clearer than process, and validation should not silently send marketing email.

### Slide 34: Conventions and defensive handling

**The point:** Agree syntax/style while making error behaviour explicit.

Casing and layout improve consistency. Input/null checks and appropriate exception handling protect contracts. A fail-safe result must fit the domain: returning a fake success or a magic value can hide a real failure. Language/framework conventions should guide the chosen rules.

**Simple example:** A missing amount should produce a defined validation error, not a successful zero payment.

### Slide 35: Useful comments

**The point:** Record intent and non-obvious assumptions instead of narrating obvious syntax.

The slide favours explaining why a business or architectural choice exists. Keep API documentation aligned with the code. 'Exclusively why' is simplified advice: contracts and complex behaviour may also need clear what/how documentation for readers.

**Simple example:** Explain why an old provider format is retained for compatibility.

### Slide 36: Repeated comment lesson and efficiency claim

**The point:** Automated consistency can free review attention, but the percentage is not a guarantee.

This page repeats the comment guidance and adds a 70% debugging-effort claim. No study or measurement conditions are supplied here, so treat the number as a slide claim rather than a proven universal result. The practical point is reducing trivial formatting debates while preserving useful documentation.

**Simple example:** Let a formatter handle spacing so reviewers can inspect a wrong refund rule.

### Slide 37: Automated standards and human review

**The point:** Machines enforce repeatable rules; people judge intent and design.

Linters/analyzers flag rule violations; pre-commit hooks offer local feedback; CI can enforce them centrally. Peer review then focuses on logic, boundaries and trade-offs. Hooks alone can be bypassed, and a clean lint result does not prove correctness.

**Simple example:** Enforce formatting in CI and review whether exception handling matches the business outcome.

### Slide 38: Language tools

**The point:** Style guides, formatters and analyzers perform different jobs.

The table pairs language conventions with formatting and analysis examples. A formatter arranges code; a linter/analyzer flags specified patterns. Tool capabilities overlap and evolve, so treat this as the lecture's example map rather than a current exhaustive product comparison.

**Simple example:** Prettier can format code while ESLint checks chosen JavaScript rules.

### Slide 39: Human-readable code

**The point:** Other people must be able to understand and safely change the program.

The quotation reinforces readability as an engineering concern. A computer accepting the syntax says nothing about whether intent, invariants and failure paths are clear to maintainers. The wording is an illustration rather than a testable standard by itself.

**Simple example:** An explicit price calculation is often safer to review than an obscure compressed expression.

### Slide 40: Standards feedback checklist

**The point:** A standards policy must translate into actual code and evidence.

Explain purpose, tools, complexity, exceptions, examples, version-control conventions, testing/security and compliance. The lecturer notes spot-checking implementation. 'We use a linter' is incomplete unless the rules, enforcement and practical behaviour are visible.

**Simple example:** Show a good/bad exception example and the CI rule preventing the bad pattern.

### Slide 41: Clean Code reference

**The point:** This page points to further reading about maintainable code.

The book cover is a resource suggestion, not a new algorithm or compulsory line-count rule. Read such guidance critically alongside language conventions, requirements and measured maintainability.

**Simple example:** Use examples to discuss naming or responsibility rather than blindly applying every maxim.

### Slide 42: Quality word-cloud recap

**The point:** Software quality spans the whole lifecycle and several disciplines.

The final image groups testing, services, applications, performance, security and lifecycle terms. It is a visual recap, not a dependency diagram: larger words are emphasis, not a computed ranking. Return to the defined concepts for precise meanings.

**Simple example:** Connect one quality requirement to its review, test and maintained coding rule.

