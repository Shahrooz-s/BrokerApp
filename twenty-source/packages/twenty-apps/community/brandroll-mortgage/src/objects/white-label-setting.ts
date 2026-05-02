import { FieldType, defineObject } from 'twenty-sdk/define';

export const WHITE_LABEL_SETTING_OBJECT_ID =
  '6b6d0000-4920-4000-8000-000000000001';
export const WHITE_LABEL_SETTING_NAME_FIELD_ID =
  '6b6d0000-4920-4000-8000-000000000002';

export default defineObject({
  universalIdentifier: WHITE_LABEL_SETTING_OBJECT_ID,
  nameSingular: 'whiteLabelSetting',
  namePlural: 'whiteLabelSettings',
  labelSingular: 'White-label setting',
  labelPlural: 'White-label settings',
  description:
    'Workspace-level branding, domain, SaaS tenant, email, portal, and security defaults for BrokerApp white-label deployment.',
  icon: 'IconPalette',
  labelIdentifierFieldMetadataUniversalIdentifier:
    WHITE_LABEL_SETTING_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: WHITE_LABEL_SETTING_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'settingName',
      label: 'Setting name',
      icon: 'IconPalette',
    },
    {
      universalIdentifier: '6b6d0000-4920-4000-8000-000000000003',
      type: FieldType.TEXT,
      name: 'brandName',
      label: 'Brand name',
      icon: 'IconBuilding',
    },
    {
      universalIdentifier: '6b6d0000-4920-4000-8000-000000000004',
      type: FieldType.TEXT,
      name: 'primaryDomain',
      label: 'Primary domain',
      icon: 'IconWorldWww',
    },
    {
      universalIdentifier: '6b6d0000-4920-4000-8000-000000000005',
      type: FieldType.TEXT,
      name: 'portalDomain',
      label: 'Portal domain',
      icon: 'IconUserScreen',
    },
    {
      universalIdentifier: '6b6d0000-4920-4000-8000-000000000006',
      type: FieldType.TEXT,
      name: 'emailFromDomain',
      label: 'Email from domain',
      icon: 'IconMail',
    },
    {
      universalIdentifier: '6b6d0000-4920-4000-8000-000000000007',
      type: FieldType.TEXT,
      name: 'themeTokens',
      label: 'Theme tokens',
      icon: 'IconPalette',
    },
    {
      universalIdentifier: '6b6d0000-4920-4000-8000-000000000008',
      type: FieldType.TEXT,
      name: 'tenantIsolationMode',
      label: 'Tenant isolation mode',
      icon: 'IconLock',
    },
    {
      universalIdentifier: '6b6d0000-4920-4000-8000-000000000009',
      type: FieldType.BOOLEAN,
      name: 'smsOtpDisabled',
      label: 'SMS OTP disabled',
      icon: 'IconMessageOff',
    },
    {
      universalIdentifier: '6b6d0000-4920-4000-8000-000000000010',
      type: FieldType.BOOLEAN,
      name: 'passkeysEnabled',
      label: 'Passkeys enabled',
      icon: 'IconFingerprint',
    },
    {
      universalIdentifier: '6b6d0000-4920-4000-8000-000000000011',
      type: FieldType.BOOLEAN,
      name: 'emailMagicLinksEnabled',
      label: 'Email magic links enabled',
      icon: 'IconMailCheck',
    },
    {
      universalIdentifier: '6b6d0000-4920-4000-8000-000000000012',
      type: FieldType.TEXT,
      name: 'securityHeadersProfile',
      label: 'Security headers profile',
      icon: 'IconShieldLock',
    },
  ],
});
