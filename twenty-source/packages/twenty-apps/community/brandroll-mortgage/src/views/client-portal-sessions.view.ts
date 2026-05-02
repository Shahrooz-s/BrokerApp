import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  CLIENT_PORTAL_SESSION_NAME_FIELD_ID,
  CLIENT_PORTAL_SESSION_OBJECT_ID,
  CLIENT_PORTAL_SESSION_STATUS_FIELD_ID,
} from 'src/objects/client-portal-session';

export const CLIENT_PORTAL_SESSIONS_VIEW_ID =
  '6b6d0000-5600-4000-8000-000000000001';

export default defineView({
  universalIdentifier: CLIENT_PORTAL_SESSIONS_VIEW_ID,
  name: 'Client portal sessions',
  objectUniversalIdentifier: CLIENT_PORTAL_SESSION_OBJECT_ID,
  icon: 'IconUserScreen',
  key: ViewKey.INDEX,
  position: 11,
  fields: [
    {
      universalIdentifier: '6b6d0000-5600-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: CLIENT_PORTAL_SESSION_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-5600-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: CLIENT_PORTAL_SESSION_STATUS_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 180,
    },
  ],
});
