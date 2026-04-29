# Twenty CRM Data Model for Mortgage Broking

## Design Principles

- Twenty is the internal CRM, loan origination management, credit proposal, task, and reporting layer.
- The client portal is borrower-facing; Twenty is the staff-facing application where brokers/processors/admins manage work.
- AFG/BrokerEngine remain the lodgement/workflow systems where their APIs expose authoritative deal data.
- Sensitive documents should remain in the authorised portal or document system unless an approved storage model is confirmed.
- Every integrated object needs an ownership classification: `Twenty-owned`, `AFG/BrokerEngine-owned`, `bidirectional`, or `reference-only`.
- Prefer structured fields over free text for compliance, reporting, and automation.

## Standard Objects

### People

Use for all natural persons:

- Borrowers/applicants.
- Co-applicants.
- Guarantors.
- Referrers.
- Conveyancers/solicitors.
- Accountants.
- Real estate agents.
- Broker and lender contacts where useful.

Recommended fields:

- Role tags: applicant, co-applicant, guarantor, referrer, professional contact.
- Preferred name.
- Mobile, email, address.
- Date of birth where approved for storage.
- Residency/citizenship status where approved for storage.
- Privacy consent status.
- Marketing consent status.
- External IDs for AFG/BrokerEngine.

Ownership: `bidirectional` for contact basics if APIs support it; otherwise `Twenty-owned` with external references.

### Companies

Use for organisations:

- Employers.
- Self-employed applicant businesses.
- Trust/corporate borrowers.
- Lenders.
- Broker group entities.
- Referral partners.
- Conveyancing firms/accounting firms.

Recommended fields:

- ABN/ACN.
- Organisation type.
- Industry.
- Contact role.
- External IDs.
- Broker panel/lender flag.

Ownership: `Twenty-owned` for relationship management; `reference-only` where lender lists come from BrokerEngine/AFG.

### Opportunities

Use as the high-level mortgage opportunity/deal record. One opportunity can have one or more loan applications if restructuring is needed.

Recommended fields:

- Deal type: purchase, refinance, construction, investment, debt consolidation, equity release, pre-approval.
- Target settlement date.
- Estimated loan amount.
- Estimated property value.
- Current stage.
- Broker owner.
- Loan processor owner.
- Credit analyst owner.
- Compliance status.
- External AFG/BrokerEngine deal ID.

Ownership: `Twenty-owned` for sales/process visibility; `bidirectional` for stage/status if API support exists.

## Custom Objects

### Mortgage Application

Represents the structured application package linked to an opportunity.

Fields:

- Application type: full assessment, pre-approval, variation, resubmission.
- Lender selected.
- Product selected.
- Submission readiness status.
- External lodgement reference.
- Current aggregator/lender status.
- Submitted date.
- Conditional approval date.
- Formal approval date.
- Settlement date.
- Decline/withdraw reason.

Relationships:

- Opportunity.
- Applicants.
- Broker.
- Lender.
- Loan requirements.
- Securities/properties.
- Documents.
- Status events.

Ownership: `AFG/BrokerEngine-owned` for lodgement status after submission; `Twenty-owned` before submission unless external workflow owns the deal.

### Credit Proposal

Represents the broker/credit-facing proposal and recommendation work that develops over time before lodgement or client presentation.

Fields:

- Proposal status: draft, in review, approved, presented, revised, archived.
- Client objectives summary.
- Product recommendation summary.
- Lender/product shortlist.
- Recommendation rationale.
- Policy exceptions.
- Key risks.
- Mitigants.
- Compliance review status.
- Approval owner.
- Approved date.
- Client-facing summary approved flag.

Relationships:

- Opportunity.
- Mortgage Application.
- Applicants.
- Loan Requirements.
- Product References.
- Serviceability Assessments.
- Documents.
- Tasks.

Ownership: `Twenty-owned`. External product research and serviceability providers may supply references or summaries, but the working credit proposal should remain in Twenty.

### Lender

Represents a lender on the broker panel. This can be a custom object or a tagged Company, but a custom object is clearer if lender-specific fields, panel status, BDM contacts, and product references need to be managed.

Fields:

- Lender name.
- Panel status.
- Aggregator/lodgement channel.
- Broker code.
- BDM contact.
- Credit contact.
- Settlement contact.
- Policy notes reference.
- External lender ID.

Ownership: `reference-only` or `AFG/BrokerEngine-owned` if lender panel data is imported; `Twenty-owned` for internal notes and relationship management.

### Product Reference

Represents high-level lending product options used for tracking and recommendations. It is not intended to replace lender product systems unless a reliable product feed is available.

Fields:

- Product name.
- Lender.
- Product type.
- Rate type.
- Repayment type.
- Owner-occupied/investment availability.
- Offset/redraw features.
- External product ID.
- Active/inactive status.

Ownership: `reference-only` if sourced from AFG/BrokerEngine or lender feeds; `Twenty-owned` for manually maintained shortlist/reference products.

### Household

Groups applicants whose income, expenses, dependants, and liabilities are assessed together.

Fields:

- Household name.
- Living arrangement.
- Number of dependants.
- Expense profile status.
- External reference.

Relationships:

- People.
- Expenses.
- Assets.
- Liabilities.
- Mortgage applications.

Ownership: `Twenty-owned` unless AFG/BrokerEngine exposes a matching household model.

### Employment

Captures employment and self-employment details for each applicant.

Fields:

- Employment type.
- Employer/company.
- Role/title.
- Start date.
- Basis: full-time, part-time, casual, contractor, self-employed.
- Probation flag.
- Verification status.
- Income evidence status.

Ownership: `Twenty-owned` for CRM readiness; sync only if external API supports structured employment.

### Income

Fields:

- Income type: base salary, overtime, bonus, commission, rental, business income, government benefit, other.
- Amount.
- Frequency.
- Gross/net indicator.
- Evidence status.
- Serviceability included flag.

Relationships:

- Person.
- Employment.
- Application.

Ownership: `Twenty-owned`; external sync subject to API and privacy approval.

### Expense

Fields:

- Expense category.
- Amount.
- Frequency.
- Declared/verified indicator.
- Household expense method.

Ownership: `Twenty-owned`; may be `reference-only` from fact-find/client portal.

### Asset

Fields:

- Asset type: cash, vehicle, superannuation, property, shares, other.
- Estimated value.
- Ownership percentage.
- Evidence status.

Ownership: `Twenty-owned`.

### Liability

Fields:

- Liability type: home loan, personal loan, credit card, HECS/HELP, car loan, buy-now-pay-later, other.
- Limit.
- Balance.
- Repayment amount.
- Frequency.
- Lender.
- To be refinanced/closed flag.

Ownership: `Twenty-owned`; update from external source only with clear authority.

### Loan Requirement

Fields:

- Purpose.
- Requested amount.
- Loan term.
- Repayment type.
- Interest type.
- Fixed/variable preference.
- Offset/redraw requirements.
- Product preference.
- Loan split group.

Ownership: `Twenty-owned` before submission; `AFG/BrokerEngine-owned` after lodgement if external system is authoritative.

### Property / Security

Fields:

- Address.
- Property type.
- Occupancy: owner occupied, investment.
- Purchase price.
- Estimated value.
- Valuation status.
- Title search status.
- Security position.
- LVR contribution.

Ownership: `Twenty-owned` for CRM; valuation/title details may be `AFG/BrokerEngine-owned` or `reference-only`.

### Document

Store metadata only unless approved otherwise.

Fields:

- Document type.
- Required/optional.
- Request status.
- Received status.
- Verified status.
- Expiry date.
- External document URL/reference.
- Storage location.
- Owner.

Ownership: `reference-only` if stored in BrokerEngine, FinanceVault, AFG, lender portal, or another approved document system.

### Condition

Tracks lender/credit approval conditions.

Fields:

- Condition type.
- Description.
- Source: lender, aggregator, BrokerEngine, AFG, internal.
- Status.
- Due date.
- Satisfied date.
- Evidence reference.

Ownership: `AFG/BrokerEngine-owned` when imported from external status updates; `Twenty-owned` for internal packaging conditions.

### Status Event

Append-only timeline of external and internal status events.

Fields:

- Event source.
- External event ID.
- Event type.
- Raw external status label.
- Normalized status.
- Event timestamp.
- Processed timestamp.
- Related task/condition.

Ownership: `AFG/BrokerEngine-owned` for imported events; `Twenty-owned` for internal events.

### Integration Error Log

Operational record for sync failures and unknown external events.

Fields:

- Source system.
- Object type.
- External ID.
- Error category.
- Safe error summary.
- First seen timestamp.
- Last retry timestamp.
- Retry count.
- Resolution status.
- Assigned owner.

Ownership: `Twenty-owned`.

### Serviceability Assessment

Fields:

- Provider/calculator.
- Scenario name.
- Requested amount.
- Assessment status.
- Pass/fail/refer summary.
- Surplus/shortfall where permitted.
- Report reference.
- Assessment date.

Ownership: `reference-only` or `AFG/BrokerEngine-owned` depending on source.

### Valuation

Fields:

- Provider.
- Order reference.
- Status.
- Ordered date.
- Inspection date.
- Received date.
- Valuation amount.
- Report reference.
- Shortfall flag.

Ownership: `AFG/BrokerEngine-owned` or `reference-only`.

### LMI Assessment

Fields:

- Required flag.
- Insurer.
- Quote reference.
- Premium estimate.
- Status.
- Conditions.
- Expiry date.

Ownership: `AFG/BrokerEngine-owned` or `reference-only`.

### Settlement

Fields:

- Settlement status.
- Target settlement date.
- Confirmed settlement date/time.
- Settlement agent.
- Loan documents status.
- Funds to complete status.
- Post-settlement review date.

Ownership: `Twenty-owned` for coordination; external settlement status is `AFG/BrokerEngine-owned` if available.

## Core Views

- New leads.
- Fact find incomplete.
- Documents outstanding.
- Ready for credit review.
- Ready for lodgement.
- Lodged and awaiting response.
- Conditional approval with outstanding conditions.
- Formal approval awaiting docs.
- Settlement this week.
- Settled this month.
- Post-settlement review due.
- Deals at risk.

## Permissions

Recommended role groups:

- Principal/admin: full access.
- Broker: own client/deal access, limited reporting.
- Loan processor: application, documents, tasks, status events.
- Credit analyst: application, serviceability, conditions, lender packaging.
- Support/CSM: limited post-settlement and review access.

Restrict sensitive fields such as identity details, income, liabilities, documents, and credit outcomes to users with a business need.
