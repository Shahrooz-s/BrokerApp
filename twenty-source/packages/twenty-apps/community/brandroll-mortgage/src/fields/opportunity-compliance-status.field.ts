import {
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

export const OPPORTUNITY_COMPLIANCE_STATUS_FIELD_ID =
  '6b6d0000-5000-4000-8000-000000000003';

export default defineField({
  universalIdentifier: OPPORTUNITY_COMPLIANCE_STATUS_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.SELECT,
  name: 'complianceStatus',
  label: 'Compliance status',
  icon: 'IconShieldCheck',
  options: [
    { value: 'NOT_STARTED', label: 'Not started', position: 0, color: 'gray' },
    { value: 'CREDIT_GUIDE_SENT', label: 'Credit guide sent', position: 1, color: 'blue' },
    { value: 'PRIVACY_SENT', label: 'Privacy sent', position: 2, color: 'blue' },
    { value: 'PARTIAL_ACKNOWLEDGEMENT', label: 'Partial acknowledgement', position: 3, color: 'orange' },
    { value: 'READY_FOR_FACT_FIND', label: 'Ready for fact find', position: 4, color: 'green' },
    { value: 'BLOCKED', label: 'Blocked', position: 5, color: 'red' },
  ],
});
