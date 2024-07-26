/*
  Warnings:

  - A unique constraint covering the columns `[organization_name,certification_id,organization_facility_id]` on the table `certification_claims` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "certification_claims_organization_file_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "certification_claims_organization_name_certification_id_org_key" ON "certification_claims"("organization_name", "certification_id", "organization_facility_id");
