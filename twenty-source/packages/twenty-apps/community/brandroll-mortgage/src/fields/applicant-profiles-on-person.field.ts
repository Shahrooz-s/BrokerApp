import {
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { APPLICANT_PROFILE_OBJECT_ID } from 'src/objects/applicant-profile';

import {
  APPLICANT_PROFILES_ON_PERSON_FIELD_ID,
  PERSON_ON_APPLICANT_PROFILE_FIELD_ID,
} from './person-on-applicant-profile.field';

export default defineField({
  universalIdentifier: APPLICANT_PROFILES_ON_PERSON_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
  type: FieldType.RELATION,
  name: 'applicantProfiles',
  label: 'Applicant profiles',
  icon: 'IconUserCheck',
  relationTargetObjectMetadataUniversalIdentifier: APPLICANT_PROFILE_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    PERSON_ON_APPLICANT_PROFILE_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
