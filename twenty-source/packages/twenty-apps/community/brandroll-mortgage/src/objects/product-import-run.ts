import { FieldType, defineObject } from 'twenty-sdk/define';

export const PRODUCT_IMPORT_RUN_OBJECT_ID =
  '6b6d0000-4910-4000-8000-000000000001';
export const PRODUCT_IMPORT_RUN_NAME_FIELD_ID =
  '6b6d0000-4910-4000-8000-000000000002';
export const PRODUCT_IMPORT_RUN_STATUS_FIELD_ID =
  '6b6d0000-4910-4000-8000-000000000003';

export default defineObject({
  universalIdentifier: PRODUCT_IMPORT_RUN_OBJECT_ID,
  nameSingular: 'productImportRun',
  namePlural: 'productImportRuns',
  labelSingular: 'Product import run',
  labelPlural: 'Product import runs',
  description:
    'Versioned lender product import from AFG product matrix, lender workbooks, or approved product data files.',
  icon: 'IconFileSpreadsheet',
  labelIdentifierFieldMetadataUniversalIdentifier: PRODUCT_IMPORT_RUN_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: PRODUCT_IMPORT_RUN_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'importName',
      label: 'Import name',
      icon: 'IconFileSpreadsheet',
    },
    {
      universalIdentifier: PRODUCT_IMPORT_RUN_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'importStatus',
      label: 'Status',
      icon: 'IconProgress',
      options: [
        { value: 'UPLOADED', label: 'Uploaded', position: 0, color: 'blue' },
        { value: 'PARSING', label: 'Parsing', position: 1, color: 'purple' },
        { value: 'PREVIEW_READY', label: 'Preview ready', position: 2, color: 'orange' },
        { value: 'APPROVED', label: 'Approved', position: 3, color: 'green' },
        { value: 'APPLIED', label: 'Applied', position: 4, color: 'green' },
        { value: 'REJECTED', label: 'Rejected', position: 5, color: 'red' },
        { value: 'FAILED', label: 'Failed', position: 6, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4910-4000-8000-000000000004',
      type: FieldType.SELECT,
      name: 'productCategory',
      label: 'Product category',
      icon: 'IconCategory',
      options: [
        { value: 'RESIDENTIAL_HOME_LOAN', label: 'Residential home loan', position: 0, color: 'blue' },
        { value: 'PERSONAL_LOAN', label: 'Personal loan', position: 1, color: 'green' },
        { value: 'ASSET_FINANCE', label: 'Asset finance', position: 2, color: 'purple' },
        { value: 'COMMERCIAL_LENDING', label: 'Commercial lending', position: 3, color: 'orange' },
        { value: 'BUSINESS_LENDING', label: 'Business lending', position: 4, color: 'yellow' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4910-4000-8000-000000000005',
      type: FieldType.TEXT,
      name: 'sourceFileReference',
      label: 'Source file reference',
      icon: 'IconFileImport',
    },
    {
      universalIdentifier: '6b6d0000-4910-4000-8000-000000000006',
      type: FieldType.TEXT,
      name: 'sourceProvider',
      label: 'Source provider',
      icon: 'IconDatabaseImport',
    },
    {
      universalIdentifier: '6b6d0000-4910-4000-8000-000000000007',
      type: FieldType.TEXT,
      name: 'selectedSheets',
      label: 'Selected sheets',
      icon: 'IconTableOptions',
    },
    {
      universalIdentifier: '6b6d0000-4910-4000-8000-000000000008',
      type: FieldType.NUMBER,
      name: 'rowsParsed',
      label: 'Rows parsed',
      icon: 'IconListNumbers',
    },
    {
      universalIdentifier: '6b6d0000-4910-4000-8000-000000000009',
      type: FieldType.NUMBER,
      name: 'productsCreated',
      label: 'Products created',
      icon: 'IconCirclePlus',
    },
    {
      universalIdentifier: '6b6d0000-4910-4000-8000-000000000010',
      type: FieldType.NUMBER,
      name: 'productsUpdated',
      label: 'Products updated',
      icon: 'IconRefresh',
    },
    {
      universalIdentifier: '6b6d0000-4910-4000-8000-000000000011',
      type: FieldType.NUMBER,
      name: 'productsArchived',
      label: 'Products archived',
      icon: 'IconArchive',
    },
    {
      universalIdentifier: '6b6d0000-4910-4000-8000-000000000012',
      type: FieldType.TEXT,
      name: 'previewDiffReference',
      label: 'Preview diff reference',
      icon: 'IconGitCompare',
    },
    {
      universalIdentifier: '6b6d0000-4910-4000-8000-000000000013',
      type: FieldType.TEXT,
      name: 'mappingProfileReference',
      label: 'Mapping profile reference',
      icon: 'IconRoute',
    },
    {
      universalIdentifier: '6b6d0000-4910-4000-8000-000000000014',
      type: FieldType.TEXT,
      name: 'approvedBy',
      label: 'Approved by',
      icon: 'IconUserCheck',
    },
  ],
});
