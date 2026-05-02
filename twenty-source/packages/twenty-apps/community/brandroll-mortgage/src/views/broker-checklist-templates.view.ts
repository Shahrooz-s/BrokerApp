import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  BROKER_CHECKLIST_TEMPLATE_NAME_FIELD_ID,
  BROKER_CHECKLIST_TEMPLATE_OBJECT_ID,
  BROKER_CHECKLIST_TEMPLATE_STATUS_FIELD_ID,
} from 'src/objects/broker-checklist-template';

export const BROKER_CHECKLIST_TEMPLATES_VIEW_ID =
  '6b6d0000-5700-4000-8000-000000000001';

export default defineView({
  universalIdentifier: BROKER_CHECKLIST_TEMPLATES_VIEW_ID,
  name: 'Checklist templates',
  objectUniversalIdentifier: BROKER_CHECKLIST_TEMPLATE_OBJECT_ID,
  icon: 'IconListCheck',
  key: ViewKey.INDEX,
  position: 13,
  fields: [
    {
      universalIdentifier: '6b6d0000-5700-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: BROKER_CHECKLIST_TEMPLATE_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 280,
    },
    {
      universalIdentifier: '6b6d0000-5700-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: BROKER_CHECKLIST_TEMPLATE_STATUS_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 190,
    },
  ],
});
