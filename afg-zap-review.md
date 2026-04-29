# AFG ZAP / BrokerEngine Zapier Documentation Review

## Source Reviewed

Reviewed public Confluence content from:

https://afgonline.atlassian.net/wiki/spaces/ZAP/overview

The space is titled `BE - Zapier Integration Documentation`. The overview page is a Confluence landing page with child pages for introduction, quick guide, triggers, actions, troubleshooting, references, API key setup, and available fields.

## Key Finding

This documentation is for BrokerEngine's Zapier integration, not a direct ApplyOnline, AFG Flex, or lender lodgement API.

The project preference is not to use Zapier. This documentation is useful only as background on BrokerEngine event/action concepts and available field names. It should not drive the main integration design.

## Relevant Pages

- `Introduction`: explains Zapier concepts and BrokerEngine workflow examples.
- `Quick Guide`: lists setup requirements.
- `Quick Guide (User)`: walks through creating a Zap using BrokerEngine as a trigger and Google Sheets as an action.
- `API Key`: explains BrokerEngine API key generation for Zapier.
- `Zapier Web Applications`: points users to Zapier and BrokerEngine's Zapier developer app/invitation.
- `Triggers`: lists BrokerEngine triggers exposed to brokers and internal-only lookup triggers.
- `Actions`: lists BrokerEngine actions.
- `Fields Available`: lists sample fields available from trigger output.
- `Troubleshooting`: indexes data/date/new-card issues.
- `References`: links to Zapier Platform docs and BrokerEngine Zapier knowledge base.

## Setup Requirements Identified

The Quick Guide lists three requirements:

- Access to BrokerEngine's Zapier integration.
- A server/environment to connect to Zapier: development, staging, production, or local.
- A known Zapier integration version.

The Zapier Web Applications page indicates users need:

- A Zapier account.
- Acceptance of BrokerEngine's Zapier Integration public invitation.
- Access to Zapier's normal app dashboard.
- Developer access only if managing BrokerEngine's Zapier app versions, triggers, actions, or environment variable `DOMAIN`.

## Authentication Model

The Zapier integration uses a BrokerEngine API key.

The API Key page says the key is generated from:

`BrokerEngine > Profile > Integration > Zapier Integration`

Important operational note:

- Generating a new API key invalidates existing BrokerEngine Zapier connections.
- Existing Zaps must be reconnected with the new API key.

Project implication:

- Treat BrokerEngine Zapier keys as production secrets.
- Do not store them in Git, Twenty notes, or client-visible records.
- Record key rotation as an operational runbook item.

## Broker-Visible Triggers

BrokerEngine exposes these triggers to brokers:

- New Deal Created.
- New Lead Created.
- New Card on Board.
- Card Date Changed.
- Stage Changed.
- New Contact Created.
- Contact Updated.
- Contact Tagged.
- Contact Untagged.

Project implication:

- These can support transitional sync into Twenty or notification/workflow automation.
- They are useful for event monitoring, task creation, spreadsheet/reporting bridges, and lightweight integrations.
- They are not enough by themselves for a robust ApplyOnline/AFG Flex lodgement adapter.

## Internal Lookup Triggers

The documentation lists internal-only lookup triggers used for dynamic dropdowns in Zapier actions:

- Fetch Board List.
- Fetch All Stages.
- Fetch Stage List.
- Fetch Broker List.
- Fetch Broker Team List.
- Fetch BrokerBrand List.
- Fetch Broker Lender List.
- Fetch Tags List.
- Fetch Referrers by email.
- Fetch Lead Source.
- Fetch Card Tag List.

Project implication:

- These lookup concepts map well to Twenty reference data.
- If a future direct API is available, we should ask whether equivalent lookup endpoints exist.

## Actions

The Actions page lists:

- New Card.
- Search Referrer.

Project implication:

- Zapier may be able to create cards and find referrers, but the documented action surface is narrow.
- This is not enough to support complete loan origination, credit proposal, document, condition, valuation, or lodgement workflows.

## Fields Available

The `Fields Available` page lists many trigger output fields across:

- Generic changed date fields.
- Loan/application identifiers.
- Lender.
- Board/stage.
- Settlement and due dates.
- Application URL and portal URL.
- Base loan amount.
- Loan purpose.
- Broker name, brand, group, email, and phone.
- Primary applicant name, contact, address, birthday, lead source, and custom text fields.
- Co-applicant name, contact, address, birthday, and custom text fields.
- Referrer details.
- Team role details.

Project implication:

- The current Twenty data model already covers these areas.
- We should add a BrokerEngine/Zapier field mapping task during integration design.
- Date/time values need normalization before writing to Twenty.
- Applicant/contact fields may include sensitive personal data, so privacy controls are required.

## Troubleshooting Signals

Troubleshooting pages include:

- Incorrect data issue.
- Incorrect date/date-time field values in spreadsheets.
- New Card action issues.

Project implication:

- Build date/time normalization and validation into any Zapier-to-Twenty bridge.
- Keep raw trigger payload samples in secure dev storage only.
- Add integration error logging for malformed dates, missing fields, and failed card creation.

## Fit For Our Architecture

Do not use BrokerEngine Zapier as a primary integration path.

Only consider it as an emergency/manual fallback for:

- Transitional event sync.
- Simple workflow notifications.
- Creating tasks or records from BrokerEngine events.
- Lightweight reporting bridges.
- Early proof-of-concept before direct API access.

Do not use it as the primary design for:

- ApplyOnline injection.
- AFG Flex direct integration.
- LIXI message generation.
- Full loan origination management.
- Credit proposal management.
- Secure document workflow.
- Serviceability, valuation, LMI, or open banking provider workflows.

## Updates To Existing Plan

- Keep Twenty as the internal origination system.
- Keep client portal as borrower-facing.
- Treat BrokerEngine Zapier as out of scope for the target architecture unless explicitly approved as a temporary fallback.
- Continue to request direct API documentation for ApplyOnline, AFG Flex, AFG/BrokerEngine APIs, and specialist tools.
- Keep Zapier key rotation, date normalization, and field mapping notes only for risk/fallback planning.
