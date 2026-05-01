import {
  FieldType,
  OnDeleteAction,
  RelationType,
  defineField,
} from 'twenty-sdk/define';

import { APPLICATION_CONDITION_OBJECT_ID } from 'src/objects/application-condition';
import { MORTGAGE_APPLICATION_OBJECT_ID } from 'src/objects/mortgage-application';

import { APPLICATION_CONDITIONS_ON_MORTGAGE_APPLICATION_FIELD_ID } from './mortgage-application-application-conditions.field';

export const MORTGAGE_APPLICATION_ON_APPLICATION_CONDITION_FIELD_ID =
  '6b6d0000-4000-4000-8000-000000000012';

export default defineField({
  universalIdentifier: MORTGAGE_APPLICATION_ON_APPLICATION_CONDITION_FIELD_ID,
  objectUniversalIdentifier: APPLICATION_CONDITION_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'mortgageApplication',
  label: 'Mortgage application',
  icon: 'IconHomeDollar',
  relationTargetObjectMetadataUniversalIdentifier:
    MORTGAGE_APPLICATION_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    APPLICATION_CONDITIONS_ON_MORTGAGE_APPLICATION_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.CASCADE,
    joinColumnName: 'mortgageApplicationId',
  },
});
