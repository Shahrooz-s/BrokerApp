# BrokerApp App for Twenty

This Twenty app defines the LIXI-aware mortgage broking data model for the BrokerApp CRM deployment.

It does not include restricted LIXI schemas, sample payloads, lender guidebooks, or production lodgement logic. It uses public LIXI concepts as a reference model and keeps ApplyOnline, AFG Flex, AFG/BrokerEngine, and specialist-provider integration references as configurable CRM records.

## v0.10 Direction

BrokerApp treats native Twenty Opportunities as the broker board/deal/opportunity record. Contacts and Companies remain in the sidebar because they are reusable relationship records. Mortgage work happens from the Opportunity through direct fields and related deal tools:

- Applicant profiles linked to Contacts and Opportunities.
- Compliance acknowledgements for credit guide, privacy consent, BID, and fee documents.
- Portal fact-find sessions.
- Document requests and review notes.
- Serviceability assessments based on lender or aggregator calculators.
- Product search runs based on the AFG product matrix sheets, desired loan features, lender preferences/exclusions, and policy notes.
- Product shortlist options with policy, serviceability, fit, and recommendation reasons.
- Credit proposals explaining the selected product, comparison set, BID rationale, and policy fit.
- Valuation, LMI, conditions, lender contacts, and integration events.

## v0.14 BrokerApp Pilot Layer

BrokerApp now includes the pilot layer needed before live workflow testing:

- Staff roles for Master Admin, Compliance, Broker, Loan Processor/Assistant, and Client Portal marker access.
- Client Portal Sessions and Client Portal Tasks for borrower fact find, KYC, document requests, bank data, safe messages, and next actions.
- KYC/CDD Profile, KYC Verification Event, KYC Consent, AML Escalation, and Evidence Pack objects.
- Broker Checklist Template, Broker Checklist Item Template, Deal Checklist, and Deal Checklist Item objects.
- Integration Provider records for passkeys, email magic links, IDV/KYC, open banking, bank statements, AFG product imports, ApplyOnline, AFG Flex, and BrokerEngine compatibility.
- Product Import Run records for AFG product matrix/API update tracking.
- White-label Setting records for brand, domain, portal, auth, tenant isolation, and security-header defaults.
- Navigation entries under Broker Settings for the new pilot modules.
- Post-install seed data for checklist templates, integration provider placeholders, and white-label defaults.

Private BrokerEngine template bodies, screenshots, checklist wording, live account captures, and customer data must not be committed to GitHub. Use private workspace imports or encrypted local artifacts after explicit approval.

## v0.13 BrokerEngine Settings Capture

BrokerApp now includes a BrokerEngine-style workflow and settings capture layer:

- Broker Templates for email, SMS, task, checklist, report, workflow, and smart-document template metadata.
- Broker Board Templates for Asset Finance, Construction, Deal, Lead, Maintenance, Partnerships, and draft BrokerApp boards for Commercial Lending and Business Lending.
- Broker Stage Templates for all observed BrokerEngine boards, stage due days, amber/red thresholds, optional stage due tasks, workflow trigger flags, and entry/exit gates.
- Broker Settings Areas for the settings map covering lenders, products, packages, offers, calculators, document categories, boards, stages, workflow templates, email/SMS/task templates, fact find, smart docs, integrations, security, client portal, and AI workflow.
- Deal Workspace Tools for the observed Opportunity sidebar, Fact Find pages, Strategy tools, Lodgement tools, right rail drawers, and Broker Settings areas.
- Reference config under `src/config/` for board stages, settings areas, workspace tools, report names, 1-click workflow names, email template metadata, task template metadata, checklist template metadata, and BrokerEngine-to-BrokerApp merge variables.

The app stores template structure and merge-variable mapping in source. Full BrokerEngine email, task, and checklist body import should remain a private workspace operation until the business explicitly approves storing those bodies in the deployment target. BrokerEngine SMS Templates did not expose saved templates during review, so BrokerApp includes only starter SMS placeholders. Workflow Templates did not expose reusable records during review, so BrokerApp models workflow as stage-triggered jobs, checklist gates, template actions, and broker approval checkpoints.

BrokerEngine Products showed a large paginated product catalogue with columns for product name, loan type, lender, interest rate, payment option, last rate update, last updated, system product, start date, end date, product type, and product ID. BrokerApp should ingest the AFG product matrix/API exports as the product source of truth instead of scraping UI rows.

The app uses public LIXI concepts as a field-design reference. It does not copy restricted LIXI schemas or sample payloads. Production LIXI lodgement, lender certification, ApplyOnline submission, and AFG Flex submission remain integration work until the relevant API documentation, credentials, and licensing are confirmed.

The serviceability model now reflects the supplied ANZ and WBC calculator review. Serviceability Assessment records can hold lender-calculator metadata, assumption dates, HEM/tax/expense/debt/UMI/DTI/LVR/LMI outputs, policy gate notes, input snapshots, and result snapshots. The app still does not embed lender workbooks, macros, hidden sheets, or proprietary formulas.

The fact-find model now supports an OpnForm-first form-builder workflow. Form-builder administration belongs in Broker Settings through Broker Form Template records. Fact Find Session records link back to the published template used for the borrower session and track the provider, definition ID, immutable form version, submission reference, portal session reference, mapping status, mapping errors, section status summary, clarification summary, review timestamps, and schema/submission snapshot references. OpnForm should render the borrower-facing fact find; Twenty should hold the normalized application, review, compliance, and workflow records.

Fact-find capture is now split into session, section, and field-answer records. The portal or embedded OpnForm experience can autosave every answer into Fact Find Field Answer rows, grouped by Fact Find Section, before the backend normalizes approved answers into Contacts, Applicant Profiles, Loan Requirements, Property Securities, Document Requests, Compliance Acknowledgements, Serviceability inputs, and Product Search Run filters. The Opportunity should display readiness and summaries rather than carrying hundreds of raw fact-find fields.

Desired Loan Features from the residential fact find are now first-class data for product research. Loan Requirement records store the selected features, preferred/excluded lenders, preferred splits, other requirements, and feature booleans. Product Search Run records copy those values into filter fields so the product tool can hard-filter mandatory features, score preferred features, and preserve broker override reasons for credit proposal rationale.

Residential fact finds now support one primary applicant plus up to three co-applicants. Fact Find Session and Mortgage Application records hold the applicant count, while Applicant Profile records hold applicant index and role labels such as Primary, Co-Applicant 1, Co-Applicant 2, and Co-Applicant 3. This keeps the model reusable instead of creating separate hard-coded objects for each applicant slot.

Broker Settings now includes a Lenders area. Broker Lender records are the lender setup layer for categories, panel status, lodgement channel, LIXI party reference, ApplyOnline/AFG/BrokerEngine codes, product matrix source, calculator links, policy links, document checklist links, and related calculators, policy references, document categories, lender products, and lender contacts.

Field naming should stay LIXI-first where a lending concept is known. BrokerEngine, AFG, ApplyOnline, and AFG Flex names should be treated as aliases or integration mapping fields, not the primary design language.

## What This App Adds

- Broker workflow fields directly on native Twenty Opportunities.
- Broker Form Templates under Broker Settings for fact find, consent, document request, and portal form administration.
- Broker Templates under Broker Settings for email/SMS/task/checklist/report/workflow/smart-document templates.
- Broker Settings Areas under Broker Settings for the overall settings map.
- Broker Board Templates and Broker Stage Templates under Broker Settings for all captured boards.
- Deal Workspace Tools under Broker Settings for the deal sidebar and right rail inventory.
- Broker Lenders under Broker Settings for lender categories, calculator references, policy references, document categories, lender contacts, and product matrix relationships.
- Mortgage applications for structured CAL-style application summary when needed.
- Links from mortgage applications to native Twenty Contacts and Opportunities.
- Applicant profiles linked to Contacts and Opportunities.
- Compliance acknowledgements.
- Fact find sessions.
- Fact find sections.
- Fact find field answers.
- Loan requirements.
- Property securities.
- Credit proposals.
- Serviceability assessments.
- Product search runs.
- Lender products.
- Lender calculators.
- Lender policy references.
- Lender document categories.
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
yarn twenty remote switch brokerapp-v1
yarn twenty exec --postInstall
```

Use `deploy`, `install`, and then `exec --postInstall` for the live Docker server. The post-install step seeds BrokerApp board, stage, template, deal workspace, and settings-map records. It is idempotent by source reference/name and will skip records it already seeded. The `exec` command uses the default remote, so switch to `brokerapp-v1` before running it. `dev` mode is intended for development-mode Twenty servers.

Use a development/staging workspace first. Do not deploy against production borrower data until roles, permissions, storage, backups, and privacy controls are approved.
