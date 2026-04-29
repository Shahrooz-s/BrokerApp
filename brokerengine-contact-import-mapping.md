# BrokerEngine Contact Import Mapping

## Purpose

This document maps the BrokerEngine contact export/import shape supplied in `contact.xlsx` to the Brandroll Twenty CRM contact model.

The workbook contains one sheet named `contact` with header columns only and no contact data rows. Treat this as a structural reference for field design, import templates, duplicate matching, and API mapping. Do not assume it represents the full BrokerEngine API model or all fields available in BrokerEngine.

## Source Structure

Workbook: `contact.xlsx`

Sheet: `contact`

Rows: header row only

Columns:

1. First Name
2. Last Name
3. Preferred Name
4. Mobile Phone Number
5. Office Phone Number
6. Home Phone Number
7. Email
8. Home Address
9. Postal Address Is Same
10. Office Address
11. Spouse Name
12. Birth Date
13. Last Review On
14. Next Review On
15. Lead Source
16. Company Name
17. Broker Name
18. Brand Name
19. Tags
20. Referred By
21. Created At
22. Flex Contact Id
23. BrokerEngine ID

## Mapping To Twenty Contacts

Twenty's standard `Person` object should be presented to staff as **Contacts**. The import should preserve the BrokerEngine shape but use structured fields where Twenty supports them.

| BrokerEngine column | Twenty target | Type | Import rule |
| --- | --- | --- | --- |
| First Name | Contact first name | Standard name field | Required if no full-name fallback exists. Trim whitespace. |
| Last Name | Contact last name | Standard name field | Required where available. Trim whitespace. |
| Preferred Name | `preferredName` | Custom text | Use for greeting, portal display, and broker communications. |
| Mobile Phone Number | Primary/mobile phone | Standard or custom phone | Normalize to AU phone format where possible. Do not remove original value until validation passes. |
| Office Phone Number | `officePhoneNumber` | Custom phone | Keep separate from mobile for professional contacts and business applicants. |
| Home Phone Number | `homePhoneNumber` | Custom phone | Optional; preserve for legacy records. |
| Email | Primary email | Standard email | Lowercase for matching, preserve display value. Use as duplicate key with mobile. |
| Home Address | `homeAddressRaw` initially; structured address later | Custom text/address | Import raw first. Parse to structured address only after address rules are confirmed. |
| Postal Address Is Same | `postalAddressSameAsHome` | Boolean | Accept true/false, yes/no, 1/0. Missing value should remain unknown, not false. |
| Office Address | `officeAddressRaw` | Custom text/address | Useful for professional contacts and employer-linked people. |
| Spouse Name | `spouseNameRaw`; later relationship to Contact | Custom text plus relationship | Do not auto-create spouse Contacts from name-only values. Queue for review unless matched confidently. |
| Birth Date | `birthDate` | Restricted date | Store only where privacy approval allows. Use for applicant identity matching and birthday/review automation only if approved. |
| Last Review On | `lastReviewOn` | Date | Drives retention/review reporting and post-settlement review history. |
| Next Review On | `nextReviewOn` | Date | Drives review board tasks and post-settlement automation. |
| Lead Source | `leadSource` | Select/text | Prefer controlled values once source taxonomy is defined. |
| Company Name | Related Organisation or `companyNameRaw` | Relationship/text | Match to Organisation when possible; otherwise retain raw company name for review. |
| Broker Name | Broker owner or `brokerNameRaw` | User relationship/text | Match to Twenty user by approved staff directory. Do not create users from import text. |
| Brand Name | `brandName` or business unit | Select/text | Useful for multi-brand reporting and routing. |
| Tags | Contact tags | Multi-select/tags | Preserve tags but normalize high-value roles such as applicant, referrer, professional contact, lender contact. |
| Referred By | `referredByRaw`; later Contact/Organisation relationship | Relationship/text | Do not auto-link ambiguous names. Use manual review for duplicates or missing context. |
| Created At | `sourceCreatedAt` | Date/time | Preserve as BrokerEngine source creation timestamp. Do not overwrite Twenty `createdAt`. |
| Flex Contact Id | `afgFlexContactId` | External ID | Preserve exactly. Use for future AFG Flex matching. |
| BrokerEngine ID | `brokerEngineContactId` | External ID | Preserve exactly. Primary external key for BrokerEngine contact reconciliation. |

## Recommended Contact Fields

Add or confirm these fields on the Twenty Contact object:

- `preferredName`
- `officePhoneNumber`
- `homePhoneNumber`
- `homeAddressRaw`
- `postalAddressSameAsHome`
- `officeAddressRaw`
- `spouseNameRaw`
- `spouseContact`
- `birthDate`
- `lastReviewOn`
- `nextReviewOn`
- `leadSource`
- `companyNameRaw`
- `organisation`
- `brokerNameRaw`
- `brokerOwner`
- `brandName`
- `contactTags`
- `referredByRaw`
- `referredByContact`
- `referredByOrganisation`
- `sourceCreatedAt`
- `afgFlexContactId`
- `brokerEngineContactId`
- `importSource`
- `importBatchId`
- `contactReviewStatus`

## Import And Matching Rules

1. Match by `brokerEngineContactId` first.
2. Match by `afgFlexContactId` second.
3. Match by email plus mobile third.
4. Match by email alone only if the email is unique and active.
5. Match by name/date of birth only if privacy-approved and manually reviewed.
6. Never silently merge contacts when spouse, referred-by, company, or broker owner fields are ambiguous.
7. Preserve original source values for audit where normalization changes phone, date, or address formatting.
8. Store `Created At` as `sourceCreatedAt`, not as the Twenty system creation timestamp.
9. Route records with missing external IDs, duplicate emails, invalid dates, or ambiguous owner/company matches to an import review queue.
10. Keep borrower-facing portal accounts separate from imported contact records until identity and consent are confirmed.

## Review Date Workflow

BrokerEngine contact exports include `Last Review On` and `Next Review On`, which are important for post-settlement retention.

Recommended automation:

- If `nextReviewOn` is within 30 days, create a Post-Settlement Review board item.
- If `nextReviewOn` is overdue, create a high-priority review task for the broker owner.
- If `lastReviewOn` is blank but the contact has a settled application, create a data-quality task.
- If broker owner cannot be matched, route the review task to the operations queue.

## LIXI Alignment

This contact template supports the LIXI-informed contact layer at a field-group level:

- Person identity: name, preferred name, birth date.
- Contact methods: phone and email.
- Addresses: home, postal-same flag, office address.
- Related parties: spouse, referred by, broker owner, company/organisation.
- Review and lifecycle metadata: created date, last review, next review, lead source, brand, tags.
- External identifiers: BrokerEngine ID and Flex Contact Id.

Do not copy restricted LIXI schema paths or enumerations into this repository. Use this mapping as public implementation guidance and validate detailed payloads only inside the licensed development environment.

## Acceptance Criteria

- A BrokerEngine contact export with these columns can be imported without losing source identifiers.
- Contacts are labelled as Contacts in staff-facing documentation and views.
- External IDs are retained for BrokerEngine and AFG Flex reconciliation.
- Review dates can drive post-settlement board tasks.
- Ambiguous spouse, company, referred-by, and broker owner matches are queued for review instead of guessed.
- Birth date and other sensitive fields are restricted by role and only stored where privacy approval allows.
