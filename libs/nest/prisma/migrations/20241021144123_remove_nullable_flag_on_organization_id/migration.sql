/*
  Warnings:

  - Made the column `organization_id` on table `material_suppliers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `organization_id` on table `product_materials` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "material_suppliers" ALTER COLUMN "organization_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "product_materials" ALTER COLUMN "organization_id" SET NOT NULL;
