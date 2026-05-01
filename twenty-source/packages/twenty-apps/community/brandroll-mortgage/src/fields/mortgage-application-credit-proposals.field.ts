import { FieldType, RelationType, defineField } from 'twenty-sdk/define';

import { CREDIT_PROPOSAL_OBJECT_ID } from 'src/objects/credit-proposal';
import { MORTGAGE_APPLICATION_OBJECT_ID } from 'src/objects/mortgage-application';

import { MORTGAGE_APPLICATION_ON_CREDIT_PROPOSAL_FIELD_ID } from './mortgage-application-on-credit-proposal.field';

export const CREDIT_PROPOSALS_ON_MORTGAGE_APPLICATION_FIELD_ID =
  '6b6d0000-4000-4000-8000-000000000007';

export default defineField({
  universalIdentifier: CREDIT_PROPOSALS_ON_MORTGAGE_APPLICATION_FIELD_ID,
  objectUniversalIdentifier: MORTGAGE_APPLICATION_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'creditProposals',
  label: 'Credit proposals',
  icon: 'IconClipboardCheck',
  relationTargetObjectMetadataUniversalIdentifier: CREDIT_PROPOSAL_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    MORTGAGE_APPLICATION_ON_CREDIT_PROPOSAL_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
