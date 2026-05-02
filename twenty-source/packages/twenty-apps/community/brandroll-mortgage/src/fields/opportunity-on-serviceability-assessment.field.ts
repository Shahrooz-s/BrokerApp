import {
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { SERVICEABILITY_ASSESSMENT_OBJECT_ID } from 'src/objects/serviceability-assessment';

export const SERVICEABILITY_ASSESSMENT_ON_OPPORTUNITY_FIELD_ID =
  '6b6d0000-4105-4000-8000-000000000001';
export const SERVICEABILITY_ASSESSMENTS_ON_OPPORTUNITY_FIELD_ID =
  '6b6d0000-4105-4000-8000-000000000002';

export default defineField({
  universalIdentifier: SERVICEABILITY_ASSESSMENT_ON_OPPORTUNITY_FIELD_ID,
  objectUniversalIdentifier: SERVICEABILITY_ASSESSMENT_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'opportunity',
  label: 'Opportunity',
  icon: 'IconTargetArrow',
  relationTargetObjectMetadataUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  relationTargetFieldMetadataUniversalIdentifier:
    SERVICEABILITY_ASSESSMENTS_ON_OPPORTUNITY_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'opportunityId',
  },
});
