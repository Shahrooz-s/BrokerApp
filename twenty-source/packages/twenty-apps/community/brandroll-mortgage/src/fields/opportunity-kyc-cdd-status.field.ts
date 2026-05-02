import {
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

export const OPPORTUNITY_KYC_CDD_STATUS_FIELD_ID =
  '6b6d0000-5000-4000-8000-000000000021';

export default defineField({
  universalIdentifier: OPPORTUNITY_KYC_CDD_STATUS_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.SELECT,
  name: 'kycCddStatus',
  label: 'KYC/CDD status',
  icon: 'IconShieldCheck',
  options: [
    { value: 'NOT_STARTED', label: 'Not started', position: 0, color: 'gray' },
    { value: 'CONSENT_REQUIRED', label: 'Consent required', position: 1, color: 'orange' },
    { value: 'IN_PROGRESS', label: 'In progress', position: 2, color: 'blue' },
    { value: 'MANUAL_REVIEW', label: 'Manual review', position: 3, color: 'purple' },
    { value: 'ECDD_REQUIRED', label: 'ECDD required', position: 4, color: 'red' },
    { value: 'COMPLETE', label: 'Complete', position: 5, color: 'green' },
    { value: 'BLOCKED', label: 'Blocked', position: 6, color: 'red' },
  ],
});
