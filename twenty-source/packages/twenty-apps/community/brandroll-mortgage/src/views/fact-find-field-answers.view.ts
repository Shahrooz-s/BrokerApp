import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  FACT_FIND_FIELD_ANSWER_KEY_FIELD_ID,
  FACT_FIND_FIELD_ANSWER_MAPPING_STATUS_FIELD_ID,
  FACT_FIND_FIELD_ANSWER_NAME_FIELD_ID,
  FACT_FIND_FIELD_ANSWER_OBJECT_ID,
  FACT_FIND_FIELD_ANSWER_REVIEW_STATUS_FIELD_ID,
  FACT_FIND_FIELD_ANSWER_VALUE_PREVIEW_FIELD_ID,
} from 'src/objects/fact-find-field-answer';

export const FACT_FIND_FIELD_ANSWERS_VIEW_ID =
  '6b6d0000-3020-4000-8000-000000000001';

export default defineView({
  universalIdentifier: FACT_FIND_FIELD_ANSWERS_VIEW_ID,
  name: 'Fact find answers',
  objectUniversalIdentifier: FACT_FIND_FIELD_ANSWER_OBJECT_ID,
  icon: 'IconForms',
  key: ViewKey.INDEX,
  position: 22,
  fields: [
    {
      universalIdentifier: '6b6d0000-3020-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: FACT_FIND_FIELD_ANSWER_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-3020-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: FACT_FIND_FIELD_ANSWER_KEY_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 220,
    },
    {
      universalIdentifier: '6b6d0000-3020-4000-8000-000000000004',
      fieldMetadataUniversalIdentifier:
        FACT_FIND_FIELD_ANSWER_VALUE_PREVIEW_FIELD_ID,
      position: 2,
      isVisible: true,
      size: 280,
    },
    {
      universalIdentifier: '6b6d0000-3020-4000-8000-000000000005',
      fieldMetadataUniversalIdentifier:
        FACT_FIND_FIELD_ANSWER_MAPPING_STATUS_FIELD_ID,
      position: 3,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: '6b6d0000-3020-4000-8000-000000000006',
      fieldMetadataUniversalIdentifier:
        FACT_FIND_FIELD_ANSWER_REVIEW_STATUS_FIELD_ID,
      position: 4,
      isVisible: true,
      size: 180,
    },
  ],
});
