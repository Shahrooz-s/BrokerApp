import { PermissionFlag, defineRole } from 'twenty-sdk/define';

export const BROKER_ROLE_UNIVERSAL_IDENTIFIER =
  '6b6d0000-3200-4000-8000-000000000003';

export default defineRole({
  universalIdentifier: BROKER_ROLE_UNIVERSAL_IDENTIFIER,
  label: 'BrokerApp broker',
  description:
    'Broker role for deals, applicants, fact find, product research, serviceability, credit proposals, lodgement, and settlement progression.',
  canReadAllObjectRecords: true,
  canUpdateAllObjectRecords: true,
  canSoftDeleteAllObjectRecords: false,
  canDestroyAllObjectRecords: false,
  canUpdateAllSettings: false,
  canBeAssignedToAgents: false,
  canBeAssignedToUsers: true,
  canBeAssignedToApiKeys: true,
  objectPermissions: [],
  fieldPermissions: [],
  permissionFlags: [PermissionFlag.APPLICATIONS],
});
