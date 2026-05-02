import {
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

export const OPPORTUNITY_BROKER_WORKFLOW_STAGE_FIELD_ID =
  '6b6d0000-5000-4000-8000-000000000001';

export default defineField({
  universalIdentifier: OPPORTUNITY_BROKER_WORKFLOW_STAGE_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.SELECT,
  name: 'brokerWorkflowStage',
  label: 'Broker workflow stage',
  description: 'Deal board stage for the mortgage workflow.',
  icon: 'IconProgress',
  options: [
    { value: 'NEW_LEAD', label: '1. New Lead', position: 0, color: 'gray' },
    { value: 'ATTEMPTED_CONTACT_1', label: '2. Attempted Contact 1', position: 1, color: 'gray' },
    { value: 'ATTEMPTED_CONTACT_2', label: '3. Attempted Contact 2', position: 2, color: 'gray' },
    { value: 'ATTEMPTED_CONTACT_3', label: '4. Attempted Contact 3', position: 3, color: 'gray' },
    { value: 'INITIAL_CALL_GET_DOCS', label: '5. Initial Call Held > Get Docs', position: 4, color: 'blue' },
    { value: 'LEAD_DOCS_REQUESTED', label: '6. Docs Requested', position: 5, color: 'blue' },
    { value: 'RESEARCH_SERVICING', label: '7. Research > Servicing', position: 6, color: 'orange' },
    { value: 'PREPARE_LOAN_PROPOSAL', label: '8. Prepare Loan Proposal', position: 7, color: 'purple' },
    { value: 'LOAN_PROPOSAL_PRESENTED', label: '9. Loan Proposal Presented', position: 8, color: 'purple' },
    { value: 'CLIENT_ACCEPTED_HANDOVER', label: '10. Client Accepted > Handover', position: 9, color: 'green' },
    { value: 'ON_HOLD', label: '11. On Hold', position: 10, color: 'gray' },
    { value: 'LOST_OPPORTUNITY', label: '12. Lost Opps', position: 11, color: 'red' },
    { value: 'OUTSTANDING_SUPPORTING_DOCUMENTS', label: 'Outstanding Supporting Documents', position: 20, color: 'blue' },
    { value: 'PREPARE_FOR_SUBMISSION', label: 'Prepare for Submission', position: 21, color: 'blue' },
    { value: 'APP_DOCS_WITH_CLIENT', label: 'App Docs With Client', position: 22, color: 'blue' },
    { value: 'SIGNED_APP_DOCS_RETURNED', label: 'Signed App Docs Returned', position: 23, color: 'green' },
    { value: 'APPLICATION_LODGED', label: 'Application Lodged', position: 24, color: 'purple' },
    { value: 'AIP_ISSUED', label: 'AIP Issued', position: 25, color: 'green' },
    { value: 'AIP_FULL_CONVERSION', label: 'AIP > Full Conversion', position: 26, color: 'orange' },
    { value: 'CONDITIONAL_MIRS', label: 'Conditional/MIRs', position: 27, color: 'orange' },
    { value: 'CONDITIONS_MIRS_WITH_CLIENT', label: 'Conditions/MIRs With Client', position: 28, color: 'orange' },
    { value: 'CONDITIONS_MIRS_WITH_LENDER', label: 'Conditions/MIRs With Lender', position: 29, color: 'orange' },
    { value: 'FORMAL_APPROVAL', label: 'Formal Approval', position: 30, color: 'green' },
    { value: 'MORTGAGE_DOCS_ISSUED', label: 'Mortgage Docs Issued', position: 31, color: 'blue' },
    { value: 'MORTGAGE_DOCS_RETURNED', label: 'Mortgage Docs Returned', position: 32, color: 'green' },
    { value: 'READY_TO_SETTLE', label: 'Ready To Settle', position: 33, color: 'green' },
    { value: 'SETTLEMENT_BOOKED', label: 'Settlement Booked', position: 34, color: 'green' },
    { value: 'SETTLEMENT', label: 'Settlement', position: 35, color: 'green' },
    { value: 'SETTLED_REVIEW', label: 'Settled / Review', position: 36, color: 'gray' },
    { value: 'LOST_DECLINED', label: 'Lost / Declined', position: 37, color: 'red' },
  ],
});
