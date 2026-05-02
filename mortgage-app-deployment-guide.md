# Mortgage App Deployment Guide

## Goal

Deploy the BrokerApp mortgage configuration into the running Twenty instance at:

```text
https://app.lendaloan.com.au
```

This app adds mortgage-specific custom objects, Opportunity fields, relationships, and starter views. v0.2 is deal-centric: the native Twenty Opportunity is the broker board/deal record, and mortgage tools are related to the Opportunity rather than being pushed into the main sidebar.

## What The App Adds

- Broker workflow fields directly on Opportunities.
- Mortgage applications.
- Applicant profiles linked to Contacts and Opportunities.
- Compliance acknowledgements.
- Fact find sessions.
- Loan requirements.
- Property securities.
- Serviceability assessments.
- Product search runs.
- Lender products imported from the AFG product matrix.
- Product shortlist options for comparison, policy fit, and recommendation reasons.
- Credit proposals.
- Document requests.
- Application conditions.
- Valuation orders.
- LMI assessments.
- Lender contacts imported from the AFG lender contacts workbook.
- Integration events.
- Starter views.

## Prerequisites

1. `brokerapp-v1` is running in Dockge.
2. `https://app.lendaloan.com.au/healthz` returns healthy JSON.
3. The first Twenty workspace/admin user has been created.
4. You can log into Twenty as an admin.
5. A Twenty API key with deploy/install permission has been created from the Twenty UI.

Twenty app development requires Node.js 24+ and Yarn 4. If the server does not have that toolchain installed, use the Docker-based deployment method below.

## Create The Twenty API Key

In Twenty:

1. Log in as the admin user.
2. Go to Settings.
3. Open Developers/API keys or the equivalent developer settings page.
4. Create an API key for deployment.
5. Copy the key once and keep it private.

The Twenty CLI will ask for this key when adding the remote.

## Recommended Server Deployment Method

Run this on the Dockge/Vultr server, not inside the Twenty container.

```bash
mkdir -p /opt/brokerapp
cd /opt/brokerapp

git clone --branch codex/review-ready-deployment https://github.com/Shahrooz-s/BrokerApp.git brokerapp-source
cd brokerapp-source
```

If the GitHub repository is private and the server does not have GitHub SSH access, clone with an approved deploy key or upload the repository by another secure method.

For an existing clone:

```bash
cd /opt/brokerapp/brokerapp-source
git pull
```

Then run the app deployment from a Node 24 container:

```bash
docker run --rm -it \
  -v "$PWD":/repo \
  -w /repo/twenty-source/packages/twenty-apps/community/brandroll-mortgage \
  node:24-bookworm bash
```

Inside the Node 24 container:

```bash
corepack enable
touch yarn.lock
yarn install
yarn twenty remote add --api-url https://app.lendaloan.com.au --as brokerapp-v1
yarn twenty deploy --remote brokerapp-v1
yarn twenty install --remote brokerapp-v1
```

The `touch yarn.lock` line makes Yarn treat the mortgage app directory as its own standalone package instead of trying to resolve it as part of the parent Twenty monorepo.

When prompted during `remote add`, paste the Twenty API key from the live workspace.

## Verify Install

After `install` succeeds:

1. Refresh Twenty in the browser.
2. Go to Settings > Apps / Applications.
3. Confirm `BrokerApp` is installed.
4. Open Opportunities and confirm the BrokerApp mortgage fields are available.
5. Create a dummy Contact, Opportunity, applicant profile, fact-find session, serviceability assessment, product search run, shortlist option, and credit proposal.
6. Confirm each related record can be linked back to the same Opportunity.

## If Install Fails

Common causes:

- The first workspace/admin user was not created yet.
- The API key does not have the right permission.
- `SERVER_URL` does not match the public app URL.
- The app URL is not reachable from the Node 24 deployment container.
- The same app version was already deployed; bump `version` in `package.json` before redeploying.
- The app installs objects/views but not workflow automations; this is expected.

## Expected Follow-Up Configuration

After the app installs, configure these manually in Twenty:

- Staff-facing labels/views using `Contacts`.
- Opportunity board stages matching the BrokerApp workflow stage field.
- List and board views for active deals, submitted deals, settlements, reviews, and lost opportunities.
- Fact-find portal workflow and document request templates.
- Compliance document generation for credit guide, privacy consent, BID disclosure, and credit proposal.
- Serviceability import/check steps from lender or aggregator calculators.
- Product matrix import jobs for the AFG product workbook.
- Product comparison and shortlist review process.
- ApplyOnline/AFG Flex lodgement jobs once API access is confirmed.
- Workflow automations and task templates.
- BrokerEngine-style bulk edit safeguards where Twenty supports them.

## References

- Twenty Apps Getting Started: https://docs.twenty.com/developers/extend/apps/getting-started
- Twenty Apps Publishing: https://docs.twenty.com/developers/extend/apps/publishing
- Twenty Apps CLI and Testing: https://docs.twenty.com/developers/extend/apps/cli-and-testing
