/*
  Warnings:

  - A unique constraint covering the columns `[organization_id,id]` on the table `organization_files` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organization_id,openai_file_id]` on the table `organization_files` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "organization_files_organization_id_id_key" ON "organization_files"("organization_id", "id");

-- CreateIndex
CREATE UNIQUE INDEX "organization_files_organization_id_openai_file_id_key" ON "organization_files"("organization_id", "openai_file_id");
