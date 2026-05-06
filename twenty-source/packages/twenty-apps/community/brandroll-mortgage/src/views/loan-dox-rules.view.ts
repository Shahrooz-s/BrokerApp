import { ViewKey, ViewVisibility, defineView } from 'twenty-sdk/define';

import {
  LOAN_DOX_RULE_NAME_FIELD_ID,
  LOAN_DOX_RULE_OBJECT_ID,
  LOAN_DOX_RULE_STATUS_FIELD_ID,
  LOAN_DOX_RULE_TYPE_FIELD_ID,
} from 'src/objects/loan-dox-rule';

export const LOAN_DOX_RULES_VIEW_ID =
  '6b6d0000-4621-4000-8000-000000000001';

export default defineView({
  universalIdentifier: LOAN_DOX_RULES_VIEW_ID,
  name: 'LoanDox rules',
  objectUniversalIdentifier: LOAN_DOX_RULE_OBJECT_ID,
  icon: 'IconFileSettings',
  key: ViewKey.INDEX,
  position: 7,
  visibility: ViewVisibility.UNLISTED,
  fields: [
    {
      universalIdentifier: '6b6d0000-4621-4000-8000-000000000002',
      fieldMetadataUniversalIdentifier: LOAN_DOX_RULE_NAME_FIELD_ID,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-4621-4000-8000-000000000003',
      fieldMetadataUniversalIdentifier: LOAN_DOX_RULE_TYPE_FIELD_ID,
      position: 1,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: '6b6d0000-4621-4000-8000-000000000004',
      fieldMetadataUniversalIdentifier: LOAN_DOX_RULE_STATUS_FIELD_ID,
      position: 2,
      isVisible: true,
      size: 180,
    },
  ],
});
