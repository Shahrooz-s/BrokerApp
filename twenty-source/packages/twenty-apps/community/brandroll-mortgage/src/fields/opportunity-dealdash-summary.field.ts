import {
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

export const OPPORTUNITY_DEALDASH_SUMMARY_FIELD_ID =
  '6b6d0000-5000-4000-8000-000000000024';

export default defineField({
  universalIdentifier: OPPORTUNITY_DEALDASH_SUMMARY_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.TEXT,
  name: 'dealDashSummary',
  label: 'DealDash summary',
  icon: 'IconLayoutDashboard',
  description:
    'Broker-facing snapshot of client portal, fact find, KYC/CDD, document stack, serviceability, product search, credit proposal, and lodgement readiness.',
});
