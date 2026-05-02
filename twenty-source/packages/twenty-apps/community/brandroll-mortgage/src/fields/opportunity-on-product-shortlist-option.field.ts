import {
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { PRODUCT_SHORTLIST_OPTION_OBJECT_ID } from 'src/objects/product-shortlist-option';

export const PRODUCT_SHORTLIST_OPTION_ON_OPPORTUNITY_FIELD_ID =
  '6b6d0000-4107-4000-8000-000000000001';
export const PRODUCT_SHORTLIST_OPTIONS_ON_OPPORTUNITY_FIELD_ID =
  '6b6d0000-4107-4000-8000-000000000002';

export default defineField({
  universalIdentifier: PRODUCT_SHORTLIST_OPTION_ON_OPPORTUNITY_FIELD_ID,
  objectUniversalIdentifier: PRODUCT_SHORTLIST_OPTION_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'opportunity',
  label: 'Opportunity',
  icon: 'IconTargetArrow',
  relationTargetObjectMetadataUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  relationTargetFieldMetadataUniversalIdentifier:
    PRODUCT_SHORTLIST_OPTIONS_ON_OPPORTUNITY_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'opportunityId',
  },
});
