import { ViewType, defineView, type ViewConfig } from 'twenty-sdk/define';

import {
  OPPORTUNITY_BOARD_FIELDS,
  OPPORTUNITY_OBJECT_ID,
} from 'src/views/opportunity-board-fields';

export const OPPORTUNITY_LEAD_BOARD_VIEW_ID =
  '6b6d0000-2100-4000-8000-000000000101';

const leadStages = [
  'NEW_LEAD',
  'ATTEMPTED_CONTACT_1',
  'ATTEMPTED_CONTACT_2',
  'ATTEMPTED_CONTACT_3',
  'INITIAL_CALL_GET_DOCS',
  'LEAD_DOCS_REQUESTED',
  'RESEARCH_SERVICING',
  'PREPARE_LOAN_PROPOSAL',
  'LOAN_PROPOSAL_PRESENTED',
  'CLIENT_ACCEPTED_HANDOVER',
  'ON_HOLD',
  'LOST_OPPORTUNITY',
];

type KanbanViewConfig = ViewConfig & {
  mainGroupByFieldMetadataUniversalIdentifier: string;
};

const viewConfig: KanbanViewConfig = {
  universalIdentifier: OPPORTUNITY_LEAD_BOARD_VIEW_ID,
  name: 'Lead board',
  objectUniversalIdentifier: OPPORTUNITY_OBJECT_ID,
  type: ViewType.KANBAN,
  icon: 'IconLayoutKanban',
  position: 0,
  mainGroupByFieldMetadataUniversalIdentifier:
    OPPORTUNITY_BOARD_FIELDS.brokerWorkflowStage,
  fields: [
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000102',
      fieldMetadataUniversalIdentifier: OPPORTUNITY_BOARD_FIELDS.name,
      position: 0,
      isVisible: true,
      size: 220,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000103',
      fieldMetadataUniversalIdentifier: OPPORTUNITY_BOARD_FIELDS.pointOfContact,
      position: 1,
      isVisible: true,
      size: 180,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000104',
      fieldMetadataUniversalIdentifier: OPPORTUNITY_BOARD_FIELDS.loanAmount,
      position: 2,
      isVisible: true,
      size: 140,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000105',
      fieldMetadataUniversalIdentifier: OPPORTUNITY_BOARD_FIELDS.stageDueDate,
      position: 3,
      isVisible: true,
      size: 140,
    },
    {
      universalIdentifier: '6b6d0000-2100-4000-8000-000000000106',
      fieldMetadataUniversalIdentifier: OPPORTUNITY_BOARD_FIELDS.nextBrokerAction,
      position: 4,
      isVisible: true,
      size: 260,
    },
  ],
  groups: leadStages.map((fieldValue, position) => ({
    universalIdentifier: `6b6d0000-2100-4000-8000-0000000002${String(position).padStart(2, '0')}`,
    fieldValue,
    position,
    isVisible: true,
  })),
};

export default defineView(viewConfig as ViewConfig);
