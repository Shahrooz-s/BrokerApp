import { CoreApiClient } from 'twenty-client-sdk/core';
import { definePostInstallLogicFunction } from 'twenty-sdk/define';

import {
  brokerEngineBoardTemplates,
  brokerEngineStageTemplates,
} from 'src/config/brokerengine-board-stage-config';
import {
  brokerEngineOneClickWorkflowNames,
  brokerEngineOneClickWorkflowTaskRules,
  brokerEngineReportTemplates,
  brokerEngineDealWorkspaceTools,
} from 'src/config/brokerengine-workspace-tools';
import {
  brokerAppChecklistTemplateSeeds,
  brokerAppIntegrationProviderSeeds,
  brokerAppWhiteLabelSettingSeeds,
} from 'src/config/brokerapp-pilot-seeds';
import { brokerAppSettingsAreaSeeds } from 'src/config/brokerapp-settings-blueprint';
import { brokerEngineFeatureParitySeeds } from 'src/config/brokerengine-feature-parity-map';
import { brokerEngineTemplateSeeds } from 'src/config/brokerengine-template-library';

type SeedRecord = Record<string, unknown>;

type ConnectionResult = {
  pageInfo?: {
    hasNextPage?: boolean;
    endCursor?: string | null;
  };
  edges?: Array<{
    node?: Record<string, unknown>;
  }>;
};

const removeNilValues = (record: SeedRecord): SeedRecord =>
  Object.fromEntries(
    Object.entries(record).filter(
      ([, value]) => value !== undefined && value !== null,
    ),
  );

const getExistingValues = async (
  client: CoreApiClient,
  objectNamePlural: string,
  uniqueFieldName: string,
): Promise<Set<string>> => {
  const existing = new Set<string>();
  let hasNextPage = true;
  let after: string | undefined;

  while (hasNextPage) {
    const args: Record<string, unknown> = { first: 500 };

    if (after !== undefined) {
      args.after = after;
    }

    const result = await client.query({
      [objectNamePlural]: {
        __args: args,
        pageInfo: {
          hasNextPage: true,
          endCursor: true,
        },
        edges: {
          node: {
            [uniqueFieldName]: true,
          },
        },
      },
    } as never);

    const connection = (result as Record<string, ConnectionResult>)[
      objectNamePlural
    ];

    for (const edge of connection?.edges ?? []) {
      const value = edge.node?.[uniqueFieldName];

      if (typeof value === 'string' && value.length > 0) {
        existing.add(value);
      }
    }

    hasNextPage = connection?.pageInfo?.hasNextPage ?? false;
    after = connection?.pageInfo?.endCursor ?? undefined;
  }

  return existing;
};

const seedRecords = async (
  client: CoreApiClient,
  objectNamePlural: string,
  mutationName: string,
  uniqueFieldName: string,
  records: SeedRecord[],
): Promise<number> => {
  const existingValues = await getExistingValues(
    client,
    objectNamePlural,
    uniqueFieldName,
  );
  const recordsToCreate = records.map(removeNilValues).filter((record) => {
    const value = record[uniqueFieldName];

    return typeof value === 'string' && !existingValues.has(value);
  });

  if (recordsToCreate.length === 0) {
    return 0;
  }

  await client.mutation({
    [mutationName]: {
      __args: {
        data: recordsToCreate,
      },
      id: true,
    },
  } as never);

  return recordsToCreate.length;
};

const toBrokerTemplateRecords = (): SeedRecord[] => {
  const templateRecords = brokerEngineTemplateSeeds.map((template, index) => ({
    ...template,
    templateStatus:
      template.importStatus === 'READY'
        ? 'ACTIVE'
        : template.importStatus === 'BODY_PENDING_PRIVATE_IMPORT'
          ? 'BODY_PENDING_PRIVATE_IMPORT'
          : 'DRAFT',
    sourceTemplateId: `${template.sourceSystem.toLowerCase()}-${template.templateType.toLowerCase()}-${index}`,
    mergeVariables: JSON.stringify(template.mergeVariables),
  }));

  const reportRecords = brokerEngineReportTemplates.map(
    (templateName, index) => ({
      templateName,
      templateType: 'REPORT',
      workflowCategory: 'LODGEMENT',
      templateStatus: 'BODY_PENDING_PRIVATE_IMPORT',
      subject: templateName,
      bodyFormat: 'PLAIN_TEXT',
      body: 'Private report body not committed. Store approved report layout and merge mapping in the workspace.',
      fromRole: 'SYSTEM',
      toRecipientType: 'INTERNAL_TEAM',
      sharedScope: 'BROKER_GROUP',
      sourceSystem: 'BROKERENGINE',
      sourceTemplateId: `brokerengine-report-${index}`,
      relatedBoard: 'DEAL',
      mergeVariables: '[]',
      importStatus: 'BODY_PENDING_PRIVATE_IMPORT',
    }),
  );

  const workflowRecords = brokerEngineOneClickWorkflowNames.map(
    (templateName, index) => ({
      templateName,
      templateType: 'WORKFLOW',
      workflowCategory:
        templateName === 'Commercial Loan'
          ? 'COMMERCIAL_LENDING'
          : templateName === 'Business Loan'
            ? 'BUSINESS_LENDING'
            : templateName === 'Equipment Loan'
              ? 'ASSET_FINANCE'
              : 'LODGEMENT',
      templateStatus: 'DRAFT',
      subject: templateName,
      bodyFormat: 'RICH_TEXT_JSON',
      body: JSON.stringify(
        brokerEngineOneClickWorkflowTaskRules.find(
          (rule) => rule.templateName === templateName,
        ),
      ),
      fromRole: 'SYSTEM',
      toRecipientType: 'INTERNAL_TEAM',
      sharedScope: 'BROKER_GROUP',
      sourceSystem: 'BROKERENGINE',
      sourceTemplateId: `brokerengine-workflow-${index}`,
      relatedBoard:
        templateName === 'Commercial Loan'
          ? 'COMMERCIAL_LENDING'
          : templateName === 'Business Loan'
            ? 'BUSINESS_LENDING'
            : templateName === 'Equipment Loan'
              ? 'ASSET_FINANCE'
              : 'DEAL',
      mergeVariables: '[]',
      importStatus: 'STRUCTURE_ONLY',
    }),
  );

  return [...templateRecords, ...reportRecords, ...workflowRecords];
};

const brokerAppLoanDoxRuleSeeds: SeedRecord[] = [
  {
    ruleName: 'LoanDox - applicant targeted document requests',
    ruleType: 'APPLICANT_TARGETING',
    ruleStatus: 'ACTIVE',
    applicantScope: 'Primary, co-applicant, all applicants, household, company, trust, guarantor',
    triggerCondition: 'Broker adds a document request or a fact-find answer creates a required evidence item',
    requiredDocuments:
      'Credit guide consent, KYC identity, PAYG income, self-employed income, bank statements, property and lender conditions',
    uploadMethods: 'ClientDash upload; CashDeck, Basiq and provider import are provider-gated',
    requiresMasterAdminApproval: false,
    aiInstructions:
      'Draft only: suggest missing evidence and discrepancy checks after broker review.',
    doNotDoRules:
      'Do not send client requests, run provider checks, accept evidence, or submit to lender without broker approval.',
  },
  {
    ruleName: 'ClientDash - borrower portal safety and locking',
    ruleType: 'CLIENTDASH_LOCK',
    ruleStatus: 'ACTIVE',
    applicantScope: 'Each applicant and shared household where applicable',
    triggerCondition: 'Client submits fact-find, consent, KYC, bank statement task, or document upload',
    requiredDocuments:
      'Submitted client answers, upload metadata, consent records, broker review outcome, and timeline event',
    uploadMethods: 'ClientDash upload first; manual broker upload stays broker-only',
    requiresMasterAdminApproval: false,
    aiInstructions:
      'Draft only: compare submitted data against documents and flag missing fields for broker review.',
    doNotDoRules:
      'Do not expose AML suspicion, risk scores, broker notes, lender notes, or compliance escalations to clients.',
  },
  {
    ruleName: 'LoanDox - provider and AI action gate',
    ruleType: 'AI_REVIEW',
    ruleStatus: 'PROVIDER_GATED',
    applicantScope: 'All applicants and broker workspace',
    triggerCondition:
      'CashDeck, Basiq, Equifax, IDV, AI document review, email/SMS, ApplyOnline, AFG Flex, BrokerEngine or LIXI action',
    requiredDocuments:
      'Provider credentials, consent, Master Admin approval, broker approval, and audit event',
    uploadMethods: 'Provider API actions disabled until configured',
    requiresMasterAdminApproval: true,
    aiInstructions:
      'AI may triage and draft, but final broker/compliance review remains mandatory.',
    doNotDoRules:
      'Do not run external checks, send messages, or submit lender payloads without enabled credentials and explicit approval.',
  },
];

const handler = async (): Promise<Record<string, number>> => {
  const client = new CoreApiClient();

  const boardTemplates = await seedRecords(
    client,
    'brokerBoardTemplates',
    'createBrokerBoardTemplates',
    'sourceBoardId',
    brokerEngineBoardTemplates as unknown as SeedRecord[],
  );
  const stageTemplates = await seedRecords(
    client,
    'brokerStageTemplates',
    'createBrokerStageTemplates',
    'stageMapping',
    brokerEngineStageTemplates as unknown as SeedRecord[],
  );
  const brokerTemplates = await seedRecords(
    client,
    'brokerTemplates',
    'createBrokerTemplates',
    'sourceTemplateId',
    toBrokerTemplateRecords(),
  );
  const workspaceTools = await seedRecords(
    client,
    'dealWorkspaceTools',
    'createDealWorkspaceTools',
    'sourceReference',
    brokerEngineDealWorkspaceTools.map(({ position, ...tool }) => ({
      ...tool,
      sortOrder: position,
      toolStatus: 'DESIGNED',
      sourceReference: `brokerengine:${tool.workspaceArea}:${tool.toolName}`,
    })),
  );
  const settingsAreas = await seedRecords(
    client,
    'brokerSettingsAreas',
    'createBrokerSettingsAreas',
    'settingName',
    brokerAppSettingsAreaSeeds.map(({ position, ...settingArea }) => ({
      ...settingArea,
      sortOrder: position,
    })) as unknown as SeedRecord[],
  );
  const featureParity = await seedRecords(
    client,
    'brokerEngineFeatureParities',
    'createBrokerEngineFeatureParities',
    'featureName',
    brokerEngineFeatureParitySeeds as unknown as SeedRecord[],
  );
  const checklistTemplates = await seedRecords(
    client,
    'brokerChecklistTemplates',
    'createBrokerChecklistTemplates',
    'sourceChecklistId',
    brokerAppChecklistTemplateSeeds as unknown as SeedRecord[],
  );
  const integrationProviders = await seedRecords(
    client,
    'integrationProviders',
    'createIntegrationProviders',
    'providerName',
    brokerAppIntegrationProviderSeeds as unknown as SeedRecord[],
  );
  const whiteLabelSettings = await seedRecords(
    client,
    'whiteLabelSettings',
    'createWhiteLabelSettings',
    'settingName',
    brokerAppWhiteLabelSettingSeeds as unknown as SeedRecord[],
  );
  const loanDoxRules = await seedRecords(
    client,
    'loanDoxRules',
    'createLoanDoxRules',
    'ruleName',
    brokerAppLoanDoxRuleSeeds,
  );

  const counts = {
    boardTemplates,
    stageTemplates,
    brokerTemplates,
    workspaceTools,
    settingsAreas,
    featureParity,
    checklistTemplates,
    integrationProviders,
    whiteLabelSettings,
    loanDoxRules,
  };

  console.log('Seeded BrokerApp configuration records', counts);

  return counts;
};

export default definePostInstallLogicFunction({
  universalIdentifier: '6b6d0000-3900-4000-8000-000000000001',
  name: 'seed-brokerapp-configuration',
  description:
    'Seeds BrokerApp board, stage, template, deal workspace, and settings-map configuration records after app installation.',
  timeoutSeconds: 120,
  handler,
});
