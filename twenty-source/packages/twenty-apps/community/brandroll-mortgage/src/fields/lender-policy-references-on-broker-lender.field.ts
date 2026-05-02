import { FieldType, RelationType, defineField } from 'twenty-sdk/define';

import { BROKER_LENDER_OBJECT_ID } from 'src/objects/broker-lender';
import { LENDER_POLICY_REFERENCE_OBJECT_ID } from 'src/objects/lender-policy-reference';

import {
  BROKER_LENDER_ON_LENDER_POLICY_REFERENCE_FIELD_ID,
  LENDER_POLICY_REFERENCES_ON_BROKER_LENDER_FIELD_ID,
} from './broker-lender-on-lender-policy-reference.field';

export default defineField({
  universalIdentifier: LENDER_POLICY_REFERENCES_ON_BROKER_LENDER_FIELD_ID,
  objectUniversalIdentifier: BROKER_LENDER_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'lenderPolicyReferences',
  label: 'Lender policy references',
  icon: 'IconScale',
  relationTargetObjectMetadataUniversalIdentifier:
    LENDER_POLICY_REFERENCE_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    BROKER_LENDER_ON_LENDER_POLICY_REFERENCE_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
