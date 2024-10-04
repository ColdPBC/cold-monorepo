/*
  Warnings:

  - A unique constraint covering the columns `[organization_id,upc_code,name]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "products_upc_code_key";

-- CreateIndex
CREATE UNIQUE INDEX "products_organization_id_upc_code_name_key" ON "products"("organization_id", "upc_code", "name");
