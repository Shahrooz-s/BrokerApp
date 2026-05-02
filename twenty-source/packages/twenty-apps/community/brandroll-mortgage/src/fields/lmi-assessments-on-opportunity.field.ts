import {
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { LMI_ASSESSMENT_OBJECT_ID } from 'src/objects/lmi-assessment';

import {
  LMI_ASSESSMENT_ON_OPPORTUNITY_FIELD_ID,
  LMI_ASSESSMENTS_ON_OPPORTUNITY_FIELD_ID,
} from './opportunity-on-lmi-assessment.field';

export default defineField({
  universalIdentifier: LMI_ASSESSMENTS_ON_OPPORTUNITY_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.RELATION,
  name: 'lmiAssessments',
  label: 'LMI assessments',
  icon: 'IconShieldDollar',
  relationTargetObjectMetadataUniversalIdentifier: LMI_ASSESSMENT_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    LMI_ASSESSMENT_ON_OPPORTUNITY_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
