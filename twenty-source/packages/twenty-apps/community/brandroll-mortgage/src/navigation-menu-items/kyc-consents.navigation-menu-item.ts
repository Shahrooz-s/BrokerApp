import { BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID } from 'src/navigation-menu-items/broker-settings-folder.navigation-menu-item';
import { KYC_CONSENTS_VIEW_ID } from 'src/views/kyc-consents.view';
import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

export default defineNavigationMenuItem({
  universalIdentifier: '6b6d0000-3100-4000-8000-000000000017',
  name: 'KYC consents',
  icon: 'IconSignature',
  position: 52,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: KYC_CONSENTS_VIEW_ID,
  folderUniversalIdentifier: BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID,
});
