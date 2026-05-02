import { FieldType, defineObject } from 'twenty-sdk/define';

export const EVIDENCE_PACK_OBJECT_ID =
  '6b6d0000-4840-4000-8000-000000000001';
export const EVIDENCE_PACK_NAME_FIELD_ID =
  '6b6d0000-4840-4000-8000-000000000002';
export const EVIDENCE_PACK_STATUS_FIELD_ID =
  '6b6d0000-4840-4000-8000-000000000003';

export default defineObject({
  universalIdentifier: EVIDENCE_PACK_OBJECT_ID,
  nameSingular: 'evidencePack',
  namePlural: 'evidencePacks',
  labelSingular: 'Evidence pack',
  labelPlural: 'Evidence packs',
  description:
    'Lender, aggregator, compliance, or audit evidence pack assembled from verified claims and document metadata.',
  icon: 'IconFileCertificate',
  labelIdentifierFieldMetadataUniversalIdentifier: EVIDENCE_PACK_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: EVIDENCE_PACK_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'evidencePackName',
      label: 'Evidence pack name',
      icon: 'IconFileCertificate',
    },
    {
      universalIdentifier: EVIDENCE_PACK_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'packStatus',
      label: 'Status',
      icon: 'IconProgress',
      options: [
        { value: 'DRAFT', label: 'Draft', position: 0, color: 'gray' },
        { value: 'GENERATING', label: 'Generating', position: 1, color: 'blue' },
        { value: 'READY_FOR_REVIEW', label: 'Ready for review', position: 2, color: 'orange' },
        { value: 'APPROVED', label: 'Approved', position: 3, color: 'green' },
        { value: 'SENT', label: 'Sent', position: 4, color: 'purple' },
        { value: 'ARCHIVED', label: 'Archived', position: 5, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4840-4000-8000-000000000004',
      type: FieldType.SELECT,
      name: 'packType',
      label: 'Pack type',
      icon: 'IconCategory',
      options: [
        { value: 'LENDER_SUBMISSION', label: 'Lender submission', position: 0, color: 'blue' },
        { value: 'AML_CDD', label: 'AML/CDD', position: 1, color: 'red' },
        { value: 'CREDIT_PROPOSAL', label: 'Credit proposal', position: 2, color: 'purple' },
        { value: 'AUDIT', label: 'Audit', position: 3, color: 'orange' },
        { value: 'SETTLEMENT', label: 'Settlement', position: 4, color: 'green' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4840-4000-8000-000000000005',
      type: FieldType.TEXT,
      name: 'recipient',
      label: 'Recipient',
      icon: 'IconSend',
    },
    {
      universalIdentifier: '6b6d0000-4840-4000-8000-000000000006',
      type: FieldType.TEXT,
      name: 'includedSections',
      label: 'Included sections',
      icon: 'IconListDetails',
    },
    {
      universalIdentifier: '6b6d0000-4840-4000-8000-000000000007',
      type: FieldType.TEXT,
      name: 'unresolvedIssues',
      label: 'Unresolved issues',
      icon: 'IconAlertTriangle',
    },
    {
      universalIdentifier: '6b6d0000-4840-4000-8000-000000000008',
      type: FieldType.TEXT,
      name: 'storageReference',
      label: 'Storage reference',
      icon: 'IconLink',
    },
    {
      universalIdentifier: '6b6d0000-4840-4000-8000-000000000009',
      type: FieldType.DATE_TIME,
      name: 'generatedAt',
      label: 'Generated at',
      icon: 'IconClock',
    },
    {
      universalIdentifier: '6b6d0000-4840-4000-8000-000000000010',
      type: FieldType.TEXT,
      name: 'approvedBy',
      label: 'Approved by',
      icon: 'IconUserCheck',
    },
  ],
});
