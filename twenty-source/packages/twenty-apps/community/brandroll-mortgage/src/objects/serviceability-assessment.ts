import { FieldType, defineObject } from 'twenty-sdk/define';

export const SERVICEABILITY_ASSESSMENT_OBJECT_ID =
  '6b6d0000-1500-4000-8000-000000000001';
export const SERVICEABILITY_ASSESSMENT_NAME_FIELD_ID =
  '6b6d0000-1500-4000-8000-000000000002';
export const SERVICEABILITY_ASSESSMENT_STATUS_FIELD_ID =
  '6b6d0000-1500-4000-8000-000000000003';

export default defineObject({
  universalIdentifier: SERVICEABILITY_ASSESSMENT_OBJECT_ID,
  nameSingular: 'serviceabilityAssessment',
  namePlural: 'serviceabilityAssessments',
  labelSingular: 'Serviceability assessment',
  labelPlural: 'Serviceability assessments',
  description:
    'Serviceability calculator/provider result summary aligned to LIXI SVC concepts.',
  icon: 'IconCalculator',
  labelIdentifierFieldMetadataUniversalIdentifier:
    SERVICEABILITY_ASSESSMENT_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: SERVICEABILITY_ASSESSMENT_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'assessmentName',
      label: 'Assessment name',
      icon: 'IconAbc',
    },
    {
      universalIdentifier: SERVICEABILITY_ASSESSMENT_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'assessmentStatus',
      label: 'Assessment status',
      icon: 'IconActivity',
      options: [
        { value: 'NOT_STARTED', label: 'Not started', position: 0, color: 'gray' },
        { value: 'REQUESTED', label: 'Requested', position: 1, color: 'blue' },
        { value: 'PASS', label: 'Pass', position: 2, color: 'green' },
        { value: 'REFER', label: 'Refer', position: 3, color: 'orange' },
        { value: 'FAIL', label: 'Fail', position: 4, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1500-4000-8000-000000000004',
      type: FieldType.TEXT,
      name: 'provider',
      label: 'Provider',
      icon: 'IconPlug',
    },
    {
      universalIdentifier: '6b6d0000-1500-4000-8000-000000000005',
      type: FieldType.TEXT,
      name: 'externalReference',
      label: 'External reference',
      icon: 'IconExternalLink',
    },
    {
      universalIdentifier: '6b6d0000-1500-4000-8000-000000000006',
      type: FieldType.TEXT,
      name: 'lenderName',
      label: 'Lender name',
      icon: 'IconBuildingBank',
    },
    {
      universalIdentifier: '6b6d0000-1500-4000-8000-000000000007',
      type: FieldType.SELECT,
      name: 'assessmentType',
      label: 'Assessment type',
      icon: 'IconCalculator',
      options: [
        { value: 'GENERIC_PRE_CHECK', label: 'Generic pre-check', position: 0, color: 'gray' },
        { value: 'LENDER_CALCULATOR', label: 'Lender calculator', position: 1, color: 'blue' },
        { value: 'AGGREGATOR_CALCULATOR', label: 'Aggregator calculator', position: 2, color: 'purple' },
        { value: 'MANUAL_POLICY_REVIEW', label: 'Manual policy review', position: 3, color: 'orange' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1500-4000-8000-000000000008',
      type: FieldType.NUMBER,
      name: 'netSurplusRatio',
      label: 'NSR',
      icon: 'IconGauge',
    },
    {
      universalIdentifier: '6b6d0000-1500-4000-8000-000000000009',
      type: FieldType.NUMBER,
      name: 'netAvailableIncomeMonthly',
      label: 'Net available income monthly',
      icon: 'IconCurrencyDollar',
    },
    {
      universalIdentifier: '6b6d0000-1500-4000-8000-000000000010',
      type: FieldType.NUMBER,
      name: 'totalIncomeAnnual',
      label: 'Total income annual',
      icon: 'IconCurrencyDollar',
    },
    {
      universalIdentifier: '6b6d0000-1500-4000-8000-000000000011',
      type: FieldType.NUMBER,
      name: 'hemExpenseMonthly',
      label: 'HEM expense monthly',
      icon: 'IconReceipt2',
    },
    {
      universalIdentifier: '6b6d0000-1500-4000-8000-000000000012',
      type: FieldType.NUMBER,
      name: 'declaredExpenseMonthly',
      label: 'Declared expense monthly',
      icon: 'IconReceipt',
    },
    {
      universalIdentifier: '6b6d0000-1500-4000-8000-000000000013',
      type: FieldType.NUMBER,
      name: 'assessmentRate',
      label: 'Assessment rate',
      icon: 'IconPercentage',
    },
    {
      universalIdentifier: '6b6d0000-1500-4000-8000-000000000014',
      type: FieldType.NUMBER,
      name: 'maxBorrowingEstimate',
      label: 'Max borrowing estimate',
      icon: 'IconCurrencyDollar',
    },
    {
      universalIdentifier: '6b6d0000-1500-4000-8000-000000000015',
      type: FieldType.TEXT,
      name: 'calculatorWorkbookReference',
      label: 'Calculator workbook reference',
      icon: 'IconTable',
    },
    {
      universalIdentifier: '6b6d0000-1500-4000-8000-000000000016',
      type: FieldType.TEXT,
      name: 'policyNotes',
      label: 'Policy notes',
      icon: 'IconNotes',
    },
  ],
});
