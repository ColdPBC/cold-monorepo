/*
  Warnings:

  - A unique constraint covering the columns `[material_id,supplier_id]` on the table `material_suppliers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "material_suppliers_material_id_supplier_id_key" ON "material_suppliers"("material_id", "supplier_id");
