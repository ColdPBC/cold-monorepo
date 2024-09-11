/*
  Warnings:

  - You are about to drop the `attribute_assurances` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `material_suppliers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `materials` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_materials` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sustainability_attributes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "attribute_assurances" DROP CONSTRAINT "attribute_assurances_material_id_fkey";

-- DropForeignKey
ALTER TABLE "attribute_assurances" DROP CONSTRAINT "attribute_assurances_organization_facility_id_fkey";

-- DropForeignKey
ALTER TABLE "attribute_assurances" DROP CONSTRAINT "attribute_assurances_organization_file_id_fkey";

-- DropForeignKey
ALTER TABLE "attribute_assurances" DROP CONSTRAINT "attribute_assurances_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "attribute_assurances" DROP CONSTRAINT "attribute_assurances_product_id_fkey";

-- DropForeignKey
ALTER TABLE "attribute_assurances" DROP CONSTRAINT "attribute_assurances_sustainability_attribute_id_fkey";

-- DropForeignKey
ALTER TABLE "material_suppliers" DROP CONSTRAINT "material_suppliers_material_id_fkey";

-- DropForeignKey
ALTER TABLE "material_suppliers" DROP CONSTRAINT "material_suppliers_supplier_id_fkey";

-- DropForeignKey
ALTER TABLE "materials" DROP CONSTRAINT "materials_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "product_materials" DROP CONSTRAINT "product_materials_material_id_fkey";

-- DropForeignKey
ALTER TABLE "product_materials" DROP CONSTRAINT "product_materials_product_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "sustainability_attributes" DROP CONSTRAINT "sustainability_attributes_organization_id_fkey";

-- DropTable
DROP TABLE "attribute_assurances";

-- DropTable
DROP TABLE "material_suppliers";

-- DropTable
DROP TABLE "materials";

-- DropTable
DROP TABLE "product_materials";

-- DropTable
DROP TABLE "products";

-- DropTable
DROP TABLE "sustainability_attributes";
