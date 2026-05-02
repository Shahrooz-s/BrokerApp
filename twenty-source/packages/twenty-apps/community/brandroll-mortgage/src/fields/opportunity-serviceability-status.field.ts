import {
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

export const OPPORTUNITY_SERVICEABILITY_STATUS_FIELD_ID =
  '6b6d0000-5000-4000-8000-000000000005';

export default defineField({
  universalIdentifier: OPPORTUNITY_SERVICEABILITY_STATUS_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.SELECT,
  name: 'serviceabilityStatus',
  label: 'Serviceability status',
  icon: 'IconCalculator',
  options: [
    { value: 'NOT_STARTED', label: 'Not started', position: 0, color: 'gray' },
    { value: 'DATA_REQUIRED', label: 'Data required', position: 1, color: 'orange' },
    { value: 'RUNNING', label: 'Running', position: 2, color: 'blue' },
    { value: 'PASS', label: 'Pass', position: 3, color: 'green' },
    { value: 'REFER', label: 'Refer', position: 4, color: 'yellow' },
    { value: 'FAIL', label: 'Fail', position: 5, color: 'red' },
  ],
});
