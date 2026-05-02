import { FieldType, RelationType, defineField } from 'twenty-sdk/define';

import { FACT_FIND_FIELD_ANSWER_OBJECT_ID } from 'src/objects/fact-find-field-answer';
import { FACT_FIND_SESSION_OBJECT_ID } from 'src/objects/fact-find-session';

import {
  FACT_FIND_FIELD_ANSWERS_ON_FACT_FIND_SESSION_FIELD_ID,
  FACT_FIND_SESSION_ON_FACT_FIND_FIELD_ANSWER_FIELD_ID,
} from './fact-find-session-on-fact-find-field-answer.field';

export default defineField({
  universalIdentifier: FACT_FIND_FIELD_ANSWERS_ON_FACT_FIND_SESSION_FIELD_ID,
  objectUniversalIdentifier: FACT_FIND_SESSION_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'factFindFieldAnswers',
  label: 'Fact find field answers',
  icon: 'IconForms',
  relationTargetObjectMetadataUniversalIdentifier:
    FACT_FIND_FIELD_ANSWER_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    FACT_FIND_SESSION_ON_FACT_FIND_FIELD_ANSWER_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
