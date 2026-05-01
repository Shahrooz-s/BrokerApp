import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  MORTGAGE_APPLICATION_ON_OPPORTUNITY_FIELD_ID,
} from 'src/fields/opportunity-on-mortgage-application.field';
import {
  MORTGAGE_APPLICATION_ON_PRIMARY_APPLICANT_FIELD_ID,
} from 'src/fields/primary-applicant-on-mortgage-application.field';
import {
  MORTGAGE_APPLICATION_LIXI_STANDARD_FIELD_ID,
  MORTGAGE_APPLICATION_LODGEMENT_TARGET_FIELD_ID,
  MORTGAGE_APPLICATION_NAME_FIELD_ID,
  MORTGAGE_APPLICATION_OBJECT_ID,
  MORTGAGE_APPLICATION_STAGE_FIELD_ID,
} from 'src/objects/mortgage-application';

export const MORTGAGE_APPLICATIONS_VIEW_ID =
  '6b6d0000-2000-4000-8000-000000000001';

export default defineView({
  universalIdentifier: MORTGAGE_APPLICATIONS_VIEW_ID,
  name: 'Mortgage pipeline',
  objectUniversalIdentifier: MORTGAGE_APPLICATION_OBJECT_ID,
  icon: 'IconHomeDollar',
  key: ViewKey.INDEX,
  position: 0,
  fields: [
    {
      universalIdentifier: '6b6d0000-2000-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: MORTGAGE_APPLICATION_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 220,
    },
    {
      universalIdentifier: '6b6d0000-2000-4000-8000-000000000006',
      fieldMetadataUniversalIdentifier:
        MORTGAGE_APPLICATION_ON_PRIMARY_APPLICANT_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: '6b6d0000-2000-4000-8000-000000000007',
      fieldMetadataUniversalIdentifier:
        MORTGAGE_APPLICATION_ON_OPPORTUNITY_FIELD_ID,
      position: 2,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: '6b6d0000-2000-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: MORTGAGE_APPLICATION_STAGE_FIELD_ID,
      position: 3,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: '6b6d0000-2000-4000-8000-000000000004',
      fieldMetadataUniversalIdentifier:
        MORTGAGE_APPLICATION_LODGEMENT_TARGET_FIELD_ID,
      position: 4,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: '6b6d0000-2000-4000-8000-000000000005',
      fieldMetadataUniversalIdentifier:
        MORTGAGE_APPLICATION_LIXI_STANDARD_FIELD_ID,
      position: 5,
      isVisible: true,
      size: 160,
    },
  ],
});
