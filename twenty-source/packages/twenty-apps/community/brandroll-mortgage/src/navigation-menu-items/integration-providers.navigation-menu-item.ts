import { BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID } from 'src/navigation-menu-items/broker-settings-folder.navigation-menu-item';
import { INTEGRATION_PROVIDERS_VIEW_ID } from 'src/views/integration-providers.view';
import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

export default defineNavigationMenuItem({
  universalIdentifier: '6b6d0000-3100-4000-8000-000000000020',
  name: 'Integration providers',
  icon: 'IconPlugConnected',
  position: 60,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: INTEGRATION_PROVIDERS_VIEW_ID,
  folderUniversalIdentifier: BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID,
});
