import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  PRODUCT_IMPORT_RUN_NAME_FIELD_ID,
  PRODUCT_IMPORT_RUN_OBJECT_ID,
  PRODUCT_IMPORT_RUN_STATUS_FIELD_ID,
} from 'src/objects/product-import-run';

export const PRODUCT_IMPORT_RUNS_VIEW_ID =
  '6b6d0000-5910-4000-8000-000000000001';

export default defineView({
  universalIdentifier: PRODUCT_IMPORT_RUNS_VIEW_ID,
  name: 'Product import runs',
  objectUniversalIdentifier: PRODUCT_IMPORT_RUN_OBJECT_ID,
  icon: 'IconFileSpreadsheet',
  key: ViewKey.INDEX,
  position: 21,
  fields: [
    {
      universalIdentifier: '6b6d0000-5910-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: PRODUCT_IMPORT_RUN_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-5910-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: PRODUCT_IMPORT_RUN_STATUS_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 180,
    },
  ],
});
