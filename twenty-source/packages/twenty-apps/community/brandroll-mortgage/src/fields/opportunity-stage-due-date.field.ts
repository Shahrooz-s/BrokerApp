import {
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

export const OPPORTUNITY_STAGE_DUE_DATE_FIELD_ID =
  '6b6d0000-5000-4000-8000-000000000012';

export default defineField({
  universalIdentifier: OPPORTUNITY_STAGE_DUE_DATE_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.DATE,
  name: 'stageDueDate',
  label: 'Stage due date',
  icon: 'IconCalendarDue',
});
