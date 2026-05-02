import {
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { PRODUCT_SEARCH_RUN_OBJECT_ID } from 'src/objects/product-search-run';

import {
  PRODUCT_SEARCH_RUN_ON_OPPORTUNITY_FIELD_ID,
  PRODUCT_SEARCH_RUNS_ON_OPPORTUNITY_FIELD_ID,
} from './opportunity-on-product-search-run.field';

export default defineField({
  universalIdentifier: PRODUCT_SEARCH_RUNS_ON_OPPORTUNITY_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.RELATION,
  name: 'productSearchRuns',
  label: 'Product search runs',
  icon: 'IconFilterSearch',
  relationTargetObjectMetadataUniversalIdentifier:
    PRODUCT_SEARCH_RUN_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    PRODUCT_SEARCH_RUN_ON_OPPORTUNITY_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
