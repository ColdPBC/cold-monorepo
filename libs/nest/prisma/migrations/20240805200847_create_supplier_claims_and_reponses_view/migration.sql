create or replace view organization_claims_view as
select
  ofac.id as facility_id,
  ofac.name as facility_name,
  ofac.address_line_1 as address_line_1,
  ofac.address_line_2 as address_line_2,
  ofac.city as city,
  ofac.state_province as state_province,
  ofac.postal_code as postal_code,
  ofac.country as country,
  ofac.supplier,
  c.id as claim_id,
  c.name as claim_name,
  c.level as claim_level,
  c.type as claim_type,
  of.id as organization_file_id,
  of.original_name as organization_file_name,
  of.type as organization_file_type,
  of.mimetype,
  of.effective_start_date as effective_start_date,
  of.effective_end_date as effective_end_date,
  of.expires_at,
  o.name as organization_name
from organization_facilities ofac
       JOIN organizations o ON ofac.organization_id = o.id
       LEFT JOIN certification_claims cc ON ofac.id = cc.organization_facility_id
       LEFT JOIN certifications c ON cc.certification_id = c.id
       LEFT JOIN organization_files of ON cc.organization_file_id = of.id
GROUP BY ofac.id, ofac.name, c.id, c.name, of.expires_at, of.effective_start_date, of.effective_end_date, c.level, c.type, of.id, of.original_name, of.mimetype, ofac.supplier, ofac.address_line_1, ofac.address_line_2, ofac.city, ofac.state_province, ofac.country, o.name
ORDER BY facility_name;

CREATE or replace VIEW SUPPLIERS_VIEW as
SELECT of.id, o.name as organization_name, of.organization_id, of.name, of.address_line_1, of.address_line_2, of.city, of.state_province, of.postal_code, of.metadata, of.supplier
FROM organization_facilities of
       JOIN organizations o ON of.organization_id = o.id
WHERE supplier is true;

CREATE or replace VIEW COMPLIANCE_RESPONSES AS
select oc.id as organization_compliance_id, oc.organization_id, cq.id as compliance_question_id, cs.id as compliance_section_id, csg.id as compliance_section_group_id, oc.compliance_definition_name,  ocair.id as organization_compliance_ai_response_id, ocr.id as organization_compliance_response_id
FROM organization_compliance oc
       LEFT JOIN compliance_section_groups csg
                 ON csg.compliance_definition_name = oc.compliance_definition_name
       LEFT JOIN compliance_sections cs
                 ON csg.id = cs.compliance_section_group_id
       LEFT JOIN compliance_questions cq
                 ON cs.id = cq.compliance_section_id
       LEFT JOIN organization_compliance_responses ocr
                 ON oc.id = ocr.organization_compliance_id AND cq.id = ocr.compliance_question_id
       LEFT JOIN organization_compliance_ai_responses ocair
                 ON oc.id = ocair.organization_compliance_id AND cq.id = ocair.compliance_question_id;
-- This is an empty migration.
