import {
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { APPLICANT_PROFILE_OBJECT_ID } from 'src/objects/applicant-profile';

export const APPLICANT_PROFILE_ON_OPPORTUNITY_FIELD_ID =
  '6b6d0000-4101-4000-8000-000000000001';
export const APPLICANT_PROFILES_ON_OPPORTUNITY_FIELD_ID =
  '6b6d0000-4101-4000-8000-000000000002';

export default defineField({
  universalIdentifier: APPLICANT_PROFILE_ON_OPPORTUNITY_FIELD_ID,
  objectUniversalIdentifier: APPLICANT_PROFILE_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'opportunity',
  label: 'Opportunity',
  icon: 'IconTargetArrow',
  relationTargetObjectMetadataUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  relationTargetFieldMetadataUniversalIdentifier:
    APPLICANT_PROFILES_ON_OPPORTUNITY_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'opportunityId',
  },
});
