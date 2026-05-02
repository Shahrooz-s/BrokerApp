import {
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { APPLICATION_CONDITION_OBJECT_ID } from 'src/objects/application-condition';

export const APPLICATION_CONDITION_ON_OPPORTUNITY_FIELD_ID =
  '6b6d0000-4110-4000-8000-000000000001';
export const APPLICATION_CONDITIONS_ON_OPPORTUNITY_FIELD_ID =
  '6b6d0000-4110-4000-8000-000000000002';

export default defineField({
  universalIdentifier: APPLICATION_CONDITION_ON_OPPORTUNITY_FIELD_ID,
  objectUniversalIdentifier: APPLICATION_CONDITION_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'opportunity',
  label: 'Opportunity',
  icon: 'IconTargetArrow',
  relationTargetObjectMetadataUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  relationTargetFieldMetadataUniversalIdentifier:
    APPLICATION_CONDITIONS_ON_OPPORTUNITY_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'opportunityId',
  },
});
