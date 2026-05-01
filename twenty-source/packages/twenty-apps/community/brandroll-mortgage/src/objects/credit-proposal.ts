import { FieldType, defineObject } from 'twenty-sdk/define';

export const CREDIT_PROPOSAL_OBJECT_ID =
  '6b6d0000-1400-4000-8000-000000000001';
export const CREDIT_PROPOSAL_NAME_FIELD_ID =
  '6b6d0000-1400-4000-8000-000000000002';
export const CREDIT_PROPOSAL_STATUS_FIELD_ID =
  '6b6d0000-1400-4000-8000-000000000003';

export default defineObject({
  universalIdentifier: CREDIT_PROPOSAL_OBJECT_ID,
  nameSingular: 'creditProposal',
  namePlural: 'creditProposals',
  labelSingular: 'Credit proposal',
  labelPlural: 'Credit proposals',
  description:
    'Credit proposal workspace for recommendation, policy, risk, and approval notes.',
  icon: 'IconClipboardCheck',
  labelIdentifierFieldMetadataUniversalIdentifier: CREDIT_PROPOSAL_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: CREDIT_PROPOSAL_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'proposalName',
      label: 'Proposal name',
      icon: 'IconAbc',
    },
    {
      universalIdentifier: CREDIT_PROPOSAL_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'proposalStatus',
      label: 'Proposal status',
      icon: 'IconProgressCheck',
      options: [
        { value: 'DRAFT', label: 'Draft', position: 0, color: 'gray' },
        { value: 'IN_REVIEW', label: 'In review', position: 1, color: 'orange' },
        { value: 'APPROVED', label: 'Approved', position: 2, color: 'green' },
        { value: 'REVISION_REQUIRED', label: 'Revision required', position: 3, color: 'red' },
        { value: 'ARCHIVED', label: 'Archived', position: 4, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1400-4000-8000-000000000004',
      type: FieldType.TEXT,
      name: 'recommendedLender',
      label: 'Recommended lender',
      icon: 'IconBuildingBank',
    },
    {
      universalIdentifier: '6b6d0000-1400-4000-8000-000000000005',
      type: FieldType.TEXT,
      name: 'recommendationRationale',
      label: 'Recommendation rationale',
      icon: 'IconNotes',
    },
    {
      universalIdentifier: '6b6d0000-1400-4000-8000-000000000006',
      type: FieldType.TEXT,
      name: 'policyExceptions',
      label: 'Policy exceptions',
      icon: 'IconAlertTriangle',
    },
  ],
});
