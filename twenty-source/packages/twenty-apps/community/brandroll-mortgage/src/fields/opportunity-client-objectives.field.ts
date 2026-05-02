import {
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

export const OPPORTUNITY_CLIENT_OBJECTIVES_FIELD_ID =
  '6b6d0000-5000-4000-8000-000000000002';

export default defineField({
  universalIdentifier: OPPORTUNITY_CLIENT_OBJECTIVES_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.TEXT,
  name: 'clientRequirementsObjectives',
  label: 'Client requirements/objectives',
  icon: 'IconTargetArrow',
});
