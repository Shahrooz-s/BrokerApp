import { BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID } from 'src/navigation-menu-items/broker-settings-folder.navigation-menu-item';
import { BROKERENGINE_FEATURE_PARITY_VIEW_ID } from 'src/views/brokerengine-feature-parity.view';
import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

export default defineNavigationMenuItem({
  universalIdentifier: '6b6d0000-3100-4000-8000-000000000023',
  name: 'Feature parity',
  icon: 'IconClipboardCheck',
  position: 3,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: BROKERENGINE_FEATURE_PARITY_VIEW_ID,
  folderUniversalIdentifier: BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID,
});
