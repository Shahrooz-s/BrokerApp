import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

import { MORTGAGE_APPLICATIONS_VIEW_ID } from 'src/views/mortgage-applications.view';

export default defineNavigationMenuItem({
  universalIdentifier: '6b6d0000-3000-4000-8000-000000000001',
  name: 'mortgage-applications',
  icon: 'IconHomeDollar',
  color: 'blue',
  position: 10,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: MORTGAGE_APPLICATIONS_VIEW_ID,
});
