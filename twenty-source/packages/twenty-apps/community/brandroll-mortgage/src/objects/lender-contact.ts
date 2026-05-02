import { FieldType, defineObject } from 'twenty-sdk/define';

export const LENDER_CONTACT_OBJECT_ID =
  '6b6d0000-2b00-4000-8000-000000000001';
export const LENDER_CONTACT_NAME_FIELD_ID =
  '6b6d0000-2b00-4000-8000-000000000002';

export default defineObject({
  universalIdentifier: LENDER_CONTACT_OBJECT_ID,
  nameSingular: 'lenderContact',
  namePlural: 'lenderContacts',
  labelSingular: 'Lender contact',
  labelPlural: 'Lender contacts',
  description:
    'Residential lender contact imported from AFG state contact matrix for escalation and scenario discussion.',
  icon: 'IconAddressBook',
  labelIdentifierFieldMetadataUniversalIdentifier: LENDER_CONTACT_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: LENDER_CONTACT_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'contactName',
      label: 'Contact name',
      icon: 'IconUser',
    },
    {
      universalIdentifier: '6b6d0000-2b00-4000-8000-000000000003',
      type: FieldType.TEXT,
      name: 'financialInstitution',
      label: 'Financial institution',
      icon: 'IconBuildingBank',
    },
    {
      universalIdentifier: '6b6d0000-2b00-4000-8000-000000000004',
      type: FieldType.TEXT,
      name: 'state',
      label: 'State',
      icon: 'IconMapPin',
    },
    {
      universalIdentifier: '6b6d0000-2b00-4000-8000-000000000005',
      type: FieldType.TEXT,
      name: 'jobTitle',
      label: 'Job title',
      icon: 'IconBriefcase',
    },
    {
      universalIdentifier: '6b6d0000-2b00-4000-8000-000000000006',
      type: FieldType.PHONES,
      name: 'phone',
      label: 'Phone',
      icon: 'IconPhone',
    },
    {
      universalIdentifier: '6b6d0000-2b00-4000-8000-000000000007',
      type: FieldType.EMAILS,
      name: 'email',
      label: 'Email',
      icon: 'IconMail',
    },
    {
      universalIdentifier: '6b6d0000-2b00-4000-8000-000000000008',
      type: FieldType.ADDRESS,
      name: 'businessAddress',
      label: 'Business address',
      icon: 'IconMapPin',
    },
  ],
});
