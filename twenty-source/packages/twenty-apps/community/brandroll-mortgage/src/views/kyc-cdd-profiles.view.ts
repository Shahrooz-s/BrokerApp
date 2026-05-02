import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  KYC_CDD_PROFILE_NAME_FIELD_ID,
  KYC_CDD_PROFILE_OBJECT_ID,
  KYC_CDD_PROFILE_STATUS_FIELD_ID,
} from 'src/objects/kyc-cdd-profile';

export const KYC_CDD_PROFILES_VIEW_ID =
  '6b6d0000-5800-4000-8000-000000000001';

export default defineView({
  universalIdentifier: KYC_CDD_PROFILES_VIEW_ID,
  name: 'KYC/CDD profiles',
  objectUniversalIdentifier: KYC_CDD_PROFILE_OBJECT_ID,
  icon: 'IconShieldCheck',
  key: ViewKey.INDEX,
  position: 15,
  fields: [
    {
      universalIdentifier: '6b6d0000-5800-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: KYC_CDD_PROFILE_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-5800-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: KYC_CDD_PROFILE_STATUS_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 200,
    },
  ],
});
