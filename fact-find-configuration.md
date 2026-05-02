# Fact Find Configuration

## Purpose

The fact find should be configured as a structured, section-based mortgage workflow similar in operational feel to BrokerEngine, while remaining platform-neutral for the future client portal, ApplyOnline, AFG Flex, AFG, BrokerEngine, and LIXI-aligned mapping.

The fact find is not a single form, note, or PDF. It is a living record that tracks borrower completion, staff review, evidence, missing information, consent, and readiness for credit assessment.

## OpnForm-First Form Builder Strategy

BrokerEngine appears to use a schema-driven form-builder pattern. BrokerApp should use OpnForm as the preferred borrower-facing form renderer because it is already working in the current environment and supports the required pattern: no-code form building, multiple input types, hidden fields, partial/editable submissions, webhooks, API access, and form logic. Form.io remains a useful reference for component patterns, but it is not the target dependency.

OpnForm forms should be used as the client rendering and capture layer, not as the final system of record. Twenty remains the normalized operational record for Contacts, Opportunities/Deals, Mortgage Applications, Fact Find Sessions, Fact Find Sections, Document Metadata, Credit Proposals, Serviceability Assessments, Product Search Runs, and integration events.

Form builder administration belongs in **Broker Settings**, not inside an individual Deal. Brokers and admins should manage form templates, versions, default templates, OpnForm IDs/slugs, builder URLs, embed URLs, webhook status, and mapping profiles from Broker Settings. Deals and Fact Find Sessions should only consume a selected published template and record which version was used.

Recommended operating rules:

- Treat each form definition as versioned and immutable once issued to a client.
- Only published Broker Settings form templates should be available for new borrower sessions.
- Store `OpnForm` as the form provider, plus form slug/ID, form version, submission reference, portal session reference, mapping status, mapping errors, schema snapshot reference, and submission snapshot reference on the Fact Find Session.
- Link the Fact Find Session to the Broker Form Template record used for that client session.
- Use hidden fields for Opportunity ID, Mortgage Application ID, Contact IDs, Household ID, Fact Find Session ID, schema version, and portal session reference.
- Route every submission through the portal backend before writing to Twenty.
- Prefer OpnForm webhooks for submission events, with API polling as a reconciliation fallback.
- Normalize applicant, household, income, expense, asset, liability, property/security, consent, and document metadata into Twenty records.
- Keep original submission snapshots in the approved portal evidence store, with references in Twenty for audit and reconciliation.
- Avoid storing raw identity documents, open-banking data, or uploaded binary documents in the form builder unless that storage provider is explicitly approved.
- Keep internal broker notes, policy exception notes, fraud/risk flags, and unapproved credit proposal notes outside client-facing forms.

Recommended component use:

| Fact-find need | OpnForm implementation pattern | Twenty destination |
| --- | --- | --- |
| Names, reference IDs, short answers | OpnForm text fields with validation where useful | Contact, Fact Find Session, Mortgage Application |
| Long goals/objectives and explanations | Long text fields | Loan Requirement, Credit Proposal notes |
| Phone/email | Phone and email fields | Contact |
| DOB, employment start, milestone dates | Date fields | Contact, Employment, Deal dates |
| Yes/no flags | Checkbox fields | Scenario flags, consent gates, workflow gates |
| Enumerations | Select or multi-select fields | Status, role, purpose, residency, employment type |
| Money, limits, balances, percentages | Number fields with currency/percentage labels and backend validation | Income, Expense, Asset, Liability, Loan Requirement |
| Repeatable rows | Repeatable form sections or separate linked OpnForm section forms | Employment, Income, Expenses, Assets, Liabilities, Securities |
| Sectioned form flow | Multi-page forms or one form per section | Fact Find Section status |
| Document requests | Checklist/selects plus file handoff where approved | Document Metadata, external storage reference |
| System metadata | Hidden components | Integration/audit references |

Conditional logic should drive scenario questions:

- Show co-applicant sections only when another applicant is involved.
- Show guarantor questions only when a guarantor is selected.
- Show self-employed/business fields for self-employed applicants.
- Show rental income and investment expense questions for investment properties.
- Show construction fields for construction loans.
- Show refinance/discharge fields for refinance scenarios.
- Show credit-card closure/refinance questions when cards or loans are being refinanced.
- Show visa/residency/FIRB prompts only when required by applicant status and policy.

## Core Objects

### Fact Find Session

Primary record for a fact find linked to a Deal, Mortgage Application, Contacts, and Household.

Recommended fields:

- Fact find name.
- Related Deal.
- Related Mortgage Application.
- Primary Contact.
- Co-applicant Contacts.
- Household.
- Status.
- Completion percentage.
- Client submitted at.
- Processor reviewed at.
- Broker reviewed at.
- Last client activity at.
- Last staff activity at.
- Missing information count.
- Form provider.
- Form definition ID.
- Form definition version.
- Form submission reference.
- Portal session/reference ID.
- Form mapping status.
- Form mapping errors.
- Schema snapshot reference.
- Submission snapshot reference.
- Version or revision number.

Recommended statuses:

1. Not started.
2. Client invited.
3. In progress.
4. Client submitted.
5. Processor review.
6. Missing information.
7. Broker review.
8. Complete.
9. Archived/replaced.

### Fact Find Section

Tracks each major section separately so staff can see what is incomplete without opening every field.

Recommended fields:

- Section name.
- Section status.
- Completion percentage.
- Assigned owner.
- Required flag.
- Last updated by client/staff.
- Missing information summary.
- Related document requests.
- Staff review status.

Recommended section statuses:

1. Not started.
2. In progress.
3. Submitted.
4. Needs clarification.
5. Under review.
6. Complete.
7. Waived/not applicable.

## Fact Find Sections

### 1. Applicant Details

Capture:

- Legal name.
- Preferred name.
- Contact details.
- Date of birth where approved for storage.
- Residency/citizenship status where approved.
- Marital/relationship status if relevant.
- Current residential address.
- Previous address history if required.
- Contact preferences.

Maps to:

- Contacts.
- Mortgage Application applicant roles.
- Portal profile.

### 2. Co-Applicant and Guarantor Details

Capture:

- Additional applicant Contacts.
- Guarantor Contacts.
- Applicant role: borrower, co-borrower, guarantor, non-borrowing spouse/contact.
- Relationship to primary applicant.
- Contact and consent status.

Rule:

- Do not duplicate the same person as multiple records. Use one Contact with role relationships.

### 3. Household and Dependants

Capture:

- Household grouping.
- Dependants.
- Living arrangement.
- Rent/board/home ownership status.
- Shared expense assumptions.

Maps to:

- Household.
- Expense model.
- Serviceability assumptions.

### 4. Goals, Objectives, and Requirements

Capture:

- Loan purpose.
- Desired outcome.
- Purchase/refinance/pre-approval/construction/investment/debt consolidation/equity release.
- Loan amount sought.
- Timing and settlement requirements.
- Product preferences: fixed/variable, offset, redraw, interest-only, split loans.
- Important client priorities.
- Known constraints or concerns.

Maps to:

- Loan Requirement.
- Credit Proposal objectives.
- BID/compliance evidence.

### 5. Employment

Capture per applicant:

- Employment type.
- Employer or self-employed business.
- Role/title.
- Start date.
- Full-time/part-time/casual/contractor/self-employed basis.
- Probation status.
- ABN/ACN where relevant.
- Evidence status.

Maps to:

- Employment.
- Income.
- Document checklist.

### 6. Income

Capture per applicant:

- Salary/wages.
- Overtime.
- Bonus/commission.
- Rental income.
- Business income.
- Government benefits.
- Other income.
- Amount and frequency.
- Gross/net indicator.
- Evidence/document requirement.

Rules:

- Track declared income separately from verified income.
- Track serviceability-included flag separately from raw declared amount.

### 7. Expenses

Capture:

- Living expenses by category.
- Household expense basis.
- Rent/board.
- Childcare/schooling.
- Insurance.
- Utilities.
- Transport.
- Other recurring costs.
- Declared versus verified status.

Rules:

- Keep expense categories structured enough for reporting and later lender mapping.
- Do not rely on one free-text monthly expense field.

### 8. Assets

Capture:

- Cash/savings.
- Property.
- Vehicles.
- Superannuation.
- Shares/investments.
- Business assets.
- Other assets.
- Ownership percentage.
- Estimated value.
- Evidence status.

### 9. Liabilities

Capture:

- Home loans.
- Personal loans.
- Credit cards.
- Car loans.
- HECS/HELP.
- Buy-now-pay-later.
- Business debts where relevant.
- Repayment amount and frequency.
- Limit and balance.
- To be refinanced or closed flag.

Rules:

- Track existing lender and external reference where available.
- Track closure/refinance intent explicitly for packaging.

### 10. Property and Security

Capture:

- Security address.
- Purchase price or estimated value.
- Occupancy: owner occupied or investment.
- Property type.
- Contract status.
- Title/search status.
- Valuation requirement/status.
- Existing mortgage details where relevant.

Maps to:

- Property/Security.
- Valuation.
- Loan Requirement.

### 11. Documents

Capture:

- Required documents by applicant and scenario.
- Requested date.
- Received date.
- Verified date.
- Expiry date.
- Waived/rejected status.
- External storage reference.

Rule:

- Fact find can request/check documents, but Twenty should store metadata and links by default, not raw binaries.

### 12. Consent and Disclosures

Capture:

- Privacy consent.
- Credit guide acknowledgement.
- Electronic communication consent.
- ID verification consent.
- Open banking consent.
- Credit check consent where applicable.
- Version and timestamp of consent/disclosure wording.

Rules:

- Consent records need timestamp, version, actor, and evidence reference.
- Consent status should gate specialist-tool workflows where required.

## Completion and Readiness Rules

Minimum requirements before moving to Credit Review:

- Applicant Details complete for all required Contacts.
- Goals/Objectives complete.
- Employment and Income complete or explicitly waived/not applicable.
- Expenses complete.
- Assets and Liabilities complete or explicitly waived/not applicable.
- Loan Requirement complete.
- Required consents captured.
- Required document checklist generated.
- Missing information count is zero or all missing items have an approved waiver.

Minimum requirements before Ready for Lodgement:

- Fact Find Session complete.
- Required document metadata verified or waived.
- Credit Proposal approved.
- BID/compliance requirements complete.
- Serviceability status recorded or not-required reason recorded.
- Lodgement target confirmed.

## Portal Behaviour

The client portal should present the fact find as a guided conversation and dashboard checklist, but write structured data back to Twenty.

Required portal behaviour:

- Save progress by section.
- Allow multiple applicants to complete their own details.
- Show missing sections clearly.
- Allow staff to request clarification on a section.
- Avoid exposing internal notes or credit-risk commentary.
- Keep client-facing wording separate from internal field names.

## Staff Review Behaviour

Processor review should focus on completeness and evidence.

Broker review should focus on objectives, suitability, recommendation readiness, and compliance.

Recommended review states:

- Not reviewed.
- Ready for review.
- Reviewed.
- Needs clarification.
- Approved.
- Waived/not applicable.

## BrokerEngine-Like Operating Pattern

The target workflow should mimic the useful operating concepts of BrokerEngine without assuming access to BrokerEngine internals:

- A central fact-find record linked to the client/deal/application.
- Section-level completion and missing-information visibility.
- Staff queues for incomplete fact finds.
- Document requests linked to fact-find sections.
- Client portal prompts for outstanding information.
- Broker/processor review before credit proposal and lodgement preparation.
- Clear separation between client-provided answers, staff review notes, compliance evidence, and lodgement-ready application data.

## Reporting

Fact-find reporting should show:

- Fact finds not started.
- Client invited but no activity.
- In progress by age.
- Submitted and awaiting processor review.
- Missing information by section.
- Broker review pending.
- Complete and ready for credit review.
- Average completion time.
- Bottleneck sections.

## Acceptance Criteria

The fact-find setup is ready for pilot when:

- Staff can create a Fact Find Session from a Deal.
- Each session has section statuses and completion percentage.
- Contacts and Household records link to the fact find.
- Portal-ready field groups are defined.
- Missing information creates tasks or visible queue items.
- Completion gates Credit Review and Ready for Lodgement.
- Sensitive data and consent rules are documented.
