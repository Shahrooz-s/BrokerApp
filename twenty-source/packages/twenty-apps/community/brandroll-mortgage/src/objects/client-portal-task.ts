import { FieldType, defineObject } from 'twenty-sdk/define';

export const CLIENT_PORTAL_TASK_OBJECT_ID =
  '6b6d0000-4610-4000-8000-000000000001';
export const CLIENT_PORTAL_TASK_NAME_FIELD_ID =
  '6b6d0000-4610-4000-8000-000000000002';
export const CLIENT_PORTAL_TASK_STATUS_FIELD_ID =
  '6b6d0000-4610-4000-8000-000000000003';

export default defineObject({
  universalIdentifier: CLIENT_PORTAL_TASK_OBJECT_ID,
  nameSingular: 'clientPortalTask',
  namePlural: 'clientPortalTasks',
  labelSingular: 'Client portal task',
  labelPlural: 'Client portal tasks',
  description:
    'Client-facing portal task for fact find, consent, KYC, document request, bank statement, open banking, or acknowledgement work.',
  icon: 'IconChecklist',
  labelIdentifierFieldMetadataUniversalIdentifier:
    CLIENT_PORTAL_TASK_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: CLIENT_PORTAL_TASK_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'taskName',
      label: 'Task name',
      icon: 'IconChecklist',
    },
    {
      universalIdentifier: CLIENT_PORTAL_TASK_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'taskStatus',
      label: 'Status',
      icon: 'IconProgress',
      options: [
        { value: 'NOT_STARTED', label: 'Not started', position: 0, color: 'gray' },
        { value: 'AVAILABLE', label: 'Available', position: 1, color: 'blue' },
        { value: 'IN_PROGRESS', label: 'In progress', position: 2, color: 'purple' },
        { value: 'SUBMITTED', label: 'Submitted', position: 3, color: 'orange' },
        { value: 'ACCEPTED', label: 'Accepted', position: 4, color: 'green' },
        { value: 'CHANGES_REQUESTED', label: 'Changes requested', position: 5, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4610-4000-8000-000000000004',
      type: FieldType.SELECT,
      name: 'taskType',
      label: 'Task type',
      icon: 'IconCategory',
      options: [
        { value: 'FACT_FIND', label: 'Fact find', position: 0, color: 'blue' },
        { value: 'KYC', label: 'KYC', position: 1, color: 'green' },
        { value: 'DOCUMENT', label: 'Document', position: 2, color: 'purple' },
        { value: 'OPEN_BANKING', label: 'Open banking', position: 3, color: 'orange' },
        { value: 'BANK_STATEMENT', label: 'Bank statement', position: 4, color: 'yellow' },
        { value: 'ACKNOWLEDGEMENT', label: 'Acknowledgement', position: 5, color: 'red' },
        { value: 'MESSAGE', label: 'Message', position: 6, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4610-4000-8000-000000000005',
      type: FieldType.DATE,
      name: 'dueDate',
      label: 'Due date',
      icon: 'IconCalendarDue',
    },
    {
      universalIdentifier: '6b6d0000-4610-4000-8000-000000000006',
      type: FieldType.TEXT,
      name: 'applicantReference',
      label: 'Applicant reference',
      icon: 'IconUser',
    },
    {
      universalIdentifier: '6b6d0000-4610-4000-8000-000000000007',
      type: FieldType.TEXT,
      name: 'externalProviderReference',
      label: 'External provider reference',
      icon: 'IconPlug',
    },
    {
      universalIdentifier: '6b6d0000-4610-4000-8000-000000000008',
      type: FieldType.TEXT,
      name: 'safeClientDescription',
      label: 'Safe client description',
      icon: 'IconMessage',
    },
    {
      universalIdentifier: '6b6d0000-4610-4000-8000-000000000009',
      type: FieldType.TEXT,
      name: 'staffReviewNotes',
      label: 'Staff review notes',
      icon: 'IconNotes',
      description:
        'Broker-only notes. Do not render this field in the borrower portal.',
    },
    {
      universalIdentifier: '6b6d0000-4610-4000-8000-000000000010',
      type: FieldType.DATE_TIME,
      name: 'completedAt',
      label: 'Completed at',
      icon: 'IconCircleCheck',
    },
  ],
});
