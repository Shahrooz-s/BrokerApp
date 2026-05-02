import {
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { FACT_FIND_SESSION_OBJECT_ID } from 'src/objects/fact-find-session';

import {
  FACT_FIND_SESSION_ON_OPPORTUNITY_FIELD_ID,
  FACT_FIND_SESSIONS_ON_OPPORTUNITY_FIELD_ID,
} from './opportunity-on-fact-find-session.field';

export default defineField({
  universalIdentifier: FACT_FIND_SESSIONS_ON_OPPORTUNITY_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.RELATION,
  name: 'factFindSessions',
  label: 'Fact find sessions',
  icon: 'IconForms',
  relationTargetObjectMetadataUniversalIdentifier: FACT_FIND_SESSION_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    FACT_FIND_SESSION_ON_OPPORTUNITY_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
