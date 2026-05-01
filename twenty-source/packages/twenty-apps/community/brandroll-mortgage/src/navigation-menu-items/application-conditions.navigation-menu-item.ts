import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

import { APPLICATION_CONDITIONS_VIEW_ID } from 'src/views/application-conditions.view';

export default defineNavigationMenuItem({
  universalIdentifier: '6b6d0000-3000-4000-8000-000000000003',
  name: 'application-conditions',
  icon: 'IconListCheck',
  color: 'orange',
  position: 12,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: APPLICATION_CONDITIONS_VIEW_ID,
});
