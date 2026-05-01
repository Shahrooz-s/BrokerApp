import { FieldType, RelationType, defineField } from 'twenty-sdk/define';

import { DOCUMENT_REQUEST_OBJECT_ID } from 'src/objects/document-request';
import { MORTGAGE_APPLICATION_OBJECT_ID } from 'src/objects/mortgage-application';

import { MORTGAGE_APPLICATION_ON_DOCUMENT_REQUEST_FIELD_ID } from './mortgage-application-on-document-request.field';

export const DOCUMENT_REQUESTS_ON_MORTGAGE_APPLICATION_FIELD_ID =
  '6b6d0000-4000-4000-8000-000000000009';

export default defineField({
  universalIdentifier: DOCUMENT_REQUESTS_ON_MORTGAGE_APPLICATION_FIELD_ID,
  objectUniversalIdentifier: MORTGAGE_APPLICATION_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'documentRequests',
  label: 'Document requests',
  icon: 'IconFileDescription',
  relationTargetObjectMetadataUniversalIdentifier: DOCUMENT_REQUEST_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    MORTGAGE_APPLICATION_ON_DOCUMENT_REQUEST_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
