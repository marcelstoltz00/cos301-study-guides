###### **Lecture 28** 

# **DEPLOYMENT DIAGRAMS** 



<!-- Start of picture text -->
(2 _— gl oF<br>a on ail yy pera oa Faculty of Engineering,<br>— : ie Built Environment and<br>es - - Information Technology<br>\ ’ q = . —— ep ae Inligtingtegnologie/ Lefapha la BoetSenere,<br>nll . = : ~<br>-7 ;~—— Make today matter *<br>‘= we. Fo 5 ac =<br><!-- End of picture text -->

#### **It’s been down for 4 hrs. This is what was in the manual** 

###### **INCIDENT REPORT  #2481** 

Duration:  4 h 12 min 

Impact:  all checkout traffic failed Cause:  the primary database host was lost. There was no standby in another failure domain, and the last usable backup was 19 hours old. _Review finding:  "the deployment topology was never documented at a level that would have exposed this."_ 



<!-- Start of picture text -->
The diagram they had<br>Database<br><!-- End of picture text -->

**What would have had to be on that diagram for someone to catch this in a review?** <mark>PF ss</mark> 



<!-- Start of picture text -->
Built Environment and<br>Fea feat fSeed. 5<br>ww Information Technology<br>ONIVEIT Ot eRLTOEIA FakulInlig t eitingtegnologieIngenieurswese,/ Lefapha Bou-omgewingla BoetSenere, en<br>YUNIBESITHI YA PRETORIA Tikologo ya Kago le Theknolotsi ya Tshedimoso<br>Make today matter<br><!-- End of picture text -->

## **What a deployment diagram is for** 

**Where does the code actually run, and how do the pieces talk to each other?** 

**Treat it as a view, chosen to answer a question.** 

You choose what goes on it based on the question a reader brings to it. Kruchten's 4+1 model calls this the physical view. ISO/IEC/IEEE 42010:2022 gives the formal vocabulary for this: viewpoint, view, model kind. 

Different reader, different diagram. An SRE at 03:00, a security reviewer, someone estimating next year's cloud spend and a new joiner all want different things from it. 



<!-- Start of picture text -->
Fea Z ,<br>Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>YUNIBESITHIrtsYA PRETORIAtH TikologoFakulteitinligtingtegnologie ya Ingenieurswese,Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimoso en<br>Make today matter<br><!-- End of picture text -->

#### **Eight questions a deployment diagram must answer** 

**1** What system is this, and which environment? 

**2** What are the failure domains, and how are they nested? 

**3** What runs in each place, and how many copies? 

**4** 

What isolates them, and how strong is that isolation? 

**5** How does every pair of boxes talk? 

**6** 

Where does trust change, and where is identity established? 

**7** 

Where does state live, and what happens when a domain dies? 

**8** 

Who owns this diagram, and when was it last true? 



<!-- Start of picture text -->
Fea Z ,<br>Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>swiversiverrUNIVERSITY OFvawPRETORIApRevoRIA FakulteitInligtingtegnologieIngenieurswese,/ LefaphaBou-omgewingla BoetSenere,en<br>YUNIBESITHI YA PRETORIA Tikologo ya Kago le Theknolotsi ya Tshedimoso<br>Make today matter<br><!-- End of picture text -->

# **NAMING THINGS WITHOUT NAMING VENDORS** 

Question 1. 



<!-- Start of picture text -->
Fea Z ,<br>Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>YUNIBESITHIrtsYA PRETORIAtH TikologoFakulteitinligtingtegnologie ya Ingenieurswese,Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimoso en<br>Make today matter<br><!-- End of picture text -->

## **The rule:** 

###### **Name the concept. Put the product in brackets.** 

Instead of: 

"the security group allows 5432 from the EKS nodes" 

Write: 

"workload packet filter (AWS: security group) allows PostgreSQL :5432 from the app tier" 

###### **Why this matters:** 

- A diagram full of product names cannot be reviewed by anyone who has not used that product. 

- The concept survives a cloud migration. 



<!-- Start of picture text -->
Fea Z ,<br>Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>YUNIBESITHIrtsYA PRETORIAtH TikologoFakulteitinligtingtegnologie ya Ingenieurswese,Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimoso en<br>Make today matter<br><!-- End of picture text -->

#### **Concept to product: network and compute** 

|**Concept**|**AWS**|**Azure**|**GCP**|**Kubernetes**|**On-prem**|
|---|---|---|---|---|---|
|**Isolated private network**|VPC|VNet|VPC|cluster network (CNI)|VLAN / subnet|
|**Failure-isolated site**|Availability Zone|Availability Zone|Zone|topology zone label|data hall|
|**Packet filter at workload**|security group|NSG|firewall rule by tag|NetworkPolicy|host firewall|
|**Subnet-level filter**|network ACL|NSG on subnet|firewall rule|(none)|router ACL|
|**L7 entry point**|ALB|App Gateway|HTTPS LB|Ingress / Gateway API|nginx, F5|
|**L4 entry point**|NLB|Load Balancer|TCP/UDP LB|Service LoadBalancer|LVS, F5|
|**Unit of running service**|EC2 / ECS / Lambda|VM / Container App|GCE / Cloud Run|Pod|process on a host|
|**Blast-radius container**|account / OU|subscription|project / folder|namespace (weak)|separate estate|





<!-- Start of picture text -->
Fea ‘ ,<br>Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>swovensirerrUNIVERSITY OFvawPRETORIApreroava FakulteitInligtingtegnologieIngenieurswese,/ LefaphaBou-omgewingla BoetSenere,en<br>YUNIBESITHI YA PRETORIA Tikologo ya Kago le Theknolotsi ya Tshedimoso<br>Make today matter<br><!-- End of picture text -->

#### **Concept to product: data, identity, edge** 

|**Concept**|**AWS**|**Azure**|**GCP**|**Kubernetes**|**On-prem**|
|---|---|---|---|---|---|
|**Managed relational store**|RDS / Aurora|Azure SQL|Cloud SQL|operator + StatefulSet|DB on a server|
|**Object store**|S3|Blob Storage|Cloud Storage|(none)|MinIO / Ceph|
|**Secret store**|Secrets Manager|Key Vault|Secret Manager|Secret + CSI driver|Vault|
|**Workload identity**|IAM role (IRSA)|Managed Identity|service account|ServiceAccount|machine cert|
|**Queue**|SQS|Service Bus|Pub/Sub|(none)|RabbitMQ|
|**Log-structured stream**|Kinesis / MSK|Event Hubs|Pub/Sub Lite|(none)|Kafka|
|**Edge cache**|CloudFront|Front Door|Cloud CDN|(none)|Varnish|
|**Scheduled work**|EventBridge|Logic Apps|Cloud Scheduler|CronJob|cron|



**not every concept exists at every layer.** 



<!-- Start of picture text -->
Fea ‘ ,<br>Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>swovensirerrUNIVERSITY OFvawPRETORIApreroava FakulteitInligtingtegnologieIngenieurswese,/ LefaphaBou-omgewingla BoetSenere,en<br>YUNIBESITHI YA PRETORIA Tikologo ya Kago le Theknolotsi ya Tshedimoso<br>Make today matter<br><!-- End of picture text -->

## **Term duality** 

|**The word**|**Sense A**|**Sense B**|
|---|---|---|
|**Container**|a deployable / runnable thing (app, service, database)|an OCI image running under a container runtime|
|**Node**|any deployment target, including a JVM or a DB engine|a worker machine in a Kubernetes cluster|
|**Service**|a long-running application that owns some capability|a virtual IP plus load-balancing rule inside a cluster|
|**Instance**|one running copy of a deployable thing|a virtual machine you rented|
|**Cluster**|a set of machines under one scheduler|a primary plus its replicas in a database|



**If a diagram uses one of these words, it must be obvious in which sense. Usually that means a legend.** 



<!-- Start of picture text -->
Fea Z ,<br>Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>swovensirerrUNIVERSITY OFvawPRETORIApreroava FakulteitInligtingtegnologieIngenieurswese,/ LefaphaBou-omgewingla BoetSenere,en<br>YUNIBESITHI YA PRETORIA Tikologo ya Kago le Theknolotsi ya Tshedimoso<br>Make today matter<br><!-- End of picture text -->

# **WHAT SEPARATES THE BOXES** 

Question 4. 



<!-- Start of picture text -->
Fea Z ,<br>Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>YUNIBESITHIrtsYA PRETORIAtH TikologoFakulteitinligtingtegnologie ya Ingenieurswese,Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimoso en<br>Make today matter<br><!-- End of picture text -->

## **The isolation stack** 



<!-- Start of picture text -->
{' Physical host ' \ The question<br>{ '<br>BO penn nnn nnn nn nnn nn nn enn nnn nn nn nn nnn nn nn nnn enn nn nnn nn nn nnn nn nn nn nnn nn nn nnn nn nnn enn ene e enn ene-s ● Which of these would stop an attacker<br>Hypervisor who already has code execution one<br>toy _<br>level in?<br>Virtual machine + guest OS<br>_ it<br>i 41 7bgq<br>, | Container runtime 14<br>st 1 4<br>L| ;|<br>' 4 b<br>Container: namespaces + cgroups + seccomp<br>i it<br>1 Process 7 q<br>tot _<br>Thread<br>' 4 b<br>ma tt<br>11 7qq!<br>H| it a a<br>4 14 Faculty of Engineering,<br>tot a Built Environment and<br>[U S G SESE SERRE SESE SCE RRS ERS RESIS ESSERE HERESIES SEER SESE SEE SERS SEES’ ww Information Technology<br>u See eee eee e eee eee eee eee ee ee ee eee eee eee eee eee eee eee eee eee ee eee ee eee eee eee eee eee ee ee ee eee ee ee eee ee eee eee eee eee eee eee 4 swversiteirUNIVERSITYOFvanPRETORIApperowia FakulteitInligtingtegnologieIngenieurswese,/ LefaphaBou-omgewingla BoetSenere,en<br>YUNIBESITHI YA PRETORIA Tikologo ya Kago le Theknolotéi ya Tshedimo3o<br>Make today matter<br><!-- End of picture text -->

## **How strong is the wall?** 

strongest practical blast-radius boundary; separate credentials, quotas and audit **Separate account / subscription** trail **Separate physical network** no shared path to attack strong, decades of hardening, still the default assumption behind multi-tenant **Hypervisor (VM to VM)** cloud **Sandboxed runtime** gVisor, Kata, Firecracker: built to be a security boundary under a container **OCI container on a shared kernel** isolation only. A kernel escape crosses it. **Kubernetes namespace** RBAC and naming scope. No network or kernel isolation by default. **Application-enforced tenant check** as strong as the least reviewed query in your codebase **Same process, different thread** no boundary at all 

**Stronger at the top.** 



<!-- Start of picture text -->
Fea Z ,<br>Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>YUNIBESITHIrtsYA PRETORIAtH TikologoFakulteitinligtingtegnologie ya Ingenieurswese,Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimoso en<br>Make today matter<br><!-- End of picture text -->

# **WHAT MUST BE ON THE PAGE** 

Questions 1, 2, 3, 7 and 8 



<!-- Start of picture text -->
Fea Z ,<br>Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>YUNIBESITHIrtsYA PRETORIAtH TikologoFakulteitinligtingtegnologie ya Ingenieurswese,Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimoso en<br>Make today matter<br><!-- End of picture text -->

## **First the scope, then failure domains** 

###### **Q1  What system is this, and which environment?** 

One software system, one environment, named on the diagram. Production and staging differ in exactly the ways that cause incidents: replica counts, instance sizes, whether the standby exists at all. 

_Fails as: a diagram that is secretly 60% staging, and nobody can tell which 60%._ 

###### **Q2  What are the failure domains, and how are they nested?** 

Nest boxes so the nesting mirrors what fails together: region contains zone contains host contains runtime contains process. Two boxes inside one parent share that parent's failure. 

_Fails as: slide 2. Flat boxes hide the shared failure domain, so nobody sees the single point of failure._ 



<!-- Start of picture text -->
Fea Z ,<br>Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>YUNIBESITHIrtsYA PRETORIAtH TikologoFakulteitinligtingtegnologie ya Ingenieurswese,Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimoso en<br>Make today matter<br><!-- End of picture text -->

## **What runs where. What happens to state.** 

###### **Q3  What runs in each place, and how many copies?** 

Name the deployable thing, its version, and its replica count. api-service v2.3 x3 tells a reader more than API ever will. _Fails as: you cannot tell whether a deploy is rolling or all-at-once, and you cannot estimate cost._ 

###### **Q7  Where does state live, and what happens when a domain dies?** 

For every data store: engine and version, replication mode, and the recovery numbers. 

- Synchronous replica: no data loss on failover, write latency paid on every commit. 

- Asynchronous replica: fast writes, bounded data loss on failover. That bound is your RPO. 

- A replica copies your DELETE as faithfully as your INSERT. Backups are a separate control. 



<!-- Start of picture text -->
Fea Z ,<br>Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>YUNIBESITHIrtsYA PRETORIAtH TikologoFakulteitinligtingtegnologie ya Ingenieurswese,Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimoso en<br>Make today matter<br><!-- End of picture text -->

## **Who owns it. What to leave off.** 

###### **Q8  Who owns this diagram, and when was it last true?** 

Footer on every diagram: owner, source of truth, date last verified, commit hash if it is generated. 

**Leave off, unless the diagram is specifically about it:** 

- every config file and environment variable 

- metrics exporters, log shippers and agents on every host 

- the CI/CD pipeline, which belongs on a delivery diagram 

- the internal component structure of a deployable unit, which sits one level below this 



<!-- Start of picture text -->
Fea Z ,<br>Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>YUNIBESITHIrtsYA PRETORIAtH TikologoFakulteitinligtingtegnologie ya Ingenieurswese,Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimoso en<br>Make today matter<br><!-- End of picture text -->

# **HOW THE BOXES TALK** 

Question 5. 



<!-- Start of picture text -->
Fea Z ,<br>Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>YUNIBESITHIrtsYA PRETORIAtH TikologoFakulteitinligtingtegnologie ya Ingenieurswese,Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimoso en<br>Make today matter<br><!-- End of picture text -->

## **The problem with an unlabeled arrow** 

<u><mark>7</mark></u> ' **<mark>'</mark> What students draw** ;} **Five things the top arrow hides** 

   - Which side opens the connection? 

   - Which protocol, on which port? 

- **{** ' ' 

- <u>{'\'</u> ● Encrypted? Is the caller authenticated, ~~1~~ **API** ~~<mark>—</mark>~~ **Database** <mark>q</mark> or just on the network? ● Blocking or queued? 

- ~~!~~ ; ● On failure, is a retry safe? 

<mark>}</mark> **What a reviewer can use** 1 

<mark>'</mark> ' 

**PostgreSQL wire :5432 order-api v4.1 PostgreSQL 16** **~~<mark>}</mark>~~** x3 replicas primary, sync standby 1 **1** ~~<mark>}</mark>~~ TLS 1.3, mTLS, sync, pool 20 



<!-- Start of picture text -->
Fat é ry<br>Faculty of Engineering,<br>Built Environment and<br>wwe Information Technology<br>Qmivanerrtr vameatrowis FakulInlig t eitingtegnologie Ingenieurswese,/ Lefapha Bou-omgewingla Boetéenere, en<br>YUNIBESITHI YA PRETORIA Tikologo ya Kago le Theknolotsi ya Tshedimoso<br>Make today matter<br><!-- End of picture text -->

## **Edge label anatomy** 

Use a fixed shape so a reader always knows where to look: **<protocol>/<version>  :<port>  [TLS version]  [auth]  [sync | async]** HTTPS/2 :443, TLS 1.3, mTLS, sync PostgreSQL :5432, TLS 1.3, cert auth, sync, pool 20 Kafka :9093, TLS, SASL/SCRAM, async, 12 partitions AMQP 0-9-1 :5671, TLS, async, durable queue 

**Direction records which side opens the connection. Data crosses both ways regardless. Say which convention you use in the legend.** 

The edge is also where the filter lives: every arrow you draw implies a rule in a packet filter. Annotate the arrows and you have written most of your firewall configuration. 



<!-- Start of picture text -->
Fea Z ,<br>Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>YUNIBESITHIrtsYA PRETORIAtH TikologoFakulteitinligtingtegnologie ya Ingenieurswese,Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimoso en<br>Make today matter<br><!-- End of picture text -->

### **Protocol version changes the topology** 

**HTTP/1.1 through an L4 balancer** <mark>q</mark> qy **gRPC over HTTP/2, same balancer** 11 **Why the version belongs on the** q 1 q 1 **edge client** qy **client** 1 ● Fix: an L7 balancer that understands q 1 HTTP/2 streams. q ' [| ! [| 1| ● Or client-side load balancing. one long-lived conn | **q** { **1** ● Or a mesh sidecar doing the balancing 1 <mark>y</mark> per request. **L4 balancer** q **L4 balancer** 1 ● Write the protocol version on the edge | | **q** y| 111 and this is visible in review, q 1 **q** 11 ae q| ————-a 1 q 1 y 1 q 1 **replica 1 replica 2 replica 3** q **replica 1 replica 2 replica 3** 1 

###### **HTTP/1.1 through an L4 balancer** 

New connection per request wave, so the balancer re-decides. Load spreads. 

The balancer decides once, at connect time. Every stream then pins to replica 1. Two replicas idle. 



<!-- Start of picture text -->
&<br>Faculty of Engineering,<br>ww BuiltInformationEnvironment.  Technology and<br>YUNIBESITHIQmivanerrtr vamYA eatrowisPRETORIA TikologoFakulteitInligtingtegnologie ya Ingenieurswese,Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimo3o en _<br>Make today matter<br><!-- End of picture text -->

##### **Synchronous and asynchronous edges fail differently** 

**Synchronous: coupled availability** 



<!-- Start of picture text -->
HTTPS/1.1 :443, sync<br>checkout payments<br>payments down = checkout down<br>| |<br><!-- End of picture text -->

###### **What async buys and costs** 

- Async adds a queue, so it adds queue depth, consumer lag, redelivery and a dead-letter path. 

- At-least-once delivery means consumers must be idempotent. 

- You pay for all of that, but the outage stops propagating. 

- Draw solid for sync, dashed for async, and write the wordanyway. 

**<mark>\</mark> Asynchronous: decoupled availability** 



<!-- Start of picture text -->
1 1<br>\ i<br>\ order queue 1<br>checkout ——»> ---> payments H<br>durable<br>1 H<br>\ 1<br>,<br>1 AMQP :5671, async, at-least-once ; a y<br>1 ! Faculty of Engineering,<br>1eee eee eee eee nee eee eee eee eee eee ee ee een eee eee eee eee eee : ww BuiltInformationEnvironment; Technology and<br>YUNIBESITHIpatriaYA PRETORIArad TikologoFakulteitinligtingtegnologie Ingenieurswese,ya Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimoso en<br>Make today matter<br><!-- End of picture text -->

## **What actually goes on the wire** 

**JDBC and ODBC are client APIs. The wire underneath is the database's own protocol.** An edge labelled JDBC tells a reviewer nothing about what is on the network, or which port a firewall would have to open. 

PostgreSQL wire protocol  :5432 MySQL client/server protocol  :3306 TDS (SQL Server)  :1433 Oracle TNS  :1521 MongoDB wire protocol  :27017 RESP (Redis)  :6379, TLS on :6380 

Same discipline for the rest of the infrastructure: DNS :53 UDP and TCP, DoT :853, LDAPS :636, SMTP submission :587, Kafka :9092 plaintext and :9093 TLS, MQTT :1883 and :8883. 



<!-- Start of picture text -->
Fea Z ,<br>Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>YUNIBESITHIrtsYA PRETORIAtH TikologoFakulteitinligtingtegnologie ya Ingenieurswese,Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimoso en<br>Make today matter<br><!-- End of picture text -->

## **Exercise 3: label six edges** 

###### **In pairs, four minutes. Give protocol, port, encryption, auth and sync/async for every arrow.** 



<!-- Start of picture text -->
browser 1 web app 2 order API worker<br>3 4 5<br>PostgreSQL Redis queue<br>6<br>4 Fea Z ,<br>Faculty of Engineering,<br>external Built Environment and<br>payment provider ww Information Technology<br>YUNIBESITHIpatrons faleYA PRETORIAeer TikologoFakulteitinligtingtegnologie Ingenieurswese,ya Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimoso en<br><!-- End of picture text -->

_Six unlabelled arrows. One of them will tempt you to write JDBC._ 

# **WHERE TRUST CHANGES** 

Question 6. 



<!-- Start of picture text -->
Fea Z ,<br>Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>YUNIBESITHIrtsYA PRETORIAtH TikologoFakulteitinligtingtegnologie ya Ingenieurswese,Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimoso en<br>Make today matter<br><!-- End of picture text -->

## **What a trust boundary is** 

**A boundary between components that operate under different security policies, privilege levels, or assumptions about who is calling.** 

**The working rule:** 

Data crossing a trust boundary must be validated. The caller crossing it must be authenticated. 

**Where it comes from** 

The idea comes from threat modelling. STRIDE was developed at Microsoft by Praerit Garg and Loren Kohnfelder, and both STRIDE and OWASP threat modelling draw boundaries on a data flow diagram as dotted lines marking where data changes its level of trust. 



<!-- Start of picture text -->
Fea Z ,<br>Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>YUNIBESITHIrtsYA PRETORIAtH TikologoFakulteitinligtingtegnologie ya Ingenieurswese,Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimoso en<br>Make today matter<br><!-- End of picture text -->

###### **Pick a notaation and legend it.** 



<!-- Start of picture text -->
Dashed enclosure Dashed dividing line<br>untrusted<br>ee<br>i) eee remarry!<br>1I internet CDN<br>1!<br>1 Ly<br>! client edge 1<br>I! ! iia ie<br>1 ! trust boundary<br>i) !<br>i) ! ingress api<br>1 I<br>es|<br><!-- End of picture text -->



<!-- Start of picture text -->
Dashed enclosure<br>untrusted<br><!-- End of picture text -->

A dashed red rectangle around everything at one trust level. Reads well when boundaries nest. 

A dashed line across the diagram with a label on each side. Reads well for tiers, and it can cut through other boxes. 



<!-- Start of picture text -->
Stereotyped group<br><!-- End of picture text -->



<!-- Start of picture text -->
<<trust boundary>><br>api db<br><!-- End of picture text -->

A labelled group or package with a stereotype. Reads well in a modelling tool that will not let you draw freehand. 



<!-- Start of picture text -->
Built Environment and<br>va .eering,<br>ww Information Technology<br>YUNIBESITHIpatrons faleYA PRETORIAeer TikologoFakulteitinligtingtegnologie ya Ingenieurswese,Kago le Theknolot&i/ Lefapha Bou-omgewingla BoetSenere,ya TshedimoSo en<br><!-- End of picture text -->

## **Boundaries worth naming** 

|**Network perimeter**|internet to DMZ to private subnet to data tier|
|---|---|
|**Process and OS user**|different uid, different capabilities|
|**Container to host**|shared kernel; isolation only, no security guarantee|
|**VM and hypervisor**|the boundary multi-tenant cloud is built on|
|**Tenant**|multi-tenant SaaS; usually enforced in application code|
|**Account / subscription / project**|blast radius, credentials, audit|
|**Jurisdiction**|data residency under GDPR and POPIA; a legal constraint|
|**Supply chain**|registry to cluster; pulling an image is an act of trust|
|**Human / operator**|bastion, break-glass, the path nobody draws|





<!-- Start of picture text -->
Fea Z ,<br>Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>YUNIBESITHIrtsYA PRETORIAtH TikologoFakulteitinligtingtegnologie ya Ingenieurswese,Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimoso en<br>Make today matter<br><!-- End of picture text -->

#### **Identity: established, or merely asserted?** 

###### **The only question** 

- Ask of each hop: verified, or just reachable? 



<!-- Start of picture text -->
●<br>browser edge / ingress order API pricing API<br>●<br>●<br>ESTABLISHED ASSERTED NOTHING<br>session token validated against the  a JWT is forwarded; is the signature  reachable on the network is treated<br>identity provider checked here? as authorised<br><!-- End of picture text -->

- Flat internal networks answer "just reachable". 

- One compromised workload then becomes a breach. 

   - mTLS turns every asserted hop into an established one. 



<!-- Start of picture text -->
Fat é ry<br>Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>YUNIBESITHIpatrons faleYA PRETORIAeer TikologoFakulteitinligtingtegnologie ya Ingenieurswese,Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimoso en<br>Make today matter<br><!-- End of picture text -->

## **Exercise 4: STRIDE** 

**Pick the browser-to-edge crossing. Answer all six. Five minutes.** 

**S Spoofing T Tampering R Repudiation I Information disclosure D Denial of service E Elevation of privilege** 

Can I pretend to be a legitimate caller? Can I alter the request in flight or the data at rest? Can we prove afterwards who did it? What leaks? Payloads, errors, logs. Can I exhaust something from outside? Can a low-privilege caller gain more? 



<!-- Start of picture text -->
Fea Z ,<br>Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>swovensirerrUNIVERSITY OFvawPRETORIApreroava FakulteitInligtingtegnologieIngenieurswese,/ LefaphaBou-omgewingla BoetSenere,en<br>YUNIBESITHI YA PRETORIA Tikologo ya Kago le Theknolotsi ya Tshedimoso<br>Make today matter<br><!-- End of picture text -->

# **ONE SYSTEM, SEVEN DIAGRAMS** 



<!-- Start of picture text -->
Fea Z ,<br>Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>YUNIBESITHIrtsYA PRETORIAtH TikologoFakulteitinligtingtegnologie ya Ingenieurswese,Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimoso en<br>Make today matter<br><!-- End of picture text -->

##### **UniMarket** 



<!-- Start of picture text -->
web app order API search API worker<br>React SPA Java 21 Go Java 21<br>PostgreSQL Redis external<br>orders, users sessions, cache payment provider<br><!-- End of picture text -->

###### **This diagram is true in every environment.** 

It says nothing about how many copies run, what they run on, what is between them, or what happens when something dies. Every remaining diagram answers those questions, and every one of them is specific to one environment. 



<!-- Start of picture text -->
Runnable unit Deployment node Data store Outside our control Trust boundary<br>LJ LJ LC] pons4 YUNIBESITHIQmivanerrtr vamYa PRETORIAeatrowis TikologoInligtingtegnologie ya Kago le / Th knolot&i L e fapha la Boetéenere, ya Tshedimo&o<br><!-- End of picture text -->

### **Example 1: everything on one host** 



<!-- Start of picture text -->
Host: unimarket-prod-01  (4 vCPU, 16 GB)  [AWS: EC2 t3.xlarge  |  on-prem: 1U server]<br>Ubuntu 24.04 LTS<br>JVM 21<br>artifact<br>PostgreSQL 16<br>unimarket.jar<br>same host, unix socket<br>v1.4.0, single process<br>fF |<br>HTTP/1.1 :8080<br>nginx 1.26<br>TLS termination<br>browser<br>HTTPS/1.1 :443, TLS 1.3<br><!-- End of picture text -->



<!-- Start of picture text -->
Fea Z ,<br>Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>YUNIBESITHIpatrons faleYA PRETORIAeer TikologoFakulteitinligtingtegnologie ya Ingenieurswese,Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimoso en<br>Make today matter<br><!-- End of picture text -->

###### **Example 2: three tiers, on-premises, with a DMZ** 



<!-- Start of picture text -->
browser HTTPS/1.1 :443, TLS 1.3<br>TRUST BOUNDARY  internet / DMZ<br>DMZ (VLAN 40): no state kept here<br>nginx reverse proxy<br>x2, keepalived VIP<br>HTTP/1.1 :8080<br>Application tier (VLAN 41)<br>unimarket.jar v1.4 unimarket.jar v1.4<br>app-01, JVM 21 app-02, JVM 21<br>TRUST BOUNDARY  app tier / data tier<br>Data tier (VLAN 42): no route to internet PostgreSQL :5432, TLS<br>PostgreSQL 16<br>single host, nightly dump<br><!-- End of picture text -->

###### **Read the diagram** 

- Two boundaries, 

- Nothing in the DMZ holds state, which is why a DMZ exists. 

- Two app servers means you must now say how traffic is spread, and whether sessions are sticky. 

- Still a single point of failure. Same one as the incident on slide 2. Where is it? 



<!-- Start of picture text -->
Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>YUNIBESITHIpatriaYA PRETORIArad TikologoFakulteitinligtingtegnologie ya Ingenieurswese,Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimoso en<br>Make today matter<br><!-- End of picture text -->

###### **Example 3: containerised, one cloud region, two zones** 



<!-- Start of picture text -->
CDN<br>browser<br>edge cache<br>[| [| TRUST BOUNDARY  internet / private network ●<br>HTTPS/2 :443, TLS 1.3, sync<br>●<br>Cloud region  [AWS: eu-west-1  |  Azure: West Europe]<br>●<br>infrastructure node<br>L7 load balancer ●<br>Failure domain B  [zone eu-west-1b]<br>Failure domain A  [zone eu-west-1a]<br>order-api v2.3 worker v2.3 order-api v2.3 worker v2.3<br>x2 x1 x2 x1<br>TRUST BOUNDARY  app / data tier<br>Redis 7 PostgreSQL 16 PostgreSQL 16 Redis 7<br>primary primary standby, sync replica, async<br>| | — | |<br>sync replication: no data loss on failover<br><!-- End of picture text -->

###### **Read the diagram** 

- Two failure domains, and the nesting says which things die together. 

- Replica counts and versions on every unit. 

- Sync standby: no data loss, cross-zone latency on every commit. 

- Async cache replica: fast, loses whatever had not shipped. 



<!-- Start of picture text -->
Fat BuiltcacolyEnvironmenta elie nasa.é andry<br>ww Information Technology<br>YUNIBESITHIpatrons faleYA PRETORIAeer TikologoFakulteitinligtingtegnologie ya Ingenieurswese,Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimoso en<br>Make today matter<br><!-- End of picture text -->

_unimarket / production   |   owner: platform team   |   verified 2026-08-14   |   source: infra/prod.tf_ 

###### **Example 3b: the same architecture, on-premises** 



<!-- Start of picture text -->
reverse cache<br>browser<br>Varnish cache<br>TRUST BOUNDARY  internet / private network<br>[| [|<br>HTTPS/2 :443, TLS 1.3, sync<br>Campus data centre, Hatfield<br>infrastructure node<br>F5 BIG-IP<br>Failure domain A  [hall 1: own power + switch] Failure domain B  [hall 2: own power + switch]<br>order-api v2.3 worker v2.3 order-api v2.3 worker v2.3<br>x2 (Podman) x1 (Podman) x2 (Podman) x1 (Podman)<br>TRUST BOUNDARY  app / data tier<br>Redis 7 PostgreSQL 16 PostgreSQL 16 Redis 7<br>primary primary standby, sync replica, async<br>| | — | |<br>sync replication: no data loss on failover<br><!-- End of picture text -->



<!-- Start of picture text -->
Fat BuiltcacolyEnvironmenta elie nasa.é andry<br>ww Information Technology<br>YUNIBESITHIpatrons faleYA PRETORIAeer TikologoFakulteitinligtingtegnologie ya Ingenieurswese,Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimoso en<br>Make today matter<br><!-- End of picture text -->

_unimarket / production   |   owner: platform team   |   verified 2026-08-14   |   source: ansible/prod_ 

#### **Example 4: adding an asynchronous edge** 



<!-- Start of picture text -->
Cloud region, production   (zones omitted on purpose, and the diagram says so)<br>order-api v2.6 log-structured stream settlement worker<br>x4 order-events x2, consumer group<br>6 partitions, 3 replicas<br>1<br>_ | 7 | 1\<br>1<br>PostgreSQL :5432 outbox relay publishes \<br>1<br>\<br>Kafka :9093, TLS, SASL/SCRAM, async, at-least-once 1<br>PostgreSQL 16 order-events.DLQ<br>+ outbox table after 5 attempts<br>| [|<br>nothing consumes the DLQ automatically; that is a decision,<br>so write it down<br><!-- End of picture text -->



<!-- Start of picture text -->
Fea Z ,<br>Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>YUNIBESITHIpatrons faleYA PRETORIAeer TikologoFakulteitinligtingtegnologie ya Ingenieurswese,Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimoso en<br>Make today matter<br><!-- End of picture text -->

###### **Example 5: devices, third parties, and traffic coming back in** 



<!-- Start of picture text -->
poe eee eee n eeeene<br>{ ++<br>Devices we do not control 11<br>q 1<br>:<br>: device device 1<br>{ device i<br>q Android app iOS app 1<br>browser<br>q v3.1, and v2.8 still live v3.1 1<br>:<br>q 1<br>TRUST BOUNDARY  public internet / our estate HTTPS/2 :443, TLS 1.3, OAuth 2.0 + PKCE<br>ape poses<br>Cloud region, production<br>API gateway external<br>rate limit, token validation payment provider<br>HTTPS :443, OAuth 2.0 INBOUND webhook, signed<br>order-api v2.6 PostgreSQL 16 webhook receiver<br>x4 primary + sync standby x2, signature check<br>a<br>i<br>Faculty of Engineering,F 5<br>Built Environment and<br>ww Information Technology<br>ONIVEIT OteRLTOEIA FakulInlig t eitingtegnologie Ingenieurswese,/ Lefapha Bou-omgewingla BoetSenere, en<br>YUNIBESITHI YA PRETORIA Tikologo ya Kago le Theknolotsi ya Tshedimoso<br>Make today matter<br><!-- End of picture text -->

###### **Example 6: two regions, one legal boundary** 



<!-- Start of picture text -->
global DNS<br>60 s TTL, health checked<br>JURISDICTION BOUNDARY<br>1 ae<br>Region: EU  [active] ! Region: ZA  [warm standby] T2855 -<br>1<br>L7 load balancer i) L7 load balancer<br>i)<br>PF 1!: | ian<br>1<br>1<br>order-api v2.6  x6 ! order-api v2.6  x2<br>!<br>| iY ! |<br>i)<br>i)<br>1<br>PostgreSQL 16 primary PostgreSQL 16 replica<br>stop<br>EU personal data only 1 ZA personal data only<br>!<br>!<br>1<br>async replication: 400 ms lag, which is your RPO i) 4% Faculty of Engineering,F ;<br>Built Environment and<br>ww Information Technology<br>swovensirerrUNIVERSITY OFvawPRETORIApreroava FakulteitInligtingtegnologieIngenieurswese,/ LefaphaBou-omgewingla BoetSenere,en<br>YUNIBESITHI YA PRETORIA Tikologo ya Kago le Theknolotsi ya Tshedimoso<br>Make today matter<br><!-- End of picture text -->

# **KEEPING THE DIAGRAM TRUE** 

Question 8. The only reason any of this survives a real project. 



<!-- Start of picture text -->
Fea Z ,<br>Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>YUNIBESITHIrtsYA PRETORIAtH TikologoFakulteitinligtingtegnologie ya Ingenieurswese,Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimoso en<br>Make today matter<br><!-- End of picture text -->

## **Diagram rot has two cures** 

The failure mode is always the same: someone drew a picture, exported an image, and pasted it into a wiki. Six months later it was wrong, nobody owned the source, and the next person started again. 

**Cure 1: diagrams as code** 

Keep the diagram as text next to the code it describes, render it in CI, review it in pull requests. PlantUML, Structurizr DSL, Mermaid, D2. 

One line of Structurizr DSL carries a replica count that a drawing tool would make you letter by hand: 

deploymentNode "api pod" "" "Docker" 3 { containerInstance api } 

**Cure 2: model, then views** 

Build one model and generate many diagrams from it. Rename a service once and every view updates, which removes the bug where the same thing is called three things on three slides. 



<!-- Start of picture text -->
Fea Z ,<br>Faculty of Engineering,<br>Built Environment and<br>ww Information Technology<br>YUNIBESITHIrtsYA PRETORIAtH TikologoFakulteitinligtingtegnologie ya Ingenieurswese,Kago le Theknolotsi/ Lefapha Bou-omgewingla BoetSenere,ya Tshedimoso en<br>Make today matter<br><!-- End of picture text -->

