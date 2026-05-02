import {
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

export const OPPORTUNITY_CHECKLIST_GATE_STATUS_FIELD_ID =
  '6b6d0000-5000-4000-8000-000000000023';

export default defineField({
  universalIdentifier: OPPORTUNITY_CHECKLIST_GATE_STATUS_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.SELECT,
  name: 'checklistGateStatus',
  label: 'Checklist gate status',
  icon: 'IconListCheck',
  options: [
    { value: 'NOT_STARTED', label: 'Not started', position: 0, color: 'gray' },
    { value: 'IN_PROGRESS', label: 'In progress', position: 1, color: 'blue' },
    { value: 'BLOCKING_ITEMS', label: 'Blocking items', position: 2, color: 'red' },
    { value: 'READY_FOR_REVIEW', label: 'Ready for review', position: 3, color: 'purple' },
    { value: 'SATISFIED', label: 'Satisfied', position: 4, color: 'green' },
  ],
});
