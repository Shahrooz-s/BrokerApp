import {
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { DOCUMENT_REQUEST_OBJECT_ID } from 'src/objects/document-request';

export const DOCUMENT_REQUEST_ON_OPPORTUNITY_FIELD_ID =
  '6b6d0000-4109-4000-8000-000000000001';
export const DOCUMENT_REQUESTS_ON_OPPORTUNITY_FIELD_ID =
  '6b6d0000-4109-4000-8000-000000000002';

export default defineField({
  universalIdentifier: DOCUMENT_REQUEST_ON_OPPORTUNITY_FIELD_ID,
  objectUniversalIdentifier: DOCUMENT_REQUEST_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'opportunity',
  label: 'Opportunity',
  icon: 'IconTargetArrow',
  relationTargetObjectMetadataUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  relationTargetFieldMetadataUniversalIdentifier:
    DOCUMENT_REQUESTS_ON_OPPORTUNITY_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'opportunityId',
  },
});
