import { FieldType, defineObject } from 'twenty-sdk/define';

export const FACT_FIND_SECTION_OBJECT_ID =
  '6b6d0000-2e00-4000-8000-000000000001';
export const FACT_FIND_SECTION_NAME_FIELD_ID =
  '6b6d0000-2e00-4000-8000-000000000002';
export const FACT_FIND_SECTION_KEY_FIELD_ID =
  '6b6d0000-2e00-4000-8000-000000000003';
export const FACT_FIND_SECTION_STATUS_FIELD_ID =
  '6b6d0000-2e00-4000-8000-000000000004';
export const FACT_FIND_SECTION_COMPLETION_FIELD_ID =
  '6b6d0000-2e00-4000-8000-000000000005';
export const FACT_FIND_SECTION_MAPPING_STATUS_FIELD_ID =
  '6b6d0000-2e00-4000-8000-000000000010';

export default defineObject({
  universalIdentifier: FACT_FIND_SECTION_OBJECT_ID,
  nameSingular: 'factFindSection',
  namePlural: 'factFindSections',
  labelSingular: 'Fact find section',
  labelPlural: 'Fact find sections',
  description:
    'Autosave and review section for a borrower fact find, mapped from OpnForm or the portal into Twenty.',
  icon: 'IconLayoutList',
  labelIdentifierFieldMetadataUniversalIdentifier:
    FACT_FIND_SECTION_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: FACT_FIND_SECTION_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'sectionName',
      label: 'Section name',
      icon: 'IconLayoutList',
    },
    {
      universalIdentifier: FACT_FIND_SECTION_KEY_FIELD_ID,
      type: FieldType.TEXT,
      name: 'sectionKey',
      label: 'Section key',
      icon: 'IconKey',
    },
    {
      universalIdentifier: FACT_FIND_SECTION_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'sectionStatus',
      label: 'Section status',
      icon: 'IconProgress',
      options: [
        { value: 'NOT_STARTED', label: 'Not started', position: 0, color: 'gray' },
        { value: 'IN_PROGRESS', label: 'In progress', position: 1, color: 'blue' },
        { value: 'CLIENT_SUBMITTED', label: 'Client submitted', position: 2, color: 'purple' },
        { value: 'NEEDS_CLARIFICATION', label: 'Needs clarification', position: 3, color: 'orange' },
        { value: 'UNDER_REVIEW', label: 'Under review', position: 4, color: 'yellow' },
        { value: 'COMPLETE', label: 'Complete', position: 5, color: 'green' },
        { value: 'WAIVED', label: 'Waived/not applicable', position: 6, color: 'gray' },
      ],
    },
    {
      universalIdentifier: FACT_FIND_SECTION_COMPLETION_FIELD_ID,
      type: FieldType.NUMBER,
      name: 'completionPercent',
      label: 'Completion percent',
      icon: 'IconPercentage',
    },
    {
      universalIdentifier: '6b6d0000-2e00-4000-8000-000000000006',
      type: FieldType.BOOLEAN,
      name: 'required',
      label: 'Required',
      icon: 'IconAsterisk',
    },
    {
      universalIdentifier: '6b6d0000-2e00-4000-8000-000000000007',
      type: FieldType.TEXT,
      name: 'missingInformationSummary',
      label: 'Missing information summary',
      icon: 'IconListDetails',
    },
    {
      universalIdentifier: '6b6d0000-2e00-4000-8000-000000000008',
      type: FieldType.DATE_TIME,
      name: 'lastAutosavedAt',
      label: 'Last autosaved at',
      icon: 'IconDeviceFloppy',
    },
    {
      universalIdentifier: '6b6d0000-2e00-4000-8000-000000000009',
      type: FieldType.DATE_TIME,
      name: 'clientSubmittedAt',
      label: 'Client submitted at',
      icon: 'IconSend',
    },
    {
      universalIdentifier: FACT_FIND_SECTION_MAPPING_STATUS_FIELD_ID,
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
      universalIdentifier: '6b6d0000-2e00-4000-8000-000000000011',
      type: FieldType.TEXT,
      name: 'mappingErrors',
      label: 'Mapping errors',
      icon: 'IconAlertTriangle',
    },
    {
      universalIdentifier: '6b6d0000-2e00-4000-8000-000000000012',
      type: FieldType.DATE_TIME,
      name: 'processorReviewedAt',
      label: 'Processor reviewed at',
      icon: 'IconUserCheck',
    },
    {
      universalIdentifier: '6b6d0000-2e00-4000-8000-000000000013',
      type: FieldType.DATE_TIME,
      name: 'brokerReviewedAt',
      label: 'Broker reviewed at',
      icon: 'IconUserStar',
    },
  ],
});
