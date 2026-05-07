# BrokerApp App for Twenty

This Twenty app defines the LIXI-aware mortgage broking model and pilot workflow layer for BrokerApp.

The app is intentionally source-safe. It does not include restricted LIXI schemas, lender guidebooks, borrower data, copied third-party template bodies, screenshots, private checklist wording, lender-private calculators, API keys, or production lodgement credentials. Those items must stay in the live workspace, encrypted operational storage, or approved provider systems.

## Pilot Direction

BrokerApp uses native Twenty Opportunities as the broker deal/opportunity record. Contacts and Companies remain reusable relationship records, while mortgage work is driven from the Opportunity through fields, board views, related records, and deal workspace tools.

The live pilot now prioritises broker-facing workflow:

- `Boards` navigation with native Kanban views for `Lead board` and `Deal board`; opening an Opportunity uses the native Twenty record with the BrokerApp LoanDash workspace available as the record-bound loan workspace tab.
- Lead stages matching the residential lead workflow: New Lead, Attempted Contact 1-3, Initial Call Held > Get Docs, Docs Requested, Research > Servicing, Prepare Loan Proposal, Loan Proposal Presented, Client Accepted > Handover, On Hold, Lost Opps.
- Deal stages matching the residential loan processing workflow: Outstanding Supporting Documents through Settlement and Lost / Declined.
- Board handover is a stage change on the same Opportunity: when a lead is accepted, moving it to Deal sets `brokerWorkflowStage` to the Deal board’s first stage so assistant brokers and processors continue the same loan record.
- Recovery build note: `0.16.53` keeps the BrokerApp LoanDash front component active and guards the Twenty sidebar-collapse effect against sandboxed DOM states where `dataset` is unavailable during mount.
- LoanDash is installed as an extension tab on Twenty's native Opportunity record layout. BrokerApp no longer ships a full custom Opportunity `RECORD_PAGE` replacement, because replacing the standard record page can leave the live Opportunity view stuck on a blank loading skeleton.
- The native Opportunity `LoanDash` tab extension is the record-bound BrokerApp workspace entry. If the live shell ever falls back to stock Twenty again, redeploy a new app version rather than reinstalling an immutable older artifact.
- The workspace remains visible when an Opportunity record loads. Brokers collapse/expand navigation and tools instead of closing the loan workspace.
- Compact and mobile Opportunity views collapse the loan sidebar by default and show a native workspace-section selector so the active fact-find page remains readable instead of being squeezed by the sidebar. Compact mode uses both browser width and the actual rendered Loan Workspace container width, so it also triggers when Twenty’s native record layout narrows the front component on desktop.
- The loan sidebar starts collapsed on opened Opportunities, and the main content always includes the workspace-section selector so brokers can switch pages even when the native record canvas is narrow.
- When collapsed, the loan sidebar is removed from the workspace grid instead of keeping an icon column, preserving room for the main fact-find content in the native Twenty record.
- The main workspace also includes visible page chips for the loan workflow pages. These are real hash links backed by a hash-change listener, so page switching does not rely only on the left sidebar, native select behavior, or the front-component click bridge.
- LoanDash does not render a duplicate loan board inside the record. Native Lead and Deal boards stay as the pipeline views, while the opened loan record only shows dashboard, fact-find, applicant, strategy, lodgement, and handover tools.
- Fact-find fields in the loan workspace are controlled inputs with page-level Save. Saving updates the native Opportunity fact-find status and next broker action while deeper answer-row persistence is wired through the existing Fact Find Session/Section/Answer model in the next data-sync pass.
- Residential conditional logic is available in the opened loan workspace: applicant count expands up to four applicant cards, other income rows only open after a Yes answer, and living expense pages flag blank/zero categories for broker comments before serviceability/lodgement readiness.
- Fact Find pages now include applicant tabs and a plus button, so brokers can switch between Primary Applicant and co-applicants before entering mapped fields.
- Address history now follows the 3-year lender/Equifax rule: previous-address fields open only when the active applicant has been at the current address for less than 3 years.
- Dropdown fields use native controlled selects, so option changes update mapped fact-find state and conditional panels inside the Opportunity workspace reliably.
- Text, date and textarea fields use stable per-applicant input keys with DOM-backed save capture, so each applicant can hold separate fact-find values without typed text being wiped during autosave.
- Switching applicant tabs or workspace pages first syncs visible values into the per-applicant fact-find map, preserving each applicant's separate answers.
- Field sync uses React refs as well as DOM attributes so visible input values can be captured reliably inside the Twenty front-component sandbox.
- Applicant fact-find panes stay mounted while tabs switch visibility, so Primary Applicant and co-applicant fields retain separate values during tab changes.
- Current and previous address history includes broker-style address parts such as Street Number, Street Name, Street Type, Street Suffix, Suburb, State, Postcode and Country.
- The workspace autosaves field changes back to the Opportunity `loanDashSummary`, `factFindStatus`, and `nextBrokerAction` fields, with manual Save still available for explicit broker confirmation.
- The duplicate native-style Home/Timeline/Tasks/Notes toolbar has been removed from the loan workspace. BrokerApp keeps loan pages in the left rail and broker tools in a single right-hand rail aligned with Twenty's native record-tool direction.
- The right-hand tool rail collapses to icons only and expands to icon + tool name with the active drawer beside it. This keeps LoanDash, Fact Find, LoanDox, ClientDash, Tasks, Key Dates, Reports and workflows reachable without filling the left loan sidebar with tool initials.
- The opened loan workspace now uses saved, resizable panels: the left loan workflow menu defaults to `228px`, the right tools workspace defaults to `560px`, both can be dragged wider/narrower on desktop, and preferences are stored in browser local storage under `brokerapp.loanWorkspace.layout.v3`.
- Browser layout preferences are read and written defensively so the Opportunity record still renders if the front-component sandbox blocks or delays local storage access.
- LoanDox and ClientDash now open from the right-hand tool rail. The left rail is reserved for the loan workflow sections, keeping the loan page as the priority content on desktop and mobile.
- PolicySpace and CreditDash are added to the same right-hand tools rail. PolicySpace is the broker-side lender policy/RAG research surface, and CreditDash is the gated BDM-facing review portal scaffold for accepted documents and policy questions.
- The Loan Workspace renders as a fixed inline Opportunity workspace below the native Twenty header when Twenty mounts the front component in the narrow record summary column. This keeps the broker workflow full-width, removes the awkward duplicated Opportunity name/field chrome from the working canvas, and preserves the global sidebar as an expandable rail.
- LoanDox is available in the right tool rail as the broker document request workspace. It shows document templates/stacks, active applicant-specific requests, ClientDash handoff, provider gates, document rules, and review/history controls while CashDeck, Basiq, Equifax, IDV and AI document review remain disabled until approved.
- LoanDox is designed to store document metadata and external references only. Paperless-ngx is the preferred v1 document archive/OCR backend once configured; BrokerApp stores Paperless document IDs, source, OCR status, AI review status and visibility flags rather than raw sensitive files. Paperless-ngx AI and Paperless-ngx GPT are modelled as disabled provider-gated adapters for later document review assistance.
- ClientDash is treated as a client-side borrower portal foundation. The broker workspace exposes a ClientDash launch/invite tool, borrower-facing step plan, visibility rules, applicant confirmation rules, shared-household rules, and links back to active LoanDox requests while public auth/provider actions remain gated.
- LoanDox rules are modelled as first-class workspace records so Master Admin can later manage document-stack, applicant-targeting, bank-statement, ClientDash lock, KYC/CDD and AI-review rules without exposing provider actions by default.
- Party relationships are modelled separately so Contacts/Companies can support applicants, companies, trusts, trustees, unit trusts, unit holders, directors, shareholders, guarantors, borrowers, beneficiaries and related parties without forcing every entity into the same contact role.
- ABN Lookup is modelled as the official business lookup provider for ABN, ACN and business-name prefill. It requires an ABN Lookup GUID in private settings/environment and falls back to manual entry when not configured.
- `Broker Settings` kept narrow for pilot configuration, starting with Lenders.
- Internal configuration objects are kept unlisted where possible so brokers do not work from raw setup tables.

## What This App Adds

- Broker workflow fields directly on native Twenty Opportunities.
- Mortgage loan amount, stage due date, compliance status, fact-find status, document stack status, serviceability status, product research status, credit proposal status, KYC/CDD status, lodgement readiness, client portal status, and next broker action.
- LIXI-aware supporting records for applicants, loan requirements, property securities, credit proposals, serviceability assessments, product search, lender products, lender calculators, lender policy references, document requests, conditions, valuations, LMI, integration events, KYC/CDD, evidence packs, templates, checklists, and client portal tasks.
- Native Kanban/list views for the broker boards.
- Lender setup records for panel status, lodgement channel, product matrix source, calculator links, policy links, document categories, and integration aliases.
- A clickable Opportunity-record LoanDash UI with BrokerEngine-style left navigation, collapsible groups and field sections, a right-hand icon tool rail, lead-to-deal handover controls, applicant expansion up to four applicants, fact-find controls, checklist/task tooling, stage references, product search scaffolding, funding position controls, credit proposal controls, and submission tracker placeholders.

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
