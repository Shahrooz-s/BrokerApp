# Repository Review and Readiness

## Review Scope

This review covers the Brandroll CRM repository after importing the Twenty source tree and adding the mortgage broking setup pack.

Current local review branch:

```text
codex/review-ready-deployment
```

Source upload branch already pushed to the personal fork:

```text
Shahrooz-s/BrokerApp:codex/publish-local-brokerapp-pack
```

Primary target repository remains:

```text
Brandroll/brandroll-crm
```

Direct push to `Brandroll/brandroll-crm` still depends on GitHub repository or organization write access for the authenticated `Shahrooz-s` account.

## Current Repository Shape

- Root repository contains the Brandroll-specific documentation, deployment baseline, LIXI-aware setup pack, BrokerEngine-style board/fact-find notes, and implementation backlog.
- Full Twenty source is imported under `twenty-source/`.
- Root `docker-compose.yml` is the first deployment path and currently runs the official `twentycrm/twenty:${TAG:-latest}` image.
- Source-side Brandroll deployment overlay exists at `twenty-source/deploy/brandroll-twenty/`.
- Mortgage-specific Twenty app source exists at `twenty-source/packages/twenty-apps/community/brandroll-mortgage/`.

## Deployment Readiness

Ready for first development deployment:

- Docker Compose baseline is present.
- `.env.example` is present and keeps real secrets out of Git.
- Postgres, Redis, server, worker, local storage volume, and healthchecks are defined.
- Documentation explains first local run, server deployment notes, backup/restore, and production gates.

Not ready for production borrower data:

- `TAG` still defaults to `latest`; staging/production should pin a tested Twenty image tag or a tested Brandroll-built image.
- Domain, HTTPS, reverse proxy, backups, restore testing, roles, permissions, retention policy, and privacy/security review are still required.
- ApplyOnline, AFG Flex, AFG, BrokerEngine, ID verification, open banking, product research, serviceability, valuation, LMI, and other provider credentials/API access are not yet present.
- LIXI use remains development-licence constrained; restricted schemas, samples, guidebooks, and generated schema extracts must remain out of Git unless licence terms explicitly allow it.

## Source Build Readiness

The source import is present, but first deployment should still use the root Docker Compose official image until the custom source-build path is proven.

Before switching to a Brandroll source-built Twenty image:

- Lock the upstream Twenty commit/tag being customised.
- Install the required Node/Yarn toolchain for Twenty source development.
- Build and test the Brandroll mortgage app in a development workspace.
- Confirm the Twenty app deployment process for the currently imported SDK and CLI version.
- Build a custom Docker image from `twenty-source/`.
- Push the approved image to a registry.
- Update deployment configuration to reference the approved Brandroll image tag.
- Run migration, rollback, backup, and restore tests in staging.

## Broker CRM Readiness

The documentation pack now captures the desired operating model:

- Staff-facing language should use `Contacts`.
- Multiple boards/work queues are required, similar to BrokerEngine.
- Fact find should be structured and section-based.
- Kanban stages should default to expanded only when they contain cards/opportunities, with empty stages collapsed where the platform supports it.
- Bulk edit needs explicit field selection, confirmation, audit logging, permission checks, and a separate safeguard before clearing values.
- Twenty is intended to support loan origination management, credit proposal work, task management, workflow tracking, and reporting.
- The client portal should provide chat-style intake, dashboard status, fact find, document requests, consent, and specialist-provider handoffs.

## Known Gaps

- Brandroll GitHub write access for `Shahrooz-s` still needs to be confirmed before direct push to `Brandroll/brandroll-crm`.
- Local Docker is not available in the current shell, so `docker compose config` and runtime smoke tests were not executed here.
- The Twenty source tree is large; GitHub connector/file APIs are not suitable for uploading it. Use normal `git push`.
- The mortgage app source has not been dependency-installed or compiled in this review pass because local Node is older than the imported Twenty source requirement and dependencies are not installed.
- BrokerEngine, AFG, ApplyOnline, AFG Flex, and provider API documentation/credentials are still external dependencies.

## Recommended Next Branch Strategy

Keep the already pushed branch as the baseline upload:

```text
codex/publish-local-brokerapp-pack
```

Use this branch for review hardening:

```text
codex/review-ready-deployment
```

After Brandroll write access is fixed, push `codex/review-ready-deployment` and open a new PR, or merge it into the existing PR branch if you want one combined pull request.
