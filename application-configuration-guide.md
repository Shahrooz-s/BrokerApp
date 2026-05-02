# Application Configuration Guide

## Purpose

This guide describes how the Brandroll Broker CRM should be configured as an application inside Twenty. It translates the research pack into practical setup choices for naming, navigation, objects, boards, roles, and borrower-facing portal alignment.

## Staff-Facing Terminology

Use mortgage broking language throughout the workspace.

| Preferred label | Twenty/internal concept | Notes |
| --- | --- | --- |
| Contacts | People / Person | Use `Contacts` for borrowers, co-borrowers, guarantors, referrers, professional contacts, broker contacts, and lender contacts. Keep `Person` only as an internal API/platform detail where required. |
| Organisations | Companies | Use for employers, lenders, trusts, business borrowers, referral firms, accounting firms, and conveyancers. |
| Deals | Opportunities | Use for the top-level commercial/sales opportunity. |
| Mortgage Applications | Custom object | Use for the structured loan application package. |
| Fact Finds | Custom object or custom workflow object | Use for section-based borrower data capture and review. |
| Credit Proposals | Custom object | Use for recommendation, product selection, rationale, risk, mitigants, review, and approval. |
| Documents | Document metadata object | Store checklist/status/reference data, not document binaries by default. |
| Conditions | Custom object | Use for lender, internal, compliance, and settlement conditions. |

If Twenty supports object label customization for standard objects in the deployed version, relabel People to Contacts in the UI. If not, navigation, views, saved filters, and documentation should still call them Contacts.

## Navigation Model

Recommended left navigation structure:

1. Contacts
2. Organisations
3. Deals
4. Mortgage Applications
5. Fact Finds
6. Documents
7. Credit Proposals
8. Conditions
9. Settlements
10. Reviews
11. Integration Exceptions
12. Reports
13. Broker Settings

Broker Settings should contain configuration, not active loan work. The first Broker Settings area should be `Form templates`, used to manage OpnForm templates for fact finds, credit guide/privacy consent acknowledgements, document request forms, serviceability intake forms, and review forms. Deals should launch or consume a published template; users should not design or publish forms from an individual Deal.

Avoid making users hunt through generic CRM sections for mortgage work. Mortgage-specific boards should be visible as first-class workspace areas.

## Core Application Modules

### Contacts

Contacts are the master relationship records for borrowers and professional contacts.

Must support:

- Primary borrower and co-borrower roles.
- Guarantor and non-borrowing contact roles.
- Referrer and professional contact roles.
- Preferred communication method.
- Privacy and marketing consent status.
- External IDs for portal, AFG, BrokerEngine, ApplyOnline, AFG Flex, and specialist providers where applicable.

### Deals

Deals are the commercial/sales container. A deal may later have one or more mortgage applications if the scenario splits, is restructured, or is resubmitted.

Must support:

- Lead source and referral source.
- Broker owner, processor owner, and credit reviewer owner.
- High-level stage.
- Target settlement date.
- Estimated loan amount and property value.
- Links to Contacts, Organisations, Mortgage Applications, Fact Finds, Documents, Credit Proposals, and Tasks.

### Mortgage Applications

Mortgage Applications are the structured application packages used for origination management and future lodgement readiness.

Must support:

- Application type.
- Lodgement target: ApplyOnline, AFG Flex, AFG, BrokerEngine, manual, or not confirmed.
- LIXI reference/version note.
- External application/deal ID.
- Current normalized stage and raw external status.
- Requested loan amount, estimated LVR, target settlement date.
- Relationships to Contacts, Deal, Fact Find, Loan Requirements, Property/Security, Documents, Credit Proposal, Conditions, Valuations, LMI, and Status Events.

### Fact Finds

Fact Finds should behave like a structured workflow, not a single text note. Each fact find should be linked to a Deal, Mortgage Application, and the relevant Contacts/Household.

Must support:

- Per-section completion status.
- Broker/processor review status.
- Client portal status.
- Evidence/document status.
- Missing information tasks.
- Version or review timestamp.

Detailed setup is defined in `fact-find-configuration.md`.

### Broker Settings

Broker Settings should hold workspace-level mortgage configuration.

Must support:

- Form templates and default form selection.
- OpnForm workspace ID, form ID/slug, builder URL, and portal embed URL.
- Published/draft/testing/retired lifecycle.
- Immutable version tracking.
- Webhook configured flag.
- Mapping profile reference used by the portal backend to write normalized records into Twenty.
- Permission restriction so only principal/admin or approved operations users can change templates.

### Credit Proposals

Credit Proposals are internal working records for recommendation and credit reasoning.

Must support:

- Draft, review, approved, presented, revised, archived statuses.
- Client objectives.
- Product/lender shortlist.
- Recommendation rationale.
- Policy exceptions.
- Risks and mitigants.
- BID/compliance evidence links.
- Client-facing summary approval flag.

### Boards

The application should use multiple boards/views, not one pipeline. This is the main operational design choice for a BrokerEngine-like experience inside Twenty.

Detailed setup is defined in `pipeline-and-board-configuration.md`.

## Role Model

| Role | Primary workspace | Notes |
| --- | --- | --- |
| Principal/Admin | All modules | Configuration, permissions, reporting, exceptions, audit. |
| Broker | Contacts, Deals, Fact Finds, Credit Proposals, Applications | Own book and assigned team deals. |
| Processor | Fact Finds, Documents, Applications, Conditions, Settlement | Day-to-day work queue and client follow-up. |
| Credit/Admin Reviewer | Credit Proposals, Applications, Compliance, Conditions | Review, exceptions, approvals, readiness. |
| Support/Client Success | Contacts, Reviews, Documents, Tasks | Limited access for post-settlement and service tasks. |
| Integration Service Account | API-only scoped access | No broad user-style access unless technically unavoidable. |

## Data Storage Boundaries

- Store structured CRM/workflow data in Twenty.
- Store document metadata and external references in Twenty.
- Store document binaries only in the approved portal/document provider unless storage is separately approved.
- Store high-level ID verification and open banking status in Twenty, not raw provider payloads unless explicitly approved.
- Store internal credit notes separately from client-facing summaries.
- Keep restricted LIXI schemas, samples, and generated restricted extracts out of the repo unless the licence permits it.

## First Configuration Acceptance Criteria

The initial configured application is usable when:

- Staff can create a Contact, Deal, Mortgage Application, Fact Find, Document request, and Credit Proposal.
- Contacts are the staff-facing label for borrower/professional records.
- Each user role has at least one board showing current work.
- A fact find can be completed section-by-section and reviewed by staff.
- A document checklist can show requested, received, verified, waived, and expired statuses.
- A broker can move from fact find to credit proposal to lodgement preparation without relying on free-text notes as the main workflow state.
- The client portal can map into the same fact-find and document structure later.
