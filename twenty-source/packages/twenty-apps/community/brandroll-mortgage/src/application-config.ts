import { defineApplication } from 'twenty-sdk/define';

import { DEFAULT_ROLE_UNIVERSAL_IDENTIFIER } from 'src/roles/default-role';

export default defineApplication({
  universalIdentifier: '6b6d0000-0000-4000-8000-000000000001',
  displayName: 'BrokerApp',
  description:
    'White-labelled, LIXI-aware mortgage broking workspace with BrokerEngine-style deal boards, client portal foundations, product research, checklists, and AML/KYC controls.',
  icon: 'IconHomeDollar',
  defaultRoleUniversalIdentifier: DEFAULT_ROLE_UNIVERSAL_IDENTIFIER,
});
