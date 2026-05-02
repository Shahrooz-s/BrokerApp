import { FieldType, defineObject } from 'twenty-sdk/define';

export const FACT_FIND_FIELD_ANSWER_OBJECT_ID =
  '6b6d0000-2e10-4000-8000-000000000001';
export const FACT_FIND_FIELD_ANSWER_NAME_FIELD_ID =
  '6b6d0000-2e10-4000-8000-000000000002';
export const FACT_FIND_FIELD_ANSWER_KEY_FIELD_ID =
  '6b6d0000-2e10-4000-8000-000000000003';
export const FACT_FIND_FIELD_ANSWER_VALUE_PREVIEW_FIELD_ID =
  '6b6d0000-2e10-4000-8000-000000000006';
export const FACT_FIND_FIELD_ANSWER_MAPPING_STATUS_FIELD_ID =
  '6b6d0000-2e10-4000-8000-000000000009';
export const FACT_FIND_FIELD_ANSWER_REVIEW_STATUS_FIELD_ID =
  '6b6d0000-2e10-4000-8000-000000000010';

export default defineObject({
  universalIdentifier: FACT_FIND_FIELD_ANSWER_OBJECT_ID,
  nameSingular: 'factFindFieldAnswer',
  namePlural: 'factFindFieldAnswers',
  labelSingular: 'Fact find field answer',
  labelPlural: 'Fact find field answers',
  description:
    'Autosaved field-level fact-find response from OpnForm or the portal before and after normalization into mortgage records.',
  icon: 'IconForms',
  labelIdentifierFieldMetadataUniversalIdentifier:
    FACT_FIND_FIELD_ANSWER_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: FACT_FIND_FIELD_ANSWER_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'answerName',
      label: 'Answer name',
      icon: 'IconForms',
    },
    {
      universalIdentifier: FACT_FIND_FIELD_ANSWER_KEY_FIELD_ID,
      type: FieldType.TEXT,
      name: 'fieldKey',
      label: 'Field key',
      icon: 'IconKey',
    },
    {
      universalIdentifier: '6b6d0000-2e10-4000-8000-000000000004',
      type: FieldType.TEXT,
      name: 'sourceFieldId',
      label: 'Source field ID',
      icon: 'IconId',
    },
    {
      universalIdentifier: '6b6d0000-2e10-4000-8000-000000000005',
      type: FieldType.TEXT,
      name: 'sourceComponentType',
      label: 'Source component type',
      icon: 'IconForms',
    },
    {
      universalIdentifier: FACT_FIND_FIELD_ANSWER_VALUE_PREVIEW_FIELD_ID,
      type: FieldType.TEXT,
      name: 'valuePreview',
      label: 'Value preview',
      icon: 'IconEye',
      description:
        'Short display value only. Sensitive raw payloads should stay in the approved portal evidence store.',
    },
    {
      universalIdentifier: '6b6d0000-2e10-4000-8000-000000000007',
      type: FieldType.TEXT,
      name: 'valueSnapshotReference',
      label: 'Value snapshot reference',
      icon: 'IconJson',
    },
    {
      universalIdentifier: '6b6d0000-2e10-4000-8000-000000000008',
      type: FieldType.TEXT,
      name: 'normalizedTarget',
      label: 'Normalized target',
      icon: 'IconRoute',
      description:
        'Target object/field or mapping profile path used by the portal backend.',
    },
    {
      universalIdentifier: FACT_FIND_FIELD_ANSWER_MAPPING_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'mappingStatus',
      label: 'Mapping status',
      icon: 'IconRoute',
      options: [
        { value: 'NOT_MAPPED', label: 'Not mapped', position: 0, color: 'gray' },
        { value: 'AUTOSAVED', label: 'Autosaved', position: 1, color: 'blue' },
        { value: 'NORMALIZED', label: 'Normalized', position: 2, color: 'green' },
        { value: 'REVIEW_REQUIRED', label: 'Review required', position: 3, color: 'orange' },
        { value: 'MAPPING_ERRORS', label: 'Mapping errors', position: 4, color: 'red' },
      ],
    },
    {
      universalIdentifier: FACT_FIND_FIELD_ANSWER_REVIEW_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'reviewStatus',
      label: 'Review status',
      icon: 'IconUserCheck',
      options: [
        { value: 'NOT_REVIEWED', label: 'Not reviewed', position: 0, color: 'gray' },
        { value: 'READY_FOR_REVIEW', label: 'Ready for review', position: 1, color: 'blue' },
        { value: 'APPROVED', label: 'Approved', position: 2, color: 'green' },
        { value: 'NEEDS_CLARIFICATION', label: 'Needs clarification', position: 3, color: 'orange' },
        { value: 'WAIVED', label: 'Waived/not applicable', position: 4, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-2e10-4000-8000-000000000011',
      type: FieldType.TEXT,
      name: 'mappingErrors',
      label: 'Mapping errors',
      icon: 'IconAlertTriangle',
    },
    {
      universalIdentifier: '6b6d0000-2e10-4000-8000-000000000012',
      type: FieldType.BOOLEAN,
      name: 'clarificationRequired',
      label: 'Clarification required',
      icon: 'IconMessageQuestion',
    },
    {
      universalIdentifier: '6b6d0000-2e10-4000-8000-000000000013',
      type: FieldType.DATE_TIME,
      name: 'lastAutosavedAt',
      label: 'Last autosaved at',
      icon: 'IconDeviceFloppy',
    },
    {
      universalIdentifier: '6b6d0000-2e10-4000-8000-000000000014',
      type: FieldType.DATE_TIME,
      name: 'lastNormalizedAt',
      label: 'Last normalized at',
      icon: 'IconRoute',
    },
    {
      universalIdentifier: '6b6d0000-2e10-4000-8000-000000000015',
      type: FieldType.TEXT,
      name: 'staffNote',
      label: 'Staff note',
      icon: 'IconNotes',
    },
  ],
});
