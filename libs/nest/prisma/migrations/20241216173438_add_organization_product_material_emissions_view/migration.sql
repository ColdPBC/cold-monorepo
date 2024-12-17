create or replace view organization_product_material_emissions
            (organization_id,
                organization_name,
                product_id,
                product_name,
                product_category,
                product_subcategory,
                material_id,
                material_name,
             emissions_factor,
                material_subcategory,
                material_category) as
SELECT o.id   AS organization_id,
       o.name AS organization_name,
       p.id   AS product_id,
       p.name AS product_name,
       p.product_category,
       p.product_subcategory,
       m.id   AS material_id,
       m.name AS material_name,
       m.emissions_factor,
       m.material_subcategory,
       m.material_category,
       p.emission_stats as product_emission_stats,
       m.emission_stats as material_emission_stats
FROM organizations o
         JOIN products p ON o.id = p.organization_id
         JOIN product_materials pm ON p.id = pm.product_id
         JOIN materials m ON pm.material_id = m.id
WHERE m.emissions_factor > 0;
