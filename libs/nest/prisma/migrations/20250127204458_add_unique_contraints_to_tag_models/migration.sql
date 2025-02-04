/*
  Warnings:

  - A unique constraint covering the columns `[organization_id,tag]` on the table `material_tags` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organization_id,tag]` on the table `products_tags` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "material_tags_organization_id_tag_key" ON "material_tags"("organization_id", "tag");

-- CreateIndex
CREATE UNIQUE INDEX "products_tags_organization_id_tag_key" ON "products_tags"("organization_id", "tag");
