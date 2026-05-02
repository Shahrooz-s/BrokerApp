import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  KYC_VERIFICATION_EVENT_NAME_FIELD_ID,
  KYC_VERIFICATION_EVENT_OBJECT_ID,
  KYC_VERIFICATION_EVENT_RESULT_FIELD_ID,
} from 'src/objects/kyc-verification-event';

export const KYC_VERIFICATION_EVENTS_VIEW_ID =
  '6b6d0000-5810-4000-8000-000000000001';

export default defineView({
  universalIdentifier: KYC_VERIFICATION_EVENTS_VIEW_ID,
  name: 'KYC verification events',
  objectUniversalIdentifier: KYC_VERIFICATION_EVENT_OBJECT_ID,
  icon: 'IconFingerprint',
  key: ViewKey.INDEX,
  position: 16,
  fields: [
    {
      universalIdentifier: '6b6d0000-5810-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: KYC_VERIFICATION_EVENT_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-5810-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: KYC_VERIFICATION_EVENT_RESULT_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 160,
    },
  ],
});
