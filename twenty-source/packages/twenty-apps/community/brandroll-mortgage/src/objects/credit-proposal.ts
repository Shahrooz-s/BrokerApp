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
    {
      universalIdentifier: '6b6d0000-1400-4000-8000-000000000007',
      type: FieldType.TEXT,
      name: 'selectedProductName',
      label: 'Selected product',
      icon: 'IconBuildingBank',
    },
    {
      universalIdentifier: '6b6d0000-1400-4000-8000-000000000008',
      type: FieldType.NUMBER,
      name: 'recommendedLoanAmount',
      label: 'Recommended loan amount',
      icon: 'IconCurrencyDollar',
    },
    {
      universalIdentifier: '6b6d0000-1400-4000-8000-000000000009',
      type: FieldType.TEXT,
      name: 'comparisonSummary',
      label: 'Comparison summary',
      description: 'Lenders/products compared and the basis of comparison.',
      icon: 'IconScale',
    },
    {
      universalIdentifier: '6b6d0000-1400-4000-8000-000000000010',
      type: FieldType.TEXT,
      name: 'lendersCompared',
      label: 'Lenders compared',
      icon: 'IconBuildingBank',
    },
    {
      universalIdentifier: '6b6d0000-1400-4000-8000-000000000011',
      type: FieldType.TEXT,
      name: 'productsRejectedSummary',
      label: 'Products rejected summary',
      icon: 'IconListDetails',
    },
    {
      universalIdentifier: '6b6d0000-1400-4000-8000-000000000012',
      type: FieldType.TEXT,
      name: 'reasonChosen',
      label: 'Reason chosen',
      icon: 'IconCircleCheck',
    },
    {
      universalIdentifier: '6b6d0000-1400-4000-8000-000000000013',
      type: FieldType.TEXT,
      name: 'customerObjectivesMet',
      label: 'Customer objectives met',
      icon: 'IconTargetArrow',
    },
    {
      universalIdentifier: '6b6d0000-1400-4000-8000-000000000014',
      type: FieldType.TEXT,
      name: 'bestInterestsDutySummary',
      label: 'Best interests duty summary',
      icon: 'IconShieldCheck',
    },
    {
      universalIdentifier: '6b6d0000-1400-4000-8000-000000000015',
      type: FieldType.TEXT,
      name: 'conflictPrioritySummary',
      label: 'Conflict priority summary',
      icon: 'IconAlertTriangle',
    },
    {
      universalIdentifier: '6b6d0000-1400-4000-8000-000000000016',
      type: FieldType.TEXT,
      name: 'employmentPolicyCheck',
      label: 'Employment policy check',
      icon: 'IconBriefcase',
    },
    {
      universalIdentifier: '6b6d0000-1400-4000-8000-000000000017',
      type: FieldType.TEXT,
      name: 'serviceabilitySummary',
      label: 'Serviceability summary',
      icon: 'IconCalculator',
    },
  ],
});
