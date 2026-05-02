import {
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

export const OPPORTUNITY_CLIENT_PORTAL_STATUS_FIELD_ID =
  '6b6d0000-5000-4000-8000-000000000020';

export default defineField({
  universalIdentifier: OPPORTUNITY_CLIENT_PORTAL_STATUS_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.SELECT,
  name: 'clientPortalStatus',
  label: 'Client portal status',
  icon: 'IconUserScreen',
  options: [
    { value: 'NOT_INVITED', label: 'Not invited', position: 0, color: 'gray' },
    { value: 'INVITED', label: 'Invited', position: 1, color: 'blue' },
    { value: 'CLIENT_IN_PROGRESS', label: 'Client in progress', position: 2, color: 'purple' },
    { value: 'BROKER_REVIEW', label: 'Broker review', position: 3, color: 'orange' },
    { value: 'COMPLETE', label: 'Complete', position: 4, color: 'green' },
  ],
});
