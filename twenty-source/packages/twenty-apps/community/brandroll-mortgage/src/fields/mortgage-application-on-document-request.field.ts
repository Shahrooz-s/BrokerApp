import {
  FieldType,
  OnDeleteAction,
  RelationType,
  defineField,
} from 'twenty-sdk/define';

import { DOCUMENT_REQUEST_OBJECT_ID } from 'src/objects/document-request';
import { MORTGAGE_APPLICATION_OBJECT_ID } from 'src/objects/mortgage-application';

import { DOCUMENT_REQUESTS_ON_MORTGAGE_APPLICATION_FIELD_ID } from './mortgage-application-document-requests.field';

export const MORTGAGE_APPLICATION_ON_DOCUMENT_REQUEST_FIELD_ID =
  '6b6d0000-4000-4000-8000-000000000010';

export default defineField({
  universalIdentifier: MORTGAGE_APPLICATION_ON_DOCUMENT_REQUEST_FIELD_ID,
  objectUniversalIdentifier: DOCUMENT_REQUEST_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'mortgageApplication',
  label: 'Mortgage application',
  icon: 'IconHomeDollar',
  relationTargetObjectMetadataUniversalIdentifier:
    MORTGAGE_APPLICATION_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    DOCUMENT_REQUESTS_ON_MORTGAGE_APPLICATION_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.CASCADE,
    joinColumnName: 'mortgageApplicationId',
  },
});
