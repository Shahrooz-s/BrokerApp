import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  DOCUMENT_REQUEST_NAME_FIELD_ID,
  DOCUMENT_REQUEST_OBJECT_ID,
  DOCUMENT_REQUEST_STATUS_FIELD_ID,
} from 'src/objects/document-request';

export const DOCUMENT_REQUESTS_VIEW_ID =
  '6b6d0000-2300-4000-8000-000000000001';

export default defineView({
  universalIdentifier: DOCUMENT_REQUESTS_VIEW_ID,
  name: 'Document requests',
  objectUniversalIdentifier: DOCUMENT_REQUEST_OBJECT_ID,
  icon: 'IconFileDescription',
  key: ViewKey.INDEX,
  position: 3,
  fields: [
    {
      universalIdentifier: '6b6d0000-2300-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: DOCUMENT_REQUEST_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-2300-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: DOCUMENT_REQUEST_STATUS_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 180,
    },
  ],
});
