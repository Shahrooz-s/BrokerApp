import {
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { COMPLIANCE_ACKNOWLEDGEMENT_OBJECT_ID } from 'src/objects/compliance-acknowledgement';

export const COMPLIANCE_ACKNOWLEDGEMENT_ON_OPPORTUNITY_FIELD_ID =
  '6b6d0000-4103-4000-8000-000000000001';
export const COMPLIANCE_ACKNOWLEDGEMENTS_ON_OPPORTUNITY_FIELD_ID =
  '6b6d0000-4103-4000-8000-000000000002';

export default defineField({
  universalIdentifier: COMPLIANCE_ACKNOWLEDGEMENT_ON_OPPORTUNITY_FIELD_ID,
  objectUniversalIdentifier: COMPLIANCE_ACKNOWLEDGEMENT_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'opportunity',
  label: 'Opportunity',
  icon: 'IconTargetArrow',
  relationTargetObjectMetadataUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  relationTargetFieldMetadataUniversalIdentifier:
    COMPLIANCE_ACKNOWLEDGEMENTS_ON_OPPORTUNITY_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'opportunityId',
  },
});
