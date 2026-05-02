# OpnForm Residential Fact Find Specification

Source reviewed: BrokerEngine fact-find builder page `Copy of BrokerEngine Fact Find Template v6.2 (Generic-Updated)` at `/my-profile/fact-find-templates/7849/`.

Captured on: 2026-05-02.

Purpose: define the first BrokerApp residential fact-find template for OpnForm. Field naming is LIXI-first for the normalized BrokerApp data model, with BrokerEngine labels preserved as borrower-facing labels or aliases where they are operationally useful.

This file is a build specification. It should not contain restricted LIXI schema content, lender guidebook content, production lodgement payloads, or long legal declaration wording. Exact compliance wording must come from approved Credit Guide, Privacy Consent, electronic communications, BID, and credit proposal templates.

## Form Structure

Use a multi-page conversational form with these pages:

1. Online Fact Find Form
2. Personal Details
3. Employment & Income Details
4. Assets
5. Liabilities
6. Living Expenses
7. Loan Features

Recommended OpnForm behaviour:

- Show one page at a time with progress, save/resume, and applicant-specific section headings.
- Use hidden fields for `opportunityId`, `mortgageApplicationId`, `factFindSessionId`, `primaryContactId`, `coApplicantContactId`, `householdId`, `templateVersion`, and `portalSessionId`.
- Store each answer through the portal backend before normalizing into Twenty.
- Create one Fact Find Section per page and one Fact Find Field Answer per submitted/autosaved field.
- Use repeatable groups for addresses, employments, incomes, assets, liabilities, properties, and expenses.
- Support residential applications with one primary applicant plus up to three co-applicants. Use one applicant component template keyed by applicant index rather than four separate data models.
- Use condition logic from gate questions, not static all-fields-visible forms.
- Keep sensitive uploads, identity documents, open-banking payloads, and raw evidence outside Twenty unless approved storage controls are implemented.

## Shared Option Sets

### State

- Australian Capital Territory
- New South Wales
- Northern Territory
- Queensland
- South Australia
- Tasmania
- Victoria
- Western Australia
- Other

### Country

- Australia

### Frequency

- Annually
- Monthly
- Fortnightly
- Quarterly
- Weekly

### Ownership

- Applicant 1
- Applicant 2
- Applicant 3
- Applicant 4
- Joint

### Yes/No

- Yes
- No

## Page 1: Online Fact Find Form

### Number of Applicants

Borrower-facing label: `Number of Applicants`

Field key: `factFind.applicantCount`

Component: select or radio

Options:

- One Applicant
- Two Applicants
- Three Applicants
- Four Applicants

Mapping:

- `FactFindSession.applicantCount`
- `FactFindSession.maxApplicantCount`
- Creates Applicant 1 section and conditionally Applicant 2, Applicant 3, and Applicant 4 sections.
- Applicant 1 is always the primary applicant.
- Applicants 2 to 4 are co-applicants unless the broker changes the role to guarantor or borrowing entity.

## Page 2: Personal Details

Repeat the section for Applicant 1 through Applicant 4 based on `factFind.applicantCount`.

Conditional visibility:

- Show Applicant 1 when `applicantCount >= 1`.
- Show Applicant 2 when `applicantCount >= 2`.
- Show Applicant 3 when `applicantCount >= 3`.
- Show Applicant 4 when `applicantCount >= 4`.
- Use the same `applicant[n]` field keys for each applicant index.
- Applicant tabs should read `Primary`, `Co-Applicant 1`, `Co-Applicant 2`, and `Co-Applicant 3`.

### Applicant Identity

| Borrower-facing label | Field key | Component | Options / notes |
| --- | --- | --- | --- |
| Applicant Type | `applicant[n].applicantType` | select | Person, Company/Trust/Borrowing Entity where later enabled |
| Applicant Role | `applicant[n].applicantRole` | select | Primary, Co-Applicant 1, Co-Applicant 2, Co-Applicant 3, Guarantor, Borrowing Entity |
| Title | `applicant[n].title` | select | Mr, Miss, Ms, Mrs, Dr, Prof. |
| First Name | `applicant[n].firstName` | text | Required |
| Middle Name | `applicant[n].middleName` | text | Optional |
| Last Name | `applicant[n].lastName` | text | Required |
| Preferred Name | `applicant[n].preferredName` | text | BrokerEngine alias: Preferred Name |
| Mother's Maiden Name | `applicant[n].mothersMaidenName` | text | Broker-side compact applicant view field; confirm storage need before borrower-facing use |
| Date of Birth | `applicant[n].dateOfBirth` | date | Required when approved for storage |
| Gender | `applicant[n].gender` | select | Male, Female; add Mx/non-binary-inclusive handling before production if compliance requires |
| Are you overseas? | `applicant[n].isOverseas` | radio | Yes/No |
| Mobile Phone | `applicant[n].mobile` | phone | Contact mobile |
| Landline Phone | `applicant[n].landline` | phone | Optional |
| Email | `applicant[n].email` | email | Required |
| Self Employed | `applicant[n].selfEmployed` | radio | No, Yes |
| Have you ever been known by any other name(s)? | `applicant[n].hasOtherNames` | radio | Yes/No |
| Other names | `applicant[n].otherNames` | text area | Show when has other names |
| Are you a first home buyer? | `applicant[n].firstHomeBuyer` | radio | Yes/No |
| Marital Status | `applicant[n].maritalStatus` | select | DeFacto, Divorced, Married, Other, Separated, Single, Widowed |
| Citizenship Status | `applicant[n].citizenshipStatus` | select | Australian Citizen, Permanent Resident / NZ Citizen, Temporary/Non-Resident |
| Visa Type | `applicant[n].visaType` | select | 309, 457, 461, 475, 482, 485, 487, 489, 495, 820, Other |
| Visa Expiry Date | `applicant[n].visaExpiryDate` | date | Show for temporary/non-resident |
| Partner of Applicant 1 | `applicant[n].partnerOfApplicant1` | checkbox | Applicants 2 to 4 only |
| Relationship to Primary Applicant | `applicant[n].relationshipToPrimaryApplicant` | select/text | Applicants 2 to 4 only |

Mapping:

- Contact
- Applicant Profile, with `applicantIndex`, `applicantRole`, and `roleLabel`
- Mortgage Application applicant role
- Compliance and ID verification metadata

### Dependants

| Borrower-facing label | Field key | Component | Options / notes |
| --- | --- | --- | --- |
| No. of Dependents | `applicant[n].dependantsCount` | select | None, 1, 2, 3, 4, 5, 6 |
| Additional Dependents | `applicant[n].additionalDependantsCount` | select | None, 1, 2, 3, 4, 5, 6; Applicants 2 to 4 only where needed |
| Dependent Name | `applicant[n].dependants[].name` | text | Repeat |
| Dependent Date of Birth | `applicant[n].dependants[].dateOfBirth` | date | Repeat |
| Dependent Age | `applicant[n].dependants[].ageYears` | number | Calculated/display |

Mapping:

- Household/dependants
- Serviceability inputs

### Identification

| Borrower-facing label | Field key | Component | Notes |
| --- | --- | --- | --- |
| Driver Licence Number | `applicant[n].driverLicenceNumber` | text | Store according to privacy policy |
| Driver Licence Expiry Date | `applicant[n].driverLicenceExpiryDate` | date | Store according to privacy policy |

Mapping:

- ID verification reference/status
- Do not store raw ID document files in Twenty by default.

### Retirement Planning

| Borrower-facing label | Field key | Component | Options / notes |
| --- | --- | --- | --- |
| Current Age | `applicant[n].currentAge` | number | Calculated/display |
| Planned Retirement Age | `applicant[n].plannedRetirementAge` | number | Required if loan term exceeds expected retirement |
| Years to Retirement | `applicant[n].yearsToRetirement` | number | Calculated/display |
| Planned Repayment Strategy | `applicant[n].retirementRepaymentStrategy` | select/radio | Additional repayments, Superannuation, Selling investments, Downsizing, Inheritance, Other |
| Other Repayment Strategy Details | `applicant[n].retirementRepaymentStrategyOther` | text area | Show when Other |

Mapping:

- Applicant Profile
- Loan Requirement
- Credit Proposal responsible lending notes

### Address History

Current address fields:

- Address lookup
- Manual address switch
- Street
- City/suburb
- State
- Postcode
- Country
- Start date
- Housing Status
- Board payment
- Board/rent frequency
- Monthly rental payment
- Will continue post settlement
- Address Type
- End date
- Primary address
- Additional addresses in last 3 years count
- Same as Applicant 1, Applicants 2 to 4 only

Housing Status options:

- Boarding
- Caravan
- Own Home
- Own Home Mortgage
- Renting
- Supplied By Employer
- With Parents
- Other

Board/rent Frequency options:

- Weekly
- Fortnightly
- Monthly

Address Type options:

- Residential Address
- Mailing Address
- Business
- Non-Residential Property
- Old Residential
- Work Address
- Seasonal
- Temporary

Previous address count options:

- None
- 1
- 2
- 3

Mapping:

- Contact addresses
- Applicant Profile address history
- Serviceability living arrangement inputs

## Page 3: Employment & Income Details

Repeat for Applicant 1 through Applicant 4 based on `factFind.applicantCount`.

### Employment Type Gate

Borrower-facing label: `Employment Type`

Field key: `applicant[n].employmentType`

Options:

- PAYG/Salaried Employee
- Self Employed
- Unemployed
- Home Duties
- Full Time Student
- Retired

Conditional sections:

- Show self-employed details when Self Employed.
- Show PAYG details when PAYG/Salaried Employee.
- Show second job details when second job flag is Yes.
- Show previous employment rows based on previous employers count.

### Employment Option Sets

Status options:

- Primary Employment
- Secondary Employment
- Previous Employment

Role Category options:

- Managers & Administrators
- Professionals
- Associate Professionals
- Tradesperson & Related Workers
- Advanced Clerical & Service
- Clerical, Sales & Service
- Production & Transport
- Labourers & Related Workers

Employment Basis options:

- Full Time
- Part Time
- Contract
- Temporary
- Casual

Company Type options:

- Private
- Public

Contact Title options:

- Mr
- Miss
- Ms
- Mrs
- Dr
- Prof.

Income Type options:

- Salary - Gross
- Salary - Net
- Rental Income - Existing
- Rental Income - New
- Family Allowance
- Other Investment
- Overtime - Gross
- Overtime - Net
- Pension & Social Security
- Allowances
- Bonus
- Commission
- Dividends
- Maintenance and Support
- Other Income
- Self Emp - Amortisation
- Self Emp - Depreciation
- Self Emp - Interest-HP-Lease
- Self Emp - Profit
- Self Emp - Superannuation

Previous employers count options:

- None
- 1
- 2
- 3

Mapping:

- Employment
- Organisation/company
- Income
- Accountant/professional contact
- Serviceability inputs

## Page 4: Assets

Use gate questions for each asset class, then repeat rows as needed.

### Asset Groups

- Owner-occupied real estate
- Investment properties
- Motor vehicles
- Savings and transaction accounts
- Superannuation
- Home contents
- Shares
- Other assets

Shared asset fields:

- Description
- Amount / estimated value
- Ownership
- Asset type
- Address fields where the asset is real estate
- Income type and frequency where the asset generates income

Default real-estate income settings:

- Income type: Rental Income - Existing
- Owner-occupied frequency: Monthly when rent/income is captured
- Investment property frequency: Weekly when rent per week is captured

Mapping:

- Asset records
- Property/Security records for real estate assets
- Income records for rental income
- Serviceability inputs

## Page 5: Liabilities

Use yes/no gate questions and no-liability confirmations. Every liability should capture lender, limit, balance, repayment, frequency, ownership, refinance/close intent, and internal type mapping.

### Liability Groups

- Home loans
- Credit cards
- Store cards and buy-now-pay-later
- Personal loans
- Car loans
- HECS/HELP debt
- Lease
- Overdraft
- ATO or Centrelink debt

Interest-only/principal-and-interest options:

- Principal & Interest
- Interest Only

Loan Type options:

- Fixed
- Variable

Frequency options:

- Annually
- Monthly
- Fortnightly
- Quarterly
- Weekly

Mapping:

- Liability records
- Expense records
- Loan Requirement refinance/closure intent
- Serviceability inputs

## Page 6: Living Expenses

All expense rows should capture monthly value, source frequency, category, comment, zero-value explanation where required, and normalized monthly value.

Expense Type options captured from BrokerEngine:

- Rental Expense
- Other Payments
- Other Living Expenses
- Utilities & Rates - OO
- Utilities & Rates - INV
- Telephone & Internet
- Groceries
- Recreation & Entertainment
- Clothing & Personal Care
- Medical & Health(ex Insurance)
- Transport
- Education
- Childcare
- Insurance

Default frequency:

- Monthly

Frequency options:

- Annually
- Monthly
- Fortnightly
- Quarterly
- Weekly

Recommended expense sections:

- Owner occupied property
- Investment property/properties
- Recreation and entertainment
- Clothing and personal care
- Communication
- Transport
- Groceries
- Childcare
- Medical and health
- Education
- Insurance
- Rent expense
- Other living expenses
- Total monthly living expenses

Mapping:

- Expense records
- Serviceability Assessment
- Lender-specific serviceability calculator inputs
- ApplyOnline/AFG alias mapping when confirmed

## Page 7: Loan Features

This page is critical for product search, lender filtering, credit proposal rationale, and suitability evidence.

### Desired Loan Features

Borrower-facing label: `DESIRED LOAN FEATURES`

Component: checkbox group or checkbox list

Field key: `loanRequirement.desiredLoanFeatureSelections`

Options captured:

- Fixed Rate
- Variable Rate
- Combined Variable & Fixed
- Principal & Interest
- Interest Only
- Electronic Banking
- Additional Repayments
- Offset Account
- Loan & Product Package
- No Monthly or Annual Fees
- Loan Variations
- Redraw
- Portability
- Line of Credit
- Interest Capitalisation
- Interest in Advance
- Branch Access

Free-text fields:

- Other Requirements
- Any preferred lenders? Any lenders you do not wish to deal with? Preferred loan splits?

BrokerApp normalized mapping:

- `LoanRequirement.ratePreference`: Fixed Rate, Variable Rate, Combined Variable & Fixed.
- `LoanRequirement.repaymentType`: Principal & Interest, Interest Only, Line of Credit.
- `LoanRequirement.offsetRequired`: Offset Account.
- `LoanRequirement.redrawRequired`: Redraw.
- `LoanRequirement.mustHaveFeatures`: features the applicant says are mandatory.
- `LoanRequirement.niceToHaveFeatures`: features useful but not mandatory.
- `LoanRequirement.preferredLenders`: preferred lenders text.
- `LoanRequirement.excludedLenders`: lenders to avoid text.
- `LoanRequirement.preferredLoanSplits`: preferred splits text.
- `ProductSearchRun.desiredLoanFeatureSelections`: copied snapshot of selected options.
- `ProductSearchRun` boolean feature filters: rate, repayment, offset/redraw, package, no-fee, portability, line of credit, branch, interest-in-advance, and related features.
- `ProductShortlistOption.reasonConsidered`: why the lender/product matched or did not match desired features.
- `CreditProposal.recommendationRationale`: why the selected lender/product best met requirements/objectives.

Product-search rules:

- Serviceability assessment should run before product shortlisting where lender-specific servicing is needed.
- Mandatory desired features should be hard filters unless the broker documents a reason to relax them.
- Preferred features should score/rank products, not automatically exclude every product.
- Preferred/excluded lenders should filter lender universe before comparing products.
- The product search tool should preserve the original selected features, the filters applied, and any broker override.
- Credit proposal generation must explain which desired features were met, not met, waived, or traded off.

### Financial Security

Use yes/no radio fields plus details text when Yes.

Questions captured:

- Have you received advice from an accountant or financial planner regarding your requirements or financial objectives?
- Have you had difficulty in meeting your financial commitments in the past 2 years?
- Do you have any pending judgements or legal proceedings that may impact on your financial situation in the foreseeable future?
- Are any of your debts in arrears?
- Are you a director of a company?

Mapping:

- Compliance review status
- Serviceability Assessment notes
- Credit Proposal risk/mitigant notes
- Lender policy research prompt

### Applicant Declaration and Signatures

Do not copy long declaration wording from BrokerEngine. Use approved templates for:

- Credit Guide acknowledgement.
- Privacy Disclosure Statement and Consent.
- Electronic communications consent.
- Fact-find truth and completeness acknowledgement.
- Credit assistance and related services consent.

Signature fields:

- Applicant 1 signature, first name, last name, date
- Applicant 2 signature, first name, last name, date, when `applicantCount >= 2`
- Applicant 3 signature, first name, last name, date, when `applicantCount >= 3`
- Applicant 4 signature, first name, last name, date, when `applicantCount >= 4`

Mapping:

- Compliance Acknowledgements
- E-sign evidence reference
- Fact Find Session readiness gate

## Product Search Integration

The Desired Loan Features section must be available inside the Deal/Opportunity dashboard product search tool.

Recommended product search flow:

1. Load completed Loan Requirement and Fact Find answers.
2. Confirm serviceability inputs and lender servicing status.
3. Load AFG product matrix sheets selected by broker.
4. Apply hard filters: lender exclusions, state, purpose, occupancy, LVR, loan amount, repayment type, mandatory features.
5. Apply policy checks: employment length, self-employed history, residency/visa, security type, construction, cash-out, credit history, and other notes.
6. Score preferred features: offset, redraw, no monthly/annual fees, branch access, electronic banking, portability, package, additional repayments.
7. Present shortlist with evidence columns: product, lender, serviceability status, policy fit, features met, features not met, fees/rates, reason considered, reason selected/rejected.
8. Generate credit proposal rationale from selected shortlist and documented trade-offs.

Minimum records created or updated:

- Product Search Run
- Product Shortlist Options
- Lender Product matches
- Serviceability Assessment references
- Credit Proposal draft references
