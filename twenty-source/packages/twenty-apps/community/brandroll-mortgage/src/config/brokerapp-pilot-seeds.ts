export const brokerAppChecklistTemplateSeeds = [
  {
    checklistTemplateName: 'Lead intake readiness',
    templateStatus: 'ACTIVE',
    checklistCategory: 'LEAD',
    applicableBoard: 'LEAD',
    applicableStage: 'New Lead',
    applicableScenario: 'Residential mortgage lead',
    lenderRuleSet: 'Workspace default',
    blocksStageMovement: false,
    requiresComplianceReview: false,
    sourceSystem: 'BROKERAPP',
    sourceChecklistId: 'brokerapp-lead-intake-readiness-v1',
    privateImportReference: 'No proprietary BrokerEngine checklist text committed.',
  },
  {
    checklistTemplateName: 'Credit guide and privacy consent',
    templateStatus: 'ACTIVE',
    checklistCategory: 'COMPLIANCE',
    applicableBoard: 'LEAD',
    applicableStage: 'Initial Call Held > Get Docs',
    applicableScenario: 'Before borrower fact find unlock',
    lenderRuleSet: 'Aggregator and broker compliance default',
    blocksStageMovement: true,
    requiresComplianceReview: false,
    sourceSystem: 'BROKERAPP',
    sourceChecklistId: 'brokerapp-credit-guide-privacy-consent-v1',
    privateImportReference:
      'Use workspace-approved credit guide/privacy templates, not source-code bodies.',
  },
  {
    checklistTemplateName: 'Residential fact find completeness',
    templateStatus: 'ACTIVE',
    checklistCategory: 'FACT_FIND',
    applicableBoard: 'LEAD',
    applicableStage: 'Docs Requested',
    applicableScenario: 'Primary applicant plus conditional co-applicants',
    lenderRuleSet: 'LIXI-first residential data model',
    blocksStageMovement: true,
    requiresComplianceReview: false,
    sourceSystem: 'BROKERAPP',
    sourceChecklistId: 'brokerapp-residential-fact-find-completeness-v1',
    privateImportReference:
      'Fact find wording and conditional logic live in private form-template records.',
  },
  {
    checklistTemplateName: 'AML/CTF CDD readiness',
    templateStatus: 'ACTIVE',
    checklistCategory: 'AML_CTF',
    applicableBoard: 'DEAL',
    applicableStage: 'Prepare for Submission',
    applicableScenario: 'CDD, KYC, risk, consent, and hard-stop review',
    lenderRuleSet: 'Lender-specific CDD rules required before production',
    blocksStageMovement: true,
    requiresComplianceReview: true,
    sourceSystem: 'BROKERAPP',
    sourceChecklistId: 'brokerapp-aml-ctf-cdd-readiness-v1',
    privateImportReference: 'AML evidence and escalation details stay workspace-private.',
  },
  {
    checklistTemplateName: 'Lodgement submission pack',
    templateStatus: 'ACTIVE',
    checklistCategory: 'SUBMISSION',
    applicableBoard: 'DEAL',
    applicableStage: 'Prepare for Submission',
    applicableScenario: 'ApplyOnline or AFG Flex future lodgement',
    lenderRuleSet: 'Selected lender lodgement rules',
    blocksStageMovement: true,
    requiresComplianceReview: false,
    sourceSystem: 'BROKERAPP',
    sourceChecklistId: 'brokerapp-lodgement-submission-pack-v1',
    privateImportReference:
      'Use private lender/aggregator document rules and current ApplyOnline/AFG mapping.',
  },
  {
    checklistTemplateName: 'Formal approval and settlement',
    templateStatus: 'ACTIVE',
    checklistCategory: 'SETTLEMENT',
    applicableBoard: 'DEAL',
    applicableStage: 'Formal Approval',
    applicableScenario: 'Conditions, documents, ready-to-settle, and settlement advice',
    lenderRuleSet: 'Selected lender settlement rules',
    blocksStageMovement: true,
    requiresComplianceReview: false,
    sourceSystem: 'BROKERAPP',
    sourceChecklistId: 'brokerapp-formal-approval-settlement-v1',
    privateImportReference:
      'Settlement advice body and lender-specific document wording stay private.',
  },
] as const;

export const brokerAppIntegrationProviderSeeds = [
  {
    providerName: 'BrokerApp email magic links',
    providerStatus: 'PLANNED',
    providerCategory: 'PORTAL_AUTH',
    authMethod: 'signed-email-token',
    secretEnvNames: 'APP_SECRET,SERVER_URL,EMAIL_*',
    noSmsOtpRequired: true,
    implementationNotes:
      'Client portal v1 uses expiring email magic links and passkeys instead of Twilio/SMS OTP.',
  },
  {
    providerName: 'BrokerApp passkeys',
    providerStatus: 'PLANNED',
    providerCategory: 'PORTAL_AUTH',
    authMethod: 'webauthn-passkey',
    secretEnvNames: 'SERVER_URL,APP_SECRET',
    noSmsOtpRequired: true,
    implementationNotes:
      'Preferred stronger client authentication for portal access after first link verification.',
  },
  {
    providerName: 'ID verification provider',
    providerStatus: 'NEEDS_KEYS',
    providerCategory: 'IDV_KYC',
    authMethod: 'provider-specific',
    secretEnvNames: 'IDV_PROVIDER_API_BASE_URL,IDV_PROVIDER_API_KEY',
    noSmsOtpRequired: true,
    implementationNotes:
      'Adapter must return explainable claims, provider reference IDs, reason codes, consent references, and evidence pointers.',
  },
  {
    providerName: 'Open banking provider',
    providerStatus: 'NEEDS_KEYS',
    providerCategory: 'OPEN_BANKING',
    authMethod: 'consent-oauth',
    secretEnvNames:
      'OPEN_BANKING_API_BASE_URL,OPEN_BANKING_CLIENT_ID,OPEN_BANKING_CLIENT_SECRET',
    noSmsOtpRequired: true,
    implementationNotes:
      'Use consent-based CDR/open banking flows only. Never collect or store bank login credentials.',
  },
  {
    providerName: 'Bank statement provider',
    providerStatus: 'NEEDS_KEYS',
    providerCategory: 'BANK_STATEMENT',
    authMethod: 'provider-specific',
    secretEnvNames: 'BANK_STATEMENT_API_BASE_URL,BANK_STATEMENT_API_KEY',
    noSmsOtpRequired: true,
    implementationNotes:
      'Fallback or complement for open banking. Store analysis outputs and source references, not unnecessary raw statements in CRM tables.',
  },
  {
    providerName: 'AFG product matrix import',
    providerStatus: 'PLANNED',
    providerCategory: 'PRODUCT_DATA',
    authMethod: 'manual-xlsx-import-or-api',
    secretEnvNames: 'AFG_API_BASE_URL,AFG_CLIENT_ID,AFG_CLIENT_SECRET',
    noSmsOtpRequired: true,
    implementationNotes:
      'Use supplied AFG product matrix workbooks or API exports to update lender products and filter sheets for product fit.',
  },
  {
    providerName: 'ApplyOnline lodgement',
    providerStatus: 'NEEDS_KEYS',
    providerCategory: 'LODGEMENT',
    authMethod: 'vendor-approved-api',
    secretEnvNames:
      'APPLYONLINE_API_BASE_URL,APPLYONLINE_CLIENT_ID,APPLYONLINE_CLIENT_SECRET',
    noSmsOtpRequired: true,
    implementationNotes:
      'Future preferred direct lodgement path. Requires approval, production access, schema mapping, and certification before live use.',
  },
  {
    providerName: 'AFG Flex lodgement',
    providerStatus: 'NEEDS_KEYS',
    providerCategory: 'LODGEMENT',
    authMethod: 'vendor-approved-api',
    secretEnvNames:
      'AFG_FLEX_API_BASE_URL,AFG_FLEX_CLIENT_ID,AFG_FLEX_CLIENT_SECRET',
    noSmsOtpRequired: true,
    implementationNotes:
      'Alternate lodgement path where ApplyOnline direct integration is unavailable or not approved.',
  },
  {
    providerName: 'BrokerEngine compatibility',
    providerStatus: 'NEEDS_KEYS',
    providerCategory: 'LODGEMENT',
    authMethod: 'api-or-private-import',
    secretEnvNames: 'BROKERENGINE_API_BASE_URL,BROKERENGINE_API_KEY',
    noSmsOtpRequired: true,
    implementationNotes:
      'Compatibility layer for field aliases, board stages, and private template import. Do not commit copied template bodies to GitHub.',
  },
] as const;

export const brokerAppWhiteLabelSettingSeeds = [
  {
    settingName: 'BrokerApp pilot brand',
    brandName: 'BrokerApp',
    primaryDomain: 'app.lendaloan.com.au',
    portalDomain: 'app.lendaloan.com.au',
    emailFromDomain: 'lendaloan.com.au',
    themeTokens:
      '{"productName":"BrokerApp","supportEmail":"shahrooz@lendalona.com.au","staffAuth":"Twenty","clientAuth":"magic-link-passkey"}',
    tenantIsolationMode: 'workspace-isolation-pilot',
    smsOtpDisabled: true,
    passkeysEnabled: true,
    emailMagicLinksEnabled: true,
    securityHeadersProfile:
      'Cloudflare tunnel/proxy, HTTPS-only, HSTS after domain validation, CSP to be tightened after portal assets are final.',
  },
] as const;
