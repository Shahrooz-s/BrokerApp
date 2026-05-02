import { FieldType, RelationType, defineField } from 'twenty-sdk/define';

import { FACT_FIND_SECTION_OBJECT_ID } from 'src/objects/fact-find-section';
import { FACT_FIND_SESSION_OBJECT_ID } from 'src/objects/fact-find-session';

import {
  FACT_FIND_SECTIONS_ON_FACT_FIND_SESSION_FIELD_ID,
  FACT_FIND_SESSION_ON_FACT_FIND_SECTION_FIELD_ID,
} from './fact-find-session-on-fact-find-section.field';

export default defineField({
  universalIdentifier: FACT_FIND_SECTIONS_ON_FACT_FIND_SESSION_FIELD_ID,
  objectUniversalIdentifier: FACT_FIND_SESSION_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'factFindSections',
  label: 'Fact find sections',
  icon: 'IconLayoutList',
  relationTargetObjectMetadataUniversalIdentifier: FACT_FIND_SECTION_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    FACT_FIND_SESSION_ON_FACT_FIND_SECTION_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
