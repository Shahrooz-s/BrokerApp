# BrokerApp App for Twenty

This Twenty app defines the LIXI-aware mortgage broking data model for the BrokerApp CRM deployment.

It does not include restricted LIXI schemas, sample payloads, lender guidebooks, or production lodgement logic. It uses public LIXI concepts as a reference model and keeps ApplyOnline, AFG Flex, AFG/BrokerEngine, and specialist-provider integration references as configurable CRM records.

## v0.6 Direction

BrokerApp treats native Twenty Opportunities as the broker board/deal/opportunity record. Contacts and Companies remain in the sidebar because they are reusable relationship records. Mortgage work happens from the Opportunity through direct fields and related deal tools:

- Applicant profiles linked to Contacts and Opportunities.
- Compliance acknowledgements for credit guide, privacy consent, BID, and fee documents.
- Portal fact-find sessions.
- Document requests and review notes.
- Serviceability assessments based on lender or aggregator calculators.
- Product search runs based on the AFG product matrix sheets.
- Product shortlist options with policy, serviceability, fit, and recommendation reasons.
- Credit proposals explaining the selected product, comparison set, BID rationale, and policy fit.
- Valuation, LMI, conditions, lender contacts, and integration events.

The app uses public LIXI concepts as a field-design reference. It does not copy restricted LIXI schemas or sample payloads. Production LIXI lodgement, lender certification, ApplyOnline submission, and AFG Flex submission remain integration work until the relevant API documentation, credentials, and licensing are confirmed.

The serviceability model now reflects the supplied ANZ and WBC calculator review. Serviceability Assessment records can hold lender-calculator metadata, assumption dates, HEM/tax/expense/debt/UMI/DTI/LVR/LMI outputs, policy gate notes, input snapshots, and result snapshots. The app still does not embed lender workbooks, macros, hidden sheets, or proprietary formulas.

The fact-find model now supports an OpnForm-first form-builder workflow. Form-builder administration belongs in Broker Settings through Broker Form Template records. Fact Find Session records link back to the published template used for the borrower session and track the provider, definition ID, immutable form version, submission reference, portal session reference, mapping status, mapping errors, section status summary, clarification summary, review timestamps, and schema/submission snapshot references. OpnForm should render the borrower-facing fact find; Twenty should hold the normalized application, review, compliance, and workflow records.

## What This App Adds

- Broker workflow fields directly on native Twenty Opportunities.
- Broker Form Templates under Broker Settings for fact find, consent, document request, and portal form administration.
- Mortgage applications for structured CAL-style application summary when needed.
- Links from mortgage applications to native Twenty Contacts and Opportunities.
- Applicant profiles linked to Contacts and Opportunities.
- Compliance acknowledgements.
- Fact find sessions.
- Loan requirements.
- Property securities.
- Credit proposals.
- Serviceability assessments.
- Product search runs.
- Lender products.
- Product shortlist options.
- Lender contacts.
- Document requests.
- Application conditions.
- Valuation orders.
- LMI assessments.
- Integration events.
- Saved views for operational tables, without forcing the tools into the main sidebar.

## What Still Needs Configuration

Twenty's built-in Contacts, Companies, Opportunities, Tasks, Notes, and timeline are available out of the box. This app links mortgage-specific records to native Opportunities so the deal dashboard is the working file. Workflow automations still need to be configured after the workspace is running because this Twenty SDK version does not expose workflow definitions as app entities.

Recommended first manual workflow configuration:

- Lead received.
- Credit guide and privacy consent sent.
- Credit guide and privacy consent acknowledged.
- Fact find started.
- Fact find submitted.
- Fact find reviewed.
- Documents requested.
- BID/compliance in progress.
- Serviceability checked.
- Product search and policy research completed.
- Credit proposal drafting.
- Credit proposal review.
- Credit proposal presented and accepted.
- Ready for lodgement.
- Submitted to ApplyOnline or AFG Flex.
- Conditional approval.
- Formal approval.
- Settlement booked.
- Settled.
- Post-settlement review.

## Deployment

After the Docker stack is running and the first workspace/admin user exists, connect the Twenty CLI to the workspace and deploy this app:

```bash
cd packages/twenty-apps/community/brandroll-mortgage
yarn install
yarn twenty remote add --api-url https://app.lendaloan.com.au --as brokerapp-v1
yarn twenty deploy --remote brokerapp-v1
yarn twenty install --remote brokerapp-v1
```

Use `deploy` and `install` for the live Docker server. `dev` mode is intended for development-mode Twenty servers.

Use a development/staging workspace first. Do not deploy against production borrower data until roles, permissions, storage, backups, and privacy controls are approved.
