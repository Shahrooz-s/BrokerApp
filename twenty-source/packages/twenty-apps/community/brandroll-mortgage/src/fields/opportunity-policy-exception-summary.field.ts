import {
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

export const OPPORTUNITY_POLICY_EXCEPTION_SUMMARY_FIELD_ID =
  '6b6d0000-5000-4000-8000-000000000013';

export default defineField({
  universalIdentifier: OPPORTUNITY_POLICY_EXCEPTION_SUMMARY_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.TEXT,
  name: 'policyExceptionSummary',
  label: 'Policy exception summary',
  icon: 'IconShieldCheck',
});
