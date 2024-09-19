/*
  Warnings:

  - A unique constraint covering the columns `[organization_id,name]` on the table `materials` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "materials_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "materials_organization_id_name_key" ON "materials"("organization_id", "name");
