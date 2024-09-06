DROP VIEW IF EXISTS organization_claims_view;

create or replace view organization_claims_view
as
SELECT ofac.id          AS facility_id,
       ofac.name        AS facility_name,
       ofac.address_line_1,
       ofac.address_line_2,
       ofac.city,
       ofac.state_province,
       ofac.postal_code,
       ofac.country,
       ofac.supplier,
       ofac.supplier_tier,
       c.id             AS claim_id,
       c.name           AS claim_name,
       c.level          AS claim_level,
       c.type           AS claim_type,
       of.id            AS organization_file_id,
       of.original_name AS organization_file_name,
       of.type          AS organization_file_type,
       of.mimetype,
       of.effective_start_date,
       of.effective_end_date,
       of.expires_at,
       o.name           AS organization_name
FROM organization_facilities ofac
       JOIN organizations o ON ofac.organization_id = o.id
       LEFT JOIN organization_claims oc ON ofac.id = oc.organization_facility_id
       LEFT JOIN claims c ON oc.claim_id = c.id
       LEFT JOIN organization_files of ON oc.organization_file_id = of.id
GROUP BY ofac.id, ofac.name, c.id, c.name, of.expires_at, of.effective_start_date, of.effective_end_date, c.level, c.type, of.id, of.original_name,
         of.mimetype, ofac.supplier, ofac.address_line_1, ofac.address_line_2, ofac.city, ofac.state_province, ofac.country, o.name
ORDER BY ofac.name;

CREATE or replace VIEW SUPPLIERS_VIEW as
SELECT of.id, o.name as organization_name, of.organization_id, of.name, of.address_line_1, of.address_line_2, of.city, of.state_province, of.postal_code, of.metadata, of.supplier, of.supplier_tier
FROM organization_facilities of
       JOIN organizations o ON of.organization_id = o.id
WHERE supplier is true;
