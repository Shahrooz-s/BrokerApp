import { FieldType, defineObject } from 'twenty-sdk/define';

export const DOCUMENT_REQUEST_OBJECT_ID =
  '6b6d0000-1600-4000-8000-000000000001';
export const DOCUMENT_REQUEST_NAME_FIELD_ID =
  '6b6d0000-1600-4000-8000-000000000002';
export const DOCUMENT_REQUEST_STATUS_FIELD_ID =
  '6b6d0000-1600-4000-8000-000000000003';

export default defineObject({
  universalIdentifier: DOCUMENT_REQUEST_OBJECT_ID,
  nameSingular: 'documentRequest',
  namePlural: 'documentRequests',
  labelSingular: 'Document request',
  labelPlural: 'Document requests',
  description:
    'Document checklist metadata without storing sensitive document binaries in Twenty.',
  icon: 'IconFileDescription',
  labelIdentifierFieldMetadataUniversalIdentifier: DOCUMENT_REQUEST_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: DOCUMENT_REQUEST_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'documentName',
      label: 'Document name',
      icon: 'IconFile',
    },
    {
      universalIdentifier: DOCUMENT_REQUEST_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'documentStatus',
      label: 'Document status',
      icon: 'IconChecklist',
      options: [
        { value: 'REQUESTED', label: 'Requested', position: 0, color: 'blue' },
        { value: 'UPLOADED', label: 'Uploaded', position: 1, color: 'purple' },
        { value: 'ACCEPTED', label: 'Accepted', position: 2, color: 'green' },
        { value: 'REJECTED', label: 'Rejected', position: 3, color: 'red' },
        { value: 'WAIVED', label: 'Waived', position: 4, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1600-4000-8000-000000000004',
      type: FieldType.TEXT,
      name: 'externalStorageReference',
      label: 'External storage reference',
      icon: 'IconLink',
    },
    {
      universalIdentifier: '6b6d0000-1600-4000-8000-000000000005',
      type: FieldType.DATE,
      name: 'dueDate',
      label: 'Due date',
      icon: 'IconCalendarDue',
    },
  ],
});
