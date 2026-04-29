# LIXI Standards Overview for Mortgage CRM Setup

## Positioning

LIXI standards should be used as the reference language for mortgage application data and related lending events. For this project, LIXI informs the CRM data model and integration readiness, but AFG and/or BrokerEngine remain the practical operational systems for broker-platform workflows unless direct lender integration is later approved.

Because only a LIXI development licence is available, this pack avoids copying restricted schema definitions, sample payloads, or member-only documentation. Detailed schema mapping must be performed inside the licensed development environment.

## Most Relevant Standards

### CAL: Credit Applications for Australia

CAL is the primary reference standard for Australian mortgage applications. Public LIXI material describes CAL as supporting credit and associated deposit product applications from CRM or point-of-sale systems through mortgage/finance aggregators and lender lodgement gateways.

For Twenty, CAL should guide:

- Applicant and co-applicant data structure.
- Residential mortgage application data.
- Product and loan requirement data.
- Income, expense, asset, liability, and employment data.
- Needs analysis and interview data.
- Supporting document submission metadata.
- Application status, events, loan conditions, and error backchannels.

Twenty should not attempt production CAL submission unless the business confirms production LIXI licensing, aggregator permissions, testing requirements, and certification obligations.

### EGB: Electronic Guidebooks

EGB describes lender-specific business requirements for gathering and transmitting a complete credit application. Public LIXI material says EGB covers required data, mapping back to LIXI transaction standards, form layout and labels, and submission/product validation rules.

For Twenty, EGB should guide:

- Required fields by lender/product.
- Form sections and field order.
- Lender-specific labels and help text.
- Conditional questions and validation.
- Packaging checklists before submission.

EGB is the right conceptual source for lender-specific rules, but actual lender rules must be taken from licensed EGB materials, aggregator guidance, BrokerEngine configuration, or lender/aggregator documentation.

### SVC: Serviceability

SVC supports serviceability calculation requests/responses, reports, and calculation details. For Twenty, this should be represented as serviceability assessment records linked to applications, applicants, liabilities, income, and selected lender/product options.

Twenty should store:

- Serviceability status.
- Calculator/provider used.
- Requested amount and scenario.
- Summary outcome.
- Link/reference to the calculation report.
- Timestamp, owner, and evidence status.

Avoid storing full restricted calculation payloads unless storage and licensing are confirmed.

### VAL: Valuations

VAL supports valuation requests and results. Twenty should track valuation lifecycle without becoming the valuation platform:

- Security/property reference.
- Valuation provider/order reference.
- Access/contact requirements.
- Ordered, booked, inspected, received, queried, expired statuses.
- Estimated value, accepted value, and shortfall flags where permitted.
- Link/reference to the external valuation report.

### LMI: Lenders Mortgage Insurance

LMI supports quote and approval messaging between lenders and mortgage insurers. Twenty should track whether LMI is required, quoted, approved, declined, conditioned, or waived.

Recommended CRM data:

- LVR and LMI required flag.
- Insurer/lender reference.
- Quote status and premium summary.
- Approval status.
- Conditions and expiry date.

### DAS: Document Preparation and Settlements

DAS supports document preparation requests and settlement instructions. In Twenty, DAS maps to settlement/document pack readiness:

- Loan documents requested/issued/returned.
- Signing method and return method.
- Settlement agent or conveyancer details.
- Settlement date/time.
- Conditions precedent.
- Document pack reference.

### CDA: Credit Decisioning

CDA supports interfacing origination systems with decision systems for scoring, ID checks, fraud checks, policy checks, security register checks, creditworthiness, and decisioning.

Twenty should track outcomes and references, not replace credit engines:

- Decision status.
- Decision provider.
- Policy exceptions.
- Risk flags.
- Evidence/document references.
- Manual review owner.

### AFD: Application Fraud Detection

AFD supports messaging between credit origination and fraud detection systems. Twenty should represent fraud checks as controlled status records:

- Check required flag.
- Provider/reference.
- Requested/complete status.
- Pass/refer/fail summary.
- Escalation owner.

### TSA: Title and Property Search

TSA supports title search and property risk assessment messaging. Twenty should track:

- Property/security reference.
- Title search ordered/received status.
- Title reference details.
- Risk flags.
- Report reference.

### Status, Events, and Backchannels

LIXI public material notes that status updates, events, error backchannels, and loan conditions are built into LIXI2 transaction standards. For Twenty, this is critical because status sync is likely the highest-value integration with AFG/BrokerEngine.

Twenty should normalize external status events into:

- Application stage.
- Status event history.
- Conditions outstanding.
- SLA/ageing indicators.
- Responsible owner.
- Next task.

## Current Public Version Awareness

The LIXI downloads page lists recent public release identifiers for CAL, DAS, SVC, LMI, VAL, ACC, AFD, ALA, PSA, TSA, and related standards. Implementation must confirm the exact versions available under the development licence and use those versions consistently across mapping, validation, and tests.

The release history should be treated as an implementation control. Each prototype should record the Master Schema and transaction schema versions used, especially where CAL, EGB, DAS, SVC, LMI, VAL, ACC, CDA, AFD, or TSA concepts are mapped into Twenty.

Reference: https://lixi.org.au/lixi-standards/downloads/history/

## Tooling Awareness

LIXI provides tooling and an official Python package that can work with LIXI2 XML/JSON messages, schema validation, business-rule validation, conversion, version transformation, LIXI path analysis, and schema documentation generation when licensed schemas are available.

For this project, that tooling should be used in development for validation and mapping checks. It should not be used to bypass licence restrictions, publish restricted schema information, or imply production lodgement readiness.

## Licence Boundary

Allowed planning posture:

- Summarize public LIXI material.
- Use LIXI as the conceptual reference model.
- Use licensed development materials internally for mapping and testing.
- Record mapping at a conceptual/field-group level in this repository.

Not assumed:

- Production LIXI message generation.
- Direct lender lodgement.
- Redistribution of LIXI schemas, samples, or detailed schema documentation.
- Certification readiness.
- Lender-specific EGB completeness.
