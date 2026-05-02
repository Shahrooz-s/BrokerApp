import { BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID } from 'src/navigation-menu-items/broker-settings-folder.navigation-menu-item';
import { KYC_VERIFICATION_EVENTS_VIEW_ID } from 'src/views/kyc-verification-events.view';
import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

export default defineNavigationMenuItem({
  universalIdentifier: '6b6d0000-3100-4000-8000-000000000016',
  name: 'KYC verification events',
  icon: 'IconFingerprint',
  position: 51,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: KYC_VERIFICATION_EVENTS_VIEW_ID,
  folderUniversalIdentifier: BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID,
});
