import { FieldType, defineObject } from 'twenty-sdk/define';

export const LMI_ASSESSMENT_OBJECT_ID =
  '6b6d0000-1900-4000-8000-000000000001';
export const LMI_ASSESSMENT_NAME_FIELD_ID =
  '6b6d0000-1900-4000-8000-000000000002';

export default defineObject({
  universalIdentifier: LMI_ASSESSMENT_OBJECT_ID,
  nameSingular: 'lmiAssessment',
  namePlural: 'lmiAssessments',
  labelSingular: 'LMI assessment',
  labelPlural: 'LMI assessments',
  description: 'Lenders mortgage insurance quote and approval summary.',
  icon: 'IconShieldDollar',
  labelIdentifierFieldMetadataUniversalIdentifier: LMI_ASSESSMENT_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: LMI_ASSESSMENT_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'lmiName',
      label: 'LMI name',
      icon: 'IconAbc',
    },
    {
      universalIdentifier: '6b6d0000-1900-4000-8000-000000000003',
      type: FieldType.SELECT,
      name: 'lmiStatus',
      label: 'LMI status',
      icon: 'IconShieldCheck',
      options: [
        { value: 'NOT_REQUIRED', label: 'Not required', position: 0, color: 'gray' },
        { value: 'QUOTE_REQUIRED', label: 'Quote required', position: 1, color: 'orange' },
        { value: 'QUOTED', label: 'Quoted', position: 2, color: 'blue' },
        { value: 'APPROVED', label: 'Approved', position: 3, color: 'green' },
        { value: 'DECLINED', label: 'Declined', position: 4, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1900-4000-8000-000000000004',
      type: FieldType.NUMBER,
      name: 'premiumAmount',
      label: 'Premium amount',
      icon: 'IconCurrencyDollar',
    },
  ],
});
