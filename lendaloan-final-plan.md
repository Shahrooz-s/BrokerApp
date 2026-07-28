# Lendaloan Final Implementation Plan

Last updated: 28 July 2026
Product: Lendaloan BrokerApp, self-hosted Twenty fork plus BrokerApp mortgage workspace layer.

## Executive Direction

Lendaloan should stop treating Twenty as the full mortgage product and stop adding broker workflow as loose backend tables. Twenty should remain the self-hosted CRM shell, authentication/admin base, object store, boards, tasks, notes, email/calendar layer, and workflow engine. BrokerApp should become the mortgage-specific workspace layer inside that shell.

The key application surfaces are:

- BrokerApp Loan Workspace inside an opened Opportunity.
- Lead and Deal boards as the residential broker entry points.
- LoanDox as the broker document command centre.
- ClientDash as the applicant-facing portal.
- PolicySpace as the lender policy/RAG research workspace.
- CreditDash as a future BDM/lender-facing supporting-document review portal.
- Broker Settings as the admin area for lenders, policies, document categories, templates, forms, boards/stages, white label, providers, AI skills, compliance, and security.

## What Went Wrong In The Current Pilot

The previous implementation attempted to force BrokerEngine-style functionality into native Twenty record panels and custom table views too early. That created:

- A Loan Workspace that looked like a sidebar/popup instead of the main loan cockpit.
- Too many sidebars and duplicated toolbars.
- Non-functional controls because large parts were local UI state rather than persisted records.
- Unclear separation between native Twenty tabs and BrokerApp mortgage tools.
- Inconsistent mobile behavior and cramped panels.
- Backend objects exposed as app navigation, making it feel like tables rather than a broking system.

The fix is architectural, not cosmetic: build a stable BrokerApp workspace shell and then wire each tool to real objects, validations, permissions, audit events, and provider gates.

## Core Architecture

### 1. Twenty Fork And White Label

Use the self-hosted Twenty codebase as a fork, but separate upstream Twenty concerns from Lendaloan product code.

Recommended path:

- Keep a clean upstream remote for Twenty.
- Keep `Shahrooz-s/BrokerApp` as the product fork.
- Add BrokerApp code in clearly owned packages/modules instead of scattering one-off edits through core Twenty.
- Remove public-facing Twenty branding only where licence terms allow.
- Avoid importing or depending on `/* @license Enterprise */` code unless Lendaloan has the proper rights.
- Treat AGPL/commercial-file obligations as a legal review item before selling as SaaS.

Practical white-label work:

- Lend A Loan brand, domain, logo, email templates, favicons, login, app shell labels, outbound mail identity, and help/documentation links.
- Replace staff-facing `People` with `Contacts`.
- Group `People` and `Companies` under `Contacts`.
- Move raw technical objects under Broker Settings or role-gated admin areas.
- Hide AML Escalations from normal broker navigation while retaining it for Compliance.

### 2. Loan Workspace

Loan Workspace must be the main Opportunity record experience, not a separate board, table, modal, or side panel.

Required layout:

- Main Twenty sidebar auto-collapses to an icon rail when an Opportunity opens.
- Loan Workspace expands to the available width under the native Twenty top/header area.
- Left workflow menu is open by default on desktop and narrower than previous builds.
- Right tool workspace is open by default on desktop and uses real icons plus labels.
- Left menu and right tool workspace have drag handles and saved width preferences.
- Mobile uses a top section selector and drawer-style tools, not skinny side columns.
- All panels match Twenty spacing, font, border, radius, and row/card treatment.

Left workflow menu:

- Overview: LoanDash, Team, Lender, Related Parties.
- Fact Find: Goals, Applicants, Dependants, Assets, Other Income, Liabilities, Living Expenses, Financial Security.
- Strategy: Interview Guide, Security, Funding Position, Products, Smart Docs, BrokerWizard.
- Lodgement: Lodgement Funding, Credit Proposal, Submission.

Right tools:

- Native-adapted tools: Timeline, Notes, Tasks, Files, Emails, Calendar where useful.
- BrokerApp tools: Checklists, Texts/SMS, LoanDox, ClientDash, PolicySpace, CreditDash, Key Dates, Reports, 1-Click Workflows.

Rules:

- No duplicated toolbar labels.
- Collapsed tools show icons only.
- Expanded tools show icon, label, and active tool drawer.
- Tool actions are provider-gated unless credentials, approvals, and consent are configured.

### 3. Boards And Stage Movement

Lead board and Deal board stay as Opportunity board views, not separate loan records.

Required behavior:

- Same Opportunity can move between Lead and Deal board workflow by changing board/stage classification.
- Handover from broker to assistant/processor moves the loan into the Deal board, not into a duplicate record.
- Empty stages collapse automatically and expand on click.
- Stage movement writes status/timeline/audit events.
- Quick view must show BrokerEngine-style loan summary, applicant details, assigned team, lender details, client portal/document state, notes/tasks/emails/SMS history, and stage dropdown.

Residential board scope:

- Lead: discovery, docs, research, proposal, accepted, handover, hold/lost.
- Deal: supporting docs, submission prep, app docs, lodged, AIP, MIRs, formal approval, mortgage docs, settlement, lost/declined.
- Asset/commercial/business boards stay scaffolded until their own fields and lender/product workflows are properly designed.

### 4. Fact Find And Applicant Logic

Fact find must be BrokerEngine-style in behavior and LIXI-first in mapping.

Required behavior:

- Primary applicant plus up to four residential applicants.
- Clear add-applicant control.
- Applicant tabs preserve applicant-specific values.
- Shared household fields are shared only where appropriate.
- Completion ticks are validation-based: green only when required fields pass, red when invalid/incomplete, neutral before start.
- Autosave writes to Fact Find Session/Section/Field Answer.
- Submit locks client-entered data for broker review.
- Broker edits after submission create provenance and timeline records.

Priority conditional logic:

- Address history: previous address fields appear when current address tenure is under three years.
- Self-employed/business: ABN/ACN/business-name lookup, entity type, GST status/date, trading names, role, income source, and business financials.
- Other income: yes/no opens repeatable income rows and evidence requests.
- Living expenses: all categories, household handling, zero-value comment requirements, HEM/serviceability warning logic.
- Dependants, assets, liabilities, financial security, goals, loan features, product preferences, lender exclusions, and BID rationale.

Address fields should be structured, not free-text only:

- Unit/lot.
- Street number.
- Street name.
- Street type.
- Street suffix.
- Suburb.
- State.
- Postcode.
- Country.
- Start date.
- Residential status.
- Previous address chain when tenure is insufficient.

### 5. LoanDox

LoanDox is the broker document command centre.

Desktop layout:

- Left 20%: document request templates, stacks, scenario packs, lender checklist packs.
- Centre 60%: active document request cards.
- Right 20%: filters, history, missing/declined items, errors, verification notes.

Document request card fields:

- Title.
- Description.
- Applicant/entity target.
- Category.
- Due date.
- Upload method: manual, CashDeck, Basiq/open banking, future provider.
- Status.
- Broker question.
- Client response.
- Decline/re-request reason.
- Review notes.
- Paperless-ngx document reference.
- OCR status.
- AI review status.
- Client visibility.
- Timeline event history.

Recommended document backend:

- Paperless-ngx for archive/OCR/tags/correspondents/document types.
- BrokerApp stores metadata and external references, not raw files by default.
- Paperless AI/GPT, Dify/RAGFlow, Ollama, and Activepieces are optional gated automation layers, not default runtime requirements.

### 6. ClientDash

ClientDash is a separate applicant-facing portal, not staff CRM access.

ClientDash v1 should include:

- Application progress.
- Next action.
- Credit guide/privacy consent.
- Fact find.
- KYC/IDV.
- Document requests.
- Bank statements/open banking.
- Messages.
- Submitted items/review confirmation.
- Secure portal session and applicant-specific tasks.

Access:

- Client/Applicant role sees only their own portal sessions/tasks/files/messages.
- Use passkeys and magic links first.
- SMS OTP is optional later and not required for v1.
- ClientDash never exposes AML suspicion, broker-only notes, lender-only notes, internal risk scores, compliance escalation, or raw provider responses.

### 7. PolicySpace And CreditDash

PolicySpace is the internal lender policy research/RAG workspace.

PolicySpace must link:

- Broker Lender.
- Lender Policy Reference.
- Product.
- Document checklist.
- Serviceability notes.
- Scenario tags.
- BDM contact.
- Policy research run.
- BDM question draft.

Recommended backend:

- Dify for clean RAG orchestration and APIs.
- RAGFlow as an option for heavier document RAG.
- Paperless-ngx for document OCR/archive.
- Ollama for local/private models where suitable.
- Activepieces for non-critical workflow automation.

CreditDash is a future BDM/lender-facing portal:

- Supporting documents only.
- Policy questions only.
- No full internal broker workspace.
- No client-sensitive or AML/compliance-only information unless specifically approved.

### 8. AML/KYC/CDD

BrokerApp must treat KYC/CDD as a progressive evidence and risk workflow, not a document upload task.

Separate scorecards:

- Identity confidence.
- AML/CTF risk.
- Fraud risk.
- CDD completion.
- Evidence strength.
- Manual review.
- ECDD requirement.
- Lender submission readiness.

Hard rules:

- No AI-only final compliance decisions.
- No tipping off.
- No lender submission if required CDD/KYC is not established unless approved exception workflow exists.
- No raw provider result overwrite; corrections must be separate records.
- Every risk increase or readiness block needs reason codes.

### 9. Integrations

Provider adapters should be built behind explicit Master Admin gates:

- ABN Lookup: v1 business lookup for ABN/ACN/name search and business prefill.
- ApplyOnline: preferred future residential lodgement path.
- AFG Flex/AFG/BrokerEngine: compatibility and fallback pathways.
- Equifax/credit checks: consent and provider reference first.
- IDV/KYC: adapter abstraction first.
- Basiq/open banking: consent-based data import.
- CashDeck: interim bank statement collection.
- Paperless-ngx: document archive/OCR/reference store.
- Email/SMS: provider-gated, no live send by default.
- LIXI validation/generation: licensed development environment only until production approval.

### 10. LIXI-First Development

Use LIXI as the field vocabulary and integration quality gate:

- CAL for residential application data.
- EGB for lender-specific required fields, screen/print order, labels, and validations.
- SVC for serviceability request/result/report concepts.
- CDA/AFD for credit decision/fraud event concepts.
- DAS for document preparation/settlement.
- VAL/LMI/TSA/PSA/ALA/ACC as provider-specific lifecycle references.

Use the local skill:

- `/Users/shahroozsafanejad/.codex/skills/brokerapp-lixi-standards-guard`

Run the guard before LIXI-related commits:

```bash
python3 /Users/shahroozsafanejad/.codex/skills/brokerapp-lixi-standards-guard/scripts/lixi_guard_check.py \
  README.md lixi-standards-overview.md lixi-to-twenty-mapping.md brokerapp-api-integration-spec.md
```

## Delivery Phases

### Phase 0: Stabilise Access And Source Control

- Recover deployed app state and confirm the correct custom app is installed, not stock Twenty.
- Keep a clean branch for BrokerApp workspace work.
- Stop deploying unvalidated Loan Workspace builds.
- Ensure private artifacts remain untracked.

### Phase 1: Fix The Staff Workspace

- Rebuild Loan Workspace as the primary Opportunity workspace.
- Fix sidebar/tool collapse, resize, width persistence, mobile layout, and URL/hash navigation.
- Wire forms to controlled state and real persistence.
- Remove duplicate toolbars and raw object clutter from the main nav.

### Phase 2: Complete Residential Fact Find

- Implement applicant tabs and up to four applicants.
- Finish field-by-field sections from BrokerEngine-style structure.
- Add conditional address, income, expenses, dependants, assets, liabilities, and security logic.
- Add validation-based completion ticks and readiness gates.

### Phase 3: LoanDox And ClientDash Foundations

- Build LoanDox document request stacks/cards/statuses.
- Build ClientDash portal session/task models and safe UI.
- Add Paperless-ngx provider-gated reference fields.
- Add timeline/provenance events.

### Phase 4: PolicySpace, CreditDash, And AI-RAG Readiness

- Add lender policy records and RAG index states.
- Add PolicySpace research runs and BDM question drafts.
- Add CreditDash scaffold with strict document/policy-only access.
- Add Dify/RAGFlow/Ollama/Activepieces settings as disabled-by-default provider adapters.

### Phase 5: Provider And Lodgement Readiness

- Implement ABN Lookup settings and lookup controls.
- Add provider adapters for IDV, credit checks, open banking, bank statements, email/SMS, and document processing.
- Build ApplyOnline/AFG Flex/BrokerEngine/LIXI mapping adapters as disabled until credentials, approval, and certification are complete.

### Phase 6: Pilot

- Validate with residential test deals only.
- Confirm lead/deal board movement and assistant handover.
- Confirm all major workspace pages, right tools, ClientDash tasks, LoanDox requests, and readiness gates.
- Run TypeScript, lint, build, deployment, and browser verification before any production pilot.

## Immediate Next Build Priorities

1. Fix the Loan Workspace loading/runtime errors before adding more features.
2. Remove any use of direct `location.hash = ...` in front components running in worker-like contexts; use state and safe navigation callbacks instead.
3. Decouple collapse state for the main Twenty sidebar from the Loan Workspace left menu.
4. Implement proper resize handles with pointer events and persisted layout state.
5. Rework the right tools into one real tool workspace, not a second left menu.
6. Wire the active page dropdown to the workflow page registry.
7. Make applicant tabs and field controls persist.
8. Add LoanDox and ClientDash as gated but visible tools with real object links.
9. Hide raw AML Escalations and backend config objects from normal broker nav.
10. Add the LIXI guard skill to the development workflow.

## Public Sources

- LIXI Standards: https://lixi.org.au/lixi-standards/
- LIXI Downloads: https://lixi.org.au/lixi-standards/downloads/
- CAL: https://lixi.org.au/lixi-standard/credit-applications-for-australia-cal/
- EGB: https://lixi.org.au/lixi-electronic-guidebooks/
- LIXI2 Documentation: https://lixi.org.au/lixi2-documentation/
- Twenty pricing: https://twenty.com/pricing
- Twenty source licence: https://github.com/twentyhq/twenty/blob/main/LICENSE
