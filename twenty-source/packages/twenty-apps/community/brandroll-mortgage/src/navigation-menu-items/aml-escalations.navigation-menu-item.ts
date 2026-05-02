import { BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID } from 'src/navigation-menu-items/broker-settings-folder.navigation-menu-item';
import { AML_ESCALATIONS_VIEW_ID } from 'src/views/aml-escalations.view';
import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

export default defineNavigationMenuItem({
  universalIdentifier: '6b6d0000-3100-4000-8000-000000000018',
  name: 'AML escalations',
  icon: 'IconShieldExclamation',
  position: 53,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: AML_ESCALATIONS_VIEW_ID,
  folderUniversalIdentifier: BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID,
});
