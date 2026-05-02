import {
  FieldType,
  OnDeleteAction,
  RelationType,
  defineField,
} from 'twenty-sdk/define';

import { PRODUCT_SEARCH_RUN_OBJECT_ID } from 'src/objects/product-search-run';
import { PRODUCT_SHORTLIST_OPTION_OBJECT_ID } from 'src/objects/product-shortlist-option';

export const PRODUCT_SEARCH_RUN_ON_PRODUCT_SHORTLIST_OPTION_FIELD_ID =
  '6b6d0000-4114-4000-8000-000000000001';
export const PRODUCT_SHORTLIST_OPTIONS_ON_PRODUCT_SEARCH_RUN_FIELD_ID =
  '6b6d0000-4114-4000-8000-000000000002';

export default defineField({
  universalIdentifier: PRODUCT_SEARCH_RUN_ON_PRODUCT_SHORTLIST_OPTION_FIELD_ID,
  objectUniversalIdentifier: PRODUCT_SHORTLIST_OPTION_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'productSearchRun',
  label: 'Product search run',
  icon: 'IconFilterSearch',
  relationTargetObjectMetadataUniversalIdentifier:
    PRODUCT_SEARCH_RUN_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    PRODUCT_SHORTLIST_OPTIONS_ON_PRODUCT_SEARCH_RUN_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'productSearchRunId',
  },
});
