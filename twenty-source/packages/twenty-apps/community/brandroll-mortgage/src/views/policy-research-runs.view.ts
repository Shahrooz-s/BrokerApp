import { ViewKey, defineView, ViewVisibility } from 'twenty-sdk/define';

import {
  POLICY_RESEARCH_RUN_NAME_FIELD_ID,
  POLICY_RESEARCH_RUN_OBJECT_ID,
  POLICY_RESEARCH_RUN_STATUS_FIELD_ID,
} from 'src/objects/policy-research-run';

export const POLICY_RESEARCH_RUNS_VIEW_ID =
  '6b6d0000-3800-4000-8000-000000000001';

export default defineView({
  universalIdentifier: POLICY_RESEARCH_RUNS_VIEW_ID,
  name: 'Policy research runs',
  objectUniversalIdentifier: POLICY_RESEARCH_RUN_OBJECT_ID,
  icon: 'IconDatabaseSearch',
  key: ViewKey.INDEX,
  position: 34,
  visibility: ViewVisibility.UNLISTED,
  fields: [
    {
      universalIdentifier: '6b6d0000-3800-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: POLICY_RESEARCH_RUN_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 280,
    },
    {
      universalIdentifier: '6b6d0000-3800-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: POLICY_RESEARCH_RUN_STATUS_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 190,
    },
  ],
});
