import { FieldType, defineObject } from 'twenty-sdk/define';

export const FACT_FIND_SESSION_OBJECT_ID =
  '6b6d0000-1d00-4000-8000-000000000001';
export const FACT_FIND_SESSION_NAME_FIELD_ID =
  '6b6d0000-1d00-4000-8000-000000000002';
export const FACT_FIND_SESSION_STATUS_FIELD_ID =
  '6b6d0000-1d00-4000-8000-000000000003';

export default defineObject({
  universalIdentifier: FACT_FIND_SESSION_OBJECT_ID,
  nameSingular: 'factFindSession',
  namePlural: 'factFindSessions',
  labelSingular: 'Fact find session',
  labelPlural: 'Fact find sessions',
  description:
    'Portal-driven applicant fact find with section completion, broker review, and change request tracking.',
  icon: 'IconForms',
  labelIdentifierFieldMetadataUniversalIdentifier:
    FACT_FIND_SESSION_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: FACT_FIND_SESSION_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'factFindName',
      label: 'Fact find name',
      icon: 'IconForms',
    },
    {
      universalIdentifier: FACT_FIND_SESSION_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'factFindStatus',
      label: 'Status',
      icon: 'IconProgress',
      options: [
        { value: 'NOT_STARTED', label: 'Not started', position: 0, color: 'gray' },
        { value: 'CLIENT_IN_PROGRESS', label: 'Client in progress', position: 1, color: 'blue' },
        { value: 'CLIENT_SUBMITTED', label: 'Client submitted', position: 2, color: 'purple' },
        { value: 'BROKER_REVIEW', label: 'Broker review', position: 3, color: 'orange' },
        { value: 'CHANGES_REQUESTED', label: 'Changes requested', position: 4, color: 'red' },
        { value: 'COMPLETE', label: 'Complete', position: 5, color: 'green' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1d00-4000-8000-000000000004',
      type: FieldType.NUMBER,
      name: 'completionPercent',
      label: 'Completion percent',
      icon: 'IconPercentage',
    },
    {
      universalIdentifier: '6b6d0000-1d00-4000-8000-000000000005',
      type: FieldType.TEXT,
      name: 'missingSections',
      label: 'Missing sections',
      icon: 'IconListDetails',
    },
    {
      universalIdentifier: '6b6d0000-1d00-4000-8000-000000000006',
      type: FieldType.DATE_TIME,
      name: 'lastClientActivityAt',
      label: 'Last client activity',
      icon: 'IconClock',
    },
    {
      universalIdentifier: '6b6d0000-1d00-4000-8000-000000000007',
      type: FieldType.TEXT,
      name: 'objectiveSummary',
      label: 'Objectives summary',
      icon: 'IconTargetArrow',
    },
    {
      universalIdentifier: '6b6d0000-1d00-4000-8000-000000000008',
      type: FieldType.BOOLEAN,
      name: 'readyForProductResearch',
      label: 'Ready for product research',
      icon: 'IconCircleCheck',
    },
    {
      universalIdentifier: '6b6d0000-1d00-4000-8000-000000000009',
      type: FieldType.SELECT,
      name: 'formProvider',
      label: 'Form provider',
      icon: 'IconForms',
      options: [
        { value: 'OPNFORM', label: 'OpnForm', position: 0, color: 'green' },
        { value: 'FORM_IO', label: 'Form.io', position: 1, color: 'blue' },
        { value: 'CUSTOM_PORTAL', label: 'Custom portal', position: 2, color: 'purple' },
        { value: 'BROKERENGINE', label: 'BrokerEngine', position: 3, color: 'orange' },
        { value: 'APPLYONLINE', label: 'ApplyOnline', position: 4, color: 'green' },
        { value: 'OTHER', label: 'Other', position: 5, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1d00-4000-8000-000000000010',
      type: FieldType.TEXT,
      name: 'formDefinitionId',
      label: 'Form definition ID',
      icon: 'IconForms',
      description:
        'External or portal form schema identifier used to render this fact find.',
    },
    {
      universalIdentifier: '6b6d0000-1d00-4000-8000-000000000011',
      type: FieldType.TEXT,
      name: 'formDefinitionVersion',
      label: 'Form definition version',
      icon: 'IconVersions',
      description:
        'Immutable schema version used when the client started or submitted the fact find.',
    },
    {
      universalIdentifier: '6b6d0000-1d00-4000-8000-000000000012',
      type: FieldType.TEXT,
      name: 'formSubmissionReference',
      label: 'Form submission reference',
      icon: 'IconFileCheck',
      description:
        'External submission ID or portal submission reference for audit and reconciliation.',
    },
    {
      universalIdentifier: '6b6d0000-1d00-4000-8000-000000000013',
      type: FieldType.TEXT,
      name: 'portalSessionReference',
      label: 'Portal session reference',
      icon: 'IconWorldWww',
    },
    {
      universalIdentifier: '6b6d0000-1d00-4000-8000-000000000014',
      type: FieldType.SELECT,
      name: 'formMappingStatus',
      label: 'Form mapping status',
      icon: 'IconRoute',
      options: [
        { value: 'NOT_MAPPED', label: 'Not mapped', position: 0, color: 'gray' },
        { value: 'MAPPED', label: 'Mapped', position: 1, color: 'green' },
        { value: 'REVIEW_REQUIRED', label: 'Review required', position: 2, color: 'orange' },
        { value: 'MAPPING_ERRORS', label: 'Mapping errors', position: 3, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1d00-4000-8000-000000000015',
      type: FieldType.TEXT,
      name: 'formMappingErrors',
      label: 'Form mapping errors',
      icon: 'IconAlertTriangle',
    },
    {
      universalIdentifier: '6b6d0000-1d00-4000-8000-000000000016',
      type: FieldType.TEXT,
      name: 'sectionStatusSummary',
      label: 'Section status summary',
      icon: 'IconListCheck',
    },
    {
      universalIdentifier: '6b6d0000-1d00-4000-8000-000000000017',
      type: FieldType.TEXT,
      name: 'clarificationRequestSummary',
      label: 'Clarification request summary',
      icon: 'IconMessageQuestion',
    },
    {
      universalIdentifier: '6b6d0000-1d00-4000-8000-000000000018',
      type: FieldType.NUMBER,
      name: 'missingInformationCount',
      label: 'Missing information count',
      icon: 'IconListDetails',
    },
    {
      universalIdentifier: '6b6d0000-1d00-4000-8000-000000000019',
      type: FieldType.DATE_TIME,
      name: 'clientSubmittedAt',
      label: 'Client submitted at',
      icon: 'IconSend',
    },
    {
      universalIdentifier: '6b6d0000-1d00-4000-8000-000000000020',
      type: FieldType.DATE_TIME,
      name: 'processorReviewedAt',
      label: 'Processor reviewed at',
      icon: 'IconUserCheck',
    },
    {
      universalIdentifier: '6b6d0000-1d00-4000-8000-000000000021',
      type: FieldType.DATE_TIME,
      name: 'brokerReviewedAt',
      label: 'Broker reviewed at',
      icon: 'IconUserStar',
    },
    {
      universalIdentifier: '6b6d0000-1d00-4000-8000-000000000022',
      type: FieldType.DATE_TIME,
      name: 'lastStaffActivityAt',
      label: 'Last staff activity',
      icon: 'IconClockEdit',
    },
    {
      universalIdentifier: '6b6d0000-1d00-4000-8000-000000000023',
      type: FieldType.TEXT,
      name: 'schemaSnapshotReference',
      label: 'Schema snapshot reference',
      icon: 'IconJson',
      description:
        'Reference to the immutable form schema snapshot used for audit, not restricted LIXI schema content.',
    },
    {
      universalIdentifier: '6b6d0000-1d00-4000-8000-000000000024',
      type: FieldType.TEXT,
      name: 'submissionSnapshotReference',
      label: 'Submission snapshot reference',
      icon: 'IconJson',
      description:
        'Reference to the original client submission snapshot stored in the approved portal evidence store.',
    },
  ],
});
