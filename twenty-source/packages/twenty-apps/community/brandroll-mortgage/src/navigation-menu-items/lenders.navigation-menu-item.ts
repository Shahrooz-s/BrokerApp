import { BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID } from 'src/navigation-menu-items/broker-settings-folder.navigation-menu-item';
import { BROKER_LENDERS_VIEW_ID } from 'src/views/broker-lenders.view';
import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

export default defineNavigationMenuItem({
  universalIdentifier: '6b6d0000-3100-4000-8000-000000000003',
  name: 'Lenders',
  icon: 'IconBuildingBank',
  position: 20,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: BROKER_LENDERS_VIEW_ID,
  folderUniversalIdentifier: BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID,
});
