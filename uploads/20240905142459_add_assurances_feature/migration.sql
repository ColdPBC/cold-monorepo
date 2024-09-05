/*
  Warnings:

  - You are about to drop the column `supplier_tier` on the `organization_facilities` table. All the data in the column will be lost.
  - You are about to drop the `claims` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organization_claims` table. If the table is not empty, all the data it contains will be lost.

*/
-- Rename Table

ALTER TABLE IF EXISTS "claims" RENAME TO "sustainability_attributes";

ALTER TABLE IF EXISTS "organization_claims" RENAME TO "organization_attributes";

ALTER TABLE IF EXISTS organization_claims RENAME COLUMN "claim_id" TO "sustainability_attribute_id";

ALTER TABLE "claims" DROP CONSTRAINT "claims_organization_id_fkey";

-- Rename
ALTER TABLE "organization_claims" RENAME CONSTRAINT "organization_claims_claim_id_fkey" TO "organization_attributes_sustainability_attribute_id_fkey";

-- Rename
ALTER TABLE "organization_claims" RENAME CONSTRAINT "organization_claims_material_id_fkey" TO "organization_attributes_material_id_fkey";

-- Rename
ALTER TABLE "organization_claims" RENAME CONSTRAINT "organization_claims_organization_facility_id_fkey" TO "organization_attributes_organization_facility_id_fkey";

-- Rename
ALTER TABLE "organization_claims" RENAME CONSTRAINT "organization_claims_organization_file_id_fkey" TO "organization_attributes_organization_file_id_fkey";

-- Rename
ALTER TABLE "organization_claims" RENAME CONSTRAINT "organization_claims_organization_id_fkey" TO "organization_attributes_organization_id_fkey";

-- Rename
ALTER TABLE "organization_claims" RENAME CONSTRAINT "organization_claims_product_id_fkey" TO "organization_attributes_product_id_fkey";

