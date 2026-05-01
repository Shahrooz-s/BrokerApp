# Dockge Deployment Guide

## Target

Deploy the first Brandroll/Twenty CRM development stack through Dockge using the personal GitHub repository:

```text
https://github.com/Shahrooz-s/BrokerApp
```

Recommended branch:

```text
codex/review-ready-deployment
```

Use the Dockge account/email:

```text
dockroll@brandroll.com.au
```

## Deployment Approach

For the first deployment, use the root `docker-compose.yml`. It runs the official Twenty Docker image with Postgres and Redis.

Do not deploy from `twenty-source/` yet. The imported source tree is for customisation and future Brandroll image builds after the first CRM instance is running.

## Pre-Deployment Requirements

- Dockge is installed and reachable.
- Docker is installed on the Dockge host.
- The Dockge host has enough memory for Twenty, Postgres, and Redis. Allocate at least 2 GB RAM; more is preferred.
- The stack directory is configured in Dockge, commonly `/opt/stacks`.
- Port `3000` is available or a reverse proxy is configured.
- A public domain and HTTPS are configured before real borrower data is entered.

For `app.lendaloan.com.au`, use Cloudflare Tunnel to route traffic to the Dockge host on `http://localhost:3000`. The root `lendaloan.com.au` and `www` records should remain pointed to the CyberPanel instance on Vultr.

## Option A: Deploy From Dockge UI

1. Log into Dockge as `dockroll@brandroll.com.au`.
2. Create a new stack.
3. Name the stack:

```text
brokerapp-v1
```

4. Paste the contents of the repository root `docker-compose.yml`.
5. Add environment variables from `.env.example`.
6. Replace these values before deploy:

```env
TAG=latest
SERVER_URL=http://localhost:3000
APP_SECRET=replace_me_with_a_random_string
PG_DATABASE_PASSWORD=replace_me_with_a_strong_password_without_special_characters
```

7. Generate `APP_SECRET` on the server:

```bash
openssl rand -base64 32
```

8. Use a strong Postgres password without shell-sensitive special characters for the first deployment.
9. Click Deploy.
10. Open the Twenty URL and create the first admin user.

For a real server domain, set:

```env
SERVER_URL=https://crm.yourdomain.com
```

## Option B: Deploy From Git On The Dockge Host

Use this if you prefer to keep the stack file under Git on the server.

```bash
cd /opt/stacks
git clone --branch codex/review-ready-deployment git@github.com:Shahrooz-s/BrokerApp.git brokerapp-v1
cd brokerapp-v1
cp .env.example .env
openssl rand -base64 32
```

Edit `.env`, then deploy the stack from Dockge or with:

```bash
docker compose up -d
```

If the GitHub repository is private, add a deploy key to `Shahrooz-s/BrokerApp` or authenticate the server with a GitHub SSH key that has access to the repo.

## First Stack Environment

Minimum development `.env`:

```env
TAG=latest
SERVER_URL=http://localhost:3000
APP_SECRET=replace_this_with_openssl_output
PG_DATABASE_USER=postgres
PG_DATABASE_PASSWORD=replace_this_with_a_strong_password
PG_DATABASE_HOST=db
PG_DATABASE_PORT=5432
PG_DATABASE_NAME=default
REDIS_URL=redis://redis:6379
STORAGE_TYPE=local
```

For staging/production, do not leave `TAG=latest`. Pin a tested Twenty release tag or use a tested Brandroll custom image.

## Health Checks

After deployment, check:

```bash
docker compose ps
curl http://localhost:3000/healthz
```

From Dockge, confirm:

- `brandroll-twenty-server` is healthy.
- `brandroll-twenty-worker` is running.
- `brandroll-twenty-db` is healthy.
- `brandroll-twenty-redis` is healthy.

## Backups

Create a database backup:

```bash
mkdir -p backups
docker exec brandroll-twenty-db pg_dump -U postgres default > backups/twenty_$(date +%Y%m%d_%H%M%S).sql
```

Restore:

```bash
docker compose stop server worker
docker exec -i brandroll-twenty-db psql -U postgres default < backups/backup_file.sql
docker compose up -d
```

Test restore before entering real borrower data.

## First CRM Configuration

After Twenty is running:

- Create the first admin user.
- Set workspace name.
- Add staff users.
- Configure roles and permissions.
- Configure email/calendar later, after callback URLs are final.
- Create an API key or service account for future portal/integration work.
- Configure custom objects, views, and boards from the setup documentation.

## Production Gates

Do not use production borrower data until:

- HTTPS and domain are configured.
- Backups and restore are tested.
- User roles and permissions are reviewed.
- Document storage policy is approved.
- Privacy/security review is complete.
- ApplyOnline, AFG Flex, AFG/BrokerEngine, and specialist-provider production access is approved where relevant.
- LIXI production licence/certification boundaries are confirmed.

## Notes For Dockge

Dockge manages Docker Compose stacks as real compose files in the configured stacks directory. Keep one stack per folder. Avoid manually placing unrelated files in the same Dockge stack directory unless they are required by the compose stack.

For this project, the root compose file is enough for the first deployment. The full Twenty source under `twenty-source/` should not be mounted into the production stack until the custom image path is designed and tested.
