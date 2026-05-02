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
  ],
});
