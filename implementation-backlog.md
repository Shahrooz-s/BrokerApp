# Implementation Backlog

This backlog prepares the Brandroll broker CRM for a self-hosted Twenty deployment used as the operational backend for Australian mortgage broking. The application language should call borrowers, referrers, partners, and other individuals **Contacts**. Twenty may still expose the internal `Person` object in metadata/API layers; staff-facing labels, documentation, views, and portal copy should use `Contact` wherever the product allows.

## Milestone 1: Repository and Project Setup

- Use `Brandroll/brandroll-crm` as the primary application repository.
- Keep setup documentation, deployment overlays, and implementation notes in source control.
- Create branch naming convention using `codex/` for implementation branches.
- Add `.gitignore` coverage for local env files, credentials, exports, and generated sensitive artifacts.
- Create issue labels: `twenty`, `portal`, `integration`, `lixi`, `compliance`, `security`, `data-model`, `workflow`, `fact-find`, `applyonline`, `afg-flex`.
- Keep restricted LIXI schemas, samples, credentials, and licensed vendor documentation out of public Git unless the licence explicitly allows it.

## Milestone 2: Twenty Development Environment

- Deploy a self-hosted Twenty development instance with Docker.
- Configure admin account and initial users.
- Configure domain/TLS for development.
- Configure database backups.
- Configure logging and monitoring.
- Create API key or service account for integration testing.
- Document local, staging, and production environment URLs.
- Confirm the Twenty version and extension approach before building custom object automation.

## Milestone 3: Twenty Core CRM Configuration

- Configure `People` as staff-facing `Contacts` wherever labels/views allow.
- Configure `Companies` as `Organisations` for lenders, referral partners, employers, trusts, and business applicants.
- Configure `Opportunities` as `Deals` for commercial pipeline reporting.
- Add ownership fields for broker, processor, credit reviewer, compliance reviewer, and settlement owner.
- Add lead source, referral source, channel, campaign, and aggregator fields.
- Add BrokerEngine contact import fields from `brokerengine-contact-import-mapping.md`, including `brokerEngineContactId`, `afgFlexContactId`, review dates, preferred name, phone variants, source-created date, and raw relationship fields.
- Create borrower-friendly status labels separate from internal workflow stages.
- Test contact-to-deal-to-application creation flow.
- Confirm permissions for brokers, processors, reviewers, admins, and read-only reporting users.

## Milestone 4: Multi-Board Workflow Foundation

- Create the board model described in `pipeline-and-board-configuration.md`.
- Configure separate boards for lead intake, fact find, document collection, BID/compliance, credit proposal, lodgement preparation, lodged status, conditions, valuation/LMI, settlement, post-settlement review, and integration exceptions.
- Define each board stage, owner, entry criteria, exit criteria, SLA, and automation trigger.
- Configure views for broker workload, processor workload, compliance queue, stuck applications, settlement watchlist, and exception recovery.
- Ensure a loan can be active on multiple operational boards without losing its single normalized lifecycle stage.
- Add roll-up reporting fields for current board, current stage, blockers, SLA breach, and next action.
- Configure BrokerEngine-inspired lead board stages, collapsed-column behavior where supported, card fields, and board group navigation from `brokerengine-board-and-bulk-edit-reference.md`.

## Milestone 4A: Controlled Bulk Edit

- Confirm whether the deployed Twenty version supports native multi-record bulk edit for board/table selections.
- If native behavior is sufficient, restrict bulk edit to approved operational fields.
- If native behavior is not sufficient, build a controlled admin bulk-edit action through the integration layer.
- Support first-release bulk edits for Next Review On, Lead Source, Contact Role, Broker Brand, Broker, Referred By, Tags, Stage Due Date, Processor Owner, and Priority.
- Require explicit selected fields, confirmation, permission checks, and audit logging.
- Require a separate `Allow empty to clear this field` confirmation before clearing values.
- Block bulk overwrite of external IDs, raw external statuses, source-created dates, consent evidence, verification outcomes, open banking summaries, and restricted compliance fields.
- Route failed bulk edit records to the Integration Exceptions board.

## Milestone 5: Mortgage Origination Objects

- Create Mortgage Application object.
- Create Household object.
- Create Fact Find Session object.
- Create Fact Find Section object.
- Create Employment, Income, Expense, Asset, and Liability objects.
- Create Loan Requirement object.
- Create Property/Security object.
- Create Document metadata object.
- Create Condition and Status Event objects.
- Create Valuation, LMI, Serviceability, Product Research, and Compliance Check objects.
- Create Integration Error Log object.
- Add external ID fields for portal, BrokerEngine, AFG, ApplyOnline, AFG Flex, and specialist tools.

## Milestone 6: BrokerEngine-Style Fact Find

- Implement the fact-find model in `fact-find-configuration.md`.
- Create fact-find sections for applicants, co-applicants, household, goals, employment, income, expenses, assets, liabilities, properties/securities, documents, consent, and declarations.
- Track section status: not started, in progress, client submitted, broker reviewing, changes requested, complete, not required.
- Track completion percentage, missing mandatory fields, last client activity, broker review status, and readiness for BID/compliance.
- Create a fact-find board with stages for not started, client in progress, broker review, changes requested, complete, and stale.
- Connect the chat-style client portal to the same fact-find session records instead of maintaining a separate hidden intake model.
- Preserve fact-find history and staff review notes for audit and credit proposal preparation.

## Milestone 7: Credit Proposal Workspace

- Create Credit Proposal object.
- Add draft, broker review, credit review, approved, revised, archived, and declined statuses.
- Link proposal to Mortgage Application, Deal, Product Reference, Serviceability, Documents, Fact Find Session, Conditions, and Tasks.
- Add recommendation rationale, policy exceptions, risks, mitigants, assumptions, pricing notes, and approval fields.
- Create views for draft proposals, proposals awaiting review, proposals with missing evidence, and approved proposals awaiting lodgement.
- Ensure credit proposal output can later map to approved ApplyOnline/AFG Flex/lender lodgement requirements without embedding restricted schema content.

## Milestone 8: Client Portal Foundation

- Select portal framework and hosting pattern.
- Implement client authentication.
- Implement chat-style intake shell.
- Implement client dashboard shell.
- Implement portal-to-Twenty record creation for lead, contact, deal, mortgage application, and initial fact-find session.
- Implement client-friendly status mapping from Twenty.
- Show dashboard progress for fact find, documents, ID verification, open banking, serviceability, product shortlist, approval, settlement, and review.
- Avoid duplicate sensitive document storage unless approved; prefer secure links and document metadata in Twenty.

## Milestone 9: Specialist Tool Integration Preparation

- Select ID verification provider.
- Select open banking provider.
- Select product research/serviceability provider.
- Confirm valuation/LMI/title provider approach.
- Capture API docs, sandbox access, consent model, webhook support, and data retention terms for each provider.
- Create provider-neutral interface assumptions before coding adapters.
- Define what status and summary data is safe to show in the client portal.

## Milestone 10: Integration Layer

- Build portal-to-Twenty API adapter.
- Build provider status/reference records in Twenty.
- Build a controlled BrokerEngine contact import path using the supplied contact workbook structure before any broader BrokerEngine data migration.
- Use direct APIs/webhooks/polling fallbacks for integrations; do not build Zapier into the target architecture.
- Use BrokerEngine ZAP/Zapier trigger field mapping as available discovery material for direct API mapping, reconciliation, and interim workaround design.
- Only use actual Zapier execution if a controlled temporary fallback is explicitly approved.
- Build webhook receiver.
- Build polling fallback where webhooks are unavailable.
- Build external ID mapping table.
- Build Integration Error Log writing.
- Build retry/reconciliation process.
- Build append-only back-channel status/event handling.
- Add date/time normalization for direct API payloads and any explicitly approved fallback payloads.
- Add rate limit and pagination handling patterns for external APIs.
- Add board/stage reconciliation jobs so external status changes move the correct workflow board card or create a review task.

## Milestone 11: ApplyOnline and AFG Flex Feasibility

- Request access to the AFG ZAP Confluence space or exported ZAP documentation.
- Review ZAP authentication, endpoint, validation, lodgement, document, status, webhook/back-channel, and error documentation where available.
- Treat reviewed ZAP content as BrokerEngine Zapier automation documentation, not direct ApplyOnline or AFG Flex lodgement documentation.
- Mark Zapier as not preferred for the target architecture, while using available ZAP information for mapping and workaround planning.
- Confirm ApplyOnline direct injection availability with NextGen or the relevant partner channel.
- Confirm required certification/conformance pathway.
- Confirm whether draft creation, validation, submission, and status retrieval are supported.
- Confirm AFG Flex API/integration availability as alternate route.
- Map Twenty application/proposal/fact-find fields to the approved lodgement target at a field-group level first.
- Build proof of concept only in sandbox/approved test environment.

## Milestone 12: LIXI Development Mapping

- Confirm exact LIXI development licence scope.
- Access CAL and EGB development materials.
- Lock exact Master Schema and transaction schema versions for each prototype.
- Perform internal field-group mapping against Twenty and ApplyOnline/AFG Flex requirements.
- Evaluate the official `lixi` Python package for development validation, XML/JSON conversion, and path analysis.
- Add validation checks for schema and business-rule failures where licensed materials permit.
- Keep restricted schemas, samples, and detailed schema extracts out of public docs and Git unless licence permits.
- Validate non-production payload assumptions with development-only assets.

## Milestone 13: Reference Pattern Review

- Review Loan Market MyCRM API sample for OAuth/scopes, JSON:API patterns, pagination, filtering, field selection, webhooks, and rate limiting.
- Review any available Loan Market lodgement sample for validation/lodgement/back-channel architecture patterns.
- Review Salestrekker public material for LIXI2 mapping, open banking, property/living expense handling, and back-channel status flow patterns.
- Review Green Mortgage Lawyers LIXI2 DAS guide for document preparation, settlement, and legal workflow patterns.
- Review BrokerEngine workflows for board/stage naming, fact-find expectations, task ownership, document follow-up, and status handling.
- Convert useful findings into internal implementation rules; do not assume API access, licensing rights, or vendor compatibility from competitor examples.

## Milestone 14: Pilot and UAT

- Run internal staff pilot using dummy data.
- Run borrower portal pilot using test users.
- Test end-to-end flow: lead, contact, fact find, specialist checks, document metadata, credit proposal, ready for lodgement, conditions, settlement, review.
- Test every operational board and board-to-board transition.
- Test fact-find save/resume, change requests, broker review, completion gates, and audit notes.
- Test role permissions.
- Test integration error handling.
- Test privacy boundaries for client-facing dashboard.

## Milestone 15: Production Readiness

- Complete security review.
- Complete privacy review.
- Confirm production licences and vendor approvals.
- Confirm ApplyOnline, AFG Flex, AFG, BrokerEngine, and specialist provider approvals before enabling production writes.
- Confirm data retention policy.
- Confirm support process and escalation owners.
- Confirm backup/restore test.
- Confirm integration monitoring.
- Confirm staff training.
- Confirm go-live rollback process.
