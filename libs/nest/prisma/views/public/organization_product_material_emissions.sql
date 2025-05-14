SELECT
  o.id AS organization_id,
  o.name AS organization_name,
  p.id AS product_id,
  p.name AS product_name,
  p.product_category,
  p.product_subcategory,
  m.id AS material_id,
  m.name AS material_name,
  m.emissions_factor,
  m.material_subcategory,
  m.material_category,
  p.emission_stats AS product_emission_stats,
  m.emission_stats AS material_emission_stats
FROM
  (
    (
      (
        organizations o
        JOIN products p ON ((o.id = p.organization_id))
      )
      JOIN product_materials pm ON ((p.id = pm.product_id))
    )
    JOIN materials m ON ((pm.material_id = m.id))
  )
WHERE
  (m.emissions_factor > (0) :: double precision);