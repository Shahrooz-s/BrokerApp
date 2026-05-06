import { ViewKey, defineView, ViewVisibility } from 'twenty-sdk/define';

import {
  BDM_QUESTION_DRAFT_NAME_FIELD_ID,
  BDM_QUESTION_DRAFT_OBJECT_ID,
  BDM_QUESTION_DRAFT_STATUS_FIELD_ID,
} from 'src/objects/bdm-question-draft';

export const BDM_QUESTION_DRAFTS_VIEW_ID =
  '6b6d0000-3a00-4000-8000-000000000001';

export default defineView({
  universalIdentifier: BDM_QUESTION_DRAFTS_VIEW_ID,
  name: 'BDM question drafts',
  objectUniversalIdentifier: BDM_QUESTION_DRAFT_OBJECT_ID,
  icon: 'IconMailQuestion',
  key: ViewKey.INDEX,
  position: 35,
  visibility: ViewVisibility.UNLISTED,
  fields: [
    {
      universalIdentifier: '6b6d0000-3a00-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: BDM_QUESTION_DRAFT_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-3a00-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: BDM_QUESTION_DRAFT_STATUS_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 190,
    },
  ],
});
