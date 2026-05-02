import {
  brokerEngineBoardTemplates,
  brokerEngineStageTemplates,
} from '../src/config/brokerengine-board-stage-config';
import {
  brokerEngineDealWorkspaceTools,
  brokerEngineOneClickWorkflowNames,
  brokerEngineReportTemplates,
} from '../src/config/brokerengine-workspace-tools';
import {
  brokerAppChecklistTemplateSeeds,
  brokerAppIntegrationProviderSeeds,
  brokerAppWhiteLabelSettingSeeds,
} from '../src/config/brokerapp-pilot-seeds';
import { brokerAppSettingsAreaSeeds } from '../src/config/brokerapp-settings-blueprint';
import { brokerEngineFeatureParitySeeds } from '../src/config/brokerengine-feature-parity-map';
import { brokerEngineTemplateSeeds } from '../src/config/brokerengine-template-library';

type SeedRecord = Record<string, unknown>;

type SeedTarget = {
  objectNamePlural: string;
  mutationName: string;
  inputType: string;
  uniqueFieldName: string;
  records: SeedRecord[];
};

const apiKey = process.env.TWENTY_API_KEY;
const endpoint =
  process.env.TWENTY_API_URL ?? 'https://app.lendaloan.com.au/graphql';

if (!apiKey) {
  throw new Error('Missing TWENTY_API_KEY');
}

const removeNilValues = (record: SeedRecord): SeedRecord =>
  Object.fromEntries(
    Object.entries(record).filter(
      ([, value]) => value !== undefined && value !== null,
    ),
  );

const graphql = async <T,>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> => {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = (await res.json()) as {
    data?: T;
    errors?: Array<{ message: string }>;
  };

  if (!res.ok || json.errors?.length) {
    throw new Error(
      JSON.stringify({ status: res.status, errors: json.errors }, null, 2),
    );
  }

  return json.data as T;
};

const getExistingValues = async (
  objectNamePlural: string,
  uniqueFieldName: string,
): Promise<Set<string>> => {
  const existing = new Set<string>();
  let hasNextPage = true;
  let after: string | null | undefined;

  while (hasNextPage) {
    const data = await graphql<
      Record<
        string,
        {
          pageInfo?: { hasNextPage?: boolean; endCursor?: string | null };
          edges?: Array<{ node?: Record<string, unknown> }>;
        }
      >
    >(
      `query Existing($first: Int!, $after: String) {
        ${objectNamePlural}(first: $first, after: $after) {
          pageInfo { hasNextPage endCursor }
          edges { node { ${uniqueFieldName} } }
        }
      }`,
      { first: 500, after },
    );
    const connection = data[objectNamePlural];

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

const chunk = <T,>(items: T[], size: number): T[][] => {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
};

const seedRecords = async (target: SeedTarget): Promise<number> => {
  const existingValues = await getExistingValues(
    target.objectNamePlural,
    target.uniqueFieldName,
  );
  const recordsToCreate = target.records
    .map(removeNilValues)
    .filter((record) => {
      const value = record[target.uniqueFieldName];

      return typeof value === 'string' && !existingValues.has(value);
    });

  for (const records of chunk(recordsToCreate, 50)) {
    await graphql(
      `mutation Seed($data: [${target.inputType}!]!) {
        ${target.mutationName}(data: $data) { id }
      }`,
      { data: records },
    );
  }

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
      bodyFormat: 'PLAIN_TEXT',
      body: 'Workflow scenario captured from BrokerEngine. Configure stage actions, tasks, emails, checklists, and broker approval gates before activation.',
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

const targets: SeedTarget[] = [
  {
    objectNamePlural: 'brokerBoardTemplates',
    mutationName: 'createBrokerBoardTemplates',
    inputType: 'BrokerBoardTemplateCreateInput',
    uniqueFieldName: 'sourceBoardId',
    records: brokerEngineBoardTemplates as unknown as SeedRecord[],
  },
  {
    objectNamePlural: 'brokerStageTemplates',
    mutationName: 'createBrokerStageTemplates',
    inputType: 'BrokerStageTemplateCreateInput',
    uniqueFieldName: 'stageMapping',
    records: brokerEngineStageTemplates as unknown as SeedRecord[],
  },
  {
    objectNamePlural: 'brokerTemplates',
    mutationName: 'createBrokerTemplates',
    inputType: 'BrokerTemplateCreateInput',
    uniqueFieldName: 'sourceTemplateId',
    records: toBrokerTemplateRecords(),
  },
  {
    objectNamePlural: 'dealWorkspaceTools',
    mutationName: 'createDealWorkspaceTools',
    inputType: 'DealWorkspaceToolCreateInput',
    uniqueFieldName: 'sourceReference',
    records: brokerEngineDealWorkspaceTools.map(({ position, ...tool }) => ({
      ...tool,
      sortOrder: position,
      toolStatus: 'DESIGNED',
      sourceReference: `brokerengine:${tool.workspaceArea}:${tool.toolName}`,
    })) as unknown as SeedRecord[],
  },
  {
    objectNamePlural: 'brokerSettingsAreas',
    mutationName: 'createBrokerSettingsAreas',
    inputType: 'BrokerSettingsAreaCreateInput',
    uniqueFieldName: 'settingName',
    records: brokerAppSettingsAreaSeeds.map(({ position, ...settingArea }) => ({
      ...settingArea,
      sortOrder: position,
    })) as unknown as SeedRecord[],
  },
  {
    objectNamePlural: 'brokerEngineFeatureParities',
    mutationName: 'createBrokerEngineFeatureParities',
    inputType: 'BrokerEngineFeatureParityCreateInput',
    uniqueFieldName: 'featureName',
    records: brokerEngineFeatureParitySeeds as unknown as SeedRecord[],
  },
  {
    objectNamePlural: 'brokerChecklistTemplates',
    mutationName: 'createBrokerChecklistTemplates',
    inputType: 'BrokerChecklistTemplateCreateInput',
    uniqueFieldName: 'sourceChecklistId',
    records: brokerAppChecklistTemplateSeeds as unknown as SeedRecord[],
  },
  {
    objectNamePlural: 'integrationProviders',
    mutationName: 'createIntegrationProviders',
    inputType: 'IntegrationProviderCreateInput',
    uniqueFieldName: 'providerName',
    records: brokerAppIntegrationProviderSeeds as unknown as SeedRecord[],
  },
  {
    objectNamePlural: 'whiteLabelSettings',
    mutationName: 'createWhiteLabelSettings',
    inputType: 'WhiteLabelSettingCreateInput',
    uniqueFieldName: 'settingName',
    records: brokerAppWhiteLabelSettingSeeds as unknown as SeedRecord[],
  },
];

const main = async (): Promise<void> => {
  const counts: Record<string, number> = {};

  for (const target of targets) {
    counts[target.objectNamePlural] = await seedRecords(target);
  }

  console.log(JSON.stringify(counts, null, 2));
};

void main();
