import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

import { CREDIT_PROPOSALS_VIEW_ID } from 'src/views/credit-proposals.view';

export default defineNavigationMenuItem({
  universalIdentifier: '6b6d0000-3000-4000-8000-000000000002',
  name: 'credit-proposals',
  icon: 'IconClipboardCheck',
  color: 'green',
  position: 11,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: CREDIT_PROPOSALS_VIEW_ID,
});
