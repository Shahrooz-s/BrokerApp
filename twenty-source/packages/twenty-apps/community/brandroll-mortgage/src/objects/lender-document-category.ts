import { FieldType, defineObject } from 'twenty-sdk/define';

export const LENDER_DOCUMENT_CATEGORY_OBJECT_ID =
  '6b6d0000-2c30-4000-8000-000000000001';
export const LENDER_DOCUMENT_CATEGORY_NAME_FIELD_ID =
  '6b6d0000-2c30-4000-8000-000000000002';
export const LENDER_DOCUMENT_CATEGORY_SCENARIO_FIELD_ID =
  '6b6d0000-2c30-4000-8000-000000000003';
export const LENDER_DOCUMENT_CATEGORY_STATUS_FIELD_ID =
  '6b6d0000-2c30-4000-8000-000000000004';
export const LENDER_DOCUMENT_CATEGORY_REQUIRED_FIELD_ID =
  '6b6d0000-2c30-4000-8000-000000000008';

export default defineObject({
  universalIdentifier: LENDER_DOCUMENT_CATEGORY_OBJECT_ID,
  nameSingular: 'lenderDocumentCategory',
  namePlural: 'lenderDocumentCategories',
  labelSingular: 'Lender document category',
  labelPlural: 'Lender document categories',
  description:
    'Broker Settings lender document category for scenario-specific evidence, portal display, and LIXI/ApplyOnline/AFG mapping references.',
  icon: 'IconFiles',
  labelIdentifierFieldMetadataUniversalIdentifier:
    LENDER_DOCUMENT_CATEGORY_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: LENDER_DOCUMENT_CATEGORY_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'categoryName',
      label: 'Category name',
      icon: 'IconFiles',
    },
    {
      universalIdentifier: LENDER_DOCUMENT_CATEGORY_SCENARIO_FIELD_ID,
      type: FieldType.SELECT,
      name: 'scenario',
      label: 'Scenario',
      icon: 'IconRoute',
      options: [
        { value: 'ALL_APPLICATIONS', label: 'All applications', position: 0, color: 'blue' },
        { value: 'PURCHASE', label: 'Purchase', position: 1, color: 'green' },
        { value: 'REFINANCE', label: 'Refinance', position: 2, color: 'orange' },
        { value: 'CONSTRUCTION', label: 'Construction', position: 3, color: 'purple' },
        { value: 'INVESTMENT', label: 'Investment', position: 4, color: 'yellow' },
        { value: 'SELF_EMPLOYED', label: 'Self-employed', position: 5, color: 'red' },
        { value: 'COMPANY_TRUST', label: 'Company/trust', position: 6, color: 'gray' },
        { value: 'GUARANTOR', label: 'Guarantor', position: 7, color: 'gray' },
        { value: 'OTHER', label: 'Other', position: 8, color: 'gray' },
      ],
    },
    {
      universalIdentifier: LENDER_DOCUMENT_CATEGORY_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'categoryStatus',
      label: 'Status',
      icon: 'IconProgress',
      options: [
        { value: 'ACTIVE', label: 'Active', position: 0, color: 'green' },
        { value: 'DRAFT', label: 'Draft', position: 1, color: 'blue' },
        { value: 'NEEDS_REVIEW', label: 'Needs review', position: 2, color: 'orange' },
        { value: 'RETIRED', label: 'Retired', position: 3, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-2c30-4000-8000-000000000005',
      type: FieldType.TEXT,
      name: 'applicantRole',
      label: 'Applicant role',
      icon: 'IconUsers',
    },
    {
      universalIdentifier: '6b6d0000-2c30-4000-8000-000000000006',
      type: FieldType.TEXT,
      name: 'evidenceType',
      label: 'Evidence type',
      icon: 'IconFileCheck',
    },
    {
      universalIdentifier: '6b6d0000-2c30-4000-8000-000000000007',
      type: FieldType.TEXT,
      name: 'portalDisplayName',
      label: 'Portal display name',
      icon: 'IconWorldWww',
    },
    {
      universalIdentifier: LENDER_DOCUMENT_CATEGORY_REQUIRED_FIELD_ID,
      type: FieldType.BOOLEAN,
      name: 'requiredByDefault',
      label: 'Required by default',
      icon: 'IconAsterisk',
    },
    {
      universalIdentifier: '6b6d0000-2c30-4000-8000-000000000009',
      type: FieldType.TEXT,
      name: 'sourceChecklistReference',
      label: 'Source checklist reference',
      icon: 'IconHash',
    },
    {
      universalIdentifier: '6b6d0000-2c30-4000-8000-000000000010',
      type: FieldType.TEXT,
      name: 'lixiMappingReference',
      label: 'LIXI mapping reference',
      icon: 'IconRoute',
    },
    {
      universalIdentifier: '6b6d0000-2c30-4000-8000-000000000011',
      type: FieldType.TEXT,
      name: 'applyOnlineMappingReference',
      label: 'ApplyOnline mapping reference',
      icon: 'IconRoute',
    },
    {
      universalIdentifier: '6b6d0000-2c30-4000-8000-000000000012',
      type: FieldType.TEXT,
      name: 'categoryNotes',
      label: 'Category notes',
      icon: 'IconNotes',
    },
  ],
});
