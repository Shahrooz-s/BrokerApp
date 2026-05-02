import { FieldType, RelationType, defineField } from 'twenty-sdk/define';

import { BROKER_LENDER_OBJECT_ID } from 'src/objects/broker-lender';
import { LENDER_PRODUCT_OBJECT_ID } from 'src/objects/lender-product';

import {
  BROKER_LENDER_ON_LENDER_PRODUCT_FIELD_ID,
  LENDER_PRODUCTS_ON_BROKER_LENDER_FIELD_ID,
} from './broker-lender-on-lender-product.field';

export default defineField({
  universalIdentifier: LENDER_PRODUCTS_ON_BROKER_LENDER_FIELD_ID,
  objectUniversalIdentifier: BROKER_LENDER_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'lenderProducts',
  label: 'Lender products',
  icon: 'IconBuildingBank',
  relationTargetObjectMetadataUniversalIdentifier: LENDER_PRODUCT_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    BROKER_LENDER_ON_LENDER_PRODUCT_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
