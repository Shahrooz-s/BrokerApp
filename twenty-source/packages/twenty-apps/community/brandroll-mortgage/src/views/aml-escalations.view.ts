import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  AML_ESCALATION_NAME_FIELD_ID,
  AML_ESCALATION_OBJECT_ID,
  AML_ESCALATION_STATUS_FIELD_ID,
} from 'src/objects/aml-escalation';

export const AML_ESCALATIONS_VIEW_ID =
  '6b6d0000-5830-4000-8000-000000000001';

export default defineView({
  universalIdentifier: AML_ESCALATIONS_VIEW_ID,
  name: 'AML escalations',
  objectUniversalIdentifier: AML_ESCALATION_OBJECT_ID,
  icon: 'IconShieldExclamation',
  key: ViewKey.INDEX,
  position: 18,
  fields: [
    {
      universalIdentifier: '6b6d0000-5830-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: AML_ESCALATION_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-5830-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: AML_ESCALATION_STATUS_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 200,
    },
  ],
});
