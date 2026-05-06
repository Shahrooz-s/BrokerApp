import { FieldType, defineObject } from 'twenty-sdk/define';

export const BDM_QUESTION_DRAFT_OBJECT_ID =
  '6b6d0000-3600-4000-8000-000000000001';
export const BDM_QUESTION_DRAFT_NAME_FIELD_ID =
  '6b6d0000-3600-4000-8000-000000000002';
export const BDM_QUESTION_DRAFT_STATUS_FIELD_ID =
  '6b6d0000-3600-4000-8000-000000000003';

export default defineObject({
  universalIdentifier: BDM_QUESTION_DRAFT_OBJECT_ID,
  nameSingular: 'bdmQuestionDraft',
  namePlural: 'bdmQuestionDrafts',
  labelSingular: 'BDM question draft',
  labelPlural: 'BDM question drafts',
  description:
    'PolicySpace and CreditDash lender BDM question drafts. Sending is disabled until broker approval and email credentials are enabled.',
  icon: 'IconMailQuestion',
  labelIdentifierFieldMetadataUniversalIdentifier:
    BDM_QUESTION_DRAFT_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: BDM_QUESTION_DRAFT_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'draftName',
      label: 'Draft name',
      icon: 'IconMailQuestion',
    },
    {
      universalIdentifier: BDM_QUESTION_DRAFT_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'draftStatus',
      label: 'Draft status',
      icon: 'IconProgress',
      options: [
        { value: 'DRAFT', label: 'Draft', position: 0, color: 'gray' },
        { value: 'BROKER_REVIEW_REQUIRED', label: 'Broker review required', position: 1, color: 'orange' },
        { value: 'APPROVED', label: 'Approved', position: 2, color: 'green' },
        { value: 'SENT', label: 'Sent', position: 3, color: 'blue' },
        { value: 'CANCELLED', label: 'Cancelled', position: 4, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-3600-4000-8000-000000000004',
      type: FieldType.TEXT,
      name: 'selectedLender',
      label: 'Selected lender',
      icon: 'IconBuildingBank',
    },
    {
      universalIdentifier: '6b6d0000-3600-4000-8000-000000000005',
      type: FieldType.TEXT,
      name: 'bdmContact',
      label: 'BDM contact',
      icon: 'IconUser',
    },
    {
      universalIdentifier: '6b6d0000-3600-4000-8000-000000000006',
      type: FieldType.TEXT,
      name: 'subject',
      label: 'Subject',
      icon: 'IconMail',
    },
    {
      universalIdentifier: '6b6d0000-3600-4000-8000-000000000007',
      type: FieldType.TEXT,
      name: 'questionBody',
      label: 'Question body',
      icon: 'IconMessage',
    },
    {
      universalIdentifier: '6b6d0000-3600-4000-8000-000000000008',
      type: FieldType.TEXT,
      name: 'relatedPolicyArea',
      label: 'Related policy area',
      icon: 'IconScale',
    },
    {
      universalIdentifier: '6b6d0000-3600-4000-8000-000000000009',
      type: FieldType.SELECT,
      name: 'brokerApprovalStatus',
      label: 'Broker approval status',
      icon: 'IconUserCheck',
      options: [
        { value: 'NOT_REVIEWED', label: 'Not reviewed', position: 0, color: 'gray' },
        { value: 'APPROVED', label: 'Approved', position: 1, color: 'green' },
        { value: 'DECLINED', label: 'Declined', position: 2, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-3600-4000-8000-000000000010',
      type: FieldType.SELECT,
      name: 'sendGateStatus',
      label: 'Send gate status',
      icon: 'IconLock',
      options: [
        { value: 'DISABLED', label: 'Disabled', position: 0, color: 'gray' },
        { value: 'MISSING_CREDENTIALS', label: 'Missing credentials', position: 1, color: 'orange' },
        { value: 'BROKER_APPROVAL_REQUIRED', label: 'Broker approval required', position: 2, color: 'yellow' },
        { value: 'READY', label: 'Ready', position: 3, color: 'green' },
      ],
    },
  ],
});
