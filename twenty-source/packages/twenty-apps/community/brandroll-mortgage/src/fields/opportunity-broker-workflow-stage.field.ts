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
    { value: 'DOCS_REQUESTED', label: '6. Docs Requested', position: 5, color: 'blue' },
    { value: 'SERVICEABILITY', label: '7. Serviceability', position: 6, color: 'orange' },
    { value: 'PRODUCT_RESEARCH', label: '8. Product Research', position: 7, color: 'orange' },
    { value: 'PREPARE_CREDIT_PROPOSAL', label: '9. Prepare Credit Proposal', position: 8, color: 'purple' },
    { value: 'CREDIT_PROPOSAL_PRESENTED', label: '10. Credit Proposal Presented', position: 9, color: 'purple' },
    { value: 'CLIENT_ACCEPTED_HANDOVER', label: '11. Client Accepted > Handover', position: 10, color: 'green' },
    { value: 'LODGEMENT_PREP', label: '12. Lodgement Prep', position: 11, color: 'yellow' },
    { value: 'SUBMITTED', label: '13. Submitted', position: 12, color: 'blue' },
    { value: 'CONDITIONAL_APPROVAL', label: '14. Conditional Approval', position: 13, color: 'green' },
    { value: 'FORMAL_APPROVAL', label: '15. Formal Approval', position: 14, color: 'green' },
    { value: 'SETTLEMENT', label: '16. Settlement', position: 15, color: 'green' },
    { value: 'SETTLED', label: '17. Settled', position: 16, color: 'green' },
    { value: 'REVIEW', label: '18. Review', position: 17, color: 'gray' },
    { value: 'LOST', label: 'Lost', position: 18, color: 'red' },
  ],
});
