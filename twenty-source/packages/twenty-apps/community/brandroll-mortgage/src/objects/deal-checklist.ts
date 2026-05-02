import { FieldType, defineObject } from 'twenty-sdk/define';

export const DEAL_CHECKLIST_OBJECT_ID =
  '6b6d0000-4720-4000-8000-000000000001';
export const DEAL_CHECKLIST_NAME_FIELD_ID =
  '6b6d0000-4720-4000-8000-000000000002';
export const DEAL_CHECKLIST_STATUS_FIELD_ID =
  '6b6d0000-4720-4000-8000-000000000003';

export default defineObject({
  universalIdentifier: DEAL_CHECKLIST_OBJECT_ID,
  nameSingular: 'dealChecklist',
  namePlural: 'dealChecklists',
  labelSingular: 'Deal checklist',
  labelPlural: 'Deal checklists',
  description:
    'Checklist instance applied to a live opportunity/deal, stage, lender, scenario, or compliance event.',
  icon: 'IconChecklist',
  labelIdentifierFieldMetadataUniversalIdentifier: DEAL_CHECKLIST_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: DEAL_CHECKLIST_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'checklistName',
      label: 'Checklist name',
      icon: 'IconChecklist',
    },
    {
      universalIdentifier: DEAL_CHECKLIST_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'checklistStatus',
      label: 'Status',
      icon: 'IconProgress',
      options: [
        { value: 'NOT_STARTED', label: 'Not started', position: 0, color: 'gray' },
        { value: 'IN_PROGRESS', label: 'In progress', position: 1, color: 'blue' },
        { value: 'BLOCKED', label: 'Blocked', position: 2, color: 'red' },
        { value: 'READY_FOR_REVIEW', label: 'Ready for review', position: 3, color: 'purple' },
        { value: 'COMPLETE', label: 'Complete', position: 4, color: 'green' },
        { value: 'WAIVED', label: 'Waived', position: 5, color: 'orange' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4720-4000-8000-000000000004',
      type: FieldType.TEXT,
      name: 'sourceTemplateReference',
      label: 'Source template reference',
      icon: 'IconTemplate',
    },
    {
      universalIdentifier: '6b6d0000-4720-4000-8000-000000000005',
      type: FieldType.TEXT,
      name: 'stageReference',
      label: 'Stage reference',
      icon: 'IconProgress',
    },
    {
      universalIdentifier: '6b6d0000-4720-4000-8000-000000000006',
      type: FieldType.TEXT,
      name: 'assignedRole',
      label: 'Assigned role',
      icon: 'IconUser',
    },
    {
      universalIdentifier: '6b6d0000-4720-4000-8000-000000000007',
      type: FieldType.NUMBER,
      name: 'completionPercent',
      label: 'Completion percent',
      icon: 'IconPercentage',
    },
    {
      universalIdentifier: '6b6d0000-4720-4000-8000-000000000008',
      type: FieldType.NUMBER,
      name: 'blockingItemCount',
      label: 'Blocking item count',
      icon: 'IconAlertTriangle',
    },
    {
      universalIdentifier: '6b6d0000-4720-4000-8000-000000000009',
      type: FieldType.BOOLEAN,
      name: 'stageGateSatisfied',
      label: 'Stage gate satisfied',
      icon: 'IconCircleCheck',
    },
    {
      universalIdentifier: '6b6d0000-4720-4000-8000-000000000010',
      type: FieldType.DATE_TIME,
      name: 'completedAt',
      label: 'Completed at',
      icon: 'IconClockCheck',
    },
    {
      universalIdentifier: '6b6d0000-4720-4000-8000-000000000011',
      type: FieldType.TEXT,
      name: 'reviewNotes',
      label: 'Review notes',
      icon: 'IconNotes',
    },
  ],
});
