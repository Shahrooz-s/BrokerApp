import { FieldType, defineObject } from 'twenty-sdk/define';

export const BROKER_FORM_TEMPLATE_OBJECT_ID =
  '6b6d0000-2f00-4000-8000-000000000001';
export const BROKER_FORM_TEMPLATE_NAME_FIELD_ID =
  '6b6d0000-2f00-4000-8000-000000000002';
export const BROKER_FORM_TEMPLATE_TYPE_FIELD_ID =
  '6b6d0000-2f00-4000-8000-000000000003';
export const BROKER_FORM_TEMPLATE_STATUS_FIELD_ID =
  '6b6d0000-2f00-4000-8000-000000000004';
export const BROKER_FORM_TEMPLATE_PROVIDER_FIELD_ID =
  '6b6d0000-2f00-4000-8000-000000000005';
export const BROKER_FORM_TEMPLATE_VERSION_FIELD_ID =
  '6b6d0000-2f00-4000-8000-000000000009';
export const BROKER_FORM_TEMPLATE_DEFAULT_FIELD_ID =
  '6b6d0000-2f00-4000-8000-000000000012';
export const BROKER_FORM_TEMPLATE_PUBLISHED_AT_FIELD_ID =
  '6b6d0000-2f00-4000-8000-000000000018';

export default defineObject({
  universalIdentifier: BROKER_FORM_TEMPLATE_OBJECT_ID,
  nameSingular: 'brokerFormTemplate',
  namePlural: 'brokerFormTemplates',
  labelSingular: 'Broker form template',
  labelPlural: 'Broker form templates',
  description:
    'Broker Settings record for OpnForm or external form templates used by fact find, consent, and portal workflows.',
  icon: 'IconSettingsAutomation',
  labelIdentifierFieldMetadataUniversalIdentifier:
    BROKER_FORM_TEMPLATE_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: BROKER_FORM_TEMPLATE_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'templateName',
      label: 'Template name',
      icon: 'IconForms',
    },
    {
      universalIdentifier: BROKER_FORM_TEMPLATE_TYPE_FIELD_ID,
      type: FieldType.SELECT,
      name: 'templateType',
      label: 'Template type',
      icon: 'IconCategory',
      options: [
        { value: 'FACT_FIND', label: 'Fact find', position: 0, color: 'blue' },
        { value: 'CREDIT_GUIDE_CONSENT', label: 'Credit guide consent', position: 1, color: 'purple' },
        { value: 'PRIVACY_CONSENT', label: 'Privacy consent', position: 2, color: 'purple' },
        { value: 'DOCUMENT_REQUEST', label: 'Document request', position: 3, color: 'orange' },
        { value: 'SERVICEABILITY_INTAKE', label: 'Serviceability intake', position: 4, color: 'green' },
        { value: 'REVIEW', label: 'Review', position: 5, color: 'yellow' },
        { value: 'OTHER', label: 'Other', position: 6, color: 'gray' },
      ],
    },
    {
      universalIdentifier: BROKER_FORM_TEMPLATE_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'templateStatus',
      label: 'Status',
      icon: 'IconProgress',
      options: [
        { value: 'DRAFT', label: 'Draft', position: 0, color: 'gray' },
        { value: 'TESTING', label: 'Testing', position: 1, color: 'orange' },
        { value: 'PUBLISHED', label: 'Published', position: 2, color: 'green' },
        { value: 'RETIRED', label: 'Retired', position: 3, color: 'red' },
        { value: 'ARCHIVED', label: 'Archived', position: 4, color: 'gray' },
      ],
    },
    {
      universalIdentifier: BROKER_FORM_TEMPLATE_PROVIDER_FIELD_ID,
      type: FieldType.SELECT,
      name: 'formProvider',
      label: 'Form provider',
      icon: 'IconForms',
      options: [
        { value: 'OPNFORM', label: 'OpnForm', position: 0, color: 'green' },
        { value: 'CUSTOM_PORTAL', label: 'Custom portal', position: 1, color: 'purple' },
        { value: 'FORM_IO', label: 'Form.io', position: 2, color: 'blue' },
        { value: 'BROKERENGINE', label: 'BrokerEngine', position: 3, color: 'orange' },
        { value: 'OTHER', label: 'Other', position: 4, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-2f00-4000-8000-000000000006',
      type: FieldType.TEXT,
      name: 'opnformWorkspaceId',
      label: 'OpnForm workspace ID',
      icon: 'IconForms',
    },
    {
      universalIdentifier: '6b6d0000-2f00-4000-8000-000000000007',
      type: FieldType.TEXT,
      name: 'externalFormId',
      label: 'External form ID',
      icon: 'IconId',
    },
    {
      universalIdentifier: '6b6d0000-2f00-4000-8000-000000000008',
      type: FieldType.TEXT,
      name: 'externalFormSlug',
      label: 'External form slug',
      icon: 'IconLink',
    },
    {
      universalIdentifier: BROKER_FORM_TEMPLATE_VERSION_FIELD_ID,
      type: FieldType.TEXT,
      name: 'formVersion',
      label: 'Form version',
      icon: 'IconVersions',
    },
    {
      universalIdentifier: '6b6d0000-2f00-4000-8000-000000000010',
      type: FieldType.TEXT,
      name: 'builderUrl',
      label: 'Builder URL',
      icon: 'IconExternalLink',
      description:
        'Admin URL for editing this template in OpnForm or the chosen form builder.',
    },
    {
      universalIdentifier: '6b6d0000-2f00-4000-8000-000000000011',
      type: FieldType.TEXT,
      name: 'portalEmbedUrl',
      label: 'Portal embed URL',
      icon: 'IconWorldWww',
      description:
        'Borrower-facing URL or embed URL used by the client portal after publication.',
    },
    {
      universalIdentifier: BROKER_FORM_TEMPLATE_DEFAULT_FIELD_ID,
      type: FieldType.BOOLEAN,
      name: 'isDefaultForType',
      label: 'Default for type',
      icon: 'IconCircleCheck',
    },
    {
      universalIdentifier: '6b6d0000-2f00-4000-8000-000000000013',
      type: FieldType.BOOLEAN,
      name: 'supportsPartialSubmissions',
      label: 'Supports partial submissions',
      icon: 'IconDeviceFloppy',
    },
    {
      universalIdentifier: '6b6d0000-2f00-4000-8000-000000000014',
      type: FieldType.BOOLEAN,
      name: 'supportsEditableSubmissions',
      label: 'Supports editable submissions',
      icon: 'IconEdit',
    },
    {
      universalIdentifier: '6b6d0000-2f00-4000-8000-000000000015',
      type: FieldType.BOOLEAN,
      name: 'webhookConfigured',
      label: 'Webhook configured',
      icon: 'IconWebhook',
    },
    {
      universalIdentifier: '6b6d0000-2f00-4000-8000-000000000016',
      type: FieldType.TEXT,
      name: 'mappingProfileReference',
      label: 'Mapping profile reference',
      icon: 'IconRoute',
      description:
        'Portal backend mapping profile used to normalize form submissions into Twenty records.',
    },
    {
      universalIdentifier: '6b6d0000-2f00-4000-8000-000000000017',
      type: FieldType.TEXT,
      name: 'schemaSnapshotReference',
      label: 'Schema snapshot reference',
      icon: 'IconJson',
    },
    {
      universalIdentifier: BROKER_FORM_TEMPLATE_PUBLISHED_AT_FIELD_ID,
      type: FieldType.DATE_TIME,
      name: 'publishedAt',
      label: 'Published at',
      icon: 'IconCalendarCheck',
    },
    {
      universalIdentifier: '6b6d0000-2f00-4000-8000-000000000019',
      type: FieldType.DATE_TIME,
      name: 'retiredAt',
      label: 'Retired at',
      icon: 'IconCalendarOff',
    },
    {
      universalIdentifier: '6b6d0000-2f00-4000-8000-000000000020',
      type: FieldType.TEXT,
      name: 'notes',
      label: 'Notes',
      icon: 'IconNotes',
    },
  ],
});
