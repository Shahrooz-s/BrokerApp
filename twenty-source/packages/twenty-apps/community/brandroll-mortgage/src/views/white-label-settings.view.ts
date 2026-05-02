import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  WHITE_LABEL_SETTING_NAME_FIELD_ID,
  WHITE_LABEL_SETTING_OBJECT_ID,
} from 'src/objects/white-label-setting';

export const WHITE_LABEL_SETTINGS_VIEW_ID =
  '6b6d0000-5920-4000-8000-000000000001';

export default defineView({
  universalIdentifier: WHITE_LABEL_SETTINGS_VIEW_ID,
  name: 'White-label settings',
  objectUniversalIdentifier: WHITE_LABEL_SETTING_OBJECT_ID,
  icon: 'IconPalette',
  key: ViewKey.INDEX,
  position: 22,
  fields: [
    {
      universalIdentifier: '6b6d0000-5920-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: WHITE_LABEL_SETTING_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
  ],
});
