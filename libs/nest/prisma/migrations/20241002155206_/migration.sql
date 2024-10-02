/*
  Warnings:

  - The primary key for the `attribute_assurances` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `sustainability_attributes` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "attribute_assurances" DROP CONSTRAINT "attribute_assurances_material_id_fkey";

-- DropForeignKey
ALTER TABLE "attribute_assurances" DROP CONSTRAINT "attribute_assurances_product_id_fkey";

-- DropForeignKey
ALTER TABLE "attribute_assurances" DROP CONSTRAINT "attribute_assurances_sustainability_attribute_id_fkey";

-- DropForeignKey
ALTER TABLE "material_suppliers" DROP CONSTRAINT "material_suppliers_material_id_fkey";

-- DropForeignKey
ALTER TABLE "material_suppliers" DROP CONSTRAINT "material_suppliers_supplier_id_fkey";

-- DropForeignKey
ALTER TABLE "product_materials" DROP CONSTRAINT "product_materials_material_id_fkey";

-- DropForeignKey
ALTER TABLE "product_materials" DROP CONSTRAINT "product_materials_product_id_fkey";

-- AlterTable
ALTER TABLE "attribute_assurances" DROP CONSTRAINT "attribute_assurances_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "sustainability_attribute_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "attribute_assurances_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "material_suppliers" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "materials" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "product_materials" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "id" DROP DEFAULT;

-- AlterTable
ALTER TABLE "sustainability_attributes" DROP CONSTRAINT "sustainability_attributes_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "sustainability_attributes_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "attribute_assurances" ADD CONSTRAINT "attribute_assurances_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_assurances" ADD CONSTRAINT "attribute_assurances_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_assurances" ADD CONSTRAINT "attribute_assurances_sustainability_attribute_id_fkey" FOREIGN KEY ("sustainability_attribute_id") REFERENCES "sustainability_attributes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_suppliers" ADD CONSTRAINT "material_suppliers_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_suppliers" ADD CONSTRAINT "material_suppliers_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "organization_facilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_materials" ADD CONSTRAINT "product_materials_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_materials" ADD CONSTRAINT "product_materials_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
