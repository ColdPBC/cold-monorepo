/*
  Warnings:

  - A unique constraint covering the columns `[organization_file_id]` on the table `certification_claims` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "certification_claims_organization_file_id_key" ON "certification_claims"("organization_file_id");
