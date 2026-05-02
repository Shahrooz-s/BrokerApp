import { FieldType, defineObject } from 'twenty-sdk/define';

export const CLIENT_PORTAL_SESSION_OBJECT_ID =
  '6b6d0000-4600-4000-8000-000000000001';
export const CLIENT_PORTAL_SESSION_NAME_FIELD_ID =
  '6b6d0000-4600-4000-8000-000000000002';
export const CLIENT_PORTAL_SESSION_STATUS_FIELD_ID =
  '6b6d0000-4600-4000-8000-000000000003';

export default defineObject({
  universalIdentifier: CLIENT_PORTAL_SESSION_OBJECT_ID,
  nameSingular: 'clientPortalSession',
  namePlural: 'clientPortalSessions',
  labelSingular: 'Client portal session',
  labelPlural: 'Client portal sessions',
  description:
    'External borrower portal session for fact find, KYC, document requests, bank statements, open banking, and client next actions.',
  icon: 'IconUserScreen',
  labelIdentifierFieldMetadataUniversalIdentifier:
    CLIENT_PORTAL_SESSION_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: CLIENT_PORTAL_SESSION_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'portalSessionName',
      label: 'Portal session name',
      icon: 'IconUserScreen',
    },
    {
      universalIdentifier: CLIENT_PORTAL_SESSION_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'portalSessionStatus',
      label: 'Status',
      icon: 'IconProgress',
      options: [
        { value: 'DRAFT', label: 'Draft', position: 0, color: 'gray' },
        { value: 'INVITED', label: 'Invited', position: 1, color: 'blue' },
        { value: 'ACTIVE', label: 'Active', position: 2, color: 'purple' },
        { value: 'SUBMITTED', label: 'Submitted', position: 3, color: 'green' },
        { value: 'CHANGES_REQUESTED', label: 'Changes requested', position: 4, color: 'orange' },
        { value: 'LOCKED', label: 'Locked', position: 5, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4600-4000-8000-000000000004',
      type: FieldType.SELECT,
      name: 'authMode',
      label: 'Auth mode',
      icon: 'IconShieldLock',
      options: [
        { value: 'EMAIL_MAGIC_LINK', label: 'Email magic link', position: 0, color: 'blue' },
        { value: 'PASSKEY', label: 'Passkey', position: 1, color: 'green' },
        { value: 'STAFF_PROXY', label: 'Staff proxy', position: 2, color: 'orange' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4600-4000-8000-000000000005',
      type: FieldType.TEXT,
      name: 'portalUrl',
      label: 'Portal URL',
      icon: 'IconLink',
    },
    {
      universalIdentifier: '6b6d0000-4600-4000-8000-000000000006',
      type: FieldType.TEXT,
      name: 'applicantReference',
      label: 'Applicant reference',
      icon: 'IconUser',
    },
    {
      universalIdentifier: '6b6d0000-4600-4000-8000-000000000007',
      type: FieldType.NUMBER,
      name: 'completionPercent',
      label: 'Completion percent',
      icon: 'IconPercentage',
    },
    {
      universalIdentifier: '6b6d0000-4600-4000-8000-000000000008',
      type: FieldType.SELECT,
      name: 'factFindStatus',
      label: 'Fact find status',
      icon: 'IconForms',
      options: [
        { value: 'NOT_STARTED', label: 'Not started', position: 0, color: 'gray' },
        { value: 'IN_PROGRESS', label: 'In progress', position: 1, color: 'blue' },
        { value: 'SUBMITTED', label: 'Submitted', position: 2, color: 'purple' },
        { value: 'REVIEW_REQUIRED', label: 'Review required', position: 3, color: 'orange' },
        { value: 'COMPLETE', label: 'Complete', position: 4, color: 'green' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4600-4000-8000-000000000009',
      type: FieldType.SELECT,
      name: 'kycStatus',
      label: 'KYC status',
      icon: 'IconId',
      options: [
        { value: 'NOT_STARTED', label: 'Not started', position: 0, color: 'gray' },
        { value: 'CONSENT_REQUIRED', label: 'Consent required', position: 1, color: 'orange' },
        { value: 'IN_PROGRESS', label: 'In progress', position: 2, color: 'blue' },
        { value: 'MANUAL_REVIEW', label: 'Manual review', position: 3, color: 'yellow' },
        { value: 'COMPLETE', label: 'Complete', position: 4, color: 'green' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4600-4000-8000-000000000010',
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
    },
    {
      universalIdentifier: '6b6d0000-4600-4000-8000-000000000011',
      type: FieldType.SELECT,
      name: 'bankDataStatus',
      label: 'Bank data status',
      icon: 'IconBuildingBank',
      options: [
        { value: 'NOT_REQUIRED', label: 'Not required', position: 0, color: 'gray' },
        { value: 'CONSENT_REQUIRED', label: 'Consent required', position: 1, color: 'orange' },
        { value: 'OPEN_BANKING_CONNECTED', label: 'Open banking connected', position: 2, color: 'green' },
        { value: 'BANK_STATEMENTS_UPLOADED', label: 'Bank statements uploaded', position: 3, color: 'purple' },
        { value: 'REVIEW_REQUIRED', label: 'Review required', position: 4, color: 'yellow' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4600-4000-8000-000000000012',
      type: FieldType.TEXT,
      name: 'nextClientAction',
      label: 'Next client action',
      icon: 'IconPlayerPlay',
    },
    {
      universalIdentifier: '6b6d0000-4600-4000-8000-000000000013',
      type: FieldType.TEXT,
      name: 'missingItemsSummary',
      label: 'Missing items summary',
      icon: 'IconListDetails',
    },
    {
      universalIdentifier: '6b6d0000-4600-4000-8000-000000000014',
      type: FieldType.DATE_TIME,
      name: 'lastClientActivityAt',
      label: 'Last client activity',
      icon: 'IconClock',
    },
    {
      universalIdentifier: '6b6d0000-4600-4000-8000-000000000015',
      type: FieldType.TEXT,
      name: 'safeClientMessage',
      label: 'Safe client message',
      icon: 'IconMessage',
      description:
        'Display-safe client-facing status text. Do not store AML suspicion, internal risk scores, or broker-only notes here.',
    },
  ],
});
