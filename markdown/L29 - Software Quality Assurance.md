





































### **SOFTWARE QUALITY** SOFTWARE QUALITY **ASSURANCE** ASSURANCE 



<!-- Start of picture text -->
Qa ay, =]<br>er)<br><!-- End of picture text -->

COS301 AVINASH SINGH DEPARTMENT OF COMPUTER SCIENCE UNIVERSITY OF PRETORIA 































##### **WHAT IS SOFTWARE QUALITY?** 

































Simplistically, quality is an attribute of software that implies the software meets its specification 

This definition is too simple for ensuring quality in software systems 

Software specifications are often incomplete or ambiguous Some quality attributes are difficult to specify Tension exists between some quality attributes, e.g. efficiency vs. reliability 















































##### **SOFTWARE QUALITY ATTRIBUTES** 

- Safety 

   - Modularity 

- Security 

   - Complexity 

- Reliability 

   - Portability 

- Resilience 

   - Usability 

   - Reusability 

- Robustness 

   - Efficiency 

- Understandability 

- Testability 

   - Learnability 

- Adaptability 























##### **SOFTWARE QUALITY** 











- Conformance to explicitly stated functional and performance requirements, explicitly documented development standards, and implicit characteristics that are expected of all professionally developed software. 







- Software requirements are the foundation from which quality is measured. 





   - Lack of conformance to requirements is lack of quality. 

- Specified standards define a set of development criteria that guide the manner in which software is engineered. 

   - If the criteria are not met, lack of quality will almost surely result. 

















- There is a set of implicit requirements that often goes unmentioned. 

   - If software conforms to its explicit requirements but fails to meet its implicit requirements, software quality is suspect. 

















##### **SOFTWARE QUALITY ASSURANCE** 











• - To ensure quality in a software product, an organization must have a three prong approach to quality management: 







- **Organization-wide** policies, procedures and standards must be established. 

- **-** - 

- **Project specific** policies, procedures and standards must be tailored from the organization wide templates. 





   - **Quality must be controlled;** that is, the organization must ensure that the appropriate procedures are followed for each project. 

- Standards exist to help an organization draft an appropriate software quality assurance plan. 



- ISO 9000-3 



- ANSI/IEEE standards 





- - 

- External entities can be contracted to verify that an organization is standard compliant. 

































##### **SQA ACTIVITIES** 









###### Applying technical methods 



- •To help the analyst achieve a high quality specification and a high quality design 



















###### Conducting formal technical reviews 

- •A stylized meeting conducted by technical staff with the sole purpose of uncovering quality problems 

###### Testing Software 

- •A series of test case design methods that help ensure effective error detection 

###### Enforcing standards 

- •Coding Standards 

- •Code Reviews 

###### Controlling change 

- •Applied during software development and maintenance 

###### Measurement 

- •Track software quality and asses the ability of methodological and procedural changes to improve software quality 

###### Record keeping and reporting 

- •Provide procedures for the collection and dissemination of SQA information 















































Software will have fewer latent defects, resulting in reduced effort and time spent during testing and maintenance 

# **ADVANTAGES OF SQA** ADVANTAGES OF SQA 

Higher reliability will result in greater customer satisfaction 

Maintenance costs can be reduced 

Overall life cycle cost of software is reduced 























**DISADVANTAGES OF SQA** It is difficult to institute in small organizations, where available resources to perform necessary activities are not available <mark>——</mark> It represents cultural change - and change is never easy <mark>ie</mark> It requires the expenditure of money that would not otherwise be explicitly budgeted to software engineering or QA <mark>——</mark> 



















































































##### **QUALITY REVIEWS** 

Requirements Analysis **Specification Review** 

**Design** Design **Review Code** Code **Review Test Review** Testing 

**Customer Feedback** Maintenance 





















<!-- Start of picture text -->
WE<br><!-- End of picture text -->





#### **SOFTWARE DEVELOPMENT LIFECYCLE** 6 Phases of the Software Development Life Cycle 







<!-- Start of picture text -->
Jl<br><!-- End of picture text -->

























































##### **SOFTWARE FAULTS AND FAILURES** 

A failure corresponds to erroneous/unexpected runtime behavior observed by a user. 

A fault is a static software characteristic that can cause a failure to occur. 

























The presence of a fault doesn’t necessarily imply the occurrence of a failure. 



























Incomplete or erroneous specifications (IES). 



Inconsistent component interface (ICI). 



##### **CAUSES OF SOFTWARE DEFECTS** 

Misinterpretation of customer communication (MCC). 

Violation of programming standards (VPS). 

Intentional deviation from specifications (IDS). 

Incomplete or erroneous testing (IET). 

Inaccurate or incomplete documentation (IID). 

Error in design logic (EDL). 

Error in data representation (EDR). 

Error in programming language translation of design (PLT). 























Ambiguous or inconsistent human/computer interface (HCI). 

























##### **SOFTWARE RELIABILITY** 















Probability of failure-free operation for a specified time in a specified environment. 

This could mean very different things for different systems and different users. 



















Informally, reliability is a measure of the users’ perception of how well the software provides the services they need. 

Not an objective measure Must be based on an operational profile Must consider that there are widely varying consequences for different errors 

























##### **SOFTWARE RELIABILITY** 









• _- - -_ A simple measure of reliability is _mean time between failure_ (MTBF): MTBF = MTTF + MTTR 





- _- - -_ 

- MTTF is _mean time to failure_ 

- _- - -_ 

- MTTR is _mean time to repair_ 





- _Software availability_ is the probability that a program is operating according to requirements at a given point in time and is defined as 





𝑀𝑇𝑇𝐹 𝐴𝑣𝑎𝑖𝑙𝑎𝑏𝑖𝑙𝑖𝑡𝑦 = ∗ 100% 𝑀𝑇𝑇𝐹 + 𝑀𝑇𝑇𝑅 



















**SOFTWARE RELIABILITY Scenario: Server Uptime and Maintenance in a Data Center** Scenario: Server UptimeandMaintenance in aData Center 













###### **Scenario: Server Uptime and Maintenance in a Data Center** 

In a corporate data center, a team manages a set of servers that run critical applications for In a corporate data center, a team managesa set of servers that run critical applications for the company. One particular server is monitored over time to assess its reliability. the company. One particular server is monitored over time to assess its reliability. - Over a 6 Over a 6-month month period, the server experienced period, the server experienced three **three breakdowns** breakdowns. . Here’s what was Here’s what was observed: observed: 





- * **1st failure** lst failure: : The server ran for The server ran for **180 hours** 180 hours, , then failed. It was repaired and operational then failed. It was repaired and operational again after **3 hours** . again after 3 hours. 



<!-- Start of picture text -->
6)<br><!-- End of picture text -->



- * **2nd failure** 2nd failure: : It then ran for another It then ran for another 220 **220 hours** hours before before failing again, taking failing again, taking **5 hours** 5 hours to fix. to fix. • * **3rd failure** 3rd failure: : Later, it ran Later, it ran 200 **200 hours** hours and needed and needed 4 **4 hours** hours of repair. of repair. 























<!-- Start of picture text -->
1<br><!-- End of picture text -->













##### **SOFTWARE RELIABILITY** 











###### • : **Mean Time To Failure (MTTF)** 







180+220+200 600 = = MTTF = 200 Hours 3 3 

###### • : **Mean Time To Repair (MTTR)** 





3+5+4 12 = = MTTR = 4 Hours 3 3 





• : **Mean Time Between Failures (MTBF)** = MTBF 𝑀𝑇𝑇𝐹 + 𝑀𝑇𝑇𝑅 = 204 Hours 





























##### **SOFTWARE METRICS** 











- A software metric is any type of measurement that relates to a software system, process or related artifact. 







- Two types: 























- - 

- Control metrics used to plan, manage and control the development process (e.g., effort expended, elapsed time, disk usage, etc.) 

- - 

- Predictor metrics used to predict an associated product quality (e.g., cyclomatic complexity can predict ease of maintenance) 

   - external attribute: something we can only discover after the software has been put into use (e.g.,ease of maintenance) 

   - internal attribute: something we can measure directly from the software itself (e.g., cyclomatic complexity) 





























<!-- Start of picture text -->
|<br><!-- End of picture text -->

































**SOFTWARE METRICS** SOFTWARE METRICS 









##### **DESIGN QUALITY METRICS** 











- For design components maintainability is related to: – - cohesion how closely related is the functionality of the component? 

- – - coupling how independent is the component? 

   - - 

   - understandability how easy is it to understand what the component does? 

   - – - adaptability how easy is it to change the component? 











































##### **DESIGN QUALITY METRICS** 











**a)** **<u>Structural fan in/fan out</u>** - – fan in number of calls to a component by other components - – fan out number of components called by a component 

**high fan in => high coupling** 



**high fan out => calling component has high complexity** 









































##### **DESIGN QUALITY METRICS** 











###### **b)** **<u>Informational fan in/fan out</u>** 







– consider also the number of parameters passed plus access to shared data structures - - - 2 complexity = component length x (fan in x fan out) 





**It has been validated using the Unix system** 

**It is a useful predictor of effort required for implementation** 







































## **DESIGN QUALITY METRICS** <u>DESIGN</u> **-** QUALITY METRICS **c)** c) **<u>IEEE Standard 982.1</u>** ~~IEEE Standard 982.1-1988~~ **<u>1988</u>** 







• * looks at: looks at: **subsystem properties** subsystem properties (number of subsystems and degree of coupling) (number of subsystems and degree of coupling) **database properties** database properties (number of attributes and classes) (number of attributes and classes) 













































##### **QUALITY CONTROL** 









**NonIntegration Regression Unit Testing functional Testing Testing Testing Test Data Acceptance Configuration Adapter Generation Testing Testing Testing** —T <mark>{1}</mark> 















































- Test functionality of unit. 

##### **UNIT TESTING** 







   - Test unit assuming environment behaves according to contracts. 

   - Test units across levels of granularity. 

- Unit is a: 

   - class or function/service, 



- component or service contract. 



- Test against: 



- service provided (no exception or error thrown) 

- - 

- all post conditions hold true after service provided. 





- - 

- may have to formulate intermediate activities as observations of these as post conditions. 



- **Mock-out any lower-level service providers or components.** 



























##### **INTEGRATION TESTING** 











- Test component in its environment. 

   - Do **not** use mocking. 

   - Test across levels of granularity. 

   - Test that various units can work together and achieve the correct results 



- Interactions 



- - 

- Data flow 





































<!-- Start of picture text -->
\<br><!-- End of picture text -->

**REGRESSION TESTING** REGRESSION TESTING - backwards compatibility and non-breaking breaking changes. changes 















- - 

- * This is used to determine backwards compatibility and non This is used to determine backwards compatibility and non-breaking breaking changes. changes • - ¢ After a change is made to the system, re After a change is made to the system, re-run run all tests before to ensure that they run successfully. all tests before to ensure that they run successfully • * Unit Tests Unit Tests 

   - Integration Tests 

   - • - Non functional Tests (why?) 

   - ** Non-functionalIntegration TestsTests (why?) 



<!-- Start of picture text -->
rLeil | ry/,il<br><!-- End of picture text -->









<!-- Start of picture text -->
|<br><!-- End of picture text -->

































































##### **NON FUNCTIONAL TESTING** 

**Performance – How long does it take to perform a task?** | 

**Scalability – How many concurrent Reliability – impact on – How users? How many single point of failure, requests can be impact on single processes? Load process failure testing?** | | **Security – Access control? Information Many more … securely stored and transmitted?** 















)<sup>f</sup> **TEST DATA GENERATION** Equivalence partitions Partition input/environment/output space into partitions for which behaviour is equivalent. (black box) Boundary value analysis Find extreme/boundary points in (black box) input/environment space. ~~<mark>=</mark>~~ Path analysis Analyze logic to determine all paths. (white box) ~~<mark>a</mark>~~ 

















##### **ACCEPTANCE TESTING** 



































Is a user happy to Does the system meet Feeback loop accept system? the user requirements? 































##### **CONFIGURATION TESTING** 



























SOMETIMES SYSTEM RELEASED IN DIFFERENT CONFIGURATIONS 

EACH CONFIGURATION NEEDS TO BE TESTED. 

















##### **ADAPTER TESTING** 











- Test that adapter to external party functions correctly 







- System adapters 

   - Protocol marshalling / serialization (JSON Parser vs XML Parser) 





   - Quality Requirements 

- Human adapters 

   - User testing (GUI) / Usability 



























- **CODING STANDARDS** CODING STANDARDS 

- • **Readability First:** Code is read up to 10x more often than it is written. Standards ensure fast mental parsing. 







- **Technical Debt Mitigation:** Unstructured code contributes to over $2.4 Trillion in global software maintenance costs. 



- **Accelerated Onboarding:** Consistent style guides allow new developers to start contributing within days instead of weeks. 





- **Bug Reduction:** Clear naming and predictable structure directly prevent logical and edge-case errors. 













































**CLEAN CODE PRINCIPLES** CLEAN CODE PRINCIPLES **1. Expressive Naming 2. Single Responsibility** Use domain-meaningful, pronounceable names. Variable and Functions and classes should do one thing, do it well, and do it function names should clearly reveal intent without needing only. Keep functions short (preferably under 20 lines of code). explanatory comments. 

Functions and classes should do one thing, do it well, and do it only. Keep functions short (preferably under 20 lines of code). 





<!-- Start of picture text -->
|<br><!-- End of picture text -->









































##### **CLEAN CODE PRINCIPLES** 









**Naming Conventions** Establish strict casing (camelCase, PascalCase, | snake_case) across variables, methods, and files for instant type recognition. 















###### **Formatting & Layout** 

Standardize indentation spaces, maximum line length (80–120 chars), bracket placement, and structural grouping. 

###### **Defensive Handling** 

Enforce explicit exception handling, input validation, null checking, and fail-safe default return values. 















<!-- Start of picture text -->
\<br><!-- End of picture text -->











(*, graphics.<sup>py —piradio</sup> 

##### **DOCUMENTATION AND COMMENTS** 









###### **Explain "Why", Not "What"** 





Good code is self-documenting for 'what' it does. Use comments exclusively to explain business rationale, architectural trade-offs, or non-obvious algorithms. 

Avoid comment clutter that duplicates obvious code statements. Keep API docstrings up-to-date alongside code edits. 





























<!-- Start of picture text -->
\<br><!-- End of picture text -->

**DOCUMENTATION AND COMMENTS** (*, graphics.<sup>py —piradio</sup> 









<!-- Start of picture text -->
graphics.py *<br>idth, slot.bitnap.<br>rows width =<br>pixels<br>src_width,|<br>src_pixels<br>srcpixel<br>dstpixel<br>pi<br>e (<br>dstrect<br>cliprect<br>buffer[y * bitmap.pitch + byte_index] xoffs =°sr|<br>yoffs = sr|<br>dstrowwidt<br>index: * srcpixel<br><!-- End of picture text -->





**Explain "Why", Not "What"** 





Good code is self-documenting for 'what' it does. Use comments exclusively to explain business rationale, architectural trade-offs, or non-obvious algorithms. 

Avoid comment clutter that duplicates obvious code statements. Keep API docstrings up-to-date alongside code edits. 





70% 

###### **Measurable Team Efficiency** 



Teams adhering to strict, automated coding standards report up to 70% less time spent hunting trivial syntactic bugs and formatting discrepancies during code reviews. 





**Reduction in Debugging Effort** 







Standardization eliminates unnecessary cognitive load, allowing software engineers to focus on architectural problem-solving. 





























##### **AUTOMATING STANDARD CHECKS** 











<!-- Start of picture text -->
20206<br>(por (TWsale Code ralysis a Unttng a's!<br>lS a 4 Securit |<br>o (-= ALYSIS ey > awe<br>STATI vove<br>CODE \ le SS<br>—~ne(GD : . # \ )BUNTINGSe<br>= —j~— »<br>—_—<br><!-- End of picture text -->



<!-- Start of picture text -->
Build Pipeline ————————<br>a = re<br>fs Version Control Compile Compile Auto Unit<br>(Combining Branch) Testing<br>———————_——. Continuous Integration —__—____<br>Package with<br>—_—— Release Pipeline—————__—+Peete Instructions<br>Public/General Testing<br>Availabilty<br>————__—_—_—_ Continuous Delivery ———————_<br><!-- End of picture text -->



<!-- Start of picture text -->
omen<br>12 ws] O8 aid foe .<br>10 me yt wer .<br>Some ome ~<br>—<br>eo eco<br><!-- End of picture text -->









###### **2. CI/CD Gateways** 

###### **3. Peer Code Reviews** 

###### **1. Static Linters** 







Tools like ESLint, Pylint, and SonarQube highlight syntax and style errors in real time within IDEs. 











Git pre-commit hooks and CI pipelines automatically reject code that violates project style guides. 



Human reviews focus on high-level architecture and logic once automated tools pass. 























##### **POPULAR LANGUAGE STYLE GUIDES** 



















|**Language**|**Standard Style Guide**|**Formatter Tool**|**Linter / Analyzer**|
|---|---|---|---|
|**Python**|PEP 8 Guidelines|Black / Ruff|Flake8 / Pylint|
|**JavaScript / TS**|Airbnb / Google JS Guide|Prettier|ESLint|
|**Java**|Google Java Style|spotless|Checkstyle|
|**C++**|C++ Core Guidelines|clang-format|clang-tidy|





































" 





















##### **WIS DOM** 

Any fool can write code that a computer can understand. Good programmers write code that humans can understand. 

- **Martin Fowler (Author & Refactoring Pioneer)** 























##### **CODING STANDARDS FEEDBACK** 











- – 

- Purpose Explain the purpose of the coding standards, and what the goals are…. 







- – 

- Tooling Mention the tools used, and what it is used for, what purpose it serves. 

- – 

- Code complexity How loops should be done, what factors are considered, some standards defined by the team, that translate to code. Yes we spot check code to see your teams commitment to the coding standards policy. 

- – 

- Exception handing catching all without some predefined exceptions is bad practice. 



- – 

- Provide code samples good vs bad. 



- VCS and commit conventions. 

- Each framework/lang has some standards as well, syntax, best practices. 



- Testing standards, Security hygiene, code comments, and boundaries. 





- Compliance! 









































**CLEAN CODE** CLEAN CODE 

































<!-- Start of picture text -->
\ ManagedSecurity Quality a site<br>Analysis :,AsiomationS@FVICES |<br>Methodologies Tools<br>partormancea @Sting<br>‘ompliance,<br>— News FAP Pica tion” '<:outsourcing<br>‘Offsnore AFECU cle ranisscout™<br>Software Neishore<br>Waterfall p...; fn<br><!-- End of picture text -->

