# LIXI to Twenty Mapping

## Mapping Approach

This mapping is deliberately conceptual. It avoids copying restricted LIXI schema items, definitions, enumerations, or sample payloads. Detailed field-level mapping must be completed inside the licensed LIXI development environment using the approved schemas, documentation, CSV representations, and samples.

Use `Contacts` as the staff-facing label for natural persons. Where Twenty or LIXI uses different internal naming, keep that as an implementation detail and map it behind the CRM terminology.

## High-Level Mapping

| LIXI area | Twenty object | Ownership | Notes |
| --- | --- | --- | --- |
| Broker interview and needs analysis | Deal, Fact Find Session, Fact Find Section, Mortgage Application, Loan Requirement, Tasks, Notes | Twenty-owned | Use for discovery, objectives, requirements, and compliance workflow. |
| Applicant details | Contacts, Household, Fact Find Session, Mortgage Application | Bidirectional if supported | Store only approved personal data. Link external IDs. |
| Co-applicant/guarantor details | Contacts, Household, Fact Find Section, Mortgage Application | Bidirectional if supported | Use role relationships rather than duplicating contacts. |
| Trust/company applicant details | Organisations, Contacts, Mortgage Application | Twenty-owned | Company/trust structures need legal/compliance confirmation. |
| Proof of identity | Document Metadata, ID Verification, Compliance Task | Reference-only | Avoid storing identity documents unless storage is approved. |
| Employment | Employment, Income, Contacts | Twenty-owned | Keep evidence status separate from declared details. |
| Income | Income, Document Metadata | Twenty-owned | Structure amount, frequency, evidence, and serviceability inclusion. |
| Expenses | Expense, Household | Twenty-owned | Support declared and verified expense states. |
| Assets | Asset, Contacts/Household | Twenty-owned | Include ownership percentage and evidence status. |
| Liabilities | Liability, Contacts/Household | Twenty-owned | Include refinance/close flag for packaging. |
| Product details | Loan Requirement, Lender, Product Reference, Credit Proposal | External-owned after selection if sourced externally | Product catalogues may be external reference data. |
| Security and title details | Property/Security, Title Search status | Reference-only or external-owned | Link to property reports and title search references. |
| Supporting documents | Document Metadata | Reference-only | Prefer external storage references. |
| Workflow details | Deal, Mortgage Application, Status Event, Task, Condition, Board stage fields | Mixed | Twenty normalizes workflow for visibility. |
| Status updates/events | Status Event, Mortgage Application stage | External-owned after lodgement | Import append-only events and derive normalized status. |
| Error backchannels | Status Event, Integration Error Log | External-owned source, Twenty-owned resolution | Needs retry and operational alerting. |
| Loan conditions | Condition, Document Metadata, Tasks | External-owned for lender conditions | Internal packaging conditions can be Twenty-owned. |
| Valuation requests/results | Valuation, Property/Security | External-owned/reference-only | Store status and report reference. |
| Serviceability | Serviceability Assessment | External-owned/reference-only | Store summary and report reference where permitted. |
| LMI quote/approval | LMI Assessment | External-owned/reference-only | Store status, reference, and high-level premium summary. |
| Document preparation/settlement | Settlement, Document Metadata, Tasks | Mixed | Track readiness and external references. |

## CRM Normalization Model

Twenty should normalize external mortgage progress into these internal lifecycle stages:

1. Lead received.
2. Discovery booked.
3. Fact find invited.
4. Fact find in progress.
5. Fact find submitted.
6. Fact find under review.
7. Documents requested.
8. Documents received/verified.
9. Credit review.
10. Credit proposal in progress.
11. Credit proposal approved.
12. Ready for lodgement.
13. Submitted/lodged.
14. Awaiting assessment.
15. Conditional approval.
16. Conditions in progress.
17. Formal approval.
18. Loan documents issued.
19. Loan documents returned.
20. Settlement booked.
21. Settled.
22. Post-settlement review.
23. Withdrawn/declined/lost.

External status labels from ApplyOnline, AFG Flex, AFG, or BrokerEngine should map into this normalized stage list. Preserve the original external status label in the Status Event record for audit and troubleshooting.

## Fact Find Mapping Priorities

The fact find should be the operational bridge between client portal inputs, Twenty staff workflows, LIXI-aligned concepts, and future lodgement payloads.

| Fact-find section | Twenty records | Notes |
| --- | --- | --- |
| Applicant details | Contacts, Fact Find Section | Staff-facing label is Contacts. |
| Co-applicants/guarantors | Contacts, applicant-role relationships | Avoid duplicate contact records. |
| Household/dependants | Household, Expense | Supports serviceability assumptions. |
| Objectives/requirements | Loan Requirement, Credit Proposal | Supports BID and recommendation rationale. |
| Employment | Employment, Income | Evidence status is separate from declared data. |
| Income | Income, Document Metadata | Track declared, verified, and included states. |
| Expenses | Expense, Household | Support category-level mapping. |
| Assets | Asset | Include ownership and evidence. |
| Liabilities | Liability | Include refinance/close intent. |
| Property/security | Property/Security, Valuation | Supports valuation and title workflows. |
| Documents | Document Metadata | Store references/statuses, not binaries by default. |
| Consent/disclosures | Compliance Task, Document Metadata, Fact Find Section | Store version, timestamp, and evidence reference. |

## Field Group Mapping Priorities

### Phase 1: Required for CRM launch

- Contacts and contact details.
- Deal details.
- Broker/processor ownership.
- Fact Find Session and section status.
- Application status.
- Document checklist metadata.
- Tasks and workflow stage.
- External IDs.

### Phase 2: Required for mortgage packaging

- Household structure.
- Employment and income.
- Expenses, assets, and liabilities.
- Loan requirements.
- Property/security.
- Compliance and BID task evidence.
- Conditions.

### Phase 3: Required for deeper integration

- ApplyOnline/AFG Flex target mapping.
- Serviceability assessment.
- Valuation.
- LMI.
- Title/property search.
- Document preparation and settlement events.
- Error/event backchannel handling.

## Detailed Mapping Process

1. Export or inspect the licensed LIXI CAL schema/CSV representation inside the development environment.
2. Group schema items by business concept rather than mirroring every nested schema detail in Twenty.
3. Compare each LIXI concept with ApplyOnline, AFG Flex, AFG, and BrokerEngine API object fields.
4. Decide field ownership using the integration matrix.
5. Create Twenty fields only where users need to view, edit, automate, report, or reconcile the value.
6. Map fact-find sections to field groups so client portal capture can be validated before credit review.
7. Keep restricted LIXI path names and detailed enumerations in internal licensed mapping files only if the licence permits.
8. Test with development-only payloads and never use those payloads as production fixtures unless permitted.

## Mapping Decisions

- Twenty should not try to model the complete LIXI domain model one-to-one. That would create unnecessary complexity.
- Twenty should model the operational subset needed for broker visibility, fact find, workflow, compliance evidence, board management, and integration reconciliation.
- External systems should remain authoritative for lodgement-specific lifecycle data unless a direct production LIXI integration is later approved.
- Document binary storage should stay outside Twenty by default.
- Staff-facing terminology should use Contacts even where LIXI or Twenty internals use different names.
