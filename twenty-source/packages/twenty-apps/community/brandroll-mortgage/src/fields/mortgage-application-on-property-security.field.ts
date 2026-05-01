import {
  FieldType,
  OnDeleteAction,
  RelationType,
  defineField,
} from 'twenty-sdk/define';

import { MORTGAGE_APPLICATION_OBJECT_ID } from 'src/objects/mortgage-application';
import { PROPERTY_SECURITY_OBJECT_ID } from 'src/objects/property-security';

import { PROPERTY_SECURITIES_ON_MORTGAGE_APPLICATION_FIELD_ID } from './mortgage-application-property-securities.field';

export const MORTGAGE_APPLICATION_ON_PROPERTY_SECURITY_FIELD_ID =
  '6b6d0000-4000-4000-8000-000000000006';

export default defineField({
  universalIdentifier: MORTGAGE_APPLICATION_ON_PROPERTY_SECURITY_FIELD_ID,
  objectUniversalIdentifier: PROPERTY_SECURITY_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'mortgageApplication',
  label: 'Mortgage application',
  icon: 'IconHomeDollar',
  relationTargetObjectMetadataUniversalIdentifier:
    MORTGAGE_APPLICATION_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    PROPERTY_SECURITIES_ON_MORTGAGE_APPLICATION_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.CASCADE,
    joinColumnName: 'mortgageApplicationId',
  },
});
