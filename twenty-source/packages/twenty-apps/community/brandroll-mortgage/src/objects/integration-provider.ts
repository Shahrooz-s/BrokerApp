import { FieldType, defineObject } from 'twenty-sdk/define';

export const INTEGRATION_PROVIDER_OBJECT_ID =
  '6b6d0000-4900-4000-8000-000000000001';
export const INTEGRATION_PROVIDER_NAME_FIELD_ID =
  '6b6d0000-4900-4000-8000-000000000002';
export const INTEGRATION_PROVIDER_STATUS_FIELD_ID =
  '6b6d0000-4900-4000-8000-000000000003';

export default defineObject({
  universalIdentifier: INTEGRATION_PROVIDER_OBJECT_ID,
  nameSingular: 'integrationProvider',
  namePlural: 'integrationProviders',
  labelSingular: 'Integration provider',
  labelPlural: 'Integration providers',
  description:
    'Provider registry for portal auth, IDV, open banking, bank statements, ApplyOnline, AFG, BrokerEngine, email, storage, and product imports.',
  icon: 'IconPlugConnected',
  labelIdentifierFieldMetadataUniversalIdentifier:
    INTEGRATION_PROVIDER_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: INTEGRATION_PROVIDER_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'providerName',
      label: 'Provider name',
      icon: 'IconPlugConnected',
    },
    {
      universalIdentifier: INTEGRATION_PROVIDER_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'providerStatus',
      label: 'Status',
      icon: 'IconProgress',
      options: [
        { value: 'PLANNED', label: 'Planned', position: 0, color: 'gray' },
        { value: 'NEEDS_KEYS', label: 'Needs keys', position: 1, color: 'orange' },
        { value: 'SANDBOX_READY', label: 'Sandbox ready', position: 2, color: 'blue' },
        { value: 'PRODUCTION_READY', label: 'Production ready', position: 3, color: 'green' },
        { value: 'DISABLED', label: 'Disabled', position: 4, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4900-4000-8000-000000000004',
      type: FieldType.SELECT,
      name: 'providerCategory',
      label: 'Provider category',
      icon: 'IconCategory',
      options: [
        { value: 'PORTAL_AUTH', label: 'Portal auth', position: 0, color: 'green' },
        { value: 'IDV_KYC', label: 'IDV/KYC', position: 1, color: 'blue' },
        { value: 'OPEN_BANKING', label: 'Open banking', position: 2, color: 'green' },
        { value: 'BANK_STATEMENT', label: 'Bank statement', position: 3, color: 'purple' },
        { value: 'LODGEMENT', label: 'Lodgement', position: 4, color: 'orange' },
        { value: 'PRODUCT_DATA', label: 'Product data', position: 5, color: 'yellow' },
        { value: 'EMAIL', label: 'Email', position: 6, color: 'blue' },
        { value: 'STORAGE', label: 'Storage', position: 7, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4900-4000-8000-000000000005',
      type: FieldType.TEXT,
      name: 'baseUrl',
      label: 'Base URL',
      icon: 'IconWorldWww',
    },
    {
      universalIdentifier: '6b6d0000-4900-4000-8000-000000000006',
      type: FieldType.TEXT,
      name: 'authMethod',
      label: 'Auth method',
      icon: 'IconKey',
    },
    {
      universalIdentifier: '6b6d0000-4900-4000-8000-000000000007',
      type: FieldType.TEXT,
      name: 'secretEnvNames',
      label: 'Secret env names',
      icon: 'IconVariable',
      description:
        'Names of required environment variables only. Never store API keys or secrets in GitHub.',
    },
    {
      universalIdentifier: '6b6d0000-4900-4000-8000-000000000008',
      type: FieldType.BOOLEAN,
      name: 'noSmsOtpRequired',
      label: 'No SMS OTP required',
      icon: 'IconMessageOff',
    },
    {
      universalIdentifier: '6b6d0000-4900-4000-8000-000000000009',
      type: FieldType.TEXT,
      name: 'implementationNotes',
      label: 'Implementation notes',
      icon: 'IconNotes',
    },
  ],
});
