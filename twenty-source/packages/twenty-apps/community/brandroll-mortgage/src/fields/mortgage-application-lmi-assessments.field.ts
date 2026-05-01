import { FieldType, RelationType, defineField } from 'twenty-sdk/define';

import { LMI_ASSESSMENT_OBJECT_ID } from 'src/objects/lmi-assessment';
import { MORTGAGE_APPLICATION_OBJECT_ID } from 'src/objects/mortgage-application';

import { MORTGAGE_APPLICATION_ON_LMI_ASSESSMENT_FIELD_ID } from './mortgage-application-on-lmi-assessment.field';

export const LMI_ASSESSMENTS_ON_MORTGAGE_APPLICATION_FIELD_ID =
  '6b6d0000-4000-4000-8000-000000000017';

export default defineField({
  universalIdentifier: LMI_ASSESSMENTS_ON_MORTGAGE_APPLICATION_FIELD_ID,
  objectUniversalIdentifier: MORTGAGE_APPLICATION_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'lmiAssessments',
  label: 'LMI assessments',
  icon: 'IconShieldDollar',
  relationTargetObjectMetadataUniversalIdentifier: LMI_ASSESSMENT_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    MORTGAGE_APPLICATION_ON_LMI_ASSESSMENT_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
