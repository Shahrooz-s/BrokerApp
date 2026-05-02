import { BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID } from 'src/navigation-menu-items/broker-settings-folder.navigation-menu-item';
import { BROKER_CHECKLIST_TEMPLATES_VIEW_ID } from 'src/views/broker-checklist-templates.view';
import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

export default defineNavigationMenuItem({
  universalIdentifier: '6b6d0000-3100-4000-8000-000000000011',
  name: 'Checklist templates',
  icon: 'IconListCheck',
  position: 40,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: BROKER_CHECKLIST_TEMPLATES_VIEW_ID,
  folderUniversalIdentifier: BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID,
});
