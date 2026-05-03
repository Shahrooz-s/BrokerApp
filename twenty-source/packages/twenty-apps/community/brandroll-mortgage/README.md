# BrokerApp App for Twenty

This Twenty app defines the LIXI-aware mortgage broking model and pilot workflow layer for BrokerApp.

The app is intentionally source-safe. It does not include restricted LIXI schemas, lender guidebooks, borrower data, copied third-party template bodies, screenshots, private checklist wording, lender-private calculators, API keys, or production lodgement credentials. Those items must stay in the live workspace, encrypted operational storage, or approved provider systems.

## Pilot Direction

BrokerApp uses native Twenty Opportunities as the broker deal/opportunity record. Contacts and Companies remain reusable relationship records, while mortgage work is driven from the Opportunity through fields, board views, related records, and deal workspace tools.

The live pilot now prioritises broker-facing workflow:

- `Boards` navigation with native Kanban views for `Lead board` and `Deal board`; opening an Opportunity launches the BrokerApp loan workspace.
- Lead stages matching the residential lead workflow: New Lead, Attempted Contact 1-3, Initial Call Held > Get Docs, Docs Requested, Research > Servicing, Prepare Loan Proposal, Loan Proposal Presented, Client Accepted > Handover, On Hold, Lost Opps.
- Deal stages matching the residential loan processing workflow: Outstanding Supporting Documents through Settlement and Lost / Declined.
- Board handover is a stage change on the same Opportunity: when a lead is accepted, moving it to Deal sets `brokerWorkflowStage` to the Deal board’s first stage so assistant brokers and processors continue the same loan record.
- A `BrokerApp LoanDash` front component mounted on the native Opportunity record page for the broker loan workspace. The workspace opens as a BrokerEngine-style overlay above the default Twenty record, includes its own toolbar and Close button, collapses the global Twenty navigation to the icon rail, and uses the second loan sidebar plus right rail for the broker workflow instead of leaving brokers in the default field grid.
- The workspace is forced open when an Opportunity record loads. Closing the overlay hides the in-record workspace only; reopening or refreshing the Opportunity brings the Fact Find and stage workflow back because Twenty front components run in a sandbox without direct browser navigation APIs.
- LoanDash does not render a duplicate loan board inside the record. Native Lead and Deal boards stay as the pipeline views, while the opened loan record only shows dashboard, fact-find, applicant, strategy, lodgement, and handover tools.
- Fact-find fields in the loan workspace are controlled inputs with page-level Save. Saving updates the native Opportunity fact-find status and next broker action while deeper answer-row persistence is wired through the existing Fact Find Session/Section/Answer model in the next data-sync pass.
- Residential conditional logic is available in the opened loan workspace: applicant count expands up to four applicant cards, other income rows only open after a Yes answer, and living expense pages flag blank/zero categories for broker comments before serviceability/lodgement readiness.
- `Broker Settings` kept narrow for pilot configuration, starting with Lenders.
- Internal configuration objects are kept unlisted where possible so brokers do not work from raw setup tables.

## What This App Adds

- Broker workflow fields directly on native Twenty Opportunities.
- Mortgage loan amount, stage due date, compliance status, fact-find status, document stack status, serviceability status, product research status, credit proposal status, KYC/CDD status, lodgement readiness, client portal status, and next broker action.
- LIXI-aware supporting records for applicants, loan requirements, property securities, credit proposals, serviceability assessments, product search, lender products, lender calculators, lender policy references, document requests, conditions, valuations, LMI, integration events, KYC/CDD, evidence packs, templates, checklists, and client portal tasks.
- Native Kanban/list views for the broker boards.
- Lender setup records for panel status, lodgement channel, product matrix source, calculator links, policy links, document categories, and integration aliases.
- A clickable Opportunity-record LoanDash UI with BrokerEngine-style left navigation, collapsible groups and field sections, right-rail icon workflow drawers, lead-to-deal handover controls, applicant expansion up to four applicants, fact-find controls, checklist/task tooling, stage references, product search scaffolding, funding position controls, credit proposal controls, and submission tracker placeholders.

## Workflow Model

BrokerApp should run the deal in order:

1. Capture lead/opportunity details.
2. Generate and acknowledge credit guide and privacy consent.
3. Send a client portal fact-find flow.
4. Collect applicant, dependant, employment, income, expense, asset, liability, security, objective, and desired-feature data.
5. Complete KYC/CDD, consent, document request, and open banking/bank statement tasks.
6. Run serviceability assessment against selected lender assumptions.
7. Filter and compare products using imported lender/product data.
8. Prepare the credit proposal with lender comparison, product rationale, BID reasoning, and policy fit.
9. Prepare ApplyOnline / AFG Flex / aggregator submission data when credentials and mapping are available.
10. Track lodgement, conditions, valuation, formal approval, mortgage documents, settlement, and post-settlement review.

## Client Portal Direction

The client portal should stay simple for the pilot:

- Application progress.
- Next action.
- Fact find.
- KYC/CDD and consent tasks.
- Document requests.
- Bank statement/open banking tasks.
- Messages and submitted items.

Do not expose internal AML suspicion, risk scores, broker notes, compliance escalation status, lender-only notes, or private provider responses to clients.

## AML/KYC Direction

BrokerApp separates:

- Identity confidence.
- AML/CTF risk.
- Fraud risk.
- CDD completion.
- Evidence strength.
- Manual review and ECDD status.

Every verification event should store timestamp, provider, subject, result, reason codes, evidence pointer where permitted, consent record, and lender/aggregator rule set. AI can assist extraction and consistency checks, but final high-risk compliance outcomes must remain explainable and reviewable.

## Integrations

External credentials still need to be supplied before production-grade automation:

- Email provider/domain sending credentials.
- IDV/KYC provider API.
- Open banking or bank statement provider API.
- Product data source/API or approved spreadsheet import process.
- ApplyOnline / AFG Flex / aggregator API credentials and mapping.
- Optional staff SSO details if supported by the self-hosted Twenty plan.

No Twilio dependency is required for the v1 direction. Prefer passkeys and email magic links first, with SMS only if a compliant low-cost provider is later selected.

## Deployment

Use Node 24 for the Twenty CLI:

```bash
corepack enable
yarn install
npx -y node@24 node_modules/.bin/twenty remote add \
  --api-url https://app.lendaloan.com.au \
  --as brokerapp-v1 \
  --api-key "$TWENTY_API_KEY"
npx -y node@24 node_modules/.bin/twenty deploy --remote brokerapp-v1
npx -y node@24 node_modules/.bin/twenty install --remote brokerapp-v1
```

Validation commands:

```bash
corepack yarn tsc --noEmit --pretty false
corepack yarn lint
npx -y node@24 node_modules/.bin/twenty build
```

Do not commit API keys, copied template bodies, screenshots, borrower data, lender-private calculator content, or private provider outputs.
