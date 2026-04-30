# Workflow Automation Plan

## Workflow Principles

- Keep Twenty workflows focused on internal loan origination management, fact-find review, credit proposal preparation, visibility, ownership, reminders, compliance evidence, and reporting.
- Keep client-facing steps in the portal, broker workflow in Twenty, specialist checks in dedicated tools, and lodgement actions in ApplyOnline/AFG Flex/AFG/BrokerEngine unless direct integration is approved.
- Use `Contacts` as the staff-facing label for borrower and professional person records.
- Use multiple board-style work queues instead of forcing every process into one pipeline.
- Use normalized stages in Twenty even when external platforms have different board/stage/status labels.
- Every automated step should create a visible task, status, event, or board movement that staff can inspect.

## Board-Based Workflow Model

The workspace should use these operational boards:

1. Lead Intake Board.
2. Fact Find Board.
3. Document Collection Board.
4. BID and Compliance Board.
5. Credit Proposal Board.
6. Lodgement Preparation Board.
7. Lodged Application Status Board.
8. Conditions Board.
9. Valuation and LMI Board.
10. Settlement Board.
11. Post-Settlement Review Board.
12. Integration Exceptions Board.

Detailed board stages are defined in `pipeline-and-board-configuration.md`. Automations should move work between these boards by creating or updating the right object, not by overloading one generic stage field.

Kanban behavior:

- Expand stages that currently contain cards/opportunities by default.
- Collapse empty stages by default so active work remains visible.
- Preserve stage number, name, count, and aggregate amount on collapsed columns.
- Provide expand all, collapse all, and individual stage expand/collapse controls where the platform allows it.
- Preserve current filters when switching between list and kanban.

## Normalized Mortgage Lifecycle

The following lifecycle is used for reporting and cross-board normalization:

1. Lead received.
2. Discovery booked.
3. Fact find invited.
4. Fact find in progress.
5. Fact find submitted.
6. Fact find under review.
7. Documents requested.
8. Documents received/verified.
9. Credit review.
10. Credit proposal in progress.
11. Credit proposal approved.
12. Ready for lodgement.
13. Lodged/submitted.
14. Awaiting assessment.
15. Conditional approval.
16. Conditions in progress.
17. Formal approval.
18. Loan documents issued.
19. Loan documents returned.
20. Settlement booked.
21. Settled.
22. Post-settlement review.
23. Withdrawn/declined/lost.

## Lead Intake

Trigger:

- New Contact, Deal, portal lead, referral, or imported lead created.

Actions:

- Assign broker owner.
- Create discovery call task.
- Create or update Deal.
- Set source, referral partner, and lead type.
- Place Deal on Lead Intake Board.

Acceptance:

- Every new lead has a Contact, owner, next task, source, and Deal stage.

## Discovery to Fact Find

Trigger:

- Discovery completed or Deal moved to fact-find-ready stage.

Actions:

- Create Fact Find Session.
- Create required Fact Find Sections.
- Link Contacts, Household, Deal, and Mortgage Application.
- Send portal/fact-find invitation if approved.
- Create processor review placeholder task.

Acceptance:

- Every discovery-complete Deal has a Fact Find Session with section tracking.

## BrokerEngine-Style Fact Find Automation

Trigger:

- Fact Find Session created, client updates a section, or staff requests missing information.

Actions:

- Update section status and completion percentage.
- Update overall Fact Find Session completion percentage.
- Create missing information tasks by section.
- Create document requests linked to section requirements.
- Move Fact Find Session through the Fact Find Board.
- Notify processor when client submits.
- Notify broker when processor review is complete.

Acceptance:

- Staff can see which section is incomplete without reading free-text notes.
- Credit Review is blocked until minimum required sections are complete or waived.

## BID and Compliance

Trigger:

- Fact find started, product recommendation started, loan requirement changed, or Credit Proposal created.

Actions:

- Create Best Interests Duty evidence task.
- Create credit guide/privacy consent task.
- Require reason notes for recommended lender/product.
- Flag conflicts, referral source, fees, unusual client objectives, or policy exceptions.
- Move compliance work through BID and Compliance Board.

Acceptance:

- Application cannot be marked ready for lodgement until compliance tasks are complete or explicitly approved by an authorized role.

## Document Collection

Trigger:

- Fact-find section or Mortgage Application requires documents.

Actions:

- Generate required Document Metadata checklist.
- Display document requests in the client portal.
- Link to the approved document provider, BrokerEngine, ApplyOnline/AFG Flex, AFG portal, or other storage if used.
- Create follow-up tasks for overdue documents.
- Update received/verified status from external platform if available.
- Move items through the Document Collection Board.

Acceptance:

- Twenty shows outstanding, received, verified, rejected, expired, and waived document items.
- Document binaries are not stored in Twenty unless approved.

## ID Verification

Trigger:

- Applicant reaches identity check stage or compliance rules require verification.

Actions:

- Launch selected ID verification provider from the portal.
- Capture consent and verification session reference.
- Store high-level result in Twenty.
- Create manual review task for failed, referred, expired, or incomplete checks.

Acceptance:

- Twenty shows ID verification status and evidence reference without exposing raw sensitive provider data unnecessarily.

## Open Banking

Trigger:

- Applicant consents to digital bank data collection.

Actions:

- Launch selected open banking provider from the portal.
- Track connection/session status.
- Store approved income/expense/transaction summary references in Twenty.
- Create fallback document request if open banking is incomplete or declined.

Acceptance:

- Broker can see whether open banking was completed, failed, expired, or manually bypassed.

## Product Research

Trigger:

- Application enters scenario/product selection.

Actions:

- Launch selected product research or comparison tool.
- Store provider reference and broker-approved shortlist summary.
- Capture recommendation rationale in Twenty.
- Expose only approved client-facing product summary in the portal.

Acceptance:

- Product research output supports broker recommendation and client dashboard display without exposing unapproved internal notes.

## Credit Proposal Management

Trigger:

- Fact Find Session complete, documents substantially ready, and product/serviceability inputs available or manually bypassed.

Actions:

- Create or update the Credit Proposal record in Twenty.
- Move proposal through Credit Proposal Board.
- Capture client objectives, shortlisted options, recommendation rationale, policy exceptions, risks, and mitigants.
- Link serviceability, product research, document, fact-find, and compliance evidence.
- Assign internal review task if required.
- Mark any client-facing summary as approved before portal display.

Acceptance:

- Twenty contains the working Credit Proposal history and approval status before lodgement or client presentation.
- Client portal only receives approved summaries, not internal working notes or risk commentary.

## Credit Review

Trigger:

- Fact Find complete and required core documents received/verified/waived.

Actions:

- Assign credit/admin reviewer or processor.
- Review income, expenses, assets, liabilities, loan requirement, and property/security.
- Create missing-info tasks.
- Set packaging/readiness status.

Acceptance:

- Application has a clear readiness status: not ready, missing information, ready for scenario, ready for lodgement, or blocked.

## Serviceability

Trigger:

- Scenario/product selection begins or requested loan amount changes materially.

Actions:

- Create Serviceability Assessment record.
- Store provider/reference.
- Record pass/fail/refer summary where permitted.
- Create follow-up task for shortfall or manual review.

Acceptance:

- Every application marked ready for lodgement has a serviceability status or documented reason it is not required.

## Lodgement Preparation

Trigger:

- Application moves to ready-for-lodgement review.

Actions:

- Check required fact-find sections.
- Check required field groups.
- Check documents and compliance tasks.
- Confirm external platform target: ApplyOnline preferred, AFG Flex alternate, AFG/BrokerEngine/manual fallback.
- Move application through Lodgement Preparation Board.
- Create lodgement task for responsible user.

Acceptance:

- Ready-for-lodgement view shows only applications with no unresolved blockers.

## Lodgement and Status Tracking

Trigger:

- External lodgement reference created or imported.

Actions:

- Store external application/deal ID.
- Switch authoritative lodgement/status ownership to ApplyOnline, AFG Flex, AFG, or BrokerEngine as applicable.
- Import status events.
- Normalize external status to Twenty lifecycle stage.
- Move application through Lodged Application Status Board.
- Create tasks for lender requests, errors, or conditions.

Acceptance:

- Twenty displays both raw external status and normalized CRM stage.
- Unknown external statuses create an admin review task.

## Conditions Management

Trigger:

- Conditional approval or condition event imported.

Actions:

- Create Condition records.
- Assign each condition to an owner.
- Link document/evidence reference.
- Move condition through Conditions Board.
- Escalate overdue conditions.

Acceptance:

- Conditional approvals show all outstanding, satisfied, waived, and blocked conditions.

## Valuation and LMI

Trigger:

- Valuation or LMI is required by selected lender/product, or external valuation/LMI event imported.

Actions:

- Create Valuation and/or LMI Assessment record.
- Track ordered, quoted, inspected, received, approved, shortfall, condition, and expiry statuses.
- Link valuation to Property/Security.
- Move work through Valuation and LMI Board.

Acceptance:

- Applications show valuation and LMI status and next action before formal approval.

## Loan Documents and Settlement

Trigger:

- Formal approval or document preparation event.

Actions:

- Create loan documents task.
- Track issued, signed, returned, certified, and accepted states.
- Create Settlement record.
- Move settlement through Settlement Board.
- Track settlement booking and funds-to-complete status.

Acceptance:

- Settlement view shows target date, confirmed date, document status, outstanding conditions, and responsible owner.

## Post-Settlement Review

Trigger:

- Settlement completed.

Actions:

- Create post-settlement review task.
- Schedule loan review.
- Update Contact lifecycle status.
- Move review through Post-Settlement Review Board.
- Trigger referral/review workflow if approved.

Acceptance:

- Every settled client has a review date and ownership assigned.

## Integration Exceptions

Trigger:

- API/webhook/polling job fails, external status is unknown, duplicate match candidate is detected, document link expires, or provider consent expires.

Actions:

- Create Integration Error Log record.
- Link to Contact, Deal, Mortgage Application, or external ID.
- Move item through Integration Exceptions Board.
- Create admin/developer/operations task.
- Retry where safe.

Acceptance:

- Failed sync work is visible and assigned rather than hidden in logs.

## Controlled Bulk Edit

Trigger:

- User selects multiple records from an approved board or list view and starts a bulk edit.

Actions:

- Show only approved bulk-edit fields for the selected object type.
- Require the user to explicitly select each field being changed.
- Validate field values before enabling the next step.
- Require separate confirmation before empty values can clear existing data.
- Require an explicit workflow-trigger choice when Board Stage is changed in bulk.
- Preview record count, object type, target fields, and clearing behavior.
- Apply updates through the Twenty API or approved workflow action.
- Write a bulk-edit audit record and per-record result.
- Route failed records to the Integration Exceptions Board.

Acceptance:

- Staff can safely update review dates, source, role, brand, broker owner, referred-by, tags, stage due date, processor owner, and priority in bulk.
- Staff can safely update Board Stage, Broker, Assigned Team, Loan Processor, workflow on/off, and archive actions in bulk where role permissions allow it.
- Sensitive fields, external identifiers, raw external statuses, and compliance/verification outcomes cannot be bulk overwritten.

## Management Reporting

Dashboards should include:

- New leads by source.
- Deals by stage.
- Fact finds incomplete by age and section.
- Documents outstanding.
- Applications awaiting client.
- Applications awaiting lender.
- Credit proposals awaiting review.
- Conditional approvals with overdue conditions.
- Settlement pipeline.
- Settlements completed.
- At-risk deals.
- Broker/processor workload.
- Integration errors by source.
