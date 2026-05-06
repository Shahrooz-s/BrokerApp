import { FieldType, defineObject } from 'twenty-sdk/define';

export const DOCUMENT_REQUEST_OBJECT_ID =
  '6b6d0000-1600-4000-8000-000000000001';
export const DOCUMENT_REQUEST_NAME_FIELD_ID =
  '6b6d0000-1600-4000-8000-000000000002';
export const DOCUMENT_REQUEST_STATUS_FIELD_ID =
  '6b6d0000-1600-4000-8000-000000000003';

export default defineObject({
  universalIdentifier: DOCUMENT_REQUEST_OBJECT_ID,
  nameSingular: 'documentRequest',
  namePlural: 'documentRequests',
  labelSingular: 'Document request',
  labelPlural: 'Document requests',
  description:
    'Document checklist metadata without storing sensitive document binaries in Twenty.',
  icon: 'IconFileDescription',
  labelIdentifierFieldMetadataUniversalIdentifier: DOCUMENT_REQUEST_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: DOCUMENT_REQUEST_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'documentName',
      label: 'Document name',
      icon: 'IconFile',
    },
    {
      universalIdentifier: DOCUMENT_REQUEST_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'documentStatus',
      label: 'Document status',
      icon: 'IconChecklist',
      options: [
        { value: 'REQUESTED', label: 'Requested', position: 0, color: 'blue' },
        { value: 'UPLOADED', label: 'Uploaded', position: 1, color: 'purple' },
        { value: 'ACCEPTED', label: 'Accepted', position: 2, color: 'green' },
        { value: 'REJECTED', label: 'Rejected', position: 3, color: 'red' },
        { value: 'WAIVED', label: 'Waived', position: 4, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1600-4000-8000-000000000004',
      type: FieldType.TEXT,
      name: 'externalStorageReference',
      label: 'External storage reference',
      icon: 'IconLink',
    },
    {
      universalIdentifier: '6b6d0000-1600-4000-8000-000000000005',
      type: FieldType.DATE,
      name: 'dueDate',
      label: 'Due date',
      icon: 'IconCalendarDue',
    },
    {
      universalIdentifier: '6b6d0000-1600-4000-8000-000000000006',
      type: FieldType.SELECT,
      name: 'documentCategory',
      label: 'Document category',
      icon: 'IconFolder',
      options: [
        { value: 'IDENTITY', label: 'Identity', position: 0, color: 'blue' },
        { value: 'INCOME', label: 'Income', position: 1, color: 'green' },
        { value: 'EXPENSES', label: 'Expenses', position: 2, color: 'orange' },
        { value: 'ASSETS', label: 'Assets', position: 3, color: 'purple' },
        { value: 'LIABILITIES', label: 'Liabilities', position: 4, color: 'red' },
        { value: 'PROPERTY', label: 'Property', position: 5, color: 'yellow' },
        { value: 'COMPLIANCE', label: 'Compliance', position: 6, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1600-4000-8000-000000000007',
      type: FieldType.TEXT,
      name: 'requestedFromRole',
      label: 'Requested from role',
      icon: 'IconUser',
    },
    {
      universalIdentifier: '6b6d0000-1600-4000-8000-000000000010',
      type: FieldType.TEXT,
      name: 'applicantScope',
      label: 'Applicant scope',
      icon: 'IconUsers',
      description:
        'Primary applicant, co-applicant, all applicants, household, company, trust, or guarantor scope for LoanDox and ClientDash.',
    },
    {
      universalIdentifier: '6b6d0000-1600-4000-8000-000000000011',
      type: FieldType.SELECT,
      name: 'uploadMethod',
      label: 'Upload method',
      icon: 'IconUpload',
      options: [
        { value: 'CLIENTDASH_UPLOAD', label: 'ClientDash upload', position: 0, color: 'blue' },
        { value: 'MANUAL_UPLOAD', label: 'Manual upload', position: 1, color: 'gray' },
        { value: 'CASHDECK', label: 'CashDeck', position: 2, color: 'purple' },
        { value: 'BASIQ_OPEN_BANKING', label: 'Basiq open banking', position: 3, color: 'green' },
        { value: 'BROKER_UPLOAD', label: 'Broker upload', position: 4, color: 'orange' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1600-4000-8000-000000000012',
      type: FieldType.TEXT,
      name: 'requestStack',
      label: 'Request stack',
      icon: 'IconStack2',
      description:
        'LoanDox stack/template that created this document request.',
    },
    {
      universalIdentifier: '6b6d0000-1600-4000-8000-000000000013',
      type: FieldType.SELECT,
      name: 'reviewOutcome',
      label: 'Review outcome',
      icon: 'IconClipboardCheck',
      options: [
        { value: 'NOT_REVIEWED', label: 'Not reviewed', position: 0, color: 'gray' },
        { value: 'ACCEPTED', label: 'Accepted', position: 1, color: 'green' },
        { value: 'DECLINED', label: 'Declined', position: 2, color: 'red' },
        { value: 'QUESTION_SENT', label: 'Question sent', position: 3, color: 'orange' },
        { value: 'AI_REVIEW_REQUIRED', label: 'AI review required', position: 4, color: 'purple' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1600-4000-8000-000000000008',
      type: FieldType.TEXT,
      name: 'reviewNotes',
      label: 'Review notes',
      icon: 'IconNotes',
    },
    {
      universalIdentifier: '6b6d0000-1600-4000-8000-000000000009',
      type: FieldType.LINKS,
      name: 'clientPortalLink',
      label: 'Client portal link',
      icon: 'IconLink',
    },
    {
      universalIdentifier: '6b6d0000-1600-4000-8000-000000000014',
      type: FieldType.TEXT,
      name: 'paperlessDocumentId',
      label: 'Paperless document ID',
      icon: 'IconFileDatabase',
      description:
        'External Paperless-ngx document identifier. BrokerApp stores references and metadata only, not sensitive document binaries.',
    },
    {
      universalIdentifier: '6b6d0000-1600-4000-8000-000000000015',
      type: FieldType.TEXT,
      name: 'paperlessStoragePath',
      label: 'Paperless storage path',
      icon: 'IconArchive',
      description:
        'Optional Paperless-ngx archive path, correspondent, tag, or document URL reference.',
    },
    {
      universalIdentifier: '6b6d0000-1600-4000-8000-000000000016',
      type: FieldType.SELECT,
      name: 'documentSource',
      label: 'Document source',
      icon: 'IconCloudUpload',
      options: [
        { value: 'CLIENTDASH_UPLOAD', label: 'ClientDash upload', position: 0, color: 'blue' },
        { value: 'BROKER_UPLOAD', label: 'Broker upload', position: 1, color: 'orange' },
        { value: 'PAPERLESS_NGX', label: 'Paperless-ngx import', position: 2, color: 'green' },
        { value: 'CASHDECK', label: 'CashDeck', position: 3, color: 'purple' },
        { value: 'BASIQ', label: 'Basiq', position: 4, color: 'green' },
        { value: 'EMAIL', label: 'Email', position: 5, color: 'yellow' },
        { value: 'MANUAL', label: 'Manual', position: 6, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1600-4000-8000-000000000017',
      type: FieldType.SELECT,
      name: 'ocrStatus',
      label: 'OCR status',
      icon: 'IconScan',
      options: [
        { value: 'NOT_SENT', label: 'Not sent', position: 0, color: 'gray' },
        { value: 'QUEUED', label: 'Queued', position: 1, color: 'yellow' },
        { value: 'OCR_COMPLETE', label: 'OCR complete', position: 2, color: 'green' },
        { value: 'OCR_FAILED', label: 'OCR failed', position: 3, color: 'red' },
        { value: 'NOT_REQUIRED', label: 'Not required', position: 4, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1600-4000-8000-000000000018',
      type: FieldType.SELECT,
      name: 'aiReviewStatus',
      label: 'AI review status',
      icon: 'IconRobot',
      options: [
        { value: 'DISABLED', label: 'Disabled', position: 0, color: 'gray' },
        { value: 'READY_FOR_REVIEW', label: 'Ready for review', position: 1, color: 'blue' },
        { value: 'IN_REVIEW', label: 'In review', position: 2, color: 'purple' },
        { value: 'REVIEW_REQUIRED', label: 'Review required', position: 3, color: 'orange' },
        { value: 'ACCEPTED', label: 'Accepted', position: 4, color: 'green' },
        { value: 'DECLINED', label: 'Declined', position: 5, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1600-4000-8000-000000000019',
      type: FieldType.BOOLEAN,
      name: 'clientVisible',
      label: 'Client visible',
      icon: 'IconEye',
      description:
        'Controls whether the request appears in ClientDash. Broker notes and compliance review stay internal.',
    },
    {
      universalIdentifier: '6b6d0000-1600-4000-8000-000000000020',
      type: FieldType.BOOLEAN,
      name: 'brokerOnly',
      label: 'Broker only',
      icon: 'IconLock',
      description:
        'Broker-only document request or evidence reference that must not be exposed in ClientDash or CreditDash.',
    },
  ],
});
