import {
  FieldType,
  OnDeleteAction,
  RelationType,
  defineField,
} from 'twenty-sdk/define';

import { BROKER_FORM_TEMPLATE_OBJECT_ID } from 'src/objects/broker-form-template';
import { FACT_FIND_SESSION_OBJECT_ID } from 'src/objects/fact-find-session';

export const BROKER_FORM_TEMPLATE_ON_FACT_FIND_SESSION_FIELD_ID =
  '6b6d0000-410f-4000-8000-000000000001';
export const FACT_FIND_SESSIONS_ON_BROKER_FORM_TEMPLATE_FIELD_ID =
  '6b6d0000-410f-4000-8000-000000000002';

export default defineField({
  universalIdentifier: BROKER_FORM_TEMPLATE_ON_FACT_FIND_SESSION_FIELD_ID,
  objectUniversalIdentifier: FACT_FIND_SESSION_OBJECT_ID,
  type: FieldType.RELATION,
  name: 'brokerFormTemplate',
  label: 'Broker form template',
  icon: 'IconSettingsAutomation',
  relationTargetObjectMetadataUniversalIdentifier:
    BROKER_FORM_TEMPLATE_OBJECT_ID,
  relationTargetFieldMetadataUniversalIdentifier:
    FACT_FIND_SESSIONS_ON_BROKER_FORM_TEMPLATE_FIELD_ID,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'brokerFormTemplateId',
  },
});
