import {
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { LMI_ASSESSMENT_OBJECT_ID } from 'src/objects/lmi-assessment';

export const LMI_ASSESSMENT_ON_OPPORTUNITY_FIELD_ID =
  '6b6d0000-4112-4000-8000-000000000001';
export const LMI_ASSESSMENTS_ON_OPPORTUNITY_FIELD_ID =
  '6b6d0000-4112-4000-8000-000000000002';

export default defineField({
  universalIdentifier: LMI_ASSESSMENT_ON_OPPORTUNITY_FIELD_ID,
  objectUniversalIdentifier: LMI_ASSESSMENT_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'opportunity',
  label: 'Opportunity',
  icon: 'IconTargetArrow',
  relationTargetObjectMetadataUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  relationTargetFieldMetadataUniversalIdentifier:
    LMI_ASSESSMENTS_ON_OPPORTUNITY_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'opportunityId',
  },
});
