import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  FACT_FIND_SECTION_COMPLETION_FIELD_ID,
  FACT_FIND_SECTION_KEY_FIELD_ID,
  FACT_FIND_SECTION_MAPPING_STATUS_FIELD_ID,
  FACT_FIND_SECTION_NAME_FIELD_ID,
  FACT_FIND_SECTION_OBJECT_ID,
  FACT_FIND_SECTION_STATUS_FIELD_ID,
} from 'src/objects/fact-find-section';

export const FACT_FIND_SECTIONS_VIEW_ID =
  '6b6d0000-3010-4000-8000-000000000001';

export default defineView({
  universalIdentifier: FACT_FIND_SECTIONS_VIEW_ID,
  name: 'Fact find sections',
  objectUniversalIdentifier: FACT_FIND_SECTION_OBJECT_ID,
  icon: 'IconLayoutList',
  key: ViewKey.INDEX,
  position: 21,
  fields: [
    {
      universalIdentifier: '6b6d0000-3010-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: FACT_FIND_SECTION_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-3010-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: FACT_FIND_SECTION_KEY_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: '6b6d0000-3010-4000-8000-000000000004',
      fieldMetadataUniversalIdentifier: FACT_FIND_SECTION_STATUS_FIELD_ID,
      position: 2,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: '6b6d0000-3010-4000-8000-000000000005',
      fieldMetadataUniversalIdentifier: FACT_FIND_SECTION_COMPLETION_FIELD_ID,
      position: 3,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: '6b6d0000-3010-4000-8000-000000000006',
      fieldMetadataUniversalIdentifier:
        FACT_FIND_SECTION_MAPPING_STATUS_FIELD_ID,
      position: 4,
      isVisible: true,
      size: 180,
    },
  ],
});
