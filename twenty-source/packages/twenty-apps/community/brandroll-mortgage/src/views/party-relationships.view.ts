import { ViewKey, defineView, ViewVisibility } from 'twenty-sdk/define';

import {
  PARTY_RELATIONSHIP_NAME_FIELD_ID,
  PARTY_RELATIONSHIP_OBJECT_ID,
  PARTY_RELATIONSHIP_TYPE_FIELD_ID,
} from 'src/objects/party-relationship';

export const PARTY_RELATIONSHIPS_VIEW_ID =
  '6b6d0000-3700-4000-8000-000000000001';

export default defineView({
  universalIdentifier: PARTY_RELATIONSHIPS_VIEW_ID,
  name: 'Party relationships',
  objectUniversalIdentifier: PARTY_RELATIONSHIP_OBJECT_ID,
  icon: 'IconHierarchy3',
  key: ViewKey.INDEX,
  position: 33,
  visibility: ViewVisibility.UNLISTED,
  fields: [
    {
      universalIdentifier: '6b6d0000-3700-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: PARTY_RELATIONSHIP_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-3700-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: PARTY_RELATIONSHIP_TYPE_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 190,
    },
  ],
});
