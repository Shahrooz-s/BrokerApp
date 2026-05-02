import {
  FieldType,
  OnDeleteAction,
  RelationType,
  defineField,
} from 'twenty-sdk/define';

import { FACT_FIND_FIELD_ANSWER_OBJECT_ID } from 'src/objects/fact-find-field-answer';
import { FACT_FIND_SESSION_OBJECT_ID } from 'src/objects/fact-find-session';

export const FACT_FIND_SESSION_ON_FACT_FIND_FIELD_ANSWER_FIELD_ID =
  '6b6d0000-4118-4000-8000-000000000001';
export const FACT_FIND_FIELD_ANSWERS_ON_FACT_FIND_SESSION_FIELD_ID =
  '6b6d0000-4118-4000-8000-000000000002';

export default defineField({
  universalIdentifier: FACT_FIND_SESSION_ON_FACT_FIND_FIELD_ANSWER_FIELD_ID,
  objectUniversalIdentifier: FACT_FIND_FIELD_ANSWER_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'factFindSession',
  label: 'Fact find session',
  icon: 'IconForms',
  relationTargetObjectMetadataUniversalIdentifier: FACT_FIND_SESSION_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    FACT_FIND_FIELD_ANSWERS_ON_FACT_FIND_SESSION_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.CASCADE,
    joinColumnName: 'factFindSessionId',
  },
});
