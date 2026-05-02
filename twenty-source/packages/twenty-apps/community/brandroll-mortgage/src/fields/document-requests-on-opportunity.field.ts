import {
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { DOCUMENT_REQUEST_OBJECT_ID } from 'src/objects/document-request';

import {
  DOCUMENT_REQUEST_ON_OPPORTUNITY_FIELD_ID,
  DOCUMENT_REQUESTS_ON_OPPORTUNITY_FIELD_ID,
} from './opportunity-on-document-request.field';

export default defineField({
  universalIdentifier: DOCUMENT_REQUESTS_ON_OPPORTUNITY_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.RELATION,
  name: 'documentRequests',
  label: 'Document requests',
  icon: 'IconFileDescription',
  relationTargetObjectMetadataUniversalIdentifier: DOCUMENT_REQUEST_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    DOCUMENT_REQUEST_ON_OPPORTUNITY_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
