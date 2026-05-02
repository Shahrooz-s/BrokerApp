import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  DEAL_CHECKLIST_ITEM_ASSIGNEE_ROLE_FIELD_ID,
  DEAL_CHECKLIST_ITEM_DUE_DATE_FIELD_ID,
  DEAL_CHECKLIST_ITEM_NAME_FIELD_ID,
  DEAL_CHECKLIST_ITEM_OBJECT_ID,
  DEAL_CHECKLIST_ITEM_REFERENCE_FIELD_ID,
  DEAL_CHECKLIST_ITEM_STATUS_FIELD_ID,
} from 'src/objects/deal-checklist-item';

export const DEAL_CHECKLIST_ITEMS_VIEW_ID =
  '6b6d0000-5730-4000-8000-000000000001';

export default defineView({
  universalIdentifier: DEAL_CHECKLIST_ITEMS_VIEW_ID,
  name: 'Deal checklist items',
  objectUniversalIdentifier: DEAL_CHECKLIST_ITEM_OBJECT_ID,
  icon: 'IconListDetails',
  key: ViewKey.INDEX,
  position: 16,
  fields: [
    {
      universalIdentifier: '6b6d0000-5730-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: DEAL_CHECKLIST_ITEM_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-5730-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: DEAL_CHECKLIST_ITEM_STATUS_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 160,
    },
    {
      universalIdentifier: '6b6d0000-5730-4000-8000-000000000004',
      fieldMetadataUniversalIdentifier: DEAL_CHECKLIST_ITEM_REFERENCE_FIELD_ID,
      position: 2,
      isVisible: true,
      size: 220,
    },
    {
      universalIdentifier: '6b6d0000-5730-4000-8000-000000000005',
      fieldMetadataUniversalIdentifier:
        DEAL_CHECKLIST_ITEM_ASSIGNEE_ROLE_FIELD_ID,
      position: 3,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: '6b6d0000-5730-4000-8000-000000000006',
      fieldMetadataUniversalIdentifier: DEAL_CHECKLIST_ITEM_DUE_DATE_FIELD_ID,
      position: 4,
      isVisible: true,
      size: 130,
    },
  ],
});
