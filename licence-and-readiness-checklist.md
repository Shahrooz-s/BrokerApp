# Licence and Readiness Checklist

## LIXI Development Licence

Confirm with LIXI or internal licence records:

- Which standards are included in the development licence.
- Whether CAL, EGB, SVC, VAL, LMI, DAS, CDA, AFD, and TSA materials are accessible.
- Which exact public/downloaded/development versions are available and approved for use, starting from the public snapshot reviewed on 29 April 2026: CAL 2.6.91, CDA 2.0.86, DAS 2.2.90, EGB 2.0.0, SVC 2.0.75, LMI 2.0.25, VAL 2.0.25, ACC 2.0.56, AFD 2.0.30, TSA 2.0.2, PSA 2.0.3, and ALA 2.0.8.
- Whether schema documentation, CSV representations, XML/JSON schemas, and samples can be used internally.
- Whether generated code from LIXI tooling can be stored in the project.
- Whether internal mapping documents can include schema paths or enumerations.
- Whether test payloads can be committed to source control.
- Whether production use requires a different licence.
- Whether direct lender/aggregator submission requires certification or conformance testing.

## Permitted During Development

Assuming typical development-only restrictions, proceed with:

- Public standard summaries.
- Conceptual CRM mapping.
- Internal testing using licensed materials.
- Schema-informed data model design.
- Non-production payload validation.
- Integration prototypes in sandbox environments.

Do not proceed without confirmation:

- Production LIXI payload generation.
- Direct lender lodgement.
- Redistribution of schemas or samples.
- Publishing detailed LIXI schema extracts.
- Committing restricted sample payloads.
- Using draft schemas outside testing.

## Portal and Specialist Tool Readiness

Required before client portal implementation:

- Portal framework and hosting selected.
- Client authentication and MFA approach confirmed.
- Chat model selected: human-only, rule-guided, AI-assisted, or hybrid.
- Consent capture approach confirmed.
- Document storage provider selected or explicitly deferred.
- ID verification provider selected.
- Open banking provider selected.
- Product research/serviceability provider selected.
- Client-facing status wording approved.
- Privacy review for client dashboard data exposure completed.

For each specialist provider, confirm:

- API documentation.
- Sandbox credentials.
- Production credential process.
- Authentication and token refresh details.
- Webhook/event support.
- Consent and data retention terms.
- Result storage policy.
- Manual fallback process.

## AFG/BrokerEngine/ApplyOnline/AFG Flex Readiness

Required before integration implementation:

- API documentation.
- Sandbox credentials.
- Required/accepted LIXI standard versions for any ApplyOnline, AFG Flex, AFG/BrokerEngine, lender, insurer, valuation, or title-search workflow.
- Production credential process.
- Authentication and token refresh details.
- Rate limits.
- Webhook/event support.
- Object model.
- External ID strategy.
- Status list and lifecycle model.
- Deal/application creation rules.
- Notes/tasks sync behavior.
- Document metadata and secure link behavior.
- Error response model.
- Support contact/escalation process.
- ApplyOnline direct injection availability and partner approval path.
- ApplyOnline draft creation, validation, submission, and status retrieval capabilities.
- AFG Flex integration availability and approval path.
- AFG Flex draft creation, validation, lodgement, and status retrieval capabilities.

## Twenty Self-Hosting Readiness

Required before CRM configuration:

- Hosting environment selected.
- Domain and TLS plan.
- Database backup plan.
- Email/calendar integration decision.
- User roles and permission model.
- API key management process.
- Logging and monitoring.
- Data retention and deletion policy.
- Privacy and sensitive-data storage policy.
- Admin owner for object/field changes.

## Data Governance

Decisions required:

- Which identity fields can be stored in Twenty.
- Whether date of birth can be stored in Twenty.
- Whether income, expense, asset, and liability details can be stored in Twenty.
- Whether document files can ever be stored in Twenty.
- Which fields are role-restricted.
- How client consent is captured and evidenced.
- How audit logs are retained.
- How external status events are reconciled.

## Production Launch Gates

Do not launch production workflows until these are complete:

- LIXI licence status confirmed for the intended use.
- AFG/BrokerEngine production API access confirmed.
- Security review completed.
- Privacy review completed.
- Client portal authentication and authorization tested.
- Specialist provider consent and callback flows tested.
- Backup and restore tested.
- User roles configured.
- Field ownership matrix approved.
- Integration retry/reconciliation tested.
- External status mappings tested.
- ApplyOnline or AFG Flex integration path approved before direct injection.
- UAT completed with broker, processor, and admin users.
- UAT completed with client portal users.
- Document storage approach approved.
- Incident and support process documented.

## Open Questions

- Which AFG API/product is being used, and is it Australian Finance Group aggregator infrastructure or another AFG-branded API?
- Is BrokerEngine the primary workflow system today, or will Twenty replace parts of BrokerEngine over time?
- Should new deals originate in the client portal, Twenty, BrokerEngine, AFG, ApplyOnline, or AFG Flex?
- Which system should send client-facing emails and SMS messages?
- Which system should manage client portal document collection?
- Which ID verification provider will be used?
- Which open banking provider will be used?
- Which product research and serviceability tools will be used?
- Is ApplyOnline direct injection commercially and technically available to the business?
- Is AFG Flex integration available as an approved fallback path?
- Are there lender panel/product feeds available through AFG or BrokerEngine?
- Are existing deals and contacts being migrated into Twenty?
- What historical data must be imported?
- What reporting is required for management, compliance, and broker performance?
