import {
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

export const OPPORTUNITY_LODGEMENT_TARGET_FIELD_ID =
  '6b6d0000-5000-4000-8000-000000000009';

export default defineField({
  universalIdentifier: OPPORTUNITY_LODGEMENT_TARGET_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.SELECT,
  name: 'lodgementTarget',
  label: 'Lodgement target',
  icon: 'IconExternalLink',
  options: [
    { value: 'APPLYONLINE', label: 'ApplyOnline', position: 0, color: 'green' },
    { value: 'AFG_FLEX', label: 'AFG Flex', position: 1, color: 'blue' },
    { value: 'AFG', label: 'AFG', position: 2, color: 'blue' },
    { value: 'BROKERENGINE', label: 'BrokerEngine', position: 3, color: 'purple' },
    { value: 'MANUAL', label: 'Manual', position: 4, color: 'orange' },
    { value: 'NOT_CONFIRMED', label: 'Not confirmed', position: 5, color: 'gray' },
  ],
});
