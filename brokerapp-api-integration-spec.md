# BrokerApp API And Integration Specification

## Scope

This specification defines the BrokerApp pilot integration contracts. It intentionally stores provider credentials in environment variables or private workspace settings, not in GitHub.

## Core Records

- `Opportunity`: deal cockpit and board record.
- `Applicant Profile`: applicant role, applicant index, contact reference, and applicant-specific status.
- `Client Portal Session`: borrower-facing session for fact find, KYC, document requests, bank data, and safe next actions.
- `Client Portal Task`: borrower-facing task such as fact find, consent, KYC, document upload, open banking, bank statements, or acknowledgement.
- `Fact Find Session`, `Fact Find Section`, `Fact Find Field Answer`: autosave and review layer for portal/form data.
- `KYC/CDD Profile`: identity, AML/CTF, fraud, and CDD scorecard.
- `KYC Verification Event`: provider event with claims checked, result, confidence, reason codes, and consent reference.
- `KYC Consent`: consent scope, provider, timestamp, and revocation details.
- `AML Escalation`: internal/lender/aggregator escalation record. Never shown to clients.
- `Evidence Pack`: lender/auditor-ready evidence summary.
- `Product Import Run`: AFG matrix/API product import job state.
- `Integration Provider`: registry of provider category, auth method, required secret names, and implementation notes.

## Portal Endpoint Assumptions

The v1 portal should expose backend endpoints equivalent to:

- `POST /portal/sessions`: create or invite a borrower session.
- `GET /portal/sessions/:token`: load safe portal dashboard state.
- `POST /portal/sessions/:id/tasks/:taskId/start`: mark task in progress.
- `PATCH /portal/sessions/:id/fact-find/autosave`: autosave field answers.
- `POST /portal/sessions/:id/fact-find/submit`: submit fact find for broker review.
- `POST /portal/sessions/:id/consents`: record IDV, credit, open banking, bank statement, privacy, or disclosure consent.
- `POST /portal/sessions/:id/documents`: upload or link document evidence.
- `POST /portal/sessions/:id/open-banking/start`: launch consent-based open banking.
- `POST /portal/sessions/:id/messages`: send safe borrower message.

The pilot app does not expose these HTTP routes yet; the data model is ready for the route layer.

## Provider Adapter Contracts

Every provider adapter should write an `Integration Event` and, where applicable, a typed record.

### KYC/IDV Adapter

Required input:

- applicant reference;
- consent record;
- customer type;
- claims to verify;
- lender rule set.

Required output:

- provider reference ID;
- result;
- confidence;
- reason codes;
- verified claims;
- evidence pointer;
- manual review flag;
- hard-stop flag if applicable.

### Open Banking Adapter

Required input:

- applicant reference;
- consent scope;
- requested accounts or purposes;
- expiry;
- redirect/callback URL.

Required output:

- provider reference ID;
- consent timestamp;
- account holder match;
- income signal;
- liability signal;
- recurring repayment signal;
- unusual funds signal where available;
- evidence pointer.

### Product Import Adapter

Required input:

- source type: workbook, API, manual upload;
- source filename or provider reference;
- matrix version date;
- lender/product mapping profile.

Required output:

- rows read;
- products created;
- products updated;
- rows skipped;
- error summary;
- source snapshot reference;
- import status.

### Lodgement Adapter

Future lodgement adapters for ApplyOnline, AFG Flex, AFG, and BrokerEngine must not submit live deals until vendor approval, API access, production credential handling, and certification requirements are confirmed.

Required output:

- external application ID;
- lodgement channel;
- status mapping;
- lender reference;
- validation errors;
- submitted timestamp;
- webhook/status event references.

## Required External Credentials Later

- Email/domain sending provider.
- IDV/KYC provider.
- Open banking or bank statement provider.
- Product data provider or AFG product export process.
- ApplyOnline API credentials.
- AFG Flex/API credentials.
- BrokerEngine/AFG compatibility credentials if used.
- Optional Microsoft Entra details for staff SSO.

No Twilio/SMS OTP dependency is required for v1.
