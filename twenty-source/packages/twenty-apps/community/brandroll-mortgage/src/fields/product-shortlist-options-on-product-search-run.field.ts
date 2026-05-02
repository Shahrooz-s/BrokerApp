import {
  FieldType,
  RelationType,
  defineField,
} from 'twenty-sdk/define';

import { PRODUCT_SEARCH_RUN_OBJECT_ID } from 'src/objects/product-search-run';
import { PRODUCT_SHORTLIST_OPTION_OBJECT_ID } from 'src/objects/product-shortlist-option';

import {
  PRODUCT_SEARCH_RUN_ON_PRODUCT_SHORTLIST_OPTION_FIELD_ID,
  PRODUCT_SHORTLIST_OPTIONS_ON_PRODUCT_SEARCH_RUN_FIELD_ID,
} from './product-search-run-on-product-shortlist-option.field';

export default defineField({
  universalIdentifier: PRODUCT_SHORTLIST_OPTIONS_ON_PRODUCT_SEARCH_RUN_FIELD_ID,
  objectUniversalIdentifier: PRODUCT_SEARCH_RUN_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'productShortlistOptions',
  label: 'Shortlist options',
  icon: 'IconListSearch',
  relationTargetObjectMetadataUniversalIdentifier:
    PRODUCT_SHORTLIST_OPTION_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    PRODUCT_SEARCH_RUN_ON_PRODUCT_SHORTLIST_OPTION_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
