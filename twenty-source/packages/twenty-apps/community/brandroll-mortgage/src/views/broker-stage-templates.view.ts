import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  BROKER_STAGE_TEMPLATE_AMBER_DAYS_FIELD_ID,
  BROKER_STAGE_TEMPLATE_BOARD_FIELD_ID,
  BROKER_STAGE_TEMPLATE_DUE_DAYS_FIELD_ID,
  BROKER_STAGE_TEMPLATE_DUE_TASK_FIELD_ID,
  BROKER_STAGE_TEMPLATE_NAME_FIELD_ID,
  BROKER_STAGE_TEMPLATE_OBJECT_ID,
  BROKER_STAGE_TEMPLATE_POSITION_FIELD_ID,
  BROKER_STAGE_TEMPLATE_RED_DAYS_FIELD_ID,
} from 'src/objects/broker-stage-template';

export const BROKER_STAGE_TEMPLATES_VIEW_ID =
  '6b6d0000-3090-4000-8000-000000000001';

export default defineView({
  universalIdentifier: BROKER_STAGE_TEMPLATES_VIEW_ID,
  name: 'Stage templates',
  objectUniversalIdentifier: BROKER_STAGE_TEMPLATE_OBJECT_ID,
  icon: 'IconProgress',
  key: ViewKey.INDEX,
  position: 30,
  fields: [
    {
      universalIdentifier: '6b6d0000-3090-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: BROKER_STAGE_TEMPLATE_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-3090-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: BROKER_STAGE_TEMPLATE_BOARD_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 140,
    },
    {
      universalIdentifier: '6b6d0000-3090-4000-8000-000000000004',
      fieldMetadataUniversalIdentifier: BROKER_STAGE_TEMPLATE_POSITION_FIELD_ID,
      position: 2,
      isVisible: true,
      size: 120,
    },
    {
      universalIdentifier: '6b6d0000-3090-4000-8000-000000000005',
      fieldMetadataUniversalIdentifier: BROKER_STAGE_TEMPLATE_DUE_DAYS_FIELD_ID,
      position: 3,
      isVisible: true,
      size: 130,
    },
    {
      universalIdentifier: '6b6d0000-3090-4000-8000-000000000006',
      fieldMetadataUniversalIdentifier:
        BROKER_STAGE_TEMPLATE_AMBER_DAYS_FIELD_ID,
      position: 4,
      isVisible: true,
      size: 130,
    },
    {
      universalIdentifier: '6b6d0000-3090-4000-8000-000000000007',
      fieldMetadataUniversalIdentifier: BROKER_STAGE_TEMPLATE_RED_DAYS_FIELD_ID,
      position: 5,
      isVisible: true,
      size: 120,
    },
    {
      universalIdentifier: '6b6d0000-3090-4000-8000-000000000008',
      fieldMetadataUniversalIdentifier: BROKER_STAGE_TEMPLATE_DUE_TASK_FIELD_ID,
      position: 6,
      isVisible: true,
      size: 150,
    },
  ],
});
