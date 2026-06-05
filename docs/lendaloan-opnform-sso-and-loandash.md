# Lend A Loan OpnForm SSO and LoanDash Deployment Notes

## Live Hosts

- Concord CRM / BrokerApp LoanDash: `https://app.lendaloan.com.au`
- OpnForm: `https://form.lendaloan.com.au`

## OpnForm 1.13.2 Docker Settings

- Use OpnForm images:
  - `jhumanj/opnform-api:1.13.2`
  - `jhumanj/opnform-client:1.13.2`
- Use the Lend A Loan form hostname in the Dockge stack environment:

```env
APP_URL=https://form.lendaloan.com.au
FRONT_URL=https://form.lendaloan.com.au
NUXT_PUBLIC_APP_URL=https://form.lendaloan.com.au
NUXT_PUBLIC_API_BASE=https://form.lendaloan.com.au/api
NUXT_PUBLIC_API_URL=https://form.lendaloan.com.au/api
NUXT_PUBLIC_ROOT_REDIRECT_URL=https://form.lendaloan.com.au/login
```

## Google OAuth / SSO Requirements

- Google OAuth must not be run inside the Concord iframe. Google and OIDC sign-in should open `https://form.lendaloan.com.au/login` as a top-level browser page.
- Set these backend environment variables on `forms-api`, `forms-worker`, and `forms-scheduler`:

```env
GOOGLE_CLIENT_ID=REPLACE_WITH_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=REPLACE_WITH_GOOGLE_CLIENT_SECRET
```

- For workspace SSO, create the OIDC connection inside OpnForm workspace settings first.
- Copy the redirect URI displayed by OpnForm into the Google Workspace/OIDC provider exactly.
- Only enable force-login after at least one admin can authenticate through OIDC:

```env
OIDC_FORCE_LOGIN=true
```

## Recreate Containers After Env Changes

Docker only reads changed environment variables when containers are recreated:

```bash
docker compose up -d --force-recreate forms-api forms-worker forms-scheduler forms-client ingress
```

Do not run `docker compose down -v` unless intentionally deleting all form data.

## Verification

```bash
curl -I https://form.lendaloan.com.au/login
curl -I https://form.lendaloan.com.au/api
curl -I https://app.lendaloan.com.au/login
```

- `https://form.lendaloan.com.au/login` should show OpnForm login and version `1.13.2`.
- `https://app.lendaloan.com.au` should show Concord login when signed out.
- After Concord deployment, authenticated users should see `BrokerApp > Loan Boards` and `BrokerApp > Loan Workspace`.
