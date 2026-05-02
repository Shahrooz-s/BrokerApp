import { FieldType, defineObject } from 'twenty-sdk/define';

export const DEAL_WORKSPACE_TOOL_OBJECT_ID =
  '6b6d0000-3330-4000-8000-000000000001';
export const DEAL_WORKSPACE_TOOL_NAME_FIELD_ID =
  '6b6d0000-3330-4000-8000-000000000002';
export const DEAL_WORKSPACE_TOOL_AREA_FIELD_ID =
  '6b6d0000-3330-4000-8000-000000000003';
export const DEAL_WORKSPACE_TOOL_TYPE_FIELD_ID =
  '6b6d0000-3330-4000-8000-000000000004';
export const DEAL_WORKSPACE_TOOL_POSITION_FIELD_ID =
  '6b6d0000-3330-4000-8000-000000000005';
export const DEAL_WORKSPACE_TOOL_STATUS_FIELD_ID =
  '6b6d0000-3330-4000-8000-000000000006';

export default defineObject({
  universalIdentifier: DEAL_WORKSPACE_TOOL_OBJECT_ID,
  nameSingular: 'dealWorkspaceTool',
  namePlural: 'dealWorkspaceTools',
  labelSingular: 'Deal workspace tool',
  labelPlural: 'Deal workspace tools',
  description:
    'Configuration inventory for the deal sidebar, right rail, and Broker Settings areas.',
  icon: 'IconLayoutSidebarRight',
  labelIdentifierFieldMetadataUniversalIdentifier:
    DEAL_WORKSPACE_TOOL_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: DEAL_WORKSPACE_TOOL_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'toolName',
      label: 'Tool name',
      icon: 'IconTool',
    },
    {
      universalIdentifier: DEAL_WORKSPACE_TOOL_AREA_FIELD_ID,
      type: FieldType.SELECT,
      name: 'workspaceArea',
      label: 'Workspace area',
      icon: 'IconLayoutSidebarRight',
      options: [
        { value: 'OVERVIEW', label: 'Overview', position: 0, color: 'gray' },
        { value: 'FACT_FIND', label: 'Fact Find', position: 1, color: 'blue' },
        { value: 'STRATEGY', label: 'Strategy', position: 2, color: 'green' },
        { value: 'LODGEMENT', label: 'Lodgement', position: 3, color: 'purple' },
        { value: 'RIGHT_RAIL', label: 'Right rail', position: 4, color: 'orange' },
        { value: 'BROKER_SETTINGS', label: 'Broker Settings', position: 5, color: 'yellow' },
      ],
    },
    {
      universalIdentifier: DEAL_WORKSPACE_TOOL_TYPE_FIELD_ID,
      type: FieldType.SELECT,
      name: 'toolType',
      label: 'Tool type',
      icon: 'IconCategory',
      options: [
        { value: 'PAGE', label: 'Page', position: 0, color: 'blue' },
        { value: 'DRAWER', label: 'Drawer', position: 1, color: 'orange' },
        { value: 'REPORT', label: 'Report', position: 2, color: 'purple' },
        { value: 'WORKFLOW', label: 'Workflow', position: 3, color: 'green' },
        { value: 'SETTING', label: 'Setting', position: 4, color: 'yellow' },
        { value: 'INTEGRATION', label: 'Integration', position: 5, color: 'red' },
      ],
    },
    {
      universalIdentifier: DEAL_WORKSPACE_TOOL_POSITION_FIELD_ID,
      type: FieldType.NUMBER,
      name: 'position',
      label: 'Position',
      icon: 'IconSortAscending',
    },
    {
      universalIdentifier: DEAL_WORKSPACE_TOOL_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'toolStatus',
      label: 'Status',
      icon: 'IconProgress',
      options: [
        { value: 'DESIGNED', label: 'Designed', position: 0, color: 'blue' },
        { value: 'READY', label: 'Ready', position: 1, color: 'green' },
        { value: 'NEEDS_IMPLEMENTATION', label: 'Needs implementation', position: 2, color: 'orange' },
        { value: 'BLOCKED', label: 'Blocked', position: 3, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-3330-4000-8000-000000000007',
      type: FieldType.TEXT,
      name: 'recordOwner',
      label: 'Record owner',
      icon: 'IconDatabase',
      description:
        'Twenty object, built-in feature, external integration, or planned portal service that stores this tool data.',
    },
    {
      universalIdentifier: '6b6d0000-3330-4000-8000-000000000008',
      type: FieldType.BOOLEAN,
      name: 'shownInsideDeal',
      label: 'Shown inside deal',
      icon: 'IconLayoutDashboard',
    },
    {
      universalIdentifier: '6b6d0000-3330-4000-8000-000000000009',
      type: FieldType.BOOLEAN,
      name: 'shownInSettings',
      label: 'Shown in settings',
      icon: 'IconSettings',
    },
    {
      universalIdentifier: '6b6d0000-3330-4000-8000-000000000010',
      type: FieldType.TEXT,
      name: 'sourceReference',
      label: 'Source reference',
      icon: 'IconExternalLink',
    },
    {
      universalIdentifier: '6b6d0000-3330-4000-8000-000000000011',
      type: FieldType.TEXT,
      name: 'notes',
      label: 'Notes',
      icon: 'IconNotes',
    },
  ],
});
