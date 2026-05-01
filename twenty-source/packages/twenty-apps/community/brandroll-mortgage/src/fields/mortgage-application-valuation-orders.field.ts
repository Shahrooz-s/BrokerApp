import { FieldType, RelationType, defineField } from 'twenty-sdk/define';

import { MORTGAGE_APPLICATION_OBJECT_ID } from 'src/objects/mortgage-application';
import { VALUATION_ORDER_OBJECT_ID } from 'src/objects/valuation-order';

import { MORTGAGE_APPLICATION_ON_VALUATION_ORDER_FIELD_ID } from './mortgage-application-on-valuation-order.field';

export const VALUATION_ORDERS_ON_MORTGAGE_APPLICATION_FIELD_ID =
  '6b6d0000-4000-4000-8000-000000000015';

export default defineField({
  universalIdentifier: VALUATION_ORDERS_ON_MORTGAGE_APPLICATION_FIELD_ID,
  objectUniversalIdentifier: MORTGAGE_APPLICATION_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'valuationOrders',
  label: 'Valuation orders',
  icon: 'IconReportMoney',
  relationTargetObjectMetadataUniversalIdentifier: VALUATION_ORDER_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    MORTGAGE_APPLICATION_ON_VALUATION_ORDER_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
