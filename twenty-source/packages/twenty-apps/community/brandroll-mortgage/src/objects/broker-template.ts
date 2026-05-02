import { FieldType, defineObject } from 'twenty-sdk/define';

export const BROKER_TEMPLATE_OBJECT_ID =
  '6b6d0000-3300-4000-8000-000000000001';
export const BROKER_TEMPLATE_NAME_FIELD_ID =
  '6b6d0000-3300-4000-8000-000000000002';
export const BROKER_TEMPLATE_TYPE_FIELD_ID =
  '6b6d0000-3300-4000-8000-000000000003';
export const BROKER_TEMPLATE_CATEGORY_FIELD_ID =
  '6b6d0000-3300-4000-8000-000000000004';
export const BROKER_TEMPLATE_STATUS_FIELD_ID =
  '6b6d0000-3300-4000-8000-000000000005';
export const BROKER_TEMPLATE_SUBJECT_FIELD_ID =
  '6b6d0000-3300-4000-8000-000000000006';
export const BROKER_TEMPLATE_RELATED_BOARD_FIELD_ID =
  '6b6d0000-3300-4000-8000-000000000015';
export const BROKER_TEMPLATE_RELATED_STAGE_FIELD_ID =
  '6b6d0000-3300-4000-8000-000000000016';
export const BROKER_TEMPLATE_IMPORT_STATUS_FIELD_ID =
  '6b6d0000-3300-4000-8000-000000000022';
export const BROKER_TEMPLATE_TASK_PRIORITY_FIELD_ID =
  '6b6d0000-3300-4000-8000-000000000024';
export const BROKER_TEMPLATE_TASK_DUE_OFFSET_DAYS_FIELD_ID =
  '6b6d0000-3300-4000-8000-000000000025';

export default defineObject({
  universalIdentifier: BROKER_TEMPLATE_OBJECT_ID,
  nameSingular: 'brokerTemplate',
  namePlural: 'brokerTemplates',
  labelSingular: 'Broker template',
  labelPlural: 'Broker templates',
  description:
    'Reusable broker workflow, email, SMS, task, checklist, report, and smart document templates.',
  icon: 'IconTemplate',
  labelIdentifierFieldMetadataUniversalIdentifier:
    BROKER_TEMPLATE_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: BROKER_TEMPLATE_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'templateName',
      label: 'Template name',
      icon: 'IconTemplate',
    },
    {
      universalIdentifier: BROKER_TEMPLATE_TYPE_FIELD_ID,
      type: FieldType.SELECT,
      name: 'templateType',
      label: 'Template type',
      icon: 'IconCategory',
      options: [
        { value: 'EMAIL', label: 'Email', position: 0, color: 'blue' },
        { value: 'SMS', label: 'SMS', position: 1, color: 'green' },
        { value: 'TASK', label: 'Task', position: 2, color: 'orange' },
        { value: 'CHECKLIST', label: 'Checklist', position: 3, color: 'yellow' },
        { value: 'REPORT', label: 'Report', position: 4, color: 'purple' },
        { value: 'WORKFLOW', label: 'Workflow', position: 5, color: 'red' },
        { value: 'SMART_DOC', label: 'Smart doc', position: 6, color: 'purple' },
        { value: 'FORM', label: 'Form', position: 7, color: 'gray' },
      ],
    },
    {
      universalIdentifier: BROKER_TEMPLATE_CATEGORY_FIELD_ID,
      type: FieldType.SELECT,
      name: 'workflowCategory',
      label: 'Workflow category',
      icon: 'IconRoute',
      options: [
        { value: 'LEAD', label: 'Lead', position: 0, color: 'gray' },
        { value: 'DOCUMENTS', label: 'Documents', position: 1, color: 'blue' },
        { value: 'STRATEGY', label: 'Strategy', position: 2, color: 'green' },
        { value: 'LODGEMENT', label: 'Lodgement', position: 3, color: 'purple' },
        { value: 'APPROVAL', label: 'Approval', position: 4, color: 'green' },
        { value: 'SETTLEMENT', label: 'Settlement', position: 5, color: 'yellow' },
        { value: 'POST_SETTLEMENT', label: 'Post settlement', position: 6, color: 'gray' },
        { value: 'REVIEW', label: 'Review', position: 7, color: 'orange' },
        { value: 'CONSTRUCTION', label: 'Construction', position: 8, color: 'red' },
        { value: 'PARTNERSHIP', label: 'Partnership', position: 9, color: 'purple' },
        { value: 'MAINTENANCE', label: 'Maintenance', position: 10, color: 'blue' },
        { value: 'ASSET_FINANCE', label: 'Asset finance', position: 11, color: 'purple' },
        { value: 'COMMERCIAL_LENDING', label: 'Commercial lending', position: 12, color: 'blue' },
        { value: 'BUSINESS_LENDING', label: 'Business lending', position: 13, color: 'orange' },
      ],
    },
    {
      universalIdentifier: BROKER_TEMPLATE_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'templateStatus',
      label: 'Status',
      icon: 'IconProgress',
      options: [
        { value: 'DRAFT', label: 'Draft', position: 0, color: 'gray' },
        { value: 'ACTIVE', label: 'Active', position: 1, color: 'green' },
        { value: 'BODY_PENDING_PRIVATE_IMPORT', label: 'Body pending private import', position: 2, color: 'orange' },
        { value: 'ARCHIVED', label: 'Archived', position: 3, color: 'red' },
      ],
    },
    {
      universalIdentifier: BROKER_TEMPLATE_SUBJECT_FIELD_ID,
      type: FieldType.TEXT,
      name: 'subject',
      label: 'Subject',
      icon: 'IconMail',
    },
    {
      universalIdentifier: '6b6d0000-3300-4000-8000-000000000007',
      type: FieldType.SELECT,
      name: 'bodyFormat',
      label: 'Body format',
      icon: 'IconCode',
      options: [
        { value: 'PLAIN_TEXT', label: 'Plain text', position: 0, color: 'gray' },
        { value: 'HTML', label: 'HTML', position: 1, color: 'blue' },
        { value: 'MARKDOWN', label: 'Markdown', position: 2, color: 'purple' },
        { value: 'RICH_TEXT_JSON', label: 'Rich text JSON', position: 3, color: 'orange' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-3300-4000-8000-000000000008',
      type: FieldType.TEXT,
      name: 'body',
      label: 'Body',
      icon: 'IconFileText',
      description:
        'Approved template body or a short placeholder. Keep proprietary imported bodies private until approved.',
    },
    {
      universalIdentifier: '6b6d0000-3300-4000-8000-000000000009',
      type: FieldType.TEXT,
      name: 'htmlTemplateReference',
      label: 'HTML template reference',
      icon: 'IconFileCode',
    },
    {
      universalIdentifier: '6b6d0000-3300-4000-8000-000000000010',
      type: FieldType.SELECT,
      name: 'fromRole',
      label: 'From role',
      icon: 'IconUser',
      options: [
        { value: 'BROKER', label: 'Broker', position: 0, color: 'blue' },
        { value: 'LOAN_PROCESSOR', label: 'Loan processor', position: 1, color: 'green' },
        { value: 'ASSIGNED_TEAM', label: 'Assigned team', position: 2, color: 'purple' },
        { value: 'SYSTEM', label: 'System', position: 3, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-3300-4000-8000-000000000011',
      type: FieldType.SELECT,
      name: 'toRecipientType',
      label: 'To recipient type',
      icon: 'IconUsers',
      options: [
        { value: 'CLIENT', label: 'Client', position: 0, color: 'blue' },
        { value: 'PRIMARY_APPLICANT', label: 'Primary applicant', position: 1, color: 'green' },
        { value: 'ALL_APPLICANTS', label: 'All applicants', position: 2, color: 'green' },
        { value: 'CO_APPLICANT', label: 'Co-applicant', position: 3, color: 'green' },
        { value: 'LENDER', label: 'Lender', position: 4, color: 'purple' },
        { value: 'SOLICITOR', label: 'Solicitor', position: 5, color: 'orange' },
        { value: 'BUILDER', label: 'Builder', position: 6, color: 'yellow' },
        { value: 'REFERRER', label: 'Referrer', position: 7, color: 'red' },
        { value: 'RELATED_PARTY', label: 'Related party', position: 8, color: 'gray' },
        { value: 'INTERNAL_TEAM', label: 'Internal team', position: 9, color: 'purple' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-3300-4000-8000-000000000012',
      type: FieldType.SELECT,
      name: 'sharedScope',
      label: 'Shared scope',
      icon: 'IconShare',
      options: [
        { value: 'PRIVATE', label: 'Private', position: 0, color: 'gray' },
        { value: 'WORKSPACE', label: 'Workspace', position: 1, color: 'blue' },
        { value: 'BROKER_GROUP', label: 'Broker group', position: 2, color: 'green' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-3300-4000-8000-000000000013',
      type: FieldType.SELECT,
      name: 'sourceSystem',
      label: 'Source system',
      icon: 'IconDatabaseImport',
      options: [
        { value: 'BROKERAPP', label: 'BrokerApp', position: 0, color: 'green' },
        { value: 'BROKERENGINE', label: 'BrokerEngine', position: 1, color: 'blue' },
        { value: 'TWENTY', label: 'Twenty', position: 2, color: 'purple' },
        { value: 'MANUAL', label: 'Manual', position: 3, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-3300-4000-8000-000000000014',
      type: FieldType.TEXT,
      name: 'sourceTemplateId',
      label: 'Source template ID',
      icon: 'IconId',
    },
    {
      universalIdentifier: BROKER_TEMPLATE_RELATED_BOARD_FIELD_ID,
      type: FieldType.SELECT,
      name: 'relatedBoard',
      label: 'Related board',
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
      universalIdentifier: BROKER_TEMPLATE_RELATED_STAGE_FIELD_ID,
      type: FieldType.TEXT,
      name: 'relatedStage',
      label: 'Related stage',
      icon: 'IconProgress',
    },
    {
      universalIdentifier: '6b6d0000-3300-4000-8000-000000000017',
      type: FieldType.TEXT,
      name: 'mergeVariables',
      label: 'Merge variables',
      icon: 'IconVariable',
      description:
        'JSON or comma-separated merge variables used by this template.',
    },
    {
      universalIdentifier: '6b6d0000-3300-4000-8000-000000000018',
      type: FieldType.TEXT,
      name: 'attachmentReferences',
      label: 'Attachment references',
      icon: 'IconPaperclip',
    },
    {
      universalIdentifier: '6b6d0000-3300-4000-8000-000000000019',
      type: FieldType.BOOLEAN,
      name: 'requiresBrokerApproval',
      label: 'Requires broker approval',
      icon: 'IconShieldCheck',
    },
    {
      universalIdentifier: '6b6d0000-3300-4000-8000-000000000020',
      type: FieldType.BOOLEAN,
      name: 'triggersStageMove',
      label: 'Triggers stage move',
      icon: 'IconRoute',
    },
    {
      universalIdentifier: '6b6d0000-3300-4000-8000-000000000021',
      type: FieldType.TEXT,
      name: 'nextStage',
      label: 'Next stage',
      icon: 'IconArrowRight',
    },
    {
      universalIdentifier: BROKER_TEMPLATE_IMPORT_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'importStatus',
      label: 'Import status',
      icon: 'IconDatabaseImport',
      options: [
        { value: 'STRUCTURE_ONLY', label: 'Structure only', position: 0, color: 'gray' },
        { value: 'BODY_PENDING_PRIVATE_IMPORT', label: 'Body pending private import', position: 1, color: 'orange' },
        { value: 'READY', label: 'Ready', position: 2, color: 'green' },
        { value: 'IMPORTED', label: 'Imported', position: 3, color: 'blue' },
      ],
    },
    {
      universalIdentifier: BROKER_TEMPLATE_TASK_PRIORITY_FIELD_ID,
      type: FieldType.SELECT,
      name: 'taskPriority',
      label: 'Task priority',
      icon: 'IconFlag',
      options: [
        { value: 'LOW', label: 'Low', position: 0, color: 'gray' },
        { value: 'MEDIUM', label: 'Medium', position: 1, color: 'yellow' },
        { value: 'HIGH', label: 'High', position: 2, color: 'orange' },
        { value: 'CRITICAL', label: 'Critical', position: 3, color: 'red' },
      ],
    },
    {
      universalIdentifier: BROKER_TEMPLATE_TASK_DUE_OFFSET_DAYS_FIELD_ID,
      type: FieldType.NUMBER,
      name: 'taskDueOffsetBusinessDays',
      label: 'Task due offset business days',
      icon: 'IconCalendarDue',
      description:
        'Business-day offset from the trigger date. Use negative values for before a key date.',
    },
    {
      universalIdentifier: '6b6d0000-3300-4000-8000-000000000023',
      type: FieldType.TEXT,
      name: 'notes',
      label: 'Notes',
      icon: 'IconNotes',
    },
  ],
});
