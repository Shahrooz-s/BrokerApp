import {
  FieldType,
  STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS,
  defineField,
} from 'twenty-sdk/define';

export const OPPORTUNITY_PRODUCT_RESEARCH_STATUS_FIELD_ID =
  '6b6d0000-5000-4000-8000-000000000006';

export default defineField({
  universalIdentifier: OPPORTUNITY_PRODUCT_RESEARCH_STATUS_FIELD_ID,
  objectUniversalIdentifier:
    STANDARD_OBJECT_UNIVERSAL_IDENTIFIERS.opportunity.universalIdentifier,
  type: FieldType.SELECT,
  name: 'productResearchStatus',
  label: 'Product research status',
  icon: 'IconFilterSearch',
  options: [
    { value: 'WAITING_FOR_SERVICEABILITY', label: 'Waiting for serviceability', position: 0, color: 'gray' },
    { value: 'FILTERS_READY', label: 'Filters ready', position: 1, color: 'blue' },
    { value: 'RESEARCH_IN_PROGRESS', label: 'Research in progress', position: 2, color: 'orange' },
    { value: 'SHORTLIST_READY', label: 'Shortlist ready', position: 3, color: 'purple' },
    { value: 'RECOMMENDATION_SELECTED', label: 'Recommendation selected', position: 4, color: 'green' },
  ],
});
