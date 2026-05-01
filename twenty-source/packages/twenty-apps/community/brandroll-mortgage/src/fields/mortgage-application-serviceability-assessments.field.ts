import { FieldType, RelationType, defineField } from 'twenty-sdk/define';

import { MORTGAGE_APPLICATION_OBJECT_ID } from 'src/objects/mortgage-application';
import { SERVICEABILITY_ASSESSMENT_OBJECT_ID } from 'src/objects/serviceability-assessment';

import { MORTGAGE_APPLICATION_ON_SERVICEABILITY_ASSESSMENT_FIELD_ID } from './mortgage-application-on-serviceability-assessment.field';

export const SERVICEABILITY_ASSESSMENTS_ON_MORTGAGE_APPLICATION_FIELD_ID =
  '6b6d0000-4000-4000-8000-000000000013';

export default defineField({
  universalIdentifier:
    SERVICEABILITY_ASSESSMENTS_ON_MORTGAGE_APPLICATION_FIELD_ID,
  objectUniversalIdentifier: MORTGAGE_APPLICATION_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'serviceabilityAssessments',
  label: 'Serviceability assessments',
  icon: 'IconCalculator',
  relationTargetObjectMetadataUniversalIdentifier:
    SERVICEABILITY_ASSESSMENT_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    MORTGAGE_APPLICATION_ON_SERVICEABILITY_ASSESSMENT_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
