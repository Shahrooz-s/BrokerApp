import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  LENDER_DOCUMENT_CATEGORY_NAME_FIELD_ID,
  LENDER_DOCUMENT_CATEGORY_OBJECT_ID,
  LENDER_DOCUMENT_CATEGORY_REQUIRED_FIELD_ID,
  LENDER_DOCUMENT_CATEGORY_SCENARIO_FIELD_ID,
  LENDER_DOCUMENT_CATEGORY_STATUS_FIELD_ID,
} from 'src/objects/lender-document-category';

export const LENDER_DOCUMENT_CATEGORIES_VIEW_ID =
  '6b6d0000-3060-4000-8000-000000000001';

export default defineView({
  universalIdentifier: LENDER_DOCUMENT_CATEGORIES_VIEW_ID,
  name: 'Lender document categories',
  objectUniversalIdentifier: LENDER_DOCUMENT_CATEGORY_OBJECT_ID,
  icon: 'IconFiles',
  key: ViewKey.INDEX,
  position: 33,
  fields: [
    {
      universalIdentifier: '6b6d0000-3060-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: LENDER_DOCUMENT_CATEGORY_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-3060-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier:
        LENDER_DOCUMENT_CATEGORY_SCENARIO_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: '6b6d0000-3060-4000-8000-000000000004',
      fieldMetadataUniversalIdentifier:
        LENDER_DOCUMENT_CATEGORY_STATUS_FIELD_ID,
      position: 2,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: '6b6d0000-3060-4000-8000-000000000005',
      fieldMetadataUniversalIdentifier:
        LENDER_DOCUMENT_CATEGORY_REQUIRED_FIELD_ID,
      position: 3,
      isVisible: true,
      size: 170,
    },
  ],
});
