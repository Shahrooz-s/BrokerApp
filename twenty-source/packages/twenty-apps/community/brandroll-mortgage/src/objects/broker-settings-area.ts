import { FieldType, defineObject } from 'twenty-sdk/define';

export const BROKER_SETTINGS_AREA_OBJECT_ID =
  '6b6d0000-3340-4000-8000-000000000001';
export const BROKER_SETTINGS_AREA_NAME_FIELD_ID =
  '6b6d0000-3340-4000-8000-000000000002';
export const BROKER_SETTINGS_AREA_GROUP_FIELD_ID =
  '6b6d0000-3340-4000-8000-000000000003';
export const BROKER_SETTINGS_AREA_STATUS_FIELD_ID =
  '6b6d0000-3340-4000-8000-000000000004';
export const BROKER_SETTINGS_AREA_POSITION_FIELD_ID =
  '6b6d0000-3340-4000-8000-000000000005';

export default defineObject({
  universalIdentifier: BROKER_SETTINGS_AREA_OBJECT_ID,
  nameSingular: 'brokerSettingsArea',
  namePlural: 'brokerSettingsAreas',
  labelSingular: 'Broker settings area',
  labelPlural: 'Broker settings areas',
  description:
    'BrokerApp settings map for lenders, products, templates, boards, fact find, smart docs, integrations, and AI-assisted broker workflow.',
  icon: 'IconSettings',
  labelIdentifierFieldMetadataUniversalIdentifier:
    BROKER_SETTINGS_AREA_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: BROKER_SETTINGS_AREA_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'settingName',
      label: 'Setting name',
      icon: 'IconSettings',
    },
    {
      universalIdentifier: BROKER_SETTINGS_AREA_GROUP_FIELD_ID,
      type: FieldType.SELECT,
      name: 'settingArea',
      label: 'Setting area',
      icon: 'IconCategory',
      options: [
        { value: 'GENERAL', label: 'General', position: 0, color: 'gray' },
        { value: 'LENDERS', label: 'Lenders', position: 1, color: 'blue' },
        { value: 'PRODUCTS', label: 'Products', position: 2, color: 'green' },
        { value: 'WORKFLOW', label: 'Workflow', position: 3, color: 'purple' },
        { value: 'TEMPLATES', label: 'Templates', position: 4, color: 'yellow' },
        { value: 'BOARDS', label: 'Boards', position: 5, color: 'orange' },
        { value: 'FACT_FIND', label: 'Fact find', position: 6, color: 'blue' },
        { value: 'SMART_DOCS', label: 'Smart docs', position: 7, color: 'purple' },
        { value: 'COMPLIANCE', label: 'Compliance', position: 8, color: 'red' },
        { value: 'INTEGRATIONS', label: 'Integrations', position: 9, color: 'green' },
        { value: 'SECURITY', label: 'Security', position: 10, color: 'red' },
        { value: 'CLIENT_PORTAL', label: 'Client portal', position: 11, color: 'blue' },
        { value: 'AI', label: 'AI', position: 12, color: 'purple' },
      ],
    },
    {
      universalIdentifier: BROKER_SETTINGS_AREA_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'implementationStatus',
      label: 'Implementation status',
      icon: 'IconProgress',
      options: [
        { value: 'OBSERVED', label: 'Observed', position: 0, color: 'blue' },
        { value: 'MODELLED', label: 'Modelled', position: 1, color: 'green' },
        { value: 'DRAFT', label: 'Draft', position: 2, color: 'orange' },
        { value: 'BLOCKED', label: 'Blocked', position: 3, color: 'red' },
        { value: 'FUTURE', label: 'Future', position: 4, color: 'gray' },
      ],
    },
    {
      universalIdentifier: BROKER_SETTINGS_AREA_POSITION_FIELD_ID,
      type: FieldType.NUMBER,
      name: 'position',
      label: 'Position',
      icon: 'IconSortAscending',
    },
    {
      universalIdentifier: '6b6d0000-3340-4000-8000-000000000006',
      type: FieldType.TEXT,
      name: 'brokerEngineReference',
      label: 'BrokerEngine reference',
      icon: 'IconExternalLink',
      description:
        'Observed BrokerEngine setting, page, or workflow concept used as migration reference.',
    },
    {
      universalIdentifier: '6b6d0000-3340-4000-8000-000000000007',
      type: FieldType.TEXT,
      name: 'brokerAppImprovement',
      label: 'BrokerApp improvement',
      icon: 'IconSparkles',
      description:
        'How BrokerApp should improve the observed workflow for brokers, loan processors, and clients.',
    },
    {
      universalIdentifier: '6b6d0000-3340-4000-8000-000000000008',
      type: FieldType.SELECT,
      name: 'ownerRole',
      label: 'Owner role',
      icon: 'IconUserCog',
      options: [
        { value: 'BROKER_OWNER', label: 'Broker owner', position: 0, color: 'blue' },
        { value: 'ADMIN', label: 'Admin', position: 1, color: 'purple' },
        { value: 'LOAN_PROCESSOR', label: 'Loan processor', position: 2, color: 'green' },
        { value: 'COMPLIANCE', label: 'Compliance', position: 3, color: 'red' },
        { value: 'SYSTEM', label: 'System', position: 4, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-3340-4000-8000-000000000009',
      type: FieldType.TEXT,
      name: 'notes',
      label: 'Notes',
      icon: 'IconNotes',
    },
  ],
});
