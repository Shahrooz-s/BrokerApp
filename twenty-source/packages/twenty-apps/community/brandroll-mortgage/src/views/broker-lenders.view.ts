import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  BROKER_LENDER_CATEGORY_FIELD_ID,
  BROKER_LENDER_LODGEMENT_CHANNEL_FIELD_ID,
  BROKER_LENDER_NAME_FIELD_ID,
  BROKER_LENDER_OBJECT_ID,
  BROKER_LENDER_PANEL_STATUS_FIELD_ID,
  BROKER_LENDER_POLICY_REVIEW_DUE_FIELD_ID,
  BROKER_LENDER_STATUS_FIELD_ID,
} from 'src/objects/broker-lender';

export const BROKER_LENDERS_VIEW_ID =
  '6b6d0000-3030-4000-8000-000000000001';

export default defineView({
  universalIdentifier: BROKER_LENDERS_VIEW_ID,
  name: 'Lenders',
  objectUniversalIdentifier: BROKER_LENDER_OBJECT_ID,
  icon: 'IconBuildingBank',
  key: ViewKey.INDEX,
  position: 30,
  fields: [
    {
      universalIdentifier: '6b6d0000-3030-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: BROKER_LENDER_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-3030-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: BROKER_LENDER_CATEGORY_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: '6b6d0000-3030-4000-8000-000000000004',
      fieldMetadataUniversalIdentifier: BROKER_LENDER_STATUS_FIELD_ID,
      position: 2,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: '6b6d0000-3030-4000-8000-000000000005',
      fieldMetadataUniversalIdentifier: BROKER_LENDER_PANEL_STATUS_FIELD_ID,
      position: 3,
      isVisible: true,
      size: 160,
    },
    {
      universalIdentifier: '6b6d0000-3030-4000-8000-000000000006',
      fieldMetadataUniversalIdentifier:
        BROKER_LENDER_LODGEMENT_CHANNEL_FIELD_ID,
      position: 4,
      isVisible: true,
      size: 170,
    },
    {
      universalIdentifier: '6b6d0000-3030-4000-8000-000000000007',
      fieldMetadataUniversalIdentifier:
        BROKER_LENDER_POLICY_REVIEW_DUE_FIELD_ID,
      position: 5,
      isVisible: true,
      size: 170,
    },
  ],
});
