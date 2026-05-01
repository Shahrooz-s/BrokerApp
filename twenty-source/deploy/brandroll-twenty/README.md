# Brandroll Twenty CRM Docker Deployment

This folder contains the first Docker deployment baseline for the mortgage broking Twenty CRM setup.

It intentionally uses the official Twenty Docker image rather than modifying application source code for the first deployment. Mortgage-specific source changes, client portal work, and ApplyOnline/AFG/BrokerEngine integrations should be added after the base CRM is running and backed up.

## Scope

- Twenty server and worker.
- Postgres database.
- Redis job/cache service.
- Persistent Docker volumes.
- Environment placeholders for future ApplyOnline, AFG Flex, BrokerEngine, ID verification, open banking, and product research integrations.

## First Local Run

From this folder:

```bash
cp .env.example .env
openssl rand -base64 32
```

Edit `.env`:

- Set `APP_SECRET` to the generated value.
- Set `PG_DATABASE_PASSWORD` to a strong password without special characters.
- Keep `SERVER_URL=http://localhost:3000` for local testing.

Start the stack:

```bash
docker compose up -d
```

Check health:

```bash
docker compose ps
curl http://localhost:3000/healthz
```

Open:

```text
http://localhost:3000
```

## Server Deployment Notes

- Set `SERVER_URL` to the public CRM URL, for example `https://crm.example.com`.
- Place Twenty behind a reverse proxy with HTTPS termination.
- Do not expose Postgres or Redis publicly.
- Keep `.env` out of Git.
- Configure and test backups before entering real borrower data.

## Backup

Create a database backup:

```bash
mkdir -p backups
docker exec brandroll-twenty-db pg_dump -U postgres default > backups/twenty_$(date +%Y%m%d_%H%M%S).sql
```

Restore a backup:

```bash
docker compose stop server worker
docker exec -i brandroll-twenty-db psql -U postgres default < backups/backup_file.sql
docker compose up -d
```

Adjust the database user/name if `.env` changes them.

## First Twenty Configuration

After the first login:

- Configure workspace name and admin users.
- Configure users, roles, and permissions.
- Create an API key or service account for future portal and integration work.
- Deploy the mortgage app from `packages/twenty-apps/community/brandroll-mortgage`.
- Confirm mortgage objects, fields, and starter views appear in the workspace.
- Keep sensitive document binaries outside Twenty unless the storage design is approved.

## Mortgage App Deployment

From the repository root:

```bash
cd packages/twenty-apps/community/brandroll-mortgage
yarn install
yarn twenty build
yarn twenty deploy
```

The app adds the first LIXI-aligned mortgage data model. It does not create workflow automations yet; configure those manually in Twenty after installation.

## Production Gates

Do not enter real borrower data until:

- HTTPS is configured.
- Backups and restore are tested.
- Roles and permissions are reviewed.
- Data retention and document storage policy is approved.
- Security and privacy review is complete.
- Integration secrets are stored outside Git.
- ApplyOnline, AFG Flex, AFG/BrokerEngine, and specialist provider access is confirmed where relevant.
