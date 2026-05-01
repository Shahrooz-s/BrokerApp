import {
  FieldType,
  OnDeleteAction,
  RelationType,
  defineField,
} from 'twenty-sdk/define';

import { MORTGAGE_APPLICATION_OBJECT_ID } from 'src/objects/mortgage-application';
import { SERVICEABILITY_ASSESSMENT_OBJECT_ID } from 'src/objects/serviceability-assessment';

import { SERVICEABILITY_ASSESSMENTS_ON_MORTGAGE_APPLICATION_FIELD_ID } from './mortgage-application-serviceability-assessments.field';

export const MORTGAGE_APPLICATION_ON_SERVICEABILITY_ASSESSMENT_FIELD_ID =
  '6b6d0000-4000-4000-8000-000000000014';

export default defineField({
  universalIdentifier:
    MORTGAGE_APPLICATION_ON_SERVICEABILITY_ASSESSMENT_FIELD_ID,
  objectUniversalIdentifier: SERVICEABILITY_ASSESSMENT_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'mortgageApplication',
  label: 'Mortgage application',
  icon: 'IconHomeDollar',
  relationTargetObjectMetadataUniversalIdentifier:
    MORTGAGE_APPLICATION_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    SERVICEABILITY_ASSESSMENTS_ON_MORTGAGE_APPLICATION_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.CASCADE,
    joinColumnName: 'mortgageApplicationId',
  },
});
