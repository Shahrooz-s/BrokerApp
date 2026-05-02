import {
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

export const OPPORTUNITY_CREDIT_PROPOSAL_STATUS_FIELD_ID =
  '6b6d0000-5000-4000-8000-000000000007';

export default defineField({
  universalIdentifier: OPPORTUNITY_CREDIT_PROPOSAL_STATUS_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.SELECT,
  name: 'creditProposalStatus',
  label: 'Credit proposal status',
  icon: 'IconClipboardCheck',
  options: [
    { value: 'NOT_STARTED', label: 'Not started', position: 0, color: 'gray' },
    { value: 'DRAFT', label: 'Draft', position: 1, color: 'blue' },
    { value: 'IN_REVIEW', label: 'In review', position: 2, color: 'orange' },
    { value: 'APPROVED', label: 'Approved', position: 3, color: 'green' },
    { value: 'PRESENTED_TO_CLIENT', label: 'Presented to client', position: 4, color: 'purple' },
    { value: 'ACCEPTED', label: 'Accepted', position: 5, color: 'green' },
  ],
});
