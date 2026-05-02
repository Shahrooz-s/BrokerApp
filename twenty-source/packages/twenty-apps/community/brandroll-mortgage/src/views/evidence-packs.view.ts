import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  EVIDENCE_PACK_NAME_FIELD_ID,
  EVIDENCE_PACK_OBJECT_ID,
  EVIDENCE_PACK_STATUS_FIELD_ID,
} from 'src/objects/evidence-pack';

export const EVIDENCE_PACKS_VIEW_ID =
  '6b6d0000-5840-4000-8000-000000000001';

export default defineView({
  universalIdentifier: EVIDENCE_PACKS_VIEW_ID,
  name: 'Evidence packs',
  objectUniversalIdentifier: EVIDENCE_PACK_OBJECT_ID,
  icon: 'IconFileCertificate',
  key: ViewKey.INDEX,
  position: 19,
  fields: [
    {
      universalIdentifier: '6b6d0000-5840-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: EVIDENCE_PACK_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-5840-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: EVIDENCE_PACK_STATUS_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 180,
    },
  ],
});
