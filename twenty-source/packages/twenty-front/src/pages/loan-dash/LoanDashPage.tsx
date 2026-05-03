import { styled } from '@linaria/react';
import { useEffect, useMemo, useState } from 'react';
import {
  IconAlertTriangle,
  IconBuildingSkyscraper,
  IconChartBar,
  IconCheck,
  IconCreditCard,
  IconFileCheck,
  IconHome,
  IconLayoutDashboard,
  IconListCheck,
  IconMessage,
  IconNotes,
  IconShield,
  IconTargetArrow,
  IconUsers,
} from 'twenty-ui/display';
import { themeCssVariables } from 'twenty-ui/theme-constants';

type WorkflowStatus = 'complete' | 'active' | 'blocked' | 'waiting';

type WorkflowItem = {
  due: string;
  group: string;
  id: string;
  label: string;
  owner: string;
  status: WorkflowStatus;
  summary: string;
};

type LoanRecord = {
  applicants: Array<{
    email: string;
    name: string;
    phone: string;
    role: string;
  }>;
  broker: string;
  financeDue: string;
  id: string;
  lender: string;
  loanAmount: string;
  name: string;
  portalStatus: string;
  settlementDue: string;
  stageDue: string;
  tags: string[];
};

type BoardStage = {
  id: number;
  name: string;
  records: LoanRecord[];
};

type QuickViewTab =
  | 'Note'
  | 'Task'
  | 'Email'
  | 'SMS'
  | 'Interview Guide'
  | 'Products';

type RightRailItemLabel =
  | 'Notes'
  | 'Checklists'
  | 'Tasks'
  | 'Emails'
  | 'Texts'
  | 'Key Dates'
  | 'Reports'
  | '1-Click Workflows';

type PageBlueprint = {
  fields: Array<[string, string]>;
  sections: Array<[string, string]>;
  tabs?: string[];
};

type FieldMapping = {
  fieldName: string;
  key: string;
  meta: string;
  required?: boolean;
};

type LivingExpenseSubfield = FieldMapping & {
  frequency: string;
  monthlyAmount: string;
};

type LivingExpenseCategory = FieldMapping & {
  commentPrompt: string;
  frequency: string;
  monthlyAmount: string;
  owner: string;
  status: 'complete' | 'requiresComment';
  subfields: LivingExpenseSubfield[];
  verifiedAmount: string;
};

type ApplicantFactFindRow = {
  applicant: string;
  fieldName: string;
  key: string;
  meta: string;
  primaryValue: string;
  secondaryValue: string;
};

type FactFindFieldGroup = {
  condition: string;
  fields: FieldMapping[];
  pageId: string;
  title: string;
};

type KeyDateRow = {
  date: string;
  key: string;
  label: string;
  source: string;
};

const workflowItems: WorkflowItem[] = [
  {
    due: 'Today',
    group: 'Overview',
    id: 'loandash',
    label: 'LoanDash',
    owner: 'Broker',
    status: 'active',
    summary:
      'Application brief, blockers, owners, loan position and next action.',
  },
  {
    due: 'Set',
    group: 'Overview',
    id: 'team',
    label: 'Team',
    owner: 'Ops',
    status: 'complete',
    summary: 'Broker, processor, credit reviewer and support ownership.',
  },
  {
    due: 'After servicing',
    group: 'Overview',
    id: 'lender',
    label: 'Lender',
    owner: 'Broker',
    status: 'waiting',
    summary: 'Target lender, fallback lender and lodgement channel.',
  },
  {
    due: '2 days',
    group: 'Overview',
    id: 'related-parties',
    label: 'Related Parties',
    owner: 'Processor',
    status: 'waiting',
    summary:
      'Applicants, referrer, accountant, conveyancer and introducer links.',
  },
  {
    due: 'Today',
    group: 'Fact Find',
    id: 'goals',
    label: 'Goals',
    owner: 'Broker',
    status: 'active',
    summary:
      'Needs, objectives, loan purpose, priorities and deal constraints.',
  },
  {
    due: 'Today',
    group: 'Fact Find',
    id: 'applicants',
    label: 'Applicants',
    owner: 'Processor',
    status: 'active',
    summary: 'Applicant identity, residency, relationship and contact profile.',
  },
  {
    due: '1 day',
    group: 'Fact Find',
    id: 'dependants',
    label: 'Dependants',
    owner: 'Client',
    status: 'waiting',
    summary: 'Household size, ages, shared care and expense assumptions.',
  },
  {
    due: '1 day',
    group: 'Fact Find',
    id: 'assets',
    label: 'Assets',
    owner: 'Client',
    status: 'waiting',
    summary:
      'Savings, property, vehicles, super, shares and other asset evidence.',
  },
  {
    due: 'Today',
    group: 'Fact Find',
    id: 'other-income',
    label: 'Other Income',
    owner: 'Client',
    status: 'blocked',
    summary: 'Rental, bonus, overtime, Centrelink, maintenance and allowances.',
  },
  {
    due: 'Today',
    group: 'Fact Find',
    id: 'liabilities',
    label: 'Liabilities',
    owner: 'Processor',
    status: 'active',
    summary:
      'Cards, personal loans, HECS, leases, limits and repayment evidence.',
  },
  {
    due: '2 days',
    group: 'Fact Find',
    id: 'living-expenses',
    label: 'Living Expenses',
    owner: 'Client',
    status: 'waiting',
    summary: 'HEM category review and declared monthly spending.',
  },
  {
    due: '3 days',
    group: 'Fact Find',
    id: 'financial-security',
    label: 'Financial Security',
    owner: 'Broker',
    status: 'waiting',
    summary:
      'Risk tolerance, buffers, income protection and hardship resilience.',
  },
  {
    due: 'Today',
    group: 'Strategy',
    id: 'interview-guide',
    label: 'Interview Guide',
    owner: 'Broker',
    status: 'active',
    summary: 'Guided broker questions and compliance evidence prompts.',
  },
  {
    due: '2 days',
    group: 'Strategy',
    id: 'security',
    label: 'Security',
    owner: 'Processor',
    status: 'waiting',
    summary:
      'Purchase/refinance property, valuation, title and guarantor setup.',
  },
  {
    due: 'Today',
    group: 'Strategy',
    id: 'funding-position',
    label: 'Funding Position',
    owner: 'Broker',
    status: 'active',
    summary:
      'Funds required, deposit, equity release, fees and shortfall checks.',
  },
  {
    due: 'After servicing',
    group: 'Strategy',
    id: 'products',
    label: 'Products',
    owner: 'Broker',
    status: 'waiting',
    summary: 'Product research, rate options, offsets, splits and rationale.',
  },
  {
    due: 'Before proposal',
    group: 'Strategy',
    id: 'smart-docs',
    label: 'Smart Docs',
    owner: 'Processor',
    status: 'waiting',
    summary: 'Generated reports, application docs and evidence pack.',
  },
  {
    due: 'Before review',
    group: 'Strategy',
    id: 'brokerwizard',
    label: 'BrokerWizard',
    owner: 'Broker',
    status: 'waiting',
    summary: 'Scenario prompts, exceptions, mitigants and workflow selection.',
  },
  {
    due: 'Before submit',
    group: 'Lodgement',
    id: 'lodgement-funding',
    label: 'Lodgement Funding',
    owner: 'Processor',
    status: 'waiting',
    summary: 'Final funding table, cash to complete and source of funds.',
  },
  {
    due: 'After servicing',
    group: 'Lodgement',
    id: 'credit-proposal',
    label: 'Credit Proposal',
    owner: 'Credit',
    status: 'blocked',
    summary: 'BID, recommendation, product rationale and reviewer approval.',
  },
  {
    due: 'After approval',
    group: 'Lodgement',
    id: 'submission',
    label: 'Submission',
    owner: 'Processor',
    status: 'waiting',
    summary:
      'ApplyOnline/AFG Flex/manual lodgement readiness and submission status.',
  },
];

const groupOrder = ['Overview', 'Fact Find', 'Strategy', 'Lodgement'];

const applicants = [
  {
    email: 'alex.morgan@example.com',
    name: 'Alex Morgan',
    phone: '+61 400 000 001',
    role: 'Primary Applicant',
  },
  {
    email: 'jordan.morgan@example.com',
    name: 'Jordan Morgan',
    phone: '+61 400 000 002',
    role: 'Co-applicant 1',
  },
];

const initialBoardStages: BoardStage[] = [
  {
    id: 1,
    name: 'Outstanding Supporting Documents',
    records: [
      {
        applicants,
        broker: 'Lend A Loan Broker',
        financeDue: '-',
        id: '2/2026',
        lender: 'Other',
        loanAmount: '$0.00',
        name: 'Alex Morgan',
        portalStatus: 'Draft',
        settlementDue: '-',
        stageDue: '07/05/2026',
        tags: ['Finance', 'Settlement', 'Stage Due'],
      },
    ],
  },
  {
    id: 2,
    name: 'Prepare for Submission',
    records: [
      {
        applicants,
        broker: 'Lend A Loan Broker',
        financeDue: '-',
        id: '2/2026-A',
        lender: 'ANZ',
        loanAmount: '$0.90M',
        name: 'First Home Purchase',
        portalStatus: 'Fact find started',
        settlementDue: '-',
        stageDue: '15/04/2026',
        tags: ['Finance', 'Settlement', 'Stage Due'],
      },
    ],
  },
  { id: 3, name: 'App Docs With Client', records: [] },
  { id: 4, name: 'Signed App Docs Returned', records: [] },
  { id: 5, name: 'Application Lodged', records: [] },
  { id: 6, name: 'AIP Issued', records: [] },
  { id: 7, name: 'AIP > Full Conversion', records: [] },
  { id: 8, name: 'Conditional/MIRs', records: [] },
  { id: 9, name: 'Conditions/MIRs With Client', records: [] },
  { id: 10, name: 'Conditions/MIRs With Lender', records: [] },
  { id: 11, name: 'Formal Approval', records: [] },
  { id: 12, name: 'Mortgage Docs Issued', records: [] },
  { id: 13, name: 'Mortgage Docs Returned', records: [] },
  { id: 14, name: 'Ready To Settle', records: [] },
  { id: 15, name: 'Settlement Booked', records: [] },
  {
    id: 16,
    name: 'Settlement',
    records: [
      {
        applicants,
        broker: 'Lend A Loan Broker',
        financeDue: '-',
        id: '1/2026',
        lender: 'Health Professionals Bank',
        loanAmount: '$0.62M',
        name: 'Settlement Applicant 1',
        portalStatus: 'Docs signed',
        settlementDue: '23/06/2025',
        stageDue: '23/06/2025',
        tags: ['Finance', 'Settlement', 'Stage Due'],
      },
      {
        applicants,
        broker: 'Lend A Loan Broker',
        financeDue: '13/03/2025',
        id: '1/2025',
        lender: 'NAB',
        loanAmount: '$0.57M',
        name: 'Settlement Applicant 2',
        portalStatus: 'Settlement booked',
        settlementDue: '11/04/2025',
        stageDue: '11/04/2025',
        tags: ['Finance', 'Settlement', 'Stage Due'],
      },
    ],
  },
  {
    id: 17,
    name: 'Lost/Declined',
    records: [
      {
        applicants,
        broker: 'Lend A Loan Broker',
        financeDue: '01/11/2025',
        id: '3/2025',
        lender: 'Great Southern Bank',
        loanAmount: '$1.30M',
        name: 'Declined Applicant',
        portalStatus: 'Declined',
        settlementDue: '19/12/2025',
        stageDue: '17/12/2025',
        tags: ['Finance', 'Settlement', 'Stage Due'],
      },
    ],
  },
];

const rightRailItems: Array<{
  Icon: typeof IconNotes;
  count: number;
  label: RightRailItemLabel;
}> = [
  { Icon: IconNotes, count: 7, label: 'Notes' },
  { Icon: IconListCheck, count: 4, label: 'Checklists' },
  { Icon: IconCheck, count: 12, label: 'Tasks' },
  { Icon: IconMessage, count: 3, label: 'Emails' },
  { Icon: IconMessage, count: 1, label: 'Texts' },
  { Icon: IconAlertTriangle, count: 6, label: 'Key Dates' },
  { Icon: IconFileCheck, count: 9, label: 'Reports' },
  { Icon: IconShield, count: 5, label: '1-Click Workflows' },
];

const oneClickWorkflows = [
  'Lender Rebate',
  'Guarantor Home Loan',
  'Fast Refi',
  'Non-Standard Ownership Structure',
  'Client Lives Overseas',
  'Construction',
  'FIRB',
  'Mat Leave / Pregnant Pause',
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
  'Property Insurance Referral',
  'Accounting Referral',
  'Financial Planning Referral',
  'Property Management Referral',
  'Property Advisory Referral',
  'Loan Protection Insurance',
  'Equipment Loan',
  'Separation',
  'Equity Release / Cash Out',
  'Self-Employed',
];

const reportTemplates = [
  '01. Deal Submission Guide',
  '02. Deal (AIP to Full) Cover Sheet',
  '03. Funding Position Report',
  '04. Loan Submission Advice',
  '05. Formal Approval Advice',
  '06. Ready To Settle Advice (with Funding)',
  '07. Authority To Debit/Credit Form',
  '08. Settlement Advice',
  '09. Deal History Report',
];

const keyDateRows: KeyDateRow[] = [
  {
    date: '07/05/2026',
    key: 'keyDates.stageDueDate',
    label: 'Stage Due',
    source: 'Deal board',
  },
  {
    date: '-',
    key: 'keyDates.financeDate',
    label: 'Finance',
    source: 'Contract / broker update',
  },
  {
    date: '-',
    key: 'keyDates.settlementDate',
    label: 'Settlement',
    source: 'Contract / conveyancer',
  },
  {
    date: '02/05/2026',
    key: 'keyDates.createdAt',
    label: 'Created At',
    source: 'Twenty opportunity',
  },
  {
    date: '-',
    key: 'keyDates.expectedLodgementDate',
    label: 'Exp. Lodged',
    source: 'Lodgement plan',
  },
  {
    date: '-',
    key: 'keyDates.formalApprovalDate',
    label: 'Formal Approval',
    source: 'Lender status event',
  },
];

const serviceabilityRows: Array<[string, string, string]> = [
  ['Base income verified', '$184,000', 'Payslips and YTD aligned'],
  ['Other income outstanding', '$18,500', 'Rental statement required'],
  ['Declared living expenses', '$6,420/mo', 'Needs applicant confirmation'],
  ['Existing liabilities', '$2,150/mo', 'Credit card limits loaded'],
  ['Estimated surplus', '$1,280/mo', 'Blocked until rental evidence'],
];

const livingExpenseCategories: LivingExpenseCategory[] = [
  {
    commentPrompt:
      'If your groceries expenses are $0, please add a comment explaining why.',
    fieldName: 'Groceries',
    frequency: 'Monthly',
    key: 'livingExpenses.groceries.monthlyAmount',
    meta: 'factFind.livingExpenses.household.groceries',
    monthlyAmount: '$0.00',
    owner: "Alex Morgan's Household",
    required: true,
    status: 'requiresComment',
    subfields: [
      {
        fieldName: 'Groceries',
        frequency: 'Monthly',
        key: 'livingExpenses.groceries.groceries.amount',
        meta: 'BrokerEngine label: Groceries',
        monthlyAmount: '$0.00',
        required: true,
      },
    ],
    verifiedAmount: '$0.00',
  },
  {
    commentPrompt:
      'If your clothing and personal care expenses are $0, please add a comment explaining why.',
    fieldName: 'Clothing and Personal Care',
    frequency: 'Monthly',
    key: 'livingExpenses.clothingAndPersonalCare.monthlyAmount',
    meta: 'factFind.livingExpenses.household.clothingAndPersonalCare',
    monthlyAmount: '$0.00',
    owner: "Alex Morgan's Household",
    required: true,
    status: 'requiresComment',
    subfields: [
      {
        fieldName: 'Clothing and Footwear',
        frequency: 'Monthly',
        key: 'livingExpenses.clothingAndPersonalCare.clothingAndFootwear.amount',
        meta: 'BrokerEngine label: Clothing and Footwear',
        monthlyAmount: '$0.00',
      },
      {
        fieldName: 'Cosmetics',
        frequency: 'Monthly',
        key: 'livingExpenses.clothingAndPersonalCare.cosmetics.amount',
        meta: 'BrokerEngine label: Cosmetics',
        monthlyAmount: '$0.00',
      },
      {
        fieldName:
          'Personal Care (e.g. Hairdressing, manicure, pedicure, massages etc.)',
        frequency: 'Monthly',
        key: 'livingExpenses.clothingAndPersonalCare.personalCare.amount',
        meta: 'BrokerEngine label: Personal Care',
        monthlyAmount: '$0.00',
      },
      {
        fieldName: 'Other',
        frequency: 'Monthly',
        key: 'livingExpenses.clothingAndPersonalCare.other.amount',
        meta: 'BrokerEngine label: Other',
        monthlyAmount: '$0.00',
      },
    ],
    verifiedAmount: '$0.00',
  },
  {
    commentPrompt:
      'If your telephone, internet, pay tv and media streaming subscriptions expenses are $0, please add a comment explaining why.',
    fieldName: 'Telephone, internet, pay TV and media streaming subscriptions',
    frequency: 'Monthly',
    key: 'livingExpenses.telephoneInternetPayTvAndMediaStreaming.monthlyAmount',
    meta: 'factFind.livingExpenses.household.telephoneInternetPayTvAndMediaStreaming',
    monthlyAmount: '$0.00',
    owner: "Alex Morgan's Household",
    required: true,
    status: 'requiresComment',
    subfields: [
      {
        fieldName: 'Telephone (Mobile and Landline)',
        frequency: 'Monthly',
        key: 'livingExpenses.telephoneInternetPayTvAndMediaStreaming.telephone.amount',
        meta: 'BrokerEngine label: Telephone (Mobile and Landline)',
        monthlyAmount: '$0.00',
      },
      {
        fieldName: 'Internet',
        frequency: 'Monthly',
        key: 'livingExpenses.telephoneInternetPayTvAndMediaStreaming.internet.amount',
        meta: 'BrokerEngine label: Internet',
        monthlyAmount: '$0.00',
      },
      {
        fieldName:
          'Media Streaming Subscriptions (e.g. Pay TV, Spotify, Netflix etc.)',
        frequency: 'Monthly',
        key: 'livingExpenses.telephoneInternetPayTvAndMediaStreaming.mediaStreaming.amount',
        meta: 'BrokerEngine label: Media Streaming Subscriptions',
        monthlyAmount: '$0.00',
      },
      {
        fieldName: 'Other',
        frequency: 'Monthly',
        key: 'livingExpenses.telephoneInternetPayTvAndMediaStreaming.other.amount',
        meta: 'BrokerEngine label: Other',
        monthlyAmount: '$0.00',
      },
    ],
    verifiedAmount: '$0.00',
  },
  {
    commentPrompt:
      'If your education expenses are $0, please add a comment explaining why.',
    fieldName: 'Education',
    frequency: 'Monthly',
    key: 'livingExpenses.education.monthlyAmount',
    meta: 'factFind.livingExpenses.household.education',
    monthlyAmount: '$0.00',
    owner: "Alex Morgan's Household",
    status: 'requiresComment',
    subfields: [
      {
        fieldName: 'Public, Primary and Secondary Education',
        frequency: 'Monthly',
        key: 'livingExpenses.education.publicPrimaryAndSecondary.amount',
        meta: 'BrokerEngine label: Public, Primary and Secondary Education',
        monthlyAmount: '$0.00',
      },
      {
        fieldName: 'Private Schooling and Tuition',
        frequency: 'Monthly',
        key: 'livingExpenses.education.privateSchoolingAndTuition.amount',
        meta: 'BrokerEngine label: Private Schooling and Tuition',
        monthlyAmount: '$0.00',
      },
      {
        fieldName:
          'Higher education, vocational training & professional fees (excluding HECS/HELP repayments)',
        frequency: 'Monthly',
        key: 'livingExpenses.education.higherEducationVocationalTrainingProfessionalFees.amount',
        meta: 'BrokerEngine label: Higher education, vocational training & professional fees',
        monthlyAmount: '$0.00',
      },
      {
        fieldName: 'Other',
        frequency: 'Monthly',
        key: 'livingExpenses.education.other.amount',
        meta: 'BrokerEngine label: Other',
        monthlyAmount: '$0.00',
      },
    ],
    verifiedAmount: '$0.00',
  },
  {
    commentPrompt:
      'If your recreation and entertainment expenses are $0, please add a comment explaining why.',
    fieldName: 'Recreation and Entertainment',
    frequency: 'Monthly',
    key: 'livingExpenses.recreationAndEntertainment.monthlyAmount',
    meta: 'factFind.livingExpenses.household.recreationAndEntertainment',
    monthlyAmount: '$0.00',
    owner: "Alex Morgan's Household",
    required: true,
    status: 'requiresComment',
    subfields: [
      {
        fieldName: 'Dining Out',
        frequency: 'Monthly',
        key: 'livingExpenses.recreationAndEntertainment.diningOut.amount',
        meta: 'BrokerEngine label: Dining Out',
        monthlyAmount: '$0.00',
      },
      {
        fieldName: 'Membership fees and subscriptions (e.g. Gym memberships)',
        frequency: 'Monthly',
        key: 'livingExpenses.recreationAndEntertainment.membershipFeesAndSubscriptions.amount',
        meta: 'BrokerEngine label: Membership fees and subscriptions',
        monthlyAmount: '$0.00',
      },
      {
        fieldName: 'Holidays',
        frequency: 'Monthly',
        key: 'livingExpenses.recreationAndEntertainment.holidays.amount',
        meta: 'BrokerEngine label: Holidays',
        monthlyAmount: '$0.00',
      },
      {
        fieldName: 'Alcohol and tobacco',
        frequency: 'Monthly',
        key: 'livingExpenses.recreationAndEntertainment.alcoholAndTobacco.amount',
        meta: 'BrokerEngine label: Alcohol and tobacco',
        monthlyAmount: '$0.00',
      },
      {
        fieldName: 'Other',
        frequency: 'Monthly',
        key: 'livingExpenses.recreationAndEntertainment.other.amount',
        meta: 'BrokerEngine label: Other',
        monthlyAmount: '$0.00',
      },
    ],
    verifiedAmount: '$0.00',
  },
  {
    commentPrompt:
      'If your insurance expenses are $0, please add a comment explaining why.',
    fieldName: 'Insurance',
    frequency: 'Monthly',
    key: 'livingExpenses.insurance.monthlyAmount',
    meta: 'factFind.livingExpenses.household.insurance',
    monthlyAmount: '$0.00',
    owner: "Alex Morgan's Household",
    required: true,
    status: 'requiresComment',
    subfields: [
      {
        fieldName: 'Home and Contents Insurance',
        frequency: 'Monthly',
        key: 'livingExpenses.insurance.homeAndContentsInsurance.amount',
        meta: 'BrokerEngine label: Home and Contents Insurance',
        monthlyAmount: '$0.00',
      },
      {
        fieldName: 'Private Health Insurance',
        frequency: 'Monthly',
        key: 'livingExpenses.insurance.privateHealthInsurance.amount',
        meta: 'BrokerEngine label: Private Health Insurance',
        monthlyAmount: '$0.00',
      },
      {
        fieldName:
          'Sickness and Accident Insurance (including Income, Trauma and TPD)',
        frequency: 'Monthly',
        key: 'livingExpenses.insurance.sicknessAndAccidentInsurance.amount',
        meta: 'BrokerEngine label: Sickness and Accident Insurance',
        monthlyAmount: '$0.00',
      },
      {
        fieldName: 'Life Insurance',
        frequency: 'Monthly',
        key: 'livingExpenses.insurance.lifeInsurance.amount',
        meta: 'BrokerEngine label: Life Insurance',
        monthlyAmount: '$0.00',
      },
      {
        fieldName: 'Vehicle Insurance',
        frequency: 'Monthly',
        key: 'livingExpenses.insurance.vehicleInsurance.amount',
        meta: 'BrokerEngine label: Vehicle Insurance',
        monthlyAmount: '$0.00',
      },
      {
        fieldName: 'Other',
        frequency: 'Monthly',
        key: 'livingExpenses.insurance.other.amount',
        meta: 'BrokerEngine label: Other',
        monthlyAmount: '$0.00',
      },
    ],
    verifiedAmount: '$0.00',
  },
  {
    commentPrompt:
      'If your medical and health expenses are $0, please add a comment explaining why.',
    fieldName: 'Medical and Health (Excluding Insurance)',
    frequency: 'Monthly',
    key: 'livingExpenses.medicalAndHealth.monthlyAmount',
    meta: 'factFind.livingExpenses.household.medicalAndHealth',
    monthlyAmount: '$0.00',
    owner: "Alex Morgan's Household",
    required: true,
    status: 'requiresComment',
    subfields: [
      {
        fieldName: 'Doctor and Dentist',
        frequency: 'Monthly',
        key: 'livingExpenses.medicalAndHealth.doctorAndDentist.amount',
        meta: 'BrokerEngine label: Doctor and Dentist',
        monthlyAmount: '$0.00',
      },
      {
        fieldName: 'Optical and Pharmaceutical',
        frequency: 'Monthly',
        key: 'livingExpenses.medicalAndHealth.opticalAndPharmaceutical.amount',
        meta: 'BrokerEngine label: Optical and Pharmaceutical',
        monthlyAmount: '$0.00',
      },
      {
        fieldName: 'Other',
        frequency: 'Monthly',
        key: 'livingExpenses.medicalAndHealth.other.amount',
        meta: 'BrokerEngine label: Other',
        monthlyAmount: '$0.00',
      },
    ],
    verifiedAmount: '$0.00',
  },
  {
    commentPrompt:
      'If your transport expenses are $0, please add a comment explaining why.',
    fieldName: 'Transport',
    frequency: 'Monthly',
    key: 'livingExpenses.transport.monthlyAmount',
    meta: 'factFind.livingExpenses.household.transport',
    monthlyAmount: '$0.00',
    owner: "Alex Morgan's Household",
    required: true,
    status: 'requiresComment',
    subfields: [
      {
        fieldName: 'Public Transport (including Taxis and Ride-sharing)',
        frequency: 'Monthly',
        key: 'livingExpenses.transport.publicTransport.amount',
        meta: 'BrokerEngine label: Public Transport',
        monthlyAmount: '$0.00',
      },
      {
        fieldName:
          'Motor Vehicle Running Costs (including Fuel, Servicing and Registration)',
        frequency: 'Monthly',
        key: 'livingExpenses.transport.motorVehicleRunningCosts.amount',
        meta: 'BrokerEngine label: Motor Vehicle Running Costs',
        monthlyAmount: '$0.00',
      },
      {
        fieldName: 'Parking and Tolls',
        frequency: 'Monthly',
        key: 'livingExpenses.transport.parkingAndTolls.amount',
        meta: 'BrokerEngine label: Parking and Tolls',
        monthlyAmount: '$0.00',
      },
      {
        fieldName: 'Other',
        frequency: 'Monthly',
        key: 'livingExpenses.transport.other.amount',
        meta: 'BrokerEngine label: Other',
        monthlyAmount: '$0.00',
      },
    ],
    verifiedAmount: '$0.00',
  },
  {
    commentPrompt:
      'If your primary residence running costs expenses are $0, please add a comment explaining why.',
    fieldName: 'Primary Residence',
    frequency: 'Monthly',
    key: 'livingExpenses.primaryResidence.monthlyAmount',
    meta: 'factFind.livingExpenses.property.primaryResidence',
    monthlyAmount: '$0.00',
    owner: "Alex Morgan's Household",
    required: true,
    status: 'requiresComment',
    subfields: [
      {
        fieldName: 'Utilities',
        frequency: 'Monthly',
        key: 'livingExpenses.primaryResidence.utilities.amount',
        meta: 'BrokerEngine label: Utilities',
        monthlyAmount: '$0.00',
      },
      {
        fieldName: 'Council Rates',
        frequency: 'Monthly',
        key: 'livingExpenses.primaryResidence.councilRates.amount',
        meta: 'BrokerEngine label: Council Rates',
        monthlyAmount: '$0.00',
      },
      {
        fieldName: 'Repairs and Maintenance',
        frequency: 'Monthly',
        key: 'livingExpenses.primaryResidence.repairsAndMaintenance.amount',
        meta: 'BrokerEngine label: Repairs and Maintenance',
        monthlyAmount: '$0.00',
      },
      {
        fieldName: 'Body corp, owners corp or strata fees',
        frequency: 'Monthly',
        key: 'livingExpenses.primaryResidence.bodyCorpOwnersCorpStrataFees.amount',
        meta: 'BrokerEngine label: Body corp, owners corp or strata fees',
        monthlyAmount: '$0.00',
      },
      {
        fieldName: 'Land Tax',
        frequency: 'Monthly',
        key: 'livingExpenses.primaryResidence.landTax.amount',
        meta: 'BrokerEngine label: Land Tax',
        monthlyAmount: '$0.00',
      },
      {
        fieldName: 'Other',
        frequency: 'Monthly',
        key: 'livingExpenses.primaryResidence.other.amount',
        meta: 'BrokerEngine label: Other',
        monthlyAmount: '$0.00',
      },
    ],
    verifiedAmount: '$0.00',
  },
  {
    commentPrompt:
      'If your childcare and maintenance expenses are $0, confirm why this category is not applicable.',
    fieldName: 'Childcare and Maintenance',
    frequency: 'Monthly',
    key: 'livingExpenses.childcareAndMaintenance.monthlyAmount',
    meta: 'factFind.livingExpenses.household.childcareAndMaintenance',
    monthlyAmount: '$0.00',
    owner: "Alex Morgan's Household",
    status: 'complete',
    subfields: [
      {
        fieldName: 'Childcare',
        frequency: 'Monthly',
        key: 'livingExpenses.childcareAndMaintenance.childcare.amount',
        meta: 'BrokerEngine conditional category: Childcare',
        monthlyAmount: '$0.00',
      },
      {
        fieldName: 'Child support / maintenance',
        frequency: 'Monthly',
        key: 'livingExpenses.childcareAndMaintenance.childSupportMaintenance.amount',
        meta: 'BrokerEngine conditional category: Child support / maintenance',
        monthlyAmount: '$0.00',
      },
    ],
    verifiedAmount: '$0.00',
  },
  {
    commentPrompt:
      'If proposed purchase running costs are $0, confirm why this category is not applicable.',
    fieldName: 'Proposed Purchase (Non-primary Residence Only)',
    frequency: 'Monthly',
    key: 'livingExpenses.proposedPurchaseNonPrimaryResidenceOnly.monthlyAmount',
    meta: 'factFind.livingExpenses.property.proposedPurchaseNonPrimaryResidenceOnly',
    monthlyAmount: '$0.00',
    owner: "Alex Morgan's Household",
    status: 'complete',
    subfields: [
      {
        fieldName: 'Estimated running costs',
        frequency: 'Monthly',
        key: 'livingExpenses.proposedPurchaseNonPrimaryResidenceOnly.estimatedRunningCosts.amount',
        meta: 'BrokerEngine collapsed category: Proposed Purchase',
        monthlyAmount: '$0.00',
      },
    ],
    verifiedAmount: '$0.00',
  },
  {
    commentPrompt:
      'If rent expense is $0, confirm why this category is not applicable.',
    fieldName: 'Rent Expense',
    frequency: 'Monthly',
    key: 'livingExpenses.rentExpense.monthlyAmount',
    meta: 'factFind.livingExpenses.household.rentExpense',
    monthlyAmount: '$0.00',
    owner: "Alex Morgan's Household",
    status: 'complete',
    subfields: [
      {
        fieldName: 'Rent',
        frequency: 'Monthly',
        key: 'livingExpenses.rentExpense.rent.amount',
        meta: 'BrokerEngine collapsed category: Rent Expense',
        monthlyAmount: '$0.00',
      },
    ],
    verifiedAmount: '$0.00',
  },
  {
    commentPrompt:
      'If other expenses are $0, confirm why this category is not applicable.',
    fieldName: 'Other Expenses',
    frequency: 'Monthly',
    key: 'livingExpenses.otherExpenses.monthlyAmount',
    meta: 'factFind.livingExpenses.household.otherExpenses',
    monthlyAmount: '$0.00',
    owner: "Alex Morgan's Household",
    status: 'complete',
    subfields: [
      {
        fieldName: 'Other household expenses',
        frequency: 'Monthly',
        key: 'livingExpenses.otherExpenses.otherHouseholdExpenses.amount',
        meta: 'BrokerEngine collapsed category: Other Expenses',
        monthlyAmount: '$0.00',
      },
    ],
    verifiedAmount: '$0.00',
  },
];

const livingExpenseFieldMappings: FieldMapping[] =
  livingExpenseCategories.flatMap((category) => [
    {
      fieldName: category.fieldName,
      key: category.key,
      meta: category.meta,
      required: category.required,
    },
    ...category.subfields.map((subfield) => ({
      fieldName: subfield.fieldName,
      key: subfield.key,
      meta: subfield.meta,
      required: subfield.required,
    })),
    {
      fieldName: `${category.fieldName} Frequency`,
      key: `${category.key}.frequency`,
      meta: 'BrokerEngine per-field Frequency selector, default Monthly',
      required: category.required,
    },
    {
      fieldName: `${category.fieldName} Comments`,
      key: `${category.key}.comments`,
      meta: category.commentPrompt,
      required: category.status === 'requiresComment',
    },
  ]);

const applicantFactFindRows: ApplicantFactFindRow[] = [
  {
    applicant: 'Both applicants',
    fieldName: 'Number of Applicants',
    key: 'applicants.count',
    meta: 'conditional.factFind.applicants.count',
    primaryValue: '2',
    secondaryValue: '2',
  },
  {
    applicant: 'Primary Applicant',
    fieldName: 'First Name',
    key: 'applicants[0].firstName',
    meta: 'factFind.applicants.primary.firstName',
    primaryValue: 'Alex',
    secondaryValue: '',
  },
  {
    applicant: 'Primary Applicant',
    fieldName: 'Surname',
    key: 'applicants[0].lastName',
    meta: 'factFind.applicants.primary.lastName',
    primaryValue: 'Morgan',
    secondaryValue: '',
  },
  {
    applicant: 'Primary Applicant',
    fieldName: 'Email',
    key: 'applicants[0].email',
    meta: 'factFind.applicants.primary.email',
    primaryValue: 'alex.morgan@example.com',
    secondaryValue: '',
  },
  {
    applicant: 'Primary Applicant',
    fieldName: 'Mobile',
    key: 'applicants[0].mobile',
    meta: 'factFind.applicants.primary.mobile',
    primaryValue: '+61 400 000 001',
    secondaryValue: '',
  },
  {
    applicant: 'Co-applicant 1',
    fieldName: 'Email',
    key: 'applicants[1].email',
    meta: 'factFind.applicants.coApplicant1.email',
    primaryValue: '',
    secondaryValue: 'jordan.morgan@example.com',
  },
  {
    applicant: 'Co-applicant 1',
    fieldName: 'Mobile',
    key: 'applicants[1].mobile',
    meta: 'factFind.applicants.coApplicant1.mobile',
    primaryValue: '',
    secondaryValue: '+61 400 000 002',
  },
];

const addressHistoryRows = [
  {
    applicant: 'Primary Applicant',
    current: 'Yes',
    from: '01/05/2023',
    key: 'applicants[0].addresses[0]',
    meta: 'equifax.addressHistory.primary.currentAddress',
    months: '36+',
    residentialAddress: 'AU',
    to: 'Current',
  },
  {
    applicant: 'Co-applicant 1',
    current: 'Yes',
    from: '01/05/2023',
    key: 'applicants[1].addresses[0]',
    meta: 'equifax.addressHistory.coApplicant1.currentAddress',
    months: '36+',
    residentialAddress: 'Melbourne VIC 3000 AU',
    to: 'Current',
  },
];

const fieldMappingsByPage: Record<string, FieldMapping[]> = {
  applicants: [
    {
      fieldName: 'Primary Applicant',
      key: 'applicants[0]',
      meta: 'conditional.showWhen.applicants.count >= 1',
      required: true,
    },
    {
      fieldName: 'Co-applicant 1',
      key: 'applicants[1]',
      meta: 'conditional.showWhen.applicants.count >= 2',
      required: true,
    },
    {
      fieldName: '3 Year Address History',
      key: 'applicants[].addresses',
      meta: 'requiredFor.equifax.creditReport.addressHistory36Months',
      required: true,
    },
  ],
  'living-expenses': livingExpenseFieldMappings,
};

const factFindWizardPages = [
  'Online Fact Find Form',
  'Personal Details',
  'Employment and Income Details',
  'Assets',
  'Liabilities',
  'Living Expenses',
  'Loan Features',
];

const factFindFieldGroupsByPage: Record<string, FactFindFieldGroup[]> = {
  applicants: [
    {
      condition: 'Shown when applicants.count >= 1',
      fields: [
        {
          fieldName: 'Number of applicants',
          key: 'factFind.applicantCount',
          meta: 'BrokerEngine alias: Number of applicants',
          required: true,
        },
        {
          fieldName: 'Title',
          key: 'applicants[].title',
          meta: 'LIXI-first destination: Contact / Applicant Profile',
        },
        {
          fieldName: 'First name',
          key: 'applicants[].firstName',
          meta: 'BrokerEngine alias: First name',
          required: true,
        },
        {
          fieldName: 'Middle name',
          key: 'applicants[].middleName',
          meta: 'Applicant identity',
        },
        {
          fieldName: 'Last name',
          key: 'applicants[].lastName',
          meta: 'BrokerEngine alias: Last name',
          required: true,
        },
        {
          fieldName: 'Preferred name',
          key: 'applicants[].preferredName',
          meta: 'BrokerEngine alias: Preferred Name',
        },
        {
          fieldName: 'Date of birth',
          key: 'applicants[].dateOfBirth',
          meta: 'Use approved storage and consent controls',
          required: true,
        },
        {
          fieldName: 'Mobile phone',
          key: 'applicants[].mobilePhone',
          meta: 'Maps to Contact phone',
          required: true,
        },
        {
          fieldName: 'Email',
          key: 'applicants[].email',
          meta: 'Maps to Contact email',
          required: true,
        },
        {
          fieldName: 'Self Employed',
          key: 'applicants[].isSelfEmployed',
          meta: 'Conditional gate for self-employed income fields',
        },
        {
          fieldName: 'Are you a first home buyer?',
          key: 'applicants[].isFirstHomeBuyer',
          meta: 'Scenario flag for grants, concessions and workflow prompts',
        },
        {
          fieldName: 'Partner of Applicant 1',
          key: 'applicants[].isPartnerOfPrimaryApplicant',
          meta: 'Shown for co-applicant sections',
        },
        {
          fieldName: 'Relationship to Primary Applicant',
          key: 'applicants[].relationshipToPrimaryApplicant',
          meta: 'Shown for applicant index > 0',
        },
      ],
      pageId: 'Personal Details',
      title: 'Applicant Identity',
    },
    {
      condition: 'Required for Equifax and credit-report-ready data',
      fields: [
        {
          fieldName: 'Current residential address',
          key: 'applicants[].addresses.current.fullAddress',
          meta: 'Address lookup with manual override',
          required: true,
        },
        {
          fieldName: 'Address start date',
          key: 'applicants[].addresses.current.startDate',
          meta: 'Used to calculate 36-month address coverage',
          required: true,
        },
        {
          fieldName: 'Housing status',
          key: 'applicants[].addresses.current.housingStatus',
          meta: 'Rent/board/own/home ownership serviceability input',
        },
        {
          fieldName: 'Same as Applicant 1',
          key: 'applicants[].addresses.sameAsPrimaryApplicant',
          meta: 'Shown for co-applicants only',
        },
        {
          fieldName: 'Previous addresses in last 3 years',
          key: 'applicants[].addresses.previous[]',
          meta: 'Repeatable block until 36 months coverage is met',
          required: true,
        },
      ],
      pageId: 'Personal Details',
      title: 'Current and Previous Address History',
    },
  ],
  assets: [
    {
      condition: 'Shown from fact-find Assets page gates',
      fields: [
        {
          fieldName: 'Own current residence?',
          key: 'assets.ownerOccupiedRealEstate.hasCurrentResidence',
          meta: 'BrokerEngine gate: own current residence flag',
        },
        {
          fieldName: 'Investment property?',
          key: 'assets.investmentProperties.hasInvestmentProperty',
          meta: 'Conditional repeatable investment property block',
        },
        {
          fieldName: 'Motor vehicle?',
          key: 'assets.motorVehicles.hasMotorVehicle',
          meta: 'Conditional repeatable motor vehicle block',
        },
        {
          fieldName: 'Savings/transaction account?',
          key: 'assets.savingsAccounts.hasSavingsAccount',
          meta: 'Conditional repeatable savings account block',
        },
        {
          fieldName: 'Superannuation?',
          key: 'assets.superannuation.hasSuperannuation',
          meta: 'Conditional repeatable superannuation block',
        },
        {
          fieldName: 'Other assets',
          key: 'assets.otherAssets[]',
          meta: 'Description, value, ownership and evidence status',
        },
      ],
      pageId: 'Assets',
      title: 'Asset Gates and Repeatable Blocks',
    },
  ],
  dependants: [
    {
      condition: 'Used for household and servicing assumptions',
      fields: [
        {
          fieldName: 'Number of dependants',
          key: 'household.dependants.count',
          meta: 'Maps to Household and serviceability assumptions',
          required: true,
        },
        {
          fieldName: 'Dependent name',
          key: 'household.dependants[].name',
          meta: 'Repeatable dependant row',
        },
        {
          fieldName: 'Dependent date of birth',
          key: 'household.dependants[].dateOfBirth',
          meta: 'Used to calculate age in years',
        },
        {
          fieldName: 'Dependent age in years',
          key: 'household.dependants[].ageYears',
          meta: 'Calculated/display field',
        },
      ],
      pageId: 'Personal Details',
      title: 'Dependants',
    },
  ],
  'financial-security': [
    {
      condition: 'Required before recommendation and BID evidence is complete',
      fields: [
        {
          fieldName: 'Emergency buffer',
          key: 'financialSecurity.emergencyBufferAmount',
          meta: 'Broker review and responsible lending note',
        },
        {
          fieldName: 'Income protection',
          key: 'financialSecurity.incomeProtectionStatus',
          meta: 'Referral/status only; do not provide insurance advice here',
        },
        {
          fieldName: 'Exit strategy',
          key: 'financialSecurity.exitStrategy',
          meta: 'Required if loan term extends beyond retirement age',
        },
        {
          fieldName: 'Hardship resilience',
          key: 'financialSecurity.hardshipResilienceSummary',
          meta: 'Credit proposal and broker notes',
        },
      ],
      pageId: 'Loan Features',
      title: 'Financial Security and Exit Strategy',
    },
  ],
  liabilities: [
    {
      condition: 'Each liability type uses a yes/no gate and repeatable rows',
      fields: [
        {
          fieldName: 'Home loans',
          key: 'liabilities.homeLoans[]',
          meta: 'Financial institution, limit, balance, repayment, refinance flag',
        },
        {
          fieldName: 'Credit cards',
          key: 'liabilities.creditCards[]',
          meta: 'Limit, balance, interest rate, ownership, refinance flag',
        },
        {
          fieldName: 'Store cards / BNPL',
          key: 'liabilities.storeCardsAndBnpl[]',
          meta: 'BrokerEngine helper includes BNPL examples',
        },
        {
          fieldName: 'Personal loans',
          key: 'liabilities.personalLoans[]',
          meta: 'Monthly repayment, term remaining, refinance flag',
        },
        {
          fieldName: 'HECS/HELP',
          key: 'liabilities.hecsHelpBalance',
          meta: 'Serviceability and tax treatment input',
        },
      ],
      pageId: 'Liabilities',
      title: 'Liabilities',
    },
  ],
  'living-expenses': [
    {
      condition:
        'Required for responsible lending, HEM comparison and zero-expense comment validation',
      fields: livingExpenseFieldMappings,
      pageId: 'Living Expenses',
      title: 'Monthly Living Expenses',
    },
  ],
  'other-income': [
    {
      condition: 'Shown when applicant declares additional or non-base income',
      fields: [
        {
          fieldName: 'Rental income',
          key: 'income.rentalIncome[]',
          meta: 'Lease/rental statement evidence and lender shading',
        },
        {
          fieldName: 'Bonus / commission / overtime',
          key: 'income.additionalEmploymentIncome[]',
          meta: 'Amount, income type, frequency, evidence status',
        },
        {
          fieldName: 'Centrelink / allowances',
          key: 'income.governmentBenefits[]',
          meta: 'Eligibility, frequency and evidence',
        },
        {
          fieldName: 'Maintenance income',
          key: 'income.maintenanceIncome[]',
          meta: 'Evidence and lender policy treatment',
        },
      ],
      pageId: 'Employment and Income Details',
      title: 'Other Income Sources',
    },
  ],
  goals: [
    {
      condition: 'Required before product filtering and credit proposal',
      fields: [
        {
          fieldName: 'Loan purpose',
          key: 'loanRequirements.loanPurpose',
          meta: 'Purchase/refinance/pre-approval/construction/investment',
          required: true,
        },
        {
          fieldName: 'Desired outcome',
          key: 'loanRequirements.desiredOutcome',
          meta: 'BID and recommendation rationale',
          required: true,
        },
        {
          fieldName: 'Settlement requirements',
          key: 'loanRequirements.settlementRequirements',
          meta: 'Finance date, settlement date and urgency',
        },
        {
          fieldName: 'Product preferences',
          key: 'loanRequirements.productPreferences',
          meta: 'Fixed/variable/split, offset, redraw, IO/PI',
        },
        {
          fieldName: 'Known constraints',
          key: 'loanRequirements.knownConstraints',
          meta: 'Broker review and product filtering',
        },
      ],
      pageId: 'Loan Features',
      title: 'Goals, Objectives and Requirements',
    },
  ],
};

const blockerTasks: Array<[string, string]> = [
  ['credit-guide', 'Credit Guide & Privacy Consent captured for all borrowers'],
  ['identity', 'KYC/AML identity documents received and matched'],
  ['team', 'Broker, processor and credit reviewer assigned'],
  ['rental-income', 'Rental income statement is still missing'],
  ['living-expenses', 'Living expenses need client confirmation'],
  ['credit-consent', 'Credit check consent not captured'],
  ['bid', 'Best Interests Duty rationale not approved'],
];

const statusColor: Record<WorkflowStatus, string> = {
  active: themeCssVariables.color.blue,
  blocked: themeCssVariables.color.red,
  complete: themeCssVariables.color.green,
  waiting: themeCssVariables.color.orange,
};

const quickViewTabs: QuickViewTab[] = [
  'Note',
  'Task',
  'Email',
  'SMS',
  'Interview Guide',
  'Products',
];

const pageBlueprints: Record<string, PageBlueprint> = {
  applicants: {
    fields: [
      ['Primary applicant', 'Alex Morgan'],
      ['Mobile', '+61 400 000 001'],
      ['Email', 'alex.morgan@example.com'],
      ['Co-applicant', 'Jordan Morgan'],
      ['Residency', 'AU'],
      ['Credit check status', 'Not sent'],
    ],
    sections: [
      [
        'Applicant Table',
        'One row per applicant with conditional co-applicant fields when applicant count is greater than one.',
      ],
      [
        'Address History',
        'Equifax-ready residential address history covering at least 3 years for every applicant.',
      ],
      [
        'Identity and VOI',
        'Collect full legal name, DOB, ID, PEP and sanctions checks.',
      ],
      [
        'Employment',
        'Capture role, employer, tenure, income basis and probation.',
      ],
      [
        'Contact preferences',
        'Email, SMS, portal access and privacy permissions.',
      ],
    ],
    tabs: ['Applicant', 'Employment', 'Address History', 'Portal Access'],
  },
  assets: {
    fields: [
      ['Savings', '$118,000'],
      ['Owner occupied property', '$1,420,000'],
      ['Investment property', '$680,000'],
      ['Vehicles and other assets', '$46,000'],
    ],
    sections: [
      ['Evidence', 'Bank statements, rate notices and ownership verification.'],
      [
        'Source of funds',
        'Deposit source, gifts, equity release and AML reasonableness.',
      ],
      [
        'Valuation notes',
        'Access contact, valuation path and AVM/manual status.',
      ],
    ],
  },
  brokerwizard: {
    fields: [
      ['Scenario type', 'Residential purchase and refinance'],
      ['Workflow', 'Outstanding Supporting Documents'],
      ['Risk level', 'Medium'],
      ['Commercial branch', 'Not required for this loan type'],
    ],
    sections: [
      [
        'Scenario prompts',
        'Guarantor, construction, trust, FIRB and maternity leave checks.',
      ],
      ['Exception handling', 'Document mitigants and escalation decisions.'],
      [
        'Residential lodgement',
        'Prepare ApplyOnline data once direct lodgement is available.',
      ],
    ],
    tabs: ['Scenario', 'Exceptions', 'Workflow Builder'],
  },
  'credit-proposal': {
    fields: [
      ['Recommendation status', 'Draft'],
      ['BID rationale', 'Required'],
      ['Responsible lending assessment', 'Required'],
      ['Credit reviewer', 'Unassigned'],
    ],
    sections: [
      [
        'Best Interests Duty',
        'Compare product shortlist, costs, features and client priorities.',
      ],
      [
        'Unsuitability check',
        'Record ability to repay without substantial hardship.',
      ],
      [
        'Proposal pack',
        'Generate credit proposal, evidence checklist and client acknowledgements.',
      ],
    ],
    tabs: ['Summary', 'Recommendation', 'Compliance', 'Approval'],
  },
  dependants: {
    fields: [
      ['Number of dependants', '2'],
      ['Ages', '5, 8'],
      ['Shared care', 'No'],
      ['Childcare expense', '$1,200/mo'],
    ],
    sections: [
      ['Household profile', 'Confirm family composition and expected changes.'],
      [
        'Expense assumptions',
        'Map dependant count to servicing and living expenses.',
      ],
      [
        'Risk notes',
        'Capture school fees, care arrangements and future leave.',
      ],
    ],
  },
  'financial-security': {
    fields: [
      ['Emergency buffer', '$35,000'],
      ['Income protection', 'Not recorded'],
      ['Risk appetite', 'Balanced'],
      ['Hardship buffer', 'Needs review'],
    ],
    sections: [
      [
        'Contingency planning',
        'Assess rate rises, parental leave, job loss and illness.',
      ],
      [
        'Insurance prompts',
        'Flag referral and client preference without advice conflict.',
      ],
      [
        'Broker notes',
        'Record why the structure remains appropriate for the client.',
      ],
    ],
  },
  'funding-position': {
    fields: [
      ['Purchase price', '$1,125,000'],
      ['Refinance payout', '$612,000'],
      ['Funds required', '$248,000'],
      ['Verified funds', '$198,000'],
    ],
    sections: [
      [
        'Cash to complete',
        'Deposit, stamp duty, fees, rebates and surplus cash.',
      ],
      ['Source of funds', 'Savings, gift, equity release and sale proceeds.'],
      ['Shortfall checks', 'Flag missing funds before proposal and lodgement.'],
    ],
    tabs: ['Funding Table', 'Fees', 'Source of Funds'],
  },
  goals: {
    fields: [
      ['Primary goal', 'Buy family home and retain existing property'],
      ['Loan purpose', 'Purchase and refinance'],
      ['Priority', 'Approval certainty, offset, fast settlement'],
      ['Timeframe', 'Finance due 22 May 2026'],
    ],
    sections: [
      [
        'Needs and objectives',
        'Record the customer objective before product selection.',
      ],
      [
        'Preferences',
        'Rate type, offset, redraw, repayment type and split structure.',
      ],
      [
        'Constraints',
        'Settlement date, deposit, serviceability and lender restrictions.',
      ],
    ],
    tabs: ['Objectives', 'Preferences', 'Constraints'],
  },
  'interview-guide': {
    fields: [
      ['Guide status', 'In progress'],
      ['Responsible broker', 'Lend A Loan Broker'],
      ['Last question completed', 'Objectives'],
      ['Next prompt', 'Exit strategy and buffers'],
    ],
    sections: [
      [
        'Fact find prompts',
        'Income, expenses, assets, liabilities and household changes.',
      ],
      [
        'Compliance prompts',
        'Credit guide, privacy, BID, conflicts and responsible lending.',
      ],
      [
        'Lender prompts',
        'Policy exceptions, valuation, LVR, mortgage insurer and channel.',
      ],
    ],
    tabs: ['Interview', 'Compliance', 'Notes'],
  },
  lender: {
    fields: [
      ['Lender Name', 'Other'],
      ['Broker Code', 'Not recorded'],
      ['Lender Reference', 'Not recorded'],
      ['Authority to Debit Available', 'No'],
      ['Lodgement channel', 'ApplyOnline once direct lodgement is configured'],
    ],
    sections: [
      ['Lender Notes', 'Internal notes, exceptions and assessor call history.'],
      [
        'Lender Contact Details',
        'Phone, email, postal address and lender support team records.',
      ],
      [
        'Assessor Details',
        'Assessment team, queue notes and contact instructions.',
      ],
      ['Lender BDM', 'BDM contact, escalation path and pricing authority.'],
      [
        'Lender Legal',
        'External solicitor details when lender uses third-party settlements.',
      ],
      ['Linked Branch Details', 'Branch relationship and referral status.'],
      [
        'Post Settlement Details',
        'Post-settlement follow-up, discharge and rebate tracking.',
      ],
      [
        'Business Banker Details',
        'Only used for business or commercial-linked deals.',
      ],
      ['Web Tracking', 'Reference numbers, portal links and status sync.'],
      ['Policy Details', 'Credit policy exceptions and mitigants.'],
      [
        'Construction',
        'Progress draw rules and construction pack requirements.',
      ],
      ['Valuations', 'Order status, access contact and valuation expiry.'],
      ['Variations', 'Variation request history.'],
      ['Pricing', 'Rate lock, pricing request and repricing history.'],
      ['Insurance', 'Interested party and certificate of currency details.'],
    ],
    tabs: ['Lender', 'Lender BDM', 'Outgoing Lender'],
  },
  liabilities: {
    fields: [
      ['Credit card limits', '$38,000'],
      ['Personal loans', '$18,400'],
      ['HECS/HELP', '$42,000'],
      ['Repayments verified', 'Partial'],
    ],
    sections: [
      [
        'Liability capture',
        'Cards, limits, leases, loans, buy now pay later and HECS.',
      ],
      [
        'Credit report reconciliation',
        'Compare declared liabilities to bureau data.',
      ],
      ['Exit actions', 'Close, reduce or refinance limits before approval.'],
    ],
  },
  'living-expenses': {
    fields: [
      ['Declared expenses', '$6,420/mo'],
      ['HEM benchmark', '$5,890/mo'],
      ['Expense method', 'Client declared with broker review'],
      ['Status', 'Needs client confirmation'],
    ],
    sections: [
      [
        'Categories',
        'Housing, food, utilities, transport, insurance and discretionary.',
      ],
      [
        'Reasonableness',
        'Compare declared expenses to bank statements and HEM.',
      ],
      [
        'Changes after settlement',
        'Capture childcare, rent cessation and rate buffers.',
      ],
    ],
  },
  'lodgement-funding': {
    fields: [
      ['Cash to complete', '$248,000'],
      ['Verified funds', '$198,000'],
      ['Shortfall', '$50,000'],
      ['Funding status', 'Blocked'],
    ],
    sections: [
      [
        'Final funding table',
        'Purchase, refinance payout, fees, rebates and surplus.',
      ],
      [
        'Document map',
        'Source-of-funds evidence and lender checklist mapping.',
      ],
      ['Processor review', 'Confirm all amounts before submission.'],
    ],
    tabs: ['Funding', 'Evidence', 'Review'],
  },
  loandash: {
    fields: [
      ['Loan amount', '$0.00'],
      ['Stage', '1 Outstanding Supporting Documents'],
      ['Client portal', 'Draft'],
      ['Readiness', 'Blocked'],
    ],
    sections: [
      [
        'Recent Activity',
        'Outstanding Supporting Documents workflow triggered.',
      ],
      [
        'Applicants',
        'Primary and co-applicant loaded with portal access pending.',
      ],
      [
        'Credit Guide & Privacy Consent',
        'Required before progressing the deal.',
      ],
      ['Team', 'Broker and loan processor ownership.'],
      ['Lender', 'Target lender and ApplyOnline readiness.'],
      ['Pending', 'One task remains open.'],
    ],
    tabs: ['Deal', 'FinanceVault', 'Applicants', 'Compliance'],
  },
  'other-income': {
    fields: [
      ['Rental income', '$18,500'],
      ['Bonus/overtime', 'Not used'],
      ['Centrelink/allowances', 'Not applicable'],
      ['Evidence status', 'Required'],
    ],
    sections: [
      [
        'Rental evidence',
        'Lease, rental statement and ownership confirmation.',
      ],
      ['Income policy', 'Lender shading and continuity requirements.'],
      ['Servicing treatment', 'Mark income as included, shaded or excluded.'],
    ],
  },
  products: {
    fields: [
      ['Shortlist status', 'Not started'],
      ['Preferred structure', 'Variable with offset'],
      ['Product count', '0'],
      ['Client priority', 'Certainty and offset features'],
    ],
    sections: [
      [
        'Product shortlist',
        'Compare rate, fees, features, cashback and policy fit.',
      ],
      [
        'Recommendation rationale',
        'Tie product choice back to goals and BID evidence.',
      ],
      [
        'ApplyOnline mapping',
        'Prepare selected product codes for residential submission.',
      ],
    ],
    tabs: ['Research', 'Comparison', 'Recommendation'],
  },
  'related-parties': {
    fields: [
      ['Conveyancer', 'Not recorded'],
      ['Accountant', 'Not recorded'],
      ['Referrer', 'Not recorded'],
      ['Introducer', 'Not applicable'],
    ],
    sections: [
      [
        'Professional contacts',
        'Conveyancer, accountant, financial adviser and solicitor.',
      ],
      [
        'Conflict checks',
        'Related-party, introducer and commission disclosures.',
      ],
      [
        'Communication permissions',
        'Confirm who can receive documents and updates.',
      ],
    ],
  },
  security: {
    fields: [
      ['Security property', 'Sample security property, Melbourne VIC'],
      ['Purpose', 'Owner occupied and investment refinance'],
      ['Valuation status', 'Not ordered'],
      ['Insurance status', 'Not recorded'],
    ],
    sections: [
      [
        'Property details',
        'Address, title, zoning, occupancy and access contact.',
      ],
      ['Valuation', 'AVM/manual valuation path and expiry.'],
      [
        'Guarantor/cross security',
        'Record guarantee and cross collateralisation risks.',
      ],
    ],
  },
  'smart-docs': {
    fields: [
      ['Document pack', 'Outstanding Supporting Documents'],
      ['Generated docs', '0'],
      ['Approved docs', '0'],
      ['Rejected docs', '0'],
    ],
    sections: [
      [
        'Client portal',
        'Request, receive, approve and reject applicant documents.',
      ],
      [
        'Application documents',
        'Privacy, credit guide, proposal and lender forms.',
      ],
      ['Evidence pack', 'Map files to lender checklist before submission.'],
    ],
    tabs: ['Requests', 'Generated', 'Evidence Pack'],
  },
  submission: {
    fields: [
      ['Submission method', 'ApplyOnline planned'],
      ['Residential status', 'Awaiting direct lodgement setup'],
      ['Commercial/business path', 'Separate workflow required'],
      ['Submission readiness', 'Blocked'],
    ],
    sections: [
      [
        'ApplyOnline data review',
        'Match application data to fact find and proposal.',
      ],
      [
        'Lender checklist',
        'Supporting documents, policy notes and exception commentary.',
      ],
      [
        'Submission history',
        'Track submitted, MIR, approval and settlement milestones.',
      ],
    ],
    tabs: ['ApplyOnline', 'Checklist', 'History'],
  },
  team: {
    fields: [
      ['Broker', 'Lend A Loan Broker (broker@example.com)'],
      ['Lender', 'Other'],
      ['Default Broker Brand', 'LEND A LOAN'],
      ['Loan Processor', 'Lend A Loan Broker'],
    ],
    sections: [
      ['Broker Details', 'Broker, lender and default brand assignment.'],
      [
        'Contact Details',
        'Broker contact record and email/report preferences.',
      ],
      ['Brands', 'Broker brand and client-facing identity.'],
      ['Addresses', 'Office and disclosure address details.'],
      ['Review Links', 'Client review links and survey status.'],
      [
        'Scheduled Client Reviews',
        'Post settlement and periodic review cadence.',
      ],
      ['Fixed Rate Expiry Reviews', 'Review trigger for fixed-rate expiry.'],
      [
        'Interest-Only Expiry Reviews',
        'Review trigger for interest-only expiry.',
      ],
      ['Client Birthday Reviews', 'Relationship touchpoint workflow.'],
    ],
    tabs: ['Broker', 'Team Roles', 'Assigned Team'],
  },
};

const navHashAliases: Record<string, string> = {
  'credit-checks': 'credit-proposal',
  serviceability: 'funding-position',
  tasks: 'lodgement-funding',
};

const StyledPage = styled.div`
  background: ${themeCssVariables.background.secondary};
  color: ${themeCssVariables.font.color.primary};
  display: grid;
  grid-template-columns: 248px minmax(760px, 1fr) 340px;
  min-height: 100%;
  min-width: 1348px;
  overflow: auto;
  width: 100%;
`;

const StyledWorkflowSidebar = styled.aside`
  background: ${themeCssVariables.background.primary};
  border-right: 1px solid ${themeCssVariables.border.color.light};
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: auto;
`;

const StyledSidebarTitle = styled.div`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.sm};
  font-weight: ${themeCssVariables.font.weight.medium};
  padding: ${themeCssVariables.spacing[4]} ${themeCssVariables.spacing[4]}
    ${themeCssVariables.spacing[2]};
  text-transform: uppercase;
`;

const StyledGroup = styled.div`
  border-bottom: 1px solid ${themeCssVariables.border.color.light};
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[1]};
  padding: ${themeCssVariables.spacing[2]};
`;

const StyledGroupLabel = styled.div`
  align-items: center;
  color: ${themeCssVariables.font.color.primary};
  display: flex;
  font-size: ${themeCssVariables.font.size.lg};
  font-weight: ${themeCssVariables.font.weight.semiBold};
  gap: ${themeCssVariables.spacing[2]};
  justify-content: space-between;
  padding: ${themeCssVariables.spacing[2]};
`;

const StyledNewBadge = styled.span`
  border: 1px solid ${themeCssVariables.color.green};
  border-radius: ${themeCssVariables.border.radius.sm};
  color: ${themeCssVariables.color.green};
  font-size: ${themeCssVariables.font.size.sm};
  font-weight: ${themeCssVariables.font.weight.medium};
  padding: 1px ${themeCssVariables.spacing[1]};
`;

const StyledWorkflowButton = styled.button<{ active: boolean }>`
  align-items: center;
  background: ${({ active }) =>
    active ? themeCssVariables.background.transparent.light : 'transparent'};
  border: 0;
  border-radius: ${themeCssVariables.border.radius.sm};
  color: ${({ active }) =>
    active
      ? themeCssVariables.font.color.primary
      : themeCssVariables.font.color.secondary};
  cursor: pointer;
  display: grid;
  font-family: ${themeCssVariables.font.family};
  font-weight: ${({ active }) =>
    active
      ? themeCssVariables.font.weight.semiBold
      : themeCssVariables.font.weight.medium};
  gap: ${themeCssVariables.spacing[2]};
  grid-template-columns: 8px 1fr;
  min-height: ${themeCssVariables.spacing[8]};
  padding: 0 ${themeCssVariables.spacing[3]};
  text-align: left;
`;

const StyledStatusDot = styled.span<{ status: WorkflowStatus }>`
  background: ${({ status }) => statusColor[status]};
  border-radius: 999px;
  height: 7px;
  width: 7px;
`;

const StyledWorkflowButtonLabel = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: auto;
`;

const StyledTopAlert = styled.div`
  align-items: center;
  background: ${themeCssVariables.color.yellow10};
  border-bottom: 1px solid ${themeCssVariables.border.color.light};
  color: ${themeCssVariables.font.color.primary};
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
  justify-content: space-between;
  min-height: ${themeCssVariables.spacing[8]};
  padding: 0 ${themeCssVariables.spacing[4]};
`;

const StyledTopAlertText = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
`;

const StyledLoanTopbar = styled.div`
  align-items: center;
  background: ${themeCssVariables.background.primary};
  border-bottom: 1px solid ${themeCssVariables.border.color.light};
  display: grid;
  gap: ${themeCssVariables.spacing[4]};
  grid-template-columns: minmax(360px, 1fr) auto;
  min-height: 58px;
  padding: 0 ${themeCssVariables.spacing[4]};
`;

const StyledTopbarIdentity = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[3]};
  min-width: 0;
`;

const StyledIconButton = styled.button<{ active?: boolean }>`
  align-items: center;
  background: ${({ active }) =>
    active
      ? themeCssVariables.background.transparent.light
      : themeCssVariables.background.primary};
  border: 1px solid ${themeCssVariables.border.color.medium};
  border-radius: ${themeCssVariables.border.radius.sm};
  color: ${themeCssVariables.font.color.primary};
  cursor: pointer;
  display: inline-flex;
  font-family: ${themeCssVariables.font.family};
  height: ${themeCssVariables.spacing[8]};
  justify-content: center;
  min-width: ${themeCssVariables.spacing[8]};
`;

const StyledTopbarTitle = styled.div`
  font-size: ${themeCssVariables.font.size.xl};
  font-weight: ${themeCssVariables.font.weight.semiBold};
`;

const StyledHeader = styled.header`
  background: ${themeCssVariables.background.primary};
  border-bottom: 1px solid ${themeCssVariables.border.color.light};
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[4]};
  padding: ${themeCssVariables.spacing[5]};
`;

const StyledTitleRow = styled.div`
  align-items: flex-start;
  display: flex;
  gap: ${themeCssVariables.spacing[4]};
  justify-content: space-between;
`;

const StyledEyebrow = styled.div`
  color: ${themeCssVariables.font.color.tertiary};
  font-size: ${themeCssVariables.font.size.sm};
  font-weight: ${themeCssVariables.font.weight.medium};
  text-transform: uppercase;
`;

const StyledHeading = styled.h1`
  font-size: 30px;
  font-weight: ${themeCssVariables.font.weight.semiBold};
  letter-spacing: 0;
  line-height: 1.2;
  margin: ${themeCssVariables.spacing[1]} 0;
`;

const StyledSubheading = styled.div`
  color: ${themeCssVariables.font.color.secondary};
  font-size: ${themeCssVariables.font.size.md};
`;

const StyledActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${themeCssVariables.spacing[2]};
`;

const StyledButton = styled.button<{ accent?: 'primary' | 'secondary' }>`
  align-items: center;
  background: ${({ accent }) =>
    accent === 'primary'
      ? themeCssVariables.color.blue
      : themeCssVariables.background.primary};
  border: 1px solid
    ${({ accent }) =>
      accent === 'primary'
        ? themeCssVariables.color.blue
        : themeCssVariables.border.color.medium};
  border-radius: ${themeCssVariables.border.radius.sm};
  color: ${({ accent }) =>
    accent === 'primary'
      ? themeCssVariables.color.gray1
      : themeCssVariables.font.color.primary};
  cursor: pointer;
  display: inline-flex;
  font-family: ${themeCssVariables.font.family};
  font-size: ${themeCssVariables.font.size.md};
  gap: ${themeCssVariables.spacing[2]};
  height: ${themeCssVariables.spacing[8]};
  justify-content: center;
  padding: 0 ${themeCssVariables.spacing[3]};
`;

const StyledSelect = styled.select`
  background: ${themeCssVariables.background.primary};
  border: 1px solid ${themeCssVariables.border.color.medium};
  border-radius: ${themeCssVariables.border.radius.sm};
  color: ${themeCssVariables.font.color.primary};
  font-family: ${themeCssVariables.font.family};
  height: ${themeCssVariables.spacing[8]};
  padding: 0 ${themeCssVariables.spacing[2]};
`;

const StyledStatsGrid = styled.div`
  display: grid;
  gap: ${themeCssVariables.spacing[3]};
  grid-template-columns: repeat(4, minmax(130px, 1fr));
`;

const StyledMetric = styled.div`
  background: ${themeCssVariables.background.primary};
  border: 1px solid ${themeCssVariables.border.color.light};
  border-radius: ${themeCssVariables.border.radius.sm};
  padding: ${themeCssVariables.spacing[3]};
`;

const StyledMetricLabel = styled.div`
  color: ${themeCssVariables.font.color.light};
  font-size: ${themeCssVariables.font.size.sm};
`;

const StyledMetricValue = styled.div`
  font-size: 22px;
  font-weight: ${themeCssVariables.font.weight.semiBold};
  margin-top: ${themeCssVariables.spacing[1]};
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[5]};
  padding: ${themeCssVariables.spacing[5]};
`;

const StyledOpenLoanStrip = styled.div`
  align-items: center;
  background: ${themeCssVariables.background.primary};
  border-bottom: 1px solid ${themeCssVariables.border.color.light};
  color: ${themeCssVariables.font.color.secondary};
  display: flex;
  gap: ${themeCssVariables.spacing[3]};
  min-height: ${themeCssVariables.spacing[10]};
  padding: 0 ${themeCssVariables.spacing[5]};

  strong {
    color: ${themeCssVariables.font.color.primary};
  }
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[3]};
`;

const StyledSectionHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const StyledSectionTitle = styled.h2`
  font-size: ${themeCssVariables.font.size.xl};
  font-weight: ${themeCssVariables.font.weight.semiBold};
  letter-spacing: 0;
  margin: 0;
`;

const StyledSectionMeta = styled.div`
  color: ${themeCssVariables.font.color.secondary};
  font-size: ${themeCssVariables.font.size.sm};
`;

const StyledTwoColumn = styled.div`
  display: grid;
  gap: ${themeCssVariables.spacing[4]};
  grid-template-columns: minmax(300px, 0.9fr) minmax(360px, 1.1fr);
`;

const StyledPanel = styled.div`
  background: ${themeCssVariables.background.primary};
  border: 1px solid ${themeCssVariables.border.color.light};
  border-radius: ${themeCssVariables.border.radius.sm};
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[3]};
  padding: ${themeCssVariables.spacing[4]};
`;

const StyledPanelTitle = styled.div`
  align-items: center;
  display: flex;
  font-weight: ${themeCssVariables.font.weight.semiBold};
  gap: ${themeCssVariables.spacing[2]};
`;

const StyledChecklist = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[2]};
`;

const StyledChecklistRow = styled.label`
  align-items: flex-start;
  color: ${themeCssVariables.font.color.secondary};
  display: grid;
  gap: ${themeCssVariables.spacing[2]};
  grid-template-columns: 16px 1fr;
  line-height: 1.45;
`;

const StyledFormGrid = styled.div`
  display: grid;
  gap: ${themeCssVariables.spacing[3]};
  grid-template-columns: repeat(2, minmax(180px, 1fr));
`;

const StyledField = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[1]};
`;

const StyledFieldLabel = styled.span`
  color: ${themeCssVariables.font.color.secondary};
  font-size: ${themeCssVariables.font.size.sm};
`;

const StyledInput = styled.input`
  background: ${themeCssVariables.background.primary};
  border: 1px solid ${themeCssVariables.border.color.medium};
  border-radius: ${themeCssVariables.border.radius.sm};
  color: ${themeCssVariables.font.color.primary};
  font-family: ${themeCssVariables.font.family};
  height: ${themeCssVariables.spacing[8]};
  padding: 0 ${themeCssVariables.spacing[2]};
`;

const StyledTable = styled.div`
  background: ${themeCssVariables.background.primary};
  border: 1px solid ${themeCssVariables.border.color.light};
  border-radius: ${themeCssVariables.border.radius.sm};
  overflow: hidden;
`;

const StyledTableRow = styled.div`
  display: grid;
  gap: ${themeCssVariables.spacing[2]};
  grid-template-columns: 1fr 120px 1.4fr;
  padding: ${themeCssVariables.spacing[3]};

  &:not(:last-child) {
    border-bottom: 1px solid ${themeCssVariables.border.color.light};
  }
`;

const StyledTabs = styled.div`
  display: flex;
  gap: 1px;
`;

const StyledTab = styled.button<{ active?: boolean }>`
  background: ${({ active }) =>
    active
      ? themeCssVariables.background.primary
      : themeCssVariables.grayScale.gray10};
  border: 1px solid ${themeCssVariables.border.color.light};
  border-bottom-color: ${({ active }) =>
    active
      ? themeCssVariables.background.primary
      : themeCssVariables.border.color.light};
  border-radius: ${themeCssVariables.border.radius.sm}
    ${themeCssVariables.border.radius.sm} 0 0;
  color: ${({ active }) =>
    active
      ? themeCssVariables.color.blue
      : themeCssVariables.font.color.secondary};
  cursor: pointer;
  font-family: ${themeCssVariables.font.family};
  min-height: ${themeCssVariables.spacing[9]};
  padding: 0 ${themeCssVariables.spacing[4]};
`;

const StyledBlueprintGrid = styled.div`
  display: grid;
  gap: ${themeCssVariables.spacing[4]};
  grid-template-columns: minmax(360px, 0.9fr) minmax(420px, 1.1fr);
`;

const StyledAccordionList = styled.div`
  background: ${themeCssVariables.background.primary};
  border: 1px solid ${themeCssVariables.border.color.light};
  border-radius: ${themeCssVariables.border.radius.sm};
  overflow: hidden;
`;

const StyledAccordionRow = styled.div`
  border-bottom: 1px solid ${themeCssVariables.border.color.light};
  display: flex;
  flex-direction: column;

  &:last-child {
    border-bottom: 0;
  }
`;

const StyledAccordionButton = styled.button`
  align-items: center;
  background: transparent;
  border: 0;
  color: ${themeCssVariables.font.color.primary};
  cursor: pointer;
  display: grid;
  font-family: ${themeCssVariables.font.family};
  gap: ${themeCssVariables.spacing[3]};
  grid-template-columns: minmax(180px, 0.7fr) 1fr 18px;
  min-height: ${themeCssVariables.spacing[12]};
  padding: 0 ${themeCssVariables.spacing[4]};
  text-align: left;
  width: 100%;
`;

const StyledAccordionContent = styled.div`
  border-bottom: 1px solid ${themeCssVariables.border.color.light};
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[3]};
  padding: ${themeCssVariables.spacing[4]};
`;

const StyledDataTable = styled.div`
  border: 1px solid ${themeCssVariables.border.color.light};
  border-radius: ${themeCssVariables.border.radius.sm};
  overflow: auto;
`;

const StyledDataTableRow = styled.div`
  display: grid;
  gap: ${themeCssVariables.spacing[2]};
  grid-template-columns:
    minmax(180px, 1fr) minmax(120px, 0.7fr)
    minmax(120px, 0.7fr) minmax(140px, 0.7fr) minmax(260px, 1.2fr)
    minmax(280px, 1.3fr);
  min-width: 980px;

  &:not(:last-child) {
    border-bottom: 1px solid ${themeCssVariables.border.color.light};
  }
`;

const StyledDataTableHeader = styled(StyledDataTableRow)`
  background: ${themeCssVariables.grayScale.gray10};
  color: ${themeCssVariables.font.color.secondary};
  font-size: ${themeCssVariables.font.size.sm};
  font-weight: ${themeCssVariables.font.weight.semiBold};
`;

const StyledDataTableCell = styled.div`
  align-items: center;
  display: flex;
  min-height: ${themeCssVariables.spacing[10]};
  padding: ${themeCssVariables.spacing[2]} ${themeCssVariables.spacing[3]};
`;

const StyledMetaCode = styled.code`
  background: ${themeCssVariables.background.transparent.light};
  border-radius: ${themeCssVariables.border.radius.sm};
  color: ${themeCssVariables.font.color.secondary};
  font-family: ${themeCssVariables.font.family};
  font-size: ${themeCssVariables.font.size.sm};
  padding: 2px ${themeCssVariables.spacing[1]};
`;

const StyledWizardSteps = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${themeCssVariables.spacing[2]};
`;

const StyledWizardStep = styled.div<{ active?: boolean }>`
  background: ${({ active }) =>
    active
      ? themeCssVariables.color.blue
      : themeCssVariables.background.primary};
  border: 1px solid
    ${({ active }) =>
      active
        ? themeCssVariables.color.blue
        : themeCssVariables.border.color.light};
  border-radius: 999px;
  color: ${({ active }) =>
    active
      ? themeCssVariables.color.gray1
      : themeCssVariables.font.color.secondary};
  font-size: ${themeCssVariables.font.size.sm};
  padding: ${themeCssVariables.spacing[1]} ${themeCssVariables.spacing[2]};
`;

const StyledBuilderShell = styled.div`
  background: ${themeCssVariables.background.primary};
  border: 1px solid ${themeCssVariables.border.color.light};
  border-radius: ${themeCssVariables.border.radius.sm};
  display: grid;
  gap: ${themeCssVariables.spacing[4]};
  grid-template-columns: 192px minmax(0, 1fr);
  overflow: hidden;
`;

const StyledComponentPalette = styled.div`
  background: ${themeCssVariables.grayScale.gray10};
  border-right: 1px solid ${themeCssVariables.border.color.light};
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[2]};
  padding: ${themeCssVariables.spacing[3]};
`;

const StyledPaletteGroup = styled.div`
  background: ${themeCssVariables.background.primary};
  border: 1px solid ${themeCssVariables.border.color.light};
  border-radius: ${themeCssVariables.border.radius.sm};
  color: ${themeCssVariables.font.color.secondary};
  font-size: ${themeCssVariables.font.size.sm};
  padding: ${themeCssVariables.spacing[2]};
`;

const StyledBuilderCanvas = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[3]};
  padding: ${themeCssVariables.spacing[4]};
`;

const StyledFieldGroupCard = styled.div`
  border: 1px solid ${themeCssVariables.border.color.light};
  border-radius: ${themeCssVariables.border.radius.sm};
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[3]};
  padding: ${themeCssVariables.spacing[3]};
`;

const StyledBrokerEngineStatus = styled.span`
  align-items: center;
  color: ${themeCssVariables.color.green};
  display: inline-flex;
  font-size: ${themeCssVariables.font.size.sm};
  font-weight: ${themeCssVariables.font.weight.medium};
  min-height: ${themeCssVariables.spacing[8]};
`;

const StyledInlineToggle = styled.div`
  align-items: center;
  color: ${themeCssVariables.font.color.secondary};
  display: inline-flex;
  font-size: ${themeCssVariables.font.size.sm};
  gap: ${themeCssVariables.spacing[2]};
  min-height: ${themeCssVariables.spacing[8]};

  span {
    background: ${themeCssVariables.color.blue};
    border-radius: 999px;
    color: ${themeCssVariables.color.gray1};
    font-size: ${themeCssVariables.font.size.sm};
    padding: 2px ${themeCssVariables.spacing[2]};
  }
`;

const StyledBrokerFactFindSurface = styled.div`
  background: ${themeCssVariables.background.primary};
  border: 1px solid ${themeCssVariables.border.color.light};
  border-radius: ${themeCssVariables.border.radius.sm};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const StyledBrokerInfoBanner = styled.div`
  background: ${themeCssVariables.color.blue1};
  border-bottom: 1px solid ${themeCssVariables.border.color.light};
  color: ${themeCssVariables.font.color.secondary};
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[1]};
  padding: ${themeCssVariables.spacing[4]};
`;

const StyledHouseholdTabs = styled.div`
  background: ${themeCssVariables.grayScale.gray10};
  border-bottom: 1px solid ${themeCssVariables.border.color.light};
  display: flex;
`;

const StyledHouseholdTab = styled.div<{ active?: boolean }>`
  background: ${({ active }) =>
    active
      ? themeCssVariables.background.primary
      : themeCssVariables.grayScale.gray10};
  border-right: 1px solid ${themeCssVariables.border.color.light};
  color: ${({ active }) =>
    active
      ? themeCssVariables.font.color.primary
      : themeCssVariables.font.color.secondary};
  font-weight: ${themeCssVariables.font.weight.semiBold};
  padding: ${themeCssVariables.spacing[3]} ${themeCssVariables.spacing[4]};
`;

const StyledLivingSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[1]};
  padding: ${themeCssVariables.spacing[4]};

  span {
    color: ${themeCssVariables.font.color.secondary};
    font-size: ${themeCssVariables.font.size.sm};
  }

  strong {
    font-size: 24px;
  }
`;

const StyledLivingExpenseStack = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLivingExpenseCard = styled.div<{
  status: LivingExpenseCategory['status'];
}>`
  border-top: 1px solid ${themeCssVariables.border.color.light};
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[3]};
  padding: 0 ${themeCssVariables.spacing[4]} ${themeCssVariables.spacing[4]};

  ${StyledMetaCode} {
    align-self: flex-start;
  }
`;

const StyledLivingExpenseHeader = styled.div<{
  status: LivingExpenseCategory['status'];
}>`
  align-items: center;
  background: ${({ status }) =>
    status === 'requiresComment'
      ? themeCssVariables.color.red1
      : themeCssVariables.color.green1};
  color: ${themeCssVariables.font.color.primary};
  display: grid;
  gap: ${themeCssVariables.spacing[2]};
  grid-template-columns: 18px 1fr auto;
  margin: 0 -${themeCssVariables.spacing[4]};
  min-height: ${themeCssVariables.spacing[10]};
  padding: 0 ${themeCssVariables.spacing[4]};

  em {
    color: ${({ status }) =>
      status === 'requiresComment'
        ? themeCssVariables.color.red
        : themeCssVariables.color.green};
    font-style: normal;
    font-weight: ${themeCssVariables.font.weight.semiBold};
  }
`;

const StyledLivingSubfieldGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[3]};
`;

const StyledLivingSubfield = styled.div`
  display: grid;
  gap: ${themeCssVariables.spacing[3]};
  grid-template-columns: minmax(240px, 1fr) 180px;
`;

const StyledCurrencyInput = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 20px 1fr;

  span {
    color: ${themeCssVariables.font.color.secondary};
  }
`;

const StyledCommentBox = styled.textarea<{ alert?: boolean }>`
  background: ${themeCssVariables.background.primary};
  border: 1px solid
    ${({ alert }) =>
      alert
        ? themeCssVariables.color.red
        : themeCssVariables.border.color.medium};
  border-radius: ${themeCssVariables.border.radius.sm};
  color: ${themeCssVariables.font.color.primary};
  font-family: ${themeCssVariables.font.family};
  min-height: ${themeCssVariables.spacing[10]};
  padding: ${themeCssVariables.spacing[2]};
  resize: vertical;
`;

const StyledValidationText = styled.span<{ alert?: boolean }>`
  color: ${({ alert }) =>
    alert
      ? themeCssVariables.color.red
      : themeCssVariables.font.color.secondary};
  font-size: ${themeCssVariables.font.size.sm};
`;

const StyledBoardToolbar = styled.div`
  align-items: center;
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
  justify-content: space-between;
`;

const StyledBoardActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${themeCssVariables.spacing[2]};
`;

const StyledBoardCanvas = styled.div`
  align-items: stretch;
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
  overflow-x: auto;
  padding-bottom: ${themeCssVariables.spacing[2]};
`;

const StyledDealStage = styled.div<{ collapsed: boolean }>`
  background: ${themeCssVariables.grayScale.gray10};
  border-radius: ${themeCssVariables.border.radius.sm};
  display: flex;
  flex: 0 0 ${({ collapsed }) => (collapsed ? '48px' : '292px')};
  flex-direction: column;
  min-height: 420px;
  overflow: hidden;
  transition: flex-basis 160ms ease;
`;

const StyledStageHeader = styled.button<{ collapsed: boolean }>`
  background: transparent;
  border: 0;
  color: ${themeCssVariables.font.color.primary};
  cursor: pointer;
  display: ${({ collapsed }) => (collapsed ? 'grid' : 'flex')};
  font-family: ${themeCssVariables.font.family};
  gap: ${themeCssVariables.spacing[1]};
  min-height: ${({ collapsed }) => (collapsed ? '100%' : '76px')};
  padding: ${themeCssVariables.spacing[3]};
  position: relative;
  text-align: left;
`;

const StyledExpandedStageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[1]};
  width: 100%;
`;

const StyledCollapsedStageHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[3]};
  justify-content: flex-start;
  width: 100%;
`;

const StyledStageNumber = styled.div`
  font-size: ${themeCssVariables.font.size.lg};
  font-weight: ${themeCssVariables.font.weight.semiBold};
`;

const StyledStageName = styled.div`
  font-size: ${themeCssVariables.font.size.lg};
  font-weight: ${themeCssVariables.font.weight.semiBold};
  line-height: 1.35;
`;

const StyledVerticalStageName = styled.div`
  font-size: ${themeCssVariables.font.size.lg};
  font-weight: ${themeCssVariables.font.weight.semiBold};
  line-height: 1.2;
  text-align: center;
  writing-mode: vertical-rl;
`;

const StyledStageMeta = styled.div`
  color: ${themeCssVariables.font.color.secondary};
  font-size: ${themeCssVariables.font.size.sm};
`;

const StyledVerticalStageMeta = styled.div`
  color: ${themeCssVariables.font.color.secondary};
  font-size: ${themeCssVariables.font.size.sm};
  writing-mode: vertical-rl;
`;

const StyledCollapseDot = styled.span`
  align-items: center;
  background: ${themeCssVariables.color.gray12};
  border-radius: 999px;
  color: ${themeCssVariables.color.gray1};
  display: inline-flex;
  height: 18px;
  justify-content: center;
  position: absolute;
  right: ${themeCssVariables.spacing[2]};
  top: ${themeCssVariables.spacing[2]};
  width: 18px;
`;

const StyledDealCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[3]};
  padding: 0 ${themeCssVariables.spacing[3]} ${themeCssVariables.spacing[3]};
`;

const StyledDealCard = styled.button<{ selected?: boolean }>`
  background: ${themeCssVariables.background.primary};
  border: 1px solid
    ${({ selected }) =>
      selected
        ? themeCssVariables.color.green
        : themeCssVariables.border.color.light};
  border-radius: ${themeCssVariables.border.radius.sm};
  box-shadow: ${themeCssVariables.boxShadow.light};
  color: ${themeCssVariables.font.color.primary};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-family: ${themeCssVariables.font.family};
  gap: ${themeCssVariables.spacing[2]};
  padding: ${themeCssVariables.spacing[3]};
  text-align: left;
`;

const StyledDealCardTop = styled.div`
  align-items: flex-start;
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
  justify-content: space-between;
`;

const StyledLogoMark = styled.div`
  align-items: center;
  background: ${themeCssVariables.color.gray12};
  border-radius: ${themeCssVariables.border.radius.sm};
  color: ${themeCssVariables.color.gray1};
  display: flex;
  flex: 0 0 28px;
  font-size: ${themeCssVariables.font.size.sm};
  font-weight: ${themeCssVariables.font.weight.semiBold};
  height: 28px;
  justify-content: center;
`;

const StyledDealName = styled.div`
  color: ${themeCssVariables.color.blue};
  font-weight: ${themeCssVariables.font.weight.semiBold};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledMiniMeta = styled.div`
  color: ${themeCssVariables.font.color.secondary};
  font-size: ${themeCssVariables.font.size.sm};
`;

const StyledChipRow = styled.div`
  display: grid;
  gap: ${themeCssVariables.spacing[1]};
  grid-template-columns: repeat(3, minmax(0, 1fr));
`;

const StyledCardChip = styled.div<{ tone?: 'danger' | 'success' }>`
  align-items: center;
  background: ${({ tone }) =>
    tone === 'danger'
      ? themeCssVariables.color.red
      : tone === 'success'
        ? themeCssVariables.color.green
        : themeCssVariables.color.gray9};
  border-radius: ${themeCssVariables.border.radius.sm};
  color: ${themeCssVariables.color.gray1};
  display: flex;
  font-size: ${themeCssVariables.font.size.sm};
  font-weight: ${themeCssVariables.font.weight.medium};
  justify-content: center;
  min-height: 24px;
  padding: 0 ${themeCssVariables.spacing[1]};
`;

const StyledDateRow = styled.div`
  color: ${themeCssVariables.font.color.secondary};
  display: grid;
  font-size: ${themeCssVariables.font.size.sm};
  gap: ${themeCssVariables.spacing[1]};
  grid-template-columns: repeat(3, minmax(0, 1fr));
  text-align: center;
`;

const StyledQuickView = styled.section`
  background: ${themeCssVariables.background.primary};
  border: 1px solid ${themeCssVariables.border.color.light};
  border-radius: ${themeCssVariables.border.radius.sm};
  box-shadow: ${themeCssVariables.boxShadow.strong};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const StyledQuickViewHeader = styled.div`
  border-bottom: 1px solid ${themeCssVariables.border.color.light};
  display: grid;
  gap: ${themeCssVariables.spacing[4]};
  grid-template-columns: minmax(240px, 0.8fr) minmax(360px, 1.2fr);
  padding: ${themeCssVariables.spacing[4]};
`;

const StyledQuickTitle = styled.div`
  font-size: 24px;
  font-weight: ${themeCssVariables.font.weight.semiBold};
`;

const StyledProgressTrack = styled.div`
  background: ${themeCssVariables.grayScale.gray10};
  display: grid;
  gap: 2px;
  grid-template-columns: repeat(17, 1fr);
  height: 5px;
`;

const StyledProgressStep = styled.div<{ active: boolean }>`
  background: ${({ active }) =>
    active ? themeCssVariables.color.green : themeCssVariables.color.gray4};
`;

const StyledQuickTabContent = styled.div`
  border-bottom: 1px solid ${themeCssVariables.border.color.light};
  padding: ${themeCssVariables.spacing[4]};
`;

const StyledTextArea = styled.textarea`
  border: 1px solid ${themeCssVariables.border.color.medium};
  border-radius: ${themeCssVariables.border.radius.sm};
  color: ${themeCssVariables.font.color.primary};
  font-family: ${themeCssVariables.font.family};
  min-height: 112px;
  padding: ${themeCssVariables.spacing[3]};
  resize: vertical;
  width: 100%;
`;

const StyledDetailsGrid = styled.div`
  display: grid;
  gap: ${themeCssVariables.spacing[4]};
  grid-template-columns: repeat(2, minmax(280px, 1fr));
  padding: ${themeCssVariables.spacing[4]};
`;

const StyledPill = styled.span`
  background: ${themeCssVariables.background.transparent.light};
  border-radius: 999px;
  color: ${themeCssVariables.font.color.secondary};
  font-size: ${themeCssVariables.font.size.sm};
  padding: 2px ${themeCssVariables.spacing[2]};
`;

const StyledRightRail = styled.aside`
  background: ${themeCssVariables.background.primary};
  border-left: 1px solid ${themeCssVariables.border.color.light};
  display: flex;
  min-height: 0;
  overflow: hidden;
`;

const StyledRailBar = styled.div`
  background: ${themeCssVariables.color.blue};
  display: flex;
  flex: 0 0 60px;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[2]};
  padding: ${themeCssVariables.spacing[3]} ${themeCssVariables.spacing[2]};
`;

const StyledRailButton = styled.button<{ active?: boolean }>`
  align-items: center;
  background: ${({ active }) =>
    active ? 'rgba(255, 255, 255, 0.13)' : 'transparent'};
  border: 1px solid
    ${({ active }) => (active ? 'rgba(255, 255, 255, 0.24)' : 'transparent')};
  border-radius: ${themeCssVariables.border.radius.sm};
  color: ${themeCssVariables.color.gray1};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-family: ${themeCssVariables.font.family};
  font-size: 10px;
  gap: ${themeCssVariables.spacing[1]};
  min-height: 48px;
  position: relative;
`;

const StyledRailCount = styled.span`
  align-items: center;
  background: ${themeCssVariables.color.blue};
  border: 1px solid ${themeCssVariables.color.gray1};
  border-radius: 999px;
  color: ${themeCssVariables.color.gray1};
  display: inline-flex;
  font-size: 10px;
  height: 18px;
  justify-content: center;
  min-width: 18px;
  padding: 0 4px;
  position: absolute;
  right: 2px;
  top: 2px;
`;

const StyledWorkflowDrawer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
`;

const StyledWorkflowDrawerHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid ${themeCssVariables.border.color.light};
  display: flex;
  gap: ${themeCssVariables.spacing[2]};
  justify-content: space-between;
  min-height: 48px;
  padding: 0 ${themeCssVariables.spacing[3]};
`;

const StyledWorkflowList = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const StyledWorkflowListRow = styled.div`
  align-items: center;
  border-bottom: 1px solid ${themeCssVariables.border.color.light};
  color: ${themeCssVariables.font.color.secondary};
  display: grid;
  gap: ${themeCssVariables.spacing[2]};
  grid-template-columns: 18px 1fr 18px;
  min-height: 54px;
  padding: 0 ${themeCssVariables.spacing[3]};
`;

const StyledRailPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[3]};
  padding: ${themeCssVariables.spacing[3]};
`;

const StyledRailEmptyState = styled.div`
  align-items: center;
  color: ${themeCssVariables.font.color.secondary};
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[3]};
  justify-content: center;
  min-height: 280px;
  padding: ${themeCssVariables.spacing[6]} ${themeCssVariables.spacing[4]};
  text-align: center;

  strong {
    color: ${themeCssVariables.font.color.primary};
    font-size: ${themeCssVariables.font.size.lg};
  }
`;

const StyledRailComposer = styled.div`
  border: 1px solid ${themeCssVariables.border.color.light};
  border-radius: ${themeCssVariables.border.radius.sm};
  display: flex;
  flex-direction: column;
  gap: ${themeCssVariables.spacing[3]};
  padding: ${themeCssVariables.spacing[3]};
`;

const StyledRailTextArea = styled.textarea`
  border: 1px solid ${themeCssVariables.border.color.medium};
  border-radius: ${themeCssVariables.border.radius.sm};
  color: ${themeCssVariables.font.color.primary};
  font-family: ${themeCssVariables.font.family};
  min-height: 104px;
  padding: ${themeCssVariables.spacing[2]};
  resize: vertical;
  width: 100%;
`;

const StyledRadio = styled.span`
  border: 2px solid ${themeCssVariables.border.color.medium};
  border-radius: 999px;
  height: 18px;
  width: 18px;
`;

const formatStageMeta = (stage: BoardStage) => {
  const totalValue = stage.records
    .map((record) =>
      Number(
        record.loanAmount.replace('$', '').replace('M', '').replace(',', ''),
      ),
    )
    .filter((amount) => Number.isFinite(amount))
    .reduce((sum, amount) => sum + amount, 0);

  return `(${stage.records.length} ${
    stage.records.length === 1 ? 'Record' : 'Records'
  } / $${totalValue.toFixed(2)}M)`;
};

const findLoanStage = (stages: BoardStage[], loanId: string) =>
  stages.find((stage) => stage.records.some((record) => record.id === loanId));

const findLoanRecord = (stages: BoardStage[], loanId: string) =>
  stages
    .flatMap((stage) => stage.records)
    .find((record) => record.id === loanId);

export const LoanDashPage = () => {
  const [activeItemId, setActiveItemId] = useState('loandash');
  const [boardStages, setBoardStages] = useState(initialBoardStages);
  const [collapsedStageIds, setCollapsedStageIds] = useState<number[]>(
    initialBoardStages
      .filter((stage) => stage.records.length === 0)
      .map((stage) => stage.id),
  );
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([
    'identity',
    'team',
  ]);
  const [expandedSectionLabels, setExpandedSectionLabels] = useState<string[]>([
    'Applicant Table',
    'Address History',
    'Categories',
  ]);
  const [quickViewTab, setQuickViewTab] = useState<QuickViewTab>('Note');
  const [activeRightRailItem, setActiveRightRailItem] =
    useState<RightRailItemLabel>('Notes');
  const [selectedLoanRecordId, setSelectedLoanRecordId] =
    useState<string>('2/2026');

  useEffect(() => {
    const syncActiveItemFromHash = () => {
      const hashItemId = window.location.hash.replace('#', '');
      const resolvedItemId = navHashAliases[hashItemId] ?? hashItemId;

      if (workflowItems.some((item) => item.id === resolvedItemId)) {
        setActiveItemId(resolvedItemId);
      }
    };

    syncActiveItemFromHash();
    window.addEventListener('hashchange', syncActiveItemFromHash);

    return () => {
      window.removeEventListener('hashchange', syncActiveItemFromHash);
    };
  }, []);

  const workflowItemsByGroup = useMemo(
    () =>
      groupOrder.map((group) => ({
        group,
        items: workflowItems.filter((item) => item.group === group),
      })),
    [],
  );

  const activeItem =
    workflowItems.find((item) => item.id === activeItemId) ?? workflowItems[0]!;

  const activeBlueprint =
    pageBlueprints[activeItem.id] ?? pageBlueprints.loandash;
  const activeFactFindGroups = factFindFieldGroupsByPage[activeItem.id] ?? [];

  const selectedLoanRecord =
    findLoanRecord(boardStages, selectedLoanRecordId) ??
    initialBoardStages[0]!.records[0]!;

  const selectedLoanStage =
    findLoanStage(boardStages, selectedLoanRecord.id) ?? boardStages[0]!;

  const toggleTask = (taskId: string) => {
    setCompletedTaskIds((current) =>
      current.includes(taskId)
        ? current.filter((id) => id !== taskId)
        : [...current, taskId],
    );
  };

  const handleWorkflowClick = (itemId: string) => {
    setActiveItemId(itemId);
    window.history.replaceState(null, '', `#${itemId}`);
  };

  const handleLoanCardClick = (loanRecordId: string) => {
    setSelectedLoanRecordId(loanRecordId);
    handleWorkflowClick('loandash');
  };

  const toggleStage = (stageId: number) => {
    setCollapsedStageIds((current) =>
      current.includes(stageId)
        ? current.filter((id) => id !== stageId)
        : [...current, stageId],
    );
  };

  const toggleSection = (sectionLabel: string) => {
    setExpandedSectionLabels((current) =>
      current.includes(sectionLabel)
        ? current.filter((label) => label !== sectionLabel)
        : [...current, sectionLabel],
    );
  };

  const renderFieldMappingTable = () => {
    const mappings = fieldMappingsByPage[activeItem.id];

    if (!mappings) {
      return null;
    }

    return (
      <StyledDataTable>
        <StyledDataTableHeader>
          <StyledDataTableCell>BrokerEngine Field Name</StyledDataTableCell>
          <StyledDataTableCell>Required</StyledDataTableCell>
          <StyledDataTableCell>Field Type</StyledDataTableCell>
          <StyledDataTableCell>Scope</StyledDataTableCell>
          <StyledDataTableCell>API Key</StyledDataTableCell>
          <StyledDataTableCell>Meta</StyledDataTableCell>
        </StyledDataTableHeader>
        {mappings.map((mapping) => (
          <StyledDataTableRow key={mapping.key}>
            <StyledDataTableCell>{mapping.fieldName}</StyledDataTableCell>
            <StyledDataTableCell>
              {mapping.required ? 'Required' : 'Conditional'}
            </StyledDataTableCell>
            <StyledDataTableCell>Fact Find</StyledDataTableCell>
            <StyledDataTableCell>{activeItem.label}</StyledDataTableCell>
            <StyledDataTableCell>
              <StyledMetaCode>{mapping.key}</StyledMetaCode>
            </StyledDataTableCell>
            <StyledDataTableCell>
              <StyledMetaCode>{mapping.meta}</StyledMetaCode>
            </StyledDataTableCell>
          </StyledDataTableRow>
        ))}
      </StyledDataTable>
    );
  };

  const renderExpandedSectionContent = (sectionLabel: string) => {
    if (activeItem.id === 'living-expenses' && sectionLabel === 'Categories') {
      return (
        <StyledDataTable>
          <StyledDataTableHeader>
            <StyledDataTableCell>Living Expense Category</StyledDataTableCell>
            <StyledDataTableCell>Status</StyledDataTableCell>
            <StyledDataTableCell>Frequency</StyledDataTableCell>
            <StyledDataTableCell>Monthly</StyledDataTableCell>
            <StyledDataTableCell>API Key</StyledDataTableCell>
            <StyledDataTableCell>BrokerEngine Validation</StyledDataTableCell>
          </StyledDataTableHeader>
          {livingExpenseCategories.map((category) => (
            <StyledDataTableRow key={category.key}>
              <StyledDataTableCell>
                {category.fieldName}
                <br />
                {category.subfields.length} mapped line items
              </StyledDataTableCell>
              <StyledDataTableCell>
                {category.status === 'requiresComment'
                  ? 'Needs comment'
                  : 'Complete'}
              </StyledDataTableCell>
              <StyledDataTableCell>{category.frequency}</StyledDataTableCell>
              <StyledDataTableCell>
                {category.monthlyAmount} declared · {category.verifiedAmount}{' '}
                verified
              </StyledDataTableCell>
              <StyledDataTableCell>
                <StyledMetaCode>{category.key}</StyledMetaCode>
              </StyledDataTableCell>
              <StyledDataTableCell>
                <StyledMetaCode>{category.commentPrompt}</StyledMetaCode>
              </StyledDataTableCell>
            </StyledDataTableRow>
          ))}
        </StyledDataTable>
      );
    }

    if (activeItem.id === 'applicants' && sectionLabel === 'Applicant Table') {
      return (
        <StyledDataTable>
          <StyledDataTableHeader>
            <StyledDataTableCell>BrokerEngine Field Name</StyledDataTableCell>
            <StyledDataTableCell>Applicant</StyledDataTableCell>
            <StyledDataTableCell>Primary Value</StyledDataTableCell>
            <StyledDataTableCell>Co-applicant Value</StyledDataTableCell>
            <StyledDataTableCell>API Key</StyledDataTableCell>
            <StyledDataTableCell>Meta</StyledDataTableCell>
          </StyledDataTableHeader>
          {applicantFactFindRows.map((row) => (
            <StyledDataTableRow key={`${row.applicant}-${row.key}`}>
              <StyledDataTableCell>{row.fieldName}</StyledDataTableCell>
              <StyledDataTableCell>{row.applicant}</StyledDataTableCell>
              <StyledDataTableCell>
                {row.primaryValue || '-'}
              </StyledDataTableCell>
              <StyledDataTableCell>
                {row.secondaryValue || '-'}
              </StyledDataTableCell>
              <StyledDataTableCell>
                <StyledMetaCode>{row.key}</StyledMetaCode>
              </StyledDataTableCell>
              <StyledDataTableCell>
                <StyledMetaCode>{row.meta}</StyledMetaCode>
              </StyledDataTableCell>
            </StyledDataTableRow>
          ))}
        </StyledDataTable>
      );
    }

    if (activeItem.id === 'applicants' && sectionLabel === 'Address History') {
      return (
        <StyledDataTable>
          <StyledDataTableHeader>
            <StyledDataTableCell>Residential Address</StyledDataTableCell>
            <StyledDataTableCell>Applicant</StyledDataTableCell>
            <StyledDataTableCell>From</StyledDataTableCell>
            <StyledDataTableCell>To</StyledDataTableCell>
            <StyledDataTableCell>API Key</StyledDataTableCell>
            <StyledDataTableCell>Meta</StyledDataTableCell>
          </StyledDataTableHeader>
          {addressHistoryRows.map((row) => (
            <StyledDataTableRow key={row.key}>
              <StyledDataTableCell>
                {row.residentialAddress}
              </StyledDataTableCell>
              <StyledDataTableCell>{row.applicant}</StyledDataTableCell>
              <StyledDataTableCell>{row.from}</StyledDataTableCell>
              <StyledDataTableCell>
                {row.to} · {row.months} months
              </StyledDataTableCell>
              <StyledDataTableCell>
                <StyledMetaCode>{row.key}</StyledMetaCode>
              </StyledDataTableCell>
              <StyledDataTableCell>
                <StyledMetaCode>{row.meta}</StyledMetaCode>
              </StyledDataTableCell>
            </StyledDataTableRow>
          ))}
        </StyledDataTable>
      );
    }

    return null;
  };

  const renderLivingExpenseFactFindSurface = () => {
    if (activeItem.id !== 'living-expenses') {
      return null;
    }

    return (
      <StyledSection>
        <StyledSectionHeader>
          <div>
            <StyledSectionTitle>Broker View Fact Find</StyledSectionTitle>
            <StyledSectionMeta>
              Live BrokerEngine mechanics: household tab, autosave, client-view
              toggle, locked broker edit mode, monthly totals, per-line
              frequency and zero-dollar comments.
            </StyledSectionMeta>
          </div>
          <StyledActionRow>
            <StyledBrokerEngineStatus>
              Auto saved a few seconds ago
            </StyledBrokerEngineStatus>
            <StyledInlineToggle>
              Show page in client view
              <span>On</span>
            </StyledInlineToggle>
            <StyledButton accent="secondary">Unlock</StyledButton>
            <StyledButton accent="secondary">
              Email or Download Fact Find
            </StyledButton>
          </StyledActionRow>
        </StyledSectionHeader>

        <StyledBrokerFactFindSurface>
          <StyledBrokerInfoBanner>
            <strong>Welcome to the Broker View of the Fact Find!</strong>
            <span>
              This compact broker-side view syncs with the client-side fact
              find. The lock prevents unwanted client edits. Zero-dollar
              household categories require explanatory comments before the
              section is clean.
            </span>
          </StyledBrokerInfoBanner>

          <StyledHouseholdTabs>
            <StyledHouseholdTab active>
              Alex Morgan&apos;s Household
            </StyledHouseholdTab>
          </StyledHouseholdTabs>

          <StyledLivingSummary>
            <span>Monthly Living Expenses</span>
            <strong>$0.00</strong>
          </StyledLivingSummary>

          <StyledLivingExpenseStack>
            {livingExpenseCategories.map((category) => (
              <StyledLivingExpenseCard
                key={category.key}
                status={category.status}
              >
                <StyledLivingExpenseHeader status={category.status}>
                  <span>
                    {category.status === 'complete'
                      ? 'check-circle'
                      : 'minus-circle'}
                  </span>
                  <strong>{category.fieldName}</strong>
                  <em>{category.monthlyAmount} per month</em>
                </StyledLivingExpenseHeader>

                <StyledLivingSubfieldGrid>
                  {category.subfields.map((subfield) => (
                    <StyledLivingSubfield key={subfield.key}>
                      <StyledField>
                        <StyledFieldLabel>
                          {subfield.fieldName}
                        </StyledFieldLabel>
                        <StyledCurrencyInput>
                          <span>$</span>
                          <StyledInput
                            defaultValue={subfield.monthlyAmount.replace(
                              '$',
                              '',
                            )}
                            placeholder="Enter Amount"
                          />
                        </StyledCurrencyInput>
                      </StyledField>
                      <StyledField>
                        <StyledFieldLabel>Frequency</StyledFieldLabel>
                        <StyledSelect defaultValue={subfield.frequency}>
                          <option>Weekly</option>
                          <option>Fortnightly</option>
                          <option>Monthly</option>
                          <option>Yearly</option>
                        </StyledSelect>
                      </StyledField>
                    </StyledLivingSubfield>
                  ))}
                </StyledLivingSubfieldGrid>

                <StyledField>
                  <StyledFieldLabel>Comments</StyledFieldLabel>
                  <StyledCommentBox
                    alert={category.status === 'requiresComment'}
                    placeholder="Type something..."
                  />
                  <StyledValidationText
                    alert={category.status === 'requiresComment'}
                  >
                    {category.commentPrompt}
                  </StyledValidationText>
                </StyledField>

                <StyledMetaCode>{category.key}</StyledMetaCode>
              </StyledLivingExpenseCard>
            ))}
          </StyledLivingExpenseStack>

          <StyledField>
            <StyledFieldLabel>
              Additional commentary on Living Expenses
            </StyledFieldLabel>
            <StyledTextArea defaultValue="" />
          </StyledField>
        </StyledBrokerFactFindSurface>
      </StyledSection>
    );
  };

  const renderFactFindBuilderSurface = () => {
    if (activeFactFindGroups.length === 0) {
      return null;
    }

    return (
      <StyledSection>
        <StyledSectionHeader>
          <div>
            <StyledSectionTitle>
              BrokerEngine Fact Find Builder
            </StyledSectionTitle>
            <StyledSectionMeta>
              Wizard pages, conditional sections, field aliases and LIXI-first
              mapping for the active loan section.
            </StyledSectionMeta>
          </div>
        </StyledSectionHeader>

        <StyledWizardSteps>
          {factFindWizardPages.map((page) => (
            <StyledWizardStep
              active={activeFactFindGroups.some(
                (group) => group.pageId === page,
              )}
              key={page}
            >
              {page}
            </StyledWizardStep>
          ))}
        </StyledWizardSteps>

        <StyledBuilderShell>
          <StyledComponentPalette>
            <StyledPanelTitle>Components</StyledPanelTitle>
            {['Basic', 'Advanced', 'Layout', 'Data', 'Premium'].map((group) => (
              <StyledPaletteGroup key={group}>{group}</StyledPaletteGroup>
            ))}
          </StyledComponentPalette>

          <StyledBuilderCanvas>
            {activeFactFindGroups.map((group) => (
              <StyledFieldGroupCard key={`${group.pageId}-${group.title}`}>
                <StyledPanelTitle>{group.title}</StyledPanelTitle>
                <StyledSectionMeta>{group.condition}</StyledSectionMeta>
                <StyledDataTable>
                  <StyledDataTableHeader>
                    <StyledDataTableCell>
                      BrokerEngine Field Name
                    </StyledDataTableCell>
                    <StyledDataTableCell>Required</StyledDataTableCell>
                    <StyledDataTableCell>Wizard Page</StyledDataTableCell>
                    <StyledDataTableCell>Target</StyledDataTableCell>
                    <StyledDataTableCell>BrokerApp Key</StyledDataTableCell>
                    <StyledDataTableCell>Alias / Meta</StyledDataTableCell>
                  </StyledDataTableHeader>
                  {group.fields.map((field) => (
                    <StyledDataTableRow key={field.key}>
                      <StyledDataTableCell>
                        {field.fieldName}
                      </StyledDataTableCell>
                      <StyledDataTableCell>
                        {field.required ? 'Required' : 'Conditional'}
                      </StyledDataTableCell>
                      <StyledDataTableCell>{group.pageId}</StyledDataTableCell>
                      <StyledDataTableCell>
                        {activeItem.label}
                      </StyledDataTableCell>
                      <StyledDataTableCell>
                        <StyledMetaCode>{field.key}</StyledMetaCode>
                      </StyledDataTableCell>
                      <StyledDataTableCell>
                        <StyledMetaCode>{field.meta}</StyledMetaCode>
                      </StyledDataTableCell>
                    </StyledDataTableRow>
                  ))}
                </StyledDataTable>
              </StyledFieldGroupCard>
            ))}
          </StyledBuilderCanvas>
        </StyledBuilderShell>
      </StyledSection>
    );
  };

  const expandAllStages = () => {
    setCollapsedStageIds([]);
  };

  const collapseEmptyStages = () => {
    setCollapsedStageIds(
      boardStages
        .filter((stage) => stage.records.length === 0)
        .map((stage) => stage.id),
    );
  };

  const expandStagesOneToFour = () => {
    setCollapsedStageIds(
      boardStages
        .filter((stage) => stage.id < 1 || stage.id > 4)
        .map((stage) => stage.id),
    );
  };

  const moveSelectedLoanToStage = (stageId: number) => {
    const sourceStage = findLoanStage(boardStages, selectedLoanRecordId);
    const emptiedSourceStageId =
      sourceStage?.records.length === 1 ? sourceStage.id : undefined;

    setBoardStages((currentStages) => {
      const loanRecord = findLoanRecord(currentStages, selectedLoanRecordId);
      const currentSourceStage = findLoanStage(
        currentStages,
        selectedLoanRecordId,
      );

      if (
        !loanRecord ||
        !currentSourceStage ||
        currentSourceStage.id === stageId
      ) {
        return currentStages;
      }

      return currentStages.map((stage) => {
        if (
          stage.records.some((record) => record.id === selectedLoanRecordId)
        ) {
          return {
            ...stage,
            records: stage.records.filter(
              (record) => record.id !== selectedLoanRecordId,
            ),
          };
        }

        if (stage.id === stageId) {
          return {
            ...stage,
            records: [...stage.records, loanRecord],
          };
        }

        return stage;
      });
    });
    setCollapsedStageIds((current) => [
      ...current.filter((id) => id !== stageId && id !== emptiedSourceStageId),
      ...(emptiedSourceStageId === undefined ? [] : [emptiedSourceStageId]),
    ]);
  };

  const renderRightRailDrawerContent = () => {
    if (activeRightRailItem === 'Notes') {
      return (
        <StyledRailEmptyState>
          <IconNotes size={48} />
          <strong>It&apos;s empty here! Time to create your first note.</strong>
          <StyledButton accent="primary">Create a Note</StyledButton>
        </StyledRailEmptyState>
      );
    }

    if (activeRightRailItem === 'Checklists') {
      return (
        <StyledRailPanel>
          <StyledRailComposer>
            <StyledPanelTitle>Readiness Checklist</StyledPanelTitle>
            <StyledChecklist>
              {[
                'Credit Guide & Privacy Consent sent',
                'AML/KYC evidence recorded for every applicant',
                'Income, liability and living expense evidence attached',
                'BID file note completed before recommendation',
              ].map((item, index) => (
                <StyledChecklistRow key={item}>
                  <input defaultChecked={index === 0} type="checkbox" />
                  <span>{item}</span>
                </StyledChecklistRow>
              ))}
            </StyledChecklist>
          </StyledRailComposer>
        </StyledRailPanel>
      );
    }

    if (activeRightRailItem === 'Tasks') {
      return (
        <StyledRailPanel>
          <StyledTabs>
            <StyledTab active>Pending</StyledTab>
            <StyledTab>Completed</StyledTab>
          </StyledTabs>
          <StyledRailComposer>
            <StyledSectionMeta>02 May 2026 · High</StyledSectionMeta>
            <StyledPanelTitle>Request Outstanding Documents</StyledPanelTitle>
            <StyledFormGrid>
              <StyledField>
                <StyledFieldLabel>Due Date</StyledFieldLabel>
                <StyledInput defaultValue="02/05/2026" />
              </StyledField>
              <StyledField>
                <StyledFieldLabel>Assignee</StyledFieldLabel>
                <StyledInput defaultValue={selectedLoanRecord.broker} />
              </StyledField>
            </StyledFormGrid>
            <StyledActionRow>
              <StyledButton accent="secondary">Mark as Completed</StyledButton>
              <StyledButton accent="secondary">Snooze Task</StyledButton>
            </StyledActionRow>
          </StyledRailComposer>
        </StyledRailPanel>
      );
    }

    if (activeRightRailItem === 'Emails') {
      return (
        <StyledRailPanel>
          <StyledRailComposer>
            <StyledPanelTitle>Send Email</StyledPanelTitle>
            <StyledField>
              <StyledFieldLabel>Template</StyledFieldLabel>
              <StyledSelect defaultValue="Outstanding Supporting Documents">
                <option>Outstanding Supporting Documents</option>
                <option>Credit Guide & Privacy Consent</option>
                <option>Conditional Approval Update</option>
              </StyledSelect>
            </StyledField>
            <StyledField>
              <StyledFieldLabel>To</StyledFieldLabel>
              <StyledInput
                defaultValue={selectedLoanRecord.applicants[0].email}
              />
            </StyledField>
            <StyledField>
              <StyledFieldLabel>Subject</StyledFieldLabel>
              <StyledInput defaultValue="Outstanding documents for your loan application" />
            </StyledField>
            <StyledRailTextArea defaultValue="Hi Alex, please complete the remaining document requests in your client portal so we can progress your application." />
            <StyledButton accent="primary">Send Email</StyledButton>
          </StyledRailComposer>
        </StyledRailPanel>
      );
    }

    if (activeRightRailItem === 'Texts') {
      return (
        <StyledRailPanel>
          <StyledRailComposer>
            <StyledPanelTitle>Send Text</StyledPanelTitle>
            <StyledField>
              <StyledFieldLabel>To</StyledFieldLabel>
              <StyledInput
                defaultValue={selectedLoanRecord.applicants[0].phone}
              />
            </StyledField>
            <StyledRailTextArea defaultValue="Hi Alex, your broker has requested outstanding documents for your home loan application. Please check your portal when convenient." />
            <StyledSectionMeta>
              SMS templates stay linked to the loan timeline and applicant
              consent status.
            </StyledSectionMeta>
            <StyledButton accent="primary">Send Text</StyledButton>
          </StyledRailComposer>
        </StyledRailPanel>
      );
    }

    if (activeRightRailItem === 'Key Dates') {
      return (
        <StyledWorkflowList>
          {keyDateRows.map((row) => (
            <StyledWorkflowListRow key={row.key}>
              <StyledRadio />
              <span>
                {row.label}
                <br />
                {row.date} · {row.source}
              </span>
              <span>›</span>
            </StyledWorkflowListRow>
          ))}
        </StyledWorkflowList>
      );
    }

    if (activeRightRailItem === 'Reports') {
      return (
        <StyledWorkflowList>
          {reportTemplates.map((report) => (
            <StyledWorkflowListRow key={report}>
              <StyledRadio />
              <span>
                {report}
                <br />
                PDF report
              </span>
              <span>›</span>
            </StyledWorkflowListRow>
          ))}
        </StyledWorkflowList>
      );
    }

    return (
      <StyledWorkflowList>
        {oneClickWorkflows.map((workflow) => (
          <StyledWorkflowListRow key={workflow}>
            <StyledRadio />
            <span>{workflow}</span>
            <span>☆</span>
          </StyledWorkflowListRow>
        ))}
      </StyledWorkflowList>
    );
  };

  return (
    <StyledPage>
      <StyledWorkflowSidebar>
        <StyledSidebarTitle>Loan Onboarding</StyledSidebarTitle>
        {workflowItemsByGroup.map(({ group, items }) => (
          <StyledGroup key={group}>
            <StyledGroupLabel>
              {group}
              {group === 'Lodgement' && <StyledNewBadge>New</StyledNewBadge>}
            </StyledGroupLabel>
            {items.map((item) => (
              <StyledWorkflowButton
                active={activeItem.id === item.id}
                key={item.id}
                onClick={() => handleWorkflowClick(item.id)}
              >
                <StyledStatusDot status={item.status} />
                <StyledWorkflowButtonLabel>
                  {item.label}
                </StyledWorkflowButtonLabel>
              </StyledWorkflowButton>
            ))}
          </StyledGroup>
        ))}
      </StyledWorkflowSidebar>

      <StyledMain>
        <StyledTopAlert>
          <StyledTopAlertText>
            <IconAlertTriangle size={16} />
            Credit Guide & Privacy Consent is required
          </StyledTopAlertText>
          <StyledActionRow>
            <StyledButton accent="secondary">Not Required</StyledButton>
            <StyledButton accent="primary">Get Started</StyledButton>
          </StyledActionRow>
        </StyledTopAlert>

        <StyledLoanTopbar>
          <StyledTopbarIdentity>
            <StyledIconButton
              onClick={() => handleWorkflowClick('loandash')}
              type="button"
            >
              ←
            </StyledIconButton>
            <div>
              <StyledTopbarTitle>{activeItem.label}</StyledTopbarTitle>
              <StyledSubheading>
                {selectedLoanRecord.name} · ID {selectedLoanRecord.id} ·{' '}
                {selectedLoanRecord.lender}
              </StyledSubheading>
            </div>
          </StyledTopbarIdentity>
          <StyledActionRow>
            <StyledSelect
              aria-label="Move loan to stage"
              onChange={(event) =>
                moveSelectedLoanToStage(Number(event.target.value))
              }
              value={selectedLoanStage.id}
            >
              {boardStages.map((stage) => (
                <option key={stage.id} value={stage.id}>
                  {stage.id}. {stage.name}
                </option>
              ))}
            </StyledSelect>
            <StyledButton accent="secondary">Sync</StyledButton>
            <StyledButton accent="secondary">Copy Link</StyledButton>
            <StyledButton accent="primary">Save</StyledButton>
          </StyledActionRow>
        </StyledLoanTopbar>

        <StyledHeader>
          <StyledTitleRow>
            <div>
              <StyledEyebrow>
                LoanDash · Residential Home Loan · Opened from board card
              </StyledEyebrow>
              <StyledHeading>{selectedLoanRecord.name}</StyledHeading>
              <StyledSubheading>
                Owner: {selectedLoanRecord.broker} · Processor:{' '}
                {selectedLoanRecord.broker} · Lender:{' '}
                {selectedLoanRecord.lender} · Residential channel:
                ApplyOnline-ready
              </StyledSubheading>
            </div>
            <StyledActionRow>
              <StyledSelect
                onChange={(event) =>
                  moveSelectedLoanToStage(Number(event.target.value))
                }
                value={selectedLoanStage.id}
              >
                {boardStages.map((stage) => (
                  <option key={stage.id} value={stage.id}>
                    {stage.id}. {stage.name}
                  </option>
                ))}
              </StyledSelect>
              <StyledButton accent="secondary">
                <IconNotes size={16} />
                Note
              </StyledButton>
              <StyledButton accent="secondary">
                <IconListCheck size={16} />
                Task
              </StyledButton>
              <StyledButton accent="primary">
                <IconFileCheck size={16} />
                Ready Check
              </StyledButton>
            </StyledActionRow>
          </StyledTitleRow>

          <StyledStatsGrid>
            <StyledMetric>
              <StyledMetricLabel>Loan amount</StyledMetricLabel>
              <StyledMetricValue>
                {selectedLoanRecord.loanAmount}
              </StyledMetricValue>
            </StyledMetric>
            <StyledMetric>
              <StyledMetricLabel>Fact find</StyledMetricLabel>
              <StyledMetricValue>62%</StyledMetricValue>
            </StyledMetric>
            <StyledMetric>
              <StyledMetricLabel>Current stage</StyledMetricLabel>
              <StyledMetricValue>{selectedLoanStage.id}</StyledMetricValue>
            </StyledMetric>
            <StyledMetric>
              <StyledMetricLabel>Readiness</StyledMetricLabel>
              <StyledMetricValue>Blocked</StyledMetricValue>
            </StyledMetric>
          </StyledStatsGrid>
        </StyledHeader>

        <StyledOpenLoanStrip>
          <strong>Opened loan application</strong>
          <span>
            {selectedLoanRecord.name} starts in LoanDash, then works down
            Overview, Fact Find, Strategy and Lodgement before BrokerEngine, AFG
            Flex or ApplyOnline submission.
          </span>
        </StyledOpenLoanStrip>

        <StyledContent>
          <StyledSection>
            <StyledSectionHeader>
              <div>
                <StyledSectionTitle>{activeItem.label}</StyledSectionTitle>
                <StyledSectionMeta>{activeItem.summary}</StyledSectionMeta>
              </div>
              <StyledPill>{activeItem.status}</StyledPill>
            </StyledSectionHeader>

            {activeBlueprint.tabs && (
              <StyledTabs>
                {activeBlueprint.tabs.map((tab, index) => (
                  <StyledTab active={index === 0} key={tab}>
                    {tab}
                  </StyledTab>
                ))}
              </StyledTabs>
            )}

            <StyledBlueprintGrid>
              <StyledPanel>
                <StyledPanelTitle>
                  <IconLayoutDashboard size={18} />
                  Page Details
                </StyledPanelTitle>
                <StyledFormGrid>
                  {activeBlueprint.fields.map(([label, value]) => (
                    <StyledField key={label}>
                      <StyledFieldLabel>{label}</StyledFieldLabel>
                      <StyledInput defaultValue={value} />
                    </StyledField>
                  ))}
                </StyledFormGrid>
                {renderFieldMappingTable()}
              </StyledPanel>

              <StyledAccordionList>
                {activeBlueprint.sections.map(([label, summary]) => {
                  const isExpanded = expandedSectionLabels.includes(label);
                  const expandedContent = renderExpandedSectionContent(label);

                  return (
                    <StyledAccordionRow key={label}>
                      <StyledAccordionButton
                        onClick={() => toggleSection(label)}
                        type="button"
                      >
                        <strong>{label}</strong>
                        <span>{summary}</span>
                        <span>{isExpanded ? 'v' : '>'}</span>
                      </StyledAccordionButton>
                      {isExpanded && expandedContent && (
                        <StyledAccordionContent>
                          {expandedContent}
                        </StyledAccordionContent>
                      )}
                    </StyledAccordionRow>
                  );
                })}
              </StyledAccordionList>
            </StyledBlueprintGrid>
          </StyledSection>

          {renderLivingExpenseFactFindSurface()}

          {renderFactFindBuilderSurface()}

          <StyledSection>
            <StyledSectionHeader>
              <div>
                <StyledSectionTitle>Application Brain</StyledSectionTitle>
                <StyledSectionMeta>
                  NCCP, BID, responsible lending, AML/CTF and lender lodgement
                  gates for residential consumer mortgages.
                </StyledSectionMeta>
              </div>
            </StyledSectionHeader>
            <StyledTwoColumn>
              <StyledPanel>
                <StyledPanelTitle>
                  <IconAlertTriangle size={18} />
                  Current Warnings
                </StyledPanelTitle>
                <StyledChecklist>
                  {blockerTasks.map(([id, label]) => (
                    <StyledChecklistRow key={id}>
                      <input
                        checked={completedTaskIds.includes(id)}
                        onChange={() => toggleTask(id)}
                        type="checkbox"
                      />
                      <span>{label}</span>
                    </StyledChecklistRow>
                  ))}
                </StyledChecklist>
              </StyledPanel>

              <StyledPanel>
                <StyledPanelTitle>
                  <IconShield size={18} />
                  Submission Logic
                </StyledPanelTitle>
                <StyledChecklist>
                  <StyledChecklistRow>
                    <input defaultChecked type="checkbox" />
                    <span>
                      Residential deals progress through ApplyOnline once direct
                      lodgement is configured.
                    </span>
                  </StyledChecklistRow>
                  <StyledChecklistRow>
                    <input type="checkbox" />
                    <span>
                      Business and commercial loans are held for separate
                      lender-specific submission workflows.
                    </span>
                  </StyledChecklistRow>
                  <StyledChecklistRow>
                    <input type="checkbox" />
                    <span>
                      Block submission until credit guide, privacy, KYC, credit
                      consent, servicing and BID evidence are complete.
                    </span>
                  </StyledChecklistRow>
                </StyledChecklist>
              </StyledPanel>
            </StyledTwoColumn>
          </StyledSection>

          <StyledSection>
            <StyledBoardToolbar>
              <div>
                <StyledSectionTitle>
                  Residential Loan Pipeline
                </StyledSectionTitle>
                <StyledSectionMeta>
                  Empty stages collapse automatically; open any stage by
                  selecting its vertical column.
                </StyledSectionMeta>
              </div>
              <StyledBoardActions>
                <StyledButton accent="secondary" onClick={expandAllStages}>
                  Expand all stages
                </StyledButton>
                <StyledButton accent="secondary" onClick={collapseEmptyStages}>
                  Hide empty stages
                </StyledButton>
                <StyledButton
                  accent="secondary"
                  onClick={expandStagesOneToFour}
                >
                  Expand only stages 1 - 4
                </StyledButton>
              </StyledBoardActions>
            </StyledBoardToolbar>

            <StyledBoardCanvas>
              {boardStages.map((stage) => {
                const collapsed = collapsedStageIds.includes(stage.id);

                return (
                  <StyledDealStage collapsed={collapsed} key={stage.id}>
                    <StyledStageHeader
                      collapsed={collapsed}
                      onClick={() => toggleStage(stage.id)}
                    >
                      <StyledCollapseDot>
                        {collapsed ? '›' : '‹'}
                      </StyledCollapseDot>
                      {collapsed ? (
                        <StyledCollapsedStageHeader>
                          <StyledStageNumber>{stage.id}.</StyledStageNumber>
                          <StyledVerticalStageName>
                            {stage.name}
                          </StyledVerticalStageName>
                          <StyledVerticalStageMeta>
                            {formatStageMeta(stage)}
                          </StyledVerticalStageMeta>
                        </StyledCollapsedStageHeader>
                      ) : (
                        <StyledExpandedStageHeader>
                          <StyledStageName>
                            {stage.id}. {stage.name}
                          </StyledStageName>
                          <StyledStageMeta>
                            {formatStageMeta(stage)}
                          </StyledStageMeta>
                        </StyledExpandedStageHeader>
                      )}
                    </StyledStageHeader>

                    {!collapsed && (
                      <StyledDealCards>
                        {stage.records.map((record) => (
                          <StyledDealCard
                            key={record.id}
                            onClick={() => handleLoanCardClick(record.id)}
                            selected={record.id === selectedLoanRecordId}
                          >
                            <StyledDealCardTop>
                              <StyledLogoMark>
                                {record.lender.slice(0, 2).toUpperCase()}
                              </StyledLogoMark>
                              <div>
                                <StyledDealName>{record.name}</StyledDealName>
                                <StyledMiniMeta>
                                  Owner: {record.broker}
                                </StyledMiniMeta>
                              </div>
                              <span>...</span>
                            </StyledDealCardTop>
                            <StyledMiniMeta>••••</StyledMiniMeta>
                            <StyledChipRow>
                              <StyledCardChip>Finance</StyledCardChip>
                              <StyledCardChip tone="success">
                                Settlement
                              </StyledCardChip>
                              <StyledCardChip tone="danger">
                                Stage Due
                              </StyledCardChip>
                            </StyledChipRow>
                            <StyledDateRow>
                              <span>{record.financeDue}</span>
                              <span>{record.settlementDue}</span>
                              <span>{record.stageDue}</span>
                            </StyledDateRow>
                          </StyledDealCard>
                        ))}
                      </StyledDealCards>
                    )}
                  </StyledDealStage>
                );
              })}
            </StyledBoardCanvas>
          </StyledSection>

          <StyledQuickView>
            <StyledQuickViewHeader>
              <div>
                <StyledButton
                  accent="primary"
                  onClick={() => handleWorkflowClick('loandash')}
                >
                  View Full Deal
                </StyledButton>
                <StyledQuickTitle>{selectedLoanRecord.name}</StyledQuickTitle>
                <StyledSubheading>
                  {selectedLoanRecord.broker} · ID: {selectedLoanRecord.id} ·{' '}
                  {selectedLoanRecord.lender}
                </StyledSubheading>
              </div>
              <div>
                <StyledChipRow>
                  <StyledCardChip>Finance</StyledCardChip>
                  <StyledCardChip>Settlement</StyledCardChip>
                  <StyledCardChip tone="success">Stage Due</StyledCardChip>
                </StyledChipRow>
                <StyledDateRow>
                  <span>{selectedLoanRecord.financeDue}</span>
                  <span>{selectedLoanRecord.settlementDue}</span>
                  <span>{selectedLoanRecord.stageDue}</span>
                </StyledDateRow>
                <StyledField>
                  <StyledFieldLabel>Current Status</StyledFieldLabel>
                  <StyledSelect
                    onChange={(event) =>
                      moveSelectedLoanToStage(Number(event.target.value))
                    }
                    value={selectedLoanStage.id}
                  >
                    {boardStages.map((stage) => (
                      <option key={stage.id} value={stage.id}>
                        {stage.id}. {stage.name}
                      </option>
                    ))}
                  </StyledSelect>
                </StyledField>
                <StyledProgressTrack>
                  {boardStages.map((stage) => (
                    <StyledProgressStep
                      active={stage.id <= selectedLoanStage.id}
                      key={stage.id}
                    />
                  ))}
                </StyledProgressTrack>
              </div>
            </StyledQuickViewHeader>

            <StyledTabs>
              {quickViewTabs.map((tab) => (
                <StyledTab
                  active={quickViewTab === tab}
                  key={tab}
                  onClick={() => setQuickViewTab(tab)}
                >
                  {tab}
                </StyledTab>
              ))}
            </StyledTabs>

            <StyledQuickTabContent>
              {quickViewTab === 'Task' ? (
                <StyledFormGrid>
                  <StyledField>
                    <StyledFieldLabel>Name</StyledFieldLabel>
                    <StyledInput defaultValue="Request Outstanding Documents" />
                  </StyledField>
                  <StyledField>
                    <StyledFieldLabel>Assignee</StyledFieldLabel>
                    <StyledInput defaultValue="Lend A Loan Broker" />
                  </StyledField>
                  <StyledField>
                    <StyledFieldLabel>Priority</StyledFieldLabel>
                    <StyledInput defaultValue="Low" />
                  </StyledField>
                  <StyledField>
                    <StyledFieldLabel>Due Date</StyledFieldLabel>
                    <StyledInput defaultValue="02 May 2026" />
                  </StyledField>
                </StyledFormGrid>
              ) : quickViewTab === 'Email' ? (
                <StyledFormGrid>
                  <StyledField>
                    <StyledFieldLabel>To</StyledFieldLabel>
                    <StyledInput defaultValue="alex.morgan@example.com" />
                  </StyledField>
                  <StyledField>
                    <StyledFieldLabel>Subject</StyledFieldLabel>
                    <StyledInput defaultValue="Outstanding loan documents" />
                  </StyledField>
                  <StyledField>
                    <StyledFieldLabel>Template</StyledFieldLabel>
                    <StyledInput defaultValue="Outstanding Supporting Documents" />
                  </StyledField>
                </StyledFormGrid>
              ) : (
                <StyledTextArea
                  defaultValue={`${quickViewTab}: capture broker notes, client activity and next action for ${selectedLoanRecord.name}.`}
                />
              )}
            </StyledQuickTabContent>

            <StyledDetailsGrid>
              <StyledPanel>
                <StyledPanelTitle>Client Portal</StyledPanelTitle>
                <StyledChecklist>
                  <StyledChecklistRow>
                    <input checked readOnly type="checkbox" />
                    <span>Status: {selectedLoanRecord.portalStatus}</span>
                  </StyledChecklistRow>
                  <StyledChecklistRow>
                    <input type="checkbox" />
                    <span>0 approved · 0 waiting on · 0 rejected</span>
                  </StyledChecklistRow>
                  <StyledChecklistRow>
                    <input type="checkbox" />
                    <span>Last updated at: Sat, May 2, 2026 11:55 AM</span>
                  </StyledChecklistRow>
                </StyledChecklist>
              </StyledPanel>

              <StyledPanel>
                <StyledPanelTitle>Applicant Details</StyledPanelTitle>
                <StyledChecklist>
                  {selectedLoanRecord.applicants.map((applicant) => (
                    <StyledChecklistRow
                      key={`${applicant.role}-${applicant.email}`}
                    >
                      <input type="checkbox" />
                      <span>
                        <strong>
                          {applicant.name} ({applicant.role})
                        </strong>
                        <br />
                        P: {applicant.phone}
                        <br />
                        E: {applicant.email}
                      </span>
                    </StyledChecklistRow>
                  ))}
                </StyledChecklist>
              </StyledPanel>

              <StyledPanel>
                <StyledPanelTitle>Assigned Team / Team Roles</StyledPanelTitle>
                <StyledMiniMeta>
                  Loan Processor · {selectedLoanRecord.broker}
                </StyledMiniMeta>
              </StyledPanel>

              <StyledPanel>
                <StyledPanelTitle>Lender Details</StyledPanelTitle>
                <StyledMiniMeta>
                  {selectedLoanRecord.lender}
                  <br />
                  Broker Code: Not recorded
                  <br />
                  Ref: Not recorded
                </StyledMiniMeta>
              </StyledPanel>

              <StyledPanel>
                <StyledPanelTitle>Upcoming Activities</StyledPanelTitle>
                <StyledChecklist>
                  <StyledChecklistRow>
                    <input type="checkbox" />
                    <span>
                      Request Outstanding Documents · Assigned to{' '}
                      {selectedLoanRecord.broker} · Due 02 May 2026
                    </span>
                  </StyledChecklistRow>
                  <StyledChecklistRow>
                    <input type="checkbox" />
                    <span>
                      Credit Guide & Privacy Consent · Not sent for both
                      applicants
                    </span>
                  </StyledChecklistRow>
                  <StyledChecklistRow>
                    <input type="checkbox" />
                    <span>
                      Living Expenses clarification · Awaiting client
                      confirmation
                    </span>
                  </StyledChecklistRow>
                </StyledChecklist>
              </StyledPanel>

              <StyledPanel>
                <StyledPanelTitle>Deal History</StyledPanelTitle>
                <StyledTabs>
                  {['Notes', 'Tasks', 'Emails', 'SMS'].map((tab, index) => (
                    <StyledTab active={index === 0} key={tab}>
                      {tab}
                    </StyledTab>
                  ))}
                </StyledTabs>
                <StyledMiniMeta>
                  No note results found. Task and workflow activity is ready to
                  attach to the same loan file timeline.
                </StyledMiniMeta>
              </StyledPanel>

              <StyledPanel>
                <StyledPanelTitle>Key Dates</StyledPanelTitle>
                <StyledChecklist>
                  {keyDateRows.slice(0, 4).map((row) => (
                    <StyledChecklistRow key={row.key}>
                      <input type="checkbox" />
                      <span>
                        {row.label}: {row.date} · {row.source}
                      </span>
                    </StyledChecklistRow>
                  ))}
                </StyledChecklist>
              </StyledPanel>

              <StyledPanel>
                <StyledPanelTitle>Reports</StyledPanelTitle>
                <StyledChecklist>
                  {reportTemplates.slice(0, 4).map((report) => (
                    <StyledChecklistRow key={report}>
                      <input type="checkbox" />
                      <span>{report}</span>
                    </StyledChecklistRow>
                  ))}
                </StyledChecklist>
              </StyledPanel>
            </StyledDetailsGrid>
          </StyledQuickView>

          <StyledSection id="serviceability">
            <StyledSectionHeader>
              <div>
                <StyledSectionTitle>Serviceability</StyledSectionTitle>
                <StyledSectionMeta>
                  Income, expenses, liabilities and surplus checks before lender
                  selection.
                </StyledSectionMeta>
              </div>
              <StyledButton accent="secondary">
                <IconChartBar size={16} />
                Run Calc
              </StyledButton>
            </StyledSectionHeader>
            <StyledTable>
              {serviceabilityRows.map(([label, value, note]) => (
                <StyledTableRow key={label}>
                  <div>{label}</div>
                  <strong>{value}</strong>
                  <span>{note}</span>
                </StyledTableRow>
              ))}
            </StyledTable>
          </StyledSection>

          <StyledSection id="tasks">
            <StyledTwoColumn>
              <StyledPanel>
                <StyledPanelTitle>
                  <IconHome size={18} />
                  Funding And Security
                </StyledPanelTitle>
                <StyledChecklist>
                  <StyledChecklistRow>
                    <input type="checkbox" />
                    <span>
                      Confirm purchase price, refinance payout and fees.
                    </span>
                  </StyledChecklistRow>
                  <StyledChecklistRow>
                    <input type="checkbox" />
                    <span>
                      Confirm valuation requirement and property access.
                    </span>
                  </StyledChecklistRow>
                  <StyledChecklistRow>
                    <input type="checkbox" />
                    <span>
                      Final cash-to-complete table approved by broker.
                    </span>
                  </StyledChecklistRow>
                </StyledChecklist>
              </StyledPanel>
              <StyledPanel>
                <StyledPanelTitle>
                  <IconBuildingSkyscraper size={18} />
                  Submission
                </StyledPanelTitle>
                <StyledChecklist>
                  <StyledChecklistRow>
                    <input type="checkbox" />
                    <span>
                      ApplyOnline application data reviewed against fact find.
                    </span>
                  </StyledChecklistRow>
                  <StyledChecklistRow>
                    <input type="checkbox" />
                    <span>
                      Supporting documents mapped to lender checklist.
                    </span>
                  </StyledChecklistRow>
                  <StyledChecklistRow>
                    <input type="checkbox" />
                    <span>Processor assigned lodgement task and due date.</span>
                  </StyledChecklistRow>
                </StyledChecklist>
              </StyledPanel>
            </StyledTwoColumn>
          </StyledSection>
        </StyledContent>
      </StyledMain>

      <StyledRightRail>
        <StyledRailBar>
          {rightRailItems.map(({ Icon, count, label }) => (
            <StyledRailButton
              active={activeRightRailItem === label}
              key={label}
              onClick={() => setActiveRightRailItem(label)}
              type="button"
            >
              <Icon size={18} />
              {count > 0 && <StyledRailCount>{count}</StyledRailCount>}
              {label}
            </StyledRailButton>
          ))}
        </StyledRailBar>
        <StyledWorkflowDrawer>
          <StyledWorkflowDrawerHeader>
            <strong>{activeRightRailItem}</strong>
            <StyledPill>
              {
                rightRailItems.find(
                  (item) => item.label === activeRightRailItem,
                )?.count
              }
            </StyledPill>
          </StyledWorkflowDrawerHeader>
          {renderRightRailDrawerContent()}
        </StyledWorkflowDrawer>
      </StyledRightRail>
    </StyledPage>
  );
};
