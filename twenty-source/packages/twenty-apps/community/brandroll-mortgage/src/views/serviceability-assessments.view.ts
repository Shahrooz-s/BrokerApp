import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  SERVICEABILITY_ASSESSMENT_NAME_FIELD_ID,
  SERVICEABILITY_ASSESSMENT_OBJECT_ID,
  SERVICEABILITY_ASSESSMENT_STATUS_FIELD_ID,
} from 'src/objects/serviceability-assessment';

export const SERVICEABILITY_ASSESSMENTS_VIEW_ID =
  '6b6d0000-2400-4000-8000-000000000001';

export default defineView({
  universalIdentifier: SERVICEABILITY_ASSESSMENTS_VIEW_ID,
  name: 'Serviceability',
  objectUniversalIdentifier: SERVICEABILITY_ASSESSMENT_OBJECT_ID,
  icon: 'IconCalculator',
  key: ViewKey.INDEX,
  position: 4,
  fields: [
    {
      universalIdentifier: '6b6d0000-2400-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: SERVICEABILITY_ASSESSMENT_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-2400-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: SERVICEABILITY_ASSESSMENT_STATUS_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 180,
    },
  ],
});
