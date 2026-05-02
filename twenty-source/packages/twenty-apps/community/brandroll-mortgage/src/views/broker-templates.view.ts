import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  BROKER_TEMPLATE_CATEGORY_FIELD_ID,
  BROKER_TEMPLATE_IMPORT_STATUS_FIELD_ID,
  BROKER_TEMPLATE_NAME_FIELD_ID,
  BROKER_TEMPLATE_OBJECT_ID,
  BROKER_TEMPLATE_RELATED_BOARD_FIELD_ID,
  BROKER_TEMPLATE_RELATED_STAGE_FIELD_ID,
  BROKER_TEMPLATE_STATUS_FIELD_ID,
  BROKER_TEMPLATE_SUBJECT_FIELD_ID,
  BROKER_TEMPLATE_TASK_PRIORITY_FIELD_ID,
  BROKER_TEMPLATE_TYPE_FIELD_ID,
} from 'src/objects/broker-template';

export const BROKER_TEMPLATES_VIEW_ID =
  '6b6d0000-3070-4000-8000-000000000001';

export default defineView({
  universalIdentifier: BROKER_TEMPLATES_VIEW_ID,
  name: 'Broker templates',
  objectUniversalIdentifier: BROKER_TEMPLATE_OBJECT_ID,
  icon: 'IconTemplate',
  key: ViewKey.INDEX,
  position: 10,
  fields: [
    {
      universalIdentifier: '6b6d0000-3070-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: BROKER_TEMPLATE_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-3070-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: BROKER_TEMPLATE_TYPE_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 130,
    },
    {
      universalIdentifier: '6b6d0000-3070-4000-8000-000000000004',
      fieldMetadataUniversalIdentifier: BROKER_TEMPLATE_CATEGORY_FIELD_ID,
      position: 2,
      isVisible: true,
      size: 170,
    },
    {
      universalIdentifier: '6b6d0000-3070-4000-8000-000000000005',
      fieldMetadataUniversalIdentifier: BROKER_TEMPLATE_STATUS_FIELD_ID,
      position: 3,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: '6b6d0000-3070-4000-8000-000000000006',
      fieldMetadataUniversalIdentifier: BROKER_TEMPLATE_SUBJECT_FIELD_ID,
      position: 4,
      isVisible: true,
      size: 280,
    },
    {
      universalIdentifier: '6b6d0000-3070-4000-8000-000000000007',
      fieldMetadataUniversalIdentifier: BROKER_TEMPLATE_RELATED_BOARD_FIELD_ID,
      position: 5,
      isVisible: true,
      size: 130,
    },
    {
      universalIdentifier: '6b6d0000-3070-4000-8000-000000000008',
      fieldMetadataUniversalIdentifier: BROKER_TEMPLATE_RELATED_STAGE_FIELD_ID,
      position: 6,
      isVisible: true,
      size: 220,
    },
    {
      universalIdentifier: '6b6d0000-3070-4000-8000-000000000009',
      fieldMetadataUniversalIdentifier: BROKER_TEMPLATE_IMPORT_STATUS_FIELD_ID,
      position: 7,
      isVisible: true,
      size: 210,
    },
    {
      universalIdentifier: '6b6d0000-3070-4000-8000-000000000010',
      fieldMetadataUniversalIdentifier: BROKER_TEMPLATE_TASK_PRIORITY_FIELD_ID,
      position: 8,
      isVisible: true,
      size: 140,
    },
  ],
});
