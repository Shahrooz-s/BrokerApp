import {
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { SERVICEABILITY_ASSESSMENT_OBJECT_ID } from 'src/objects/serviceability-assessment';

import {
  SERVICEABILITY_ASSESSMENT_ON_OPPORTUNITY_FIELD_ID,
  SERVICEABILITY_ASSESSMENTS_ON_OPPORTUNITY_FIELD_ID,
} from './opportunity-on-serviceability-assessment.field';

export default defineField({
  universalIdentifier: SERVICEABILITY_ASSESSMENTS_ON_OPPORTUNITY_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.RELATION,
  name: 'serviceabilityAssessments',
  label: 'Serviceability assessments',
  icon: 'IconCalculator',
  relationTargetObjectMetadataUniversalIdentifier:
    SERVICEABILITY_ASSESSMENT_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    SERVICEABILITY_ASSESSMENT_ON_OPPORTUNITY_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
