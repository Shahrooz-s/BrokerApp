import {
  FieldType,
  OnDeleteAction,
  RelationType,
  defineField,
} from 'twenty-sdk/define';

import { LOAN_REQUIREMENT_OBJECT_ID } from 'src/objects/loan-requirement';
import { MORTGAGE_APPLICATION_OBJECT_ID } from 'src/objects/mortgage-application';

import { LOAN_REQUIREMENTS_ON_MORTGAGE_APPLICATION_FIELD_ID } from './mortgage-application-loan-requirements.field';

export const MORTGAGE_APPLICATION_ON_LOAN_REQUIREMENT_FIELD_ID =
  '6b6d0000-4000-4000-8000-000000000004';

export default defineField({
  universalIdentifier: MORTGAGE_APPLICATION_ON_LOAN_REQUIREMENT_FIELD_ID,
  objectUniversalIdentifier: LOAN_REQUIREMENT_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'mortgageApplication',
  label: 'Mortgage application',
  icon: 'IconHomeDollar',
  relationTargetObjectMetadataUniversalIdentifier:
    MORTGAGE_APPLICATION_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    LOAN_REQUIREMENTS_ON_MORTGAGE_APPLICATION_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.CASCADE,
    joinColumnName: 'mortgageApplicationId',
  },
});
