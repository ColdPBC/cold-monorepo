SELECT
  p.name AS product_name,
  p.product_category,
  p.product_subcategory,
  m.name AS material_name,
  m.emissions_factor
FROM
  (
    (
      products p
      JOIN product_materials pm ON ((p.id = pm.product_id))
    )
    JOIN materials m ON ((pm.material_id = m.id))
  );