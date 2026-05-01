import {
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { MORTGAGE_APPLICATION_OBJECT_ID } from 'src/objects/mortgage-application';

export const MORTGAGE_APPLICATION_ON_PRIMARY_APPLICANT_FIELD_ID =
  '6b6d0000-1000-4000-8000-000000000010';
export const MORTGAGE_APPLICATIONS_ON_PERSON_FIELD_ID =
  '6b6d0000-1b00-4000-8000-000000000001';

export default defineField({
  universalIdentifier: MORTGAGE_APPLICATION_ON_PRIMARY_APPLICANT_FIELD_ID,
  objectUniversalIdentifier: MORTGAGE_APPLICATION_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'primaryApplicant',
  label: 'Primary applicant',
  description: 'Native Twenty person linked to the primary borrower/contact.',
  icon: 'IconUser',
  relationTargetObjectMetadataUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.person.universalIdentifier,
  relationTargetFieldMetadataUniversalIdentifier:
    MORTGAGE_APPLICATIONS_ON_PERSON_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'primaryApplicantId',
  },
});
