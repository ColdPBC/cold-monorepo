-- AlterTable
ALTER TABLE "products" ADD COLUMN     "plm_id" TEXT;

-- CreateIndex
CREATE INDEX "products_name_idx1" ON "products"("name");

-- CreateIndex
CREATE INDEX "products_plm_id_idx1" ON "products"("plm_id");

-- Update PLM ID from Existing Metadata
UPDATE products
SET plm_id = metadata->>'_id'
WHERE metadata ? '_id';
