import { FieldType, defineObject } from 'twenty-sdk/define';

export const POLICY_RESEARCH_RUN_OBJECT_ID =
  '6b6d0000-3500-4000-8000-000000000001';
export const POLICY_RESEARCH_RUN_NAME_FIELD_ID =
  '6b6d0000-3500-4000-8000-000000000002';
export const POLICY_RESEARCH_RUN_STATUS_FIELD_ID =
  '6b6d0000-3500-4000-8000-000000000003';

export default defineObject({
  universalIdentifier: POLICY_RESEARCH_RUN_OBJECT_ID,
  nameSingular: 'policyResearchRun',
  namePlural: 'policyResearchRuns',
  labelSingular: 'Policy research run',
  labelPlural: 'Policy research runs',
  description:
    'PolicySpace research run metadata for lender-policy RAG, source references, reason codes and broker review.',
  icon: 'IconDatabaseSearch',
  labelIdentifierFieldMetadataUniversalIdentifier:
    POLICY_RESEARCH_RUN_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: POLICY_RESEARCH_RUN_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'policyQuestion',
      label: 'Policy question',
      icon: 'IconQuestionMark',
    },
    {
      universalIdentifier: POLICY_RESEARCH_RUN_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'researchStatus',
      label: 'Research status',
      icon: 'IconProgress',
      options: [
        { value: 'DRAFT', label: 'Draft', position: 0, color: 'gray' },
        { value: 'PROVIDER_GATED', label: 'Provider gated', position: 1, color: 'orange' },
        { value: 'QUEUED', label: 'Queued', position: 2, color: 'yellow' },
        { value: 'COMPLETED', label: 'Completed', position: 3, color: 'green' },
        { value: 'BROKER_REVIEW_REQUIRED', label: 'Broker review required', position: 4, color: 'purple' },
        { value: 'ERROR', label: 'Error', position: 5, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-3500-4000-8000-000000000004',
      type: FieldType.TEXT,
      name: 'selectedLender',
      label: 'Selected lender',
      icon: 'IconBuildingBank',
    },
    {
      universalIdentifier: '6b6d0000-3500-4000-8000-000000000005',
      type: FieldType.TEXT,
      name: 'scenarioSummary',
      label: 'Scenario summary',
      icon: 'IconClipboardText',
    },
    {
      universalIdentifier: '6b6d0000-3500-4000-8000-000000000006',
      type: FieldType.SELECT,
      name: 'ragProvider',
      label: 'RAG provider',
      icon: 'IconBrain',
      options: [
        { value: 'NONE', label: 'None', position: 0, color: 'gray' },
        { value: 'DIFY', label: 'Dify', position: 1, color: 'blue' },
        { value: 'RAGFLOW', label: 'RAGFlow', position: 2, color: 'purple' },
        { value: 'OLLAMA', label: 'Ollama', position: 3, color: 'green' },
        { value: 'OTHER', label: 'Other', position: 4, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-3500-4000-8000-000000000007',
      type: FieldType.TEXT,
      name: 'ragSourceReferences',
      label: 'RAG source references',
      icon: 'IconLink',
    },
    {
      universalIdentifier: '6b6d0000-3500-4000-8000-000000000008',
      type: FieldType.TEXT,
      name: 'answerSummary',
      label: 'Answer summary',
      icon: 'IconNotes',
    },
    {
      universalIdentifier: '6b6d0000-3500-4000-8000-000000000009',
      type: FieldType.TEXT,
      name: 'reasonCodes',
      label: 'Reason codes',
      icon: 'IconListCheck',
    },
    {
      universalIdentifier: '6b6d0000-3500-4000-8000-000000000010',
      type: FieldType.SELECT,
      name: 'brokerReviewStatus',
      label: 'Broker review status',
      icon: 'IconUserCheck',
      options: [
        { value: 'NOT_REVIEWED', label: 'Not reviewed', position: 0, color: 'gray' },
        { value: 'REVIEW_REQUIRED', label: 'Review required', position: 1, color: 'orange' },
        { value: 'APPROVED', label: 'Approved', position: 2, color: 'green' },
        { value: 'REJECTED', label: 'Rejected', position: 3, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-3500-4000-8000-000000000011',
      type: FieldType.TEXT,
      name: 'bdmQuestionDraft',
      label: 'BDM question draft',
      icon: 'IconMailQuestion',
    },
    {
      universalIdentifier: '6b6d0000-3500-4000-8000-000000000012',
      type: FieldType.BOOLEAN,
      name: 'providerGated',
      label: 'Provider gated',
      icon: 'IconLock',
    },
  ],
});
