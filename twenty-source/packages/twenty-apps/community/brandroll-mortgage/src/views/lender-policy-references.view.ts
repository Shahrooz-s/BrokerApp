import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  LENDER_POLICY_REFERENCE_CATEGORY_FIELD_ID,
  LENDER_POLICY_REFERENCE_NAME_FIELD_ID,
  LENDER_POLICY_REFERENCE_OBJECT_ID,
  LENDER_POLICY_REFERENCE_REVIEW_DUE_FIELD_ID,
  LENDER_POLICY_REFERENCE_STATUS_FIELD_ID,
} from 'src/objects/lender-policy-reference';

export const LENDER_POLICY_REFERENCES_VIEW_ID =
  '6b6d0000-3050-4000-8000-000000000001';

export default defineView({
  universalIdentifier: LENDER_POLICY_REFERENCES_VIEW_ID,
  name: 'Lender policies',
  objectUniversalIdentifier: LENDER_POLICY_REFERENCE_OBJECT_ID,
  icon: 'IconScale',
  key: ViewKey.INDEX,
  position: 32,
  fields: [
    {
      universalIdentifier: '6b6d0000-3050-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: LENDER_POLICY_REFERENCE_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-3050-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier:
        LENDER_POLICY_REFERENCE_CATEGORY_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 190,
    },
    {
      universalIdentifier: '6b6d0000-3050-4000-8000-000000000004',
      fieldMetadataUniversalIdentifier: LENDER_POLICY_REFERENCE_STATUS_FIELD_ID,
      position: 2,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: '6b6d0000-3050-4000-8000-000000000005',
      fieldMetadataUniversalIdentifier:
        LENDER_POLICY_REFERENCE_REVIEW_DUE_FIELD_ID,
      position: 3,
      isVisible: true,
      size: 170,
    },
  ],
});
