/*
  Warnings:

  - A unique constraint covering the columns `[organization_id,name,plm_id]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organization_id,name,season_code,style_code]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "products_organization_id_name_key";

-- CreateIndex
CREATE INDEX "products_organization_id_name_idx1" ON "products"("organization_id", "name");

-- CreateIndex
CREATE INDEX "products_organization_id_name_upc_idx1" ON "products"("organization_id", "name", "upc_code");

-- CreateIndex
CREATE UNIQUE INDEX "products_organization_id_name_plm_id_key" ON "products"("organization_id", "name", "plm_id");

-- CreateIndex
CREATE UNIQUE INDEX "products_organization_id_name_season_code_style_code_key" ON "products"("organization_id", "name", "season_code", "style_code");
