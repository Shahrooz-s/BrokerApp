import { FieldType, RelationType, defineField } from 'twenty-sdk/define';

import { LOAN_REQUIREMENT_OBJECT_ID } from 'src/objects/loan-requirement';
import { MORTGAGE_APPLICATION_OBJECT_ID } from 'src/objects/mortgage-application';

import { MORTGAGE_APPLICATION_ON_LOAN_REQUIREMENT_FIELD_ID } from './mortgage-application-on-loan-requirement.field';

export const LOAN_REQUIREMENTS_ON_MORTGAGE_APPLICATION_FIELD_ID =
  '6b6d0000-4000-4000-8000-000000000003';

export default defineField({
  universalIdentifier: LOAN_REQUIREMENTS_ON_MORTGAGE_APPLICATION_FIELD_ID,
  objectUniversalIdentifier: MORTGAGE_APPLICATION_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'loanRequirements',
  label: 'Loan requirements',
  icon: 'IconFileDollar',
  relationTargetObjectMetadataUniversalIdentifier: LOAN_REQUIREMENT_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    MORTGAGE_APPLICATION_ON_LOAN_REQUIREMENT_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
