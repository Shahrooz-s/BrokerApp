import { BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID } from 'src/navigation-menu-items/broker-settings-folder.navigation-menu-item';
import { EVIDENCE_PACKS_VIEW_ID } from 'src/views/evidence-packs.view';
import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

export default defineNavigationMenuItem({
  universalIdentifier: '6b6d0000-3100-4000-8000-000000000019',
  name: 'Evidence packs',
  icon: 'IconFileCertificate',
  position: 54,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: EVIDENCE_PACKS_VIEW_ID,
  folderUniversalIdentifier: BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID,
});
