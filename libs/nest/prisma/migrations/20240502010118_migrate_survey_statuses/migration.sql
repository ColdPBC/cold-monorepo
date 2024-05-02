INSERT INTO organization_compliance_statuses (id, type, email, organization_compliance_id, created_at, updated_at)
SELECT
  survey_status.id,
  survey_status.status,
  survey_status.email,
  organization_compliance.id,
  survey_status.created_at,
  survey_status.updated_at
FROM
  survey_status
    JOIN
  organization_compliance
  ON
    organization_compliance.compliance_definition_name = survey_status.survey_name
      AND organization_compliance.organization_id = survey_status.organization_id;
-- This is an empty migration.
