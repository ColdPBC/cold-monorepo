-- AlterTable
ALTER TABLE "product_materials" ADD COLUMN "plm_id" TEXT;

-- AlterTable
ALTER TABLE "products" ADD COLUMN "weight" INTEGER;

-- CreateIndex
CREATE INDEX "product_materials_plm_id_organization_id_idx1" ON "product_materials"("plm_id", "organization_id");
