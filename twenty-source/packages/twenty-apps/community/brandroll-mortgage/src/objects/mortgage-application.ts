import { FieldType, defineObject } from 'twenty-sdk/define';

export const MORTGAGE_APPLICATION_OBJECT_ID =
  '6b6d0000-1000-4000-8000-000000000001';
export const MORTGAGE_APPLICATION_NAME_FIELD_ID =
  '6b6d0000-1000-4000-8000-000000000002';
export const MORTGAGE_APPLICATION_STAGE_FIELD_ID =
  '6b6d0000-1000-4000-8000-000000000003';
export const MORTGAGE_APPLICATION_LODGEMENT_TARGET_FIELD_ID =
  '6b6d0000-1000-4000-8000-000000000004';
export const MORTGAGE_APPLICATION_LIXI_STANDARD_FIELD_ID =
  '6b6d0000-1000-4000-8000-000000000005';

enum MortgageApplicationStage {
  LEAD = 'LEAD',
  FACT_FIND = 'FACT_FIND',
  DOCUMENTS = 'DOCUMENTS',
  COMPLIANCE = 'COMPLIANCE',
  CREDIT_PROPOSAL = 'CREDIT_PROPOSAL',
  READY_FOR_LODGEMENT = 'READY_FOR_LODGEMENT',
  SUBMITTED = 'SUBMITTED',
  CONDITIONAL_APPROVAL = 'CONDITIONAL_APPROVAL',
  FORMAL_APPROVAL = 'FORMAL_APPROVAL',
  SETTLEMENT = 'SETTLEMENT',
  SETTLED = 'SETTLED',
  REVIEW = 'REVIEW',
  LOST = 'LOST',
}

enum LodgementTarget {
  NOT_CONFIRMED = 'NOT_CONFIRMED',
  APPLYONLINE = 'APPLYONLINE',
  AFG_FLEX = 'AFG_FLEX',
  AFG = 'AFG',
  BROKERENGINE = 'BROKERENGINE',
  MANUAL = 'MANUAL',
}

export default defineObject({
  universalIdentifier: MORTGAGE_APPLICATION_OBJECT_ID,
  nameSingular: 'mortgageApplication',
  namePlural: 'mortgageApplications',
  labelSingular: 'Mortgage application',
  labelPlural: 'Mortgage applications',
  description:
    'Residential mortgage application summary aligned to LIXI CAL concepts.',
  icon: 'IconHomeDollar',
  labelIdentifierFieldMetadataUniversalIdentifier:
    MORTGAGE_APPLICATION_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: MORTGAGE_APPLICATION_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'applicationName',
      label: 'Application name',
      icon: 'IconAbc',
    },
    {
      universalIdentifier: MORTGAGE_APPLICATION_STAGE_FIELD_ID,
      type: FieldType.SELECT,
      name: 'stage',
      label: 'Stage',
      icon: 'IconProgress',
      options: [
        { value: MortgageApplicationStage.LEAD, label: 'Lead', position: 0, color: 'gray' },
        { value: MortgageApplicationStage.FACT_FIND, label: 'Fact find', position: 1, color: 'blue' },
        { value: MortgageApplicationStage.DOCUMENTS, label: 'Documents', position: 2, color: 'blue' },
        { value: MortgageApplicationStage.COMPLIANCE, label: 'Compliance', position: 3, color: 'orange' },
        { value: MortgageApplicationStage.CREDIT_PROPOSAL, label: 'Credit proposal', position: 4, color: 'orange' },
        { value: MortgageApplicationStage.READY_FOR_LODGEMENT, label: 'Ready for lodgement', position: 5, color: 'yellow' },
        { value: MortgageApplicationStage.SUBMITTED, label: 'Submitted', position: 6, color: 'purple' },
        { value: MortgageApplicationStage.CONDITIONAL_APPROVAL, label: 'Conditional approval', position: 7, color: 'green' },
        { value: MortgageApplicationStage.FORMAL_APPROVAL, label: 'Formal approval', position: 8, color: 'green' },
        { value: MortgageApplicationStage.SETTLEMENT, label: 'Settlement', position: 9, color: 'green' },
        { value: MortgageApplicationStage.SETTLED, label: 'Settled', position: 10, color: 'green' },
        { value: MortgageApplicationStage.REVIEW, label: 'Review', position: 11, color: 'gray' },
        { value: MortgageApplicationStage.LOST, label: 'Lost', position: 12, color: 'red' },
      ],
    },
    {
      universalIdentifier: MORTGAGE_APPLICATION_LODGEMENT_TARGET_FIELD_ID,
      type: FieldType.SELECT,
      name: 'lodgementTarget',
      label: 'Lodgement target',
      icon: 'IconSend',
      options: [
        { value: LodgementTarget.NOT_CONFIRMED, label: 'Not confirmed', position: 0, color: 'gray' },
        { value: LodgementTarget.APPLYONLINE, label: 'ApplyOnline', position: 1, color: 'green' },
        { value: LodgementTarget.AFG_FLEX, label: 'AFG Flex', position: 2, color: 'blue' },
        { value: LodgementTarget.AFG, label: 'AFG', position: 3, color: 'blue' },
        { value: LodgementTarget.BROKERENGINE, label: 'BrokerEngine', position: 4, color: 'purple' },
        { value: LodgementTarget.MANUAL, label: 'Manual', position: 5, color: 'orange' },
      ],
    },
    {
      universalIdentifier: MORTGAGE_APPLICATION_LIXI_STANDARD_FIELD_ID,
      type: FieldType.TEXT,
      name: 'lixiReference',
      label: 'LIXI reference',
      description: 'Conceptual standard/version reference, for example CAL 2.6.91.',
      icon: 'IconSchema',
    },
    {
      universalIdentifier: '6b6d0000-1000-4000-8000-000000000006',
      type: FieldType.TEXT,
      name: 'externalApplicationId',
      label: 'External application ID',
      icon: 'IconExternalLink',
    },
    {
      universalIdentifier: '6b6d0000-1000-4000-8000-000000000007',
      type: FieldType.NUMBER,
      name: 'requestedLoanAmount',
      label: 'Requested loan amount',
      icon: 'IconCurrencyDollar',
    },
    {
      universalIdentifier: '6b6d0000-1000-4000-8000-000000000008',
      type: FieldType.NUMBER,
      name: 'estimatedLvr',
      label: 'Estimated LVR',
      icon: 'IconPercentage',
    },
    {
      universalIdentifier: '6b6d0000-1000-4000-8000-000000000009',
      type: FieldType.DATE,
      name: 'targetSettlementDate',
      label: 'Target settlement date',
      icon: 'IconCalendar',
    },
    {
      universalIdentifier: '6b6d0000-1000-4000-8000-000000000020',
      type: FieldType.SELECT,
      name: 'complianceStatus',
      label: 'Compliance status',
      description: 'Credit guide, privacy consent, BID disclosure, and acknowledgements.',
      icon: 'IconShieldCheck',
      options: [
        { value: 'NOT_STARTED', label: 'Not started', position: 0, color: 'gray' },
        { value: 'SENT', label: 'Sent', position: 1, color: 'blue' },
        { value: 'PARTIALLY_ACKNOWLEDGED', label: 'Partially acknowledged', position: 2, color: 'orange' },
        { value: 'ACKNOWLEDGED', label: 'Acknowledged', position: 3, color: 'green' },
        { value: 'EXPIRED_OR_DECLINED', label: 'Expired or declined', position: 4, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1000-4000-8000-000000000021',
      type: FieldType.SELECT,
      name: 'factFindStatus',
      label: 'Fact find status',
      icon: 'IconForms',
      options: [
        { value: 'NOT_STARTED', label: 'Not started', position: 0, color: 'gray' },
        { value: 'CLIENT_IN_PROGRESS', label: 'Client in progress', position: 1, color: 'blue' },
        { value: 'CLIENT_SUBMITTED', label: 'Client submitted', position: 2, color: 'purple' },
        { value: 'BROKER_REVIEW', label: 'Broker review', position: 3, color: 'orange' },
        { value: 'COMPLETE', label: 'Complete', position: 4, color: 'green' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1000-4000-8000-000000000022',
      type: FieldType.SELECT,
      name: 'serviceabilityStatus',
      label: 'Serviceability status',
      icon: 'IconCalculator',
      options: [
        { value: 'NOT_STARTED', label: 'Not started', position: 0, color: 'gray' },
        { value: 'DATA_REQUIRED', label: 'Data required', position: 1, color: 'orange' },
        { value: 'PASS', label: 'Pass', position: 2, color: 'green' },
        { value: 'REFER', label: 'Refer', position: 3, color: 'yellow' },
        { value: 'FAIL', label: 'Fail', position: 4, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1000-4000-8000-000000000023',
      type: FieldType.SELECT,
      name: 'productResearchStatus',
      label: 'Product research status',
      icon: 'IconFilterSearch',
      options: [
        { value: 'WAITING_FOR_SERVICEABILITY', label: 'Waiting for serviceability', position: 0, color: 'gray' },
        { value: 'FILTERS_DRAFTED', label: 'Filters drafted', position: 1, color: 'blue' },
        { value: 'RESEARCH_IN_PROGRESS', label: 'Research in progress', position: 2, color: 'orange' },
        { value: 'SHORTLIST_READY', label: 'Shortlist ready', position: 3, color: 'purple' },
        { value: 'RECOMMENDATION_SELECTED', label: 'Recommendation selected', position: 4, color: 'green' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1000-4000-8000-000000000024',
      type: FieldType.SELECT,
      name: 'creditProposalStatus',
      label: 'Credit proposal status',
      icon: 'IconClipboardCheck',
      options: [
        { value: 'NOT_STARTED', label: 'Not started', position: 0, color: 'gray' },
        { value: 'DRAFT', label: 'Draft', position: 1, color: 'blue' },
        { value: 'IN_REVIEW', label: 'In review', position: 2, color: 'orange' },
        { value: 'APPROVED', label: 'Approved', position: 3, color: 'green' },
        { value: 'SENT_TO_CLIENT', label: 'Sent to client', position: 4, color: 'purple' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1000-4000-8000-000000000025',
      type: FieldType.SELECT,
      name: 'lodgementReadiness',
      label: 'Lodgement readiness',
      icon: 'IconSend',
      options: [
        { value: 'NOT_READY', label: 'Not ready', position: 0, color: 'gray' },
        { value: 'MISSING_INFORMATION', label: 'Missing information', position: 1, color: 'orange' },
        { value: 'READY_FOR_APPLYONLINE_OR_AFG', label: 'Ready for ApplyOnline/AFG', position: 2, color: 'green' },
        { value: 'SUBMITTED', label: 'Submitted', position: 3, color: 'purple' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1000-4000-8000-000000000026',
      type: FieldType.TEXT,
      name: 'applyOnlineApplicationId',
      label: 'ApplyOnline application ID',
      icon: 'IconExternalLink',
    },
    {
      universalIdentifier: '6b6d0000-1000-4000-8000-000000000027',
      type: FieldType.TEXT,
      name: 'afgFlexApplicationId',
      label: 'AFG Flex application ID',
      icon: 'IconExternalLink',
    },
    {
      universalIdentifier: '6b6d0000-1000-4000-8000-000000000028',
      type: FieldType.LINKS,
      name: 'clientPortalLink',
      label: 'Client portal link',
      icon: 'IconLink',
    },
    {
      universalIdentifier: '6b6d0000-1000-4000-8000-000000000029',
      type: FieldType.TEXT,
      name: 'requirementsObjectivesSummary',
      label: 'Requirements/objectives summary',
      icon: 'IconTargetArrow',
    },
    {
      universalIdentifier: '6b6d0000-1000-4000-8000-000000000030',
      type: FieldType.TEXT,
      name: 'selectedLender',
      label: 'Selected lender',
      icon: 'IconBuildingBank',
    },
    {
      universalIdentifier: '6b6d0000-1000-4000-8000-000000000031',
      type: FieldType.TEXT,
      name: 'selectedProduct',
      label: 'Selected product',
      icon: 'IconBuildingBank',
    },
    {
      universalIdentifier: '6b6d0000-1000-4000-8000-000000000032',
      type: FieldType.TEXT,
      name: 'policyAndExceptionSummary',
      label: 'Policy and exception summary',
      icon: 'IconShieldCheck',
    },
    {
      universalIdentifier: '6b6d0000-1000-4000-8000-000000000033',
      type: FieldType.NUMBER,
      name: 'applicantCount',
      label: 'Applicant count',
      description:
        'Residential application applicant count, supporting one primary applicant plus up to three co-applicants.',
      icon: 'IconUsers',
    },
  ],
});
