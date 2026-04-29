# Pipeline and Board Configuration

## Purpose

Twenty should be configured with multiple mortgage workflow boards rather than a single generic sales pipeline. The target operating model should feel similar to BrokerEngine-style operational boards: each board represents a work queue with owners, stages, entry criteria, exit criteria, tasks, and reporting.

## Board Principles

- Use board-style views where the team needs to move records through visible stages.
- Use table/list views where the team needs dense review, filtering, and bulk follow-up.
- Keep Deals, Mortgage Applications, Fact Finds, Documents, Conditions, Settlements, and Integration Errors as separate operational work surfaces.
- Do not duplicate the same status across many objects without a clear source of truth.
- Store raw external statuses separately from normalized internal stages.
- Every board needs an owner field, next action, due date, and stale-work indicator.
- Support stage order numbers so boards can stay stable and scannable.
- Use compact card metadata for owner, source/brand, key due dates, and blocker indicators.
- Where the platform allows it, support collapsed low-activity columns so long boards remain usable.

## BrokerEngine Reference Patterns

The supplied BrokerEngine screenshots show useful patterns for the Brandroll board setup:

- Board groups for Asset Finance, Construction, Deals, Leads, Maintenance, Partnerships, and Reviews.
- A Leads board with record count and aggregate dollar-value summary.
- Stage-numbered columns with counts and aggregate values.
- Collapsed columns displayed as narrow vertical stage headers.
- Lead cards showing owner, broker/lender/brand marker, status dots, and chips for Finance, Settlement, and Stage Due dates.
- Toolbar actions for search, filtering, display controls, and list/board switching.
- A guarded bulk-edit modal for operational fields.

Brandroll should use these as workflow requirements, not as UI-copy requirements. The implementation should feel familiar to BrokerEngine users while remaining native to Twenty.

## Recommended Boards

### 1. Lead Intake Board

Primary object: Deals.

Stages:

1. New lead.
2. Attempted contact 1.
3. Attempted contact 2.
4. Attempted contact 3.
5. Initial call held > get docs.
6. Docs requested.
7. Research > servicing.
8. Prepare loan proposal.
9. Loan proposal presented.
10. Client accepted > handover.
11. On hold.
12. Lost opps.

Primary owners: broker, support.

Exit criteria:

- Contact exists.
- Deal has broker owner.
- Fact Find Session created or lead is moved to nurture/lost.

Automation candidates:

- Create discovery task on new lead.
- Alert broker if no first contact within target SLA.
- Create Fact Find Session when discovery is complete.
- Create stage-due tasks when a lead sits too long in an attempted-contact or proposal stage.

Recommended card fields:

- Contact or deal name.
- Broker owner.
- Broker brand.
- Lead source.
- Finance due date.
- Settlement target.
- Stage due date.
- Estimated loan amount.
- Blocker/status indicator.

### 2. Fact Find Board

Primary object: Fact Find Session.

Stages:

1. Not started.
2. Client invited.
3. In progress.
4. Client submitted.
5. Processor review.
6. Missing information.
7. Broker review.
8. Complete.
9. Archived/replaced.

Primary owners: processor, broker.

Exit criteria:

- Required sections complete.
- Required consents captured.
- Missing information tasks cleared or waived.
- Staff review status is complete.

Automation candidates:

- Create missing information tasks by section.
- Send portal reminders for incomplete client sections.
- Block credit review until minimum fact-find sections are complete.

### 3. Document Collection Board

Primary object: Document Metadata or Document Request.

Stages:

1. Not requested.
2. Requested.
3. Client uploaded/provided.
4. Received.
5. Under review.
6. Verified.
7. Rejected/rework required.
8. Waived.
9. Expired.

Primary owners: processor, support.

Exit criteria:

- Required document items are verified or waived.
- Expired documents are refreshed or waived.

Automation candidates:

- Create follow-up task when requested documents are overdue.
- Notify broker/processor when a document is rejected.
- Create new request when a document expires.

### 4. BID and Compliance Board

Primary object: Compliance Task or Credit Proposal.

Stages:

1. Not started.
2. Disclosure/consent pending.
3. Needs/objectives captured.
4. Product rationale pending.
5. Risk/mitigant review.
6. Reviewer approval required.
7. Approved.
8. Exception/escalation.

Primary owners: broker, credit/admin reviewer.

Exit criteria:

- BID evidence complete.
- Required disclosures and consents recorded.
- Product recommendation rationale reviewed.
- Exceptions approved or resolved.

Automation candidates:

- Create BID evidence task when product recommendation starts.
- Escalate exceptions to reviewer.
- Prevent ready-for-lodgement status until required compliance items are complete or waived by an authorized role.

### 5. Credit Proposal Board

Primary object: Credit Proposal.

Stages:

1. Not started.
2. Drafting.
3. Product research pending.
4. Serviceability pending.
5. Broker review.
6. Credit/admin review.
7. Approved.
8. Presented to client.
9. Revised.
10. Archived.

Primary owners: broker, credit/admin reviewer.

Exit criteria:

- Approved internal recommendation.
- Client-facing summary approved where needed.
- Linked evidence and supporting records are attached by reference.

Automation candidates:

- Assign reviewer when proposal enters review.
- Create task if serviceability or product research is missing.
- Lock or flag client-facing summary until approved.

### 6. Lodgement Preparation Board

Primary object: Mortgage Application.

Stages:

1. Packaging not started.
2. Data review.
3. Documents review.
4. Compliance review.
5. Lender/product confirmed.
6. Ready for lodgement.
7. Lodgement task assigned.
8. Submitted/lodged.
9. Blocked.

Primary owners: broker, processor, credit/admin reviewer.

Exit criteria:

- Required fact-find sections complete.
- Required document metadata verified/waived.
- Credit Proposal approved.
- Lodgement target confirmed.

Automation candidates:

- Create readiness checklist task.
- Create blocker task for missing required fields.
- Record chosen lodgement target: ApplyOnline, AFG Flex, AFG, BrokerEngine, or manual.

### 7. Lodged Application Status Board

Primary object: Mortgage Application or Status Event summary.

Stages:

1. Lodged.
2. Awaiting assessment.
3. More information requested.
4. Conditional approval.
5. Formal approval.
6. Declined.
7. Withdrawn.
8. Settled/complete.

Primary owners: processor, broker.

Exit criteria:

- Status updated from external source or manually confirmed.
- Conditions and settlement workflow created where applicable.

Automation candidates:

- Normalize raw external status into board stage.
- Create review task for unknown external status.
- Append every imported external status to Status Event.

### 8. Conditions Board

Primary object: Condition.

Stages:

1. New condition.
2. Assigned.
3. Waiting on client.
4. Waiting on third party.
5. Evidence received.
6. Submitted for review.
7. Satisfied.
8. Waived.
9. Blocked/escalated.

Primary owners: processor, broker.

Exit criteria:

- All required conditions are satisfied or waived.
- Blocked/escalated items are resolved before settlement.

Automation candidates:

- Create task per new lender condition.
- Escalate conditions due within target period.
- Notify broker when all conditions are satisfied.

### 9. Valuation and LMI Board

Primary objects: Valuation, LMI Assessment.

Stages:

1. Not required/not started.
2. Required.
3. Ordered/quoted.
4. Pending inspection/assessment.
5. Received.
6. Accepted/approved.
7. Shortfall/condition.
8. Escalation.

Primary owners: processor, broker.

Exit criteria:

- Valuation and LMI are complete, accepted, waived, or documented as not required.

Automation candidates:

- Create valuation task when lender/product requires it.
- Create LMI task when LVR/product rules indicate possible LMI.
- Flag shortfall or LMI condition for broker review.

### 10. Settlement Board

Primary object: Settlement.

Stages:

1. Not started.
2. Loan documents issued.
3. Loan documents returned.
4. Certification pending.
5. Ready to book.
6. Settlement booked.
7. Settled.
8. Delayed/escalated.

Primary owners: processor, broker.

Exit criteria:

- Settlement completed.
- Post-settlement review task created.

Automation candidates:

- Create settlement preparation task on formal approval.
- Alert if settlement date is near and loan docs or conditions are outstanding.
- Create post-settlement review record on settlement.

### 11. Post-Settlement Review Board

Primary object: Review Task or Deal/Contact lifecycle status.

Stages:

1. Settled.
2. Welcome/check-in due.
3. First review scheduled.
4. Annual review due.
5. Refinance/opportunity identified.
6. Closed/no action.

Primary owners: broker, support.

Exit criteria:

- Review completed or next review scheduled.

Automation candidates:

- Create review task after settlement.
- Create annual review task.
- Create new Deal if refinance or new lending need is identified.

### 12. Integration Exceptions Board

Primary object: Integration Error Log.

Stages:

1. New error.
2. Triaged.
3. Waiting on vendor.
4. Waiting on internal data fix.
5. Retry scheduled.
6. Resolved.
7. Ignored/known issue.

Primary owners: admin, operations, developer.

Exit criteria:

- Failed sync is resolved, retried successfully, or documented as ignored.

Automation candidates:

- Create error record on failed webhook/polling job.
- Escalate repeated failures.
- Link error to Contact, Deal, Application, or external ID.

## Bulk Edit Requirements

BrokerEngine provides a guarded bulk-edit pattern for selected records. Brandroll should reproduce the operational behavior where Twenty supports it natively, or through a controlled admin action if native Twenty bulk edit is not sufficient.

Approved first-release bulk-edit fields:

- Next Review On.
- Lead Source.
- Contact Role.
- Broker Brand.
- Broker.
- Referred By.
- Tags.
- Stage Due Date.
- Processor Owner.
- Priority.

Required safeguards:

- Field values are changed only when the field is explicitly selected.
- Empty-value clearing requires a separate `Allow empty to clear this field` confirmation.
- Users see a confirmation step with record count, object type, and fields being changed.
- Bulk edits respect role and field permissions.
- Bulk edits write an audit record.
- Bulk edits do not overwrite external IDs, raw external statuses, source-created dates, verification outcomes, consent evidence, or restricted compliance fields.
- Large updates run as background jobs and route failures to the Integration Exceptions board.

## Reporting Views

Management dashboards should include:

- Leads by source and broker.
- Deals by current board/stage.
- Fact finds incomplete by age.
- Documents outstanding by applicant and age.
- Credit proposals awaiting review.
- Applications ready for lodgement.
- Lodged applications awaiting lender response.
- Conditional approvals with overdue conditions.
- Settlements this week/month.
- Integration errors by source.
- Broker and processor workload.

## Setup Acceptance Criteria

- Each major work type has a board or saved view.
- Staff can see their daily queue without filtering a generic master list.
- Each board has stage definitions, owner fields, due dates, and stale-item indicators.
- Moving a record between boards or stages creates the right next task.
- Broker-facing boards and client-facing dashboard statuses are mapped but not identical.
- Bulk-edit behavior is limited to approved operational fields and has clear audit/clear-field safeguards.
