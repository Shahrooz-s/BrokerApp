import { ViewKey, defineView } from 'twenty-sdk/define';

import {
  LENDER_CALCULATOR_NAME_FIELD_ID,
  LENDER_CALCULATOR_OBJECT_ID,
  LENDER_CALCULATOR_REVIEW_DUE_FIELD_ID,
  LENDER_CALCULATOR_STATUS_FIELD_ID,
  LENDER_CALCULATOR_TYPE_FIELD_ID,
} from 'src/objects/lender-calculator';

export const LENDER_CALCULATORS_VIEW_ID =
  '6b6d0000-3040-4000-8000-000000000001';

export default defineView({
  universalIdentifier: LENDER_CALCULATORS_VIEW_ID,
  name: 'Lender calculators',
  objectUniversalIdentifier: LENDER_CALCULATOR_OBJECT_ID,
  icon: 'IconCalculator',
  key: ViewKey.INDEX,
  position: 31,
  fields: [
    {
      universalIdentifier: '6b6d0000-3040-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: LENDER_CALCULATOR_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-3040-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: LENDER_CALCULATOR_TYPE_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: '6b6d0000-3040-4000-8000-000000000004',
      fieldMetadataUniversalIdentifier: LENDER_CALCULATOR_STATUS_FIELD_ID,
      position: 2,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: '6b6d0000-3040-4000-8000-000000000005',
      fieldMetadataUniversalIdentifier: LENDER_CALCULATOR_REVIEW_DUE_FIELD_ID,
      position: 3,
      isVisible: true,
      size: 170,
    },
  ],
});
