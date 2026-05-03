import { useEffect, useState } from 'react';

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
  'Key Dates',
  'Reports',
  '1-Click Workflows',
];

const rightRailToolIcons: Record<string, string> = {
  Notes: 'N',
  Checklists: 'CL',
  Tasks: 'T',
  Emails: '@',
  Texts: 'SMS',
  'Key Dates': 'KD',
  Reports: 'R',
  '1-Click Workflows': 'WF',
};

const completedWorkspacePages = new Set([
  'LoanDash',
  'Team',
  'Goals',
]);

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
        title: 'Applicant Controls',
        description:
          'Controls which applicant cards appear in fact find, client portal and lodgement payloads.',
        fields: [
          field('Applicant Count', 'select', ['1', '2', '3', '4']),
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
        title: 'Address History and KYC',
        description:
          'Address history supports lender CDD/KYC, credit checks and non-face-to-face process rules.',
        fields: [
          field('* Start Date', 'date'),
          field('Address Lookup'),
          field('Enter Address Manually', 'textarea'),
          field('Previous Address 1', 'textarea'),
          field('Previous Address 2', 'textarea'),
          field('Equifax Reports', 'status'),
          field('IDV/KYC Status', 'status'),
          field('Open Banking Consent', 'status'),
        ],
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
  overlayScrim: {
    background: 'rgba(20, 24, 31, 0.18)',
    bottom: 0,
    boxSizing: 'border-box' as const,
    left: '40px',
    padding: '10px 12px 12px',
    position: 'fixed' as const,
    right: 0,
    top: '56px',
    zIndex: 2147480000,
  },
  workspaceModal: {
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    boxShadow: '0 18px 48px rgba(15, 23, 42, 0.22)',
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
    gap: '12px',
    gridTemplateColumns: 'minmax(0, 1fr) auto',
    minHeight: '48px',
    padding: '0 10px 0 14px',
  },
  toolbarLeft: {
    alignItems: 'center',
    display: 'flex',
    gap: '12px',
    minWidth: 0,
  },
  toolbarTitle: {
    color: 'var(--t-font-color-primary, #333333)',
    fontSize: 'var(--t-font-size-sm, 0.95rem)',
    fontWeight: 700,
    whiteSpace: 'nowrap',
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
    gap: '10px',
    marginTop: '12px',
  },
  panel: {
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    padding: '12px',
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
    gridTemplateColumns: '232px minmax(760px, 1fr) 360px',
    height: '100%',
    minHeight: '100%',
    minWidth: '1180px',
    overflow: 'auto',
  },
  loanSidebar: {
    background: 'var(--t-background-secondary, #fafafa)',
    borderRight: '1px solid var(--t-border-color-medium, #ebebeb)',
    overflow: 'auto',
    maxHeight: '100%',
  },
  sidebarHeader: {
    alignItems: 'center',
    display: 'flex',
    fontSize: '17px',
    fontWeight: 800,
    justifyContent: 'space-between',
    minHeight: '54px',
    padding: '0 14px',
  },
  navGroup: {
    borderTop: '1px solid var(--t-border-color-light, #f1f1f1)',
    padding: '8px',
  },
  navHeader: {
    alignItems: 'center',
    background: 'transparent',
    border: '0',
    color: 'var(--t-font-color-primary, #333333)',
    cursor: 'pointer',
    display: 'flex',
    fontSize: 'var(--t-font-size-md, 1rem)',
    fontWeight: 700,
    justifyContent: 'space-between',
    padding: '9px 8px',
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    color: 'var(--t-font-color-secondary, #666666)',
    display: 'grid',
    fontSize: 'var(--t-font-size-sm, 0.95rem)',
    fontWeight: 600,
    gap: '8px',
    gridTemplateColumns: '18px minmax(0, 1fr)',
    minHeight: '34px',
    padding: '0 10px',
  },
  navItemActive: {
    background: 'var(--t-background-tertiary, #f1f1f1)',
    color: 'var(--t-font-color-primary, #333333)',
  },
  navStatus: {
    alignItems: 'center',
    borderRadius: '999px',
    display: 'inline-flex',
    fontSize: '12px',
    fontWeight: 900,
    height: '18px',
    justifyContent: 'center',
    width: '18px',
  },
  navStatusComplete: {
    background: 'rgba(22, 130, 93, 0.12)',
    color: 'var(--t-color-green, #16825d)',
  },
  navStatusIncomplete: {
    background: 'rgba(196, 49, 45, 0.10)',
    color: 'var(--t-color-red, #c4312d)',
  },
  loanMain: {
    minWidth: 0,
    overflow: 'auto',
    maxHeight: '100%',
  },
  warningBar: {
    alignItems: 'center',
    background: 'var(--t-background-primary, #ffffff)',
    borderBottom: '1px solid var(--t-border-color-medium, #ebebeb)',
    color: 'var(--t-font-color-primary, #333333)',
    display: 'flex',
    fontSize: '13px',
    justifyContent: 'space-between',
    minHeight: '34px',
    padding: '0 12px',
  },
  loanTopbar: {
    alignItems: 'center',
    background: 'var(--t-background-primary, #ffffff)',
    borderBottom: '1px solid var(--t-border-color-medium, #ebebeb)',
    display: 'grid',
    gap: '12px',
    gridTemplateColumns: 'minmax(0, 1fr) auto',
    minHeight: '58px',
    padding: '0 12px',
  },
  titleBlock: {
    minWidth: 0,
  },
  title: {
    fontSize: 'var(--t-font-size-lg, 1.23rem)',
    fontWeight: 600,
    lineHeight: 1.2,
    margin: 0,
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
    gap: '12px',
    padding: '12px',
  },
  metrics: {
    display: 'grid',
    gap: '10px',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  },
  metricCard: {
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    padding: '12px',
  },
  toolShell: {
    background: 'var(--t-background-primary, #ffffff)',
    borderLeft: '1px solid var(--t-border-color-medium, #ebebeb)',
    display: 'grid',
    gridTemplateColumns: '66px minmax(0, 1fr)',
    minHeight: 0,
    maxHeight: '100%',
  },
  toolShellCollapsed: {
    gridTemplateColumns: '56px',
  },
  darkToolRail: {
    background: 'var(--t-background-primary, #ffffff)',
    borderRight: '1px solid var(--t-border-color-medium, #ebebeb)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    padding: '10px 6px',
  },
  toolButton: {
    alignItems: 'center',
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid transparent',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    color: 'var(--t-font-color-secondary, #666666)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row' as const,
    fontSize: '11px',
    fontWeight: 700,
    gap: '4px',
    justifyContent: 'center',
    minHeight: '42px',
    padding: '5px 6px',
  },
  toolButtonActive: {
    background: 'var(--t-accent-quaternary, #f7f8ff)',
    border: '1px solid var(--t-border-color-blue, #aebcff)',
    color: 'var(--t-accent-accent11, #415abf)',
  },
  toolDrawer: {
    minWidth: 0,
    overflow: 'auto',
    maxHeight: '100%',
  },
  toolDrawerHeader: {
    alignItems: 'center',
    borderBottom: '1px solid var(--t-border-color-light, #f1f1f1)',
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '54px',
    padding: '0 12px',
  },
  toolDrawerBody: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    padding: '12px',
  },
  textArea: {
    border: '1px solid #d8dce4',
    borderRadius: '4px',
    color: '#252a31',
    minHeight: '108px',
    padding: '8px',
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
    minHeight: '38px',
    padding: '0 10px',
  },
  pageHero: {
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    display: 'grid',
    gap: '12px',
    gridTemplateColumns: 'minmax(0, 1fr) 260px',
    padding: '12px',
  },
  observedList: {
    background: 'var(--t-background-secondary, #fafafa)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-md, 8px)',
    display: 'grid',
    gap: '6px',
    padding: '10px',
  },
  sectionHeader: {
    alignItems: 'center',
    background: 'var(--t-background-primary, #ffffff)',
    borderBottom: '1px solid var(--t-border-color-light, #f1f1f1)',
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '40px',
    padding: '0 12px',
  },
  formGrid: {
    display: 'grid',
    gap: '10px',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    padding: '12px',
  },
  fieldShell: {
    display: 'grid',
    gap: '5px',
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
    color: 'var(--t-font-color-primary, #333333)',
    minHeight: '32px',
    padding: '0 8px',
    width: '100%',
  },
  richEditor: {
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-sm, 4px)',
    minHeight: '108px',
    padding: '8px',
  },
  actionBar: {
    borderTop: '1px solid var(--t-border-color-light, #f1f1f1)',
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px',
    padding: '10px 12px',
  },
  subtleButton: {
    background: 'var(--t-background-primary, #ffffff)',
    border: '1px solid var(--t-border-color-medium, #ebebeb)',
    borderRadius: 'var(--t-border-radius-sm, 4px)',
    color: 'var(--t-font-color-secondary, #666666)',
    fontSize: 'var(--t-font-size-xs, 0.85rem)',
    fontWeight: 600,
    minHeight: '30px',
    padding: '0 10px',
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
    borderRadius: '999px',
    color: 'var(--t-font-color-primary, #333333)',
    display: 'inline-flex',
    fontSize: '10px',
    fontWeight: 800,
    height: '24px',
    justifyContent: 'center',
    minWidth: '24px',
    padding: '0 4px',
  },
  toolLabel: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
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
} as const;

export const BrokerAppWorkspace = () => {
  const opportunityRecordId = useRecordId();
  const [activePageName, setActivePageName] = useState('LoanDash');
  const [activeTool, setActiveTool] = useState(rightRailTools[0]);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(true);
  const [isToolboxCollapsed, setIsToolboxCollapsed] = useState(true);
  const [collapsedNavGroups, setCollapsedNavGroups] = useState<string[]>([]);
  const [collapsedPageSections, setCollapsedPageSections] = useState<string[]>(
    [],
  );
  const [applicantCount, setApplicantCount] = useState(2);
  const [loanBoard, setLoanBoard] = useState<BoardKey>('Deal');
  const [loanStageValue, setLoanStageValue] = useState(firstDealStage.value);
  const [boardMoveStatus, setBoardMoveStatus] = useState<
    'Idle' | 'Saving' | 'Saved' | 'Error'
  >('Idle');
  const [generatedTasks, setGeneratedTasks] = useState<
    GeneratedAssistantTask[]
  >(initialGeneratedTasks);
  const [taskFilter, setTaskFilter] = useState<'Pending' | 'Completed'>(
    'Pending',
  );
  const [lastWorkflowName, setLastWorkflowName] = useState(
    'Outstanding Supporting Documents',
  );

  useEffect(() => {
    const root = document.documentElement;
    const previousNavigationWidth = root.style.getPropertyValue(
      '--navigation-drawer-width',
    );

    root.style.setProperty('--navigation-drawer-width', '72px');

    return () => {
      if (previousNavigationWidth) {
        root.style.setProperty(
          '--navigation-drawer-width',
          previousNavigationWidth,
        );
      } else {
        root.style.removeProperty('--navigation-drawer-width');
      }
    };
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
  const activePage = workspacePages[activePageName] ?? workspacePages.LoanDash;
  const loanTitle = opportunityRecordId
    ? `Opportunity ${opportunityRecordId.slice(0, 8)}`
    : 'Opened Opportunity';
  const toolbarTabs = [
    {
      label: 'Home',
      active: activePageName === 'LoanDash',
      onClick: () => setActivePageName('LoanDash'),
    },
    {
      label: 'Timeline',
      active: activeTool === 'Notes',
      onClick: () => {
        setActiveTool('Notes');
        setIsToolboxCollapsed(false);
      },
    },
    {
      label: 'Tasks',
      active: activeTool === 'Tasks',
      onClick: () => {
        setActiveTool('Tasks');
        setIsToolboxCollapsed(false);
      },
    },
    {
      label: 'Notes',
      active: activeTool === 'Notes',
      onClick: () => {
        setActiveTool('Notes');
        setIsToolboxCollapsed(false);
      },
    },
    {
      label: 'Files',
      active: activePageName === 'Smart Docs',
      onClick: () => setActivePageName('Smart Docs'),
    },
    {
      label: 'Emails',
      active: activeTool === 'Emails',
      onClick: () => {
        setActiveTool('Emails');
        setIsToolboxCollapsed(false);
      },
    },
    {
      label: 'Calendar',
      active: activeTool === 'Key Dates',
      onClick: () => {
        setActiveTool('Key Dates');
        setIsToolboxCollapsed(false);
      },
    },
  ];
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

  const renderWorkspaceField = (workspaceField: WorkspaceField) => {
    const label = workspaceField.required
      ? workspaceField.label.replace(/^\*/, '').trim()
      : workspaceField.label;
    const commonInputStyle =
      workspaceField.type === 'textarea' ? styles.textArea : styles.input;

    if (workspaceField.type === 'checkbox') {
      return (
        <label key={workspaceField.label} style={styles.fieldShell}>
          <span style={styles.label}>{label}</span>
          <span style={styles.rowButton}>
            <span>{workspaceField.help ?? 'Available'}</span>
            <input type="checkbox" />
          </span>
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
                <input name={workspaceField.label} type="radio" /> {option}
              </label>
            ))}
          </div>
        </div>
      );
    }

    if (workspaceField.type === 'select') {
      return (
        <label key={workspaceField.label} style={styles.fieldShell}>
          <span style={styles.label}>{label}</span>
          <select defaultValue="" style={styles.input}>
            <option value="">Select {label.toLowerCase()}</option>
            {(workspaceField.options ?? []).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
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
            <div style={{ color: '#8b929d' }}>Type something...</div>
          </div>
        </label>
      );
    }

    if (workspaceField.type === 'status' || workspaceField.type === 'table') {
      return (
        <div key={workspaceField.label} style={styles.fieldShell}>
          <span style={styles.label}>{label}</span>
          <div style={styles.rowButton}>
            <span>{workspaceField.help ?? 'Not started'}</span>
            <strong style={styles.statusWarn}>Review</strong>
          </div>
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
            placeholder="Type something..."
            style={commonInputStyle}
          />
        ) : (
          <input
            placeholder={
              workspaceField.type === 'money'
                ? '$0.00'
                : workspaceField.type === 'date'
                  ? 'Select date'
                  : 'Type something...'
            }
            style={commonInputStyle}
            type={workspaceField.type === 'date' ? 'text' : 'text'}
          />
        )}
      </label>
    );
  };

  const renderWorkspacePage = () => (
    <div style={styles.pageLayout}>
      <section style={styles.pageHero}>
        <div>
          <div style={styles.small}>{activePage.group}</div>
          <h2 style={{ margin: '4px 0 8px', fontSize: '22px' }}>
            {activePage.title}
          </h2>
          <p style={{ ...styles.small, maxWidth: '760px' }}>
            {activePage.summary}
          </p>
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            <button style={styles.newButton} type="button">
              Save
            </button>
            <button style={styles.subtleButton} type="button">
              Show page in client view
            </button>
            <button style={styles.subtleButton} type="button">
              Lock / unlock
            </button>
            <button style={styles.subtleButton} type="button">
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
                onClick={() =>
                  setApplicantCount((count) => Math.max(1, count - 1))
                }
                style={{
                  ...styles.subtleButton,
                  ...(applicantCount <= 1 ? styles.disabledButton : {}),
                }}
                type="button"
              >
                Remove applicant
              </button>
              <button
                disabled={applicantCount >= 4}
                onClick={() =>
                  setApplicantCount((count) => Math.min(4, count + 1))
                }
                style={{
                  ...styles.newButton,
                  ...(applicantCount >= 4 ? styles.disabledButton : {}),
                }}
                type="button"
              >
                Add applicant
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

      {activePage.sections.map((section) => (
        <section key={section.title} style={styles.boardWrap}>
          <div style={styles.sectionHeader}>
            <div>
              <strong>{section.title}</strong>
              <div style={styles.small}>{section.description}</div>
            </div>
            <button
              onClick={() =>
                togglePageSection(`${activePage.title}:${section.title}`)
              }
              style={styles.subtleButton}
              type="button"
            >
              {collapsedPageSections.includes(
                `${activePage.title}:${section.title}`,
              )
                ? 'Expand'
                : 'Collapse'}
            </button>
          </div>
          {!collapsedPageSections.includes(
            `${activePage.title}:${section.title}`,
          ) && (
            <>
              <div style={styles.formGrid}>
                {section.fields.map(renderWorkspaceField)}
              </div>
              {section.actions && (
                <div style={styles.actionBar}>
                  {section.actions.map((action) => (
                    <button
                      key={action}
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
      ))}
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
              <input
                readOnly
                style={styles.search}
                value={
                  activeTool === 'Emails'
                    ? 'alex.morgan@example.com'
                    : '+61 400 000 000'
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

  const workspaceElement = isWorkspaceOpen ? (
    <div style={styles.overlayScrim}>
      <section aria-label="BrokerApp loan workspace" style={styles.workspaceModal}>
        <div style={styles.workspaceToolbar}>
          <div style={styles.toolbarLeft}>
            <strong style={styles.toolbarTitle}>BrokerApp Loan Workspace</strong>
            <nav aria-label="Loan workspace toolbar" style={styles.toolbarTabs}>
              {toolbarTabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={tab.onClick}
                  style={{
                    ...styles.toolbarTab,
                    ...(tab.active ? styles.toolbarTabActive : {}),
                  }}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          <div style={styles.toolbarActions}>
            <button
              onClick={() => window.location.assign('/objects/opportunities')}
              style={styles.subtleButton}
              type="button"
            >
              Back to board
            </button>
            <button
              onClick={() => setIsWorkspaceOpen(false)}
              style={styles.closeButton}
              type="button"
            >
              Close
            </button>
          </div>
        </div>
        <div style={styles.shell}>
      <div
        style={{
          ...styles.opportunityShell,
          gridTemplateColumns: `232px minmax(760px, 1fr) ${
            isToolboxCollapsed ? '56px' : '360px'
          }`,
        }}
      >
        <aside style={styles.loanSidebar}>
          <div style={styles.sidebarHeader}>
            <span>Loan Onboarding</span>
            <span>Record</span>
          </div>
          {loanNavigationGroups.map((group) => (
            <div key={group.group} style={styles.navGroup}>
              <button
                onClick={() => toggleNavGroup(group.group)}
                style={styles.navHeader}
                type="button"
              >
                <span>{group.group}</span>
                <span style={styles.small}>
                  {collapsedNavGroups.includes(group.group) ? 'Expand' : 'Collapse'}
                </span>
              </button>
              {!collapsedNavGroups.includes(group.group) &&
                group.items.map((item) => {
                  const isComplete = completedWorkspacePages.has(item);

                  return (
                    <button
                      key={item}
                      onClick={() => setActivePageName(item)}
                      style={{
                        ...styles.navItem,
                        ...(item === activePageName
                          ? styles.navItemActive
                          : {}),
                        border: '0',
                        cursor: 'pointer',
                        textAlign: 'left',
                        width: '100%',
                      }}
                      type="button"
                    >
                      <span
                        aria-label={isComplete ? 'complete' : 'incomplete'}
                        style={{
                          ...styles.navStatus,
                          ...(isComplete
                            ? styles.navStatusComplete
                            : styles.navStatusIncomplete),
                        }}
                      >
                        {isComplete ? '✓' : 'x'}
                      </span>
                      <span>{item}</span>
                    </button>
                  );
                })}
            </div>
          ))}
        </aside>

        <main style={styles.loanMain}>
          <div style={styles.warningBar}>
            <span>Credit Guide & Privacy Consent is required</span>
            <span>
              <button style={styles.iconButton}>Not Required</button>{' '}
              <button style={styles.newButton}>Get Started</button>
            </span>
          </div>

          <div style={styles.loanTopbar}>
            <div style={styles.titleBlock}>
              <h1 style={styles.title}>{activePage.title}</h1>
              <div style={styles.small}>
                {loanTitle} · {activePage.group} · Opened inside native Twenty
                Opportunity · Residential consumer home loan · ApplyOnline-ready
                once lodgement credentials are approved
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <select
                onChange={(event) =>
                  void moveOpportunityToStage(event.currentTarget.value)
                }
                style={styles.stageSelect}
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
              <button style={styles.newButton}>Save</button>
            </div>
          </div>

          <div style={styles.workspaceContent}>
            {renderWorkspacePage()}

            <section style={styles.panelGrid}>
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

        <aside
          style={{
            ...styles.toolShell,
            ...(isToolboxCollapsed ? styles.toolShellCollapsed : {}),
          }}
        >
          <div style={styles.darkToolRail}>
            <button
              onClick={() => setIsToolboxCollapsed((current) => !current)}
              style={{
                ...styles.toolButton,
                fontSize: '16px',
                minHeight: '38px',
              }}
              title={
                isToolboxCollapsed
                  ? 'Expand right toolbox'
                  : 'Collapse right toolbox'
              }
              type="button"
            >
              {isToolboxCollapsed ? '<' : '>'}
            </button>
            {rightRailTools.map((tool) => (
              <button
                key={tool}
                onClick={() => {
                  setActiveTool(tool);
                  setIsToolboxCollapsed(false);
                }}
                style={{
                  ...styles.toolButton,
                  ...(activeTool === tool ? styles.toolButtonActive : {}),
                }}
                title={tool}
              >
                <span style={styles.toolIcon}>
                  {rightRailToolIcons[tool] ?? tool.slice(0, 2)}
                </span>
                {!isToolboxCollapsed && (
                  <span style={styles.toolLabel}>{tool}</span>
                )}
              </button>
            ))}
          </div>

          {!isToolboxCollapsed && (
            <div style={styles.toolDrawer}>
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
          )}
        </aside>
      </div>
        </div>
      </section>
    </div>
  ) : (
    <button
      onClick={() => setIsWorkspaceOpen(true)}
      style={styles.reopenButton}
      type="button"
    >
      Open BrokerApp Loan Workspace
    </button>
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
