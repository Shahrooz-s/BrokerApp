import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  BROKER_BOARD_TEMPLATE_NAME_FIELD_ID,
  BROKER_BOARD_TEMPLATE_OBJECT_ID,
  BROKER_BOARD_TEMPLATE_STATUS_FIELD_ID,
  BROKER_BOARD_TEMPLATE_TYPE_FIELD_ID,
} from 'src/objects/broker-board-template';

export const BROKER_BOARD_TEMPLATES_VIEW_ID =
  '6b6d0000-3080-4000-8000-000000000001';

export default defineView({
  universalIdentifier: BROKER_BOARD_TEMPLATES_VIEW_ID,
  name: 'Boards and stages',
  objectUniversalIdentifier: BROKER_BOARD_TEMPLATE_OBJECT_ID,
  icon: 'IconLayoutKanban',
  key: ViewKey.INDEX,
  position: 20,
  fields: [
    {
      universalIdentifier: '6b6d0000-3080-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: BROKER_BOARD_TEMPLATE_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 240,
    },
    {
      universalIdentifier: '6b6d0000-3080-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: BROKER_BOARD_TEMPLATE_TYPE_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 160,
    },
    {
      universalIdentifier: '6b6d0000-3080-4000-8000-000000000004',
      fieldMetadataUniversalIdentifier: BROKER_BOARD_TEMPLATE_STATUS_FIELD_ID,
      position: 2,
      isVisible: true,
      size: 140,
    },
  ],
});
