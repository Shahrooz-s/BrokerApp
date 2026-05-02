import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  BROKER_FORM_TEMPLATE_DEFAULT_FIELD_ID,
  BROKER_FORM_TEMPLATE_NAME_FIELD_ID,
  BROKER_FORM_TEMPLATE_OBJECT_ID,
  BROKER_FORM_TEMPLATE_PROVIDER_FIELD_ID,
  BROKER_FORM_TEMPLATE_PUBLISHED_AT_FIELD_ID,
  BROKER_FORM_TEMPLATE_STATUS_FIELD_ID,
  BROKER_FORM_TEMPLATE_TYPE_FIELD_ID,
  BROKER_FORM_TEMPLATE_VERSION_FIELD_ID,
} from 'src/objects/broker-form-template';

export const BROKER_FORM_TEMPLATES_VIEW_ID =
  '6b6d0000-3000-4000-8000-000000000001';

export default defineView({
  universalIdentifier: BROKER_FORM_TEMPLATES_VIEW_ID,
  name: 'Form templates',
  objectUniversalIdentifier: BROKER_FORM_TEMPLATE_OBJECT_ID,
  icon: 'IconSettingsAutomation',
  key: ViewKey.INDEX,
  position: 20,
  fields: [
    {
      universalIdentifier: '6b6d0000-3000-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: BROKER_FORM_TEMPLATE_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-3000-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: BROKER_FORM_TEMPLATE_TYPE_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 190,
    },
    {
      universalIdentifier: '6b6d0000-3000-4000-8000-000000000004',
      fieldMetadataUniversalIdentifier: BROKER_FORM_TEMPLATE_STATUS_FIELD_ID,
      position: 2,
      isVisible: true,
      size: 160,
    },
    {
      universalIdentifier: '6b6d0000-3000-4000-8000-000000000005',
      fieldMetadataUniversalIdentifier: BROKER_FORM_TEMPLATE_PROVIDER_FIELD_ID,
      position: 3,
      isVisible: true,
      size: 160,
    },
    {
      universalIdentifier: '6b6d0000-3000-4000-8000-000000000006',
      fieldMetadataUniversalIdentifier: BROKER_FORM_TEMPLATE_VERSION_FIELD_ID,
      position: 4,
      isVisible: true,
      size: 140,
    },
    {
      universalIdentifier: '6b6d0000-3000-4000-8000-000000000007',
      fieldMetadataUniversalIdentifier: BROKER_FORM_TEMPLATE_DEFAULT_FIELD_ID,
      position: 5,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: '6b6d0000-3000-4000-8000-000000000008',
      fieldMetadataUniversalIdentifier:
        BROKER_FORM_TEMPLATE_PUBLISHED_AT_FIELD_ID,
      position: 6,
      isVisible: true,
      size: 170,
    },
  ],
});
