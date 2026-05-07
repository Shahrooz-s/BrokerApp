# BrokerApp Final Pilot Readiness

## Purpose

This file is the pilot readiness checklist for the BrokerApp Twenty app. It describes what is included in the source build and what must remain private or be configured after installation.

BrokerApp is designed as a white-labelled Twenty workspace for Australian mortgage broking. The pilot uses Twenty-native objects, fields, views, roles, navigation entries, and post-install seed records rather than a separate SaaS dependency.

## Included In v0.16.48

- BrokerEngine-style board and stage templates for Lead, Deal, Maintenance, Partnerships, Construction, Asset Finance, with Commercial and Business Lending scaffolded for later.
- BrokerEngine-style deal workspace inventory: Overview, Fact Find, Strategy, Lodgement, and right-rail tools.
- A BrokerApp LoanDash front component mounted on the native Opportunity record page. DealDash/LoanDash is now the first dashboard page inside an opened loan/opportunity, not a standalone Boards navigation item or a separate opportunity table. The record workspace is inline record content, not a popup: no overlay scrim, modal border/shadow, Close button, or reopen button.
- The Opportunity record workspace remains visible whenever an Opportunity loads. The global Twenty sidebar collapses to the icon rail, and the loan sidebar plus right tool rail can be expanded/collapsed without hiding the loan workflow.
- The Loan Workspace now uses saved, resizable desktop panels: loan menu default `228px`, right tool workspace default `560px`, collapsed loan menu `64px`, collapsed tools `56px`, and drag handles for broker-controlled sizing. Preferences are stored under `brokerapp.loanWorkspace.layout.v3` so older cramped local layout settings are reset.
- The browser layout preference read/write is now wrapped so sandboxed front-component contexts cannot stall the Opportunity record on a loading skeleton when local storage access is blocked or delayed.
- The workspace hardens Opportunity rendering by resetting stale panel preferences, visually collapsing the native Twenty navigation drawer while a loan workspace is open, guarding browser-only DOM/storage calls, and keeping section dropdown/hash navigation from breaking the record render.
- Board handover controls inside LoanDash: moving an Opportunity from Lead to Deal updates the same `brokerWorkflowStage` record field to the first Deal stage so backend staff continue the same loan record without duplication.
- LoanDash now removes the fake embedded board/pipeline and keeps board movement as a stage/handover control only. Native Lead and Deal boards remain the pipeline entry points.
- Clickable loan workspace pages for DealDash, Team, Lender, Related Parties, Goals, Applicants, Dependants, Assets, Other Income, Liabilities, Living Expenses, Financial Security, Interview Guide, Security, Funding Position, Products, Smart Docs, BrokerWizard, Lodgement Funding, Credit Proposal, and Submission.
- Collapsible loan sidebar groups, collapsible field sections, right-rail icon buttons for Notes, Checklists, Tasks, Emails, Texts, Key Dates, Reports, and 1-Click Workflows, and applicant expansion up to four residential applicants.
- Controlled fact-find inputs inside the Opportunity record workspace. Page Save now updates the Opportunity fact-find status and next broker action instead of leaving the fact-find controls as static placeholders.
- Conditional fact-find logic for residential applicants, other income and living expenses: applicant count drives one to four applicant cards, other-income detail rows open only after a Yes answer, and blank/zero living expense categories show a broker validation warning until comments are captured.
- BrokerEngine-style applicant tabs now appear above Fact Find pages, with a plus button for adding applicants up to four residential applicants and answer keys scoped to the active applicant.
- Fact-find autosave now writes a JSON snapshot into `loanDashSummary`, updates `factFindStatus`, and keeps the Opportunity `nextBrokerAction` current. Manual Save still shows a confirmation toast.
- Applicant address history now asks for current address tenure and conditionally opens previous-address fields when the current address is less than 3 years old.
- BrokerApp select controls now use native controlled selects, so selecting an option updates the fact-find state and opens conditional sections reliably inside the Opportunity front-component worker.
- Text, date, and textarea fields now use stable per-applicant input keys and DOM-backed save capture, so typing is not reset by React re-renders and each applicant's fact-find answers remain separated in the saved Opportunity summary.
- Applicant/page navigation now syncs visible DOM field values before changing context, so Primary Applicant and co-applicant entries do not overwrite each other when switching tabs.
- Field sync now uses React element refs in addition to DOM attributes, which is required inside the Twenty front-component sandbox for reliable applicant tab switching.
- Fact-find applicant tabs now keep each applicant pane mounted and visually switch between panes, matching BrokerEngine-style applicant tabs and preventing browser-entered field values from being destroyed on tab changes.
- Address history fields now include Street Number, Street Name, Street Type, Street Suffix, Suburb, State, Postcode, and Country to better match broker fact-find address capture.
- Field styling now inherits Twenty font and control styles, removes native grey button backgrounds from the loan sidebar, and avoids monospace textarea rendering.
- Workspace layout spacing now uses larger Twenty-style padding, readable warning banners, stable form gaps, subtle borders, validation-driven sidebar status icons, field provenance markers, and responsive desktop/mobile grid behavior.
- Compact and mobile Opportunity views collapse the loan sidebar by default and expose a native workspace-section selector, keeping the active LoanDash/fact-find page readable instead of squeezing it behind the section list.
- Compact mode is based on both browser width and actual Loan Workspace container width, so the section selector also appears when Twenty’s native record layout narrows the front component even on a desktop-sized browser.
- The container-width check uses the rendered workspace element rather than a React ref, avoiding the Twenty front-component sandbox ref issue seen during live verification.
- Loan workspace page switching now changes the active page even if a best-effort DOM field-sync read fails inside the Twenty front-component sandbox.
- The loan sidebar now starts collapsed on an opened Opportunity, and the main content always includes a visible workspace-section selector for switching between LoanDash, Applicants, Goals, Strategy and Lodgement pages.
- Native selects now listen to both `input` and `change` events, covering normal browser selection and the in-app browser automation path used during verification.
- Main workspace page chips now sit beside the section selector, giving a visible click target for LoanDash, Applicants, Living Expenses, Strategy and Lodgement pages even when the left loan sidebar is collapsed.
- Page chips are real hash links backed by a hash-change listener, so page switching still works if the embedded front-component click bridge is unreliable.
- Collapsed loan navigation now leaves the grid entirely instead of reserving a 64px column, keeping the main workspace controls visible in Twenty’s narrow record canvas.
- LoanDox now appears in the right-hand tool rail as the broker document request workspace with document templates/stacks, active document request cards, review actions, ClientDash step previews, and provider-disabled safety gates.
- LoanDox now includes Paperless-ngx provider-gated metadata fields and UI status. BrokerApp stores external document references, source, OCR status, AI review status, and visibility flags rather than raw sensitive files. Paperless-ngx AI and Paperless-ngx GPT are tracked as disabled adapters for later broker-approved document review assistance.
- The duplicated native-style Home/Timeline/Tasks/Notes toolbar has been removed from the BrokerApp loan workspace. BrokerApp now keeps loan pages in the left rail and broker tools in a single right-hand rail, matching the direction of Twenty's native record tools.
- The right-hand tool rail now collapses to icons only and expands to icon + tool name with the active tool drawer beside it. This removes the initials-only tool list that was appearing inside the loan sidebar.
- LoanDox, ClientDash, PolicySpace, CreditDash, Tasks, Key Dates, Reports, Checklists and workflows now share the right-hand tool rail instead of being listed inside the loan navigation.
- The Loan Workspace now breaks out of Twenty's narrow record summary mount point into a fixed inline record workspace below the native header. This keeps LoanDash as the primary work area, hides the awkward duplicated Opportunity name/field chrome from the working canvas, and prevents the broker workflow from being squeezed into the left summary column.
- ClientDash is now represented as a client-side borrower portal foundation with a portal launch/invite surface, borrower step plan, client visibility rules, applicant confirmation rules, shared-household rules, and linked LoanDox request status.
- LoanDox rules are now modelled as first-class records and seeded for applicant-targeted document requests, ClientDash locking, and provider/AI action gates.
- PolicySpace is scaffolded as the broker-side lender policy/RAG research tool, with lender policy RAG fields, policy research run records, and BDM question drafts. RAGFlow/Dify/Ollama/Activepieces and email sending remain Master-Admin gated.
- CreditDash is scaffolded as a lender/BDM-facing review portal for accepted supporting documents and policy questions only, with sharing disabled until lender portal access, broker approval, document visibility rules, and email credentials are configured.
- Party relationships are modelled as first-class records for applicants, companies, trusts, trustees, unit trusts, unit holders, directors, shareholders, guarantors, borrowers, beneficiaries, BDMs and related parties.
- ABN Lookup is scaffolded for self-employed, sole trader, company and trust applicant fields. The official ABN Lookup provider remains disabled until an authentication GUID is configured in private settings.
- Compact workflow-stage chips inside LoanDash so the current Lead/Deal stage remains visible without reintroducing a duplicate embedded pipeline board.
- BrokerEngine-style lead and deal stage references with empty stages collapsed by default and clickable collapsed stages that expand inline.
- BrokerEngine feature parity register for boards, DealDash, fact find, Strategy, serviceability, products, lodgement, templates, checklists, documents, settings, client portal, AML/KYC, integrations, and white-label controls.
- Broker settings records for lenders, products, workflow templates, email/task/SMS/report/template metadata, boards/stages, fact-find templates, smart docs, security, integrations, client portal, AI, and compliance.
- Broker template metadata records for emails, SMS, tasks, reports, workflows, and smart documents.
- Checklist module objects: reusable checklist templates, item templates, deal checklist instances, and deal checklist items.
- Client portal foundations: portal sessions, portal tasks, safe client-facing status fields, and no-SMS-OTP provider defaults.
- AML/KYC foundations: KYC/CDD profile, verification events, consent records, AML escalation records, evidence pack records, reason-code fields, and hard-stop fields.
- Product import foundations: product import runs and provider registry for AFG product matrix/API imports.
- White-label settings: pilot brand, domain, portal, auth mode, SaaS isolation assumption, and security header profile.
- Deployment and API documentation for Docker/Dockge and Twenty app install.

## Not Committed To GitHub

Do not commit these items:

- BrokerEngine template bodies.
- BrokerEngine screenshots or live account captures.
- Sent email/SMS history.
- Client or live application data.
- Lender calculators, hidden workbook sheets, macros, or proprietary formulas.
- LIXI licensed schemas, samples, guidebooks, or payloads.
- API keys, webhook secrets, private deploy keys, or provider credentials.

Use `.brokerapp-private/`, `brokerengine-private/`, `private-template-imports/`, or encrypted storage for private operational imports.

## Feature Parity Register

BrokerApp still seeds a sanitized internal feature parity register, but this is no longer intended to be a broker working screen. Internal setup views such as feature parity, integration providers, checklist templates, KYC events, and seed inventories are marked `UNLISTED` so the broker workflow is not driven from raw tables.

The register intentionally stores sanitized feature coverage only. Full copied email/template bodies, checklist wording, screenshots, live account captures, lender calculator content, customer data, and licensed LIXI assets must remain private workspace imports or encrypted artifacts, not GitHub source.

## Pilot Install Sequence

1. Confirm `brokerapp-v1` is healthy at `https://app.lendaloan.com.au/healthz`.
2. Create a Twenty API key named `BrokerApp CLI Deploy`.
3. Pull the latest `codex/review-ready-deployment` branch from `Shahrooz-s/BrokerApp`.
4. Deploy the app package from `twenty-source/packages/twenty-apps/community/brandroll-mortgage`.
5. Install the app.
6. Run the post-install seed function.
7. Refresh Twenty and confirm the primary workflow is `Boards > Lead board`, `Boards > Deal board`, opening an Opportunity record, and `Broker Settings > Lenders`. `LoanDash` should appear inside the opened Opportunity record workspace, not as a standalone Boards item.
8. Confirm raw internal setup tables are not visible as primary broker workflow screens.
9. Configure staff users and roles.
10. Create or open a test Contact and Opportunity, then verify the Opportunity record opens with the LoanDash left sidebar pages and right-rail drawers.
11. Do not enter real borrower data until backups, access roles, retention, document storage, and provider credentials are approved.

## Pilot Feature Coverage

BrokerApp now has source-level support for the workflow structure discussed in this project:

- Contacts remain reusable relationship records.
- Opportunities are the deal/board cockpit.
- Applicants are assigned to opportunities as applicant profiles.
- Fact find is modelled as sessions, sections, and answer rows.
- Product research and serviceability run inside the deal, not as generic sidebar-only tables.
- Credit proposals capture product comparison, lender policy fit, recommendation reasons, and broker approval notes.
- Checklists and stage gates support processors and assistants.
- Client portal tasks keep borrower-facing work separate from broker-only notes and AML/compliance records.
- KYC/CDD records separate identity confidence, AML/CTF risk, fraud risk, and CDD completion.
- The loan workspace now presents field groups and form controls inside the loan dashboard instead of exposing backend records as the main workflow.

## Known Pilot Gaps

These are not complete production software features yet:

- The LoanDash front component is now record-bound through the opened Opportunity record ID. It still uses local front-end state for most form controls; production persistence still needs wiring to related Twenty records and external providers.
- Twenty workflow automations still need workspace configuration after install.
- ApplyOnline, AFG Flex, AFG/BrokerEngine, IDV, open banking, bank statement, email, and product-data credentials are not present.
- Lender-specific serviceability engines require licensed calculators, policy documents, provider APIs, or approved manual assumptions.
- AML/CTF configuration requires legal/compliance review before production use.

## Production Gates

Production use requires:

- Tested backups and restore.
- Approved privacy, retention, and document storage policy.
- Role-based access review.
- Compliance review of KYC/CDD, AML/CTF, hard-stop, escalation, and evidence-pack workflow.
- API credentials and provider agreements.
- ApplyOnline/AFG Flex/AFG/BrokerEngine approval where relevant.
- LIXI production licence/certification decisions if any direct lodgement or restricted-content use is planned.
