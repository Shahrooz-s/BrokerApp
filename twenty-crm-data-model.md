# Twenty CRM Data Model for Mortgage Broking

## Design Principles

- Twenty is the internal CRM, loan origination management, credit proposal, task, and reporting layer.
- The client portal is borrower-facing; Twenty is the staff-facing application where brokers/processors/admins manage work.
- ApplyOnline is the preferred future lodgement target, with AFG Flex as alternate/fallback.
- AFG/BrokerEngine may remain transitional or operational integration systems where their APIs expose authoritative deal data.
- Sensitive document binaries should remain in the authorised portal/document provider unless storage is approved.
- Every integrated object needs an ownership classification: `Twenty-owned`, `external-owned`, `bidirectional`, or `reference-only`.

## Standard Objects

### People

Use for borrowers, co-applicants, guarantors, referrers, professional contacts, brokers, lender contacts, solicitors, accountants, and real estate agents.

Key fields: role tags, preferred name, mobile, email, address, date of birth where approved, residency/citizenship status where approved, privacy consent, marketing consent, and external IDs.

Ownership: `bidirectional` where supported; otherwise `Twenty-owned` with external references.

### Companies

Use for employers, self-employed applicant businesses, trust/corporate borrowers, lenders, broker entities, referral partners, conveyancers, and accounting firms.

Key fields: ABN/ACN, organisation type, industry, contact role, external IDs, broker panel/lender flag.

Ownership: `Twenty-owned` for relationship management; `reference-only` where lender lists come from external systems.

### Opportunities

Use as the high-level mortgage opportunity/deal record. One opportunity can have one or more mortgage applications.

Key fields: deal type, target settlement date, estimated loan amount, estimated property value, current stage, broker owner, processor owner, credit analyst owner, compliance status, external deal IDs.

Ownership: `Twenty-owned` for sales and process visibility; `bidirectional` for stage/status only if API support exists.

## Core Custom Objects

### Mortgage Application

Represents the structured application package linked to an opportunity.

Key fields: application type, lender selected, product selected, submission readiness status, external lodgement reference, current aggregator/lender status, submitted date, conditional approval date, formal approval date, settlement date, decline/withdraw reason.

Relationships: Opportunity, applicants, broker, lender, loan requirements, securities/properties, documents, status events, credit proposal.

Ownership: `Twenty-owned` before lodgement; ApplyOnline/AFG Flex/AFG/BrokerEngine may become authoritative for lodgement status after submission.

### Credit Proposal

Represents the broker/credit-facing proposal and recommendation work that develops over time before lodgement or client presentation.

Key fields: proposal status, client objectives summary, product recommendation summary, lender/product shortlist, recommendation rationale, policy exceptions, key risks, mitigants, compliance review status, approval owner, approved date, client-facing summary approved flag.

Relationships: Opportunity, Mortgage Application, applicants, loan requirements, product references, serviceability assessments, documents, tasks.

Ownership: `Twenty-owned`. External product research and serviceability providers may supply references or summaries, but the working proposal remains in Twenty.

### Household

Groups applicants whose income, expenses, dependants, and liabilities are assessed together.

Key fields: household name, living arrangement, number of dependants, expense profile status, external reference.

### Employment

Captures employment and self-employment details for each applicant.

Key fields: employment type, employer/company, role/title, start date, basis, probation flag, verification status, income evidence status.

### Income

Key fields: income type, amount, frequency, gross/net indicator, evidence status, serviceability included flag.

### Expense

Key fields: expense category, amount, frequency, declared/verified indicator, household expense method.

### Asset

Key fields: asset type, estimated value, ownership percentage, evidence status.

### Liability

Key fields: liability type, limit, balance, repayment amount, frequency, lender, to-be-refinanced/closed flag.

### Loan Requirement

Key fields: purpose, requested amount, loan term, repayment type, interest type, fixed/variable preference, offset/redraw requirements, product preference, loan split group.

### Property / Security

Key fields: address, property type, occupancy, purchase price, estimated value, valuation status, title search status, security position, LVR contribution.

### Lender

Represents lender panel/reference data.

Key fields: lender name, panel status, aggregator/lodgement channel, broker code, BDM contact, credit contact, settlement contact, policy notes reference, external lender ID.

### Product Reference

Represents high-level lending product options used for tracking and recommendations.

Key fields: product name, lender, product type, rate type, repayment type, owner-occupied/investment availability, offset/redraw features, external product ID, active status.

## Operational Custom Objects

### Document Metadata

Store metadata only unless approved otherwise.

Key fields: document type, required/optional, request status, received status, verified status, expiry date, external document URL/reference, storage location, owner.

### Condition

Tracks internal packaging conditions and lender/credit approval conditions.

Key fields: condition type, description, source, status, due date, satisfied date, evidence reference.

### Status Event

Append-only timeline of external and internal status events.

Key fields: event source, external event ID, event type, raw external status label, normalized status, event timestamp, processed timestamp, related task/condition.

### Integration Error Log

Operational record for sync failures and unknown external events.

Key fields: source system, object type, external ID, error category, safe error summary, first seen timestamp, last retry timestamp, retry count, resolution status, assigned owner.

## Specialist Tool Objects

### ID Verification

Tracks identity verification provider sessions and high-level outcomes. Store provider reference and status, not raw sensitive provider data unless approved.

### Open Banking Session

Tracks consent, connection/session status, provider reference, summary reference, expiry, and manual fallback status.

### Product Research

Tracks provider reference, product shortlist, broker-approved summary, policy fit notes, and recommendation inputs.

### Serviceability Assessment

Tracks provider/calculator, scenario name, requested amount, assessment status, pass/fail/refer summary, surplus/shortfall where permitted, report reference, and assessment date.

### Valuation

Tracks provider, order reference, status, ordered/inspection/received dates, valuation amount, report reference, and shortfall flag.

### LMI Assessment

Tracks required flag, insurer, quote reference, premium estimate, status, conditions, and expiry date.

### Credit Check

Tracks provider reference, requested/completed status, high-level result, consent reference, and manual review status.

### Title / Property Search

Tracks provider reference, ordered/received status, title reference, report link, and risk flags.

### Settlement

Tracks settlement status, target settlement date, confirmed date/time, settlement agent, loan documents status, funds-to-complete status, and post-settlement review date.

## Core Views

Recommended operational views:

- New leads.
- Fact find incomplete.
- Documents outstanding.
- ID verification incomplete.
- Open banking incomplete.
- Ready for credit review.
- Credit proposals in draft.
- Credit proposals awaiting review.
- Ready for lodgement.
- Lodged and awaiting response.
- Conditional approval with outstanding conditions.
- Formal approval awaiting docs.
- Settlement this week.
- Settled this month.
- Post-settlement review due.
- Integration errors requiring action.
- Deals at risk.

## Permissions

Recommended role groups:

- Principal/admin: full access.
- Broker: own client/deal access and assigned team deals.
- Loan processor: application, document metadata, tasks, status events, conditions.
- Credit/admin reviewer: application, credit proposal, serviceability, conditions, compliance evidence.
- Support/client success: limited post-settlement and review access.
- Integration service account: scoped machine access only.

Restrict sensitive fields such as identity details, bank/open banking data, income, liabilities, documents, credit outcomes, and internal risk notes to users with a business need.
