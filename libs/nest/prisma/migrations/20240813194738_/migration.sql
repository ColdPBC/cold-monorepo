/*
  Warnings:

  - You are about to drop the `certification_claims` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `certifications` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "claim_level" AS ENUM ('Organization', 'Supplier', 'Product', 'Material');

-- CreateEnum
CREATE TYPE "claim_types" AS ENUM ('THIRD_PARTY', 'INTERNAL', 'TEST');

-- DropForeignKey
ALTER TABLE "certification_claims" DROP CONSTRAINT "certification_claims_certification_id_fkey";

-- DropForeignKey
ALTER TABLE "certification_claims" DROP CONSTRAINT "certification_claims_material_id_fkey";

-- DropForeignKey
ALTER TABLE "certification_claims" DROP CONSTRAINT "certification_claims_organization_facility_id_fkey";

-- DropForeignKey
ALTER TABLE "certification_claims" DROP CONSTRAINT "certification_claims_organization_file_id_fkey";

-- DropForeignKey
ALTER TABLE "certification_claims" DROP CONSTRAINT "certification_claims_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "certification_claims" DROP CONSTRAINT "certification_claims_product_id_fkey";

-- CreateTable
CREATE TABLE "claims" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "level" "claim_level" NOT NULL,
    "type" "claim_types" NOT NULL,

    CONSTRAINT "claims_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_claims" (
    "id" TEXT NOT NULL,
    "claim_id" TEXT NOT NULL,
    "organization_facility_id" TEXT,
    "organization_file_id" TEXT NOT NULL,
    "issued_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effective_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "material_id" TEXT,
    "product_id" TEXT,
    "organization_id" TEXT NOT NULL,

    CONSTRAINT "organization_claims_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "claims_organization_id_name_key" ON "claims"("organization_id", "name");

-- CreateIndex
CREATE INDEX "organization_claims_claim_id_idx1" ON "organization_claims"("claim_id");

-- CreateIndex
CREATE INDEX "organization_claims_material_id_idx1" ON "organization_claims"("material_id");

-- CreateIndex
CREATE INDEX "organization_claims_organization_facility_id_idx" ON "organization_claims"("organization_facility_id");

-- CreateIndex
CREATE INDEX "organization_claims_organization_file_id_idx1" ON "organization_claims"("organization_file_id");

-- CreateIndex
CREATE INDEX "organization_claims_organization_id_idx1" ON "organization_claims"("organization_id");

-- CreateIndex
CREATE INDEX "organization_claims_product_id_idx1" ON "organization_claims"("product_id");

-- AddForeignKey
ALTER TABLE "organization_claims" ADD CONSTRAINT "organization_claims_claim_id_fkey" FOREIGN KEY ("claim_id") REFERENCES "claims"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_claims" ADD CONSTRAINT "organization_claims_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "materials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_claims" ADD CONSTRAINT "organization_claims_organization_facility_id_fkey" FOREIGN KEY ("organization_facility_id") REFERENCES "organization_facilities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_claims" ADD CONSTRAINT "organization_claims_organization_file_id_fkey" FOREIGN KEY ("organization_file_id") REFERENCES "organization_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_claims" ADD CONSTRAINT "organization_claims_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_claims" ADD CONSTRAINT "organization_claims_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;


-- DropTable
DROP TABLE IF EXISTS "certification_claims" CASCADE;

-- DropTable
DROP TABLE IF EXISTS "certifications" CASCADE ;

-- DropEnum
DROP TYPE "certification_level";

-- DropEnum
DROP TYPE "certification_types";
