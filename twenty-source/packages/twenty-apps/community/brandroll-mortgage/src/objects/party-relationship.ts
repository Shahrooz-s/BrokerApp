import { FieldType, defineObject } from 'twenty-sdk/define';

export const PARTY_RELATIONSHIP_OBJECT_ID =
  '6b6d0000-3400-4000-8000-000000000001';
export const PARTY_RELATIONSHIP_NAME_FIELD_ID =
  '6b6d0000-3400-4000-8000-000000000002';
export const PARTY_RELATIONSHIP_TYPE_FIELD_ID =
  '6b6d0000-3400-4000-8000-000000000003';

export default defineObject({
  universalIdentifier: PARTY_RELATIONSHIP_OBJECT_ID,
  nameSingular: 'partyRelationship',
  namePlural: 'partyRelationships',
  labelSingular: 'Party relationship',
  labelPlural: 'Party relationships',
  description:
    'Applicant, entity, trust, company, guarantor, related-party and beneficial-owner relationship map for BrokerApp loans.',
  icon: 'IconHierarchy3',
  labelIdentifierFieldMetadataUniversalIdentifier:
    PARTY_RELATIONSHIP_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: PARTY_RELATIONSHIP_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'relationshipName',
      label: 'Relationship name',
      icon: 'IconHierarchy3',
    },
    {
      universalIdentifier: PARTY_RELATIONSHIP_TYPE_FIELD_ID,
      type: FieldType.SELECT,
      name: 'relationshipType',
      label: 'Relationship type',
      icon: 'IconUsersGroup',
      options: [
        { value: 'BORROWER', label: 'Borrower', position: 0, color: 'blue' },
        { value: 'CO_BORROWER', label: 'Co-borrower', position: 1, color: 'blue' },
        { value: 'GUARANTOR', label: 'Guarantor', position: 2, color: 'orange' },
        { value: 'DIRECTOR', label: 'Director', position: 3, color: 'purple' },
        { value: 'SHAREHOLDER', label: 'Shareholder', position: 4, color: 'green' },
        { value: 'TRUSTEE', label: 'Trustee', position: 5, color: 'purple' },
        { value: 'UNIT_HOLDER', label: 'Unit holder', position: 6, color: 'green' },
        { value: 'BENEFICIARY', label: 'Beneficiary', position: 7, color: 'blue' },
        { value: 'APPOINTOR', label: 'Appointor', position: 8, color: 'orange' },
        { value: 'SETTLOR', label: 'Settlor', position: 9, color: 'gray' },
        { value: 'PARTNER', label: 'Partner', position: 10, color: 'green' },
        { value: 'RELATED_PARTY', label: 'Related party', position: 11, color: 'gray' },
        { value: 'BDM', label: 'BDM', position: 12, color: 'yellow' },
        { value: 'REFERRER', label: 'Referrer', position: 13, color: 'yellow' },
        { value: 'ACCOUNTANT', label: 'Accountant', position: 14, color: 'gray' },
        { value: 'SOLICITOR', label: 'Solicitor', position: 15, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-3400-4000-8000-000000000004',
      type: FieldType.SELECT,
      name: 'entityType',
      label: 'Entity type',
      icon: 'IconBuilding',
      options: [
        { value: 'INDIVIDUAL', label: 'Individual', position: 0, color: 'blue' },
        { value: 'COMPANY', label: 'Company', position: 1, color: 'purple' },
        { value: 'TRUST', label: 'Trust', position: 2, color: 'orange' },
        { value: 'UNIT_TRUST', label: 'Unit trust', position: 3, color: 'orange' },
        { value: 'PARTNERSHIP', label: 'Partnership', position: 4, color: 'green' },
        { value: 'SOLE_TRADER', label: 'Sole trader', position: 5, color: 'yellow' },
        { value: 'OTHER', label: 'Other', position: 6, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-3400-4000-8000-000000000005',
      type: FieldType.TEXT,
      name: 'sourceRole',
      label: 'Source role',
      icon: 'IconArrowRight',
    },
    {
      universalIdentifier: '6b6d0000-3400-4000-8000-000000000006',
      type: FieldType.TEXT,
      name: 'targetRole',
      label: 'Target role',
      icon: 'IconArrowLeft',
    },
    {
      universalIdentifier: '6b6d0000-3400-4000-8000-000000000007',
      type: FieldType.NUMBER,
      name: 'ownershipPercentage',
      label: 'Ownership percentage',
      icon: 'IconPercentage',
    },
    {
      universalIdentifier: '6b6d0000-3400-4000-8000-000000000008',
      type: FieldType.BOOLEAN,
      name: 'isApplicant',
      label: 'Is applicant',
      icon: 'IconUserCheck',
    },
    {
      universalIdentifier: '6b6d0000-3400-4000-8000-000000000009',
      type: FieldType.BOOLEAN,
      name: 'isBeneficialOwner',
      label: 'Is beneficial owner',
      icon: 'IconUserShield',
    },
    {
      universalIdentifier: '6b6d0000-3400-4000-8000-000000000010',
      type: FieldType.SELECT,
      name: 'verificationStatus',
      label: 'Verification status',
      icon: 'IconProgressCheck',
      options: [
        { value: 'NOT_STARTED', label: 'Not started', position: 0, color: 'gray' },
        { value: 'REQUESTED', label: 'Requested', position: 1, color: 'yellow' },
        { value: 'VERIFIED', label: 'Verified', position: 2, color: 'green' },
        { value: 'REFERRED', label: 'Referred', position: 3, color: 'orange' },
        { value: 'FAILED', label: 'Failed', position: 4, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-3400-4000-8000-000000000011',
      type: FieldType.TEXT,
      name: 'relationshipNotes',
      label: 'Relationship notes',
      icon: 'IconNotes',
    },
  ],
});
