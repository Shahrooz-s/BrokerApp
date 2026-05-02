export const brokerEngineToBrokerAppMergeVariableMap = [
  {
    brokerEngineToken: '{{ broker.brand.name }}',
    brokerAppPath: 'broker.brandName',
    twentySource: 'workspace / broker settings',
  },
  {
    brokerEngineToken: '{{ lender.incoming_lender.name }}',
    brokerAppPath: 'mortgageApplication.selectedLender',
    twentySource: 'Mortgage application / Broker lender',
  },
  {
    brokerEngineToken: '{{ primary_applicant.name }}',
    brokerAppPath: 'applicantProfiles[role=PRIMARY].displayName',
    twentySource: 'Applicant profile linked to Contact',
  },
  {
    brokerEngineToken: '{{ primary_applicant.email }}',
    brokerAppPath: 'applicantProfiles[role=PRIMARY].person.email',
    twentySource: 'Contact',
  },
  {
    brokerEngineToken: '{{ primary_applicant.phone }}',
    brokerAppPath: 'applicantProfiles[role=PRIMARY].person.phone',
    twentySource: 'Contact',
  },
  {
    brokerEngineToken: '{{ primary_applicant.fv_invite_url }}',
    brokerAppPath: 'factFindSession.portalSessionUrl',
    twentySource: 'Fact Find Session / client portal',
  },
  {
    brokerEngineToken: '{{ coapplicants.coapplicant_1.name }}',
    brokerAppPath: 'applicantProfiles[applicantIndex=1].displayName',
    twentySource: 'Applicant profile linked to Contact',
  },
  {
    brokerEngineToken: '{{ coapplicants.coapplicant_1.email }}',
    brokerAppPath: 'applicantProfiles[applicantIndex=1].person.email',
    twentySource: 'Contact',
  },
  {
    brokerEngineToken: '{{ coapplicants.coapplicant_1.fv_invite_url }}',
    brokerAppPath: 'factFindSession.coApplicant1PortalUrl',
    twentySource: 'Fact Find Session / client portal',
  },
  {
    brokerEngineToken: '{{ coapplicants.coapplicant_2.name }}',
    brokerAppPath: 'applicantProfiles[applicantIndex=2].displayName',
    twentySource: 'Applicant profile linked to Contact',
  },
  {
    brokerEngineToken: '{{ coapplicants.coapplicant_2.fv_invite_url }}',
    brokerAppPath: 'factFindSession.coApplicant2PortalUrl',
    twentySource: 'Fact Find Session / client portal',
  },
  {
    brokerEngineToken: '{{ coapplicants.coapplicant_3.name }}',
    brokerAppPath: 'applicantProfiles[applicantIndex=3].displayName',
    twentySource: 'Applicant profile linked to Contact',
  },
  {
    brokerEngineToken: '{{ coapplicants.coapplicant_3.fv_invite_url }}',
    brokerAppPath: 'factFindSession.coApplicant3PortalUrl',
    twentySource: 'Fact Find Session / client portal',
  },
  {
    brokerEngineToken: '{{ loan.name }}',
    brokerAppPath: 'opportunity.name',
    twentySource: 'Opportunity',
  },
  {
    brokerEngineToken: '{{ salutation }}',
    brokerAppPath: 'templateContext.salutation',
    twentySource: 'Communication renderer',
  },
  {
    brokerEngineToken: '{{ nicknames }}',
    brokerAppPath: 'templateContext.applicantNicknames',
    twentySource: 'Applicant profiles',
  },
] as const;
