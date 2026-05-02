# Brandroll Broker CRM Setup Pack

## Objective

This repository is the setup and implementation pack for a self-hosted Twenty CRM configured for Australian mortgage broking. It includes the Brandroll deployment/docs layer plus the imported Twenty application source code under `twenty-source/`. It treats LIXI as the reference lending data model, positions Twenty as the internal broker operations application, and plans a chat-style client portal plus dashboard as the borrower-facing experience.

The application should feel operationally closer to a mortgage broking platform than a generic CRM. The staff-facing vocabulary should use `Contacts` rather than `People`, and the workspace should be configured around multiple boards for lead management, fact find, documents, credit proposal, lodgement, conditions, settlement, reviews, and integration exceptions.

The preferred future lodgement path remains direct injection into ApplyOnline, with AFG Flex as the alternate path where direct ApplyOnline integration is not available or approved. AFG and BrokerEngine remain relevant operational integration systems while this future-state lodgement path is confirmed.

## Audience

- CRM implementers configuring Twenty.
- Developers building the client portal, API adapters, and webhook/sync services.
- Mortgage brokers, processors, credit/admin reviewers, and operations staff defining workflow.
- Business owners deciding how Twenty, the client portal, AFG/BrokerEngine, ApplyOnline, AFG Flex, and specialist tools fit together.

## Core Assumptions

- Market scope is Australian residential mortgage broking.
- The available LIXI access is a development licence only.
- Twenty is self-hosted and will be configured with custom objects, fields, views, workflows, REST/GraphQL APIs, and metadata APIs.
- Staff-facing records should refer to borrowers, referral partners, professional contacts, lender contacts, and broker contacts as `Contacts`. If Twenty keeps the internal standard object name `Person`/`People`, that should be treated as a platform implementation detail, not the staff-facing language.
- Twenty will be the internal application for loan origination management, credit proposal work, compliance tasks, application packaging, status tracking, settlement, and post-settlement review.
- A custom client portal will provide chat, dashboard, guided fact find, document requests, status updates, consent capture, and specialist-tool handoffs.
- The fact find should be modelled as a structured, section-based process similar in operational feel to BrokerEngine: applicants, household, objectives, employment, income, expenses, assets, liabilities, property/security, loan requirements, consent, and documents.
- Residential fact finds should support one primary applicant plus up to three co-applicants through conditional logic and applicant index metadata.
- The borrower fact find should use OpnForm as the preferred portal form renderer, using a schema-driven form-builder pattern with conditional sections, validation, hidden workflow metadata, partial/editable submissions, webhooks, and immutable form versions. Twenty remains the normalized source of truth after portal submission mapping.
- Form-builder administration belongs in Broker Settings. Deals should launch or consume published templates, not become the place where staff design or publish form templates.
- Fact-find form events should autosave into Twenty Fact Find Sessions, Fact Find Sections, and Fact Find Field Answers before being normalized into Contacts, Applicant Profiles, Loan Requirements, Properties/Securities, Document Requests, Compliance Acknowledgements, Serviceability inputs, and later lodgement payloads.
- Field naming and mapping should be LIXI-first, then hold BrokerEngine, AFG, ApplyOnline, and AFG Flex aliases or external codes where those systems need different names.
- Desired loan features captured in the residential fact find should feed Loan Requirement records, Product Search Run filters, lender/product shortlist scoring, and credit proposal rationale.
- The workspace needs multiple board-style work queues, not a single linear pipeline.
- Specialist external tools will be used for ID verification, open banking, product research, serviceability, valuation, LMI, credit checks, title/property searches, and other mortgage workflow functions where appropriate.
- Zapier is not preferred for the target architecture. BrokerEngine Zapier/ZAP documentation can still inform field names, board concepts, event concepts, status handling, and temporary workaround design while direct API access is confirmed.
- AFG, BrokerEngine, ApplyOnline, AFG Flex, and specialist tool API documentation, credentials, sandbox details, and object models must still be confirmed.
- Twenty will not directly inject into ApplyOnline, AFG Flex, or lender systems unless production licensing, certification, aggregator permissions, vendor approval, and lender requirements are confirmed.

## Documentation Index

- [Twenty CRM First Docker Deployment](./DEPLOYMENT.md)
- [Dockge Deployment Guide](./dockge-deployment-guide.md)
- [Cloudflare DNS and SSL Guide](./cloudflare-dns-and-ssl-guide.md)
- [Mortgage App Deployment Guide](./mortgage-app-deployment-guide.md)
- [BrokerApp Deal-Centric Mortgage Configuration](./deal-centric-brokerapp-v0.2.md)
- [Serviceability Calculator Analysis](./serviceability-calculator-analysis.md)
- [Imported Twenty Application Source](./twenty-source/README.md)
- [Application Configuration Guide](./application-configuration-guide.md)
- [BrokerApp Final Pilot Readiness](./brokerapp-final-pilot-readiness.md)
- [BrokerApp API And Integration Specification](./brokerapp-api-integration-spec.md)
- [Private Template Import Format](./private-template-import-format.md)
- [AML/CTF And KYC Architecture](./aml-ctf-kyc-architecture.md)
- [BrokerEngine Board and Bulk Edit Reference](./brokerengine-board-and-bulk-edit-reference.md)
- [BrokerEngine Sidebar and Workflow Template Reference](./brokerengine-sidebar-workflow-template-reference.md)
- [BrokerEngine Contact Import Mapping](./brokerengine-contact-import-mapping.md)
- [BrokerEngine Fact Find Template Reference](./brokerengine-fact-find-template-reference.md)
- [OpnForm Residential Fact Find Specification](./opnform-residential-fact-find-spec.md)
- [Pipeline and Board Configuration](./pipeline-and-board-configuration.md)
- [Fact Find Configuration](./fact-find-configuration.md)
- [Twenty CRM Data Model](./twenty-crm-data-model.md)
- [Twenty CRM Setup Plan](./twenty-crm-setup-plan.md)
- [Workflow Automation Plan](./workflow-automation-plan.md)
- [Client Portal and Dashboard Architecture](./client-portal-and-dashboard-architecture.md)
- [AFG and BrokerEngine Integration Plan](./afg-brokerengine-integration-plan.md)
- [LIXI Standards Overview](./lixi-standards-overview.md)
- [LIXI to Twenty Mapping](./lixi-to-twenty-mapping.md)
- [LIXI Tooling and Reference Implementations](./lixi-tooling-and-reference-implementations.md)
- [AFG ZAP Confluence Access Plan](./afg-zap-confluence-access-plan.md)
- [AFG ZAP / BrokerEngine Zapier Review](./afg-zap-review.md)
- [Licence and Readiness Checklist](./licence-and-readiness-checklist.md)
- [Repository Review and Readiness](./repository-review-and-readiness.md)
- [Implementation Backlog](./implementation-backlog.md)

## Application Shape

## Repository Layout

- Root documentation and deployment layer: Brandroll-specific setup, LIXI mapping, BrokerEngine references, Docker first-run files, and implementation backlog.
- `twenty-source/`: imported Twenty monorepo source code with Brandroll mortgage CRM changes and reference docs.
- `docker-compose.yml`: first deployment baseline using the official `twentycrm/twenty` image.
- `twenty-source/deploy/brandroll-twenty/`: source-side Brandroll deployment overlay from the Twenty source work.
- `twenty-source/docs/brandroll-mortgage-crm/`: source-side Brandroll mortgage CRM implementation notes.

The current root Docker compose remains the fastest first deployment path. A later deployment step should build and publish a Brandroll custom Twenty image from `twenty-source/` once source customisations are ready to run in production.

The first usable internal application should include:

- Contacts: borrowers, co-borrowers, guarantors, referrers, professional contacts, lender contacts, and broker contacts.
- Organisations: employers, self-employed businesses, trusts, lenders, referral firms, accounting firms, conveyancers, and broker entities.
- Opportunities/Deals: the top-level broker board record and loan origination workspace.
- Mortgage Applications: the structured CAL-style application package tied to a deal when required.
- Fact Find Sessions: section-based applicant and household capture with completion scoring and review status.
- Fact Find Sections and Field Answers: autosave/review tables for embedded OpnForm or portal fact-find responses, linked back to the Deal/Opportunity.
- Product Search Runs: AFG product matrix filtering, desired loan feature filters, policy research notes, selected sheet flags, and broker override rationale.
- Product Shortlist Options: compared lender/product candidates with serviceability, policy, fit, and recommendation reasons.
- Broker Form Templates: Broker Settings records for OpnForm templates, default template selection, versions, webhook status, and mapping references.
- Broker Templates: reusable email, SMS, task, checklist, report, workflow, and smart-document template records with merge-variable mapping and private body import controls.
- Broker Board and Stage Templates: BrokerEngine-style lead/deal boards, stage due thresholds, warning thresholds, and workflow gate metadata.
- Deal Workspace Tools: the deal sidebar, right-rail drawers, and Broker Settings structure captured as configurable records.
- BrokerEngine Feature Parity: an internal pilot coverage register for every BrokerEngine-style feature area discussed, including what is seeded/modelled, what needs private import, what needs provider APIs, and what still needs custom UI/workspace configuration.
- Broker Lenders: Broker Settings lender records for LIXI/AFG/ApplyOnline/BrokerEngine codes, lender categories, panel status, calculator links, policy references, document categories, and product/contact relationships.
- Credit Proposals: internal recommendation, product selection, policy exception, risk, mitigant, and approval work.
- Document Metadata: checklist, request, received, verified, expired, waived, and external-storage references.
- Specialist Tool Records: ID verification, open banking, product research, serviceability, valuation, LMI, credit check, and title/property search status references.
- Status Events and Integration Errors: append-only external status history, normalized stage mapping, and sync exception handling.

The BrokerEngine contact workbook supplied for planning contains the contact columns that should drive the first contact import template: names, preferred name, phone/email fields, home/postal/office address fields, spouse/referred-by/company/broker references, review dates, tags, source creation date, Flex Contact Id, and BrokerEngine ID.

The BrokerEngine board screenshots supplied for planning show useful operational patterns to reproduce in Brandroll: grouped board navigation, stage-numbered lead boards, collapsed columns, card-level owner/source/due-date indicators, and guarded bulk edits for review date, source, role, brand, broker, and referred-by fields.

The latest list-view and column-settings screenshots add another requirement: list view should expose configurable deal/application/referral/role fields, while kanban view should show a compact card. Kanban stages should default to expanded only when they contain cards/opportunities, with empty stages collapsed so active work remains visible.

## Board Strategy

Twenty should be configured with multiple boards/views so each team works from a focused queue:

- Lead Intake Board.
- Fact Find Board.
- Document Collection Board.
- BID and Compliance Board.
- Credit Proposal Board.
- Lodgement Preparation Board.
- Lodged Application Status Board.
- Conditions Board.
- Valuation and LMI Board.
- Settlement Board.
- Post-Settlement Review Board.
- Integration Exceptions Board.

This is intentionally closer to BrokerEngine-style operational boards than a single generic sales pipeline. Each board should have clear ownership, entry criteria, exit criteria, task automation, and reporting.

Bulk edit should be available only for approved operational fields and must include explicit field selection, confirmation, permission checks, audit logging, and a separate `Allow empty to clear this field` safeguard.
Stage-changing bulk edits must also ask whether to trigger workflows in bulk, because moving many board records can create tasks, reminders, and downstream status changes.

## Implementation Roadmap

1. Confirm access
   - Confirm exact LIXI development licence permissions.
   - Obtain AFG, BrokerEngine, ApplyOnline, AFG Flex, and specialist-provider API documentation, sandbox access, credentials, webhook details, and rate limits.
   - Confirm whether AFG, BrokerEngine, or both will be used in the first release.

2. Configure Twenty foundation
   - Deploy self-hosted Twenty in a secure development environment using the Docker baseline in `docker-compose.yml`.
   - Configure users, roles, permissions, email/calendar sync, API keys, and audit expectations.
   - Rename or present the standard people/person concept as `Contacts` for staff.
   - Configure custom objects and fields from the data model in this pack.

3. Configure boards and fact find
   - Build the board/view structure from `pipeline-and-board-configuration.md`.
   - Build the section-based fact find from `fact-find-configuration.md`.
   - Ensure fact find completion drives workflow readiness rather than relying on free-text notes.

4. Build client portal foundation
   - Build a chat-style portal and dashboard that reads/writes through the backend integration layer, with Twenty as the CRM/workflow record.
   - Support guided fact find, field-level autosave, document checklist, secure messages, application status, task requests, consent capture, and specialist-tool launch/return flows.
   - Keep the portal independent from any single lodgement platform so ApplyOnline or AFG Flex can be added later.

5. Build CRM workflow layer
   - Configure Twenty as the internal loan origination workspace with boards, task templates, views, stages, credit proposal records, and workflow automations.
   - Support broker/processor/admin work for packaging, compliance, credit proposal preparation, lender conditions, settlement tracking, and review tasks.
   - Keep sensitive documents in the authorised external portal unless an approved storage design is confirmed.
   - Use document metadata and external references inside Twenty.

6. Build integration layer
   - Implement API jobs/webhooks to sync portal activity, contacts, deals, tasks, notes, statuses, document metadata, and key application events.
   - Integrate specialist providers for ID verification, open banking, product research, and other point solutions using reference/status records in Twenty.
   - Prefer direct APIs, webhooks, polling fallbacks, and approved vendor integrations over Zapier.
   - Use ZAP/BrokerEngine documentation to infer practical field mappings and interim workaround steps, without making Zapier the core integration layer.
   - Use an explicit ownership matrix so each field has one primary system of record.
   - Add retry, reconciliation, and audit logging from day one.

7. Validate with development-only LIXI assets
   - Use LIXI development licence materials to test conceptual mapping and payload readiness.
   - Lock the exact CAL/EGB/Master Schema and supporting standard versions used for each prototype.
   - Use LIXI validation/conversion tooling only within the development licence boundary.
   - Do not publish, redistribute, or use restricted schema/sample content in production documentation.
   - Treat ApplyOnline/AFG Flex injection and direct lender lodgement as later phases requiring vendor approval, production licensing, aggregator permissions, and certification where applicable.

8. Pilot with real users
   - Run a small deal set through lead, fact find, application preparation, submission tracking, conditional approval, formal approval, settlement, and post-settlement review.
   - Reconcile client portal, Twenty, specialist tools, and AFG/BrokerEngine/ApplyOnline/AFG Flex status data for accuracy and operational usability.

## Source List

Public source material used to frame this pack:

- LIXI Standards: https://lixi.org.au/lixi-standards/
- LIXI Credit Applications for Australia (CAL): https://lixi.org.au/lixi-standard/credit-applications-for-australia-cal/
- LIXI Electronic Guidebooks (EGB): https://lixi.org.au/lixi-electronic-guidebooks/
- LIXI2 Documentation overview: https://lixi.org.au/lixi2-documentation/
- LIXI downloads page: https://lixi.org.au/lixi-standards/downloads/
- Twenty API documentation: https://docs.twenty.com/developers/api-and-webhooks/api
- Twenty key features: https://docs.twenty.com/getting-started/key-features
- BrokerEngine public product information: https://brokerengine.com.au/
- BrokerEngine feature information: https://brokerengine.com.au/features/
- OpnForm technical documentation: https://docs.opnform.com/
- OpnForm API form retrieval: https://docs.opnform.com/api-reference/forms/get-form
- OpnForm API form creation: https://docs.opnform.com/api-reference/forms/create-form
- OpnForm API access tokens: https://help.opnform.com/en/article/how-to-use-opnforms-api-155yhdg/
- OpnForm GitHub repository: https://github.com/OpnForm/OpnForm
- Form.io form components: https://help.form.io/userguide/forms/form-building/form-components
- Form.io basic components: https://help.form.io/userguide/forms/form-building/form-components/basic-components
- Form.io component settings: https://help.form.io/userguide/forms/form-building/form-components/component-settings
- Form.io data components: https://help.form.io/userguide/forms/form-building/form-components/data-components
- Form.io layout components: https://help.form.io/userguide/forms/form-building/form-components/layout-components
- BrokerEngine contact workbook supplied by Brandroll: `contact.xlsx` header structure only.
- ApplyOnline / NextGen digital lodgement: https://nextgen.net/digital-lodgement/
- ApplyOnline platform overview: https://nextgen.net/applyonline/
- AFG Flex: https://www.afgonline.com.au/flex/
- LIXI release history: https://lixi.org.au/lixi-standards/downloads/history/
- LIXI Python package: https://pypi.org/project/lixi/
- LIXI Python package announcement: https://lixi.org.au/the-python-lixi-package/
- Loan Market MyCRM API sample: https://github.com/loanmarket/mycrm-api-sample
