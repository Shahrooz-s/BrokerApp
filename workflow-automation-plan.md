# Workflow Automation Plan

## Workflow Principles

- Keep Twenty workflows focused on internal loan origination management, credit proposal preparation, visibility, ownership, reminders, compliance evidence, and reporting.
- Keep client-facing steps in the portal, broker workflow in Twenty, specialist checks in dedicated tools, and lodgement actions in ApplyOnline/AFG Flex/AFG/BrokerEngine unless direct integration is approved.
- Use normalized stages in Twenty even when external platforms have different status labels.
- Every automated step should create a visible task, status, or event record that staff can inspect.

## Pipeline Stages

1. Lead received.
2. Discovery booked.
3. Fact find in progress.
4. Fact find complete.
5. Documents requested.
6. Documents received.
7. Credit review.
8. Credit proposal in progress.
9. Scenario/product selection.
10. Ready for lodgement.
11. Lodged.
12. Awaiting assessment.
13. Conditional approval.
14. Conditions in progress.
15. Formal approval.
16. Loan documents issued.
17. Loan documents returned.
18. Settlement booked.
19. Settled.
20. Post-settlement review.
21. Withdrawn/declined/lost.

## Lead Intake

Trigger:

- New lead/person/opportunity created.

Actions:

- Assign broker owner.
- Create discovery call task.
- Send intake email if approved.
- Create initial opportunity.
- Set source, referral partner, and lead type.

Acceptance:

- Every new lead has an owner, next task, source, and opportunity stage.

## Fact Find and Needs Analysis

Trigger:

- Discovery completed or opportunity moved to fact-find stage.

Actions:

- Create fact-find checklist.
- Create applicant/household records.
- Request client portal/fact-find completion through the chat/dashboard experience.
- Track BID/compliance tasks.
- Flag missing applicant consent.

Acceptance:

- Application cannot move to credit review until fact-find status, consent status, and minimum applicant details are complete.

## BID and Compliance

Trigger:

- Fact find started, product recommendation started, or loan requirement changed.

Actions:

- Create Best Interests Duty evidence task.
- Create credit guide/privacy consent task.
- Require reason notes for recommended lender/product.
- Flag conflicts, referral source, fees, or unusual client objectives.

Acceptance:

- Application cannot be marked ready for lodgement until compliance tasks are complete or explicitly approved by an authorized role.

## Document Collection

Trigger:

- Application enters documents requested stage.

Actions:

- Generate required document metadata checklist.
- Display document requests in the client portal.
- Link to the approved document provider, BrokerEngine, ApplyOnline/AFG Flex, AFG portal, or other storage if used.
- Create follow-up tasks for overdue documents.
- Update received/verified status from external platform if available.

Acceptance:

- Twenty shows outstanding, received, verified, expired, and waived document items.
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

- Product research, serviceability, and packaging review are ready for broker assessment.

Actions:

- Create or update the Credit Proposal record in Twenty.
- Capture client objectives, shortlisted options, recommendation rationale, policy exceptions, risks, and mitigants.
- Link serviceability, product research, document, and compliance evidence.
- Assign internal review task if required.
- Mark any client-facing summary as approved before portal display.

Acceptance:

- Twenty contains the working credit proposal history and approval status before lodgement or client presentation.
- Client portal only receives approved summaries, not internal working notes or risk commentary.

## Credit Review

Trigger:

- Fact find complete and core documents received.

Actions:

- Assign credit analyst or processor.
- Review income, expenses, assets, liabilities, loan requirement, and property/security.
- Create missing-info tasks.
- Set packaging status.

Acceptance:

- Application has a clear readiness status: not ready, missing information, ready for scenario, ready for lodgement, or blocked.

## Serviceability

Trigger:

- Scenario/product selection begins or requested loan amount changes materially.

Actions:

- Create serviceability assessment record.
- Store provider/reference.
- Record pass/fail/refer summary where permitted.
- Create follow-up task for shortfall or manual review.

Acceptance:

- Every application marked ready for lodgement has a serviceability status or documented reason it is not required.

## Lender/Product Selection

Trigger:

- Application enters scenario/product selection.

Actions:

- Capture preferred lender/product.
- Capture recommendation rationale.
- Track policy exceptions.
- Flag LMI, valuation, title, or special document requirements.

Acceptance:

- Selected lender/product and recommendation rationale are visible before lodgement.

## Lodgement Preparation

Trigger:

- Application moves to ready for lodgement.

Actions:

- Check required field groups.
- Check documents and compliance tasks.
- Confirm external platform target: ApplyOnline preferred, AFG Flex alternate, AFG/BrokerEngine/manual fallback.
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
- Normalize external status to Twenty pipeline stage.
- Create tasks for lender requests, errors, or conditions.

Acceptance:

- Twenty displays both raw external status and normalized CRM stage.
- Unknown external statuses create an admin review task.

## Conditions Management

Trigger:

- Conditional approval or condition event imported.

Actions:

- Create condition records.
- Assign each condition to an owner.
- Link document/evidence reference.
- Escalate overdue conditions.

Acceptance:

- Conditional approvals show all outstanding, satisfied, waived, and blocked conditions.

## Valuation

Trigger:

- Valuation ordered externally or required by selected lender/product.

Actions:

- Create valuation record.
- Track ordered, booked, inspected, received, queried, and complete statuses.
- Link valuation to property/security.
- Flag shortfall.

Acceptance:

- Applications with property/security show valuation status and next action.

## LMI

Trigger:

- LVR/product rules indicate LMI may be required, or external LMI event imported.

Actions:

- Create LMI assessment record.
- Track quote, approval, decline, condition, and expiry.
- Store high-level premium summary where permitted.

Acceptance:

- LMI requirement and status are visible before formal approval.

## Loan Documents and Settlement

Trigger:

- Formal approval or document preparation event.

Actions:

- Create loan documents task.
- Track issued, signed, returned, certified, and accepted states.
- Create settlement record.
- Track settlement booking and funds-to-complete status.

Acceptance:

- Settlement view shows target date, confirmed date, document status, outstanding conditions, and responsible owner.

## Post-Settlement Review

Trigger:

- Settlement completed.

Actions:

- Create post-settlement review task.
- Schedule loan review.
- Update client lifecycle status.
- Trigger referral/review workflow if approved.

Acceptance:

- Every settled client has a review date and ownership assigned.

## Management Reporting

Dashboards should include:

- New leads by source.
- Deals by stage.
- Documents outstanding.
- Applications awaiting client.
- Applications awaiting lender.
- Conditional approvals with overdue conditions.
- Settlement pipeline.
- Settlements completed.
- At-risk deals.
- Broker/processor workload.
