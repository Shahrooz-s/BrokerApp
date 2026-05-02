import { FieldType, defineObject } from 'twenty-sdk/define';

export const LENDER_POLICY_REFERENCE_OBJECT_ID =
  '6b6d0000-2c20-4000-8000-000000000001';
export const LENDER_POLICY_REFERENCE_NAME_FIELD_ID =
  '6b6d0000-2c20-4000-8000-000000000002';
export const LENDER_POLICY_REFERENCE_CATEGORY_FIELD_ID =
  '6b6d0000-2c20-4000-8000-000000000003';
export const LENDER_POLICY_REFERENCE_STATUS_FIELD_ID =
  '6b6d0000-2c20-4000-8000-000000000004';
export const LENDER_POLICY_REFERENCE_REVIEW_DUE_FIELD_ID =
  '6b6d0000-2c20-4000-8000-000000000009';

export default defineObject({
  universalIdentifier: LENDER_POLICY_REFERENCE_OBJECT_ID,
  nameSingular: 'lenderPolicyReference',
  namePlural: 'lenderPolicyReferences',
  labelSingular: 'Lender policy reference',
  labelPlural: 'Lender policy references',
  description:
    'Broker Settings policy reference for lender guidebook, employment, income, LVR, security, document, and exception rules.',
  icon: 'IconScale',
  labelIdentifierFieldMetadataUniversalIdentifier:
    LENDER_POLICY_REFERENCE_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: LENDER_POLICY_REFERENCE_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'policyName',
      label: 'Policy name',
      icon: 'IconScale',
    },
    {
      universalIdentifier: LENDER_POLICY_REFERENCE_CATEGORY_FIELD_ID,
      type: FieldType.SELECT,
      name: 'policyCategory',
      label: 'Policy category',
      icon: 'IconCategory',
      options: [
        { value: 'EMPLOYMENT', label: 'Employment', position: 0, color: 'blue' },
        { value: 'INCOME', label: 'Income', position: 1, color: 'green' },
        { value: 'EXPENSES', label: 'Expenses', position: 2, color: 'yellow' },
        { value: 'LIABILITIES', label: 'Liabilities', position: 3, color: 'orange' },
        { value: 'LVR', label: 'LVR', position: 4, color: 'purple' },
        { value: 'SECURITY', label: 'Security/property', position: 5, color: 'blue' },
        { value: 'CONSTRUCTION', label: 'Construction', position: 6, color: 'green' },
        { value: 'REFINANCE', label: 'Refinance', position: 7, color: 'orange' },
        { value: 'LMI', label: 'LMI', position: 8, color: 'red' },
        { value: 'DOCUMENTS', label: 'Documents', position: 9, color: 'gray' },
        { value: 'EXCEPTION', label: 'Exception policy', position: 10, color: 'red' },
        { value: 'OTHER', label: 'Other', position: 11, color: 'gray' },
      ],
    },
    {
      universalIdentifier: LENDER_POLICY_REFERENCE_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'policyStatus',
      label: 'Status',
      icon: 'IconProgress',
      options: [
        { value: 'CURRENT', label: 'Current', position: 0, color: 'green' },
        { value: 'UNDER_REVIEW', label: 'Under review', position: 1, color: 'orange' },
        { value: 'SUPERSEDED', label: 'Superseded', position: 2, color: 'gray' },
        { value: 'RETIRED', label: 'Retired', position: 3, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-2c20-4000-8000-000000000005',
      type: FieldType.LINKS,
      name: 'policyLink',
      label: 'Policy link',
      icon: 'IconExternalLink',
    },
    {
      universalIdentifier: '6b6d0000-2c20-4000-8000-000000000006',
      type: FieldType.TEXT,
      name: 'sourceReference',
      label: 'Source reference',
      icon: 'IconHash',
    },
    {
      universalIdentifier: '6b6d0000-2c20-4000-8000-000000000007',
      type: FieldType.TEXT,
      name: 'policyVersion',
      label: 'Policy version',
      icon: 'IconVersions',
    },
    {
      universalIdentifier: '6b6d0000-2c20-4000-8000-000000000008',
      type: FieldType.DATE,
      name: 'effectiveFrom',
      label: 'Effective from',
      icon: 'IconCalendar',
    },
    {
      universalIdentifier: LENDER_POLICY_REFERENCE_REVIEW_DUE_FIELD_ID,
      type: FieldType.DATE,
      name: 'reviewDueOn',
      label: 'Review due on',
      icon: 'IconCalendarDue',
    },
    {
      universalIdentifier: '6b6d0000-2c20-4000-8000-000000000010',
      type: FieldType.TEXT,
      name: 'policySummary',
      label: 'Policy summary',
      icon: 'IconNotes',
    },
    {
      universalIdentifier: '6b6d0000-2c20-4000-8000-000000000011',
      type: FieldType.TEXT,
      name: 'lixiMappingNotes',
      label: 'LIXI mapping notes',
      icon: 'IconRoute',
    },
    {
      universalIdentifier: '6b6d0000-2c20-4000-8000-000000000012',
      type: FieldType.TEXT,
      name: 'afgMappingNotes',
      label: 'AFG/BrokerEngine mapping notes',
      icon: 'IconRoute',
    },
  ],
});
