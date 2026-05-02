import {
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

export const OPPORTUNITY_POST_CAP_LVR_FIELD_ID =
  '6b6d0000-5000-4000-8000-000000000011';

export default defineField({
  universalIdentifier: OPPORTUNITY_POST_CAP_LVR_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.NUMBER,
  name: 'postCapLvr',
  label: 'Post cap LVR',
  icon: 'IconPercentage',
});
