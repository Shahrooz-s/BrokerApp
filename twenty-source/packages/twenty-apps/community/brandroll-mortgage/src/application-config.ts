import { defineApplication } from 'twenty-sdk/define';

import { DEFAULT_ROLE_UNIVERSAL_IDENTIFIER } from 'src/roles/default-role';

export default defineApplication({
  universalIdentifier: '6b6d0000-0000-4000-8000-000000000001',
  displayName: 'BrokerApp Mortgage',
  description:
    'LIXI-aware mortgage broking objects, fields, and views for BrokerApp.',
  icon: 'IconHomeDollar',
  defaultRoleUniversalIdentifier: DEFAULT_ROLE_UNIVERSAL_IDENTIFIER,
});
