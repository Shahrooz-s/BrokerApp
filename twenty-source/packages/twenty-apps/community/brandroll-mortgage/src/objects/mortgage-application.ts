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
  ],
});
