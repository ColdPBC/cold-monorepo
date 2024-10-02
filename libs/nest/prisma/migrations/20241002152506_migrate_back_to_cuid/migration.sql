/*
  Warnings:

  - The `material_id` column on the `attribute_assurances` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `product_id` column on the `attribute_assurances` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `material_suppliers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `product_materials` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `material_id` column on the `product_materials` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `material_id` on the `material_suppliers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `product_id` on the `product_materials` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- Step 1: Drop foreign key constraints
ALTER TABLE product_materials DROP CONSTRAINT product_materials_material_id_fkey;
ALTER TABLE product_materials DROP CONSTRAINT product_materials_product_id_fkey;
ALTER TABLE material_suppliers DROP CONSTRAINT material_suppliers_material_id_fkey;
ALTER TABLE material_suppliers DROP CONSTRAINT material_suppliers_supplier_id_fkey;
ALTER TABLE attribute_assurances DROP CONSTRAINT attribute_assurances_material_id_fkey;
ALTER TABLE attribute_assurances DROP CONSTRAINT attribute_assurances_product_id_fkey;

-- Step 2: Change the type of the id columns from UUID to CUID
ALTER TABLE products ALTER COLUMN id TYPE TEXT USING id::TEXT;
ALTER TABLE materials ALTER COLUMN id TYPE TEXT USING id::TEXT;
ALTER TABLE product_materials ALTER COLUMN id TYPE TEXT USING id::TEXT;
ALTER TABLE material_suppliers ALTER COLUMN id TYPE TEXT USING id::TEXT;

-- Step 3: Change the type of the foreign key columns from UUID to CUID
ALTER TABLE product_materials ALTER COLUMN material_id TYPE TEXT USING material_id::TEXT;
ALTER TABLE product_materials ALTER COLUMN product_id TYPE TEXT USING product_id::TEXT;
ALTER TABLE material_suppliers ALTER COLUMN material_id TYPE TEXT USING material_id::TEXT;
ALTER TABLE material_suppliers ALTER COLUMN supplier_id TYPE TEXT USING supplier_id::TEXT;
ALTER TABLE attribute_assurances ALTER COLUMN material_id TYPE TEXT USING material_id::TEXT;
ALTER TABLE attribute_assurances ALTER COLUMN product_id TYPE TEXT USING product_id::TEXT;

-- Step 4: Recreate foreign key constraints
ALTER TABLE product_materials ADD CONSTRAINT product_materials_material_id_fkey FOREIGN KEY (material_id) REFERENCES materials(id) ON DELETE CASCADE;
ALTER TABLE product_materials ADD CONSTRAINT product_materials_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE;
ALTER TABLE material_suppliers ADD CONSTRAINT material_suppliers_material_id_fkey FOREIGN KEY (material_id) REFERENCES materials(id) ON DELETE CASCADE;
ALTER TABLE material_suppliers ADD CONSTRAINT material_suppliers_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES organization_facilities(id) ON DELETE CASCADE;
ALTER TABLE attribute_assurances ADD CONSTRAINT attribute_assurances_material_id_fkey FOREIGN KEY (material_id) REFERENCES materials(id) ON DELETE CASCADE;
ALTER TABLE attribute_assurances ADD CONSTRAINT attribute_assurances_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE;

