import {
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { CREDIT_PROPOSAL_OBJECT_ID } from 'src/objects/credit-proposal';

import {
  CREDIT_PROPOSAL_ON_OPPORTUNITY_FIELD_ID,
  CREDIT_PROPOSALS_ON_OPPORTUNITY_FIELD_ID,
} from './opportunity-on-credit-proposal.field';

export default defineField({
  universalIdentifier: CREDIT_PROPOSALS_ON_OPPORTUNITY_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.RELATION,
  name: 'creditProposals',
  label: 'Credit proposals',
  icon: 'IconClipboardCheck',
  relationTargetObjectMetadataUniversalIdentifier: CREDIT_PROPOSAL_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    CREDIT_PROPOSAL_ON_OPPORTUNITY_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
