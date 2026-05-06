import { FieldType, defineObject } from 'twenty-sdk/define';

export const LOAN_DOX_RULE_OBJECT_ID =
  '6b6d0000-4620-4000-8000-000000000001';
export const LOAN_DOX_RULE_NAME_FIELD_ID =
  '6b6d0000-4620-4000-8000-000000000002';
export const LOAN_DOX_RULE_TYPE_FIELD_ID =
  '6b6d0000-4620-4000-8000-000000000003';
export const LOAN_DOX_RULE_STATUS_FIELD_ID =
  '6b6d0000-4620-4000-8000-000000000004';

export default defineObject({
  universalIdentifier: LOAN_DOX_RULE_OBJECT_ID,
  nameSingular: 'loanDoxRule',
  namePlural: 'loanDoxRules',
  labelSingular: 'LoanDox rule',
  labelPlural: 'LoanDox rules',
  description:
    'Broker-controlled LoanDox and ClientDash rules for document requests, applicant targeting, provider gates, AI instructions, and portal locking.',
  icon: 'IconFileSettings',
  labelIdentifierFieldMetadataUniversalIdentifier: LOAN_DOX_RULE_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: LOAN_DOX_RULE_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'ruleName',
      label: 'Rule name',
      icon: 'IconFileSettings',
    },
    {
      universalIdentifier: LOAN_DOX_RULE_TYPE_FIELD_ID,
      type: FieldType.SELECT,
      name: 'ruleType',
      label: 'Rule type',
      icon: 'IconCategory',
      options: [
        { value: 'DOCUMENT_STACK', label: 'Document stack', position: 0, color: 'blue' },
        { value: 'APPLICANT_TARGETING', label: 'Applicant targeting', position: 1, color: 'green' },
        { value: 'BANK_STATEMENT', label: 'Bank statement', position: 2, color: 'purple' },
        { value: 'KYC_CDD', label: 'KYC/CDD', position: 3, color: 'red' },
        { value: 'CLIENTDASH_LOCK', label: 'ClientDash lock', position: 4, color: 'orange' },
        { value: 'AI_REVIEW', label: 'AI review', position: 5, color: 'yellow' },
      ],
    },
    {
      universalIdentifier: LOAN_DOX_RULE_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'ruleStatus',
      label: 'Rule status',
      icon: 'IconProgress',
      options: [
        { value: 'DRAFT', label: 'Draft', position: 0, color: 'gray' },
        { value: 'ACTIVE', label: 'Active', position: 1, color: 'green' },
        { value: 'PROVIDER_GATED', label: 'Provider gated', position: 2, color: 'orange' },
        { value: 'DISABLED', label: 'Disabled', position: 3, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4620-4000-8000-000000000005',
      type: FieldType.TEXT,
      name: 'applicantScope',
      label: 'Applicant scope',
      icon: 'IconUsers',
      description:
        'Primary applicant, co-applicant, each applicant, all applicants, household, company, trust, guarantor, or related party.',
    },
    {
      universalIdentifier: '6b6d0000-4620-4000-8000-000000000006',
      type: FieldType.TEXT,
      name: 'triggerCondition',
      label: 'Trigger condition',
      icon: 'IconRoute',
      description:
        'Fact-find, lender policy, income type, entity type, credit guide, KYC, bank statement, or settlement condition that triggers the rule.',
    },
    {
      universalIdentifier: '6b6d0000-4620-4000-8000-000000000007',
      type: FieldType.TEXT,
      name: 'requiredDocuments',
      label: 'Required documents',
      icon: 'IconFiles',
      description:
        'Document list or stack to create in LoanDox when the trigger condition applies.',
    },
    {
      universalIdentifier: '6b6d0000-4620-4000-8000-000000000008',
      type: FieldType.TEXT,
      name: 'uploadMethods',
      label: 'Upload methods',
      icon: 'IconUpload',
      description:
        'ClientDash upload, broker upload, CashDeck, Basiq open banking, provider import, or manual exception.',
    },
    {
      universalIdentifier: '6b6d0000-4620-4000-8000-000000000009',
      type: FieldType.BOOLEAN,
      name: 'requiresMasterAdminApproval',
      label: 'Requires Master Admin approval',
      icon: 'IconShieldLock',
      description:
        'Provider actions and AI review remain off until approved and credentialed by Master Admin.',
    },
    {
      universalIdentifier: '6b6d0000-4620-4000-8000-000000000010',
      type: FieldType.TEXT,
      name: 'aiInstructions',
      label: 'AI instructions',
      icon: 'IconBrain',
      description:
        'Optional future instruction text for document review, discrepancy triage, and RAG policy checks. No automation runs by default.',
    },
    {
      universalIdentifier: '6b6d0000-4620-4000-8000-000000000011',
      type: FieldType.TEXT,
      name: 'doNotDoRules',
      label: 'Do-not-do rules',
      icon: 'IconAlertTriangle',
      description:
        'Hard safety limits for AI tools, provider actions, client visibility, lender submission, or AML/CTF handling.',
    },
  ],
});
