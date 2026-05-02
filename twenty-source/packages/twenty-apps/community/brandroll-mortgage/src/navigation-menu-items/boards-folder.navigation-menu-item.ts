import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

export const BOARDS_FOLDER_NAVIGATION_MENU_ITEM_ID =
  '6b6d0000-3100-4000-8000-000000000101';

export default defineNavigationMenuItem({
  universalIdentifier: BOARDS_FOLDER_NAVIGATION_MENU_ITEM_ID,
  name: 'Boards',
  icon: 'IconLayoutKanban',
  position: 80,
  type: NavigationMenuItemType.FOLDER,
});
