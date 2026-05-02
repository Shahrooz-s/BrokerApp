import { FieldType, defineObject } from 'twenty-sdk/define';

export const BROKER_LENDER_OBJECT_ID =
  '6b6d0000-2c00-4000-8000-000000000001';
export const BROKER_LENDER_NAME_FIELD_ID =
  '6b6d0000-2c00-4000-8000-000000000002';
export const BROKER_LENDER_CATEGORY_FIELD_ID =
  '6b6d0000-2c00-4000-8000-000000000004';
export const BROKER_LENDER_STATUS_FIELD_ID =
  '6b6d0000-2c00-4000-8000-000000000005';
export const BROKER_LENDER_PANEL_STATUS_FIELD_ID =
  '6b6d0000-2c00-4000-8000-000000000006';
export const BROKER_LENDER_LODGEMENT_CHANNEL_FIELD_ID =
  '6b6d0000-2c00-4000-8000-000000000007';
export const BROKER_LENDER_POLICY_REVIEW_DUE_FIELD_ID =
  '6b6d0000-2c00-4000-8000-000000000018';

export default defineObject({
  universalIdentifier: BROKER_LENDER_OBJECT_ID,
  nameSingular: 'brokerLender',
  namePlural: 'brokerLenders',
  labelSingular: 'Broker lender',
  labelPlural: 'Broker lenders',
  description:
    'Broker Settings lender profile for categorisation, LIXI/AFG/ApplyOnline references, calculator links, policy links, and document category setup.',
  icon: 'IconBuildingBank',
  labelIdentifierFieldMetadataUniversalIdentifier: BROKER_LENDER_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: BROKER_LENDER_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'lenderName',
      label: 'Lender name',
      icon: 'IconBuildingBank',
    },
    {
      universalIdentifier: '6b6d0000-2c00-4000-8000-000000000003',
      type: FieldType.TEXT,
      name: 'lenderCode',
      label: 'Internal lender code',
      icon: 'IconHash',
    },
    {
      universalIdentifier: BROKER_LENDER_CATEGORY_FIELD_ID,
      type: FieldType.SELECT,
      name: 'lenderCategory',
      label: 'Lender category',
      icon: 'IconCategory',
      options: [
        { value: 'BIG_FOUR', label: 'Big four', position: 0, color: 'blue' },
        { value: 'MAJOR_BANK', label: 'Major bank', position: 1, color: 'blue' },
        { value: 'REGIONAL_BANK', label: 'Regional bank', position: 2, color: 'green' },
        { value: 'MUTUAL', label: 'Mutual / credit union', position: 3, color: 'green' },
        { value: 'NON_BANK', label: 'Non-bank', position: 4, color: 'purple' },
        { value: 'SPECIALIST', label: 'Specialist lender', position: 5, color: 'orange' },
        { value: 'PRIVATE', label: 'Private lender', position: 6, color: 'red' },
        { value: 'COMMERCIAL', label: 'Commercial lender', position: 7, color: 'yellow' },
        { value: 'OTHER', label: 'Other', position: 8, color: 'gray' },
      ],
    },
    {
      universalIdentifier: BROKER_LENDER_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'lenderStatus',
      label: 'Status',
      icon: 'IconProgress',
      options: [
        { value: 'ACTIVE', label: 'Active', position: 0, color: 'green' },
        { value: 'WATCHLIST', label: 'Watchlist', position: 1, color: 'orange' },
        { value: 'LIMITED_USE', label: 'Limited use', position: 2, color: 'yellow' },
        { value: 'INACTIVE', label: 'Inactive', position: 3, color: 'gray' },
        { value: 'ARCHIVED', label: 'Archived', position: 4, color: 'gray' },
      ],
    },
    {
      universalIdentifier: BROKER_LENDER_PANEL_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'panelStatus',
      label: 'Panel status',
      icon: 'IconCertificate',
      options: [
        { value: 'ON_PANEL', label: 'On panel', position: 0, color: 'green' },
        { value: 'ACCREDITED', label: 'Accredited', position: 1, color: 'green' },
        { value: 'PENDING', label: 'Pending', position: 2, color: 'yellow' },
        { value: 'RESTRICTED', label: 'Restricted', position: 3, color: 'orange' },
        { value: 'OFF_PANEL', label: 'Off panel', position: 4, color: 'red' },
      ],
    },
    {
      universalIdentifier: BROKER_LENDER_LODGEMENT_CHANNEL_FIELD_ID,
      type: FieldType.SELECT,
      name: 'lodgementChannel',
      label: 'Lodgement channel',
      icon: 'IconSend',
      options: [
        { value: 'APPLYONLINE', label: 'ApplyOnline', position: 0, color: 'green' },
        { value: 'AFG_FLEX', label: 'AFG Flex', position: 1, color: 'blue' },
        { value: 'AFG', label: 'AFG', position: 2, color: 'blue' },
        { value: 'BROKERENGINE', label: 'BrokerEngine', position: 3, color: 'orange' },
        { value: 'MANUAL', label: 'Manual', position: 4, color: 'gray' },
        { value: 'OTHER', label: 'Other', position: 5, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-2c00-4000-8000-000000000008',
      type: FieldType.TEXT,
      name: 'lixiPartyReference',
      label: 'LIXI party reference',
      icon: 'IconRoute',
    },
    {
      universalIdentifier: '6b6d0000-2c00-4000-8000-000000000009',
      type: FieldType.TEXT,
      name: 'applyOnlineLenderCode',
      label: 'ApplyOnline lender code',
      icon: 'IconHash',
    },
    {
      universalIdentifier: '6b6d0000-2c00-4000-8000-000000000010',
      type: FieldType.TEXT,
      name: 'afgLenderCode',
      label: 'AFG lender code',
      icon: 'IconHash',
    },
    {
      universalIdentifier: '6b6d0000-2c00-4000-8000-000000000011',
      type: FieldType.TEXT,
      name: 'brokerEngineLenderCode',
      label: 'BrokerEngine lender code',
      icon: 'IconHash',
    },
    {
      universalIdentifier: '6b6d0000-2c00-4000-8000-000000000012',
      type: FieldType.TEXT,
      name: 'productMatrixSource',
      label: 'Product matrix source',
      icon: 'IconTable',
    },
    {
      universalIdentifier: '6b6d0000-2c00-4000-8000-000000000013',
      type: FieldType.LINKS,
      name: 'brokerPortalLinks',
      label: 'Broker portal links',
      icon: 'IconExternalLink',
    },
    {
      universalIdentifier: '6b6d0000-2c00-4000-8000-000000000014',
      type: FieldType.LINKS,
      name: 'calculatorLinks',
      label: 'Calculator links',
      icon: 'IconCalculator',
    },
    {
      universalIdentifier: '6b6d0000-2c00-4000-8000-000000000015',
      type: FieldType.LINKS,
      name: 'policyLinks',
      label: 'Policy links',
      icon: 'IconScale',
    },
    {
      universalIdentifier: '6b6d0000-2c00-4000-8000-000000000016',
      type: FieldType.LINKS,
      name: 'documentChecklistLinks',
      label: 'Document checklist links',
      icon: 'IconFiles',
    },
    {
      universalIdentifier: '6b6d0000-2c00-4000-8000-000000000017',
      type: FieldType.TEXT,
      name: 'defaultDocumentCategorySet',
      label: 'Default document category set',
      icon: 'IconFiles',
    },
    {
      universalIdentifier: BROKER_LENDER_POLICY_REVIEW_DUE_FIELD_ID,
      type: FieldType.DATE,
      name: 'policyReviewDueOn',
      label: 'Policy review due on',
      icon: 'IconCalendarDue',
    },
    {
      universalIdentifier: '6b6d0000-2c00-4000-8000-000000000019',
      type: FieldType.DATE,
      name: 'lastProductMatrixReviewOn',
      label: 'Last product matrix review',
      icon: 'IconCalendarCheck',
    },
    {
      universalIdentifier: '6b6d0000-2c00-4000-8000-000000000020',
      type: FieldType.TEXT,
      name: 'lenderNotes',
      label: 'Lender notes',
      icon: 'IconNotes',
    },
  ],
});
