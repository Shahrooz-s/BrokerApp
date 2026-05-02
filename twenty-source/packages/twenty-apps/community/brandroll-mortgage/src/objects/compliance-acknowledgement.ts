import { FieldType, defineObject } from 'twenty-sdk/define';

export const COMPLIANCE_ACKNOWLEDGEMENT_OBJECT_ID =
  '6b6d0000-1c00-4000-8000-000000000001';
export const COMPLIANCE_ACKNOWLEDGEMENT_NAME_FIELD_ID =
  '6b6d0000-1c00-4000-8000-000000000002';
export const COMPLIANCE_ACKNOWLEDGEMENT_STATUS_FIELD_ID =
  '6b6d0000-1c00-4000-8000-000000000003';

export default defineObject({
  universalIdentifier: COMPLIANCE_ACKNOWLEDGEMENT_OBJECT_ID,
  nameSingular: 'complianceAcknowledgement',
  namePlural: 'complianceAcknowledgements',
  labelSingular: 'Compliance acknowledgement',
  labelPlural: 'Compliance acknowledgements',
  description:
    'Credit guide, privacy consent, BID, and broker disclosure acknowledgement tracking for deal participants.',
  icon: 'IconSignature',
  labelIdentifierFieldMetadataUniversalIdentifier:
    COMPLIANCE_ACKNOWLEDGEMENT_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: COMPLIANCE_ACKNOWLEDGEMENT_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'acknowledgementName',
      label: 'Acknowledgement name',
      icon: 'IconSignature',
    },
    {
      universalIdentifier: COMPLIANCE_ACKNOWLEDGEMENT_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'acknowledgementStatus',
      label: 'Status',
      icon: 'IconProgressCheck',
      options: [
        { value: 'NOT_SENT', label: 'Not sent', position: 0, color: 'gray' },
        { value: 'SENT', label: 'Sent', position: 1, color: 'blue' },
        { value: 'VIEWED', label: 'Viewed', position: 2, color: 'purple' },
        { value: 'ACKNOWLEDGED', label: 'Acknowledged', position: 3, color: 'green' },
        { value: 'EXPIRED', label: 'Expired', position: 4, color: 'orange' },
        { value: 'DECLINED', label: 'Declined', position: 5, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1c00-4000-8000-000000000004',
      type: FieldType.SELECT,
      name: 'documentType',
      label: 'Document type',
      icon: 'IconFileCertificate',
      options: [
        { value: 'CREDIT_GUIDE', label: 'Credit guide', position: 0, color: 'blue' },
        { value: 'PRIVACY_CONSENT', label: 'Privacy consent', position: 1, color: 'green' },
        { value: 'BID_DISCLOSURE', label: 'BID disclosure', position: 2, color: 'orange' },
        { value: 'QUOTE_OR_FEE', label: 'Quote or fee consent', position: 3, color: 'purple' },
        { value: 'OTHER', label: 'Other', position: 4, color: 'gray' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1c00-4000-8000-000000000005',
      type: FieldType.DATE_TIME,
      name: 'sentAt',
      label: 'Sent at',
      icon: 'IconSend',
    },
    {
      universalIdentifier: '6b6d0000-1c00-4000-8000-000000000006',
      type: FieldType.DATE_TIME,
      name: 'acknowledgedAt',
      label: 'Acknowledged at',
      icon: 'IconCheckbox',
    },
    {
      universalIdentifier: '6b6d0000-1c00-4000-8000-000000000007',
      type: FieldType.TEXT,
      name: 'participantRole',
      label: 'Participant role',
      icon: 'IconUsers',
    },
    {
      universalIdentifier: '6b6d0000-1c00-4000-8000-000000000008',
      type: FieldType.LINKS,
      name: 'signedDocumentLink',
      label: 'Signed document link',
      icon: 'IconLink',
    },
  ],
});
