import { BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID } from 'src/navigation-menu-items/broker-settings-folder.navigation-menu-item';
import { PRODUCT_IMPORT_RUNS_VIEW_ID } from 'src/views/product-import-runs.view';
import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

export default defineNavigationMenuItem({
  universalIdentifier: '6b6d0000-3100-4000-8000-000000000021',
  name: 'Product imports',
  icon: 'IconFileImport',
  position: 61,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: PRODUCT_IMPORT_RUNS_VIEW_ID,
  folderUniversalIdentifier: BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID,
});
