/*
  Warnings:

  - A unique constraint covering the columns `[upc_code]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organization_id,name]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organization_id,style_code]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "products_upc_code_key" ON "products"("upc_code");

-- CreateIndex
CREATE UNIQUE INDEX "products_organization_id_name_key" ON "products"("organization_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "products_organization_id_style_code_key" ON "products"("organization_id", "style_code");
