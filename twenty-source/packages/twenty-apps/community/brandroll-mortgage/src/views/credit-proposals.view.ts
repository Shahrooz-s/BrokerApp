import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  CREDIT_PROPOSAL_NAME_FIELD_ID,
  CREDIT_PROPOSAL_OBJECT_ID,
  CREDIT_PROPOSAL_STATUS_FIELD_ID,
} from 'src/objects/credit-proposal';

export const CREDIT_PROPOSALS_VIEW_ID =
  '6b6d0000-2100-4000-8000-000000000001';

export default defineView({
  universalIdentifier: CREDIT_PROPOSALS_VIEW_ID,
  name: 'Credit proposals',
  objectUniversalIdentifier: CREDIT_PROPOSAL_OBJECT_ID,
  icon: 'IconClipboardCheck',
  key: ViewKey.INDEX,
  position: 1,
  fields: [
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: CREDIT_PROPOSAL_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 240,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: CREDIT_PROPOSAL_STATUS_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 180,
    },
  ],
});
