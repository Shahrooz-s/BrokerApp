import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  BROKER_SETTINGS_AREA_GROUP_FIELD_ID,
  BROKER_SETTINGS_AREA_NAME_FIELD_ID,
  BROKER_SETTINGS_AREA_OBJECT_ID,
  BROKER_SETTINGS_AREA_POSITION_FIELD_ID,
  BROKER_SETTINGS_AREA_STATUS_FIELD_ID,
} from 'src/objects/broker-settings-area';

export const BROKER_SETTINGS_AREAS_VIEW_ID =
  '6b6d0000-3160-4000-8000-000000000001';

export default defineView({
  universalIdentifier: BROKER_SETTINGS_AREAS_VIEW_ID,
  name: 'Settings map',
  objectUniversalIdentifier: BROKER_SETTINGS_AREA_OBJECT_ID,
  icon: 'IconSettings',
  key: ViewKey.INDEX,
  position: 5,
  fields: [
    {
      universalIdentifier: '6b6d0000-3160-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: BROKER_SETTINGS_AREA_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 240,
    },
    {
      universalIdentifier: '6b6d0000-3160-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: BROKER_SETTINGS_AREA_GROUP_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: '6b6d0000-3160-4000-8000-000000000004',
      fieldMetadataUniversalIdentifier: BROKER_SETTINGS_AREA_STATUS_FIELD_ID,
      position: 2,
      isVisible: true,
      size: 170,
    },
    {
      universalIdentifier: '6b6d0000-3160-4000-8000-000000000005',
      fieldMetadataUniversalIdentifier: BROKER_SETTINGS_AREA_POSITION_FIELD_ID,
      position: 3,
      isVisible: true,
      size: 120,
    },
  ],
});
