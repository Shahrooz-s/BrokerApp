# Private Template Import Format

## Purpose

BrokerApp can store template metadata in GitHub, but private template bodies and live BrokerEngine captures must be imported into the live workspace or encrypted private storage only.

This file defines the safe private import format. It does not contain copied template bodies.

## Storage Rules

- Keep files under `.brokerapp-private/`, `brokerengine-private/`, or encrypted storage.
- Do not commit private import files.
- Do not commit screenshots from live BrokerEngine pages.
- Do not commit sent email/SMS history.
- Do not commit customer data.

## Template Body Import JSON

```json
{
  "sourceSystem": "BROKERENGINE",
  "sourceTemplateId": "217865",
  "templateType": "EMAIL",
  "templateName": "Example template name",
  "workflowCategory": "DOCUMENTS",
  "sharedScope": "BROKER_GROUP",
  "fromRole": "BROKER",
  "toRecipientType": "ALL_APPLICANTS",
  "subject": "Subject with {{merge.variable}}",
  "bodyFormat": "HTML",
  "body": "<p>Private approved body goes here.</p>",
  "mergeVariables": [
    "{{applicant.firstName}}",
    "{{broker.fullName}}"
  ],
  "attachments": [
    {
      "name": "Credit Guide.pdf",
      "storageReference": "workspace-private-template-attachments/credit-guide.pdf"
    }
  ],
  "createdAtSource": "2026-05-01T00:00:00+10:00",
  "updatedAtSource": "2026-05-01T00:00:00+10:00",
  "approval": {
    "approvedForWorkspaceImport": true,
    "approvedBy": "workspace-admin",
    "approvedAt": "2026-05-01T00:00:00+10:00"
  }
}
```

## Checklist Import JSON

```json
{
  "sourceSystem": "BROKERENGINE",
  "sourceChecklistId": "private-checklist-id",
  "checklistTemplateName": "Private checklist name",
  "checklistCategory": "SUBMISSION",
  "applicableBoard": "DEAL",
  "applicableStage": "Prepare for Submission",
  "blocksStageMovement": true,
  "requiresComplianceReview": false,
  "items": [
    {
      "itemTemplateName": "Private checklist item",
      "position": 1,
      "itemType": "DOCUMENT",
      "ownerRole": "CLIENT",
      "required": true,
      "blocksSubmission": true,
      "evidenceCategory": "Income",
      "lixiFieldAlias": "Income",
      "brokerEngineFieldAlias": "Private source field name",
      "privateBodyReference": "workspace-private-checklist-items/item-1"
    }
  ]
}
```

## Import Safety

Before importing:

- confirm the target workspace is private;
- confirm only approved staff roles can read template bodies;
- remove client-specific content from reusable templates;
- map merge variables to BrokerApp/Twenty field names;
- record the source template ID and approval details;
- keep an audit record of the import.
