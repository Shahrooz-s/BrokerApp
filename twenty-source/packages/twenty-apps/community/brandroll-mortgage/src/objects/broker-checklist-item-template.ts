import { FieldType, defineObject } from 'twenty-sdk/define';

export const BROKER_CHECKLIST_ITEM_TEMPLATE_OBJECT_ID =
  '6b6d0000-4710-4000-8000-000000000001';
export const BROKER_CHECKLIST_ITEM_TEMPLATE_NAME_FIELD_ID =
  '6b6d0000-4710-4000-8000-000000000002';
export const BROKER_CHECKLIST_ITEM_TEMPLATE_TYPE_FIELD_ID =
  '6b6d0000-4710-4000-8000-000000000005';
export const BROKER_CHECKLIST_ITEM_TEMPLATE_OWNER_ROLE_FIELD_ID =
  '6b6d0000-4710-4000-8000-000000000006';
export const BROKER_CHECKLIST_ITEM_TEMPLATE_REQUIRED_FIELD_ID =
  '6b6d0000-4710-4000-8000-000000000007';

export default defineObject({
  universalIdentifier: BROKER_CHECKLIST_ITEM_TEMPLATE_OBJECT_ID,
  nameSingular: 'brokerChecklistItemTemplate',
  namePlural: 'brokerChecklistItemTemplates',
  labelSingular: 'Broker checklist item template',
  labelPlural: 'Broker checklist item templates',
  description:
    'Reusable checklist item definition with gate, evidence, owner role, and LIXI/BrokerEngine mapping notes.',
  icon: 'IconListDetails',
  labelIdentifierFieldMetadataUniversalIdentifier:
    BROKER_CHECKLIST_ITEM_TEMPLATE_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: BROKER_CHECKLIST_ITEM_TEMPLATE_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'itemTemplateName',
      label: 'Item template name',
      icon: 'IconListDetails',
    },
    {
      universalIdentifier: '6b6d0000-4710-4000-8000-000000000003',
      type: FieldType.TEXT,
      name: 'checklistTemplateReference',
      label: 'Checklist template reference',
      icon: 'IconListCheck',
    },
    {
      universalIdentifier: '6b6d0000-4710-4000-8000-000000000004',
      type: FieldType.NUMBER,
      name: 'sortOrder',
      label: 'Position',
      icon: 'IconSortAscending',
    },
    {
      universalIdentifier: BROKER_CHECKLIST_ITEM_TEMPLATE_TYPE_FIELD_ID,
      type: FieldType.SELECT,
      name: 'itemType',
      label: 'Item type',
      icon: 'IconCategory',
      options: [
        { value: 'CHECKBOX', label: 'Checkbox', position: 0, color: 'gray' },
        { value: 'YES_NO', label: 'Yes/No', position: 1, color: 'blue' },
        { value: 'DOCUMENT', label: 'Document', position: 2, color: 'purple' },
        { value: 'TASK', label: 'Task', position: 3, color: 'orange' },
        { value: 'SYSTEM_CHECK', label: 'System check', position: 4, color: 'green' },
        { value: 'TEXT', label: 'Text', position: 5, color: 'yellow' },
        { value: 'AMOUNT', label: 'Amount', position: 6, color: 'red' },
      ],
    },
    {
      universalIdentifier: BROKER_CHECKLIST_ITEM_TEMPLATE_OWNER_ROLE_FIELD_ID,
      type: FieldType.SELECT,
      name: 'ownerRole',
      label: 'Owner role',
      icon: 'IconUser',
      options: [
        { value: 'BROKER', label: 'Broker', position: 0, color: 'blue' },
        { value: 'LOAN_PROCESSOR', label: 'Loan processor', position: 1, color: 'green' },
        { value: 'COMPLIANCE', label: 'Compliance', position: 2, color: 'red' },
        { value: 'CLIENT', label: 'Client', position: 3, color: 'purple' },
        { value: 'SYSTEM', label: 'System', position: 4, color: 'gray' },
      ],
    },
    {
      universalIdentifier: BROKER_CHECKLIST_ITEM_TEMPLATE_REQUIRED_FIELD_ID,
      type: FieldType.BOOLEAN,
      name: 'required',
      label: 'Required',
      icon: 'IconAsterisk',
    },
    {
      universalIdentifier: '6b6d0000-4710-4000-8000-000000000008',
      type: FieldType.BOOLEAN,
      name: 'blocksSubmission',
      label: 'Blocks submission',
      icon: 'IconLock',
    },
    {
      universalIdentifier: '6b6d0000-4710-4000-8000-000000000009',
      type: FieldType.TEXT,
      name: 'evidenceCategory',
      label: 'Evidence category',
      icon: 'IconFolder',
    },
    {
      universalIdentifier: '6b6d0000-4710-4000-8000-000000000010',
      type: FieldType.TEXT,
      name: 'lixiFieldAlias',
      label: 'LIXI field alias',
      icon: 'IconRoute',
    },
    {
      universalIdentifier: '6b6d0000-4710-4000-8000-000000000011',
      type: FieldType.TEXT,
      name: 'brokerEngineFieldAlias',
      label: 'BrokerEngine field alias',
      icon: 'IconRoute',
    },
    {
      universalIdentifier: '6b6d0000-4710-4000-8000-000000000012',
      type: FieldType.TEXT,
      name: 'privateBodyReference',
      label: 'Private body reference',
      icon: 'IconFileImport',
      description:
        'Private copied item wording reference. Keep actual proprietary wording outside GitHub.',
    },
  ],
});
