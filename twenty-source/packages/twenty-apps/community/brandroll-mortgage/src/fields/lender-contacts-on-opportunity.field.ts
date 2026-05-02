import {
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { LENDER_CONTACT_OBJECT_ID } from 'src/objects/lender-contact';

import {
  LENDER_CONTACT_ON_OPPORTUNITY_FIELD_ID,
  LENDER_CONTACTS_ON_OPPORTUNITY_FIELD_ID,
} from './opportunity-on-lender-contact.field';

export default defineField({
  universalIdentifier: LENDER_CONTACTS_ON_OPPORTUNITY_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.RELATION,
  name: 'lenderContacts',
  label: 'Lender contacts',
  icon: 'IconAddressBook',
  relationTargetObjectMetadataUniversalIdentifier: LENDER_CONTACT_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    LENDER_CONTACT_ON_OPPORTUNITY_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
