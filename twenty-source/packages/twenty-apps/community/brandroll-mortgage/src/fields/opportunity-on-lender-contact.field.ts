import {
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { LENDER_CONTACT_OBJECT_ID } from 'src/objects/lender-contact';

export const LENDER_CONTACT_ON_OPPORTUNITY_FIELD_ID =
  '6b6d0000-4113-4000-8000-000000000001';
export const LENDER_CONTACTS_ON_OPPORTUNITY_FIELD_ID =
  '6b6d0000-4113-4000-8000-000000000002';

export default defineField({
  universalIdentifier: LENDER_CONTACT_ON_OPPORTUNITY_FIELD_ID,
  objectUniversalIdentifier: LENDER_CONTACT_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'opportunity',
  label: 'Opportunity',
  icon: 'IconTargetArrow',
  relationTargetObjectMetadataUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  relationTargetFieldMetadataUniversalIdentifier:
    LENDER_CONTACTS_ON_OPPORTUNITY_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'opportunityId',
  },
});
