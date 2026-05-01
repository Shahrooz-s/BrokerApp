import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  APPLICATION_CONDITION_NAME_FIELD_ID,
  APPLICATION_CONDITION_OBJECT_ID,
  APPLICATION_CONDITION_STATUS_FIELD_ID,
} from 'src/objects/application-condition';

export const APPLICATION_CONDITIONS_VIEW_ID =
  '6b6d0000-2200-4000-8000-000000000001';

export default defineView({
  universalIdentifier: APPLICATION_CONDITIONS_VIEW_ID,
  name: 'Open conditions',
  objectUniversalIdentifier: APPLICATION_CONDITION_OBJECT_ID,
  icon: 'IconListCheck',
  key: ViewKey.INDEX,
  position: 2,
  fields: [
    {
      universalIdentifier: '6b6d0000-2200-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: APPLICATION_CONDITION_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-2200-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: APPLICATION_CONDITION_STATUS_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 180,
    },
  ],
});
