# BrokerEngine Fact Find Template Reference

Source reviewed: BrokerEngine fact-find builder page `Copy of BrokerEngine Fact Find Template v6.2 (Generic-Updated)` at `/my-profile/fact-find-templates/7849/`.

Captured on: 2026-05-02.

Purpose: use the observed BrokerEngine fact-find style and field inventory as a practical reference for BrokerApp's LIXI-first fact find. This document does not copy restricted LIXI schema content, borrower data, BrokerEngine configuration JSON, lender guidebooks, or production lodgement payloads.

Build specification: see [OpnForm Residential Fact Find Specification](./opnform-residential-fact-find-spec.md) for the borrower-facing OpnForm page structure, option sets, field keys, and Product Search Run mapping.

## Builder Style

BrokerEngine uses a wizard-style form builder with page tabs and a component palette. The observed builder style should be reproduced in BrokerApp with OpnForm or the future internal form builder:

- Left component palette grouped by `Basic`, `Advanced`, `Layout`, `Data`, and `Premium`.
- Basic components include text field, text area, number, password, checkbox, select boxes, select, and radio.
- Main canvas uses stacked bordered panels with section headers and nested applicant blocks.
- Wizard pages are presented as horizontal chips.
- Repeating data is handled with repeatable blocks, such as investment properties, motor vehicles, savings accounts, home loans, cards, and previous addresses.
- Conditional sections are shown from scenario questions, such as applicant count, self-employed status, additional income, second job, investment properties, liabilities, and financial security answers.
- Internal/default mapping fields are present in the form for asset type, liability type, expense type, frequency, and hidden workflow use.
- Required borrower fields are marked with `*`.
- Currency, percentage, numeric-only, phone-mask, and date input behavior is used heavily.
- Long broker/legal declarations should be maintained through approved compliance templates, not free-text copied between systems.

## Wizard Pages

1. Online Fact Find Form.
2. Personal Details.
3. Employment and Income Details.
4. Assets.
5. Liabilities.
6. Living Expenses.
7. Loan Features.

## Online Fact Find Form

Purpose: determine whether the session should show one or two applicant pathways.

Fields:

- Number of applicants.
- Options: one applicant only, two applicants.

BrokerApp implementation:

- Store on Fact Find Session as `applicantCount`.
- Residential default should support Applicant 1 plus up to three co-applicants.
- Use this to create Applicant 1 and, when required, Applicant 2, Applicant 3, and Applicant 4 sections.
- Applicants 2 to 4 should support relationship-to-primary and same-as-primary controls but still map to separate Contacts.
- Use applicant index metadata rather than separate data models for each applicant slot.

## Personal Details

Applicant 1 and Applicant 2 share the same base layout in the observed template. BrokerApp should extend the same pattern to Applicant 3 and Applicant 4 for residential files. Applicants 2 to 4 include additional `Partner of Applicant 1`, `Relationship to Primary Applicant`, and `Same as Applicant 1` controls where useful.

### Applicant Identity

Fields:

- Title.
- First name.
- Middle name.
- Last name.
- Preferred name.
- Date of birth.
- Gender.
- Overseas flag.
- Mobile phone.
- Landline phone.
- Email.
- Self-employed flag.
- Other names known by flag.
- Other names.
- First home buyer flag.
- Marital status.
- Citizenship status.
- Visa type.
- Visa expiry date.
- Partner of Applicant 1 flag, co-applicants only.
- Relationship to Primary Applicant, co-applicants only.

LIXI-first destinations:

- Contact.
- Applicant Profile.
- Mortgage Application applicant role.
- Compliance and consent identity matching.

BrokerEngine aliases to preserve:

- `Preferred Name`.
- `Self Employed`.
- `Have you ever been known by any other name(s)?`
- `Are you a first home buyer?`
- `Partner of Applicant 1`.

### Dependants

Fields:

- Number of dependants for Applicant 1.
- Additional dependants to Applicant 1 for co-applicants where needed.
- Repeating dependent name.
- Repeating dependent date of birth.
- Repeating dependent age in years.

LIXI-first destinations:

- Household.
- Dependants.
- Serviceability assumptions.

### Identification

Observed fields:

- Driver licence number.
- Driver licence expiry date.

BrokerApp implementation:

- Keep identity document metadata/status in Twenty.
- Do not store raw identity document files in Twenty unless storage and privacy controls are approved.
- Use external ID verification provider references for document capture and verification result.

### Retirement Planning

Fields:

- Current age, calculated/display.
- Planned retirement age.
- Years to retirement, calculated/display.
- If the loan term extends beyond retirement age, planned repayment strategy:
  - Additional repayments.
  - Superannuation.
  - Selling investments.
  - Downsizing.
  - Inheritance.
  - Other.
- Other repayment strategy details.

LIXI-first destinations:

- Applicant Profile.
- Loan Requirement.
- Credit Proposal responsible lending notes.
- Serviceability and exit strategy review.

### Current Address

Fields:

- Address lookup.
- Manual address switch.
- Street.
- City/suburb.
- State.
- Postcode.
- Country.
- Start date.
- Housing status.
- Board payment.
- Board/rent frequency.
- Monthly rental payment.
- Will continue post settlement flag.
- Address type.
- Street address.
- City.
- State.
- Postal code.
- End date.
- Primary address flag.
- Additional addresses in last 3 years count.

Co-applicant additional controls:

- Same as Applicant 1 for current address.

### Previous Address History

Repeating block, observed up to three previous addresses per applicant.

Fields:

- Same as Applicant 1, co-applicants only.
- Address lookup.
- Manual address switch.
- Street address.
- City.
- State.
- Postal code.
- Country.
- Start date.
- End date.
- Address type.
- Housing status.
- Primary flag.

LIXI-first destinations:

- Contact addresses.
- Address history.
- Application residency history.
- Serviceability living arrangement inputs.

## Employment and Income Details

Applicant 1 and Applicant 2 share the same section pattern in the observed template. BrokerApp should reuse the same section definitions for Applicants 3 and 4 based on applicant count.

### Employment Type Gate

Field:

- Employment type.

Conditional pathways:

- Self-employed details.
- Current PAYG employment details.
- Second job details.
- Previous employment history.

### Self-Employed Details

Fields:

- Company.
- Role description.
- Type of employment.
- Status.
- Company ABN.
- Start date.
- Role category.
- Basis.
- On probation.
- End date.
- Company type.
- Company ACN.
- Contact title.
- Contact first name.
- Contact last name.
- Contact email.
- Contact fax.
- Contact mobile phone.
- Contact work phone.
- Street.
- City.
- State.
- Country.
- Postcode.
- Years in industry.

Income fields:

- Latest tax year ending.
- Latest net profit before tax amount.
- Previous tax year ending.
- Previous net profit before tax amount.
- Income type, default self-employed profit.
- Frequency, default annual.

Accountant details:

- Business name.
- Phone number.
- Email.

LIXI-first destinations:

- Employment.
- Organisation/company.
- Income.
- Accountant/professional contact.
- Serviceability inputs.

### Current PAYG Employment Details

Fields:

- Job position/role.
- Status.
- Role category.
- Employer business name.
- Type of employment.
- Employment basis.
- Employer overseas flag.
- Employer phone number.
- Overseas employer contact number.
- Employer contact person.
- Company ABN.
- On probation.
- Start date.
- Years in industry.
- End date.
- Company type.
- Employer address lookup.
- Address line.
- City/suburb.
- State.
- Country.
- Postcode.

Income fields:

- Amount.
- Income type, default salary gross.
- Frequency, default annual.
- Additional income flag.
- Additional income repeating rows, observed three rows:
  - Amount.
  - Income type.
  - Frequency.
- Second job flag.

### Second Job Details

Fields:

- Job position/role.
- Status.
- Type of employment.
- Employer business name.
- Employer phone number.
- Employer contact person.
- Start date.
- Role category.
- Employment status.
- Company ABN.
- On probation.
- Years in industry.
- End date.
- Company type.
- Address line.
- City/suburb.
- State.
- Country.
- Postcode.
- Income amount.
- Income type.
- Frequency.

### Previous Employment History

Fields:

- Number of previous employers in the last three years.
- Exclude current employer helper text.
- Repeating previous employer rows, observed three rows:
  - Job position/role.
  - Employment basis.
  - Employer business name.
  - Role category.
  - Status, default previous employment.
  - Type of employment.
  - Start date.
  - End date.
  - Address line.
  - City/suburb.
  - State.
  - Country.
  - Postcode.

Additional field:

- Additional commentary on employment/income.

## Assets

### Owner-Occupied Real Estate

Fields:

- Own current residence flag.
- Asset type: real estate.
- Description.
- Amount.
- Income type, rental income existing.
- Frequency, monthly.
- Street.
- City.
- State.
- Postcode.
- Estimated value.
- Ownership.
- Property address lookup.
- Manual address switch.

### Investment Properties

Gate:

- Investment property flag.

Repeating fields:

- Street.
- City.
- State.
- Postcode.
- Estimated value.
- Rent per week.
- Ownership.
- Asset type: real estate.
- Description.
- Frequency, weekly.
- Income type, rental income existing.

### Motor Vehicles

Gate:

- Motor vehicle flag.

Repeating fields:

- Make/year.
- Estimated value.
- Ownership.
- Asset type: motor vehicle.

### Savings and Transaction Accounts

Gate:

- Savings/transaction account flag.

Repeating fields:

- Bank/account number.
- Balance.
- Ownership.
- Asset type: savings account.

### Superannuation

Gate:

- Superannuation flag.

Repeating fields:

- Description.
- Estimated value.
- Ownership.
- Asset type: superannuation.

### Other Assets

Fields:

- Home contents value.
- Home contents ownership.
- Shares value.
- Shares ownership.
- Other assets flag.
- Other asset description.
- Other asset value.
- Other asset ownership.
- Additional commentary on assets.

Internal/default fields observed:

- Asset type.
- Internal address placeholders.
- Internal amount, income type, and frequency placeholders.

## Liabilities

Each liability group uses a yes/no gate, a confirmation checkbox for no liabilities, repeating liability rows, refinance flag, ownership, and internal mapping to liability and expense types.

### Home Loans

Fields:

- Home loan flag.
- No home loans confirmation.
- Financial institution.
- BSB.
- Account number.
- Security property, with options for own home and investment properties 1 to 10.
- Limit.
- Balance.
- Interest rate.
- Monthly repayment.
- Interest-only/principal-and-interest type.
- Interest-only expiry date.
- Loan type.
- Fixed expiry date.
- Term remaining.
- Refinance flag.
- Ownership.
- Liability type: mortgage loan.
- Expense type: mortgage loan.
- Frequency, monthly.
- Expense outstanding amount.
- Liability description.

### Credit Cards

Fields:

- Credit card flag.
- No credit cards confirmation.
- Financial institution.
- Limit.
- Balance.
- Interest rate.
- Refinance flag.
- Ownership.
- Liability type: credit card.
- Expense type: credit card.
- Frequency, annual.
- BSB.
- Account number.
- Term remaining.
- Liability description.

### Store Cards and Buy Now Pay Later

Fields:

- Store card flag.
- Example helper for BNPL providers.
- No store cards confirmation.
- Financial institution.
- Limit.
- Balance.
- Interest rate.
- Refinance flag.
- Ownership.
- Liability type: store card.
- Expense type: store card.
- Amount.
- Term remaining.
- Account number.
- BSB.
- Frequency, annual.
- Expense outstanding amount.
- Liability description.

### Personal Loans

Fields:

- Personal loan flag.
- No personal loans confirmation.
- Financial institution.
- BSB.
- Account number.
- Limit.
- Balance.
- Monthly repayment.
- Term remaining.
- Interest rate.
- Refinance flag.
- Ownership.
- Liability type: personal loan.
- Expense type: personal loan.
- Frequency, monthly.
- Expense outstanding amount.
- Liability description.

### Car Loans

Fields:

- Car loan flag.
- No car loans confirmation.
- Financial institution.
- BSB.
- Account number.
- Limit.
- Balance.
- Monthly repayment.
- Term remaining.
- Interest rate.
- Refinance flag.
- Ownership.
- Liability type: car loan.
- Expense type: car loan.
- Frequency, monthly.
- Expense outstanding amount.
- Liability description.

### Other Loans

Selector options:

- HECS/HELP debt.
- Lease.
- Overdraft.
- ATO or Centrelink.

HECS/HELP fields:

- Australian Government.
- Balance.
- Monthly repayment.
- Ownership.
- Liability type: HECS/HELP debt.
- Term remaining years.
- Interest rate.
- Limit.
- Expense type.
- BSB.
- Account number.
- Refinance flag.
- Frequency, monthly.
- Expense outstanding amount.
- Liability description.

Lease, overdraft, ATO/Centrelink fields:

- Financial institution.
- BSB.
- Account number.
- Limit.
- Balance.
- Monthly repayment.
- Term remaining or term remaining years.
- Interest rate.
- Refinance flag.
- Ownership.
- Liability type.
- Expense type.
- Frequency, monthly.
- Expense outstanding amount.
- Liability description.

Additional field:

- Additional commentary on liabilities.

## Living Expenses

All expense sections use monthly values, category subtotals, comments where required, frequency, balance/internal value, and refinance flag where applicable.

Categories and fields:

- Owner occupied property:
  - Utilities.
  - Repairs and maintenance.
  - Body corporate and strata fees.
  - Rates, taxes, levies.
  - Other household items.
  - Expense type: utilities and rates owner occupied.
  - Subtotal.
  - Comment required if expense is zero.
- Investment property/properties:
  - Utilities.
  - Repairs and maintenance.
  - Body corporate and strata fees.
  - Other household items.
  - Expense type: utilities and rates investment.
  - Subtotal.
  - Comments.
- Recreation and entertainment:
  - Alcohol and tobacco.
  - Gambling.
  - Restaurant.
  - Membership fees and subscriptions.
  - Holidays.
  - Expense type: recreation and entertainment.
  - Subtotal.
  - Comment required if expense is zero.
- Clothing and personal care:
  - Clothing and footwear.
  - Cosmetics.
  - Personal care.
  - Expense type: clothing and personal care.
  - Subtotal.
  - Comment required if expense is zero.
- Communication:
  - Telephone, mobile, and home.
  - Internet.
  - Pay TV and streaming services.
  - Expense type: telephone and internet.
  - Subtotal.
  - Comment required if expense is zero.
- Transport:
  - Public transport.
  - Vehicle running cost.
  - Parking and tolls.
  - Expense type: transport.
  - Subtotal.
  - Comment required if expense is zero.
- Groceries:
  - Supermarket shop.
  - Expense type: groceries.
  - Comment required if expense is zero.
- Childcare:
  - Childcare fees including nanny fees.
  - Comments.
  - Expense type: childcare.
- Medical and health:
  - Doctor and dentist.
  - Optical and pharmaceutical.
  - Expense type: medical and health excluding insurance.
  - Subtotal.
  - Comment required if expense is zero.
- Education:
  - Higher education, vocational training, and professional fees.
  - Private schooling and tuition.
  - Public or government primary and secondary education.
  - Expense type: education.
  - Subtotal.
  - Comments.
- Insurance:
  - General insurance.
  - Health insurance.
  - Sickness and personal accident insurance.
  - Expense type: insurance.
  - Subtotal.
  - Comments.
- Rent expense:
  - Rent monthly.
  - Rent that will continue post settlement helper.
  - Comments.
  - Expense type: rental expense.
- Other:
  - Pet care.
  - Detail fields.
  - Other expense amounts.
  - Expense type: other living expenses.
  - Subtotal.
  - Note other living expenses.
- Total monthly living expenses:
  - Total monthly expenses.

BrokerApp implementation:

- Capture user-entered monthly amount and comment.
- Store normalized monthly amount for serviceability.
- Preserve source category, lender-category mapping, and AFG/ApplyOnline alias where needed.
- Treat zero-value categories with required comment as review triggers.

## Loan Features and Declarations

### Desired Loan Features

Checkbox options:

- Fixed Rate.
- Variable Rate.
- Combined Variable & Fixed.
- Principal & Interest.
- Interest Only.
- Electronic Banking.
- Additional Repayments.
- Offset Account.
- Loan & Product Package.
- No Monthly or Annual Fees.
- Loan Variations.
- Redraw.
- Portability.
- Line of Credit.
- Interest Capitalisation.
- Interest in Advance.
- Branch Access.

Free-text fields:

- Other requirements.
- Preferred lenders, lenders to avoid, and preferred loan splits.

LIXI-first destinations:

- Loan Requirement.
- Product Search Run filters.
- Product Shortlist Option recommendation reasons.
- Credit Proposal objectives and product fit.

Product-search implementation:

- Treat desired features as structured filters, not only free-text notes.
- Hard-filter on mandatory requirements where the client or broker marks them mandatory.
- Score preferred features separately so the broker can see useful trade-offs.
- Preserve preferred lenders, excluded lenders, and preferred loan splits in the Loan Requirement and Product Search Run.
- Carry the feature match results into Product Shortlist Option and Credit Proposal rationale so the selected lender/product is explainable.

### Financial Security

Questions:

- Accountant or financial planner advice received.
- Difficulty meeting financial commitments in the last two years.
- Pending judgements or legal proceedings that may affect financial position.
- Debts in arrears.
- Director of a company.

Each yes answer needs a details field.

BrokerApp implementation:

- Store as financial-security review fields.
- Raise serviceability, compliance, and policy review tasks when any answer is positive.
- Keep supporting evidence references in the document/evidence store.

### Applicant Declaration and Signatures

Observed declaration themes:

- Client confirms the questionnaire and linked living expense worksheet are true and correct.
- Client agrees to receive communications and disclosure documents electronically.
- Client confirms receipt of the Credit Guide and Privacy Disclosure Statement and Consent.
- Client consents to use of personal, financial, and credit information for credit assistance, credit arrangement, related products/services, and approved referral relationships.

Signature fields:

- Applicant 1 signature.
- Applicant 1 first name.
- Applicant 1 last name.
- Applicant 1 date.
- Applicant 2 signature, first name, last name, and date when present.
- Applicant 3 signature, first name, last name, and date when present.
- Applicant 4 signature, first name, last name, and date when present.

BrokerApp implementation:

- Use approved compliance document templates for exact wording.
- Store acknowledgement status in Compliance Acknowledgements.
- Store signature/e-sign evidence outside Twenty where possible, with a reference in Twenty.
- Do not treat fact-find declaration as a replacement for separate Credit Guide, Privacy Consent, BID, or credit proposal acceptance workflow unless compliance approves the combined wording.

## BrokerApp Object Mapping

| BrokerEngine section | BrokerApp normalized destination | Notes |
| --- | --- | --- |
| Applicant count | Fact Find Session, Applicant Profiles | Drives conditional Applicant 2, 3, and 4 sections. |
| Applicant personal details | Contacts, Applicant Profiles | Use one Contact per person, with roles for primary/co-applicant. |
| Dependants | Household/Dependants, Serviceability inputs | Need household model or dependent rows. |
| Addresses | Contact addresses, Applicant Profile address history | Retain current and previous addresses separately. |
| Identification | ID verification status/reference | Avoid raw ID document storage in Twenty. |
| Retirement planning | Loan Requirement, Credit Proposal | Required for loan term beyond retirement. |
| Employment | Employment, Organisation, Income | Separate PAYG, self-employed, second job, previous employment. |
| Income | Income records, Serviceability inputs | Keep source frequency and normalized annual/monthly values. |
| Assets | Asset records, Property Securities for real estate | Real estate assets may also become securities. |
| Liabilities | Liability records, Expense records | Refinance flag feeds loan purpose and settlement tasks. |
| Living expenses | Expense records, Serviceability Assessment | Preserve category and normalized monthly value. |
| Loan features | Loan Requirement, Product Search Run | Feeds product filter and recommendation rationale. |
| Financial security | Compliance, Credit Proposal, policy review | Positive answers require review tasks. |
| Declaration/signature | Compliance Acknowledgement | Exact wording must come from approved templates. |

## Implementation Notes

- The Opportunity/Deal dashboard should launch the fact-find session and show section completion, clarification status, evidence status, and lodgement readiness.
- Broker Settings should hold the template definition and mapping profile, not individual deals.
- The client portal should autosave each answer into Fact Find Field Answers, grouped by Fact Find Sections.
- The portal backend should normalize approved answers into Contacts, Applicant Profiles, Loan Requirements, Property Securities, Document Requests, Compliance Acknowledgements, Serviceability Assessments, Product Search Runs, and Credit Proposals.
- Required fields should be enforced in the portal/form layer and again in backend validation before readiness gates progress.
- Applicants 2 to 4 should reuse the same section definitions with applicant index metadata rather than a duplicated data model.
- Product search and serviceability should not start until required fact-find sections are complete or explicitly waived.
