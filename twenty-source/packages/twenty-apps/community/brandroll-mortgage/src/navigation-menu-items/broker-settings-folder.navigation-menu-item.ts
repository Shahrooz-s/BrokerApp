import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

export const BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID =
  '6b6d0000-3100-4000-8000-000000000001';

export default defineNavigationMenuItem({
  universalIdentifier: BROKER_SETTINGS_FOLDER_NAVIGATION_MENU_ITEM_ID,
  name: 'Broker Settings',
  icon: 'IconSettings',
  position: 900,
  type: NavigationMenuItemType.FOLDER,
});
