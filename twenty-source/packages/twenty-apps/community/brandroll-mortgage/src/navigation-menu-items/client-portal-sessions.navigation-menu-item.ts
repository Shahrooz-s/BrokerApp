import { BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID } from 'src/navigation-menu-items/broker-settings-folder.navigation-menu-item';
import { CLIENT_PORTAL_SESSIONS_VIEW_ID } from 'src/views/client-portal-sessions.view';
import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

export default defineNavigationMenuItem({
  universalIdentifier: '6b6d0000-3100-4000-8000-000000000009',
  name: 'Client portal sessions',
  icon: 'IconUserScreen',
  position: 30,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: CLIENT_PORTAL_SESSIONS_VIEW_ID,
  folderUniversalIdentifier: BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID,
});
