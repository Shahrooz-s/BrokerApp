import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  DEAL_WORKSPACE_TOOL_AREA_FIELD_ID,
  DEAL_WORKSPACE_TOOL_NAME_FIELD_ID,
  DEAL_WORKSPACE_TOOL_OBJECT_ID,
  DEAL_WORKSPACE_TOOL_POSITION_FIELD_ID,
  DEAL_WORKSPACE_TOOL_STATUS_FIELD_ID,
  DEAL_WORKSPACE_TOOL_TYPE_FIELD_ID,
} from 'src/objects/deal-workspace-tool';

export const DEAL_WORKSPACE_TOOLS_VIEW_ID =
  '6b6d0000-30a0-4000-8000-000000000001';

export default defineView({
  universalIdentifier: DEAL_WORKSPACE_TOOLS_VIEW_ID,
  name: 'Deal workspace tools',
  objectUniversalIdentifier: DEAL_WORKSPACE_TOOL_OBJECT_ID,
  icon: 'IconLayoutSidebarRight',
  key: ViewKey.INDEX,
  position: 40,
  fields: [
    {
      universalIdentifier: '6b6d0000-30a0-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: DEAL_WORKSPACE_TOOL_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 230,
    },
    {
      universalIdentifier: '6b6d0000-30a0-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: DEAL_WORKSPACE_TOOL_AREA_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 160,
    },
    {
      universalIdentifier: '6b6d0000-30a0-4000-8000-000000000004',
      fieldMetadataUniversalIdentifier: DEAL_WORKSPACE_TOOL_TYPE_FIELD_ID,
      position: 2,
      isVisible: true,
      size: 130,
    },
    {
      universalIdentifier: '6b6d0000-30a0-4000-8000-000000000005',
      fieldMetadataUniversalIdentifier: DEAL_WORKSPACE_TOOL_POSITION_FIELD_ID,
      position: 3,
      isVisible: true,
      size: 110,
    },
    {
      universalIdentifier: '6b6d0000-30a0-4000-8000-000000000006',
      fieldMetadataUniversalIdentifier: DEAL_WORKSPACE_TOOL_STATUS_FIELD_ID,
      position: 4,
      isVisible: true,
      size: 170,
    },
  ],
});
