# AML/CTF And KYC Architecture

## Purpose

BrokerApp must treat KYC as progressive customer due diligence, not a one-time document upload. This document translates the operating requirements into product architecture.

This is not legal advice. Before production use, qualified AML/CTF counsel and lender/aggregator compliance teams must review the workflow.

## Scorecards

BrokerApp keeps separate score categories:

- Identity confidence.
- AML/CTF risk.
- Fraud risk.
- CDD completion.
- Evidence strength.
- Lender submission readiness.

Every non-low-risk outcome must have reason codes.

## Core Objects

- `KYC/CDD Profile`: scorecard, customer type, readiness, hard stops, ECDD, lender rule set, beneficial ownership summary, and safe staff summary.
- `KYC Verification Event`: every check, provider, claims checked, result, confidence, reason codes, evidence pointer, user/reviewer, and consent record.
- `KYC Consent`: consent scope, provider, timestamp, expiry, revocation, and evidence pointer.
- `AML Escalation`: internal, lender, aggregator, or reporting-entity escalation. Must never be visible in the client portal.
- `Evidence Pack`: lender-ready summary with customer type, CDD procedure, verification outcomes, reason codes, document list, beneficial ownership, PEP/sanctions/adverse-media summary, and unresolved issues.

## Hard Stops

BrokerApp must block or escalate progression for:

- confirmed sanctions or targeted financial sanctions issue;
- known prohibited person/entity;
- forged or obviously altered identity document;
- reasonable suspicion the person is not who they claim to be;
- refusal to provide required CDD information;
- inability to establish required CDD matters on reasonable grounds;
- known or suspected false customer name or anonymity;
- lender-required ECDD not completed;
- broker-identified suspicious matter not escalated;
- material beneficial ownership not established;
- representative authority not established.

## Client Portal Rules

The portal must show:

- what information is being collected;
- why it is needed;
- consent prompts;
- document requests;
- fact-find progress;
- safe next actions.

The portal must never show:

- AML suspicion;
- internal risk scores;
- broker-only notes;
- suspicious matter escalation status;
- compliance investigation details.

## Staff Rules

Broker and compliance views must show:

- CDD checklist status;
- identity confidence and AML/CTF risk separately;
- reason codes;
- missing evidence;
- lender-specific next steps;
- escalation pathway;
- hard stops;
- audit trail.

## Provider Rules

Provider integrations must minimise data sharing and store verification claims where possible:

- name matched;
- DOB matched;
- address matched;
- document valid;
- liveness matched;
- PEP possible match;
- sanctions possible match;
- account holder matched;
- provider reference ID.

Raw provider responses must not be overwritten. Manual corrections must create correction records.

## MVP Scope

The first AML/KYC MVP should include:

- individual, sole trader, company, and trust CDD profiles;
- consent records;
- provider adapter abstraction;
- verification events;
- reason codes;
- hard stops;
- ECDD flags;
- AML escalation records;
- evidence pack generation records;
- audit trail expectations.

Advanced telco/SIM-swap risk, reusable identity wallet, government-body CDD, adverse media automation, and regulator/reporting integrations can be designed later.
