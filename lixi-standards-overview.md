# LIXI Standards Overview for Lendaloan BrokerApp

Last reviewed: 28 July 2026
Scope: public LIXI pages only, plus source-safe architectural interpretation for BrokerApp.

## Positioning

LIXI should be the reference vocabulary for Lendaloan/BrokerApp lending data, validation readiness, evidence packaging, and future lodgement integrations. BrokerApp should not mirror the full LIXI schema in Twenty. It should model the operational subset brokers, processors, compliance users, clients, and provider adapters need to capture, validate, review, audit, and submit a residential mortgage application.

The public LIXI Standards page describes LIXI2 as covering applicant types including individuals, trusts, and companies, across product types such as residential mortgages, commercial mortgages, consumer loans, credit cards/lines of credit, business lending, asset finance/leasing, and deposit products associated with credit products. The same public page lists data areas including broker interview/needs analysis, applicant details, proof of identity, income, expenses, product details, security/title details, workflow details, employment, assets, and liabilities.

## Licence Boundary

This repository may contain source-safe summaries and conceptual mappings only.

Allowed in Git:

- Public LIXI URLs.
- Public standard names and public version identifiers.
- BrokerApp architecture decisions.
- Conceptual field groups and object ownership.
- Source-safe implementation checklists.

Not allowed in Git:

- LIXI member downloads.
- XML/JSON schemas.
- CSV schema representations.
- Generated schema documentation.
- Sample payloads.
- Exact enumerations copied from LIXI documentation.
- Lender EGB files or private lender rules.
- BrokerEngine private screenshots, copied template bodies, live customer data, or private field exports.

Detailed LIXI field-path mapping must be completed in a licensed/private workspace and should be referenced from BrokerApp by versioned private IDs, not by copied restricted content.

## Standards Map

| Standard | Public purpose | BrokerApp implication |
| --- | --- | --- |
| CAL: Credit Applications for Australia | Electronic submission of credit and associated deposit product applications from CRM/POS systems through aggregators and lender lodgement gateways. | Primary Australian residential mortgage application reference. BrokerApp fact-find, Opportunity, Applicant Profile, Mortgage Application, Loan Requirement, document, status, and lodgement models should align to CAL concepts. |
| CNZ: Credit Applications for New Zealand | Equivalent credit application standard for New Zealand. | Future only unless Lendaloan enters NZ lending. Keep separate from Australian CAL. |
| EGB: Electronic Guidebook | Describes lender business requirements, data mapping to transaction standards, expected screen/print form layout, field names, and submission/product validation rules. | Use as the conceptual model for lender-specific rules, field order, labels, validation, document requirements, and readiness gates. Actual EGB content stays private/licensed. |
| CDA: Credit Decisioning | Messaging between origination systems and credit decision systems for assessment requests/status/results. | BrokerApp should store decision status, provider reference, policy/risk flags, reason codes, manual review owner, and evidence references. |
| SVC: Serviceability | Serviceability assessment requests, responses, reports, and calculation details. | Store calculator/provider, requested scenario, high-level result, report reference, reason codes, and readiness gate. Avoid restricted payload storage unless approved. |
| DAS: Document Preparation and Settlements | Requests for loan document packs and settlement instructions. | Map to loan document issued/returned, signing/return method, settlement agent/conveyancer, readiness gates, and settlement events. |
| VAL: Valuations | Real estate valuation requests, valuation execution, updates, and returned results/reports. | Track property/security valuation lifecycle and allowed report references. |
| LMI: Lenders Mortgage Insurance | LMI application/approval messaging and insurance policy details. | Track LVR, LMI required/quoted/approved/waived/declined, premium summary, conditions, insurer/lender reference, and expiry. |
| ACC: Account Creation for Australia | Account creation/management messaging between lenders/deposit institutions and servicing/core banking systems. | Future post-approval/settlement account creation/status reference. |
| ACZ: Account Creation for New Zealand | NZ account creation reference. | Future only. |
| AFD: Application Fraud Detection | Fraud detection messaging using application, assessment, credit history, and needs analysis data. | Model fraud checks as provider-gated verification events, reason codes, escalation status, and evidence references. |
| ALA: Account Lookup and Maintenance for Australia | Account lookup, maintenance/update, and payout-detail requests/responses. | Future account maintenance and loan servicing integration reference. |
| PSA: Insurance Policy Search Australia | Insurance policy/account/security/borrower/guarantor search and verification messages. | Future insurance verification and property-risk support. |
| TSA: Title and Property Search Australia | Title search and property risk assessment messaging. | Track title/property search orders, title references, report references, risk flags, and evidence status. |
| CMA: Customer Management Australia | Standardising customer data management independently of credit applications. | Useful future reference for contact/applicant reuse across loans and customer lifecycle. |

## Current Public Version Snapshot

Public release announcement reviewed on 28 July 2026. LIXI announced updated standards published on 7 July 2026. The announcement says the release expands Company, Trust, and Person details for compliance/identification and adds more granular serviceability, tax deductibility, asset valuation, payment, and instruction-management support.

| Standard | Public current/recent release shown | Date shown |
| --- | --- | --- |
| ACC | ACC 2.0.61 | 7 July 2026 |
| ACZ | ACZ 0.0.31-RFC | 7 July 2026 announcement; marked as no new version in this release |
| AFD | AFD 2.0.33 | 7 July 2026 announcement; marked as no new version in this release |
| ALA | ALA 2.0.15 | 7 July 2026 |
| CAL | CAL 2.6.99 | 7 July 2026 |
| CMA | CMA 0.0.1 | 7 July 2026 |
| CDA | CDA 2.0.93 | 7 July 2026 |
| CNZ | CNZ 2.1.63 | 7 July 2026 announcement; marked as no new version in this release |
| DAS | DAS 2.2.97 | 7 July 2026 announcement; marked as no new version in this release |
| DSZ | DSZ 0.0.1 | 7 July 2026 announcement; marked as no new version in this release |
| LMI | LMI 2.0.32 | 7 July 2026 |
| PSA | PSA 2.1.4 | 7 July 2026 announcement; marked as no new version in this release |
| SVC | SVC 2.0.80 | 7 July 2026 |
| SVZ | SVZ 0.0.5 | 7 July 2026 announcement; marked as no new version in this release |
| TSA | TSA 2.0.5 | 7 July 2026 announcement; marked as no new version in this release |
| VAL | VAL 2.0.27 | 7 July 2026 announcement; marked as no new version in this release |
| EGB | EGB 2.0.0 | Public EGB page updated 28 October 2019 |

Do not use this table as a production version lock. Each production integration must confirm the exact LIXI version accepted by the aggregator, lender, ApplyOnline, AFG Flex, serviceability provider, valuation provider, mortgage insurer, or document-prep provider.

## BrokerApp Data Model Implications

BrokerApp should keep these internal objects and concepts aligned to LIXI-style data areas:

- Opportunity: loan cockpit and board record.
- Mortgage Application: structured application package for CAL-style preparation.
- Contact: reusable person record for applicants, guarantors, brokers, BDMs, accountants, conveyancers, referrers, and related individuals.
- Company/Entity: employers, self-employed businesses, corporate borrowers, trustee companies, unit trusts, discretionary trusts, partnerships, and related entities.
- Party Relationship: role-specific links between people/entities, including borrower, co-borrower, guarantor, director, shareholder, unit holder, trustee, beneficiary, appointor, accountant, conveyancer, referrer, broker, processor, compliance owner, lender BDM, and related party.
- Applicant Profile: application-specific applicant index, role, consent, KYC/CDD state, fact-find state, portal invite, and lender-readiness state.
- Fact Find Session, Fact Find Section, Fact Find Field Answer: autosave and review layer before normalization into Contacts, Applicant Profiles, Loan Requirements, Income, Expenses, Assets, Liabilities, Property/Security, and Documents.
- Loan Requirement: objectives, desired features, lender preference, product needs, BID rationale, and interview guide evidence.
- Document Request: document category, applicant/entity target, due date, status, upload method, external document reference, verification status, Paperless-ngx/OCR status, and evidence history.
- Status Event: append-only external/internal event history, preserving original provider labels and mapping to BrokerApp stages.
- Serviceability Assessment, Valuation Order, LMI Assessment, KYC/CDD Profile, Verification Event, AML Escalation, Evidence Pack: provider-gated records with reason codes and audit events.

## Development Guardrails

Every LIXI-related BrokerApp change must answer:

- Which LIXI standard or data area does this concept align to?
- Which BrokerApp object owns the value?
- Is the field applicant-specific, household-shared, entity-specific, lender-specific, or application-specific?
- What validation/rule set controls it?
- What evidence, consent, provider reference, or audit event proves it?
- Is any external action gated until credentials and approval are active?
- Is any licensed, private, or live data being kept out of Git?

## Safe Capture And Skill

A source-safe Codex skill has been added locally:

- `/Users/shahroozsafanejad/.codex/skills/brokerapp-lixi-standards-guard`

It contains:

- `scripts/crawl_lixi_public.py`: public-page metadata capture only.
- `scripts/lixi_guard_check.py`: source-safety and guardrail scanner.
- `references/lixi-public-standards-map.md`: source-safe standard map.
- `references/brokerapp-lixi-development-checklist.md`: implementation/review checklist.

Public capture output from this run:

- `/Users/shahroozsafanejad/Documents/New project 5/outputs/lixi-public-capture-2026-07-28/lixi-public-capture.md`
- `/Users/shahroozsafanejad/Documents/New project 5/outputs/lixi-public-capture-2026-07-28/lixi-public-capture.json`

The capture output is local/untracked and should stay private until reviewed.

## Public Sources

- LIXI Standards: https://lixi.org.au/lixi-standards/
- LIXI Downloads: https://lixi.org.au/lixi-standards/downloads/
- July 2026 LIXI Standards Release Announcement: https://lixi.org.au/july26-release/
- CAL: https://lixi.org.au/lixi-standard/credit-applications-for-australia-cal/
- EGB: https://lixi.org.au/lixi-electronic-guidebooks/
- LIXI2 Documentation: https://lixi.org.au/lixi2-documentation/
- LIXI2 Tools: https://lixi.org.au/lixi-standards/lixi2-tools/
