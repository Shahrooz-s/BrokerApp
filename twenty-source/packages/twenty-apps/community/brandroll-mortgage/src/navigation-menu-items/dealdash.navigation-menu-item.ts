import { BOARDS_FOLDER_NAVIGATION_MENU_ITEM_ID } from 'src/navigation-menu-items/boards-folder.navigation-menu-item';
import { BROKERAPP_DEALDASH_PAGE_LAYOUT_ID } from 'src/page-layouts/brokerapp-dealdash.page-layout';
import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

export default defineNavigationMenuItem({
  universalIdentifier: '6b6d0000-3100-4000-8000-000000000104',
  name: 'DealDash',
  icon: 'IconHomeDollar',
  position: 0,
  type: NavigationMenuItemType.PAGE_LAYOUT,
  pageLayoutUniversalIdentifier: BROKERAPP_DEALDASH_PAGE_LAYOUT_ID,
  folderUniversalIdentifier: BOARDS_FOLDER_NAVIGATION_MENU_ITEM_ID,
});
