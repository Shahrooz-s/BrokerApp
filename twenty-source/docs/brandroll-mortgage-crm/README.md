# Brandroll Mortgage CRM Setup Notes

This directory is reserved for the Australian mortgage broking setup built on top of Twenty CRM.

## Current Architecture Position

- Twenty is the internal CRM and loan origination management backend.
- The client portal will provide chat-style intake, borrower dashboard, document requests, status updates, consent capture, and specialist-tool handoffs.
- ApplyOnline is the preferred future lodgement target.
- AFG Flex is the alternate lodgement path if ApplyOnline direct injection is unavailable or not approved.
- AFG and BrokerEngine remain operational integration sources while direct API access is confirmed.
- Zapier is not the preferred target architecture, but available BrokerEngine ZAP documentation can inform field mapping, event concepts, reconciliation, and temporary workaround design.
- LIXI is the reference data/message model under the limits of the current development licence.

## First Deployment

Use the Docker baseline in:

```text
deploy/brandroll-twenty/
```

The first deployment should bring up a clean Twenty instance. The mortgage-specific custom objects and starter views are defined as a Twenty app in:

```text
packages/twenty-apps/community/brandroll-mortgage/
```

## Immediate Next Build Steps

1. Deploy the Docker baseline.
2. Configure workspace, users, roles, and API access.
3. Deploy the Brandroll Mortgage app to add mortgage custom objects, fields, and starter views.
4. Configure pipelines, task templates, and workflow automations.
5. Build the portal-to-Twenty API adapter.
6. Add external-provider reference records for ID verification, open banking, product research, serviceability, valuation, and LMI.
7. Confirm ApplyOnline, AFG Flex, AFG/BrokerEngine API access and accepted LIXI versions before any lodgement prototype.

## Licence Boundary

Do not commit restricted LIXI schemas, samples, generated schema documentation, client data, API secrets, or lender-specific licensed guidebook material to this repository.
