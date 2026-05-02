import {
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { PRODUCT_SEARCH_RUN_OBJECT_ID } from 'src/objects/product-search-run';

export const PRODUCT_SEARCH_RUN_ON_OPPORTUNITY_FIELD_ID =
  '6b6d0000-4106-4000-8000-000000000001';
export const PRODUCT_SEARCH_RUNS_ON_OPPORTUNITY_FIELD_ID =
  '6b6d0000-4106-4000-8000-000000000002';

export default defineField({
  universalIdentifier: PRODUCT_SEARCH_RUN_ON_OPPORTUNITY_FIELD_ID,
  objectUniversalIdentifier: PRODUCT_SEARCH_RUN_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'opportunity',
  label: 'Opportunity',
  icon: 'IconTargetArrow',
  relationTargetObjectMetadataUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  relationTargetFieldMetadataUniversalIdentifier:
    PRODUCT_SEARCH_RUNS_ON_OPPORTUNITY_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'opportunityId',
  },
});
