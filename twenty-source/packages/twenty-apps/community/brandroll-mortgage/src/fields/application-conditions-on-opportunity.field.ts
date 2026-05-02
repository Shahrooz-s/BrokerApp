import {
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { APPLICATION_CONDITION_OBJECT_ID } from 'src/objects/application-condition';

import {
  APPLICATION_CONDITION_ON_OPPORTUNITY_FIELD_ID,
  APPLICATION_CONDITIONS_ON_OPPORTUNITY_FIELD_ID,
} from './opportunity-on-application-condition.field';

export default defineField({
  universalIdentifier: APPLICATION_CONDITIONS_ON_OPPORTUNITY_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.RELATION,
  name: 'applicationConditions',
  label: 'Application conditions',
  icon: 'IconListCheck',
  relationTargetObjectMetadataUniversalIdentifier:
    APPLICATION_CONDITION_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    APPLICATION_CONDITION_ON_OPPORTUNITY_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
