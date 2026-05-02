# Serviceability Calculator Analysis

## Scope

This note records the first technical review of the supplied lender calculator workbooks:

- `Broker Servicing Calculator.xlsm`
- `WBC-BrokerServiceabilityCalculator (1).xlsm`
- `ANZ-Home-Loan-Calculator (1).xlsm`

The review is for BrokerApp architecture and data modelling. It does not copy lender proprietary sheets, macros, hidden data tables, rate tables, or formulas into the repository. The workbooks should be treated as controlled lender/aggregator artefacts and stored outside Git.

## Important Limitation

The ANZ and Westpac/WBC files are macro-enabled Excel workbooks. They include VBA projects, hidden and very-hidden worksheets, named ranges, array formulas, and workbook UI logic. Reading workbook structure and formulas is enough to understand the calculation architecture, but it is not enough to safely reproduce a lender-certified outcome.

For production use, BrokerApp should either:

- call an approved serviceability provider or aggregator API,
- automate the approved lender workbook in a controlled internal environment where licensing permits it, or
- reimplement the lender logic only after a formal rule extraction and benchmark-test process.

## Common Calculation Pattern

The calculators follow the same broad broker workflow:

1. Capture applicants, spouses/non-applicant spouses, dependants, household composition, postcode/state, and loan purpose.
2. Normalize income by type, ownership split, frequency, tax treatment, and verification method.
3. Apply lender income shading and policy adjustments.
4. Convert gross income into taxable, net, HEM, DTI, and serviceability-specific income figures.
5. Calculate tax, Medicare, student/training loan commitments, and other statutory deductions.
6. Compare declared living expenses to HEM or lender living-expense tables.
7. Add rent, board, child support, existing commitments, credit cards, personal loans, leases, STSL/HELP, and mortgage debts.
8. Calculate new lending repayments using assessment buffers, floor rates, repayment type, loan term, and interest-only periods.
9. Apply policy gates such as DTI, LVR, LMI, repayment type, refinance checks, guarantor rules, and special-scheme rules.
10. Produce an outcome such as pass, refer, fail, UMI/surplus, NSR, maximum borrowing capacity, DTI, LVR, and policy warnings.

This is why the serviceability tool must sit inside the Opportunity workspace after fact-find review and before product filtering and credit proposal generation.

## Westpac / WBC Calculator

The WBC workbook is a full serviceability calculator rather than a single visible worksheet. It has a visible `Serviceability` sheet and many supporting calculation/data sheets. Important sheets observed:

- `Applicant Lists`
- `Income Calculation`
- `IncomeData`
- `Employer Income`
- `Self-employed Applicant`
- `Self-employed Business`
- `Self-employed Assets`
- `Self-employed Liabilities`
- `Self-employed Rental Income`
- `Rental Income`
- `RITD`
- `Other Income`
- `Expense Calculation`
- `Customer Declared Expenses`
- `Static Data`
- `STSL Calculator`
- `Remaining Term Calculator`
- `Bridging Loan Calculator`
- `Family Guarantee Calculator`
- `Home Guarantee Scheme Calc`
- `Second Mortgage Calculator`
- `Simple LVR Calculator`

Several support sheets are very-hidden. The workbook uses thousands of named ranges and formulas. VBA routines manage screen setup, tab order, data entry popups, applicant row visibility, LMI-sensitive recalculations, and a floating serviceability result window.

### WBC Logic Observed

Income:

- Supports up to multiple applicants and non-applicant spouse income sections.
- Separates base, non-base, bonus, self-employed, rental, rental tax deduction, other income, and foreign income.
- Uses data tables for employer income and other income records rather than relying only on the visible serviceability sheet.
- Applies income shading, annualisation rules, volatility checks, and self-employed income checks.
- Includes tax and Medicare tables, income cycle data, and STSL calculations.

Expenses:

- Builds household keys based on applicant household membership and spouse status.
- Calculates HEM from state/location, marital status, dependants, income band, and household income.
- Compares HEM to customer-declared comparable expenses and declared living expenses.
- Separates comparable and non-comparable expenses, rent/board, child support/alimony, and other commitments.
- Uses household income apportioning to allocate expenses back to applicants.

New lending:

- Calculates an assessment rate from final interest rate plus buffer, with floor rate comparison.
- Distinguishes owner-occupied and investment mortgage assessment rates.
- Captures term, interest-only term, repayment type, and serviceability repayment.
- Includes streamlined refinance eligibility checks and policy warning rows.

Existing commitments:

- Separates shareable and non-shareable commitments.
- Uses borrower counts, ownership splits, outstanding balance, current limit, declared repayment, remaining term, and commitment type rules.
- Includes STSL/HELP-style balance and repayment treatment.

Policy and output:

- Tracks LMI flag changes, DTI checks, repayment checks, and other policy flags.
- Includes LVR, family guarantee, shared equity, home guarantee scheme, bridging, second mortgage, foreign currency, and SMSF supporting calculators.
- The visible Serviceability sheet is the broker-facing dashboard, but the actual calculation state is distributed across hidden sheets and named ranges.

## ANZ Calculator

The ANZ workbook is built around UMI and borrowing power scenarios. Important sheets observed:

- `Menu`
- `SoP 1`
- `SoP 2`
- `SoP 3`
- `SoP 4`
- `Internal Ref`
- `Configurable Items`
- `TAX TABLE`
- `RatesTable (eAdmin)`
- `eAdmin File`
- `reference-data`
- `Base Income`
- `Securities`
- `Exp Breakdown`
- `LMI Qualifier`
- `Fee Calculator`
- `Repayment`
- `Bridging Loan Calculator`
- `Lock Rate Calculator`
- `Construction Loan Calculator`
- `Security Swap Calculator`

`SoP 1` is visible, while related SoP sheets and reference sheets are hidden. The workbook uses named ranges for sensitivity rates, assessment floors, HEM values, rate tables, DTI references, LMI references, and borrowing power references.

### ANZ Logic Observed

Income:

- The SoP sheets contain `INCOMES`, `TOTAL INCOMES`, `EXPENSES`, `TOTAL EXPENSES`, `TOTAL UMI`, `Maximum Potential Borrowing Power`, `Debt to Income Ratio`, and `Results` sections.
- The sheet distinguishes customer-stated income from bank-assessed income.
- It calculates monthly gross income, monthly sensitised income, monthly income for HEM, taxable income, deductions, DTI income, and volatility shading.
- It handles salary, bonus, commission, overtime, ATO/self-employed income, rental income, overseas income, dividends, interest, and other income.

Expenses and UMI:

- Converts income and expenses to monthly figures.
- Calculates HEM using hidden reference tables for single/couple, gross/net, dependants, and income thresholds.
- Captures living expenses, other commitments, linked liabilities, and lending rows.
- Produces UMI and a policy outcome from income, tax, HEM, deductions, existing debts, and sensitised new debts.

Borrowing power:

- Uses named borrowing-power references and macro/UDF logic to goal-seek the maximum loan amount supported by the UMI outcome.
- Uses weighted rate and term assumptions across lending rows.
- Includes DTI and LMI qualifier logic across SoP scenarios.

Rates and policy:

- Contains eAdmin/rate tables and routines for rate refresh.
- Important named assumptions include sensitivity rate, sensitivity floor, home-loan and personal-loan expense multipliers, other-income sensitivity multipliers, rental sensitivity multipliers, LMI modifier limits, maximum LVR thresholds, default max borrow term, and HEM tables.
- VBA/string inspection shows custom logic for monthly conversion, tax, HEM, repayment, DTI, borrowing power, LMI, LVR, stamp duty, security fees, and rate lookup.

## BrokerApp Data Model Implications

The current BrokerApp approach is directionally right: serviceability should be related to the Opportunity and Mortgage Application, not treated as a top-level sidebar module. The Serviceability Assessment object now needs to carry a richer lender-calculator result snapshot.

Minimum fields to keep per serviceability run:

- Opportunity and Mortgage Application links.
- Lender/calculator/provider.
- Calculator workbook reference and calculator version.
- Assessment date and assumption effective date.
- Assessment method: ANZ UMI, WBC serviceability, aggregator SVC, manual review.
- Requested loan amount and selected scenario.
- Total annual and monthly income.
- Sensitised income monthly.
- Tax expense monthly.
- HEM expense monthly and HEM basis.
- Declared expense monthly.
- Existing commitments monthly.
- New lending repayment monthly.
- UMI or lender surplus monthly.
- Surplus/shortfall monthly.
- NSR where used.
- Maximum borrowing estimate.
- Assessment rate, assessment floor, and interest buffer.
- DTI, LVR, LMI required, and LMI estimate.
- Income shading summary.
- Policy gate summary.
- Input snapshot reference.
- Result snapshot.
- Status: not started, requested, pass, refer, fail.

The `resultSnapshot` field should hold a compact output payload only. Do not store raw workbook files, macros, hidden tables, or lender proprietary formula dumps in Twenty.

## BrokerApp Workflow Implications

Serviceability should become a deal tool inside the Opportunity dashboard:

1. Broker completes first call and captures objectives.
2. Client signs or acknowledges credit guide and privacy consent.
3. Client completes fact find and document requests.
4. Broker reviews identity, open banking, income, expenses, assets, liabilities, and securities.
5. Broker creates one or more Serviceability Assessment runs inside the Opportunity.
6. Broker chooses lender/scenario/calculator and records inputs, assumptions, and outputs.
7. Only serviceable scenarios move into Product Search Runs.
8. Product search filters the AFG product matrix and lender policy notes.
9. Broker compares options and records rejected options with reasons.
10. Credit Proposal uses the selected serviceability run, product search run, shortlist options, customer objectives, and policy notes.
11. ApplyOnline or AFG Flex lodgement occurs only after the proposal is approved and production API readiness is confirmed.

## Recommended Implementation Architecture

### Phase 1: Evidence Capture

Use BrokerApp/Twenty to record serviceability assessment metadata and results manually or from uploaded reports. Keep the lender workbook outside Git and outside Twenty unless secure approved storage is confirmed.

### Phase 2: Workbook Adapter

Create a server-side adapter for each lender workbook version:

- workbook identifier and version,
- supported lender/scenario types,
- input mapping from BrokerApp/LIXI-style data,
- named range/cell map,
- required assumptions,
- output cells/named ranges,
- policy warnings,
- validation checklist.

The adapter should create an input snapshot and output snapshot for audit. It should not expose hidden workbook content to users.

### Phase 3: Controlled Calculation Runner

If permitted by lender terms and internal compliance, run Excel or an approved calculation engine in a controlled service. The runner should:

- open the approved workbook version,
- populate only mapped input cells/ranges,
- recalculate the workbook,
- read mapped output cells/ranges,
- save a PDF/report or result snapshot,
- return structured results to BrokerApp,
- log workbook version, timestamp, and checksum.

### Phase 4: Native Engine

Only after benchmark cases are validated should BrokerApp implement native calculation logic. This would require:

- versioned lender policy rules,
- separate assumptions table,
- full test suites per lender,
- benchmark output comparisons to approved calculators,
- change control for every rate, tax, HEM, STSL, LMI, DTI, LVR, and policy update.

## Product Search Implication

The product filter tool should not run before serviceability. Product search should use:

- customer objectives and requirements,
- fact-find data,
- target loan amount and LVR,
- purpose and occupancy,
- repayment preferences,
- rate type preference,
- offset/redraw requirements,
- desired loan features from the fact find, including additional repayments, package/no-fee preference, loan variation, portability, line of credit, interest-in-advance/capitalisation, branch access, and electronic banking,
- construction/refinance/purchase flags,
- serviceability outcome,
- DTI/LVR/LMI policy flags,
- lender policy notes,
- product matrix sheet selections,
- broker exclusions and included lenders.

The final shortlist must show why each lender/product was considered, why the recommended option was selected, and why rejected options were not recommended.

## Readiness Questions

- Are ANZ and WBC calculator workbook automations permitted under the broker/lender terms?
- Can AFG, ApplyOnline, or AFG Flex provide official serviceability outcomes or lender-calculator APIs?
- Which workbook versions are current and approved for use on the day of assessment?
- What evidence must be retained for compliance: workbook, PDF output, screenshot, input snapshot, or lender/aggregator reference?
- Which calculator outputs may be shown to clients, and which are internal-only?
- How often are tax, HEM, STSL, rate, LMI, and lender-policy assumptions updated?
- Which cases require manual credit/policy review even if the numeric outcome passes?
