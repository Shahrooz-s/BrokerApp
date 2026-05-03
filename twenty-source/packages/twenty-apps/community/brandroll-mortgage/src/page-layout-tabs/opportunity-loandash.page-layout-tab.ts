import { BROKERAPP_LOANDASH_FRONT_COMPONENT_ID } from 'src/front-components/brokerapp-workspace.front-component';
import {
  PageLayoutTabLayoutMode,
  definePageLayoutTab,
} from 'twenty-sdk/define';

export const STANDARD_OPPORTUNITY_PAGE_LAYOUT_UNIVERSAL_IDENTIFIER =
  '20202020-a103-4003-8003-0aa0b1ca1003';

export const BROKERAPP_OPPORTUNITY_LOANDASH_PAGE_LAYOUT_TAB_ID =
  '6b6d0000-4200-4000-8000-000000000010';

export default definePageLayoutTab({
  universalIdentifier: BROKERAPP_OPPORTUNITY_LOANDASH_PAGE_LAYOUT_TAB_ID,
  pageLayoutUniversalIdentifier:
    STANDARD_OPPORTUNITY_PAGE_LAYOUT_UNIVERSAL_IDENTIFIER,
  title: 'LoanDash',
  position: 0,
  icon: 'IconHomeDollar',
  layoutMode: PageLayoutTabLayoutMode.CANVAS,
  widgets: [
    {
      universalIdentifier: '6b6d0000-4200-4000-8000-000000000011',
      title: 'BrokerApp Loan Workspace',
      type: 'FRONT_COMPONENT',
      configuration: {
        configurationType: 'FRONT_COMPONENT',
        frontComponentUniversalIdentifier:
          BROKERAPP_LOANDASH_FRONT_COMPONENT_ID,
      },
      gridPosition: {
        row: 0,
        column: 0,
        rowSpan: 72,
        columnSpan: 12,
      },
    },
  ],
});
