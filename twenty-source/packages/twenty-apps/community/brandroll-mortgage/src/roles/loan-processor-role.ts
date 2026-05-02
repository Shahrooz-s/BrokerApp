import { PermissionFlag, defineRole } from 'twenty-sdk/define';

export const LOAN_PROCESSOR_ROLE_UNIVERSAL_IDENTIFIER =
  '6b6d0000-3200-4000-8000-000000000004';

export default defineRole({
  universalIdentifier: LOAN_PROCESSOR_ROLE_UNIVERSAL_IDENTIFIER,
  label: 'BrokerApp loan processor',
  description:
    'Loan processor and assistant role for checklists, tasks, document requests, conditions, lodgement packaging, and settlement workflow.',
  canReadAllObjectRecords: true,
  canUpdateAllObjectRecords: true,
  canSoftDeleteAllObjectRecords: false,
  canDestroyAllObjectRecords: false,
  canUpdateAllSettings: false,
  canBeAssignedToAgents: false,
  canBeAssignedToUsers: true,
  canBeAssignedToApiKeys: false,
  objectPermissions: [],
  fieldPermissions: [],
  permissionFlags: [PermissionFlag.APPLICATIONS],
});
