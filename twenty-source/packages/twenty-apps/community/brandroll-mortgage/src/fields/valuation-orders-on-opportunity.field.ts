import {
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { VALUATION_ORDER_OBJECT_ID } from 'src/objects/valuation-order';

import {
  VALUATION_ORDER_ON_OPPORTUNITY_FIELD_ID,
  VALUATION_ORDERS_ON_OPPORTUNITY_FIELD_ID,
} from './opportunity-on-valuation-order.field';

export default defineField({
  universalIdentifier: VALUATION_ORDERS_ON_OPPORTUNITY_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.RELATION,
  name: 'valuationOrders',
  label: 'Valuation orders',
  icon: 'IconReportMoney',
  relationTargetObjectMetadataUniversalIdentifier: VALUATION_ORDER_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    VALUATION_ORDER_ON_OPPORTUNITY_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
