import { FieldType, RelationType, defineField } from 'twenty-sdk/define';

import { BROKER_LENDER_OBJECT_ID } from 'src/objects/broker-lender';
import { LENDER_DOCUMENT_CATEGORY_OBJECT_ID } from 'src/objects/lender-document-category';

import {
  BROKER_LENDER_ON_LENDER_DOCUMENT_CATEGORY_FIELD_ID,
  LENDER_DOCUMENT_CATEGORIES_ON_BROKER_LENDER_FIELD_ID,
} from './broker-lender-on-lender-document-category.field';

export default defineField({
  universalIdentifier: LENDER_DOCUMENT_CATEGORIES_ON_BROKER_LENDER_FIELD_ID,
  objectUniversalIdentifier: BROKER_LENDER_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'lenderDocumentCategories',
  label: 'Lender document categories',
  icon: 'IconFiles',
  relationTargetObjectMetadataUniversalIdentifier:
    LENDER_DOCUMENT_CATEGORY_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    BROKER_LENDER_ON_LENDER_DOCUMENT_CATEGORY_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
