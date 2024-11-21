-- AlterTable
ALTER TABLE "materials" ADD COLUMN     "emissions_factor" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "product_materials" ADD COLUMN     "weight" DOUBLE PRECISION;
