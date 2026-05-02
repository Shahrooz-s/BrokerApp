import { FieldType, defineObject } from 'twenty-sdk/define';

export const DEAL_CHECKLIST_ITEM_OBJECT_ID =
  '6b6d0000-4730-4000-8000-000000000001';
export const DEAL_CHECKLIST_ITEM_NAME_FIELD_ID =
  '6b6d0000-4730-4000-8000-000000000002';
export const DEAL_CHECKLIST_ITEM_STATUS_FIELD_ID =
  '6b6d0000-4730-4000-8000-000000000003';
export const DEAL_CHECKLIST_ITEM_REFERENCE_FIELD_ID =
  '6b6d0000-4730-4000-8000-000000000004';
export const DEAL_CHECKLIST_ITEM_ASSIGNEE_ROLE_FIELD_ID =
  '6b6d0000-4730-4000-8000-000000000007';
export const DEAL_CHECKLIST_ITEM_DUE_DATE_FIELD_ID =
  '6b6d0000-4730-4000-8000-000000000008';

export default defineObject({
  universalIdentifier: DEAL_CHECKLIST_ITEM_OBJECT_ID,
  nameSingular: 'dealChecklistItem',
  namePlural: 'dealChecklistItems',
  labelSingular: 'Deal checklist item',
  labelPlural: 'Deal checklist items',
  description:
    'Checklist item instance with answer, evidence reference, exception reason, assignee, and audit fields.',
  icon: 'IconListDetails',
  labelIdentifierFieldMetadataUniversalIdentifier:
    DEAL_CHECKLIST_ITEM_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: DEAL_CHECKLIST_ITEM_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'itemName',
      label: 'Item name',
      icon: 'IconListDetails',
    },
    {
      universalIdentifier: DEAL_CHECKLIST_ITEM_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'itemStatus',
      label: 'Status',
      icon: 'IconProgress',
      options: [
        { value: 'OPEN', label: 'Open', position: 0, color: 'gray' },
        { value: 'IN_PROGRESS', label: 'In progress', position: 1, color: 'blue' },
        { value: 'COMPLETE', label: 'Complete', position: 2, color: 'green' },
        { value: 'EXCEPTION_REQUESTED', label: 'Exception requested', position: 3, color: 'orange' },
        { value: 'WAIVED', label: 'Waived', position: 4, color: 'yellow' },
        { value: 'BLOCKED', label: 'Blocked', position: 5, color: 'red' },
      ],
    },
    {
      universalIdentifier: DEAL_CHECKLIST_ITEM_REFERENCE_FIELD_ID,
      type: FieldType.TEXT,
      name: 'dealChecklistReference',
      label: 'Deal checklist reference',
      icon: 'IconChecklist',
    },
    {
      universalIdentifier: '6b6d0000-4730-4000-8000-000000000005',
      type: FieldType.TEXT,
      name: 'answerValue',
      label: 'Answer value',
      icon: 'IconForms',
    },
    {
      universalIdentifier: '6b6d0000-4730-4000-8000-000000000006',
      type: FieldType.TEXT,
      name: 'evidenceReference',
      label: 'Evidence reference',
      icon: 'IconFileCheck',
    },
    {
      universalIdentifier: DEAL_CHECKLIST_ITEM_ASSIGNEE_ROLE_FIELD_ID,
      type: FieldType.TEXT,
      name: 'assigneeRole',
      label: 'Assignee role',
      icon: 'IconUser',
    },
    {
      universalIdentifier: DEAL_CHECKLIST_ITEM_DUE_DATE_FIELD_ID,
      type: FieldType.DATE,
      name: 'dueDate',
      label: 'Due date',
      icon: 'IconCalendarDue',
    },
    {
      universalIdentifier: '6b6d0000-4730-4000-8000-000000000009',
      type: FieldType.TEXT,
      name: 'exceptionReason',
      label: 'Exception reason',
      icon: 'IconAlertTriangle',
    },
    {
      universalIdentifier: '6b6d0000-4730-4000-8000-000000000010',
      type: FieldType.DATE_TIME,
      name: 'completedAt',
      label: 'Completed at',
      icon: 'IconClockCheck',
    },
    {
      universalIdentifier: '6b6d0000-4730-4000-8000-000000000011',
      type: FieldType.TEXT,
      name: 'auditSummary',
      label: 'Audit summary',
      icon: 'IconHistory',
    },
  ],
});
