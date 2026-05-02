import { ViewType, defineView } from 'twenty-sdk/define';

import {
  OPPORTUNITY_BOARD_FIELDS,
  OPPORTUNITY_OBJECT_ID,
} from 'src/views/opportunity-board-fields';

export const OPPORTUNITY_DEAL_LIST_VIEW_ID =
  '6b6d0000-2100-4000-8000-000000000501';

export default defineView({
  universalIdentifier: OPPORTUNITY_DEAL_LIST_VIEW_ID,
  name: 'Deal list',
  objectUniversalIdentifier: OPPORTUNITY_OBJECT_ID,
  type: ViewType.TABLE,
  icon: 'IconTable',
  position: 2,
  fields: [
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000503',
      fieldMetadataUniversalIdentifier: OPPORTUNITY_BOARD_FIELDS.name,
      position: 0,
      isVisible: true,
      size: 260,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000502',
      fieldMetadataUniversalIdentifier: OPPORTUNITY_BOARD_FIELDS.brokerWorkflowStage,
      position: 1,
      isVisible: true,
      size: 220,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000504',
      fieldMetadataUniversalIdentifier: OPPORTUNITY_BOARD_FIELDS.pointOfContact,
      position: 2,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000505',
      fieldMetadataUniversalIdentifier: OPPORTUNITY_BOARD_FIELDS.company,
      position: 3,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000506',
      fieldMetadataUniversalIdentifier: OPPORTUNITY_BOARD_FIELDS.loanAmount,
      position: 4,
      isVisible: true,
      size: 140,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000507',
      fieldMetadataUniversalIdentifier: OPPORTUNITY_BOARD_FIELDS.stageDueDate,
      position: 5,
      isVisible: true,
      size: 140,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000508',
      fieldMetadataUniversalIdentifier: OPPORTUNITY_BOARD_FIELDS.factFindStatus,
      position: 6,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000509',
      fieldMetadataUniversalIdentifier:
        OPPORTUNITY_BOARD_FIELDS.documentStackStatus,
      position: 7,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000510',
      fieldMetadataUniversalIdentifier:
        OPPORTUNITY_BOARD_FIELDS.serviceabilityStatus,
      position: 8,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000511',
      fieldMetadataUniversalIdentifier:
        OPPORTUNITY_BOARD_FIELDS.productResearchStatus,
      position: 9,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000512',
      fieldMetadataUniversalIdentifier:
        OPPORTUNITY_BOARD_FIELDS.creditProposalStatus,
      position: 10,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000513',
      fieldMetadataUniversalIdentifier: OPPORTUNITY_BOARD_FIELDS.kycCddStatus,
      position: 11,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000514',
      fieldMetadataUniversalIdentifier:
        OPPORTUNITY_BOARD_FIELDS.lodgementReadiness,
      position: 12,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000515',
      fieldMetadataUniversalIdentifier: OPPORTUNITY_BOARD_FIELDS.nextBrokerAction,
      position: 13,
      isVisible: true,
      size: 280,
    },
  ],
});
