import { BOARDS_FOLDER_NAVIGATION_MENU_ITEM_ID } from 'src/navigation-menu-items/boards-folder.navigation-menu-item';
import { OPPORTUNITY_DEAL_BOARD_VIEW_ID } from 'src/views/opportunity-deal-board.view';
import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

export default defineNavigationMenuItem({
  universalIdentifier: '6b6d0000-3100-4000-8000-000000000103',
  name: 'Deal board',
  icon: 'IconLayoutKanban',
  position: 2,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: OPPORTUNITY_DEAL_BOARD_VIEW_ID,
  folderUniversalIdentifier: BOARDS_FOLDER_NAVIGATION_MENU_ITEM_ID,
});
