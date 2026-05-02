import {
  FieldType,
  OnDeleteAction,
  RelationType,
  defineField,
} from 'twenty-sdk/define';

import { LENDER_PRODUCT_OBJECT_ID } from 'src/objects/lender-product';
import { PRODUCT_SHORTLIST_OPTION_OBJECT_ID } from 'src/objects/product-shortlist-option';

export const LENDER_PRODUCT_ON_PRODUCT_SHORTLIST_OPTION_FIELD_ID =
  '6b6d0000-4115-4000-8000-000000000001';
export const PRODUCT_SHORTLIST_OPTIONS_ON_LENDER_PRODUCT_FIELD_ID =
  '6b6d0000-4115-4000-8000-000000000002';

export default defineField({
  universalIdentifier: LENDER_PRODUCT_ON_PRODUCT_SHORTLIST_OPTION_FIELD_ID,
  objectUniversalIdentifier: PRODUCT_SHORTLIST_OPTION_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'lenderProduct',
  label: 'Lender product',
  icon: 'IconBuildingBank',
  relationTargetObjectMetadataUniversalIdentifier: LENDER_PRODUCT_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    PRODUCT_SHORTLIST_OPTIONS_ON_LENDER_PRODUCT_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'lenderProductId',
  },
});
