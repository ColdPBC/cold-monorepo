-- AlterTable
ALTER TABLE "materials" ADD COLUMN     "organization_facility_id" TEXT;

-- AlterTable
ALTER TABLE "product_materials" ADD COLUMN     "bom_section" TEXT,
ADD COLUMN     "placement" TEXT;
