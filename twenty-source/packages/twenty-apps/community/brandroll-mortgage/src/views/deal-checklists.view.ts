import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  DEAL_CHECKLIST_NAME_FIELD_ID,
  DEAL_CHECKLIST_OBJECT_ID,
  DEAL_CHECKLIST_STATUS_FIELD_ID,
} from 'src/objects/deal-checklist';

export const DEAL_CHECKLISTS_VIEW_ID =
  '6b6d0000-5720-4000-8000-000000000001';

export default defineView({
  universalIdentifier: DEAL_CHECKLISTS_VIEW_ID,
  name: 'Deal checklists',
  objectUniversalIdentifier: DEAL_CHECKLIST_OBJECT_ID,
  icon: 'IconChecklist',
  key: ViewKey.INDEX,
  position: 14,
  fields: [
    {
      universalIdentifier: '6b6d0000-5720-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: DEAL_CHECKLIST_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-5720-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: DEAL_CHECKLIST_STATUS_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 180,
    },
  ],
});
