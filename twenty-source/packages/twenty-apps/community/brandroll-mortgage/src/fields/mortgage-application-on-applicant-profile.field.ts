import {
  FieldType,
  OnDeleteAction,
  RelationType,
  defineField,
} from 'twenty-sdk/define';

import { APPLICANT_PROFILE_OBJECT_ID } from 'src/objects/applicant-profile';
import { MORTGAGE_APPLICATION_OBJECT_ID } from 'src/objects/mortgage-application';

import { APPLICANT_PROFILES_ON_MORTGAGE_APPLICATION_FIELD_ID } from './mortgage-application-applicant-profiles.field';

export const MORTGAGE_APPLICATION_ON_APPLICANT_PROFILE_FIELD_ID =
  '6b6d0000-4000-4000-8000-000000000002';

export default defineField({
  universalIdentifier: MORTGAGE_APPLICATION_ON_APPLICANT_PROFILE_FIELD_ID,
  objectUniversalIdentifier: APPLICANT_PROFILE_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'mortgageApplication',
  label: 'Mortgage application',
  icon: 'IconHomeDollar',
  relationTargetObjectMetadataUniversalIdentifier:
    MORTGAGE_APPLICATION_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    APPLICANT_PROFILES_ON_MORTGAGE_APPLICATION_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.CASCADE,
    joinColumnName: 'mortgageApplicationId',
  },
});
