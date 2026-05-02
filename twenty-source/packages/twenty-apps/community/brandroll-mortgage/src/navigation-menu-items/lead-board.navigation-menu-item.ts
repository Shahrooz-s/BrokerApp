import { BOARDS_FOLDER_NAVIGATION_MENU_ITEM_ID } from 'src/navigation-menu-items/boards-folder.navigation-menu-item';
import { OPPORTUNITY_LEAD_BOARD_VIEW_ID } from 'src/views/opportunity-lead-board.view';
import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

export default defineNavigationMenuItem({
  universalIdentifier: '6b6d0000-3100-4000-8000-000000000102',
  name: 'Lead board',
  icon: 'IconLayoutKanban',
  position: 1,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: OPPORTUNITY_LEAD_BOARD_VIEW_ID,
  folderUniversalIdentifier: BOARDS_FOLDER_NAVIGATION_MENU_ITEM_ID,
});
