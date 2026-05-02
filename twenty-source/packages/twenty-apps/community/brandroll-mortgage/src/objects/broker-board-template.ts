import { FieldType, defineObject } from 'twenty-sdk/define';

export const BROKER_BOARD_TEMPLATE_OBJECT_ID =
  '6b6d0000-3310-4000-8000-000000000001';
export const BROKER_BOARD_TEMPLATE_NAME_FIELD_ID =
  '6b6d0000-3310-4000-8000-000000000002';
export const BROKER_BOARD_TEMPLATE_TYPE_FIELD_ID =
  '6b6d0000-3310-4000-8000-000000000003';
export const BROKER_BOARD_TEMPLATE_STATUS_FIELD_ID =
  '6b6d0000-3310-4000-8000-000000000004';

export default defineObject({
  universalIdentifier: BROKER_BOARD_TEMPLATE_OBJECT_ID,
  nameSingular: 'brokerBoardTemplate',
  namePlural: 'brokerBoardTemplates',
  labelSingular: 'Broker board template',
  labelPlural: 'Broker board templates',
  description:
    'BrokerEngine-style board configuration for leads, deals, maintenance, construction, asset finance, and partnerships.',
  icon: 'IconLayoutKanban',
  labelIdentifierFieldMetadataUniversalIdentifier:
    BROKER_BOARD_TEMPLATE_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: BROKER_BOARD_TEMPLATE_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'boardName',
      label: 'Board name',
      icon: 'IconLayoutKanban',
    },
    {
      universalIdentifier: BROKER_BOARD_TEMPLATE_TYPE_FIELD_ID,
      type: FieldType.SELECT,
      name: 'boardType',
      label: 'Board type',
      icon: 'IconCategory',
      options: [
        { value: 'LEAD', label: 'Lead', position: 0, color: 'gray' },
        { value: 'DEAL', label: 'Deal', position: 1, color: 'blue' },
        { value: 'MAINTENANCE', label: 'Maintenance', position: 2, color: 'orange' },
        { value: 'CONSTRUCTION', label: 'Construction', position: 3, color: 'yellow' },
        { value: 'ASSET_FINANCE', label: 'Asset finance', position: 4, color: 'purple' },
        { value: 'PARTNERSHIPS', label: 'Partnerships', position: 5, color: 'green' },
        { value: 'COMMERCIAL_LENDING', label: 'Commercial lending', position: 6, color: 'blue' },
        { value: 'BUSINESS_LENDING', label: 'Business lending', position: 7, color: 'orange' },
        { value: 'CUSTOM', label: 'Custom', position: 8, color: 'gray' },
      ],
    },
    {
      universalIdentifier: BROKER_BOARD_TEMPLATE_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'boardStatus',
      label: 'Status',
      icon: 'IconProgress',
      options: [
        { value: 'DRAFT', label: 'Draft', position: 0, color: 'gray' },
        { value: 'ACTIVE', label: 'Active', position: 1, color: 'green' },
        { value: 'ARCHIVED', label: 'Archived', position: 2, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-3310-4000-8000-000000000005',
      type: FieldType.TEXT,
      name: 'sourceSystem',
      label: 'Source system',
      icon: 'IconDatabaseImport',
    },
    {
      universalIdentifier: '6b6d0000-3310-4000-8000-000000000006',
      type: FieldType.TEXT,
      name: 'sourceBoardId',
      label: 'Source board ID',
      icon: 'IconId',
    },
    {
      universalIdentifier: '6b6d0000-3310-4000-8000-000000000007',
      type: FieldType.BOOLEAN,
      name: 'collapseEmptyStagesByDefault',
      label: 'Collapse empty stages by default',
      icon: 'IconLayoutSidebarRightCollapse',
    },
    {
      universalIdentifier: '6b6d0000-3310-4000-8000-000000000008',
      type: FieldType.BOOLEAN,
      name: 'supportsBulkEdit',
      label: 'Supports bulk edit',
      icon: 'IconEdit',
    },
    {
      universalIdentifier: '6b6d0000-3310-4000-8000-000000000009',
      type: FieldType.BOOLEAN,
      name: 'supportsListAndKanban',
      label: 'Supports list and kanban',
      icon: 'IconTable',
    },
    {
      universalIdentifier: '6b6d0000-3310-4000-8000-000000000010',
      type: FieldType.TEXT,
      name: 'defaultFilters',
      label: 'Default filters',
      icon: 'IconFilter',
    },
    {
      universalIdentifier: '6b6d0000-3310-4000-8000-000000000011',
      type: FieldType.TEXT,
      name: 'defaultColumns',
      label: 'Default columns',
      icon: 'IconColumns',
    },
    {
      universalIdentifier: '6b6d0000-3310-4000-8000-000000000012',
      type: FieldType.TEXT,
      name: 'notes',
      label: 'Notes',
      icon: 'IconNotes',
    },
  ],
});
