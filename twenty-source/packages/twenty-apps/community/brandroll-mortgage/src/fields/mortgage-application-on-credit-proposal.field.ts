import {
  FieldType,
  OnDeleteAction,
  RelationType,
  defineField,
} from 'twenty-sdk/define';

import { CREDIT_PROPOSAL_OBJECT_ID } from 'src/objects/credit-proposal';
import { MORTGAGE_APPLICATION_OBJECT_ID } from 'src/objects/mortgage-application';

import { CREDIT_PROPOSALS_ON_MORTGAGE_APPLICATION_FIELD_ID } from './mortgage-application-credit-proposals.field';

export const MORTGAGE_APPLICATION_ON_CREDIT_PROPOSAL_FIELD_ID =
  '6b6d0000-4000-4000-8000-000000000008';

export default defineField({
  universalIdentifier: MORTGAGE_APPLICATION_ON_CREDIT_PROPOSAL_FIELD_ID,
  objectUniversalIdentifier: CREDIT_PROPOSAL_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'mortgageApplication',
  label: 'Mortgage application',
  icon: 'IconHomeDollar',
  relationTargetObjectMetadataUniversalIdentifier:
    MORTGAGE_APPLICATION_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    CREDIT_PROPOSALS_ON_MORTGAGE_APPLICATION_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.CASCADE,
    joinColumnName: 'mortgageApplicationId',
  },
});
