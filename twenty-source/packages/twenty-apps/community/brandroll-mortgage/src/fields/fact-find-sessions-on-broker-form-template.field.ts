import { FieldType, RelationType, defineField } from 'twenty-sdk/define';

import { BROKER_FORM_TEMPLATE_OBJECT_ID } from 'src/objects/broker-form-template';
import { FACT_FIND_SESSION_OBJECT_ID } from 'src/objects/fact-find-session';

import {
  BROKER_FORM_TEMPLATE_ON_FACT_FIND_SESSION_FIELD_ID,
  FACT_FIND_SESSIONS_ON_BROKER_FORM_TEMPLATE_FIELD_ID,
} from './broker-form-template-on-fact-find-session.field';

export default defineField({
  universalIdentifier: FACT_FIND_SESSIONS_ON_BROKER_FORM_TEMPLATE_FIELD_ID,
  objectUniversalIdentifier: BROKER_FORM_TEMPLATE_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'factFindSessions',
  label: 'Fact find sessions',
  icon: 'IconForms',
  relationTargetObjectMetadataUniversalIdentifier: FACT_FIND_SESSION_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    BROKER_FORM_TEMPLATE_ON_FACT_FIND_SESSION_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
