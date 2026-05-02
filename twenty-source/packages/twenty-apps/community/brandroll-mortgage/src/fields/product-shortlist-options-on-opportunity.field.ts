import {
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { PRODUCT_SHORTLIST_OPTION_OBJECT_ID } from 'src/objects/product-shortlist-option';

import {
  PRODUCT_SHORTLIST_OPTION_ON_OPPORTUNITY_FIELD_ID,
  PRODUCT_SHORTLIST_OPTIONS_ON_OPPORTUNITY_FIELD_ID,
} from './opportunity-on-product-shortlist-option.field';

export default defineField({
  universalIdentifier: PRODUCT_SHORTLIST_OPTIONS_ON_OPPORTUNITY_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.RELATION,
  name: 'productShortlistOptions',
  label: 'Product shortlist options',
  icon: 'IconListSearch',
  relationTargetObjectMetadataUniversalIdentifier:
    PRODUCT_SHORTLIST_OPTION_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    PRODUCT_SHORTLIST_OPTION_ON_OPPORTUNITY_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
