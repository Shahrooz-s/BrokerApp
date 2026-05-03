import { BROKERAPP_LOANDASH_FRONT_COMPONENT_ID } from 'src/front-components/brokerapp-workspace.front-component';
import { definePageLayout, PageLayoutTabLayoutMode } from 'twenty-sdk/define';

export const BROKERAPP_LOANDASH_PAGE_LAYOUT_ID =
  '6b6d0000-4200-4000-8000-000000000001';

export default definePageLayout({
  universalIdentifier: BROKERAPP_LOANDASH_PAGE_LAYOUT_ID,
  name: 'BrokerApp LoanDash',
  type: 'STANDALONE_PAGE',
  tabs: [
    {
      universalIdentifier: '6b6d0000-4200-4000-8000-000000000002',
      title: 'BrokerApp LoanDash',
      position: 0,
      icon: 'IconHomeDollar',
      layoutMode: PageLayoutTabLayoutMode.CANVAS,
      widgets: [
        {
          universalIdentifier: '6b6d0000-4200-4000-8000-000000000003',
          title: 'BrokerApp LoanDash',
          type: 'FRONT_COMPONENT',
          configuration: {
            configurationType: 'FRONT_COMPONENT',
            frontComponentUniversalIdentifier:
              BROKERAPP_LOANDASH_FRONT_COMPONENT_ID,
          },
        },
      ],
    },
  ],
});
