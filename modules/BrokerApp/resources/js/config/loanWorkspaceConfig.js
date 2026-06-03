export const dealStages = [
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
].map((name, index) => ({
  id: `deal-stage-${index + 1}`,
  number: index + 1,
  name,
}))

export const leadStages = [
  'New Lead',
  'Attempted Contact 1',
  'Attempted Contact 2',
  'Attempted Contact 3',
  'Initial Call Held > Get Docs',
  'Docs Requested',
  'Research > Servicing',
  'Prepare Loan Proposal',
  'Loan Proposal Presented',
  'Client Accepted > Handover',
  'On Hold',
  'Lost Opps',
].map((name, index) => ({
  id: `lead-stage-${index + 1}`,
  number: index + 1,
  name,
}))

export const sampleApplicants = [
  {
    id: 'primary-applicant',
    role: 'Primary Applicant',
    name: 'Shahrooz Safanejad',
    phone: '+61 488220222',
    email: 'shahrooz@lendaloan.com.au',
    address: 'AU',
    creditReport: 'Not ordered',
    consent: 'Not Sent',
  },
  {
    id: 'co-applicant-1',
    role: 'Co-Applicant 1',
    name: 'Shahrooz Safanejad',
    phone: '+61 422335522',
    email: 'shahrooz.safanejad41@gmail.com',
    address: '701/673 La Trobe Street, Docklands VIC 3008 AU',
    creditReport: 'Not ordered',
    consent: 'Not Sent',
  },
]

export const sampleLoan = {
  id: '2/2026',
  title: 'Shahrooz',
  owner: 'Shahrooz Safanejad',
  board: 'Deal',
  amount: '$0.00',
  stageNumber: 1,
  stageName: 'Outstanding Supporting Documents',
  financeDate: '-',
  settlementDate: '-',
  stageDueDate: '07/05/2026',
  portalStatus: 'Draft',
  portalDueDate: 'Not recorded',
  portalLastUpdated: 'Sat, May 2, 2026 11:55 AM',
  lender: 'Other',
  brokerCode: 'Not recorded',
  brokerBrand: 'LEND A LOAN (Shahrooz Safanejad)',
  applicants: sampleApplicants,
}

export const loanNavigationGroups = [
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
]

export const rightRailTools = [
  { id: 'notes', label: 'Notes', icon: 'PencilAlt' },
  { id: 'checklists', label: 'Checklists', icon: 'CheckCircle', badge: '1' },
  { id: 'tasks', label: 'Tasks', icon: 'ListBullet', badge: '1' },
  { id: 'emails', label: 'Emails', icon: 'Mail' },
  { id: 'texts', label: 'Texts', icon: 'Chat' },
  { id: 'key-dates', label: 'Key Dates', icon: 'Calendar' },
  { id: 'reports', label: 'Reports', icon: 'Folder' },
  { id: 'workflows', label: '1-Click Workflows', icon: 'CursorClick' },
]

export const workflowTemplates = [
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
  'Utility Connection Referral',
]

export const checklistItems = [
  ['Pre-Research Checklist (Lead)', 'Open'],
  ['FLEX Sync Prep', 'Open'],
  ['Proposal Preparation', 'Open'],
  ['Broker Handover Checklist', 'Open'],
  ['Pre-Submission', 'Open'],
  ['Signed App Docs Received Checklist', 'Open'],
  ['Pre-Full Conversion (COS)', 'Open'],
  ['Formal Approval Checklist', 'Open'],
  ['Compliance Checklist', 'Open'],
  ['Bank Ready to Settle Checklist', 'Completed'],
  ['Settlement Booked', 'Open'],
  ['Settlement Checklist', 'Open'],
  ['Review Checklist', 'Open'],
  ['Construction', 'Open'],
]

export const keyDates = [
  ['Stage Due', '07 May 2026', true],
  ['Finance', 'Select date', false],
  ['Settlement', 'Select date', false],
  ['Created At', '02 May 2026', true],
  ['Broker Handover', 'Select date', false],
  ['Exp. Lodged', 'Select date', false],
  ['Lodged', 'Select date', false],
  ['Pre Approval', 'Select date', false],
  ['Formal Approval', 'Select date', false],
  ['Expected Settlement', 'Select date', false],
  ['Settlement Refi', 'Select date', false],
  ['Settlement Purchase', 'Select date', false],
  ['Custom Text 3', 'Edit', false],
  ['Custom Text 4', 'Edit', false],
  ['Custom Text 5', 'Edit', false],
]

export const reportTemplates = [
  '01. Deal Submission Guide',
  '02. Deal (AIP to Full) Cover Sheet',
  '03. Funding Position Report',
  '04. Loan Submission Advice',
  '05. Formal Approval Advice',
  '06. Ready To Settle Advice (with Funding)',
  '07. Authority To Debit/Credit Form',
  '08. Settlement Advice',
  '09. Deal History Report',
]

export const livingExpenseCategories = [
  {
    id: 'groceries',
    title: 'Groceries',
    status: 'warning',
    fields: ['Groceries'],
    zeroCommentRequired: true,
  },
  {
    id: 'clothing-personal-care',
    title: 'Clothing and Personal Care',
    status: 'warning',
    fields: [
      'Clothing and Footwear',
      'Cosmetics',
      'Personal Care (e.g. Hairdressing, manicure, pedicure, massages etc.)',
      'Other',
    ],
    zeroCommentRequired: true,
  },
  {
    id: 'childcare-maintenance',
    title: 'Childcare and Maintenance',
    status: 'complete',
    fields: ['Childcare', 'Child Support / Maintenance'],
    zeroCommentRequired: false,
  },
  {
    id: 'education',
    title: 'Education',
    status: 'warning',
    fields: [
      'Public, Primary and Secondary Education',
      'Private Schooling and Tuition',
      'Higher education, vocational training and professional fees (excluding HECS/HELP repayments)',
      'Other',
    ],
    zeroCommentRequired: true,
  },
  {
    id: 'insurance',
    title: 'Insurance',
    status: 'warning',
    fields: [
      'Home and Contents Insurance',
      'Private Health Insurance',
      'Sickness and Accident Insurance (including Income, Trauma and TPD)',
      'Life Insurance',
      'Vehicle Insurance',
    ],
    zeroCommentRequired: true,
  },
  {
    id: 'medical-health',
    title: 'Medical and Health',
    status: 'warning',
    fields: [
      'Doctor and Dentist',
      'Optical and Pharmaceutical',
      'Other Medical',
    ],
    zeroCommentRequired: true,
  },
  {
    id: 'transport',
    title: 'Transport',
    status: 'warning',
    fields: [
      'Public Transport, Taxis and Ride-sharing',
      'Motor Vehicle Running Costs',
      'Parking and Tolls',
    ],
    zeroCommentRequired: true,
  },
  {
    id: 'utilities-communications',
    title: 'Utilities and Communications',
    status: 'warning',
    fields: [
      'Telephone (Mobile and Landline)',
      'Internet',
      'Gas, Electricity and Water',
      'Media Streaming Subscriptions',
    ],
    zeroCommentRequired: true,
  },
  {
    id: 'recreation',
    title: 'Recreation and Entertainment',
    status: 'warning',
    fields: [
      'Dining Out',
      'Recreation and Entertainment',
      'Holidays',
      'Sports and Clubs',
    ],
    zeroCommentRequired: true,
  },
  {
    id: 'housing',
    title: 'Housing and Property',
    status: 'warning',
    fields: [
      'Primary Residence Expenses',
      'Proposed Purchase Non-Primary Residence',
      'Rent Expense',
      'Boarding / Lodging',
    ],
    zeroCommentRequired: true,
  },
  {
    id: 'other',
    title: 'Other Expenses',
    status: 'warning',
    fields: [
      'Pets',
      'Donations',
      'Subscriptions and Memberships',
      'Other Regular Expenses',
    ],
    zeroCommentRequired: true,
  },
]

const field = (label, type = 'text', options = [], help = '') => ({
  label,
  type,
  options,
  help,
  required: label.startsWith('*'),
})

export const pageCatalog = {
  Goals: {
    intro:
      'Requirements and objectives captured for NCCP responsible lending and BID evidence.',
    sections: [
      {
        title: 'Loan Purpose',
        fields: [
          field('* Primary Loan Purpose', 'select', [
            'Purchase owner occupied',
            'Purchase investment',
            'Refinance',
            'Construction',
            'Equity release',
            'Debt consolidation',
          ]),
          field('Additional loan purpose(s)', 'multiselect'),
          field('Property Purpose', 'select', ['Owner Occupied', 'Investment']),
          field('Preferred Repayment Types', 'select', [
            'Principal and Interest',
            'Interest Only',
            'Split',
          ]),
          field('Preferred Loan Type', 'select', [
            'Variable',
            'Fixed',
            'Split',
          ]),
        ],
      },
      {
        title: 'Requirements and Objectives',
        fields: [
          field('* Requirements and Objectives', 'textarea'),
          field('Lender Preference'),
          field('Lender(s) preferred NOT to use'),
          field('Other Loan Feature(s)', 'multiselect'),
          field('Best Interests Duty notes', 'textarea'),
        ],
      },
    ],
  },
  Applicants: {
    intro:
      'Applicant-count driven fact find with primary applicant plus co-applicant tabs and three years of address history.',
    sections: [
      {
        title: 'Applicant Summary',
        fields: [
          field('* Number of Applicants', 'select', ['1', '2', '3', '4']),
          field('* Primary Applicant'),
          field('Co-Applicant 1'),
          field('Co-Applicant 2'),
          field('Co-Applicant 3'),
          field('Household group'),
        ],
      },
      {
        title: 'Identity and Contact',
        fields: [
          field('Title', 'select', ['Mr', 'Mrs', 'Ms', 'Miss', 'Mx', 'Dr']),
          field('* First Name'),
          field('* Last Name'),
          field('Preferred Name'),
          field('* Date of Birth', 'date'),
          field('* Email'),
          field('* Mobile Phone #'),
          field('Marital Status', 'select', [
            'Single',
            'Married',
            'De facto',
            'Separated',
            'Divorced',
            'Widowed',
          ]),
        ],
      },
      {
        title: 'Address History',
        fields: [
          field('* Current Residential Address'),
          field('* Time at Address'),
          field('Previous Residential Address'),
          field('Previous Address Start Date', 'date'),
          field('Previous Address End Date', 'date'),
          field('Three-year history complete', 'status'),
        ],
      },
      {
        title: 'KYC/CDD',
        fields: [
          field('Credit Guide & Privacy Consent', 'status'),
          field('ID Verification Status', 'status'),
          field('AML/CTF CDD Status', 'status'),
          field('Enhanced CDD Required', 'checkbox'),
          field('Manual review notes', 'textarea'),
        ],
      },
    ],
  },
  Dependants: {
    intro:
      'Dependants feed household expenditure, HEM context and servicing notes.',
    sections: [
      {
        title: 'Dependants',
        fields: [
          field('Number of Dependants', 'number'),
          field('Dependant name'),
          field('Age', 'number'),
          field('Relationship'),
          field('Lives with applicant', 'checkbox'),
          field('Education / childcare notes', 'textarea'),
        ],
      },
    ],
  },
  Assets: {
    intro:
      'Assets by owner/applicant with lender-ready ownership and verification notes.',
    sections: [
      {
        title: 'Asset Register',
        fields: [
          field('Owner', 'select', [
            'Primary Applicant',
            'Co-Applicant 1',
            'Joint',
            'Company',
            'Trust',
          ]),
          field('Asset Type', 'select', [
            'Savings',
            'Property',
            'Motor Vehicle',
            'Shares',
            'Superannuation',
            'Other',
          ]),
          field('Description'),
          field('Value', 'money'),
          field('Verified', 'checkbox'),
          field('Evidence notes', 'textarea'),
        ],
      },
    ],
  },
  'Other Income': {
    intro: 'Non-employment income and add-backs that affect servicing.',
    sections: [
      {
        title: 'Income Sources',
        fields: [
          field('Applicant', 'select', ['Primary Applicant', 'Co-Applicant 1']),
          field('Income Type', 'select', [
            'Rental',
            'Centrelink',
            'Bonus',
            'Overtime',
            'Commission',
            'Dividends',
            'Other',
          ]),
          field('Gross Amount', 'money'),
          field('Frequency', 'select', [
            'Weekly',
            'Fortnightly',
            'Monthly',
            'Annual',
          ]),
          field('Reliability / continuity notes', 'textarea'),
          field('Evidence received', 'checkbox'),
        ],
      },
    ],
  },
  Liabilities: {
    intro: 'Existing loans, credit cards, BNPL and contingent liabilities.',
    sections: [
      {
        title: 'Liability Register',
        fields: [
          field('Applicant', 'select', [
            'Primary Applicant',
            'Co-Applicant 1',
            'Joint',
          ]),
          field('Liability Type', 'select', [
            'Home Loan',
            'Personal Loan',
            'Credit Card',
            'Car Loan',
            'HECS/HELP',
            'BNPL',
            'Other',
          ]),
          field('Lender'),
          field('Limit', 'money'),
          field('Balance', 'money'),
          field('Monthly repayment', 'money'),
          field('To be refinanced / cleared', 'checkbox'),
        ],
      },
    ],
  },
  'Financial Security': {
    intro:
      'Risk, buffers and hardship considerations used for responsible lending evidence.',
    sections: [
      {
        title: 'Security and Resilience',
        fields: [
          field('Cash buffer after settlement', 'money'),
          field('Insurance held', 'textarea'),
          field('Expected income changes', 'textarea'),
          field('Known future expenses', 'textarea'),
          field('Adverse credit disclosed', 'checkbox'),
          field('Broker notes', 'textarea'),
        ],
      },
    ],
  },
  'Interview Guide': {
    intro:
      'Broker interview prompts for needs analysis, file notes and BID rationale.',
    sections: [
      {
        title: 'Interview Notes',
        fields: [
          field('Client situation', 'textarea'),
          field('Needs and objectives', 'textarea'),
          field('Product features discussed', 'textarea'),
          field('Risks and trade-offs explained', 'textarea'),
          field('Alternatives considered', 'textarea'),
          field('BID rationale', 'textarea'),
        ],
      },
    ],
  },
  Security: {
    intro:
      'Property/security data used by valuations, product selection and lodgement.',
    sections: [
      {
        title: 'Security Property',
        fields: [
          field('Security Type', 'select', [
            'Established dwelling',
            'Vacant land',
            'Construction',
            'Off the plan',
            'Refinance security',
          ]),
          field('Address'),
          field('Estimated Value', 'money'),
          field('Purchase Price', 'money'),
          field('Ownership', 'select', [
            'Primary Applicant',
            'Co-Applicant 1',
            'Joint',
            'Company',
            'Trust',
          ]),
          field('Valuation status', 'status'),
        ],
      },
    ],
  },
  'Funding Position': {
    intro:
      'Funds required, funds available, surplus/shortfall and source evidence.',
    sections: [
      {
        title: 'Funds Required',
        fields: [
          field('Purchase price', 'money'),
          field('Stamp duty', 'money'),
          field('Legal costs', 'money'),
          field('Loan costs', 'money'),
          field('Total required', 'money'),
        ],
      },
      {
        title: 'Funds Available',
        fields: [
          field('Loan amount', 'money'),
          field('Savings contribution', 'money'),
          field('Grant / concession', 'money'),
          field('Gift', 'money'),
          field('Total available', 'money'),
          field('Surplus / Shortfall', 'money'),
        ],
      },
    ],
  },
  Products: {
    intro:
      'Shortlist, comparison and selected recommendation for credit proposal.',
    sections: [
      {
        title: 'Product Shortlist',
        fields: [
          field('Lender'),
          field('Product'),
          field('Rate', 'percent'),
          field('Comparison Rate', 'percent'),
          field('Repayment Type', 'select', ['P&I', 'Interest Only', 'Split']),
          field('Why considered', 'textarea'),
          field('Selected', 'checkbox'),
        ],
      },
    ],
  },
  'Smart Docs': {
    intro:
      'Document pack builder for compliance, client portal and lender evidence.',
    sections: [
      {
        title: 'Document Requests',
        fields: [
          field('Template', 'select', [
            'Credit Guide & Privacy Consent',
            'KYC identity pack',
            'PAYG income pack',
            'Bank statement request',
          ]),
          field('Target', 'select', [
            'All applicants',
            'Primary Applicant',
            'Co-Applicant 1',
            'Household',
          ]),
          field('Delivery method', 'select', [
            'Client portal',
            'Email draft',
            'Manual request',
          ]),
          field('Provider gate', 'status'),
        ],
      },
    ],
  },
  BrokerWizard: {
    intro:
      'Assistant-style broker workflow builder. Actions remain local until provider adapters are approved.',
    sections: [
      {
        title: 'Scenario Wizard',
        fields: [
          field('Selected scenario', 'select', workflowTemplates),
          field('Generated tasks', 'table'),
          field('Generated document requests', 'table'),
          field('Generated file note', 'textarea'),
        ],
      },
    ],
  },
  'Lodgement Funding': {
    intro:
      'Final funding position and lodgement funding checks before submission.',
    sections: [
      {
        title: 'Lodgement Funding',
        fields: [
          field('Loan amount', 'money'),
          field('LVR', 'percent'),
          field('LMI estimate', 'money'),
          field('Funds to complete verified', 'checkbox'),
          field('Shortfall resolved', 'checkbox'),
          field('Funding notes', 'textarea'),
        ],
      },
    ],
  },
  'Credit Proposal': {
    intro:
      'Credit proposal evidence for recommendation, comparison and BID reasoning.',
    sections: [
      {
        title: 'Proposal Readiness',
        fields: [
          field('Requirements and objectives complete', 'status'),
          field('Financial position verified', 'status'),
          field('Product comparison complete', 'status'),
          field('Recommendation rationale', 'textarea'),
          field('Client risks explained', 'textarea'),
          field('Broker approval', 'status'),
        ],
      },
    ],
  },
  Submission: {
    intro:
      'Provider-gated final submission readiness. ApplyOnline, AFG Flex, BrokerEngine and LIXI export stay disabled until credentials exist.',
    sections: [
      {
        title: 'Submission Gates',
        fields: [
          field('Credit Guide & Privacy Consent complete', 'status'),
          field('KYC/CDD complete', 'status'),
          field('Fact Find complete', 'status'),
          field('Serviceability complete', 'status'),
          field('Credit proposal approved', 'status'),
          field('Lender documents ready', 'status'),
          field('Provider adapter', 'select', [
            'ApplyOnline',
            'AFG Flex',
            'BrokerEngine',
            'LIXI export',
          ]),
        ],
      },
    ],
  },
}

export const genericPageFallback = pageName => ({
  intro: `${pageName} captures lender-ready information for this residential loan file.`,
  sections: [
    {
      title: pageName,
      fields: [
        field('Status', 'status'),
        field('Required information', 'textarea'),
        field('Evidence received', 'checkbox'),
        field('Broker notes', 'textarea'),
      ],
    },
  ],
})
