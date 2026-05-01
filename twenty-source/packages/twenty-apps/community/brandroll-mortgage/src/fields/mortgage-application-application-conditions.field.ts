import { FieldType, RelationType, defineField } from 'twenty-sdk/define';

import { APPLICATION_CONDITION_OBJECT_ID } from 'src/objects/application-condition';
import { MORTGAGE_APPLICATION_OBJECT_ID } from 'src/objects/mortgage-application';

import { MORTGAGE_APPLICATION_ON_APPLICATION_CONDITION_FIELD_ID } from './mortgage-application-on-application-condition.field';

export const APPLICATION_CONDITIONS_ON_MORTGAGE_APPLICATION_FIELD_ID =
  '6b6d0000-4000-4000-8000-000000000011';

export default defineField({
  universalIdentifier: APPLICATION_CONDITIONS_ON_MORTGAGE_APPLICATION_FIELD_ID,
  objectUniversalIdentifier: MORTGAGE_APPLICATION_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'applicationConditions',
  label: 'Application conditions',
  icon: 'IconListCheck',
  relationTargetObjectMetadataUniversalIdentifier:
    APPLICATION_CONDITION_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    MORTGAGE_APPLICATION_ON_APPLICATION_CONDITION_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
