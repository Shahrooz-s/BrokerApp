# Client Portal and Dashboard Architecture

## Positioning

The planned client experience is a chat-style online portal plus dashboard. Twenty is the backend CRM and internal loan origination application, not the borrower-facing application by itself.

The portal should make the mortgage process feel like a guided conversation while still producing structured records that Twenty, specialist tools, and future lodgement integrations can use.

Internal staff will work primarily in Twenty for origination management, fact-find review, credit proposal preparation, application packaging, compliance evidence, lender/status follow-up, settlement tasks, reporting, and post-settlement review.

Use `Contacts` as the borrower/professional person label in portal copy, staff documentation, and CRM navigation wherever possible.

## Architecture

Recommended flow:

1. Client interacts with portal chat, dashboard, fact-find sections, document checklist, and task requests.
2. Portal backend validates and normalizes client inputs.
3. Backend writes structured Contacts, Deals, Mortgage Applications, Fact Find Sessions, Fact Find Sections, Fact Find Field Answers, Document Metadata, and status records into Twenty through the API.
4. Twenty manages broker workflow, boards, origination pipeline, credit proposal work, tasks, statuses, ownership, reporting, and operational notes.
5. Specialist tools handle ID verification, open banking, product research, serviceability, valuations, LMI, and related functions.
6. Future lodgement integration injects approved application data into ApplyOnline first, or AFG Flex if ApplyOnline direct injection is not available.
7. Status events from ApplyOnline, AFG Flex, AFG, BrokerEngine, or other systems sync back into Twenty and then into the client dashboard as client-friendly status labels.

## Client Portal Capabilities

### Chat Experience

- Guided intake conversation.
- Borrower goals and objectives capture.
- Dynamic follow-up questions based on answers.
- Secure broker/client messages.
- Task reminders.
- Document request prompts.
- Explanation of application status in client-friendly language.

The chat layer should not store the only copy of important data. Any decision-grade answer must be written to structured records in Twenty or the relevant specialist system.

### Client Dashboard

Dashboard sections:

- Application progress.
- Fact-find completion progress.
- Outstanding fact-find sections.
- Outstanding tasks.
- Required documents.
- Uploaded/received/verified document status.
- ID verification status.
- Open banking connection/status.
- Product research or shortlist status.
- Broker messages.
- Key dates: appointment, approval milestones, settlement, review.
- Consent and disclosure records.

Avoid exposing internal lender notes, credit exceptions, fraud/risk flags, raw external system errors, or unapproved Credit Proposal notes to clients.

## Guided Fact Find

The portal fact find should be section-based and similar in operating pattern to BrokerEngine: the client sees clear sections, can save progress, and staff can review completion by section in Twenty.

BrokerApp should use OpnForm as the preferred portal form renderer because it already works in the current environment and supports the required schema-driven form-builder pattern. Form.io remains a useful reference for component and conditional-logic concepts, but OpnForm should be treated as the practical implementation target unless later testing proves a blocker.

Form-builder administration should live in Broker Settings. Admins should maintain form templates, default templates, OpnForm form IDs/slugs, builder URLs, embed URLs, versioning, webhook status, and mapping profiles there. A Deal should not be where staff design or publish forms; a Deal should only launch a selected published template and show that session's completion, mapping, and review status.

Recommended form-builder approach:

- Use OpnForm fields for the portal fact find: text/long-text fields for simple answers and objectives, email/phone/date/number/select/multi-select fields for structured borrower data, hidden fields for workflow metadata, and multi-page or linked section forms for the larger fact-find flow.
- Use form logic for co-applicant, guarantor, self-employed, refinance, investment, construction, residency, open-banking, and document scenarios.
- Treat OpnForm form versions as immutable after a client starts or submits a fact find.
- Store only references in Twenty for the form provider, form definition ID, form version, form submission reference, portal session reference, schema snapshot, and submission snapshot.
- Prefer OpnForm webhooks for submission and partial-submission events, with API polling as a reconciliation fallback.
- Convert every client answer into structured Twenty records or explicit review tasks. Do not leave decision-grade data only inside the form submission.
- Use server-side validation and mapping in the portal backend before writing into Twenty.
- Keep internal notes, credit-risk commentary, and unapproved recommendation notes out of the client form JSON.

Embedding model:

- The portal should embed or render the OpnForm fact find for the borrower.
- Twenty should show the selected form/template, section completion, mapping state, and review state from related records.
- A later Twenty page/widget can open the form preview or portal session, but the operational source of truth remains the Twenty Fact Find Session, Fact Find Sections, Fact Find Field Answers, and normalized mortgage records.
- Every autosave/submission event should update field-answer rows first, then update normalized records only when validation and mapping pass.
- The Opportunity should keep workflow summaries and readiness indicators rather than storing every fact-find answer directly on the deal record.

Required sections:

1. Applicant details.
2. Co-applicant and guarantor details.
3. Household and dependants.
4. Goals, objectives, and loan requirements.
5. Employment.
6. Income.
7. Expenses.
8. Assets.
9. Liabilities.
10. Property/security.
11. Documents.
12. Consent and disclosures.

Portal behaviour:

- Save progress section by section.
- Allow multiple applicants to complete their own sections.
- Show missing or incomplete sections.
- Allow staff to request clarification on a section.
- Write completion percentage and section status back to Twenty.
- Create or update Document Metadata when a section requires evidence.
- Record mapping errors and unclear answers as Twenty review tasks instead of silently accepting bad data.
- Keep internal staff notes separate from client-facing messages.

Structured fields should map to Twenty objects first, then later to LIXI-informed payloads or ApplyOnline/AFG Flex fields where permitted.

Field naming should be LIXI-first for the core lending concepts. BrokerEngine, AFG, ApplyOnline, and AFG Flex field names should be retained as aliases on mapping profiles so the portal can render familiar broker labels without making those systems the primary data model.

## Document Collection

The portal can manage document requests and upload handoffs, but the default design should avoid making Twenty the binary document store.

Recommended model:

- Portal shows the checklist.
- Approved document provider or portal storage handles files.
- Twenty stores Document Metadata, status, owner, expiry, section relationship, and external reference.
- Broker/processor verification updates sync back to the client dashboard.

## Specialist Tool Layer

Specialist tools should be treated as replaceable services behind stable internal interfaces.

| Function | External tool role | Twenty record |
| --- | --- | --- |
| ID verification | Verify identity, biometric/document checks, KYC/AML where applicable | Verification record and status |
| Open banking | Collect bank transaction data and verified financial information | Open banking session/status and summary references |
| Product research | Compare lender/product options and policy fit | Product research record and recommendation summary |
| Serviceability | Calculate borrowing capacity and lender-specific servicing | Serviceability assessment |
| Valuation | Order/track valuation or consume valuation status | Valuation record |
| LMI | Quote/track LMI requirement and approval | LMI assessment |
| Credit checks | Request/track credit report or bureau check where approved | Credit check status/reference |
| Title/property search | Order/track title and property reports | Title/property search status |

For each provider, capture:

- Provider name.
- API documentation.
- Sandbox access.
- Authentication method.
- Consent model.
- Data retention terms.
- Webhook support.
- Status/event list.
- Result storage policy.
- External reference IDs.
- Manual fallback process.

## ApplyOnline and AFG Flex Future State

ApplyOnline is the preferred future lodgement injection target. Public NextGen material positions ApplyOnline as a digital loan lodgement platform with CRM, lender-system, and third-party service integration. AFG Flex is the alternate path, with public AFG material describing Flex as supporting website, business partner, and third-party integrations plus electronic lodgement and live deal tracking.

Implementation stance:

- Do not build direct injection until ApplyOnline/NextGen or AFG confirms the approved integration path.
- Treat ApplyOnline as preferred because it is the direct lodgement destination.
- Treat AFG Flex as the fallback or aggregator-mediated lodgement route.
- Keep the portal/Twenty data model platform-neutral so a later ApplyOnline or AFG Flex adapter can consume the same prepared application data.

## Data Ownership

| Data area | Primary owner | Client visible | Notes |
| --- | --- | --- | --- |
| Contact profile | Twenty | Yes | Portal edits sync to Twenty after validation. |
| Chat messages | Portal/messaging service plus Twenty summary | Yes | Store broker-relevant notes in Twenty. |
| Fact find answers | Portal capture, Twenty autosave/review tables, then normalized Twenty objects | Yes | OpnForm renders the form; Twenty stores Fact Find Sections, Field Answers, mapping/review state, and normalized records. |
| Fact find staff review | Twenty | No by default | Internal review status and notes. |
| Consent/disclosures | Twenty plus document/e-sign provider | Yes | Store timestamp, version, and evidence reference. |
| Document files | Document provider/portal storage | Yes | Twenty stores metadata only by default. |
| ID verification result | ID provider | Limited | Show high-level status only. |
| Open banking result | Open banking provider | Limited | Show connection/status; restrict raw data visibility. |
| Product research | Product research provider/Twenty | Limited | Client-facing shortlist only after broker approval. |
| Application workflow | Twenty | Yes | Client-friendly status mapping required. |
| Credit proposal work | Twenty | No by default | Internal broker/credit workflow; expose only approved summaries. |
| Lodgement record | ApplyOnline/AFG Flex/fallback platform | Limited | Sync external status back to Twenty. |

## Security and Privacy Requirements

- Use strong client authentication.
- Use MFA for sensitive portal actions where practical.
- Encrypt data in transit and at rest.
- Keep provider tokens out of client-side code.
- Store consent records for each specialist tool.
- Avoid exposing raw bank data, identity results, internal risk notes, or unapproved Credit Proposal notes in the client dashboard.
- Use least-privilege API credentials for Twenty and providers.
- Log access to sensitive records.

## Open Implementation Questions

- Which portal framework will be used.
- Whether chat is AI-assisted, rule-guided, human-only, or hybrid.
- Which ID verification provider will be selected.
- Which open banking provider will be selected.
- Which product research/serviceability provider will be selected.
- Whether documents are stored by the portal, BrokerEngine, ApplyOnline/AFG Flex, or a dedicated document provider.
- Whether ApplyOnline direct injection is available to this business and under what commercial/certification terms.
- Whether AFG Flex is available as an integration target for this business.
- Which fact-find fields are required for MVP versus lodgement readiness.
