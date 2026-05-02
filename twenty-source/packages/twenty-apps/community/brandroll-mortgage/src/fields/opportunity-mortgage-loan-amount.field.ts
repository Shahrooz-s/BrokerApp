import {
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

export const OPPORTUNITY_MORTGAGE_LOAN_AMOUNT_FIELD_ID =
  '6b6d0000-5000-4000-8000-000000000010';

export default defineField({
  universalIdentifier: OPPORTUNITY_MORTGAGE_LOAN_AMOUNT_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.NUMBER,
  name: 'mortgageLoanAmount',
  label: 'Loan amount',
  icon: 'IconCurrencyDollar',
});
