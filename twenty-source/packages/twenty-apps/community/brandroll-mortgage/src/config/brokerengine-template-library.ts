type BrokerTemplateSeed = {
  templateName: string;
  templateType:
    | 'EMAIL'
    | 'SMS'
    | 'TASK'
    | 'CHECKLIST'
    | 'REPORT'
    | 'WORKFLOW'
    | 'SMART_DOC'
    | 'FORM';
  workflowCategory:
    | 'LEAD'
    | 'DOCUMENTS'
    | 'STRATEGY'
    | 'LODGEMENT'
    | 'APPROVAL'
    | 'SETTLEMENT'
    | 'POST_SETTLEMENT'
    | 'REVIEW'
    | 'CONSTRUCTION'
    | 'PARTNERSHIP'
    | 'MAINTENANCE'
    | 'ASSET_FINANCE'
    | 'COMMERCIAL_LENDING'
    | 'BUSINESS_LENDING';
  subject?: string;
  bodyFormat: 'HTML' | 'PLAIN_TEXT';
  body: string;
  fromRole: 'BROKER' | 'LOAN_PROCESSOR' | 'ASSIGNED_TEAM' | 'SYSTEM';
  toRecipientType: string;
  sharedScope: 'BROKER_GROUP' | 'WORKSPACE' | 'PRIVATE';
  sourceSystem: 'BROKERENGINE' | 'BROKERAPP';
  relatedBoard?:
    | 'LEAD'
    | 'DEAL'
    | 'MAINTENANCE'
    | 'CONSTRUCTION'
    | 'ASSET_FINANCE'
    | 'PARTNERSHIPS'
    | 'COMMERCIAL_LENDING'
    | 'BUSINESS_LENDING';
  relatedStage?: string;
  mergeVariables: readonly string[];
  taskPriority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  taskDueOffsetBusinessDays?: number;
  importStatus: 'STRUCTURE_ONLY' | 'BODY_PENDING_PRIVATE_IMPORT' | 'READY';
  notes?: string;
};

const privateBodyPlaceholder =
  'Private BrokerEngine body not committed. Use the template import workflow to store approved private HTML/Rich Text content in the workspace.';
const privateTaskBodyPlaceholder =
  'Private BrokerEngine task body not committed. Store approved action-step text privately in the workspace before automation goes live.';
const privateChecklistBodyPlaceholder =
  'Private BrokerEngine checklist items not committed. Import approved checklist questions and gates privately in the workspace.';

const email = (
  templateName: string,
  subject: string,
  workflowCategory: BrokerTemplateSeed['workflowCategory'],
  relatedBoard?: BrokerTemplateSeed['relatedBoard'],
  relatedStage?: string,
  mergeVariables: readonly string[] = [],
): BrokerTemplateSeed => ({
  templateName,
  templateType: 'EMAIL',
  workflowCategory,
  subject,
  bodyFormat: 'HTML',
  body: privateBodyPlaceholder,
  fromRole: 'BROKER',
  toRecipientType: 'CLIENT',
  sharedScope: 'BROKER_GROUP',
  sourceSystem: 'BROKERENGINE',
  relatedBoard,
  relatedStage,
  mergeVariables,
  importStatus: 'BODY_PENDING_PRIVATE_IMPORT',
});

const task = (
  templateName: string,
  workflowCategory: BrokerTemplateSeed['workflowCategory'],
  taskPriority: NonNullable<BrokerTemplateSeed['taskPriority']>,
  relatedBoard?: BrokerTemplateSeed['relatedBoard'],
  relatedStage?: string,
  notes?: string,
): BrokerTemplateSeed => ({
  templateName,
  templateType: 'TASK',
  workflowCategory,
  subject: templateName,
  bodyFormat: 'PLAIN_TEXT',
  body: privateTaskBodyPlaceholder,
  fromRole: 'SYSTEM',
  toRecipientType: 'INTERNAL_TEAM',
  sharedScope: 'BROKER_GROUP',
  sourceSystem: 'BROKERENGINE',
  relatedBoard,
  relatedStage,
  mergeVariables: [],
  taskPriority,
  importStatus: 'BODY_PENDING_PRIVATE_IMPORT',
  notes,
});

const checklist = (
  templateName: string,
  workflowCategory: BrokerTemplateSeed['workflowCategory'],
  relatedBoard?: BrokerTemplateSeed['relatedBoard'],
  notes?: string,
): BrokerTemplateSeed => ({
  templateName,
  templateType: 'CHECKLIST',
  workflowCategory,
  subject: templateName,
  bodyFormat: 'PLAIN_TEXT',
  body: privateChecklistBodyPlaceholder,
  fromRole: 'SYSTEM',
  toRecipientType: 'INTERNAL_TEAM',
  sharedScope: 'BROKER_GROUP',
  sourceSystem: 'BROKERENGINE',
  relatedBoard,
  mergeVariables: [],
  importStatus: 'BODY_PENDING_PRIVATE_IMPORT',
  notes,
});

export const brokerEngineEmailTemplateSeeds: BrokerTemplateSeed[] = [
  email('Pre-Approval Issued', 'Pre-approval has been issued', 'APPROVAL', 'DEAL', 'AIP Issued'),
  email('Review Complete - AIA', 'Is Your Financial Wellbeing Protected?', 'REVIEW'),
  email('AIA 12 Months Post Settlement', "Make sure you're protected - not just your house and contents", 'POST_SETTLEMENT'),
  email('Settlement - AIA', 'Congratulations on your home settlement. Have you thought about protection?', 'SETTLEMENT'),
  email('AIA: Formal Approval', 'Protect your future as you finalise your new home', 'APPROVAL', 'DEAL', 'Formal Approval'),
  email('AIA Introduction', 'Protecting you and your loved ones from the unexpected', 'LEAD'),
  email('Decline Email', 'Update on Your Loan Application', 'LODGEMENT', 'DEAL', 'Lost/Declined'),
  email('Unconditional Approval Letter', 'Unconditional Approval Letter', 'APPROVAL', 'DEAL', 'Formal Approval'),
  email('Partnership Introduction', 'Partnership Opportunity with Lend A Loan', 'PARTNERSHIP', 'PARTNERSHIPS'),
  email('Partnership Contact Attempt One', 'test email', 'PARTNERSHIP', 'PARTNERSHIPS'),
  email('Signature', 'Signature', 'DOCUMENTS'),
  email('Attempted Contact 2', 'Re: Your lending enquiry with {{ broker.brand.name }}', 'LEAD', 'LEAD', 'Attempted Contact 2', ['broker.brand.name']),
  email('Attempted Contact 1', 'Your lending enquiry with {{ broker.brand.name }}', 'LEAD', 'LEAD', 'Attempted Contact 1', ['broker.brand.name']),
  email('Document Request intro', 'Documents required to progress your lending enquiry', 'DOCUMENTS', 'LEAD', 'Docs Requested', [
    'loan.name',
    'primary_applicant.name',
    'coapplicants.coapplicant_1.name',
    'primary_applicant.email',
    'coapplicants.coapplicant_1.email',
    'primary_applicant.phone',
    'salutation',
    'nicknames',
    'primary_applicant.fv_invite_url',
    'coapplicants.coapplicant_1.fv_invite_url',
    'coapplicants.coapplicant_2.fv_invite_url',
    'coapplicants.coapplicant_3.fv_invite_url',
  ]),
  email('Document Request Follow Up 1', 'Document request followup', 'DOCUMENTS', 'LEAD', 'Docs Requested'),
  email('Loan Strategy Follow Up', 'Touching base', 'STRATEGY', 'LEAD', 'Loan Proposal Presented'),
  email('Email to builder with requirements for Letter of Commencement', 'Letter of Commencement', 'CONSTRUCTION', 'CONSTRUCTION'),
  email('Letter of Commencement', 'Next Step: Letter of Commencement', 'CONSTRUCTION', 'CONSTRUCTION'),
  email('Preparing Application for Submission', 'Your loan is being prepared for lender submission', 'LODGEMENT', 'DEAL', 'Prepare for Submission'),
  email('Assessment Update', 'Update on {{ lender.incoming_lender.name }} loan assessment', 'LODGEMENT', 'DEAL', 'Application Lodged', ['lender.incoming_lender.name']),
  email('Your Application Has Been Received By The Lender', 'Your application has been received by {{ lender.incoming_lender.name }}', 'LODGEMENT', 'DEAL', 'Application Lodged', ['lender.incoming_lender.name']),
  email('Your Loan Has Been Submitted For Pre-Approval', 'Your loan has been submitted to {{ lender.incoming_lender.name }}', 'LODGEMENT', 'DEAL', 'Application Lodged', ['lender.incoming_lender.name']),
  email('AIP Issued: Terms of Offer (Non-NSW)', 'Important information on your Terms of Offer', 'APPROVAL', 'DEAL', 'AIP Issued'),
  email('AIP Issued: Terms of Offer (NSW)', 'Important information on your Terms of Offer (NSW)', 'APPROVAL', 'DEAL', 'AIP Issued'),
  email('AIP Issued: Firms We Recommend', 'Recommended professionals for your consideration', 'APPROVAL', 'DEAL', 'AIP Issued'),
  email('AIP Issued: Pre-Approval Expiring', 'Pre-approval expiring', 'APPROVAL', 'DEAL', 'AIP Issued'),
  email('Assessment Update', 'Update on {{ lender.incoming_lender.name }} assessment', 'LODGEMENT', 'DEAL', 'Conditional/MIRs', ['lender.incoming_lender.name']),
  email('Construction - Formal Approval Advice', 'Formal Approval advice attached', 'CONSTRUCTION', 'CONSTRUCTION', 'Formal Approval'),
  email('Land and Build: Formal Approval Advice Attached', 'Formal Approval attached', 'CONSTRUCTION', 'CONSTRUCTION', 'Formal Approval'),
  email('Construction/Land & Build - Formal Approval Received (Initial)', 'Formal approval received', 'CONSTRUCTION', 'CONSTRUCTION', 'Formal Approval'),
  email('Refinance: Formal Approval Advice Attached', 'Formal approval attached', 'APPROVAL', 'DEAL', 'Formal Approval'),
  email('Refinance - Formal Approval Received (Initial)', 'Formal approval received', 'APPROVAL', 'DEAL', 'Formal Approval'),
  email('Top Up: Formal Approval Advice Attached', 'Formal Approval attached', 'APPROVAL', 'DEAL', 'Formal Approval'),
  email('Top Up - Formal Approval Received (Initial)', 'Formal approval received', 'APPROVAL', 'DEAL', 'Formal Approval'),
  email('Mortgage Documents Issued', 'Mortgage Documents have been issued', 'SETTLEMENT', 'DEAL', 'Mortgage Docs Issued'),
  email('Mortgage Docs Received by Lender', 'Mortgage documents received by {{ lender.incoming_lender.name }}', 'SETTLEMENT', 'DEAL', 'Mortgage Docs Returned', ['lender.incoming_lender.name']),
  email('Construction: Bank Ready to Settle', '{{ lender.incoming_lender.name }} is ready to fund your build', 'CONSTRUCTION', 'CONSTRUCTION', 'Ready To Settle', ['lender.incoming_lender.name']),
  email('Land and Build: Ready for Settlement', '{{ lender.incoming_lender.name }} is ready to settle', 'SETTLEMENT', 'DEAL', 'Ready To Settle', ['lender.incoming_lender.name']),
  email('Solictor: Ready to Settle - All', '{{ primary_applicant.name }} - ready to settle', 'SETTLEMENT', 'DEAL', 'Ready To Settle', ['primary_applicant.name']),
  email('Purchase: Bank Ready For Settlement', '{{ lender.incoming_lender.name }} is ready to settle', 'SETTLEMENT', 'DEAL', 'Ready To Settle', ['lender.incoming_lender.name']),
  email('Refinance: Bank Ready for Settlement', '{{ lender.incoming_lender.name }} is ready to settle your refinance', 'SETTLEMENT', 'DEAL', 'Ready To Settle', ['lender.incoming_lender.name']),
  email('Top Up: Bank Ready For Settlement', '{{ lender.incoming_lender.name }} is ready to fund your loan top up', 'SETTLEMENT', 'DEAL', 'Ready To Settle', ['lender.incoming_lender.name']),
  email('Agent: Settlement Booked', 'Settlement Booked for {{ primary_applicant.name }}', 'SETTLEMENT', 'DEAL', 'Settlement Booked', ['primary_applicant.name']),
  email('Settlement Booked Time', 'Settlement booked', 'SETTLEMENT', 'DEAL', 'Settlement Booked'),
  email('Lender Rebate has been paid', 'Lender rebate paid confirmation', 'POST_SETTLEMENT', 'DEAL', 'Settlement'),
  email('Settlement Advice Attached- Construction', 'Please find Settlement Advice inside', 'CONSTRUCTION', 'CONSTRUCTION', 'Settlement'),
  email('Construction: Congratulations on Settlement Initial', 'Congratulations on Settlement', 'CONSTRUCTION', 'CONSTRUCTION', 'Settlement'),
  email('Settlement Advice Attached - Land and Build', 'Please find settlement advice inside', 'SETTLEMENT', 'DEAL', 'Settlement'),
  email('Land and Build: Congratulations on Settlement Initial', 'Congratulations on settlement', 'SETTLEMENT', 'DEAL', 'Settlement'),
  email('Post Settlement Call - Purchase', 'Post settlement review call', 'POST_SETTLEMENT', 'DEAL', 'Settlement'),
  email('Settlement Advice Attached - Purchase', 'Please find settlement advice inside', 'SETTLEMENT', 'DEAL', 'Settlement'),
  email('Purchase: Congratulations on Settlement', 'Congratulations on settlement', 'SETTLEMENT', 'DEAL', 'Settlement'),
  email('Settlement Advice Attached- Refi', 'Please find Settlement Advice inside', 'SETTLEMENT', 'DEAL', 'Settlement'),
  email('Refinance: Congratulations on Settlement Initial', 'Congratulations on Settlement', 'SETTLEMENT', 'DEAL', 'Settlement'),
  email('First Repayment Reminder', 'First repayment reminder', 'POST_SETTLEMENT', 'DEAL', 'Settlement'),
  email('Testimonial Request', 'Review request', 'POST_SETTLEMENT', 'DEAL', 'Settlement'),
  email('Post Settlement Call - Refinance, Land and Build, Construction top up', 'Post Settlement housekeeping call', 'POST_SETTLEMENT', 'DEAL', 'Settlement'),
  email('Settlement Advice Attached - Top Up', 'Please find Settlement Advice inside', 'SETTLEMENT', 'DEAL', 'Settlement'),
  email('Top Up: Congratulations on Settlement Initial', 'Congratulations on Settlement', 'SETTLEMENT', 'DEAL', 'Settlement'),
  email('PP. Updating the builder', 'Progress Payment Made', 'CONSTRUCTION', 'CONSTRUCTION'),
  email('Progress Payment Completed', 'Progress Payment Completed', 'CONSTRUCTION', 'CONSTRUCTION'),
  email('2.3. Progress Payment Request Confirmed received and sla', 'Progress Payment Request Update', 'CONSTRUCTION', 'CONSTRUCTION'),
  email('2.3 - PP sent to lender', 'Progress Payment Submitted', 'CONSTRUCTION', 'CONSTRUCTION'),
  email('Purchase: Formal Approval Advice Attached', 'Formal Approval attached', 'APPROVAL', 'DEAL', 'Formal Approval'),
  email('Purchase - Formal Approval Received (Initial)', 'Formal approval received', 'APPROVAL', 'DEAL', 'Formal Approval'),
  email('Attempted Contact 3', 'Are you still interested?', 'LEAD', 'LEAD', 'Attempted Contact 3'),
];

export const brokerEngineTaskTemplateSeeds: BrokerTemplateSeed[] = [
  task('AIP Issued: Update stage due date', 'APPROVAL', 'CRITICAL', 'DEAL', 'AIP Issued'),
  task('Broker to Call Client on Settlement', 'POST_SETTLEMENT', 'HIGH', 'DEAL', 'Settlement'),
  task('Call Lead - 1st Attempt', 'LEAD', 'MEDIUM', 'LEAD', 'New Lead'),
  task('Call Lead - 2nd Attempt', 'LEAD', 'HIGH', 'LEAD', 'Attempted Contact 1'),
  task('Call Lead - 3rd Attempt', 'LEAD', 'HIGH', 'LEAD', 'Attempted Contact 2'),
  task('Check on ETA for certification', 'SETTLEMENT', 'CRITICAL', 'DEAL', 'Mortgage Docs Returned'),
  task('Complete Compliance Checklist', 'LODGEMENT', 'HIGH', 'DEAL'),
  task('Complete Formal Approval Checklist', 'APPROVAL', 'HIGH', 'DEAL', 'Formal Approval'),
  task('Complete Pre > Full Conversion Checklist', 'APPROVAL', 'CRITICAL', 'DEAL', 'AIP > Full Conversion'),
  task('Complete Ready to Settle Checklist', 'SETTLEMENT', 'HIGH', 'DEAL', 'Ready To Settle'),
  task('Complete Settlement Booked Checklist', 'SETTLEMENT', 'HIGH', 'DEAL', 'Settlement Booked'),
  task('Complete Settlement Checklist', 'SETTLEMENT', 'HIGH', 'DEAL', 'Settlement'),
  task('Complete Signed App Docs Received Checklist', 'LODGEMENT', 'HIGH', 'DEAL', 'Signed App Docs Returned'),
  task('Complete the Broker Handover Checklist', 'STRATEGY', 'HIGH', 'LEAD', 'Client Accepted > Handover'),
  task(
    'Complete the FLEX Sync Prep Checklist or Proposal Preparation Checklist (Broker)',
    'STRATEGY',
    'HIGH',
    'LEAD',
    'Prepare Loan Proposal',
  ),
  task('Complete the Pre-Research Checklist', 'STRATEGY', 'MEDIUM', 'LEAD', 'Research > Servicing'),
  task('Complete the Proposal Preparation (Team) Checklist', 'STRATEGY', 'HIGH', 'LEAD', 'Prepare Loan Proposal'),
  task('Confirm Final Payment Made', 'CONSTRUCTION', 'HIGH', 'CONSTRUCTION'),
  task('Confirm Lender Rebate Paid', 'POST_SETTLEMENT', 'HIGH', 'DEAL', 'Settlement'),
  task('Confirm MIR Response Received by Lender', 'LODGEMENT', 'HIGH', 'DEAL', 'Conditions/MIRs With Lender'),
  task('Confirm Progress Payment Made', 'CONSTRUCTION', 'MEDIUM', 'CONSTRUCTION'),
  task('Confirm Progress Payment Received and ETA on Payment', 'CONSTRUCTION', 'MEDIUM', 'CONSTRUCTION'),
  task('Confirm Submission Received', 'LODGEMENT', 'MEDIUM', 'DEAL', 'Application Lodged'),
  task('Contact Lead - Final Attempt', 'LEAD', 'LOW', 'LEAD', 'Attempted Contact 3'),
  task('Ensure Assessment is on Track', 'LODGEMENT', 'CRITICAL', 'DEAL', 'Application Lodged'),
  task('Follow Up Document Request', 'DOCUMENTS', 'HIGH', 'LEAD', 'Docs Requested'),
  task('Follow up Mortgage Docs with Client', 'SETTLEMENT', 'CRITICAL', 'DEAL', 'Mortgage Docs Issued'),
  task('Follow Up on Conditional/Missing Items', 'LODGEMENT', 'HIGH', 'DEAL', 'Conditional/MIRs'),
  task('Follow up on Letter of Commencement Requirements', 'CONSTRUCTION', 'MEDIUM', 'CONSTRUCTION'),
  task('Follow Up Outstanding Documents', 'DOCUMENTS', 'CRITICAL', 'DEAL', 'Outstanding Supporting Documents'),
  task('Follow up Settlement Booking', 'SETTLEMENT', 'HIGH', 'DEAL', 'Ready To Settle'),
  task('Follow Up Signed Application Docs', 'LODGEMENT', 'HIGH', 'DEAL', 'App Docs With Client'),
  task('Letter of Commencement Requirements', 'CONSTRUCTION', 'MEDIUM', 'CONSTRUCTION'),
  task('Pre-approval close to expiry', 'APPROVAL', 'CRITICAL', 'DEAL', 'AIP Issued'),
  task('Prepare Deposit Bond', 'LODGEMENT', 'HIGH', 'DEAL'),
  task('Prepare Discharge Authority', 'SETTLEMENT', 'HIGH', 'DEAL', 'Formal Approval'),
  task('Prepare FHOG for Submission', 'LODGEMENT', 'HIGH', 'DEAL'),
  task('Prepare for Submission', 'LODGEMENT', 'MEDIUM', 'DEAL', 'Prepare for Submission'),
  task('Progress Payment Final (completion)', 'CONSTRUCTION', 'HIGH', 'CONSTRUCTION'),
  task('R01. Complete the Review Checklist', 'REVIEW', 'HIGH', 'MAINTENANCE'),
  task('R01 Fixed Rate Review', 'REVIEW', 'CRITICAL', 'MAINTENANCE'),
  task('R01 Interest Only Review', 'REVIEW', 'CRITICAL', 'MAINTENANCE'),
  task('R02. Broker to Check the Reviewed Deal', 'REVIEW', 'MEDIUM', 'MAINTENANCE'),
  task('R03. Prepare the Refinance Review Report and Send to Broker', 'REVIEW', 'HIGH', 'MAINTENANCE'),
  task('R04. Send Refinance Report to Client', 'REVIEW', 'HIGH', 'MAINTENANCE'),
  task('R05. Action Variation', 'REVIEW', 'HIGH', 'MAINTENANCE'),
  task('R06. Request Pricing from Lender', 'REVIEW', 'HIGH', 'MAINTENANCE'),
  task('R07. Follow Up Pricing Request with Lender', 'REVIEW', 'MEDIUM', 'MAINTENANCE'),
  task('R08. Follow Up Lender to Confirm New Pricing is Applied', 'REVIEW', 'MEDIUM', 'MAINTENANCE'),
  task('R09. Send Pricing Review Report to the Client', 'REVIEW', 'MEDIUM', 'MAINTENANCE'),
  task("R10. Prepare the 'No Change' Review Report", 'REVIEW', 'MEDIUM', 'MAINTENANCE'),
  task('R11. Send No Change Review Report to Client', 'REVIEW', 'MEDIUM', 'MAINTENANCE'),
  task('Request Docs via FinanceVault', 'DOCUMENTS', 'HIGH', 'LEAD', 'Initial Call Held > Get Docs'),
  task('Request Outstanding Documents', 'DOCUMENTS', 'HIGH', 'DEAL', 'Outstanding Supporting Documents'),
  task('Review App in AOL and Send Documents to Client for Signing', 'LODGEMENT', 'HIGH', 'DEAL', 'Prepare for Submission'),
  task('Review App in AOL and Submit to Lender', 'LODGEMENT', 'CRITICAL', 'DEAL', 'Signed App Docs Returned'),
  task('Review Conditional Approval/MIR from Lender', 'LODGEMENT', 'CRITICAL', 'DEAL', 'Conditional/MIRs'),
  task('Second Follow Up on Conditional/ Missing Items', 'LODGEMENT', 'CRITICAL', 'DEAL', 'Conditions/MIRs With Client'),
  task('Send Loan Proposal to the Client', 'STRATEGY', 'HIGH', 'LEAD', 'Prepare Loan Proposal'),
  task('Submit Deposit Bond Application', 'LODGEMENT', 'HIGH', 'DEAL'),
  task(
    'Submit Discharge Authoriy',
    'SETTLEMENT',
    'CRITICAL',
    'DEAL',
    'Formal Approval',
    'Source spelling preserved from BrokerEngine.',
  ),
  task('Submit First Home Owners Grant Forms', 'LODGEMENT', 'HIGH', 'DEAL'),
  task('Submit First Progress Payment Request', 'CONSTRUCTION', 'HIGH', 'CONSTRUCTION'),
  task('Submit Progress Payment Middle Payments (PP)', 'CONSTRUCTION', 'MEDIUM', 'CONSTRUCTION'),
];

export const brokerEngineChecklistTemplateSeeds: BrokerTemplateSeed[] = [
  checklist('LEND A LOAN Checklist (Loan)', 'LODGEMENT', 'DEAL'),
  checklist('AFG Residential', 'LODGEMENT', 'DEAL', 'Observed as the default checklist in BrokerEngine.'),
  checklist('Residential', 'LODGEMENT', 'DEAL'),
];

export const brokerAppSmsTemplatePlaceholders: BrokerTemplateSeed[] = [
  {
    templateName: 'Document request follow-up SMS',
    templateType: 'SMS',
    workflowCategory: 'DOCUMENTS',
    bodyFormat: 'PLAIN_TEXT',
    body: 'Hi {{ applicant.preferredName }}, just checking in on the document request for {{ opportunity.name }}. Please contact {{ broker.name }} if you need help.',
    fromRole: 'BROKER',
    toRecipientType: 'CLIENT',
    sharedScope: 'WORKSPACE',
    sourceSystem: 'BROKERAPP',
    relatedBoard: 'LEAD',
    relatedStage: 'Docs Requested',
    mergeVariables: ['applicant.preferredName', 'opportunity.name', 'broker.name'],
    importStatus: 'READY',
    notes:
      'BrokerEngine SMS Templates were empty in settings, so this is a BrokerApp starter placeholder.',
  },
];

export const brokerEngineTemplateSeeds = [
  ...brokerEngineEmailTemplateSeeds,
  ...brokerEngineTaskTemplateSeeds,
  ...brokerEngineChecklistTemplateSeeds,
  ...brokerAppSmsTemplatePlaceholders,
] as const;
