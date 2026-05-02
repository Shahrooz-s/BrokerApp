import {
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

export const OPPORTUNITY_DOCUMENT_STACK_STATUS_FIELD_ID =
  '6b6d0000-5000-4000-8000-000000000022';

export default defineField({
  universalIdentifier: OPPORTUNITY_DOCUMENT_STACK_STATUS_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.SELECT,
  name: 'documentStackStatus',
  label: 'Document stack status',
  icon: 'IconFiles',
  options: [
    { value: 'NOT_REQUESTED', label: 'Not requested', position: 0, color: 'gray' },
    { value: 'REQUESTED', label: 'Requested', position: 1, color: 'blue' },
    { value: 'PARTIAL', label: 'Partial', position: 2, color: 'orange' },
    { value: 'READY_FOR_REVIEW', label: 'Ready for review', position: 3, color: 'purple' },
    { value: 'ACCEPTED', label: 'Accepted', position: 4, color: 'green' },
  ],
});
