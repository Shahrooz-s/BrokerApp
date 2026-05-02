import { PermissionFlag, defineRole } from 'twenty-sdk/define';

export const COMPLIANCE_ROLE_UNIVERSAL_IDENTIFIER =
  '6b6d0000-3200-4000-8000-000000000002';

export default defineRole({
  universalIdentifier: COMPLIANCE_ROLE_UNIVERSAL_IDENTIFIER,
  label: 'BrokerApp compliance',
  description:
    'Compliance role for AML/CTF, KYC/CDD, evidence packs, escalations, audit, policy exceptions, and credit-proposal review.',
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
