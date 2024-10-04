/*
  Warnings:

  - A unique constraint covering the columns `[material_id,product_id]` on the table `product_materials` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "product_materials_material_id_product_id_key" ON "product_materials"("material_id", "product_id");
