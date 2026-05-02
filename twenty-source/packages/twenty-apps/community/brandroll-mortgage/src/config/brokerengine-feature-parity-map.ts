export const brokerEngineFeatureParitySeeds = [
  {
    featureName: 'Board navigation and multiple pipelines',
    featureArea: 'BOARDS',
    parityStatus: 'SEEDED',
    brokerAppImplementation:
      'Broker Board Templates and Broker Stage Templates seed Lead, Deal, Maintenance, Partnerships, Construction, Asset Finance, Commercial Lending, and Business Lending boards.',
    privateImportRequired: false,
    requiresProviderApi: false,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'Observed BrokerEngine board navigation and requested pipeline list.',
    nextPilotAction:
      'Run post-install seed in the live workspace and confirm each board template is present.',
    notes:
      'Native Twenty views and workflow automations still need workspace activation.',
  },
  {
    featureName: 'Lead board stage sequence',
    featureArea: 'BOARDS',
    parityStatus: 'SEEDED',
    brokerAppImplementation:
      'Lead stages are seeded from New Lead through attempted contact, initial call, docs, research/servicing, proposal, handover, hold, and lost.',
    privateImportRequired: false,
    requiresProviderApi: false,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'Sanitized board-stage capture from BrokerEngine lead board.',
    nextPilotAction:
      'Map Opportunity stage values and stage due tasks to these templates inside the pilot workspace.',
    notes:
      'Stage due days, warning thresholds, and optional workflow gates are stored on Broker Stage Template records.',
  },
  {
    featureName: 'Deal board stage sequence',
    featureArea: 'BOARDS',
    parityStatus: 'SEEDED',
    brokerAppImplementation:
      'Deal stages are seeded for supporting documents, app docs, lodgement, AIP, conditions/MIRs, formal approval, mortgage docs, ready to settle, settlement booked, settlement, and lost/declined.',
    privateImportRequired: false,
    requiresProviderApi: false,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'Sanitized board-stage capture from BrokerEngine deal board.',
    nextPilotAction:
      'Attach checklist gates and stage-entry tasks after the app is installed in the workspace.',
    notes:
      'This creates the operational board spine for residential mortgage origination.',
  },
  {
    featureName: 'List and Kanban board modes',
    featureArea: 'BOARDS',
    parityStatus: 'MODELLED',
    brokerAppImplementation:
      'Board templates define list and Kanban requirements. Native Twenty views should provide list views; custom DealDash/front component work is needed for compact BrokerEngine-style Kanban columns.',
    privateImportRequired: false,
    requiresProviderApi: false,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'Observed BrokerEngine board list and Kanban views.',
    nextPilotAction:
      'Configure native list views first, then build or enable a compact Kanban UI if the deployed Twenty version supports the required front components.',
    notes:
      'The current app stores the view requirements as configuration, not a pixel-level clone.',
  },
  {
    featureName: 'Collapsed empty Kanban stages',
    featureArea: 'BOARDS',
    parityStatus: 'CUSTOM_UI_REQUIRED',
    brokerAppImplementation:
      'Requirement is captured in board/stage documentation and parity map. A custom board component or Twenty core UI change is required to auto-collapse empty columns while expanding populated columns.',
    privateImportRequired: false,
    requiresProviderApi: false,
    requiresWorkspaceLogin: false,
    productionReady: false,
    sourceReference: 'User-supplied screenshots and instructions for collapsed/expanded stages.',
    nextPilotAction:
      'Prototype compact board component after confirming front-component support in the deployed workspace.',
    notes:
      'This is a UI behavior, not a data-model feature.',
  },
  {
    featureName: 'Bulk edit guarded board fields',
    featureArea: 'BOARDS',
    parityStatus: 'MODELLED',
    brokerAppImplementation:
      'Board/bulk-edit field inventory is documented and represented through Opportunity fields, board stage templates, broker roles, and checklist gates.',
    privateImportRequired: false,
    requiresProviderApi: false,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'User-supplied BrokerEngine bulk edit screenshots.',
    nextPilotAction:
      'Confirm native Twenty bulk edit supports required fields; add workflow-safe guardrails for stage, broker, assigned team, processor, archive, and workflow toggles.',
    notes:
      'Bulk edits that trigger workflow must be explicit and auditable.',
  },
  {
    featureName: 'Column settings and default filters',
    featureArea: 'BOARDS',
    parityStatus: 'MODELLED',
    brokerAppImplementation:
      'Required board columns and filter fields are documented and mapped to Opportunity, applicant, lender, valuation, related-party, and custom text fields.',
    privateImportRequired: false,
    requiresProviderApi: false,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'User-provided BrokerEngine column-setting field list.',
    nextPilotAction:
      'Create workspace list views with default visible columns and saved filters after post-install seeding.',
    notes:
      'Applicant repeat fields stay normalized through Applicant Profiles rather than duplicated as hard-coded Opportunity columns.',
  },
  {
    featureName: 'DealDash layout',
    featureArea: 'DEALDASH',
    parityStatus: 'CUSTOM_UI_REQUIRED',
    brokerAppImplementation:
      'Deal Workspace Tools seed the Overview, Fact Find, Strategy, Lodgement, and right rail structure. A front component is still needed for a BrokerEngine-like DealDash visual layout.',
    privateImportRequired: false,
    requiresProviderApi: false,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'Observed self-test deal dashboard and user instructions.',
    nextPilotAction:
      'Use seeded tool records to drive the first custom DealDash or workspace dashboard prototype.',
    notes:
      'Current Twenty records are ready; pixel-level DealDash UI remains future implementation work.',
  },
  {
    featureName: 'Deal sidebar sections',
    featureArea: 'DEALDASH',
    parityStatus: 'SEEDED',
    brokerAppImplementation:
      'Deal Workspace Tools seed Overview, Fact Find, Strategy, Lodgement, Notes, Checklists, Tasks, Emails, Texts, Key Dates, Reports, 1-Click Workflows, Client Portal, and KYC/CDD tools.',
    privateImportRequired: false,
    requiresProviderApi: false,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'Sanitized BrokerEngine sidebar structure captured during review.',
    nextPilotAction:
      'Run post-install seed and review the Deal workspace tools table under Broker Settings.',
    notes:
      'This is the internal inventory for placing tools inside an Opportunity dashboard.',
  },
  {
    featureName: 'Related parties and applicant roles',
    featureArea: 'DEALDASH',
    parityStatus: 'MODELLED',
    brokerAppImplementation:
      'Contacts and Companies remain reusable sidebar records, with Applicant Profiles linking people into Opportunities as primary applicant, co-applicants, guarantors, solicitor, builder, referrer, accountant, financial planner, and other parties.',
    privateImportRequired: false,
    requiresProviderApi: false,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'BrokerEngine deal/contact pattern and user preference to call people Contacts.',
    nextPilotAction:
      'Configure related-record views on Opportunity and test adding a spouse/co-applicant to a deal.',
    notes:
      'The model supports more than two applicants without creating one object per applicant slot.',
  },
  {
    featureName: 'Residential fact find template shell',
    featureArea: 'FACT_FIND',
    parityStatus: 'SEEDED',
    brokerAppImplementation:
      'Broker Form Templates, Fact Find Sessions, Fact Find Sections, and Fact Find Field Answers support a multi-section residential fact find with autosave and later normalization into application records.',
    privateImportRequired: true,
    requiresProviderApi: false,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'BrokerEngine fact-find template review and LIXI-first field direction.',
    nextPilotAction:
      'Privately import approved field labels/options or build the BrokerApp-native form from the sanitized fact-find spec.',
    notes:
      'Exact copied labels/options from BrokerEngine should stay private unless legal/commercial approval is confirmed.',
  },
  {
    featureName: 'Fact find up to four applicants',
    featureArea: 'FACT_FIND',
    parityStatus: 'MODELLED',
    brokerAppImplementation:
      'Fact Find Session and Mortgage Application records hold applicant count; Applicant Profiles hold applicant index and role labels for primary plus up to three co-applicants.',
    privateImportRequired: false,
    requiresProviderApi: false,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'User instruction for conditional add-more-applicant logic.',
    nextPilotAction:
      'Add portal/form conditional logic to show applicant sections based on applicant count.',
    notes:
      'The backend model can support more applicants later if lender policy requires it.',
  },
  {
    featureName: 'Chat-like fact find and client portal autosave',
    featureArea: 'FACT_FIND',
    parityStatus: 'CUSTOM_UI_REQUIRED',
    brokerAppImplementation:
      'Client Portal Sessions and Fact Find Field Answers provide the backend. A borrower-facing chat/form UI must be built or embedded through OpnForm for pilot intake.',
    privateImportRequired: false,
    requiresProviderApi: false,
    requiresWorkspaceLogin: false,
    productionReady: false,
    sourceReference: 'User requirement for chatbot-like fact finding and simple client portal.',
    nextPilotAction:
      'Build the BrokerApp-native portal form flow or connect OpnForm embed with answer autosave.',
    notes:
      'Client UI must not expose broker notes, AML suspicion, or internal risk scoring.',
  },
  {
    featureName: 'Desired loan features to product matching',
    featureArea: 'FACT_FIND',
    parityStatus: 'MODELLED',
    brokerAppImplementation:
      'Loan Requirement fields capture desired loan features and Product Search Runs copy those values into hard filters, scoring inputs, and credit proposal rationale.',
    privateImportRequired: false,
    requiresProviderApi: true,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'User instruction to reuse desired loan features in product selection.',
    nextPilotAction:
      'Import the AFG product matrix and test feature matching against a sample Opportunity.',
    notes:
      'Product matching must preserve broker override reasons and policy notes.',
  },
  {
    featureName: 'Other income fact-find lock and client/broker sync',
    featureArea: 'FACT_FIND',
    parityStatus: 'MODELLED',
    brokerAppImplementation:
      'Fact Find Sessions track lock/review state and mapping status, while Fact Find Field Answers store question, answer, validation, and review data.',
    privateImportRequired: false,
    requiresProviderApi: false,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'Observed Other Income page behavior.',
    nextPilotAction:
      'Add a first private form template section for Other Income and confirm broker/client view synchronization.',
    notes:
      'Exact UI wording should be imported privately if copied from BrokerEngine.',
  },
  {
    featureName: 'Interview guide',
    featureArea: 'STRATEGY',
    parityStatus: 'MODELLED',
    brokerAppImplementation:
      'Interview Guide is represented as a Deal Workspace Tool backed by Loan Requirements, Product Search Runs, serviceability summaries, policy notes, and Credit Proposal records.',
    privateImportRequired: true,
    requiresProviderApi: false,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'BrokerEngine Strategy sidebar review.',
    nextPilotAction:
      'Privately build the interview guide question bank and map answers to product/serviceability reasoning.',
    notes:
      'Question content can be derived from Brandroll process and LIXI/AFG mapping without publishing BrokerEngine text.',
  },
  {
    featureName: 'Security and property strategy',
    featureArea: 'STRATEGY',
    parityStatus: 'MODELLED',
    brokerAppImplementation:
      'Property Security and Valuation Order objects store security address, ownership, estimated value, valuation status, lender, reference, and policy notes.',
    privateImportRequired: false,
    requiresProviderApi: true,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'BrokerEngine Strategy > Security and Valuation fields.',
    nextPilotAction:
      'Connect valuation provider/lender status feeds when available.',
    notes:
      'Use LIXI concept names first, with BrokerEngine/AFG aliases as integration fields.',
  },
  {
    featureName: 'Funding position',
    featureArea: 'STRATEGY',
    parityStatus: 'MODELLED',
    brokerAppImplementation:
      'Serviceability Assessment, Loan Requirement, Property Security, LMI Assessment, and Credit Proposal records hold funding position inputs, outputs, and broker rationale.',
    privateImportRequired: false,
    requiresProviderApi: true,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'BrokerEngine Strategy > Funding Position.',
    nextPilotAction:
      'Add the first funding-position report template privately and connect serviceability result snapshots.',
    notes:
      'Calculator formulas and lender workbook internals must not be committed.',
  },
  {
    featureName: 'Product search and comparison tool',
    featureArea: 'PRODUCT_RESEARCH',
    parityStatus: 'MODELLED',
    brokerAppImplementation:
      'Product Import Runs, Lender Products, Product Search Runs, and Product Shortlist Options support AFG matrix imports, per-sheet filters, policy fit, feature fit, comparison notes, and recommendation reasons.',
    privateImportRequired: false,
    requiresProviderApi: true,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'User-supplied AFG product matrix and BrokerEngine product-tool review.',
    nextPilotAction:
      'Implement the Excel import runner and filter UI for the AFG product matrix sheets.',
    notes:
      'Do not scrape BrokerEngine product rows as the product source of truth.',
  },
  {
    featureName: 'Lender product catalogue',
    featureArea: 'PRODUCT_RESEARCH',
    parityStatus: 'MODELLED',
    brokerAppImplementation:
      'Lender Product records store lender, product name, product type, rates, loan type, payment option, source file/date, and product ID references.',
    privateImportRequired: false,
    requiresProviderApi: true,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'BrokerEngine product columns and AFG Product Information Matrix.',
    nextPilotAction:
      'Load products from the provided AFG spreadsheet into private workspace records, not GitHub fixtures.',
    notes:
      'Large product datasets belong in database/import records, not source control.',
  },
  {
    featureName: 'Serviceability calculator abstraction',
    featureArea: 'SERVICEABILITY',
    parityStatus: 'MODELLED',
    brokerAppImplementation:
      'Broker Lenders, Lender Calculators, Lender Policy References, and Serviceability Assessments store calculator metadata, assumptions, inputs, outputs, policy gates, and snapshots.',
    privateImportRequired: true,
    requiresProviderApi: true,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'Supplied ANZ, WBC, and broker calculator workbooks reviewed for architecture only.',
    nextPilotAction:
      'Build lender-specific adapter contracts and private calculator metadata without committing workbook formulas or macros.',
    notes:
      'AI can assist extraction and consistency checks, but final calculations need verified lender rules and testing.',
  },
  {
    featureName: 'Policy brain and lender rule sets',
    featureArea: 'SERVICEABILITY',
    parityStatus: 'MODELLED',
    brokerAppImplementation:
      'Lender Policy References and Serviceability Assessment policy gate fields provide the backend for lender policy rules, exceptions, and broker override reasons.',
    privateImportRequired: true,
    requiresProviderApi: true,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'User requirement for lender policy and serviceability backend.',
    nextPilotAction:
      'Create lender policy ingestion workflow with source, effective date, confidence, owner, and human approval.',
    notes:
      'Do not allow AI-only policy decisions for credit proposal or compliance outcomes.',
  },
  {
    featureName: 'Credit proposal generation',
    featureArea: 'LODGEMENT',
    parityStatus: 'MODELLED',
    brokerAppImplementation:
      'Credit Proposal records store selected lender/product, comparison set, BID rationale, reasons for recommendation, declined alternatives, policy fit, serviceability fit, and approval state.',
    privateImportRequired: true,
    requiresProviderApi: false,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'User workflow from product/serviceability to credit proposal.',
    nextPilotAction:
      'Privately import the approved credit proposal layout and merge-variable map.',
    notes:
      'The proposal must explain why the lender/product was chosen and what was compared.',
  },
  {
    featureName: 'ApplyOnline and AFG Flex lodgement preparation',
    featureArea: 'LODGEMENT',
    parityStatus: 'PROVIDER_REQUIRED',
    brokerAppImplementation:
      'Mortgage Applications and Integration Events hold lodgement payload status and back-channel status assumptions for future ApplyOnline or AFG Flex adapters.',
    privateImportRequired: false,
    requiresProviderApi: true,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'User-preferred future path: ApplyOnline first, AFG Flex alternate.',
    nextPilotAction:
      'Obtain ApplyOnline/AFG Flex API docs, sandbox credentials, auth method, webhook support, and payload certification requirements.',
    notes:
      'No direct lender lodgement should be enabled until licensing, credentials, and testing are confirmed.',
  },
  {
    featureName: 'Submission and status backchannel',
    featureArea: 'LODGEMENT',
    parityStatus: 'PROVIDER_REQUIRED',
    brokerAppImplementation:
      'Integration Events, Application Conditions, Valuation Orders, LMI Assessments, and Opportunity date/status fields model lodgement and back-channel status updates.',
    privateImportRequired: false,
    requiresProviderApi: true,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'LIXI status/event concepts and BrokerEngine-style workflow.',
    nextPilotAction:
      'Confirm available status fields and event/webhook patterns from ApplyOnline, AFG Flex, AFG, or BrokerEngine APIs.',
    notes:
      'BrokerApp should consume authorized backchannels rather than assuming lender-direct messages.',
  },
  {
    featureName: 'Right rail notes/tasks/emails/texts/key dates',
    featureArea: 'RIGHT_RAIL',
    parityStatus: 'SEEDED',
    brokerAppImplementation:
      'Deal Workspace Tools seed each right rail drawer, using native Twenty notes/tasks/timeline plus Broker Templates, Opportunity key date fields, and provider events.',
    privateImportRequired: false,
    requiresProviderApi: true,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'Observed BrokerEngine right rail tools.',
    nextPilotAction:
      'Configure Opportunity page layout and connected account/email provider settings in the workspace.',
    notes:
      'SMS/text provider is optional for v1 because passkeys and email magic links are preferred.',
  },
  {
    featureName: 'Reports drawer',
    featureArea: 'RIGHT_RAIL',
    parityStatus: 'PRIVATE_IMPORT_REQUIRED',
    brokerAppImplementation:
      'Broker Templates seed report names for submission guide, AIP-to-full cover sheet, funding position, lodgement advice, approval advice, settlement advice, authority forms, and deal history.',
    privateImportRequired: true,
    requiresProviderApi: false,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'BrokerEngine report list captured from deal right rail.',
    nextPilotAction:
      'Privately import approved report bodies/layouts and merge variables into workspace records.',
    notes:
      'Report bodies may contain proprietary workflow text and should not be committed.',
  },
  {
    featureName: '1-Click workflow scenarios',
    featureArea: 'RIGHT_RAIL',
    parityStatus: 'SEEDED',
    brokerAppImplementation:
      'Broker Templates seed workflow scenario names for rebate, guarantor, fast refi, construction, FIRB, FHOG, off-the-plan, debt recycling, trust purchase, SMSF, LMI waiver, low doc, bridging, commercial, refinance, and related scenarios.',
    privateImportRequired: true,
    requiresProviderApi: false,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'BrokerEngine 1-Click workflow scenario inventory.',
    nextPilotAction:
      'Privately configure each scenario with stage actions, checklist items, email/task templates, and broker approval gates.',
    notes:
      'Scenario names are seeded; operational content and bodies remain private imports.',
  },
  {
    featureName: 'Email template metadata',
    featureArea: 'TEMPLATES',
    parityStatus: 'PRIVATE_IMPORT_REQUIRED',
    brokerAppImplementation:
      'Broker Templates store name, type, category, subject, from role, recipient type, sharing scope, attachments, merge variables, related board/stage, and import status.',
    privateImportRequired: true,
    requiresProviderApi: false,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'BrokerEngine email template setting structure.',
    nextPilotAction:
      'Use the private template import format to import copied bodies into the live workspace only after approval.',
    notes:
      'Template bodies should stay out of GitHub unless explicitly approved and the repo is private.',
  },
  {
    featureName: 'Task template metadata',
    featureArea: 'TEMPLATES',
    parityStatus: 'PRIVATE_IMPORT_REQUIRED',
    brokerAppImplementation:
      'Broker Templates include task priority and due offset fields; stage templates can trigger tasks at stage entry or due dates.',
    privateImportRequired: true,
    requiresProviderApi: false,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'BrokerEngine task template setting structure.',
    nextPilotAction:
      'Privately capture full task wording, due rules, and assignee rules into workspace records.',
    notes:
      'Task bodies often reveal internal process and should be treated as private operating content.',
  },
  {
    featureName: 'SMS template placeholders',
    featureArea: 'TEMPLATES',
    parityStatus: 'MODELLED',
    brokerAppImplementation:
      'Broker Templates support SMS records, but v1 has no Twilio dependency and SMS template bodies were not present during review.',
    privateImportRequired: false,
    requiresProviderApi: true,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'BrokerEngine SMS template settings appeared empty during review.',
    nextPilotAction:
      'Keep SMS optional; use email magic links and passkeys for v1, then add Microsoft or other SMS provider if required.',
    notes:
      'Avoid SMS OTP as sole proof of identity.',
  },
  {
    featureName: 'Merge variable compatibility',
    featureArea: 'TEMPLATES',
    parityStatus: 'MODELLED',
    brokerAppImplementation:
      'Template merge variable map covers broker, applicants, co-applicants, lender, loan, security, related parties, FinanceVault/document vault, and interview guide categories.',
    privateImportRequired: false,
    requiresProviderApi: false,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'BrokerEngine template merge category review and Twenty-safe placeholders.',
    nextPilotAction:
      'Test generated sample emails/reports against BrokerApp records and replace BrokerEngine placeholders with BrokerApp variables.',
    notes:
      'Use BrokerApp/Twenty placeholder names internally, with BrokerEngine aliases only for imports.',
  },
  {
    featureName: 'Checklist module',
    featureArea: 'CHECKLISTS',
    parityStatus: 'SEEDED',
    brokerAppImplementation:
      'Broker Checklist Templates, Broker Checklist Item Templates, Deal Checklists, and Deal Checklist Items support loan processor checklists, stage gates, assignments, completion status, and evidence notes.',
    privateImportRequired: true,
    requiresProviderApi: false,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'BrokerEngine checklist setting and user requirement for processor controls.',
    nextPilotAction:
      'Privately import approved checklist wording and link checklist templates to board stages.',
    notes:
      'Checklist completion should be usable by assistants and compliance before lodgement.',
  },
  {
    featureName: 'Document request stack',
    featureArea: 'DOCUMENTS',
    parityStatus: 'MODELLED',
    brokerAppImplementation:
      'Document Request records and Client Portal Tasks support requested documents, required/optional status, due dates, review status, external storage references, and safe portal visibility.',
    privateImportRequired: false,
    requiresProviderApi: true,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'User requirement for client portal documents and FinanceVault-like flow.',
    nextPilotAction:
      'Choose storage/provider path and define document categories under lender settings.',
    notes:
      'Do not duplicate sensitive document storage unless required; prefer metadata and authorized portal links.',
  },
  {
    featureName: 'Lender settings',
    featureArea: 'SETTINGS',
    parityStatus: 'MODELLED',
    brokerAppImplementation:
      'Broker Lenders, Lender Contacts, Lender Products, Lender Calculators, Lender Policy References, and Lender Document Categories model lender setup.',
    privateImportRequired: false,
    requiresProviderApi: true,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'User requirement for BrokerApp settings lenders tab.',
    nextPilotAction:
      'Load lender contact/product/policy/calculator references from private AFG/lender files.',
    notes:
      'Lender details inside deals should default from settings and allow broker completion for missing data.',
  },
  {
    featureName: 'Form builder settings',
    featureArea: 'SETTINGS',
    parityStatus: 'MODELLED',
    brokerAppImplementation:
      'Broker Form Templates provide a settings area for OpnForm or future BrokerApp-native form definitions, versions, provider references, and mapping status.',
    privateImportRequired: true,
    requiresProviderApi: true,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'BrokerEngine form builder review and OpnForm preference.',
    nextPilotAction:
      'Decide whether pilot forms run through OpnForm embed or a native BrokerApp portal form component.',
    notes:
      'Long-term direction is BrokerApp-native fact find and portal, with OpnForm as interim if useful.',
  },
  {
    featureName: 'Client portal dashboard',
    featureArea: 'CLIENT_PORTAL',
    parityStatus: 'MODELLED',
    brokerAppImplementation:
      'Client Portal Sessions and Client Portal Tasks model application progress, next actions, fact find, KYC/CDD, document requests, bank data, messages, and submitted items.',
    privateImportRequired: false,
    requiresProviderApi: true,
    requiresWorkspaceLogin: false,
    productionReady: false,
    sourceReference: 'User requirement for simple client portal and dashboard.',
    nextPilotAction:
      'Build the borrower-facing portal UI with passkeys and email magic links, then connect tasks to Opportunity records.',
    notes:
      'Portal users must not be normal staff CRM users.',
  },
  {
    featureName: 'Passkeys and email magic links',
    featureArea: 'CLIENT_PORTAL',
    parityStatus: 'PROVIDER_REQUIRED',
    brokerAppImplementation:
      'Integration Provider records include passkey and email magic-link placeholders. No Twilio dependency is required for v1.',
    privateImportRequired: false,
    requiresProviderApi: true,
    requiresWorkspaceLogin: false,
    productionReady: false,
    sourceReference: 'User direction to avoid extra Twilio licensing and keep system safe.',
    nextPilotAction:
      'Select auth implementation path for external portal users and confirm staff SSO/passkey compatibility with the deployed Twenty version.',
    notes:
      'SMS may remain optional for fallback but must not be sole identity assurance.',
  },
  {
    featureName: 'Progressive AML/KYC/CDD',
    featureArea: 'AML_KYC',
    parityStatus: 'MODELLED',
    brokerAppImplementation:
      'KYC/CDD Profiles, Verification Events, Consents, AML Escalations, Evidence Packs, and role separation model identity confidence, AML/CTF risk, fraud risk, CDD completion, reason codes, ECDD, hard stops, and evidence packs.',
    privateImportRequired: false,
    requiresProviderApi: true,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'User-provided BrokerApp AML/CTF strict requirements.',
    nextPilotAction:
      'Choose IDV/KYC, PEP/sanctions, open banking, bank statement, and credit check providers, then implement adapters.',
    notes:
      'AI may assist triage/extraction, but final high-risk outcomes require explainable human review.',
  },
  {
    featureName: 'AML tipping-off protection',
    featureArea: 'AML_KYC',
    parityStatus: 'MODELLED',
    brokerAppImplementation:
      'Compliance role, AML Escalation records, Evidence Packs, and client portal visibility rules separate internal suspicion/escalation records from customer-visible status.',
    privateImportRequired: false,
    requiresProviderApi: false,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'User-provided AML/CTF strict requirements.',
    nextPilotAction:
      'Configure permissions so clients and brokers cannot see restricted compliance notes unless authorized.',
    notes:
      'Never expose suspicious matter flags, AML risk scores, or internal escalation notes to applicants.',
  },
  {
    featureName: 'Open banking and bank statements',
    featureArea: 'INTEGRATIONS',
    parityStatus: 'PROVIDER_REQUIRED',
    brokerAppImplementation:
      'Integration Provider records and Client Portal Tasks reserve provider slots for CDR/open banking, bank statements, account holder matching, income signals, and consent records.',
    privateImportRequired: false,
    requiresProviderApi: true,
    requiresWorkspaceLogin: false,
    productionReady: false,
    sourceReference: 'User requirement for open banking and bank statement uploads.',
    nextPilotAction:
      'Select provider and map consent scope, account holder match, income signal, liability signal, and reference ID fields.',
    notes:
      'Never ask for or store bank login credentials.',
  },
  {
    featureName: 'ID verification provider adapter',
    featureArea: 'INTEGRATIONS',
    parityStatus: 'PROVIDER_REQUIRED',
    brokerAppImplementation:
      'Integration Provider, KYC Consent, and KYC Verification Event records define the abstraction for document verification, DVS, face/liveness, reason codes, and provider references.',
    privateImportRequired: false,
    requiresProviderApi: true,
    requiresWorkspaceLogin: false,
    productionReady: false,
    sourceReference: 'User requirement for ID verification and KYC tool.',
    nextPilotAction:
      'Choose provider and implement adapter with privacy-minimized claim storage.',
    notes:
      'Upload-only identity verification should be treated as weaker than live capture where lender policy requires it.',
  },
  {
    featureName: 'BrokerEngine and AFG compatibility',
    featureArea: 'INTEGRATIONS',
    parityStatus: 'PROVIDER_REQUIRED',
    brokerAppImplementation:
      'Integration Provider records, alias fields, Broker Templates, board/stage templates, and private import format preserve compatibility while keeping BrokerApp LIXI-first.',
    privateImportRequired: true,
    requiresProviderApi: true,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'User uses AFG/BrokerEngine and may request actual mapping from AFG/BrokerEngine.',
    nextPilotAction:
      'Request API docs, object model, auth, webhook support, rate limits, sandbox, and mapping from AFG/BrokerEngine.',
    notes:
      'Do not rely on Zapier as the core long-term integration path.',
  },
  {
    featureName: 'White-label SaaS controls',
    featureArea: 'WHITE_LABEL',
    parityStatus: 'MODELLED',
    brokerAppImplementation:
      'White Label Settings, Master Admin role, and deployment docs define branding, domain, tenant/workspace assumptions, auth, email domains, security headers, backups, and update process.',
    privateImportRequired: false,
    requiresProviderApi: true,
    requiresWorkspaceLogin: true,
    productionReady: false,
    sourceReference: 'User requirement to white-label BrokerApp as a SaaS product.',
    nextPilotAction:
      'Confirm Twenty licence/SaaS boundaries, tenant isolation model, billing model, and production security review.',
    notes:
      'Pilot deployment can be white-labelled before it is ready for multi-tenant resale.',
  },
] as const;
