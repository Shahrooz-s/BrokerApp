# Mortgage App Deployment Guide

## Goal

Deploy the BrokerApp mortgage configuration into the running Twenty instance at:

```text
https://app.lendaloan.com.au
```

This app adds mortgage-specific custom objects, fields, relationships, starter views, and navigation entries. It does not configure every operational board, workflow automation, or BrokerEngine-style bulk edit rule. Those still need manual/product configuration after the app install.

## What The App Adds

- Mortgage applications.
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
- Starter views and sidebar navigation entries.

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

git clone --branch codex/review-ready-deployment git@github.com:Shahrooz-s/BrokerApp.git brokerapp-source
cd brokerapp-source
```

If the GitHub repository is private and the server does not have GitHub SSH access, clone with an approved deploy key or upload the repository by another secure method.

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
yarn install
yarn twenty remote add --api-url https://app.lendaloan.com.au --as brokerapp-v1
yarn twenty deploy --remote brokerapp-v1
yarn twenty install --remote brokerapp-v1
```

When prompted during `remote add`, paste the Twenty API key from the live workspace.

## Verify Install

After `install` succeeds:

1. Refresh Twenty in the browser.
2. Go to Settings > Apps / Applications.
3. Confirm `BrokerApp` is installed.
4. Check the sidebar for mortgage entries.
5. Confirm the new objects/views are present.
6. Create a dummy contact and dummy mortgage application to verify record creation.

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
- Lead board.
- Fact find board.
- Document collection board.
- Credit proposal board.
- Lodgement board.
- Conditions board.
- Settlement board.
- Post-settlement review board.
- Workflow automations and task templates.
- BrokerEngine-style bulk edit safeguards where Twenty supports them.

## References

- Twenty Apps Getting Started: https://docs.twenty.com/developers/extend/apps/getting-started
- Twenty Apps Publishing: https://docs.twenty.com/developers/extend/apps/publishing
- Twenty Apps CLI and Testing: https://docs.twenty.com/developers/extend/apps/cli-and-testing
