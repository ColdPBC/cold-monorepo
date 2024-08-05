UPDATE organization_compliance SET compliance_definition_id = (select id from compliance_definitions where name = compliance_definition_name)
WHERE compliance_definition_id IS NULL;
