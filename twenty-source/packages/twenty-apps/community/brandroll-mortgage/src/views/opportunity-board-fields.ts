import {
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
} from 'twenty-sdk/define';

import { OPPORTUNITY_BROKER_WORKFLOW_STAGE_FIELD_ID } from 'src/fields/opportunity-broker-workflow-stage.field';
import { OPPORTUNITY_CLIENT_PORTAL_STATUS_FIELD_ID } from 'src/fields/opportunity-client-portal-status.field';
import { OPPORTUNITY_COMPLIANCE_STATUS_FIELD_ID } from 'src/fields/opportunity-compliance-status.field';
import { OPPORTUNITY_CREDIT_PROPOSAL_STATUS_FIELD_ID } from 'src/fields/opportunity-credit-proposal-status.field';
import { OPPORTUNITY_DOCUMENT_STACK_STATUS_FIELD_ID } from 'src/fields/opportunity-document-stack-status.field';
import { OPPORTUNITY_FACT_FIND_STATUS_FIELD_ID } from 'src/fields/opportunity-fact-find-status.field';
import { OPPORTUNITY_KYC_CDD_STATUS_FIELD_ID } from 'src/fields/opportunity-kyc-cdd-status.field';
import { OPPORTUNITY_LODGEMENT_READINESS_FIELD_ID } from 'src/fields/opportunity-lodgement-readiness.field';
import { OPPORTUNITY_MORTGAGE_LOAN_AMOUNT_FIELD_ID } from 'src/fields/opportunity-mortgage-loan-amount.field';
import { OPPORTUNITY_NEXT_BROKER_ACTION_FIELD_ID } from 'src/fields/opportunity-next-broker-action.field';
import { OPPORTUNITY_PRODUCT_RESEARCH_STATUS_FIELD_ID } from 'src/fields/opportunity-product-research-status.field';
import { OPPORTUNITY_SERVICEABILITY_STATUS_FIELD_ID } from 'src/fields/opportunity-serviceability-status.field';
import { OPPORTUNITY_STAGE_DUE_DATE_FIELD_ID } from 'src/fields/opportunity-stage-due-date.field';

const opportunityFields =
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.fields;

export const OPPORTUNITY_BOARD_FIELDS = {
  name: opportunityFields.name.universalIdentifier,
  amount: opportunityFields.amount.universalIdentifier,
  closeDate: opportunityFields.closeDate.universalIdentifier,
  pointOfContact: opportunityFields.pointOfContact.universalIdentifier,
  company: opportunityFields.company.universalIdentifier,
  owner: opportunityFields.owner.universalIdentifier,
  brokerWorkflowStage: OPPORTUNITY_BROKER_WORKFLOW_STAGE_FIELD_ID,
  loanAmount: OPPORTUNITY_MORTGAGE_LOAN_AMOUNT_FIELD_ID,
  stageDueDate: OPPORTUNITY_STAGE_DUE_DATE_FIELD_ID,
  nextBrokerAction: OPPORTUNITY_NEXT_BROKER_ACTION_FIELD_ID,
  complianceStatus: OPPORTUNITY_COMPLIANCE_STATUS_FIELD_ID,
  factFindStatus: OPPORTUNITY_FACT_FIND_STATUS_FIELD_ID,
  documentStackStatus: OPPORTUNITY_DOCUMENT_STACK_STATUS_FIELD_ID,
  serviceabilityStatus: OPPORTUNITY_SERVICEABILITY_STATUS_FIELD_ID,
  productResearchStatus: OPPORTUNITY_PRODUCT_RESEARCH_STATUS_FIELD_ID,
  creditProposalStatus: OPPORTUNITY_CREDIT_PROPOSAL_STATUS_FIELD_ID,
  kycCddStatus: OPPORTUNITY_KYC_CDD_STATUS_FIELD_ID,
  lodgementReadiness: OPPORTUNITY_LODGEMENT_READINESS_FIELD_ID,
  clientPortalStatus: OPPORTUNITY_CLIENT_PORTAL_STATUS_FIELD_ID,
} as const;

export const OPPORTUNITY_OBJECT_ID =
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier;
