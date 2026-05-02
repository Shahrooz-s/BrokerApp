# BrokerApp Final Pilot Readiness

## Purpose

This file is the pilot readiness checklist for the BrokerApp Twenty app. It describes what is included in the source build and what must remain private or be configured after installation.

BrokerApp is designed as a white-labelled Twenty workspace for Australian mortgage broking. The pilot uses Twenty-native objects, fields, views, roles, navigation entries, and post-install seed records rather than a separate SaaS dependency.

## Included In v0.15

- BrokerEngine-style board and stage templates for Lead, Deal, Maintenance, Partnerships, Construction, Asset Finance, with Commercial and Business Lending scaffolded for later.
- BrokerEngine-style deal workspace inventory: Overview, Fact Find, Strategy, Lodgement, and right-rail tools.
- BrokerEngine feature parity register for boards, DealDash, fact find, Strategy, serviceability, products, lodgement, templates, checklists, documents, settings, client portal, AML/KYC, integrations, and white-label controls.
- Broker settings records for lenders, products, workflow templates, email/task/SMS/report/template metadata, boards/stages, fact-find templates, smart docs, security, integrations, client portal, AI, and compliance.
- Broker template metadata records for emails, SMS, tasks, reports, workflows, and smart documents.
- Checklist module objects: reusable checklist templates, item templates, deal checklist instances, and deal checklist items.
- Client portal foundations: portal sessions, portal tasks, safe client-facing status fields, and no-SMS-OTP provider defaults.
- AML/KYC foundations: KYC/CDD profile, verification events, consent records, AML escalation records, evidence pack records, reason-code fields, and hard-stop fields.
- Product import foundations: product import runs and provider registry for AFG product matrix/API imports.
- White-label settings: pilot brand, domain, portal, auth mode, SaaS isolation assumption, and security header profile.
- Deployment and API documentation for Docker/Dockge and Twenty app install.

## Not Committed To GitHub

Do not commit these items:

- BrokerEngine template bodies.
- BrokerEngine screenshots or live account captures.
- Sent email/SMS history.
- Client or live application data.
- Lender calculators, hidden workbook sheets, macros, or proprietary formulas.
- LIXI licensed schemas, samples, guidebooks, or payloads.
- API keys, webhook secrets, private deploy keys, or provider credentials.

Use `.brokerapp-private/`, `brokerengine-private/`, `private-template-imports/`, or encrypted storage for private operational imports.

## Feature Parity Register

BrokerApp now seeds a Broker Settings view called `Feature parity`. This is the internal pilot checklist for the BrokerEngine-style functionality discussed in this project. It tracks whether each feature is seeded/modelled, needs private content import, needs provider API credentials, needs workspace login/configuration, needs custom UI/front-component work, or belongs to a later phase.

The register intentionally stores sanitized feature coverage only. Full copied email/template bodies, checklist wording, screenshots, live account captures, lender calculator content, customer data, and licensed LIXI assets must remain private workspace imports or encrypted artifacts, not GitHub source.

## Pilot Install Sequence

1. Confirm `brokerapp-v1` is healthy at `https://app.lendaloan.com.au/healthz`.
2. Create a Twenty API key named `BrokerApp CLI Deploy`.
3. Pull the latest `codex/review-ready-deployment` branch from `Shahrooz-s/BrokerApp`.
4. Deploy the app package from `twenty-source/packages/twenty-apps/community/brandroll-mortgage`.
5. Install the app.
6. Run the post-install seed function.
7. Refresh Twenty and confirm the Broker Settings folder contains the new views.
8. Configure staff users and roles.
9. Create a test Contact and Opportunity and verify the DealDash workflow records can be created and linked.
10. Do not enter real borrower data until backups, access roles, retention, document storage, and provider credentials are approved.

## Pilot Feature Coverage

BrokerApp now has source-level support for the workflow structure discussed in this project:

- Contacts remain reusable relationship records.
- Opportunities are the deal/board cockpit.
- Applicants are assigned to opportunities as applicant profiles.
- Fact find is modelled as sessions, sections, and answer rows.
- Product research and serviceability run inside the deal, not as generic sidebar-only tables.
- Credit proposals capture product comparison, lender policy fit, recommendation reasons, and broker approval notes.
- Checklists and stage gates support processors and assistants.
- Client portal tasks keep borrower-facing work separate from broker-only notes and AML/compliance records.
- KYC/CDD records separate identity confidence, AML/CTF risk, fraud risk, and CDD completion.

## Known Pilot Gaps

These are not complete production software features yet:

- The visual DealDash front component is still represented as data model, views, and workflow inventory rather than a custom React screen.
- Twenty workflow automations still need workspace configuration after install.
- ApplyOnline, AFG Flex, AFG/BrokerEngine, IDV, open banking, bank statement, email, and product-data credentials are not present.
- Lender-specific serviceability engines require licensed calculators, policy documents, provider APIs, or approved manual assumptions.
- AML/CTF configuration requires legal/compliance review before production use.

## Production Gates

Production use requires:

- Tested backups and restore.
- Approved privacy, retention, and document storage policy.
- Role-based access review.
- Compliance review of KYC/CDD, AML/CTF, hard-stop, escalation, and evidence-pack workflow.
- API credentials and provider agreements.
- ApplyOnline/AFG Flex/AFG/BrokerEngine approval where relevant.
- LIXI production licence/certification decisions if any direct lodgement or restricted-content use is planned.
