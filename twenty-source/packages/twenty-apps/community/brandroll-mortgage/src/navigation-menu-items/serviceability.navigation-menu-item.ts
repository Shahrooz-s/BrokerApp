import {
  NavigationMenuItemType,
  defineNavigationMenuItem,
} from 'twenty-sdk/define';

import { SERVICEABILITY_ASSESSMENTS_VIEW_ID } from 'src/views/serviceability-assessments.view';

export default defineNavigationMenuItem({
  universalIdentifier: '6b6d0000-3000-4000-8000-000000000005',
  name: 'serviceability',
  icon: 'IconCalculator',
  color: 'green',
  position: 14,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: SERVICEABILITY_ASSESSMENTS_VIEW_ID,
});
