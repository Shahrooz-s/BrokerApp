import { FieldType, defineObject } from 'twenty-sdk/define';

export const SERVICEABILITY_ASSESSMENT_OBJECT_ID =
  '6b6d0000-1500-4000-8000-000000000001';
export const SERVICEABILITY_ASSESSMENT_NAME_FIELD_ID =
  '6b6d0000-1500-4000-8000-000000000002';
export const SERVICEABILITY_ASSESSMENT_STATUS_FIELD_ID =
  '6b6d0000-1500-4000-8000-000000000003';

export default defineObject({
  universalIdentifier: SERVICEABILITY_ASSESSMENT_OBJECT_ID,
  nameSingular: 'serviceabilityAssessment',
  namePlural: 'serviceabilityAssessments',
  labelSingular: 'Serviceability assessment',
  labelPlural: 'Serviceability assessments',
  description:
    'Serviceability calculator/provider result summary aligned to LIXI SVC concepts.',
  icon: 'IconCalculator',
  labelIdentifierFieldMetadataUniversalIdentifier:
    SERVICEABILITY_ASSESSMENT_NAME_FIELD_ID,
  fields: [
    {
      universalIdentifier: SERVICEABILITY_ASSESSMENT_NAME_FIELD_ID,
      type: FieldType.TEXT,
      name: 'assessmentName',
      label: 'Assessment name',
      icon: 'IconAbc',
    },
    {
      universalIdentifier: SERVICEABILITY_ASSESSMENT_STATUS_FIELD_ID,
      type: FieldType.SELECT,
      name: 'assessmentStatus',
      label: 'Assessment status',
      icon: 'IconActivity',
      options: [
        { value: 'NOT_STARTED', label: 'Not started', position: 0, color: 'gray' },
        { value: 'REQUESTED', label: 'Requested', position: 1, color: 'blue' },
        { value: 'PASS', label: 'Pass', position: 2, color: 'green' },
        { value: 'REFER', label: 'Refer', position: 3, color: 'orange' },
        { value: 'FAIL', label: 'Fail', position: 4, color: 'red' },
      ],
    },
    {
      universalIdentifier: '6b6d0000-1500-4000-8000-000000000004',
      type: FieldType.TEXT,
      name: 'provider',
      label: 'Provider',
      icon: 'IconPlug',
    },
    {
      universalIdentifier: '6b6d0000-1500-4000-8000-000000000005',
      type: FieldType.TEXT,
      name: 'externalReference',
      label: 'External reference',
      icon: 'IconExternalLink',
    },
  ],
});
