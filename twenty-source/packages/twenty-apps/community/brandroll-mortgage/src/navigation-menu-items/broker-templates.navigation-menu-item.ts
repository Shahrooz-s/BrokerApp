import { BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID } from 'src/navigation-menu-items/broker-settings-folder.navigation-menu-item';
import { BROKER_TEMPLATES_VIEW_ID } from 'src/views/broker-templates.view';
import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

export default defineNavigationMenuItem({
  universalIdentifier: '6b6d0000-3100-4000-8000-000000000004',
  name: 'Broker templates',
  icon: 'IconTemplate',
  position: 15,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: BROKER_TEMPLATES_VIEW_ID,
  folderUniversalIdentifier: BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID,
});
