import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';

import { defineFrontComponent } from 'twenty-sdk/define';
import { CoreApiClient } from 'twenty-client-sdk/core';
import { enqueueSnackbar, useRecordId } from 'twenty-sdk/front-component';

export const BROKERAPP_LOANDASH_FRONT_COMPONENT_ID =
  '6b6d0000-4100-4000-8000-000000000001';

const dealStages = [
  'Outstanding Supporting Documents',
  'Prepare for Submission',
  'App Docs With Client',
  'Signed App Docs Returned',
  'Application Lodged',
  'AIP Issued',
  'AIP > Full Conversion',
  'Conditional/MIRs',
  'Conditions/MIRs With Client',
  'Conditions/MIRs With Lender',
  'Formal Approval',
  'Mortgage Docs Issued',
  'Mortgage Docs Returned',
  'Ready To Settle',
  'Settlement Booked',
  'Settlement',
  'Lost/Declined',
];

type BoardKey = 'Lead' | 'Deal';

type BoardStageOption = {
  board: BoardKey;
  label: string;
  value: string;
};

const leadWorkflowStageOptions: BoardStageOption[] = [
  { board: 'Lead', label: '1. New Lead', value: 'NEW_LEAD' },
  {
    board: 'Lead',
    label: '2. Attempted Contact 1',
    value: 'ATTEMPTED_CONTACT_1',
  },
  {
    board: 'Lead',
    label: '3. Attempted Contact 2',
    value: 'ATTEMPTED_CONTACT_2',
  },
  {
    board: 'Lead',
    label: '4. Attempted Contact 3',
    value: 'ATTEMPTED_CONTACT_3',
  },
  {
    board: 'Lead',
    label: '5. Initial Call Held > Get Docs',
    value: 'INITIAL_CALL_GET_DOCS',
  },
  {
    board: 'Lead',
    label: '6. Docs Requested',
    value: 'LEAD_DOCS_REQUESTED',
  },
  {
    board: 'Lead',
    label: '7. Research > Servicing',
    value: 'RESEARCH_SERVICING',
  },
  {
    board: 'Lead',
    label: '8. Prepare Loan Proposal',
    value: 'PREPARE_LOAN_PROPOSAL',
  },
  {
    board: 'Lead',
    label: '9. Loan Proposal Presented',
    value: 'LOAN_PROPOSAL_PRESENTED',
  },
  {
    board: 'Lead',
    label: '10. Client Accepted > Handover',
    value: 'CLIENT_ACCEPTED_HANDOVER',
  },
  { board: 'Lead', label: '11. On Hold', value: 'ON_HOLD' },
  { board: 'Lead', label: '12. Lost Opps', value: 'LOST_OPPORTUNITY' },
];

const dealWorkflowStageValues = [
  'OUTSTANDING_SUPPORTING_DOCUMENTS',
  'PREPARE_FOR_SUBMISSION',
  'APP_DOCS_WITH_CLIENT',
  'SIGNED_APP_DOCS_RETURNED',
  'APPLICATION_LODGED',
  'AIP_ISSUED',
  'AIP_FULL_CONVERSION',
  'CONDITIONAL_MIRS',
  'CONDITIONS_MIRS_WITH_CLIENT',
  'CONDITIONS_MIRS_WITH_LENDER',
  'FORMAL_APPROVAL',
  'MORTGAGE_DOCS_ISSUED',
  'MORTGAGE_DOCS_RETURNED',
  'READY_TO_SETTLE',
  'SETTLEMENT_BOOKED',
  'SETTLEMENT',
  'LOST_DECLINED',
];

const dealWorkflowStageOptions: BoardStageOption[] = dealStages.map(
  (label, index) => ({
    board: 'Deal',
    label: `${index + 1}. ${label}`,
    value: dealWorkflowStageValues[index] ?? 'OUTSTANDING_SUPPORTING_DOCUMENTS',
  }),
);

const boardStageOptions = [
  ...leadWorkflowStageOptions,
  ...dealWorkflowStageOptions,
];

const firstDealStage = dealWorkflowStageOptions[0];
const firstLeadStage = leadWorkflowStageOptions[0];

const rightRailTools = [
  'Notes',
  'Checklists',
  'Tasks',
  'Emails',
  'Texts',
  'LoanDox',
  'ClientDash',
  'PolicySpace',
  'CreditDash',
  'Key Dates',
  'Reports',
  '1-Click Workflows',
];

const defaultActiveRightRailTool = 'LoanDox';
const loanWorkspaceLayoutStorageKey = 'brokerapp.loanWorkspace.layout.v3';
const defaultLoanSidebarWidth = 228;
const defaultToolWorkspaceWidth = 560;
const minLoanSidebarWidth = 188;
const maxLoanSidebarWidth = 300;
const minToolWorkspaceWidth = 440;
const maxToolWorkspaceWidth = 820;
const collapsedLoanSidebarWidth = 64;
const collapsedToolWorkspaceWidth = 56;
const collapsedTwentyNavigationWidth = 40;

type LayoutResizePane = 'loan-sidebar' | 'tool-workspace';

type LoanWorkspaceLayoutPreference = {
  activeTool?: string;
  isLoanSidebarCollapsed?: boolean;
  isToolboxCollapsed?: boolean;
  loanSidebarWidth?: number;
  toolWorkspaceWidth?: number;
};

const clampNumber = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const getStoredLoanWorkspaceLayout = (): LoanWorkspaceLayoutPreference => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return {};
  }

  try {
    const storedPreference = window.localStorage.getItem(
      loanWorkspaceLayoutStorageKey,
    );

    if (!storedPreference) {
      return {};
    }

    return JSON.parse(storedPreference) as LoanWorkspaceLayoutPreference;
  } catch {
    return {};
  }
};

const getInitialRightRailTool = () => {
  const storedTool = getStoredLoanWorkspaceLayout().activeTool;

  return storedTool && rightRailTools.includes(storedTool)
    ? storedTool
    : defaultActiveRightRailTool;
};

const rightRailToolIconPaths: Record<string, string[]> = {
  Notes: [
    'M6 4h9l3 3v13H6V4z',
    'M14 4v4h4',
    'M9 11h6',
    'M9 15h6',
  ],
  Checklists: [
    'M5 6h14',
    'M5 12h14',
    'M5 18h14',
    'M4 6l1 1 2-3',
    'M4 12l1 1 2-3',
  ],
  Tasks: [
    'M5 5h14v14H5V5z',
    'M8 12l2 2 5-5',
  ],
  Emails: [
    'M4 6h16v12H4V6z',
    'M4 7l8 6 8-6',
  ],
  Texts: [
    'M5 5h14v10H8l-3 3V5z',
    'M8 9h8',
    'M8 12h5',
  ],
  LoanDox: [
    'M7 3h7l4 4v14H7V3z',
    'M14 3v5h4',
    'M9 12h6',
    'M9 16h6',
  ],
  ClientDash: [
    'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    'M4 21a8 8 0 0 1 16 0',
  ],
  PolicySpace: [
    'M5 4h10a4 4 0 0 1 4 4v12H7a2 2 0 0 1-2-2V4z',
    'M8 8h7',
    'M8 12h8',
    'M8 16h5',
  ],
  CreditDash: [
    'M4 5h16v14H4V5z',
    'M8 9h8',
    'M8 13h4',
    'M14 13h2',
    'M8 17h8',
  ],
  'Key Dates': [
    'M6 5h12v14H6V5z',
    'M8 3v4',
    'M16 3v4',
    'M6 9h12',
    'M9 13h2',
    'M13 13h2',
  ],
  Reports: [
    'M6 4h12v16H6V4z',
    'M9 8h6',
    'M9 12h6',
    'M9 16h4',
  ],
  '1-Click Workflows': [
    'M13 2L4 14h7l-1 8 10-12h-7l0-8z',
  ],
};

const loanDashboardMetricCards = [
  ['Loan Amount', '$0.00'],
  ['Fact Find', '62%'],
  ['Serviceability', 'Blocked'],
  ['Board', 'Deal'],
];

type BrokerWorkflowTemplate = {
  category: string;
  complianceGate: string;
  description: string;
  evidence: string;
  name: string;
  tasks: string[];
};

type GeneratedAssistantTask = {
  assignee: string;
  due: string;
  id: string;
  priority: 'Low' | 'Medium' | 'High';
  sourceWorkflow: string;
  status: 'Pending' | 'Completed' | 'Snoozed';
  title: string;
};

const baseWorkflowTasks = [
  'Confirm scenario applies to this residential loan',
  'Request missing evidence from the applicants',
  'Update lender checklist and document map',
  'Record broker file note before lender submission',
];

const workflowTaskOverrides: Record<string, string[]> = {
  Construction: [
    'Request fixed-price building contract and plans',
    'Capture progress payment schedule',
    'Check lender construction policy and valuation path',
    'Add construction pack to lodgement checklist',
  ],
  FIRB: [
    'Confirm applicant residency and FIRB requirement',
    'Request FIRB approval evidence',
    'Record foreign income and currency notes',
    'Block lodgement until FIRB evidence is attached',
  ],
  'Guarantor Home Loan': [
    'Add guarantor related party record',
    'Request guarantor income, ID and security evidence',
    'Record independent legal advice requirement',
    'Check guarantor policy and servicing treatment',
  ],
  'First Home Owners Grant': [
    'Confirm first home buyer eligibility',
    'Request FHOG and stamp duty concession evidence',
    'Map grant funds into funding position',
    'Add state-specific grant checklist to Smart Docs',
  ],
  'Non Face to Face Process Required': [
    'Set AML non-face-to-face risk flag',
    'Request certified ID or approved electronic IDV',
    'Record enhanced customer due diligence decision',
    'Hold credit check until consent and IDV are clean',
  ],
  Refinance: [
    'Request latest loan statement and payout estimate',
    'Confirm discharge authority requirements',
    'Compare current loan against recommended product',
    'Record refinance benefit and BID rationale',
  ],
  'Self-Employed': [
    'Request latest tax returns and financial statements',
    'Capture ABN, GST registration and trading period',
    'Check add-backs and accountant letter requirements',
    'Update servicing assumptions for self-employed income',
  ],
};

const brokerWorkflowTemplates: BrokerWorkflowTemplate[] = [
  'Lender Rebate',
  'Guarantor Home Loan',
  'Fast Refi',
  'Non-Standard Ownership Structure',
  'Client Lives Overseas',
  'Construction',
  'FIRB',
  'Mat Leave/ Pregnant Pause',
  'Deposit Bond',
  'First Home Owners Grant',
  'Off the Plan',
  'Debt Recycling',
  'Purchasing in a Trust',
  'Rate Lock',
  'Favourable Purchase',
  'Multiple Offset Accounts',
  'Cross Securitisation',
  'Interest in Advance',
  'Refinance',
  'Debt Consolidation',
  'Simultaneous or Prior Settlement',
  'Repayment Type IO vs PI',
  'Split Home Loan',
  'SMSF',
  'LMI Waiver',
  'Low Doc Loan',
  'Bridging Loan',
  'Commercial Loan',
  'Business Loan',
  'Non Face to Face Process Required',
  'Pre-Approval',
  'FHB Stamp Duty Concession',
  'First Home Loan Deposit Scheme (FHLDS/NHG)',
  'Property Insurance Referral (eg, Home and Contents)',
  'Accounting Referral',
  'Financial Planning Referral',
  'Property Management Referral',
  'Property Advisory Referral (eg, Buyers Agent Referral)',
  'Loan Protection Insurance',
  'Equipment Loan',
  'Separation',
  'Equity Release / Cash Out',
  'Self-Employed',
].map((name) => ({
  category:
    name === 'Commercial Loan'
      ? 'Commercial'
      : name === 'Business Loan'
        ? 'Business'
        : name === 'Equipment Loan'
          ? 'Asset Finance'
          : 'Residential',
  complianceGate:
    name === 'Non Face to Face Process Required'
      ? 'AML/CTF enhanced CDD'
      : name.includes('Guarantor')
        ? 'Guarantor advice and security risk'
        : name === 'FIRB'
          ? 'FIRB evidence'
          : 'Broker review before submission',
  description:
    'Creates assistant tasks, checklist gates, document requests and file notes for the selected scenario.',
  evidence:
    name === 'Construction'
      ? 'Building contract, plans, progress schedule'
      : name === 'FIRB'
        ? 'Residency evidence and FIRB approval'
        : name === 'Self-Employed'
          ? 'Tax returns, financials, ABN and accountant notes'
          : 'Scenario evidence, applicant confirmation and lender checklist',
  name,
  tasks: workflowTaskOverrides[name] ?? baseWorkflowTasks,
}));

const initialGeneratedTasks: GeneratedAssistantTask[] = [
  {
    assignee: 'Loan Processor',
    due: '02/05/2026',
    id: 'initial-request-outstanding-documents',
    priority: 'High',
    sourceWorkflow: 'Outstanding Supporting Documents',
    status: 'Pending',
    title: 'Request Outstanding Documents',
  },
];

const loanNavigationGroups = [
  {
    group: 'Overview',
    items: ['LoanDash', 'Team', 'Lender', 'Related Parties'],
  },
  {
    group: 'Fact Find',
    items: [
      'Goals',
      'Applicants',
      'Dependants',
      'Assets',
      'Other Income',
      'Liabilities',
      'Living Expenses',
      'Financial Security',
    ],
  },
  {
    group: 'Strategy',
    items: [
      'Interview Guide',
      'Security',
      'Funding Position',
      'Products',
      'Smart Docs',
      'BrokerWizard',
    ],
  },
  {
    group: 'Lodgement',
    badge: 'New',
    items: ['Lodgement Funding', 'Credit Proposal', 'Submission'],
  },
];

const workspacePageOptions = loanNavigationGroups.flatMap((group) =>
  group.items.map((item) => ({
    group: group.group,
    name: item,
  })),
);

const brokerAppPageHashPrefix = '#brokerapp-page-';

const keyDates = [
  ['Stage Due', '07/05/2026'],
  ['Credit Guide Due', 'Not sent'],
  ['Settlement Target', 'Not recorded'],
  ['Annual Review', '02/05/2027'],
];

const reportTemplates = [
  '01 Deal Submission Guide',
  '02 Deal Cover Sheet',
  '03 Funding Position Report',
  '04 Loan Submission Advice',
  '05 Formal Approval Advice',
  '06 Ready To Settle Advice',
  '07 Authority To Debit/Credit Form',
  '08 Settlement Advice',
  '09 Deal History Report',
];

const checklistItems = [
  ['Credit guide sent', 'Ready'],
  ['Privacy consent acknowledged', 'Ready'],
  ['Fact-find complete', 'In progress'],
  ['KYC/CDD complete', 'Blocked'],
  ['Serviceability assessed', 'Not started'],
  ['Credit proposal approved', 'Not started'],
];

const loanDoxTemplates = [
  {
    category: 'Compliance',
    description:
      'Credit guide, privacy consent, broker interview acknowledgements and client confirmations.',
    name: 'Credit Guide & Privacy Consent',
    target: 'All applicants',
  },
  {
    category: 'Identity',
    description:
      'Photo ID, Medicare/passport/licence checks and consent for ID verification provider workflows.',
    name: 'KYC identity pack',
    target: 'Each applicant',
  },
  {
    category: 'Income',
    description:
      'Latest payslips, employment contract and salary credits for PAYG applicants.',
    name: 'PAYG income pack',
    target: 'PAYG applicant',
  },
  {
    category: 'Self-employed',
    description:
      'Two years tax returns, financial statements, ABN/GST evidence and accountant contact details.',
    name: 'Self-employed income pack',
    target: 'Self-employed applicant',
  },
  {
    category: 'Bank statements',
    description:
      'Personal, home loan and business statements via manual upload, CashDeck or future Basiq open banking.',
    name: 'Bank statement request',
    target: 'Selected applicant',
  },
];

type LoanDoxRequest = {
  applicant: string;
  method: string;
  status: 'Draft' | 'Requested' | 'Submitted' | 'Accepted' | 'Declined';
  title: string;
};

const loanDoxRequests: LoanDoxRequest[] = [
  {
    applicant: 'Primary Applicant',
    method: 'ClientDash upload',
    status: 'Requested',
    title: 'Credit Guide & Privacy Consent acknowledgement',
  },
  {
    applicant: 'Primary Applicant',
    method: 'Manual upload / CashDeck later',
    status: 'Draft',
    title: 'Latest 2 payslips',
  },
  {
    applicant: 'Co-Applicant 1',
    method: 'Manual upload / Basiq later',
    status: 'Draft',
    title: 'Personal bank statements - 90 days',
  },
];

const loanDoxRules = [
  [
    'Applicant targeting',
    'Every request is scoped to primary applicant, co-applicant, all applicants, household, company, trust or guarantor before it is sent to ClientDash.',
  ],
  [
    'Provider gates',
    'Manual upload is available first. CashDeck, Basiq, Equifax, IDV and AI document review stay disabled until Master Admin enables credentials.',
  ],
  [
    'Submission lock',
    'Client uploads and fact-find submissions lock for broker review; broker changes after submission must create provenance and a timeline event.',
  ],
  [
    'Document stacks',
    'Templates can be stacked by PAYG, self-employed, bank statements, KYC, compliance and lender policy requirements.',
  ],
];

const clientDashSteps = [
  ['Step 1', 'Credit Guide and Privacy Consent', 'Required before fact-find unlock'],
  ['Step 2', 'Fact Find', 'Applicant and shared household information'],
  ['Step 3', 'KYC / IDV', 'Provider-gated identity checks and consent'],
  ['Step 4', 'Documents', 'LoanDox requests and uploads'],
  ['Step 5', 'Bank Statements', 'Manual upload now; CashDeck/Basiq gated later'],
  ['Step 6', 'Review and Confirm', 'All applicants confirm submitted information'],
];

const clientDashRules = [
  [
    'Client access',
    'Client users see only their own application, portal tasks, safe messages and submitted items.',
  ],
  [
    'Broker-only data',
    'AML suspicion, risk scores, broker notes, lender notes and compliance escalations never render in ClientDash.',
  ],
  [
    'Applicant confirmation',
    'Each applicant must confirm their own KYC/CDD, fact-find answers, document uploads and final review before lodgement readiness.',
  ],
  [
    'Shared household',
    'Shared household fields can be completed once, while applicant-specific identity, address history, income and consent remain separate.',
  ],
];

type WorkspaceFieldType =
  | 'text'
  | 'select'
  | 'textarea'
  | 'richText'
  | 'checkbox'
  | 'radio'
  | 'money'
  | 'date'
  | 'table'
  | 'status';

type WorkspaceField = {
  label: string;
  type?: WorkspaceFieldType;
  options?: string[];
  required?: boolean;
  help?: string;
};

type WorkspaceSection = {
  title: string;
  description: string;
  fields: WorkspaceField[];
  actions?: string[];
};

type WorkspacePage = {
  group: string;
  title: string;
  summary: string;
  observedControls: string[];
  sections: WorkspaceSection[];
};

type FactFindAnswerValue = boolean | string;

const field = (
  label: string,
  type: WorkspaceFieldType = 'text',
  options?: string[],
  help?: string,
): WorkspaceField => ({
  label,
  type,
  options,
  required: label.startsWith('*'),
  help,
});

const contactDetailFields = [
  'Last Name',
  'First Name',
  'Preferred Name',
  'Mobile Phone #',
  'Office Phone #',
  'Home Phone #',
  'Fax Phone #',
  'Email',
  'Home Address',
  'Postal Address',
  'Office Address',
  'Spouse',
  'Birth Date',
  'Last Review',
  'Next Review',
  'Review Frequency',
  'Referred By',
  'Lead Source',
  'Roles',
  'Company',
  'Broker',
  'Brand',
  'Tags',
  'Created At',
  'Flex Contact ID',
].map((label) => field(label));

const livingExpenseFields = [
  'Groceries',
  'Clothing and Footwear',
  'Cosmetics',
  'Personal Care',
  'Childcare and Maintenance',
  'Public, Primary and Secondary Education',
  'Private Schooling and Tuition',
  'Higher education, vocational training and professional fees',
  'Home and Contents Insurance',
  'Private Health Insurance',
  'Sickness and Accident Insurance',
  'Life Insurance',
  'Vehicle Insurance',
  'Doctor and Dentist',
  'Optical and Pharmaceutical',
  'Public Transport, Taxis and Ride-sharing',
  'Motor Vehicle Running Costs',
  'Parking and Tolls',
  'Telephone (Mobile and Landline)',
  'Internet',
  'Media Streaming Subscriptions',
  'Dining Out',
  'Recreation and Entertainment',
  'Primary Residence Expenses',
  'Proposed Purchase Non-Primary Residence',
  'Rent Expense',
  'Other Expenses',
  'Frequency',
  'Comments',
].map((label) =>
  field(
    label,
    label === 'Frequency' ? 'select' : label === 'Comments' ? 'textarea' : 'money',
    label === 'Frequency'
      ? ['Weekly', 'Fortnightly', 'Monthly', 'Quarterly', 'Annual']
      : undefined,
  ),
);

const workspacePages: Record<string, WorkspacePage> = {
  LoanDash: {
    group: 'Overview',
    title: 'LoanDash',
    summary:
      'The loan dashboard inside the opportunity. It summarises the stage, loan amount, fact-find progress, recent activity, document stack, KYC/CDD, selected products, funding position and next broker action.',
    observedControls: [
      'Credit Guide & Privacy Consent gate',
      'Deal header stage selector',
      'Show tags',
      'Sync',
      'Link',
      'More actions',
      'Recent Activity search/filter',
      'FinanceVault access summary',
      'Selected Product(s)',
      'Funding Position',
      'Stage Due',
      'Equifax Credit Check Reports',
      'Widget selector',
    ],
    sections: [
      {
        title: 'Deal Snapshot',
        description:
          'At-a-glance values used by the broker before moving through the left-hand loan workflow.',
        fields: [
          field('Deal ID'),
          field('Loan Amount', 'money'),
          field('Stage Due', 'date'),
          field('Finance Date', 'date'),
          field('Settlement Date', 'date'),
          field('Current Stage', 'select', dealStages),
          field('Next Broker Action'),
          field('Last Note', 'textarea'),
        ],
      },
      {
        title: 'Mini Dashboard Widgets',
        description:
          'Widgets stay on the loan dashboard and pull their data from the detailed pages.',
        fields: [
          field('FinanceVault Approved / Pending / Rejected', 'status'),
          field('Primary Applicant contact card', 'status'),
          field('Co-Applicant contact card', 'status'),
          field('Team widget', 'status'),
          field('Lender widget', 'status'),
          field('Related Parties widget', 'status'),
          field('Pending task widget', 'status'),
          field('Credit Guide & Privacy Consent widget', 'status'),
        ],
      },
    ],
  },
  Team: {
    group: 'Overview',
    title: 'Team',
    summary:
      'Internal broker assignment page for broker, processor, team, brand and review settings.',
    observedControls: ['Save', 'Set Broker', 'Broker Details accordion'],
    sections: [
      {
        title: 'Broker Details',
        description: 'Who owns the file and which team handles processing.',
        fields: [
          field('* Broker', 'select', ['Primary broker', 'Assistant broker']),
          field('Loan Processor', 'select', ['Loan Processor', 'Assistant']),
          field('Assigned Team', 'select', ['Residential', 'Commercial', 'Asset Finance']),
          field('Broker Brand', 'select', ['BrokerApp', 'Lend A Loan']),
          field('Funding Template', 'select', ['Residential purchase', 'Refinance']),
        ],
        actions: ['Set Broker', 'Reassign Team', 'Create handover task'],
      },
      {
        title: 'Contact Details and Preferences',
        description:
          'Email/report preferences, branch contact data and review links.',
        fields: [
          field('Broker Email'),
          field('Broker Mobile'),
          field('Report From Email'),
          field('Default reply-to'),
          field('Email and Report Preferences', 'textarea'),
          field('Review Links', 'textarea'),
        ],
      },
      {
        title: 'Review Automation',
        description:
          'Client review schedules that later drive workflow tasks and outbound templates.',
        fields: [
          field('Scheduled Client Reviews', 'select', ['Enabled', 'Paused']),
          field('Fixed Rate Expiry Reviews', 'select', ['Enabled', 'Paused']),
          field('Interest-Only Expiry Reviews', 'select', ['Enabled', 'Paused']),
          field('Client Birthday Reviews', 'select', ['Enabled', 'Paused']),
        ],
      },
    ],
  },
  Lender: {
    group: 'Overview',
    title: 'Lender',
    summary:
      'Selected lender page. Defaults come from Broker Settings > Lenders and can be completed on the deal when missing.',
    observedControls: [
      'Save',
      'Lender accordion',
      'Authority to Debit Available',
      'Copy Address to Clipboard',
    ],
    sections: [
      {
        title: 'Lender',
        description:
          'Core lender reference fields used for lodgement, status tracking and reporting.',
        fields: [
          field('Selected Lender', 'select', ['Other', 'ANZ', 'Westpac', 'NAB', 'CBA']),
          field('Broker Code'),
          field('Lender Reference'),
          field('Authority to Debit Available', 'checkbox'),
          field('Outgoing Lender'),
          field('Outgoing Lender Reference'),
          field('Outgoing Lender Discharge Stage', 'select', [
            'Not started',
            'Requested',
            'In progress',
            'Completed',
          ]),
        ],
      },
      {
        title: 'Lender Contact and Policy',
        description:
          'Operational lender information sourced from lender settings or updated on the deal.',
        fields: [
          field('Lender Notes', 'textarea'),
          field('Lender Contact Details', 'textarea'),
          field('Assessor Details', 'textarea'),
          field('Lender BDM', 'textarea'),
          field('Lender Legal', 'textarea'),
          field('Linked Branch Details', 'textarea'),
          field('Post Settlement Details', 'textarea'),
          field('Business Banker Details', 'textarea'),
          field('Web Tracking', 'textarea'),
          field('Policy Details', 'textarea'),
        ],
      },
      {
        title: 'Special Handling',
        description:
          'Lender instructions that affect document requests, settlement and post approval tasks.',
        fields: [
          field('Construction progress payment process', 'textarea'),
          field('Valuation ordering process', 'textarea'),
          field('Variations process', 'textarea'),
          field('Pricing request process', 'textarea'),
          field('Insurance interested party name', 'textarea'),
          field('Mortgage Documents Return Address', 'textarea'),
          field('First Home Owners Grant address', 'textarea'),
          field('Discharges process', 'textarea'),
          field('Lender Reports', 'textarea'),
        ],
        actions: ['Copy Address to Clipboard', 'Create lender update task'],
      },
    ],
  },
  'Related Parties': {
    group: 'Overview',
    title: 'Related Parties',
    summary:
      'People and companies attached to this opportunity: solicitor, builder, agent, accountant, financial planner, referrer and third parties.',
    observedControls: ['Assign', 'Details accordion', 'Contact Details accordion', 'Addresses accordion'],
    sections: [
      {
        title: 'Solicitor',
        description:
          'Main legal representative for purchase/refinance settlement and document exchange.',
        fields: [
          field('Title', 'select', ['Mr', 'Mrs', 'Ms', 'Miss', 'Mx', 'Dr']),
          field('* First Name'),
          field('* Last Name'),
          field('Preferred Name'),
          field('Company', 'select', ['Existing company', 'New company']),
          field('Mobile'),
          field('Email'),
          field('Office Address', 'textarea'),
        ],
        actions: ['Assign', 'Create related contact'],
      },
      {
        title: 'Other Related Parties',
        description:
          'Contacts are reusable people/company records but shown in this deal by role.',
        fields: [
          field('Builder Full Name'),
          field('Builder Company'),
          field('Builder Mobile'),
          field('Builder Email'),
          field('Agent Full Name'),
          field('Agent Company'),
          field('Agent Mobile'),
          field('Agent Email'),
          field('Financial Planner Full Name'),
          field('Accountant Full Name'),
          field('Buyers Agent Full Name'),
          field('Third Party Full Name'),
          field('Referrer'),
          field('Referrer Manager'),
        ],
      },
      {
        title: 'Contact Detail Model',
        description:
          'Every related party can expose the same BrokerApp contact fields.',
        fields: contactDetailFields,
      },
    ],
  },
  Goals: {
    group: 'Fact Find',
    title: 'Goals',
    summary:
      'Fact-find requirements and objectives. Desired loan features feed product search and credit proposal reasoning.',
    observedControls: [
      'Show page in client view',
      'Lock/unlock',
      'Email or Download Fact Find',
      'Rich text requirements editor',
    ],
    sections: [
      {
        title: 'Loan Purpose and Preferences',
        description:
          'Broker and client-facing requirements captured before product selection.',
        fields: [
          field('Primary Loan Purpose', 'select', ['Purchase', 'Refinance', 'Construction', 'Equity release', 'Debt consolidation']),
          field('Additional loan purpose(s) (optional)', 'textarea'),
          field('Property Purpose', 'select', ['Owner occupied', 'Investment', 'Mixed purpose']),
          field('Preferred Repayment Types', 'select', ['Principal and Interest', 'Interest Only', 'Split']),
          field('Preferred Loan Type', 'select', ['Variable', 'Fixed', 'Split', 'Line of Credit']),
          field('* Requirements and Objectives', 'richText'),
          field('Lender Preference', 'select', ['No preference', 'Use preferred lender', 'Avoid specific lenders']),
          field('Lender(s) preferred NOT to use', 'textarea'),
          field('Other Requirements', 'textarea'),
        ],
      },
      {
        title: 'Other Loan Feature(s)',
        description:
          'Feature tags used by product-search filters and credit proposal comparison.',
        fields: [
          field('Good online banking experience', 'checkbox'),
          field('Additional Repayments', 'checkbox'),
          field('No Monthly or Annual Fees', 'checkbox'),
          field('Redraw', 'checkbox'),
          field('Portability', 'checkbox'),
          field('Line of Credit', 'checkbox'),
          field('Interest Capitalisation', 'checkbox'),
          field('Branch Access', 'checkbox'),
          field('Offset Account', 'checkbox'),
        ],
      },
    ],
  },
  Applicants: {
    group: 'Fact Find',
    title: 'Applicants',
    summary:
      'Applicant details with conditional expansion up to four residential applicants. This page maps contacts into primary/co-applicant roles.',
    observedControls: ['Add applicant', 'Show actions', 'Personal Details', 'Address History', 'Equifax Reports'],
    sections: [
      {
        title: 'Applicant Setup',
        description:
          'Controls which applicant cards appear in fact find, client portal and lodgement payloads.',
        fields: [
          field('Applicant Count', 'status', undefined, 'Use the plus button above the applicant tabs'),
          field('* Applicant Type', 'select', ['Individual', 'Company', 'Trust', 'Sole Trader']),
          field('* Applicant Role', 'select', ['Primary Applicant', 'Co-Applicant 1', 'Co-Applicant 2', 'Co-Applicant 3']),
          field('Contact Role', 'select', ['Applicant', 'Guarantor', 'Director', 'Trustee', 'Beneficial Owner']),
        ],
        actions: ['Add Applicant', 'Copy from contact', 'Run duplicate check'],
      },
      {
        title: 'Personal Details',
        description:
          'Core customer fields aligned to LIXI/CAL style applicant identity records.',
        fields: [
          field('* Title', 'select', ['Mr', 'Mrs', 'Ms', 'Miss', 'Mx', 'Dr']),
          field('* First Name'),
          field('Middle Name'),
          field('* Last Name'),
          field('Preferred Name'),
          field("Mother's Maiden Name"),
          field('Other Name'),
          field('Company'),
          field('* Date of Birth', 'date'),
          field('Age (Years)', 'status'),
          field('* Gender', 'select', ['Male', 'Female', 'Non-binary', 'Prefer not to say']),
          field('* Marital Status', 'select', ['Single', 'Married', 'De facto', 'Separated', 'Divorced', 'Widowed']),
          field('Citizenship', 'select', ['Australian Citizen', 'Permanent Resident', 'Temporary Resident', 'Other']),
          field('* Email'),
          field('Secondary Email'),
          field('Country code'),
          field('National number'),
        ],
      },
      {
        title: 'Business and ABR Lookup',
        description:
          'Official ABN Lookup-prefill for self-employed, sole trader, company and trust applicants. Live lookup stays disabled until the ABN Lookup GUID is configured in Broker Settings.',
        fields: [
          field('ABN'),
          field('ACN'),
          field('Business Name'),
          field('Entity Name'),
          field('Entity Type', 'select', [
            'Individual/Sole Trader',
            'Company',
            'Trust',
            'Partnership',
            'Other',
          ]),
          field('ABN Status', 'status', undefined, 'Provider not configured'),
          field('GST Registered From', 'date'),
          field('Business State', 'select', [
            'ACT',
            'NSW',
            'NT',
            'QLD',
            'SA',
            'TAS',
            'VIC',
            'WA',
          ]),
          field('Business Postcode'),
          field('ABR Lookup Evidence', 'status', undefined, 'Manual entry allowed'),
        ],
        actions: [
          'Verify ABN/ACN',
          'Search Business Name',
          'Mark manual business verification',
        ],
      },
      {
        title: 'Current Address and KYC',
        description:
          'Address history supports lender CDD/KYC, credit checks and non-face-to-face process rules.',
        fields: [
          field('* Start Date', 'date'),
          field('Current Address Tenure', 'select', ['3+ years', 'Less than 3 years']),
          field('Residential Status', 'select', ['Own home', 'Renting', 'Boarding', 'Living with family', 'Other']),
          field('Address Lookup'),
          field('Unit Number'),
          field('Street Number'),
          field('Street Name'),
          field('Street Type', 'select', ['Street', 'Road', 'Avenue', 'Drive', 'Court', 'Crescent', 'Place', 'Parade', 'Lane', 'Highway', 'Terrace', 'Way']),
          field('Street Suffix'),
          field('Suburb'),
          field('State', 'select', ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA']),
          field('Postcode'),
          field('Country', 'select', ['Australia', 'New Zealand', 'Other']),
          field('Enter Address Manually', 'textarea'),
          field('Equifax Reports', 'status'),
          field('IDV/KYC Status', 'status'),
          field('Open Banking Consent', 'status'),
        ],
      },
      {
        title: 'Previous Address History',
        description:
          'Required when the applicant has been at the current residential address for less than 3 years.',
        fields: [
          field('Previous Address 1 Start Date', 'date'),
          field('Previous Address 1 End Date', 'date'),
          field('Previous Address 1 Lookup'),
          field('Previous Address 1 Manual Address', 'textarea'),
          field('Previous Address 2 Start Date', 'date'),
          field('Previous Address 2 End Date', 'date'),
          field('Previous Address 2 Lookup'),
          field('Previous Address 2 Manual Address', 'textarea'),
          field('3 year address history complete', 'status'),
        ],
        actions: ['Add Previous Address', 'Validate 3 Year Address History'],
      },
    ],
  },
  Dependants: {
    group: 'Fact Find',
    title: 'Dependants',
    summary:
      'Household dependants and expense impact used for serviceability and lender policy checks.',
    observedControls: ['Dependants accordion', 'Applicant household accordion', 'Yes/No radio'],
    sections: [
      {
        title: 'Household Dependants',
        description:
          'Conditional dependants section per applicant household.',
        fields: [
          field('Does this household have dependants?', 'radio', ['Yes', 'No']),
          field('Number of dependants', 'select', ['0', '1', '2', '3', '4', '5+']),
          field('Dependant name'),
          field('Dependant age'),
          field('Relationship', 'select', ['Child', 'Parent', 'Other']),
          field('Expense notes', 'textarea'),
        ],
      },
    ],
  },
  Assets: {
    group: 'Fact Find',
    title: 'Assets',
    summary:
      'Applicant assets used for balance sheet, funds to complete, LVR and fallback buffers.',
    observedControls: ['Lock/unlock', 'Email or Download Fact Find', 'Applicant ownership groups'],
    sections: [
      {
        title: 'Asset Register',
        description: 'Repeatable asset rows mapped to applicant ownership.',
        fields: [
          field('Asset Type', 'select', ['Savings', 'Property', 'Vehicle', 'Shares', 'Superannuation', 'Home contents', 'Other']),
          field('Owner', 'select', ['Primary Applicant', 'Co-Applicant 1', 'Joint']),
          field('Description'),
          field('Estimated Value', 'money'),
          field('Amount Owing', 'money'),
          field('Evidence Required', 'checkbox'),
          field('Evidence Status', 'select', ['Not requested', 'Requested', 'Received', 'Verified']),
        ],
        actions: ['Add asset', 'Request evidence'],
      },
    ],
  },
  'Other Income': {
    group: 'Fact Find',
    title: 'Other Income',
    summary:
      'Conditional fact-find page for non-employment income. Yes answers open repeatable income rows and evidence requests.',
    observedControls: ['Other Income accordion', 'Yes/No radio', 'Autosync with client view'],
    sections: [
      {
        title: 'Other Income Question',
        description:
          'Matches the client-view question and controls whether more fields open.',
        fields: [
          field('Do any applicants have other income sources?', 'radio', ['Yes', 'No']),
          field('Validation/help message', 'status'),
        ],
      },
      {
        title: 'Income Sources',
        description:
          'Income categories that later feed serviceability shading and lender policy checks.',
        fields: [
          field('Applicant', 'select', ['Primary Applicant', 'Co-Applicant 1', 'Co-Applicant 2', 'Co-Applicant 3']),
          field('Income Type', 'select', ['Rental income', 'Child support', 'Centrelink', 'Family tax benefit', 'Maintenance', 'Pension', 'Dividends', 'Interest', 'Boarder income', 'Other']),
          field('Gross Amount', 'money'),
          field('Frequency', 'select', ['Weekly', 'Fortnightly', 'Monthly', 'Annual']),
          field('Lender shading policy', 'textarea'),
          field('Evidence status', 'select', ['Not requested', 'Requested', 'Received', 'Verified']),
        ],
        actions: ['Add income source', 'Request evidence'],
      },
    ],
  },
  Liabilities: {
    group: 'Fact Find',
    title: 'Liabilities',
    summary:
      'Existing debts, credit limits, repayments and refinance/discharge treatment for serviceability.',
    observedControls: ['Liability accordions', 'Loan/credit card/personal loan categories'],
    sections: [
      {
        title: 'Liability Register',
        description:
          'Repeatable liability rows used by serviceability calculators and credit proposal comparison.',
        fields: [
          field('Liability Type', 'select', ['Home Loan', 'Investment Loan', 'Personal Loan', 'Car Loan', 'Credit Card', 'BNPL', 'HECS/HELP', 'Tax debt', 'Other']),
          field('Financial Institution'),
          field('Account/Reference'),
          field('Limit', 'money'),
          field('Balance', 'money'),
          field('Repayment Amount', 'money'),
          field('Repayment Frequency', 'select', ['Weekly', 'Fortnightly', 'Monthly', 'Annual']),
          field('To be refinanced or closed?', 'select', ['No', 'Yes - refinance', 'Yes - close before settlement']),
          field('Evidence status', 'select', ['Not requested', 'Requested', 'Received', 'Verified']),
        ],
        actions: ['Add liability', 'Create discharge task'],
      },
    ],
  },
  'Living Expenses': {
    group: 'Fact Find',
    title: 'Living Expenses',
    summary:
      'Broker-view living expenses grouped like the client fact-find. Zero values still require review comments where lender policy needs it.',
    observedControls: ['Expense category accordions', 'Frequency dropdowns', 'Comments fields'],
    sections: [
      {
        title: 'Monthly Living Expense Categories',
        description:
          'HEM-style expense capture with comments and frequency controls.',
        fields: livingExpenseFields,
      },
    ],
  },
  'Financial Security': {
    group: 'Fact Find',
    title: 'Financial Security',
    summary:
      'Financial resilience, foreseeable changes and declaration page used for responsible lending and compliance review.',
    observedControls: ['Declaration', 'Yes/No radio', 'Disabled acknowledgement checkbox'],
    sections: [
      {
        title: 'Financial Security Questions',
        description:
          'Risk-management questions that support broker notes and credit proposal disclosures.',
        fields: [
          field('Could income reduce or employment change?', 'radio', ['Yes', 'No']),
          field('Is there a repayment buffer?', 'radio', ['Yes', 'No']),
          field('Insurance held', 'select', ['None', 'Life', 'TPD', 'Income Protection', 'Trauma', 'Multiple']),
          field('Exit strategy', 'textarea'),
          field('Known hardship risks', 'textarea'),
          field('Declaration acknowledged', 'checkbox'),
        ],
      },
    ],
  },
  'Interview Guide': {
    group: 'Strategy',
    title: 'Interview Guide',
    summary:
      'Structured broker interview for goals, needs, objectives, risks, product fit and file notes.',
    observedControls: ['Interview notes', 'Question sections', 'Broker-only notes'],
    sections: [
      {
        title: 'Interview Prompts',
        description:
          'A guided interview that links fact-find answers to product and policy decisions.',
        fields: [
          field('Customer situation summary', 'textarea'),
          field('What is the client trying to achieve?', 'textarea'),
          field('What features matter most?', 'textarea'),
          field('What risks or foreseeable changes were discussed?', 'textarea'),
          field('Why is credit suitable?', 'textarea'),
          field('Broker file note', 'richText'),
        ],
      },
    ],
  },
  Security: {
    group: 'Strategy',
    title: 'Security',
    summary:
      'Security properties, valuations and ownership details for collateral and LVR calculation.',
    observedControls: ['Loan/Client toggle', '# Address Usage Value Default Remove table'],
    sections: [
      {
        title: 'Security Properties',
        description:
          'Repeatable property securities linked to loan requirements and valuations.',
        fields: [
          field('Security Scope', 'radio', ['Loan', 'Client']),
          field('#', 'status'),
          field('Address', 'textarea'),
          field('Usage', 'select', ['Owner Occupied', 'Investment', 'Vacant Land', 'Construction']),
          field('Value', 'money'),
          field('Default Security', 'checkbox'),
          field('Remove', 'checkbox'),
          field('Valuation Status', 'select', ['Not ordered', 'Ordered', 'Received', 'Expired']),
        ],
        actions: ['Add security', 'Order valuation'],
      },
    ],
  },
  'Funding Position': {
    group: 'Strategy',
    title: 'Funding Position',
    summary:
      'Funds to complete, loan splits, fees, grants and funding diagram before lodgement.',
    observedControls: ['Import Funding Position', 'New Funding Position', 'Funding Diagram', 'Calculator buttons'],
    sections: [
      {
        title: 'Funding Position Detail',
        description:
          'Purchase/refinance funding calculations and loan split setup.',
        fields: [
          field('* Deal Type', 'select', ['Purchase', 'Refinance', 'Construction', 'Equity release']),
          field('Fee Frequency', 'select', ['Upfront', 'Monthly', 'Annual']),
          field('Fee', 'money'),
          field('Loan Purpose', 'select', ['Owner occupied', 'Investment', 'Business', 'Mixed']),
          field('Valuation', 'money'),
          field('Purchase Price', 'money'),
          field('Deposit', 'money'),
          field('Stamp Duty', 'money'),
          field('Mortgage Registration Fee', 'money'),
          field('Transfer Fee', 'money'),
          field('Base Loan', 'money'),
          field('Government Grant', 'money'),
          field('Post Cap LVR', 'status'),
        ],
        actions: ['Import Funding Position', 'Show Details', 'Funding Diagram'],
      },
      {
        title: 'Loan Splits',
        description:
          'Split structure that later maps to ApplyOnline/AFG Flex payloads.',
        fields: [
          field('Loan Split Name'),
          field('Loan Type', 'select', ['Variable', 'Fixed', 'Split', 'Line of Credit']),
          field('Repayment Type', 'select', ['Principal and Interest', 'Interest Only']),
          field('Split Amount', 'money'),
          field('Fixed Period', 'select', ['N/A', '1 year', '2 years', '3 years', '5 years']),
          field('Offset required', 'checkbox'),
        ],
        actions: ['Calculate Loan Splits', 'Remove split'],
      },
    ],
  },
  Products: {
    group: 'Strategy',
    title: 'Products',
    summary:
      'Product research and comparison tool using lender product imports, desired features, policy fit and serviceability result.',
    observedControls: ['Selected Product(s)', 'Product filters', 'Comparison shortlist'],
    sections: [
      {
        title: 'Product Search Filters',
        description:
          'Filter lender products from approved product matrices and client objectives.',
        fields: [
          field('Lender', 'select', ['Any', 'ANZ', 'Westpac', 'NAB', 'CBA', 'AFG Panel']),
          field('Product category', 'select', ['Residential', 'Construction', 'Investment', 'Refinance', 'Asset Finance', 'Commercial']),
          field('Repayment type', 'select', ['P&I', 'Interest Only', 'Split']),
          field('Rate type', 'select', ['Variable', 'Fixed', 'Split']),
          field('Offset Account', 'checkbox'),
          field('Redraw', 'checkbox'),
          field('No Monthly or Annual Fees', 'checkbox'),
          field('LVR range', 'select', ['<=60%', '<=70%', '<=80%', '<=90%', '<=95%']),
          field('Policy notes from opportunity', 'textarea'),
        ],
        actions: ['Run product search', 'Import product matrix'],
      },
      {
        title: 'Shortlist and Reason Codes',
        description:
          'Products compared, why included/excluded, and why the recommended product was chosen.',
        fields: [
          field('Shortlisted Product', 'select', ['Product A', 'Product B', 'Product C']),
          field('Comparison reason', 'textarea'),
          field('Policy fit result', 'select', ['Meets policy', 'Needs exception', 'Does not meet policy']),
          field('Serviceability result', 'select', ['Pass', 'Fail', 'Manual review']),
          field('Recommended product rationale', 'richText'),
        ],
      },
    ],
  },
  'Smart Docs': {
    group: 'Strategy',
    title: 'Smart Docs',
    summary:
      'Document generation workspace for credit guide, privacy consent, proposals and lender-ready reports.',
    observedControls: ['Create', 'Smart Docs empty state', 'Template link'],
    sections: [
      {
        title: 'Smart Document Library',
        description:
          'Template-driven documents using merge variables and approval status.',
        fields: [
          field('Document Type', 'select', ['Credit Guide', 'Privacy Consent', 'Credit Proposal', 'Submission Guide', 'Formal Approval Advice', 'Settlement Advice']),
          field('Template', 'select', ['Residential default', 'Refinance default', 'Construction default']),
          field('Merge status', 'select', ['Ready', 'Missing data', 'Needs review']),
          field('Approval status', 'select', ['Draft', 'Approved', 'Sent', 'Acknowledged']),
          field('Generated document link'),
        ],
        actions: ['Create', 'Preview', 'Send for acknowledgement'],
      },
    ],
  },
  BrokerWizard: {
    group: 'Strategy',
    title: 'BrokerWizard',
    summary:
      'Guided broker workflow for complex scenarios and lender-specific readiness checks.',
    observedControls: ['Previous', 'Next', 'Scenario wizard'],
    sections: [
      {
        title: 'Wizard Steps',
        description:
          'Step-by-step scenario prompts that generate tasks, checklists and file notes.',
        fields: [
          field('Scenario', 'select', brokerWorkflowTemplates.map(({ name }) => name)),
          field('Current Step'),
          field('Answer', 'textarea'),
          field('Required evidence', 'textarea'),
          field('Generated tasks', 'status'),
        ],
        actions: ['Previous', 'Next', 'Create checklist gates'],
      },
    ],
  },
  'Lodgement Funding': {
    group: 'Lodgement',
    title: 'Lodgement Funding',
    summary:
      'Final funding readiness before submission. Uses Funding Position, products, security and lender settings.',
    observedControls: ['Lodgement funding status', 'Funding position import'],
    sections: [
      {
        title: 'Lodgement Funding Readiness',
        description:
          'Checks that funds to complete, loan splits and settlement figures are ready for ApplyOnline/AFG Flex.',
        fields: [
          field('Funding Position selected', 'select', ['Current funding position', 'New funding position']),
          field('Funds to complete balanced', 'status'),
          field('Loan splits balanced', 'status'),
          field('Security linked', 'status'),
          field('Lender fees verified', 'status'),
          field('Settlement amount confirmed', 'money'),
          field('Readiness notes', 'textarea'),
        ],
        actions: ['Validate funding', 'Create missing data tasks'],
      },
    ],
  },
  'Credit Proposal': {
    group: 'Lodgement',
    title: 'Credit Proposal',
    summary:
      'Compliance proposal showing products compared, recommendation, reason codes, BID rationale and client acknowledgement.',
    observedControls: ['Introducing Credit Proposal', "Don't show this again"],
    sections: [
      {
        title: 'Proposal Content',
        description:
          'The broker’s recommendation and comparison evidence before client acceptance.',
        fields: [
          field('Client requirements and objectives summary', 'richText'),
          field('Lenders compared', 'textarea'),
          field('Products compared', 'textarea'),
          field('Recommended lender and product'),
          field('Why this product was chosen', 'richText'),
          field('Why alternatives were not chosen', 'richText'),
          field('Policy fit confirmation', 'textarea'),
          field('Best interests duty rationale', 'richText'),
          field('Client acknowledgement status', 'select', ['Not sent', 'Sent', 'Acknowledged']),
        ],
        actions: ['Generate Credit Proposal', 'Send to client', 'Record acknowledgement'],
      },
    ],
  },
  Submission: {
    group: 'Lodgement',
    title: 'Submission',
    summary:
      'Submission tracker and future ApplyOnline/AFG Flex gateway. Disabled until required pre-submission gates are complete.',
    observedControls: ['Submit Application disabled', 'Application Tracker', 'Progress', 'Back Channel Messages'],
    sections: [
      {
        title: 'Submission Readiness',
        description:
          'Pre-submit validation for goals, applicants, fact-find, CDD/KYC, product selection and credit proposal.',
        fields: [
          field('Goals ready', 'status'),
          field('Applicants ready', 'status'),
          field('Fact Find complete', 'status'),
          field('KYC/CDD complete', 'status'),
          field('Serviceability pass', 'status'),
          field('Credit Proposal acknowledged', 'status'),
          field('Integration provider', 'select', ['ApplyOnline', 'AFG Flex', 'BrokerEngine API', 'Manual']),
          field('Submit Application', 'status'),
        ],
        actions: ['Validate submission package', 'Submit Application'],
      },
      {
        title: 'Application Tracker and Back Channel Messages',
        description:
          'Lodgement status events from gateway/lender integrations.',
        fields: [
          field('Sent to Gateway Date', 'date'),
          field('Lender Reference'),
          field('Message Date', 'date'),
          field('Status', 'select', ['Sent', 'Received', 'AIP', 'Conditional', 'Formal Approval', 'Settlement']),
          field('Message', 'textarea'),
          field('Previous Status'),
        ],
        actions: ['Load More', 'Sync Back Channel'],
      },
    ],
  },
};

const styles = {
  shell: {
    background: 'var(--t-background-secondary, #fafafa)',
    color: 'var(--t-font-color-primary, #333333)',
    display: 'flex',
    flex: 1,
    flexDirection: 'column' as const,
    fontFamily: 'var(--t-font-family, Inter, sans-serif)',
    height: '100%',
    minHeight: 'auto',
    overflow: 'hidden',
    padding: '0',
    position: 'relative' as const,
  },
  workspaceInline: {
    background: 'var(--t-background-secondary, #fafafa)',
    borderLeft: '1px solid var(--t-border-color-light, #f1f1f1)',
    bottom: 0,
    boxSizing: 'border-box' as const,
    color: 'var(--t-font-color-primary, #333333)',
    display: 'flex',
    flexDirection: 'column' as const,
    fontFamily: 'var(--t-font-family, Inter, sans-serif)',
    height: 'calc(100dvh - 48px)',
    isolation: 'isolate' as const,
    left: 'var(--navigation-drawer-width, 72px)',
    minHeight: 'calc(100vh - 48px)',
    overflow: 'hidden',
    position: 'fixed' as const,
    right: 0,
    top: '48px',
    transition:
      'left 140ms ease, width 140ms ease, transform 140ms ease',
    width: '100%',
    zIndex: 80,
  },
  overlayScrim: {
    background: 'transparent',
    bottom: 'auto',
    boxSizing: 'border-box' as const,
    left: 0,
    padding: 0,
    position: 'relative' as const,
    right: 'auto',
    top: 'auto',
    zIndex: 1,
  },
  workspaceModal: {
    background: 'var(--t-background-primary, #ffffff)',
    border: 0,
    borderRadius: 0,
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    overflow: 'hidden',
  },
  workspaceToolbar: {
    alignItems: 'center',
    background: 'var(--t-background-primary, #ffffff)',
    borderBottom: '1px solid var(--t-border-color-medium, #ebebeb)',
    display: 'grid',
    gap: '10px',
    gridTemplateColumns: 'auto minmax(0, 1fr) auto',
    minHeight: '48px',
    padding: '8px 16px',
  },
  toolbarLeft: {
    alignItems: 'center',
    display: 'flex',
    gap: '8px',
    minWidth: 0,
  },
  toolbarTitle: {
    color: 'var(--t-font-color-primary, #333333)',
    fontSize: 'var(--t-font-size-xs, 0.85rem)',
    fontWeight: 700,
    lineHeight: 1.3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  toolbarContext: {
    alignItems: 'center',
    display: 'flex',
    gap: '6px',
    minWidth: 0,
    overflowX: 'auto' as const,
  },
  toolbarTabs: {
    alignItems: 'center',
    display: 'flex',
    gap: '2px',
    minWidth: 0,
    overflowX: 'auto' as const,
  },
  toolbarTab: {
    alignItems: 'center',
    background: 'transparent',
    border: '0',
    borderBottom: '2px solid transparent',
    color: 'var(--t-font-color-secondary, #666666)',
    cursor: 'pointer',
    display: 'inline-flex',
    fontSize: 'var(--t-font-size-xs, 0.85rem)',
    fontWeight: 600,
    gap: '6px',
    height: '48px',
    padding: '0 10px',
    whiteSpace: 'nowrap',
  },
  toolbarTabActive: {
    borderBottom: '2px solid var(--t-font-color-primary, #333333)',
    color: 'var(--t-font-color-primary, #333333)',
  },
  toolbarActions: {
    alignItems: 'center',
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end',
    minWidth: 0,
  },
  workspaceRail: {
    background: 'var(--t-background-secondary, #fafafa)',
    borderRight: '1px solid var(--t-border-color-medium, #ebebeb)',
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: 0,
    overflow: 'hidden',
  },
  workspaceRailCollapsed: {
    alignItems: 'center',
  },
  workspaceRailBody: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column' as const,
    gap: '12px',
    minHeight: 0,
    overflow: 'auto',
    padding: '10px',
  },
  workspaceRailHeader: {
    alignItems: 'center',
    borderBottom: '1px solid var(--t-border-color-light, #f1f1f1)',
    display: 'flex',
    gap: '8px',
    justifyContent: 'space-between',
    minHeight: '44px',
    padding: '8px 10px',
  },
  workspaceRailSection: {
    display: 'grid',
    gap: '4px',
  },
  workspaceRailSectionTitle: {
    color: 'var(--t-font-color-secondary, #666666)',
    fontSize: '11px',
    fontWeight: 700,
    padding: '8px 8px 4px',
    textTransform: 'uppercase' as const,
  },
  workspaceRailButton: {
    alignItems: 'center',
    background: 'transparent',
    border: '1px solid transparent',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    color: 'var(--t-font-color-secondary, #666666)',
    cursor: 'pointer',
    display: 'grid',
    fontSize: '13px',
    fontWeight: 600,
    gap: '8px',
    gridTemplateColumns: '24px minmax(0, 1fr)',
    minHeight: '36px',
    padding: '0 8px',
    textAlign: 'left' as const,
    width: '100%',
  },
  workspaceRailButtonCollapsed: {
    gridTemplateColumns: '24px',
    justifyContent: 'center',
    padding: '0',
    width: '40px',
  },
  workspaceRailButtonActive: {
    background: 'var(--t-background-tertiary, #f1f1f1)',
    color: 'var(--t-font-color-primary, #333333)',
  },
  railDivider: {
    borderTop: '1px solid var(--t-border-color-light, #f1f1f1)',
    margin: '4px 0',
  },
  closeButton: {
    background: 'var(--t-background-primary-inverted, #333333)',
    border: '1px solid var(--t-border-color-inverted, #333333)',
    borderRadius: 'var(--t-border-radius-sm, 4px)',
    color: 'var(--t-font-color-inverted, #ffffff)',
    fontSize: 'var(--t-font-size-xs, 0.85rem)',
    fontWeight: 700,
    minHeight: '32px',
    padding: '0 12px',
  },
  reopenButton: {
    background: 'var(--t-background-primary-inverted, #333333)',
    border: '1px solid var(--t-border-color-inverted, #333333)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    bottom: '18px',
    boxShadow: '0 12px 36px rgba(15, 23, 42, 0.22)',
    color: 'var(--t-font-color-inverted, #ffffff)',
    fontSize: 'var(--t-font-size-sm, 0.95rem)',
    fontWeight: 700,
    left: '56px',
    minHeight: '40px',
    padding: '0 14px',
    position: 'fixed' as const,
    zIndex: 2147480000,
  },
  topbar: {
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    borderBottom: '1px solid #e5e8ee',
    background: '#ffffff',
    padding: '0 14px',
  },
  topbarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    minWidth: 0,
  },
  newButton: {
    background: 'var(--t-background-primary-inverted, #333333)',
    border: '1px solid var(--t-border-color-inverted, #333333)',
    color: 'var(--t-font-color-inverted, #ffffff)',
    borderRadius: 'var(--t-border-radius-sm, 4px)',
    fontSize: 'var(--t-font-size-xs, 0.85rem)',
    fontWeight: 600,
    padding: '7px 13px',
  },
  countText: {
    fontWeight: 700,
    fontSize: '13px',
    whiteSpace: 'nowrap',
  },
  search: {
    width: '220px',
    height: '28px',
    border: '1px solid #d8dce4',
    borderRadius: '4px',
    padding: '0 10px',
    color: '#727986',
    background: '#ffffff',
  },
  iconButton: {
    minWidth: '30px',
    height: '30px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-sm, 4px)',
    background: 'var(--t-background-primary, #ffffff)',
    color: 'var(--t-font-color-secondary, #666666)',
    fontWeight: 600,
    padding: '0 8px',
  },
  canvas: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 332px',
    gap: '12px',
    padding: '12px',
  },
  boardWrap: {
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    overflow: 'hidden',
  },
  boardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 12px',
    borderBottom: '1px solid var(--t-border-color-light, #f1f1f1)',
  },
  board: {
    display: 'flex',
    alignItems: 'stretch',
    gap: '8px',
    overflowX: 'auto' as const,
    minHeight: '520px',
    padding: '8px',
  },
  column: {
    width: '255px',
    minWidth: '255px',
    background: 'var(--t-background-tertiary, #f1f1f1)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    padding: '8px',
  },
  collapsedColumn: {
    width: '42px',
    minWidth: '42px',
    background: 'var(--t-background-tertiary, #f1f1f1)',
    border: '1px solid transparent',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    color: 'var(--t-font-color-secondary, #666666)',
    cursor: 'pointer',
    padding: '8px 4px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  verticalText: {
    writingMode: 'vertical-rl' as const,
    transform: 'rotate(180deg)',
    fontWeight: 700,
    fontSize: '12px',
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
  },
  columnTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
    fontSize: '13px',
    fontWeight: 800,
  },
  small: {
    color: 'var(--t-font-color-secondary, #666666)',
    fontSize: 'var(--t-font-size-xs, 0.85rem)',
    lineHeight: 1.45,
  },
  card: {
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    boxShadow: 'var(--t-box-shadow-light, 0 1px 2px rgba(0, 0, 0, 0.04))',
    marginTop: '8px',
    padding: '9px',
  },
  cardTitle: {
    color: 'var(--t-font-color-primary, #333333)',
    fontWeight: 600,
    fontSize: 'var(--t-font-size-xs, 0.85rem)',
    lineHeight: 1.25,
  },
  bars: {
    display: 'flex',
    gap: '5px',
    marginBottom: '6px',
  },
  barRed: {
    width: '26px',
    height: '6px',
    background: '#d6182d',
    borderRadius: '8px',
  },
  barLime: {
    width: '26px',
    height: '6px',
    background: '#c6ec59',
    borderRadius: '8px',
  },
  dots: {
    color: '#e51d35',
    letterSpacing: '2px',
    fontWeight: 900,
    margin: '3px 0 6px',
  },
  pillRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '4px',
    marginTop: '6px',
  },
  pill: {
    borderRadius: '4px',
    background: '#788391',
    color: '#ffffff',
    textAlign: 'center' as const,
    padding: '4px 3px',
    fontSize: '11px',
    fontWeight: 800,
  },
  pillHot: {
    borderRadius: '4px',
    background: '#ff5f46',
    color: '#ffffff',
    textAlign: 'center' as const,
    padding: '4px 3px',
    fontSize: '11px',
    fontWeight: 800,
  },
  panelGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: '16px',
    marginTop: '20px',
  },
  panel: {
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    lineHeight: 1.45,
    padding: '16px',
  },
  tabRow: {
    display: 'flex',
    gap: '6px',
    borderBottom: '1px solid #e5e8ee',
    padding: '8px 8px 0',
    background: '#ffffff',
  },
  tab: {
    border: '1px solid #dce1e8',
    borderBottom: '0',
    borderRadius: '6px 6px 0 0',
    background: '#f7f8fa',
    padding: '8px 11px',
    fontSize: '13px',
    fontWeight: 800,
  },
  activeTab: {
    border: '1px solid #dce1e8',
    borderBottom: '0',
    borderRadius: '6px 6px 0 0',
    background: '#ffffff',
    padding: '8px 11px',
    fontSize: '13px',
    fontWeight: 800,
    color: '#0e7450',
  },
  workspaceBody: {
    padding: '12px',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
    gap: '12px',
  },
  sectionList: {
    display: 'grid',
    gap: '8px',
  },
  sectionItem: {
    display: 'grid',
    gridTemplateColumns: '150px minmax(0, 1fr)',
    gap: '8px',
    border: '1px solid #e6e9ef',
    borderRadius: '5px',
    padding: '8px',
    background: '#ffffff',
  },
  rail: {
    background: '#ffffff',
    border: '1px solid #e2e6ed',
    borderRadius: '6px',
    overflow: 'hidden',
  },
  railHeader: {
    padding: '12px',
    borderBottom: '1px solid #e5e8ee',
    background: '#ffffff',
  },
  railTool: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #edf0f4',
    padding: '10px 12px',
  },
  statusOk: {
    color: 'var(--t-color-green, #16825d)',
    fontWeight: 800,
  },
  statusWarn: {
    color: 'var(--t-color-orange, #b66f00)',
    fontWeight: 800,
  },
  statusBlock: {
    color: 'var(--t-color-red, #c4312d)',
    fontWeight: 800,
  },
  gate: {
    margin: '12px',
    border: '1px solid #f0c44c',
    background: '#fff8df',
    borderRadius: '6px',
    padding: '10px',
  },
  opportunityShell: {
    display: 'grid',
    gridTemplateColumns: '228px 8px minmax(0, 1fr) 8px 560px',
    height: '100%',
    minHeight: '100%',
    minWidth: 0,
    overflow: 'hidden',
    transition: 'grid-template-columns 140ms ease',
  },
  resizeHandle: {
    alignItems: 'stretch',
    background: 'var(--t-background-secondary, #fafafa)',
    border: '0',
    cursor: 'col-resize',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100%',
    padding: 0,
    position: 'relative' as const,
    width: '8px',
  },
  resizeHandleHidden: {
    display: 'none',
  },
  resizeHandleActive: {
    background: 'var(--t-accent-quaternary, #f7f8ff)',
  },
  resizeHandleGrip: {
    background: 'var(--t-border-color-medium, #ebebeb)',
    borderRadius: '999px',
    height: '100%',
    width: '1px',
  },
  toolDrawerPanel: {
    background: 'var(--t-background-primary, #ffffff)',
    borderLeft: '1px solid var(--t-border-color-medium, #ebebeb)',
    minHeight: 0,
    maxHeight: '100%',
    overflow: 'auto',
  },
  loanSidebar: {
    background: 'var(--t-background-secondary, #fafafa)',
    borderRight: '1px solid var(--t-border-color-medium, #ebebeb)',
    overflow: 'auto',
    maxHeight: '100%',
  },
  loanSidebarCollapsed: {
    overflow: 'hidden',
  },
  sidebarHeader: {
    alignItems: 'center',
    display: 'flex',
    fontSize: 'var(--t-font-size-sm, 0.95rem)',
    fontWeight: 700,
    gap: '8px',
    justifyContent: 'space-between',
    minHeight: '56px',
    padding: '0 16px',
    whiteSpace: 'nowrap',
  },
  sidebarTitle: {
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  sidebarCollapseButton: {
    alignItems: 'center',
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-sm, 4px)',
    color: 'var(--t-font-color-secondary, #666666)',
    cursor: 'pointer',
    display: 'inline-flex',
    flex: '0 0 auto',
    fontSize: 'var(--t-font-size-xs, 0.85rem)',
    fontWeight: 700,
    height: '30px',
    justifyContent: 'center',
    minWidth: '30px',
    padding: '0 8px',
  },
  navGroup: {
    borderTop: '1px solid var(--t-border-color-light, #f1f1f1)',
    padding: '12px',
  },
  navHeader: {
    alignItems: 'center',
    background: 'transparent',
    border: '0',
    color: 'var(--t-font-color-primary, #333333)',
    cursor: 'pointer',
    display: 'flex',
    fontSize: '14px',
    fontWeight: 700,
    justifyContent: 'space-between',
    padding: '9px 8px',
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
    background: 'transparent',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    color: 'var(--t-font-color-secondary, #666666)',
    display: 'grid',
    fontSize: '13px',
    fontWeight: 600,
    gap: '10px',
    gridTemplateColumns: '22px minmax(0, 1fr)',
    lineHeight: 1.3,
    minHeight: '40px',
    padding: '0 12px',
  },
  navItemActive: {
    background: 'var(--t-background-tertiary, #f1f1f1)',
    color: 'var(--t-font-color-primary, #333333)',
  },
  navStatus: {
    alignItems: 'center',
    borderRadius: '999px',
    display: 'inline-flex',
    fontSize: '11px',
    fontWeight: 900,
    height: '20px',
    justifyContent: 'center',
    width: '20px',
  },
  navStatusComplete: {
    background: 'rgba(22, 130, 93, 0.12)',
    color: 'var(--t-color-green, #16825d)',
  },
  navStatusIncomplete: {
    background: 'rgba(196, 49, 45, 0.10)',
    color: 'var(--t-color-red, #c4312d)',
  },
  navStatusNeutral: {
    background: 'var(--t-background-tertiary, #f1f1f1)',
    color: 'var(--t-font-color-tertiary, #999999)',
  },
  loanMain: {
    minWidth: 0,
    overflow: 'auto',
    maxHeight: '100%',
  },
  warningBar: {
    alignItems: 'center',
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    color: 'var(--t-font-color-primary, #333333)',
    display: 'grid',
    fontSize: '13px',
    gap: '12px',
    gridTemplateColumns: 'minmax(0, 1fr) auto',
    lineHeight: 1.45,
    margin: '16px 20px 0',
    minHeight: '48px',
    padding: '12px 16px',
  },
  loanTopbar: {
    alignItems: 'center',
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: 'minmax(0, 1fr) auto',
    margin: '16px 20px 0',
    minHeight: '68px',
    padding: '14px 16px',
  },
  titleBlock: {
    minWidth: 0,
  },
  title: {
    fontSize: 'var(--t-font-size-xl, 1.45rem)',
    fontWeight: 600,
    lineHeight: 1.25,
    margin: 0,
    overflowWrap: 'anywhere' as const,
  },
  stageSelect: {
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-sm, 4px)',
    color: 'var(--t-font-color-primary, #333333)',
    height: '32px',
    minWidth: '280px',
    padding: '0 8px',
  },
  workspaceContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
    padding: '20px',
  },
  metrics: {
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  },
  metricCard: {
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    padding: '16px',
  },
  toolShell: {
    background: 'var(--t-background-primary, #ffffff)',
    borderLeft: '1px solid var(--t-border-color-medium, #ebebeb)',
    display: 'grid',
    gridTemplateColumns: '136px minmax(0, 1fr)',
    maxHeight: '100%',
    minHeight: 0,
    minWidth: 0,
    transition: 'grid-template-columns 140ms ease',
  },
  toolShellCollapsed: {
    gridTemplateColumns: '56px 0px',
  },
  darkToolRail: {
    background: 'var(--t-background-primary, #ffffff)',
    borderRight: '1px solid var(--t-border-color-medium, #ebebeb)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
    minWidth: 0,
    overflow: 'auto',
    padding: '8px 6px',
  },
  toolButton: {
    alignItems: 'center',
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid transparent',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    color: 'var(--t-font-color-secondary, #666666)',
    cursor: 'pointer',
    display: 'flex',
    fontSize: '12px',
    fontWeight: 700,
    gap: '8px',
    justifyContent: 'flex-start',
    lineHeight: 1.2,
    minHeight: '36px',
    minWidth: 0,
    padding: '0 8px',
    textAlign: 'left' as const,
    width: '100%',
  },
  toolButtonCollapsed: {
    justifyContent: 'center',
    padding: '0',
  },
  toolButtonActive: {
    background: 'var(--t-accent-quaternary, #f7f8ff)',
    border: '1px solid var(--t-border-color-blue, #aebcff)',
    color: 'var(--t-accent-accent11, #415abf)',
  },
  toolDrawer: {
    background: 'var(--t-background-primary, #ffffff)',
    borderLeft: '1px solid var(--t-border-color-light, #f1f1f1)',
    minWidth: 0,
    overflow: 'auto',
    maxHeight: '100%',
  },
  toolDrawerHidden: {
    display: 'none',
  },
  toolDrawerHeader: {
    alignItems: 'center',
    borderBottom: '1px solid var(--t-border-color-light, #f1f1f1)',
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '54px',
    padding: '0 16px',
  },
  toolDrawerBody: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    padding: '16px',
  },
  textArea: {
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-sm, 4px)',
    boxSizing: 'border-box' as const,
    color: 'var(--t-font-color-primary, #333333)',
    fontFamily: 'var(--t-font-family, Inter, sans-serif)',
    fontSize: '13px',
    lineHeight: 1.45,
    minHeight: '112px',
    padding: '10px 12px',
    resize: 'vertical' as const,
    width: '100%',
  },
  rowButton: {
    alignItems: 'center',
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-sm, 4px)',
    display: 'flex',
    justifyContent: 'space-between',
    lineHeight: 1.35,
    minHeight: '40px',
    padding: '8px 12px',
  },
  pageHero: {
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: 'minmax(0, 1fr) 260px',
    padding: '18px',
  },
  observedList: {
    background: 'var(--t-background-secondary, #fafafa)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    display: 'grid',
    gap: '8px',
    padding: '12px',
  },
  sectionHeader: {
    alignItems: 'center',
    background: 'var(--t-background-primary, #ffffff)',
    borderBottom: '1px solid var(--t-border-color-light, #f1f1f1)',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
    minHeight: '52px',
    padding: '12px 16px',
  },
  formGrid: {
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    padding: '16px',
  },
  fieldShell: {
    display: 'grid',
    gap: '6px',
    minWidth: 0,
  },
  label: {
    color: 'var(--t-font-color-secondary, #666666)',
    fontSize: 'var(--t-font-size-xs, 0.85rem)',
    fontWeight: 600,
  },
  input: {
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-sm, 4px)',
    boxSizing: 'border-box' as const,
    color: 'var(--t-font-color-primary, #333333)',
    fontFamily: 'var(--t-font-family, Inter, sans-serif)',
    fontSize: '13px',
    lineHeight: 1.45,
    minHeight: '36px',
    padding: '0 10px',
    width: '100%',
  },
  selectShell: {
    position: 'relative' as const,
  },
  selectButton: {
    alignItems: 'center',
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-sm, 4px)',
    boxSizing: 'border-box' as const,
    color: 'var(--t-font-color-primary, #333333)',
    cursor: 'pointer',
    display: 'flex',
    fontFamily: 'var(--t-font-family, Inter, sans-serif)',
    fontSize: '13px',
    justifyContent: 'space-between',
    lineHeight: 1.45,
    minHeight: '36px',
    padding: '0 10px',
    textAlign: 'left' as const,
    width: '100%',
  },
  placeholderText: {
    color: 'var(--t-font-color-tertiary, #999999)',
  },
  selectMenu: {
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-sm, 4px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
    display: 'grid',
    marginTop: '4px',
    maxHeight: '220px',
    overflowY: 'auto' as const,
    padding: '4px',
    position: 'relative' as const,
    zIndex: 15,
  },
  selectOption: {
    background: 'transparent',
    border: 0,
    borderRadius: 'var(--t-border-radius-sm, 4px)',
    color: 'var(--t-font-color-primary, #333333)',
    cursor: 'pointer',
    fontFamily: 'var(--t-font-family, Inter, sans-serif)',
    fontSize: '13px',
    minHeight: '30px',
    padding: '0 8px',
    textAlign: 'left' as const,
  },
  selectOptionActive: {
    background: 'var(--t-background-secondary, #f5f5f5)',
    fontWeight: 700,
  },
  richEditor: {
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-sm, 4px)',
    minHeight: '108px',
    padding: '10px 12px',
  },
  actionBar: {
    borderTop: '1px solid var(--t-border-color-light, #f1f1f1)',
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '10px',
    padding: '12px 16px',
  },
  subtleButton: {
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-sm, 4px)',
    color: 'var(--t-font-color-secondary, #666666)',
    fontSize: 'var(--t-font-size-xs, 0.85rem)',
    fontWeight: 600,
    minHeight: '32px',
    padding: '0 12px',
  },
  disabledButton: {
    cursor: 'not-allowed',
    opacity: 0.56,
  },
  pageLayout: {
    display: 'grid',
    gap: '12px',
  },
  toolIcon: {
    alignItems: 'center',
    background: 'var(--t-background-tertiary, #f1f1f1)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    color: 'var(--t-font-color-primary, #333333)',
    display: 'inline-flex',
    flex: '0 0 auto',
    height: '28px',
    justifyContent: 'center',
    width: '28px',
  },
  toolSvg: {
    fill: 'none',
    height: '17px',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.9,
    width: '17px',
  },
  toolLabel: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  toolRailHeader: {
    alignItems: 'center',
    display: 'flex',
    gap: '8px',
    minHeight: '36px',
    padding: '0 2px 4px',
  },
  applicantDeck: {
    display: 'grid',
    gap: '10px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    padding: '12px',
  },
  applicantCard: {
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    display: 'grid',
    gap: '8px',
    padding: '12px',
  },
  applicantTabsPanel: {
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    overflow: 'hidden',
  },
  applicantTabsHeader: {
    alignItems: 'center',
    borderBottom: '1px solid var(--t-border-color-light, #f1f1f1)',
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '38px',
    padding: '0 12px',
  },
  applicantTabs: {
    display: 'flex',
    gap: '8px',
    overflowX: 'auto' as const,
    padding: '10px 12px',
  },
  applicantTab: {
    alignItems: 'center',
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    color: 'var(--t-font-color-secondary, #666666)',
    cursor: 'pointer',
    display: 'flex',
    flex: '0 0 auto',
    gap: '8px',
    minHeight: '46px',
    minWidth: '178px',
    padding: '0 10px',
    textAlign: 'left' as const,
  },
  applicantTabActive: {
    border: '1px solid var(--t-color-red, #e5484d)',
    boxShadow: 'inset 0 -2px 0 var(--t-color-red, #e5484d)',
    color: 'var(--t-font-color-primary, #333333)',
  },
  applicantBadge: {
    alignItems: 'center',
    background: 'var(--t-background-tertiary, #f1f1f1)',
    borderRadius: '999px',
    color: 'var(--t-font-color-primary, #333333)',
    display: 'inline-flex',
    fontSize: '12px',
    fontWeight: 800,
    height: '24px',
    justifyContent: 'center',
    width: '24px',
  },
  applicantTabLabel: {
    display: 'grid',
    gap: '2px',
    minWidth: 0,
  },
  applicantTabName: {
    color: 'var(--t-font-color-primary, #333333)',
    fontSize: '13px',
    fontWeight: 700,
    lineHeight: 1.2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  addApplicantButton: {
    alignItems: 'center',
    background: 'var(--t-background-primary-inverted, #333333)',
    border: '1px solid var(--t-border-color-inverted, #333333)',
    borderRadius: '999px',
    color: 'var(--t-font-color-inverted, #ffffff)',
    cursor: 'pointer',
    display: 'inline-flex',
    flex: '0 0 auto',
    fontSize: '22px',
    fontWeight: 600,
    height: '44px',
    justifyContent: 'center',
    width: '44px',
  },
  autosaveStatus: {
    alignItems: 'center',
    color: 'var(--t-color-green, #16825d)',
    display: 'inline-flex',
    fontSize: '12px',
    fontWeight: 700,
    gap: '6px',
  },
  quickMove: {
    borderTop: '1px solid var(--t-border-color-light, #f1f1f1)',
    display: 'grid',
    gap: '6px',
    marginTop: '8px',
    paddingTop: '8px',
  },
  handoverPanel: {
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    display: 'grid',
    gap: '10px',
    gridTemplateColumns: 'minmax(0, 1fr) auto',
    padding: '12px',
  },
  boardControls: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px',
    justifyContent: 'flex-end',
  },
  stageStrip: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px',
    padding: '12px',
  },
  stageChip: {
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-sm, 4px)',
    color: 'var(--t-font-color-secondary, #666666)',
    cursor: 'pointer',
    fontSize: 'var(--t-font-size-xs, 0.85rem)',
    fontWeight: 600,
    minHeight: '30px',
    padding: '0 10px',
  },
  stageChipActive: {
    background: 'var(--t-accent-quaternary, #f7f8ff)',
    border: '1px solid var(--t-border-color-blue, #aebcff)',
    color: 'var(--t-accent-accent11, #415abf)',
  },
  conditionalPanel: {
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    padding: '12px',
  },
  validationPanel: {
    background: 'rgba(196, 49, 45, 0.06)',
    border: '1px solid rgba(196, 49, 45, 0.24)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    color: 'var(--t-font-color-primary, #333333)',
    lineHeight: 1.45,
    padding: '16px',
  },
  fieldProvenance: {
    background:
      'linear-gradient(90deg, var(--t-color-blue, #3b82f6) 0 50%, var(--t-color-green, #16825d) 50% 100%)',
    borderRadius: '999px',
    height: '2px',
    opacity: 0.52,
    width: '100%',
  },
  compactWorkspaceNav: {
    alignItems: 'center',
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    display: 'grid',
    gap: '10px',
    gridTemplateColumns: 'minmax(0, 1fr)',
    margin: '12px 12px 0',
    padding: '12px',
  },
  compactHidden: {
    display: 'none',
  },
  pageChipBar: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '6px',
    maxHeight: '72px',
    overflow: 'auto',
  },
  pageChipButton: {
    alignItems: 'center',
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-sm, 4px)',
    color: 'var(--t-font-color-secondary, #666666)',
    cursor: 'pointer',
    display: 'inline-flex',
    fontSize: '12px',
    fontWeight: 600,
    justifyContent: 'center',
    minHeight: '28px',
    padding: '0 8px',
    textDecoration: 'none',
    whiteSpace: 'nowrap' as const,
  },
  pageChipButtonActive: {
    background: 'var(--t-background-tertiary, #f1f1f1)',
    color: 'var(--t-font-color-primary, #333333)',
  },
  loanDoxGrid: {
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: 'minmax(150px, 1fr) minmax(260px, 3fr) minmax(150px, 1fr)',
  },
  loanDoxColumn: {
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
    minWidth: 0,
    padding: '14px',
  },
  requestCard: {
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    display: 'grid',
    gap: '10px',
    padding: '14px',
  },
  clientStepGrid: {
    display: 'grid',
    gap: '12px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  },
  clientStepCard: {
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    minHeight: '110px',
    padding: '14px',
  },
  ruleCard: {
    background: 'var(--t-background-secondary, #fafafa)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    display: 'grid',
    gap: '6px',
    padding: '12px',
  },
  portalLaunchCard: {
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    display: 'grid',
    gap: '12px',
    padding: '16px',
  },
} as const;

export const BrokerAppWorkspace = () => {
  const opportunityRecordId = useRecordId();
  const [activePageName, setActivePageName] = useState('LoanDash');
  const [activeTool, setActiveTool] = useState(getInitialRightRailTool);
  const [isLoanSidebarCollapsed, setIsLoanSidebarCollapsed] = useState(
    () => getStoredLoanWorkspaceLayout().isLoanSidebarCollapsed ?? false,
  );
  const [isToolboxCollapsed, setIsToolboxCollapsed] = useState(
    () => getStoredLoanWorkspaceLayout().isToolboxCollapsed ?? false,
  );
  const [loanSidebarWidth, setLoanSidebarWidth] = useState(() =>
    clampNumber(
      getStoredLoanWorkspaceLayout().loanSidebarWidth ??
        defaultLoanSidebarWidth,
      minLoanSidebarWidth,
      maxLoanSidebarWidth,
    ),
  );
  const [toolWorkspaceWidth, setToolWorkspaceWidth] = useState(() =>
    clampNumber(
      getStoredLoanWorkspaceLayout().toolWorkspaceWidth ??
        defaultToolWorkspaceWidth,
      minToolWorkspaceWidth,
      maxToolWorkspaceWidth,
    ),
  );
  const [activeResizePane, setActiveResizePane] =
    useState<LayoutResizePane | null>(null);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window === 'undefined' ? 1280 : window.innerWidth,
  );
  const [workspaceWidth, setWorkspaceWidth] = useState(1280);
  const [collapsedNavGroups, setCollapsedNavGroups] = useState<string[]>([]);
  const [collapsedPageSections, setCollapsedPageSections] = useState<string[]>(
    [],
  );
  const [applicantCount, setApplicantCount] = useState(2);
  const [activeApplicantIndex, setActiveApplicantIndex] = useState(0);
  const [activeLoanDoxRequests, setActiveLoanDoxRequests] =
    useState<LoanDoxRequest[]>(loanDoxRequests);
  const [loanBoard, setLoanBoard] = useState<BoardKey>('Deal');
  const [loanStageValue, setLoanStageValue] = useState(firstDealStage.value);
  const [boardMoveStatus, setBoardMoveStatus] = useState<
    'Idle' | 'Saving' | 'Saved' | 'Error'
  >('Idle');
  const [generatedTasks, setGeneratedTasks] = useState<
    GeneratedAssistantTask[]
  >(initialGeneratedTasks);
  const [factFindAnswers, setFactFindAnswers] = useState<
    Record<string, FactFindAnswerValue>
  >({
    'Applicants:Applicant Count': '2',
    'Other Income:Do any applicants have other income sources?': 'No',
  });
  const [saveStatus, setSaveStatus] = useState<
    'Idle' | 'Saving' | 'Saved' | 'Error'
  >('Idle');
  const [lastSavedPage, setLastSavedPage] = useState<string | null>(null);
  const [autosaveVersion, setAutosaveVersion] = useState(0);
  const [lastAutosavedAt, setLastAutosavedAt] = useState<string | null>(null);
  const [isClientViewVisible, setIsClientViewVisible] = useState(false);
  const [isFactFindLocked, setIsFactFindLocked] = useState(false);
  const hasMountedRef = useRef(false);
  const fieldControlRefs = useRef<
    Record<string, HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  >({});
  const [taskFilter, setTaskFilter] = useState<'Pending' | 'Completed'>(
    'Pending',
  );
  const [lastWorkflowName, setLastWorkflowName] = useState(
    'Outstanding Supporting Documents',
  );
  const workspaceRootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;
    const previousNavigationWidth = root.style.getPropertyValue(
      '--navigation-drawer-width',
    );
    const previousWorkspaceOpen =
      root.dataset.brokerappLoanWorkspaceOpen ?? '';
    const collapseStyleElement = document.createElement('style');
    const previousNavigationExpanded =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('isNavigationDrawerExpanded')
        : null;

    root.dataset.brokerappLoanWorkspaceOpen = 'true';
    root.style.setProperty(
      '--navigation-drawer-width',
      `${collapsedTwentyNavigationWidth}px`,
    );

    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('isNavigationDrawerExpanded', 'false');
        window.dispatchEvent(
          new StorageEvent('storage', {
            key: 'isNavigationDrawerExpanded',
            newValue: 'false',
          }),
        );
      } catch {
        // Keep the workspace usable even if storage is blocked.
      }
    }

    collapseStyleElement.setAttribute(
      'data-brokerapp-loan-workspace-style',
      'true',
    );
    collapseStyleElement.textContent = `
html[data-brokerapp-loan-workspace-open="true"] [data-click-outside-id="navigation-drawer"] {
  min-width: ${collapsedTwentyNavigationWidth}px !important;
  overflow: hidden !important;
  width: ${collapsedTwentyNavigationWidth}px !important;
  z-index: 70 !important;
}
html[data-brokerapp-loan-workspace-open="true"] [data-click-outside-id="navigation-drawer"] + * {
  min-width: 0 !important;
}
html[data-brokerapp-loan-workspace-open="true"] [data-click-outside-id="navigation-drawer"] [aria-expanded],
html[data-brokerapp-loan-workspace-open="true"] [data-click-outside-id="navigation-drawer"] [title],
html[data-brokerapp-loan-workspace-open="true"] [data-click-outside-id="navigation-drawer"] a,
html[data-brokerapp-loan-workspace-open="true"] [data-click-outside-id="navigation-drawer"] button {
  max-width: ${collapsedTwentyNavigationWidth}px !important;
}
html[data-brokerapp-loan-workspace-open="true"] body {
  overflow: hidden;
}
`;
    document.head.appendChild(collapseStyleElement);

    return () => {
      collapseStyleElement.remove();

      if (previousWorkspaceOpen) {
        root.dataset.brokerappLoanWorkspaceOpen = previousWorkspaceOpen;
      } else {
        delete root.dataset.brokerappLoanWorkspaceOpen;
      }

      if (previousNavigationWidth) {
        root.style.setProperty(
          '--navigation-drawer-width',
          previousNavigationWidth,
        );
      } else {
        root.style.removeProperty('--navigation-drawer-width');
      }

      if (typeof window !== 'undefined') {
        try {
          if (previousNavigationExpanded === null) {
            window.localStorage.removeItem('isNavigationDrawerExpanded');
          } else {
            window.localStorage.setItem(
              'isNavigationDrawerExpanded',
              previousNavigationExpanded,
            );
          }
        } catch {
          // Ignore storage restore errors.
        }
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }

    try {
      window.localStorage.setItem(
        loanWorkspaceLayoutStorageKey,
        JSON.stringify({
          activeTool,
          isLoanSidebarCollapsed,
          isToolboxCollapsed,
          loanSidebarWidth,
          toolWorkspaceWidth,
        } satisfies LoanWorkspaceLayoutPreference),
      );
    } catch {
      // Layout preferences are convenience-only; rendering must continue.
    }
  }, [
    activeTool,
    isLoanSidebarCollapsed,
    isToolboxCollapsed,
    loanSidebarWidth,
    toolWorkspaceWidth,
  ]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const updateViewportWidth = () => setViewportWidth(window.innerWidth);

    updateViewportWidth();
    window.addEventListener('resize', updateViewportWidth);

    return () => window.removeEventListener('resize', updateViewportWidth);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const syncPageFromHash = () => {
      const hash = window.location.hash;

      if (!hash.startsWith(brokerAppPageHashPrefix)) {
        return;
      }

      let pageName = '';

      try {
        pageName = decodeURIComponent(
          hash.slice(brokerAppPageHashPrefix.length),
        );
      } catch {
        pageName = '';
      }

      if (workspacePages[pageName]) {
        setActivePageName(pageName);
      }
    };

    syncPageFromHash();
    window.addEventListener('hashchange', syncPageFromHash);

    return () => window.removeEventListener('hashchange', syncPageFromHash);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return;
    }

    const root =
      workspaceRootRef.current ??
      document.querySelector<HTMLElement>(
        '[data-brokerapp-loan-workspace="true"]',
      );

    if (!root) {
      return;
    }

    const updateWorkspaceWidth = () => {
      if (typeof root.getBoundingClientRect === 'function') {
        setWorkspaceWidth(root.getBoundingClientRect().width);
        return;
      }

      if (typeof root.clientWidth === 'number' && root.clientWidth > 0) {
        setWorkspaceWidth(root.clientWidth);
      }
    };

    updateWorkspaceWidth();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateWorkspaceWidth);

      return () => window.removeEventListener('resize', updateWorkspaceWidth);
    }

    const observer = new ResizeObserver(updateWorkspaceWidth);

    observer.observe(root);

    return () => observer.disconnect();
  }, []);

  const moveOpportunityToStage = async (
    stageValue: string,
    nextAction?: string,
  ) => {
    const stageOption = boardStageOptions.find(
      (option) => option.value === stageValue,
    );

    if (!stageOption) {
      return;
    }

    setLoanBoard(stageOption.board);
    setLoanStageValue(stageOption.value);
    setBoardMoveStatus('Saving');

    if (!opportunityRecordId) {
      setBoardMoveStatus('Saved');
      await enqueueSnackbar({
        message: `Preview moved to ${stageOption.board} board`,
        variant: 'info',
      });
      return;
    }

    try {
      const client = new CoreApiClient();

      await client.mutation({
        updateOpportunity: {
          __args: {
            id: opportunityRecordId,
            data: {
              brokerWorkflowStage: stageOption.value,
              nextBrokerAction:
                nextAction ??
                (stageOption.board === 'Deal'
                  ? 'Assistant broker to finalise file and prepare lender submission'
                  : 'Broker to progress lead intake and proposal'),
            },
          },
          id: true,
          brokerWorkflowStage: true,
          nextBrokerAction: true,
        },
      });

      setBoardMoveStatus('Saved');
      await enqueueSnackbar({
        message: `Moved loan to ${stageOption.board} board: ${stageOption.label}`,
        variant: 'success',
      });
    } catch (error) {
      setBoardMoveStatus('Error');
      await enqueueSnackbar({
        message:
          error instanceof Error
            ? error.message
            : 'Could not move this loan between boards',
        variant: 'error',
      });
    }
  };

  const moveOpportunityToBoard = async (targetBoard: BoardKey) => {
    await moveOpportunityToStage(
      targetBoard === 'Deal' ? firstDealStage.value : firstLeadStage.value,
      targetBoard === 'Deal'
        ? 'Assistant broker handover: request outstanding supporting documents and prepare for submission'
        : 'Broker lead intake: confirm objectives before handover',
    );
  };

  const runWorkflow = (template: BrokerWorkflowTemplate) => {
    const taskBatch = template.tasks.map((task, index) => ({
      assignee:
        index === 0 || index === template.tasks.length - 1
          ? 'Broker'
          : 'Loan Processor',
      due: index === 0 ? 'Today' : `${index + 1} days`,
      id: `${template.name}-${index}-${Date.now()}`,
      priority: index === 0 ? ('High' as const) : ('Medium' as const),
      sourceWorkflow: template.name,
      status: 'Pending' as const,
      title: task,
    }));

    setGeneratedTasks((current) => [...taskBatch, ...current]);
    setLastWorkflowName(template.name);
    setTaskFilter('Pending');
    setActiveTool('Tasks');
  };

  const updateTaskStatus = (
    taskId: string,
    status: GeneratedAssistantTask['status'],
  ) => {
    setGeneratedTasks((current) =>
      current.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status,
            }
          : task,
      ),
    );
  };

  const addLoanDoxRequestFromTemplate = (templateName: string) => {
    const template = loanDoxTemplates.find(
      (loanDoxTemplate) => loanDoxTemplate.name === templateName,
    );

    if (!template) {
      return false;
    }

    setActiveLoanDoxRequests((current) => [
      {
        applicant:
          template.target === 'All applicants'
            ? 'All applicants'
            : activeApplicantRole,
        method:
          template.category === 'Bank statements'
            ? 'Manual upload / CashDeck / Basiq gated'
            : 'ClientDash upload',
        status: 'Draft',
        title: template.name,
      },
      ...current,
    ]);
    setActiveTool('LoanDox');
    setIsToolboxCollapsed(false);

    return true;
  };

  const updateLoanDoxRequestStatus = (
    requestIndex: number,
    status: LoanDoxRequest['status'],
  ) => {
    setActiveLoanDoxRequests((current) =>
      current.map((request, index) =>
        index === requestIndex
          ? {
              ...request,
              status,
            }
          : request,
      ),
    );
  };

  const runAbrLookup = async (lookupType: 'ABN_ACN' | 'BUSINESS_NAME') => {
    const providerMessage =
      lookupType === 'ABN_ACN'
        ? 'ABN/ACN lookup is ready but disabled until the official ABN Lookup GUID is configured in Broker Settings > Integrations.'
        : 'Business name search is ready but disabled until the official ABN Lookup GUID is configured in Broker Settings > Integrations.';

    setFactFindAnswers((current) => ({
      ...current,
      [`Applicants:${activeApplicantRole}:ABR Lookup Evidence`]:
        'Provider not configured - manual entry allowed',
      [`Applicants:${activeApplicantRole}:ABN Status`]:
        'Provider not configured',
    }));
    setAutosaveVersion((version) => version + 1);

    await enqueueSnackbar({
      message: providerMessage,
      variant: 'info',
    });
  };

  const startPanelResize = (
    pane: LayoutResizePane,
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    if (
      isCompactWorkspace ||
      typeof window === 'undefined' ||
      typeof document === 'undefined' ||
      !document.body
    ) {
      return;
    }

    event.preventDefault();
    const workspaceRect = workspaceRootRef.current?.getBoundingClientRect();

    if (!workspaceRect) {
      return;
    }

    const previousCursor = document.body.style.cursor;
    const previousUserSelect = document.body.style.userSelect;

    setActiveResizePane(pane);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const handlePointerMove = (moveEvent: PointerEvent) => {
      if (pane === 'loan-sidebar') {
        setLoanSidebarWidth(
          clampNumber(
            moveEvent.clientX - workspaceRect.left,
            minLoanSidebarWidth,
            maxLoanSidebarWidth,
          ),
        );
        return;
      }

      setToolWorkspaceWidth(
        clampNumber(
          workspaceRect.right - moveEvent.clientX,
          minToolWorkspaceWidth,
          maxToolWorkspaceWidth,
        ),
      );
    };

    const stopResize = () => {
      setActiveResizePane(null);
      document.body.style.cursor = previousCursor;
      document.body.style.userSelect = previousUserSelect;
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', stopResize);
      window.removeEventListener('pointercancel', stopResize);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', stopResize, { once: true });
    window.addEventListener('pointercancel', stopResize, { once: true });
  };

  const visibleTasks = generatedTasks.filter((task) =>
    taskFilter === 'Completed'
      ? task.status === 'Completed'
      : task.status !== 'Completed',
  );
  const applicantRoles = [
    'Primary Applicant',
    'Co-Applicant 1',
    'Co-Applicant 2',
    'Co-Applicant 3',
  ].slice(0, applicantCount);
  const activeApplicantRole =
    applicantRoles[activeApplicantIndex] ?? 'Primary Applicant';
  const getApplicantDisplayName = (role: string, index: number) => {
    const firstName = String(
      factFindAnswers[`Applicants:${role}:First Name`] ?? '',
    ).trim();
    const lastName = String(
      factFindAnswers[`Applicants:${role}:Last Name`] ?? '',
    ).trim();
    const displayName = `${firstName} ${lastName}`.trim();

    if (displayName) {
      return displayName;
    }

    return index === 0
      ? 'Applicant name not added'
      : `Applicant ${index + 1} name not added`;
  };
  const getApplicantMobileNumber = (role: string) => {
    const mobileLabels = [
      'Mobile Phone #',
      'Mobile',
      'Mobile Number',
      'Phone',
      'National number',
    ];

    for (const label of mobileLabels) {
      const value = String(factFindAnswers[`Applicants:${role}:${label}`] ?? '')
        .trim();

      if (value) {
        return value;
      }
    }

    return '';
  };
  const applicantContactOptions = applicantRoles.map((role, index) => ({
    displayName: getApplicantDisplayName(role, index),
    mobile: getApplicantMobileNumber(role),
    role,
  }));
  const suggestedSmsRecipient =
    applicantContactOptions.find(({ mobile }) => mobile)?.mobile ??
    '+61 400 000 000';
  const activePage = workspacePages[activePageName] ?? workspacePages.LoanDash;
  const activeStageOption =
    boardStageOptions.find((option) => option.value === loanStageValue) ??
    firstDealStage;
  const visibleWorkflowStages =
    loanBoard === 'Deal' ? dealWorkflowStageOptions : leadWorkflowStageOptions;
  const loanWorkspaceContext = `${activePage.group} workspace`;
  const workspaceLeftOffset =
    viewportWidth < 760 ? '0px' : `${collapsedTwentyNavigationWidth}px`;
  const clientDashPortalUrl =
    typeof window === 'undefined'
      ? `/clientdash/${opportunityRecordId ?? 'preview'}`
      : `${window.location.origin}/clientdash/${
          opportunityRecordId ?? 'preview'
        }`;
  const isCompactWorkspace = viewportWidth < 920 || workspaceWidth < 780;
  const cleanFieldLabel = (label: string) => label.replace(/^\*/, '').trim();
  const isAnswerFilled = (value: FactFindAnswerValue | undefined) =>
    value !== undefined && value !== '' && value !== false;

  useEffect(() => {
    if (!isCompactWorkspace) {
      return;
    }

    setIsLoanSidebarCollapsed(true);
    setIsToolboxCollapsed(true);
  }, [isCompactWorkspace]);

  const getWorkspacePageStatus = (
    pageName: string,
  ): 'complete' | 'incomplete' | 'neutral' => {
    const page = workspacePages[pageName];

    if (!page) {
      return 'neutral';
    }

    if (pageName === 'LoanDash') {
      return 'complete';
    }

    const requiredFields = page.sections.flatMap((section) =>
      section.fields.filter((workspaceField) => workspaceField.required),
    );

    if (requiredFields.length === 0) {
      return Object.entries(factFindAnswers).some(
        ([key, value]) => key.startsWith(`${page.title}:`) && isAnswerFilled(value),
      )
        ? 'complete'
        : 'neutral';
    }

    const rolesToCheck =
      page.group === 'Fact Find' && pageName === 'Applicants'
        ? applicantRoles
        : page.group === 'Fact Find'
          ? [activeApplicantRole]
          : [''];

    const isComplete = requiredFields.every((workspaceField) =>
      rolesToCheck.every((role) => {
        const fieldKey =
          page.group === 'Fact Find'
            ? `${page.title}:${role}:${cleanFieldLabel(workspaceField.label)}`
            : `${page.title}:${cleanFieldLabel(workspaceField.label)}`;

        return isAnswerFilled(factFindAnswers[fieldKey]);
      }),
    );

    return isComplete ? 'complete' : 'incomplete';
  };

  const collectVisibleDomAnswers = () => {
    const domAnswers: Record<string, FactFindAnswerValue> = {};
    const collectControlValue = (
      fieldKey: string,
      control: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    ) => {
      if (control.tagName === 'INPUT' && control.type === 'checkbox') {
        domAnswers[fieldKey] = (control as HTMLInputElement).checked;
        return;
      }

      domAnswers[fieldKey] = control.value;
    };

    Object.entries(fieldControlRefs.current).forEach(([fieldKey, control]) => {
      collectControlValue(fieldKey, control);
    });

    if (typeof document === 'undefined') {
      return domAnswers;
    }

    const controls = document.querySelectorAll<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >('[data-brokerapp-field-key], input[name], textarea[name], select[name]');

    controls.forEach((control) => {
      const fieldKey =
        control.getAttribute('data-brokerapp-field-key') ??
        control.getAttribute('name');

      if (!fieldKey) {
        return;
      }

      collectControlValue(fieldKey, control);
    });

    return domAnswers;
  };

  const syncVisibleDomAnswers = () => {
    const domAnswers = collectVisibleDomAnswers();

    if (Object.keys(domAnswers).length > 0) {
      setFactFindAnswers((current) => ({
        ...current,
        ...domAnswers,
      }));
    }

    return domAnswers;
  };

  const openWorkspacePage = (pageName: string) => {
    try {
      syncVisibleDomAnswers();
    } catch {
      // Front-component sandbox DOM reads can fail on native Twenty controls.
      // Navigation should still be reliable; explicit Save can persist once the
      // target page is open.
    }
    setActivePageName(pageName);

    if (
      typeof window !== 'undefined' &&
      workspacePages[pageName] &&
      window.location.hash !==
        `${brokerAppPageHashPrefix}${encodeURIComponent(pageName)}`
    ) {
      try {
        window.history.replaceState(
          null,
          '',
          `${window.location.pathname}${window.location.search}${brokerAppPageHashPrefix}${encodeURIComponent(
            pageName,
          )}`,
        );
      } catch {
        window.location.hash = `${brokerAppPageHashPrefix}${encodeURIComponent(
          pageName,
        )}`;
      }
    }
  };

  const toggleNavGroup = (groupName: string) => {
    setCollapsedNavGroups((current) =>
      current.includes(groupName)
        ? current.filter((name) => name !== groupName)
        : [...current, groupName],
    );
  };
  const togglePageSection = (sectionKey: string) => {
    setCollapsedPageSections((current) =>
      current.includes(sectionKey)
        ? current.filter((key) => key !== sectionKey)
        : [...current, sectionKey],
    );
  };

  const getFieldKey = (
    workspaceField: WorkspaceField,
    applicantRole = activeApplicantRole,
  ) =>
    `${activePage.title}:${
      activePage.group === 'Fact Find' ? `${applicantRole}:` : ''
    }${cleanFieldLabel(workspaceField.label)}`;

  const getFieldValue = (
    workspaceField: WorkspaceField,
    applicantRole = activeApplicantRole,
  ) => {
    const fieldKey = getFieldKey(workspaceField, applicantRole);
    const savedValue = factFindAnswers[fieldKey];

    if (savedValue !== undefined) {
      return savedValue;
    }

    if (workspaceField.label.replace(/^\*/, '').trim() === 'Applicant Count') {
      return String(applicantCount);
    }

    if (workspaceField.type === 'checkbox') {
      return false;
    }

    return '';
  };

  const updateFieldValue = (
    workspaceField: WorkspaceField,
    value: FactFindAnswerValue,
    applicantRole = activeApplicantRole,
  ) => {
    const fieldLabel = cleanFieldLabel(workspaceField.label);

    setFactFindAnswers((current) => ({
      ...current,
      [getFieldKey(workspaceField, applicantRole)]: value,
    }));
    setSaveStatus('Saving');
    setAutosaveVersion((version) => version + 1);

    if (fieldLabel === 'Applicant Count' && typeof value === 'string') {
      const nextCount = Number(value);

      if (Number.isInteger(nextCount)) {
        const safeCount = Math.min(4, Math.max(1, nextCount));

        setApplicantCount(safeCount);
        setActiveApplicantIndex((index) => Math.min(index, safeCount - 1));
      }
    }
  };

  const getPersistedSummary = (
    completedAnswerCount: number,
    answers: Record<string, FactFindAnswerValue>,
  ) =>
    JSON.stringify(
      {
        activeApplicant: activeApplicantRole,
        activePage: activePage.title,
        answerCount: completedAnswerCount,
        applicantFactFind: applicantRoles.map((role) => ({
          answers: Object.fromEntries(
            Object.entries(answers).filter(([key]) =>
              key.includes(`:${role}:`),
            ),
          ),
          role,
        })),
        applicantCount,
        autoSavedAt: new Date().toISOString(),
        board: loanBoard,
        stage: activeStageOption.value,
        values: answers,
      },
      null,
      2,
    );

  const persistWorkspaceAnswers = async (mode: 'manual' | 'auto') => {
    const answers = {
      ...factFindAnswers,
      ...collectVisibleDomAnswers(),
    };
    const completedAnswerCount = Object.values(answers).filter(
      (value) => value !== '' && value !== false,
    ).length;

    setSaveStatus('Saving');

    if (!opportunityRecordId) {
      setSaveStatus('Saved');
      setLastSavedPage(activePage.title);
      await enqueueSnackbar({
        message: `${activePage.title} saved in preview (${completedAnswerCount} answer${completedAnswerCount === 1 ? '' : 's'})`,
        variant: 'info',
      });
      return;
    }

    try {
      const client = new CoreApiClient();
      const persistedSummary = getPersistedSummary(
        completedAnswerCount,
        answers,
      );
      const requirementsObjectives = String(
        answers[
          `Goals:${activeApplicantRole}:Requirements and Objectives`
        ] ??
          answers['Goals:Requirements and Objectives'] ??
          '',
      ).trim();
      const opportunityUpdateData: {
        clientRequirementsObjectives?: string;
        factFindStatus: string;
        loanDashSummary: string;
        nextBrokerAction: string;
      } = {
        factFindStatus: 'BROKER_REVIEW',
        loanDashSummary: persistedSummary,
        nextBrokerAction: `Fact-find page saved: ${activePage.title}. ${completedAnswerCount} captured answer${completedAnswerCount === 1 ? '' : 's'} in the loan workspace.`,
      };

      if (requirementsObjectives.length > 0) {
        opportunityUpdateData.clientRequirementsObjectives =
          requirementsObjectives;
      }

      await client.mutation({
        updateOpportunity: {
          __args: {
            id: opportunityRecordId,
            data: opportunityUpdateData,
          },
          id: true,
          factFindStatus: true,
          loanDashSummary: true,
          clientRequirementsObjectives: true,
          nextBrokerAction: true,
        },
      });

      setSaveStatus('Saved');
      setLastSavedPage(activePage.title);
      setLastAutosavedAt(mode === 'auto' ? 'a few seconds ago' : null);

      if (mode === 'manual') {
        await enqueueSnackbar({
          message: `${activePage.title} saved to this Opportunity`,
          variant: 'success',
        });
      }
    } catch (error) {
      setSaveStatus('Error');

      if (mode === 'manual') {
        await enqueueSnackbar({
          message:
            error instanceof Error
              ? error.message
              : 'Could not save the fact-find page',
          variant: 'error',
        });
      }
    }
  };

  const saveWorkspacePage = () => persistWorkspaceAnswers('manual');

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    if (autosaveVersion === 0) {
      return;
    }

    const timeout = setTimeout(() => {
      void persistWorkspaceAnswers('auto');
    }, 900);

    return () => clearTimeout(timeout);
  }, [autosaveVersion]);

  const handleWorkspaceAction = async (action: string) => {
    if (action === 'Add Applicant' || action === 'Add applicant') {
      const visibleAnswers = syncVisibleDomAnswers();

      setApplicantCount((count) => {
        const nextCount = Math.min(4, count + 1);

        setFactFindAnswers((current) => ({
          ...current,
          ...visibleAnswers,
          'Applicants:Applicant Count': String(nextCount),
        }));
        setActiveApplicantIndex(nextCount - 1);
        setAutosaveVersion((version) => version + 1);

        return nextCount;
      });
      setSaveStatus('Saving');
      return;
    }

    if (action === 'Add Previous Address') {
      updateFieldValue(
        {
          label: 'Current Address Tenure',
          type: 'select',
        },
        'Less than 3 years',
      );
      return;
    }

    if (action === 'Verify ABN/ACN') {
      await runAbrLookup('ABN_ACN');
      return;
    }

    if (action === 'Search Business Name') {
      await runAbrLookup('BUSINESS_NAME');
      return;
    }

    if (action.startsWith('Add ')) {
      const templateWasAdded = addLoanDoxRequestFromTemplate(
        action.replace(/^Add /, ''),
      );

      if (templateWasAdded) {
        await enqueueSnackbar({
          message:
            'LoanDox request added as a draft. It stays internal until you send it to ClientDash.',
          variant: 'success',
        });
        return;
      }
    }

    if (action.includes('Validate') || action.includes('checklist')) {
      setActiveTool('Checklists');
      setIsToolboxCollapsed(false);
    }

    await enqueueSnackbar({
      message: `${action} is ready as a gated BrokerApp action. Provider sends, lender submissions and external checks remain disabled until credentials are approved.`,
      variant: 'info',
    });
  };

  const renderFieldProvenance = (fieldKey: string) => {
    const hasValue = isAnswerFilled(factFindAnswers[fieldKey]);

    return (
      <span
        aria-label={
          hasValue
            ? 'Field has captured borrower or broker input'
            : 'Field has no captured source yet'
        }
        style={{
          ...styles.fieldProvenance,
          opacity: hasValue ? 0.72 : 0.16,
        }}
        title={
          hasValue
            ? 'Latest source: BrokerApp workspace. Full source history will sync to the timeline in the persistence pass.'
            : 'No source captured yet'
        }
      />
    );
  };

  const renderWorkspaceField = (
    workspaceField: WorkspaceField,
    applicantRole = activeApplicantRole,
  ) => {
    const label = workspaceField.required
      ? workspaceField.label.replace(/^\*/, '').trim()
      : workspaceField.label;
    const commonInputStyle =
      workspaceField.type === 'textarea' ? styles.textArea : styles.input;
    const fieldKey = getFieldKey(workspaceField, applicantRole);
    const fieldValue = getFieldValue(workspaceField, applicantRole);

    if (workspaceField.type === 'checkbox') {
      return (
        <label key={workspaceField.label} style={styles.fieldShell}>
          <span style={styles.label}>{label}</span>
          <span style={styles.rowButton}>
            <span>{workspaceField.help ?? 'Available'}</span>
            <input
              checked={fieldValue === true}
              data-brokerapp-field-key={fieldKey}
              onChange={(event) =>
                updateFieldValue(
                  workspaceField,
                  event.currentTarget.checked,
                  applicantRole,
                )
              }
              ref={(control) => {
                if (control) {
                  fieldControlRefs.current[fieldKey] = control;
                }
              }}
              type="checkbox"
            />
          </span>
          {renderFieldProvenance(fieldKey)}
        </label>
      );
    }

    if (workspaceField.type === 'radio') {
      return (
        <div key={workspaceField.label} style={styles.fieldShell}>
          <span style={styles.label}>{label}</span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {(workspaceField.options ?? ['Yes', 'No']).map((option) => (
              <label key={option} style={styles.rowButton}>
                <input
                  checked={fieldValue === option}
                  name={fieldKey}
                  onChange={() =>
                    updateFieldValue(workspaceField, option, applicantRole)
                  }
                  type="radio"
                />{' '}
                {option}
              </label>
            ))}
          </div>
          {renderFieldProvenance(fieldKey)}
        </div>
      );
    }

    if (workspaceField.type === 'select') {
      const selectedValue = String(fieldValue);
      const placeholder = `Select ${label.toLowerCase()}`;

      return (
        <label key={workspaceField.label} style={styles.fieldShell}>
          <span style={styles.label}>{label}</span>
          <select
            data-brokerapp-field-key={fieldKey}
            name={fieldKey}
            onChange={(event) =>
              updateFieldValue(
                workspaceField,
                event.currentTarget.value,
                applicantRole,
              )
            }
            onInput={(event) =>
              updateFieldValue(
                workspaceField,
                event.currentTarget.value,
                applicantRole,
              )
            }
            ref={(control) => {
              if (control) {
                fieldControlRefs.current[fieldKey] = control;
              }
            }}
            style={styles.input}
            value={selectedValue}
          >
            <option value="">{placeholder}</option>
            {(workspaceField.options ?? []).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {renderFieldProvenance(fieldKey)}
        </label>
      );
    }

    if (workspaceField.type === 'richText') {
      return (
        <label
          key={workspaceField.label}
          style={{ ...styles.fieldShell, gridColumn: '1 / -1' }}
        >
          <span style={styles.label}>{label}</span>
          <div style={styles.richEditor}>
            <div style={{ ...styles.small, marginBottom: '8px' }}>
              Paragraph · B · I · U · bullets · numbers · table
            </div>
            <textarea
              data-brokerapp-field-key={fieldKey}
              defaultValue={String(fieldValue)}
              key={fieldKey}
              name={fieldKey}
              onBlur={(event) =>
                updateFieldValue(
                  workspaceField,
                  event.currentTarget.value,
                  applicantRole,
                )
              }
              onInput={(event) =>
                updateFieldValue(
                  workspaceField,
                  event.currentTarget.value,
                  applicantRole,
                )
              }
              onChange={(event) =>
                updateFieldValue(
                  workspaceField,
                  event.currentTarget.value,
                  applicantRole,
                )
              }
              placeholder="Type something..."
              ref={(control) => {
                if (control) {
                  fieldControlRefs.current[fieldKey] = control;
                }
              }}
              style={{
                ...styles.textArea,
                border: '0',
                minHeight: '86px',
                padding: 0,
              }}
            />
          </div>
          {renderFieldProvenance(fieldKey)}
        </label>
      );
    }

    if (workspaceField.type === 'status' || workspaceField.type === 'table') {
      const statusText =
        label === 'Applicant Count'
          ? `${applicantCount} applicant${applicantCount === 1 ? '' : 's'}`
          : label === '3 year address history complete'
            ? factFindAnswers[
                `Applicants:${applicantRole}:Current Address Tenure`
              ] === 'Less than 3 years'
              ? 'Previous address required'
              : 'Current address covers 3 years'
            : workspaceField.help ?? 'Not started';

      return (
        <div key={workspaceField.label} style={styles.fieldShell}>
          <span style={styles.label}>{label}</span>
          <div style={styles.rowButton}>
            <span>{statusText}</span>
            <strong style={styles.statusWarn}>Review</strong>
          </div>
          {renderFieldProvenance(fieldKey)}
        </div>
      );
    }

    return (
      <label
        key={workspaceField.label}
        style={{
          ...styles.fieldShell,
          ...(workspaceField.type === 'textarea'
            ? { gridColumn: '1 / -1' }
            : {}),
        }}
      >
        <span style={styles.label}>{label}</span>
        {workspaceField.type === 'textarea' ? (
          <textarea
            data-brokerapp-field-key={fieldKey}
            defaultValue={String(fieldValue)}
            key={fieldKey}
            name={fieldKey}
            onBlur={(event) =>
              updateFieldValue(
                workspaceField,
                event.currentTarget.value,
                applicantRole,
              )
            }
            onInput={(event) =>
              updateFieldValue(
                workspaceField,
                event.currentTarget.value,
                applicantRole,
              )
            }
            onChange={(event) =>
              updateFieldValue(
                workspaceField,
                event.currentTarget.value,
                applicantRole,
              )
            }
            placeholder="Type something..."
            ref={(control) => {
              if (control) {
                fieldControlRefs.current[fieldKey] = control;
              }
            }}
            style={commonInputStyle}
          />
        ) : (
          <input
            data-brokerapp-field-key={fieldKey}
            defaultValue={String(fieldValue)}
            key={fieldKey}
            name={fieldKey}
            onBlur={(event) =>
              updateFieldValue(
                workspaceField,
                event.currentTarget.value,
                applicantRole,
              )
            }
            onInput={(event) =>
              updateFieldValue(
                workspaceField,
                event.currentTarget.value,
                applicantRole,
              )
            }
            onChange={(event) =>
              updateFieldValue(
                workspaceField,
                event.currentTarget.value,
                applicantRole,
              )
            }
            placeholder={
              workspaceField.type === 'money'
                ? '$0.00'
                : workspaceField.type === 'date'
                  ? 'Select date'
                : 'Type something...'
            }
            ref={(control) => {
              if (control) {
                fieldControlRefs.current[fieldKey] = control;
              }
            }}
            style={commonInputStyle}
            type={workspaceField.type === 'date' ? 'date' : 'text'}
          />
        )}
        {renderFieldProvenance(fieldKey)}
      </label>
    );
  };

  const shouldShowSection = (
    section: WorkspaceSection,
    applicantRole = activeApplicantRole,
  ) => {
    if (activePage.title === 'Other Income' && section.title === 'Income Sources') {
      return (
        factFindAnswers[
          'Other Income:Do any applicants have other income sources?'
        ] === 'Yes'
      );
    }

    if (
      activePage.title === 'Applicants' &&
      section.title === 'Previous Address History'
    ) {
      return (
        factFindAnswers[
          `Applicants:${applicantRole}:Current Address Tenure`
        ] === 'Less than 3 years'
      );
    }

    return true;
  };

  const pageSections = activePage.sections.filter((section) =>
    shouldShowSection(section),
  );
  const hasZeroLivingExpense = livingExpenseFields
    .filter((expenseField) => expenseField.type === 'money')
    .some((expenseField) => {
      const value = factFindAnswers[`Living Expenses:${expenseField.label}`];

      return value === undefined || value === '' || value === '$0.00' || value === '0';
    });

  const renderApplicantTabs = () => {
    if (activePage.group !== 'Fact Find') {
      return null;
    }

    return (
      <section style={styles.applicantTabsPanel}>
        <div style={styles.applicantTabsHeader}>
          <strong>Applicant sections</strong>
          <span style={styles.autosaveStatus}>
            {saveStatus === 'Saving'
              ? 'Auto saving...'
              : lastAutosavedAt
                ? `Auto saved ${lastAutosavedAt}`
                : 'Ready'}
          </span>
        </div>
        <div style={styles.applicantTabs}>
          {applicantRoles.map((role, index) => (
            <button
              key={role}
              onClick={() => {
                syncVisibleDomAnswers();
                setActiveApplicantIndex(index);
              }}
              style={{
                ...styles.applicantTab,
                ...(activeApplicantIndex === index
                  ? styles.applicantTabActive
                  : {}),
              }}
              type="button"
            >
              <span style={styles.applicantBadge}>
                {index === 0 ? 'P' : index + 1}
              </span>
              <span style={styles.applicantTabLabel}>
                <strong style={styles.applicantTabName}>
                  {getApplicantDisplayName(role, index)}
                </strong>
                <small style={styles.small}>{role}</small>
              </span>
            </button>
          ))}
          <button
            aria-label="Add applicant"
            disabled={applicantCount >= 4}
            onClick={() => void handleWorkspaceAction('Add applicant')}
            style={{
              ...styles.addApplicantButton,
              ...(applicantCount >= 4 ? styles.disabledButton : {}),
            }}
            type="button"
          >
            +
          </button>
        </div>
      </section>
    );
  };

  const renderPageSection = (
    section: WorkspaceSection,
    applicantRole = activeApplicantRole,
  ) => {
    const sectionKey = `${activePage.title}:${section.title}`;

    return (
      <section key={`${applicantRole}:${section.title}`} style={styles.boardWrap}>
        <div style={styles.sectionHeader}>
          <div>
            <strong>{section.title}</strong>
            <div style={styles.small}>{section.description}</div>
          </div>
          <button
            onClick={() => togglePageSection(sectionKey)}
            style={styles.subtleButton}
            type="button"
          >
            {collapsedPageSections.includes(sectionKey)
              ? 'Expand'
              : 'Collapse'}
          </button>
        </div>
        {!collapsedPageSections.includes(sectionKey) && (
          <>
            <div
              style={{
                ...styles.formGrid,
                ...(isCompactWorkspace
                  ? { gridTemplateColumns: 'minmax(0, 1fr)' }
                  : {}),
              }}
            >
              {section.fields.map((fieldDefinition) =>
                renderWorkspaceField(fieldDefinition, applicantRole),
              )}
            </div>
            {section.actions && (
              <div style={styles.actionBar}>
                {section.actions.map((action) => (
                  <button
                    key={action}
                    onClick={() => void handleWorkspaceAction(action)}
                    style={styles.subtleButton}
                    type="button"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    );
  };

  const renderWorkspacePage = () => (
    <div style={styles.pageLayout}>
      <section
        style={{
          ...styles.pageHero,
          ...(isCompactWorkspace
            ? { gridTemplateColumns: 'minmax(0, 1fr)' }
            : {}),
        }}
      >
        <div>
          <div style={styles.small}>{activePage.group}</div>
          <h2 style={{ margin: '4px 0 8px', fontSize: '22px' }}>
            {activePage.title}
          </h2>
          <p style={{ ...styles.small, maxWidth: '760px' }}>
            {activePage.summary}
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '8px',
            }}
          >
            <span style={styles.pill}>Stage: {activeStageOption.label}</span>
            <span style={styles.pill}>
              Save:{' '}
              {saveStatus === 'Idle'
                ? lastSavedPage
                  ? `Last saved ${lastSavedPage}`
                  : 'Unsaved'
                : saveStatus}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '12px',
            }}
          >
            <button
              disabled={saveStatus === 'Saving'}
              onClick={() => void saveWorkspacePage()}
              style={{
                ...styles.newButton,
                ...(saveStatus === 'Saving' ? styles.disabledButton : {}),
              }}
              type="button"
            >
              {saveStatus === 'Saving' ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => {
                setIsClientViewVisible((current) => !current);
                setActiveTool('Tasks');
                setIsToolboxCollapsed(false);
              }}
              style={styles.subtleButton}
              type="button"
            >
              {isClientViewVisible ? 'Hide client view' : 'Show page in client view'}
            </button>
            <button
              onClick={() => setIsFactFindLocked((current) => !current)}
              style={styles.subtleButton}
              type="button"
            >
              {isFactFindLocked ? 'Unlock client edits' : 'Lock client edits'}
            </button>
            <button
              onClick={() => {
                setActiveTool('Emails');
                setIsToolboxCollapsed(false);
              }}
              style={styles.subtleButton}
              type="button"
            >
              Email or Download Fact Find
            </button>
          </div>
        </div>
        <div style={styles.observedList}>
          <strong>Required controls</strong>
          {activePage.observedControls.map((control) => (
            <span key={control} style={styles.small}>
              {control}
            </span>
          ))}
        </div>
      </section>

      {renderApplicantTabs()}

      {(isClientViewVisible || isFactFindLocked) && (
        <section style={styles.conditionalPanel}>
          <strong>Fact-find page state</strong>
          <p style={styles.small}>
            {isClientViewVisible
              ? 'Client-view preview is enabled for this workspace page. '
              : ''}
            {isFactFindLocked
              ? 'Client edits are locked for this page until the broker unlocks it.'
              : 'Client edits remain unlocked.'}
          </p>
        </section>
      )}

      {activePage.title === 'LoanDash' && (
        <>
          <section style={styles.metrics}>
            {loanDashboardMetricCards.map(([label, value]) => (
              <div key={label} style={styles.metricCard}>
                <span style={styles.small}>{label}</span>
                <h2 style={{ margin: '6px 0 0', fontSize: '22px' }}>
                  {label === 'Board' ? loanBoard : value}
                </h2>
              </div>
            ))}
          </section>

          <section style={styles.handoverPanel}>
            <div>
              <strong>Board Handover</strong>
              <p style={styles.small}>
                Moving the Opportunity from a Lead stage to a Deal stage moves
                the same loan record into the Deal board for the assistant
                broker and backend team. No duplicate opportunity is created.
              </p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <span style={styles.pill}>Current: {loanBoard}</span>
                <span style={styles.pill}>
                  Status: {boardMoveStatus === 'Idle' ? 'Ready' : boardMoveStatus}
                </span>
              </div>
            </div>
            <div style={styles.boardControls}>
              <button
                disabled={loanBoard === 'Deal' || boardMoveStatus === 'Saving'}
                onClick={() => void moveOpportunityToBoard('Deal')}
                style={{
                  ...styles.newButton,
                  ...(loanBoard === 'Deal' || boardMoveStatus === 'Saving'
                    ? styles.disabledButton
                    : {}),
                }}
                type="button"
              >
                Move to Deal board
              </button>
              <button
                disabled={loanBoard === 'Lead' || boardMoveStatus === 'Saving'}
                onClick={() => void moveOpportunityToBoard('Lead')}
                style={{
                  ...styles.subtleButton,
                  ...(loanBoard === 'Lead' || boardMoveStatus === 'Saving'
                    ? styles.disabledButton
                    : {}),
                }}
                type="button"
              >
                Move back to Lead
              </button>
              <select
                disabled={boardMoveStatus === 'Saving'}
                onChange={(event) => {
                  if (event.currentTarget.value) {
                    void moveOpportunityToStage(event.currentTarget.value);
                  }
                }}
                onInput={(event) => {
                  if (event.currentTarget.value) {
                    void moveOpportunityToStage(event.currentTarget.value);
                  }
                }}
                style={styles.input}
                value={loanStageValue}
              >
                <optgroup label="Lead board">
                  {leadWorkflowStageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Deal board">
                  {dealWorkflowStageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </section>

          <section style={styles.boardWrap}>
            <div style={styles.sectionHeader}>
              <div>
                <strong>Workflow stages</strong>
                <div style={styles.small}>
                  Compact stage movement for this same Opportunity. Boards stay
                  in the native Lead and Deal board views.
                </div>
              </div>
              <span style={styles.pill}>{loanBoard} board</span>
            </div>
            <div style={styles.stageStrip}>
              {visibleWorkflowStages.map((stage) => (
                <button
                  key={stage.value}
                  onClick={() => void moveOpportunityToStage(stage.value)}
                  style={{
                    ...styles.stageChip,
                    ...(stage.value === loanStageValue
                      ? styles.stageChipActive
                      : {}),
                  }}
                  type="button"
                >
                  {stage.label}
                </button>
              ))}
            </div>
          </section>
        </>
      )}

      {activePage.title === 'Applicants' && (
        <section style={styles.boardWrap}>
          <div style={styles.sectionHeader}>
            <div>
              <strong>Applicant stack</strong>
              <div style={styles.small}>
                Add up to four residential applicants without creating duplicate
                loan records.
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                disabled={applicantCount <= 1}
                onClick={() => {
                  setApplicantCount((count) => {
                    const nextCount = Math.max(1, count - 1);

                    setFactFindAnswers((current) => ({
                      ...current,
                      'Applicants:Applicant Count': String(nextCount),
                    }));
                    setActiveApplicantIndex((index) =>
                      Math.min(index, nextCount - 1),
                    );
                    setAutosaveVersion((version) => version + 1);

                    return nextCount;
                  });
                  setSaveStatus('Saving');
                }}
                style={{
                  ...styles.subtleButton,
                  ...(applicantCount <= 1 ? styles.disabledButton : {}),
                }}
                type="button"
              >
                - Remove
              </button>
              <button
                disabled={applicantCount >= 4}
                onClick={() => void handleWorkspaceAction('Add applicant')}
                style={{
                  ...styles.newButton,
                  ...(applicantCount >= 4 ? styles.disabledButton : {}),
                }}
                type="button"
              >
                + Add applicant
              </button>
            </div>
          </div>
          <div style={styles.applicantDeck}>
            {applicantRoles.map((role, index) => (
              <div key={role} style={styles.applicantCard}>
                <strong>{role}</strong>
                <span style={styles.small}>
                  {index === 0
                    ? 'Required for every residential loan'
                    : 'Conditional co-applicant / spouse / guarantor role'}
                </span>
                <select style={styles.input} value="Individual" disabled>
                  <option>Individual</option>
                </select>
                <input
                  placeholder="Link or create contact"
                  style={styles.input}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {activePage.title === 'Other Income' &&
        factFindAnswers[
          'Other Income:Do any applicants have other income sources?'
        ] !== 'Yes' && (
          <section style={styles.conditionalPanel}>
            <strong>Conditional logic</strong>
            <p style={styles.small}>
              The income source table is hidden because the answer is No. Select
              Yes to open repeatable income rows and evidence request actions.
            </p>
          </section>
        )}

      {activePage.title === 'Applicants' &&
        factFindAnswers[
          `Applicants:${activeApplicantRole}:Current Address Tenure`
        ] !== 'Less than 3 years' && (
          <section style={styles.conditionalPanel}>
            <strong>Address history rule</strong>
            <p style={styles.small}>
              Select “Less than 3 years” in Current Address Tenure to open the
              previous-address fields required for a 3-year Equifax/lender
              address history.
            </p>
          </section>
        )}

      {activePage.title === 'Living Expenses' && hasZeroLivingExpense && (
        <section style={styles.validationPanel}>
          <strong>Living expense validation</strong>
          <p style={styles.small}>
            One or more expense categories are blank or zero. BrokerApp keeps
            the page visible and requires comments before serviceability and
            lodgement readiness can pass.
          </p>
        </section>
      )}

      {activePage.group === 'Fact Find'
        ? applicantRoles.map((role, index) => (
            <div
              key={role}
              style={{
                display: index === activeApplicantIndex ? 'grid' : 'none',
                gap: '12px',
              }}
            >
              {activePage.sections
                .filter((section) => shouldShowSection(section, role))
                .map((section) => renderPageSection(section, role))}
            </div>
          ))
        : pageSections.map((section) => renderPageSection(section))}
    </div>
  );

  const renderToolDrawer = () => {
    if (activeTool === 'Notes') {
      return (
        <div style={styles.toolDrawerBody}>
          <div style={{ ...styles.panel, textAlign: 'center' }}>
            <strong>
              It&apos;s empty here! Time to create your first note.
            </strong>
            <p style={styles.small}>
              Notes attach to the opportunity timeline and stay separate from
              client-visible portal messages.
            </p>
            <button style={styles.newButton}>Create a Note</button>
          </div>
        </div>
      );
    }

    if (activeTool === 'Tasks') {
      return (
        <div style={styles.toolDrawerBody}>
          <div style={styles.tabRow}>
            <button
              onClick={() => setTaskFilter('Pending')}
              style={taskFilter === 'Pending' ? styles.activeTab : styles.tab}
              type="button"
            >
              Pending
            </button>
            <button
              onClick={() => setTaskFilter('Completed')}
              style={taskFilter === 'Completed' ? styles.activeTab : styles.tab}
              type="button"
            >
              Completed
            </button>
          </div>
          {visibleTasks.map((task) => (
            <div key={task.id} style={styles.panel}>
              <span style={styles.small}>
                {task.due} · {task.priority} · {task.sourceWorkflow}
              </span>
              <h3 style={{ margin: '8px 0', fontSize: '16px' }}>
                {task.title}
              </h3>
              <div style={styles.sectionList}>
                <div style={styles.rowButton}>
                  <span>Assignee</span>
                  <strong>{task.assignee}</strong>
                </div>
                <div style={styles.rowButton}>
                  <span>Status</span>
                  <strong>{task.status}</strong>
                </div>
                {task.status !== 'Completed' && (
                  <button
                    onClick={() => updateTaskStatus(task.id, 'Completed')}
                    style={styles.newButton}
                    type="button"
                  >
                    Mark as Completed
                  </button>
                )}
                {task.status === 'Pending' && (
                  <button
                    onClick={() => updateTaskStatus(task.id, 'Snoozed')}
                    style={styles.rowButton}
                    type="button"
                  >
                    Snooze Task
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeTool === 'Emails' || activeTool === 'Texts') {
      return (
        <div style={styles.toolDrawerBody}>
          <div style={styles.panel}>
            <strong>
              {activeTool === 'Emails' ? 'Send Email' : 'Send Text'}
            </strong>
            <div style={{ ...styles.sectionList, marginTop: '10px' }}>
              {activeTool === 'Texts' && (
                <select
                  aria-label="Suggested applicant mobile number"
                  style={styles.input}
                  defaultValue={suggestedSmsRecipient}
                >
                  {applicantContactOptions
                    .filter(({ mobile }) => mobile)
                    .map(({ displayName, mobile, role }) => (
                      <option key={role} value={mobile}>
                        {displayName} · {role} · {mobile}
                      </option>
                    ))}
                  {!applicantContactOptions.some(({ mobile }) => mobile) && (
                    <option value="+61 400 000 000">
                      No applicant mobile recorded yet
                    </option>
                  )}
                </select>
              )}
              <input
                readOnly
                style={styles.search}
                value={
                  activeTool === 'Emails'
                    ? 'alex.morgan@example.com'
                    : suggestedSmsRecipient
                }
              />
              <textarea
                readOnly
                style={styles.textArea}
                value={
                  activeTool === 'Emails'
                    ? 'Please complete the outstanding document requests in your portal so we can progress your application.'
                    : 'Your broker has requested outstanding documents for your home loan application.'
                }
              />
              <button style={styles.newButton}>
                {activeTool === 'Emails' ? 'Send Email' : 'Send Text'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (activeTool === 'LoanDox') {
      return (
        <div style={styles.toolDrawerBody}>
          <section style={styles.panel}>
            <strong>LoanDox</strong>
            <p style={styles.small}>
              Broker-controlled document requests, ClientDash tasks, bank
              statement collection, credit check preparation and future AI
              document review. Provider actions stay disabled until approved in
              Broker Settings.
            </p>
          </section>

          <section style={styles.panel}>
            <strong>Paperless-ngx document backend</strong>
            <div style={{ ...styles.sectionList, marginTop: '12px' }}>
              <div style={styles.rowButton}>
                <span>Provider</span>
                <strong style={styles.statusBlock}>Not configured</strong>
              </div>
              <div style={styles.rowButton}>
                <span>Paperless-ngx API</span>
                <strong style={styles.statusBlock}>Disabled</strong>
              </div>
              <div style={styles.rowButton}>
                <span>Storage rule</span>
                <strong>Reference only</strong>
              </div>
              <div style={styles.rowButton}>
                <span>OCR status</span>
                <strong style={styles.statusWarn}>Gated</strong>
              </div>
              <div style={styles.rowButton}>
                <span>Paperless-ngx AI</span>
                <strong style={styles.statusBlock}>Disabled</strong>
              </div>
              <div style={styles.rowButton}>
                <span>Paperless-ngx GPT</span>
                <strong style={styles.statusBlock}>Disabled</strong>
              </div>
            </div>
            <p style={styles.small}>
              ClientDash uploads and broker imports should be stored/OCR&apos;d
              in Paperless-ngx once credentials are enabled. BrokerApp stores
              metadata, tags, OCR status, review result and the external
              document reference only.
            </p>
          </section>

          <section
            style={{
              ...styles.loanDoxGrid,
              ...(isCompactWorkspace
                ? { gridTemplateColumns: 'minmax(0, 1fr)' }
                : {}),
            }}
          >
            <div style={styles.loanDoxColumn}>
              <strong>Templates and stacks</strong>
              {loanDoxTemplates.map((template) => (
                <button
                  key={template.name}
                  onClick={() => void handleWorkspaceAction(`Add ${template.name}`)}
                  style={styles.rowButton}
                  type="button"
                >
                  <span>
                    {template.name}
                    <br />
                    <small style={styles.small}>
                      {template.category} · {template.target}
                    </small>
                  </span>
                  <strong>+</strong>
                </button>
              ))}
            </div>

            <div style={styles.loanDoxColumn}>
              <strong>Document request list</strong>
              {activeLoanDoxRequests.map((request, requestIndex) => (
                <article
                  key={`${request.title}-${requestIndex}`}
                  style={styles.requestCard}
                >
                  <div>
                    <strong>{request.title}</strong>
                    <div style={styles.small}>
                      {request.applicant} · {request.method}
                    </div>
                  </div>
                  <div style={styles.rowButton}>
                    <span>Status</span>
                    <strong
                      style={
                        request.status === 'Requested'
                          ? styles.statusWarn
                          : styles.statusBlock
                      }
                    >
                      {request.status}
                    </strong>
                  </div>
                  <textarea
                    readOnly
                    style={styles.textArea}
                    value="Broker question / document instructions stay safe for ClientDash. Uploaded files are reviewed before they become accepted evidence."
                  />
                  <div style={styles.actionBar}>
                    <button
                      onClick={() =>
                        void handleWorkspaceAction(
                          `Ask question about ${request.title}`,
                        )
                      }
                      style={styles.subtleButton}
                      type="button"
                    >
                      Ask question
                    </button>
                    <button
                      onClick={() =>
                        updateLoanDoxRequestStatus(requestIndex, 'Declined')
                      }
                      style={styles.subtleButton}
                      type="button"
                    >
                      Decline upload
                    </button>
                    <button
                      onClick={() =>
                        updateLoanDoxRequestStatus(requestIndex, 'Requested')
                      }
                      style={styles.newButton}
                      type="button"
                    >
                      Send to ClientDash
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div style={styles.loanDoxColumn}>
              <strong>History and gates</strong>
              <div style={styles.rowButton}>
                <span>Provider state</span>
                <strong style={styles.statusBlock}>Disabled</strong>
              </div>
              <div style={styles.rowButton}>
                <span>Missing items</span>
                <strong>3</strong>
              </div>
              <div style={styles.rowButton}>
                <span>Rejected uploads</span>
                <strong>0</strong>
              </div>
              <div style={styles.validationPanel}>
                <strong>Safety gate</strong>
                <p style={styles.small}>
                  CashDeck, Basiq, Equifax, IDV and AI review are configured as
                  future provider actions and cannot run until Master Admin
                  enables credentials.
                </p>
              </div>
            </div>
          </section>

          <section style={styles.panel}>
            <strong>LoanDox rules</strong>
            <div style={{ ...styles.clientStepGrid, marginTop: '12px' }}>
              {loanDoxRules.map(([ruleName, ruleDescription]) => (
                <div key={ruleName} style={styles.ruleCard}>
                  <strong>{ruleName}</strong>
                  <p style={{ ...styles.small, margin: 0 }}>
                    {ruleDescription}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      );
    }

    if (activeTool === 'ClientDash') {
      return (
        <div style={styles.toolDrawerBody}>
          <section style={styles.portalLaunchCard}>
            <div>
              <strong>ClientDash borrower portal</strong>
              <p style={styles.small}>
                ClientDash is the applicant-side portal for managing this loan:
                credit guide consent, fact-find, KYC/CDD, LoanDox document
                requests, bank statement tasks, messages, submitted items and
                final review.
              </p>
            </div>
            <div style={styles.rowButton}>
              <span>Portal URL</span>
              <strong style={{ overflowWrap: 'anywhere', textAlign: 'right' }}>
                {clientDashPortalUrl}
              </strong>
            </div>
            <div style={styles.actionBar}>
              <a
                href={clientDashPortalUrl}
                rel="noreferrer"
                style={{
                  ...styles.newButton,
                  alignItems: 'center',
                  display: 'inline-flex',
                  textDecoration: 'none',
                }}
                target="_blank"
              >
                Open ClientDash
              </a>
              <button
                onClick={() =>
                  void handleWorkspaceAction('Create ClientDash invite')
                }
                style={styles.subtleButton}
                type="button"
              >
                Create invite
              </button>
            </div>
            <p style={styles.small}>
              The public portal route is reserved and provider-gated. Email
              magic links, passkeys, Basiq, CashDeck, IDV and Equifax are not
              active until Master Admin configures credentials and enables the
              portal.
            </p>
          </section>

          <section style={styles.panel}>
            <strong>Client steps</strong>
            <div style={{ ...styles.clientStepGrid, marginTop: '12px' }}>
              {clientDashSteps.map(([step, title, description]) => (
                <div key={step} style={styles.clientStepCard}>
                  <span style={styles.small}>{step}</span>
                  <h3 style={{ fontSize: '15px', margin: '6px 0' }}>
                    {title}
                  </h3>
                  <p style={styles.small}>{description}</p>
                </div>
              ))}
            </div>
          </section>

          <section style={styles.panel}>
            <strong>Portal rules</strong>
            <div style={{ ...styles.sectionList, marginTop: '12px' }}>
              {clientDashRules.map(([ruleName, ruleDescription]) => (
                <div key={ruleName} style={styles.ruleCard}>
                  <strong>{ruleName}</strong>
                  <p style={{ ...styles.small, margin: 0 }}>
                    {ruleDescription}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section style={styles.panel}>
            <strong>Linked LoanDox requests</strong>
            <div style={{ ...styles.sectionList, marginTop: '12px' }}>
              {activeLoanDoxRequests.map((request, requestIndex) => (
                <div key={`${request.title}-${requestIndex}`} style={styles.rowButton}>
                  <span>
                    {request.title}
                    <br />
                    <small style={styles.small}>
                      {request.applicant} · {request.method}
                    </small>
                  </span>
                  <strong
                    style={
                      request.status === 'Requested' ||
                      request.status === 'Submitted'
                        ? styles.statusWarn
                        : request.status === 'Accepted'
                          ? styles.statusOk
                          : request.status === 'Declined'
                            ? styles.statusBlock
                            : undefined
                    }
                  >
                    {request.status}
                  </strong>
                </div>
              ))}
            </div>
          </section>
        </div>
      );
    }

    if (activeTool === 'PolicySpace') {
      return (
        <div style={styles.toolDrawerBody}>
          <section style={styles.panel}>
            <strong>PolicySpace</strong>
            <p style={styles.small}>
              Broker-side lender policy research workspace. It links lender
              policy records, product rules, document checklists, serviceability
              notes and BDM contacts, while RAG and email sending remain
              Master-Admin gated.
            </p>
          </section>

          <section style={styles.panel}>
            <strong>Research question</strong>
            <div style={{ ...styles.formGrid, padding: '12px 0 0' }}>
              <label style={styles.fieldShell}>
                <span style={styles.label}>Selected lender</span>
                <select style={styles.input} defaultValue="">
                  <option value="">Select lender</option>
                  <option>ANZ</option>
                  <option>Westpac</option>
                  <option>NAB</option>
                  <option>CBA</option>
                  <option>AFG Panel</option>
                </select>
              </label>
              <label style={styles.fieldShell}>
                <span style={styles.label}>Policy category</span>
                <select style={styles.input} defaultValue="DOCUMENTS">
                  <option value="EMPLOYMENT">Employment</option>
                  <option value="INCOME">Income</option>
                  <option value="SECURITY">Security/property</option>
                  <option value="LVR">LVR</option>
                  <option value="DOCUMENTS">Documents</option>
                  <option value="EXCEPTION">Exception policy</option>
                </select>
              </label>
            </div>
            <label style={{ ...styles.fieldShell, marginTop: '12px' }}>
              <span style={styles.label}>Scenario / lender question</span>
              <textarea
                readOnly
                style={styles.textArea}
                value="Example: confirm required evidence for self-employed income, current security type, and whether an exception is required before submission."
              />
            </label>
            <div style={styles.actionBar}>
              <button
                onClick={() =>
                  void handleWorkspaceAction('Draft BDM policy question')
                }
                style={styles.newButton}
                type="button"
              >
                Draft BDM question
              </button>
              <button
                onClick={() => void handleWorkspaceAction('Run policy RAG')}
                style={styles.subtleButton}
                type="button"
              >
                Run RAG check
              </button>
            </div>
          </section>

          <section style={styles.panel}>
            <strong>Provider gates</strong>
            <div style={{ ...styles.sectionList, marginTop: '12px' }}>
              {[
                ['Dify / RAGFlow', 'Disabled'],
                ['Ollama local model', 'Disabled'],
                ['Activepieces workflow', 'Disabled'],
                ['BDM email sending', 'Approval required'],
              ].map(([label, status]) => (
                <div key={label} style={styles.rowButton}>
                  <span>{label}</span>
                  <strong style={styles.statusBlock}>{status}</strong>
                </div>
              ))}
            </div>
          </section>
        </div>
      );
    }

    if (activeTool === 'CreditDash') {
      return (
        <div style={styles.toolDrawerBody}>
          <section style={styles.panel}>
            <strong>CreditDash</strong>
            <p style={styles.small}>
              Lender/BDM-facing review portal scaffold for supporting documents
              and policy questions only. It must never expose broker-only notes,
              AML suspicion, internal risk scores or compliance escalations.
            </p>
          </section>

          <section style={styles.panel}>
            <strong>Review pack</strong>
            <div style={{ ...styles.clientStepGrid, marginTop: '12px' }}>
              {[
                ['Scenario summary', 'Broker-approved summary only'],
                ['Supporting documents', 'LoanDox accepted references'],
                ['Policy questions', 'PolicySpace BDM drafts'],
                ['Broker attestation', 'Manual approval required'],
              ].map(([title, description]) => (
                <div key={title} style={styles.clientStepCard}>
                  <strong>{title}</strong>
                  <p style={styles.small}>{description}</p>
                </div>
              ))}
            </div>
            <div style={styles.actionBar}>
              <button
                onClick={() =>
                  void handleWorkspaceAction('Create CreditDash review pack')
                }
                style={styles.newButton}
                type="button"
              >
                Create review pack
              </button>
              <button
                disabled
                style={{ ...styles.subtleButton, ...styles.disabledButton }}
                type="button"
              >
                Share with BDM
              </button>
            </div>
          </section>

          <section style={styles.validationPanel}>
            <strong>CreditDash gate</strong>
            <p style={styles.small}>
              Sharing is disabled until Master Admin enables lender portal
              access, broker approval, document visibility rules and email
              credentials.
            </p>
          </section>
        </div>
      );
    }

    if (activeTool === 'Key Dates') {
      return (
        <div style={styles.toolDrawerBody}>
          {keyDates.map(([label, value]) => (
            <div key={label} style={styles.rowButton}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      );
    }

    if (activeTool === 'Reports') {
      return (
        <div style={styles.toolDrawerBody}>
          {reportTemplates.map((report) => (
            <div key={report} style={styles.rowButton}>
              <span>{report}</span>
              <strong>PDF</strong>
            </div>
          ))}
        </div>
      );
    }

    if (activeTool === '1-Click Workflows') {
      return (
        <div style={styles.toolDrawerBody}>
          <div style={styles.panel}>
            <strong>1-Click Workflows</strong>
            <p style={styles.small}>
              Running a template creates assistant tasks, checklist gates and
              lender-submission evidence prompts for this loan.
            </p>
          </div>
          {brokerWorkflowTemplates.map((workflow) => (
            <button
              key={workflow.name}
              onClick={() => runWorkflow(workflow)}
              style={styles.rowButton}
              type="button"
            >
              <span>
                {workflow.name}
                <br />
                <small style={styles.small}>{workflow.complianceGate}</small>
              </span>
              <strong>{workflow.tasks.length} Tasks</strong>
            </button>
          ))}
        </div>
      );
    }

    return (
      <div style={styles.toolDrawerBody}>
        {checklistItems.map(([item, status]) => (
          <div key={item} style={styles.rowButton}>
            <span>{item}</span>
            <strong
              style={
                status === 'Ready'
                  ? styles.statusOk
                  : status === 'Blocked'
                    ? styles.statusBlock
                    : styles.statusWarn
              }
            >
              {status}
            </strong>
          </div>
        ))}
      </div>
    );
  };

  const renderToolIcon = (tool: string) => {
    const paths = rightRailToolIconPaths[tool] ?? rightRailToolIconPaths.Notes;

    return (
      <span style={styles.toolIcon}>
        <svg
          aria-hidden="true"
          focusable="false"
          style={styles.toolSvg}
          viewBox="0 0 24 24"
        >
          {paths.map((path, index) => (
            <path d={path} key={`${tool}-${index}`} />
          ))}
        </svg>
      </span>
    );
  };

  const loanSidebarGridWidth = isLoanSidebarCollapsed
    ? collapsedLoanSidebarWidth
    : loanSidebarWidth;
  const toolWorkspaceGridWidth = isToolboxCollapsed
    ? collapsedToolWorkspaceWidth
    : toolWorkspaceWidth;
  const opportunityGridColumns = isCompactWorkspace
    ? 'minmax(0, 1fr)'
    : `${loanSidebarGridWidth}px ${
        isLoanSidebarCollapsed ? '0px' : '8px'
      } minmax(0, 1fr) ${
        isToolboxCollapsed ? '0px' : '8px'
      } ${toolWorkspaceGridWidth}px`;

  const workspaceElement = (
    <section
      aria-label="BrokerApp loan workspace"
      data-brokerapp-loan-workspace="true"
      ref={workspaceRootRef}
      style={{
        ...styles.workspaceInline,
        left: workspaceLeftOffset,
        minHeight: 'auto',
        top: viewportWidth < 760 ? '0px' : '48px',
        width: 'auto',
      }}
    >
      <div style={styles.shell}>
      <div
        style={{
          ...styles.opportunityShell,
          gridTemplateColumns: opportunityGridColumns,
          gridTemplateRows: isCompactWorkspace ? 'auto minmax(0, 1fr) auto' : undefined,
        }}
      >
        <aside
          style={{
            ...styles.workspaceRail,
            ...(isLoanSidebarCollapsed ? styles.workspaceRailCollapsed : {}),
            ...(isCompactWorkspace
              ? {
                  borderBottom:
                    '1px solid var(--t-border-color-medium, #ebebeb)',
                  borderRight: '0',
                  maxHeight: isLoanSidebarCollapsed ? '56px' : '58vh',
                  order: 1,
                }
              : {}),
          }}
        >
          <div style={styles.workspaceRailHeader}>
            <span style={styles.sidebarTitle}>
              {isLoanSidebarCollapsed ? 'Loan' : 'Loan Workspace'}
            </span>
            <button
              onClick={() => setIsLoanSidebarCollapsed((current) => !current)}
              style={styles.sidebarCollapseButton}
              type="button"
            >
              {isLoanSidebarCollapsed ? '>' : '<'}
            </button>
          </div>
          <div style={styles.workspaceRailBody}>
            {!isLoanSidebarCollapsed && (
              <select
                aria-label="Loan workspace section"
                onChange={(event) => openWorkspacePage(event.currentTarget.value)}
                onInput={(event) => openWorkspacePage(event.currentTarget.value)}
                style={styles.input}
                value={activePageName}
              >
                {workspacePageOptions.map((option) => (
                  <option key={option.name} value={option.name}>
                    {option.group} / {option.name}
                  </option>
                ))}
              </select>
            )}
            {loanNavigationGroups.map((group) => (
              <div key={group.group} style={styles.workspaceRailSection}>
                {!isLoanSidebarCollapsed && (
                  <button
                    onClick={() => toggleNavGroup(group.group)}
                    style={styles.navHeader}
                    type="button"
                  >
                    <span>{group.group}</span>
                    <span style={styles.small}>
                      {collapsedNavGroups.includes(group.group)
                        ? 'Expand'
                        : 'Collapse'}
                    </span>
                  </button>
                )}
                {!collapsedNavGroups.includes(group.group) &&
                  group.items.map((item) => {
                    const itemStatus = getWorkspacePageStatus(item);

                    return (
                      <button
                        key={item}
                        onClick={() => openWorkspacePage(item)}
                        style={{
                          ...styles.workspaceRailButton,
                          ...(isLoanSidebarCollapsed
                            ? styles.workspaceRailButtonCollapsed
                            : {}),
                          ...(item === activePageName
                            ? styles.workspaceRailButtonActive
                            : {}),
                        }}
                        title={item}
                        type="button"
                      >
                        <span
                          aria-label={itemStatus}
                          style={{
                            ...styles.navStatus,
                            ...(itemStatus === 'complete'
                              ? styles.navStatusComplete
                              : itemStatus === 'incomplete'
                                ? styles.navStatusIncomplete
                                : styles.navStatusNeutral),
                          }}
                        >
                          {itemStatus === 'complete'
                            ? '✓'
                            : itemStatus === 'incomplete'
                              ? 'x'
                              : '-'}
                        </span>
                        {!isLoanSidebarCollapsed && <span>{item}</span>}
                      </button>
                    );
                  })}
              </div>
            ))}
          </div>
        </aside>

        <button
          aria-label="Resize loan workflow menu"
          onPointerDown={(event) => startPanelResize('loan-sidebar', event)}
          style={{
            ...styles.resizeHandle,
            ...(isLoanSidebarCollapsed || isCompactWorkspace
              ? styles.resizeHandleHidden
              : {}),
            ...(activeResizePane === 'loan-sidebar'
              ? styles.resizeHandleActive
              : {}),
          }}
          type="button"
        >
          <span style={styles.resizeHandleGrip} />
        </button>

        <main
          style={{
            ...styles.loanMain,
            ...(isCompactWorkspace ? { order: 2 } : {}),
          }}
        >
          {isCompactWorkspace && (
            <section style={styles.compactWorkspaceNav}>
              <div
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  gap: '8px',
                  justifyContent: 'space-between',
                  minWidth: 0,
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <strong>{activePage.title}</strong>
                  <div style={styles.small}>{activePage.group}</div>
                </div>
                <span
                  aria-label={getWorkspacePageStatus(activePageName)}
                  style={{
                    ...styles.navStatus,
                    ...(getWorkspacePageStatus(activePageName) === 'complete'
                      ? styles.navStatusComplete
                      : getWorkspacePageStatus(activePageName) === 'incomplete'
                        ? styles.navStatusIncomplete
                        : styles.navStatusNeutral),
                  }}
                >
                  {getWorkspacePageStatus(activePageName) === 'complete'
                    ? '✓'
                    : getWorkspacePageStatus(activePageName) === 'incomplete'
                      ? 'x'
                      : '-'}
                </span>
              </div>
              <select
                aria-label="Loan workspace section"
                onChange={(event) => openWorkspacePage(event.currentTarget.value)}
                onInput={(event) => openWorkspacePage(event.currentTarget.value)}
                style={styles.input}
                value={activePageName}
              >
                {workspacePageOptions.map((option) => (
                  <option key={option.name} value={option.name}>
                    {option.group} / {option.name}
                  </option>
                ))}
              </select>
              <div aria-label="Loan workspace page shortcuts" style={styles.pageChipBar}>
                {workspacePageOptions.map((option) => (
                  <a
                    aria-label={`Open ${option.name}`}
                    href={`${brokerAppPageHashPrefix}${encodeURIComponent(
                      option.name,
                    )}`}
                    key={option.name}
                    onClick={() => openWorkspacePage(option.name)}
                    style={{
                      ...styles.pageChipButton,
                      ...(activePageName === option.name
                        ? styles.pageChipButtonActive
                        : {}),
                    }}
                  >
                    {option.name}
                  </a>
                ))}
              </div>
              <button
                onClick={() => setIsLoanSidebarCollapsed(false)}
                style={styles.subtleButton}
                type="button"
              >
                Show all sections
              </button>
            </section>
          )}
          <div
            style={{
              ...styles.warningBar,
              ...(isCompactWorkspace
                ? { gridTemplateColumns: 'minmax(0, 1fr)', margin: '12px 12px 0' }
                : {}),
            }}
          >
            <span>
              <strong>Credit Guide & Privacy Consent is required.</strong>{' '}
              Client-facing steps stay locked until all required applicants
              acknowledge the guide or a broker records an approved exception.
            </span>
            <span>
              <button style={styles.iconButton}>Not Required</button>{' '}
              <button style={styles.newButton}>Get Started</button>
            </span>
          </div>

          <div
            style={{
              ...styles.loanTopbar,
              ...(isCompactWorkspace
                ? { gridTemplateColumns: 'minmax(0, 1fr)', margin: '12px 12px 0' }
                : {}),
            }}
          >
            <div style={styles.titleBlock}>
              <h1 style={styles.title}>{activePage.title}</h1>
              <div style={styles.small}>
                {loanWorkspaceContext} · Residential consumer home loan ·
                ApplyOnline-ready once lodgement credentials are approved
              </div>
            </div>
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                justifyContent: isCompactWorkspace ? 'flex-start' : 'flex-end',
              }}
            >
              <select
                onChange={(event) =>
                  void moveOpportunityToStage(event.currentTarget.value)
                }
                onInput={(event) =>
                  void moveOpportunityToStage(event.currentTarget.value)
                }
                style={{
                  ...styles.stageSelect,
                  ...(isCompactWorkspace
                    ? { minWidth: 0, width: '100%' }
                    : {}),
                }}
                value={loanStageValue}
              >
                <optgroup label="Lead board">
                  {leadWorkflowStageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Deal board">
                  {dealWorkflowStageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </optgroup>
              </select>
              <button style={styles.iconButton}>Sync</button>
              <button
                disabled={saveStatus === 'Saving'}
                onClick={() => void saveWorkspacePage()}
                style={{
                  ...styles.newButton,
                  ...(saveStatus === 'Saving' ? styles.disabledButton : {}),
                }}
                type="button"
              >
                {saveStatus === 'Saving' ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          <div
            style={{
              ...styles.workspaceContent,
              ...(isCompactWorkspace ? { padding: '12px', gap: '16px' } : {}),
            }}
          >
            {renderWorkspacePage()}

            <section
              style={{
                ...styles.panelGrid,
                ...(isCompactWorkspace
                  ? { gridTemplateColumns: 'minmax(0, 1fr)' }
                  : {}),
              }}
            >
              <div style={styles.panel}>
                <strong>Client Fact Find</strong>
                <p style={styles.small}>
                  Conversational form intake, autosave, conditional applicants,
                  desired loan features, objectives, and declarations.
                </p>
              </div>
              <div style={styles.panel}>
                <strong>KYC/CDD</strong>
                <p style={styles.small}>
                  Consent, IDV events, evidence strength, AML/CTF reason codes,
                  and lender-specific readiness.
                </p>
              </div>
              <div style={styles.panel}>
                <strong>Product Search</strong>
                <p style={styles.small}>
                  Import AFG product matrices, filter lender products, capture
                  comparison and product-fit rationale.
                </p>
              </div>
              <div style={styles.panel}>
                <strong>Serviceability</strong>
                <p style={styles.small}>
                  Lender calculators, policy references, assessment status, and
                  broker review before recommendation.
                </p>
              </div>
            </section>
          </div>
        </main>

        <button
          aria-label="Resize loan tools workspace"
          onPointerDown={(event) => startPanelResize('tool-workspace', event)}
          style={{
            ...styles.resizeHandle,
            ...(isToolboxCollapsed || isCompactWorkspace
              ? styles.resizeHandleHidden
              : {}),
            ...(activeResizePane === 'tool-workspace'
              ? styles.resizeHandleActive
              : {}),
          }}
          type="button"
        >
          <span style={styles.resizeHandleGrip} />
        </button>

        <aside
          aria-label="Loan record tools"
          style={{
            ...styles.toolShell,
            ...(isToolboxCollapsed ? styles.toolShellCollapsed : {}),
            ...(isCompactWorkspace
              ? {
                  bottom: 0,
                  boxShadow: isToolboxCollapsed
                    ? 'none'
                    : 'var(--t-box-shadow-light, 0 1px 2px rgba(0, 0, 0, 0.08))',
                  maxWidth: isToolboxCollapsed ? '52px' : 'min(92vw, 500px)',
                  position: 'fixed' as const,
                  right: 0,
                  top: viewportWidth < 760 ? '0px' : '48px',
                  width: isToolboxCollapsed ? '52px' : 'min(92vw, 500px)',
                  zIndex: 45,
                }
              : {}),
          }}
        >
          <nav aria-label="Loan workspace tools" style={styles.darkToolRail}>
            <div style={styles.toolRailHeader}>
              <button
                aria-label={
                  isToolboxCollapsed ? 'Open loan tools' : 'Collapse loan tools'
                }
                onClick={() => setIsToolboxCollapsed((current) => !current)}
                style={{
                  ...styles.toolButton,
                  ...(isToolboxCollapsed ? styles.toolButtonCollapsed : {}),
                }}
                title={
                  isToolboxCollapsed ? 'Open loan tools' : 'Collapse loan tools'
                }
                type="button"
              >
                <span style={styles.toolIcon}>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    style={styles.toolSvg}
                    viewBox="0 0 24 24"
                  >
                    <path
                      d={
                        isToolboxCollapsed
                          ? 'M9 6l6 6-6 6'
                          : 'M15 6l-6 6 6 6'
                      }
                    />
                  </svg>
                </span>
                {!isToolboxCollapsed && (
                  <span style={styles.toolLabel}>Tools</span>
                )}
              </button>
            </div>
            {rightRailTools.map((tool) => (
              <button
                key={tool}
                onClick={() => {
                  setActiveTool(tool);
                  setIsToolboxCollapsed(false);
                }}
                style={{
                  ...styles.toolButton,
                  ...(isToolboxCollapsed ? styles.toolButtonCollapsed : {}),
                  ...(activeTool === tool && !isToolboxCollapsed
                    ? styles.toolButtonActive
                    : {}),
                }}
                title={tool}
                type="button"
              >
                {renderToolIcon(tool)}
                {!isToolboxCollapsed && (
                  <span style={styles.toolLabel}>{tool}</span>
                )}
              </button>
            ))}
          </nav>
          <div
            style={{
              ...styles.toolDrawer,
              ...(isToolboxCollapsed ? styles.toolDrawerHidden : {}),
            }}
          >
            <div style={styles.toolDrawerHeader}>
              <strong>{activeTool}</strong>
              <span style={{ display: 'flex', gap: '8px' }}>
                <button style={styles.iconButton}>+</button>
                <button
                  onClick={() => setIsToolboxCollapsed(true)}
                  style={styles.iconButton}
                  type="button"
                >
                  Collapse
                </button>
              </span>
            </div>
            {renderToolDrawer()}
            <div style={styles.gate}>
              <strong>Submission gate</strong>
              <div style={{ ...styles.small, marginTop: '6px' }}>
                Blocks lodgement until fact-find, CDD/KYC, serviceability,
                product comparison, compliance acknowledgements, and credit
                proposal are ready. Last workflow run: {lastWorkflowName}.
              </div>
            </div>
          </div>
        </aside>
      </div>
      </div>
    </section>
  );

  return workspaceElement;
};

export default defineFrontComponent({
  universalIdentifier: BROKERAPP_LOANDASH_FRONT_COMPONENT_ID,
  name: 'BrokerApp LoanDash',
  description:
    'Broker-facing workspace for boards, fact-find, strategy, lodgement, checklists, KYC, and client portal tasks.',
  component: BrokerAppWorkspace,
});
