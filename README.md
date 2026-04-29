# LIXI + Twenty CRM Mortgage Setup Research Pack

## Objective

This pack prepares for a self-hosted Twenty CRM setup for an Australian residential mortgage broking business. It treats LIXI as the reference model for lending data and mortgage workflow messages, uses Twenty as the internal CRM/backend application for loan origination management, credit proposal preparation, task management, and operational workflow, and plans a chat-style online client portal plus client dashboard as the borrower-facing experience.

The current preferred future lodgement path is direct injection into ApplyOnline, with AFG Flex as the alternate path where direct ApplyOnline integration is not available or not approved. AFG/BrokerEngine remain relevant operational integration systems while this future-state lodgement path is confirmed.

The immediate goal is implementation readiness: define the CRM data model, workflows, integration ownership, licence constraints, and missing information needed before development.

## Audience

- CRM implementers configuring Twenty.
- Developers building API and webhook integrations.
- Mortgage brokerage operations staff defining process and compliance requirements.
- Business owners deciding whether Twenty should complement or replace parts of the existing workflow stack.

## Core Assumptions

- Market scope is Australian residential mortgage broking.
- The available LIXI access is a development licence only.
- Twenty is self-hosted and will be configured with custom objects, fields, views, workflows, REST/GraphQL APIs, and metadata APIs.
- Twenty will be the internal application for brokers/processors/admin users to manage origination, credit proposal work, compliance tasks, application packaging, status tracking, and post-settlement follow-up.
- A custom client portal will provide chat, borrower dashboard, guided fact find, document requests, status updates, and specialist-tool handoffs.
- Specialist external tools will be used for ID verification, open banking, product research, serviceability, valuation, LMI, and other mortgage workflow functions where appropriate.
- ApplyOnline is the preferred future lodgement target; AFG Flex is the fallback or alternate path.
- Zapier is not preferred for the target architecture. BrokerEngine Zapier documentation is retained for reference only and should not drive the main integration design.
- AFG, BrokerEngine, ApplyOnline, AFG Flex, and specialist tool API documentation, credentials, sandbox details, and object models must still be confirmed.
- Twenty will not directly inject into ApplyOnline, AFG Flex, or lender systems unless production licensing, certification, aggregator permissions, vendor approval, and lender requirements are confirmed.

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

## Documentation Index

- [LIXI Standards Overview](./lixi-standards-overview.md)
- [Twenty CRM Data Model](./twenty-crm-data-model.md)
- [LIXI to Twenty Mapping](./lixi-to-twenty-mapping.md)
- [LIXI Tooling and Reference Implementations](./lixi-tooling-and-reference-implementations.md)
- [Client Portal and Dashboard Architecture](./client-portal-and-dashboard-architecture.md)
- [Twenty CRM Setup Plan](./twenty-crm-setup-plan.md)
- [AFG and BrokerEngine Integration Plan](./afg-brokerengine-integration-plan.md)
- [AFG ZAP Confluence Access Plan](./afg-zap-confluence-access-plan.md)
- [AFG ZAP / BrokerEngine Zapier Review](./afg-zap-review.md)
- [Workflow Automation Plan](./workflow-automation-plan.md)
- [Licence and Readiness Checklist](./licence-and-readiness-checklist.md)
- [Implementation Backlog](./implementation-backlog.md)

## Implementation Roadmap

1. Confirm access
   - Confirm exact LIXI development licence permissions.
   - Obtain AFG and/or BrokerEngine API documentation, sandbox access, credentials, webhook details, and rate limits.
   - Confirm whether AFG, BrokerEngine, or both will be used in the first release.

2. Configure Twenty foundation
   - Deploy self-hosted Twenty in a secure development environment.
   - Configure users, roles, permissions, email/calendar sync, API keys, and audit expectations.
   - Create custom objects and fields from the data model in this pack.
   - Follow the setup sequence in `twenty-crm-setup-plan.md` so core CRM, origination objects, credit proposal workspace, specialist-tool records, views, automations, and integrations are built in order.

3. Build client portal foundation
   - Build a chat-style portal and client dashboard that reads/writes through the backend integration layer, with Twenty as the CRM/workflow record.
   - Support guided fact find, document checklist, secure messages, application status, task requests, consent capture, and specialist-tool launch/return flows.
   - Keep the portal independent from any single lodgement platform so ApplyOnline or AFG Flex can be added later.

4. Build CRM workflow layer
   - Configure Twenty as the internal loan origination workspace with pipelines, views, stages, credit proposal records, task templates, and workflow automations.
   - Support broker/processor/admin work for packaging, compliance, credit proposal preparation, lender conditions, settlement tracking, and review tasks.
   - Keep sensitive documents in the authorised external portal unless an approved storage design is confirmed.
   - Use document metadata and external references inside Twenty.

5. Build integration layer
   - Implement API jobs/webhooks to sync portal activity, contacts, deals, tasks, notes, statuses, document metadata, and key application events.
   - Integrate specialist providers for ID verification, open banking, product research, and other point solutions using reference/status records in Twenty.
   - Prefer direct APIs, webhooks, polling fallbacks, and approved vendor integrations over Zapier.
   - Use an explicit ownership matrix so each field has one primary system of record.
   - Add retry, reconciliation, and audit logging from day one.

6. Validate with development-only LIXI assets
   - Use LIXI development licence materials to test conceptual mapping and payload readiness.
   - Lock the exact CAL/EGB/Master Schema and supporting standard versions used for each prototype.
   - Use LIXI validation/conversion tooling only within the development licence boundary.
   - Do not publish, redistribute, or use restricted schema/sample content in production documentation.
   - Treat ApplyOnline/AFG Flex injection and direct lender lodgement as later phases requiring vendor approval, production licensing, aggregator permissions, and certification where applicable.

7. Pilot with real users
   - Run a small deal set through lead, fact find, application preparation, submission tracking, conditional approval, formal approval, settlement, and post-settlement review.
   - Reconcile client portal, Twenty, specialist tools, and AFG/BrokerEngine/ApplyOnline/AFG Flex status data for accuracy and operational usability.

## GitHub Preparation

When the target GitHub repository is confirmed, add this documentation pack to source control and convert the implementation backlog into GitHub issues or project tasks. Suggested initial labels are `twenty`, `portal`, `integration`, `lixi`, `compliance`, `security`, `data-model`, and `workflow`.
