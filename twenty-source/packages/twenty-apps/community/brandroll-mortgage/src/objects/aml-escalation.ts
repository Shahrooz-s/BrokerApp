import { FieldType, defineObject } from 'twenty-sdk/define';

export const AML_ESCALATION_OBJECT_ID =
  '6b6d0000-4830-4000-8000-000000000001';
export const AML_ESCALATION_NAME_FIELD_ID =
  '6b6d0000-4830-4000-8000-000000000002';
export const AML_ESCALATION_STATUS_FIELD_ID =
  '6b6d0000-4830-4000-8000-000000000003';

export default defineObject({
  universalIdentifier: AML_ESCALATION_OBJECT_ID,
  nameSingular: 'amlEscalation',
  namePlural: 'amlEscalations',
  labelSingular: 'AML escalation',
  labelPlural: 'AML escalations',
  description:
    'Internal AML/CTF escalation record. Never expose suspicious matter status or suspicion notes to customers.',
  icon: 'IconShieldExclamation',
  labelIdentifierFieldMetadataUniversalIdentifier: AML_ESCALATION_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: AML_ESCALATION_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'escalationName',
      label: 'Escalation name',
      icon: 'IconShieldExclamation',
    },
    {
      universalIdentifier: AML_ESCALATION_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'escalationStatus',
      label: 'Status',
      icon: 'IconProgress',
      options: [
        { value: 'DRAFT', label: 'Draft', position: 0, color: 'gray' },
        { value: 'INTERNAL_REVIEW', label: 'Internal review', position: 1, color: 'orange' },
        { value: 'ESCALATED_TO_AGGREGATOR', label: 'Escalated to aggregator', position: 2, color: 'purple' },
        { value: 'ESCALATED_TO_LENDER', label: 'Escalated to lender', position: 3, color: 'blue' },
        { value: 'CLOSED_NO_ACTION', label: 'Closed - no action', position: 4, color: 'green' },
        { value: 'DO_NOT_PROCEED', label: 'Do not proceed', position: 5, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4830-4000-8000-000000000004',
      type: FieldType.SELECT,
      name: 'escalationType',
      label: 'Escalation type',
      icon: 'IconCategory',
      options: [
        { value: 'SUSPICIOUS_MATTER', label: 'Suspicious matter', position: 0, color: 'red' },
        { value: 'SANCTIONS_MATCH', label: 'Sanctions match', position: 1, color: 'red' },
        { value: 'PEP_REVIEW', label: 'PEP review', position: 2, color: 'orange' },
        { value: 'BENEFICIAL_OWNER_UNRESOLVED', label: 'Beneficial owner unresolved', position: 3, color: 'purple' },
        { value: 'IDENTITY_CONCERN', label: 'Identity concern', position: 4, color: 'yellow' },
        { value: 'FRAUD_CONCERN', label: 'Fraud concern', position: 5, color: 'red' },
        { value: 'ECDD', label: 'ECDD', position: 6, color: 'blue' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-4830-4000-8000-000000000005',
      type: FieldType.TEXT,
      name: 'formedBy',
      label: 'Concern formed by',
      icon: 'IconUser',
    },
    {
      universalIdentifier: '6b6d0000-4830-4000-8000-000000000006',
      type: FieldType.DATE_TIME,
      name: 'formedAt',
      label: 'Concern formed at',
      icon: 'IconClock',
    },
    {
      universalIdentifier: '6b6d0000-4830-4000-8000-000000000007',
      type: FieldType.TEXT,
      name: 'factsAndObservations',
      label: 'Facts and observations',
      icon: 'IconNotes',
    },
    {
      universalIdentifier: '6b6d0000-4830-4000-8000-000000000008',
      type: FieldType.TEXT,
      name: 'notifiedParty',
      label: 'Notified party',
      icon: 'IconBuildingBank',
    },
    {
      universalIdentifier: '6b6d0000-4830-4000-8000-000000000009',
      type: FieldType.DATE_TIME,
      name: 'notifiedAt',
      label: 'Notified at',
      icon: 'IconSend',
    },
    {
      universalIdentifier: '6b6d0000-4830-4000-8000-000000000010',
      type: FieldType.BOOLEAN,
      name: 'clientVisible',
      label: 'Client visible',
      icon: 'IconEyeOff',
      description:
        'Must remain false for suspicious matter and internal AML/CTF escalation records.',
    },
    {
      universalIdentifier: '6b6d0000-4830-4000-8000-000000000011',
      type: FieldType.TEXT,
      name: 'tippingOffWarning',
      label: 'Tipping-off warning',
      icon: 'IconAlertTriangle',
    },
  ],
});
