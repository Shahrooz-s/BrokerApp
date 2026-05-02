# BrokerEngine Board And Bulk Edit Reference

## Purpose

This document captures useful BrokerEngine user-interface patterns from the supplied screenshots so they can inform the Brandroll Twenty CRM setup.

The screenshots should be treated as product-reference material only. Do not copy BrokerEngine UI code, branding, or proprietary implementation. The goal is to reproduce the operational capability in Twenty and the Brandroll portal: fast board navigation, broker-friendly stage views, clear card metadata, and controlled bulk-edit actions.

## Observed Board Navigation

The BrokerEngine screenshots show a left-hand application navigation with major modules for search, tasks, boards, products, outbox, calculator, contacts, updates, more, and add/new actions.

The Boards menu includes these board groups:

- Asset Finance.
- Construction.
- Deals.
- Leads.
- Maintenance.
- Partnerships.
- Reviews.

Brandroll does not need to copy those labels exactly, but the same concept is useful: boards should be grouped by operational workflow, not only by underlying database object.

Recommended Brandroll board groups:

- Leads.
- Deals.
- Fact Find.
- Documents.
- Credit Proposal.
- Lodgement.
- Conditions.
- Valuation and LMI.
- Settlement.
- Reviews.
- Partnerships.
- Integration Exceptions.

## Observed Lead Board Pattern

The lead board screenshot shows:

- A top action for creating a new record.
- Board-level count and dollar-value summary.
- Search box and compact toolbar actions for filtering, display controls, and list/board switching.
- Horizontal kanban-style stages.
- Stage headers with record count and aggregate amount.
- Collapsible stages shown as narrow vertical columns.
- Lead cards with owner, broker/lender/brand indicator, status dots, and chips for finance, settlement, and stage due date.
- Prominent stage-due date display.

Observed lead stages:

1. New Lead.
2. Attempted Contact 1.
3. Attempted Contact 2.
4. Attempted Contact 3.
5. Initial Call Held > Get Docs.
6. Docs Requested.
7. Research > Servicing.
8. Prepare Loan Proposal.
9. Loan Proposal Presented.
10. Client Accepted > Handover.
11. On Hold.
12. Lost Opps.

Recommended Twenty implementation:

- Use the Lead Intake Board for active lead conversion work.
- Add stage order numbers so board columns remain stable and easy to scan.
- Add stage count and aggregate estimated loan amount where reporting supports it.
- Support collapsed low-activity columns where the platform allows it.
- Default to expanded columns only for stages that currently contain cards/opportunities.
- Keep empty stages collapsed by default so the active work remains visible.
- Provide explicit controls to expand all stages, collapse all stages, and expand/collapse an individual stage.
- Show card metadata for owner, finance due date, settlement target, stage due date, broker brand, lead source, referral source, and blocker count.
- Keep the board compact enough for broker/admin use; avoid turning cards into full application summaries.

## Observed Deal Board Pattern

The live BrokerEngine Deal board uses a separate post-lead workflow for active loan origination. This confirms that Brandroll should not treat every mortgage file as one long lead board. Lead conversion and deal/application management need different boards or saved views.

Observed deal board summary:

- Top action for `New`.
- Board-level count and aggregate loan amount.
- Search and display controls.
- Board/list switch.
- Stage-numbered kanban columns.
- Empty stages collapsed into narrow vertical headers.
- Active stages expanded with cards showing owner, finance date, settlement date, and stage due date.

Observed Deal board stages:

1. Outstanding Supporting Documents.
2. Prepare for Submission.
3. App Docs With Client.
4. Signed App Docs Returned.
5. Application Lodged.
6. AIP Issued.
7. AIP > Full Conversion.
8. Conditional/MIRs.
9. Conditions/MIRs With Client.
10. Conditions/MIRs With Lender.
11. Formal Approval.
12. Mortgage Docs Issued.
13. Mortgage Docs Returned.
14. Ready To Settle.
15. Settlement Booked.
16. Settlement.
17. Lost/Declined.

The New Deal modal also confirms the minimum creation fields that need a clean BrokerApp equivalent:

- Deal name.
- Initial stage.
- Applicants.
- Primary applicant.
- Broker.
- Lender, with an `Other/unknown` option.
- Loan processor.

Recommended Twenty implementation:

- Use native Opportunities as the staff-facing Deal/Opportunity record.
- Keep the lead intake board separate from the active deal board.
- Add related tools inside the Opportunity for fact find, documents, serviceability, product search, credit proposal, lodgement readiness, conditions, mortgage docs, settlement, and integration events.
- Keep Contacts/Companies in the sidebar as reusable records, but make the Opportunity the working file.
- Treat `Application Lodged`, `AIP Issued`, `Conditional/MIRs`, `Formal Approval`, and settlement stages as normalized internal stages that can be fed by ApplyOnline, AFG Flex, AFG, BrokerEngine, or manual updates.

## List View And Kanban View Behavior

The screenshots show that BrokerEngine supports both list/table view and board/kanban view for the same lead/deal data.

Brandroll should treat these as two views over the same records:

- List view is for filtering, sorting, column review, export, bulk selection, and dense operations.
- Kanban view is for stage movement, triage, ownership, due-date visibility, and daily workflow.
- The same saved filters should be usable in both views where possible.
- List view should show selected columns from the default filter/column settings.
- Kanban cards should show a curated subset of the same information so the board remains readable.
- Users should be able to switch between list and board views without losing the current board/filter context.

Observed list-view controls:

- Search.
- Filter.
- Active/inactive toggle.
- Edit Columns.
- Export View.
- Bulk Edit.
- View as board.
- Pagination and page size.

## Default Filter And Column Settings

The supplied field list and column-settings screenshot show a broad deal/lead field catalogue. This should become the first column/filter reference for Brandroll board/list configuration.

### Default Filter Fields

- Deal Stage.
- Name.
- Application ID.
- Contact.
- Status.
- Lender.
- Lender Reference.
- Security Property.
- Loan Amount.
- Post Cap LVR.
- Finance Date.
- Settlement Date.
- Stage Due Date.
- Broker Handover Date.
- Exp. Lodged Date.
- Lodged w/ FI Date.
- Pre Approved Date.
- Formal Approval Date.
- Exp. Settlement Date.
- Settlement Refi.
- Settlement Purchase.
- Assigned Team.
- Broker.
- Funding Template.
- Referred By.
- Referrer Manager.
- Lead Source.
- Created On.
- Last Note.

### Primary Applicant Fields

- Primary Applicant.
- Primary Applicant First Name.
- Primary Applicant Last Name.
- Primary Applicant Preferred Name.
- Primary Applicant Full Name.
- Primary Applicant Mobile.
- Primary Applicant Email.
- Primary Applicant Home Address.
- Primary Applicant Postal Address.
- Primary Applicant Tags.

### Co-Applicant 1 Fields

- Co-Applicant 1.
- Co-Applicant 1 First Name.
- Co-Applicant 1 Last Name.
- Co-Applicant 1 Preferred Name.
- Co-Applicant 1 Full Name.
- Co-Applicant 1 Mobile.
- Co-Applicant 1 Email.
- Co-Applicant 1 Home Address.
- Co-Applicant 1 Postal Address.
- Co-Applicant 1 Tags.

BrokerApp residential extension:

- Repeat the same list-view aliases for Co-Applicant 2 and Co-Applicant 3 when a file has three or four applicants.
- Internally use Applicant Profile records with applicant index `3` and `4`; do not create separate duplicated CRM objects for each co-applicant slot.

### Role Fields

- Loan Processor.

### Builder Fields

- Builder Full Name.
- Builder Company.
- Builder Mobile.
- Builder Email.

### Agent Fields

- Agent Full Name.
- Agent Company.
- Agent Mobile.
- Agent Email.

### Outgoing Lender Fields

- Outgoing Lender Name.
- Outgoing Lender Reference.
- Outgoing Lender Discharge Stage.

### Valuation Fields

- Valuation Lender.
- Valuation Status.
- Valuation Type.
- Valuation Date Ordered.
- Valuation Reference Number.
- Valuation Estimated Value.

### Financial Planner Fields

- Financial Planner Full Name.
- Financial Planner Company.
- Financial Planner Mobile.
- Financial Planner Email.

### Accountant Fields

- Accountant Full Name.
- Accountant Company.
- Accountant Mobile.
- Accountant Email.

### Buyers Agent Fields

- Buyers Agent Full Name.
- Buyers Agent Company.
- Buyers Agent Mobile.
- Buyers Agent Email.

### Third Party Fields

- Third Party Full Name.
- Third Party Company.
- Third Party Mobile.
- Third Party Email.

### Solicitor Fields

- Solicitor Full Name.
- Solicitor Company.
- Solicitor Office Address.
- Solicitor Mobile.
- Solicitor Email.

### Custom Text Fields

- Settlement Refi.
- Settlement Purchase.
- Custom Text 3.
- Custom Text 4.
- Custom Text 5.

## Recommended Kanban Card Fields

Kanban cards should not show the whole list-view field catalogue. Use a compact display:

- Deal/application name.
- Primary applicant or contact name.
- Broker owner.
- Assigned team or processor.
- Lender or lender icon where available.
- Loan amount.
- Finance date.
- Settlement date.
- Stage due date.
- Referred by or lead source when useful.
- Important flags: urgent, shared, blocked, missing documents, workflow off.
- Tags/chips for finance, settlement, and stage due.

Secondary fields such as applicant emails, solicitor details, valuation reference, outgoing lender discharge stage, or builder/agent contact details should stay in list/detail views unless a specific board needs them.

## Bulk Edit Modal Pattern

The BrokerEngine bulk edit screenshot shows a modal titled `Bulk edit` with explicit field selection checkboxes. The user chooses which fields to update, then supplies values only for selected fields.

Observed bulk-edit fields:

- Next Review On.
- Lead Source.
- Contact Role.
- Broker Brand.
- Broker.
- Referred By.

Observed deal/application bulk-edit fields:

- Board Stage.
- Trigger workflows in bulk after Board Stage changes.
- Broker.
- Assigned Team.
- Loan Processor.
- Allow empty value to clear this role.
- Archive FinanceVault.
- Turn Workflow Off.
- Turn Workflow On.
- Archive Application.

Observed safety behavior:

- Each editable field has an explicit checkbox.
- Date fields use a date picker.
- Lookup/select fields use dropdown controls.
- `Allow empty to clear this field` is a separate guarded option.
- `Next` remains disabled until the selected update is valid.
- The modal has a clear cancel path.

## Brandroll Bulk Edit Requirements

Bulk edit should be treated as an operations feature with audit controls, not as a casual spreadsheet update.

Minimum requirements:

- Support selected-record bulk updates from board, deal, application, referral, lead, contact, review, and partnership views.
- Require explicit field selection before a value can be changed.
- Require a confirmation step showing record count, object type, fields to be changed, and whether empty values will clear fields.
- Allow empty-value clearing only when `Allow empty to clear this field` is explicitly selected.
- For stage changes, require an explicit choice for whether workflow automations should be triggered in bulk.
- Log who performed the bulk edit, when it ran, source view/filter, affected object type, affected record IDs, fields changed, old values where safe, and new values where safe.
- Run large updates as a background job with success/failure counts.
- Route failed records to the Integration Exceptions or Admin Review queue.
- Respect field-level permissions and role access.
- Prevent bulk editing of external IDs, audit timestamps, raw external statuses, source-created dates, consent evidence, identity verification results, open banking summaries, and restricted compliance outcomes.
- Treat archive actions and workflow on/off actions as privileged bulk operations with an additional confirmation step.

Recommended first-release bulk-edit fields:

| Object | Fields |
| --- | --- |
| Contact | Next Review On, Lead Source, Contact Role, Broker Brand, Broker Owner, Referred By, Tags |
| Lead | Board Stage, Broker Owner, Assigned Team, Loan Processor, Lead Source, Referral Source, Broker Brand, Stage Due Date, Workflow On/Off |
| Deal | Board Stage, Broker Owner, Assigned Team, Loan Processor, Lead Source, Referral Source, Broker Brand, Current Stage, Stage Due Date, Priority, Workflow On/Off |
| Mortgage Application | Board Stage, Broker Owner, Assigned Team, Processor Owner, Credit Reviewer, Lodgement Target, Current Internal Stage, Stage Due Date, Blocker Flag, Archive Application |
| Referral | Broker Owner, Referrer Manager, Referred By, Lead Source, Broker Brand, Next Review On |
| Fact Find Session | Assigned Processor, Broker Review Status, Follow-up Due Date, Reminder Suppressed |
| Document Metadata | Assigned Owner, Request Status, Due Date, Waived Flag |
| Condition | Assigned Owner, Status, Due Date, Escalation Flag |
| Review | Broker Owner, Review Due Date, Review Status, Priority |
| External document workspace | Archive FinanceVault only where provider rules allow it |

## Twenty Implementation Notes

If the deployed Twenty version supports native bulk update for table or board selections, enable it only for the approved fields above.

If Twenty does not support the required guarded bulk-edit behavior out of the box, implement a controlled admin action through the integration layer:

1. User selects records in Twenty or an admin view.
2. User chooses an approved bulk-edit action.
3. UI asks for fields and values.
4. UI requires explicit confirmation for empty-value clearing.
5. Backend validates permissions and allowed fields.
6. Backend writes changes through the Twenty API.
7. Backend writes an audit record and per-record result.
8. Failed records are added to an exception queue.

Do not bypass Twenty's API or write directly to the database for bulk operational updates unless a migration script is being run in a controlled maintenance window.

## Acceptance Criteria

- Users can navigate to board groups that match mortgage operations rather than generic CRM categories.
- Lead board cards expose owner, due dates, source/brand tags, and stage context without opening the record.
- Columns can remain scannable even when many stages exist.
- Kanban can collapse and expand all stages and individual stages.
- Empty stages are collapsed by default unless the user expands them.
- Stages with cards/opportunities are expanded by default so active work is visible.
- List view can expose the default filter/column-settings field catalogue.
- Kanban view can show a compact card subset from the same data.
- Bulk edit supports the BrokerEngine-style fields: Next Review On, Lead Source, Contact Role, Broker Brand, Broker, and Referred By.
- Bulk edit supports board/deal/application operations including Board Stage, Broker, Assigned Team, Loan Processor, workflow on/off, archive application, and archive FinanceVault where approved.
- Empty-value clearing is impossible unless the user explicitly chooses the clearing option.
- Stage-change workflow triggering is explicit, not implicit.
- Bulk edits are auditable and permission-controlled.
- External IDs, consent evidence, sensitive verification outcomes, and raw external statuses are protected from casual bulk overwrite.
