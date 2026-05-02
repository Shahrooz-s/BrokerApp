import { defineRole } from 'twenty-sdk/define';

export const CLIENT_PORTAL_ROLE_UNIVERSAL_IDENTIFIER =
  '6b6d0000-3200-4000-8000-000000000005';

export default defineRole({
  universalIdentifier: CLIENT_PORTAL_ROLE_UNIVERSAL_IDENTIFIER,
  label: 'BrokerApp client portal',
  description:
    'External portal role marker for borrowers. It must not be assigned as a normal staff CRM role.',
  canReadAllObjectRecords: false,
  canUpdateAllObjectRecords: false,
  canSoftDeleteAllObjectRecords: false,
  canDestroyAllObjectRecords: false,
  canUpdateAllSettings: false,
  canBeAssignedToAgents: false,
  canBeAssignedToUsers: false,
  canBeAssignedToApiKeys: false,
  objectPermissions: [],
  fieldPermissions: [],
  permissionFlags: [],
});
