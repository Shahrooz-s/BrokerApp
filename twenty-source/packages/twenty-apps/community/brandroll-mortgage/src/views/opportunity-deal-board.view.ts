import { ViewType, defineView, type ViewConfig } from 'twenty-sdk/define';

import {
  OPPORTUNITY_BOARD_FIELDS,
  OPPORTUNITY_OBJECT_ID,
} from 'src/views/opportunity-board-fields';

export const OPPORTUNITY_DEAL_BOARD_VIEW_ID =
  '6b6d0000-2100-4000-8000-000000000301';

const dealStages = [
  'OUTSTANDING_SUPPORTING_DOCUMENTS',
  'PREPARE_FOR_SUBMISSION',
  'APP_DOCS_WITH_CLIENT',
  'SIGNED_APP_DOCS_RETURNED',
  'APPLICATION_LODGED',
  'AIP_ISSUED',
  'AIP_FULL_CONVERSION',
  'CONDITIONAL_MIRS',
  'CONDITIONS_MIRS_WITH_CLIENT',
  'CONDITIONS_MIRS_WITH_LENDER',
  'FORMAL_APPROVAL',
  'MORTGAGE_DOCS_ISSUED',
  'MORTGAGE_DOCS_RETURNED',
  'READY_TO_SETTLE',
  'SETTLEMENT_BOOKED',
  'SETTLEMENT',
  'SETTLED_REVIEW',
  'LOST_DECLINED',
];

type KanbanViewConfig = ViewConfig & {
  mainGroupByFieldMetadataUniversalIdentifier: string;
};

const viewConfig: KanbanViewConfig = {
  universalIdentifier: OPPORTUNITY_DEAL_BOARD_VIEW_ID,
  name: 'Deal board',
  objectUniversalIdentifier: OPPORTUNITY_OBJECT_ID,
  type: ViewType.KANBAN,
  icon: 'IconLayoutKanban',
  position: 1,
  mainGroupByFieldMetadataUniversalIdentifier:
    OPPORTUNITY_BOARD_FIELDS.brokerWorkflowStage,
  fields: [
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000302',
      fieldMetadataUniversalIdentifier: OPPORTUNITY_BOARD_FIELDS.name,
      position: 0,
      isVisible: true,
      size: 220,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000303',
      fieldMetadataUniversalIdentifier: OPPORTUNITY_BOARD_FIELDS.pointOfContact,
      position: 1,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000304',
      fieldMetadataUniversalIdentifier: OPPORTUNITY_BOARD_FIELDS.loanAmount,
      position: 2,
      isVisible: true,
      size: 140,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000305',
      fieldMetadataUniversalIdentifier: OPPORTUNITY_BOARD_FIELDS.stageDueDate,
      position: 3,
      isVisible: true,
      size: 140,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000306',
      fieldMetadataUniversalIdentifier: OPPORTUNITY_BOARD_FIELDS.factFindStatus,
      position: 4,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000307',
      fieldMetadataUniversalIdentifier:
        OPPORTUNITY_BOARD_FIELDS.serviceabilityStatus,
      position: 5,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000308',
      fieldMetadataUniversalIdentifier:
        OPPORTUNITY_BOARD_FIELDS.productResearchStatus,
      position: 6,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000309',
      fieldMetadataUniversalIdentifier:
        OPPORTUNITY_BOARD_FIELDS.creditProposalStatus,
      position: 7,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000310',
      fieldMetadataUniversalIdentifier: OPPORTUNITY_BOARD_FIELDS.kycCddStatus,
      position: 8,
      isVisible: true,
      size: 150,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000311',
      fieldMetadataUniversalIdentifier:
        OPPORTUNITY_BOARD_FIELDS.lodgementReadiness,
      position: 9,
      isVisible: true,
      size: 150,
    },
  ],
  groups: dealStages.map((fieldValue, position) => ({
    universalIdentifier: `6b6d0000-2100-4000-8000-0000000004${String(position).padStart(2, '0')}`,
    fieldValue,
    position,
    isVisible: true,
  })),
};

export default defineView(viewConfig as ViewConfig);
