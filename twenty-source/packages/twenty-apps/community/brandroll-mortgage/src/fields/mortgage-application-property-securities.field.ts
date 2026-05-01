import { FieldType, RelationType, defineField } from 'twenty-sdk/define';

import { MORTGAGE_APPLICATION_OBJECT_ID } from 'src/objects/mortgage-application';
import { PROPERTY_SECURITY_OBJECT_ID } from 'src/objects/property-security';

import { MORTGAGE_APPLICATION_ON_PROPERTY_SECURITY_FIELD_ID } from './mortgage-application-on-property-security.field';

export const PROPERTY_SECURITIES_ON_MORTGAGE_APPLICATION_FIELD_ID =
  '6b6d0000-4000-4000-8000-000000000005';

export default defineField({
  universalIdentifier: PROPERTY_SECURITIES_ON_MORTGAGE_APPLICATION_FIELD_ID,
  objectUniversalIdentifier: MORTGAGE_APPLICATION_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'propertySecurities',
  label: 'Property securities',
  icon: 'IconHome',
  relationTargetObjectMetadataUniversalIdentifier: PROPERTY_SECURITY_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    MORTGAGE_APPLICATION_ON_PROPERTY_SECURITY_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
