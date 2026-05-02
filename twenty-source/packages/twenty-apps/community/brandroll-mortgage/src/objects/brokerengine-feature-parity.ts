import { FieldType, defineObject } from 'twenty-sdk/define';

export const BROKERENGINE_FEATURE_PARITY_OBJECT_ID =
  '6b6d0000-4930-4000-8000-000000000001';
export const BROKERENGINE_FEATURE_PARITY_NAME_FIELD_ID =
  '6b6d0000-4930-4000-8000-000000000002';
export const BROKERENGINE_FEATURE_PARITY_AREA_FIELD_ID =
  '6b6d0000-4930-4000-8000-000000000003';
export const BROKERENGINE_FEATURE_PARITY_STATUS_FIELD_ID =
  '6b6d0000-4930-4000-8000-000000000004';
export const BROKERENGINE_FEATURE_PARITY_PRIVATE_IMPORT_FIELD_ID =
  '6b6d0000-4930-4000-8000-000000000006';
export const BROKERENGINE_FEATURE_PARITY_PROVIDER_API_FIELD_ID =
  '6b6d0000-4930-4000-8000-000000000007';
export const BROKERENGINE_FEATURE_PARITY_WORKSPACE_LOGIN_FIELD_ID =
  '6b6d0000-4930-4000-8000-000000000008';
export const BROKERENGINE_FEATURE_PARITY_PRODUCTION_READY_FIELD_ID =
  '6b6d0000-4930-4000-8000-000000000009';

export default defineObject({
  universalIdentifier: BROKERENGINE_FEATURE_PARITY_OBJECT_ID,
  nameSingular: 'brokerEngineFeatureParity',
  namePlural: 'brokerEngineFeatureParities',
  labelSingular: 'BrokerEngine feature parity',
  labelPlural: 'BrokerEngine feature parity',
  description:
    'Internal BrokerApp coverage register for BrokerEngine-style features, private imports, provider dependencies, and pilot readiness.',
  icon: 'IconClipboardCheck',
  labelIdentifierFieldMetadataUniversalIdentifier:
    BROKERENGINE_FEATURE_PARITY_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: BROKERENGINE_FEATURE_PARITY_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'featureName',
      label: 'Feature name',
      icon: 'IconClipboardCheck',
    },
    {
      universalIdentifier: BROKERENGINE_FEATURE_PARITY_AREA_FIELD_ID,
      type: FieldType.SELECT,
      name: 'featureArea',
      label: 'Feature area',
      icon: 'IconCategory',
      options: [
        { value: 'BOARDS', label: 'Boards', position: 0, color: 'blue' },
        { value: 'DEALDASH', label: 'DealDash', position: 1, color: 'green' },
        { value: 'FACT_FIND', label: 'Fact find', position: 2, color: 'purple' },
        { value: 'STRATEGY', label: 'Strategy', position: 3, color: 'yellow' },
        { value: 'PRODUCT_RESEARCH', label: 'Product research', position: 4, color: 'green' },
        { value: 'SERVICEABILITY', label: 'Serviceability', position: 5, color: 'orange' },
        { value: 'LODGEMENT', label: 'Lodgement', position: 6, color: 'blue' },
        { value: 'RIGHT_RAIL', label: 'Right rail', position: 7, color: 'purple' },
        { value: 'TEMPLATES', label: 'Templates', position: 8, color: 'yellow' },
        { value: 'CHECKLISTS', label: 'Checklists', position: 9, color: 'green' },
        { value: 'DOCUMENTS', label: 'Documents', position: 10, color: 'blue' },
        { value: 'SETTINGS', label: 'Settings', position: 11, color: 'gray' },
        { value: 'CLIENT_PORTAL', label: 'Client portal', position: 12, color: 'blue' },
        { value: 'AML_KYC', label: 'AML/KYC', position: 13, color: 'red' },
        { value: 'INTEGRATIONS', label: 'Integrations', position: 14, color: 'orange' },
        { value: 'WHITE_LABEL', label: 'White-label', position: 15, color: 'purple' },
      ],
    },
    {
      universalIdentifier: BROKERENGINE_FEATURE_PARITY_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'parityStatus',
      label: 'Parity status',
      icon: 'IconProgress',
      options: [
        { value: 'SEEDED', label: 'Seeded', position: 0, color: 'green' },
        { value: 'MODELLED', label: 'Modelled', position: 1, color: 'blue' },
        { value: 'PRIVATE_IMPORT_REQUIRED', label: 'Private import required', position: 2, color: 'orange' },
        { value: 'WORKSPACE_CONFIG_REQUIRED', label: 'Workspace config required', position: 3, color: 'yellow' },
        { value: 'PROVIDER_REQUIRED', label: 'Provider required', position: 4, color: 'red' },
        { value: 'CUSTOM_UI_REQUIRED', label: 'Custom UI required', position: 5, color: 'purple' },
        { value: 'FUTURE_PHASE', label: 'Future phase', position: 6, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4930-4000-8000-000000000005',
      type: FieldType.TEXT,
      name: 'brokerAppImplementation',
      label: 'BrokerApp implementation',
      icon: 'IconRoute',
      description:
        'Where this feature lives in BrokerApp or what still has to be built for pilot parity.',
    },
    {
      universalIdentifier: BROKERENGINE_FEATURE_PARITY_PRIVATE_IMPORT_FIELD_ID,
      type: FieldType.BOOLEAN,
      name: 'privateImportRequired',
      label: 'Private import required',
      icon: 'IconLock',
      description:
        'True when full copied content must be imported into the private workspace instead of GitHub.',
    },
    {
      universalIdentifier: BROKERENGINE_FEATURE_PARITY_PROVIDER_API_FIELD_ID,
      type: FieldType.BOOLEAN,
      name: 'requiresProviderApi',
      label: 'Requires provider API',
      icon: 'IconPlugConnected',
    },
    {
      universalIdentifier: BROKERENGINE_FEATURE_PARITY_WORKSPACE_LOGIN_FIELD_ID,
      type: FieldType.BOOLEAN,
      name: 'requiresWorkspaceLogin',
      label: 'Requires workspace login',
      icon: 'IconLogin',
    },
    {
      universalIdentifier: BROKERENGINE_FEATURE_PARITY_PRODUCTION_READY_FIELD_ID,
      type: FieldType.BOOLEAN,
      name: 'productionReady',
      label: 'Production ready',
      icon: 'IconCircleCheck',
      description:
        'False until workspace configuration, privacy review, credentials, and acceptance testing are complete.',
    },
    {
      universalIdentifier: '6b6d0000-4930-4000-8000-000000000010',
      type: FieldType.TEXT,
      name: 'sourceReference',
      label: 'Source reference',
      icon: 'IconExternalLink',
      description:
        'Sanitized source reference. Do not store private screenshots, template bodies, or client records here.',
    },
    {
      universalIdentifier: '6b6d0000-4930-4000-8000-000000000011',
      type: FieldType.TEXT,
      name: 'nextPilotAction',
      label: 'Next pilot action',
      icon: 'IconPlayerTrackNext',
    },
    {
      universalIdentifier: '6b6d0000-4930-4000-8000-000000000012',
      type: FieldType.TEXT,
      name: 'notes',
      label: 'Notes',
      icon: 'IconNotes',
    },
  ],
});
