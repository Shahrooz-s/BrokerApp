# BrokerEngine Sidebar and Workflow Template Reference

This reference captures the read-only BrokerEngine observations used to configure BrokerApp. It is a configuration guide, not a copy of live borrower data.

## Read-Only Capture Boundaries

- No BrokerEngine records were saved, submitted, deleted, archived, shared, synced, or modified.
- No live sent SMS history should be imported as reusable templates.
- BrokerEngine email template bodies should stay private unless explicitly approved for storage in the target workspace.
- GitHub should receive template structure, names, subjects, merge-variable mapping, board stages, and tool architecture only.

## Deal Sidebar

BrokerApp opportunities should use this deal workspace structure:

- Overview: DealDash, Team, Lender, Related Parties
- Fact Find: Goals, Applicants, Dependants, Assets, Other Income, Liabilities, Living Expenses, Financial Security
- Strategy: Interview Guide, Security, Funding Position, Products, Smart Docs, BrokerWizard
- Lodgement: Lodgement Funding, Credit Proposal, Submission
- Right rail: Notes, Checklists, Tasks, Emails, Texts, Key Dates, Reports, 1-Click Workflows

The current BrokerEngine Other Income page includes:

- Broker-side compact fact-find view.
- Lock/unlock control.
- Email or download fact-find control.
- Autosync notice for the new client-side fact find.
- Question: "Do any of the applicants have other income sources?"
- Yes/No answer.
- Validation/help prompt: "Please select if any of the applicants have other income."

## Right Rail Tools

Observed right rail drawers:

- Notes: note list and create note action.
- Checklists: checklist drawer and menu actions.
- Tasks: pending/completed filter, due date, assignee, complete, snooze, pin, expand.
- Emails: compose action and empty/history state.
- Texts: sent-to, sent-by, send status, failure reason, message body history.
- Key Dates: Stage Due, Finance, Settlement, Created At, Broker Handover, Exp. Lodged, Lodged, Pre Approval, Formal Approval, Expected Settlement, Settlement Refi, Settlement Purchase, and custom text fields.
- Reports: PDF/Word report generation controls.
- 1-Click Workflows: scenario list with favourite toggles.

## Reports

Initial report templates to model:

- 01. Deal Submission Guide
- 02. Deal (AIP to Full) Cover Sheet
- 03. Funding Position Report
- 04. Loan Submission Advice
- 05. Formal Approval Advice
- 06. Ready To Settle Advice (with Funding)
- 07. Authority To Debit/Credit Form
- 08. Settlement Advice
- 09. Deal History Report

## 1-Click Workflow Scenarios

Initial workflow scenarios:

- Lender Rebate
- Guarantor Home Loan
- Fast Refi
- Non-Standard Ownership Structure
- Client Lives Overseas
- Construction
- FIRB
- Mat Leave/ Pregnant Pause
- Deposit Bond
- First Home Owners Grant
- Off the Plan
- Debt Recycling
- Purchasing in a Trust
- Rate Lock
- Favourable Purchase
- Multiple Offset Accounts
- Cross Securitisation
- Interest in Advance
- Refinance
- Debt Consolidation
- Simultaneous or Prior Settlement
- Repayment Type IO vs PI
- Split Home Loan
- SMSF
- LMI Waiver
- Low Doc Loan
- Bridging Loan
- Commercial Loan
- Business Loan
- Non Face to Face Process Required
- Pre-Approval
- FHB Stamp Duty Concession
- First Home Loan Deposit Scheme (FHLDS/NHG)
- Property Insurance Referral
- Accounting Referral
- Financial Planning Referral
- Property Management Referral
- Property Advisory Referral
- Loan Protection Insurance
- Equipment Loan
- Separation
- Equity Release / Cash Out
- Self-Employed

## Settings Structure

BrokerApp settings should mirror these areas:

- Lenders: Lender Details, Products, Packages, Offers.
- Workflow: Workflow Templates, Email Templates, Task Templates, SMS Templates, Boards and Stages.
- Fact Find: Fact Find Classic, Fact Find New.
- Smart Docs: Loan Smart Docs, Templates.
- Other: Checklists, Teams, Team Roles, Notifications, Security, Integrations, User Management, FinanceVault, Broker Group Settings.

Observed BrokerEngine settings status:

- Email Templates: populated.
- Task Templates: populated.
- SMS Templates: no saved templates shown.
- Workflow Templates: no saved templates shown.
- Checklists: populated with default residential/loan checklists.

## Task Templates

Observed Task Templates fields:

- Template Name
- Description
- Assignee
- Priority
- Created At
- Last Updated

The task catalogue is represented in BrokerApp source as structured metadata, including priority and inferred board/stage mapping. Full operational action-step text should be imported into the private workspace when approved.

Initial observed task template names:

- AIP Issued: Update stage due date
- Broker to Call Client on Settlement
- Call Lead - 1st Attempt
- Call Lead - 2nd Attempt
- Call Lead - 3rd Attempt
- Check on ETA for certification
- Complete Compliance Checklist
- Complete Formal Approval Checklist
- Complete Pre > Full Conversion Checklist
- Complete Ready to Settle Checklist
- Complete Settlement Booked Checklist
- Complete Settlement Checklist
- Complete Signed App Docs Received Checklist
- Complete the Broker Handover Checklist
- Complete the FLEX Sync Prep Checklist or Proposal Preparation Checklist (Broker)
- Complete the Pre-Research Checklist
- Complete the Proposal Preparation (Team) Checklist
- Confirm Final Payment Made
- Confirm Lender Rebate Paid
- Confirm MIR Response Received by Lender
- Confirm Progress Payment Made
- Confirm Progress Payment Received and ETA on Payment
- Confirm Submission Received
- Contact Lead - Final Attempt
- Ensure Assessment is on Track
- Follow Up Document Request
- Follow up Mortgage Docs with Client
- Follow Up on Conditional/Missing Items
- Follow up on Letter of Commencement Requirements
- Follow Up Outstanding Documents
- Follow up Settlement Booking
- Follow Up Signed Application Docs
- Letter of Commencement Requirements
- Pre-approval close to expiry
- Prepare Deposit Bond
- Prepare Discharge Authority
- Prepare FHOG for Submission
- Prepare for Submission
- Progress Payment Final (completion)
- R01. Complete the Review Checklist
- R01 Fixed Rate Review
- R01 Interest Only Review
- R02. Broker to Check the Reviewed Deal
- R03. Prepare the Refinance Review Report and Send to Broker
- R04. Send Refinance Report to Client
- R05. Action Variation
- R06. Request Pricing from Lender
- R07. Follow Up Pricing Request with Lender
- R08. Follow Up Lender to Confirm New Pricing is Applied
- R09. Send Pricing Review Report to the Client
- R10. Prepare the 'No Change' Review Report
- R11. Send No Change Review Report to Client
- Request Docs via FinanceVault
- Request Outstanding Documents
- Review App in AOL and Send Documents to Client for Signing
- Review App in AOL and Submit to Lender
- Review Conditional Approval/MIR from Lender
- Second Follow Up on Conditional/ Missing Items
- Send Loan Proposal to the Client
- Submit Deposit Bond Application
- Submit Discharge Authoriy
- Submit First Home Owners Grant Forms
- Submit First Progress Payment Request
- Submit Progress Payment Middle Payments (PP)

## Checklist Templates

Observed checklist list:

- LEND A LOAN Checklist (Loan)
- AFG Residential
- Residential

BrokerApp should treat these as checklist templates that can be attached to stages, 1-click workflows, and right-rail checklist actions. Checklist item details should be imported privately before production use.

## Board Stages

Observed BrokerEngine boards:

- Asset Finance (`12726`)
- Construction (`11193`)
- Deal (`11191`)
- Lead (`11190`)
- Maintenance (`11192`)
- Partnerships (`11396`)

BrokerApp also includes draft board templates for Commercial Lending and Business Lending so those workflows can be configured without forcing them into the residential mortgage board.

Asset Finance board:

1. New Asset Finance Lead
2. Attempted Contact 1
3. Attempted Contact 2
4. Attempted Contact 3
5. Initial Call Held
6. Referred to Broli
7. On Hold
8. Settled
9. Lost

Construction board:

1. Letter of Commencement
2. Progress Payment 1
3. Progress Payment 2
4. Progress Payment 3
5. Progress Payment 5
6. Progress Payment 4
7. Progress Payment 6+
8. Completion

Lead board:

1. New Lead
2. Attempted Contact 1
3. Attempted Contact 2
4. Attempted Contact 3
5. Initial Call Held > Get Docs
6. Docs Requested
7. Research > Servicing
8. Prepare Loan Proposal
9. Loan Proposal Presented
10. Client Accepted > Handover
11. On Hold
12. Lost Opps

Deal board:

1. Outstanding Supporting Documents
2. Prepare for Submission
3. App Docs With Client
4. Signed App Docs Returned
5. Application Lodged
6. AIP Issued
7. AIP > Full Conversion
8. Conditional/MIRs
9. Conditions/MIRs With Client
10. Conditions/MIRs With Lender
11. Formal Approval
12. Mortgage Docs Issued
13. Mortgage Docs Returned
14. Ready To Settle
15. Settlement Booked
16. Settlement
17. Lost/Declined

Maintenance board:

1. VAR: Request
2. VAR: Forms Requested
3. VAR: Forms sent to client
4. VAR: Submitted to lender
5. VAR: Settled

Partnerships board:

1. Prospecting
2. Contact Attempt 1
3. Contact Attempt 2
4. Contact Attempt 3
5. Interest Confirmed
6. Meeting/Discussion Held
7. Agreement in Principle
8. Referral Agreement Signed
9. Onboarding/Training
10. Lost/Not Interested

Each BrokerApp stage should support:

- Stage mapping.
- Stage due days.
- Amber warning threshold.
- Red warning threshold.
- Optional stage due task.
- Workflow trigger flags.
- Entry and exit gates.

Captured first-stage thresholds:

- Asset Finance - New Asset Finance Lead: due 3 days, amber 2, red 1.
- Construction - Letter of Commencement: due 30 days, amber 2, red 0.
- Deal - Outstanding Supporting Documents: due 4 days, amber 2, red 0.
- Lead - New Lead: due 1 day, amber 0, red 0.
- Maintenance - VAR: Request: due 3 days, amber 1, red 0.
- Partnerships - Prospecting: due 3 days, amber 2, red 1, stage due task enabled.

## Products Settings

Observed Products settings included:

- Loans and Credit Card tabs.
- Product search.
- Duplicate Product, Bulk Edit, filter, and Add Loan Product controls.
- Columns: Product Name, Loan Type, Lender, Interest Rate, Payment Option, Last Rate Update, Last Updated, System Product, Start Date, End Date, Product Type, and Loan Product ID.
- Pagination showing a large catalogue, so BrokerApp should not rely on UI scraping for full product import.

BrokerApp should source product records from AFG product matrix/API exports and store import run metadata, source sheet/file/API version, effective dates, and mapping errors. BrokerEngine product rows can be used as a visual reference for the admin table only.

## Settings Map

BrokerApp settings areas now model:

- General broker profile and workspace defaults.
- Lender details.
- Product catalogue.
- Packages and offers.
- Lender calculators and policy references.
- Document categories and checklist gates.
- Boards and stages.
- Email templates.
- Task templates.
- SMS templates.
- Workflow templates.
- Fact find templates and form builder.
- Client portal sessions.
- Smart docs and report templates.
- Integration credentials and sync ownership.
- Security, privacy, and audit.
- AI broker research assistant.

These are also represented in the Twenty app as Broker Settings records. After deploying and installing the app, run the app post-install function to seed the records:

```bash
yarn twenty remote switch brokerapp-v1
yarn twenty exec --postInstall
```

Recommended improvements:

- Treat LIXI as the canonical data model and store BrokerEngine, AFG, ApplyOnline, and AFG Flex names as aliases.
- Keep contacts and companies reusable, but make opportunities the deal cockpit.
- Keep private BrokerEngine template bodies out of GitHub unless approved.
- Use AFG product matrix/API imports for product data.
- Gate stage movement by documents, consent, fact-find review, serviceability, product-policy fit, and broker approval.
- Persist OpnForm answers into normalized BrokerApp fact-find answer records.

## Email Template Import Approach

BrokerEngine email templates are represented in source as metadata seeds in:

- `twenty-source/packages/twenty-apps/community/brandroll-mortgage/src/config/brokerengine-template-library.ts`
- `twenty-source/packages/twenty-apps/community/brandroll-mortgage/src/config/template-merge-variable-map.ts`

The metadata includes names, subjects, workflow categories, related board/stage, and merge-variable references. Full template body import should be a private workspace step because those bodies are operational/proprietary content and may include business-specific wording.

BrokerApp should render approved template bodies through a renderer that resolves BrokerApp/Twenty paths such as:

- `opportunity.name`
- `mortgageApplication.selectedLender`
- `applicantProfiles[role=PRIMARY].displayName`
- `factFindSession.portalSessionUrl`
- `broker.brandName`

The renderer should maintain BrokerEngine token aliases during migration so existing bodies can be migrated safely before being converted to BrokerApp-native paths.
