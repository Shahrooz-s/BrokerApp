import { FieldType, defineObject } from 'twenty-sdk/define';

export const LOAN_REQUIREMENT_OBJECT_ID =
  '6b6d0000-1200-4000-8000-000000000001';
export const LOAN_REQUIREMENT_NAME_FIELD_ID =
  '6b6d0000-1200-4000-8000-000000000002';

export default defineObject({
  universalIdentifier: LOAN_REQUIREMENT_OBJECT_ID,
  nameSingular: 'loanRequirement',
  namePlural: 'loanRequirements',
  labelSingular: 'Loan requirement',
  labelPlural: 'Loan requirements',
  description:
    'Loan purpose, requested amount, repayment, and product preference summary.',
  icon: 'IconFileDollar',
  labelIdentifierFieldMetadataUniversalIdentifier: LOAN_REQUIREMENT_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: LOAN_REQUIREMENT_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'loanName',
      label: 'Loan name',
      icon: 'IconAbc',
    },
    {
      universalIdentifier: '6b6d0000-1200-4000-8000-000000000003',
      type: FieldType.SELECT,
      name: 'loanPurpose',
      label: 'Loan purpose',
      icon: 'IconTarget',
      options: [
        { value: 'PURCHASE_OWNER_OCCUPIED', label: 'Purchase owner occupied', position: 0, color: 'blue' },
        { value: 'PURCHASE_INVESTMENT', label: 'Purchase investment', position: 1, color: 'purple' },
        { value: 'REFINANCE', label: 'Refinance', position: 2, color: 'green' },
        { value: 'CONSTRUCTION', label: 'Construction', position: 3, color: 'orange' },
        { value: 'EQUITY_RELEASE', label: 'Equity release', position: 4, color: 'yellow' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1200-4000-8000-000000000004',
      type: FieldType.NUMBER,
      name: 'loanAmount',
      label: 'Loan amount',
      icon: 'IconCurrencyDollar',
    },
    {
      universalIdentifier: '6b6d0000-1200-4000-8000-000000000005',
      type: FieldType.SELECT,
      name: 'repaymentType',
      label: 'Repayment type',
      icon: 'IconRepeat',
      options: [
        { value: 'PRINCIPAL_AND_INTEREST', label: 'Principal and interest', position: 0, color: 'green' },
        { value: 'INTEREST_ONLY', label: 'Interest only', position: 1, color: 'orange' },
        { value: 'LINE_OF_CREDIT', label: 'Line of credit', position: 2, color: 'purple' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1200-4000-8000-000000000006',
      type: FieldType.NUMBER,
      name: 'requestedTermYears',
      label: 'Requested term years',
      icon: 'IconCalendarStats',
    },
  ],
});
