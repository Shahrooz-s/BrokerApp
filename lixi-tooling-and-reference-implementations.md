# LIXI Tooling and Reference Implementations

## Purpose

This note captures useful LIXI and competitor/reference resources for the Twenty CRM, client portal, and future lodgement architecture. Official LIXI material should remain the primary source for standards. Competitor and third-party examples should be used only as implementation patterns, not as proof that the same integration rights or APIs are available to this project.

## Useful Official LIXI Resources

### Release History

The LIXI release history is important because CAL, DAS, SVC, LMI, VAL, ACC, CDA, AFD, TSA, and the Master Schema evolve regularly. Before mapping or validation work starts, the team must lock the exact schema versions available under the development licence.

Planning impact:

- Add schema version tracking to the integration backlog.
- Avoid hard-coding a version in Twenty field names.
- Record which CAL/EGB/DAS/SVC/LMI/VAL versions were used for each prototype.
- Retest mapping after any LIXI version upgrade.

Reference: https://lixi.org.au/lixi-standards/downloads/history/

### LIXI Validator and Business Rules

LIXI validation should be part of future ApplyOnline/AFG Flex injection work, but only inside the licence boundary. Where licensed materials are available, validate XML/JSON messages against the correct schema and business rules before any lodgement prototype.

Planning impact:

- Validate messages before lodgement prototypes.
- Store validation results and errors in the Integration Error Log.
- Keep validation, lodgement, and back-channel status processing as separate integration concerns.
- Do not commit restricted schemas, samples, or generated restricted outputs unless the licence permits it.

### LIXI Python Package

The official `lixi` Python package is useful for internal development because it can read, validate, convert, and transform LIXI2 XML/JSON messages when used with licensed schemas.

Planning impact:

- Consider a validation service or CI job using the package once licensed schemas are available.
- Use it for XML/JSON conversion tests where ApplyOnline/AFG Flex requirements differ from internal JSON APIs.
- Use path analysis to help compare real development payloads with the Twenty field model.
- Treat the package as tooling, not as a substitute for licence approval or vendor certification.

References:

- https://pypi.org/project/lixi/
- https://lixi.org.au/the-python-lixi-package/

## JSON and XML Strategy

Modern web components in the portal and integration layer should use JSON internally because it maps naturally to APIs and application code. LIXI and enterprise lending integrations may still require XML, JSON Schema, XSD validation, or business-rule validation depending on the transaction and vendor.

Recommended strategy:

- Use JSON for portal-to-backend and backend-to-Twenty APIs.
- Keep an internal canonical application model aligned to Twenty and LIXI concepts.
- Convert to the required external format at the integration boundary.
- Validate external messages before submission.
- Keep raw provider/lodgement payloads out of client-facing views.

## Reference Implementations and Competitor Signals

### Loan Market MyCRM API Sample

Loan Market's public MyCRM API sample is useful because it shows practical mortgage CRM API concerns: OAuth-style credentials, scoped access, JSON:API patterns, pagination, filtering, field selection, webhooks, and rate limiting.

Planning impact for Twenty:

- Design integrations with scoped credentials.
- Expect rate limiting and pagination.
- Preserve external IDs.
- Build webhook receivers and retry handling.
- Use field selection/filtering where available to reduce data exposure.
- Keep organisation/adviser ownership rules explicit.

Reference: https://github.com/loanmarket/mycrm-api-sample

### Loan Market Lodgement Sample

The Loan Market lodgement sample referenced in research is useful as a pattern for validating, lodging, and receiving back-channel updates using LIXI-based payloads, secure endpoints, and modern authentication. It should be treated as an example of industry architecture, not as a reusable implementation for this project.

Planning impact:

- Separate validation, lodgement, and back-channel endpoints.
- Use TLS and modern authentication.
- Treat back-channel updates as append-only status events.
- Build a replay-safe webhook/event processor.
- Keep the ApplyOnline/AFG Flex adapter separate from the core Twenty data model.

### Salestrekker 2.0 Notes

Salestrekker public Q&A material is useful because it reinforces that mortgage CRMs map property, living expenses, open banking, and back-channel status flows into aggregator/lodgement platforms using LIXI2 concepts.

Planning impact:

- Model property and living expenses structurally in Twenty.
- Treat open banking as a first-class provider flow.
- Expect aggregator/lodgement backchannels to be operationally important.
- Keep client dashboard status wording separate from raw back-channel status codes.

### Green Mortgage Lawyers LIXI2 DAS Integration

The Green Mortgage Lawyers LIXI2 settlement/document-preparation guide is useful because it shows DAS-style integration value: structured borrower/product/security data, validation, reduced rekeying, document preparation, settlement workflows, and back-channel status updates.

Planning impact:

- Keep DAS concepts in the data model even if not used in phase one.
- Track document preparation and settlement statuses in Twenty.
- Store external document/settlement references.
- Avoid manually rekeying borrower, loan, and security data into settlement/legal systems where an approved integration is available later.

## Resources Not Immediately Relevant

ERNIE 2.0 is an NLP pre-training framework and is not directly relevant to LIXI standards, Twenty configuration, ApplyOnline/AFG Flex injection, or mortgage CRM data modelling. It may become relevant only if the project later adds AI/NLP features such as document extraction, conversation summarisation, or policy/rationale drafting.
