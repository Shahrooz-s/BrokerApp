import {
  FieldType,
  OnDeleteAction,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { FACT_FIND_SESSION_OBJECT_ID } from 'src/objects/fact-find-session';

export const FACT_FIND_SESSION_ON_OPPORTUNITY_FIELD_ID =
  '6b6d0000-4104-4000-8000-000000000001';
export const FACT_FIND_SESSIONS_ON_OPPORTUNITY_FIELD_ID =
  '6b6d0000-4104-4000-8000-000000000002';

export default defineField({
  universalIdentifier: FACT_FIND_SESSION_ON_OPPORTUNITY_FIELD_ID,
  objectUniversalIdentifier: FACT_FIND_SESSION_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'opportunity',
  label: 'Opportunity',
  icon: 'IconTargetArrow',
  relationTargetObjectMetadataUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  relationTargetFieldMetadataUniversalIdentifier:
    FACT_FIND_SESSIONS_ON_OPPORTUNITY_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'opportunityId',
  },
});
