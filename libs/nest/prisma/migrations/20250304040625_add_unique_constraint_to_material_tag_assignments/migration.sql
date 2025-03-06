/*
  Warnings:

  - A unique constraint covering the columns `[material_id,tag_id,organization_id]` on the table `material_tag_assignments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "material_tag_assignments_material_id_tag_id_organization_id_key" ON "material_tag_assignments"("material_id", "tag_id", "organization_id");
