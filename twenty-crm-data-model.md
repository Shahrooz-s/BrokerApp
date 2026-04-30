# Twenty CRM Data Model for Mortgage Broking

## Design Principles

- Twenty is the internal CRM, loan origination management, credit proposal, task, and reporting layer.
- The client portal is borrower-facing; Twenty is the staff-facing application where brokers/processors/admins manage work.
- Use `Contacts` as the staff-facing label for borrowers, co-borrowers, guarantors, referrers, professional contacts, broker contacts, and lender contacts. Treat Twenty's internal `People`/`Person` naming as a platform detail only where it cannot be changed.
- ApplyOnline is the preferred future lodgement target, with AFG Flex as the alternate/fallback path where direct ApplyOnline integration is unavailable or not approved.
- AFG and BrokerEngine remain relevant operational or transitional systems where their APIs expose authoritative deal, document, board, task, or status data.
- Sensitive documents should remain in the authorised portal or document system unless an approved storage model is confirmed.
- Every integrated object needs an ownership classification: `Twenty-owned`, `external-owned`, `bidirectional`, or `reference-only`.
- Prefer structured fields and board stages over free text for compliance, reporting, and automation.

## Standard Objects

### Contacts

Twenty standard object: People/Person, relabelled or presented to staff as Contacts.

Use for all natural persons:

- Borrowers/applicants.
- Co-applicants.
- Guarantors.
- Referrers.
- Conveyancers/solicitors.
- Accountants.
- Real estate agents.
- Broker contacts.
- Lender/BDM contacts.

Recommended fields:

- Contact role tags: applicant, co-applicant, guarantor, referrer, professional contact, broker contact, lender contact.
- Preferred name.
- Mobile, office phone, home phone, email, home address, office address, and postal-address-same flag.
- Preferred communication method.
- Date of birth where approved for storage.
- Residency/citizenship status where approved for storage.
- Privacy consent status.
- Marketing consent status.
- Lead source.
- Brand/business unit.
- Company/organisation raw name and matched Organisation.
- Broker owner and source broker name.
- Spouse/referred-by raw names plus reviewed Contact/Organisation relationships.
- Last review date and next review date.
- Portal user/account reference.
- External IDs for AFG, BrokerEngine, ApplyOnline, AFG Flex, and specialist tools where applicable.

Bulk-edit eligible contact fields:

- Next review date.
- Lead source.
- Contact role.
- Broker brand.
- Broker owner.
- Referred by.
- Tags.

These fields match the BrokerEngine bulk-edit pattern in the supplied screenshots. Empty-value clearing must require explicit confirmation and should be audited.

BrokerEngine contact import baseline:

- Import columns observed from `contact.xlsx`: First Name, Last Name, Preferred Name, Mobile Phone Number, Office Phone Number, Home Phone Number, Email, Home Address, Postal Address Is Same, Office Address, Spouse Name, Birth Date, Last Review On, Next Review On, Lead Source, Company Name, Broker Name, Brand Name, Tags, Referred By, Created At, Flex Contact Id, and BrokerEngine ID.
- Preserve `BrokerEngine ID` as `brokerEngineContactId`.
- Preserve `Flex Contact Id` as `afgFlexContactId`.
- Store BrokerEngine `Created At` as `sourceCreatedAt`; do not overwrite the Twenty system-created timestamp.
- Use review dates to drive the Post-Settlement Review board and retention workflow.
- Do not auto-create spouse, referred-by, broker, or company relationships from name-only fields. Import raw values first and route ambiguous matches to review.
- Full field mapping and import rules are documented in `brokerengine-contact-import-mapping.md`.

Ownership: `bidirectional` for contact basics if APIs support it; otherwise `Twenty-owned` with external references.

### Organisations

Twenty standard object: Companies, relabelled or presented as Organisations where useful.

Use for:

- Employers.
- Self-employed applicant businesses.
- Trust/corporate borrowers.
- Lenders.
- Broker group entities.
- Referral partners.
- Conveyancing firms.
- Accounting firms.
- Real estate agencies.

Recommended fields:

- ABN/ACN.
- Organisation type.
- Industry.
- Contact role.
- External IDs.
- Broker panel/lender flag.
- BDM/contact relationship.

Ownership: `Twenty-owned` for relationship management; `reference-only` where lender or product lists come from BrokerEngine, AFG, ApplyOnline, AFG Flex, or product research providers.

### Deals

Twenty standard object: Opportunities, presented to staff as Deals where possible.

Use as the high-level commercial opportunity and sales/workflow container. One Deal can have one or more Mortgage Applications if the scenario splits, is restructured, or is resubmitted.

Recommended fields:

- Deal type: purchase, refinance, construction, investment, debt consolidation, equity release, pre-approval.
- Lead source.
- Referral source.
- Target settlement date.
- Estimated loan amount.
- Estimated property value.
- Current high-level stage.
- Broker owner.
- Loan processor owner.
- Credit/admin reviewer owner.
- Compliance status.
- External AFG/BrokerEngine/ApplyOnline/AFG Flex deal ID.

Recommended board/card fields:

- Stage order number.
- Stage due date.
- Finance due date.
- Settlement target.
- Broker brand.
- Display tags/chips.
- Blocker indicator.
- Aggregate reporting amount.

Recommended lead/deal list-view fields:

- Deal Stage.
- Name.
- Application ID.
- Contact.
- Status.
- Lender.
- Lender Reference.
- Security Property.
- Loan Amount.
- Post Cap LVR.
- Finance Date.
- Settlement Date.
- Stage Due Date.
- Broker Handover Date.
- Expected Lodged Date.
- Lodged with FI Date.
- Pre Approved Date.
- Formal Approval Date.
- Expected Settlement Date.
- Assigned Team.
- Broker.
- Loan Processor.
- Funding Template.
- Referred By.
- Referrer Manager.
- Lead Source.
- Created On.
- Last Note.

Ownership: `Twenty-owned` for sales/process visibility; `bidirectional` for stage/status only if API support exists.

## Core Mortgage Objects

### Mortgage Application

Represents the structured loan application package linked to a Deal.

Fields:

- Application type: full assessment, pre-approval, variation, resubmission.
- Lodgement target: not confirmed, ApplyOnline, AFG Flex, AFG, BrokerEngine, manual.
- LIXI reference/version note.
- Lender selected.
- Product selected.
- Submission readiness status.
- External lodgement reference.
- Current raw external status.
- Current normalized stage.
- Requested loan amount.
- Estimated LVR.
- Submitted date.
- Conditional approval date.
- Formal approval date.
- Settlement date.
- Decline/withdraw reason.
- Broker handover date.
- Expected lodgement date.
- Lodged with finance institution date.
- Expected settlement date.
- Settlement refinance text/reference.
- Settlement purchase text/reference.
- Funding template.
- Assigned team.
- Security property display.
- Lender reference.
- Post-cap LVR.
- Last note summary.

Relationships:

- Deal.
- Primary Contact.
- Co-applicant Contacts.
- Broker owner.
- Processor owner.
- Lender.
- Fact Find Session.
- Loan Requirements.
- Properties/Securities.
- Document Metadata.
- Credit Proposal.
- Conditions.
- Status Events.
- Serviceability, Valuation, and LMI records.

Ownership: `Twenty-owned` before lodgement; lodgement and raw status may become `external-owned` after submission through ApplyOnline, AFG Flex, AFG, or BrokerEngine.

### Fact Find Session

Represents a structured fact find linked to the Deal, Mortgage Application, Contacts, and Household. This is a first-class workflow object, not just a form response.

Fields:

- Fact find status.
- Completion percentage.
- Client submitted date/time.
- Processor review status.
- Broker review status.
- Last client activity date/time.
- Last staff activity date/time.
- Missing information count.
- Portal session/reference ID.
- Version/revision number.

Relationships:

- Deal.
- Mortgage Application.
- Primary Contact.
- Co-applicant Contacts.
- Household.
- Fact Find Sections.
- Document Metadata.
- Tasks.

Ownership: `Twenty-owned`, with client-entered values arriving from the portal.

### Fact Find Section

Tracks completion and review of each fact-find section.

Recommended section names:

- Applicant details.
- Co-applicant/guarantor details.
- Household and dependants.
- Goals, objectives, and requirements.
- Employment.
- Income.
- Expenses.
- Assets.
- Liabilities.
- Property/security.
- Documents.
- Consent and disclosures.

Fields:

- Section status: not started, in progress, submitted, needs clarification, under review, complete, waived/not applicable.
- Required flag.
- Completion percentage.
- Assigned owner.
- Missing information summary.
- Staff review status.
- Related document requests.

Ownership: `Twenty-owned`.

### Household

Groups applicants whose income, expenses, dependants, and liabilities are assessed together.

Fields:

- Household name.
- Living arrangement.
- Number of dependants.
- Expense profile status.
- External reference.

Relationships:

- Contacts.
- Fact Find Session.
- Expenses.
- Assets.
- Liabilities.
- Mortgage Applications.

Ownership: `Twenty-owned` unless AFG/BrokerEngine exposes a matching household model.

### Employment

Captures employment and self-employment details for each applicant Contact.

Fields:

- Employment type.
- Employer/Organisation.
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

- Contact.
- Employment.
- Fact Find Session.
- Mortgage Application.

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

Ownership: `Twenty-owned` before submission; `external-owned` after lodgement if external system is authoritative.

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

Ownership: `Twenty-owned` for CRM; valuation/title details may be `external-owned` or `reference-only`.

## Credit and Product Objects

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

- Deal.
- Mortgage Application.
- Contacts.
- Loan Requirements.
- Product References.
- Serviceability Assessments.
- Document Metadata.
- Tasks.

Ownership: `Twenty-owned`. External product research and serviceability providers may supply references or summaries, but the working credit proposal should remain in Twenty.

### Lender

Represents a lender on the broker panel. This can be a custom object or a tagged Organisation, but a custom object is clearer if lender-specific fields, panel status, BDM contacts, and product references need to be managed.

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

Ownership: `reference-only` or `external-owned` if lender panel data is imported; `Twenty-owned` for internal notes and relationship management.

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

Ownership: `reference-only` if sourced from AFG/BrokerEngine, ApplyOnline, AFG Flex, product research providers, or lender feeds; `Twenty-owned` for manually maintained shortlist/reference products.

## Operational Objects

### Document Metadata

Store metadata only unless approved otherwise.

Fields:

- Document type.
- Required/optional.
- Request status.
- Received status.
- Verified status.
- Rejected/rework status.
- Expiry date.
- Waived flag and waiver reason.
- External document URL/reference.
- Storage location.
- Owner.

Ownership: `reference-only` if stored in BrokerEngine, FinanceVault, AFG, lender portal, or another approved document system.

### Condition

Tracks lender/credit approval conditions and internal packaging conditions.

Fields:

- Condition type.
- Description.
- Source: lender, aggregator, BrokerEngine, AFG, ApplyOnline, AFG Flex, internal.
- Status.
- Due date.
- Satisfied date.
- Evidence reference.
- Assigned owner.

Ownership: `external-owned` when imported from external status updates; `Twenty-owned` for internal packaging conditions.

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

Ownership: `external-owned` for imported events; `Twenty-owned` for internal events.

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

## Board and View Model

The workspace should have multiple operational boards, not one monolithic pipeline.

Recommended boards:

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

Each board should have:

- Board owner or default responsible role.
- Stage field.
- Next action field.
- Due date.
- Stale item indicator.
- Automation triggers for next tasks.

Detailed board setup is in `pipeline-and-board-configuration.md`.

## Permissions

Recommended role groups:

- Principal/admin: full access.
- Broker: own client/deal access and assigned team deals.
- Loan processor: Fact Finds, Document Metadata, Applications, Tasks, Status Events, Conditions, and Settlements.
- Credit/admin reviewer: Applications, Credit Proposals, Serviceability, Conditions, and compliance evidence.
- Support/client success: limited Contacts, Reviews, Documents, and Tasks access.
- Integration service account: scoped machine access only.

Restrict sensitive fields such as identity details, bank/open banking data, income, liabilities, documents, credit outcomes, and internal risk notes to users with a business need.
