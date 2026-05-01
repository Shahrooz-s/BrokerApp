import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

import { DOCUMENT_REQUESTS_VIEW_ID } from 'src/views/document-requests.view';

export default defineNavigationMenuItem({
  universalIdentifier: '6b6d0000-3000-4000-8000-000000000004',
  name: 'document-requests',
  icon: 'IconFileDescription',
  color: 'purple',
  position: 13,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: DOCUMENT_REQUESTS_VIEW_ID,
});
