import { FieldType, defineObject } from 'twenty-sdk/define';

export const INTEGRATION_EVENT_OBJECT_ID =
  '6b6d0000-1a00-4000-8000-000000000001';
export const INTEGRATION_EVENT_NAME_FIELD_ID =
  '6b6d0000-1a00-4000-8000-000000000002';

export default defineObject({
  universalIdentifier: INTEGRATION_EVENT_OBJECT_ID,
  nameSingular: 'integrationEvent',
  namePlural: 'integrationEvents',
  labelSingular: 'Integration event',
  labelPlural: 'Integration events',
  description:
    'Append-only external status, sync, and error event summary for integrations.',
  icon: 'IconWebhook',
  labelIdentifierFieldMetadataUniversalIdentifier: INTEGRATION_EVENT_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: INTEGRATION_EVENT_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'eventName',
      label: 'Event name',
      icon: 'IconAbc',
    },
    {
      universalIdentifier: '6b6d0000-1a00-4000-8000-000000000003',
      type: FieldType.SELECT,
      name: 'sourceSystem',
      label: 'Source system',
      icon: 'IconPlug',
      options: [
        { value: 'CLIENT_PORTAL', label: 'Client portal', position: 0, color: 'blue' },
        { value: 'APPLYONLINE', label: 'ApplyOnline', position: 1, color: 'green' },
        { value: 'AFG_FLEX', label: 'AFG Flex', position: 2, color: 'blue' },
        { value: 'AFG', label: 'AFG', position: 3, color: 'purple' },
        { value: 'BROKERENGINE', label: 'BrokerEngine', position: 4, color: 'purple' },
        { value: 'SPECIALIST_PROVIDER', label: 'Specialist provider', position: 5, color: 'orange' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1a00-4000-8000-000000000004',
      type: FieldType.SELECT,
      name: 'eventStatus',
      label: 'Event status',
      icon: 'IconActivity',
      options: [
        { value: 'RECEIVED', label: 'Received', position: 0, color: 'blue' },
        { value: 'PROCESSED', label: 'Processed', position: 1, color: 'green' },
        { value: 'RETRYING', label: 'Retrying', position: 2, color: 'orange' },
        { value: 'FAILED', label: 'Failed', position: 3, color: 'red' },
        { value: 'IGNORED', label: 'Ignored', position: 4, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1a00-4000-8000-000000000005',
      type: FieldType.DATE_TIME,
      name: 'sourceTimestamp',
      label: 'Source timestamp',
      icon: 'IconClock',
    },
    {
      universalIdentifier: '6b6d0000-1a00-4000-8000-000000000006',
      type: FieldType.TEXT,
      name: 'safeSummary',
      label: 'Safe summary',
      icon: 'IconNotes',
    },
  ],
});
