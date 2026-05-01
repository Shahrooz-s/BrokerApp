import { FieldType, defineObject } from 'twenty-sdk/define';

export const VALUATION_ORDER_OBJECT_ID =
  '6b6d0000-1800-4000-8000-000000000001';
export const VALUATION_ORDER_NAME_FIELD_ID =
  '6b6d0000-1800-4000-8000-000000000002';

export default defineObject({
  universalIdentifier: VALUATION_ORDER_OBJECT_ID,
  nameSingular: 'valuationOrder',
  namePlural: 'valuationOrders',
  labelSingular: 'Valuation order',
  labelPlural: 'Valuation orders',
  description: 'Valuation order and result summary aligned to LIXI VAL concepts.',
  icon: 'IconReportMoney',
  labelIdentifierFieldMetadataUniversalIdentifier: VALUATION_ORDER_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: VALUATION_ORDER_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'valuationName',
      label: 'Valuation name',
      icon: 'IconAbc',
    },
    {
      universalIdentifier: '6b6d0000-1800-4000-8000-000000000003',
      type: FieldType.SELECT,
      name: 'valuationStatus',
      label: 'Valuation status',
      icon: 'IconActivity',
      options: [
        { value: 'NOT_ORDERED', label: 'Not ordered', position: 0, color: 'gray' },
        { value: 'ORDERED', label: 'Ordered', position: 1, color: 'blue' },
        { value: 'BOOKED', label: 'Booked', position: 2, color: 'purple' },
        { value: 'RECEIVED', label: 'Received', position: 3, color: 'green' },
        { value: 'QUERY', label: 'Query', position: 4, color: 'orange' },
        { value: 'EXPIRED', label: 'Expired', position: 5, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1800-4000-8000-000000000004',
      type: FieldType.NUMBER,
      name: 'acceptedValue',
      label: 'Accepted value',
      icon: 'IconCurrencyDollar',
    },
  ],
});
