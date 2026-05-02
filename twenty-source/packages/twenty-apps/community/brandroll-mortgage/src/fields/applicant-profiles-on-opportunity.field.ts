import {
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { APPLICANT_PROFILE_OBJECT_ID } from 'src/objects/applicant-profile';

import {
  APPLICANT_PROFILE_ON_OPPORTUNITY_FIELD_ID,
  APPLICANT_PROFILES_ON_OPPORTUNITY_FIELD_ID,
} from './opportunity-on-applicant-profile.field';

export default defineField({
  universalIdentifier: APPLICANT_PROFILES_ON_OPPORTUNITY_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.RELATION,
  name: 'applicantProfiles',
  label: 'Applicants',
  icon: 'IconUsers',
  relationTargetObjectMetadataUniversalIdentifier: APPLICANT_PROFILE_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    APPLICANT_PROFILE_ON_OPPORTUNITY_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
