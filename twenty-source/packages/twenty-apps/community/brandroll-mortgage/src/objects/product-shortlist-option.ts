import { FieldType, defineObject } from 'twenty-sdk/define';

export const PRODUCT_SHORTLIST_OPTION_OBJECT_ID =
  '6b6d0000-2a00-4000-8000-000000000001';
export const PRODUCT_SHORTLIST_OPTION_NAME_FIELD_ID =
  '6b6d0000-2a00-4000-8000-000000000002';

export default defineObject({
  universalIdentifier: PRODUCT_SHORTLIST_OPTION_OBJECT_ID,
  nameSingular: 'productShortlistOption',
  namePlural: 'productShortlistOptions',
  labelSingular: 'Product shortlist option',
  labelPlural: 'Product shortlist options',
  description:
    'Product comparison candidate with suitability scoring, lender policy checks, reasons considered, and credit proposal rationale.',
  icon: 'IconListSearch',
  labelIdentifierFieldMetadataUniversalIdentifier:
    PRODUCT_SHORTLIST_OPTION_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: PRODUCT_SHORTLIST_OPTION_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'optionName',
      label: 'Option name',
      icon: 'IconListSearch',
    },
    {
      universalIdentifier: '6b6d0000-2a00-4000-8000-000000000003',
      type: FieldType.SELECT,
      name: 'fitStatus',
      label: 'Fit status',
      icon: 'IconCircleCheck',
      options: [
        { value: 'NOT_REVIEWED', label: 'Not reviewed', position: 0, color: 'gray' },
        { value: 'POTENTIAL_FIT', label: 'Potential fit', position: 1, color: 'blue' },
        { value: 'SHORTLISTED', label: 'Shortlisted', position: 2, color: 'purple' },
        { value: 'RECOMMENDED', label: 'Recommended', position: 3, color: 'green' },
        { value: 'REJECTED', label: 'Rejected', position: 4, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-2a00-4000-8000-000000000004',
      type: FieldType.NUMBER,
      name: 'fitScore',
      label: 'Fit score',
      icon: 'IconGauge',
    },
    {
      universalIdentifier: '6b6d0000-2a00-4000-8000-000000000005',
      type: FieldType.TEXT,
      name: 'policyMatchSummary',
      label: 'Policy match summary',
      icon: 'IconShieldCheck',
    },
    {
      universalIdentifier: '6b6d0000-2a00-4000-8000-000000000006',
      type: FieldType.TEXT,
      name: 'serviceabilitySummary',
      label: 'Serviceability summary',
      icon: 'IconCalculator',
    },
    {
      universalIdentifier: '6b6d0000-2a00-4000-8000-000000000007',
      type: FieldType.TEXT,
      name: 'reasonConsidered',
      label: 'Reason considered',
      icon: 'IconNotes',
    },
    {
      universalIdentifier: '6b6d0000-2a00-4000-8000-000000000008',
      type: FieldType.TEXT,
      name: 'reasonSelectedOrRejected',
      label: 'Reason selected/rejected',
      icon: 'IconClipboardText',
    },
    {
      universalIdentifier: '6b6d0000-2a00-4000-8000-000000000009',
      type: FieldType.BOOLEAN,
      name: 'recommended',
      label: 'Recommended',
      icon: 'IconAward',
    },
  ],
});
