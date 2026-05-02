import { FieldType, defineObject } from 'twenty-sdk/define';

export const LENDER_CALCULATOR_OBJECT_ID =
  '6b6d0000-2c10-4000-8000-000000000001';
export const LENDER_CALCULATOR_NAME_FIELD_ID =
  '6b6d0000-2c10-4000-8000-000000000002';
export const LENDER_CALCULATOR_TYPE_FIELD_ID =
  '6b6d0000-2c10-4000-8000-000000000003';
export const LENDER_CALCULATOR_STATUS_FIELD_ID =
  '6b6d0000-2c10-4000-8000-000000000004';
export const LENDER_CALCULATOR_REVIEW_DUE_FIELD_ID =
  '6b6d0000-2c10-4000-8000-000000000010';

export default defineObject({
  universalIdentifier: LENDER_CALCULATOR_OBJECT_ID,
  nameSingular: 'lenderCalculator',
  namePlural: 'lenderCalculators',
  labelSingular: 'Lender calculator',
  labelPlural: 'Lender calculators',
  description:
    'Broker Settings calculator reference for lender servicing, borrowing power, LMI, repayment, and policy calculators.',
  icon: 'IconCalculator',
  labelIdentifierFieldMetadataUniversalIdentifier:
    LENDER_CALCULATOR_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: LENDER_CALCULATOR_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'calculatorName',
      label: 'Calculator name',
      icon: 'IconCalculator',
    },
    {
      universalIdentifier: LENDER_CALCULATOR_TYPE_FIELD_ID,
      type: FieldType.SELECT,
      name: 'calculatorType',
      label: 'Calculator type',
      icon: 'IconCalculator',
      options: [
        { value: 'SERVICEABILITY', label: 'Serviceability', position: 0, color: 'green' },
        { value: 'BORROWING_POWER', label: 'Borrowing power', position: 1, color: 'blue' },
        { value: 'REPAYMENT', label: 'Repayment', position: 2, color: 'purple' },
        { value: 'LMI', label: 'LMI', position: 3, color: 'orange' },
        { value: 'FEES', label: 'Fees and costs', position: 4, color: 'yellow' },
        { value: 'POLICY', label: 'Policy', position: 5, color: 'red' },
        { value: 'OTHER', label: 'Other', position: 6, color: 'gray' },
      ],
    },
    {
      universalIdentifier: LENDER_CALCULATOR_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'calculatorStatus',
      label: 'Status',
      icon: 'IconProgress',
      options: [
        { value: 'ACTIVE', label: 'Active', position: 0, color: 'green' },
        { value: 'TESTING', label: 'Testing', position: 1, color: 'blue' },
        { value: 'NEEDS_REVIEW', label: 'Needs review', position: 2, color: 'orange' },
        { value: 'RETIRED', label: 'Retired', position: 3, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-2c10-4000-8000-000000000005',
      type: FieldType.SELECT,
      name: 'sourceType',
      label: 'Source type',
      icon: 'IconSourceCode',
      options: [
        { value: 'WEB_PORTAL', label: 'Web portal', position: 0, color: 'blue' },
        { value: 'EXCEL_WORKBOOK', label: 'Excel workbook', position: 1, color: 'green' },
        { value: 'API', label: 'API', position: 2, color: 'purple' },
        { value: 'PDF', label: 'PDF', position: 3, color: 'orange' },
        { value: 'MANUAL', label: 'Manual', position: 4, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-2c10-4000-8000-000000000006',
      type: FieldType.LINKS,
      name: 'calculatorLink',
      label: 'Calculator link',
      icon: 'IconExternalLink',
    },
    {
      universalIdentifier: '6b6d0000-2c10-4000-8000-000000000007',
      type: FieldType.TEXT,
      name: 'workbookReference',
      label: 'Workbook reference',
      icon: 'IconFileSpreadsheet',
    },
    {
      universalIdentifier: '6b6d0000-2c10-4000-8000-000000000008',
      type: FieldType.TEXT,
      name: 'calculatorVersion',
      label: 'Calculator version',
      icon: 'IconVersions',
    },
    {
      universalIdentifier: '6b6d0000-2c10-4000-8000-000000000009',
      type: FieldType.DATE,
      name: 'effectiveFrom',
      label: 'Effective from',
      icon: 'IconCalendar',
    },
    {
      universalIdentifier: LENDER_CALCULATOR_REVIEW_DUE_FIELD_ID,
      type: FieldType.DATE,
      name: 'reviewDueOn',
      label: 'Review due on',
      icon: 'IconCalendarDue',
    },
    {
      universalIdentifier: '6b6d0000-2c10-4000-8000-000000000011',
      type: FieldType.TEXT,
      name: 'inputMappingProfile',
      label: 'Input mapping profile',
      icon: 'IconRoute',
    },
    {
      universalIdentifier: '6b6d0000-2c10-4000-8000-000000000012',
      type: FieldType.TEXT,
      name: 'outputMappingProfile',
      label: 'Output mapping profile',
      icon: 'IconRoute',
    },
    {
      universalIdentifier: '6b6d0000-2c10-4000-8000-000000000013',
      type: FieldType.TEXT,
      name: 'calculatorNotes',
      label: 'Calculator notes',
      icon: 'IconNotes',
    },
  ],
});
