import { FieldType, defineObject } from 'twenty-sdk/define';

export const BROKER_STAGE_TEMPLATE_OBJECT_ID =
  '6b6d0000-3320-4000-8000-000000000001';
export const BROKER_STAGE_TEMPLATE_NAME_FIELD_ID =
  '6b6d0000-3320-4000-8000-000000000002';
export const BROKER_STAGE_TEMPLATE_BOARD_FIELD_ID =
  '6b6d0000-3320-4000-8000-000000000003';
export const BROKER_STAGE_TEMPLATE_POSITION_FIELD_ID =
  '6b6d0000-3320-4000-8000-000000000004';
export const BROKER_STAGE_TEMPLATE_DUE_DAYS_FIELD_ID =
  '6b6d0000-3320-4000-8000-000000000006';
export const BROKER_STAGE_TEMPLATE_AMBER_DAYS_FIELD_ID =
  '6b6d0000-3320-4000-8000-000000000007';
export const BROKER_STAGE_TEMPLATE_RED_DAYS_FIELD_ID =
  '6b6d0000-3320-4000-8000-000000000008';
export const BROKER_STAGE_TEMPLATE_DUE_TASK_FIELD_ID =
  '6b6d0000-3320-4000-8000-000000000009';

export default defineObject({
  universalIdentifier: BROKER_STAGE_TEMPLATE_OBJECT_ID,
  nameSingular: 'brokerStageTemplate',
  namePlural: 'brokerStageTemplates',
  labelSingular: 'Broker stage template',
  labelPlural: 'Broker stage templates',
  description:
    'Stage definitions for BrokerApp boards, including due-date thresholds and automation flags.',
  icon: 'IconProgress',
  labelIdentifierFieldMetadataUniversalIdentifier:
    BROKER_STAGE_TEMPLATE_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: BROKER_STAGE_TEMPLATE_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'stageName',
      label: 'Stage name',
      icon: 'IconProgress',
    },
    {
      universalIdentifier: BROKER_STAGE_TEMPLATE_BOARD_FIELD_ID,
      type: FieldType.SELECT,
      name: 'boardType',
      label: 'Board type',
      icon: 'IconLayoutKanban',
      options: [
        { value: 'LEAD', label: 'Lead', position: 0, color: 'gray' },
        { value: 'DEAL', label: 'Deal', position: 1, color: 'blue' },
        { value: 'MAINTENANCE', label: 'Maintenance', position: 2, color: 'orange' },
        { value: 'CONSTRUCTION', label: 'Construction', position: 3, color: 'yellow' },
        { value: 'ASSET_FINANCE', label: 'Asset finance', position: 4, color: 'purple' },
        { value: 'PARTNERSHIPS', label: 'Partnerships', position: 5, color: 'green' },
        { value: 'COMMERCIAL_LENDING', label: 'Commercial lending', position: 6, color: 'blue' },
        { value: 'BUSINESS_LENDING', label: 'Business lending', position: 7, color: 'orange' },
      ],
    },
    {
      universalIdentifier: BROKER_STAGE_TEMPLATE_POSITION_FIELD_ID,
      type: FieldType.NUMBER,
      name: 'stagePosition',
      label: 'Stage position',
      icon: 'IconSortAscending',
    },
    {
      universalIdentifier: '6b6d0000-3320-4000-8000-000000000005',
      type: FieldType.TEXT,
      name: 'stageMapping',
      label: 'Stage mapping',
      icon: 'IconRoute',
      description:
        'Canonical stage mapping used for reporting, ApplyOnline/AFG sync, and workflow gates.',
    },
    {
      universalIdentifier: BROKER_STAGE_TEMPLATE_DUE_DAYS_FIELD_ID,
      type: FieldType.NUMBER,
      name: 'stageDueDays',
      label: 'Stage due days',
      icon: 'IconCalendarDue',
    },
    {
      universalIdentifier: BROKER_STAGE_TEMPLATE_AMBER_DAYS_FIELD_ID,
      type: FieldType.NUMBER,
      name: 'turnAmberDays',
      label: 'Turn amber',
      icon: 'IconAlertTriangle',
    },
    {
      universalIdentifier: BROKER_STAGE_TEMPLATE_RED_DAYS_FIELD_ID,
      type: FieldType.NUMBER,
      name: 'turnRedDays',
      label: 'Turn red',
      icon: 'IconAlertCircle',
    },
    {
      universalIdentifier: BROKER_STAGE_TEMPLATE_DUE_TASK_FIELD_ID,
      type: FieldType.BOOLEAN,
      name: 'addStageDueTask',
      label: 'Add stage due task',
      icon: 'IconChecklist',
    },
    {
      universalIdentifier: '6b6d0000-3320-4000-8000-000000000010',
      type: FieldType.BOOLEAN,
      name: 'triggerWorkflowOnEntry',
      label: 'Trigger workflow on entry',
      icon: 'IconAutomation',
    },
    {
      universalIdentifier: '6b6d0000-3320-4000-8000-000000000011',
      type: FieldType.BOOLEAN,
      name: 'triggerWorkflowOnExit',
      label: 'Trigger workflow on exit',
      icon: 'IconAutomation',
    },
    {
      universalIdentifier: '6b6d0000-3320-4000-8000-000000000012',
      type: FieldType.TEXT,
      name: 'defaultTaskTemplate',
      label: 'Default task template',
      icon: 'IconClipboardList',
    },
    {
      universalIdentifier: '6b6d0000-3320-4000-8000-000000000013',
      type: FieldType.TEXT,
      name: 'defaultEmailTemplate',
      label: 'Default email template',
      icon: 'IconMail',
    },
    {
      universalIdentifier: '6b6d0000-3320-4000-8000-000000000014',
      type: FieldType.TEXT,
      name: 'entryGate',
      label: 'Entry gate',
      icon: 'IconShieldCheck',
    },
    {
      universalIdentifier: '6b6d0000-3320-4000-8000-000000000015',
      type: FieldType.TEXT,
      name: 'exitGate',
      label: 'Exit gate',
      icon: 'IconDoorExit',
    },
    {
      universalIdentifier: '6b6d0000-3320-4000-8000-000000000016',
      type: FieldType.TEXT,
      name: 'notes',
      label: 'Notes',
      icon: 'IconNotes',
    },
  ],
});
