# AFG ZAP Confluence Access Plan

## Target

AFG ZAP documentation space:

https://afgonline.atlassian.net/wiki/spaces/ZAP/overview

This appears to be an AFG Atlassian Confluence space. It is not publicly accessible from the current environment, so the project needs approved AFG/Atlassian access before the documentation can be reviewed or used for implementation.

## Access Required

Request one of the following:

- Named user access for the implementation lead's Atlassian account.
- A read-only Confluence guest/user account for the project.
- A service account with read-only access to the `ZAP` Confluence space.
- Exported documentation pack from AFG if live Confluence access is not available.

Minimum permissions:

- View pages in the `ZAP` Confluence space.
- View attachments.
- Search within the space.
- Download or export pages/attachments where allowed.

Do not request edit/admin access unless AFG requires it for collaboration.

## API Token Option

If AFG allows API-based documentation retrieval, use an Atlassian API token tied to an approved Atlassian account.

Required details:

- Atlassian account email.
- API token generated from the Atlassian account security settings.
- Confirmation that the account has access to `afgonline.atlassian.net`.
- Confirmation that the account can view the `ZAP` space.
- Approved token expiry date.

Security rules:

- Do not commit the token to Git.
- Store the token only in a secret manager or approved local environment variable.
- Use read-only access.
- Revoke the token after documentation extraction if no longer needed.

Suggested environment variables:

- `AFG_ATLASSIAN_BASE_URL=https://afgonline.atlassian.net`
- `AFG_ATLASSIAN_EMAIL`
- `AFG_ATLASSIAN_API_TOKEN`
- `AFG_ATLASSIAN_SPACE_KEY=ZAP`

## What To Extract Once Access Is Granted

Priority documentation to review:

- ZAP overview and API architecture.
- Authentication and token handling.
- Sandbox/test environment access.
- Endpoint list.
- Request/response schemas.
- Webhook or back-channel status events.
- Deal/application creation workflow.
- Validation endpoints.
- Lodgement/submission endpoints.
- Error codes and retry guidance.
- Rate limits.
- Pagination/filtering.
- Attachment/document handling.
- Status lifecycle.
- External ID rules.
- Certification or partner approval requirements.
- ApplyOnline or AFG Flex relationship.
- LIXI message version requirements, if documented.

## How It Fits This Project

Use the ZAP documentation to refine:

- `afg-brokerengine-integration-plan.md`
- `lixi-to-twenty-mapping.md`
- `twenty-crm-setup-plan.md`
- `implementation-backlog.md`
- Future ApplyOnline/AFG Flex feasibility work.

Expected decisions after review:

- Whether ZAP is the correct API route for AFG/Flex integration.
- Whether ZAP can create draft applications, validate data, lodge applications, and retrieve status.
- Whether ZAP provides webhooks or requires polling.
- Whether ZAP uses LIXI payloads directly or a platform-specific JSON model.
- Whether ZAP can support the preferred ApplyOnline-first future state or only an AFG/Flex-mediated path.

## Access Request Message

Suggested message to AFG:

> We are preparing a self-hosted Twenty CRM and client portal integration for Australian mortgage broking workflows. Please provide read-only access to the AFG ZAP Confluence documentation space at `https://afgonline.atlassian.net/wiki/spaces/ZAP/overview`, including API authentication, sandbox, endpoint, request/response schema, webhook/back-channel, rate-limit, error-code, document handling, and lodgement/status lifecycle documentation. If Confluence access is not available, please provide an export of the ZAP API documentation and any current integration onboarding checklist.

## Blocker

Implementation cannot proceed beyond high-level planning for ZAP until access is granted or documentation is supplied. Any ZAP-specific API details must be confirmed from AFG documentation rather than inferred from public material.
