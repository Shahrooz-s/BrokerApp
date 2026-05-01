import { FieldType, defineObject } from 'twenty-sdk/define';

export const APPLICANT_PROFILE_OBJECT_ID =
  '6b6d0000-1100-4000-8000-000000000001';
export const APPLICANT_PROFILE_NAME_FIELD_ID =
  '6b6d0000-1100-4000-8000-000000000002';

export default defineObject({
  universalIdentifier: APPLICANT_PROFILE_OBJECT_ID,
  nameSingular: 'applicantProfile',
  namePlural: 'applicantProfiles',
  labelSingular: 'Applicant profile',
  labelPlural: 'Applicant profiles',
  description:
    'Applicant and co-applicant fact-find summary aligned to LIXI party concepts.',
  icon: 'IconUserCheck',
  labelIdentifierFieldMetadataUniversalIdentifier: APPLICANT_PROFILE_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: APPLICANT_PROFILE_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'applicantName',
      label: 'Applicant name',
      icon: 'IconUser',
    },
    {
      universalIdentifier: '6b6d0000-1100-4000-8000-000000000003',
      type: FieldType.SELECT,
      name: 'applicantRole',
      label: 'Applicant role',
      icon: 'IconUsers',
      options: [
        { value: 'PRIMARY', label: 'Primary', position: 0, color: 'blue' },
        { value: 'CO_APPLICANT', label: 'Co-applicant', position: 1, color: 'green' },
        { value: 'GUARANTOR', label: 'Guarantor', position: 2, color: 'orange' },
        { value: 'BORROWING_ENTITY', label: 'Borrowing entity', position: 3, color: 'purple' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1100-4000-8000-000000000004',
      type: FieldType.SELECT,
      name: 'residencyStatus',
      label: 'Residency status',
      icon: 'IconFlag',
      options: [
        { value: 'CITIZEN', label: 'Citizen', position: 0, color: 'green' },
        { value: 'PERMANENT_RESIDENT', label: 'Permanent resident', position: 1, color: 'green' },
        { value: 'TEMPORARY_RESIDENT', label: 'Temporary resident', position: 2, color: 'orange' },
        { value: 'FOREIGN_APPLICANT', label: 'Foreign applicant', position: 3, color: 'red' },
        { value: 'UNKNOWN', label: 'Unknown', position: 4, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1100-4000-8000-000000000005',
      type: FieldType.SELECT,
      name: 'idVerificationStatus',
      label: 'ID verification',
      icon: 'IconId',
      options: [
        { value: 'NOT_STARTED', label: 'Not started', position: 0, color: 'gray' },
        { value: 'REQUESTED', label: 'Requested', position: 1, color: 'blue' },
        { value: 'PASSED', label: 'Passed', position: 2, color: 'green' },
        { value: 'REFERRED', label: 'Referred', position: 3, color: 'orange' },
        { value: 'FAILED', label: 'Failed', position: 4, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1100-4000-8000-000000000006',
      type: FieldType.BOOLEAN,
      name: 'openBankingConsent',
      label: 'Open banking consent',
      icon: 'IconShieldCheck',
    },
    {
      universalIdentifier: '6b6d0000-1100-4000-8000-000000000007',
      type: FieldType.NUMBER,
      name: 'grossAnnualIncome',
      label: 'Gross annual income',
      icon: 'IconCurrencyDollar',
    },
  ],
});
