import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  CLIENT_PORTAL_TASK_NAME_FIELD_ID,
  CLIENT_PORTAL_TASK_OBJECT_ID,
  CLIENT_PORTAL_TASK_STATUS_FIELD_ID,
} from 'src/objects/client-portal-task';

export const CLIENT_PORTAL_TASKS_VIEW_ID =
  '6b6d0000-5610-4000-8000-000000000001';

export default defineView({
  universalIdentifier: CLIENT_PORTAL_TASKS_VIEW_ID,
  name: 'Client portal tasks',
  objectUniversalIdentifier: CLIENT_PORTAL_TASK_OBJECT_ID,
  icon: 'IconChecklist',
  key: ViewKey.INDEX,
  position: 12,
  fields: [
    {
      universalIdentifier: '6b6d0000-5610-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: CLIENT_PORTAL_TASK_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-5610-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: CLIENT_PORTAL_TASK_STATUS_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 180,
    },
  ],
});
