import { PermissionFlag, defineRole } from 'twenty-sdk/define';

export const MASTER_ADMIN_ROLE_UNIVERSAL_IDENTIFIER =
  '6b6d0000-3200-4000-8000-000000000001';

export default defineRole({
  universalIdentifier: MASTER_ADMIN_ROLE_UNIVERSAL_IDENTIFIER,
  label: 'BrokerApp master admin',
  description:
    'Full BrokerApp workspace administrator for white-label, settings, users, integrations, security, and deployment configuration.',
  canReadAllObjectRecords: true,
  canUpdateAllObjectRecords: true,
  canSoftDeleteAllObjectRecords: true,
  canDestroyAllObjectRecords: false,
  canUpdateAllSettings: true,
  canBeAssignedToAgents: false,
  canBeAssignedToUsers: true,
  canBeAssignedToApiKeys: true,
  objectPermissions: [],
  fieldPermissions: [],
  permissionFlags: [PermissionFlag.APPLICATIONS],
});
