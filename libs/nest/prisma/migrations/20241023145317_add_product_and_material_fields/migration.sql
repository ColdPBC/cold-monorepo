-- AlterTable
ALTER TABLE "materials" ADD COLUMN     "material_category" TEXT,
ADD COLUMN     "material_subcategory" TEXT;

-- AlterTable
ALTER TABLE "product_materials" ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "unit_of_measure" TEXT,
ADD COLUMN     "yield" DOUBLE PRECISION;
