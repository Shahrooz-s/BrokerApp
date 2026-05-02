import {
  FieldType,
  RelationType,
  defineField,
} from 'twenty-sdk/define';

import { LENDER_PRODUCT_OBJECT_ID } from 'src/objects/lender-product';
import { PRODUCT_SHORTLIST_OPTION_OBJECT_ID } from 'src/objects/product-shortlist-option';

import {
  LENDER_PRODUCT_ON_PRODUCT_SHORTLIST_OPTION_FIELD_ID,
  PRODUCT_SHORTLIST_OPTIONS_ON_LENDER_PRODUCT_FIELD_ID,
} from './lender-product-on-product-shortlist-option.field';

export default defineField({
  universalIdentifier: PRODUCT_SHORTLIST_OPTIONS_ON_LENDER_PRODUCT_FIELD_ID,
  objectUniversalIdentifier: LENDER_PRODUCT_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'productShortlistOptions',
  label: 'Product shortlist options',
  icon: 'IconListSearch',
  relationTargetObjectMetadataUniversalIdentifier:
    PRODUCT_SHORTLIST_OPTION_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    LENDER_PRODUCT_ON_PRODUCT_SHORTLIST_OPTION_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
