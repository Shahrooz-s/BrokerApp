import {
  FieldType,
  OnDeleteAction,
  RelationType,
  defineField,
} from 'twenty-sdk/define';

import { LMI_ASSESSMENT_OBJECT_ID } from 'src/objects/lmi-assessment';
import { MORTGAGE_APPLICATION_OBJECT_ID } from 'src/objects/mortgage-application';

import { LMI_ASSESSMENTS_ON_MORTGAGE_APPLICATION_FIELD_ID } from './mortgage-application-lmi-assessments.field';

export const MORTGAGE_APPLICATION_ON_LMI_ASSESSMENT_FIELD_ID =
  '6b6d0000-4000-4000-8000-000000000018';

export default defineField({
  universalIdentifier: MORTGAGE_APPLICATION_ON_LMI_ASSESSMENT_FIELD_ID,
  objectUniversalIdentifier: LMI_ASSESSMENT_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'mortgageApplication',
  label: 'Mortgage application',
  icon: 'IconHomeDollar',
  relationTargetObjectMetadataUniversalIdentifier:
    MORTGAGE_APPLICATION_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    LMI_ASSESSMENTS_ON_MORTGAGE_APPLICATION_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.CASCADE,
    joinColumnName: 'mortgageApplicationId',
  },
});
