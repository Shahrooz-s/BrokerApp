import { FieldType, RelationType, defineField } from 'twenty-sdk/define';

import { APPLICANT_PROFILE_OBJECT_ID } from 'src/objects/applicant-profile';
import { MORTGAGE_APPLICATION_OBJECT_ID } from 'src/objects/mortgage-application';

import { MORTGAGE_APPLICATION_ON_APPLICANT_PROFILE_FIELD_ID } from './mortgage-application-on-applicant-profile.field';

export const APPLICANT_PROFILES_ON_MORTGAGE_APPLICATION_FIELD_ID =
  '6b6d0000-4000-4000-8000-000000000001';

export default defineField({
  universalIdentifier: APPLICANT_PROFILES_ON_MORTGAGE_APPLICATION_FIELD_ID,
  objectUniversalIdentifier: MORTGAGE_APPLICATION_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'applicantProfiles',
  label: 'Applicant profiles',
  icon: 'IconUsers',
  relationTargetObjectMetadataUniversalIdentifier: APPLICANT_PROFILE_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    MORTGAGE_APPLICATION_ON_APPLICANT_PROFILE_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
