SELECT
  of.id,
  o.name AS organization_name,
  of.organization_id,
  of.name,
  of.address_line_1,
  of.address_line_2,
  of.city,
  of.state_province,
  of.postal_code,
  of.metadata,
  of.supplier,
  of.supplier_tier
FROM
  (
    organization_facilities of
    JOIN organizations o ON ((of.organization_id = o.id))
  )
WHERE
  (of.supplier IS TRUE);