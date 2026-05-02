type BrokerAppSettingsAreaSeed = {
  settingName: string;
  settingArea:
    | 'GENERAL'
    | 'LENDERS'
    | 'PRODUCTS'
    | 'WORKFLOW'
    | 'TEMPLATES'
    | 'BOARDS'
    | 'FACT_FIND'
    | 'SMART_DOCS'
    | 'COMPLIANCE'
    | 'INTEGRATIONS'
    | 'SECURITY'
    | 'CLIENT_PORTAL'
    | 'AI';
  implementationStatus: 'OBSERVED' | 'MODELLED' | 'DRAFT' | 'BLOCKED' | 'FUTURE';
  position: number;
  brokerEngineReference: string;
  brokerAppImprovement: string;
  ownerRole: 'BROKER_OWNER' | 'ADMIN' | 'LOAN_PROCESSOR' | 'COMPLIANCE' | 'SYSTEM';
  notes?: string;
};

export const brokerAppSettingsAreaSeeds: BrokerAppSettingsAreaSeed[] = [
  {
    settingName: 'Broker profile and workspace defaults',
    settingArea: 'GENERAL',
    implementationStatus: 'DRAFT',
    position: 10,
    brokerEngineReference: 'Broker group settings and user profile',
    brokerAppImprovement:
      'Centralise brand, broker licence, aggregator, compliance wording, and default contact roles used by forms, email templates, reports, and portal sessions.',
    ownerRole: 'BROKER_OWNER',
  },
  {
    settingName: 'Lender details',
    settingArea: 'LENDERS',
    implementationStatus: 'MODELLED',
    position: 20,
    brokerEngineReference: 'Lenders > Lender Details',
    brokerAppImprovement:
      'Store lender panel status, ApplyOnline/AFG/BrokerEngine codes, contacts, lodgement channel, policy links, calculator links, document categories, and LIXI party aliases in one lender setup record.',
    ownerRole: 'ADMIN',
  },
  {
    settingName: 'Product catalogue',
    settingArea: 'PRODUCTS',
    implementationStatus: 'MODELLED',
    position: 30,
    brokerEngineReference:
      'Lenders > Products table with loan and credit-card tabs, 355 observed pages, product search, duplicate, bulk edit, filter, and add loan product controls',
    brokerAppImprovement:
      'Ingest AFG product matrix/API data as the source of truth, preserve raw import snapshots, and expose searchable filters for lender, loan type, rate type, repayment option, features, start/end dates, and policy gates.',
    ownerRole: 'SYSTEM',
    notes:
      'Do not scrape thousands of UI rows. Use the supplied product matrix/API export as the import source.',
  },
  {
    settingName: 'Packages and offers',
    settingArea: 'PRODUCTS',
    implementationStatus: 'DRAFT',
    position: 40,
    brokerEngineReference: 'Lenders > Packages and Offers',
    brokerAppImprovement:
      'Attach package, cashback, rebate, professional package, offset, and special-offer metadata to lender products with expiry and eligibility rules.',
    ownerRole: 'ADMIN',
  },
  {
    settingName: 'Lender calculators and policy references',
    settingArea: 'LENDERS',
    implementationStatus: 'MODELLED',
    position: 50,
    brokerEngineReference: 'BrokerEngine lender setup plus supplied ANZ/WBC serviceability calculators',
    brokerAppImprovement:
      'Register calculator files, versions, policy documents, assessment assumptions, and manual override notes per lender without committing proprietary workbooks or formulas.',
    ownerRole: 'COMPLIANCE',
  },
  {
    settingName: 'Document categories and checklist gates',
    settingArea: 'COMPLIANCE',
    implementationStatus: 'MODELLED',
    position: 60,
    brokerEngineReference: 'Checklists, FinanceVault, document request workflows',
    brokerAppImprovement:
      'Define lender-specific and scenario-specific document categories, required evidence, stage gates, expiry rules, and portal upload labels.',
    ownerRole: 'LOAN_PROCESSOR',
  },
  {
    settingName: 'Boards and stages',
    settingArea: 'BOARDS',
    implementationStatus: 'MODELLED',
    position: 70,
    brokerEngineReference:
      'Boards: Asset Finance, Construction, Deal, Lead, Maintenance, Partnerships',
    brokerAppImprovement:
      'Create configurable board templates with stage mapping, stage due days, amber/red thresholds, collapse-empty-stage defaults, bulk edit support, list/kanban defaults, and automation hooks.',
    ownerRole: 'ADMIN',
  },
  {
    settingName: 'Email templates',
    settingArea: 'TEMPLATES',
    implementationStatus: 'MODELLED',
    position: 80,
    brokerEngineReference:
      'Email Templates list with name, workflow, subject, shared-with, creator, created-at, and last-updated columns',
    brokerAppImprovement:
      'Store names, subjects, merge variables, related stages, and approved HTML references. Keep imported BrokerEngine body text private until approved for workspace storage.',
    ownerRole: 'ADMIN',
  },
  {
    settingName: 'Task templates',
    settingArea: 'TEMPLATES',
    implementationStatus: 'MODELLED',
    position: 90,
    brokerEngineReference: 'Task Templates list with name, description, assignee, priority, created-at, last-updated',
    brokerAppImprovement:
      'Attach task templates to stages, checklist gates, key dates, and 1-click workflows, with assignee role, priority, due-offset, and broker approval requirements.',
    ownerRole: 'LOAN_PROCESSOR',
  },
  {
    settingName: 'SMS templates',
    settingArea: 'TEMPLATES',
    implementationStatus: 'DRAFT',
    position: 100,
    brokerEngineReference: 'SMS Templates page showed no saved templates',
    brokerAppImprovement:
      'Create BrokerApp-native SMS placeholders for consent, document reminders, appointment reminders, and settlement updates, with opt-out and delivery-status audit fields.',
    ownerRole: 'ADMIN',
  },
  {
    settingName: 'Workflow templates',
    settingArea: 'WORKFLOW',
    implementationStatus: 'DRAFT',
    position: 110,
    brokerEngineReference: 'Workflow Templates page did not expose reusable records during review',
    brokerAppImprovement:
      'Represent workflows as stage-triggered jobs, checklist gates, task batches, email/SMS/report actions, and broker approval checkpoints instead of opaque templates.',
    ownerRole: 'SYSTEM',
  },
  {
    settingName: 'Fact find templates and form builder',
    settingArea: 'FACT_FIND',
    implementationStatus: 'MODELLED',
    position: 120,
    brokerEngineReference: 'Fact Find Classic and Fact Find New template settings',
    brokerAppImprovement:
      'Use OpnForm-first form templates and BrokerApp normalized answer tables. Support conditional logic, applicant expansion up to four residential applicants, autosave, portal sessions, and LIXI-first field naming.',
    ownerRole: 'ADMIN',
  },
  {
    settingName: 'Client portal sessions',
    settingArea: 'CLIENT_PORTAL',
    implementationStatus: 'DRAFT',
    position: 130,
    brokerEngineReference: 'Client-facing fact find and FinanceVault style document requests',
    brokerAppImprovement:
      'Provide chat-like guided intake, document uploads, ID verification, open banking handoff, consent status, broker messages, and application timeline inside one borrower dashboard.',
    ownerRole: 'SYSTEM',
  },
  {
    settingName: 'Smart docs and report templates',
    settingArea: 'SMART_DOCS',
    implementationStatus: 'MODELLED',
    position: 140,
    brokerEngineReference: 'Smart Docs and right-rail Reports',
    brokerAppImprovement:
      'Generate credit guide, privacy consent, BID records, credit proposal, formal approval advice, settlement advice, and deal history reports from normalized deal data and approved merge templates.',
    ownerRole: 'COMPLIANCE',
  },
  {
    settingName: 'Integration credentials and sync ownership',
    settingArea: 'INTEGRATIONS',
    implementationStatus: 'DRAFT',
    position: 150,
    brokerEngineReference: 'Integrations settings plus ApplyOnline, AFG Flex, BrokerEngine, IDV, open banking, and product research plans',
    brokerAppImprovement:
      'Keep credentials out of GitHub. Store API base URLs, auth method, webhook secrets, sync ownership, rate-limit assumptions, and retry policies in environment/private workspace settings.',
    ownerRole: 'SYSTEM',
  },
  {
    settingName: 'Security, privacy, and audit',
    settingArea: 'SECURITY',
    implementationStatus: 'DRAFT',
    position: 160,
    brokerEngineReference: 'Security and user management settings',
    brokerAppImprovement:
      'Add role-based access, field visibility, portal token expiry, document retention, consent audit, template version history, and integration-event logs before production borrower data is stored.',
    ownerRole: 'COMPLIANCE',
  },
  {
    settingName: 'AI broker research assistant',
    settingArea: 'AI',
    implementationStatus: 'FUTURE',
    position: 170,
    brokerEngineReference: 'BrokerWizard and manual policy/product research workflows',
    brokerAppImprovement:
      'Use structured fact-find data, notes, objectives, policy references, lender calculators, and product matrix imports to shortlist products and draft credit proposal rationale for broker approval.',
    ownerRole: 'BROKER_OWNER',
  },
];

export const brokerAppSettingsRecommendations = [
  'Treat LIXI as the canonical field-language and store BrokerEngine, AFG, ApplyOnline, and AFG Flex names as aliases.',
  'Keep contacts and companies reusable in the sidebar, but make opportunities the deal cockpit with applicant roles, fact find, product research, serviceability, credit proposal, lodgement, and settlement tools inside the deal.',
  'Do not hardcode private BrokerEngine email/task/checklist bodies into source. Import approved bodies into the private workspace or encrypted storage later.',
  'Use AFG product matrix/API imports for product data instead of scraping BrokerEngine product rows.',
  'Make every stage movement auditable and optionally gated by document completeness, consent status, fact-find review, serviceability, policy fit, and broker approval.',
  'Use OpnForm for borrower-facing forms now, but persist normalized answer rows in BrokerApp so the client portal and broker cockpit can share one data model.',
] as const;
