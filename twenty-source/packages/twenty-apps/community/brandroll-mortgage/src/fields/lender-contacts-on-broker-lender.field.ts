import { FieldType, RelationType, defineField } from 'twenty-sdk/define';

import { BROKER_LENDER_OBJECT_ID } from 'src/objects/broker-lender';
import { LENDER_CONTACT_OBJECT_ID } from 'src/objects/lender-contact';

import {
  BROKER_LENDER_ON_LENDER_CONTACT_FIELD_ID,
  LENDER_CONTACTS_ON_BROKER_LENDER_FIELD_ID,
} from './broker-lender-on-lender-contact.field';

export default defineField({
  universalIdentifier: LENDER_CONTACTS_ON_BROKER_LENDER_FIELD_ID,
  objectUniversalIdentifier: BROKER_LENDER_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'lenderContacts',
  label: 'Lender contacts',
  icon: 'IconAddressBook',
  relationTargetObjectMetadataUniversalIdentifier: LENDER_CONTACT_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    BROKER_LENDER_ON_LENDER_CONTACT_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
