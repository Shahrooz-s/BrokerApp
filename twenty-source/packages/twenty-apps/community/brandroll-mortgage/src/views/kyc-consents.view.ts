import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  KYC_CONSENT_NAME_FIELD_ID,
  KYC_CONSENT_OBJECT_ID,
  KYC_CONSENT_STATUS_FIELD_ID,
} from 'src/objects/kyc-consent';

export const KYC_CONSENTS_VIEW_ID =
  '6b6d0000-5820-4000-8000-000000000001';

export default defineView({
  universalIdentifier: KYC_CONSENTS_VIEW_ID,
  name: 'KYC consents',
  objectUniversalIdentifier: KYC_CONSENT_OBJECT_ID,
  icon: 'IconFileCertificate',
  key: ViewKey.INDEX,
  position: 17,
  fields: [
    {
      universalIdentifier: '6b6d0000-5820-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: KYC_CONSENT_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-5820-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: KYC_CONSENT_STATUS_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 180,
    },
  ],
});
