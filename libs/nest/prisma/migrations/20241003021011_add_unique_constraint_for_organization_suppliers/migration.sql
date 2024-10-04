/*
  Warnings:

  - A unique constraint covering the columns `[organization_id,name]` on the table `organization_facilities` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "organization_facilities_organization_id_name_key" ON "organization_facilities"("organization_id", "name");
