-- AlterTable
ALTER TABLE "material_suppliers" ADD COLUMN     "organization_id" TEXT;

-- AlterTable
ALTER TABLE "product_materials" ADD COLUMN     "organization_id" TEXT;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "brand_product_sku" TEXT;

-- CreateIndex
CREATE INDEX "material_suppliers_organization_id_idx1" ON "material_suppliers"("organization_id");

-- CreateIndex
CREATE INDEX "product_materials_organization_id_idx1" ON "product_materials"("organization_id");

-- CreateIndex
CREATE INDEX "brand_product_sku_idx1" ON "products"("brand_product_sku");

-- Add organization_id to material_suppliers
UPDATE material_suppliers
SET organization_id = (
    SELECT organization_id
    FROM materials
    WHERE materials.id = material_suppliers.material_id
);

-- Add organization_id to product_materials
UPDATE product_materials
SET organization_id = (
    SELECT organization_id
    FROM products
    WHERE products.id = product_materials.product_id
)


