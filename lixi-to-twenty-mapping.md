# LIXI to Twenty Mapping

## Mapping Approach

This mapping is deliberately conceptual. It avoids copying restricted LIXI schema items, definitions, enumerations, or sample payloads. Detailed field-level mapping must be completed inside the licensed LIXI development environment using the approved schemas, documentation, CSV representations, and samples.

## High-Level Mapping

| LIXI area | Twenty object | Ownership | Notes |
| --- | --- | --- | --- |
| Broker interview and needs analysis | Opportunity, Mortgage Application, Loan Requirement, Tasks, Notes | Twenty-owned | Use for discovery, objectives, requirements, and compliance workflow. |
| Applicant details | People, Household, Mortgage Application | Bidirectional if supported | Store only approved personal data. Link external IDs. |
| Co-applicant/guarantor details | People, Household, Mortgage Application | Bidirectional if supported | Use role relationships rather than duplicating people. |
| Trust/company applicant details | Companies, People, Mortgage Application | Twenty-owned | Company/trust structures need legal/compliance confirmation. |
| Proof of identity | Document metadata, Compliance Task | Reference-only | Avoid storing identity documents unless storage is approved. |
| Employment | Employment, Income, People | Twenty-owned | Keep evidence status separate from declared details. |
| Income | Income, Document metadata | Twenty-owned | Structure amount, frequency, evidence, and serviceability inclusion. |
| Expenses | Expense, Household | Twenty-owned | Support declared and verified expense states. |
| Assets | Asset, People/Household | Twenty-owned | Include ownership percentage and evidence status. |
| Liabilities | Liability, People/Household | Twenty-owned | Include refinance/close flag for packaging. |
| Product details | Loan Requirement, Lender, Product reference | AFG/BrokerEngine-owned after selection | Product catalogues may be external reference data. |
| Security and title details | Property/Security, Title Search status | Reference-only or external-owned | Link to property reports and title search references. |
| Supporting documents | Document metadata | Reference-only | Prefer external storage references. |
| Workflow details | Opportunity, Mortgage Application, Status Event, Task, Condition | Mixed | Twenty normalizes workflow for visibility. |
| Status updates/events | Status Event, Mortgage Application stage | AFG/BrokerEngine-owned | Import append-only events and derive normalized status. |
| Error backchannels | Status Event, Integration Error Log | AFG/BrokerEngine-owned | Needs retry and operational alerting. |
| Loan conditions | Condition, Document metadata, Tasks | AFG/BrokerEngine-owned for lender conditions | Internal packaging conditions can be Twenty-owned. |
| Valuation requests/results | Valuation, Property/Security | External-owned/reference-only | Store status and report reference. |
| Serviceability | Serviceability Assessment | External-owned/reference-only | Store summary and report reference where permitted. |
| LMI quote/approval | LMI Assessment | External-owned/reference-only | Store status, reference, and high-level premium summary. |
| Document preparation/settlement | Settlement, Document metadata, Tasks | Mixed | Track readiness and external references. |

## CRM Normalization Model

Twenty should normalize external mortgage progress into these internal stages:

1. Lead received.
2. Discovery booked.
3. Fact find in progress.
4. Documents requested.
5. Documents received.
6. Credit review.
7. Scenario/product selection.
8. Ready for lodgement.
9. Submitted/lodged.
10. Awaiting assessment.
11. Conditional approval.
12. Conditions in progress.
13. Formal approval.
14. Loan documents issued.
15. Loan documents returned.
16. Settlement booked.
17. Settled.
18. Post-settlement review.
19. Withdrawn/declined/lost.

External status labels from AFG/BrokerEngine should map into this normalized stage list. Preserve the original external status label in the Status Event record for audit and troubleshooting.

## Field Group Mapping Priorities

### Phase 1: Required for CRM launch

- People and contact details.
- Opportunity/deal details.
- Broker/processor ownership.
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

- Serviceability assessment.
- Valuation.
- LMI.
- Title/property search.
- Document preparation and settlement events.
- Error/event backchannel handling.

## Detailed Mapping Process

1. Export or inspect the licensed LIXI CAL schema/CSV representation inside the development environment.
2. Group schema items by business concept rather than mirroring every nested schema detail in Twenty.
3. Compare each LIXI concept with AFG/BrokerEngine API object fields.
4. Decide field ownership using the integration matrix.
5. Create Twenty fields only where users need to view, edit, automate, report, or reconcile the value.
6. Keep restricted LIXI path names and detailed enumerations in internal licensed mapping files only if the licence permits.
7. Test with development-only payloads and never use those payloads as production fixtures unless permitted.

## Mapping Decisions

- Twenty should not try to model the complete LIXI domain model one-to-one. That would create unnecessary complexity.
- Twenty should model the operational subset needed for broker visibility, workflow, compliance evidence, and integration reconciliation.
- External systems should remain authoritative for lodgement-specific lifecycle data unless a direct production LIXI integration is later approved.
- Document binary storage should stay outside Twenty by default.
