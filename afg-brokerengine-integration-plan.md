# AFG, BrokerEngine, ApplyOnline, and AFG Flex Integration Plan

## Integration Positioning

Twenty is the CRM, loan origination management, workflow board, credit proposal, document/status metadata, and reporting backend. The client portal is the borrower-facing chat/dashboard experience. Specialist tools handle ID verification, open banking, product research, serviceability, valuations, LMI, and similar point functions.

The preferred future lodgement path is direct injection into ApplyOnline. AFG Flex is the fallback or alternate lodgement path if direct ApplyOnline integration is not available, not approved, or not suitable for the first release. AFG and/or BrokerEngine remain relevant operational platforms for current broker workflows, document handling, task/status visibility, and transitional integration.

The first integration release should prioritize reliable sync and operational clarity over deep LIXI payload generation. LIXI remains the reference data/message model for field grouping and development validation, but the production integration path must be confirmed through the approved vendor and aggregator channels.

The reviewed AFG ZAP Confluence space is BrokerEngine Zapier integration documentation. Zapier is not preferred for this project and should not become the target architecture unless explicitly approved as a temporary fallback. The information in the ZAP documentation is still useful for understanding BrokerEngine field names, trigger concepts, board/stage references, dates, URLs, lender/application identifiers, and workflow workarounds while direct APIs are being confirmed.

## Required API Information

Request from AFG, BrokerEngine, ApplyOnline/NextGen, AFG Flex, and selected specialist providers:

- API documentation.
- Sandbox or development environment access.
- Authentication method.
- Token/key rotation process.
- Rate limits.
- Webhook support and event catalogue.
- Object model for contacts, deals, applications, lenders, products, notes, tasks, documents, statuses, conditions, valuations, ID verification, open banking, product research, fact-find sections, boards, stages, and settlement.
- Create/update/delete behavior.
- Idempotency support.
- Pagination and filtering.
- Error model.
- Audit/event logs.
- Data retention and privacy terms.
- Document storage and link expiry behavior.
- Support for custom fields or external IDs.
- Notes/tasks sync capability.
- Board, stage, status, and task ownership sync capability.
- Fact-find read/write capability, if available.
- Status history availability.
- Certification, conformance, or partner approval requirements for ApplyOnline or AFG Flex injection.
- Whether write APIs support draft application creation, update, validation, and final submission.

## System Ownership Matrix

| Data area | Initial owner | Sync mode | Notes |
| --- | --- | --- | --- |
| Contact basics | Twenty | Bidirectional if API permits | Twenty manages relationship view; external IDs required. Twenty internal `Person` records should be labelled as Contacts in staff-facing docs and views. |
| Organisations/referral partners | Twenty | Optional outbound | Lenders may be reference-only from external platform. |
| Deal | Twenty | Create/update external deal if supported | If BrokerEngine/AFG creates deals first, import to Twenty and map to the normalized deal. |
| Mortgage application | Twenty before lodgement; ApplyOnline/AFG Flex after injection | Inbound status sync after lodgement | Preferred future target is ApplyOnline. |
| Fact Find Session | Twenty/portal | Outbound summary if external API supports it | Chat-style portal writes structured fact-find data into Twenty. External tools can receive mapped data after review. |
| Fact Find Sections | Twenty/portal | Outbound field-group mapping after review | Keep granular completion status in Twenty; do not expose restricted LIXI schema details in public docs. |
| Workflow boards/stages | Twenty | Inbound status can move board cards or create tasks | Twenty owns staff workflow boards; external platform statuses are normalized into board actions. |
| Broker/processor assignment | Twenty | Outbound if supported | External assignment must be reconciled. |
| Notes | Twenty by default | Bidirectional only if stable | Avoid duplicate note loops with source IDs. |
| Tasks | Twenty for CRM tasks | Optional external sync | External lodgement tasks can be reference-only. |
| Document metadata | Portal/document provider/external platform | Bidirectional status sync | Do not duplicate document binaries by default. |
| Document binary files | Portal/document provider/external platform | No sync to Twenty by default | Store links/references only unless approved. |
| ID verification | Specialist provider | Inbound summary/reference | Store high-level status and evidence reference only. |
| Open banking | Specialist provider | Inbound summary/reference | Store consent/session/status and approved summaries only. |
| Product research | Specialist provider/Twenty | Inbound summary/reference | Broker-approved shortlist can be exposed to client portal. |
| Credit proposal | Twenty | Reference or outbound summary after approval | Use reviewed fact-find, product research, serviceability, and broker rationale. |
| Status events | ApplyOnline/AFG Flex/AFG/BrokerEngine | Inbound append-only | Preserve raw and normalized status. |
| Conditions | ApplyOnline/AFG Flex/AFG/BrokerEngine for lender conditions | Inbound, then task creation | Internal packaging conditions can be Twenty-owned. |
| Serviceability | Specialist calculator/platform | Inbound summary/reference | Store report reference and summary only. |
| Valuation | External platform/provider | Inbound summary/reference | Link to property/security. |
| LMI | External platform/provider | Inbound summary/reference | Store quote/approval status. |
| Settlement | Mixed | Inbound status plus Twenty tasks | Twenty coordinates internal follow-up. |
| Reporting | Twenty | Internal | Use normalized fields and derived metrics. |
| BrokerEngine Zapier events | BrokerEngine/Zapier | Reference/workaround input | Use documentation for field/event mapping and controlled fallbacks; do not make Zapier the primary architecture. |

The supplied BrokerEngine contact workbook gives an initial contact import shape with name, preferred name, phone/email, address, spouse, review dates, lead source, company, broker, brand, tags, referred-by, source-created date, Flex Contact Id, and BrokerEngine ID fields. Use `brokerengine-contact-import-mapping.md` as the first contact import reference while direct BrokerEngine and AFG Flex APIs are being confirmed.

## Board and Stage Integration Strategy

Twenty should have multiple operational boards instead of one overloaded pipeline. External statuses should not directly overwrite staff workflow without normalization.

Recommended board behavior:

- Lead intake, fact find, document collection, BID/compliance, credit proposal, lodgement preparation, lodged status, conditions, valuation/LMI, settlement, post-settlement review, and integration exceptions are separate boards.
- Each board card links back to the same Mortgage Application and Deal.
- Each board has its own owner, due date, SLA, blockers, and exit criteria.
- A single normalized application lifecycle field summarizes overall progress for reporting and portal display.
- External status events from ApplyOnline, AFG Flex, AFG, BrokerEngine, or specialist tools create append-only Status Event records first.
- A mapper then updates the relevant board card, creates a task, or routes the event to the Integration Exceptions board.
- Unknown external statuses must not silently move a loan; they should create an exception task for review.

## BrokerEngine-Style Fact Find Strategy

The portal should collect structured data through a chat-like experience, but Twenty should store it as a reviewable fact-find model.

Recommended fact-find behavior:

- Create one active Fact Find Session per application, with versioning for material updates.
- Store each major section as a Fact Find Section record with completion, last activity, reviewed by, and readiness fields.
- Maintain borrower-friendly progress in the portal and operational review status in Twenty.
- Use fact-find completion gates before BID/compliance, credit proposal, and lodgement preparation.
- Allow broker change requests per section rather than reopening the entire intake.
- After broker review, map fact-find field groups to mortgage application, loan requirement, applicants, income, expenses, assets, liabilities, and property/security records.
- Only map to ApplyOnline/AFG Flex or BrokerEngine once the fact-find data has passed review and required consents are captured.

## Integration Architecture

Recommended components:

- Twenty API key for CRM record reads/writes.
- Portal backend API with authenticated client sessions.
- External API credentials for specialist tools, AFG/BrokerEngine, ApplyOnline, and/or AFG Flex.
- Sync service or worker process hosted alongside the self-hosted Twenty stack.
- Persistent mapping table for external IDs and sync cursors.
- LIXI validation/conversion component for development and approved lodgement prototypes.
- Direct API/webhook adapters for approved systems. Avoid Zapier for the target architecture.
- ZAP-informed mapping notes to help design direct API payloads, polling jobs, manual reconciliation, and temporary operational workarounds.
- Webhook receiver for external events if supported.
- Scheduled polling fallback if webhooks are unavailable.
- Dead-letter/error queue for failed sync items.
- Admin reconciliation report.

## Identity and Matching

Use deterministic matching in this order:

1. External system ID already stored in Twenty.
2. Shared application/deal reference.
3. Email plus mobile for contacts.
4. Name plus date of birth only if privacy-approved and necessary.
5. Manual review queue.

Never silently merge ambiguous contacts, applicants, or households. Create a manual review task instead.

## Event Handling

For inbound events:

1. Validate source and authentication.
2. Check idempotency key or external event ID.
3. Store raw status label and source timestamp.
4. Map to normalized Twenty lifecycle status.
5. Decide whether a board card should move, a task should be created, or an exception should be raised.
6. Update application summary fields.
7. Create/update tasks for conditions, missing documents, stale fact-find sections, or exceptions.
8. Log sync result.

Back-channel design should follow the pattern seen across LIXI-based industry integrations: keep validation, lodgement, and status/event handling separate, and treat incoming external updates as append-only events that update summarized application status after processing.

For outbound events:

1. Confirm field ownership allows outbound update.
2. Confirm fact-find and compliance gates have passed when sending application data.
3. Validate required external fields.
4. Send request with idempotency key where supported.
5. Store external ID/reference.
6. Record error and retry if failed.

## Authentication Placeholders

Do not hard-code credentials. Use environment variables or secret manager entries:

- `TWENTY_API_BASE_URL`
- `TWENTY_API_KEY`
- `AFG_API_BASE_URL`
- `AFG_CLIENT_ID` or `AFG_API_KEY`
- `AFG_CLIENT_SECRET` or token equivalent
- `BROKERENGINE_API_BASE_URL`
- `BROKERENGINE_API_KEY`
- `BROKERENGINE_WEBHOOK_SECRET`
- `APPLYONLINE_API_BASE_URL`
- `APPLYONLINE_CLIENT_ID` or approved credential equivalent
- `APPLYONLINE_CLIENT_SECRET` or token equivalent
- `AFG_FLEX_API_BASE_URL`
- `AFG_FLEX_CLIENT_ID` or approved credential equivalent
- `AFG_FLEX_CLIENT_SECRET` or token equivalent
- `IDV_PROVIDER_API_BASE_URL`
- `IDV_PROVIDER_API_KEY`
- `OPEN_BANKING_API_BASE_URL`
- `OPEN_BANKING_CLIENT_ID`
- `OPEN_BANKING_CLIENT_SECRET`
- `PRODUCT_RESEARCH_API_BASE_URL`
- `PRODUCT_RESEARCH_API_KEY`
- `SYNC_ENCRYPTION_KEY`

Exact names can change during implementation, but secrets must not be stored in Markdown, source code, or Git.

## Failure Handling

Required failure states:

- Authentication failed.
- Rate limited.
- External API unavailable.
- Validation failed.
- Duplicate match candidate.
- Missing required external field.
- Stale update conflict.
- Document link expired.
- Unknown external status.
- Unknown board or stage mapping.
- Fact-find section incomplete or unreviewed.
- Specialist provider consent expired.
- ApplyOnline/AFG Flex validation failed.
- Draft application rejected before submission.
- LIXI schema validation failed.
- LIXI business-rule validation failed.
- BrokerEngine Zapier API key expired or rotated, only if fallback use is approved.
- BrokerEngine/Zapier date-time parsing failed, only if fallback use is approved.

For each failure:

- Log source system, object type, external ID, timestamp, and safe error summary.
- Avoid logging sensitive payloads unless approved.
- Retry transient errors with backoff.
- Create a Twenty admin task for manual intervention when needed.
- Route unresolved sync failures to the Integration Exceptions board.
- Preserve failed event IDs so they can be replayed.

## Unknowns To Resolve

- Which AFG platform/API is in use and whether it exposes broker CRM sync endpoints suitable for this project.
- Whether BrokerEngine exposes a direct API, partner API, Zapier/Make path, or only selected platform integrations.
- Whether BrokerEngine exposes boards, stages, tasks, fact-find data, documents, or contacts through an API.
- Whether ApplyOnline direct injection is available for this business, and the required partner/certification path.
- Whether AFG Flex exposes a suitable integration path for draft application creation, validation, lodgement, and status retrieval.
- Whether either platform supports webhooks for status changes.
- Whether deal creation should start in Twenty or external platform.
- Whether fact-find data can be sent as structured data, attached summaries, or only manual reference material.
- Whether documents are accessible as durable secure links.
- Whether notes/tasks can sync without creating duplicates.
- Whether external APIs expose enough data to map to LIXI-informed field groups.
- Whether sandbox data can use LIXI development materials.
- Which specialist providers will be selected for ID verification, open banking, product research, serviceability, valuation, and LMI.
- Which ZAP-documented fields, events, and actions can safely inform direct API mapping, manual reconciliation, or temporary fallback workflows without making Zapier the target architecture.
