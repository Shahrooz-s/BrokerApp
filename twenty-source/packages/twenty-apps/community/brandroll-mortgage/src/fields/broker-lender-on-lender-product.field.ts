import {
  FieldType,
  OnDeleteAction,
  RelationType,
  defineField,
} from 'twenty-sdk/define';

import { BROKER_LENDER_OBJECT_ID } from 'src/objects/broker-lender';
import { LENDER_PRODUCT_OBJECT_ID } from 'src/objects/lender-product';

export const BROKER_LENDER_ON_LENDER_PRODUCT_FIELD_ID =
  '6b6d0000-4122-4000-8000-000000000001';
export const LENDER_PRODUCTS_ON_BROKER_LENDER_FIELD_ID =
  '6b6d0000-4122-4000-8000-000000000002';

export default defineField({
  universalIdentifier: BROKER_LENDER_ON_LENDER_PRODUCT_FIELD_ID,
  objectUniversalIdentifier: LENDER_PRODUCT_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'brokerLender',
  label: 'Broker lender',
  icon: 'IconBuildingBank',
  relationTargetObjectMetadataUniversalIdentifier: BROKER_LENDER_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    LENDER_PRODUCTS_ON_BROKER_LENDER_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'brokerLenderId',
  },
});
