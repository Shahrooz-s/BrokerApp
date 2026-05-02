import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  BROKER_CHECKLIST_ITEM_TEMPLATE_NAME_FIELD_ID,
  BROKER_CHECKLIST_ITEM_TEMPLATE_OBJECT_ID,
  BROKER_CHECKLIST_ITEM_TEMPLATE_OWNER_ROLE_FIELD_ID,
  BROKER_CHECKLIST_ITEM_TEMPLATE_REQUIRED_FIELD_ID,
  BROKER_CHECKLIST_ITEM_TEMPLATE_TYPE_FIELD_ID,
} from 'src/objects/broker-checklist-item-template';

export const BROKER_CHECKLIST_ITEM_TEMPLATES_VIEW_ID =
  '6b6d0000-5710-4000-8000-000000000001';

export default defineView({
  universalIdentifier: BROKER_CHECKLIST_ITEM_TEMPLATES_VIEW_ID,
  name: 'Checklist item templates',
  objectUniversalIdentifier: BROKER_CHECKLIST_ITEM_TEMPLATE_OBJECT_ID,
  icon: 'IconListDetails',
  key: ViewKey.INDEX,
  position: 14,
  fields: [
    {
      universalIdentifier: '6b6d0000-5710-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier:
        BROKER_CHECKLIST_ITEM_TEMPLATE_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 300,
    },
    {
      universalIdentifier: '6b6d0000-5710-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier:
        BROKER_CHECKLIST_ITEM_TEMPLATE_TYPE_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: '6b6d0000-5710-4000-8000-000000000004',
      fieldMetadataUniversalIdentifier:
        BROKER_CHECKLIST_ITEM_TEMPLATE_OWNER_ROLE_FIELD_ID,
      position: 2,
      isVisible: true,
      size: 160,
    },
    {
      universalIdentifier: '6b6d0000-5710-4000-8000-000000000005',
      fieldMetadataUniversalIdentifier:
        BROKER_CHECKLIST_ITEM_TEMPLATE_REQUIRED_FIELD_ID,
      position: 3,
      isVisible: true,
      size: 120,
    },
  ],
});
