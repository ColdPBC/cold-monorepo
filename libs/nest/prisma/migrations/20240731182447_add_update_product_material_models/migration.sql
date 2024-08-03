/*
  Warnings:

  - The values [Organization,Supplier,Product,Material] on the enum `certification_level` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `organization_products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_facilities` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;

CREATE or replace VIEW SUPPLIERS_VIEW as
SELECT of.id, o.name as organization_name, of.organization_id, of.name, of.address_line_1, of.address_line_2, of.city, of.state_province, of.postal_code, of.metadata, of.supplier
FROM organization_facilities of
       JOIN organizations o ON of.organization_id = o.id
WHERE supplier is true;
COMMIT;

-- DropForeignKey
ALTER TABLE "certification_claims" DROP CONSTRAINT "certification_claims_organization_facility_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_products" DROP CONSTRAINT "organization_products_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "product_facilities" DROP CONSTRAINT "product_facilities_organization_facility_id_fkey";

-- DropForeignKey
ALTER TABLE "product_facilities" DROP CONSTRAINT "product_facilities_product_id_fkey";

-- AlterTable
ALTER TABLE "certification_claims" ADD COLUMN     "material_id" TEXT,
ADD COLUMN     "product_id" TEXT,
ALTER COLUMN "organization_facility_id" DROP NOT NULL;

-- DropTable
DROP TABLE "organization_products";

-- DropTable
DROP TABLE "product_facilities";

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organization_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "materials" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organization_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material_suppliers" (
    "id" TEXT NOT NULL,
    "material_id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "material_suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_materials" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "material_id" TEXT NOT NULL,
    "material_supplier_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_materials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");

-- CreateIndex
CREATE UNIQUE INDEX "materials_name_key" ON "materials"("name");

-- AddForeignKey
ALTER TABLE "certification_claims" ADD CONSTRAINT "certification_claims_organization_facility_id_fkey" FOREIGN KEY ("organization_facility_id") REFERENCES "organization_facilities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_organization_name_fkey" FOREIGN KEY ("organization_name") REFERENCES "organizations"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "materials" ADD CONSTRAINT "materials_organization_name_fkey" FOREIGN KEY ("organization_name") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_suppliers" ADD CONSTRAINT "material_suppliers_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_materials" ADD CONSTRAINT "product_materials_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_materials" ADD CONSTRAINT "product_materials_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
