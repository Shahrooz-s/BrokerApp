import { FieldType, defineObject } from 'twenty-sdk/define';

export const BROKER_CHECKLIST_TEMPLATE_OBJECT_ID =
  '6b6d0000-4700-4000-8000-000000000001';
export const BROKER_CHECKLIST_TEMPLATE_NAME_FIELD_ID =
  '6b6d0000-4700-4000-8000-000000000002';
export const BROKER_CHECKLIST_TEMPLATE_STATUS_FIELD_ID =
  '6b6d0000-4700-4000-8000-000000000003';

export default defineObject({
  universalIdentifier: BROKER_CHECKLIST_TEMPLATE_OBJECT_ID,
  nameSingular: 'brokerChecklistTemplate',
  namePlural: 'brokerChecklistTemplates',
  labelSingular: 'Broker checklist template',
  labelPlural: 'Broker checklist templates',
  description:
    'Reusable stage, compliance, lender, lodgement, settlement, and scenario checklist template.',
  icon: 'IconListCheck',
  labelIdentifierFieldMetadataUniversalIdentifier:
    BROKER_CHECKLIST_TEMPLATE_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: BROKER_CHECKLIST_TEMPLATE_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'checklistTemplateName',
      label: 'Checklist template name',
      icon: 'IconListCheck',
    },
    {
      universalIdentifier: BROKER_CHECKLIST_TEMPLATE_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'templateStatus',
      label: 'Status',
      icon: 'IconProgress',
      options: [
        { value: 'DRAFT', label: 'Draft', position: 0, color: 'gray' },
        { value: 'ACTIVE', label: 'Active', position: 1, color: 'green' },
        { value: 'PRIVATE_ITEMS_PENDING', label: 'Private items pending', position: 2, color: 'orange' },
        { value: 'ARCHIVED', label: 'Archived', position: 3, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4700-4000-8000-000000000004',
      type: FieldType.SELECT,
      name: 'checklistCategory',
      label: 'Checklist category',
      icon: 'IconCategory',
      options: [
        { value: 'LEAD', label: 'Lead', position: 0, color: 'gray' },
        { value: 'FACT_FIND', label: 'Fact find', position: 1, color: 'blue' },
        { value: 'COMPLIANCE', label: 'Compliance', position: 2, color: 'red' },
        { value: 'SUBMISSION', label: 'Submission', position: 3, color: 'purple' },
        { value: 'APPROVAL', label: 'Approval', position: 4, color: 'green' },
        { value: 'SETTLEMENT', label: 'Settlement', position: 5, color: 'yellow' },
        { value: 'POST_SETTLEMENT', label: 'Post settlement', position: 6, color: 'orange' },
        { value: 'CONSTRUCTION', label: 'Construction', position: 7, color: 'purple' },
        { value: 'LENDER', label: 'Lender', position: 8, color: 'blue' },
        { value: 'AML_CTF', label: 'AML/CTF', position: 9, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4700-4000-8000-000000000005',
      type: FieldType.TEXT,
      name: 'applicableBoard',
      label: 'Applicable board',
      icon: 'IconLayoutKanban',
    },
    {
      universalIdentifier: '6b6d0000-4700-4000-8000-000000000006',
      type: FieldType.TEXT,
      name: 'applicableStage',
      label: 'Applicable stage',
      icon: 'IconProgress',
    },
    {
      universalIdentifier: '6b6d0000-4700-4000-8000-000000000007',
      type: FieldType.TEXT,
      name: 'applicableScenario',
      label: 'Applicable scenario',
      icon: 'IconRoute',
    },
    {
      universalIdentifier: '6b6d0000-4700-4000-8000-000000000008',
      type: FieldType.TEXT,
      name: 'lenderRuleSet',
      label: 'Lender rule set',
      icon: 'IconBuildingBank',
    },
    {
      universalIdentifier: '6b6d0000-4700-4000-8000-000000000009',
      type: FieldType.BOOLEAN,
      name: 'blocksStageMovement',
      label: 'Blocks stage movement',
      icon: 'IconLock',
    },
    {
      universalIdentifier: '6b6d0000-4700-4000-8000-000000000010',
      type: FieldType.BOOLEAN,
      name: 'requiresComplianceReview',
      label: 'Requires compliance review',
      icon: 'IconShieldCheck',
    },
    {
      universalIdentifier: '6b6d0000-4700-4000-8000-000000000011',
      type: FieldType.TEXT,
      name: 'sourceSystem',
      label: 'Source system',
      icon: 'IconDatabaseImport',
    },
    {
      universalIdentifier: '6b6d0000-4700-4000-8000-000000000012',
      type: FieldType.TEXT,
      name: 'sourceChecklistId',
      label: 'Source checklist ID',
      icon: 'IconId',
    },
    {
      universalIdentifier: '6b6d0000-4700-4000-8000-000000000013',
      type: FieldType.TEXT,
      name: 'privateImportReference',
      label: 'Private import reference',
      icon: 'IconFileImport',
      description:
        'Reference to private imported checklist item bodies. Do not commit proprietary checklist item text to GitHub.',
    },
  ],
});
