import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  BROKERENGINE_FEATURE_PARITY_AREA_FIELD_ID,
  BROKERENGINE_FEATURE_PARITY_NAME_FIELD_ID,
  BROKERENGINE_FEATURE_PARITY_OBJECT_ID,
  BROKERENGINE_FEATURE_PARITY_PRIVATE_IMPORT_FIELD_ID,
  BROKERENGINE_FEATURE_PARITY_PRODUCTION_READY_FIELD_ID,
  BROKERENGINE_FEATURE_PARITY_PROVIDER_API_FIELD_ID,
  BROKERENGINE_FEATURE_PARITY_STATUS_FIELD_ID,
  BROKERENGINE_FEATURE_PARITY_WORKSPACE_LOGIN_FIELD_ID,
} from 'src/objects/brokerengine-feature-parity';

export const BROKERENGINE_FEATURE_PARITY_VIEW_ID =
  '6b6d0000-5930-4000-8000-000000000001';

export default defineView({
  universalIdentifier: BROKERENGINE_FEATURE_PARITY_VIEW_ID,
  name: 'BrokerEngine feature parity',
  objectUniversalIdentifier: BROKERENGINE_FEATURE_PARITY_OBJECT_ID,
  icon: 'IconClipboardCheck',
  key: ViewKey.INDEX,
  position: 3,
  fields: [
    {
      universalIdentifier: '6b6d0000-5930-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: BROKERENGINE_FEATURE_PARITY_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 280,
    },
    {
      universalIdentifier: '6b6d0000-5930-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: BROKERENGINE_FEATURE_PARITY_AREA_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 160,
    },
    {
      universalIdentifier: '6b6d0000-5930-4000-8000-000000000004',
      fieldMetadataUniversalIdentifier: BROKERENGINE_FEATURE_PARITY_STATUS_FIELD_ID,
      position: 2,
      isVisible: true,
      size: 190,
    },
    {
      universalIdentifier: '6b6d0000-5930-4000-8000-000000000005',
      fieldMetadataUniversalIdentifier:
        BROKERENGINE_FEATURE_PARITY_PRIVATE_IMPORT_FIELD_ID,
      position: 3,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: '6b6d0000-5930-4000-8000-000000000006',
      fieldMetadataUniversalIdentifier:
        BROKERENGINE_FEATURE_PARITY_PROVIDER_API_FIELD_ID,
      position: 4,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: '6b6d0000-5930-4000-8000-000000000007',
      fieldMetadataUniversalIdentifier:
        BROKERENGINE_FEATURE_PARITY_WORKSPACE_LOGIN_FIELD_ID,
      position: 5,
      isVisible: true,
      size: 160,
    },
    {
      universalIdentifier: '6b6d0000-5930-4000-8000-000000000008',
      fieldMetadataUniversalIdentifier:
        BROKERENGINE_FEATURE_PARITY_PRODUCTION_READY_FIELD_ID,
      position: 6,
      isVisible: true,
      size: 140,
    },
  ],
});
