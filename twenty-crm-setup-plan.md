# Twenty CRM Setup Plan

## Setup Goal

Configure Twenty as the internal mortgage origination application for brokers, processors, credit/admin staff, support, and management. The client portal remains borrower-facing, while Twenty is the staff workspace for loan origination management, fact find review, credit proposal preparation, application packaging, tasks, conditions, status follow-up, settlement tracking, reporting, and post-settlement review.

This setup should be platform-neutral enough to support future ApplyOnline injection first, with AFG Flex as the alternate path, and current/transitional integrations with AFG, BrokerEngine, and specialist providers.

## Terminology Decisions

Use the following labels in documentation, navigation, and views:

| Staff label | Twenty/internal object | Setup instruction |
| --- | --- | --- |
| Contacts | People / Person | Relabel where Twenty allows it. Otherwise use Contacts in navigation/views/docs and treat People as internal platform naming. |
| Organisations | Companies | Use for employers, lenders, referral partners, trusts, and professional firms. |
| Deals | Opportunities | Use for the top-level sales/commercial opportunity. |
| Mortgage Applications | Custom object | Use for structured loan application packages. |
| Fact Finds | Custom object/workflow object | Use for structured borrower and household capture. |
| Credit Proposals | Custom object | Use for recommendation and credit review work. |

## Environment Preparation

Before configuring business objects:

- Deploy self-hosted Twenty in a development environment.
- Configure domain, TLS, backups, monitoring, and admin access.
- Create separate development, staging, and production plans before live client data is used.
- Configure email/calendar sync only after privacy and retention settings are approved.
- Create API keys for integration development using least-privilege access where possible.
- Confirm where secrets will be stored; do not commit API credentials to Git.
- Confirm whether production client data, bank data, identity data, and documents are permitted in Twenty.

## User Roles

Recommended role model:

| Role | Main responsibilities | Access posture |
| --- | --- | --- |
| Principal/Admin | Configuration, reporting, escalations, audit | Full access |
| Broker | Client relationship, recommendations, credit proposal, lodgement decisions | Own deals plus assigned team deals |
| Loan Processor | Fact find, document chase, packaging, lender conditions, settlement tasks | Application/task/document metadata access |
| Credit/Admin Reviewer | Credit proposal review, compliance evidence, exception review | Application, proposal, serviceability, conditions |
| Support/Client Success | Client tasks, post-settlement review, reminders | Limited client/workflow access |
| Integration Service Account | API sync only | Machine access scoped to required objects |

## Build Sequence

### Phase 1: Core CRM Foundation

Configure:

- Contacts.
- Organisations.
- Deals.
- Teams/users.
- Broker owner, processor owner, and credit/admin reviewer owner fields.
- Lead source and referral source fields.
- Communication logging approach.
- Contact-to-deal relationship conventions.

Acceptance:

- Staff can create a lead, link Contacts/Organisations, assign ownership, and move a Deal through early lead stages.
- The staff-facing language says Contacts, not People, wherever configurable.

### Phase 2: Board Foundation

Create the board/view structure before deep automation so staff can test the operating model.

Initial boards:

- Lead Intake Board.
- Fact Find Board.
- Document Collection Board.
- BID and Compliance Board.
- Credit Proposal Board.
- Lodgement Preparation Board.
- Lodged Application Status Board.
- Conditions Board.
- Valuation and LMI Board.
- Settlement Board.
- Post-Settlement Review Board.
- Integration Exceptions Board.

Acceptance:

- Every role has a default board showing work that needs action.
- Each board has owner, stage, next action, due date, and stale item indicators.
- Board stages match `pipeline-and-board-configuration.md`.

### Phase 3: Mortgage Origination Objects

Create custom objects:

- Mortgage Application.
- Household.
- Employment.
- Income.
- Expense.
- Asset.
- Liability.
- Loan Requirement.
- Property/Security.
- Document Metadata.
- Condition.
- Status Event.
- Integration Error Log.

Acceptance:

- A broker/processor can represent a complete residential mortgage scenario without using free-text notes as the main data store.

### Phase 4: BrokerEngine-Style Fact Find

Create:

- Fact Find Session object.
- Fact Find Section object.
- Section statuses and completion percentage.
- Portal reference fields.
- Missing information fields.
- Processor review status.
- Broker review status.
- Links to Contacts, Household, Deal, Mortgage Application, Documents, and Tasks.

Required sections:

- Applicant details.
- Co-applicant/guarantor details.
- Household and dependants.
- Goals, objectives, and requirements.
- Employment.
- Income.
- Expenses.
- Assets.
- Liabilities.
- Property/security.
- Documents.
- Consent and disclosures.

Acceptance:

- Staff can see fact-find progress by section.
- Missing information creates visible tasks or queue items.
- Credit review cannot proceed until minimum required sections are complete or waived.
- The client portal can later write into the same section model.

### Phase 5: Credit Proposal Workspace

Create:

- Credit Proposal object.
- Proposal statuses.
- Recommendation rationale fields.
- Policy exception fields.
- Risk/mitigant fields.
- Approval owner/date fields.
- Client-facing summary approved flag.
- Links to product research, serviceability, documents, compliance tasks, and Fact Find Session.

Acceptance:

- Twenty can hold the internal working proposal over time, including draft/review/approved history, without exposing internal notes to the client portal by default.

### Phase 6: Specialist Tool Records

Create or finalize records for:

- ID verification.
- Open banking session.
- Product research.
- Serviceability assessment.
- Valuation.
- LMI assessment.
- Credit check.
- Title/property search.

Acceptance:

- Each provider result can be tracked by status, provider reference, owner, timestamp, summary, and evidence/report link without storing unnecessary sensitive raw data.

### Phase 7: Views and Work Queues

Create saved views for each board and role:

- My new leads.
- My fact finds awaiting client.
- Submitted fact finds awaiting processor review.
- Missing information by section.
- Documents outstanding.
- ID verification incomplete.
- Open banking incomplete.
- Credit proposals in draft.
- Credit proposals awaiting review.
- Ready for lodgement.
- Lodged awaiting assessment.
- Conditional approvals with outstanding conditions.
- Settlement this week.
- Post-settlement reviews due.
- Integration errors requiring action.

Acceptance:

- Every user role has a default view showing the work they need to action today.

### Phase 8: Automations

Configure automations for:

- New lead assignment.
- Discovery task creation.
- Fact Find Session creation after discovery.
- Fact-find invitation and reminder tasks.
- Missing information tasks by fact-find section.
- Missing document follow-up.
- ID verification/open banking follow-up.
- Credit proposal review assignment.
- Lodgement readiness checklist.
- Unknown external status review.
- Condition due-date escalation.
- Settlement date reminders.
- Post-settlement review creation.

Acceptance:

- Routine follow-up work is automatically created, assigned, and visible in the correct board.

### Phase 9: Integrations

Build integration adapters in this order:

1. Client portal to Twenty.
2. Fact-find portal sync.
3. Document metadata/status sync.
4. ID verification provider.
5. Open banking provider.
6. Product research/serviceability provider.
7. BrokerEngine/AFG transitional sync if required.
8. ApplyOnline injection feasibility prototype.
9. AFG Flex fallback feasibility prototype.
10. LIXI validation/conversion tooling for approved development payloads.

Acceptance:

- Portal-created Contacts, Deals, Mortgage Applications, Fact Find Sessions, and Document Metadata appear in Twenty.
- Specialist tool statuses appear in Twenty.
- External status updates are captured as append-only Status Events.
- Failed sync items appear in Integration Error Log.
- LIXI validation errors can be recorded against the relevant application or integration run.

## Required Configuration Decisions

- Exact custom object names and plural labels.
- Whether People can be relabelled to Contacts in the deployed Twenty version.
- Which fields are required at each stage.
- Which fields are client-editable through the portal.
- Which fields are internal-only.
- Which fields are sensitive/restricted.
- Whether Credit Proposal approval requires a separate reviewer.
- Whether processor and broker ownership can differ.
- Whether Deals or Mortgage Applications drive the main stage.
- Which boards use Deals versus Mortgage Applications versus Fact Find Sessions.
- Whether settled clients remain in the same lifecycle or move to a servicing/review board.
- Which LIXI schema versions are used for each prototype.
- Whether LIXI validation results are stored as internal-only records or integration logs.

## Minimum Viable Setup

For the first usable internal pilot, configure only:

- Contacts, Organisations, Deals.
- Mortgage Application.
- Fact Find Session and Fact Find Section.
- Household.
- Income, Expense, Asset, Liability.
- Loan Requirement.
- Property/Security.
- Document Metadata.
- Credit Proposal.
- Lead Intake, Fact Find, Documents, Credit Proposal, Lodgement, Conditions, and Settlement boards.
- Manual status updates.
- Manual specialist tool references.

Defer:

- Direct ApplyOnline/AFG Flex injection.
- Full automated status sync.
- Full document binary handling.
- Deep LIXI field-level mapping.
- Complex reporting dashboards.

## Pilot Acceptance Criteria

- A broker can create a new Contact and Deal.
- A processor can track fact find by section, document collection, and packaging.
- A broker can prepare and review a Credit Proposal in Twenty.
- A manager can see active pipeline, board bottlenecks, blocker queues, and upcoming settlements.
- A client portal fact-find record can sync into Twenty in development.
- Specialist tool results can be recorded as references/statuses.
- No restricted LIXI content or credentials are committed to the repository.
