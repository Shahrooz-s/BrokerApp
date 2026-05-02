import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  INTEGRATION_PROVIDER_NAME_FIELD_ID,
  INTEGRATION_PROVIDER_OBJECT_ID,
  INTEGRATION_PROVIDER_STATUS_FIELD_ID,
} from 'src/objects/integration-provider';

export const INTEGRATION_PROVIDERS_VIEW_ID =
  '6b6d0000-5900-4000-8000-000000000001';

export default defineView({
  universalIdentifier: INTEGRATION_PROVIDERS_VIEW_ID,
  name: 'Integration providers',
  objectUniversalIdentifier: INTEGRATION_PROVIDER_OBJECT_ID,
  icon: 'IconPlugConnected',
  key: ViewKey.INDEX,
  position: 20,
  fields: [
    {
      universalIdentifier: '6b6d0000-5900-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: INTEGRATION_PROVIDER_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-5900-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: INTEGRATION_PROVIDER_STATUS_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 180,
    },
  ],
});
