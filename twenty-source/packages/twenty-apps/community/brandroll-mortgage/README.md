# BrokerApp App for Twenty

This Twenty app defines the first LIXI-aware mortgage broking data model for the BrokerApp CRM deployment.

It does not include restricted LIXI schemas, sample payloads, lender guidebooks, or production lodgement logic. It uses public LIXI concepts as a reference model and keeps ApplyOnline, AFG Flex, AFG/BrokerEngine, and specialist-provider integration references as configurable CRM records.

## What This App Adds

- Mortgage applications.
- Links from mortgage applications to native Twenty People and Opportunities.
- Applicant profiles.
- Loan requirements.
- Property securities.
- Credit proposals.
- Serviceability assessments.
- Document requests.
- Application conditions.
- Valuation orders.
- LMI assessments.
- Integration events.
- Saved views and sidebar entries for the main broker workflow.

## What Still Needs Configuration

Twenty's built-in People, Companies, Opportunities, Tasks, Notes, and timeline are available out of the box. This app links Mortgage applications to native People and Opportunities, then adds the mortgage-specific data model and starter views. Workflow automations still need to be configured after the workspace is running because this Twenty SDK version does not expose workflow definitions as app entities.

Recommended first manual workflow configuration:

- Lead received.
- Fact find started.
- Documents requested.
- BID/compliance in progress.
- Credit proposal drafting.
- Credit proposal review.
- Ready for lodgement.
- Submitted.
- Conditional approval.
- Formal approval.
- Settlement booked.
- Settled.
- Post-settlement review.

## Deployment

After the Docker stack is running and the first workspace/admin user exists, connect the Twenty CLI to the workspace and deploy this app:

```bash
cd packages/twenty-apps/community/brandroll-mortgage
yarn install
yarn twenty remote add --api-url https://app.lendaloan.com.au --as brokerapp-v1
yarn twenty deploy --remote brokerapp-v1
yarn twenty install --remote brokerapp-v1
```

Use `deploy` and `install` for the live Docker server. `dev` mode is intended for development-mode Twenty servers.

Use a development/staging workspace first. Do not deploy against production borrower data until roles, permissions, storage, backups, and privacy controls are approved.
