/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `claims` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "organization_claims" ADD CONSTRAINT "organization_claims_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "claims_name_key" ON "claims"("name");

-- CreateIndex
CREATE INDEX "certification_claims_certification_id_idx1" ON "organization_claims"("certification_id");

-- CreateIndex
CREATE INDEX "certification_claims_material_id_idx1" ON "organization_claims"("material_id");

-- CreateIndex
CREATE INDEX "organization_claims_organization_facility_id_idx" ON "organization_claims"("organization_facility_id");

-- CreateIndex
CREATE INDEX "certification_claims_organization_file_id_idx1" ON "organization_claims"("organization_file_id");

-- CreateIndex
CREATE INDEX "certification_claims_organization_id_idx1" ON "organization_claims"("organization_id");

-- CreateIndex
CREATE INDEX "certification_claims_product_id_idx1" ON "organization_claims"("product_id");
