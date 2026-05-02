import { FieldType, defineObject } from 'twenty-sdk/define';

export const KYC_CDD_PROFILE_OBJECT_ID =
  '6b6d0000-4800-4000-8000-000000000001';
export const KYC_CDD_PROFILE_NAME_FIELD_ID =
  '6b6d0000-4800-4000-8000-000000000002';
export const KYC_CDD_PROFILE_STATUS_FIELD_ID =
  '6b6d0000-4800-4000-8000-000000000003';

export default defineObject({
  universalIdentifier: KYC_CDD_PROFILE_OBJECT_ID,
  nameSingular: 'kycCddProfile',
  namePlural: 'kycCddProfiles',
  labelSingular: 'KYC/CDD profile',
  labelPlural: 'KYC/CDD profiles',
  description:
    'Progressive customer due diligence profile separating identity confidence, AML/CTF risk, fraud risk, and CDD completion.',
  icon: 'IconShieldCheck',
  labelIdentifierFieldMetadataUniversalIdentifier: KYC_CDD_PROFILE_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: KYC_CDD_PROFILE_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'profileName',
      label: 'Profile name',
      icon: 'IconShieldCheck',
    },
    {
      universalIdentifier: KYC_CDD_PROFILE_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'cddStatus',
      label: 'CDD status',
      icon: 'IconProgressCheck',
      options: [
        { value: 'NOT_STARTED', label: 'Not started', position: 0, color: 'gray' },
        { value: 'CONSENT_REQUIRED', label: 'Consent required', position: 1, color: 'orange' },
        { value: 'IN_PROGRESS', label: 'In progress', position: 2, color: 'blue' },
        { value: 'MORE_INFO_REQUIRED', label: 'More info required', position: 3, color: 'yellow' },
        { value: 'MANUAL_REVIEW', label: 'Manual review', position: 4, color: 'purple' },
        { value: 'ECDD_REQUIRED', label: 'ECDD required', position: 5, color: 'red' },
        { value: 'VERIFIED_LOW_RISK', label: 'Verified - low risk', position: 6, color: 'green' },
        { value: 'DO_NOT_PROCEED', label: 'Do not proceed', position: 7, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4800-4000-8000-000000000004',
      type: FieldType.SELECT,
      name: 'customerType',
      label: 'Customer type',
      icon: 'IconUsers',
      options: [
        { value: 'INDIVIDUAL', label: 'Individual', position: 0, color: 'blue' },
        { value: 'SOLE_TRADER', label: 'Sole trader', position: 1, color: 'green' },
        { value: 'COMPANY', label: 'Company', position: 2, color: 'purple' },
        { value: 'TRUST', label: 'Trust', position: 3, color: 'orange' },
        { value: 'PARTNERSHIP', label: 'Partnership', position: 4, color: 'yellow' },
        { value: 'ASSOCIATION', label: 'Association', position: 5, color: 'gray' },
        { value: 'GOVERNMENT', label: 'Government', position: 6, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4800-4000-8000-000000000005',
      type: FieldType.NUMBER,
      name: 'identityConfidenceScore',
      label: 'Identity confidence score',
      icon: 'IconId',
    },
    {
      universalIdentifier: '6b6d0000-4800-4000-8000-000000000006',
      type: FieldType.NUMBER,
      name: 'amlCtfRiskScore',
      label: 'AML/CTF risk score',
      icon: 'IconShieldExclamation',
    },
    {
      universalIdentifier: '6b6d0000-4800-4000-8000-000000000007',
      type: FieldType.NUMBER,
      name: 'fraudRiskScore',
      label: 'Fraud risk score',
      icon: 'IconFingerprint',
    },
    {
      universalIdentifier: '6b6d0000-4800-4000-8000-000000000008',
      type: FieldType.NUMBER,
      name: 'cddCompletionScore',
      label: 'CDD completion score',
      icon: 'IconPercentage',
    },
    {
      universalIdentifier: '6b6d0000-4800-4000-8000-000000000009',
      type: FieldType.SELECT,
      name: 'lenderSubmissionReadiness',
      label: 'Lender submission readiness',
      icon: 'IconSend',
      options: [
        { value: 'NOT_READY', label: 'Not ready', position: 0, color: 'gray' },
        { value: 'READY', label: 'Ready', position: 1, color: 'green' },
        { value: 'EXCEPTION_REQUIRED', label: 'Exception required', position: 2, color: 'orange' },
        { value: 'BLOCKED', label: 'Blocked', position: 3, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4800-4000-8000-000000000010',
      type: FieldType.TEXT,
      name: 'reasonCodes',
      label: 'Reason codes',
      icon: 'IconTags',
    },
    {
      universalIdentifier: '6b6d0000-4800-4000-8000-000000000011',
      type: FieldType.TEXT,
      name: 'lenderRuleSetApplied',
      label: 'Lender rule set applied',
      icon: 'IconBuildingBank',
    },
    {
      universalIdentifier: '6b6d0000-4800-4000-8000-000000000012',
      type: FieldType.BOOLEAN,
      name: 'hardStopActive',
      label: 'Hard stop active',
      icon: 'IconHandStop',
    },
    {
      universalIdentifier: '6b6d0000-4800-4000-8000-000000000013',
      type: FieldType.BOOLEAN,
      name: 'ecddRequired',
      label: 'ECDD required',
      icon: 'IconShieldExclamation',
    },
    {
      universalIdentifier: '6b6d0000-4800-4000-8000-000000000014',
      type: FieldType.TEXT,
      name: 'beneficialOwnershipSummary',
      label: 'Beneficial ownership summary',
      icon: 'IconHierarchy',
    },
    {
      universalIdentifier: '6b6d0000-4800-4000-8000-000000000015',
      type: FieldType.TEXT,
      name: 'safeStaffSummary',
      label: 'Safe staff summary',
      icon: 'IconNotes',
      description:
        'Staff-facing operational summary. Do not render internal suspicion notes to the client portal.',
    },
  ],
});
