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
- Show card metadata for owner, finance due date, settlement target, stage due date, broker brand, lead source, referral source, and blocker count.
- Keep the board compact enough for broker/admin use; avoid turning cards into full application summaries.

## Bulk Edit Modal Pattern

The BrokerEngine bulk edit screenshot shows a modal titled `Bulk edit` with explicit field selection checkboxes. The user chooses which fields to update, then supplies values only for selected fields.

Observed bulk-edit fields:

- Next Review On.
- Lead Source.
- Contact Role.
- Broker Brand.
- Broker.
- Referred By.

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

- Support selected-record bulk updates from contact, lead, deal, review, and partnership views.
- Require explicit field selection before a value can be changed.
- Require a confirmation step showing record count, object type, fields to be changed, and whether empty values will clear fields.
- Allow empty-value clearing only when `Allow empty to clear this field` is explicitly selected.
- Log who performed the bulk edit, when it ran, source view/filter, affected object type, affected record IDs, fields changed, old values where safe, and new values where safe.
- Run large updates as a background job with success/failure counts.
- Route failed records to the Integration Exceptions or Admin Review queue.
- Respect field-level permissions and role access.
- Prevent bulk editing of external IDs, audit timestamps, raw external statuses, source-created dates, consent evidence, identity verification results, open banking summaries, and restricted compliance outcomes.

Recommended first-release bulk-edit fields:

| Object | Fields |
| --- | --- |
| Contact | Next Review On, Lead Source, Contact Role, Broker Brand, Broker Owner, Referred By, Tags |
| Deal | Broker Owner, Processor Owner, Lead Source, Referral Source, Broker Brand, Current Stage, Stage Due Date, Priority |
| Mortgage Application | Processor Owner, Credit Reviewer, Lodgement Target, Current Internal Stage, Stage Due Date, Blocker Flag |
| Fact Find Session | Assigned Processor, Broker Review Status, Follow-up Due Date, Reminder Suppressed |
| Document Metadata | Assigned Owner, Request Status, Due Date, Waived Flag |
| Condition | Assigned Owner, Status, Due Date, Escalation Flag |
| Review | Broker Owner, Review Due Date, Review Status, Priority |

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
- Bulk edit supports the BrokerEngine-style fields: Next Review On, Lead Source, Contact Role, Broker Brand, Broker, and Referred By.
- Empty-value clearing is impossible unless the user explicitly chooses the clearing option.
- Bulk edits are auditable and permission-controlled.
- External IDs, consent evidence, sensitive verification outcomes, and raw external statuses are protected from casual bulk overwrite.
