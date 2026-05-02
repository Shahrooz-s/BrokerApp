import { FieldType, defineObject } from 'twenty-sdk/define';

export const KYC_CONSENT_OBJECT_ID =
  '6b6d0000-4820-4000-8000-000000000001';
export const KYC_CONSENT_NAME_FIELD_ID =
  '6b6d0000-4820-4000-8000-000000000002';
export const KYC_CONSENT_STATUS_FIELD_ID =
  '6b6d0000-4820-4000-8000-000000000003';

export default defineObject({
  universalIdentifier: KYC_CONSENT_OBJECT_ID,
  nameSingular: 'kycConsent',
  namePlural: 'kycConsents',
  labelSingular: 'KYC consent',
  labelPlural: 'KYC consents',
  description:
    'Consent record for identity checks, credit checks, open banking, data sharing, document storage, and lender submission.',
  icon: 'IconFileCertificate',
  labelIdentifierFieldMetadataUniversalIdentifier: KYC_CONSENT_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: KYC_CONSENT_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'consentName',
      label: 'Consent name',
      icon: 'IconFileCertificate',
    },
    {
      universalIdentifier: KYC_CONSENT_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'consentStatus',
      label: 'Status',
      icon: 'IconProgressCheck',
      options: [
        { value: 'NOT_REQUESTED', label: 'Not requested', position: 0, color: 'gray' },
        { value: 'REQUESTED', label: 'Requested', position: 1, color: 'blue' },
        { value: 'GRANTED', label: 'Granted', position: 2, color: 'green' },
        { value: 'DECLINED', label: 'Declined', position: 3, color: 'red' },
        { value: 'REVOKED', label: 'Revoked', position: 4, color: 'orange' },
        { value: 'EXPIRED', label: 'Expired', position: 5, color: 'yellow' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4820-4000-8000-000000000004',
      type: FieldType.SELECT,
      name: 'consentType',
      label: 'Consent type',
      icon: 'IconCategory',
      options: [
        { value: 'IDENTITY_CHECK', label: 'Identity check', position: 0, color: 'blue' },
        { value: 'CREDIT_CHECK', label: 'Credit check', position: 1, color: 'purple' },
        { value: 'OPEN_BANKING', label: 'Open banking', position: 2, color: 'green' },
        { value: 'BANK_STATEMENT', label: 'Bank statement', position: 3, color: 'orange' },
        { value: 'DOCUMENT_STORAGE', label: 'Document storage', position: 4, color: 'yellow' },
        { value: 'LENDER_SUBMISSION', label: 'Lender submission', position: 5, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4820-4000-8000-000000000005',
      type: FieldType.TEXT,
      name: 'subjectReference',
      label: 'Subject reference',
      icon: 'IconUser',
    },
    {
      universalIdentifier: '6b6d0000-4820-4000-8000-000000000006',
      type: FieldType.TEXT,
      name: 'provider',
      label: 'Provider',
      icon: 'IconPlug',
    },
    {
      universalIdentifier: '6b6d0000-4820-4000-8000-000000000007',
      type: FieldType.TEXT,
      name: 'consentScope',
      label: 'Consent scope',
      icon: 'IconListDetails',
    },
    {
      universalIdentifier: '6b6d0000-4820-4000-8000-000000000008',
      type: FieldType.DATE_TIME,
      name: 'grantedAt',
      label: 'Granted at',
      icon: 'IconClockCheck',
    },
    {
      universalIdentifier: '6b6d0000-4820-4000-8000-000000000009',
      type: FieldType.DATE_TIME,
      name: 'expiresAt',
      label: 'Expires at',
      icon: 'IconClockExclamation',
    },
    {
      universalIdentifier: '6b6d0000-4820-4000-8000-000000000010',
      type: FieldType.TEXT,
      name: 'evidenceReference',
      label: 'Evidence reference',
      icon: 'IconFileCheck',
    },
  ],
});
