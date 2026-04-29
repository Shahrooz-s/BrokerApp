# Twenty CRM First Docker Deployment

This repository now includes a Docker-first deployment layer for a self-hosted Twenty CRM instance. The first deployment uses the official Twenty Docker image with Postgres and Redis.

## Current Scope

This is a first deployment baseline, not the mortgage customisation build yet.

- Twenty runs as the CRM backend and internal broker workspace.
- Postgres stores CRM data.
- Redis supports background jobs.
- Local Docker volumes persist database and uploaded/local Twenty storage.
- The client portal, ApplyOnline/AFG Flex adapters, BrokerEngine/AFG adapters, and specialist-tool integrations will be added after the base CRM is running.

## Prerequisites

- Docker installed.
- Docker Compose installed.
- At least 2 GB RAM available for the stack.
- A domain and HTTPS reverse proxy before production use.

Official reference reviewed:

- https://docs.twenty.com/developers/self-host/capabilities/docker-compose
- https://docs.twenty.com/developers/self-hosting/setup

## First Local Run

1. Create the environment file:

```bash
cp .env.example .env
```

2. Generate a real application secret:

```bash
openssl rand -base64 32
```

3. Edit `.env`:

- Replace `APP_SECRET`.
- Replace `PG_DATABASE_PASSWORD`.
- Keep `SERVER_URL=http://localhost:3000` for local testing.

4. Start Twenty:

```bash
docker compose up -d
```

5. Check health:

```bash
docker compose ps
curl http://localhost:3000/healthz
```

6. Open:

```text
http://localhost:3000
```

## Server Deployment Notes

For a server deployment:

- Set `SERVER_URL` to the final public URL, for example `https://crm.example.com`.
- Put Twenty behind a reverse proxy with HTTPS termination.
- Forward external HTTPS traffic to the `server` container on port `3000`.
- Do not expose Postgres or Redis publicly.
- Keep `.env` out of Git.
- Configure backups before entering real client data.

## Backup Commands

Create a local database backup:

```bash
mkdir -p backups
docker exec brandroll-twenty-db pg_dump -U postgres default > backups/twenty_$(date +%Y%m%d_%H%M%S).sql
```

Restore a backup into the running database:

```bash
docker compose stop server worker
docker exec -i brandroll-twenty-db psql -U postgres default < backups/backup_file.sql
docker compose up -d
```

Adjust the database user/name if `.env` changes them.

## First Configuration In Twenty

After first login, configure:

- Workspace name and admin users.
- Users, roles, and permissions.
- Email/calendar settings if needed.
- API key or service account for future portal and integration work.
- Custom objects and fields from `twenty-crm-data-model.md`.
- Pipelines, views, and workflow stages from `twenty-crm-setup-plan.md`.

## Production Gates

Do not enter real borrower data until these are complete:

- Domain and HTTPS configured.
- Backups tested with a restore.
- User roles and permissions reviewed.
- Data retention and document storage policy approved.
- Privacy/security review completed.
- Integration secrets stored outside Git.
- ApplyOnline, AFG Flex, AFG/BrokerEngine, and specialist provider access confirmed where relevant.
