import { FieldType, defineObject } from 'twenty-sdk/define';

export const APPLICATION_CONDITION_OBJECT_ID =
  '6b6d0000-1700-4000-8000-000000000001';
export const APPLICATION_CONDITION_NAME_FIELD_ID =
  '6b6d0000-1700-4000-8000-000000000002';
export const APPLICATION_CONDITION_STATUS_FIELD_ID =
  '6b6d0000-1700-4000-8000-000000000003';

export default defineObject({
  universalIdentifier: APPLICATION_CONDITION_OBJECT_ID,
  nameSingular: 'applicationCondition',
  namePlural: 'applicationConditions',
  labelSingular: 'Application condition',
  labelPlural: 'Application conditions',
  description: 'Lender, credit, document, settlement, and internal conditions.',
  icon: 'IconListCheck',
  labelIdentifierFieldMetadataUniversalIdentifier:
    APPLICATION_CONDITION_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: APPLICATION_CONDITION_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'conditionName',
      label: 'Condition name',
      icon: 'IconAbc',
    },
    {
      universalIdentifier: APPLICATION_CONDITION_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'conditionStatus',
      label: 'Condition status',
      icon: 'IconProgressCheck',
      options: [
        { value: 'OPEN', label: 'Open', position: 0, color: 'orange' },
        { value: 'IN_PROGRESS', label: 'In progress', position: 1, color: 'blue' },
        { value: 'SATISFIED', label: 'Satisfied', position: 2, color: 'green' },
        { value: 'WAIVED', label: 'Waived', position: 3, color: 'gray' },
        { value: 'BLOCKED', label: 'Blocked', position: 4, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1700-4000-8000-000000000004',
      type: FieldType.SELECT,
      name: 'conditionType',
      label: 'Condition type',
      icon: 'IconTags',
      options: [
        { value: 'LENDER', label: 'Lender', position: 0, color: 'purple' },
        { value: 'DOCUMENT', label: 'Document', position: 1, color: 'blue' },
        { value: 'CREDIT', label: 'Credit', position: 2, color: 'orange' },
        { value: 'VALUATION', label: 'Valuation', position: 3, color: 'green' },
        { value: 'SETTLEMENT', label: 'Settlement', position: 4, color: 'yellow' },
        { value: 'INTERNAL', label: 'Internal', position: 5, color: 'gray' },
      ],
    },
  ],
});
