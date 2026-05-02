# BrokerApp Deal-Centric Mortgage Configuration

## Operating Model

BrokerApp uses native Twenty Opportunities as the broker deal board. Contacts and Companies stay as shared relationship records, while the broker tools are linked to the Opportunity so each loan file has one working dashboard.

This version is LIXI-aware, not a production LIXI lodgement implementation. Field names and relationships are based on public LIXI mortgage concepts such as parties, application, liabilities, assets, income, securities, serviceability, valuations, LMI, documents, decisions, and status events. Restricted LIXI schemas, samples, enumerations, and lender guidebook content are not embedded.

## Sequential Deal Flow

1. Create Opportunity and link Contacts as applicant profiles.
2. Send credit guide, privacy consent, BID disclosure, and any fee/quote documents.
3. Record acknowledgement against each applicant or participant.
4. Open a portal fact-find session once compliance acknowledgements are ready.
5. Collect applicant identity, open banking, income, expenses, assets, liabilities, securities, documents, and objectives.
6. Run serviceability before product filtering.
7. Run product search against selected AFG product matrix sheets and policy notes.
8. Shortlist lender/product options with serviceability and policy-fit reasons.
9. Generate the credit proposal with the comparison set, selected lender/product, rejected options, BID rationale, and policy checks.
10. Lodge through ApplyOnline or AFG Flex once API access and production readiness are confirmed.
11. Track conditions, valuation, LMI, formal approval, settlement, and review.

## Opportunity Fields

The app adds these deal-level fields to Opportunities:

- Broker workflow stage.
- Client requirements/objectives.
- Compliance status.
- Fact find status.
- Serviceability status.
- Product research status.
- Credit proposal status.
- Lodgement readiness.
- Lodgement target.
- Loan amount.
- Post cap LVR.
- Stage due date.
- Policy exception summary.
- Next broker action.

These fields support BrokerEngine-style boards and list views without making every mortgage tool a sidebar module.

## Deal Tools

Each Opportunity can link to:

- Applicant profiles linked back to native Contacts.
- Compliance acknowledgements.
- Fact find sessions.
- Mortgage applications.
- Loan requirements.
- Property securities.
- Document requests.
- Serviceability assessments.
- Product search runs.
- Product shortlist options.
- Credit proposals.
- Application conditions.
- Valuation orders.
- LMI assessments.
- Lender contacts.
- Integration events.

## Spreadsheet Mapping

`Broker Servicing Calculator.xlsm`, `WBC-BrokerServiceabilityCalculator (1).xlsm`, and `ANZ-Home-Loan-Calculator (1).xlsm` map into serviceability assessments:

- Lender or calculator source.
- Calculator workbook reference and version.
- Assessment type.
- Assessment date and assumption effective date.
- Total annual income.
- Total monthly income.
- Sensitised income monthly.
- Tax expense monthly.
- HEM and declared expenses.
- HEM basis.
- Existing commitments monthly.
- New lending repayment monthly.
- UMI or lender surplus monthly.
- Surplus/shortfall monthly.
- Assessment rate.
- Assessment rate floor and interest rate buffer.
- Net available income.
- NSR.
- DTI.
- LVR.
- LMI required and estimated premium.
- Max borrowing estimate.
- Pass/refer/fail outcome.
- Income shading summary.
- Policy gate summary.
- Input and result snapshot references.
- Policy notes.

The supplied ANZ and WBC workbooks are macro-enabled and rely on hidden/very-hidden worksheets, named ranges, and VBA/UDF logic. BrokerApp should not copy workbook formulas or hidden lender content into Git or Twenty. The practical first release should capture serviceability evidence and structured outputs inside the Opportunity. Automated calculator execution should be handled by lender-specific adapters only where lender terms, licensing, and compliance approval permit it.

`Product-Information-Matrix-23-April-2026.xlsx` maps into lender products and product search runs:

- Product sheet selection: Pro-Packs, Standard Variable, Basic, Equity, Fixed, Intro, Low Doc, Non Conforming, Reverse Mortgage.
- Lender name and product names.
- State availability.
- Owner occupied/investment flags.
- Max LVR.
- Loan amount range.
- Repayment option.
- Variable/fixed/assessment rates.
- Fees.
- Offset, redraw, construction, LMI, and rate-lock availability.

`Residential-Lender-Contacts-23-April-2026.xlsx` maps into lender contacts:

- Financial institution.
- Contact name.
- Job title.
- State.
- Direct phone/mobile/email.
- Business address.

## What This Does Not Yet Build

The current Twenty app deploys the data model. The following still need dedicated implementation:

- Client portal UI and conditional-login fact-find form.
- Document generation and e-signature provider integration.
- ID verification provider integration.
- Open banking provider integration.
- Product matrix import job.
- Product filtering/research UI inside the deal.
- Serviceability calculator parser/importer.
- ApplyOnline or AFG Flex lodgement integration.
- BrokerEngine-style bulk edit modals and board collapse/expand UI.

Those are application/front-component or external-service jobs. The v0.2 model prepares the records and relationships they will write to.
