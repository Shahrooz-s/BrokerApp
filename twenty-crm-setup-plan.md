# Twenty CRM Setup Plan

## Setup Goal

Configure Twenty as the internal mortgage origination application for brokers, processors, credit/admin staff, and management. The client portal remains borrower-facing, while Twenty is the staff workspace for loan origination management, credit proposal preparation, application packaging, tasks, conditions, status follow-up, settlement tracking, and reporting.

This setup should be platform-neutral enough to support future ApplyOnline injection first, with AFG Flex as the alternate path, and current/transitional integrations with AFG, BrokerEngine, and specialist providers.

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

- People.
- Companies.
- Opportunities.
- Teams/users.
- Standard ownership fields.
- Lead source and referral source fields.
- Communication logging approach.

Acceptance:

- Staff can create a lead, link people/companies, assign ownership, and move an opportunity through early stages.

### Phase 2: Mortgage Origination Objects

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
- Document metadata.
- Condition.
- Status Event.
- Integration Error Log.

Acceptance:

- A broker/processor can represent a complete residential mortgage scenario without using free-text notes as the main data store.

### Phase 3: Credit Proposal Workspace

Create:

- Credit Proposal object.
- Proposal statuses.
- Recommendation rationale fields.
- Policy exception fields.
- Risk/mitigant fields.
- Approval owner/date fields.
- Links to product research, serviceability, documents, and compliance tasks.

Acceptance:

- Twenty can hold the internal working proposal over time, including draft/review/approved history, without exposing internal notes to the client portal by default.

### Phase 4: Specialist Tool Records

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

### Phase 5: Views and Work Queues

Create operational views:

- New leads.
- Discovery booked.
- Fact find incomplete.
- Documents outstanding.
- ID verification incomplete.
- Open banking incomplete.
- Ready for credit review.
- Credit proposals in draft.
- Credit proposals awaiting review.
- Ready for lodgement.
- Lodged awaiting assessment.
- Conditional approvals with outstanding conditions.
- Formal approvals awaiting loan docs.
- Settlement this week.
- Settled this month.
- Post-settlement reviews due.
- Integration errors requiring action.

Acceptance:

- Every user role has a default view showing the work they need to action today.

### Phase 6: Automations

Configure automations for:

- New lead assignment.
- Discovery task creation.
- Fact-find reminder tasks.
- Missing document follow-up.
- ID verification/open banking follow-up.
- Credit proposal review assignment.
- Lodgement readiness checklist.
- Unknown external status review.
- Condition due-date escalation.
- Settlement date reminders.
- Post-settlement review creation.

Acceptance:

- Routine follow-up work is automatically created, assigned, and visible in the correct queue.

### Phase 7: Integrations

Build integration adapters in this order:

1. Client portal to Twenty.
2. Document metadata/status sync.
3. ID verification provider.
4. Open banking provider.
5. Product research/serviceability provider.
6. BrokerEngine/AFG transitional sync if required.
7. ApplyOnline injection feasibility prototype.
8. AFG Flex fallback feasibility prototype.
9. LIXI validation/conversion tooling for approved development payloads.

Acceptance:

- Portal-created records appear in Twenty.
- Specialist tool statuses appear in Twenty.
- External status updates are captured as append-only Status Events.
- Failed sync items appear in Integration Error Log.
- LIXI validation errors can be recorded against the relevant application or integration run.

## Required Twenty Configuration Decisions

- Exact custom object names and plural labels.
- Which fields are required at each stage.
- Which fields are client-editable through the portal.
- Which fields are internal-only.
- Which fields are sensitive/restricted.
- Whether credit proposal approval requires a separate reviewer.
- Whether processor and broker ownership can differ.
- Whether opportunities or mortgage applications drive pipeline stage.
- Whether settled clients remain in the same pipeline or move to a servicing/review pipeline.
- Which LIXI schema versions are used for each prototype.
- Whether LIXI validation results are stored as internal-only records or integration logs.

## Minimum Viable Setup

For the first usable internal pilot, configure only:

- People, Companies, Opportunities.
- Mortgage Application.
- Household.
- Income, Expense, Asset, Liability.
- Loan Requirement.
- Property/Security.
- Document metadata.
- Credit Proposal.
- Task views and core stages.
- Manual status updates.
- Manual specialist tool references.

Defer:

- Direct ApplyOnline/AFG Flex injection.
- Full automated status sync.
- Full document binary handling.
- Deep LIXI field-level mapping.
- Complex reporting dashboards.

## Pilot Acceptance Criteria

- A broker can create a new client and opportunity.
- A processor can track fact find, document collection, and packaging.
- A broker can prepare and review a credit proposal in Twenty.
- A manager can see active pipeline, blocker queues, and upcoming settlements.
- A client portal record can sync into Twenty in development.
- Specialist tool results can be recorded as references/statuses.
- No restricted LIXI content or credentials are committed to the repository.
