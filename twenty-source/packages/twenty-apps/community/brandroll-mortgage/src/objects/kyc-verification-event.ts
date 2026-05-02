import { FieldType, defineObject } from 'twenty-sdk/define';

export const KYC_VERIFICATION_EVENT_OBJECT_ID =
  '6b6d0000-4810-4000-8000-000000000001';
export const KYC_VERIFICATION_EVENT_NAME_FIELD_ID =
  '6b6d0000-4810-4000-8000-000000000002';
export const KYC_VERIFICATION_EVENT_RESULT_FIELD_ID =
  '6b6d0000-4810-4000-8000-000000000003';

export default defineObject({
  universalIdentifier: KYC_VERIFICATION_EVENT_OBJECT_ID,
  nameSingular: 'kycVerificationEvent',
  namePlural: 'kycVerificationEvents',
  labelSingular: 'KYC verification event',
  labelPlural: 'KYC verification events',
  description:
    'Append-only verification event from identity, document, liveness, PEP/sanctions, credit, open banking, ABR/ASIC, or manual review.',
  icon: 'IconFingerprint',
  labelIdentifierFieldMetadataUniversalIdentifier:
    KYC_VERIFICATION_EVENT_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: KYC_VERIFICATION_EVENT_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'eventName',
      label: 'Event name',
      icon: 'IconFingerprint',
    },
    {
      universalIdentifier: KYC_VERIFICATION_EVENT_RESULT_FIELD_ID,
      type: FieldType.SELECT,
      name: 'eventResult',
      label: 'Result',
      icon: 'IconProgressCheck',
      options: [
        { value: 'PASS', label: 'Pass', position: 0, color: 'green' },
        { value: 'PARTIAL', label: 'Partial', position: 1, color: 'yellow' },
        { value: 'REFER', label: 'Refer', position: 2, color: 'orange' },
        { value: 'FAIL', label: 'Fail', position: 3, color: 'red' },
        { value: 'ERROR', label: 'Error', position: 4, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4810-4000-8000-000000000004',
      type: FieldType.SELECT,
      name: 'eventType',
      label: 'Event type',
      icon: 'IconCategory',
      options: [
        { value: 'EMAIL_VERIFICATION', label: 'Email verification', position: 0, color: 'blue' },
        { value: 'PASSKEY_REGISTERED', label: 'Passkey registered', position: 1, color: 'green' },
        { value: 'DOCUMENT_IDV', label: 'Document IDV', position: 2, color: 'purple' },
        { value: 'FACE_LIVENESS', label: 'Face/liveness', position: 3, color: 'orange' },
        { value: 'PEP_SANCTIONS', label: 'PEP/sanctions', position: 4, color: 'red' },
        { value: 'CREDIT_CHECK', label: 'Credit check', position: 5, color: 'yellow' },
        { value: 'OPEN_BANKING', label: 'Open banking', position: 6, color: 'green' },
        { value: 'ABR_ASIC', label: 'ABR/ASIC', position: 7, color: 'blue' },
        { value: 'MANUAL_REVIEW', label: 'Manual review', position: 8, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4810-4000-8000-000000000005',
      type: FieldType.TEXT,
      name: 'subjectReference',
      label: 'Subject reference',
      icon: 'IconUser',
    },
    {
      universalIdentifier: '6b6d0000-4810-4000-8000-000000000006',
      type: FieldType.TEXT,
      name: 'provider',
      label: 'Provider',
      icon: 'IconPlug',
    },
    {
      universalIdentifier: '6b6d0000-4810-4000-8000-000000000007',
      type: FieldType.TEXT,
      name: 'providerReferenceId',
      label: 'Provider reference ID',
      icon: 'IconId',
    },
    {
      universalIdentifier: '6b6d0000-4810-4000-8000-000000000008',
      type: FieldType.TEXT,
      name: 'claimsChecked',
      label: 'Claims checked',
      icon: 'IconListCheck',
    },
    {
      universalIdentifier: '6b6d0000-4810-4000-8000-000000000009',
      type: FieldType.TEXT,
      name: 'reasonCodes',
      label: 'Reason codes',
      icon: 'IconTags',
    },
    {
      universalIdentifier: '6b6d0000-4810-4000-8000-000000000010',
      type: FieldType.TEXT,
      name: 'evidencePointer',
      label: 'Evidence pointer',
      icon: 'IconFileCheck',
    },
    {
      universalIdentifier: '6b6d0000-4810-4000-8000-000000000011',
      type: FieldType.DATE_TIME,
      name: 'eventTimestamp',
      label: 'Event timestamp',
      icon: 'IconClock',
    },
    {
      universalIdentifier: '6b6d0000-4810-4000-8000-000000000012',
      type: FieldType.TEXT,
      name: 'reviewedBy',
      label: 'Reviewed by',
      icon: 'IconUserCheck',
    },
  ],
});
