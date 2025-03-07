/*
  Warnings:

  - A unique constraint covering the columns `[organization_id,product_id,tag_id]` on the table `product_tag_assignments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "product_tag_assignments_organization_id_product_id_tag_id_key" ON "product_tag_assignments"("organization_id", "product_id", "tag_id");
