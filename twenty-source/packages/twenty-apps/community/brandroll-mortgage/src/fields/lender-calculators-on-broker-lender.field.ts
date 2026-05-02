import { FieldType, RelationType, defineField } from 'twenty-sdk/define';

import { BROKER_LENDER_OBJECT_ID } from 'src/objects/broker-lender';
import { LENDER_CALCULATOR_OBJECT_ID } from 'src/objects/lender-calculator';

import {
  BROKER_LENDER_ON_LENDER_CALCULATOR_FIELD_ID,
  LENDER_CALCULATORS_ON_BROKER_LENDER_FIELD_ID,
} from './broker-lender-on-lender-calculator.field';

export default defineField({
  universalIdentifier: LENDER_CALCULATORS_ON_BROKER_LENDER_FIELD_ID,
  objectUniversalIdentifier: BROKER_LENDER_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'lenderCalculators',
  label: 'Lender calculators',
  icon: 'IconCalculator',
  relationTargetObjectMetadataUniversalIdentifier: LENDER_CALCULATOR_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    BROKER_LENDER_ON_LENDER_CALCULATOR_FIELD_ID,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});
