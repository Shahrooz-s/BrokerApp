import { BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID } from 'src/navigation-menu-items/broker-settings-folder.navigation-menu-item';
import { DEAL_WORKSPACE_TOOLS_VIEW_ID } from 'src/views/deal-workspace-tools.view';
import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

export default defineNavigationMenuItem({
  universalIdentifier: '6b6d0000-3100-4000-8000-000000000006',
  name: 'Deal workspace tools',
  icon: 'IconLayoutSidebarRight',
  position: 18,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: DEAL_WORKSPACE_TOOLS_VIEW_ID,
  folderUniversalIdentifier: BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID,
});
