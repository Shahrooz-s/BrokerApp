import { BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID } from 'src/navigation-menu-items/broker-settings-folder.navigation-menu-item';
import { DEAL_CHECKLIST_ITEMS_VIEW_ID } from 'src/views/deal-checklist-items.view';
import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

export default defineNavigationMenuItem({
  universalIdentifier: '6b6d0000-3100-4000-8000-000000000014',
  name: 'Deal checklist items',
  icon: 'IconListDetails',
  position: 43,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: DEAL_CHECKLIST_ITEMS_VIEW_ID,
  folderUniversalIdentifier: BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID,
});
