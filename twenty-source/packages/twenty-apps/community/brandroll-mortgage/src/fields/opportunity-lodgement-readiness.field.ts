import {
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

export const OPPORTUNITY_LODGEMENT_READINESS_FIELD_ID =
  '6b6d0000-5000-4000-8000-000000000008';

export default defineField({
  universalIdentifier: OPPORTUNITY_LODGEMENT_READINESS_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.SELECT,
  name: 'lodgementReadiness',
  label: 'Lodgement readiness',
  icon: 'IconSend',
  options: [
    { value: 'NOT_READY', label: 'Not ready', position: 0, color: 'gray' },
    { value: 'MISSING_INFORMATION', label: 'Missing information', position: 1, color: 'orange' },
    { value: 'READY_FOR_APPLYONLINE', label: 'Ready for ApplyOnline', position: 2, color: 'green' },
    { value: 'READY_FOR_AFG_FLEX', label: 'Ready for AFG Flex', position: 3, color: 'green' },
    { value: 'SUBMITTED', label: 'Submitted', position: 4, color: 'purple' },
  ],
});
