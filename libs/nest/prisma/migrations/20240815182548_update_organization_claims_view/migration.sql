create or replace view organization_claims_view
    (facility_id, facility_name, address_line_1, address_line_2, city, state_province, postal_code, country, supplier, claim_id, claim_name,
     claim_level, claim_type, organization_file_id, organization_file_name, organization_file_type, mimetype, effective_start_date,
     effective_end_date, expires_at, organization_name)
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
