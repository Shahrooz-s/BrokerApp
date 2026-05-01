import { FieldType, RelationType, defineField } from 'twenty-sdk/define';

import { INTEGRATION_EVENT_OBJECT_ID } from 'src/objects/integration-event';
import { MORTGAGE_APPLICATION_OBJECT_ID } from 'src/objects/mortgage-application';

import { MORTGAGE_APPLICATION_ON_INTEGRATION_EVENT_FIELD_ID } from './mortgage-application-on-integration-event.field';

export const INTEGRATION_EVENTS_ON_MORTGAGE_APPLICATION_FIELD_ID =
  '6b6d0000-4000-4000-8000-000000000019';

export default defineField({
  universalIdentifier: INTEGRATION_EVENTS_ON_MORTGAGE_APPLICATION_FIELD_ID,
  objectUniversalIdentifier: MORTGAGE_APPLICATION_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'integrationEvents',
  label: 'Integration events',
  icon: 'IconWebhook',
  relationTargetObjectMetadataUniversalIdentifier: INTEGRATION_EVENT_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    MORTGAGE_APPLICATION_ON_INTEGRATION_EVENT_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
