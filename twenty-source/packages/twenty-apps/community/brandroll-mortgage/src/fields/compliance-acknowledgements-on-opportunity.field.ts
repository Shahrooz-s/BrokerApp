import {
  FieldType,
  RelationType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

import { COMPLIANCE_ACKNOWLEDGEMENT_OBJECT_ID } from 'src/objects/compliance-acknowledgement';

import {
  COMPLIANCE_ACKNOWLEDGEMENT_ON_OPPORTUNITY_FIELD_ID,
  COMPLIANCE_ACKNOWLEDGEMENTS_ON_OPPORTUNITY_FIELD_ID,
} from './opportunity-on-compliance-acknowledgement.field';

export default defineField({
  universalIdentifier: COMPLIANCE_ACKNOWLEDGEMENTS_ON_OPPORTUNITY_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.RELATION,
  name: 'complianceAcknowledgements',
  label: 'Compliance acknowledgements',
  icon: 'IconSignature',
  relationTargetObjectMetadataUniversalIdentifier:
    COMPLIANCE_ACKNOWLEDGEMENT_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    COMPLIANCE_ACKNOWLEDGEMENT_ON_OPPORTUNITY_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
