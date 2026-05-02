import { FieldType, defineObject } from 'twenty-sdk/define';

export const PROPERTY_SECURITY_OBJECT_ID =
  '6b6d0000-1300-4000-8000-000000000001';
export const PROPERTY_SECURITY_NAME_FIELD_ID =
  '6b6d0000-1300-4000-8000-000000000002';

export default defineObject({
  universalIdentifier: PROPERTY_SECURITY_OBJECT_ID,
  nameSingular: 'propertySecurity',
  namePlural: 'propertySecurities',
  labelSingular: 'Property security',
  labelPlural: 'Property securities',
  description: 'Property/security data for valuation, LVR, and title workflows.',
  icon: 'IconHome',
  labelIdentifierFieldMetadataUniversalIdentifier: PROPERTY_SECURITY_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: PROPERTY_SECURITY_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'propertyName',
      label: 'Property name',
      icon: 'IconAbc',
    },
    {
      universalIdentifier: '6b6d0000-1300-4000-8000-000000000003',
      type: FieldType.ADDRESS,
      name: 'propertyAddress',
      label: 'Property address',
      icon: 'IconMapPin',
    },
    {
      universalIdentifier: '6b6d0000-1300-4000-8000-000000000004',
      type: FieldType.SELECT,
      name: 'occupancy',
      label: 'Occupancy',
      icon: 'IconHomeCheck',
      options: [
        { value: 'OWNER_OCCUPIED', label: 'Owner occupied', position: 0, color: 'green' },
        { value: 'INVESTMENT', label: 'Investment', position: 1, color: 'purple' },
        { value: 'VACANT', label: 'Vacant', position: 2, color: 'orange' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1300-4000-8000-000000000005',
      type: FieldType.NUMBER,
      name: 'estimatedValue',
      label: 'Estimated value',
      icon: 'IconCurrencyDollar',
    },
    {
      universalIdentifier: '6b6d0000-1300-4000-8000-000000000006',
      type: FieldType.TEXT,
      name: 'titleReference',
      label: 'Title reference',
      icon: 'IconFileSearch',
    },
    {
      universalIdentifier: '6b6d0000-1300-4000-8000-000000000007',
      type: FieldType.TEXT,
      name: 'securityState',
      label: 'Security state',
      icon: 'IconMapPin',
    },
    {
      universalIdentifier: '6b6d0000-1300-4000-8000-000000000008',
      type: FieldType.NUMBER,
      name: 'purchasePrice',
      label: 'Purchase price',
      icon: 'IconCurrencyDollar',
    },
    {
      universalIdentifier: '6b6d0000-1300-4000-8000-000000000009',
      type: FieldType.NUMBER,
      name: 'proposedLoanAmountSecured',
      label: 'Proposed loan amount secured',
      icon: 'IconCurrencyDollar',
    },
    {
      universalIdentifier: '6b6d0000-1300-4000-8000-000000000010',
      type: FieldType.SELECT,
      name: 'securityPurpose',
      label: 'Security purpose',
      icon: 'IconHomeDollar',
      options: [
        { value: 'PURCHASE', label: 'Purchase', position: 0, color: 'green' },
        { value: 'REFINANCE', label: 'Refinance', position: 1, color: 'blue' },
        { value: 'CONSTRUCTION', label: 'Construction', position: 2, color: 'orange' },
        { value: 'EQUITY_RELEASE', label: 'Equity release', position: 3, color: 'purple' },
      ],
    },
  ],
});
