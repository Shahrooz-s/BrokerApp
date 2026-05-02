import {
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { CREDIT_PROPOSAL_OBJECT_ID } from 'src/objects/credit-proposal';

export const CREDIT_PROPOSAL_ON_OPPORTUNITY_FIELD_ID =
  '6b6d0000-4108-4000-8000-000000000001';
export const CREDIT_PROPOSALS_ON_OPPORTUNITY_FIELD_ID =
  '6b6d0000-4108-4000-8000-000000000002';

export default defineField({
  universalIdentifier: CREDIT_PROPOSAL_ON_OPPORTUNITY_FIELD_ID,
  objectUniversalIdentifier: CREDIT_PROPOSAL_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'opportunity',
  label: 'Opportunity',
  icon: 'IconTargetArrow',
  relationTargetObjectMetadataUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  relationTargetFieldMetadataUniversalIdentifier:
    CREDIT_PROPOSALS_ON_OPPORTUNITY_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'opportunityId',
  },
});
