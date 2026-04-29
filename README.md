# Brandroll Broker CRM Setup Pack

## Objective

This repository is the setup and implementation pack for a self-hosted Twenty CRM configured for Australian mortgage broking. It treats LIXI as the reference lending data model, positions Twenty as the internal broker operations application, and plans a chat-style client portal plus dashboard as the borrower-facing experience.

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
- The workspace needs multiple board-style work queues, not a single linear pipeline.
- Specialist external tools will be used for ID verification, open banking, product research, serviceability, valuation, LMI, credit checks, title/property searches, and other mortgage workflow functions where appropriate.
- Zapier is not preferred for the target architecture. BrokerEngine Zapier/ZAP documentation can still inform field names, board concepts, event concepts, status handling, and temporary workaround design while direct API access is confirmed.
- AFG, BrokerEngine, ApplyOnline, AFG Flex, and specialist tool API documentation, credentials, sandbox details, and object models must still be confirmed.
- Twenty will not directly inject into ApplyOnline, AFG Flex, or lender systems unless production licensing, certification, aggregator permissions, vendor approval, and lender requirements are confirmed.

## Documentation Index

- [Twenty CRM First Docker Deployment](./DEPLOYMENT.md)
- [Application Configuration Guide](./application-configuration-guide.md)
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
- [Implementation Backlog](./implementation-backlog.md)

## Application Shape

The first usable internal application should include:

- Contacts: borrowers, co-borrowers, guarantors, referrers, professional contacts, lender contacts, and broker contacts.
- Organisations: employers, self-employed businesses, trusts, lenders, referral firms, accounting firms, conveyancers, and broker entities.
- Opportunities/Deals: the top-level commercial opportunity and sales pipeline record.
- Mortgage Applications: the structured application package tied to a deal.
- Fact Find Sessions: section-based applicant and household capture with completion scoring and review status.
- Credit Proposals: internal recommendation, product selection, policy exception, risk, mitigant, and approval work.
- Document Metadata: checklist, request, received, verified, expired, waived, and external-storage references.
- Specialist Tool Records: ID verification, open banking, product research, serviceability, valuation, LMI, credit check, and title/property search status references.
- Status Events and Integration Errors: append-only external status history, normalized stage mapping, and sync exception handling.

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
   - Support guided fact find, document checklist, secure messages, application status, task requests, consent capture, and specialist-tool launch/return flows.
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
- ApplyOnline / NextGen digital lodgement: https://nextgen.net/digital-lodgement/
- ApplyOnline platform overview: https://nextgen.net/applyonline/
- AFG Flex: https://www.afgonline.com.au/flex/
- LIXI release history: https://lixi.org.au/lixi-standards/downloads/history/
- LIXI Python package: https://pypi.org/project/lixi/
- LIXI Python package announcement: https://lixi.org.au/the-python-lixi-package/
- Loan Market MyCRM API sample: https://github.com/loanmarket/mycrm-api-sample
