# Implementation Backlog

## Milestone 1: Repository and Project Setup

- Create GitHub repository or connect this workspace to the intended existing repo.
- Add documentation pack to source control.
- Create branch naming convention using `codex/` for implementation branches.
- Add `.gitignore` for local env files, credentials, exports, and generated sensitive artifacts.
- Create issue labels: `twenty`, `portal`, `integration`, `lixi`, `compliance`, `security`, `data-model`, `workflow`.

## Milestone 2: Twenty Development Environment

- Deploy self-hosted Twenty development instance.
- Configure admin account and initial users.
- Configure domain/TLS for development.
- Configure database backups.
- Configure logging and monitoring.
- Create API key or service account for integration testing.
- Document local/staging/production environment URLs.

## Milestone 3: Twenty Core Configuration

- Configure People, Companies, and Opportunities for mortgage use.
- Add ownership fields for broker, processor, and reviewer.
- Add lead source and referral source fields.
- Create early pipeline stages.
- Create basic operational views.
- Test lead-to-opportunity workflow.

## Milestone 4: Mortgage Origination Objects

- Create Mortgage Application object.
- Create Household object.
- Create Employment, Income, Expense, Asset, and Liability objects.
- Create Loan Requirement object.
- Create Property/Security object.
- Create Document metadata object.
- Create Condition and Status Event objects.
- Create Integration Error Log object.

## Milestone 5: Credit Proposal Workspace

- Create Credit Proposal object.
- Add draft/review/approved/revised/archive statuses.
- Link proposal to Mortgage Application, Opportunity, Product Reference, Serviceability, Documents, and Tasks.
- Add recommendation rationale, policy exceptions, risks, mitigants, and approval fields.
- Create views for draft proposals and proposals awaiting review.

## Milestone 6: Client Portal Foundation

- Select portal framework and hosting pattern.
- Implement client authentication.
- Implement chat-style intake shell.
- Implement client dashboard shell.
- Implement portal-to-Twenty record creation for lead, person, opportunity, and initial mortgage application.
- Implement client-friendly status mapping from Twenty.

## Milestone 7: Specialist Tool Integration Preparation

- Select ID verification provider.
- Select open banking provider.
- Select product research/serviceability provider.
- Confirm valuation/LMI/title provider approach.
- Capture API docs, sandbox access, consent model, webhook support, and data retention terms for each provider.
- Create provider-neutral interface assumptions before coding adapters.

## Milestone 8: Integration Layer

- Build portal-to-Twenty API adapter.
- Build provider status/reference records in Twenty.
- Use direct APIs/webhooks/polling fallbacks for integrations; do not build Zapier into the target architecture.
- Keep BrokerEngine Zapier trigger field mapping as reference only unless a temporary fallback is explicitly approved.
- Build webhook receiver.
- Build polling fallback where webhooks are unavailable.
- Build external ID mapping table.
- Build Integration Error Log writing.
- Build retry/reconciliation process.
- Build append-only back-channel status/event handling.
- Add date/time normalization for direct API payloads and any explicitly approved fallback payloads.
- Add rate limit and pagination handling patterns for external APIs.

## Milestone 9: ApplyOnline and AFG Flex Feasibility

- Request access to the AFG ZAP Confluence space or exported ZAP documentation.
- Review ZAP authentication, endpoint, validation, lodgement, document, status, webhook/back-channel, and error documentation.
- Treat reviewed ZAP content as BrokerEngine Zapier automation documentation, not direct ApplyOnline or AFG Flex lodgement documentation.
- Mark Zapier as not preferred and out of scope for the target architecture.
- Confirm ApplyOnline direct injection availability with NextGen or the relevant partner channel.
- Confirm required certification/conformance pathway.
- Confirm whether draft creation, validation, submission, and status retrieval are supported.
- Confirm AFG Flex API/integration availability as alternate route.
- Map Twenty application/proposal fields to the approved lodgement target at a field-group level first.
- Build proof of concept only in sandbox/approved test environment.

## Milestone 10: LIXI Development Mapping

- Confirm exact LIXI development licence scope.
- Access CAL and EGB development materials.
- Lock exact Master Schema and transaction schema versions for each prototype.
- Perform internal field-group mapping against Twenty and ApplyOnline/AFG Flex requirements.
- Evaluate the official `lixi` Python package for development validation, XML/JSON conversion, and path analysis.
- Add validation checks for schema and business-rule failures where licensed materials permit.
- Keep restricted schemas, samples, and detailed schema extracts out of public docs and Git unless licence permits.
- Validate non-production payload assumptions with development-only assets.

## Milestone 10A: Reference Pattern Review

- Review Loan Market MyCRM API sample for OAuth/scopes, JSON:API patterns, pagination, filtering, field selection, webhooks, and rate limiting.
- Review any available Loan Market lodgement sample for validation/lodgement/back-channel architecture patterns.
- Review Salestrekker public material for LIXI2 mapping, open banking, property/living expense handling, and back-channel status flow patterns.
- Review Green Mortgage Lawyers LIXI2 DAS guide for document preparation, settlement, and legal workflow patterns.
- Convert useful findings into internal implementation rules; do not assume API access, licensing rights, or vendor compatibility from competitor examples.

## Milestone 11: Pilot and UAT

- Run internal staff pilot using dummy data.
- Run borrower portal pilot using test users.
- Test end-to-end flow: lead, fact find, specialist checks, document metadata, credit proposal, ready for lodgement, conditions, settlement, review.
- Test role permissions.
- Test integration error handling.
- Test privacy boundaries for client-facing dashboard.

## Milestone 12: Production Readiness

- Complete security review.
- Complete privacy review.
- Confirm production licences and vendor approvals.
- Confirm data retention policy.
- Confirm support process and escalation owners.
- Confirm backup/restore test.
- Confirm integration monitoring.
- Confirm staff training.
- Confirm go-live rollback process.
